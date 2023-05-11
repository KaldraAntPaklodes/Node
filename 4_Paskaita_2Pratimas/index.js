
const express = require("express");
const cors = require("cors");
const data = require("./data.js"); // importuojam duomenis
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

// 1
app.get("/", (req, res) => {
  res.send(data);
});

//2
app.get("/categories/:category", (req, res) => {
  const category = req.params.category;
  const fileteredCategories = data.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
  );
  res.send(fileteredCategories);
});

// 3
app.get("/products/:id", (req, res) => {
  const id = req.params.id
  const foundedProduct = data.find((product) => product.id === +id)
  res.send(foundedProduct)
});


// 4
app.get("/products", (req, res) => {
  const products = data.map((product) => product.name)
  res.send(products)
})

//5
app.get("/stock/:minStock/:maxStock", (req, res) => {
  const minStock = +req.params.minStock
  const maxStock = +req.params.maxStock
  
  const inStock = data.filter((product) => product.stock >= minStock && product.stock <= maxStock)
  res.send(inStock)
})

//6
app.get("/price/:minPrice/:maxPrice", (req, res) => {
  const minPrice = +req.params.minPrice
  const maxPrice = +req.params.maxPrice
  
  const prices = data.filter((product) => product.price >= minPrice && product.price <= maxPrice)
  res.send(prices)
})

app.post(`/`, (req, res) => {
  const newProduct = req.body

  const isIdExist = data.some((product) => product.id === newProduct.id)

  if(isIdExist){
    res.send(`Toks id jau egzistuoja`)
  }else{
    data.push(newProduct)
    res.send(req.body)
  }
  
})

app.listen(port, () => console.log(`Server started on port ${port}...`));