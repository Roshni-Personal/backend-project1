# Personal Finance Tracker - Backend

This is the **Node.js backend** for the Personal Finance Tracker. It provides API endpoints for managing users, transactions, and categories.

## 🚀 Features
- **User Authentication** (JWT-based)
- **Transaction Management**: Create, update, delete transactions.
- **Category Management**: Fetch and filter categories.
- **Filter Transactions** by category, type, and date range.
- **Secure REST API** with Express.js and MongoDB.

## 🛠️ Tech Stack
- **Node.js** with **Express.js**
- **MongoDB** with Mongoose
- **JWT Authentication**
- **dotenv** for Configuration
- **Cors & Helmet** for Security

## Folder structure

backend/
│── src/
│   ├── controllers/       # API Controllers
│   ├── models/            # Mongoose Models
│   ├── routes/            # API Routes
│   ├── middleware/        # Authentication Middleware
│   ├── config/            # Database Config
│   ├── server.js          # Entry Point
│── package.json
│── .env
│── README.md


## 📦 Installation

1. Navigate to the backend directory:
   ```sh
   cd backend
    yarn install
    yarn start