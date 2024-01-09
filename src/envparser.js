const dotEnv = require('dotenv');

let parsedEnv = {};

if (process.env.NODE_ENV === 'development') {
    //parsedEnv = dotEnv.config({ path: '.env' }).parsed;
}

module.exports = () => parsedEnv;
