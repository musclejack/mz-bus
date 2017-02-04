const User = require('../model/user')
const initPushData = async () => {
    for (let i = 0; i < 20; i++) {
        await User.addUser('14'+i,'36', '1')
    }
}

const testAddUser = async () => {
    let data = await User.addUser('14','36', '1')
    console.log(data)
}
// testAddUser()
const testGetUserList = async () => {
    let data = await User.getUserList(1, 10)
    console.log(data)
    data = await User.getUserList(2,5)
    console.log(data)
}
// testGetUserList()
const testUpdateUserDetil = async () => {
    let data = await User.updateUserDetil('14','36', '1')
    console.log(data)
}
// testUpdateUserDetil()
const testFindUserByOpenid = async () => {
    let data = await User.findUserByOpenid('14')
    console.log(data)
}
// testFindUserByOpenid()
const testFindUserByTele = async () => {
    let data = await User.findUserByTele('1')
    console.log(data,121)
}

// testFindUserByTele()