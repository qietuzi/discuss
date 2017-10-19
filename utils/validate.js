class Validate{
    email(val){
        var reg = /^\w+[@]\w+[.][\w.]+$/;
        return {
            validate: reg.test(val),
            msg: '邮箱格式不正确'
        }
    }

    password(val){
        var reg = /^.{4,16}$/;
        return {
            validate: reg.test(val),
            msg: '密码格式不正确'
        }
    }

}

module.exports = new Validate();