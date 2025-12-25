// 文件：theme.js
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'auto';
    this.applyTheme(this.currentTheme);
    this.initModal();
    this.initEvents();
  }

  applyTheme(theme) {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 应用主题
    root.setAttribute('data-theme', theme === 'auto' ? (systemDark ? 'dark' : 'light') : theme);
    localStorage.setItem('theme', theme);
    
    // 更新按钮高亮状态
    document.querySelectorAll('.theme-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  initModal() {
    // 创建并插入弹窗到 body（如果不存在）
    if (!document.getElementById('themeModal')) {
      const modalHTML = `
        <div class="theme-modal-overlay" id="themeModal">
          <div class="theme-modal">
            <div class="modal-close" id="themeClose">×</div>
            <h3>选择主题</h3>
            <div class="theme-options">
              <button class="theme-option" data-theme="light">
                <i class="fas fa-sun"></i>
                <span>浅色模式</span>
              </button>
              <button class="theme-option" data-theme="dark">
                <i class="fas fa-moon"></i>
                <span>深色模式</span>
              </button>
              <button class="theme-option" data-theme="auto">
                <i class="fas fa-desktop"></i>
                <span>跟随系统</span>
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
  }

  initEvents() {
    // 打开主题弹窗
    const themeSettingBtn = document.getElementById('themeSetting');
    if (themeSettingBtn) {
      themeSettingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('themeModal').classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // 关闭设置下拉菜单
        const dropdown = document.querySelector('.setting-dropdown');
        if (dropdown) dropdown.classList.remove('show');
      });
    }

    // 关闭弹窗
    const closeModal = () => {
      document.getElementById('themeModal').classList.remove('show');
      document.body.style.overflow = '';
    };

    document.getElementById('themeClose')?.addEventListener('click', closeModal);

    // 点击遮罩关闭
    document.getElementById('themeModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'themeModal') closeModal();
    });

    // 主题选项点击
    document.querySelectorAll('.theme-option').forEach(btn => {
      btn.addEventListener('click', () => {
        this.applyTheme(btn.dataset.theme);
        setTimeout(closeModal, 300);
      });
    });

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (localStorage.getItem('theme') === 'auto') {
        this.applyTheme('auto');
      }
    });
  }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => new ThemeManager());
