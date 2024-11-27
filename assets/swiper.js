document.addEventListener("DOMContentLoaded", function () {
  console.log("Content loaded")

  // Check if Swiper is loaded
  if (typeof Swiper !== "undefined") {
    const swiper = new Swiper(".swiper", {
      direction: "horizontal",
      loop: true,
      breakpoints: {
        20: {
          // Mobile screens
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        768: {
          // Tablets
          slidesPerView: 2.5,
          spaceBetween: 15,
        },
        1024: {
          // Laptops and desktops
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1440: {
          // Larger screens
          slidesPerView: 4.5,
          spaceBetween: 25,
        },
      },
      spaceBetween: 8,
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
    })
  } else {
    console.error(
      "Swiper is not defined. Ensure the Swiper library is included."
    )
  }
})
