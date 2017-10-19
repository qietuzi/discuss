module.exports = (ctx)=>{
    if(ctx.originalUrl.match(/\?/)){
        var obj = {}
        var str = ctx.originalUrl;
        str.split('?')[1].split('&').forEach(function(item){
            var arr = item.split('=');
            if(arr.length == 2){
                obj[arr[0]] = arr[1];
            }
        });
        return obj;
    }else{
        return false;
    }
}