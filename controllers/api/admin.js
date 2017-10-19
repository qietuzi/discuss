const sha1 = require('sha1')
const path = require('path')
const moment =require('moment')
const utils = require(path.normalize('../../utils/utils'))
const Admin = require(path.normalize('../../models/admin'))
const APIError = require(path.normalize('../../services/restful')).APIError

module.exports = {
    // 创建超级管理员
    createSupper: async (ctx, next)=>{
        var data = {};
        var newAdmin = {
            username: ctx.request.body.username,
            password: sha1(ctx.request.body.password),
            rePassword: sha1(ctx.request.body.rePassword),
        }
        if(utils.isNullStr(newAdmin.username)){
            data = {
                status: false,
                msg: '用户名不能为空'
            }
        }
        else if(utils.isNullStr(newAdmin.password)){
            data = {
                status: false,
                msg: '密码不能为空'
            }
        }
        else if(utils.isNullStr(newAdmin.rePassword)){
            data = {
                status: false,
                msg: '重复密码不能为空'
            }
        }
        else if(newAdmin.password !== newAdmin.rePassword){
            data = {
                status: false,
                msg: '两次输入的密码不相等'
            }
        }
        else{
            try {
                var admins = await Admin.queryAll();
                if(admins.length){
                    data = {
                        status: true,
                        msg: '超级管理员已存在'
                    }
                    // ctx.rest(data);
                    // return;
                }else{
                    var res = await Admin.create(newAdmin);
                    data = {
                        status: true,
                        msg: '创建成功'
                    }
                }
            } catch (error) {
                data = {
                    status: false,
                    msg: error
                }
            }
        }
        ctx.rest(data);
    },
    // 创建后台管理员
    createAdmin: async (ctx, next)=>{
        var data;
        var newAdmin = {
            username: ctx.request.body.username,
            password: sha1(ctx.request.body.password),
            rePassword: sha1(ctx.request.body.rePassword),
            nickname: ctx.request.body.nickname,
            tel: ctx.request.body.tel,
            email: ctx.request.body.email,
            permissions: ctx.request.body.permissions
        }

        if(utils.isNullStr(newAdmin.username)){
            data = {
                status: false,
                msg: 'code.nullUsername'
            }
        }
        else if(utils.isNullStr(newAdmin.password)){
            data = {
                status: false,
                msg: 'code.nullPassword'
            }
        }
        else if(utils.isNullStr(newAdmin.rePassword)){
            data = {
                status: false,
                msg: 'code.nullRePassword'
            }
        }
        else if(utils.isNullStr(newAdmin.nickname)){
            data = {
                status: false,
                msg: 'code.nullNickname'
            }
        }
        else if(utils.isNullStr(newAdmin.tel)){
            data = {
                status: false,
                msg: 'code.nullTel'
            }
        }
        else if(utils.isNullStr(newAdmin.email)){
            data = {
                status: false,
                msg: 'code.nullEmail'
            }
        }
        else if(utils.isNullStr(newAdmin.permissions)){
            data = {
                status: false,
                msg: 'code.nullPermissions'
            }
        }
        else if(newAdmin.password !== newAdmin.rePassword){
            data = {
                status: false,
                msg: 'code.unequalPWD'
            }
        }
        else{
            try {
                var res = await Admin.create(newAdmin);
                data = {
                    status: true,
                    msg: '创建成功'
                }
                // ctx.rest(data);
                // return;
            } catch (error) {
                data = {
                    status: false,
                    msg: error.message
                }
            }
        }
        ctx.rest(data);
    },
    // 管理员登录
    signIn: async (ctx, next)=>{
        var validcode = ctx.request.body.validcode;
        var username = ctx.request.body.username;
        var password = ctx.request.body.password;
        var markSign = ctx.request.body.markSign;
        var data = {};
        if(utils.isNullStr(validcode)){
            data = {
                status: false,
                msg: 'code.nullValidcode'
            }
        }
        else if(utils.isNullStr(username)){
            data = {
                status: false,
                msg: 'code.nullUsername'
            }
        }
        else if(utils.isNullStr(password)){
            data = {
                status: false,
                msg: 'code.nullPassword'
            }
        }else{
            if(!ctx.session.validcode){
                data = {
                    status: false,
                    msg: '验证码已过期，请刷新'
                }
            }
            else if(validcode.toLowerCase() == ctx.session.validcode.toLowerCase()){
                var queryObj = {'username': username};
                var res = await Admin.queryOne(queryObj);
                if(res){
                    if(res.password === sha1(password)){
                        data = {
                            status: true,
                            msg: '登录成功'
                        }
                        ctx.session.isLogin = true;
                    }else{
                        data = {
                            status: false,
                            msg: '用户名或密码错误'
                        }
                    }
                }else{
                    data = {
                        status: false,
                        msg: '该用户不存在'
                    }
                }
                // ctx.rest(data);
                // return;
            }else{
                data = {
                    status: false,
                    msg: 'code.wrongValidcode'
                }
            }
        }
        ctx.rest(data);
    }
}
