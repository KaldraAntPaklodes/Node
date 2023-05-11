console.log(`2 Pratimas`)
const express = require(`express`)
const cors = require(`cors`)
const app = express()
const fs = require('fs');

app.use(express.json());
app.use(cors());

const port = 3000

app.get("/users", (req, res) => {

    let users = []

    fs.readFile('users.json', 'utf8', (err, source) => {
        if (err) {
            console.error(err);
            return;
        }

        users = [...JSON.parse(source)]
        res.send(users)
    });

})

app.post(`/users`, (req, res) => {
    const user = { name: req.body.name, lastName: req.body.lastName, password: req.body.password, email: req.body.email, adress: req.body.adress, zipCode: req.body.zipCode, city: req.body.city, phoneNumber: req.body.phoneNumber }


    fs.readFile('users.json', 'utf8', (err, source) => {
        if (err) {
            console.error(err);
            return;
        }

        const dataToWrite = [...JSON.parse(source), user]

        fs.writeFile('users.json', JSON.stringify(dataToWrite), err => {
            if (err) {
                console.error(err);
            }
        });
    });



    res.send('ok')
})

app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password


    let users = []

    fs.readFile('users.json', 'utf8', (err, source) => {
        if (err) {
            console.error(err);
            return;
        }

        users = [...JSON.parse(source)]

        const isFound = users.find(user => user.email == email && user.password == password) != null

        if (isFound) {
            res.status(200).send("Status: Ok!")
        } else res.status(401).send('Status: User not found')

    });
})


app.listen(port, () => {
    console.log(`Server is running on the port ${port}`)
})
