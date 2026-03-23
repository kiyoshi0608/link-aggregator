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
//  🌵 SABOTEN JUMP v2 - Mobile-First Enhanced
// ============================================================
(function () {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = 1000;
    const H = 310;       // taller canvas
    canvas.width  = W;
    canvas.height = H;

    const GROUND_Y  = H - 55;
    const GRAVITY   = 0.9;
    const JUMP_V    = -18;
    const INIT_SPD  = 7;   // faster start

    const C = {
        bg: '#fdfaf6', ground: '#2c3e38', green: '#3eb46b',
        dark: '#2a7a4a', pop: '#ff6b6b', yellow: '#ffd166', white: '#fff',
        muted: 'rgba(44,62,56,0.18)',
    };
    const EMOJI_ENEMIES = ['💩', '🚽', '🐍', '🪴', '🎸', '🐦‍⬛'];

    let state = 'idle';
    let score = 0;
    let hiScore = parseInt(localStorage.getItem('sabotenJumpHi') || '0');
    let speed, frameCount, nextIn, obstacles, groundOff, cloudOff;
    let animTimer = 0, legFrame = 0;
    let particles = [], dustParts = [];
    let screenShake = 0;
    let lastTs = 0;

    const P = { x: 90, y: 0, w: 46, h: 62, vy: 0, onGround: true, sq: 1, st: 1 };

    function reset() {
        score = 0; speed = INIT_SPD; frameCount = 0; nextIn = 75;
        obstacles = []; particles = []; dustParts = [];
        groundOff = cloudOff = animTimer = legFrame = screenShake = 0;
        P.y = GROUND_Y - P.h; P.vy = 0; P.onGround = true; P.sq = P.st = 1;
    }

    function jump() {
        if (state === 'idle' || state === 'dead') { state = 'running'; reset(); return; }
        if (state === 'running' && P.onGround) {
            P.vy = JUMP_V; P.onGround = false; P.sq = 0.6; P.st = 1.5;
            spawnDust();
        }
    }

    // ── Input ──────────────────────────────────────────────
    document.addEventListener('keydown', e => {
        if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
    });
    canvas.addEventListener('click', jump);
    canvas.addEventListener('touchstart', e => { e.preventDefault(); jump(); }, { passive: false });

    // Mobile jump button
    const jumpBtn = document.getElementById('jump-btn');
    if (jumpBtn) {
        jumpBtn.addEventListener('touchstart', e => { e.preventDefault(); jump(); }, { passive: false });
        jumpBtn.addEventListener('click', e => { e.preventDefault(); jump(); });
    }

    // ── Particles ──────────────────────────────────────────
    function spawnDust() {
        for (let i = 0; i < 5; i++) {
            dustParts.push({ x: P.x + Math.random() * P.w, y: GROUND_Y,
                vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 2,
                r: Math.random() * 5 + 2, life: 1 });
        }
    }
    function spawnDeath() {
        const cs = [C.green, C.yellow, C.pop, C.dark, C.white];
        for (let i = 0; i < 22; i++) {
            const a = Math.random() * Math.PI * 2, spd = Math.random() * 7 + 2;
            particles.push({ x: P.x + P.w / 2, y: P.y + P.h / 2,
                vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 3,
                r: Math.random() * 6 + 3, color: cs[Math.floor(Math.random() * cs.length)], life: 1 });
        }
    }

    // ── Draw helpers ───────────────────────────────────────
    function drawBg() {
        let topC = '#fdfaf6', botC = '#f0f7f4'; // 昼
        if (score > 1200) { topC = '#0a0a20'; botC = '#1c1c3c'; } // 深夜
        else if (score > 800) { topC = '#1b2755'; botC = '#80344d'; } // 夜
        else if (score > 400) { topC = '#ff7b54'; botC = '#ffd56b'; } // 夕方

        const g = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
        g.addColorStop(0, topC); g.addColorStop(1, botC);
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }

    function drawClouds() {
        ctx.fillStyle = (score > 800) ? 'rgba(255,255,255,0.06)' : 'rgba(62,180,107,0.09)';
        [[100,30,28],[300,50,20],[530,22,34],[720,40,22],[920,25,30]].forEach(([bx,by,r]) => {
            const x = ((bx - cloudOff * 0.3) % W + W) % W;
            ctx.beginPath();
            ctx.arc(x, by, r, 0, Math.PI*2); ctx.arc(x+r*.8, by-r*.35, r*.72, 0, Math.PI*2);
            ctx.arc(x-r*.65, by-r*.2, r*.62, 0, Math.PI*2); ctx.arc(x+r*1.5, by-r*.1, r*.5, 0, Math.PI*2);
            ctx.fill();
        });
    }

    function drawGround() {
        ctx.fillStyle = '#e8f2ec'; ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
        ctx.strokeStyle = C.ground; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(W, GROUND_Y); ctx.stroke();
        ctx.fillStyle = 'rgba(44,62,56,0.32)';
        for (let i = 0; i < 22; i++) {
            const x = ((i * 55 - groundOff % 55) + W + W) % W;
            ctx.fillRect(x, GROUND_Y + 8, 28, 3);
        }
        ctx.fillStyle = C.muted; ctx.font = '15px serif';
        for (let i = 0; i < 12; i++) {
            const x = ((i * 80 - groundOff % 80 * .65) + W + W) % W;
            ctx.fillText('♪', x, GROUND_Y + 28);
        }
    }

    function drawPlayer(dead) {
        const { w, sq, st } = P;
        const cx = P.x + w / 2;
        ctx.save();
        ctx.translate(cx, P.y + P.h / 2);
        ctx.scale(sq, st);
        ctx.translate(-w / 2, -P.h / 2);

        ctx.fillStyle = C.green;
        ctx.fillRect(-8, 18, 15, 9); ctx.fillRect(-8, 10, 9, 13);
        ctx.fillRect(w-7, 22, 15, 9); ctx.fillRect(w-1, 14, 9, 13);
        ctx.fillRect(9, 16, w-18, 38);
        ctx.beginPath(); ctx.arc(w/2, 15, 15, 0, Math.PI*2); ctx.fill();

        ctx.fillStyle = C.dark;
        ctx.fillRect(w/2-2, -4, 4, 10); ctx.fillRect(4, 2, 4, 8); ctx.fillRect(w-8, 4, 4, 8);

        if (dead) {
            ctx.strokeStyle = C.ground; ctx.lineWidth = 3;
            [[-11,7,-4,14],[-4,7,-11,14],[3,7,10,14],[10,7,3,14]].forEach(([x1,y1,x2,y2]) => {
                ctx.beginPath(); ctx.moveTo(w/2+x1,y1); ctx.lineTo(w/2+x2,y2); ctx.stroke();
            });
            ctx.beginPath(); ctx.arc(w/2, 25, 5, Math.PI+.4, Math.PI*2-.4); ctx.stroke();
        } else {
            ctx.fillStyle = 'rgba(25,35,45,0.92)';
            ctx.fillRect(w/2-12, 8, 11, 7); ctx.fillRect(w/2+1, 8, 11, 7); ctx.fillRect(w/2-1, 9, 2, 5);
            ctx.strokeStyle = C.ground; ctx.lineWidth = 1;
            ctx.strokeRect(w/2-12, 8, 11, 7); ctx.strokeRect(w/2+1, 8, 11, 7);
            ctx.strokeStyle = C.ground; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.arc(w/2, 24, 5, .2, Math.PI-.2); ctx.stroke();
        }

        ctx.fillStyle = C.dark;
        if (P.onGround) {
            ctx.fillRect(10, 51, 12, legFrame===0?18:10); ctx.fillRect(24, 51, 12, legFrame===0?10:18);
        } else {
            ctx.fillRect(10, 51, 12, 10); ctx.fillRect(24, 51, 12, 10);
        }
        ctx.restore();
    }

    function drawObstacle(o) {
        const cx = o.x + o.w / 2;
        if (o.type === 'amp') {
            const g = ctx.createLinearGradient(o.x,o.y,o.x+o.w,o.y+o.h);
            g.addColorStop(0,'#3a5048'); g.addColorStop(1,'#2c3e38');
            ctx.fillStyle = g; ctx.fillRect(o.x, o.y, o.w, o.h);
            ctx.strokeStyle = C.green; ctx.lineWidth = 2;
            ctx.strokeRect(o.x+4, o.y+4, o.w-8, o.h-8);
            ctx.fillStyle = C.dark;
            ctx.beginPath(); ctx.arc(cx, o.y+o.h*.42, o.h*.25, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = C.green;
            ctx.beginPath(); ctx.arc(cx, o.y+o.h*.42, o.h*.14, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = C.yellow; ctx.fillRect(o.x+7, o.y+o.h-17, o.w-14, 8);
        } else if (o.type === 'guitar') {
            ctx.fillStyle = C.pop;
            ctx.fillRect(cx-5, o.y, 10, o.h);
            ctx.beginPath(); ctx.arc(cx, o.y+o.h-20, 18, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#bb3333'; ctx.fillRect(o.x+2, o.y, o.w-4, 7);
            ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 1;
            for (let i=-2; i<=2; i++) { ctx.beginPath(); ctx.moveTo(cx+i*2.2,o.y+7); ctx.lineTo(cx+i*2.2,o.y+o.h-20); ctx.stroke(); }
        } else if (o.type === 'emoji') {
            // No border
            ctx.font = o.h + 'px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(o.emoji, cx, o.y);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
            return; // Skip standard border
        } else {
            ctx.fillStyle = C.green;
            ctx.fillRect(o.x+9, o.y+10, o.w-18, o.h-10);
            ctx.beginPath(); ctx.arc(cx, o.y+10, (o.w-18)/2, 0, Math.PI*2); ctx.fill();
            if (o.h > 56) {
                ctx.fillRect(o.x-4,o.y+20,14,10); ctx.fillRect(o.x-4,o.y+11,9,14);
                ctx.fillRect(o.x+o.w-10,o.y+24,14,10); ctx.fillRect(o.x+o.w-5,o.y+15,9,14);
            }
            ctx.fillStyle = C.dark; ctx.fillRect(cx-2, o.y-5, 4, 10);
            if (o.h > 56) { ctx.fillRect(o.x+8,o.y+4,4,8); ctx.fillRect(o.x+o.w-12,o.y+6,4,8); }
        }
        ctx.strokeStyle = C.ground; ctx.lineWidth = 2;
        ctx.strokeRect(o.x, o.y, o.w, o.h);
    }

    function drawSpeedBar() {
        const level = Math.min(Math.floor(score / 200) + 1, 10);
        const filled = (level - 1) / 9;
        const bw = 140, bx = W - bw - 14, by = 14;
        ctx.fillStyle = 'rgba(44,62,56,0.12)'; ctx.fillRect(bx, by, bw, 10);
        const g = ctx.createLinearGradient(bx, 0, bx+bw, 0);
        g.addColorStop(0, '#3eb46b'); g.addColorStop(.7, '#ffd166'); g.addColorStop(1, '#ff6b6b');
        ctx.fillStyle = g; ctx.fillRect(bx, by, bw * filled, 10);
        ctx.strokeStyle = C.ground; ctx.lineWidth = 1.5; ctx.strokeRect(bx, by, bw, 10);
        ctx.fillStyle = C.ground; ctx.font = '10px "Yusei Magic", sans-serif';
        ctx.textAlign = 'right'; ctx.fillText(`SPEED Lv${level}`, W-14, by-1); ctx.textAlign = 'left';
    }

    function drawIdleScreen() {
        ctx.fillStyle = 'rgba(253,250,246,.9)'; ctx.fillRect(0,0,W,H);
        drawPlayer(false);
        ctx.fillStyle = C.ground; ctx.font = 'bold 32px "RocknRoll One",sans-serif';
        ctx.textAlign = 'center'; ctx.fillText('🌵 サボテンジャンプ', W/2, H/2-28);
        ctx.fillStyle = C.dark; ctx.font = '18px "Yusei Magic",sans-serif';
        ctx.fillText('クリック／タップ／スペースでスタート！', W/2, H/2+10);
        if (hiScore > 0) {
            ctx.fillStyle = C.pop; ctx.font = 'bold 15px "RocknRoll One",sans-serif';
            ctx.fillText(`🏆 BEST: ${hiScore}`, W/2, H/2+42);
        }
        ctx.textAlign = 'left';
    }

    function drawDeadScreen() {
        ctx.fillStyle = 'rgba(253,250,246,.88)';
        const bx=W/2-190, by=H/2-65; ctx.fillRect(bx,by,380,132);
        ctx.strokeStyle=C.ground; ctx.lineWidth=3; ctx.strokeRect(bx,by,380,132);
        ctx.fillStyle=C.pop; ctx.font='bold 30px "RocknRoll One",sans-serif';
        ctx.textAlign='center'; ctx.fillText('💥 GAME OVER!', W/2, H/2-22);
        const s=Math.floor(score), isNew=(s>=hiScore&&s>0);
        ctx.fillStyle=isNew?C.pop:C.ground;
        ctx.font=isNew?'bold 19px "RocknRoll One",sans-serif':'17px "Yusei Magic",sans-serif';
        ctx.fillText(isNew?`🎉 NEW RECORD: ${s}!`:`スコア: ${s}　ベスト: ${hiScore}`, W/2, H/2+12);
        ctx.fillStyle=C.dark; ctx.font='15px "Yusei Magic",sans-serif';
        ctx.fillText('クリック／タップ／スペースでリトライ！', W/2, H/2+45);
        ctx.textAlign='left';
    }

    // ── Game logic ─────────────────────────────────────────
    function spawn() {
        const r = Math.random();
        let type, h, w, emoji = null;
        if (r < .35)      { type='cactus'; h=Math.random()<.45?56:78; w=40; }
        else if (r < .55) { type='amp';    h=62; w=58; }
        else if (r < .70) { type='guitar'; h=78; w=38; }
        else              { type='emoji';  h=45; w=45; emoji = EMOJI_ENEMIES[Math.floor(Math.random()*EMOJI_ENEMIES.length)]; }
        obstacles.push({ x: W+20, y: GROUND_Y-h, w, h, type, emoji });
    }

    function hitTest() {
        const m = 10;
        for (const o of obstacles) {
            if (P.x+m < o.x+o.w-m && P.x+P.w-m > o.x+m &&
                P.y+m < o.y+o.h-m && P.y+P.h-m > o.y+m) return true;
        }
        return false;
    }

    function update(dt) {
        // Always decay screen shake and update particles (even on game over / idle)
        if (screenShake > 0) screenShake = Math.max(0, screenShake - 0.6 * dt);

        dustParts.forEach(p => { p.x+=p.vx*dt; p.y+=p.vy*dt; p.vy+=0.2*dt; p.life-=0.07*dt; });
        dustParts = dustParts.filter(p => p.life > 0);
        particles.forEach(p => { p.x+=p.vx*dt; p.y+=p.vy*dt; p.vy+=0.3*dt; p.life-=0.035*dt; });
        particles = particles.filter(p => p.life > 0);

        if (state !== 'running') { animTimer+=dt; if(animTimer>=15){legFrame^=1;animTimer=0;} return; }

        score += 0.15 * dt;
        speed = INIT_SPD + (score / 120) * 1.5; // Difficulty ramps up faster
        const animRate = Math.max(3, 9 - speed / 2);
        animTimer += dt; if (animTimer >= animRate) { legFrame^=1; animTimer=0; }

        P.sq += (1-P.sq)*0.25*dt; P.st += (1-P.st)*0.25*dt;

        P.vy += GRAVITY * dt;
        P.y  += P.vy    * dt;
        if (P.y >= GROUND_Y - P.h) {
            const wasJumping = !P.onGround;
            P.y = GROUND_Y - P.h; P.vy = 0; P.onGround = true;
            if (wasJumping) { P.sq = 0.72; P.st = 1.28; spawnDust(); }
        }

        groundOff += speed * dt; cloudOff += 0.4 * dt;

        frameCount += dt;
        if (frameCount >= nextIn) {
            spawn();
            nextIn = Math.floor(Math.random()*38)+62 - Math.min(Math.floor(score/250)*7, 28);
            frameCount = 0;
        }

        obstacles.forEach(o => o.x -= speed * dt);
        obstacles = obstacles.filter(o => o.x > -120);

        if (hitTest()) {
            state = 'dead'; screenShake = 10; spawnDeath();
            const s = Math.floor(score);
            if (s > hiScore) { hiScore = s; localStorage.setItem('sabotenJumpHi', hiScore); }
        }
    }

    function draw() {
        ctx.save();
        if (screenShake > 0) ctx.translate((Math.random()-.5)*screenShake*2, (Math.random()-.5)*screenShake*2);
        drawBg(); drawClouds(); drawGround();
        dustParts.forEach(p => { ctx.globalAlpha=p.life; ctx.fillStyle=C.dark; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); });
        ctx.globalAlpha = 1;
        if (state !== 'idle') obstacles.forEach(o => drawObstacle(o));
        drawPlayer(state === 'dead');
        particles.forEach(p => { ctx.globalAlpha=p.life; ctx.fillStyle=p.color; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); });
        ctx.globalAlpha = 1;
        if (state === 'running') drawSpeedBar();
        ctx.restore();

        document.getElementById('game-score').textContent = Math.floor(score);
        document.getElementById('game-hiscore').textContent = hiScore;
        if (state === 'idle') drawIdleScreen();
        if (state === 'dead') drawDeadScreen();
    }

    function loop(ts) {
        const dt = Math.min((ts - lastTs) / 16.67, 3); // delta time (1.0 = 60fps)
        lastTs = ts;
        update(dt); draw();
        requestAnimationFrame(loop);
    }

    document.getElementById('game-hiscore').textContent = hiScore;
    reset();
    requestAnimationFrame(loop);
})();


