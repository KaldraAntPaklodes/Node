console.log(`Hello from V2`)

const express = require(`express`) //Express modulio importavimas

const app = express() // Aplikacijos sukūrimas

const port = 3000 // Porto (kanalo) skaičius


// Route (kelias) route/path
// get - grąžink duomenis
app.get(`/`, (req, res) =>{
    // req - request (kas ateina iš išorės)
    // res - response (kas ateina iš vidaus)
    res.send(`Hello World`) // send metodas Išsiunčia duomenis
})


app.get(`/today`, (req, res) =>{
    res.send(new Date().toDateString())
})

app.get(`/user`, (req, res) =>{
    const user = {
        name: `Tautvydas`,
        surname: `Bliudzius`,
        age: 24
    }
    res.send(user)
})


// Serverio paleidimas
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})