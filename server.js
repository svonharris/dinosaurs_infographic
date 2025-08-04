const http = require("http");
const fs = require('fs').promises;
const host = 'localhost';
const port = 8000;
const path = require('path');


const requestListener = function (req, res) {

    const { method, url } = req;

    if (method === 'GET') {
        if (url === '/') {
            // Serve the index.html file
            fs.readFile(path.join(__dirname, 'index.html'))
                .then(contents => {
                    console.log('index.html loaded!');
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
                });
        } else if (url === '/api/dinos') {
            // Serve the JSON data
            fs.readFile(path.join(__dirname, 'dino.json'))
                .then(contents => {
                    console.log('dinos.json loaded!');
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
                });
        } else if (url === '/app.js') {
            // Serve the app script
            fs.readFile(path.join(__dirname, 'app.js'))
                .then(contents => {
                    console.log('app loaded!');
                    res.setHeader("Content-Type", "text/javascript");
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
                });
        } else if (url.startsWith('/images/')) {
            // Serve static image files
            const imagePath = path.join(__dirname, url);
            fs.readFile(imagePath)
                .then(contents => {
                    res.setHeader("Content-Type", "image/png");
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(404);
                    res.end('Image not found');
                });
        } else if (url === '/app.css') {
            // Serve the CSS file
            fs.readFile(path.join(__dirname, 'app.css'))
                .then(contents => {
                    console.log('app.css loaded!');
                    res.setHeader("Content-Type", "text/css"); // Set the content type to 'text/css'
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(err);
                });
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    } 
};

const server = http.createServer(requestListener);


/////////////////
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
