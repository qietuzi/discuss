const config = require('../config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let db = mongoose.createConnection(config.mongodb.host,config.mongodb.database,config.mongodb.port);

db.on('connected',function(){
    console.log('链接成功！');
})

db.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});  

db.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 

let menuSchema = new mongoose.Schema({
    name: {type: String},
    url: {type: String},
    parent: {type: String}
});

let Menu = db.model('menus', menuSchema,'menus');

// const menu = {
//     // 首页查询菜单列表
//     async queryAll(){
//         console.log(Menu)
//         let result = await Menu.find({}).exec();
//         console.log(result)
//         // return result;
//     }
// }
// menu.queryAll();
Menu.find({}).exec().then(function(res){
    console.log(res);
});