package routers

import (
    "github.com/xiaomizhou66/alertme/controllers"
    "github.com/astaxie/beego"
)

func init() {
    // 没有 api 开头返回的都是页面
    beego.Router("/", &controllers.LoginController{})
    beego.Router("/register", &controllers.RegisterController{})
    beego.Router("/home", &controllers.HomeController{})


    // api 开头的都是返回 json 数据
    beego.Router("/api/user", &controllers.User{})
    beego.Router("/api/register", &controllers.Manager{}, "post:Register")
    beego.Router("/api/login", &controllers.Manager{}, "post:Login")


}
