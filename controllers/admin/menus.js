const menu = require('../../models/menu')
const page = require('../../utils/page')

module.exports = async (ctx,next)=>{
    if(ctx.session.isLogin){
        var thisPage = ctx.query.page ? ctx.query.page : 1;
        var menus = await menu.getMenus(thisPage);
        var allMenus = await menu.tagsCount();
        var pages = page.init(thisPage, Math.ceil(allMenus/20), 5)

        ctx.render('admin/menus.html',{
            title: '论坛管理后台',
            menus: menus,
            pages: pages,
            currentpage: thisPage
        });
    }else{
        ctx.redirect('/admin/sign.html');
    }
}