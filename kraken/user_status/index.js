const getUserStatus = require('../utils/user_status').getUserStatus;

function formatBytes(value, decimal) {
    if (0 == value || value < 0) return "0 Bytes";
    var c = 1024, d = decimal || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(value) / Math.log(c));
    return parseFloat((value / Math.pow(c, f)).toFixed(d)) + " " + e[f]
  }

async function main() {
    try {
        const response = await getUserStatus();   
        console.log('response from wrapper is: ', response);
        console.log('Quota Total: ', formatBytes(response.quota_total,2));
        console.log('Quota Used: ', formatBytes(response.quota_used,2));
        console.log('Quota Remaining: ', formatBytes(response.quota_remaining,2));
    } catch (error) {
        console.log('error: ', error);
    }
}

main();