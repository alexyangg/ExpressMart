# ExpressMart 🛒

ExpressMart is a full-stack marketplace application built using the MERN stack (MongoDB, Express.js, React, Node.js) for managing products and orders.

## Features

- Create, browse, edit, and delete products
- RESTful API for communication between frontend and backend
- Responsive design for desktop and mobile
- Light and dark mode

## Upcoming Features

- User authentication (login/register)
- Add items to cart
- Place orders
- View order history
- Detailed product information

## Tech Stack

**Frontend**

- React
- Vite
- Chakra UI

**Backend**

- Node.js
- Express.js
- MongoDB

## Installation

### Prerequisites

- Node.js
- MongoDB

### Clone the Repository

```
git clone https://github.com/alexyangg/express-mart.git
cd express-mart
```

### Install Dependencies

**Backend**

```
cd backend
npm install
```

**Frontend**

```
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Run the Application

**Backend**

```
cd backend
npm run dev
```

**Frontend**

```
cd frontend
npm run dev
```

### Access the Application

The frontend will be available at: http://localhost:5173

The backend API will run on: http://localhost:5000
