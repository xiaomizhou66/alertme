package routers

import (
	"github.com/xiaomizhou66/alertme/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
}
