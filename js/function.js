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
  renderVideos();
  renderCategories();

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
};
