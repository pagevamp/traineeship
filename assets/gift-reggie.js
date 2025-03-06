const API_CONFIG = {
  baseUrl: shopUrl,
  endpoints: {
    registry: "/apps/giftregistry/api/registry",
    wishlist: "/apps/giftregistry/api/wishlist/add",
  },
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
      headers: API_CONFIG.headers,
      ...options,
    });

    if (!response.ok) {
      const text = await response.text();
      const errorData = JSON.parse(text);
      throw new Error(
        errorData.description || `Request failed with status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    throw error;
  }
};

let registryId;

const getRegistryId = async () => {
  try {
    const data = await fetchAPI(API_CONFIG.endpoints.registry);
    registryId = data.registries[0]?.id;
    return registryId;
  } catch (error) {
    console.error("Failed to get registry ID:", error);
    throw error;
  }
};

const addToRegistry = async (variantId, productId) => {
  if (!shopUrl) throw new Error("shopUrl is not defined");
  if (!registryId) throw new Error("Registry ID not found");

  const payload = {
    products: [
      {
        id: productId,
        variants: [
          {
            id: variantId,
            properties: {},
            quantity: "1",
          },
        ],
      },
    ],
  };

  try {
    const data = await fetchAPI(
      `${API_CONFIG.endpoints.registry}/${registryId}/product`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    console.log("Successfully added to registry:", data);
    return data;
  } catch (error) {
    console.error("Failed to add item to registry:", error);
    throw error;
  }
};

const addToWishlist = async (variantId) => {
  try {
    return await fetchAPI(API_CONFIG.endpoints.wishlist, {
      method: "POST",
      body: JSON.stringify({ id: variantId }),
    });
  } catch (error) {
    console.error("Failed to add item to wishlist:", error);
    throw error;
  }
};

document
  .getElementById("custom-add-to-registry")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await addToRegistry(
        e.target.getAttribute("data-variant-id"),
        e.target.getAttribute("data-product-id")
      );
    } catch (error) {
      console.error(error);
    }
  });

document
  .getElementById("custom-add-to-wishlist")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await addToWishlist(e.target.getAttribute("data-variant-id"));
    } catch (error) {
      console.error(error);
    }
  });

getRegistryId();
