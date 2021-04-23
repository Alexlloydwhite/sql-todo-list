console.log('JS');
$(document).ready(function () {
    console.log('JQ');
    getList();
})

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
            <div data-id="${response[i].id}" <p>${response[i].listItem}
            <button type="button" class="delete-item" data-id="${response[i].id}">
                Delete
            </button></p>
        `)
        // for each action item, append a new div
        $('.outPut').append(newRow);
    }
}