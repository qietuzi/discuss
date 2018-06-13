const server = {
    host: 'localhost',
    port: 3000
}

const redis = null;
// const redis = {
//     port: 6379,          // Redis port
//     host: '127.0.0.1',   // Redis host
//     // family: 4,           // 4 (IPv4) or 6 (IPv6)
//     // password: 'auth',
//     // db: 0
// }

const mysql = {
    host: '',
    port: 3306,
    username: 'root',
    password: '',
    database: 'discuss',
    dialect: 'mysql'
}

const log4js = {
    "appenders": [   
        {"type": "console", "category": "console"},   
        {        
            "type": "dateFile", 
            "filename": "cache/log/",  
            "pattern": "yyyy-MM-dd.log",  
            "alwaysIncludePattern": true,
            "category": "default",
            "level" : "INFO"  
        }
    ],
    replaceConsole: true
}

const template = {
    noCache: true,
    watch: true
}

module.exports = {
    server: server,
    redis: redis,
    mysql: mysql,
    log4js : log4js,
    template: template
}  
