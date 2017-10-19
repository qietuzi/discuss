const path = require('path')
const utils = require(path.normalize('../../utils/utils'))
const Menu = require(path.normalize('../../models/menu'))
const APIError = require(path.normalize('../../services/restful')).APIError

var creatMenu = async function(obj){
    if(utils.isNullStr(obj.name)){
        data = {
                status: false,
                msg: '菜单名称不能为空'
            }
        }
    else if(utils.isNullStr(obj.url)){
        data = {
            status: false,
            msg: '菜单地址不能为空'
        }
    }
    else if(utils.isNullStr(obj.model)){
        data = {
            status: false,
            msg: '菜单模型不能为空'
        }
    }
    else{
        try {
            var res = await Menu.create(obj);
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

var editMenu = async function(obj,where){
    if(utils.isNullStr(obj.name)){
        data = {
                status: false,
                msg: '菜单名称不能为空'
            }
        }
    else if(utils.isNullStr(obj.url)){
        data = {
            status: false,
            msg: '菜单地址不能为空'
        }
    }
    else if(utils.isNullStr(obj.model)){
        data = {
            status: false,
            msg: '菜单模型不能为空'
        }
    }
    else{
        try {
            var res = await Menu.edit(obj,where);
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


var deleteMenu = async function(obj){
    if(!obj.id){
        data = {
            status: false,
            code: 404,
            msg: '您选择的菜单不存在'  
        }
    }else{
        try {
            await Menu.delete(obj);
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
                        url: ctx.request.body.menuUrl,
                        parent: ctx.request.body.menuParent || null,
                        model: ctx.request.body.menuModel,
                        describe: ctx.request.body.describe || null
                    }
                    data = await creatMenu(obj);
                    break;
                case '2':
                    obj = {
                        name: ctx.request.body.menuName,
                        url: ctx.request.body.menuUrl,
                        parent: ctx.request.body.menuParent || null,
                        model: ctx.request.body.menuModel,
                        describe: ctx.request.body.describe || null
                    }
                    var where = {
                        id: ctx.request.body.id
                    }
                    data = await editMenu(obj, where);
                    break;
                case '3':
                    obj = {
                        id: ctx.request.body.id
                    }
                    data = await deleteMenu(obj);
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