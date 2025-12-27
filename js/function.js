/* ===== 功能函数 ===== */
// 视频播放控制
function play(url){
  const player = document.getElementById('player');
  const vp = document.getElementById('videoPlayer');
  vp.src = url;
  player.style.display = 'flex';
}
function closePlayer(){
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
  if (!file.type.startsWith('video/')) {
    alert('请上传视频文件！');
    return;
  }
  console.log('上传文件：', file.name);
  alert(`开始上传：${file.name}\n大小：${(file.size/1024/1024).toFixed(2)}MB`);
}

/* ===== 事件绑定 ===== */
// 页面加载完成后初始化
window.onload = function() {
  // 初始化渲染
  if (document.getElementById('grid')) renderVideos();
  if (document.querySelector('.category-dropdown')) renderCategories();

  // 上传按钮事件
  document.getElementById('selectFileBtn').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  // 文件选择事件
  document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
  });

  // 粘贴上传事件
  document.addEventListener('paste', function(e) {
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

  // 登录注册弹窗交互
  const userLink = document.querySelector('.user-link');
  const authModal = document.getElementById('authModal');
  const modalClose = document.getElementById('modalClose');
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');

  if (userLink && authModal) {
    userLink.addEventListener('click', (e) => {
      e.stopPropagation();
      authModal.classList.add('show');
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

  // 模拟在线人数更新
  setInterval(() => {
    const onlineUsers = document.getElementById('onlineUsers');
    if (onlineUsers) {
      onlineUsers.textContent = Math.floor(Math.random() * 20) + 30;
    }
  }, 30000);
};

// ===== 抽屉式音乐播放器控制 =====
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');
const musicCard = document.getElementById('musicCard');
const musicTrigger = document.getElementById('musicTrigger');
const musicThumb = document.getElementById('musicThumb');
const musicIcon = document.getElementById('musicIcon');

if (bgMusic && musicControl) {
  let isMusicPlaying = false;
  let isExpanded = false;  // 控制展开/收起状态
  
  // 设置音量
  bgMusic.volume = 0.3;
  
  // 点击触发边展开/收起
  musicTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCard();
  });
  
  // 点击内容区切换播放/暂停
  musicIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
  });
  
  // 鼠标离开卡片时自动收起
  musicCard.addEventListener('mouseleave', () => {
    if (isExpanded && !bgMusic.paused) {
      // 如果正在播放，延迟2秒再收起（防止误操作）
      setTimeout(() => {
        if (isExpanded) {
          collapseCard();
        }
      }, 2000);
    } else if (isExpanded) {
      // 如果已暂停，立即收起
      collapseCard();
    }
  });
  
  // 展开卡片
  function expandCard() {
    musicCard.classList.add('expanded');
    isExpanded = true;
  }
  
  // 收起卡片
  function collapseCard() {
    musicCard.classList.remove('expanded');
    isExpanded = false;
  }
  
  // 切换展开/收起
  function toggleCard() {
    isExpanded ? collapseCard() : expandCard();
  }
  
  // 切换播放/暂停
  function toggleMusic() {
    if (isMusicPlaying) {
      bgMusic.pause();
      musicThumb.classList.remove('playing');
      musicIcon.className = 'fas fa-play';
      console.log('背景音乐已暂停');
    } else {
      bgMusic.play();
      musicThumb.classList.add('playing');
      musicIcon.className = 'fas fa-pause';
      console.log('背景音乐已恢复播放');
    }
    isMusicPlaying = !isMusicPlaying;
  }
  
  // 首次点击页面任意位置开始播放
  document.addEventListener('click', function initMusic() {
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      musicThumb.classList.add('playing');
      musicIcon.className = 'fas fa-pause';
      console.log('背景音乐已开始播放');
    }).catch(e => {
      console.log('自动播放被阻止:', e);
      musicIcon.className = 'fas fa-play';
    });
    document.removeEventListener('click', initMusic);
  }, { once: true });
}

// 鼠标离开卡片时智能隐藏
musicContent.addEventListener('mouseleave', (e) => {
  // 检查鼠标是否移向了触发边（如果是，保持展开）
  const related = e.relatedTarget;
  if (related && related.closest('.music-trigger')) {
    return; // 不隐藏
  }
  
  // 否则延迟隐藏
  setTimeout(() => {
    if (!musicCard.matches(':hover')) {
      collapseCard();
    }
  }, 800); // 延迟0.8秒，给用户时间返回
});


