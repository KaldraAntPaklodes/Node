const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());

const tickets = [];

app.get('/tickets', (req, res) => {
  res.send(tickets);
});

app.post('/tickets', (req, res) => {
  const ticket = req.body;
  tickets.push(ticket);
  res.send('Ticket has been added');
});

app.get('/tickets/:id', (req, res) => {
  const item = tickets.find((item) => item.id === +req.params.id);
  if (!item) {
    res.status(404).send('Item not found');
  } else {
    res.send(item);
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
