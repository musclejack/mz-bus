const query = require('../common/db_connect')

const findUserByOpenid = async (openid) => {
    let sql = 'select * from user where openid = ?'
    let data = await query(sql, [openid])
    return data
}

const addUser = async (openid, info, subscribe) => {
    let sql = `insert into user (openid,info,subscribe) values (?, ?, ?)
                on duplicate key update info = ?,subscribe=?`
    let data = await query(sql,[openid, info, subscribe, info, subscribe])
    return data
}

const updateUserUnsub = async (openid, subscribe) => {
    let sql = `update user set subscribe = ? where openid = ?`
    console.log(sql)
    let data = await query(sql, [subscribe, openid])
    return data
}

const getUserList = async (page, count) => {
    let sql = `select * from user limit ? ,?`
    let data = await query(sql, [parseInt((page - 1) * count), parseInt(count)])
    return data
}

const updateUserDetil = async (openid, name, tele) => {
    let sql = `update user set name = ?, tele = ? where openid = ?`
    let data = await query(sql, [name, tele, openid])
    return data
}

const findUserByTele = async (tele) => {
    let sql = 'select * from user where tele = ?'
    let data = await query(sql, [tele])
    return data
}
//增加
exports.addUser = addUser

//改
exports.updateUserUnsub = updateUserUnsub
exports.updateUserDetil = updateUserDetil

//前端查找个人
exports.findUserByOpenid = findUserByOpenid
exports.findUserByTele = findUserByTele
//后端分页查找
exports.getUserList = getUserList

//
//
//
// 有这样一个问题，如果用户可以添加手机号，
// 那我前端是应该是发送get请求，把openid和手机号到后端？
// 感觉这样很不安全啊，那我知道别人的openid，就可以随便改人的名字
// 这个你们一般怎么解决