const dotEnv = require('dotenv');

let parsedEnv = dotEnv.config().parsed;

if (process.env.NODE_ENV === 'development') {
    parsedEnv = dotEnv.config({ path: '.env' }).parsed;
}

module.exports = () => parsedEnv;
