const Redis = require("ioredis")
const { Store } = require("koa-session2")
const config = require('../config')

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
}
if(config.redis){
    store = new RedisStore()
}else{
    store = null;
}
 
module.exports = store;