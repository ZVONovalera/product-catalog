console.log("Привет! Я работаю");
require('http').createServer((req, res) => {
  res.end("Сервер живой!");
}).listen(5000, () => console.log("→ http://localhost:5000"));