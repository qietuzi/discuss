module.exports = {
    APIError: function(code,msg){
        this.code = code || 'internal:unknown_error';
        this.msg = msg || '';
    },
    restify: (pathPrefix)=>{
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next)=>{
            if(ctx.request.path.startsWith(pathPrefix)){
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                try{
                    await next();
                }catch(e){
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        meg: e.msg || ''
                    }
                }
            }else{
                await next();
            }
        }
    }
}