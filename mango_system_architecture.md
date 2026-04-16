# 🥭 MANGO SUPER APP: System Architecture & UX Design Document

**Version:** 1.0.0 | **Target Platform:** Web (PWA), iOS, Android (Pi Browser Compatible)

---

## Table of Contents

1. [UX/UI Analysis & Psychology](#1-uxui-analysis--psychology)
2. [Core Feature Breakdown](#2-core-feature-breakdown)
3. [System Architecture](#3-system-architecture)
4. [Database Design (ERD)](#4-database-design-erd)
5. [API Design (RESTful)](#5-api-design-restful)
6. [AI & Recommendation System](#6-ai--recommendation-system)
7. [Real Code Structure & Implementation](#7-real-code-structure--implementation)
8. [Security Design](#8-security-design)
9. [Performance Optimization](#9-performance-optimization)
10. [Business Model & Scalability](#10-business-model--scalability)
11. [MVP Roadmap & Timeline](#11-mvp-roadmap--timeline)

---

## 1. UX/UI Analysis & Psychology

Mango utilizes habit-forming UX loops: **Trigger -> Action -> Variable Reward -> Investment**.

### 1.1 Friends List & Multi-Profile

- **User Flow:** App Launch -> Friends Tab -> View Updates / Birthdays.
- **UX Psychology:** Social Proof & FOMO. Red dots/halos on profiles trigger curiosity. Birthdays act as a direct trigger for the Commerce flow (Gifting).
- **Mango Twist:** Implement "Multi-Profile" based on Pi Network trust graphs. Users toggle between 'Business Profile' (for Mango Pro Partners) and 'Personal Profile'.

### 1.2 Chat Interface

- **User Flow:** Select Friend -> Enter Room -> Send Message/Media -> Check Read Status.
- **UX Psychology:** Variable Reward. The disappearance of the "1" (read receipt) is a powerful psychological hook.
- **Design Pattern:** Bottom input bar with an expandable "+" menu for rich actions (Send Image, Send Gift, Send Pi).

### 1.3 Gift Commerce (Mango Gift)

- **User Flow:** Chat Room "+" -> Gift -> Select Item -> Pay with Pi/Mango Pay -> Animated card in chat.
- **UX Psychology:** Reciprocity. Frictionless gifting inside the chat interface increases conversion rates drastically.

---

## 2. Core Feature Breakdown

### 2.1 Messaging System

- **Core:** 1:1 Chat, Group Chat, Text/Image/Video.
- **Hidden Logic:** WebSocket connection recovery, message queuing for offline mode, local IndexedDB caching for instant load times.

### 2.2 Gift Commerce

- **Core:** Product catalog, Checkout, Gift Message Card.
- **Hidden Logic:** Expiration tracking for unused coupons, automatic Pi refund logic.

### 2.3 Search & Discovery

- **Core:** Global search (Users, Chats, Products).
- **Hidden Logic:** Debounced inputs, Korean initial consonant search (초성 검색).

---

## 3. System Architecture

**Frontend:** React (Web/PWA) for Pi Browser compatibility.
**Backend:** Node.js (Express) for REST API + Socket.io for Real-time sync.
**Architecture Style:** Modular Monolith (transitioning to Microservices at 1M+ users).

### Architecture Diagram

```plaintext
[ Client Layer ]
   ┌────────────────┐      ┌────────────────┐      ┌────────────────┐
   │ Mango iOS App  │      │ Mango Android  │      │ Web/Pi Browser │
   └───────┬────────┘      └───────┬────────┘      └───────┬────────┘
           │                       │                       │
[ API Gateway & Load Balancer (Nginx / AWS ALB) ] ─────────┘
           │
           ├─────────────────────────────────────────┐
           ▼                                         ▼
[ Real-Time Layer ]                        [ Core Services Layer ]
┌────────────────────┐                     ┌────────────────────┐
│ Socket.io Server   │<-- Syncs Messages --│ Node.js API Server │
│ (Redis Pub/Sub)    │                     │ (Express)          │
└──────────┬─────────┘                     └──────────┬─────────┘
           │                                          │
[ Data Layer ]                                        │
           │                                          ▼
┌──────────▼─────────┐                     ┌────────────────────┐
│   Local Storage    │                     │ MongoDB / Postgres │
│ (IndexedDB)        │                     │ (Users, Products)  │
└────────────────────┘                     └────────────────────┘
```

---

## 4. Database Design (ERD)

### 4.1 Users Table

- `user_id` (UUID, PK)
- `pi_username` (String, Unique)
- `nickname` (String)
- `mango_balance` (Decimal)

### 4.2 Chats & Messages

- **Chats:** `chat_id`, `type` (direct/group), `participants` (Array), `last_message`.
- **Messages:** `message_id`, `chat_id`, `sender_id`, `content_type` (text/image/gift), `content` (String/JSON), `read_by` (Array).

### 4.3 Products & Orders

- **Products:** `product_id`, `merchant_id`, `name`, `price_pi`, `stock`.
- **Orders:** `order_id`, `buyer_id`, `receiver_id`, `status` (pending/paid/used).

---

## 5. API Design (RESTful)

### 5.1 Authentication

- `POST /api/v1/auth/pi-login`

### 5.2 Chat

- `GET /api/v1/chats` (List rooms)
- `GET /api/v1/chats/:id/messages` (Pagination)

### 5.3 Commerce

- `POST /api/v1/orders/gift` (Create order)

---

## 6. AI & Recommendation System

- **Search:** Elasticsearch for phonetic matching (초성 검색).
- **Gift Recommendations:** Collaborative Filtering based on Pi Network trust graphs and user behavior.

---

## 7. Real Code Structure & Implementation

### 7.1 VS Code Project Structure

```plaintext
mango-super-app/
├── backend-node/             # Express server API
│   ├── src/
│   │   ├── controllers/      # Route logic
│   │   ├── models/           # Mongoose/Prisma schemas
│   │   ├── routes/           # API endpoints
│   │   └── services/         # Business logic (Payment, AI)
├── frontend-react/           # Web/PWA App
│   ├── src/
│   │   ├── components/       # ChatBubble, ProductCard
│   │   ├── pages/            # ChatRoom, FriendsList
│   │   └── contexts/         # AuthContext, SocketContext
└── shared/                   # Shared TS interfaces
```

### 7.2 Backend: Real-time Chat (Socket.io)

```javascript
io.on("connection", (socket) => {
  socket.on("sendMessage", async (data) => {
    const { roomId, senderId, content } = data;
    const newMessage = await Message.create({
      chat_id: roomId,
      sender_id: senderId,
      content,
    });
    io.to(roomId).emit("newMessage", newMessage);
  });
});
```

---

## 8. Security Design

- **Authentication:** Pi SDK verified server-side via access tokens.
- **E2E Encryption:** Implementation of Signal Protocol for high-security rooms.
- **Payment Security:** Server-side validation of Pi transaction IDs via Pi Network APIs.

---

## 9. Performance Optimization

- **Caching:** Redis for friend lists and active session data.
- **Pagination:** Cursor-based pagination for chat history to prevent duplicates.
- **Images:** Client-side compression to WebP before S3 upload.

---

## 10. Business Model & Scalability

- **Commission:** 5-10% take-rate on Mango Gift transactions.
- **B2B Ads:** Monetizing the `partner-modal` via regional targeted ads.
- **Micro-transactions:** Direct Pi remittances within the chat interface.

---

## 11. MVP Roadmap & Timeline

- **Weeks 1-4:** Core Foundation (Auth, Friends, 1:1 Chat).
- **Weeks 5-8:** Social & Group Chat (Media, Read Receipts).
- **Weeks 9-12:** Mango Gift Commerce (Product Catalog, Pi Checkout).
- **Weeks 13-16:** Polish & Transition from index.html to SPA.
