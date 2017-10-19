const db = require('../services/dbService')

const Tags = db.defineModel('tags', {
    tagName: {
        type: db.STRING,
        validate: {
            notEmpty: {
                msg: '标签名不能为空！'
            } 
        }
    },
    describe: {
        type: db.TEXT
    },
    parent: {
        type: db.STRING
    }
});

Tags.sync();

module.exports = Tags