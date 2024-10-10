const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/transactionData', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected'))
    .catch(err => console.log('Database connection error: ', err));

// CORS Middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Route Imports
const task01Route = require('./task01');
const task02Route = require('./task02');
const task03Route = require('./task03');

// Route Middleware
app.use('/task1', task01Route);
app.use('/task2', task02Route);
app.use('/task3', task03Route);

// Server Listener
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
