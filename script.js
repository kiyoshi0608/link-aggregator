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
const newsData = [
    {
        platform: 'info',
        date: '2025.11.25',
        content: 'GREEN STUDIO、12月のスタジオ予約受付中！年末に向けてバンド練習はいかがですか？'
    },
    {
        platform: 'twitter',
        date: '2025.11.20',
        content: 'SABOTENの新しいライブ情報は公式サイトをチェック！全国ツアー計画中です🎸'
    },
    {
        platform: 'youtube',
        date: '2025.11.15',
        content: 'キヨシ一門YouTubeチャンネル更新中！音楽トークや弾き語り動画をアップしています🎵'
    },
    {
        platform: 'instagram',
        date: '2025.11.10',
        content: 'GREEN STUDIOの新しい機材が入荷しました📸 Instagramで写真公開中！'
    }
];

function updateNewsFeed(data) {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    newsGrid.innerHTML = data.map(item => `
        <div class="news-card">
            <div class="news-header">
                <span class="news-date">${item.date}</span>
                <span class="news-platform">${item.platform}</span>
            </div>
            <p class="news-content">${item.content}</p>
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
        ticket: 'https://sabotenrock.com/live/%e3%80%8e%e9%85%94%e3%81%84%e3%81%a9%e3%82%8c%e7%a5%ad%e3%82%8a2026%e3%80%8f/'
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
