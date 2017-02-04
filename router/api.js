const User = require('../controller/user')
const router = require('koa-router')()
router.get('/showUserList', User.showUserList)
router.get('/findUserInfo', User.findUserInfo)
router.get('/updateUserDetil', User.updateUserDetil)
module.exports = router
