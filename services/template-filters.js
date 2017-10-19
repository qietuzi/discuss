const moment = require('moment')

module.exports = {
    timeFormat: function(t, type){
        switch (type){
            case 1:
                return moment(t).format('hh:mm MM/DD/YYYY');
                break;
            case 2:
                break;
        }
    },
    timeFormat: function(t){
        return moment(t).format('YYYY-MM-DD HH:mm');
    },
    stringSub: function(str, length){
        return str.substring(0, length);
    }
}