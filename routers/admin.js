const path = require('path')
const admin = require(path.normalize('../controllers/admin'))

const tags = require(path.normalize('../controllers/admin/tags'))
// const index = require(path.normalize('../controllers/admin/index'))

const menu = require(path.normalize('../controllers/admin/menu'))

module.exports = [
    {
        url: '/admin',
        method: 'get',
        controller: admin.wrapper
    },
    // 后台登陆
    {
        url: '/admin/signIn',
        method: 'get',
        controller: admin.signIn
    },
    // 第一次登录后台
    {
        url: '/admin/firstIn',
        method: 'get',
        controller: admin.firstIn
    },
    // 一览
    // {
    //     url: '/admin/index',
    //     method: 'get',
    //     controller: index
    // },
    // 菜单管理
    {
        url: '/admin/menus',
        method: 'get',
        controller: menu.manger
    },
    // 标签管理
    {
        url: '/admin/tag',
        method: 'get',
        controller: tags
    },
    {
        url: '/admin/tag/:page',
        method: 'get',
        controller: tags
    }
]