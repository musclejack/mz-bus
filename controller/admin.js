const Admin = require('../model/admin')
const User = require('../model/user')
const Util = require('../common/util')

const login = async (ctx) => {

    let body = ctx.request.body
    if (body.name && body.password) {
        console.log(Util.md5(body.password))
        let data = await Admin.checkLogin(body.name, Util.md5(body.password))
        console.log(data)
        if (data.length) {
            ctx.session.user = data
            ctx.body = Util.sendData(200, {login: 'success'}, '登录成功')
        } else {
            ctx.body = Util.sendData(200, null, '账号或者密码错误')
        }
    } else {
        ctx.body = Util.sendData(404, null, '参数不对')
    }
}

const getUserList = async (ctx) => {
    if (ctx.query.page) {
        let data = await User.getUserList(ctx.query.page, ctx.query.count || 10)
        ctx.body = Util.sendData(200, data, '查找成功')
    } else {
        ctx.body = Util.sendData(404, null, '参数不对')
    }
}

exports.login = login
exports.getUserList = getUserList