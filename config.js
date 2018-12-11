const environments = {};

//staging 
environments.staging = {
    'port':8000,
    'env':'staging'
}


//production
environments.production = {
    'port':5000,
    'env':'prod'
}

//check if cyrrent env is a string and return lowercase else just return an empty string
const currentEnv = typeof(process.env.NODE_ENV ) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//check if env is prod, otherwise, default to staging

const envToExport = typeof(environments[currentEnv]) == 'object' ? environments[currentEnv] : environments.staging;

module.exports = envToExport;