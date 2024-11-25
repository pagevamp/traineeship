function headerHeightAnnouncement() {
    var announcementBar = document.querySelector(".section-announcement-bar");
    var header = document.querySelector(".header-wrapper");
    var subMenu = document.querySelectorAll(".header__submenu");
    var barHeight = announcementBar.offsetHeight;
    var headerHeight = header.offsetHeight;
    var windowHeight = window.innerHeight;
    var totalheight = headerHeight;
    var headerSection =  document.getElementById('shopify-section-header');
    if( !headerSection.classList.contains('shopify-section-header-sticky')  ) {
        totalheight = barHeight + headerHeight;
    }

    if( subMenu.length ) {
        subMenu.forEach(function (item) {
            item.setAttribute('style',`top:${totalheight}px !important;height:${windowHeight - totalheight}px`);
            // item.style.top = totalheight + `px`;
            // item.style.height = windowHeight - totalheight + "px";
        });
    }
}
document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
    summary.setAttribute('role', 'button');
    summary.setAttribute('aria-expanded', 'false');
    if(summary.nextElementSibling.getAttribute('id')) {
      summary.setAttribute('aria-controls', summary.nextElementSibling.id);
    }
  
    summary.addEventListener('click', (event) => {
        if(event.target.closest('#nav-header')){
            headerHeightAnnouncement()
            event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
            if( summary.classList.contains('second-level-menus') || summary.closest('.hamburger') ) {
            document.body.classList.add('open');
            } else {
                document.querySelector('body').classList.toggle('open');
            }
        }
    });
  
    if (summary.closest('header-drawer')) return;
    summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});

document.addEventListener('DOMContentLoaded', () => {
    headerHeightAnnouncement();
});

window.addEventListener('resize', () => {
    headerHeightAnnouncement();
});

var subMenu = document.querySelectorAll('.second-level-menus');
for (var i = 0; i < subMenu.length; i++) {
    subMenu[i].addEventListener('click', onClickSubMenu);
}

function onClickSubMenu(e) {
    var currentTarget = e.currentTarget;
    var menuParentId = currentTarget.closest('details').getAttribute('id');
    var activeMenus = document.querySelectorAll('.Details-HeaderSubMenu');
    activeMenus.forEach(function (activeMenu) {
     var activeMenuId = activeMenu.getAttribute('id');
        if (menuParentId != activeMenuId) {
            if (activeMenu.hasAttribute('open')) {
                activeMenu.removeAttribute('open');
                activeMenu.querySelector('summary').setAttribute('aria-expanded', 'false');
            }
    }
    });
}
var navHeader = document.getElementById('nav-header');
// document.addEventListener('click', function(event) {
//     var isClickInsideElement = navHeader.contains(event.target);
//     if( !event.target.closest('#nav-header')) {
//         document.body.classList.remove('open');
//         var activeMenus = document.querySelectorAll('.Details-HeaderSubMenu');
//         activeMenus.forEach(function (activeMenu) {
//             if (activeMenu.hasAttribute('open')) {
//                 activeMenu.removeAttribute('open');
//                 activeMenu.querySelector('summary').setAttribute('aria-expanded', 'false');
//             }
//         });
//     }
//     // if (!isClickInsideElement) {
//     //     document.body.classList.remove('open');
//     //     var activeMenus = document.querySelectorAll('.Details-HeaderSubMenu');
//     //     activeMenus.forEach(function (activeMenu) {
//     //         if (activeMenu.hasAttribute('open')) {
//     //             activeMenu.removeAttribute('open');
//     //             activeMenu.querySelector('summary').setAttribute('aria-expanded', 'false');
//     //         }
//     //     });
//     // }
// });


// store submenu

var storeMenu = document.querySelector('.store-menu');
var storeDropdown = document.querySelector('.utility-menu');
if(storeDropdown) {
    storeMenu.addEventListener("click", menuOpen);
    function menuOpen(){
        if( !storeDropdown.classList.contains('show') ){
            storeDropdown.classList.add('show');
        }else{
            storeDropdown.classList.remove('show');
        }
    }
}

