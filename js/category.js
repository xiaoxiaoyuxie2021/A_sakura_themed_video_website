// 分类页面数据与渲染逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 获取当前页面分类（从URL或页面标题提取）
  const getCurrentCategory = () => {
    const title = document.title;
    const categoryName = title.split(' - ')[0];
    return categories.find(cat => cat.name === categoryName)?.id || 'all';
  };
  
  // 当前分类ID
  const currentCategoryId = getCurrentCategory();
  // 分页参数
  let currentPage = 1;
  const pageSize = 12;
  // 筛选条件
  let currentFilter = 'all';
  
  // 模拟分类视频数据生成函数
  const generateCategoryVideos = (categoryId, page = 1, count = 12) => {
    const results = [];
    const startIndex = (page - 1) * count;
    
    for (let i = 0; i < count; i++) {
      const index = startIndex + i;
      // 生成不同的缩略图
      const randomId = Math.floor(Math.random() * 1000);
      let thumbUrl = `https://source.unsplash.com/random/320x180?anime&sig=${randomId}`;
      
      // 根据分类设置不同的缩略图主题
      switch(categoryId) {
        case 'game':
          thumbUrl = `https://source.unsplash.com/random/320x180?game&sig=${randomId}`;
          break;
        case 'movie':
          thumbUrl = `https://source.unsplash.com/random/320x180?movie&sig=${randomId}`;
          break;
        case 'food':
          thumbUrl = `https://source.unsplash.com/random/320x180?food&sig=${randomId}`;
          break;
        case 'music':
          thumbUrl = `https://source.unsplash.com/random/320x180?music&sig=${randomId}`;
          break;
        case 'sports':
          thumbUrl = `https://source.unsplash.com/random/320x180?sports&sig=${randomId}`;
          break;
        case 'dance':
          thumbUrl = `https://source.unsplash.com/random/320x180?dance&sig=${randomId}`;
          break;
      }
      
      // 随机播放量
      const plays = (Math.random() * 10).toFixed(1) + '万';
      // 随机时长
      const minutes = Math.floor(Math.random() * 60) + 5;
      const seconds = Math.floor(Math.random() * 60);
      const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      results.push({
        id: `cat_${categoryId}_${index}`,
        title: `${categories.find(c => c.id === categoryId)?.name || '精选'}视频 ${index + 1} - 精彩内容不容错过`,
        thumb: thumbUrl,
        url: `https://www.w3schools.com/html/mov_bbb.mp4?random=${index}`,
        plays: plays,
        duration: duration,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
      });
    }
    
    return results;
  };
  
  // 渲染视频卡片
  const renderVideoCards = (videos, container, isAppend = false) => {
    if (!isAppend) {
      container.innerHTML = '';
    }
    
    videos.forEach(video => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.innerHTML = `
        <div class="video-thumb">
          <img src="${video.thumb}" alt="${video.title}">
          <span class="video-duration">${video.duration}</span>
        </div>
        <div class="video-info">
          <div class="video-title">${video.title}</div>
          <div class="video-meta">
            <span><i class="fas fa-eye"></i>${video.plays}</span>
            <span>${video.date}</span>
          </div>
        </div>
      `;
      
      // 点击播放视频
      card.addEventListener('click', () => {
        play(video.url);
      });
      
      container.appendChild(card);
    });
    
    // 更新计数
    updateCategoryCount();
  };
  
  // 更新分类视频计数
  const updateCategoryCount = () => {
    const countElement = document.querySelector('.category-count');
    const cardCount = document.querySelectorAll('#categoryGrid .video-card').length;
    if (countElement) {
      countElement.textContent = `(${cardCount})`;
    }
  };
  
  // 加载视频
  const loadVideos = (page = 1, filter = 'all', append = false) => {
    const grid = document.getElementById('categoryGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // 显示加载状态
    loadMoreBtn.classList.add('loading');
    
    // 模拟网络请求延迟
    setTimeout(() => {
      const videos = generateCategoryVideos(currentCategoryId, page, pageSize);
      
      // 根据筛选条件过滤
      let filteredVideos = [...videos];
      if (filter === 'new') {
        filteredVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (filter === 'hot') {
        filteredVideos.sort((a, b) => {
          const playsA = parseFloat(a.plays);
          const playsB = parseFloat(b.plays);
          return playsB - playsA;
        });
      }
      
      renderVideoCards(filteredVideos, grid, append);
      
      // 隐藏加载状态
      loadMoreBtn.classList.remove('loading');
    }, 800);
  };
  
  // 初始化页面
  const init = () => {
    // 首次加载
    loadVideos(currentPage, currentFilter);
    
    // 加载更多按钮事件
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', () => {
      currentPage++;
      loadVideos(currentPage, currentFilter, true);
    });
    
    // 筛选按钮事件
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 更新活跃状态
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // 重置分页并重新加载
        currentFilter = btn.dataset.filter;
        currentPage = 1;
        loadVideos(currentPage, currentFilter);
      });
    });
    
    // 渲染分类下拉菜单（复用首页逻辑）
    if (document.querySelector('.category-dropdown')) {
      renderCategories();
    }
    
    // 搜索功能
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const keyword = searchInput.value.trim();
          keyword ? alert(`正在搜索【${document.querySelector('.category-title').textContent}】中的视频：${keyword}`) : alert('请输入搜索内容哦~');
        }
      });
    }
    
    // 刷新按钮
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        currentPage = 1;
        loadVideos(currentPage, currentFilter);
      });
    }
  };
  
  // 启动初始化
  init();
});