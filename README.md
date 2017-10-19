## node-bbs
### 前言
不想学习后端的前端不是一个好前端。
<p style="text-align:right; margin-right:20px;">——某个无知的前端</p>

不知道你们怎么看待上面这句“名言”，但是我认为一个合格的前端工程师应该对后端有所了解，在项目中菜能更好的和后端同事沟通，共同完成项目。

作为一个工作两年的前端，一直没有正式学习后端语言，对后端很多业务都不甚了解。在和后端同事的沟通中也存在部分问题（源于对后端一些概念的了解不够），所以下定决心学习一门后端语言并完成一些相关项目，增加对后端程序的了解。这对将来的发展也有好处。

项目将使用ES7语法和koa2框架搭建一个论坛系统（参照[segmentfault](https://segmentfault.com)），然后添加部分功能，目前暂定需求如下：
1. 用户注册、登陆、个人信息管理
2. 用户发帖、回帖、对发布的帖子点赞、收藏和举报等操作（未全部完成）
3. 后台管理员对菜单、主题分类、主题标签的管理（未全部完成）
4. 后台管理员发布线下活动并统计（未完成）
5. 周边商城（暂不确定）

### 开发准备
#### 开发工具
俗话说：工欲善其事必先利其器。首先得有一款顺手的编辑器。其实写node和写前端很相似，只需要简单的文本编辑器就ok了，但是node在运行时需要调试吧，我相信没有人愿意去看命令提示行的信息（反正我是不愿意）。
在这里为大家安利一款编辑器——Visual Studio Code（简称vs code）。vs code集成了node的开发环境（你得先安装node），而且在调试的时候可以在控制台看到输出。
#### 开发环境
这个其实没什么好说的，开发node，那node肯定是必须的了。这里需要注意的是，因为本文中使用了部分ES6，ES7的语法，所有node版本需要高于7.x.x，我的是7.10.0，不然我不能保证后面的程序能正常运行。如果你需要使用不同版本node，可以使用nvm来管理你的node版本。
如果你需要学习nvm的基础内容，可以看下我写的nvm入门[nvm基础](http://www.qiang93.top)
#### 静态页面
为了快速的学习node，本项目没有使用前后端分离的架构，而是采用传统的MVC后端渲染方式。在这里需要准备两套模板（一套前端模板，一套后台模板），由于我本来就是前端开发，静态页面对我来说比较轻松（也不想花时间去写）。所以用了两套模板之家的模板，链接如下：
* 前台模板：[http://www.cssmoban.com/cssthemes/5406.shtml](http://www.cssmoban.com/cssthemes/5406.shtml)
* 后台模板：[http://www.cssmoban.com/cssthemes/6700.shtml](http://www.cssmoban.com/cssthemes/6700.shtml)

当然如果想巩固一下静态页面的编写也是可以的。

### 项目目录说明
|目录名称|说明|
|---|---|
|cache	|缓存目录（日志文件，上传的临时文件等）|
|config	|配置文件|
|controllers	|控制器|
|models	模型|
|routers	|路由|
|services |服务中间件|
|static	|静态资源|
|uploads	|上传文件目录|
|utils	|工具函数|
|views |模板文件|

### 项目所需模块说明
这个项目使用koa2框架+mysql。所以有以下依赖

|模块名称|功能说明|
|---|---|
|koa|开发主框架|
|koa-session2|session管理|
|koa-router|路由管理|
|koa-static|静态文件支持|
|koa-view|模板支持|
|koa-bodyparser|解析post请求的body参数|
|koa-multer|上传文件依赖模块|
|ioredis|redis缓存数据库驱动|
|mysql|myslq驱动|
|sequelize|数据模型操作mysql|
|log4js|日志记录模块|
|nunjucks|nunjucks模板中间件|
|sha1|sha1加密模块|
|gd-bmp|验证码模块|
|moment|日期格式化插件|
|node-uuid|唯一id生成插件|
|marked|markDown语法解析模块|

上面是暂时要用的模块，其中本项目使用了redis缓存数据库，当然不是必须，如果不使用缓存数据库就不需要ioredis模块，直接将session存在系统缓存中。这里大家可以了解下session存储的方式，根据需要使用。这里推荐使用redis，毕竟很多项目都会用到，只是做一个简单的了解。
redis安装教程：[http://qiang93.top/2017/09/01/Redis%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/#more]

由于之前的版本使用redis数据库存储了session以及首页的一些数据，有的朋友下载之后还需要安装reids。所以这里做了一些修改，在config中配置是否启用redis，如：config.js
```
const redis = null
```

### 安装使用
下载：使用git clone或者下载压缩包
安装：npm install

### 写在最后
本来我是想写一个基于koa2的node开发教程，但是写了一点（就上面的部分），然后发现目前我的水平离写教程还差得很远。不得不放弃写教程的打算。

这里给大家推荐廖雪峰老师官网：[https://www.liaoxuefeng.com](https://www.liaoxuefeng.com)

本项目也大量借鉴了廖雪峰老师的javascript教程（我也是靠廖老师的教材入门nodeJS开发的）。这里就不在过多的讲述，而且廖雪峰老师讲得更为清晰。对此非常抱歉，不能给大家带来比较好的入门教程。