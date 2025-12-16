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
