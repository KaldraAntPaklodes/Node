const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8080;
const dbName = process.env.DB_NAME;
const URI = process.env.DB_CONNECTION_STRING;

const app = express();

app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/categories', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('categories').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('products')
      .aggregate([
        {
          $lookup: {
            from: 'categories', // kita kolekcija, su kuria jungiamasi
            localField: 'ownerId', // laukas iš pets kolekcijos
            foreignField: '_id', // laukas iš owners kolekcijos
            as: 'owner_info', // išeigos masyvo laukas
          },
        },
        {
          $unwind: '$owner_info', // išplečia masyvą, kad kiekvienas elementas būtų atskiras dokumentas
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    const data = await con.db('users').collection('users').insertOne(user);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});
