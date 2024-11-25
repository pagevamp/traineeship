// document.addEventListener('DOMContentLoaded', () => {
//     function initAccordion() {
//         var allAccElems = document.querySelectorAll(".footer-block");
//         allAccElems.forEach((item) => {
//             item.addEventListener('click', (event) => {
//                 const panel = event.currentTarget;
//                 var openAcc = panel.querySelector("h2");
//                 var openAccContent = panel.querySelector("ul");
//                 if (openAcc.classList.contains('active') === true) {
//                     openAcc.classList.remove("active");
//                     openAccContent.classList.remove("active");
//                 } else {
//                     var expandedAcc = document.querySelector(".footer-block__heading.active");
//                     var expandedContent = document.querySelector(".footer-block__details-content.active");
//                     if (expandedAcc && expandedContent) {
//                         expandedAcc.classList.remove("active");
//                         expandedContent.classList.remove("active");
//                     }
//                     openAcc.classList.add("active");
//                     openAccContent.classList.add("active");
//                 }
//             })
//         })
//
//     }
//     initAccordion();
// });
