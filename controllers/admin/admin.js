const path = require('path')
const crypto = require('crypto')
const moment = require('moment')
const store = require('../../services/store')
const admin = require(path.normalize('../../models/admin'))

module.exports = {
    // 管理员首页
    async wrapper(ctx, next){
        var userInfo = store ? await store.get(ctx.session.sid) : ctx.session.userInfo;
        ctx.render('admin/warpper.html',{
            title: '论坛管理后台',
            userInfo
        });
    },
    // 管理员登陆
    async signIn(ctx, next){
        var userInfo = store ? await store.get(ctx.session.sid) : ctx.session.userInfo;







    }





}