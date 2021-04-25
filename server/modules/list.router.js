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
    // pull item id from request and assign to variable
    let itemId = req.params.id;
    // pull is complete boolean from request and assign to variable
    let isComplete = req.body.isComplete;
    // fact checking..
    console.log('req.params:', req.params);
    console.log('req.params.id:', itemId);
    console.log('req.body.isComplete:', req.body.isComplete);

    let editedListItem = req.body.editedListItem
    console.log(editedListItem);

    // blank query variable to be updated by conditional statement
    let queryText = ``;

    // this code block checks the boolean value for isComplete and 
    // makes a SQL query dependant on it. This is what allows toggle on client side!
    if (isComplete === "false") {
        queryText = `UPDATE "todo-list" SET "isComplete" = true WHERE "id" = $1;`
    }
    if (isComplete == "true") {
        queryText = `UPDATE "todo-list" SET "isComplete" = false WHERE "id" = $1;`
    }
    
    // the code clock executes if edited item was sent
    // changes value of listItem in db to whatever the edited value is
    if(editedListItem){
        queryText = `UPDATE "todo-list" SET "listItem" = '${editedListItem}' WHERE "id" = $1;`
    }

    // sending query to the pool to send to DB
    pool.query(queryText, [itemId])
        .then(response => {
            // after query complete send status OK
            res.sendStatus(200);
        })
        .catch(error => {
            // if error, log error and send status 'Internal Server Error!!' 
            console.log('error', error);
            res.sendStatus(500);
        })
})

router.delete('/:id', (req, res) => {
    // pull item id from request and assign to variable 
    let itemToDelete = req.params.id;
    // SQL query text..
    let queryText = `DELETE FROM "todo-list" WHERE id=$1;`;

    // sends query to pool to send to server
    pool.query(queryText, [itemToDelete])
        .then(result => {
            // after query complete send status OK
            res.sendStatus(200);
        })
        .catch(error => {
            // if error, log error and send status 'Internal Server Error!'
            console.log('delete failed:', error);
            res.sendStatus(500);
        })
})

// export this module!
module.exports = router;