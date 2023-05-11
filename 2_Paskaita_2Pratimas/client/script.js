productName = document.querySelector(`#productName`)
productPrice = document.querySelector(`#productPrice`)

fetch("http://localhost:3000/products")
  .then((resp) => resp.json())
  .then((response) => {
    const productsList = document.getElementById("products");

    response.forEach((product) => {
      const [productName, productPrice] = product.split(` `);
      product = { name: productName, price: productPrice };
      const li = document.createElement("li");
      li.textContent = `Produktas: ${product.name}, Kaina: ${product.price} Eurai`;
      productsList.append(li);
    });
  });

const productButton = document.getElementById("productButton");
productButton.addEventListener("click", () => {
  const data = { name: productName, price: productPrice };

  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  })
  .then((resp) => resp.json())
  .then(() => {
    location.reload();
  });
});