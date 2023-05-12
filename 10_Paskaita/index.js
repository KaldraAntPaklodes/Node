const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8080;

const URI = process.env.DB_CONNECTION_STRING;

const app = express();

app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('users').collection('users').find().toArray();
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

app.get('/usersCount', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('users').collection('users').countDocuments();
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/usersCount/Jonas', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('users')
      .collection('users')
      .countDocuments({ name: 'Jonas Jonaitis' });
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/cities', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('users').collection('users').distinct('city');
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/lowestIncome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('users')
      .collection('users')
      .aggregate([
        { $group: { _id: '$name', totalAmount: { $sum: '$income' } } },
        { $sort: { totalAmount: -1 } },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/highestIncome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('users')
      .collection('users')
      .aggregate([
        { $group: { _id: '$name', totalAmount: { $sum: '$income' } } },
        { $sort: { totalAmount: 1 } },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/dynamicUsersCount/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const con = await client.connect();
    const data = await con
      .db('users')
      .collection('users')
      .countDocuments({ name: { $regex: `${name}\\b` } });
    // .countDocuments({ name }); // be regex
    // regex stringas kuris atitaiko taisyklę ir surandą
    // gerai nesuprantu bet chatGPT sugeneravo, veikia... :D
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});
