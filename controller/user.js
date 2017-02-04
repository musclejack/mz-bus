const User = require('../model/user')
const Util = require('../common/util')

const showUserList = async (ctx) => {
    let data = await User.showUserList()
    ctx.body = data
}

const findUserInfo = async (ctx) => {
    let data = await User.findUserByOpenid(ctx.session.openid)
    ctx.body = Util.sendData(200, data, '查找成功')
}

const updateUserDetil = async (ctx) => {
    if (ctx.query.name && Util.validateTele(ctx.query.tele)) {
        let data = await User.updateUserDetil(ctx.session.openid, ctx.query.name, ctx.query.tele)
        ctx.body = Util.sendData(200, data, '更新成功')
    } else {
         ctx.body = Util.sendData(404, {}, '参数不对')
    }
}

const adminLogin = async (ctx) => {
    let data = await User.showUserList()
    ctx.body = data
}

exports.showUserList = showUserList
exports.findUserInfo = findUserInfo
exports.updateUserDetil = updateUserDetil
exports.adminLogin = adminLogin