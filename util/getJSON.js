/**
 * Created by rdevansjr on 6/26/17.
 */

const http = require("http");
const https = require("https");


exports.getJSON = function(options, onResult)
{
    const prot = options.port == 443 ? https : http;
    const req = prot.request(options, function(res)
    {
        let output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            const obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        res.send('error: ' + err.message);
    });

    req.end();
};
