console.log(`1 Pratimas`)
const express = require(`express`)
const app = express()


const port = 3000

const cars = []

app.get("/", (req, res)=>{
    res.send(cars)
})

app.post(`/`, (req, res)=>{
    const car = `BMW`
    names.push(car)
    res.send(req.body)
})

app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`)
})