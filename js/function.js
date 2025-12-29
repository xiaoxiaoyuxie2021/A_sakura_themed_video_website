/* ===== 功能函数 ===== */
// 视频播放控制
function play(url) {
  const player = document.getElementById('player');
  const vp = document.getElementById('videoPlayer');
  vp.src = url;
  player.style.display = 'flex';
}
function closePlayer() {
  document.getElementById('player').style.display = 'none';
  document.getElementById('videoPlayer').pause();
}

// 分类选择
function selectCategory(name) {
  console.log('选择分类：', name);
  // 这里可以添加分类筛选逻辑
}

// 文件上传处理
function handleFileUpload(file) {
  if (!isLoggedIn()) {
    showLoginModal();
    return;
  }

  if (!file.type.startsWith('video/')) {
    alert('请上传视频文件！');
    return;
  }
  console.log('上传文件：', file.name);
  alert(`开始上传：${file.name}\n大小：${(file.size / 1024 / 1024).toFixed(2)}MB`);
}

/* ===== 登录认证功能 ===== */
// 固定账号信息
const FIXED_USER = {
  username: 'jy_muxiaoxi',
  password: '258147ab!'
};

// 检查是否已登录
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// 登录函数
function login(username, password) {
  if (username === FIXED_USER.username && password === FIXED_USER.password) {
    // 登录成功，存储登录状态
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({
      username: FIXED_USER.username,
      avatar: 'MU' // 用户头像首字母
    }));
    return true;
  }
  return false;
}

// 登出函数
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  // 刷新页面以更新UI
  window.location.href = 'index.html';
}

// 更新用户界面
function updateUserInfo() {
  const userLink = document.querySelector('.user-link');
  const userDropdown = document.querySelector('.user-dropdown');
  const userMenu = document.getElementById('userMenu');

  if (isLoggedIn()) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    userLink.innerHTML = `
      <div class="user-avatar">${user.avatar}</div>
    `;
    // 在退出登录按钮上方添加"我的内容"入口
    userDropdown.innerHTML = `
      <div class="user-info">
        <div class="user-avatar">${user.avatar}</div>
        <div class="user-name">${user.username}</div>
      </div>
      <a href="mycontent.html" class="user-menu-item" style="
        display: block; 
        padding: 12px 15px; 
        text-decoration: none; 
        color: #666; 
        text-align: center; 
        font-size: 14px; 
        cursor: pointer; 
        transition: all 0.2s;
        border-top: 1px solid rgba(244, 143, 177, 0.1);
      " onmouseover="this.style.backgroundColor='rgba(244, 143, 177, 0.1)'; this.style.color='#f48fb1';" 
      onmouseout="this.style.backgroundColor=''; this.style.color='#666';">
        <i class="fas fa-video" style="margin-right: 8px; font-size: 14px;"></i>我的内容
      </a>
      <button class="user-logout" id="logoutBtn">退出登录</button>
    `;
    userMenu.classList.add('logged-in');

    // 绑定退出登录事件
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
  } else {
    userLink.textContent = '用户';
    userDropdown.innerHTML = `
      <div class="user-promo">
        点击用户头像，畅享更多精彩内容！
      </div>
    `;
    userMenu.classList.remove('logged-in');
  }
}

// 显示登录弹窗
function showLoginModal() {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.classList.add('show');
  }
}

