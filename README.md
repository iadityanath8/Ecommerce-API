# eCommerce API

A RESTful API for an eCommerce platform built with **Express.js** and **Node.js**. This API allows managing products, users, orders, and authentication for an online store.

---

## Features

- User authentication and authorization (JWT-based)
- Product CRUD operations
- Category management
- Order creation and tracking
- Shopping cart functionality
- Role-based access (Admin / User)

---

## Technologies Used

- Node.js
- Express.js
- MongoDB (or your DB choice)
- Mongoose (for MongoDB object modeling)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- dotenv for environment variables

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

4. **Run the server**

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

---

## API Endpoints

### Auth

| Method | Endpoint         | Description           |
|--------|----------------|---------------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login a user        |

### Products

| Method | Endpoint             | Description          |
|--------|--------------------|--------------------|
| GET    | /api/products       | Get all products    |
| GET    | /api/products/:id   | Get product by ID   |
| POST   | /api/products       | Create a new product (Admin only) |
| PUT    | /api/products/:id   | Update a product (Admin only) |
| DELETE | /api/products/:id   | Delete a product (Admin only) |

### Orders

| Method | Endpoint         | Description          |
|--------|----------------|--------------------|
| GET    | /api/orders     | Get all orders (Admin only) |
| GET    | /api/orders/:id | Get order by ID     |
| POST   | /api/orders     | Create a new order  |
| PUT    | /api/orders/:id | Update order status (Admin only) |

### Users

| Method | Endpoint         | Description          |
|--------|----------------|--------------------|
| GET    | /api/users      | Get all users (Admin only) |
| GET    | /api/users/:id  | Get user by ID      |
| PUT    | /api/users/:id  | Update user info    |
| DELETE | /api/users/:id  | Delete user (Admin only) |

---

## Error Handling

All responses are returned in JSON format. Example:

```json
{
  "success": false,
  "message": "Resource not found"
}
```

---

## License

This project is licensed under the MIT License.

---

## Contact

Your Name – [your.email@example.com](mailto:your.email@example.com)  
GitHub: [https://github.com/your-username](https://github.com/your-username)
