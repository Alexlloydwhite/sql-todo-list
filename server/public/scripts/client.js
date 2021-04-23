console.log('JS');
$(document).ready(function () {
    console.log('JQ');
    // on page load, displays db
    getList();
    // click listener to add new action item
    $('#submitBtn').on('click', addNewItem);
    // click listener to delete item from db
    $('.outPut').on('click', '.delete-item', deleteHandler);
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
            <button type="button" class="delete-item" data-id="${response[i].id}">
                Delete
            </button></p>
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