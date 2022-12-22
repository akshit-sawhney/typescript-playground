var Kraken = require("kraken");
const constants = require("../../constants");

var kraken = new Kraken({
  api_key: constants.KRAKEN_API_KEY,
  api_secret: constants.KRAKEN_API_SECRET,
});

function formatBytes(value, decimal) {
  if (0 == value) return "0 Bytes";
  var c = 1024,
    d = decimal || 2,
    e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(value) / Math.log(c));
  return parseFloat((value / Math.pow(c, f)).toFixed(d)) + " " + e[f];
}

async function compressByUrl(opts) {
  return new Promise((resolve, reject) => {
    kraken.url(opts, function (err, data) {
      if (err) {
        console.log("Failed. Error message: %s", err);
        reject(err);
      } else {
        console.log("Success. Optimized image URL: %s", data);
        resolve(data);
      }
    });
  });
}

async function compressByFile(opts) {
  return new Promise((resolve, reject) => {
    kraken.upload(opts, function (err, data) {
      if (err) {
        console.log("Failed. Error message: %s", err);
        reject(err);
      } else {
        console.log("Success. Optimized image URL: %s", data);
        resolve(data);
      }
    });
  });
}

async function userStatus() {
    return new Promise((resolve, reject) => {
        kraken.userStatus(function (err, data) {
            if (err) {
                console.log("Failed. Error message: %s", err);
                reject(err);
              } else {
                    const returnData = {
                    success: data.success,
                    active: data.active,
                    quota_total: formatBytes(data.quota_total, 2),
                    quota_used: formatBytes(data.quota_used, 2),
                    quota_remaining: formatBytes(data.quota_remaining, 2),
                }
                resolve(returnData);
              }
        });
    });
}

module.exports = {
  compressByUrl,
  compressByFile,
  userStatus,
};
