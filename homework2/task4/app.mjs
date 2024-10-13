// server.mjs
import { createServer } from 'node:http';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { argv } from 'process';


const server = createServer((req, res) => {
    const urlLink = req.url.slice(1);
    const urlLinkArr = urlLink.split('/');
    const pageAdress = urlLinkArr[urlLinkArr.length - 2];
    const pageContent = urlLinkArr[urlLinkArr.length - 1];

    async function createTextFile(fileName, content) {
        try {
            await writeFile(fileName, content, 'utf8');
        } catch (error) {
            console.log('File not created');
        }
    }

    if (pageAdress === 'favicon.ico') {
        res.writeHead(204, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    if (pageAdress) {
        createTextFile(`${pageAdress}.html`, `My favoruite ${pageAdress} is ${pageContent}`);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('Page created!\n');
    }
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
