// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Album Cover Image Loading
    const img = document.querySelector('.album-cover');
    if (img) {
        img.src = 'media/cover.jpg';
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        img.onload = () => { img.style.opacity = '1'; };
    }

    // 2. Hamburger Menu Logic
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-links a');

    const closeMenu = () => {
        menuToggle.classList.remove('is-active');
        menuOverlay.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    };

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('is-active');
            menuOverlay.classList.toggle('is-open');
            document.body.classList.toggle('no-scroll');
        });

        if (menuClose) {
            menuClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMenu();
            });
        }

        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) { closeMenu(); }
        });

        menuLinks.forEach(link => { link.addEventListener('click', closeMenu); });
    }

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });

    // 4. Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.tour-item, .album-details, .comment-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ─────────────────────────────────────────────
    // 5. Language Switcher (i18n)
    // ─────────────────────────────────────────────
    const translations = {
        ja: {
            'catchphrase': '砂漠の中で見つけた、7つのデザート',
            'album-desc': '2026年、SABOTENが贈る<br>ニューミニアルバム「Dessert in Desert」<br>砂漠のような日々の中で見つけた<br>希望、勇気、愛。<br>心の栄養となる、7つのデザート。<br>結成27年目の最高傑作。',
            'buy-btn': '購入する',
            'tour-sub': '全国ツアー開催決定',
            'track-1': 'さよなら、ありがとう',
            'track-2': 'リユニバース',
            'track-3': 'REMEMBER YOU <small>- 忌野 清志郎 cover -</small>',
            'track-4': '何事もなかった顔',
            'track-5': 'タイトロープ',
            'track-6': 'つぼみ',
            'track-7': '赤春',
            'comment-kiyoshi': '今作は喜怒哀楽に寄り添うことをテーマに楽曲作り、楽曲選びを慎重に行いました！重すぎず軽すぎない、メンバーがとてもリラックスした状態で録音出来たと思います！<br>そして音質に関してはより人の演奏らしさを大切に、あえて無駄な加工をせずにバンドの空気感が伝わる仕上がりにこだわりました！<br>27年目のSABOTENの最高傑作をぜひ楽しんでください♪',
            'comment-yasso': '制作の時点で選曲からかなり悩み、最終当初の予定より1曲増え選曲しました。<br>今回はコーラスワークにサケのアイデアも入れて作り上げました。<br>"Dessert in Desert"<br>1曲ごとに色んな表情があり、アルバムを通して聴き応え抜群です。<br>皆んなに喜んでもらえたら元気になってくれたら嬉しいです。<br>聴いてくれているみんなの顔を想像すると、それだけでワクワクします。',
            'comment-sakecode': 'とにかくおもしろいCDが出来ました。全曲ともそれぞれの表情が引き立ってそれぞれが引き立て合っておもしろさがすごいです。<br>作ってる時から録ってる時の雰囲気も詰める事が出来た気がします。<br>ライブでの表情の変化も楽しみです。<br>Dessert in Desertで遊びましょう。',
            'game-desc': '落ちてくるデザートをキャッチしてスコアを稼ごう！<br>サボテンには気をつけてね！<br>7種類のデザートをすべて集めるとクリア！',
            'game-start': 'GAME START',
            'game-over-desc': 'サボテンに当たっちゃった...',
            'game-retry': 'RETRY',
            'game-clear-desc': '7種類のデザートをコンプリートした！<br>おめでとう！限定壁紙をプレゼント！',
            'game-dl': '壁紙をダウンロード',
            'game-play-again': 'もう一度プレイ',
            'game-rules-title': '【遊び方＆ルール】',
            'game-rule-1': '空から降ってくるデザート🍰🍩をキャッチしよう！',
            'game-rule-2': '左右キー（スマホは画面下の◀▶）でキャラクターを動かします。',
            'game-rule-3': 'サボテン🌵に当たるとライフ減少！3回当たるとゲームオーバー。',
            'game-rule-4': '7種類のデザートをコンプリートするとクリア！特製壁紙をプレゼント🎁',
            'game-rule-5': '💩や🚽に当たると一発でゲームオーバー！気をつけて！',
            'game-select-char': 'キャラクターを選んでね',
            'bundle-desc': '数量限定！特別なバンドルセットのご予約・ご購入はこちらから！',
            'bundle-buy-btn': 'バンドルセットを予約・購入する',
            'name-kiyoshi': 'キヨシ',
            'name-yasso': 'ヤッソー',
            'name-sakecode': 'サケ・スイーツ',
            'name-sake': 'サケ',
            'btn-label': 'EN',
            'btn-aria': 'Switch to English',
            'html-lang': 'ja'
        },
        en: {
            'catchphrase': 'Seven Desserts Found in the Desert',
            'album-desc': 'In 2026, SABOTEN proudly presents its new mini album<br>"Dessert in Desert."<br><br>In the desert-like days of life,<br>we discovered hope, courage, and love.<br><br>Seven desserts to nourish the heart.<br><br>The finest work from SABOTEN<br>in our 27th year as a band.',
            'buy-btn': 'Buy Now',
            'tour-sub': '"Dessert in Desert" Japan Tour — Coming Soon',
            'track-1': 'Goodbye, Thank You',
            'track-2': 'Reuniverse',
            'track-3': 'REMEMBER YOU <small>- Kiyoshiro Imawano Cover -</small>',
            'track-4': 'A Straight Face',
            'track-5': 'Tightrope',
            'track-6': 'The Bud',
            'track-7': 'Sekishun',
            'comment-kiyoshi': "For this album, we set out to create songs that stay close to people's emotions—through joy, anger, sadness, and everything in between.<br><br>We carefully chose each track so the album would feel balanced, never too heavy and never too light.<br><br>During recording, the band felt incredibly relaxed, and we think that atmosphere naturally comes through in the sound.<br><br>Rather than relying on excessive production, we focused on keeping the performances as natural as possible so you can really feel the band's atmosphere.<br><br>We hope you enjoy what we believe is SABOTEN's finest work yet, now in our 27th year as a band.",
            'comment-yasso': "While making this album, we spent a long time choosing the songs, and in the end we decided to include one more track than originally planned.<br><br>This time, Sake also brought some great ideas to the chorus arrangements, which helped shape the songs in a new way.<br><br>Each track has its own character, and the album is a great listen from start to finish.<br><br>We’d be really happy if these songs bring joy and energy to everyone who listens.<br><br>Just imagining the faces of people listening to the album already makes us excited.",
            'comment-sakecode': "This turned out to be a really fun album.<br><br>Every track has its own personality,<br>and together they create something<br>very unique and exciting.<br><br>I think the atmosphere we had<br>while making and recording this music<br>is fully captured in the album.<br><br>I'm also really looking forward<br>to how these songs will evolve live.<br><br>Let's enjoy \"Dessert in Desert\" together.",
            'game-desc': 'Catch falling desserts to score points!<br>Watch out for the cacti!<br>Collect all 7 types of desserts to clear the game!',
            'game-start': 'GAME START',
            'game-over-desc': 'You hit a cactus...',
            'game-retry': 'RETRY',
            'game-clear-desc': 'You collected all 7 types of desserts!<br>Congratulations! Here is your exclusive wallpaper!',
            'game-dl': 'Download Wallpaper',
            'game-play-again': 'Play Again',
            'game-rules-title': '[ How to Play & Rules ]',
            'game-rule-1': 'Catch the falling desserts 🍰🍩 from the sky!',
            'game-rule-2': 'Use Left/Right keys (or ◀▶ buttons on mobile) to move your character.',
            'game-rule-3': 'Hitting a cactus 🌵 costs a life! 3 hits and game over.',
            'game-rule-4': 'Collect all 7 different desserts to clear the game! Win a special wallpaper! 🎁',
            'game-rule-5': 'Hitting 💩 or 🚽 means instant game over! Watch out!',
            'game-select-char': 'Choose your character',
            'bundle-desc': 'Limited quantity! Pre-order/purchase your special bundle set here!',
            'bundle-buy-btn': 'Pre-order / Purchase Bundle Set',
            'name-kiyoshi': 'KIYOSHI',
            'name-yasso': 'YASSO',
            'name-sakecode': 'SAKE-SWEETS',
            'name-sake': 'SAKE',
            'btn-label': 'JA',
            'btn-aria': '日本語に切り替え',
            'html-lang': 'en'
        }
    };

    const langBtn = document.getElementById('langBtn');

    const applyLanguage = (lang, animate) => {
        const t = translations[lang];
        if (!t) return;

        document.documentElement.lang = t['html-lang'];
        const targets = document.querySelectorAll('[data-i18n]');

        if (animate) {
            targets.forEach(el => {
                el.style.transition = 'opacity 0.2s ease';
                el.style.opacity = '0';
            });
            setTimeout(() => {
                targets.forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (t[key] !== undefined) el.innerHTML = t[key];
                });
                requestAnimationFrame(() => {
                    targets.forEach(el => { el.style.opacity = '1'; });
                });
            }, 220);
        } else {
            targets.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (t[key] !== undefined) el.innerHTML = t[key];
            });
        }

        if (langBtn) {
            // ✅ textContent は設定しない（子spanを上書きしてしまうため）
            langBtn.setAttribute('aria-label', t['btn-aria']);
            langBtn.dataset.lang = lang;
            langBtn.classList.toggle('lang-en-active', lang === 'en');
        }

        localStorage.setItem('saboten-lang', lang);
    };

    // Load saved preference (default: Japanese)
    const savedLang = localStorage.getItem('saboten-lang') || 'ja';
    applyLanguage(savedLang, false);

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const current = langBtn.dataset.lang || 'ja';
            applyLanguage(current === 'ja' ? 'en' : 'ja', true);
        });
    }

    // ─────────────────────────────────────────────
    // 6. Mini Game Logic
    // ─────────────────────────────────────────────
    const gameStartBtn = document.getElementById('game-start-btn');
    const gameRetryBtn = document.getElementById('game-retry-btn');
    const gameReplayBtn = document.getElementById('game-replay-btn');
    
    if (gameStartBtn) {
        const screens = document.querySelectorAll('.game-screen');
        const gameArea = document.getElementById('game-area');
        const player = document.getElementById('game-player');
        const scoreVal = document.getElementById('game-score-val');
        const livesVal = document.getElementById('game-lives-val');
        const btnLeft = document.getElementById('btn-left');
        const btnRight = document.getElementById('btn-right');
        const btnJump = document.getElementById('btn-jump');
        
        let gameState = 'start';
        let score = 0;
        let lives = 3;
        let items = [];
        let playerX = 50;
        let playerY = 0;
        let playerVelocity = 0;
        let playerVelocityY = 0;
        let isJumping = false;
        let isFever = false;
        let feverTimeout;
        let collectedTypes = new Set();
        let gameLoop;
        let spawnTimeout;
        let spawnRate = 1200;
        let gameTime = 0;
        const dessertTypes = ['🍰', '🍮', '🍨', '🍩', '🧁', '🍪', '🥞'];
        const deathTypes = ['💩', '🚽'];

        // Audio System Setup
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        let actx;
        const playSound = (type) => {
            if (!actx) actx = new AudioContext();
            if (actx.state === 'suspended') actx.resume();
            const osc = actx.createOscillator();
            const gain = actx.createGain();
            osc.connect(gain);
            gain.connect(actx.destination);
            const now = actx.currentTime;
            
            if (type === 'catch') {
                osc.type = 'sine'; osc.frequency.setValueAtTime(800, now); osc.frequency.exponentialRampToValueAtTime(1500, now + 0.1);
                gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now); osc.stop(now + 0.1);
            } else if (type === 'hit') {
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(150, now); osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);
                gain.gain.setValueAtTime(0.3, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                osc.start(now); osc.stop(now + 0.2);
            } else if (type === 'clear') {
                osc.type = 'triangle'; osc.frequency.setValueAtTime(440, now); osc.frequency.setValueAtTime(554, now + 0.1); osc.frequency.setValueAtTime(659, now + 0.2); osc.frequency.setValueAtTime(880, now + 0.3);
                gain.gain.setValueAtTime(0.3, now); gain.gain.linearRampToValueAtTime(0, now + 0.8);
                osc.start(now); osc.stop(now + 0.8);
            } else if (type === 'over') {
                osc.type = 'square'; osc.frequency.setValueAtTime(200, now); osc.frequency.linearRampToValueAtTime(50, now + 0.5);
                gain.gain.setValueAtTime(0.3, now); gain.gain.linearRampToValueAtTime(0, now + 0.5);
                osc.start(now); osc.stop(now + 0.5);
            } else if (type === 'fever') {
                osc.type = 'sine'; osc.frequency.setValueAtTime(880, now); osc.frequency.linearRampToValueAtTime(1760, now + 0.3);
                gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                osc.start(now); osc.stop(now + 0.3);
            } else if (type === 'jump') {
                osc.type = 'sine'; osc.frequency.setValueAtTime(300, now); osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
                gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now); osc.stop(now + 0.1);
            }
        };

        const createParticles = (x, y, color) => {
            for(let i=0; i<8; i++) {
                const p = document.createElement('div');
                p.style.position = 'absolute'; p.style.left = `${x}%`; p.style.top = `${y}%`;
                p.style.width = '10px'; p.style.height = '10px'; p.style.backgroundColor = color;
                p.style.borderRadius = '50%'; p.style.pointerEvents = 'none'; p.style.zIndex = '101';
                gameArea.appendChild(p);
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 50 + 20;
                const tx = Math.cos(angle) * dist; const ty = Math.sin(angle) * dist;
                p.animate([
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                    { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
                ], { duration: 600, easing: 'ease-out' }).onfinish = () => p.remove();
            }
        };
        
        // Initial setup for UI (Replacing the "Dessert 0 / 7" with Slots)
        const gameScoreContainer = document.querySelector('.game-score');
        if (gameScoreContainer) {
            gameScoreContainer.innerHTML = `
                <div style="font-size: 0.8rem; margin-bottom: 2px;">SCORE: <span id="game-score-val">0</span></div>
                <div id="dessert-slots" style="display: flex; gap: 4px; font-size: 1.2rem;">
                    ${dessertTypes.map(d => `<span class="slot" style="opacity:0.3; filter:grayscale(1); transition:all 0.3s;" data-type="${d}">❓</span>`).join('')}
                </div>
            `;
            // Re-bind after innerHTML replacement
        }
        
        const showScreen = (id) => {
            screens.forEach(s => s.classList.remove('active'));
            document.getElementById(id).classList.add('active');
        };
        
        const updateUI = () => {
            const scoreValEl = document.getElementById('game-score-val');
            if(scoreValEl) scoreValEl.textContent = score;
            livesVal.textContent = '❤️'.repeat(lives);

            // Update slots
            const slots = document.querySelectorAll('.slot');
            slots.forEach(slot => {
                if (collectedTypes.has(slot.dataset.type)) {
                    slot.textContent = slot.dataset.type;
                    slot.style.opacity = '1';
                    slot.style.filter = 'none';
                    slot.style.transform = 'scale(1.1)';
                } else {
                    slot.textContent = '❓';
                    slot.style.opacity = '0.3';
                    slot.style.filter = 'grayscale(1)';
                    slot.style.transform = 'scale(1)';
                }
            });
        };

        const createFloatingText = (text, x, y, color = '#e6ff00') => {
            const el = document.createElement('div');
            el.textContent = text;
            el.style.position = 'absolute';
            el.style.left = `${x}%`;
            el.style.top = `${y}%`;
            el.style.color = color;
            el.style.fontSize = '1.5rem';
            el.style.fontWeight = 'bold';
            el.style.fontFamily = 'var(--font-title)';
            el.style.textShadow = '2px 2px 0 #000';
            el.style.pointerEvents = 'none';
            el.style.zIndex = '100';
            el.style.transition = 'all 1s ease-out';
            el.style.transform = 'translate(-50%, -50%)';
            gameArea.appendChild(el);

            requestAnimationFrame(() => {
                el.style.top = `${y - 20}%`;
                el.style.opacity = '0';
                el.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });

            setTimeout(() => { if(el.parentNode) el.remove(); }, 1000);
        };
        
        const initGame = () => {
            const selectedCharInput = document.querySelector('input[name="player-char"]:checked');
            if (selectedCharInput) {
                document.getElementById('player-img').src = selectedCharInput.value;
            }

            score = 0;
            lives = 3;
            collectedTypes.clear();
            items.forEach(item => item.el.remove());
            items = [];
            playerX = 50;
            playerY = 0;
            playerVelocity = 0;
            playerVelocityY = 0;
            isJumping = false;
            isFever = false;
            clearTimeout(feverTimeout);
            gameTime = 0;
            player.style.left = `${playerX}%`;
            player.style.bottom = `calc(${playerY}% + 20px)`;
            player.style.filter = '';
            player.style.transform = 'translateX(-50%)';
            updateUI();
        };
        
        const spawnItem = () => {
            if (gameState !== 'play') return;
            const rand = Math.random();
            let typeValue, itemType;
            
            if (rand < 0.05) { // 5% fever star
                typeValue = '⭐';
                itemType = 'fever';
            } else if (rand < 0.13) { // 8% chance for instant death item
                typeValue = deathTypes[Math.floor(Math.random() * deathTypes.length)];
                itemType = 'death';
            } else if (rand < 0.45) { // 32% chance for cactus
                typeValue = '🌵';
                itemType = 'cactus';
            } else { // 55% chance for dessert
                typeValue = dessertTypes[Math.floor(Math.random() * dessertTypes.length)];
                itemType = 'dessert';
            }
            
            const itemEl = document.createElement('div');
            itemEl.className = 'game-item item-' + itemType;
            itemEl.innerHTML = typeValue;
            itemEl.dataset.type = itemType;
            itemEl.dataset.value = typeValue;
            if (itemType === 'fever') {
                itemEl.style.filter = 'drop-shadow(0 0 10px #ffea00)';
                itemEl.style.animation = 'pulse 1s infinite alternate';
            }
            
            const startX = Math.random() * 80 + 10;
            itemEl.style.left = `${startX}%`;
            itemEl.style.top = `-10%`;
            
            gameArea.appendChild(itemEl);
            items.push({ 
                el: itemEl, 
                x: startX, 
                baseX: startX,
                y: -10, 
                type: itemType, 
                value: typeValue,
                // Speed increases over time
                speed: Math.random() * 0.4 + 0.8 + (gameTime * 0.0005),
                swaySpeed: Math.random() * 0.05 + 0.02,
                swayAmount: itemType === 'cactus' ? 0 : Math.random() * 6 + 2, // Only desserts sway
                timeOffset: Math.random() * 100
            });
            
            spawnRate = Math.max(400, 1200 - (gameTime * 15) - (score * 0.5));
            spawnTimeout = setTimeout(spawnItem, spawnRate);
        };
        
        const checkCollision = (item) => {
            const playerRect = player.getBoundingClientRect();
            const itemRect = item.el.getBoundingClientRect();
            const paddingX = window.innerWidth < 768 ? 8 : 15;
            const paddingY = window.innerWidth < 768 ? 8 : 10;
            
            return !(
                playerRect.right - paddingX < itemRect.left + paddingX ||
                playerRect.left + paddingX > itemRect.right - paddingX ||
                playerRect.bottom - paddingY < itemRect.top + paddingY ||
                playerRect.top + paddingY > itemRect.bottom - paddingY
            );
        };
        
        const updateGame = () => {
            if (gameState !== 'play') return;
            
            gameTime++;

            for (let i = items.length - 1; i >= 0; i--) {
                const item = items[i];
                item.timeOffset += item.swaySpeed;
                
                if (item.type === 'dessert') {
                    item.x = item.baseX + Math.sin(item.timeOffset) * item.swayAmount;
                }
                
                item.y += item.speed;
                item.el.style.top = `${item.y}%`;
                item.el.style.left = `${item.x}%`;
                
                if (checkCollision(item)) {
                    if (item.type === 'fever') {
                        playSound('fever');
                        createParticles(playerX, 100 - playerY, '#ffea00');
                        createFloatingText('FEVER!', playerX, 80 - playerY, '#ffea00');
                        isFever = true;
                        clearTimeout(feverTimeout);
                        player.style.filter = 'drop-shadow(0 0 10px #ff00ff) hue-rotate(90deg)';
                        feverTimeout = setTimeout(() => { isFever = false; player.style.filter = ''; }, 5000);
                    } else if (item.type === 'cactus') {
                        if (!isFever) {
                            playSound('hit');
                            lives--;
                            updateUI();
                            item.el.innerHTML = '💥';
                            createFloatingText('-1 LIFE!', playerX, 80 - playerY, '#e60012');
                            
                            gameArea.animate([
                                { transform: 'translate(4px, 4px)' }, { transform: 'translate(-4px, -4px)' },
                                { transform: 'translate(-4px, 4px)' }, { transform: 'translate(0, 0)' }
                            ], { duration: 300, iterations: 1 });

                            player.style.filter = 'brightness(0) invert(1) sepia(100%) saturate(100%) hue-rotate(0deg)';
                            setTimeout(() => { if(gameState==='play') player.style.filter = isFever ? 'drop-shadow(0 0 10px #ff00ff) hue-rotate(90deg)' : ''; }, 200);
                            
                            if (lives <= 0) {
                                playSound('over');
                                gameState = 'over';
                                clearTimeout(spawnTimeout);
                                setTimeout(() => showScreen('game-over-screen'), 500);
                            }
                        } else {
                            playSound('catch');
                            score += 100;
                            createParticles(playerX, 100 - playerY, '#00ff00');
                            createFloatingText('FEVER KICK!', playerX, 80 - playerY, '#ff00ff');
                        }
                    } else if (item.type === 'death') {
                        if (!isFever) {
                            playSound('hit');
                            lives = 0;
                            updateUI();
                            item.el.innerHTML = '💥';
                            createFloatingText('WASTED!', playerX, 80 - playerY, '#000');
                            
                            gameArea.animate([
                                { transform: 'translate(6px, 6px)' }, { transform: 'translate(-6px, -6px)' },
                                { transform: 'translate(-6px, 6px)' }, { transform: 'translate(0, 0)' }
                            ], { duration: 500, iterations: 1 });

                            player.style.filter = 'grayscale(1) brightness(0.5)';
                            playSound('over');
                            gameState = 'over';
                            clearTimeout(spawnTimeout);
                            setTimeout(() => showScreen('game-over-screen'), 800);
                        } else {
                            playSound('catch');
                            score += 100;
                            createParticles(playerX, 100 - playerY, '#ff00ff');
                        }
                    } else {
                        playSound('catch');
                        createParticles(playerX, 100 - playerY, '#ff99cc');
                        if (!collectedTypes.has(item.value)) {
                            collectedTypes.add(item.value);
                            score += 500;
                            createFloatingText('NEW +500!', playerX, 80 - playerY, '#46c700');
                        } else {
                            const pts = isFever ? 200 : 100;
                            score += pts;
                            createFloatingText(`+${pts}`, playerX, 80 - playerY, '#e6ff00');
                        }
                        updateUI();
                        item.el.style.transform = 'translate(-50%, -50%) scale(2)';
                        item.el.style.opacity = '0';
                        
                        if (collectedTypes.size >= 7) {
                            playSound('clear');
                            gameState = 'clear';
                            clearTimeout(spawnTimeout);
                            const flash = document.createElement('div');
                            flash.style.position = 'absolute';
                            flash.style.inset = '0';
                            flash.style.background = '#fff';
                            flash.style.zIndex = '999';
                            flash.style.animation = 'flashFade 1s forwards';
                            gameArea.appendChild(flash);
                            setTimeout(() => showScreen('game-clear-screen'), 800);
                        }
                    }
                    setTimeout(() => { if(item.el && item.el.parentNode) item.el.remove(); }, 200);
                    items.splice(i, 1);
                } else if (item.y > 110) {
                    item.el.remove();
                    items.splice(i, 1);
                }
            }
            
            // Velocity-based Player Movement
            const moveSpeed = isFever ? 1.5 : 1;
            const accel = (window.innerWidth < 768 ? 0.7 : 0.9) * moveSpeed;
            if (isLeftPressed) playerVelocity -= accel;
            if (isRightPressed) playerVelocity += accel;
            
            // Friction
            playerVelocity *= 0.85;
            playerX += playerVelocity;

            // Boundaries
            if (playerX < 5) {
                playerX = 5;
                playerVelocity = 0;
            } else if (playerX > 95) {
                playerX = 95;
                playerVelocity = 0;
            }

            // Jump Physics
            if (isJumpPressed && !isJumping) {
                isJumping = true;
                playerVelocityY = 15;
                playSound('jump');
            }
            playerY += playerVelocityY;
            playerVelocityY -= 1.2; // Gravity
            if (playerY <= 0) {
                playerY = 0;
                playerVelocityY = 0;
                isJumping = false;
            }

            // Tilt effect based on movement
            const tilt = playerVelocity * 2;
            player.style.transform = `translateX(-50%) rotate(${tilt}deg)`;
            player.style.left = `${playerX}%`;
            player.style.bottom = `calc(${playerY}% + 20px)`;
            
            if (gameState === 'play') {
                gameLoop = requestAnimationFrame(updateGame);
            }
        };
        
        const startGame = () => {
            gameState = 'play';
            showScreen('game-play-screen');
            initGame();
            clearTimeout(spawnTimeout);
            spawnTimeout = setTimeout(spawnItem, 500);
            cancelAnimationFrame(gameLoop);
            gameLoop = requestAnimationFrame(updateGame);
        };
        
        gameStartBtn.addEventListener('click', startGame);
        gameRetryBtn.addEventListener('click', startGame);
        gameReplayBtn.addEventListener('click', startGame);
        
        let isLeftPressed = false;
        let isRightPressed = false;
        let isJumpPressed = false;
        
        window.addEventListener('keydown', (e) => {
             if (e.key === 'ArrowLeft') { isLeftPressed = true; e.preventDefault(); }
             if (e.key === 'ArrowRight') { isRightPressed = true; e.preventDefault(); }
             if (e.key === 'ArrowUp' || e.key === ' ') { isJumpPressed = true; e.preventDefault(); }
        });
        window.addEventListener('keyup', (e) => {
             if (e.key === 'ArrowLeft') isLeftPressed = false;
             if (e.key === 'ArrowRight') isRightPressed = false;
             if (e.key === 'ArrowUp' || e.key === ' ') isJumpPressed = false;
        });
        
        const addHoldEvents = (btn, dirStr) => {
            const press = (e) => { 
                e.preventDefault(); 
                if(dirStr === 'left') isLeftPressed=true; 
                else if(dirStr === 'right') isRightPressed=true;
                else if(dirStr === 'jump') isJumpPressed=true;
            };
            const release = (e) => { 
                e.preventDefault(); 
                if(dirStr === 'left') isLeftPressed=false; 
                else if(dirStr === 'right') isRightPressed=false;
                else if(dirStr === 'jump') isJumpPressed=false;
            };
            btn.addEventListener('mousedown', press);
            btn.addEventListener('touchstart', press, {passive: false});
            window.addEventListener('mouseup', release);
            btn.addEventListener('mouseleave', release);
            btn.addEventListener('touchend', release);
        };
        
        if (btnLeft && btnRight) {
            addHoldEvents(btnLeft, 'left');
            addHoldEvents(btnRight, 'right');
            if (btnJump) addHoldEvents(btnJump, 'jump');
        }
    }
});

// ─────────────────────────────────────────────
// Parallax effect for hero background
// ─────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) { hero.style.transform = `translateY(${scrolled * 0.4}px)`; }
});

// ─────────────────────────────────────────────
// Ripple Effect for buttons
// ─────────────────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            this.appendChild(ripple);
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            setTimeout(() => ripple.remove(), 600);
        }
    });
});
