module.exports = async (ctx,next)=>{
    
    if(ctx.session.isLogin){
        ctx.redirect('/admin');
    }else{
        ctx.render('admin/sign.html',{
            title: 'xxx论坛后台登录'
        })
    }
}