const Tag = require('../../models/tag')
const page = require('../../utils/page')
const param = require('../../utils/param')

module.exports = async (ctx,next)=>{
    if(ctx.session.isLogin){
        var params = param(ctx);

        var category = await Tag.tagCategory();

        var currentCategory = params.category ? decodeURI(params.category) : null;
        if(currentCategory){
            var where = {
                parent: currentCategory
            }
        }else{
            var where = {}
        }
        var thisPage = params.page ? params.page : 1;
        var tags = await Tag.getTags(thisPage, where);

        var allTags = await Tag.tagsCount(where);
        var pages = page.init(thisPage, Math.ceil(allTags/20), 5)
        // var pages = 
        ctx.render('admin/tags.html',{
            title: '论坛管理后台',
            tags: tags,
            pages: pages,
            category: category,
            currentpage: thisPage,
            currentCategory: currentCategory
        });
    }else{
        ctx.redirect('/admin/sign.html');
    }
}