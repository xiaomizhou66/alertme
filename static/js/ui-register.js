/* 前后端注册交互 */
$(document).ready(function () {
    $("#register-btn").click(function () {
        var username = $("#register-username").val();
        var password = $("#register-password").val();
        var phonenumber = $("#register-phonenumber").val();
        var emailaddress = $("#register-emailaddress").val();
        var user = {
            "Username": username,
            "Password": password,
            "Phone": phonenumber,
            "Email": emailaddress
        }
        $.ajax({
            url: "http://127.0.0.1:8080/api/register",
            type: "post",
            dataType: "json",
            data: JSON.stringify(user),
            success: function (responseData) {


                window.location = "/";
            },
            error: function (responseData) {
                console.log(responseData);
            }
        })
        return false;
    })
})