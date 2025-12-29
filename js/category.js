// 渲染分类标题
function renderCategoryHeader(type) {
  const cat = window.categories[type];
  const header = document.getElementById('categoryHeader');

  if (cat) {
    header.innerHTML = `
      <div class="category-header">
        <h1 class="category-title">
          ${cat.header} <span class="category-count">(0)</span>
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
  } else {
    header.innerHTML = `<h1 class="category-title">分类未找到</h1>`;
  }
}

// 绑定筛选按钮
function bindFilterEvents(type) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      // 暂时显示所有视频，因为api未定义
      renderVideosByCategory(type);
    });
  });
}

// 根据分类渲染视频
function renderVideosByCategory(categoryType) {
  // 过滤出指定分类的视频
  const filteredVideos = videos.filter(video => video.category === categoryType);
  renderVideos(filteredVideos);
}

// 从URL获取分类类型
const type = new URLSearchParams(location.search).get('type') || 'anime';

// 页面加载时渲染
renderCategoryHeader(type);
// 使用本地数据而不是api调用
renderVideosByCategory(type);