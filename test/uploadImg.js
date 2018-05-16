const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const session = require('koa-session2')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const templating = require('./middlewares/templating')

const app = new Koa();
const router = new Router();

const multer = require('koa-multer');//加载koa-multer模块  
//文件上传  
//配置  
var storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) {  
    cb(null, 'cache/logs')  
  },  
  //修改文件名称  
  filename: function (req, file, cb) {  
    var fileFormat = (file.originalname).split(".");  
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
  }  
})  
//加载配置  
var upload = multer({ storage: storage });  
//路由  
router.post('/upload', upload.single('file'), async (ctx, next) => {  
  ctx.body = {  
    filename: ctx.req.file.filename //返回文件名  
  }  
})

router.get('/',async(ctx,next)=>{
    ctx.render('user/askQuestion.html',{
            title: '提出问题',
    })
})

// 加载静态资源中间件
app.use(koaStatic('.'))

// 加载静态模板中间件
app.use(templating('views', {
}))

app.use(router.routes());

app.listen(3300)  