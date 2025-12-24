// 用户视频数据
const userVideos = [
  {
    id: 'user1',
    title: '京都樱花季全景拍摄',
    thumb: 'https://source.unsplash.com/random/300x200?kyoto,cherry',
    plays: '2.4万'
  },
  {
    id: 'user2',
    title: '樱花飘落慢镜头',
    thumb: 'https://source.unsplash.com/random/300x200?cherry,fall',
    plays: '1.8万'
  },
  {
    id: 'user3',
    title: '春日樱花祭活动记录',
    thumb: 'https://source.unsplash.com/random/300x200?festival,cherry',
    plays: '3.1万'
  },
  {
    id: 'user4',
    title: '夜樱拍摄技巧分享',
    thumb: 'https://source.unsplash.com/random/300x200?night,cherry',
    plays: '5.2万'
  },
  {
    id: 'user5',
    title: '樱花树下的野餐',
    thumb: 'https://source.unsplash.com/random/300x200?picnic,cherry',
    plays: '1.5万'
  },
  {
    id: 'user6',
    title: '樱花与古建筑的完美融合',
    thumb: 'https://source.unsplash.com/random/300x200?temple,cherry',
    plays: '2.8万'
  }
];

// 渲染用户视频
function renderUserVideos() {
  const container = document.getElementById('userVideos');
  container.innerHTML = userVideos.map(video => `
    <div class="card" onclick="window.open('play.html', '_blank')">
      <img src="${video.thumb}" alt="${video.title}">
      <div class="card-body">
        <div class="card-title">${video.title}</div>
        <div class="card-info">${video.plays}播放</div>
      </div>
    </div>
  `).join('');
}

// 页面加载完成后初始化
window.addEventListener('load', () => {
  const selectFileBtn = document.getElementById('selectFileBtn');
  const fileInput = document.getElementById('fileInput');
  renderUserVideos();

  // 标签页切换
  const tabs = document.querySelectorAll('.profile-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // 这里可以添加不同标签页内容的切换逻辑
    });
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

  // 弹窗相关元素
  const authModal = document.getElementById('authModal');
  const modalClose = document.getElementById('modalClose');
  const authTabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.querySelector('.login-form');
  const registerForm = document.querySelector('.register-form');
  const userLink = document.querySelector('.user-link');

  // 用户菜单点击显示弹窗
  if (userLink && authModal) {
    userLink.addEventListener('click', (e) => {
      e.stopPropagation();
      authModal.classList.add('show');
    });
  }

  // 关闭弹窗
  if (modalClose && authModal) {
    modalClose.addEventListener('click', () => {
      authModal.classList.remove('show');
    });
  }

  // 点击遮罩层关闭弹窗
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        authModal.classList.remove('show');
      }
    });
  }

  // 切换登录/注册标签
  if (authTabs) {
    authTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        if (tab.dataset.tab === 'login') {
          if (loginForm) loginForm.style.display = 'block';
          if (registerForm) registerForm.style.display = 'none';
        } else {
          if (loginForm) loginForm.style.display = 'none';
          if (registerForm) registerForm.style.display = 'block';
        }
      
      });
    });
  }
});