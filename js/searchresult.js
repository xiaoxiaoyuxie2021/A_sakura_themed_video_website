// 搜索结果数据
const searchResults = [
  { id: "sakura1", title: "京都樱花季漫步", thumb: "https://source.unsplash.com/random/320x180?kyoto,cherry", plays: "12.5万", duration: "05:24", author: "旅行日记" },
  { id: "sakura2", title: "樱花飘落的速度是每秒五厘米", thumb: "https://source.unsplash.com/random/320x180?anime,cherry", plays: "87.3万", duration: "02:15", author: "动漫精选" },
  { id: "sakura3", title: "樱花主题钢琴演奏", thumb: "https://source.unsplash.com/random/320x180?piano,cherry", plays: "5.2万", duration: "03:45", author: "音乐之声" },
  { id: "sakura4", title: "东京上野公园樱花全景", thumb: "https://source.unsplash.com/random/320x180?tokyo,cherry", plays: "3.7万", duration: "08:12", author: "城市漫游" },
  { id: "sakura5", title: "樱花妆容教程", thumb: "https://source.unsplash.com/random/320x180?makeup,cherry", plays: "9.4万", duration: "12:30", author: "美妆达人" },
  { id: "sakura6", title: "樱花美食制作：樱花大福", thumb: "https://source.unsplash.com/random/320x180?food,cherry", plays: "6.8万", duration: "07:45", author: "美食厨房" },
];

// 渲染搜索结果
function renderSearchResults() {
  const resultsGrid = document.getElementById('resultsGrid');
  resultsGrid.innerHTML = searchResults.map(item => `
    <div class="card" onclick="window.open('play.html?id=${item.id}', '_blank')">
      <div class="card-thumb">
        <img src="${item.thumb}" alt="${item.title}">
        <span class="video-duration">${item.duration}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${item.title}</div>
        <div class="card-author">${item.author}</div>
        <div class="card-info">${item.plays}播放</div>
      </div>
    </div>
  `).join('');
}

// 搜索功能
document.getElementById('search-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const keyword = e.target.value.trim();
    if (keyword) {
      // 实际项目中这里会重新请求搜索结果
      document.querySelector('.search-query').textContent = `搜索 "${keyword}"`;
    }
  }
});

// 筛选按钮交互
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // 实际项目中这里会根据筛选条件重新加载结果
  });
});

// 分页按钮交互
document.querySelectorAll('.page-btn:not(:first-child):not(:last-child)').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // 实际项目中这里会加载对应页的结果
  });
});

// 页面加载完成后初始化
window.addEventListener('load', () => {
  renderSearchResults();
  renderCategories(); // 从function.js复用分类渲染函数
});
