# E-Commerce API Template

## 📌 Project Overview
This is a fully functional **E-Commerce API** built with **Node.js and Express.js**. It provides endpoints for **user authentication, product management, and cart operations**. The API is documented using **Swagger** and follows RESTful principles.  

### **🔹 Additional Features**
- **Environment Configuration** using `dotenv`
- **MongoDB Integration** for database storage  
- **Logging with Winston** for error tracking  
- **Secure API** with JWT-based authentication  
- **Modular & Scalable Codebase**

## 🚀 Features
- **User Authentication** (Sign Up, Sign In with JWT-based authentication)
- **Product Management** (CRUD operations for products)
- **Cart System** (Add, remove, and retrieve cart items)
- **Secure API** with JWT Authentication
- **File Upload** using Multer (for product images)
- **API Documentation** with Swagger
- **MongoDB Database Integration**
- **Mongoose ODM Database Integration**
- **Middleware for Logging & Security**
- **Error Handling with Custom Middleware**

## 🛠️ Tech Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Multer** - Middleware for file uploads
- **JWT (jsonwebtoken)** - Authentication
- **Swagger-UI-Express** - API documentation
- **Winston** - Logging middleware
- **Cors** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management

## 📦 Installation
### Prerequisites
Ensure you have **Node.js** and **MongoDB** installed on your system.

### Steps to Set Up
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/ecommapistemplate.git
   ```
2. Navigate to the project directory:
   ```sh
   cd ecommapistemplate
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```sh
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_secret_key
   PORT=8080
   ```

## 🚀 Running the Server
Start the backend server with:
```sh
node index.js
```
The server will be running at: `http://localhost:8080`

## 📖 API Documentation
Swagger API documentation is available at:
[Swagger UI](http://localhost:8080/api-doc/#/)  
_Ensure the server is running before accessing it._

## 📜 API Endpoints
### **User Routes**
| Method | Endpoint           | Description       |
|--------|-------------------|------------------|
| POST   | `/api/users/signup` | User Registration |
| POST   | `/api/users/signin` | User Login       |

### **Product Routes**
| Method | Endpoint           | Description       |
|--------|-------------------|------------------|
| GET    | `/api/products`    | Get all products |
| POST   | `/api/products`    | Add a product    |

### **Cart Routes**
| Method | Endpoint           | Description       |
|--------|-------------------|------------------|
| GET    | `/api/cart`        | Get user cart    |
| POST   | `/api/cart`        | Add to cart      |
| DELETE | `/api/cart/{id}`   | Remove from cart |

## 📂 Folder Structure  
```
ecommapistemplate/
│── src/
│   ├── config/
│   │   ├── mongodb.js      # MongoDB connection
│   ├── features/
│   │   ├── user/
│   │   ├── product/
│   │   ├── cart/
│   ├── middlewares/
│   ├── error-handler/
│── index.js                # Main entry point
│── .env                    # Environment variables
│── package.json
│── README.md
```

## 🏆 Why This Project Matters
- Implements a **modular & scalable** architecture
- Uses **secure authentication mechanisms** (JWT)
- Implements **MongoDB for real-world data persistence**
- Uses **winston logging** for better error tracking
- Well-documented API with Swagger for ease of use

## 🤝 Contributing
Feel free to fork this project and submit pull requests for improvements.

## 📜 License
This project is licensed under the **ISC License**.

---
### 📢 _Want to see this in action? Setup the project and explore the API which will look like this - !_ 🚀

![image](https://github.com/user-attachments/assets/59456a03-748d-4fd2-b77e-5b480bd88471)
