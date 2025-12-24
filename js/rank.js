    // 排行榜数据
    const rankData = [
      {
        id: 1,
        title: "樱花飘落的季节 - 京都全景",
        thumb: "https://source.unsplash.com/random/300x200?kyoto,cherry",
        plays: "125.3万",
        comments: "3.2万",
        score: 98,
        category: "movie"
      },
      {
        id: 2,
        title: "动漫中的樱花名场面合集",
        thumb: "https://source.unsplash.com/random/300x200?anime,cherry",
        plays: "98.7万",
        comments: "2.8万",
        score: 95,
        category: "anime"
      },
      {
        id: 3,
        title: "樱花主题游戏音乐精选",
        thumb: "https://source.unsplash.com/random/300x200?game,cherry",
        plays: "87.5万",
        comments: "1.9万",
        score: 92,
        category: "music"
      },
      {
        id: 4,
        title: "樱花甜点制作教程",
        thumb: "https://source.unsplash.com/random/300x200?food,cherry",
        plays: "76.2万",
        comments: "1.5万",
        score: 89,
        category: "food"
      },
      {
        id: 5,
        title: "樱花树下的舞蹈表演",
        thumb: "https://source.unsplash.com/random/300x200?dance,cherry",
        plays: "65.8万",
        comments: "1.2万",
        score: 87,
        category: "dance"
      },
      {
        id: 6,
        title: "樱花马拉松赛事集锦",
        thumb: "https://source.unsplash.com/random/300x200?sports,cherry",
        plays: "54.3万",
        comments: "0.8万",
        score: 85,
        category: "sports"
      },
      {
        id: 7,
        title: "樱花主题游戏实况",
        thumb: "https://source.unsplash.com/random/300x200?game,cherry2",
        plays: "43.9万",
        comments: "0.7万",
        score: 82,
        category: "game"
      }
    ];

    // 渲染排行榜
    function renderRankList(category = 'all') {
      const rankList = document.getElementById('rankList');
      let filteredData = category === 'all' 
        ? rankData 
        : rankData.filter(item => item.category === category);

      rankList.innerHTML = filteredData.map((item, index) => `
        <div class="rank-item" onclick="window.open('play.html', '_blank')">
          <div class="rank-number ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : ''}">
            ${index + 1}
          </div>
          <div class="rank-thumb">
            <img src="${item.thumb}" alt="${item.title}">
          </div>
          <div class="rank-info">
            <div class="rank-video-title">${item.title}</div>
            <div class="rank-video-meta">
              <span><i class="fas fa-eye"></i> ${item.plays}播放</span>
              <span><i class="fas fa-comment"></i> ${item.comments}评论</span>
            </div>
          </div>
          <div class="rank-score">${item.score}</div>
        </div>
      `).join('');
    }

    // 排行榜标签切换
    document.querySelectorAll('.rank-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.rank-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderRankList(tab.dataset.category);
      });
    });

    // 页面加载时初始化
    window.addEventListener('load', () => {
      renderRankList();
      // 初始化分类菜单
      if (document.querySelector('.category-dropdown')) renderCategories();
    });
