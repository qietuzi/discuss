const moment = require('moment')

// 时间转换
const articleIndex = function(articles){
    articles.forEach((item)=>{
        item.time = moment(item.createTime).format('hh:mm MM/DD/YYYY');
    });
    return articles;
}

// 验证是否为空字符串
const isNullStr = function(str){
    var res = (str === '') ? true : false;
    return res;
}



module.exports = {
    articleIndex: articleIndex,
    isNullStr: isNullStr
}