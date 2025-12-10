const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../data/products.json');

const read = () => JSON.parse(fs.readFileSync(file));
const write = (data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

exports.getAll = (req, res) => {
  let data = read();
  if (req.query.search) {
    const s = req.query.search.toLowerCase();
    data = data.filter(p => p.name.toLowerCase().includes(s));
  }
  if (req.query.minPrice) data = data.filter(p => p.price >= +req.query.minPrice);
  res.json(data);
};

exports.create = (req, res) => {
  const data = read();
  const nuevo = { id: Date.now(), ...req.body, price: +req.body.price };
  data.push(nuevo);
  write(data);
  res.status(201).json(nuevo);
};