/* ===== 事件绑定 ===== */
// 页面加载完成后初始化
window.onload = function () {
  // 初始化渲染
  if (document.getElementById('grid')) renderVideos();
  if (document.querySelector('.category-dropdown')) renderCategories();

  // 更新用户信息显示
  updateUserInfo();

  // 上传按钮事件 - 检查登录状态
  document.getElementById('selectFileBtn').addEventListener('click', function () {
    if (!isLoggedIn()) {
      showLoginModal();
      return;
    }
    document.getElementById('fileInput').click();
  });

  // 文件选择事件
  document.getElementById('fileInput').addEventListener('change', function (e) {
    if (!isLoggedIn()) {
      showLoginModal();
      return;
    }
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
  });

  // 粘贴上传事件
  document.addEventListener('paste', function (e) {
    if (!isLoggedIn()) {
      showLoginModal();
      return;
    }
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let item of items) {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) handleFileUpload(file);
      }
    }
  });

  // 搜索功能
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const keyword = searchInput.value.trim();
        keyword ? alert(`正在搜索视频：${keyword}`) : alert('请输入搜索内容哦~');
      }
    });
  }

  // 刷新功能
  const refreshBtn = document.getElementById('refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      window.location.reload();
    });
  }

  // 上传菜单事件 - 检查登录状态
  const uploadLink = document.querySelector('.upload-link');
  if (uploadLink) {
    uploadLink.addEventListener('click', function (e) {
      if (!isLoggedIn()) {
        e.preventDefault(); // 阻止默认跳转行为
        showLoginModal();
      }
    });
  }


  // 登录注册弹窗交互
  const userLink = document.querySelector('.user-link');
  const authModal = document.getElementById('authModal');
  const modalClose = document.getElementById('modalClose');
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');

  if (userLink && authModal) {
    userLink.addEventListener('click', (e) => {
      e.stopPropagation();
      // 只有未登录时才显示登录弹窗
      if (!isLoggedIn()) {
        authModal.classList.add('show');
      }
    });
  }
  if (modalClose && authModal) {
    modalClose.addEventListener('click', () => authModal.classList.remove('show'));
  }
  if (authModal) {
    authModal.addEventListener('click', (e) => e.target === authModal && authModal.classList.remove('show'));
  }
  if (authTabs && authForms) {
    authTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.style.display = 'none');
        tab.classList.add('active');
        document.querySelector(`.${tab.dataset.tab}-form`).style.display = 'block';
      });
    });
  }

  // 登录按钮事件
  document.getElementById('loginBtn')?.addEventListener('click', function () {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (login(username, password)) {
      alert('登录成功！');
      authModal.classList.remove('show');
      updateUserInfo(); // 更新用户界面
    } else {
      alert('用户名或密码错误！');
    }
  });

  // 模拟在线人数更新
  setInterval(() => {
    const onlineUsers = document.getElementById('onlineUsers');
    if (onlineUsers) {
      onlineUsers.textContent = Math.floor(Math.random() * 20) + 30;
    }
  }, 30000);
};

