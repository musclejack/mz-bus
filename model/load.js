const query = require('../common/db_connect')

const getLoadList = async () => {
    let sql = 'SELECT * FROM `load`'
    let data = await query(sql, null)
    return data
}

const addLoadInfo = async (data) => {
    let sql = `insert into \`load\`
    (start_addr, end_addr, up_addr, down_addr, money, driver, card_id, change_time, driver_time, total, stock) 
    values 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    let values = await query(sql, [
        data['start_addr'], data['end_addr'], data['up_addr'], data['down_addr'],
        data['money'], data['driver'], data['card_id'],
        new Date().getTime(), data['driver_time'], data['total'], data['total']
    ])

    return values
}

const updateLoadInfo = async (data) => {
    
    let setquery = 'change_time' +  "='" + new Date().getTime() + "'"

    for (let key in data) {
        if (key === 'load_id') continue
        setquery = setquery +  "," + key + "='" + data[key] + "'"
    }

    let sql = `update  \`load\` set ${setquery} where load_id = ?`

    let values = await query(sql, [data.load_id])

    return values
}

const deleteLoadInfo = async (data) => {  
    let sql = `delete from \`load\` where load_id = ?`
    let values = await query(sql, [data.load_id])
    return values
}

exports.getLoadList = getLoadList
exports.addLoadInfo = addLoadInfo
exports.updateLoadInfo = updateLoadInfo
exports.deleteLoadInfo = deleteLoadInfo