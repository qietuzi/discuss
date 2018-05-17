const Tag = require('../../models/tag')
const Header = require('../common/header')
const Article = require('../../models/article')
const Page = require('../../utils/page')

module.exports = async (ctx,next)=>{
    var header = await Header(ctx);
    var category = ctx.params.category ? ctx.params.category : '';
    var tag = ctx.params.tag ? ctx.params.tag : '';
    var page = ctx.params.page ? ctx.params.page : 1;

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

    if(!category){
        ctx.render('user/categories.html',{
            header,
            allTags: allTags
        });
    }else{
        // 当前category下的所有标签
        let allTags = await Tag.getTags(false,{parent: category});

        // 查询文章的条件
        var where = {
            category: category,
            tags: {
                $like:　'%' + tag + '%'
            }
        }
        var order = ['createdAt'];

        var articles = await Article.getArticle(where, order, page);
        articles.forEach(function(item){
            //去除HTML tag
            item.content = item.content.replace(/<\/?[^>]*>/g,'');
            //去除行尾空白
            item.content = item.content.replace(/[ | ]*\n/g,'\n');
        });

        // 查询文章的页码数
        var pages = await Article.count(where);
        pages = Page.init(page, Math.ceil(pages/20), 5)

        ctx.render('user/category.html', {
            header,
            category,
            tag: tag ? tag : 'all',
            allTags,
            articles: articles,
            page,
            pages: pages
        });
    }
}