<div align="center">

<!-- 🖼️ PASTE YOUR IMAGE URL BELOW — replace the src value only -->
<img src="https://media.istockphoto.com/id/1492400861/vector/online-auction-concept-with-huge-hammer-on-laptop.jpg?s=612x612&w=0&k=20&c=bPm5IwCFYP7yJSTKmDOAIXqq_3MZFWZEMNQ8X6FxZHg=" alt="BidWave Banner" width="70%" />

<h1>🔨 BidWave</h1>

<p><strong>A full-stack, real-time live auction platform built with React, Node.js, Socket.io, and a custom escrow-based payment system.</strong></p>

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

<p>
  <a href="https://bidwave-gray.vercel.app"><strong>🔗 Live Demo</strong></a>
  ·
  <a href="#-running-this-project-locally"><strong>Setup Guide</strong></a>
  ·
  <a href="#-features"><strong>Features</strong></a>
</p>

</div>

---

## 📖 About

BidWave is a scam-free, escrow-based live auction platform. Unlike peer-to-peer marketplaces, BidWave acts as a trusted middleman — buyers pay the platform (not the seller directly), every item is physically verified at a fulfillment center, and sellers are paid only after delivery is confirmed. The platform supports real-time bidding with live countdown timers, AI-assisted listings, and an automated fraud detection system.

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🛍️ Core Marketplace
- Browse live auctions with search, category, and size filters
- Real-time bidding powered by **Socket.io** — bids update instantly across all connected users with zero page refresh
- Live countdown timers synced across every viewer
- Auction auto-end via a **cron job** that runs every 30 seconds, automatically declares a winner and creates payment/shipment records
- Size-based delivery fee calculation (Small / Medium / Large / Extra)
- Full bid history with timestamps

### 🔐 Authentication
- JWT-based authentication built from scratch
- Google OAuth login/signup
- Forgot / reset password flow with secure tokens, expiry, and email delivery via Nodemailer
- Role-based access — Buyer, Seller, and Admin roles with separate dashboards
- Protected routes — redirects unauthenticated users to login

</td>
<td width="50%" valign="top">

### 🤖 AI Features
- **AI Listing Generator** — sellers upload a photo and AI auto-fills title, description, category, and suggested price (Gemini Vision API)
- **AI Support Chatbot** — floating widget answering questions about bidding, payments, delivery, and policies
- **Fraud Detection Engine** — rule-based scoring across 6 risk factors (self-bidding, new-account abuse, abnormal bid jumps, rapid bidding, excessive bidding, suspicious round numbers)

### 💳 Payments & Escrow
- Razorpay payment gateway integration (test mode)
- Escrow model — buyer pays the platform, seller is paid only after delivery confirmation
- Automatic calculation of commission, delivery charge, and total payable
- Payment status tracking (pending → paid → released)

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🛠️ Admin Tools
- Admin dashboard showing all fraud-flagged auctions with risk scores and reasons
- One-click actions to **clear** a flagged bid or **block** a bidder
- Blocking a user removes all their bids, restores the correct auction price from remaining legitimate bids, and broadcasts the correction live
- Blocked users cannot log in or place further bids

</td>
<td width="50%" valign="top">

### 📊 Dashboards
- **Buyer Dashboard** — active bids, auctions won, total spent, order tracking with a 4-step progress bar
- **Seller Dashboard** — active listings, total sold, total earned, pending payouts, live countdowns, and a "View Results" modal showing every bid on an ended auction

</td>
</tr>
</table>

### 🎨 UI/UX
- Fully responsive design with light and dark mode (persisted via localStorage)
- Custom component library built with Tailwind CSS
- Image upload with live preview, hosted on Cloudinary
- Toast notifications for all key actions
- Profile page with custom avatar upload

---

## 🧰 Tech Stack

