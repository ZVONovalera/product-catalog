const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Данные
let products = [
  { id: 1, name: "iPhone 15 Pro", price: 119990, category: "Смартфоны", inStock: true },
  { id: 2, name: "MacBook Air M3", price: 149990, category: "Ноутбуки", inStock: true },
  { id: 3, name: "AirPods Pro 2", price: 24990, category: "Наушники", inStock: true },
  { id: 4, name: "Sony PlayStation 5", price: 62990, category: "Игровые консоли", inStock: false },
  { id: 5, name: "Samsung Galaxy S24 Ultra", price: 139990, category: "Смартфоны", inStock: true },
  { id: 6, name: "Xiaomi 14", price: 79990, category: "Смартфоны", inStock: true },
  { id: 7, name: "Книга «Чистый код»", price: 2490, category: "Книги", inStock: true },
  { id: 8, name: "Nintendo Switch OLED", price: 39990, category: "Игровые консоли", inStock: true },
  { id: 9, name: "Кофемашина DeLonghi", price: 45990, category: "Бытовая техника", inStock: true },
  { id: 10, name: "Футболка Supreme", price: 12990, category: "Одежда", inStock: false },
  { id: 11, name: "Рюкзак Xiaomi", price: 3490, category: "Аксессуары", inStock: true },
  { id: 12, name: "Монитор 27\" 144Hz", price: 27990, category: "Мониторы", inStock: true },
  { id: 13, name: "Клавиатура механическая", price: 8990, category: "Периферия", inStock: true },
  { id: 14, name: "Мышь Logitech MX Master", price: 11990, category: "Периферия", inStock: true },
  { id: 15, name: "Настольная лампа Yeelight", price: 4990, category: "Свет", inStock: true }
];

let nextId = 16;


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} → ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json());

const validate = (req, res, next) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category || price <= 0) 
    return res.status(400).json({ error: "Неверные данные" });
  next();
};


app.get('/api/products', (req, res) => {
  let list = products;
  if (req.query.category) list = list.filter(p => p.category === req.query.category);
  if (req.query.inStock) list = list.filter(p => p.inStock === (req.query.inStock === 'true'));
  res.json(list);
});

app.get('/api/products/:id', (req, res) => {
  const p = products.find(x => x.id === +req.params.id);
  p ? res.json(p) : res.status(404).json({ error: "Не найдено" });
});

app.post('/api/products', validate, (req, res) => {
  const p = { id: nextId++, inStock: true, ...req.body };
  products.push(p);
  res.status(201).json(p);
});

app.put('/api/products/:id', validate, (req, res) => {
  const i = products.findIndex(x => x.id === +req.params.id);
  if (i === -1) return res.status(404).json({ error: "Не найдено" });
  products[i] = { ...products[i], ...req.body };
  res.json(products[i]);
});

app.delete('/api/products/:id', (req, res) => {
  const i = products.findIndex(x => x.id === +req.params.id);
  if (i === -1) return res.status(404).json({ error: "Не найдено" });
  res.json(products.splice(i, 1)[0]);
});


app.use(express.static(path.join(__dirname, '../frontend/build')));


app.use((req, res, next) => {
  
  if (res.headersSent) return next();
  
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен → http://localhost:${PORT}`);
});