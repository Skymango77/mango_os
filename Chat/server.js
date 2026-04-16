require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// --- Security & Middleware Setup ---
app.use(helmet()); // Sets various HTTP headers for security
app.use(cors({
    origin: process.env.FRONTEND_URL, // e.g., https://mango-universe.vercel.app
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}));
app.use(express.json()); // Body parser
app.set('trust proxy', 1); // Required for Render/AWS load balancers
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Multer Configuration for Media Storage ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ 
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// --- Mock Database (Prepare for MongoDB integration) ---
// This simulates a persistent user collection
const mockUserDB = {
    users: [],
    
    async findOne(username) {
        return this.users.find(u => u.pi_username === username);
    },
    
    async create(userData) {
        const newUser = {
            ...userData,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date(),
            mango_id: userData.pi_username, // Initialize with Pi username
            mango_balance: 0,
            phoneNumber: userData.phoneNumber || `+8210${Math.floor(10000000 + Math.random() * 90000000)}`,
            isProfileHidden: false,
            privacyShowToStrangers: true,
            syncedContacts: [], // List of phone numbers this user has synced
            profileFrame: 'none',
            lastLogin: new Date()
        };
        this.users.push(newUser);
        return newUser;
    },

    async updateLastLogin(username) {
        const index = this.users.findIndex(u => u.pi_username === username);
        if (index !== -1) {
            this.users[index].lastLogin = new Date();
        }
    },

    async updateBalance(username, amount) {
        const user = await this.findOne(username);
        if (user) {
            user.mango_balance += amount;
        }
    }
};

// --- Real-time Message Store ---
const mockMessageDB = []; // Format: { roomId, sender, content, timestamp, readBy: [] }

// --- E2E Identity Key Store ---
const userPublicKeys = new Map(); // username -> JWK PublicKey

// --- Admin Analytics Store ---
const systemStats = {
    totalTransactions: 0,
    totalPiVolume: 0,
    activeRooms: 0,
    loginHistory: []
};

// --- Admin Control: Ban List ---
const bannedUsers = new Set();

/**
 * @route   POST /api/v1/admin/broadcast
 * @desc    Send a global push notification to all online users
 */
app.post('/api/v1/admin/broadcast', authMiddleware, (req, res) => {
    if (req.user.username !== 'KHankyul') {
        return res.status(403).json({ error: "Unauthorized access." });
    }
    const { message, type = 'info' } = req.body;
    
    // 전역 소켓 방송
    io.emit('system_broadcast', { message, type, sender: 'MANGO_HQ' });
    res.json({ success: true, message: "Global broadcast transmitted." });
});

/**
 * @route   POST /api/v1/admin/ban
 * @desc    Ban a malicious user (SUPER_ADMIN only)
 */
app.post('/api/v1/admin/ban', authMiddleware, (req, res) => {
    if (req.user.username !== 'KHankyul') { // CEO 체크
        return res.status(403).json({ error: "Unauthorized access to God-Mode." });
    }
    const { targetUsername } = req.body;
    bannedUsers.add(targetUsername);
    
    // 해당 유저의 소켓 연결 강제 종료
    const targetSocket = [...io.sockets.sockets.values()].find(s => s.username === targetUsername);
    if (targetSocket) {
        targetSocket.emit('system_error', { message: "Your account has been restricted by Admin." });
        targetSocket.disconnect(true);
    }
    res.json({ success: true, message: `${targetUsername} has been removed from the Universe.` });
});

/**
 * @route   GET /api/v1/admin/stats
 * @desc    Fetch real-time system health and analytics
 */
app.get('/api/v1/admin/stats', authMiddleware, (req, res) => {
    if (req.user.username !== 'KHankyul') {
        return res.status(403).json({ error: "Access denied." });
    }
    res.json({ success: true, stats: { ...systemStats, activeUsers: io.engine.clientsCount } });
});

