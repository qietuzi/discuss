const path = require('path')
const store = require('./store')

module.exports = function(){
    return async(ctx, next) => {
        var url = ctx.originalUrl;
        var userInfo = store ? await store.get(ctx.session.sid) : ctx.session.userInfo; 
        
        var adminReg = /^\/admin/;

        if((url !== '/admin/sign') && adminReg.test(url)){
            if(userInfo || (userInfo.permissions !== undefined) || !userInfo.signed){
                return ctx.redirect("/admin/sign")
            }
        }
    
        await next()
    }
}