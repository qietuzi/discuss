$(function(){
    // 切换验证码
    window.validcode = function(){
        var img = document.querySelector('#valid-code');
        var n = (Math.random()*1000).toFixed(2);
        img.src = '/valid-code?v'+n;
    }
    var img = document.querySelector('#valid-code');
    if(img){
        img.addEventListener('click',function(){
            window.validcode();
        },false);
    }


})