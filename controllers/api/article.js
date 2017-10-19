const fs = require('fs')
const path = require('path')
const Article = require(path.normalize('../../models/article'))
const Comment = require(path.normalize('../../models/comment'))
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


module.exports = {
    // 主评论
    reply: async(ctx, next) => {
        if(!ctx.session.signed){
            data = {
                status: false,
                msg: '您还没有登录!'
            }
        }else{
            var data =  {};
            var newComment = {
                articleId: ctx.request.body.articleId,
                parentId: ctx.request.body.parentId || null,
                comments: ctx.request.body.content,
                commentUID: ctx.session.userinfo.id || null,
                commentUName: ctx.session.userinfo.nickname || ctx.session.userinfo.email || null,
                commentUHead: ctx.session.userinfo.headUrl || null
            }

            if(utils.isNullStr(newComment.articleId)){
                data = {
                    status: false,
                    msg: '被评论主题ID不能为空'
                }
            }else if(utils.isNullStr(newComment.comments)){
                data = {
                    status: false,
                    msg: '评论内容不能为空'
                }
            }else{
                // 处理图片==》将用到的图片从临时目录移动到指定目录
                //匹配图片（g表示匹配所有结果i表示区分大小写）
                var imgReg = /<img.*?(?:>|\/>)/gi;
                //匹配src属性
                var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                var arr = newComment.comments.match(imgReg);
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
                        }
                    }
                    // 替换文本中的图片路径
                    newComment.content = newComment.content.replace(/"cache\/imgs\//ig,'"uploads/articleImgs/');
                }

                try {
                    let result = await Comment.create(newComment);
                    data = {
                        status: true,
                        msg: '评论成功'
                    }
                } catch (error) {
                    data = {
                        status: false,
                        msg: error.message
                    }
                }
            }
        }

        ctx.rest(data);
    },
    // 互评
    comment: async(ctx, next) =>{
        if(!ctx.session.signed){
            data = {
                status: false,
                msg: '您还没有登录!'
            }
        }else{
            var data =  {};
            var newComment = {
                articleId: ctx.request.body.articleId,
                parentId: ctx.request.body.parentId,
                comments: ctx.request.body.comments,
                beCommentUID: ctx.request.body.beCommentUID,
                commentUID: ctx.session.userinfo.id
            }

            if(utils.isNullStr(newComment.articleId)){
                data = {
                    status: false,
                    msg: '被评论文章ID不能为空'
                }
            }else if(utils.isNullStr(newComment.comments)){
                data = {
                    status: false,
                    msg: '评论内容不能为空'
                }
            }else if(utils.isNullStr(newComment.beCommentUID)){
                data = {
                    status: false,
                    msg: '被评论人不能为空'
                }
            }else{
                try {
                    let result = await Comment.create(newComment);
                    data = {
                        status: true,
                        msg: '评论成功',
                        data: {
                            id: ctx.session.userinfo.id,
                            headUrl: ctx.session.userinfo.headUrl,
                            commentNick: ctx.session.userinfo.nickname,
                            commentEmail: ctx.session.userinfo.email,
                            beCommentUID: newComment.beCommentUID,
                            beCommentNick: ctx.request.body.beCommentNick,
                            createdAt: Date.now(),
                            comments: newComment.comments,
                            parentId: newComment.parentId
                        }
                    }
                } catch (error) {
                    data = {
                        status: false,
                        msg: error.message
                    }
                }
            }
        }

        ctx.rest(data);
    }
}

