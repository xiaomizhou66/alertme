[toc]
### 一，后端 api 接口文档说明

### 1. 用户登录
> 略

### 2. 用户注册
> 略

### 3. 获取用户信息
> 略

### 4. 创建任务

> /api/task

> 登录

Request

```
POST /api/task  Http/1.1
Content-Type: application/json

{
	"Content":"学习 go 后端开发"
    "StartTime": 1579817238975,
    "EndTime":1580989328234
}
```

Response

```json
{
    "code": 200,
    "message": "task id=3"
}
```
请求字段说明：

| 字段       | 取值     | 说明   |
| :------- | :----- | :--- |
| Content | string | 任务内容 |
| StartTime | int | 开始时间时间戳   |
| EndTime |int    | 结束时间时间戳|

返回字段说明：

| 字段     | 取值     | 说明        |
| :----- | :----- | :-------- |
| code | int   | 状态码 |
| message  | string | 结果信息     |



### 5. 获取所有 任务

> /api/task

> 登录后才能获取

Request

```
GET /api/task  Http/1.1
```

Response

```json
[
    {
        "Id": 1,
        "Content": "学习 go 后端开发",
        "Status": 0,
        "StartTime": 0,
        "EndTime": 0
    },
    {
        "Id": 2,
        "Content": "学习 go 后端开发",
        "Status": 0,
        "StartTime": 0,
        "EndTime": 0
    },
    {
        "Id": 3,
        "Content": "学习 js 前端开发",
        "Status": 0,
        "StartTime": 0,
        "EndTime": 0
    }
]
```
请求字段说明：无

返回字段说明：

| 字段     | 取值     | 说明        |
| :----- | :----- | :-------- |
| Id | int   | 任务的 id |
| Content  | string | 任务内容     |
| Status |int| 0 代表未完成,1 代表完成了|
| StartTime |int | 开始时间戳|
| EndTime | int | 结束时间戳|
