const validcode = require('../../services/valid-code')

module.exports = async (ctx, next)=>{
    var validObj = validcode();
    var img = validObj.img;
    var code = validObj.code;
    ctx.session.validcode = code;
    ctx.response.body = img;
}