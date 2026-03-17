// Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });
}

// Close menu when clicking links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Dynamic news feed
const newsData = [];

function updateNewsFeed(data) {
    const newsSection = document.getElementById('news');
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid || !newsSection) return;

    if (data.length === 0) {
        newsSection.style.display = 'none';
        return;
    }

    newsSection.style.display = 'block';
    newsGrid.innerHTML = data.map(item => `
        <div class="news-card">
            <div class="news-header">
                <span class="news-date">${item.date}</span>
                <span class="news-tag">${item.tag}</span>
            </div>
            <p class="news-title"><a href="${item.link}" target="_blank">${item.title}</a></p>
        </div>
    `).join('');
}

// Dynamic Live Schedule
const liveData = [
    {
        date: '2026.04.04',
        day: 'SAT',
        title: '『酔いどれ祭り2026』',
        venue: '阪急庄内駅前東ストリート',
        ticket: 'https://sabotenrock.com/live/'
    },
    {
        date: '2026.04.20',
        day: 'MON',
        title: '「よしきときよしvol.1」',
        venue: '京都 音まかす',
        ticket: 'https://tiget.net/events/470983'
    }
];

function updateLiveSchedule(data) {
    const liveGrid = document.querySelector('.live-grid');
    if (!liveGrid) return;

    liveGrid.innerHTML = data.map(item => `
        <div class="live-card">
            <div class="live-date-box">
                <span class="live-date">${item.date}</span>
                <span class="live-day">${item.day}</span>
            </div>
            <div class="live-info">
                <h3 class="live-title">${item.title}</h3>
                <p class="live-venue">${item.venue}</p>
            </div>
            <div class="live-status">
                <a href="${item.ticket}" target="_blank" class="ticket-btn">TICKET</a>
            </div>
        </div>
    `).join('');
}

// Initialize News Feed
document.addEventListener('DOMContentLoaded', () => {
    updateNewsFeed(newsData);
    updateLiveSchedule(liveData);
});

// Observe sections for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appeared');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});
