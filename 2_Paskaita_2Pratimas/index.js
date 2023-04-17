console.log(`2 Pratimas`)
const express = require(`express`)
const cors = require(`cors`)
const app = express()

app.use(express.json());
app.use(cors());

const port = 3000

const products = [`Obuolys`]

app.get("/products", (req, res)=>{
    res.send(products)
})

app.post(`/products`, (req, res)=>{
    const product = req.body.product
    products.push(product)
    res.send(req.body)
})

app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`)
})
