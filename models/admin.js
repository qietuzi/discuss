const db = require('../services/dbService')

const Admin = db.defineModel('admin', {
    username: {
        type:  db.STRING(50)
    },
    password: {
        type:  db.STRING(50)
    },
    nickname: {
        type:  db.STRING(50)
    },
    tel: {
        type:  db.BIGINT
    },
    email: {
        type: db.STRING
    },
    roleId: {
        type: db.BIGINT
    },
    enable: {
        type: db.BOOLEAN,
        defaultValue: true
    }
})
Admin.sync();

module.exports = Admin;
