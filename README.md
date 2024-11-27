
# Hall Booking API

This is a simple Node.js-based API for managing room creation, booking, and listing bookings for a hall booking application.

---

## Features

1. **Create Rooms**:
   - Define room details such as seats, amenities, and price per hour.
2. **Book Rooms**:
   - Book a specific room for a customer at a specific date and time.
   - Prevent overlapping bookings for the same room.
3. **List All Rooms**:
   - View all rooms with booking statuses and details.
4. **List All Customers**:
   - Retrieve all customers with their respective booking details.
5. **Customer Booking Summary**:
   - View how many times a customer has booked rooms with detailed booking data.

---

## Technologies Used

- **Node.js**: Server-side runtime environment.
- **Express.js**: Framework for building the REST API.
- **Postman**: For API testing.

---

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone <https://github.com/gokulselvam2911/Hall-Booking.git>
   cd hall-booking-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. The server runs on `http://localhost:3000`.

---

## API Endpoints

### 1. Create a Room

- **URL**: `POST https://hall-booking-wzyh.onrender.com/rooms`
- **Description**: Create a new room.
- **Request Body**:
  ```json
  {
    "roomName": "Conference Room 1",
    "seats": 20,
    "amenities": ["Projector", "Wi-Fi"],
    "pricePerHour": 1000
  }
  ```
- **Response**:
  ```json
  {
    "message": "Room created successfully",
    "roomId": 1
  }
  ```

---

### 2. Book a Room

- **URL**: `POST https://hall-booking-wzyh.onrender.com/book-room`
- **Description**: Book a room for a specific time slot.
- **Request Body**:
  ```json
  {
    "customerName": "John Doe",
    "date": "2024-11-28",
    "startTime": "10:00",
    "endTime": "12:00",
    "roomId": 1
  }
  ```
- **Response**:
  ```json
  {
    "message": "Room booked successfully",
    "bookingId": 1
  }
  ```

---

### 3. List All Rooms

- **URL**: `GET https://hall-booking-wzyh.onrender.com/rooms`
- **Description**: View all rooms and their booking statuses.
- **Response**:
  ```json
  [
    {
      "roomName": "Conference Room 1",
      "bookedStatus": true,
      "bookings": [
        {
          "customerName": "John Doe",
          "date": "2024-11-28",
          "startTime": "10:00",
          "endTime": "12:00"
        }
      ]
    }
  ]
  ```

---

### 4. List All Customers

- **URL**: `GET https://hall-booking-wzyh.onrender.com/customers`
- **Description**: Retrieve customer booking details.
- **Response**:
  ```json
  [
    {
      "customerName": "John Doe",
      "roomName": "Conference Room 1",
      "date": "2024-11-28",
      "startTime": "10:00",
      "endTime": "12:00"
    }
  ]
  ```

---

### 5. Customer Booking Summary

- **URL**: `GET https://hall-booking-wzyh.onrender.com/customers/bookings`
- **Description**: Retrieve a summary of customer bookings.
- **Response**:
  ```json
  [
    {
      "customerName": "John Doe",
      "roomName": "Conference Room 1",
      "date": "2024-11-28",
      "startTime": "10:00",
      "endTime": "12:00",
      "bookingId": 1,
      "bookingDate": "2024-11-28",
      "bookingStatus": "Confirmed"
    }
  ]
  ```

---

## Deployment

The application can be deployed to **Render.com**. Follow these steps:

1. Push the code to a GitHub repository.
2. Connect Render to your GitHub repository.
3. Set the `Build Command` as `npm install` and `Start Command` as `node server.js`.
4. Render will handle the deployment and provide a public URL.

---

## Testing with Postman

1. Import the endpoints into Postman.
2. Test each endpoint with appropriate payloads as described above.
3. Verify successful responses and error handling (e.g., preventing double booking).



