const mysql = require('mysql')
const config = require('../config')

var createBase = function(){
    var connection = mysql.createConnection({
        host     : config.mysql.host,
        user     : config.mysql.username,
        password : config.mysql.password
    })
    
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    });

    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM information_schema.SCHEMATA WHERE SCHEMA_NAME=' + config.mysql.database, function(error, res, fields){
            if(error){
                connection.query('CREATE DATABASE IF NOT EXISTS ' + config.mysql.database + ' DEFAULT CHARSET utf8 COLLATE utf8_general_ci', function(err, res, fields){
                    if(err){
                        console.log(err)
                    }else{
                        resolve()
                    }
                })
            }else{
                resolve()
            }
        })
    })
}

module.exports = createBase