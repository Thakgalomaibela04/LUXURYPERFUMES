/**
 * L'Élixir Luxury Perfumes - Main Application Script
 * Covers Part 3 Requirements: Lightbox, Dynamic Filtering, Interactive Map, Accordions
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAccordion();
    initGalleryLightbox();
    initProductFilter();
    initBoutiqueMap();
});

/* ==========================================
   1. NAVIGATION & SMOOTH ANIMATIONS
   ========================================== */
/**
 * Dynamic Navigation Highlighting
 * Finds the current active HTML page and applies the black box + gold bottom border.
 */
function highlightActiveNav() {
    // Get the current page file name (default to 'index.html')
    let currentPage = window.location.pathname.split('/').pop().toLowerCase();
    if (!currentPage || currentPage === '') {
        currentPage = 'index.html';
    }

    // Select all links in the navigation bar
    const navLinks = document.querySelectorAll('a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (!linkHref) return;

        const cleanHref = linkHref.toLowerCase().trim();

        // Check if link matches current page name
        if (cleanHref === currentPage) {
            link.style.backgroundColor = '#111111';
            link.style.color = '#ffffff';
            link.style.padding = '8px 14px';
            link.style.borderBottom = '3px solid #c5a059'; // Gold accent line
            link.style.display = 'inline-block';
            link.style.textDecoration = 'none';
        }
    });
}

// Execute immediately when the script loads
highlightActiveNav();

// Also execute when full DOM is ready
document.addEventListener('DOMContentLoaded', highlightActiveNav);


/* ==========================================
   2. ACCORDION (Fragrance Profiles & Notes)
   ========================================== */
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentActive = document.querySelector('.accordion-header.active');
            
            // Close other accordions
            if (currentActive && currentActive !== header) {
                currentActive.classList.remove('active');
                currentActive.nextElementSibling.style.maxHeight = null;
            }

            header.classList.toggle('active');
            const content = header.nextElementSibling;
            
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });
}

/* ==========================================
   3. GALLERY LIGHTBOX
   ========================================== */
function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-target');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!lightboxModal) return;

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxModal.style.display = 'flex';
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = img.dataset.caption || img.alt;
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightboxModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.style.display = 'none';
        }
    });
}

/* ==========================================
   4. DYNAMIC CONTENT & SEARCH / FILTER
   ========================================== */
function initProductFilter() {
    const searchInput = document.getElementById('product-search');
    const filterSelect = document.getElementById('category-filter');
    const productCards = document.querySelectorAll('.product-card');

    if (!searchInput && !filterSelect) return;

    function filterProducts() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const selectedCategory = filterSelect ? filterSelect.value : 'all';

        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('keyup', filterProducts);
    if (filterSelect) filterSelect.addEventListener('change', filterProducts);
}

/* ==========================================
   5. INTERACTIVE BOUTIQUE MAP (Leaflet.js)
   ========================================== */
function initBoutiqueMap() {
    const mapContainer = document.getElementById('boutique-map');
    
    // Check if Leaflet script and map container exist
    if (mapContainer && typeof L !== 'undefined') {
        // Paris Luxury Boutique Location
        const map = L.map('boutique-map').setView([48.8661, 2.3078], 14);

        // Elegant Dark/Custom Map Tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Custom Gold Marker
        const luxuryMarker = L.marker([48.8661, 2.3078]).addTo(map);
        luxuryMarker.bindPopup(`
            <div style="text-align:center; font-family: sans-serif;">
                <h4 style="margin:0; color:#8a704c;">L'Élixir Flagship Store</h4>
                <p style="margin:5px 0 0; font-size:12px;">75 Avenue des Champs-Élysées, Paris</p>
            </div>
        `).openPopup();
    }
}