const moment = require('moment')

module.exports = async (ctx,next)=>{
    if(ctx.session.isLogin){
        ctx.render('admin/warpper.html',{
            title: '论坛管理后台',
        });
    }else{
        ctx.redirect('/sign.html');
    }
}