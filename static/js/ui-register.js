/* 前后端注册交互 -------------------------------------------------------------------*/
/* 前端将（构造的）jquery对象集合，转化为json数据给后端 */
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
            url: "/api/register",
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