const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Simplified CORS for testing

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes placeholder
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/tasks', require('./routes/taskRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Secure Task API is running!', version: '1.0.0' });
});

// Error handling middleware (placeholder)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

module.exports = app;
