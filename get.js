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
                data = data.concat(body.data.saleList.map(function (val) {
                    var item = val.mediaList[0];
                    return {
                        authorPenname: item.authorPenname,
                        avgStarLevel: item.avgStarLevel,
                        categoryIds: item.categoryIds,
                        categorys: item.categorys,
                        chapterCnt: item.chapterCnt,
                        commentNumber: item.commentNumber,
                        isFull: item.isFull,
                        isStore: item.isStore,
                        lowestPrice: item.lowestPrice,
                        originalPrice: item.originalPrice,
                        paperBookPrice: item.paperBookPrice / 100,
                        price: item.price / 100,
                        priceUnit: item.priceUnit,
                        promotionPrice: item.promotionPrice,
                        salePrice: item.salePrice,
                        subTitle: item.subTitle,
                        title: item.title,
                        mediaId: item.mediaId,
                        saleId: item.saleId,
                        type: val.type

                    }
                }));
                start += step;
                sub();
            } else if (code === NO_MORE) {
                fs.writeFile(category + '.json', JSON.stringify(data));
            } else {
                console.log(body.status.message);
                sub();
            }
        })
    };
    sub();
};

get('XS2', 100);
// get('JSJWL', 100);