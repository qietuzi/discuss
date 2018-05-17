const Article = require('../../models/article')

module.exports = async (ctx,next)=>{

    var newArticles = await Article.findAll({
        order: [['createdAt', 'DESC']],
        limit: 6,
        offset: 1
    });

    var hotArticles = await Article.findAll({
        order: [['comment', 'DESC']],
        limit: 6,
        offset: 1
    });

    ctx.render('front/index.html',{
        index: true,
        title: 'Love Coding',
        newArticles: newArticles,
        hotArticles: hotArticles,
        user: ctx.session.signed ? ctx.session.userinfo : null,
    });
}