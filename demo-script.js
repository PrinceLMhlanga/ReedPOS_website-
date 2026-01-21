// demo-script.js - Interactive functionality for demo page

document.addEventListener('DOMContentLoaded', function() {
    // Current year for footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Remove video modal functionality since video is coming soon
    const playVideoBtn = document.getElementById('playVideo');
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', function() {
            // Show a message instead of opening modal
            const comingSoonAlert = document.createElement('div');
            comingSoonAlert.className = 'coming-soon-alert';
            comingSoonAlert.innerHTML = `
                <div class="alert-content">
                    <i class="fas fa-video-slash"></i>
                    <h3>Demo Video Coming Soon!</h3>
                    <p>We're working on an amazing walkthrough of ReedPOS features. Check back soon!</p>
                    <button class="alert-close">OK</button>
                </div>
            `;
            
            // Add styles for the alert
            const style = document.createElement('style');
            style.textContent = `
                .coming-soon-alert {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                }
                .alert-content {
                    background: white;
                    padding: 40px;
                    border-radius: 15px;
                    text-align: center;
                    max-width: 500px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }
                .alert-content i {
                    font-size: 64px;
                    color: #4361ee;
                    margin-bottom: 20px;
                }
                .alert-content h3 {
                    font-size: 28px;
                    margin-bottom: 15px;
                    color: #212529;
                }
                .alert-content p {
                    color: #6c757d;
                    margin-bottom: 25px;
                    line-height: 1.6;
                }
                .alert-close {
                    background: #4361ee;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .alert-close:hover {
                    background: #3a56d4;
                    transform: translateY(-2px);
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(comingSoonAlert);
            
            // Close alert when clicking OK or outside
            const closeAlert = comingSoonAlert.querySelector('.alert-close');
            closeAlert.addEventListener('click', function() {
                document.body.removeChild(comingSoonAlert);
            });
            
            comingSoonAlert.addEventListener('click', function(e) {
                if (e.target === comingSoonAlert) {
                    document.body.removeChild(comingSoonAlert);
                }
            });
        });
    }
    
    // Remove video modal elements if they exist
    const videoModal = document.getElementById('videoModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    // Screenshot filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const screenshotCards = document.querySelectorAll('.screenshot-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter screenshots
            screenshotCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Screenshot modal functionality
    const viewButtons = document.querySelectorAll('.view-screenshot');
    const screenshotModal = document.getElementById('screenshotModal');
    const closeScreenshotBtn = document.getElementById('closeScreenshot');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const prevBtn = document.getElementById('prevScreenshot');
    const nextBtn = document.getElementById('nextScreenshot');
    
    // Screenshot data - Updated to ReedPOS
    const screenshots = [
        {
            src: "Dashboard (2).png",
            title: "Main Dashboard",
            description: "Overview of sales, inventory, and business performance at a glance with key metrics and charts."
        },
        {
            src: "sale_processing.png",
            title: "Sales Processing",
            description: "Fast checkout interface with barcode scanning, multiple payment options, and receipt generation."
        },
        {
            src: "product_management.png",
            title: "Inventory Management",
            description: "Track stock levels, manage suppliers, set reorder points, and handle stock transfers."
        },
        {
            src: "best_selling report.png",
            title: "Sales Reports",
            description: "Detailed sales analysis with charts, export options, and performance insights."
        },
        {
            src: "clients.png",
            title: "Customer Management",
            description: "Manage customer profiles, purchase history, contact details, and loyalty programs."    
        },
        {
            src: "settings.png",
            title: "System Settings",
            description: "Configure business preferences, printer settings, and tax rates."
        },
        {
            src: "product_management.png",
            title: "Product Catalog",
            description: "Add, edit, and manage products with images, categories, pricing, and stock information."
        },
        {
            src: "users.png",
            title: "User Management",
            description: "Create user accounts with role-based permissions, access control, and activity logging."
        }
    ];
    
    let currentScreenshotIndex = 0;
    
    // Open screenshot modal
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            currentScreenshotIndex = parseInt(this.getAttribute('data-index'));
            updateScreenshotModal();
            screenshotModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close screenshot modal
    if (closeScreenshotBtn) {
        closeScreenshotBtn.addEventListener('click', function() {
            screenshotModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    screenshotModal.addEventListener('click', function(e) {
        if (e.target === screenshotModal) {
            screenshotModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation between screenshots
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentScreenshotIndex = (currentScreenshotIndex - 1 + screenshots.length) % screenshots.length;
            updateScreenshotModal();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentScreenshotIndex = (currentScreenshotIndex + 1) % screenshots.length;
            updateScreenshotModal();
        });
    }
    
    // Keyboard navigation for screenshot modal
    document.addEventListener('keydown', function(e) {
        if (screenshotModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                screenshotModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (e.key === 'ArrowLeft') {
                currentScreenshotIndex = (currentScreenshotIndex - 1 + screenshots.length) % screenshots.length;
                updateScreenshotModal();
            }
            if (e.key === 'ArrowRight') {
                currentScreenshotIndex = (currentScreenshotIndex + 1) % screenshots.length;
                updateScreenshotModal();
            }
        }
    });
    
    function updateScreenshotModal() {
        const screenshot = screenshots[currentScreenshotIndex];
        modalImage.src = screenshot.src;
        modalImage.alt = screenshot.title + " - ReedPOS";
        modalTitle.textContent = screenshot.title;
        modalDescription.textContent = screenshot.description;
    }
    
    // Animate screenshot cards on scroll
    const screenshotObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe screenshot cards
    document.querySelectorAll('.screenshot-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        screenshotObserver.observe(card);
    });
    
    // Animate feature highlights
    const highlightObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe highlight items
    document.querySelectorAll('.highlight-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        highlightObserver.observe(item);
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const navBtn = document.querySelector('.btn-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navBtn) navBtn.style.display = navBtn.style.display === 'inline-flex' ? 'none' : 'inline-flex';
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                navLinks.style.gap = '15px';
                
                if (navBtn) {
                    navBtn.style.marginTop = '15px';
                    navBtn.style.width = '100%';
                }
            }
        });
    }
    
    // Add Coming Soon badge styles if not in CSS
    const comingSoonStyle = document.createElement('style');
    comingSoonStyle.textContent = `
        .coming-soon-badge {
            display: inline-block;
            background: linear-gradient(135deg, #ff6b6b, #ff8e53);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 700;
            margin-left: 15px;
            vertical-align: middle;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .coming-soon-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5;
        }
        
        .coming-soon-content {
            text-align: center;
            color: white;
            padding: 30px;
            max-width: 600px;
        }
        
        .coming-soon-content i {
            font-size: 64px;
            margin-bottom: 20px;
            color: #4cc9f0;
        }
        
        .coming-soon-content h3 {
            font-size: 32px;
            margin-bottom: 15px;
        }
        
        .coming-soon-content p {
            font-size: 18px;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        
        .coming-soon-countdown {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
        }
        
        .countdown-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .countdown-number {
            font-size: 36px;
            font-weight: 800;
            font-family: 'Montserrat', sans-serif;
            color: white;
        }
        
        .countdown-label {
            font-size: 14px;
            opacity: 0.8;
            margin-top: 5px;
        }
        
        .notify-me {
            background: #f0f5ff;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            border-left: 4px solid #4361ee;
        }
        
        .notify-me p {
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #4361ee;
        }
        
        .notify-me i {
            color: #4361ee;
        }
    `;
    
    document.head.appendChild(comingSoonStyle);

});
