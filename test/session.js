const Koa = require("koa");
const session = require("koa-session2");
const Store = require("../services/Store.js");
 
const app = new Koa();
 
app.use(session({
    store: new Store()
}));
 
app.use(ctx => {
    console.log(ctx.cookies)
    let user = ctx.session.user;
 
    ctx.session.view = "index";
});

app.listen(3000)