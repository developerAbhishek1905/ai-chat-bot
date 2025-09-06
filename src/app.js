const express = require('express');
const cors = require('cors'); // <-- Add this line

// Importing Routes
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');
const cookieParser = require('cookie-parser');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

module.exports = app;