const fs = require('fs')
const xlsx = require('node-xlsx')
const cherrio = require('cheerio')
const request = require('superagent')

// gbk编码
require('superagent-charset')(request)

// 爬取内容的网页
// var url = 'http://www.zlsoft.com/bbs/forum.php?mod=forumdisplay&fid=52';
var url = 'https://segmentfault.com/tags';

// 保存文件
var saveFile = (fileName,data)=>{
	var html = '<ul>';
	data.forEach(function(item){
		html += `<li>
					<p>${item.name}</p>
				 	<ul>` 
		item.children.forEach(function(it){
			html += `<li>
						<p>${it.name}</p>
						<p>${it.describe}</p>
					</li>`;
		})
		html += `</ul></li>`;
	});
	html += '</ul>';

    fs.writeFile(fileName + '.html', html,{encoding:null}, function(e){
        if(e){
            console.log(e);
        }
    })
}


var crawler = function(){
	var data = [];
	var excelArr = [];
    request.get(url)
        .charset('utf-8')
        .end((err, res) => {
            if(err){
                console.log('获取内容出错！');
            }
            var $ = cherrio.load(res.text);
			var m=0,n=0;

            $('.tag-list__itemWraper').each(function(index,item){
				var obj = {
					name: $(item).find('h3').text(),
					children: []
				}
				data.push(obj);
            	$(item).find('a').each(function(i,it){
					var obj = {
						name: $(it).text(),
						describe: null
					}
					data[index].children.push(obj);
            		var childUrl = 'https://segmentfault.com/api/tag/' + $(it).attr('data-id');
					m ++;
					getChild(index,i);

					function getChild(index,i){
						request.get(childUrl)
						.set({
							'Accept':'application/json, text/javascript, */*; q=0.01',
							'Accept-Encoding':'gzip, deflate, sdch, br',
							'Accept-Language':'zh-CN,zh;q=0.8',
							'Connection':'keep-alive',
							'Cookie':'PHPSESSID=web1~n3i2ajer338kqpesqt5ogcckf7; sf_remember=dd79e28f5ea0a0f7bff50c739eaf80c1; _gat=1; _ga=GA1.2.235379288.1495633681; _gid=GA1.2.1114161677.1499172571; Hm_lvt_e23800c454aa573c0ccb16b52665ac26=1498831095,1499172571,1499174133,1499177030; Hm_lpvt_e23800c454aa573c0ccb16b52665ac26=1499177038; io=NdjfyJVFR-YEDNKQEyaP',
							'Host':'segmentfault.com',
							'Referer':'https://segmentfault.com/tags',
							'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
							'X-Requested-With':'XMLHttpRequest'
						})
						.query({'_': 'ef091bde594a352a4eab1581a699012b'})
						.end((err,res)=>{
							if(err){
								// console.log(err);
								getChild(index,i);
								return;
							}
							n++;
							data[index].children[i].describe = res.body.data.originalText;

							var obj = [
								n,
								data[index].children[i].name,
								data[index].children[i].describe,
								data[index].name
							]
							excelArr.push(obj);

							if(m==n){
								saveFile('test',data);
								
								var buffer = xlsx.build([{name: 'sheet1', data: excelArr}]);
								//将文件内容插入新的文件中
								fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});
								
								console.log('ok，it’s done！');
							}
						})
					};
            	});
            })
        });
}

crawler();
// const fs= require('fs')
// const xlsx  = require('node-xlsx')
// // Or var xlsx = require('node-xlsx').default;

// const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
// var buffer = xlsx.build([{name: "mySheetName", data: data}]);
// fs.writeFileSync('user.xlsx', buffer, {'flag':'w'});