# 🛒 E-Commerce Backend API

A Node.js + Express + MongoDB REST API for a full-featured e-commerce platform.  
It handles authentication, product management, orders, carts, reviews, and payments using Stripe and Cloudinary.

---

## 🚀 Features

- 🔐 **JWT Authentication** (Login, Register, Refresh, Logout)
- 🛍️ **Product Management** (CRUD + Cloudinary Image Uploads)
- 🛒 **Cart System** (Add / Remove / Update Items)
- 💳 **Stripe Payment Integration**
- 📦 **Order Management**
- ⭐ **Product Reviews**
- 👑 **Admin Routes** (Manage users, products, and orders)
- ☁️ **Cloudinary Integration** for file uploads
- 🧩 **MongoDB + Mongoose** for database handling

---

## 🧠 Tech Stack

| Layer              | Technology                 |
| ------------------ | -------------------------- |
| Backend Framework  | Express.js                 |
| Runtime            | Node.js                    |
| Database           | MongoDB (Mongoose ODM)     |
| Authentication     | JWT with HTTP-only cookies |
| File Uploads       | Multer + Cloudinary        |
| Payments           | Stripe                     |
| Environment Config | dotenv                     |

---

## Project Url

[Here is the project Link](https://roadmap.sh/projects/ecommerce-api)

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>


### install dependencies using package.json

npm install

```

## 🗄️ Database Setup

This project uses **MongoDB** as its database.  
By default, it connects to a **local MongoDB instance**, but you can easily switch to **MongoDB Atlas** (cloud) for easier collaboration and deployment.

---

### ⚙️ Option 1: Local MongoDB Setup (Default)

If you have MongoDB installed on your system:

1. Make sure MongoDB is running:
   ```bash
   mongod
   ```
2. In your .env file, set
   ```bash
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
   ```
3. Start the server

```bash
   npm run dev
```
