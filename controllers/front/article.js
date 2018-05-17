const Header = require('../common/header')
const Article = require('../../models/article')
const Comment = require('../../models/comment')

module.exports = async (ctx,next)=>{
    var header = await Header(ctx);

    var articleId = ctx.params.articleId;
    var article = await Article.getDetail({id: articleId});
    var comments = await Comment.getComments(articleId);

    ctx.render('user/article.html',{
        header,
        article,
        comments
    });
}