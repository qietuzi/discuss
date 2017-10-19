const moment = require('moment')

module.exports = async (ctx,next)=>{
    if(ctx.session.isLogin){
        var page = ctx.params.page || 1;
        // 查询当前页的数据
        // var menus = await menu.getMenus(page, 25);
        ctx.render('admin/index.html',{
            title: '论坛管理后台',
            // menus: menus
        });
    }else{
        ctx.redirect('sign.html');
    }
}