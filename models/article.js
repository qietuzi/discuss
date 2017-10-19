const db = require('../services/dbService');

const Article = db.defineModel('article', {
    title: {
        type: db.STRING,
        validate: {
            notEmpty: {
                msg: '标题不能为空！'
            }
        }
    },
    categoryId: {
        type: db.BIGINT,
        validate: {
            notEmpty: {
                msg: '类别不能为空'
            }
        }
    },
    tags: {
        type: db.STRING,
        validate: {
            notEmpty: {
                msg: '标签不能为空'
            }
        }
    },
    content: {
        type: db.TEXT,
        validate: {
            notEmpty: {
                msg: '内容不能为空'
            }
        }
    },
    userId: {
        type: db.BIGINT,
        validate: {
            notEmpty: {
                msg: '提问人不能为空'
            }
        }
    },
    // 点赞
    like: {
        type: db.BIGINT, defaultValue: 0
    },
    // 收藏
    favorite: {
        type: db.BIGINT, defaultValue: 0
    },
    // 评论
    comment: {
        type: db.BIGINT, defaultValue: 0
    },
    // 浏览
    browse: {
        type: db.BIGINT, defaultValue: 0
    }
})

Article.sync();

module.exports = Article