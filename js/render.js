/* ===== 渲染函数 ===== */
function renderVideos(videosToShow = null) {
  // 如果没有传入视频数组，则使用全局的videos数组
  const videosToRender = videosToShow || window.videos || [];
  
  const gridElement = document.getElementById('grid');
  if (!gridElement) {
    console.error('未找到视频网格元素 #grid');
    return;
  }
  
  gridElement.innerHTML = videosToRender.map(v => {
    // 给每个视频匹配对应的播放页
    let playPage = 'play.html'; // 默认播放页
    if(v.id === 'spring') playPage = 'play-spring.html';
    if(v.id === 'kyoto') playPage = 'play-kyoto.html';
    
    return `
    <div class="card" onclick="window.open('${playPage}?id=${v.id}', '_blank')">
      <img src="${v.thumb}" alt="${v.title}">
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
  if (!dropdown) {
    console.error('未找到分类下拉菜单 .category-dropdown');
    return;
  }
  
  // 使用window.categoriesList确保数据可用
  const categoriesToUse = window.categoriesList || window.originalCategories || categories;
  
  dropdown.innerHTML = categoriesToUse.map(category => `
    <a href="${category.page}" class="category-item">${category.name}</a>
  `).join('');
}

// 渲染播放页视频信息
function renderVideoPlayer() {
  // 获取URL参数中的视频ID
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('id');
  
  if (!videoId) {
    // 如果没有视频ID，使用默认视频
    console.log('未找到视频ID，使用默认视频');
    return;
  }
  
  // 在全局视频数组中查找对应视频
  const video = window.videos.find(v => v.id === videoId);
  
  if (!video) {
    console.error('未找到指定ID的视频:', videoId);
    return;
  }
  
  // 更新视频播放器
  const videoPlayer = document.getElementById('videoPlayer');
  if (videoPlayer) {
    // 如果视频有本地路径，使用本地资源；否则使用默认测试视频
    if (video.url) {
      videoPlayer.src = video.url;
    } else {
      videoPlayer.src = 'https://www.w3schools.com/html/mov_bbb.mp4'; // 默认测试视频
    }
    
    // 重新加载视频
    videoPlayer.load();
  }
  
  // 更新视频信息
  const videoTitle = document.getElementById('videoTitle');
  if (videoTitle) {
    videoTitle.textContent = video.title;
  }
  
  const videoAuthor = document.getElementById('videoAuthor');
  if (videoAuthor) {
    videoAuthor.textContent = video.author;
  }
  
  const videoPlays = document.getElementById('videoPlays');
  if (videoPlays) {
    videoPlays.textContent = `${video.plays} 播放`;
  }
  
  const videoDate = document.getElementById('videoDate');
  if (videoDate) {
    videoDate.textContent = video.date;
  }
  
  const videoDesc = document.getElementById('videoDesc');
  if (videoDesc) {
    videoDesc.textContent = video.description;
  }
  
  // 更新视频封面（如果有的话）
  const videoCover = document.querySelector('.video-wrapper video');
  if (videoCover && video.thumb) {
    // 可以设置视频封面，但这需要额外的处理
  }
  
  // 更新推荐视频列表
  renderRecommendations(video.category, video.id);
}

// 渲染推荐视频
function renderRecommendations(currentCategory, currentVideoId) {
  // 过滤出相同类别的视频，排除当前视频
  const relatedVideos = window.videos.filter(v => 
    v.category === currentCategory && v.id !== currentVideoId
  );
  
  // 如果同类视频不足，补充其他视频
  let videosToShow = relatedVideos.slice(0, 4); // 最多显示4个相关视频
  
  if (videosToShow.length < 4) {
    const otherVideos = window.videos.filter(v => 
      v.category !== currentCategory && v.id !== currentVideoId
    ).slice(0, 4 - videosToShow.length);
    
    videosToShow = [...videosToShow, ...otherVideos];
  }
  
  // 如果仍然不足，循环使用已有视频
  while (videosToShow.length < 4 && videosToShow.length > 0) {
    const additionalVideos = window.videos.slice(0, 4 - videosToShow.length);
    videosToShow = [...videosToShow, ...additionalVideos];
  }
  
  // 渲染推荐列表
  const recommendList = document.getElementById('recommendList');
  if (!recommendList) {
    console.error('未找到推荐视频列表 #recommendList');
    return;
  }
  
  recommendList.innerHTML = videosToShow.map(v => `
    <div class="recommendation-item" onclick="window.open('play.html?id=${v.id}', '_blank')">
      <div class="recommendation-thumb">
        <img src="${v.thumb}" alt="${v.title}">
      </div>
      <div class="recommendation-info">
        <div class="recommendation-title">${v.title}</div>
        <div class="recommendation-meta">${v.plays}播放</div>
      </div>
    </div>
  `).join('');
}

// 设置菜单交互
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否在播放页
  if (window.location.pathname.includes('play.html')) {
    // 在播放页，渲染视频播放器
    if (typeof renderVideoPlayer === 'function') {
      renderVideoPlayer();
    }
  } else {
    // 在首页或其他页面，渲染视频网格
    if (typeof renderVideos === 'function') {
      renderVideos();
    }
    
    // 渲染分类
    if (typeof renderCategories === 'function') {
      renderCategories();
    }
  }
  
  const settingMenu = document.querySelector('.setting-menu');
  const settingLink = document.querySelector('.setting-link');
  const settingDropdown = document.querySelector('.setting-dropdown');
  
  if (settingMenu && settingLink && settingDropdown) {
    // 点击设置按钮显示/隐藏下拉菜单
    settingLink.addEventListener('click', function(e) {
      e.stopPropagation();
      settingDropdown.classList.toggle('show');
      
      // 关闭其他下拉菜单
      document.querySelectorAll('.dropdown:not(.setting-dropdown)').forEach(dropdown => {
        dropdown.classList.remove('show');
      });
    });
  }
});
