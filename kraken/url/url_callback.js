var Kraken = require('kraken');
const constants = require('../../constants');

var kraken = new Kraken({
    api_key: constants.KRAKEN_API_KEY,
    api_secret: constants.KRAKEN_API_SECRET,
});

var opts = {
    url: 'https://file-examples.com/storage/fe88dacf086398d1c98749c/2017/10/file_example_JPG_100kB.jpg',
    callback_url: constants.KRAKEN_CALLBACK_URL
};

kraken.url(opts, function(err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err);
    } else {
        console.log('Success. Optimized image URL: %s', data);
    }
});


