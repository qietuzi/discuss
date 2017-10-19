const path = require('path')
const moment =require('moment')

const APIError = require(path.normalize('../../services/restful')).APIError

module.exports = async(ctx, next)=>{
    var data = {};
    if(ctx.req.files.length){
        var imgArr = [];
        for(let i=0;i<ctx.req.files.length;i++){
            imgArr.push(ctx.req.files[i].path.replace(/\\/g,'/'));
        }
        data = {
            errno: 0,
            data: imgArr
        }
    }else{
        data = {
            errno: 1
        }
    }

    ctx.rest(data);
}
