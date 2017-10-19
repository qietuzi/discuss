$(function(){
    // 登录
    var signIn = $('#signIn');
    signIn.on('click',function(){
        var username = $('input[name=username]').val();
        var password = $('input[name=password]').val();
        var validcode = $('input[name=validcode]').val();
        var markSign = $('input[type=checkbox]').prop('checked');
        var postObj = {
            username: username,
            password: password,
            validcode: validcode,
            markSign: markSign
        }
        $.post('/api/admin/signIn',postObj,function(res){
            if(res.status){
                location = '/admin'
            }else{
                layer.open({
                    type: 1,
                    title: false,
                    skin: 'layui-layer-demo',
                    closeBtn: 1,
                    anim: 2,
                    shadeClose: true,
                    content: '<div style="padding:20px">' + res.msg + '</div>',
                    end: function(){
                        window.validcode();
                    }
                });
            }
        });
    });
})

