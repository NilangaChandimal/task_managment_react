const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all tasks
router.get('/', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Add a new task
router.post('/', (req, res) => {
    const { name, description, status } = req.body;
    // console.log("add body===>",body);
    db.query(
        'INSERT INTO tasks (name, description, status) VALUES (?, ?, ?)',
        [name, description, status],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.json({ id: result.insertId, name, description, status });
        }
    );
});

// Edit a task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    // console.log("body===>",body);
    
    db.query(
        'UPDATE tasks SET name = ?, description = ?, status = ? WHERE id = ?',
        [name, description, status, id],
        (err) => {
            if (err) return res.status(500).send(err.message);
            res.json({ id, name, description, status });
        }
    );
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Task deleted successfully' });
    });
});

router.get('/edit/:id', (req, res) => {
    db.query('SELECT * FROM tasks WHERE id = ?',[id], (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// // Update task status
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body; // Get the new status from the request body

//     // SQL query to update the task status
//     db.query(
//         'UPDATE tasks SET status = ? WHERE id = ?',
//         [status, id],
//         (err) => {
//             if (err) return res.status(500).send(err.message);
//             res.json({ id, status });  // Send back the updated status
//         }
//     );
// });




module.exports = router;
