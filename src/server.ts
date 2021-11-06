import { createServer } from 'http'

const server = createServer((req, res) => {
    res.end('<h1>Hello, world!</h1>');
});

server.listen(3000);