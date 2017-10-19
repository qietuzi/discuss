const path = require('path')
const sign = require(path.normalize('../controllers/admin/sign'))
const tags = require(path.normalize('../controllers/admin/tags'))
const admin = require(path.normalize('../controllers/admin/admin'))
const index = require(path.normalize('../controllers/admin/index'))
const menus = require(path.normalize('../controllers/admin/menus'))
const firstIn = require(path.normalize('../controllers/admin/firstIn'))
const warpper = require(path.normalize('../controllers/admin/warpper'))

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
        url: '/admin/first',
        method: 'get',
        controller: firstIn
    },
    
    // 后台模板框架页
    {
        url: '/admin/warpper',
        method: 'get',
        controller: warpper
    },
    // 一览
    {
        url: '/admin/index',
        method: 'get',
        controller: index
    },
    // 菜单管理
    {
        url: '/admin/menus',
        method: 'get',
        controller: menus
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