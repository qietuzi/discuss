const uuid = require('node-uuid')
const Sequelize = require('sequelize')
const config = require('../config')

var generateId = function(){
    return uuid.v4();
}

var sequelize = new Sequelize(
        config.mysql.database,
        config.mysql.username,
        config.mysql.password,
        {
            host: config.mysql.host,
            port: config.mysql.port,
            dialect: config.mysql.dialect,
            dialectOptions: {
                charset: 'utf8mb4'
            },
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
)

const ID_TYPE = Sequelize.STRING(50);

const defineModel = function(name, attrs){
    var attr = {};
    for(let key in attrs){
        let value = attrs[key];
        if(typeof value === 'object' && value['type']){
            value.allowNull = value.allowNull || true;
            attr[key] = value;
        }else{
            attr[key] = {
                value: value,
                allowNull: true
            }
        }
    }
    attr.pid = {
        type: ID_TYPE,
        primaryKey: false
    }
    attr.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    attr.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    attr.deleted = {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
    attr.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    return sequelize.define(name, attr, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function(obj){
                let now = Date.now();
                if(obj.isNewRecord){
                    if(!obj.pid){
                        obj.pid = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                }else{
                    obj.updatedAt = now;
                    obj.version++;
                }
            }
        }
    });
}

const createTable = function(){
    if(process.env.NODE_ENV !== 'production'){
        sequelize.sync({force: true});
    }else{
        throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];
for(let type of  TYPES){
    sequelize[type] = Sequelize[type];
}

// var exp = {
//     defineModel: defineModel,
//     sync: ()=>{
//         if(process.env.NODE_ENV !== 'production'){
//             sequelize.sync({force: true});
//         }else{
//             throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
//         }
//     },
//     query: async (sql)=>{
//         var result = await sequelize.query(sql);
//         return result;
//     }
// }
sequelize.defineModel = defineModel;

sequelize.createTable = createTable;

sequelize.ID = ID_TYPE;
sequelize.generateId = generateId;

module.exports = sequelize;