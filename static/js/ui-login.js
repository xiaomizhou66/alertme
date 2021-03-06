/* 前后端登录交互----------------------------------------------------------------------------- */
/* 从前端获取jquery对象（对象集合）
转化为json格式（将对象集合用JSON.stringify()转化为json格式数据），给后端 */
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
            url: "/api/login",
            type: "post",
            dataType: "json",
            data: JSON.stringify(user),
            /* 这个data是前端用户输入的数据，要提交给后台 */
            /*  JSON.stringify()方法把js对象转变为json格式给后端 */
            success: function (responseTrueData) {
                window.location = "/home";
            },
            error: function (responseFalseData) {
                console.log(responseFalseData);
                // console.log(responseFalseData.responseJSON.message); /* 获取错误提示 */
                console.log(responseFalseData.status); /* 获取服务返回的错误状态码 */
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
/* 前后端主页 个人信息/事件展示 交互 */