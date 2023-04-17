fetch("http://localhost:3000/products")
  .then((resp) => resp.json())
  .then((response) => {
    const productsList = document.getElementById("products");

    response.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product;
      productsList.append(li);
    });
  });

const productButton = document.getElementById("productButton");
productButton.addEventListener("click", () => {
  const product = document.querySelector("input[name='product']").value;

  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product }),
  }).then(() => {
    location.reload();
  });
});