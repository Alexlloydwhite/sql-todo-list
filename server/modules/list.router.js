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

// Adds a new action item to the todo list.
router.post('/', (req, res) => {
    // new item = incoming item from client.
    let newItem = req.body;
    console.log('adding new item:', newItem);

    // SQL query to add new action item
    let queryText = `INSERT INTO "todo-list" ("list-item")
                        VALUES ($1);`;
    pool.query(queryText, [newItem.listItem])
        .then(result => {
            // sending status 201, confirming that item was added
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`error adding new item`, error);
            // status 500 = Internal Server Error
            res.sendStatus(500);
        });
});

// export this module!
module.exports = router;