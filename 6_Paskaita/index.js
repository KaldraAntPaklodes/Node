const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

// 1
app.get('/', (req, res) => {
  res.send([]);
});

app.post('/', (req, res) => {
  res.send(req.body);
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
