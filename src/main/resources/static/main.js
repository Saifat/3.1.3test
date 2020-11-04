const url = 'http://localhost:8080/admin/getAll';


$(document).ready(); {
    fillTable();
}
function fillTable() {
    fetch(url).then(
        response => {
            response.json().then(
                data => {
                    let temp = "";
                    data.forEach((aUser) => {
                        temp += "<tr>";
                        temp += "<td>" + aUser.id + "</td>";
                        temp += "<td>" + aUser.firstName + "</td>";
                        temp += "<td>" + aUser.lastName + "</td>";
                        temp += "<td>" + aUser.age + "</td>";
                        temp += "<td>" + aUser.username + "</td>";
                        temp += "<td>" + aUser.roles[0].name  + "</td>";

                        temp += "<td>" +
                            "<a class='btn btn-info' role='button' onclick='fillEditModal(" + aUser.id + ")'  data-toggle='modal' data-target='#editModal'>Edit</a>" +
                            "</td>";
                        temp += "<td>" +
                            "<a class='btn btn-danger' role='button' onclick='fillDeleteModal(" + aUser.id + ")' data-toggle='modal' data-target='#deleteModal'>Delete</a>" +
                            "</td>"
                        temp += "</tr>"
                    })
                    console.log(temp);
                    $('table tbody').empty().append(temp);
                });
        });
}
function fillEditModal(id) {
    $.get("/admin/" + id, function (userJSON) {
        $('#id').val(userJSON.id);
        $('#firstName').val(userJSON.firstName);
        $('#lastName').val(userJSON.lastName);
        $('#age').val(userJSON.age);
        $('#username').val(userJSON.username);
        $('#password').val(userJSON.password);
        $('#rolesEdit').val(userJSON.roles[0].name);
    });
}
function fillDeleteModal(id) {
    $.get("/admin/" + id, function (userJSON) {
        $('#id1').val(userJSON.id);
        $('#firstName1').val(userJSON.firstName);
        $('#lastName1').val(userJSON.lastName);
        $('#age1').val(userJSON.age);
        $('#username1').val(userJSON.username);
        $('#password1').val(userJSON.password);
    });
}
$("#buttonSubmitNew").on('click', (event) => {
    event.preventDefault();
    let user = {
        name: $("#firstNameNewUser").val(),
        lastName: $("#lastNameNewUser").val(),
        age: $("#ageNewUser").val(),
        email: $("#emailNewUser").val(),
        password: $("#passwordNewUser").val(),
        roles: $("#rolesNewUser").val()
    };
    $.ajax({
        url: "/admin",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(user)
    }).done(() => {
        fillTable();
    })
});
$("#buttonSubmitEdit").on('click', (event) => {
    event.preventDefault();
    let user = {
        id: $("#id").val(),
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        age: $("#age").val(),
        username: $("#username").val(),
        password: $("#password").val(),
        roles: $("#rolesEdit").val()
    };
    $.ajax({
        url: "/admin/edit",
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(user)
    }).done(() => {

        fillTable();
    })
});
$("#buttonSubmitDelete").on('click', (event) => {
    event.preventDefault();
    let user = {
        id: $("#idEdit").val(),
        name: $("#firstNameEdit").val(),
        lastName: $("#lastNameEdit").val(),
        age: $("#ageEdit").val(),
        email: $("#emailEdit").val(),
        password: $("#passwordEdit").val(),
        roles: $("#rolesEdit").val()
    };
    $.ajax({
        url: "/admin/",
        type: "DELETE",
        dataType: "text"
    }).done(() => {
        $("#deleteUserModal").modal('hide');
        fillTable();
    })
});



// });

