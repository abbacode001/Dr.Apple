/* ==========================================
   DR APPLE
   JAVASCRIPT
   Matched to index(3).html + style(1).css
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       PRODUCTS
       ========================================== */

    var products = [
        {
            id: 1,
            name: "iPhone 15",
            category: "iphone",
            description: "128GB • Excellent performance",
            price: 950000,
            badge: "Popular",
            image: "iphone15.jpg"
        },
        {
            id: 2,
            name: "iPhone 15 Pro",
            category: "iphone",
            description: "256GB • Pro performance",
            price: 1250000,
            badge: "Pro",
            image: "iphone15pro.jpg"
        },
        {
            id: 3,
            name: "iPhone 16",
            category: "iphone",
            description: "128GB • Latest generation",
            price: 1150000,
            badge: "New",
            image: "iphone16.jpg"
        },
        {
            id: 4,
            name: "iPhone 16 Pro",
            category: "iphone",
            description: "256GB • Titanium design",
            price: 1500000,
            badge: "Premium",
            image: "iphone16pro.jpg"
        },
        {
            id: 5,
            name: "Samsung Galaxy S24",
            category: "samsung",
            description: "256GB • Galaxy flagship",
            price: 1100000,
            badge: "Popular",
            image: "galaxyS24.jpg"
        },
        {
            id: 6,
            name: "Samsung Galaxy S24 Ultra",
            category: "samsung",
            description: "256GB • Ultra performance",
            price: 1450000,
            badge: "Ultra",
            image: "galaxyultras24.jpg"
        },
        {
            id: 7,
            name: "AirPods Pro",
            category: "accessories",
            description: "Premium wireless audio",
            price: 320000,
            badge: "Accessory",
            image: "airpod.jpg"
        },
        {
            id: 8,
            name: "Apple Watch",
            category: "accessories",
            description: "Premium smart watch",
            price: 450000,
            badge: "Accessory",
            image: "applewatch.jpg"
        }
    ];


    /* ==========================================
       VARIABLES
       ========================================== */

    var activeCategory = "all";
    var cart = [];


    /* ==========================================
       ELEMENTS FROM YOUR HTML
       ========================================== */

    var productsGrid =
        document.getElementById("productsGrid");

    var emptyProducts =
        document.getElementById("emptyProducts");

    var searchInput =
        document.getElementById("searchInput");

    var categoryButtons =
        document.querySelectorAll(".category-btn");

    var cartBtn =
        document.getElementById("cartBtn");

    var cartSidebar =
        document.getElementById("cartSidebar");

    var cartOverlay =
        document.getElementById("cartOverlay");

    var closeCart =
        document.getElementById("closeCart");

    var cartItems =
        document.getElementById("cartItems");

    var cartCount =
        document.getElementById("cartCount");

    var cartTotal =
        document.getElementById("cartTotal");

    var menuBtn =
        document.getElementById("menuBtn");

    var nav =
        document.getElementById("nav");

    var themeBtn =
        document.getElementById("themeBtn");

    var header =
        document.getElementById("header");

    var backTop =
        document.getElementById("backTop");

    var pageLoader =
        document.getElementById("pageLoader");

    var year =
        document.getElementById("year");


    /* ==========================================
       MONEY
       ========================================== */

    function formatMoney(number) {

        return "₦" + Number(number).toLocaleString("en-NG");

    }


    /* ==========================================
       DISPLAY PRODUCTS
       ========================================== */

    function renderProducts() {

        if (!productsGrid) {
            return;
        }


        var searchText = "";

        if (searchInput) {

            searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();

        }


        var filteredProducts = [];


        for (
            var i = 0;
            i < products.length;
            i++
        ) {

            var product =
                products[i];


            var categoryMatch =
                activeCategory === "all" ||
                product.category === activeCategory;


            var searchMatch =
                product.name
                    .toLowerCase()
                    .indexOf(searchText) !== -1 ||

                product.description
                    .toLowerCase()
                    .indexOf(searchText) !== -1;


            if (
                categoryMatch &&
                searchMatch
            ) {

                filteredProducts.push(product);

            }

        }


        productsGrid.innerHTML = "";


        if (
            filteredProducts.length === 0
        ) {

            if (emptyProducts) {

                emptyProducts.style.display =
                    "block";

            }

            return;

        }


        if (emptyProducts) {

            emptyProducts.style.display =
                "none";

        }


        for (
            var j = 0;
            j < filteredProducts.length;
            j++
        ) {

            createProductCard(
                filteredProducts[j]
            );

        }

    }


    /* ==========================================
       PRODUCT CARD
       ========================================== */

    function createProductCard(product) {

        var card =
            document.createElement("article");


        card.className =
            "product-card";


        var imageHTML = "";


        if (product.image !== "") {

            imageHTML =
                '<img src="' +
                product.image +
                '" alt="' +
                product.name +
                '">';

        } else {

            imageHTML =
                '<div class="product-placeholder">' +
                    '<i class="fa-brands fa-apple"></i>' +
                '</div>';

        }


        card.innerHTML =

            '<div class="product-image">' +

                imageHTML +

                '<span class="product-badge">' +
                    product.badge +
                '</span>' +

            '</div>' +

            '<div class="product-info">' +

                '<span class="product-category">' +
                    product.category +
                '</span>' +

                '<h3>' +
                    product.name +
                '</h3>' +

                '<p>' +
                    product.description +
                '</p>' +

                '<div class="product-bottom">' +

                    '<span class="product-price">' +
                        formatMoney(product.price) +
                    '</span>' +

                    '<button ' +
                        'type="button" ' +
                        'class="add-cart" ' +
                        'data-id="' +
                        product.id +
                    '">' +

                        '<i class="fa-solid fa-plus"></i>' +

                    '</button>' +

                '</div>' +

            '</div>';


        productsGrid.appendChild(card);


        var addButton =
            card.querySelector(".add-cart");


        if (addButton) {

            addButton.addEventListener(
                "click",
                function () {

                    var id =
                        Number(
                            this.getAttribute(
                                "data-id"
                            )
                        );


                    addToCart(id);

                }
            );

        }

    }


    /* ==========================================
       SEARCH
       ========================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                renderProducts();

            }
        );

    }


    /* ==========================================
       CATEGORY FILTER
       ========================================== */

    for (
        var i = 0;
        i < categoryButtons.length;
        i++
    ) {

        categoryButtons[i].addEventListener(
            "click",
            function () {

                for (
                    var j = 0;
                    j < categoryButtons.length;
                    j++
                ) {

                    categoryButtons[j]
                        .classList
                        .remove("active");

                }


                this.classList.add("active");


                activeCategory =
                    this.getAttribute(
                        "data-category"
                    );


                renderProducts();

            }
        );

    }


    /* ==========================================
       ADD TO CART
       ========================================== */

    function addToCart(productId) {

        var product = null;


        for (
            var i = 0;
            i < products.length;
            i++
        ) {

            if (
                products[i].id === productId
            ) {

                product =
                    products[i];

                break;

            }

        }


        if (!product) {
            return;
        }


        var existingItem = null;


        for (
            var j = 0;
            j < cart.length;
            j++
        ) {

            if (
                cart[j].id === productId
            ) {

                existingItem =
                    cart[j];

                break;

            }

        }


        if (existingItem) {

            existingItem.quantity =
                existingItem.quantity + 1;

        } else {

            cart.push({

                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1

            });

        }


        updateCart();

        openCart();

    }


    /* ==========================================
       REMOVE FROM CART
       ========================================== */

    function removeFromCart(productId) {

        var newCart = [];


        for (
            var i = 0;
            i < cart.length;
            i++
        ) {

            if (
                cart[i].id !== productId
            ) {

                newCart.push(
                    cart[i]
                );

            }

        }


        cart =
            newCart;


        updateCart();

    }


    /* ==========================================
       UPDATE CART
       ========================================== */

    function updateCart() {

        if (!cartItems) {
            return;
        }


        var totalQuantity = 0;
        var totalPrice = 0;


        for (
            var i = 0;
            i < cart.length;
            i++
        ) {

            totalQuantity =
                totalQuantity +
                cart[i].quantity;


            totalPrice =
                totalPrice +
                (
                    cart[i].price *
                    cart[i].quantity
                );

        }


        if (cartCount) {

            cartCount.textContent =
                totalQuantity;

        }


        if (cartTotal) {

            cartTotal.textContent =
                formatMoney(totalPrice);

        }


        if (cart.length === 0) {

            cartItems.innerHTML =

                '<div class="empty-cart">' +

                    '<i class="fa-solid fa-bag-shopping"></i>' +

                    '<h4>Your bag is empty</h4>' +

                    '<p>Add a phone to get started.</p>' +

                '</div>';

            return;

        }


        cartItems.innerHTML = "";


        for (
            var j = 0;
            j < cart.length;
            j++
        ) {

            var item =
                cart[j];


            var cartItem =
                document.createElement("div");


            cartItem.className =
                "cart-item";


            var imageHTML = "";


            if (item.image !== "") {

                imageHTML =
                    '<img src="' +
                    item.image +
                    '" alt="' +
                    item.name +
                    '">';

            } else {

                imageHTML =
                    '<i class="fa-brands fa-apple"></i>';

            }


            cartItem.innerHTML =

                '<div class="cart-item-image">' +

                    imageHTML +

                '</div>' +

                '<div class="cart-item-details">' +

                    '<h4>' +
                        item.name +
                    '</h4>' +

                    '<span>' +
                        item.quantity +
                        " × " +
                        formatMoney(item.price) +
                    '</span>' +

                '</div>' +

                '<button ' +
                    'type="button" ' +
                    'class="remove-cart" ' +
                    'data-id="' +
                    item.id +
                '">' +

                    '<i class="fa-solid fa-xmark"></i>' +

                '</button>';


            cartItems.appendChild(
                cartItem
            );


            var removeButton =
                cartItem.querySelector(
                    ".remove-cart"
                );


            if (removeButton) {

                removeButton.addEventListener(
                    "click",
                    function () {

                        var id =
                            Number(
                                this.getAttribute(
                                    "data-id"
                                )
                            );


                        removeFromCart(id);

                    }
                );

            }

        }

    }


    /* ==========================================
       OPEN CART
       ========================================== */

    function openCart() {

        if (cartSidebar) {

            cartSidebar.classList.add(
                "active"
            );

        }


        if (cartOverlay) {

            cartOverlay.classList.add(
                "active"
            );

        }


        document.body.style.overflow =
            "hidden";

    }


    /* ==========================================
       CLOSE CART
       ========================================== */

    function closeCartMenu() {

        if (cartSidebar) {

            cartSidebar.classList.remove(
                "active"
            );

        }


        if (cartOverlay) {

            cartOverlay.classList.remove(
                "active"
            );

        }


        document.body.style.overflow =
            "";

    }


    if (cartBtn) {

        cartBtn.addEventListener(
            "click",
            function () {

                openCart();

            }
        );

    }


    if (closeCart) {

        closeCart.addEventListener(
            "click",
            function () {

                closeCartMenu();

            }
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            function () {

                closeCartMenu();

            }
        );

    }


    /* ==========================================
       MOBILE MENU
       ========================================== */

    if (menuBtn && nav) {

        menuBtn.addEventListener(
            "click",
            function () {

                nav.classList.toggle(
                    "open"
                );

            }
        );

    }


    var navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    for (
        var i = 0;
        i < navLinks.length;
        i++
    ) {

        navLinks[i].addEventListener(
            "click",
            function () {

                if (nav) {

                    nav.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    /* ==========================================
       HEADER SCROLL
       ========================================== */

    window.addEventListener(
        "scroll",
        function () {

            if (header) {

                if (
                    window.scrollY > 30
                ) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

            }


            if (backTop) {

                if (
                    window.scrollY > 500
                ) {

                    backTop.classList.add(
                        "active"
                    );

                } else {

                    backTop.classList.remove(
                        "active"
                    );

                }

            }

        }
    );


    /* ==========================================
       BACK TO TOP
       ========================================== */

    if (backTop) {

        backTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* ==========================================
       DARK / LIGHT MODE
       ========================================== */

    function setTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add(
                "dark"
            );


            if (themeBtn) {

                themeBtn.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';

            }

        } else {

            document.body.classList.remove(
                "dark"
            );


            if (themeBtn) {

                themeBtn.innerHTML =
                    '<i class="fa-solid fa-moon"></i>';

            }

        }


        try {

            localStorage.setItem(
                "drAppleTheme",
                theme
            );

        } catch (error) {

            /* Ignore localStorage errors */

        }

    }


    var savedTheme = null;


    try {

        savedTheme =
            localStorage.getItem(
                "drAppleTheme"
            );

    } catch (error) {

        savedTheme = null;

    }


    if (savedTheme === "dark") {

        setTheme("dark");

    } else {

        setTheme("light");

    }


    if (themeBtn) {

        themeBtn.addEventListener(
            "click",
            function () {

                var dark =
                    document.body.classList.contains(
                        "dark"
                    );


                if (dark) {

                    setTheme("light");

                } else {

                    setTheme("dark");

                }

            }
        );

    }


    /* ==========================================
       REVEAL ANIMATIONS
       ========================================== */

    var revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {

        var revealObserver =
            new IntersectionObserver(
                function (entries) {

                    for (
                        var i = 0;
                        i < entries.length;
                        i++
                    ) {

                        if (
                            entries[i]
                                .isIntersecting
                        ) {

                            entries[i]
                                .target
                                .classList
                                .add(
                                    "visible"
                                );


                            revealObserver.unobserve(
                                entries[i].target
                            );

                        }

                    }

                },
                {
                    threshold: 0.12
                }
            );


        for (
            var i = 0;
            i < revealElements.length;
            i++
        ) {

            revealObserver.observe(
                revealElements[i]
            );

        }

    } else {

        for (
            var i = 0;
            i < revealElements.length;
            i++
        ) {

            revealElements[i]
                .classList
                .add("visible");

        }

    }


    /* ==========================================
       NUMBER COUNTERS
       ========================================== */

    var counters =
        document.querySelectorAll(
            ".counter"
        );


    function animateCounter(element) {

        var target =
            Number(
                element.getAttribute(
                    "data-target"
                )
            );


        if (!target) {
            return;
        }


        var current = 0;


        var increment =
            Math.max(
                1,
                Math.ceil(target / 50)
            );


        function count() {

            current =
                current + increment;


            if (current >= target) {

                element.textContent =
                    target;

                return;

            }


            element.textContent =
                current;


            window.requestAnimationFrame(
                count
            );

        }


        count();

    }


    if (
        "IntersectionObserver" in window
    ) {

        var counterObserver =
            new IntersectionObserver(
                function (entries) {

                    for (
                        var i = 0;
                        i < entries.length;
                        i++
                    ) {

                        if (
                            entries[i]
                                .isIntersecting
                        ) {

                            animateCounter(
                                entries[i].target
                            );


                            counterObserver.unobserve(
                                entries[i].target
                            );

                        }

                    }

                },
                {
                    threshold: 0.5
                }
            );


        for (
            var i = 0;
            i < counters.length;
            i++
        ) {

            counterObserver.observe(
                counters[i]
            );

        }

    } else {

        for (
            var i = 0;
            i < counters.length;
            i++
        ) {

            animateCounter(
                counters[i]
            );

        }

    }


    /* ==========================================
       FOOTER YEAR
       ========================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* ==========================================
       PAGE LOADER
       ========================================== */

    window.addEventListener(
        "load",
        function () {

            if (!pageLoader) {
                return;
            }


            setTimeout(
                function () {

                    pageLoader.classList.add(
                        "hide"
                    );

                },
                700
            );

        }
    );


    /* ==========================================
       START
       ========================================== */

    renderProducts();

    updateCart();

});
