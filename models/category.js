const db = require('../services/dbService')

const Category = db.defineModel('category', {
    name: {
        type: db.STRING,
        validate: {
            notEmpty: {
                msg: '类别名称不能为空！'
            } 
        }
    },
    describe: {
        type: db.TEXT
    },
    enable: {
        type: db.BOOLEAN,
        defaultValue: true
    }
});

Category.sync();

module.exports = Category