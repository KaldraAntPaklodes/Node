console.log(`Hello from script file`)
const nameButton = document.getElementById(`nameButton`)
nameButton.addEventListener(`click`, ()=>{
    const name = document.querySelector(`input[name="name"]`).value
    console.log(name)
    fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  })});