const sha1 = require('sha1')
const moment =require('moment')
const utils = require('../../utils/utils')
const validate = require('../../utils/validate')
const redis = require('../../services/store')

const User = require('../../models/user')
const APIError = require('../../services/restful').APIError

module.exports = {
    // 用户注册
    async signup(ctx, next){
        var data = {};
        if(ctx.request.body.validcode.toLowerCase() == ctx.session.validcode.toLowerCase()){
            for (var key in ctx.request.body) {
                if(key == 'validcode') continue;
                if(key == 'repassword'){
                    if(ctx.request.body.repassword == ctx.request.body.password){
                        continue;
                    }else{
                        data = {
                            status: false,
                            msg: '两次输入的密码不一致'
                        }
                        break;
                    }
                }
                if(!validate[key](ctx.request.body[key]).validate){
                    data = {
                        status: false,
                        msg: validate[key](ctx.request.body[key]).msg
                    }
                    break;
                }
            }
        }else{
            data = {
                status: false,
                msg: '验证码不正确'
            }
        }

        if(!data.msg){
            var newUser = {
                email: ctx.request.body.email,
                password: sha1(ctx.request.body.password)
            }
            try {
                await User.signup(newUser);
                data = {
                    status: true,
                    msg: '注册成功'
                }
            } catch (error) {
                data = {
                    status: false,
                    msg: error.message
                }
            }
        }

        ctx.rest(data);
    },
    // 用户登录
    async signin(ctx, next){
        var data = {};
        var faildcout = await redis.get(ctx.request.body.email);
        if(faildcout >= 3){
            if(!ctx.request.body.validcode){
                data = {
                    status: false,
                    msg: '您的账号存在异常，请输入验证码',
                    validcode: true
                }
            }else{
                if(ctx.request.body.validcode.toLowerCase() == ctx.session.validcode.toLowerCase()){
                    for (var key in ctx.request.body) {
                        if(key == 'validcode') continue;
                        if(!validate[key](ctx.request.body[key]).validate){
                            data = {
                                status: false,
                                msg: validate[key](ctx.request.body[key]).msg
                            }
                            break;
                        }
                    }
                }else{
                    data = {
                        status: false,
                        msg: '验证码不正确'
                    }
                }
            }
        }else{
            for (var key in ctx.request.body) {
                if(!validate[key](ctx.request.body[key]).validate){
                    data = {
                        status: false,
                        msg: validate[key](ctx.request.body[key]).msg
                    }
                    break;
                }
            }
        }

        if(!data.msg){
            var 
                email = ctx.request.body.email,
                password = sha1(ctx.request.body.password),
                queryObj = {email: email};
            var result = await User.queryOne(queryObj);
            if(password == result.password){
                try {
                    await redis.del(email);
                } catch (error) {}
                ctx.session.signed = true;
                ctx.session.userinfo = result;
                data = {
                    status: true,
                    msg: '登录成功'
                }
            }else{
                var count = await redis.get(email);
                count = count || 0;
                count ++;
                await redis.set(email, count);
                if(count>=3){
                    data = {
                        status: false,
                        msg: '账号或密码错误',
                        validcode: true
                    }
                }else{
                    data = {
                        status: false,
                        msg: '账号或密码错误'
                    }
                }
            }
        }

        ctx.rest(data);
    }
}
