const Header = require('../common/header')
const Tag = require('../../models/tag')

module.exports = async (ctx,next)=>{
    // 这里需要先把登录之前的页面路径存下来，登录之后跳回
    var header = await Header(ctx);

    // 全部标签
    var allTags = [];
    var tempObj = {};
    var tempTags = await Tag.getTags(false);
    tempTags.forEach(function(item) {
        if(!tempObj[item.parent]){
            tempObj[item.parent] = [];
        }
        tempObj[item.parent].push(item);
    });
    for(let p in tempObj){
        var obj = {
            name: p,
            children: tempObj[p]
        }
        allTags.push(obj);
    }

    if(ctx.session.signed){
        ctx.render('user/push.html',{
            header,
            allTags: JSON.stringify(allTags)
        })
    }else{
        ctx.redirect('/signin')
    }
}