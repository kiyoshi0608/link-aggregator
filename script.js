// ダークモードの切り替え
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateThemeColors();
};

// テーマカラーの変更
const updateThemeColors = () => {
    const isDark = document.body.classList.contains('dark-mode');
    const themeColors = {
        primary: isDark ? '#f02c56' : '#ff6b6b',
        secondary: isDark ? '#833ab4' : '#4ecdc4',
        background: isDark ? '#1a1a1a' : '#ffffff',
        text: isDark ? '#ffffff' : '#333333'
    };
    
    document.documentElement.style.setProperty('--primary-color', themeColors.primary);
    document.documentElement.style.setProperty('--secondary-color', themeColors.secondary);
    document.documentElement.style.setProperty('--background-color', themeColors.background);
    document.documentElement.style.setProperty('--text-color', themeColors.text);
};

// アニメーション
const animateElements = () => {
    const elements = document.querySelectorAll('.profile-section, .social-links');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
};

// アクセスカウンターの初期化
let visitCount = localStorage.getItem('visitCount') || 0;
visitCount = parseInt(visitCount) + 1;
localStorage.setItem('visitCount', visitCount);

document.addEventListener('DOMContentLoaded', () => {
    // ダークモードの初期状態チェック
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        updateThemeColors();
    }
    
    // アニメーションの開始
    animateElements();
    
    // ダークモードのトグルボタンを追加
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', toggleDarkMode);
    
    // アクセスカウンターの表示
    const visitCountElement = document.createElement('div');
    visitCountElement.className = 'visit-count';
    visitCountElement.textContent = `訪問数: ${visitCount}回`;
    document.body.appendChild(visitCountElement);
});
