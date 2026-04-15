// document ready
document.addEventListener('DOMContentLoaded', () => {

    // 1. Counter Animation Logic
    const counters = document.querySelectorAll('.counter-val');
    const speed = 200; // lower is faster

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                // Ensure proper formatting for large numbers
                counter.innerText = target.toLocaleString('pt-BR');
            }
        };

        // Start animation if it exists on page
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        });
        observer.observe(counter);
    });

    // 2. Leaflet Map Initialization for Agende sua Coleta
    const mapElement = document.getElementById('map');
    if (mapElement && window.L) {
        // Initialize map centered on generic location (ex: São Paulo area)
        const map = L.map('map').setView([-23.5505, -46.6333], 12);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Add some dummy collection points
        const points = [
            [-23.5505, -46.6333],
            [-23.5615, -46.6550],
            [-23.5401, -46.6400]
        ];

        points.forEach(p => {
            L.circleMarker(p, {
                color: '#66fcf1',
                radius: 8,
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map).bindPopup('Ponto de Coleta Re-Ciclo');
        });
    }

    // 3. Smooth Scrolling
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 5. Dashboard Progress Bar Logic (if on dashboard)
    const progressBar = document.getElementById('xp-progress');
    if (progressBar) {
        setTimeout(() => {
            const targetWidth = progressBar.getAttribute('data-progress') || '50%';
            progressBar.style.width = targetWidth;
        }, 500); // slight delay for visual effect
    }

    // Form Submission Feedback Mock
    const collectForm = document.getElementById('collect-form');
    if (collectForm) {
        collectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = collectForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Agendado com Sucesso! 🌿';
            btn.style.background = '#9b5de5';
            btn.style.color = '#fff';
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.color = '';
                collectForm.reset();
            }, 3000);
        });
    }

    // 6. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-links');
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
