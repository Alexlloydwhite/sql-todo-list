console.log('JS');
$(document).ready(function () {
    console.log('JQ');
    // on page load, displays db
    getList();
    // click listener to delete item from db
    $('.outPut').on('click', '#delete-item', deleteHandler);
    // click listener to mark action item as complete TODO - Toggle!!
    // $('.outPut').on('click', '.listItem', markAsComplete);
    //click listener to trigger from to add new task!
    $('#newTaskBtn').on('click', addNewTask);
    // click listener for submit new item 
    $('.outPut').on('click', '#submitBtn', addNewItem);
    // click listener for cancelling new task
    $('.outPut').on('click', '#cancelNewTask', getList);
    // click listener for edit task
    $('.outPut').on('click', '#edit-item', createEditInput);
    // click listener to post edited task
    $('.outPut').on('click', '#submitEdit', editSubmitHandler);
})

// creates input field and buttons to add new list item
function addNewTask() {
    $('.outPut').append(`
        <li class="inputForm"> 
            <input type="text" id="listItemIn" placeholder="enter new item..."/>

            <div id="inputIcons">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="submitBtn" class="bi bi-save" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="cancelNewTask" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
        </li>
    `)
} // end addNewTask

// sends new list item to server
function addNewItem() {
    // new list item is the value of input field created with addNewTask
    let newItem = {
        listItem: $('#listItemIn').val()
    }
    console.log('Submit clicked', newItem);
    // ajax sends to server..
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: newItem
    }).then(function (response) { 
        console.log('response from server:', response);
        // after POST, GET new data!
        getList();
    }).catch(function (error) {
        // catches errors..
        console.log('error in POST:', error);
        alert('unable to add new item, please try again later')
    });
} // end addNewItem

// sends GET request to server to GET table "todo-list" from database
function getList() {
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        console.log(response);
        // renders the DOM to display table "todo-list"
        renderList(response);
    }).catch(function (error) {
        // catches errors
        console.log('error in GET', error);
    });
} // end getList

// displays table "todo-list" on DOM
function renderList(response) {
    // empty target element
    $('.outPut').empty();
    // loop thru table "todo-list", add list items and buttons
    for (let i = 0; i < response.length; i++) {
        let newRow = $(`
            <li class="listItem" id="${response[i].isComplete}" data-id="${response[i].id}" 
                <h5>
                    ${response[i].listItem}
                </h5>
            
            <div id="icons">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="edit-item" data-id="${response[i].id}" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="${response[i].isComplete}" data-id="${response[i].id}" class="bi bi-file-check" viewBox="0 0 16 16">
                <path d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                </svg>                
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="delete-item" data-id="${response[i].id}" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </div>
            </li>
        `)
        // for each action item, append a new list item
        $('.outPut').append(newRow);
    } // end loop
} // end renderList

// toggle item as completed
function markAsComplete() {
    let itemId = $(this).data('id'); // this is the item's id, from SQL.
    let isComplete = $(this).attr("id"); // this is the boolean.
    console.log('clicked!', itemId, isComplete);
    $.ajax({
        method: 'PUT',
        url: `/todo/${itemId}`,
        data: {
            isComplete: isComplete
        }
    })
        .then(response => {
            getList();
        })
        .catch(error => {
            console.log('error on action item complete', error);
        });
} // end markAsComplete

// creates an input and button for editing an item
function createEditInput() {
    // targets the li element of the edit
    let el = $(this).closest("li")
    console.log(el);
    // defines id of item to edit
    let itemId = $(this).data("id");
    // empty the element and replace the list item with an input field and submit btn
    el.empty().append(`
        <input class="edit-input" type="text"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="submitEdit" viewBox="0 0 16 16">
        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
        </svg>
    `) 
    // get request to server to insert list item into input 
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        // loop thru todo-list table 
        for (let i = 0; i < response.length; i++) {
            // if list item is target list item
            if (response[i].id === itemId) {
                // add list item value into input
                $('.edit-input').val(`${response[i].listItem}`);
                // add class to submit button to use for POST
                $('#submitEdit').addClass(`${response[i].id}`)
            }
        }
        // log error, if any
    }).catch(function (error) {
        console.log('error in GET', error);
    });
} // end createEditInput

// click handler for submit edit item button
function editSubmitHandler() {
    // grabs class of submitEdit button, converts from string to number
    let itemId = Number($(this).attr("class"));
    console.log('item id is:', itemId)
    // passing this ID as argument for function to send edited item to server
    sendEditedItem(itemId);
} // end editSubmitHandler

// sends edit item to server to add to DB
function sendEditedItem(itemId) {
    // grabs new list item, based on edits made in the input
    let editedListItem = $('.edit-input').val();
    $.ajax({
        method: 'PUT',
        url: `/todo/${itemId}`,
        data: {
            editedListItem: editedListItem
        }
    })
        .then(response => {
            getList();
        })
        .catch(error => {
            console.log('error on action item complete', error);
        });
} // end sendEditedItem

// finds id of item to delete and passes as argument to deleteItem function
function deleteHandler() {
    deleteItem($(this).data("id"));
} // end deleteHandler

// sends DELETE request to server to delete item based on ID.
function deleteItem(itemId) {
    $.ajax({
        method: 'DELETE',
        url: `/todo/${itemId}`
    })
        .then(response => {
            console.log('deleted item');
            getList();
        })
        .catch(error => {
            alert(`Error on delete`, error);
        });
} // end deleteItem
