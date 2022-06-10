const HTTP = require('http');
const URL = require('url').URL;
const PORT = 3000;

function dieRoll(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + 1;
}

function createURL(path) {
  return new URL(path, `http://localhost:${PORT}`);
}

function dieRolls(urlParam) {
  let rolls = Number(urlParam.get('rolls'));
  let sides = Number(urlParam.get('sides'));
  let body = '';

  for (let i = 0; i < rolls; i += 1) {
    body += `${dieRoll(1, sides)}\n`;
  }
  
  return body;
}

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;
  let url = createURL(path);
  let params = url.searchParams;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    let body = dieRolls(params);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(`${body}\n`);
    res.write(`${method} ${path}\n`);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
})