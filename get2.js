var Spider = require('node-spider');
var fs = require('fs');

var category = 'XS2';
var data = require('./' + category + '.json');

var urls = data.map(function (a) {
    return 'http://product.dangdang.com/' + a.mediaId + '.html';
});
var getOne = function (url, onSuccess, onError) {

    var spider = new Spider({
        concurrent: 1,
        delay: 0,
        allowDuplicates: false,
        catchErrors: true,
        error: onError,
        done: function() {},
        headers: { 'user-agent': 'node-spider' },
        encoding: 'utf8'
    });

    var handleRequest = function(doc) {
        var list = doc.$('.intro.clearfix').children();
        var sale = doc.$('.sale');
        var page = list.eq(2).children().eq(2).clone().children().remove().end().text().trim();
        var number = list.eq(3).children().eq(0).clone().children().remove().end().text().trim();
        var price1 = sale.find('#d_price').eq(0).clone().children().remove().end().text().trim();
        var price2 = sale.find('p').eq(0).children().eq(1).children().remove().end().text().replace('￥', '').trim();
        var m_price = sale.find('.m_price').text().replace('￥', '').trim();
        onSuccess({
            page: page,
            number: number
        });
    };

// start crawling
    spider.queue(url, handleRequest);
};

var at = 11000;
var max = urls.length - 1;
// var max = 11999;
// var max = 2;
console.log('range: ' + at + ' - ' + max);
var res = [];
var step = function () {
    if (at > max) {
        fs.writeFile(category + '.data.' + max + '.json', JSON.stringify(data));
        return;
    }
    getOne(urls[at], function (d) {
        data[at].page = Number(d.page);
        data[at].number = Number(d.number);
        res.push(data[at]);
        at += 1;
        console.log('剩余: ' + (max - at));
        step();
    }, function () {
        at += 1;
        console.log('error: ' + at);
        step();
    })
};
step();