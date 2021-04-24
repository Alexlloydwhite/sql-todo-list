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
    let queryText = `INSERT INTO "todo-list" ("listItem")
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

router.put('/:id', (req, res) => {
    let itemId = req.params.id;
    let isComplete = req.body.isComplete;
    console.log('req.params:', req.params);
    console.log('req.params.id:', itemId);
    console.log('req.body.isComplete:', req.body.isComplete);

    let queryText = ``;

    if (isComplete === "false") {
        queryText = `UPDATE "todo-list" SET "isComplete" = true WHERE "id" = $1;`
    }
    if (isComplete == "true") {
        queryText = `UPDATE "todo-list" SET "isComplete" = false WHERE "id" = $1;`

    }

    pool.query(queryText, [itemId])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error', error);
            res.sendStatus(500);
        })
})

router.delete('/:id', (req, res) => {
    const itemToDelete = req.params.id;
    const queryText = `DELETE FROM "todo-list" WHERE id=$1;`;

    pool.query(queryText, [itemToDelete])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('delete failed:', error);
            res.sendStatus(500);
        })
})

// export this module!
module.exports = router;