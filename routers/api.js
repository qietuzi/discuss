const path = require('path')
const admin = require(path.normalize('../controllers/admin'))

// const tag = require(path.normalize('../controllers/api/tag'))
// const user = require(path.normalize('../controllers/api/user'))
// const push = require(path.normalize('../controllers/api/push'))
// const article = require(path.normalize('../controllers/api/article'))


const menu = require(path.normalize('../controllers/admin/menu'))
const validcode = require(path.normalize('../controllers/api/validcode'))
// const uploadImg = require(path.normalize('../controllers/api/uploadImg'))

// const uploadConfig = require(path.normalize('../config/uploadConfig'))


module.exports = [
    // 获取验证码
    {
        url: '/valid-code',
        method: 'get',
        controller: validcode
    },
    // 管理员管理
    //      创建管理员
    {
        url: '/api/admin/createAdmin',
        method: 'post',
        controller: admin.createAdmin
    },
    //      编辑管理员
    {
        url: '/api/admin/editAdmin',
        method: 'post',
        controller: admin.editAdmin
    },
    //      禁用、删除管理员
    // {
    //     url: '/api/admin/option',
    //     method: 'post',
    //     controller: admin.option
    // },
    //      管理员登录
    {
        url: '/api/admin/signIn',
        method: 'post',
        controller: admin.signInAPI
    },
    // 菜单管理
    //      创建菜单
    {
        url: '/api/menu/createMenu',
        method: 'post',
        controller: menu.createMenu
    },
    //      编辑菜单
    //      禁用、删除菜单





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