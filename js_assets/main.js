/**
 * THE LUXURY PERFUMES — shared site behaviour
 * Navigation, scroll reveal, cart drawer, catalogue filtering.
 */

(function () {
    "use strict";

    var CART_KEY = "luxuryPerfumeCart";

    document.addEventListener("DOMContentLoaded", function () {
        initHeader();
        initNavigation();
        initReveal();
        initYear();
        initCartDrawer();
        initCartCount();
        initCatalogue();
        initAccordion();
        initLightbox();
        initBoutiqueMap();
    });

    /* =========================================
       1. STICKY HEADER STATE
       ========================================= */

    function initHeader() {
        var header = document.getElementById("site-header");
        if (!header) return;

        function onScroll() {
            header.classList.toggle("is-scrolled", window.scrollY > 12);
        }

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* =========================================
       2. MOBILE NAVIGATION
       ========================================= */

    function initNavigation() {
        var toggle = document.querySelector(".nav-toggle");
        var nav = document.getElementById("primary-nav");
        if (!toggle || !nav) return;

        toggle.addEventListener("click", function () {
            var open = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        });

        nav.addEventListener("click", function (event) {
            if (event.target.tagName === "A" && !event.target.hasAttribute("data-cart-open")) {
                nav.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && nav.classList.contains("is-open")) {
                nav.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.focus();
            }
        });
    }

    /* =========================================
       3. SCROLL REVEAL
       ========================================= */

    function initReveal() {
        var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
        if (!items.length) return;

        if (!("IntersectionObserver" in window)) {
            items.forEach(function (el) { el.classList.add("is-visible"); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, index) {
                if (!entry.isIntersecting) return;

                var el = entry.target;
                window.setTimeout(function () {
                    el.classList.add("is-visible");
                }, Math.min(index * 70, 350));

                observer.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        items.forEach(function (el) { observer.observe(el); });
    }

    /* =========================================
       4. FOOTER YEAR
       ========================================= */

    function initYear() {
        var year = String(new Date().getFullYear());
        document.querySelectorAll("[data-year]").forEach(function (el) {
            el.textContent = year;
        });
    }

    /* =========================================
       5. CART DRAWER
       ========================================= */

    function initCartDrawer() {
        var drawer = document.getElementById("lp-cart");
        if (!drawer || !drawer.classList.contains("cart-drawer")) return;

        var overlay = document.getElementById("cart-overlay");

        function open() {
            drawer.classList.add("is-open");
            drawer.setAttribute("aria-hidden", "false");
            if (overlay) {
                overlay.hidden = false;
                overlay.classList.add("is-open");
            }
            document.body.classList.add("no-scroll");

            var close = drawer.querySelector("[data-cart-close]");
            if (close) close.focus();
        }

        function close() {
            drawer.classList.remove("is-open");
            drawer.setAttribute("aria-hidden", "true");
            if (overlay) overlay.classList.remove("is-open");
            document.body.classList.remove("no-scroll");
        }

        document.querySelectorAll("[data-cart-open]").forEach(function (trigger) {
            trigger.addEventListener("click", function (event) {
                event.preventDefault();
                open();
            });
        });

        // Adding a fragrance opens the bag so the client sees it land.
        document.addEventListener("cart:add", open);

        document.querySelectorAll("[data-cart-close]").forEach(function (el) {
            el.addEventListener("click", function (event) {
                event.preventDefault();
                close();
            });
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && drawer.classList.contains("is-open")) {
                close();
            }
        });

        // Deep link: products.html#lp-cart opens the bag on arrival.
        if (window.location.hash === "#lp-cart") {
            window.setTimeout(open, 250);
        }
    }

    /* =========================================
       6. BAG COUNT (every page)
       ========================================= */

    function initCartCount() {
        var badge = document.getElementById("lp-cart-count");
        if (!badge) return;

        var count = 0;

        try {
            var saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
            if (Array.isArray(saved)) {
                saved.forEach(function (item) {
                    var qty = Number(item && item.quantity);
                    if (Number.isFinite(qty) && qty > 0) count += qty;
                });
            }
        } catch (error) {
            count = 0;
        }

        badge.textContent = count;
    }

    /* =========================================
       7. CATALOGUE — SEARCH, FILTER, SORT
       ========================================= */

    function initCatalogue() {
        var grid = document.getElementById("lp-product-grid");
        if (!grid) return;

        var cards = Array.prototype.slice.call(grid.querySelectorAll(".product-card"));
        var search = document.getElementById("lp-search");
        var sort = document.getElementById("lp-sort");
        var filters = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
        var results = document.getElementById("lp-results");
        var empty = document.getElementById("lp-no-results");

        var state = { term: "", category: "all", sort: "featured" };
        var total = cards.length;

        function apply() {
            var shown = 0;

            cards.forEach(function (card) {
                var name = (card.dataset.name || card.textContent || "").toLowerCase();
                var category = (card.dataset.category || "").toLowerCase();

                var matchesTerm = !state.term || name.indexOf(state.term) !== -1;
                var matchesCategory = state.category === "all" || category === state.category;

                if (matchesTerm && matchesCategory) {
                    card.hidden = false;
                    card.style.display = "";
                    shown += 1;
                } else {
                    card.hidden = true;
                    card.style.display = "none";
                }
            });

            // Ordering
            var ordered = cards.slice();
            if (state.sort === "price-asc" || state.sort === "price-desc") {
                var dir = state.sort === "price-asc" ? 1 : -1;
                ordered.sort(function (a, b) {
                    return (Number(a.dataset.price) - Number(b.dataset.price)) * dir;
                });
            } else if (state.sort === "name") {
                ordered.sort(function (a, b) {
                    return (a.dataset.name || "").localeCompare(b.dataset.name || "");
                });
            } else {
                ordered.sort(function (a, b) {
                    return cards.indexOf(a) - cards.indexOf(b);
                });
            }

            ordered.forEach(function (card) {
                card.style.order = String(ordered.indexOf(card));
            });

            if (results) {
                results.textContent = shown === total
                    ? "Showing " + total + " fragrances"
                    : "Showing " + shown + " of " + total + " fragrances";
            }

            if (empty) empty.hidden = shown !== 0;
        }

        if (search) {
            search.addEventListener("input", function () {
                state.term = search.value.trim().toLowerCase();
                apply();
            });
        }

        if (sort) {
            sort.addEventListener("change", function () {
                state.sort = sort.value;
                apply();
            });
        }

        filters.forEach(function (button) {
            button.addEventListener("click", function () {
                filters.forEach(function (btn) { btn.classList.remove("is-active"); });
                button.classList.add("is-active");
                state.category = button.dataset.filter || "all";
                apply();
            });
        });

        apply();
    }

    /* =========================================
       8. ACCORDION (optional component)
       ========================================= */

    function initAccordion() {
        document.querySelectorAll(".accordion-header").forEach(function (header) {
            header.addEventListener("click", function () {
                var content = header.nextElementSibling;
                if (!content) return;

                var active = document.querySelector(".accordion-header.active");
                if (active && active !== header) {
                    active.classList.remove("active");
                    if (active.nextElementSibling) {
                        active.nextElementSibling.style.maxHeight = null;
                    }
                }

                header.classList.toggle("active");
                content.style.maxHeight = header.classList.contains("active")
                    ? content.scrollHeight + "px"
                    : null;
            });
        });
    }

    /* =========================================
       9. LIGHTBOX (optional component)
       ========================================= */

    function initLightbox() {
        var modal = document.getElementById("lightbox-modal");
        if (!modal) return;

        var target = document.getElementById("lightbox-target");
        var caption = document.getElementById("lightbox-caption");
        var close = modal.querySelector(".lightbox-close");

        document.querySelectorAll(".gallery-img").forEach(function (img) {
            img.addEventListener("click", function () {
                modal.style.display = "flex";
                if (target) {
                    target.src = img.src;
                    target.alt = img.alt;
                }
                if (caption) {
                    caption.textContent = img.dataset.caption || img.alt;
                }
            });
        });

        function hide() { modal.style.display = "none"; }

        if (close) close.addEventListener("click", hide);
        modal.addEventListener("click", function (event) {
            if (event.target === modal) hide();
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") hide();
        });
    }

    /* =========================================
       10. BOUTIQUE MAP (Leaflet, if present)
       ========================================= */

    function initBoutiqueMap() {
        var container = document.getElementById("boutique-map");
        if (!container || typeof window.L === "undefined") return;

        var point = [-25.7461, 28.1881];

        var map = window.L.map("boutique-map").setView(point, 13);

        window.L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
            {
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
                subdomains: "abcd",
                maxZoom: 19
            }
        ).addTo(map);

        window.L.marker(point).addTo(map)
            .bindPopup("The Luxury Perfumes — Sunnyside, Pretoria")
            .openPopup();
    }
})();
