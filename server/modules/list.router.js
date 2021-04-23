const express = require('express');
const router = express.Router();

const pool = require('./pool');

// GET route to grab all of the todo list items from the DB
router.get('/', (req, res) => {
    // SQL query to send to postgres
    let queryText = 'SELECT * FROM "todo-list" ORDER BY "id";';
    //sending query to PG..
    pool.query(queryText).then(result => {
            res.send(result.rows);
        })
        // on error catch and display error
        .catch(error => {
            console.log('error getting todo list', error);
            // status 500 = Internal Server Error
            res.sendStatus(500);
        });
});

module.exports = router;