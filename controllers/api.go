package controllers

import (
    "github.com/astaxie/beego"
    "github.com/astaxie/beego/orm"
    "fmt"
    "github.com/xiaomizhou66/alertme/models"
    "encoding/json"
    "time"
)

const (
    IMAGE_URL   = "http://p1teq0wgy.bkt.clouddn.com/1514720137WechatIMG13.jpeg"
    COOKIE_NAME = "alterme"
    CURR_USER   = "currUser"
)

// API 继承了 API 返回的数据都是 JSON 数据
type API struct {
    beego.Controller
}

func (api *API) StaMsg(code int, msg interface{}) {
    api.Data["json"] = map[string]interface{}{
        "code":    code,
        "message": msg,
    }
}

// Auth 继承 Auth 请求前必须经过 cookie 鉴定
type Auth struct {
    API
}

func (c *Auth) Prepare() {
    ck, err := c.Ctx.Request.Cookie(COOKIE_NAME)
    if err != nil {
        c.Ctx.Output.Status = 401
        c.StaMsg(401, err.Error())
        c.ServeJSON()
        return
    }
    if ck.Expires.After(time.Now()) {
        c.Ctx.Output.Status = 401
        c.StaMsg(401, "cookie is expires")
        c.ServeJSON()
        return
    }
    var u = models.User{
        Username: ck.Value,
    }
    fmt.Printf("%#v", u)

    o := orm.NewOrm()
    if err := o.Read(&u, "Username"); err != nil {
        c.Ctx.Output.Status = 401
        c.StaMsg(401, "unauthorized")
        c.ServeJSON()
        return
    }
    c.Data[CURR_USER] = u

}

// Manager 登录注册 api 接口 管理
type Manager struct {
    API
}

func (c *Manager) Register() {
    var u models.User
    if err := json.Unmarshal(c.Ctx.Input.RequestBody, &u); err != nil {
        c.Ctx.Output.Status = 400
        c.StaMsg(400, err.Error())
        c.ServeJSON()
        return
    }

    if u.Invalid() {
        c.Ctx.Output.Status = 400
        c.StaMsg(400, "username/password/email can't empty")
        c.ServeJSON()
        return
    }

    o := orm.NewOrm()
    if err := o.Read(&u, "Username"); err != nil {

        u.ImageURL = IMAGE_URL
        id, err := o.Insert(&u)
        if err != nil {
            c.StaMsg(500, err.Error())
            c.ServeJSON()
            return
        }

        c.StaMsg(200, fmt.Sprintf("uid=%d", id))
        c.ServeJSON()
        return
    }

    c.Ctx.Output.Status = 400
    c.StaMsg(400, fmt.Sprintf("username %s already exist", u.Username))
    c.ServeJSON()

}

func (c *Manager) Login() {
    var u models.User
    if err := json.Unmarshal(c.Ctx.Input.RequestBody, &u); err != nil {
        c.Ctx.Output.Status = 400
        c.StaMsg(400, err.Error())
        c.ServeJSON()
        return
    }

    o := orm.NewOrm()
    if err := o.Read(&u, "Username", "Password"); err != nil {
        c.Ctx.Output.Status = 403
        c.StaMsg(403, "username/password incorrect")
        c.ServeJSON()
        return
    }

    c.StaMsg(200, "success")

    c.Ctx.Output.Cookie(COOKIE_NAME, u.Username)
    c.ServeJSON()

}

type User struct {
    Auth
}

func (c *User) Get() {
    c.Data["json"] = c.Data[CURR_USER]
    c.ServeJSON()
}