// --- Socket.io Setup ---
const io = socketIo(server, {
    cors: { 
        origin: process.env.FRONTEND_URL, 
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// --- Authentication Middleware ---
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adds user info (username, uid) to the request object
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

// --- API Routes ---

/**
 * @route   POST /api/v1/auth/pi-login
 * @desc    Authenticate user via Pi Network accessToken
 * @access  Public
 */
app.post('/api/v1/auth/pi-login', async (req, res) => {
    const { accessToken } = req.body;

    if (!accessToken) {
        return res.status(400).json({ error: 'Missing Pi access token.' });
    }

    try {
        // 1. Verify token with Pi Network API
        // The user's accessToken is used as a Bearer token to fetch their profile
        const piResponse = await axios.get('https://api.minepi.com/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const piUserData = piResponse.data; // Expected: { uid: "...", username: "..." }

        // 2. User Management Logic
        let user = await mockUserDB.findOne(piUserData.username);

        if (!user) {
            // Register new Mango Pioneer
            user = await mockUserDB.create({
                pi_username: piUserData.username,
                pi_uid: piUserData.uid,
                nickname: piUserData.username // Default nickname
            });
            console.log(`New user registered: ${user.pi_username}`);
        } else {
            // Update existing user
            await mockUserDB.updateLastLogin(user.pi_username);
            console.log(`User logged in: ${user.pi_username}`);
        }

        // 3. Session Management (JWT)
        const payload = {
            uid: user.id,
            username: user.pi_username
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Return session token and non-sensitive user data
        res.json({
            success: true,
            token: `Bearer ${token}`,
            user: {
                username: user.pi_username,
                balance: user.mango_balance,
                joined: user.createdAt
            }
        });

    } catch (error) {
        console.error('Pi Login Error:', error.response ? error.response.data : error.message);
        
        // Handle specific Pi API failure scenarios
        if (error.response && error.response.status === 401) {
            return res.status(401).json({ error: 'Invalid Pi access token.' });
        }

        res.status(500).json({ error: 'Pi Network authentication failed. Please try again later.' });
    }
});

/**
 * @route   POST /api/v1/commerce/gift
 * @desc    Protected route example: Send a gift
 * @access  Private
 */
app.post('/api/v1/orders/gift', authMiddleware, (req, res) => {
    // If code reaches here, JWT is valid and req.user contains the sender's identity
    const { receiverId, productId } = req.body;
    
    console.log(`Transaction: ${req.user.username} is sending product ${productId} to ${receiverId}`);
    
    res.json({
        success: true,
        message: 'Gift order processed successfully.'
    });
});

/**
 * @route   POST /api/v1/chat/upload
 * @desc    Upload chat media (images/videos)
 * @access  Private
 */
app.post('/api/v1/chat/upload', authMiddleware, upload.single('media'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const mediaType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
    
    res.json({ success: true, fileUrl, mediaType });
});

/**
 * @route   PUT /api/v1/users/profile
 * @desc    Update user profile settings (ID, Avatar, Frames, Privacy)
 * @access  Private
 */
app.put('/api/v1/users/profile', authMiddleware, async (req, res) => {
    const { mango_id, avatar_url, profileFrame, isProfileHidden } = req.body;
    const username = req.user.username;

    // Check for mango_id duplicates if changed
    if (mango_id && mango_id !== username) {
        const existing = mockUserDB.users.find(u => u.mango_id === mango_id && u.pi_username !== username);
        if (existing) {
            return res.status(400).json({ error: 'Mango ID already taken.' });
        }
    }

    const user = await mockUserDB.findOne(username);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (mango_id) user.mango_id = mango_id;
    if (avatar_url) user.avatar_url = avatar_url;
    if (profileFrame !== undefined) user.profileFrame = profileFrame;
    if (isProfileHidden !== undefined) user.isProfileHidden = isProfileHidden;
    if (privacyShowToStrangers !== undefined) user.privacyShowToStrangers = privacyShowToStrangers;

    res.json({ success: true, user });
});

/**
 * @route   POST /api/v1/ai/translate
 * @desc    Translate text (Mocked for Google Cloud Translation API)
 */
app.post('/api/v1/ai/translate', authMiddleware, async (req, res) => {
    const { text, targetLang } = req.body;
    
    // Mock logic: In production, integrate @google-cloud/translate
    let translatedText = `[AI Translated] ${text}`;
    if (targetLang === 'ko' && text.toLowerCase().includes('hello')) translatedText = "안녕하세요";
    if (targetLang === 'en' && text.includes('안녕하세요')) translatedText = "Hello";
    if (targetLang === 'ko' && text.toLowerCase().includes('how much')) translatedText = "가격이 얼마인가요?";

    res.json({ success: true, translatedText });
});

/**
 * @route   POST /api/v1/ai/smart-reply
 * @desc    Suggest smart replies (Mocked for Gemini Nano/OpenAI)
 */
app.post('/api/v1/ai/smart-reply', authMiddleware, async (req, res) => {
    const { lastMessage } = req.body;
    
    // Mock logic based on context
    let suggestions = ["Cool!", "Sounds good", "Tell me more"];
    const lower = lastMessage.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) suggestions = ["Hi there!", "How are you?", "Nice to meet you"];
    if (lower.includes('price') || lower.includes('cost') || lower.includes('얼마')) suggestions = ["How much?", "Can I get a discount?", "I'll buy it"];
    if (lower.includes('where') || lower.includes('location')) suggestions = ["Where is it?", "Send me the map", "Is it far?"];

    res.json({ success: true, suggestions });
});

/**
 * @route   POST /api/v1/users/keys
 * @desc    Upload user's public identity key for E2E
 */
app.post('/api/v1/users/keys', authMiddleware, (req, res) => {
    const { publicKey } = req.body;
    userPublicKeys.set(req.user.username, publicKey);
    console.log(`[E2E] Identity Key registered for ${req.user.username}`);
    res.json({ success: true });
});

/**
 * @route   GET /api/v1/users/:username/keys
 * @desc    Fetch a peer's public key to initiate encrypted session
 */
app.get('/api/v1/users/:username/keys', authMiddleware, (req, res) => {
    const publicKey = userPublicKeys.get(req.params.username);
    if (!publicKey) return res.status(404).json({ error: 'Peer identity not found or E2E not enabled.' });
    res.json({ publicKey });
});

/**
 * @route   POST /api/v1/payments/approve
 * @desc    Approve Pi payment before it is submitted to the blockchain
 */
app.post('/api/v1/payments/approve', authMiddleware, (req, res) => {
    const { paymentId } = req.body;
    console.log(`[Mango Commerce] Approving payment ${paymentId} for ${req.user.username}`);
    // In production, you would call Pi API to approve here
    res.json({ success: true });
});

/**
 * @route   POST /api/v1/payments/complete
 * @desc    Verify and finalize the gift transaction
 */
app.post('/api/v1/payments/complete', authMiddleware, async (req, res) => {
    const { paymentId, txid, roomId, recipient, item } = req.body;
    
    // Logic: Update receiver's Mango balance (mock)
    await mockUserDB.updateBalance(recipient, item.price);

    systemStats.totalTransactions++;
    systemStats.totalPiVolume += item.price;

    // Broadcast the "Gift Message" to the room
    const giftMsg = {
        roomId,
        sender: req.user.username,
        isProfileHidden: (await mockUserDB.findOne(req.user.username)).isProfileHidden,
        profileFrame: (await mockUserDB.findOne(req.user.username)).profileFrame,
        type: 'gift',
        item: item,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        readBy: [req.user.username]
    };
    mockMessageDB.push(giftMsg);
    io.to(roomId).emit('receive_message', giftMsg);

    res.json({ success: true });
});

// --- Real-time Chat Events ---
io.on('connection', (socket) => {
    console.log('⚡ New socket connection:', socket.id);

    socket.on('join_room', (data) => {
        const { roomId, username } = data;
        socket.join(roomId);
        systemStats.activeRooms = io.sockets.adapter.rooms.size;
        console.log(`👤 ${username} joined ${roomId}`);
        
        // Send existing messages for this room
        const roomHistory = mockMessageDB.filter(m => m.roomId === roomId);
        socket.emit('load_history', roomHistory);
    });

    socket.on('send_message', (data) => {
        const { roomId, sender, content, isProfileHidden, profileFrame, avatar_url, mediaUrl, mediaType, senderPhone } = data;
        
        // We broadcast the full message, but including the sender's phone number 
        // so recipients can check if they have this person in their synced contacts.
        const newMessage = {
            roomId,
            sender,
            content,
            isProfileHidden,
            profileFrame,
            avatar_url,
            senderPhone,
            mediaUrl,
            mediaType,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            readBy: [sender]
        };
        mockMessageDB.push(newMessage);
        
        // Broadcast to all in room
        io.to(roomId).emit('receive_message', newMessage);
    });

    socket.on('typing', (data) => {
        socket.to(data.roomId).emit('display_typing', { ...data, isTyping: true });
    });

    socket.on('stop_typing', (data) => {
        socket.to(data.roomId).emit('display_typing', { ...data, isTyping: false });
    });

    socket.on('mark_as_read', (data) => {
        const { roomId, username } = data;
        mockMessageDB.forEach(msg => {
            if (msg.roomId === roomId && !msg.readBy.includes(username)) {
                msg.readBy.push(username);
            }
        });
        io.to(roomId).emit('read_status_update', { username });
    });
});

// --- Health Check ---
app.get('/health', (req, res) => {
    res.json({ status: 'Mango System Online', timestamp: new Date() });
});

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong in the Mango core!');
});

server.listen(PORT, () => {
    console.log(`🥭 Mango Server running on port ${PORT}`);
});