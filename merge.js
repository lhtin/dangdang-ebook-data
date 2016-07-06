require('fs')
    .writeFile('XS2.data.json',
        JSON.stringify(
            require('./data/XS2.data.999.json').slice(0,1000)
            .concat(require('./data/XS2.data.1999.json').slice(1000,2000))
            .concat(require('./data/XS2.data.2999.json').slice(2000,3000))
            .concat(require('./data/XS2.data.3999.json').slice(3000,4000))
            .concat(require('./data/XS2.data.4999.json').slice(4000,5000))
            .concat(require('./data/XS2.data.5999.json').slice(5000,6000))
            .concat(require('./data/XS2.data.6999.json').slice(6000,7000))
            .concat(require('./data/XS2.data.7999.json').slice(7000,8000))
            .concat(require('./data/XS2.data.8999.json').slice(8000,9000))
            .concat(require('./data/XS2.data.9999.json').slice(9000,10000))
            .concat(require('./data/XS2.data.10999.json').slice(10000,11000))
            .concat(require('./data/XS2.data.11146.json').slice(11000,11146 + 1))
        ));