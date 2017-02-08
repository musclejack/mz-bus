const Admin = require('../model/admin')
const User = require('../model/user')
const Util = require('../common/util')
const Load = require('../model/load')
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

const getUserCount = async (ctx) => {
    let data = await User.getUserCount()
    // console.log(data,data[0]['COUNT(*)'])
    ctx.body = Util.sendData(200, {count: data[0]['COUNT(*)']}, '查找成功')
}

const getLoadList = async (ctx) => {
    let data = await Load.getLoadList()
    ctx.body = Util.sendData(200, data, '查找成功')
}

const addLoadInfo = async (ctx) => {
    console.log(ctx.request)
    let body = ctx.request.body
    console.log(body)
    if (Util.validate(body, 'start_addr', 'end_addr', 'up_addr', 'down_addr', 'money', 'driver_time', 'total')) {
        let data = await Load.addLoadInfo(body)
        if (data.affectedRows === 1) {
            ctx.body = Util.sendData(200, {insert: 'success'}, '插入成功')
        } else {
            ctx.body = Util.sendData(200, null, '插入失败')
        }
        
    } else {
        ctx.body = Util.sendData(404, null, '参数缺少')
    } 
}

const updateLoadInfo = async (ctx) => {
    console.log(ctx.request)
    let body = ctx.request.body
    if (body.load_id) {
        let data = await Load.updateLoadInfo(body)
        if (data.affectedRows === 1) {
            ctx.body = Util.sendData(200, {update: 'success'}, '更新成功')
        } else {
            ctx.body = Util.sendData(200, null, '更新失败')
        }
    } else {
        ctx.body = Util.sendData(404, null, '参数缺少')
    } 
}

const deleteLoadInfo = async (ctx) => {
    console.log(ctx.request)
    let body = ctx.request.body
    if (body.load_id) {
        let data = await Load.deleteLoadInfo(body)
        if (data.affectedRows === 1) {
            ctx.body = Util.sendData(200, {delete: 'success'}, '删除成功')
        } else {
            ctx.body = Util.sendData(200, null, '删除失败')
        }
    } else {
        ctx.body = Util.sendData(404, null, '参数缺少')
    } 
}

exports.login = login
exports.getUserList = getUserList
exports.getUserCount = getUserCount
exports.getLoadList = getLoadList
exports.addLoadInfo = addLoadInfo
exports.updateLoadInfo = updateLoadInfo
exports.deleteLoadInfo = deleteLoadInfo