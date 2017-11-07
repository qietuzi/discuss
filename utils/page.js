class Page {
    init(currentPage, allPage, cutNum) {
        this.currentPage = parseInt(currentPage || 1);
        this.allPage = allPage ? parseInt(allPage) : 1;
        this.cutNum = parseInt(cutNum || 11);
        return this.main();
    }
    main(){
        var pages = [],
            arrEnd = [],
            arrHeader = [];
        // 总页数小于分页数时
        if(this.allPage <= this.cutNum){
            for(var i = 1; i <= this.allPage; i++){
                var page = {page: i, active: false};
                if(this.currentPage == i) page = {page: i, active: true}
                pages.push(page);
            }
        }else{
            // 前2页的情况
            if(this.currentPage <= 2){
                for(var i= 1; i <= this.cutNum; i++){
                    var page = {page: i, active: false};
                    if(this.currentPage == i) page = {page: i, active:true}
                    pages.push(page);
                }
            }
            // 后两页
            else if(this.currentPage >= (this.allPage-2)){
                for(var i = (this.allPage - this.cutNum ); i <= this.allPage; i++){
                    var page = {page: i, active: false};
                    if(this.currentPage == i) page = {page: i, active: true}
                    pages.push(page);
                }
            }
            // 其他
            else{
                for(var i=(this.currentPage - 2); i <= (this.currentPage + 2); i++){
                    var page = {page: i, active: false};
                    if(this.currentPage == i) page = {page: i, active: true}
                    pages.push(page);
                }
            }
            // 添加首页
            if(pages[0].page == 2){
                arrHeader = [
                    {page: 1, active: false },
                ]
            }
            else if(pages[0].page > 2){
                arrHeader = [
                    {page: 1, active: false },
                    {page: 2, active: false },
                    {page: '···', active: false}
                ]
            }
            else if(pages[0].page > 3){
                arrHeader = [
                    {page: 1, active: false },
                    {page: '···', active: false}
                ]
            }
            pages = arrHeader.concat(pages);
            // 添加尾页
            if(pages[pages.length - 1].page == this.allPage-1){
                var arrEnd = [
                    {page: this.allPage, active: false}
                ]
            }
            else if(pages[pages.length - 1].page < this.allPage-2){
                var arrEnd = [
                    {page: '···', active: false},
                    {page: this.allPage - 1, active: false},
                    {page: this.allPage, active: false}
                ]
            }
            else if(pages[pages.length - 1].page < this.allPage-1){
                var arrEnd = [
                    {page: '···', active: false},
                    {page: this.allPage, active: false}
                ]
            }
            pages = pages.concat(arrEnd);
        }
        return pages;
    }
}

module.exports = new Page();