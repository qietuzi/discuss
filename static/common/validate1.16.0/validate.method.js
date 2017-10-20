// username
jQuery.validator.addMethod("username", function(value, element) {   
    var reg = /^[a-zA-Z][a-zA-Z0-9_]{4,16}$/;
    return this.optional(element) || (reg.test(value));
}, '用户名由5-16位字母数字下划线组成,且第一位必须为字母');
// password
jQuery.validator.addMethod("password", function(value, element) {   
    var reg = /^[a-zA-Z]\w{4,16}$/;
    return this.optional(element) || (reg.test(value));
}, '密码由5-16位字母数字下划线组成，且第一位必须为字母');