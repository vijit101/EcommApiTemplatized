
# E-Commerce API Template

## 📌 Project Overview
This is a fully functional **E-Commerce API** built with **Node.js and Express.js**. It provides endpoints for user authentication, product management, and cart operations. The API is documented using **Swagger** and follows RESTful principles.

## 🚀 Features
- **User Authentication** (Sign Up, Sign In with JWT-based authentication)
- **Product Management** (CRUD operations for products)
- **Cart System** (Add, remove, and retrieve cart items)
- **Secure API** with JWT Authentication
- **File Upload** using Multer (for product images)
- **API Documentation** with Swagger

## 🛠️ Tech Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **Multer** - Middleware for file uploads
- **JWT (jsonwebtoken)** - Authentication
- **Swagger-UI-Express** - API documentation
- **Body-Parser** - Middleware for parsing request bodies

## 📦 Installation
### Prerequisites
Ensure you have **Node.js** installed on your system.

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

## 🚀 Running the Server
Start the backend server with:
```sh
node index.js
```
The server will be running at: `http://localhost:8080`

## 📖 API Documentation
Swagger API documentation is available at:
[Swagger UI](http://localhost:8080/api-doc/#/)
* First run the server to access it 

## 📝 Usage Instructions
1. **Sign Up** - Create an account using `/api/users/signup`
2. **Sign In** - Authenticate with `/api/users/signin`
3. **Get JWT Token** - Use the returned token for authentication
4. **Authorize** - Save the token (valid for 2 hours) in headers
5. **Access APIs** - Include the token in the `Authorization` header

## 🔑 Authorization
This API uses **JWT-based authentication**. To access protected endpoints:
- Retrieve your JWT token from `/api/users/signin`
- Include it in the **Authorization header** as:
  ```sh
  Authorization: Bearer YOUR_JWT_TOKEN
  ```

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

## 🛠️ Dependencies
```json
{
  "body-parser": "^1.20.3",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "multer": "^1.4.5-lts.1",
  "swagger-ui-express": "^5.0.1"
}
```
## Folder Structure 
![image](https://github.com/user-attachments/assets/c3ca4b44-a23a-4dbe-9af6-725bf554a2d1)


## 🏆 Why This Project Matters
- Follows best practices for backend development
- Implements a **modular & scalable** architecture
- Uses **secure authentication mechanisms** (JWT)
- Well-documented API with Swagger for ease of use

## 🤝 Contributing
Feel free to fork this project and submit pull requests for improvements.

## 📜 License
This project is licensed under the **ISC License**.

---
### 📢 _Want to see this in action? Setup the project and explore the API which will look like this - !_ 🚀