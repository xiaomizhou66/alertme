/* 前后端登录交互 */
$(function () {
    $("#login-btn").click(function () {
        var username = $("#login-username").val();
        var password = $("#login-password").val();
        console.log(username);
        var user = { /* 构造一个后端需要的js对象 */
            "Username": username,
            "Password": password
        }
        $.ajax({
            url: "http://127.0.0.1:8080/api/login",
            type: "post",
            dataType: "json",
            data: JSON.stringify(user),
            /* 这个data是前端用户输入的数据，要提交给后台 */
            /*  JSON.stringify()方法把js对象转变为json格式给后端 */
            success: function (responseData) {
                window.location = "/home";
                console.log("success");
            },
            error: function (responseData) {
                console.log(responseData.responseJSON.message); /* 获取错误提示 */
                console.log(responseData.status); /* 获取服务返回的错误状态码 */
            }

        })
        return false
    })
})

/* $.ajax({})   等价于 构造一个js对象t， var t={？？？}  然后调用ajax方法， $.ajax(t) 
对象构造如下：
var t = {
    url: "http://127.0.0.1:8080/api/login",
    type: "post",
    dataType: "json",
    data: JSON.stringify(user),
    success: function (responseData) {
        console.log("success");
    },
    error: function (responseData) {
        console.log(responseData.responseJSON.message);
        console.log(responseData.status);
    }
} */


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