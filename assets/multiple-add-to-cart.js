function addSelectedToCart(shopUrl) {
  const selectedProducts = Array.from(
    document.querySelectorAll(".product-selector:checked")
  ).map((checkbox) => ({
    id: checkbox.dataset.variantId,
    quantity: 1,
  }));

  if (selectedProducts.length === 0) {
    alert("Please select at least one product");
    return;
  }

  fetch(shopUrl + "/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: selectedProducts,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Items added successfully!");
    })
    .catch((error) => console.error("Error:", error));
}
