// A snippet of a project I worked on, which involves setting up a backend API using Node.js and Express, with a connection to a PostgreSQL database:

// using javascript

const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'mydatabase',
    password: 'password',
    port: 5432,
});

app.use(express.json());

app.get('/api/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/items', async (req, res) => {
    try {
        const { name, description } = req.body;
        const result = await pool.query(
            'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// My code is about creating a RESTful API with basic CRUD operations, a common requirement now in many of my projects.
