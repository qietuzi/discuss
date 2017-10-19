const fs = require('fs')
const path = require('path')
const Article = require(path.normalize('../../models/article'))
const utils = require(path.normalize('../../utils/utils'))

const APIError = require(path.normalize('../../services/restful')).APIError

// 检查目录是否存在，不存在则创建
if(!fs.existsSync('uploads')){
    fs.mkdir('uploads', function(err){
        if(err){
            console.log(err);
        }else{
            if(!fs.existsSync('uploads/articleImgs')){
                fs.mkdir('uploads/articleImgs', function(err){
                    if(err){
                        console.log(err);
                    }
                })
            }
        }
    });
}


module.exports = async(ctx, next)=>{
    var data = {};
    var newArticle = {
        title: ctx.request.body.title,
        type: ctx.request.body.type,    // 0为提问，1为发表文章
        category: ctx.request.body.category,
        content: ctx.request.body.content,
        createMan: ctx.session.userinfo.nickname || ctx.session.userinfo.email,
        userId: ctx.session.userinfo.id
    }

    if(utils.isNullStr(newArticle.title)){
        data = {
            status: false,
            msg: newArticle.type ? '文章标题不能为空' : '提问标题不能为空'
        }
    }else if(utils.isNullStr(newArticle.category)){
        data = {
            status: false,
            msg: newArticle.type ? '文章分类不能为空' : '提问分类不能为空'
        }
    }else if(utils.isNullStr(newArticle.content)){
        data = {
            status: false,
            msg: newArticle.type ? '文章内容不能为空' : '提问描述不能为空'
        }
    }else{
        // 处理图片==》将用到的图片从临时目录移动到指定目录

        //匹配图片（g表示匹配所有结果i表示区分大小写）
        var imgReg = /<img.*?(?:>|\/>)/gi;
        //匹配src属性
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var arr = newArticle.content.match(imgReg);
        var imgPath = /^cache\/imgs\//;
        var src;
        if(arr){
            for (var i = 0; i < arr.length; i++) {
                src = arr[i].match(srcReg);
                // 移动临时图片到指定目录
                if(imgPath.test(src[1])){
                    var fileReadStream=fs.createReadStream(src[1]);
                    var fileWriteStream = fs.createWriteStream('uploads/articleImgs/' + src[1].split('/')[2]);  
                    fileReadStream.pipe(fileWriteStream);  
                    // fileWriteStream.on('close',function(){  
                    // console.log('copy over');    
                    // });
                    
                }
            }
            // 替换文本中的图片路径
            newArticle.content = newArticle.content.replace(/"cache\/imgs\//ig,'"uploads/articleImgs/');
        }


        try {
            let result = await Article.create(newArticle);
            data = {
                status: true,
                articleId: result.id,
                msg: '创建成功'
            }
        } catch (error) {
            data = {
                status: false,
                msg: error.message
            }
        }
    }
    ctx.rest(data);
}
