const path = require('path')

module.exports = function(){
    return async(ctx, next) => {
        var url = ctx.originalUrl;
        var userInfo = ctx.session.userInfo; 
        
        var adminReg = /^\/admin/;

        if((url !== '/admin/signIn' && url !== '/admin/firstIn') && adminReg.test(url)){
            if(!userInfo || (userInfo.roleId === undefined) || !ctx.session.signed){
                return ctx.redirect("/admin/signIn")
            }
        }
    
        await next()
    }
}