document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".product-selector").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const variantId = e.target.dataset.variantId;
      const hiddenInput = e.target
        .closest(".checkbox-label")
        .querySelector(`.selected-variant[data-variant-id="${variantId}"]`);
      if (hiddenInput) {
        hiddenInput.disabled = !e.target.checked;
      }
    });
  });

  document
    .querySelector(".detail-page-product__bottom-bar button")
    .addEventListener("click", async (e) => {
      e.preventDefault();

      const selectedProducts = Array.from(
        document.querySelectorAll(".selected-variant:not([disabled])")
      ).map((input) => ({
        id: input.value,
        quantity: 1,
      }));

      if (selectedProducts.length === 0) {
        alert("Please select at least one product");
        return;
      }

      try {
        const response = await fetch(
          window.Shopify.routes.root + "cart/add.js",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: selectedProducts,
            }),
          }
        );

        if (response.ok) {
        } else {
          alert("Failed to add items to cart");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error adding items to cart");
      }
    });
});
