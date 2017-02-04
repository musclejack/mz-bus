const query = require('../common/db_connect')

const checkLogin = async (name, password) => {
    // return true
    let sql = 'select * from admin where name = ? and password = ?'
    let data = await query(sql, [name, password])
    return data
}

exports.checkLogin = checkLogin