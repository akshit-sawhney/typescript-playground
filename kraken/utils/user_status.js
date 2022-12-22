const axios = require('axios');
const constants = require('../../constants');

const data = {
  "auth": {
    "api_key": constants.KRAKEN_API_KEY,
    "api_secret": constants.KRAKEN_API_SECRET,
  }
}

const getUserStatus = async () => {
  try {
    const res = await axios.post('https://api.kraken.io/user_status', data)
    return res.data;
  } catch (err) {
    return new Error(err);
  }
}

module.exports = {
  getUserStatus,
};
