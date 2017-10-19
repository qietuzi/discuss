const db = require('../services/dbService');

const Comment = db.defineModel('comment', {
    articleId: {
        type: db.BIGINT,
        validate: {
            notEmpty: '文章id不能为空！'
        }
    },
    parentId: {
        type: db.BIGINT
    },
    content: {
        type: db.TEXT,
        validate: {
            notEmpty: '评论内容不能为空！'
        }
    },
    commentUID: {
        type: db.BIGINT,
        validate: {
            notEmpty: '评论人id不能为空！'
        }
    },
    beCommentUID: {
        type: db.BIGINT
    },
    outRule: {
        type: db.BOOLEAN,
        defaultValue: false
    }
})

Comment.sync();

module.exports = Comment