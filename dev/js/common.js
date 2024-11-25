// import 'bootstrap/js/dist/tab';

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Fixes vh unit in touch devices
     *
     * @since   1.0
     */
    const setupVh = () => {

        const setVh = () => {

            // get the viewport height and we multiple it by 1% to get a value for a vh unit
            let vh = window.innerHeight * 0.01;

            // set the value in the --vh custom property to the root of the document
            document.documentElement.style.setProperty(`--vh`, `${vh}px`);

        }

        setVh();
        window.addEventListener(`resize`, setVh, false);

    }

    /**
     * Chocks away!
     */
    setupVh();

});
const common = (($) => {

    /**
     * Fire events on document ready and bind other events
     *
     * @since   1.0.0
     */
    const ready = () => {
        pageReady();
    };
    const pageReady = () => {
        clickEvents();
        initAccordionsContentParse();
        // initRegistryButton();

    }

    class colorSwatches {
        /*For featured menu, free with purchase, and pairs well with*/
        constructor() {
            this.swatchClick();
            this.swatchChange();
            this.fwpIconClick();
            this.pwwIconClick();
            this.shopTheRoom();
        }

        swatchClick = () => {
            var colorSwatches = document.querySelectorAll('.thumb-product-card .color-swatches a');
            colorSwatches.forEach((swatch) => {
                swatch.addEventListener('click', (event) => {
                    const currentTarget = event.currentTarget,
                        clickedVariantId = currentTarget.getAttribute('data-variant-id'),
                        parentDiv = currentTarget.closest('.thumb-product-card'),
                        swatchesList = parentDiv.querySelectorAll('.swatch'),
                        varitantImages = parentDiv.querySelectorAll('.thumb-product-card-images img');
                    
                    swatchesList.forEach((item) => {
                        item.classList.remove("active");
                    });

                    currentTarget.parentNode.classList.add("active");
                    varitantImages.forEach((image) => {
                        const imageVariantId = image.getAttribute('data-variant-id');
                        if (clickedVariantId === imageVariantId) {
                            image.classList.add('show');
                            image.classList.remove('d-none');
                        } else {
                            image.classList.add('d-none');
                        }
                    })
                    // this.updatePrice(currentTarget, clickedVariantId);
                    // this.updateKitMessage(currentTarget);
                    const parentTarget = currentTarget.closest('card-variant');
                    this.updatePrice(parentTarget, clickedVariantId);
                    
                    if( currentTarget.closest('.fwp__content')) {
                        
                        this.deleteInputField(0);
                        this.createInputData(0,clickedVariantId);

                    } else if( currentTarget.closest('.pww__content'))  {
                        this.updateClickedVariant(clickedVariantId,currentTarget);
                    }
                    if( currentTarget.closest('.pww-section') ) {
                        currentTarget.closest('.pww-section').querySelector('[data-id="product-pww"]').classList.remove('checked');
                        if( document.querySelector('.add-to-cart-text') ) {
                            document.querySelector('.add-to-cart-text').remove();
                        }
                    }
                });
            });
        }

        swatchChange = () =>{
            const changeAble = document.querySelectorAll('card-variant,.menu-features-product__product');
            changeAble.forEach(element => {
                element.addEventListener('change',(event)=>{
                    
                    // clickedVariantId = currentTarget.getAttribute('data-variant-id'),
                    const currentTarget = event.currentTarget,
                        parentDiv = currentTarget.closest('.thumb-product-card'),
                        swatchesList = parentDiv.querySelectorAll('.swatch'),
                        varitantImages = parentDiv.querySelectorAll('.thumb-product-card-images img');
                    const changedElm = currentTarget.querySelector('select');
                    const clickedVariantId = changedElm.value;
                    

                    swatchesList.forEach((item) => {
                        item.classList.remove("active");
                    });

                    currentTarget.parentNode.classList.add("active");
                    varitantImages.forEach((image) => {
                        const imageVariantId = image.getAttribute('data-variant-id');
                        if (clickedVariantId === imageVariantId) {
                            image.classList.add('show');
                            image.classList.remove('d-none');
                        } else {
                            image.classList.add('d-none');
                        }
                    })
                    this.updatePrice(currentTarget, clickedVariantId);
                    // this.updateKitMessage(currentTarget);
                    if( currentTarget.closest('.fwp__content')) {
                        
                        this.deleteInputField(0);
                        this.createInputData(0,clickedVariantId);

                    } else if( currentTarget.closest('.pww__content'))  {
                        this.updateClickedVariant(clickedVariantId,currentTarget);
                    } else if( currentTarget.closest('[data-cart="shop_to_cart"]')) {
                        this.updateClickedVariantShop(clickedVariantId,currentTarget.closest('[data-cart="shop_to_cart"]'));
                    }
                    /*
                    if( currentTarget.closest('.pww-section').querySelector('[data-id="product-pww"]') ) {
                        currentTarget.closest('.pww-section').querySelector('[data-id="product-pww"]').classList.remove('checked');
                        if( document.querySelector('.add-to-cart-text') ) {
                            document.querySelector('.add-to-cart-text').remove();
                        }
                    }
                    */

                })
            });
        }
        updateClickedVariantShop(productId = null, currentEl) {
            
            if( productId != null ) {
                let formEl = currentEl.querySelector('.product-form').querySelector('form');
                formEl.querySelector('[name="id"]').value = productId;
            }
        }
        updateClickedVariant(productId = null, currentEl ) {
            if( productId != null ) {
                let formEl = currentEl.closest('.pww-section').querySelector('form');
                formEl.querySelector('[name="id"]').value = productId;
            }
        }

        updatePrice(thisobj, clickedVariantId) {
            let parentSection = '';
            let sectionType = '';
            if( thisobj != null ) {
                if( thisobj.closest(".fwp-section") ) {
                    parentSection = thisobj.closest(".fwp-section");
                    sectionType = 'fwp';
                } else if (thisobj.closest(".pww-section") ) {
                    parentSection = thisobj.closest(".pww-section");
                    sectionType = 'pww';
                } else if ( thisobj.closest('[data-cart="shop_to_cart"]') ) {
                    parentSection = thisobj.closest('[data-cart="shop_to_cart"]').querySelector('.data_url_js');
                    sectionType = 'shop';
                    
                } 
                if( parentSection ) {
                    const productUrl = parentSection.getAttribute("data-url");
                    var getProductPage = fetch(`${productUrl}?variant=${clickedVariantId}`)
                        .then((response) => response.text())
                        .then((responseText) => {
                            const html = new DOMParser().parseFromString(responseText, 'text/html')
        
                            var priceHtml = html.querySelector('.review-price [data-price="price__js"]');
                            var regularPrice = html.querySelector('.review-price .price__regular .price-item--regular');
                            var salePrice = html.querySelector('.price__sale .price-item--sale');
        
                            if( sectionType == 'pww' ) {
                                if( priceHtml ) {
                                    parentSection.querySelector('.price_js').innerHTML = priceHtml.innerHTML; 
                                }
        
                            } else if( sectionType == 'shop') {
                                if( priceHtml ) {
                                    parentSection = parentSection.closest('[data-cart="shop_to_cart"]');
                                    parentSection.querySelector('.price_js').innerHTML = priceHtml.innerHTML; 
                                }
                            } else {
        
                                if (regularPrice != null) {
                                    parentSection.querySelector('.price__sale [data-regularPrice="regular-price__js"] s').innerHTML = regularPrice.innerHTML.replace('USD', '');
                                    if( parentSection.querySelector('.pww__content') ) {
                                        parentSection.querySelector('.pww__content .price__sale .price-item--sale').innerHTML = salePrice.innerHTML.replace('USD', '');
                                    } else {
                                        parentSection.querySelector('.price__sale .price-item--sale').innerHTML = '$0';
                                    }
                                }
                            }
                            
                        });
                }

            }
        }

        // updateKitMessage(thisobj) {
        //     var kitMsg = thisobj.getAttribute('data-variant-kitmsg');
        //     let productTagEl = thisobj.closest('.thumb-product-card').querySelector('.product-tag');
        //     if( productTagEl ) {
        //
        //         productTagEl.innerText = kitMsg;
        //     }
        // }

        getVariantData(parentSection) {
            var result = JSON.parse(parentSection.querySelector('[type="application/json"]').textContent);
            return result;
        }

        fwpIconClick = () => {
            var fwpIcons = document.querySelectorAll('.fwp__checker');

            fwpIcons.forEach((icon) => {
                icon.addEventListener('click', (e)=> {
                    let parentCard = e.target.closest('.thumb-product-card');
                    let variantId;
                    if( parentCard.querySelector('select') ) {
                        variantId = parentCard.querySelector('select').value;
                    } else {
                        let activeVariant = parentCard.querySelector('.swatch.active a');
                        variantId = activeVariant.dataset.variantId;
                    }

                    e.target.closest('.fwp__checker').classList.toggle('checked')

                    if(icon.classList.contains('checked')) {
                        this.createInputData(0,variantId);
                    } else {
                        //remove input field
                        
                        this.deleteInputField(0)
                    }
                })
            })
        }
        createInputData( num,value ) {
            let extraPrice = document.getElementById('product-extra-prices');
            let fieldAlreadyAdded = extraPrice.querySelector(`[name="items[${num}]id"]`);
            if( !fieldAlreadyAdded ) {
                var x = document.createElement("INPUT");
                x.setAttribute("type", "hidden");
                x.setAttribute("name", `items[${num}]id`);
                x.setAttribute("value", value);
                // return x;
                extraPrice.appendChild(x);
            }
        }
        deleteInputField( num ) {
            let extraPrice = document.getElementById('product-extra-prices');
            let fieldAlreadyAdded = extraPrice.querySelector(`[name="items[${num}]id"]`);
            if( fieldAlreadyAdded ) {
                fieldAlreadyAdded.remove();
            }
        }
        pwwIconClick = () => {
            var pwwIcons = document.querySelectorAll('.pww-section [data-id="product-pww"]');
            pwwIcons.forEach((icon) => {
                icon.addEventListener('click', (e) => {
                    let parentEl = e.target.closest('.pww-section');
                    var checkedValue = e.target.parentNode.classList.toggle('checked');
                    if (e.target.parentNode.classList.contains('checked')) {
                        icon.closest('.thumb-product-card').querySelector('card-variant').insertAdjacentHTML('beforeend', '<div class="add-to-cart-text icon-tick text-basil body-sm position-absolute bottom-0 end-0 mb-1"><span class="ms-1">Added to cart</span></div>');
                        icon.closest('.thumb-product-card').classList.add('checked');
                        e.target.closest('.pww-section').querySelector('form').querySelector('[type="submit"]').click();
                        setTimeout(() => {
                            e.target.parentNode.classList.remove('checked');
                        
                            document.querySelector('.add-to-cart-text').remove();
                            icon.closest('.thumb-product-card').classList.remove('checked');
                        }, 10000);
                    } else {
                        parentEl.querySelector('.card-variants').classList.remove('pe-none')
                        icon.closest('.thumb-product-card').querySelector('.add-to-cart-text').remove();
                        icon.closest('.thumb-product-card').classList.remove('checked');
                    }
                })
            })
        }
        shopTheRoom = () =>{
        var spots = document.querySelectorAll('.shop-the-room [data-spot="index-spot"] ');
            spots.forEach((spot)=>{
                document.addEventListener('click', function(event) {
                    /**if clicked outside spot and its div content*/
                    var container = spot.closest('.spots');
                    var cardVariant = spot.parentElement.querySelector('card-variant');

                    if (!spot.contains(event.target) && !cardVariant.contains(event.target)) {
                        container.classList.remove('active-spot','preview');
                    }
                });
                spot.addEventListener('click',function () {
                    if (spot.closest('.preview') == null) {
                        spot.parentElement.classList.add('active-spot','preview');

                    }else{
                        spot.parentElement.classList.remove('active-spot','preview');
                    }
                });
                spot.addEventListener('mouseover', function(){
                    spot.parentElement.classList.add('active-spot');
                });
                spot.addEventListener('mouseleave', function(){
                    if (spot.closest('.preview') == null){
                    spot.parentElement.classList.remove('active-spot');
                    }
                })
            })
            /**if clicked outside dropdown*/
            document.addEventListener('click', function(event) {
                const dropDownJSAll = document.querySelectorAll('.section-shop-the-room .dropDown__js .btn-group');
                if (dropDownJSAll.length > 0) {
                    dropDownJSAll.forEach((dropDownJS) => {
                        if (!dropDownJS.contains(event.target)) {
                            if (dropDownJS.classList.contains('open')) {
                                dropDownJS.classList.remove('open');
                                dropDownJS.querySelector('.liList').classList.remove('open');
                            }
                        }
                    })
                }
            })
        };
        fetchConfig(type = 'json') {
            return {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
            };
        }
        addToCart(productId = null ) {
            if( productId != null ) {
                let cartObj = {
                    quantity : 1,
                    id : productId
                };

                // fetch(`/cart/update.js`, {
                fetch(`${routes.cart_add_url}`, {
                    ...this.fetchConfig(),
                    body: JSON.stringify(cartObj)
                })
                .then((response) => {
                    return response.text();
                })
                .then((state) => {
                }).catch((error) => {
                });
            }

        }

    };
    const clickEvents = () => {
        if (document.querySelector('.color-swatches') != null) {
            new colorSwatches();
        }
    };
    const initAccordionsContentParse = () => {
        var accordionContents = document.querySelectorAll('.accordion__content p');
        accordionContents.forEach((accordionContent) => {
            var content = accordionContent.innerHTML;
            var regularExpression= /([^[]+(?=]))/g
            // var regularExpression= /(?<=\[).*?(?=\])/g;
            // var regularExpression= '';

            var getLinks= content.match(regularExpression);
            if (getLinks != null) {
                getLinks.forEach((link) => {
                    var fields = link.split('~');
                    var linkValue = fields[0];
                    var label = fields[1];
                    var linkTarget = '';
                    if (fields[2] != undefined){
                        linkTarget = fields[2];
                    }
                    if (linkValue){
                    var finalResult =  '<a href="' + linkValue + '" target="'+linkTarget+'">' + label.replaceAll('-',' ') + '</a>';
                    content = content.replace('['+link+']',finalResult);
                    }else{
                    content = content.replace('['+link+']','');
                    }
                })
                accordionContent.innerHTML = content;
            }
        })
    };
    // const initRegistryButton = () => {
    //
    //     const registryBtn = document.getElementById("addToRegistry");
    //     registryBtn.addEventListener('click', function () {
    //         var active_product_url = registryBtn.dataset.url;
    //         var main_active_product_title = registryBtn.dataset.title;
    //         const active_product_image = document.querySelector('.product__media-item.is-active img').src;
    //         var active_product_price = registryBtn.dataset.price;
    //         var active_product_id = registryBtn.dataset.variantId;
    //          active_product_url = active_product_url + '?variant=' + active_product_id;
    //         bl.addToRegistry({
    //             images: active_product_image,
    //             price: active_product_price,
    //             title: main_active_product_title,
    //             url: active_product_url
    //         });
    //     });
    //
    // };
    /**
     * Only expose the ready function to the world
     */
    return {
        ready: ready
    }

})
(jQuery);

jQuery(common.ready);

