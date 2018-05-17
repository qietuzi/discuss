const mysql = require('mysql')
const config = require('./config')

var connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password
})

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

connection.query(
    `SELECT information_schema.SCHEMATA.SCHEMA_NAME FROM information_schema.SCHEMATA where SCHEMA_NAME="${config.mysql.database}"`, function (error, res, fields) {
        if (error) {
            console.log(error)
            connection.query('CREATE DATABASE IF NOT EXISTS ' + config.mysql.database + ' DEFAULT CHARSET utf8 COLLATE utf8_general_ci', function (err, res, fields) {
                if (err) {
                    console.log(err);
                    process.exit()
                } else {
                    console.log(`${config.mysql.database} is created!`);
                    process.exit();
                }
            })
        } else {
            console.log(`${config.mysql.database} is exsited!`);
            process.exit();
        }
    })
