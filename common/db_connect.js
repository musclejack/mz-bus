const mysql = require('mysql')
const config = require('../config').mysql
const pool = mysql.createPool(config)

const query = function (sql, val) {
    return new Promise( (resolve, reject) => {
        pool.getConnection( (err, connect) => {
            if (err) {
                reject(err)
            } else {
                connect.query(sql, val,(err, result) => {
                    connect.release()
                    if (err) reject(err)
                    else resolve(result)
                })
            }
        })
    })
}

module.exports = query