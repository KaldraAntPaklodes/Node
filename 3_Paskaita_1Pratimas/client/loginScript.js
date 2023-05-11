const form = document.querySelector(`form`)

form.addEventListener(`submit`, (e) => {
    e.preventDefault()

    const email = document.querySelector(`#loginEmail`).value
    const password = document.querySelector(`#loginPassword`).value
    

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    .then((response) => {
        if(response.status === 200){
            alert(`Prisijungta`)
        }else{
            alert(`Vartotojas nerastas`)
        }
    })
})


