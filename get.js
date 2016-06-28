var request = require('request');
var fs = require('fs');

var getData = function (qs, cb) {
    var qs0 = {
        action: 'mediaCategoryLeaf',
        dimension: 'dd_sale',
        order: 0,
        start: 0,
        end: 0
    };
    Object.keys(qs).forEach(function (key) {
        qs0[key] = qs[key];
    });
    request({
        method: 'GET',
        url: 'http://e.dangdang.com/media/api.go',
        qs: qs0,
        json: true
    }, function (err, im, body) {
        if (err) {
            throw err;
        }
        cb(body);
    });
};

var NO_MORE = 11003;
var get = function (category, step) {
    var start = 0;
    var data = [];
    var sub = function () {
        getData({
            category: category,
            start: start,
            end: step + start - 1
        }, function (body) {

            var code = body.status.code;
            if (code === 0) {
                data.concat(body.data.saleList);
                start += step;
                sub();
            } else if (code === NO_MORE) {
                fs.writeFile(category, JSON.stringify(data));
            } else {
                console.log(body.status.message);
            }
        })
    };
    sub();
};

get('HHDS', 50);