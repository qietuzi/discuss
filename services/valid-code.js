const BMP24 = require('gd-bmp').BMP24;

//仿PHP的rand函数
var rand = function(min, max) {
    return Math.random()*(max-min+1) + min | 0; //特殊的技巧，|0可以强制转换为整数
}

//制造验证码图片
var makeCapcha = function() {
    var img = new BMP24(100, 40);
    var code = '';
    img.drawRect(0, 0, img.w, img.h, 0xffffff);
    img.fillRect(0, 0, img.w, img.h, 0x3b4348)
    for (let i = 0; i <= img.h/10; i++) {
    	img.drawLine(0, i*10, img.w, i*10, 0xffffff);
    }
    for (let i = 0; i < img.w/10; i++) {
    	img.drawLine(i*10, 0, i*10, img.h, 0xffffff);
    }
    var p = "ABCDEFGHKMNPQRSTUVWXYZ3456789";
    var str = '';
    for(var i=0; i<5; i++){
        str += p.charAt(Math.random() * p.length |0);
    }
    var fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
    var x = 15, y=8;
    for(var i=0; i<str.length; i++){
        var f = fonts[Math.random() * fonts.length |0];
        y = 8 + rand(-10, 10);
        img.drawChar(str[i], x, y, f, 0xffffff);
        x += f.w + rand(2, 8);
    }
    return {
        img: img.getFileData(),
        code: str
    };
}

module.exports = makeCapcha;