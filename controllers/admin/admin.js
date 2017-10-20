const path = require('path')
const crypto = require('crypto')
const moment = require('moment')
const schema = require('validate')
const store = require('../../services/store')
const logger = require('../../services/logger')
const Admin = require(path.normalize('../../models/admin'))

const hash = crypto.createHash('sha1')

// 是否存在管理员
const getAdminCount = async(ctx, next)=>{
    var adminCount;
    if(store){
        adminCount = await store.getItem('adminCount');
        if(adminCount === null){
            adminCount = await Admin.count();
            await store.setItem('adminCount', adminCount);
        }
    }else{
        adminCount = ctx.session.adminCount;
        if(adminCount === undefined){
            adminCount = await Admin.count();
            ctx.session.adminCount = adminCount;
        }
    }
    return adminCount ? true: false;
}

module.exports = {
    // 管理员首页
    async wrapper(ctx, next){
        var userInfo = store ? await store.get(ctx.session.sid) : ctx.session.userInfo;
        ctx.render('admin/warpper.html',{
            title: '论坛管理后台',
            userInfo
        });
    },
    // 管理员登陆
    async signIn(ctx, next){
        var adminCount;
        var userInfo = store ? await store.get(ctx.session.sid) : ctx.session.userInfo;
        if(userInfo && (userInfo.permissions !== undefined) && userInfo.sign){
            ctx.redirect('/admin')
        }else{
            var adminExsit = await getAdminCount(ctx, next);
            if(adminExsit){
                ctx.render('admin/signIn.html', {
                    title: '论坛管理后台登陆'
                })
            }else{
                ctx.redirect('/admin/firstIn')
            }
        }
    },
    // 管理员第一次登陆
    async firstIn(ctx, next){
        var adminExsit = await getAdminCount(ctx, next);
        if(adminExsit){
            ctx.redirect('/admin/signIn')
        }else{
            ctx.render('admin/firstIn.html',{
                title: '欢迎使用xxx论坛'
            })
        }
    },


    // 创建超级管理员
    async createSupper(ctx, next){
        var data;
        if(ctx.request.body.password !== ctx.request.body.rePassword){
            data = {
                status: false,
                msg: '两次输入的密码不一致'
            }
            ctx.rest(data);
            return;
        }

        const superAdminSchema = schema({
            username: {
                type: 'string',
                required: true,
                match: /^[a-zA-Z][a-zA-Z0-9_]{4,16}$/,
                message: '用户名格式不正确'
            },
            password: {
                type: 'string',
                required: true,
                match: /^[a-zA-Z]\w{4,16}$/,
                message: '密码格式不正确'
            }
        })

        let adminExsit = await getAdminCount()
        if(adminExsit){
            data = {
                status: false,
                msg: '超级管理员已存在'
            }
        }else{
            let errs = superAdminSchema.validate({
                username: ctx.request.body.username,
                password: ctx.request.body.password
            });
            if(errs.length){
                data = {
                    status: false,
                    msg: errs[0].message
                }
            }else{
                try {
                    newAdmin = {
                        username: ctx.request.body.username,
                        password: hash.update(ctx.request.body.password).digest('hex')
                    }
                    await Admin.create(newAdmin);
                    await store.setItem('adminCount', '1');
                    data = {
                        status: true,
                        msg: '创建成功!'
                    }
                } catch(err){
                    data = {
                        status: false,
                        msg: err.message
                    }
                    logger.error(`createSupper at err.message`);
                }
            }
        }
        ctx.rest(data);
    }
}