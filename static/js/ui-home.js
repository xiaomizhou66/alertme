/* 用户个人账号信息--前后端交互------------------------------------------------------------- */
/* 从后端获取数据陈列在前端 ,后端传来的都是json格式的，只需要从中获取属性值给前端html中即可*/
$(function () {
    $.ajax({
        url: "/api/user",
        type: "get",
        dataType: "json",
        /* data: 代表发送给后端的数据，这没有发送数据，不存在data*/
        success: function (responseTrueData) {
            var imgurl = responseTrueData.ImageURL;
            $("#imgurl").attr("src", imgurl);
            $("#user-id").html('<span class="label label-default">' + "ID:" + responseTrueData.Id + '</span>');
            $("#user-name").html('<span class="label label-success">' + "账号:" + responseTrueData.Username + '</span>');
            $("#user-email").html('<span class="label label-info">' + "邮箱:" + responseTrueData.Email + '</span>');
            var n = 0;
            if (responseTrueData.Tasks != null) {
                n = responseTrueData.Tasks.length;
            }
            $("#badge").text(n);
        },
        error: function (responseFalseData) {
            console.log(responseFalseData.responseJSON.massage);
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

/* 待办事项列表展现 ---------------------------------------------------------------------------*/
/* 从后端获取数据来展现 */
$(function () {
    $.ajax({
        url: "api/task",
        type: "get",
        dataType: "JSON",
        success: function (responseTrueData) {
            var n = responseTrueData.length;
            var htmltotal = "";
            for (var i = 0; i < n; i++) {
                var inputjsoni = responseTrueData[i].Content;
                var starttimejsoni = parseInt(responseTrueData[i].StartTime);
                var endtimejsoni = parseInt(responseTrueData[i].EndTime);
                var timejsoni = endtimejsoni - starttimejsoni; /* 这里错误了，下面就不会执行了？所以结果不出来的话要看console端是不是有错误的 */
                var htmlinputi = '<li class="list-group-item ">' + '<input type="checkbox" name="things" id="things1" />' + inputjsoni;
                var htmlspani = '<span class="badge">' + timejsoni + '</span>'
                var svghtmli = '<svg class="icon icon-del" aria-hidden="true"><use xlink:href="#icon-shanchu1"></use></svg><svg class="icon icon-edit" aria-hidden="true"><use xlink:href="#icon-bianji"></use></svg><svg class="icon icon-compelete" aria-hidden="true"><use xlink:href="#icon-wancheng"></use></svg>';
                var htmlclearfloati = '<div class="clearfloat"></div></li>';
                htmltotal = htmltotal + htmlinputi + svghtmli + htmlclearfloati;
                /* 删除待办事项 已完成事项转移 */
                $("#list-group1").on("click", ".list-group-item .icon-del", function () {
                    $(this).parent().remove();
                });
                $("#list-group1").on("click", ".list-group-item .icon-compelete", function () {
                    $(this).parent().appendTo($("#list-group2"));
                });
            }
            $("#list-group1").html(htmltotal);

        },
        error: function () {
            console.log("error");
        },
    })
    return false;
})

/* 以下是添加到html的文档格式 */
/* 

 '<li class="list-group-item ">'
    '<input type="checkbox" name="things" id="things1" />1'
    <span class="badge">1</span>
    <svg class="icon icon-del" aria-hidden="true">
        <use xlink:href="#icon-shanchu1"></use>
    </svg>
    <svg class="icon icon-edit" aria-hidden="true">
        <use xlink:href="#icon-bianji"></use>
    </svg>
    <svg class="icon icon-complete" aria-hidden="true">
        <use xlink:href="#icon-wancheng"></use>
    </svg>
    <div class="clearfloat"> </div>
 </li>
*/



/* 新建任务后端交互新建-----------------------------------------------------------------------*/
/* $(function () {
    $("#modal-footer-submit").click(function () {
        var titlejs = $("#add-title");
        var contentjs = $("#add-content");
        var startimejs = $("#add-startime");
        var endtimejs = $("#add-endtime");
        var user = {

        }

    })
}) */

/* 新建任务时间选择 */
$(function () {
    $('#datetimepicker').datetimepicker();
})