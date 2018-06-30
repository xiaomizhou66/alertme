package routers

import (
	"github.com/xiaomizhou66/alertme/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.LoginController{})
    beego.Router("/register", &controllers.RegisterController{})
    beego.Router("/home", &controllers.HomeController{})

}
