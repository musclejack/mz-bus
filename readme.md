#### mz-bus
###### koa2 + mysql 微信公众号开发项目
主要操作，提供数据库接口以及相应session验证，前后端界面

还有好多好多东西没做就烂尾了。。有空再补上

##### 数据表简介：
* users: 
    user_id
    openid
    name
    subscribe
    tele
    name

* orders:
    order_id
    money
    openid
    name
    tele
    up_addr:""
    down_addr:""
    load_id
    order_time: 
    driver_time:
    start_addr
    end__addr
    pay

* load:
    load_id
    start_addr
    end__addr
    up_addr:["",""]
    down_addr:["",""]
    money: ["", ""]
    driver:
    card_id
    change_time
    driver_time
    stock
    total

* 路线选择页：
    提供路线选择
    提供出发点和目的地
    提供上车地址下车地址
    提供时间
    提供价钱

* 查看订单页
    显示订单-过期和没过期
    是否付款
    订单时间
    订单路线和上下车点

* 个人页
    查看订单页
    订票须知
    更改姓名和手机号

* 配置路线
    提供路线选择
    提供出发点和目的地
    提供上车地址下车地址
    提供时间
    提供价钱

* 查看订单
    查看所有订单
    可以查找订单
        条件
            姓名
            电话
            时间

* 查看用户页
    查看所有用户

* 统计页
    查看页面次数
    订单数
    单月总金额
    历史总金额
    