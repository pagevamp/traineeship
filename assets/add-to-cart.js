async function addToCart(variantId, shopUrl) {
  try {
    const response = await fetch(`${shopUrl}/cart/add.js`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: variantId,
        quantity: 1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.description || `Failed to add to cart: ${response.status}`
      );
    }

    alert("Item added to cart");
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    alert(error.message); // Show error to user
  }
}
