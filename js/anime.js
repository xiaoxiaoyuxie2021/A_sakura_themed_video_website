// 页面加载时只渲染动漫分类视频
window.onload = function() {
  renderCategories();
  
  // 过滤动漫分类视频
  const animeVideos = videos.filter(video => {
    // 实际项目中应该有category字段，这里模拟过滤
    return video.title.includes("动漫") || video.tags?.includes("anime");
  });
  
  // 渲染动漫视频
  renderFilteredVideos(animeVideos);
};

// 渲染过滤后的视频
function renderFilteredVideos(filteredVideos) {
  const grid = document.getElementById('grid');
  if (!grid) return;
  
  grid.innerHTML = filteredVideos.map(video => `
    <div class="video-card" onclick="play('${video.url || video.file}')">
      <div class="video-thumb">
        <img src="${video.thumb}" alt="${video.title}">
        <span class="play-count"><i class="fas fa-eye"></i> ${video.plays}</span>
      </div>
      <div class="video-title">${video.title}</div>
    </div>
  `).join('');
}
