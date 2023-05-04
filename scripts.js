const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');

addToCartForms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    // Prevent normal submission
    event.preventDefault();

    // Submit form with ajax
    await fetch("/cart/add", {
      method: "post",
      body: new FormData(form),
    });

    // Get new cart object
    const res = await fetch("/cart.json");
    const cart = await res.json();

    // Update cart count
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = cart.item_count;
    });

    // Display message
    const message = document.createElement("p");
    message.classList.add("added-to-cart");
    message.textContent = "Added to cart!";
    form.appendChild(message);
  });
});
