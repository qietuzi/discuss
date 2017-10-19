const path = require('path')
const config = require(path.normalize('../../config'))
const Menu = require(path.normalize('../../models/menu'))
const store = require(path.normalize('../../services/store'))
const Category = require(path.normalize('../../models/category'))

// 格式化菜单
var menuFormat = function(menu){
    var menuTemp = menu.filter((item)=>{
        if(item.parent === null){
            item.children = [];
            return item;
        }
    });
    for(let i=0;i<menu.length;i++){
        for(let j=0;j<menuTemp.length;j++){
            if(menu[i].parentId == menuTemp[j].id){
                menuTemp[j].children.push(menu[i]);
                continue;
            }
        }
    }

    return menuTemp;
}

var header = async(ctx)=>{
    var menus;
    var category;
    if(store){
        menus = await store.get('menus');
        category = await store.get('category');
        if(!menus){
            menus = await Menu.findAll();
            await store.set('menus', menus);
        }
        if(!category){
            category = await Category.findAll();
            await store.set('category', category);
        }
    }else{
        menus = await Menu.findAll();
        category = await Category.findAll();
    }
    menus = menuFormat(menus);

    return {
        title: 'Love Coding',
        menus,
        category,
        user: ctx.session.signed ? ctx.session.userinfo : null,
    }
}

module.exports = header