<table>
<tr>
<td><strong>Frontend</strong></td>
<td>React (Vite) · Tailwind CSS · React Router v6 · Socket.io Client · Context API · Axios · react-hot-toast · Lucide Icons</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>Node.js · Express · Socket.io · PostgreSQL (Supabase) · Redis (Upstash) · JWT · Bcrypt · Nodemailer · node-cron</td>
</tr>
<tr>
<td><strong>Integrations</strong></td>
<td>Razorpay · Cloudinary · Google OAuth · Gemini Vision API</td>
</tr>
<tr>
<td><strong>Deployment</strong></td>
<td>Vercel (Frontend) · Render (Backend) · Supabase (DB) · Upstash (Cache)</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              FRONTEND (Vercel)              │
│         React + Vite + Tailwind CSS         │
└──────────────────┬──────────────────────────┘
                   │ HTTPS + WebSocket
┌──────────────────▼────────────────────────────┐
│              BACKEND (Render)                 │
│       Node.js + Express + Socket.io           │
│   Auth · Bidding Engine · Fraud Detection ·   │
│   Cron Jobs · AI Services · Payment Logic     │
└──────────┬───────────────────┬────────────────┘
           │                   │
┌──────────▼─────────┐ ┌───────▼──────────────────┐
│   PostgreSQL       │ │        Redis             │
│   (Supabase)       │ │       (Upstash)          │
│ Users, Auctions, Bids,│ │ Cached auction data & │
│ Payments, Shipments,  │ │ current bid prices    │
│ Flagged Auctions       │ │                      │
└────────────────────┘ └──────────────────────────┘
```

---

## 🚀 Running This Project Locally

### Prerequisites

<table>
<tr><td>✅</td><td><a href="https://nodejs.org">Node.js</a> (v18+) — check with <code>node --version</code></td></tr>
<tr><td>✅</td><td><a href="https://git-scm.com">Git</a></td></tr>
<tr><td>✅</td><td>A code editor (VS Code recommended)</td></tr>
</table>

You'll also need free accounts on:

<table>
<tr><td>🗄️</td><td><a href="https://supabase.com">Supabase</a> — database</td></tr>
<tr><td>⚡</td><td><a href="https://upstash.com">Upstash</a> — Redis cache</td></tr>
<tr><td>🖼️</td><td><a href="https://cloudinary.com">Cloudinary</a> — image hosting</td></tr>
<tr><td>💳</td><td><a href="https://razorpay.com">Razorpay</a> — payments (test mode)</td></tr>
<tr><td>🔑</td><td><a href="https://console.cloud.google.com">Google Cloud Console</a> — OAuth credentials</td></tr>
<tr><td>✉️</td><td>A Gmail account with an <a href="https://myaccount.google.com/apppasswords">App Password</a> — for sending emails</td></tr>
</table>

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/abhijeethere1/Bid_Wave.git
cd Bid_Wave
```

---

### Step 2 — Set Up the Backend

```bash
cd bidwave-server
npm install
```

Create a `.env` file in `bidwave-server/`:

```env
PORT=5000

JWT_SECRET=your_jwt_secret_here

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret

GOOGLE_CLIENT_ID=your_google_oauth_client_id

EMAIL_USER=your_gmail_address
EMAIL_PASS=your_16_character_gmail_app_password

FRONTEND_URL=http://localhost:5173
```

Run the SQL schema below in your Supabase **SQL Editor**, then start the backend:

```bash
npm run dev
```

You should see:
```
✅ Auction expiry job started — runs every 30 seconds
✅ Server running on port 5000
```

---

### Step 3 — Set Up the Frontend

Open a **new terminal window**:

```bash
cd bidwave
npm install
```

Create a `.env` file in `bidwave/`:

```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

```bash
npm run dev
```

The app will run at **http://localhost:5173**.

---

### Step 4 — Open the App

Visit **http://localhost:5173**, register a new account, explore live auctions, list an item, and try placing bids in two browser tabs to see real-time updates in action.

---

## 🗄️ Database Schema (Supabase)

<details>
<summary><strong>Click to expand full SQL schema</strong></summary>

```sql
create table users (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text unique not null,
  phone text,
  password text not null,
  role text default 'buyer' check (role in ('buyer', 'seller', 'admin')),
  avatar_url text,
  is_blocked boolean default false,
  reset_token text,
  reset_token_expiry timestamptz,
  created_at timestamp default now()
);

