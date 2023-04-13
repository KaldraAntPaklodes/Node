const express = require(`express`)
const casual = require(`casual`)
const app = express()
const port = 3000

app.get(`/`, (req, res) =>{
    res.send(`Default page`)
})

//a
app.get(`/randomUser`, (req, res) =>{
    const user = {
        name:`${casual.first_name}`,
        surname:`${casual.last_name}`,
        country:`${casual.country}`,
        city:`${casual.city}`,
        street:`${casual.street}`,
        zip: casual.zip(5, 9)
    }
    res.send(user)
})

//b
app.get(`/randomColor`, (req, res) =>{
    res.send(casual.color_name)
})

//c
app.get(`/randomColors`, (req, res) =>{
    const colors = [casual.color_name, casual.color_name, casual.color_name, casual.color_name, casual.color_name,]
    res.send(colors)
})

//d
app.get(`/randomPlaces`, (req, res) =>{
    const randomNumer = Math.ceil(Math.random() * 5)
    const places = []
    for(let i = 1; i <= randomNumer; i++){
        const place = [{
            country: casual.country,
            city: casual.city, 
            address: casual.address}]
        places.push(place)
    }
    res.send(places)
    
    
})


app.listen(port, () =>{
    console.log(`Individual app is listening on port ${port}`)
})
