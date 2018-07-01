package models

import (
    "fmt"
    "regexp"

    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
    "github.com/astaxie/beego"
)

func init() {
    user := beego.AppConfig.String("mysqluser")
    pass := beego.AppConfig.String("mysqlpass")
    url := beego.AppConfig.String("mysqlurl")
    port := beego.AppConfig.String("mysqlport")
    dbUrl := fmt.Sprintf("%s:%s@tcp(%s:%s)/task?charset=utf8", user, pass, url, port)
    orm.RegisterDriver("mysql", orm.DRMySQL)
    orm.RegisterDataBase("default", "mysql", dbUrl)
    orm.RegisterModel(new(Task), new(User))
    orm.RunSyncdb("default", false, true)
}

type User struct {
    Id       int
    Username string
    Password string
    Email    string
    ImageURL string
    Role     int                           // 管理员:1 其它为 0
    Tasks    []*Task `orm:"reverse(many)"` // 设置一对多的反向关系
}

func (u *User) isEmail() bool {
    regEmail := regexp.MustCompile("^\\w+@\\w+\\.\\w{2,4}$")
    return regEmail.MatchString(u.Email)
}

func (u *User) Invalid() bool {
    if len(u.Password) <= 0 || len(u.Username) <= 0 || !u.isEmail() {
        return true
    }
    return false

}

type Task struct {
    Id        int
    Content   string
    User      *User `orm:"rel(fk)" json:"-"` // 设置一对一反向关系(可选)
    Status    int
    StartTime int64
    EndTime   int64
}
