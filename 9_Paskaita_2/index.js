const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8080;

const URI = process.env.DB_CONNECTION_STRING;

const app = express();

app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

// 2 Uzduotis

app.get('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('products').collection('products').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('products')
      .collection('products')
      .findOne(new ObjectId(id)); // suranda vieną objektą duomenų bazėje);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products/category/:categ', async (req, res) => {
  try {
    const { categ } = req.params;
    const con = await client.connect();
    const data = await con
      .db('products')
      .collection('products')
      .find({ category: categ })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// asc - ascending - didėjimo tvarka
// dsc - descending - mažėjimo tvarka
app.get('/products/priceSort/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const sort = type === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db('products')
      .collection('products')
      .find()
      .sort({ price: sort })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = req.body;
    const con = await client.connect();
    const data = await con
      .db('products')
      .collection('products')
      .insertOne(product);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});
