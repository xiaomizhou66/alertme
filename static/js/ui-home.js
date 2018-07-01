/* 用户个人账号信息------------------------------------------------------------------------- */
$(function () {
    var img = $("#imgurl");
    $.ajax({
        url: "/api/user",
        type: "get",
        dataType: "json",
        /* data: 代表发送给后端的数据，这没有发送数据，不存在data*/
        success: function (requestResponseData) {
            console.log(requestResponseData);
            var imgurl = requestResponseData.ImageURL;
            $("#imgurl").attr("src", imgurl);
            $("#user-id").html('<span class="label label-default">' + "ID:" + requestResponseData.Id + '</span>');
            $("#user-name").html('<span class="label label-success">' + "账号:" + requestResponseData.Username + '</span>');
            $("#user-email").html('<span class="label label-info">' + "邮箱:" + requestResponseData.Email + '</span>');
            var n = 0;
            if (requestResponseData.Tasks != null) {
                n = requestResponseData.Tasks.length;
            }
            $("#badge").text(n);
        },
        error: function (requestResponseData) {
            console.log(requestResponseData.responseJSON.massage);
        }
    });
    return false
})

/* 退出登录 -------------------------------------------------------------------------*/
$(function () {
    $("#home-logout").click(function () {
        window.location = "/";
    })
})
/* 待办事项操作 */
/* 删除待办事项 已完成事项标注 */
$(function () {
    var listGropItems = $("#list-group1 .list-group-item");
    var n = listGropItems.length;
    for (var i = 0; i < n; i++) {
        var del = listGropItems.eq(i).children(".icon").eq(0);
        var finish = listGropItems.eq(i).children(".icon").eq(2);
        del.click(function () {
            $(this).parent().remove();
        });
        finish.click(function () {
            $(this).parent().appendTo($("#list-group2"));
        })
    }
})