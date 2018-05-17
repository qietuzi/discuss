const Tag = require('../../models/tag')

module.exports = async (ctx,next)=>{
    if(ctx.session.signed){
        ctx.redirect('/')
    }else{
        ctx.render('front/signup.html',{
            title: '用户注册',
        });
    }
}