const db = require('../services/dbService')

const Menus = db.defineModel('menu', {
    name: {
        type: db.STRING(100),
        unique: true,
        validate: {
            notEmpty: {
                msg: '菜单名不能为空'
            }
        }
    },
    url: {
        type: db.STRING(100),
        unique: true
    },
    parentId: {
        type: db.BIGINT
    },
    describe: {
        type: db.TEXT,
        validate: {
            notEmpty: {
                msg: '菜单描述不能为空'
            }
        }
    },
    enable: {
        type: db.BOOLEAN,
        defaultValue: true
    }
});

Menus.sync();

module.exports = Menus