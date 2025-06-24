// ダークモードの切り替え
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// ローカルストレージからテーマを読み込み
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

// ダークモードトグルの初期状態を設定
if (savedTheme === 'dark') {
    themeToggle.querySelector('.sun').style.opacity = '0';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // アイコンの切り替え
    themeToggle.querySelector('.sun').style.opacity = newTheme === 'light' ? '1' : '0';
    themeToggle.querySelector('.moon').style.opacity = newTheme === 'light' ? '0' : '1';
});

// リンククリック時の処理
document.querySelectorAll('.links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(link.href, '_blank');
    });
});
