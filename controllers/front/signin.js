const Tag = require('../../models/tag')

module.exports = async (ctx,next)=>{
    // 这里需要先把登录之前的页面路径存下来，登录之后跳回
    if(ctx.session.signed){
        ctx.redirect('/')
    }else{
        ctx.render('front/signin.html',{
            title: '用户登录'
        });
    }
}