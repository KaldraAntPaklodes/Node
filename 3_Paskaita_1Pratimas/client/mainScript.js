fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => {
        const usersTable = document.querySelector('table');
        users.forEach(user => {
            const newRow = document.createElement('tr');
            const nameCell = document.createElement('td');
            const lastNameCell = document.createElement('td');
            const emailCell = document.createElement('td');
            const phoneNumberCell = document.createElement('td');

            nameCell.textContent = user.name;
            lastNameCell.textContent = user.lastName;
            emailCell.textContent = user.email;
            phoneNumberCell.textContent = user.phoneNumber;

            newRow.appendChild(nameCell);
            newRow.appendChild(lastNameCell);
            newRow.appendChild(emailCell);
            newRow.appendChild(phoneNumberCell);

            usersTable.appendChild(newRow);
        });


    })
