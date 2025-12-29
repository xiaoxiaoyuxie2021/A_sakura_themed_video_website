// 渲染分类标题
function renderCategoryHeader(type) {
  const cat = categories[type];
  const header = document.getElementById('categoryHeader');
  
  header.innerHTML = `
    <div class="category-header">
      <h1 class="category-title">
        ${cat.header} <span class="category-count">(${cat.videos.length})</span>
      </h1>
      <div class="category-filters">
        <button class="filter-btn active" data-filter="all">全部</button>
        <button class="filter-btn" data-filter="new">最新</button>
        <button class="filter-btn" data-filter="hot">最热</button>
      </div>
    </div>
  `;
  
  // 绑定筛选按钮事件
  bindFilterEvents(type);
}

// 绑定筛选按钮
function bindFilterEvents(type) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      let videos = categories[type].videos;
      
      if (filter === 'new') {
        videos = videos.filter(v => v.isNew); // 需要你在数据里加isNew字段
      } else if (filter === 'hot') {
        videos = [...videos].sort((a, b) => b.views - a.views).slice(0, 10);
      }
      
      renderVideos(videos);
    });
  });
}

// 从URL获取分类类型
const type = new URLSearchParams(location.search).get('type') || 'anime';

// 页面加载时渲染
renderCategoryHeader(type);
api.getVideos(type).then(renderVideos); // 需要你在api.js里支持分类参数
