const wechat = require('co-wechat')
const User = require('../model/user')
const Api = require('../common/api_wehcat')

module.exports = () => {
    return wechat('weim').middleware(function *() {
        // 微信输入信息都在this.weixin上
        const message = this.weixin;
        if (message.MsgType === 'event') {
            if (message.Event === 'subscribe') {
                let userInfo = yield Api.getUser({openid: message.FromUserName, lang: 'en'})
                let data = yield User.addUser(message.FromUserName, JSON.stringify(userInfo), userInfo.subscribe)
                    //操作数据库
            } else if (message.Event === 'unsubscribe') {
                let data = yield User.updateUserUnsub(message.FromUserName, 0)
                //操作数据库
            }
        }
        if (message.FromUserName === 'diaosi') {
        // 回复屌丝(普通回复)
            this.body = 'hehe1212'
        } else if (message.FromUserName === 'text') {
        //你也可以这样回复text类型的信息
            this.body = {
                content: 'text object',
                type: 'text'
            }
        } else if (message.FromUserName === 'hehe') {
        // 回复一段音乐
            this.body = {
                type: "music",
                content: {
                    title: "来段音乐吧",
                    description: "一无所有",
                    musicUrl: "http://mp3.com/xx.mp3",
                    hqMusicUrl: "http://mp3.com/xx.mp3"
                }
            }
        } else if (message.FromUserName === 'kf') {
            // 转发到客服接口
            this.body = {
              type: "customerService",
              kfAccount: "test1@test"
            }
        } else {
            // 回复高富帅(图文回复)
            this.body = [
              {
                title: '你来我家接我吧',
                description: '这是女神与高富帅之间的对话',
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
              }
            ]
        }
    })
}
