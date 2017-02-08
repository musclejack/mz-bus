// const User = require('../controller/user')
const Admin = require('../controller/admin')
const router = require('koa-router')()

// router.get('/getUserList', User.getUserList)
router.post('/login', Admin.login)
router.get('/getUserList', Admin.getUserList)
router.get('/getUserCount', Admin.getUserCount)
router.get('/getLoadList', Admin.getLoadList)
router.post('/addLoadInfo', Admin.addLoadInfo)
router.post('/updateLoadInfo', Admin.updateLoadInfo)
router.post('/deleteLoadInfo', Admin.deleteLoadInfo)

module.exports = router