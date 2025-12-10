const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const productsRouter = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/api/products', productsRouter);

app.listen(5000, () => console.log('Express готов на порту 5000'));