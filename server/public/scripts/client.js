console.log('JS');
$(document).ready(function () {
    console.log('JQ');
    // on page load, displays db
    getList();
    // click listener to add new action item
    $('#submitBtn').on('click', addNewItem);
    // click listener to delete item from db
    $('.outPut').on('click', '#delete-item', deleteHandler);
    // click listener to mark action item as complete TODO - Toggle!!
    $('.outPut').on('click', '.listItem', markAsComplete);
})

function addNewItem() {
    let newItem = {
        listItem: $('#listItemIn').val()
    }
    console.log('Submit clicked', newItem);

    $.ajax({
        type: 'POST',
        url: '/todo',
        data: newItem
    }).then(function (response) {
        console.log('response from server:', response);
        getList();
        clearInput();
    }).catch(function (error) {
        console.log('error in POST:', error);
        alert('unable to add new item, please try again later')
    });
}

function clearInput() {
    $('#listItemIn').val('');
}

function getList() {
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        console.log(response);
        renderList(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}

function renderList(response) {
    // empty target element
    $('.outPut').empty();

    for (let i = 0; i < response.length; i++) {
        let newRow = $(`
            <div class="listItem" id="${response[i].isComplete}" data-id="${response[i].id}" <p>${response[i].listItem}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="delete-item" data-id="${response[i].id}" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        `)
        // for each action item, append a new div
        $('.outPut').append(newRow);
    }
}

function markAsComplete() {
    let itemId = $(this).data('id');
    let isComplete = $(this).attr("id");
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
}

function deleteHandler() {
    deleteItem($(this).data("id"));
}

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
}


// $(document).ready(function(){
//     $("button").click(function(){
//       $("p").css("color", "red");