// 音乐播放器功能
document.addEventListener('DOMContentLoaded', function () {
  // 音乐播放器相关元素
  const bgMusic = document.getElementById('bgMusic');
  const floatingMusicPlayer = document.getElementById('floatingMusicPlayer');
  const musicDisc = document.getElementById('musicDisc');
  const miniPlayBtn = document.getElementById('miniPlayBtn');
  const expandedPlayer = document.getElementById('expandedPlayer');
  const playerPlayBtn = document.getElementById('playerPlayBtn');
  const playerPlayIcon = document.getElementById('playerPlayIcon');
  const playerCloseBtn = document.getElementById('playerCloseBtn');
  const progressBar = document.getElementById('progressBar');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');
  const tutorialTip = document.getElementById('tutorialTip');
  const tutorialClose = document.getElementById('tutorialClose');

  let isPlaying = false;
  let isExpanded = false;
  let isDragging = false;
  let offsetX = 0, offsetY = 0;
  let dragStartX = 0, dragStartY = 0;
  let dragThreshold = 5; // 拖动阈值，防止轻微移动也被认为是拖动

  // 检查是否显示过教程提示
  const hasSeenTutorial = localStorage.getItem('hasSeenMusicTutorial');
  if (hasSeenTutorial) {
    tutorialTip.style.display = 'none';
  }

  // 音乐播放器功能
  if (bgMusic) {
    // 音乐加载完成后更新时长
    bgMusic.addEventListener('loadedmetadata', function () {
      updateDuration();
    });

    // 更新播放进度
    bgMusic.addEventListener('timeupdate', function () {
      updateProgress();
    });

    // 音乐播放结束后重置
    bgMusic.addEventListener('ended', function () {
      isPlaying = false;
      updatePlayButton();
      musicDisc.classList.remove('playing');
    });

    // 播放器展开/收起 - 使用mousedown事件而不是click
    floatingMusicPlayer.addEventListener('mousedown', function (e) {
      // 如果已经在拖动，则不触发展开/收起
      if (isDragging) return;

      // 如果是点击播放/暂停或关闭按钮，不触发展开/收起
      if (e.target.closest('.player-play-btn') || e.target.closest('.player-close')) {
        return;
      }

      // 记录点击位置，用于判断是否为拖动
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    });

    // 鼠标按下事件（用于拖动检测）
    floatingMusicPlayer.addEventListener('mousedown', function (e) {
      if (isExpanded) return; // 展开时不拖动

      isDragging = true;
      const rect = floatingMusicPlayer.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      floatingMusicPlayer.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging || isExpanded) return;

      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      const maxX = window.innerWidth - floatingMusicPlayer.offsetWidth;
      const maxY = window.innerHeight - floatingMusicPlayer.offsetHeight;

      // 限制在窗口范围内
      const finalX = Math.max(0, Math.min(x, maxX));
      const finalY = Math.max(0, Math.min(y, maxY));

      floatingMusicPlayer.style.right = (window.innerWidth - finalX - floatingMusicPlayer.offsetWidth) + 'px';
      floatingMusicPlayer.style.bottom = (window.innerHeight - finalY - floatingMusicPlayer.offsetHeight) + 'px';
    });

    document.addEventListener('mouseup', function (e) {
      // 检查是否发生了显著拖动
      const deltaX = Math.abs(e.clientX - dragStartX);
      const deltaY = Math.abs(e.clientY - dragStartY);
      const isSignificantDrag = deltaX > dragThreshold || deltaY > dragThreshold;

      if (isDragging) {
        isDragging = false;
        floatingMusicPlayer.style.cursor = 'pointer';
      }

      // 如果发生了显著拖动，则不触发展开/收起
      if (isSignificantDrag) return;

      // 只有在非拖动状态下才处理展开/收起逻辑
      if (!isExpanded && !isDragging) {
        // 检查点击的目标是否是按钮，如果是则不展开
        if (!e.target.closest('.mini-play-btn') && !e.target.closest('.player-play-btn') && !e.target.closest('.player-close')) {
          expandPlayer();
        }
      } else if (isExpanded && e.target.closest('.expanded-player') && !e.target.closest('.player-play-btn') && !e.target.closest('.player-close')) {
        // 如果在展开状态下点击展开区域，则收起（除了按钮区域）
        collapsePlayer();
      }
    });

    // 展开播放器中的播放按钮
    playerPlayBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      togglePlay();
    });

    // 关闭展开的播放器
    playerCloseBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      collapsePlayer();
    });

    // 进度条拖动
    progressBar.addEventListener('input', function () {
      const time = bgMusic.duration * (progressBar.value / 100);
      bgMusic.currentTime = time;
    });

    // 教程提示关闭
    tutorialClose.addEventListener('click', function () {
      tutorialTip.classList.add('hidden');
      localStorage.setItem('hasSeenMusicTutorial', 'true');
    });

    // 播放/暂停切换
    function togglePlay() {
      if (isPlaying) {
        bgMusic.pause();
      } else {
        bgMusic.play().catch(e => console.log('播放失败:', e));
      }
      isPlaying = !isPlaying;
      updatePlayButton();
      updateDiscAnimation();
    }

    // 更新播放按钮图标
    function updatePlayButton() {
      if (isPlaying) {
        miniPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playerPlayIcon.className = 'fas fa-pause';
      } else {
        miniPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        playerPlayIcon.className = 'fas fa-play';
      }
    }

    // 更新圆盘旋转动画
    function updateDiscAnimation() {
      if (isPlaying) {
        musicDisc.classList.add('playing');
      } else {
        musicDisc.classList.remove('playing');
      }
    }

    // 展开播放器
    function expandPlayer() {
      isExpanded = true;
      expandedPlayer.classList.add('expanded');
      // 隐藏教程提示
      tutorialTip.style.display = 'none';
    }

    // 收起播放器
    function collapsePlayer() {
      isExpanded = false;
      expandedPlayer.classList.remove('expanded');
    }

    // 更新播放进度
    function updateProgress() {
      if (bgMusic.duration) {
        const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
        progressBar.value = progress;
        currentTimeEl.textContent = formatTime(bgMusic.currentTime);
      }
    }

    // 更新音乐总时长
    function updateDuration() {
      durationEl.textContent = formatTime(bgMusic.duration);
    }

    // 格式化时间显示
    function formatTime(seconds) {
      if (isNaN(seconds)) return '00:00';
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
  }
});