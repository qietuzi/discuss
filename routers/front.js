// const user = require(path.normalize('../controllers/user'))
// const push = require(path.normalize('../controllers/user/push'))
// const missed = require(path.normalize('../controllers/user/404'))
const index = require('../controllers/front/index')
// const signup = require(path.normalize('../controllers/user/signup'))
// const signin = require(path.normalize('../controllers/user/signin'))
// const article = require(path.normalize('../controllers/user/article'))
// const category = require(path.normalize('../controllers/user/category'))

module.exports = [
    // 前台首页
    {
        url: '/',
        method: 'get',
        controller: index
    },
    {
        url: '/index',
        method: 'get',
        controller: index
    },
    {
        url: '/index.html',
        method: 'get',
        controller: index
    },


    // // 注册
    // {
    //     url: '/signup',
    //     method: 'get',
    //     controller: signup
    // },
    // // 登录
    // {
    //     url: '/signin',
    //     method: 'get',
    //     controller: signin
    // },
    // // 提问
    // {
    //     url: '/push',
    //     method: 'get',
    //     controller: push
    // },
    // // 大分类标签
    // {
    //     url: '/category',
    //     method: 'get',
    //     controller: category
    // },
    // {
    //     url: '/category/:category',
    //     method: 'get',
    //     controller: category
    // },
    // {
    //     url: '/category/:category/:tag',
    //     method: 'get',
    //     controller: category
    // },
    // {
    //     url: '/category/:category/:tag/:page',
    //     method: 'get',
    //     controller: category
    // },
    // // 文章详情
    // {
    //     url: "/article/:articleId",
    //     method: 'get',
    //     controller: article
    // },
    // 通用404
    // {
    //     url: '*',
    //     method: 'get',
    //     controller: missed
    // }
]