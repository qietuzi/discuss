const path = require('path')
const schema = require('validate')
const Page = require('../../utils/page')
const Menu = require('../../models/menu')
const store = require('../../services/store')
const logger = require('../../services/logger')

module.exports = {
    // 导航菜单管理
    async manger(ctx, next){
        var thisPage = ctx.query.page ? ctx.query.page : 1;
        var result = await Menu.findAndCount({
            limit: 15,
            offset: (thisPage-1) * 15
        })

        var pages = Page.init(thisPage, Math.ceil(result.count/15), 5)

        ctx.render('admin/menus.html',{
            title: '论坛管理后台',
            menus: result.rows,
            pages: pages,
            currentpage: thisPage
        })
    },
    // 后台创建菜单
    async createMenu(ctx, next){
        var data = {};
        var userInfo = ctx.session.userInfo;
        // 判断权限
        if(userInfo.permissions > 999){
            // const menuSchema = schema({
            //     username: {
            //         type: 'string',
            //         required: true,
            //         match: /^[a-zA-Z][a-zA-Z0-9_]{4,16}$/,
            //         message: '用户名格式不正确'
            //     },
            //     password: {
            //         type: 'string',
            //         required: true,
            //         match: /^[a-zA-Z]\w{4,16}$/,
            //         message: '密码格式不正确'
            //     }
            // })






        }else{
            data = {
                status: false,
                msg: '权限不足，请联系超级管理员'
            }
        }
        ctx.rest(data);
    }
}