const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

//Instantiate http server
const httpServer = http.createServer(function (req, res) {
unifiedServer(req, res);
});

httpServer.listen(config.port, function (req, res) {
    console.log(`Server running in ${config.env} on ${config.port}`);
});



//Create unified server
 const unifiedServer = function(req, res){
      //Get the url and parse it 
    const parsedUrl = url.parse(req.url, true);

    //Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\+|\/+$/g, '');

    //Get the http
    const method = req.method;

    //Get the request parameters
    const queryParams = parsedUrl.query;

    //Get headers
    let headers = req.headers;

    //Get the payload
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function (data) {
        return buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();
        

        //Choose handler request should go to, if not found, shouyld return 404
        const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handler.notFound
        //Construct data object to send to the handler
        let data = {
            'trimmedPath': trimmedPath,
            'method': method,
            'payload': buffer,
            'headers': headers
        };
       
        chosenHandler(data, function(statuscode, payload){
            //Use the status code called by the handler
        statuscode = typeof(statuscode) =='number' ? statuscode: 200

        //use the payload called by the handler
        payload = typeof(payload) == 'object' ? payload : {};

        //Convert the payload to string
        const payloadString   =   JSON.stringify(payload);

        //set json payload
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statuscode);
        //Send the response
        res.end(payloadString);
         //Log the request
         console.log(`Request received with payload: ${buffer}`);
        });
       
    });
 };

//define handler
const handler = {};

// Listen for a ping 
handler.ping = function(data, callback){
    callback(200);
};

//create sample handlers
handler.hello = function (data, callback) {
    callback(406, {
        'message': 'welcome to an awesome API'
    });
};

handler.notFound = function (data, callback) {
    callback(404);
};

//Define router
let router = {
    'hello': handler.hello
};