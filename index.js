const Koa = require('koa')
const moment = require('moment')
const Router = require('koa-router')
const session = require('koa-session2')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')

const store = require('./services/store')
const rest = require('./services/restful')
const logger = require('./services/logger')
const routers = require('./services/router')
const routerStop = require('./services/routerStop')
const templating = require('./services/templating')
const checkDabase = require('./services/checkDatabase')
const templateFilters = require('./services/template-filters')

const config = require('./config')

const app = new Koa();
const router = new Router();
const isProduction = process.env.node_env === 'production';

checkDabase().then(()=>{
    // session
    if(config.redis){
        app.use(session({
            store: store
        }))
    }else{
        app.use(session({
            key: 'sid',
            maxAge: 3600*24*15*1000
        }))
    }
    
    // 访问日志记录
    app.use(async (ctx, next) => {
        logger.info(ctx.request.path);
        await next();
    })
    
    // 配置ctx.body解析中间件
    app.use(bodyParser())
    
    // 加载静态资源中间件
    app.use(koaStatic('.'))
    
    // 加载静态模板中间件
    app.use(templating('views', {
        noCache: !isProduction,
        watch: !isProduction,
        filters: templateFilters
    }))
    
    // 加载restful API
    app.use(rest.restify())
    
    // 未登陆路由拦截
    app.use(routerStop())

    // 加载路由中间件
    var dir = 'routers';
    app.use(routers(router, dir));

    // 监听启动端口
    // app.listen(config.server.port, config.server.host)[好像有个什么bug]
    app.listen(config.server.port)
    console.log(`app started at port ${config.server.port}...`)
})

