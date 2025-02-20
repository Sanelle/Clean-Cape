// Sample Vendor Data (Replace with API calls in production)
const vendors = [
    {
        id: 1,
        name: "Sparkle Pro Cleaners",
        rating: 4.8,
        location: "Sea Point",
        image: "https://i.postimg.cc/wvnkN6Dy/full-shot-people-cleaning-office.jpg",
        services: ["Deep Cleaning", "Office Cleaning", "Carpet Cleaning"],
        priceRange: "ZAR 300-500",
        type: "home"
    },
    {
        id: 2,
        name: "Eco Green Clean",
        rating: 4.9,
        location: "Claremont",
        image: "https://i.postimg.cc/zBHC894J/medium-shot-workers-with-cleaning-cart.jpg",
        services: ["Eco Cleaning", "Spring Cleaning", "Move-In Cleaning"],
        priceRange: "ZAR 400-600",
        type: "office"
    },
    {
        id: 3,
        name: "Quick Shine Services",
        rating: 4.7,
        location: "City Bowl",
        image: "https://i.postimg.cc/258TR9z6/professional-cleaning-service-person-using-vacuum-cleaner-office.jpg",
        services: ["Vehicle Cleaning", "Post-Construction Cleaning"],
        priceRange: "ZAR 500-700",
        type: "vehicle"
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderVendors(vendors); // Render all vendors initially
    initFilters(); // Initialize filter buttons
    initBookingModal(); // Initialize booking modal
});

// Render Vendor Cards
function renderVendors(vendors) {
    const container = document.getElementById('vendorsContainer');
    container.innerHTML = ''; // Clear existing content

    vendors.forEach(vendor => {
        const card = document.createElement('div');
        card.className = 'vendor-card';
        card.innerHTML = `
            <img src="${vendor.image}" alt="${vendor.name}">
            <div class="vendor-info">
                <h3>${vendor.name}</h3>
                <div class="rating">
                    ${renderStars(vendor.rating)}
                    <span>${vendor.rating}</span>
                </div>
                <div class="location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${vendor.location}
                </div>
                <div class="services">
                    ${vendor.services.map(service => 
                        `<span class="service-tag">${service}</span>`
                    ).join('')}
                </div>
                <button class="cta-button" onclick="openBookingModal(${vendor.id})">
                    <i class="fas fa-calendar-check"></i> Book Now
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Star Rating System
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    return `
        ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
        ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
        ${'<i class="far fa-star"></i>'.repeat(5 - fullStars - halfStar)}
    `;
}

// Initialize Filter Buttons
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');
            // Filter vendors based on the selected type
            const filterType = button.textContent.toLowerCase().trim();
            filterVendors(filterType);
        });
    });
}

// Filter Vendors
function filterVendors(filterType) {
    let filteredVendors;
    if (filterType === 'all') {
        filteredVendors = vendors; // Show all vendors
    } else {
        filteredVendors = vendors.filter(vendor => vendor.type === filterType);
    }
    renderVendors(filteredVendors); // Render filtered vendors
}

// Initialize Booking Modal
function initBookingModal() {
    const modal = document.getElementById('bookingModal');
    const closeButton = modal.querySelector('.close');
    const bookingForm = document.getElementById('bookingForm');

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal when clicking the close button
    closeButton.addEventListener('click', closeModal);

    // Handle form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(bookingForm);
        const bookingDetails = Object.fromEntries(formData.entries());
        console.log('Booking Details:', bookingDetails); // Log booking details
        alert('Booking submitted successfully!');
        closeModal();
    });
}

// Open Booking Modal with Vendor Data
function openBookingModal(vendorId) {
    const modal = document.getElementById('bookingModal');
    const vendor = vendors.find(v => v.id === vendorId);

    if (vendor) {
        // Populate modal with vendor data
        modal.querySelector('#vendorName').textContent = vendor.name;
        modal.querySelector('#vendorLocation').textContent = vendor.location;
        modal.querySelector('#vendorRating').innerHTML = renderStars(vendor.rating);
        modal.querySelector('#serviceTags').innerHTML = vendor.services
            .map(service => `<span class="service-tag">${service}</span>`)
            .join('');
    }

    modal.style.display = 'flex';
}

// Close Modal
function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}
// Open Auth Modal
function openAuthModal(type) {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authModalTitle');
    const toggleText = document.getElementById('authToggleText');

    if (type === 'signup') {
        title.textContent = 'Sign Up';
        toggleText.innerHTML = 'Already have an account? <a href="#" onclick="toggleAuthForm(\'login\')">Login</a>';
    } else {
        title.textContent = 'Login';
        toggleText.innerHTML = 'Don\'t have an account? <a href="#" onclick="toggleAuthForm(\'signup\')">Sign Up</a>';
    }

    modal.style.display = 'flex';
}

// Close Auth Modal
function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

// Toggle Auth Form
function toggleAuthForm(type) {
    openAuthModal(type);
}

// Open Vendor Details Modal
function openVendorModal(vendor) {
    const modal = document.getElementById('vendorModal');
    const vendorName = document.getElementById('vendorName');
    const rating = modal.querySelector('.rating-value');
    const location = modal.querySelector('.location span');
    const services = modal.querySelector('.service-tags');
    const description = modal.querySelector('.description p');

    vendorName.textContent = vendor.name;
    rating.textContent = vendor.rating;
    location.textContent = vendor.location;
    services.innerHTML = vendor.services.map(service => `<span class="service-tag">${service}</span>`).join('');
    description.textContent = vendor.description || 'No description available.';

    modal.style.display = 'flex';
}

// Close Vendor Details Modal
function closeVendorModal() {
    document.getElementById('vendorModal').style.display = 'none';
}

// Open Booking Modal
function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'flex';
}

// Close Booking Modal
function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}
