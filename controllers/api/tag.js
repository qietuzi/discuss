const path = require('path')
const utils = require(path.normalize('../../utils/utils'))
const Tag = require(path.normalize('../../models/tag'))
const APIError = require(path.normalize('../../services/restful')).APIError

var creatTag = async function(obj){
    if(utils.isNullStr(obj.name)){
        data = {
                status: false,
                msg: '标签名称不能为空'
            }
        }
    else if(utils.isNullStr(obj.parent)){
        data = {
            status: false,
            msg: '标签分类不能为空'
        }
    }
    else{
        try {
            var res = await Tag.create(obj);
            data = {
                status: true,
                msg: '创建成功'
            }
        } catch (error) {
            data = {
                status: false,
                msg: error.message
            }
        }
    }
    return data;
}

var editTag = async function(obj,where){
    if(utils.isNullStr(obj.name)){
        data = {
                status: false,
                msg: '标签名称不能为空'
            }
        }
    else if(utils.isNullStr(obj.parent)){
        data = {
            status: false,
            msg: '标签分类不能为空'
        }
    }
    else{
        try {
            var res = await Tag.edit(obj,where);
            data = {
                status: true,
                msg: '修改成功'
            }
        } catch (error) {
            data = {
                status: false,
                msg: error.message
            }
        }
    }
    return data;
}


var deleteTag = async function(obj){
    if(!obj.id){
        data = {
            status: false,
            code: 404,
            msg: '您选择的标签不存在'  
        }
    }else{
        try {
            await Tag.delete(obj);
            data = {
                status: true,
                msg: '删除成功'
            }
        } catch (error) {
            data = {
                status: false,
                code: 500,
                msg: error.message
            }                    
        }
    }
    return data;
}


module.exports = async(ctx, next)=>{
    var data = {};
    if(ctx.session.isLogin){
        if(ctx.request.body.type){
            var obj = {};
            // {1：创建，2：编辑，3：删除}
            switch (ctx.request.body.type){
                case '1':
                    obj = {
                        name: ctx.request.body.menuName,
                        parent: ctx.request.body.menuParent,
                        describe: ctx.request.body.describe || null
                    }
                    data = await creatTag(obj);
                    break;
                case '2':
                    obj = {
                        name: ctx.request.body.menuName,
                        parent: ctx.request.body.menuParent,
                        describe: ctx.request.body.describe || null
                    }
                    var where = {
                        id: ctx.request.body.id
                    }
                    data = await editTag(obj, where);
                    break;
                case '3':
                    obj = {
                        id: ctx.request.body.id
                    }
                    data = await deleteTag(obj);
                    break;
            }
        }else{
            data = {
                status: false,
                code: 400,
                msg: '请求参数错误'
            }
        }
    }else{
        data = {
            status: false,
            code: 403,
            msg: '您还未登录'
        } 
    }

    ctx.rest(data);
}