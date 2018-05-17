// const Menu = require('../../models/menu')
const Tag = require('../../models/tag')

// 格式化菜单
// var navMain = function(menu){
//     var menuTemp = menu.filter((item)=>{
//         if(item.parent === null){
//             item.children = [];
//             return item;
//         }
//     });
//     for(let i=0;i<menu.length;i++){
//         if(menu[i].parent !== null){
//             for(let j=0;j<menuTemp.length;j++){
//                 if(menu[i].parent == menuTemp[j].name){
//                     menuTemp[j].children.push(menu[i]);
//                     continue;
//                 }
//             }
//         }
//     }
//     return menuTemp;
// }

module.exports = async (ctx,next)=>{
    if(ctx.session.signed){
        ctx.redirect('/')
    }else{
        // var menus = await Menu.getMenus();
        // menus = navMain(menus);

        var tags = await Tag.tagCategory();

        ctx.render('user/signup.html',{
            title: '用户注册',
            // menus: menus,
            tags: tags
        });
    }
}