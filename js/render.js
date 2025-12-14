/* ===== 渲染函数 ===== */
function renderVideos() {
  document.getElementById('grid').innerHTML = videos.map(v=>{
    // 给每个视频匹配对应的播放页
    let playPage = 'play.html'; // 默认播放页
    if(v.id === 'spring') playPage = 'play-spring.html';
    if(v.id === 'kyoto') playPage = 'play-kyoto.html';
    
    return `
    <div class="card" onclick="window.open('${playPage}', '_blank')">
      <img src="${v.thumb}" alt="封面">
      <div class="card-body">
        <div class="card-title">${v.title}</div>
        <div class="card-info">${v.plays}播放</div>
      </div>
    </div>`;
  }).join('');
}

// 渲染分类菜单
function renderCategories() {
  const dropdown = document.querySelector('.category-dropdown');
  dropdown.innerHTML = categories.map(category => `
    <a href="#${category.id}" class="category-item" onclick="selectCategory('${category.name}')">${category.name}</a>
  `).join('');
}