create table auctions (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references users(id) on delete cascade,
  title text not null,
  description text,
  category text,
  size text check (size in ('Small', 'Medium', 'Large', 'Extra')),
  delivery_charge integer,
  images text[],
  starting_price integer not null,
  current_price integer not null,
  total_bids integer default 0,
  status text default 'live' check (status in ('live', 'ended', 'cancelled')),
  ends_at timestamp not null,
  created_at timestamp default now()
);

create table bids (
  id uuid default gen_random_uuid() primary key,
  auction_id uuid references auctions(id) on delete cascade,
  bidder_id uuid references users(id) on delete cascade,
  amount integer not null,
  created_at timestamp default now()
);

create table payments (
  id uuid default gen_random_uuid() primary key,
  auction_id uuid references auctions(id) on delete cascade,
  buyer_id uuid references users(id) on delete cascade,
  seller_id uuid references users(id) on delete cascade,
  auction_amount integer not null,
  delivery_charge integer not null,
  platform_fee integer not null,
  total_amount integer not null,
  status text default 'pending' check (status in ('pending', 'paid', 'released', 'refunded')),
  payment_gateway_order_id text,
  created_at timestamp default now()
);

create table shipments (
  id uuid default gen_random_uuid() primary key,
  auction_id uuid references auctions(id) on delete cascade,
  status text default 'awaiting_shipment' check (status in (
    'awaiting_shipment', 'shipped_to_center',
    'item_received', 'verified', 'in_transit', 'delivered'
  )),
  tracking_id text,
  created_at timestamp default now()
);

create table flagged_auctions (
  id uuid default gen_random_uuid() primary key,
  auction_id uuid references auctions(id) on delete cascade,
  bid_id uuid references bids(id) on delete cascade,
  bidder_id uuid references users(id) on delete cascade,
  risk_score integer not null,
  reasons text[] not null,
  status text default 'pending' check (status in ('pending', 'reviewed', 'cleared', 'blocked')),
  created_at timestamp default now()
);
```

</details>

---

## 📁 Project Structure

```
Bid_Wave/
├── bidwave/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/             # Page-level components
│   │   ├── context/           # Auth & Theme context
│   │   ├── hooks/              # Custom hooks (useSocket, useCountdown)
│   │   └── utils/               # API client, dummy data
│   └── package.json
│
├── bidwave-server/           # Backend (Node + Express)
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/          # Auth middleware
│   │   ├── socket/               # Real-time bidding engine
│   │   ├── jobs/                  # Cron jobs
│   │   ├── services/               # Fraud detection, email service
│   │   └── config/                  # DB & Redis connections
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🎯 Key Engineering Highlights

> Talking points for interviews

- **Real-time architecture** — Socket.io rooms scoped per auction ID ensure bid broadcasts only reach relevant viewers, not the entire user base
- **Cache-aside pattern** — Redis caches auction reads for 30 seconds and stores live bid prices separately for instant access during high-frequency bidding
- **Atomic fraud rollback** — blocking a fraudulent bidder deletes all their bids, recalculates the correct auction price from remaining legitimate bids, and broadcasts the correction live to all connected viewers
- **State machine design** — auctions and payments move through clearly defined states (live → ended → paid → released) with validation at every transition
- **Escrow payment logic** — funds are never transferred directly between buyer and seller; the platform holds and releases payment only after delivery confirmation

---

## 📌 Notes

- The AI Listing Generator and Razorpay payments currently run in test/free-tier modes — fully functional but capped by third-party free-tier limits
- Render's free tier may take ~30 seconds to wake up after inactivity on first request
- The AI chatbot uses a rule-based keyword matching system and does not depend on any paid API

---

<div align="center">

**Built by Abhijeet** — Computer Science and Engineering, NIT Bhopal (MANIT)
<br>
© 2026 BidWave. All rights reserved.

</div>
