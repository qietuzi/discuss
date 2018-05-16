const Header = require('../common/header')
const Article = require('../../models/article')

const util = require('../../utils/utils')

module.exports = async (ctx,next)=>{
    // var header = await Header(ctx);

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