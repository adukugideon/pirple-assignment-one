const environments = {};

//staging 
environments.staging = {
    'httpPort':3000,
    'httpsPort': 3001,
    'env':'staging'
}


//production
environments.production = {
    'httpPort':5000,
    'httpsPort': 5001,
    'env':'production'
}

//check if cyrrent env is a string and return lowercase else just return an empty string
const currentEnv = typeof(process.env.NODE_ENV ) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//check if env is prod, otherwise, default to staging

const envToExport = typeof(environments[currentEnv]) == 'object' ? environments[currentEnv] : environments.staging;

module.exports = envToExport;