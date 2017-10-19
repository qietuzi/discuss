const moment = require('moment')
const admin = require('../../models/admin')

module.exports = async (ctx,next)=>{
    // 检查是否登录
    if(ctx.session.isLogin){
        ctx.render('admin/warpper.html',{
            title: '论坛管理后台',
            // menus: menus
        });
    }else{
        // 检查数据库是否有管理员存在
        try {
            var admins = await admin.queryAll();
            if(admins.length){
                ctx.redirect('/admin/sign.html');
            }else{
                ctx.redirect('/admin/first.html');
            }
        } catch (error) {
            console.log(error);
            // 发生错误，请刷新后试试
            ctx.redirect('404.html');
        }
    }
}