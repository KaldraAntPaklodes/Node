const registerForm = document.getElementById('registerForm')

registerForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const name = document.querySelector(`#nameInput`).value
    const lastName = document.querySelector(`#lastNameInput`).value
    const email = document.querySelector(`#emailInput`).value
    const phoneNumber = document.querySelector(`#phoneNumberInput`).value
    const password = document.querySelector(`#passwordInput`).value
    const adress = document.querySelector(`#adressInput`).value
    const city = document.querySelector(`#cityInput`).value
    const zipCode = document.querySelector(`#zipInput`).value

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            adress: adress,
            city: city,
            zipCode: zipCode
        })
    })
        .catch(error => console.error(error));
});