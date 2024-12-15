const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const taskRoutes = require('./routers/task');
const db = require('./db/connection');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/tasks', taskRoutes);


// Test DB Connection
db.query('SELECT 1', (err) => {
    if (err) console.error('Database is not connected:', err.message);
    else console.log('Database connection is active.');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

