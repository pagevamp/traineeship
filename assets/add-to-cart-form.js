document.querySelectorAll(".product-form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: form.querySelector('[name="id"]').value,
              quantity: parseInt(form.querySelector('[name="quantity"]').value),
            },
          ],
        }),
      });

      if (response.ok) {
        alert("Item added successfully!");
      } else {
        alert("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding item to cart");
    }
  });
});
