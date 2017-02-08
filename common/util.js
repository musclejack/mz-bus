const co = require('co')
const crypto = require('crypto');
const sendData = (code, data, message) => {
    return JSON.stringify({
        code,
        data,
        message: message ? message:''
    })
}

const validateTele = tele => {
    if ((/^1[34578]\d{9}$/.test(tele))) return true
    else return false
}

const cowarp = gen => {
    return co(function* () {
        return yield gen
    })
}


const md5 = text => {
    return crypto.createHash('md5').update(text).digest('hex');
}

const validate = (data, ...args) => {
    for (let item of args) {
        if (!data[item]) return false
    }
    return true
}

exports.sendData = sendData
exports.validateTele = validateTele
exports.cowarp = cowarp
exports.md5 = md5
exports.validate = validate