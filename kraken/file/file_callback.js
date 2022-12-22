var Kraken = require('kraken'),
    fs = require('fs');
const constants = require('../../constants');

var kraken = new Kraken({
    api_key: constants.KRAKEN_API_KEY,
    api_secret: constants.KRAKEN_API_SECRET,
});

var opts = {
    file: fs.createReadStream('media/images/a.jpeg'),
    callback_url: constants.KRAKEN_CALLBACK_URL
};
console.log(typeof opts.file);

kraken.upload(opts, function (err, data) {
    if (err) {
        console.log('Failed. Error message: %s', err);
    } else {
        console.log('Success. Optimized image URL: %s', data);
    }
});
