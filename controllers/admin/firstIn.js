module.exports = async (ctx, next)=>{
    ctx.render('admin/first.html',{
        title: 'xxx论坛后台'
    })
}