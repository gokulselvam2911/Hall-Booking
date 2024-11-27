const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// In-memory storage
let rooms = [];
let bookings = [];
let bookingCounter = 1;

// 1. Create a Room
app.post("/rooms", (req, res) => {
    const { roomName, seats, amenities, pricePerHour } = req.body;
    const roomId = rooms.length + 1;
    rooms.push({ roomId, roomName, seats, amenities, pricePerHour, bookings: [] });
    res.status(201).json({ message: "Room created successfully", roomId });
});

// 2. Book a Room
app.post("/book-room", (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    const room = rooms.find(r => r.roomId === roomId);
    if (!room) {
        return res.status(404).json({ message: "Room not found" });
    }

    // Check if the room is already booked for the requested time
    const isConflict = bookings.some(booking =>
        booking.roomId === roomId &&
        booking.date === date &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
            (endTime > booking.startTime && endTime <= booking.endTime))
    );

    if (isConflict) {
        return res.status(400).json({ message: "Room is already booked for the requested time" });
    }

    const bookingId = bookingCounter++;
    bookings.push({ bookingId, customerName, date, startTime, endTime, roomId });
    res.status(201).json({ message: "Room booked successfully", bookingId });
});

// 3. List All Rooms with Booking Data
app.get("/rooms", (req, res) => {
    const roomData = rooms.map(room => ({
        roomName: room.roomName,
        bookedStatus: bookings.some(b => b.roomId === room.roomId),
        bookings: bookings.filter(b => b.roomId === room.roomId)
    }));
    res.json(roomData);
});

// 4. List All Customers with Booked Data
app.get("/customers", (req, res) => {
    const customerData = bookings.map(booking => ({
        customerName: booking.customerName,
        roomName: rooms.find(r => r.roomId === booking.roomId)?.roomName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime
    }));
    res.json(customerData);
});

// 5. List How Many Times a Customer has Booked Rooms
app.get("/customers/bookings", (req, res) => {
    const customerSummary = bookings.map(booking => ({
        customerName: booking.customerName,
        roomName: rooms.find(r => r.roomId === booking.roomId)?.roomName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking.bookingId,
        bookingDate: booking.date,
        bookingStatus: "Confirmed"
    }));
    res.json(customerSummary);
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
