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
    permissions: {
        type: db.BIGINT
    },
    enable: {
        type: db.BOOLEAN,
        defaultValue: true
    }
})
Admin.sync();

const admin = {
    /*
    * 查询全部管理员
    */
    async queryAll (){
        let result = await Admin.findAll();
        return result;
    },
    /*
    * 数据库创建管理员
    * @param    {obj}   admin   管理员数据模型 
    * @return   {obj}           mysql执行结果
    */
    async create (admin){
        let result = await Admin.create(admin);
        return result;
    },
    /*
    * 查询某个管理员信息
    * @obj      {obj}            查询条件
    */
    async queryOne(obj){
        let result = await Admin.findOne({
            'where': obj
        });
        return result;
    }
}

module.exports = admin;
