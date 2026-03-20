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
        if (navMenu) navMenu.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('open');
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
        date: '2026.03.19',
        tag: 'INFO',
        title: 'キヨシ公式サイトをオープンしました！',
        link: '#home'
    }
];

function updateNewsFeed(data) {
    const newsGrid = document.querySelector('.news-grid');
    const newsSection = document.getElementById('news');
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
            <p class="news-title"><a href="${item.link}">${item.title}</a></p>
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
    },
    {
        date: '2026.04.25',
        day: 'SAT',
        title: 'CAMP ROCK FRIENDS vol.6',
        venue: '奈良 OIWAKE PARK',
        ticket: 'https://crf.official.ec/'
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

// ============================================================
//  🌵 SABOTEN JUMP - Mini Game
// ============================================================
(function () {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = 800;
    const H = 220;
    canvas.width = W;
    canvas.height = H;

    const GROUND_Y = H - 45;
    const GRAVITY = 0.75;
    const JUMP_V = -15;

    // Colors
    const C = {
        bg: '#fdfaf6',
        ground: '#2c3e38',
        green: '#3eb46b',
        darkGreen: '#2a7a4a',
        pop: '#ff6b6b',
        yellow: '#ffd166',
        white: '#ffffff',
        muted: 'rgba(44,62,56,0.25)',
    };

    let state = 'idle'; // idle | running | dead
    let score = 0;
    let hiScore = parseInt(localStorage.getItem('sabotenJumpHi') || '0');
    let speed, frameCount, nextIn, obstacles, groundOff, cloudOff, animTimer, legFrame;

    const player = { x: 90, y: 0, w: 40, h: 56, vy: 0, onGround: true };

    function reset() {
        score = 0; speed = 5; frameCount = 0; nextIn = 90;
        obstacles = []; groundOff = 0; cloudOff = 0; animTimer = 0; legFrame = 0;
        player.y = GROUND_Y - player.h;
        player.vy = 0; player.onGround = true;
    }

    function jump() {
        if (state === 'idle' || state === 'dead') { state = 'running'; reset(); return; }
        if (state === 'running' && player.onGround) {
            player.vy = JUMP_V; player.onGround = false;
        }
    }

    // Input
    document.addEventListener('keydown', e => {
        if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
    });
    canvas.addEventListener('click', jump);
    canvas.addEventListener('touchstart', e => { e.preventDefault(); jump(); }, { passive: false });

    // ── Drawing helpers ──────────────────────────────────────

    function drawGround() {
        ctx.fillStyle = C.ground;
        ctx.fillRect(0, GROUND_Y, W, 3);
        // dashes
        for (let i = 0; i < 22; i++) {
            const x = (i * 55 - groundOff % 55 + W) % W;
            ctx.fillRect(x, GROUND_Y + 7, 30, 3);
        }
        // music notes
        ctx.fillStyle = C.muted;
        ctx.font = '14px serif';
        for (let i = 0; i < 12; i++) {
            const x = (i * 80 - groundOff % 80 * 0.7 + W) % W;
            ctx.fillText('♪', x, GROUND_Y + 22);
        }
    }

    function drawClouds() {
        ctx.fillStyle = 'rgba(62,180,107,0.12)';
        [[80, 28, 22], [260, 45, 18], [480, 20, 28], [680, 38, 20]].forEach(([bx, by, r]) => {
            const x = (bx - cloudOff * 0.4 % W + W) % W;
            ctx.beginPath();
            ctx.arc(x, by, r, 0, Math.PI * 2);
            ctx.arc(x + r * 0.8, by - r * 0.3, r * 0.75, 0, Math.PI * 2);
            ctx.arc(x - r * 0.7, by - r * 0.15, r * 0.65, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function drawPlayer(isDead) {
        const { x, y, w } = player;
        const cx = x + w / 2;

        // arms
        ctx.fillStyle = C.green;
        ctx.fillRect(x - 7, y + 18, 14, 8);
        ctx.fillRect(x - 7, y + 10, 8, 12);
        ctx.fillRect(x + w - 7, y + 22, 14, 8);
        ctx.fillRect(x + w - 1, y + 14, 8, 12);

        // body
        ctx.fillRect(x + 8, y + 14, w - 16, 38);

        // head
        ctx.beginPath();
        ctx.arc(cx, y + 14, 13, 0, Math.PI * 2);
        ctx.fill();

        // spikes
        ctx.fillStyle = C.darkGreen;
        ctx.fillRect(cx - 2, y - 3, 4, 9);
        ctx.fillRect(x + 4, y + 2, 4, 7);
        ctx.fillRect(x + w - 8, y + 4, 4, 7);

        if (isDead) {
            // X eyes
            ctx.strokeStyle = C.ground;
            ctx.lineWidth = 2.5;
            [[cx - 9, y + 7, cx - 4, y + 12], [cx - 4, y + 7, cx - 9, y + 12],
            [cx + 3, y + 7, cx + 8, y + 12], [cx + 8, y + 7, cx + 3, y + 12]].forEach(([x1, y1, x2, y2]) => {
                ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
            });
            // sad mouth
            ctx.beginPath(); ctx.arc(cx, y + 22, 5, Math.PI + 0.3, 2 * Math.PI - 0.3); ctx.stroke();
        } else {
            // sunglasses
            ctx.fillStyle = C.ground;
            ctx.fillRect(cx - 10, y + 8, 9, 5);
            ctx.fillRect(cx + 1, y + 8, 9, 5);
            ctx.fillRect(cx - 1, y + 9, 2, 3);
            // eyes (peek under shades)
            ctx.fillStyle = C.white;
            ctx.beginPath();
            ctx.arc(cx - 5, y + 12, 2.5, 0, Math.PI * 2);
            ctx.arc(cx + 5, y + 12, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = C.ground;
            ctx.beginPath();
            ctx.arc(cx - 4.5, y + 12, 1.5, 0, Math.PI * 2);
            ctx.arc(cx + 5.5, y + 12, 1.5, 0, Math.PI * 2);
            ctx.fill();
            // smile
            ctx.strokeStyle = C.ground;
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(cx, y + 20, 4, 0.2, Math.PI - 0.2); ctx.stroke();
        }

        // legs
        ctx.fillStyle = C.darkGreen;
        if (player.onGround) {
            ctx.fillRect(x + 9, y + 49, 10, legFrame === 0 ? 14 : 9);
            ctx.fillRect(x + 21, y + 49, 10, legFrame === 0 ? 9 : 14);
        } else {
            ctx.fillRect(x + 9, y + 49, 10, 9);
            ctx.fillRect(x + 21, y + 49, 10, 9);
        }
    }

    function drawObstacle(obs) {
        const cx = obs.x + obs.w / 2;

        if (obs.type === 'amp') {
            ctx.fillStyle = C.ground;
            ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
            ctx.strokeStyle = C.green;
            ctx.lineWidth = 2;
            ctx.strokeRect(obs.x + 4, obs.y + 4, obs.w - 8, obs.h - 8);
            ctx.fillStyle = C.green;
            ctx.beginPath(); ctx.arc(cx, obs.y + obs.h * 0.45, obs.h * 0.22, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = C.yellow;
            ctx.fillRect(obs.x + 6, obs.y + obs.h - 14, obs.w - 12, 6);
        } else if (obs.type === 'guitar') {
            ctx.fillStyle = C.pop;
            // neck
            ctx.fillRect(cx - 5, obs.y, 10, obs.h);
            // body
            ctx.beginPath(); ctx.arc(cx, obs.y + obs.h - 18, 15, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#cc4444';
            ctx.fillRect(obs.x + 2, obs.y, obs.w - 4, 6);
            // strings
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 1;
            for (let i = -2; i <= 2; i++) {
                ctx.beginPath();
                ctx.moveTo(cx + i * 2, obs.y + 6);
                ctx.lineTo(cx + i * 2, obs.y + obs.h - 18);
                ctx.stroke();
            }
        } else {
            // cactus
            ctx.fillStyle = C.green;
            ctx.fillRect(obs.x + 7, obs.y + 8, obs.w - 14, obs.h - 8);
            ctx.beginPath(); ctx.arc(cx, obs.y + 8, (obs.w - 14) / 2, 0, Math.PI * 2); ctx.fill();
            if (obs.h > 50) {
                ctx.fillRect(obs.x - 2, obs.y + 18, 12, 8);
                ctx.fillRect(obs.x - 2, obs.y + 10, 8, 12);
                ctx.fillRect(obs.x + obs.w - 10, obs.y + 22, 12, 8);
                ctx.fillRect(obs.x + obs.w - 6, obs.y + 14, 8, 12);
            }
            ctx.fillStyle = C.darkGreen;
            ctx.fillRect(cx - 2, obs.y - 4, 4, 8);
        }

        ctx.strokeStyle = C.ground;
        ctx.lineWidth = 2;
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
    }

    function drawIdleScreen() {
        ctx.fillStyle = 'rgba(253,250,246,0.88)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = C.ground;
        ctx.font = 'bold 30px "RocknRoll One", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🌵 サボテンジャンプ', W / 2, H / 2 - 18);
        ctx.font = '16px "Yusei Magic", sans-serif';
        ctx.fillStyle = C.darkGreen;
        ctx.fillText('クリック / タップ / スペースでスタート！', W / 2, H / 2 + 14);
        ctx.textAlign = 'left';
    }

    function drawDeadScreen() {
        ctx.fillStyle = 'rgba(253,250,246,0.87)';
        const bx = W / 2 - 170, by = H / 2 - 55;
        ctx.fillRect(bx, by, 340, 115);
        ctx.strokeStyle = C.ground; ctx.lineWidth = 3;
        ctx.strokeRect(bx, by, 340, 115);

        ctx.fillStyle = C.pop;
        ctx.font = 'bold 28px "RocknRoll One", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER!', W / 2, H / 2 - 18);

        ctx.fillStyle = C.ground;
        ctx.font = '16px "Yusei Magic", sans-serif';
        ctx.fillText(`スコア: ${Math.floor(score)}   ベスト: ${hiScore}`, W / 2, H / 2 + 12);
        ctx.fillText('もう一度？ クリック / タップ！', W / 2, H / 2 + 40);
        ctx.textAlign = 'left';
    }

    // ── Game logic ───────────────────────────────────────────

    function spawnObstacle() {
        const type = ['cactus', 'cactus', 'amp', 'guitar'][Math.floor(Math.random() * 4)];
        const h = type === 'cactus' ? (Math.random() < 0.5 ? 50 : 70) : (type === 'amp' ? 55 : 72);
        const w = type === 'cactus' ? 34 : (type === 'amp' ? 52 : 32);
        obstacles.push({ x: W + 20, y: GROUND_Y - h, w, h, type });
    }

    function checkHit() {
        const m = 10;
        for (const o of obstacles) {
            if (player.x + m < o.x + o.w - m && player.x + player.w - m > o.x + m &&
                player.y + m < o.y + o.h - m && player.y + player.h - m > o.y + m) return true;
        }
        return false;
    }

    function update() {
        if (state !== 'running') return;

        speed = 5 + Math.floor(score / 250) * 0.4;
        score += 0.12;

        // legs animation
        animTimer++;
        if (animTimer >= 7) { legFrame ^= 1; animTimer = 0; }

        // gravity
        player.vy += GRAVITY;
        player.y += player.vy;
        if (player.y >= GROUND_Y - player.h) {
            player.y = GROUND_Y - player.h; player.vy = 0; player.onGround = true;
        }

        groundOff += speed;
        cloudOff += 0.5;

        frameCount++;
        if (frameCount >= nextIn) {
            spawnObstacle();
            nextIn = Math.floor(Math.random() * 45) + 70 - Math.min(Math.floor(score / 400) * 6, 30);
            frameCount = 0;
        }

        obstacles.forEach(o => o.x -= speed);
        obstacles = obstacles.filter(o => o.x > -100);

        if (checkHit()) {
            state = 'dead';
            const s = Math.floor(score);
            if (s > hiScore) { hiScore = s; localStorage.setItem('sabotenJumpHi', hiScore); }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = C.bg;
        ctx.fillRect(0, 0, W, H);

        drawClouds();
        drawGround();
        obstacles.forEach(o => drawObstacle(o));
        drawPlayer(state === 'dead');

        // Update HUD
        document.getElementById('game-score').textContent = Math.floor(score);
        document.getElementById('game-hiscore').textContent = hiScore;

        if (state === 'idle') drawIdleScreen();
        if (state === 'dead') drawDeadScreen();
    }

    function loop() { update(); draw(); requestAnimationFrame(loop); }

    document.getElementById('game-hiscore').textContent = hiScore;
    reset();
    loop();
})();
