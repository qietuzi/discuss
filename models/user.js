const db = require('../services/dbService')

const User = db.defineModel('user', {
    username: {
        type:  db.STRING(50),
        unique: true,
        validate: {
            notEmpty: {
                msg: '用户名不能为空！'
            } 
        }
    },
    email: {
        type:  db.STRING(50),
        unique: true,
        validate: {
            isEmail: {
                msg: '邮箱格式不正确！'
            } 
        }
    },
    password: {
        type:  db.STRING(50),
        validate: {
            len:{
                args: [4, 16],
                msg: '密码长度应在4-16位！'
            }
        }
    },
    nickname: {
        type:  db.STRING(50),
        unique: true,
        validate: {
            notEmpty: {
                msg: '昵称不能为空！'
            }
        }
    },
    headurl: {
        type: db.STRING
    },
    tel: {
        type:  db.BIGINT
    },
    rank: {
        type: db.BIGINT
    },
    qq: {
        type: db.BIGINT
    },
    weibo: {
        type: db.STRING
    },
    wechat: {
        type: db.STRING
    },
    github: {
        type: db.STRING
    },
    enable: {
        type: db.BOOLEAN,
        defaultValue: true
    }
})
User.sync();

module.exports = User;
