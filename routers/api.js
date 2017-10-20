const path = require('path')
const tag = require(path.normalize('../controllers/api/tag'))
const user = require(path.normalize('../controllers/api/user'))
const menu = require(path.normalize('../controllers/api/menu'))
const push = require(path.normalize('../controllers/api/push'))
const admin = require(path.normalize('../controllers/admin/admin'))
const article = require(path.normalize('../controllers/api/article'))
const validcode = require(path.normalize('../controllers/api/validcode'))
const uploadImg = require(path.normalize('../controllers/api/uploadImg'))

const uploadConfig = require(path.normalize('../config/uploadConfig'))


module.exports = [
    // 获取验证码
    {
        url: '/valid-code',
        method: 'get',
        controller: validcode
    },
    // 创建超级管理员
    {
        url: '/api/admin/createSupper',
        method: 'post',
        controller: admin.createSupper
    },
    // 后台管理员登录
    {
        url: '/api/admin/signIn',
        method: 'post',
        controller: admin.signInAPI
    },
    // // 后台菜单管理
    // {
    //     url: '/api/admin/menu',
    //     method: 'post',
    //     controller: menu
    // },
    // // 后台标签管理
    // {
    //     url: '/api/admin/tag',
    //     method: 'post',
    //     controller: tag
    // },
    // // 前台用户注册
    // {
    //     url: '/api/user/signup',
    //     method: 'post',
    //     controller: user.signup
    // },
    // // 前台用户登录
    // {
    //     url: '/api/user/signin',
    //     method: 'post',
    //     controller: user.signin
    // },
    // // 前台上传文件（图片）
    // {
    //     url: '/api/upload',
    //     method: 'post',
    //     config: uploadConfig.array('files'),
    //     controller: uploadImg
    // },
    // // 提交问题和发布文章
    // {
    //     url: '/api/push',
    //     method: 'post',
    //     controller: push
    // },
    // // 对文章进行评论
    // {
    //     url: '/api/commentArticle',
    //     method: 'post',
    //     controller: article.reply
    // },
    // // 对评论进行评论
    // {
    //     url: '/api/replyComment',
    //     method: 'post',
    //     controller: article.comment
    // }

]