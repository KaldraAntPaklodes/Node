const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

const cars = [];

app.get('/cars', (req, res) => {
  res.send(cars);
});

// {id, title, done}
app.post('/cars', (req, res) => {
  const car = req.body;
  const newCar = { id: cars.length + 1, ...car }; // pridedamas id prie siunčiamo objekto
  cars.push(newCar); // pridedama į masyvą
  res.send(newCar); // išsiunčiamas response
});

app.get('/cars/:id', (req, res) => {
  const id = +req.params.id;
  const findCar = cars.find((car) => car.id === id);
  if (findCar) {
    res.send(findCar);
  } else {
    res.status(404).send('Car not found');
  }
});

app.delete('/cars/:id', (req, res) => {
  const id = +req.params.id;
  const findIndex = cars.findIndex((car) => car.id === id);
  if (findIndex !== -1) {
    const deletedCar = cars.find((car) => car.id === id);
    cars.splice(findIndex, 1);
    res.send(deletedCar);
  } else {
    res.status(404).send('Car not found');
  }
});

app.put('/cars/:id', (req, res) => {
  const id = +req.params.id;
  const findIndex = cars.findIndex((car) => car.id === id);
  if (findIndex !== -1) {
    const car = req.body;
    const uptadingCar = { id, ...car };
    cars.splice(findIndex, 1, uptadingCar);
    res.send(uptadingCar);
  } else {
    res.status(404).send('Car not found');
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
