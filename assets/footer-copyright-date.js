document.addEventListener("DOMContentLoaded", function () {
  const copyrightElements = document.getElementsByClassName("copyright-date");
  const currentYear = new Date().getFullYear();

  for (const element of copyrightElements) {
    const additionalText = element.getAttribute("data-text") || "";
    element.innerHTML = `&copy; ${currentYear} ${additionalText}`;
  }
});
