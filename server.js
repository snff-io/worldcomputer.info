const http = require('http');
const fs = require('fs');
const path = require('path');

const http = require('http');
const https = require('https');
const fs = require('fs');

const httpPort = 8080;
const httpsPort = 4433;

// HTTP Server
http.createServer((req, res) => {
    handle_request(req_res);
}).listen(httpPort, () => {
    console.log(`HTTP Server running on port ${httpPort}`);
});

// HTTPS Server
const options = {
    key: fs.readFileSync('path/to/privatekey.pem'),
    cert: fs.readFileSync('path/to/certificate.pem')
};

https.createServer(options, (req, res) => {
    handle_request(req_res);
}).listen(httpsPort, () => {
    console.log(`HTTPS Server running on port ${httpsPort}`);
});


function handle_request(req, res) {
    const filePath = path.join(__dirname, req.url === '/public/' ? 'index.html' : req.url);
    const contentType = 'text/html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}