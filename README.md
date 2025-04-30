
# Train Seat Reservation System

## Problem Description

The **Train Seat Reservation System** is designed for a train with 80 seats, and the seats are arranged as follows:

- **7 seats per row** for the first 11 rows.
- **3 seats in the last row.**
- **A user can reserve up to 7 seats** at a time.
- **Booking priority** is given to seats within the same row.
- If there aren't enough seats in a single row, the system will try to book adjacent seats in nearby rows.
- **Users can book as many tickets as they want** until the coach is full.
- Once a seat is booked by a user, no other user can reserve that seat until it is canceled or reset.

Additional features include:
- **User login and signup** functionality.
- **Seat reservation management** to prevent double booking of the same seat.

---

## Tech Stack

- **Frontend**: React.js (JSX)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS

### Key Features

- **Responsive Design**: Ensures a seamless user experience across various devices.
- **Seat Booking System**: Manages seat bookings based on availability, prioritizing the same row booking and adjacent row booking if needed.
- **User Authentication**: Users can sign up, log in, and manage bookings securely.
- **Input Validation**: User inputs are validated and sanitized before being stored in the database.
- **Error Handling**: Proper error messages for invalid inputs, unauthorized access, and unavailable resources.
- **Dynamic Routing**: React-JSX file-based routing with dynamic routes for managing user-related operations.

---

## Backend Routes

### 1. **User Authentication**

#### Signup
- **URL**: `http://localhost:5000/api/auth/signup`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "user1",
    "password": "securePassword"
  }
  ```
- **Response**:
  - **Success**: `201 Created`
  - **Error**: `400 Bad Request` if fields are missing or invalid.

#### Login
- **URL**: `http://localhost:5000/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "user1",
    "password": "securePassword"
  }
  ```
- **Response**:
  - **Success**: `200 OK` with token
  - **Error**: `401 Unauthorized` if credentials are incorrect.

---

### 2. **Seat Reservation**

#### Book Seats
- **URL**: `http://localhost:5000/api/seats/book`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "seats": [1, 2, 3],
    "count": 3
  }
  ```
- **Response**:
  - **Success**: `200 OK` with booked seats.
  - **Error**: `400 Bad Request` if seat count is invalid, `404 Not Found` if seats are already reserved.

#### Reset All Seats
- **URL**: `http://localhost:5000/api/seats/reset`
- **Method**: `POST`
- **Request Body**: None
- **Response**:
  - **Success**: `200 OK` with confirmation of reset.
  - **Error**: `500 Internal Server Error` if something goes wrong.

---

## Folder Structure

```plaintext
frontend
├── dist/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── SeatGrid.jsx
│   ├── pages/
│   │   ├── Booking.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   ├── api.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── postcss.config.js
├── tailwind.config.js
├── .gitignore
├── eslint.config.js
backend
├── controllers/
├── middlewares/
├── models/
├── node_modules/
├── routes/
├── utils/
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

---

## Installation

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **MongoDB Atlas account** for database hosting

### Steps to Set Up

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/train-seat-reservation.git
   cd train-seat-reservation
   ```

2. **Backend Setup**

   Navigate to the backend folder and install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**

   Navigate to the frontend folder and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. **MongoDB Setup**

   Create a MongoDB Atlas account and set up a new cluster. Obtain the connection string and replace it in the `backend/.env` file. Make sure to set the necessary environment variables for the database.

5. **Run the Application**

   Start the backend server:

   ```bash
   cd backend
   npm start
   ```

   Start the frontend development server:

   ```bash
   cd ../frontend
   npm start
   ```

6. **Access the Application**

   - The backend deployed at `https://train-ticket-booking-system-v94x.onrender.com`.
   - The frontend deployed at `https://newseatbooking.netlify.app/`.

---

## API Documentation

### 1. **User Authentication**

#### Signup

- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "user1",
    "password": "securePassword"
  }
  ```
- **Response**:
  - **Success**: `201 Created`
  - **Error**: `400 Bad Request` if fields are missing or invalid.

#### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "user1",
    "password": "securePassword"
  }
  ```
- **Response**:
  - **Success**: `200 OK` with token
  - **Error**: `401 Unauthorized` if credentials are incorrect.

---

### 2. **Seat Reservation**

#### Book Seats

- **URL**: `/api/seats/book`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "seats": [1, 2, 3],
    "count": 3
  }
  ```
- **Response**:
  - **Success**: `200 OK` with booked seats.
  - **Error**: `400 Bad Request` if seat count is invalid, `404 Not Found` if seats are already reserved.

#### Reset All Seats

- **URL**: `/api/seats/reset`
- **Method**: `POST`
- **Request Body**: None
- **Response**:
  - **Success**: `200 OK` with confirmation of reset.
  - **Error**: `500 Internal Server Error` if something goes wrong.

---

## Deployment

- **Backend Deployment**: The backend is deployed on [Render](https://render.com/) or similar platforms.
- **Frontend Deployment**: The frontend is deployed on [Netlify](https://www.netlify.com/) or similar platforms.

For more information on deployment steps, check the documentation on the respective platforms for backend and frontend deployment.

---

## Conclusion

This **Train Seat Reservation System** provides an efficient and easy-to-use interface for booking train seats, with priority given to booking seats in the same row. It includes features for user authentication, seat reservation, and resetting bookings. The app follows best practices for code cleanliness, error handling, and input validation.
