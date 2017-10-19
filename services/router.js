const fs = require('fs')

var addMapping = function(router,mapping){
    for(let i=0;i<mapping.length;i++){
        if(mapping[i].config){
            router[mapping[i].method](mapping[i].url, mapping[i].config, mapping[i].controller);
        }else{
            router[mapping[i].method](mapping[i].url, mapping[i].controller);
        }
    }
}

var addRouters = function(router,dir){
    fs.readdirSync('./' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        let mapping = require('../' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

module.exports = function (router ,dir) {
    let controllers_dir = dir || 'routers';
    addRouters(router, controllers_dir);
    return router.routes();
};