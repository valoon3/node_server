const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead (200, { 'Set-Cookies' : 'mycookie=test' });
    res.end('Hello world');
})
    .listen(3001, () => {
        console.log('3001번 포트에서 대기중');
    });