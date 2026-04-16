// frontend-react/src/components/ChatRoom.jsx
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://api.mango-os.com');

export default function ChatRoom({ roomId, currentUser }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.emit('joinRoom', roomId);
        socket.on('newMessage', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
        return () => socket.off('newMessage');
    }, [roomId]);

    const handleSend = () => {
        if (!input.trim()) return;
        socket.emit('sendMessage', { roomId, senderId: currentUser.id, content: input });
        setInput('');
    };

    return (
        <div className="flex flex-col h-screen bg-[#b2c7d9]"> {/* Kakao blue background */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-3 rounded-2xl ${msg.senderId === currentUser.id ? 'bg-[#fee500] text-black rounded-tr-sm' : 'bg-white text-black rounded-tl-sm'}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white p-3 flex gap-2 items-center">
                <button className="text-gray-400 text-2xl">+</button>
                <input 
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="메시지 입력..."
                />
                <button onClick={handleSend} className="bg-[#fee500] px-4 py-2 rounded-full font-bold">전송</button>
            </div>
        </div>
    );
}