const Redis = require("ioredis")
const logger = require('./logger')
const config = require('../config')
const { Store } = require("koa-session2")

var store;

class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis(config.redis);
    }
    
    async get(sid) {
        let data = await this.redis.get(`SESSION:${sid}`);
        return JSON.parse(data);
    }
    
    async set(session, { sid =  this.getID(24), maxAge = 15*24*3600 } = {}, ctx) {
        try {
            // Use redis set EX to automatically drop expired sessions 
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge);
        } catch (e) {}
        return sid;
    }
    
    async destroy(sid) {
        return await this.redis.del(`SESSION:${sid}`);
    }

    /* 都是koa2-session害的，不能修改koa2-session包，不然重新安装出错 */
    async getItem(key) {
        let data = await this.redis.get(key);
        return JSON.parse(data);
    }

    async setItem(key, value) {
        try {
            await this.redis.set(key, JSON.stringify(value));
        } catch (e) {
            logger.error(`redis set ${key} : ${JSON.stringify(value)}`);
            next();
        }
    }


}
if(config.redis){
    store = new RedisStore()
}else{
    store = null;
}
 
module.exports = store;