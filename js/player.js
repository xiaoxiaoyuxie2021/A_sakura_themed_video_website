// 播放页功能全集（全部包进 load，避免 null）
window.addEventListener('load', function () {
if (!video) {
    console.error('视频元素不存在！');
    return;
  }
  /* ===== 1. 基础元素 ===== */
  const video = document.getElementById('videoPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const progressBar = document.getElementById('progressBar');
  const progressFilled = document.getElementById('progressFilled');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');
  const volumeBtn = document.getElementById('volumeBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const videoWrapper = document.querySelector('.video-wrapper');
  
  const requiredElements = [
    'playPauseBtn', 'progressBar', 'progressFilled',
    'currentTime', 'duration', 'volumeBtn', 'volumeSlider',
    'fullscreenBtn', 'videoWrapper'
  ];
  const elements = {};
  requiredElements.forEach(id => {
    elements[id] = document.getElementById(id) || document.querySelector(`.${id}`);
    if (!elements[id]) {
      console.error(`控件元素 ${id} 不存在，已创建备用元素`);
      // 为关键控件创建备用元素
      if (id === 'playPauseBtn') {
        const btn = document.createElement('button');
        btn.id = id;
        btn.className = 'play-pause-btn';
        btn.innerHTML = '<i class="fas fa-play"></i>';
        document.querySelector('.video-wrapper').appendChild(btn);
        elements[id] = btn;
      }
    }
  });

  /* ===== 2. 播放/暂停 ===== */
  function togglePlay() {
    if (video.paused || video.ended) {
      video.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      video.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }
  if (elements.playPauseBtn) {
    elements.playPauseBtn.addEventListener('click', togglePlay);
  }
  video.addEventListener('click', togglePlay);

  /* ===== 3. 进度条 ===== */
  function updateProgress() {
    const percent = video.currentTime / video.duration * 100;
    progressFilled.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(video.currentTime);
    durationEl.textContent = formatTime(video.duration);
  }
  video.addEventListener('timeupdate', updateProgress);

  progressBar.addEventListener('click', (e) => {
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  });

  /* ===== 4. 音量 ===== */
  function updateVolumeIcon() {
    if (video.muted || video.volume === 0) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      volumeSlider.value = 0;
    } else if (video.volume < 0.5) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  }
  volumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value;
    updateVolumeIcon();
  });
  volumeBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    updateVolumeIcon();
  });

  /* ===== 5. 全屏 ===== */
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      videoWrapper.requestFullscreen().catch((err) => {
        console.error(`全屏错误: ${err.message}`);
      });
      fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
      document.exitFullscreen();
      fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  });

  /* ===== 6. 结束重置 ===== */
  video.addEventListener('ended', () => {
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  });

  /* ===== 7. 初始时长 ===== */
  video.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(video.duration);
  });

  /* ===== 8. 工具函数 ===== */
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  /* ===== 9. 弹窗层级修复 ===== */
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(d => d.style.zIndex = '100');
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('show'));
  });

  /* ===== 10. 评论发送 ===== */
  const sendBtn = document.querySelector('.send-btn');
  const commentInput = document.querySelector('.comment-input input');
  const commentList = document.querySelector('.comment-list');
  if (sendBtn && commentInput && commentList) {
    sendBtn.addEventListener('click', () => {
      const text = commentInput.value.trim();
      if (!text) return;
      const now = new Date();
      const timeStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
      const item = document.createElement('div');
      item.className = 'comment-item';
      item.innerHTML = `
        <div class="comment-avatar">我</div>
        <div class="comment-content">
          <div class="comment-author">我</div>
          <div class="comment-text">${text}</div>
          <div class="comment-time">${timeStr}</div>
        </div>`;
      commentList.prepend(item);
      commentInput.value = '';
    });
  }

  /* ===== 11. 视频错误兜底 ===== */
  video.addEventListener('error', (e) => {
    console.error('视频加载错误:', e);
    alert('视频加载失败，请稍后再试');
  });

});

/* ========== 正规生命周期初始化 ========== */
document.addEventListener('DOMContentLoaded', () => {
  const v   = document.getElementById('videoPlayer');
  const bar = document.getElementById('progressBar');
  const fill= document.getElementById('progressFilled');
  const cur = document.getElementById('currentTime');
  const dur = document.getElementById('duration');
  const btn = document.getElementById('playPauseBtn');
  const volBtn=document.getElementById('volumeBtn');
  const volSl=document.getElementById('volumeSlider');
  const fsBtn=document.getElementById('fullscreenBtn');
  const wrap=document.querySelector('.video-wrapper');

  if (!v || !bar || !fill || !cur || !dur || !btn || !volBtn || !volSl || !fsBtn || !wrap) {
    console.error('[初始化] 必需元素缺失，放弃绑定');
    return;
  }

  /* 1. 播放/暂停 */
  btn.addEventListener('click', () => {
    v.paused ? v.play() : v.pause();
  });
  v.addEventListener('play',  () => btn.innerHTML = '<i class="fas fa-pause"></i>');
  v.addEventListener('pause', () => btn.innerHTML = '<i class="fas fa-play"></i>');

  /* 2. 进度条显示 */
  v.addEventListener('timeupdate', () => {
    const pct = v.currentTime / v.duration;
    fill.style.width = (pct * 100) + '%';
    cur.textContent = fmt(v.currentTime);
  });
  v.addEventListener('loadedmetadata', () => dur.textContent = fmt(v.duration));

  /* 3. 进度条点击跳转 */
  bar.addEventListener('click', e => {
    v.currentTime = (e.offsetX / bar.offsetWidth) * v.duration;
  });

  /* 4. 拖动跳转（可选，正规也支持） */
  let dragging = false;
  bar.addEventListener('mousedown',  e => dragging = true);
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    v.currentTime = ((e.clientX - bar.getBoundingClientRect().left) / bar.offsetWidth) * v.duration;
  });
  document.addEventListener('mouseup',    () => dragging = false);

  /* 5. 音量 */
  volSl.value = v.volume;
  volSl.addEventListener('input', e => {
    v.volume = e.target.value;
    v.muted = false;
    updateVolIcon();
  });
  volBtn.addEventListener('click', () => {
    v.muted = !v.muted;
    updateVolIcon();
  });
  function updateVolIcon() {
    const ic = v.muted || v.volume === 0 ? 'mute' : v.volume < 0.5 ? 'down' : 'up';
    volBtn.innerHTML = `<i class="fas fa-volume-${ic}"></i>`;
  }

  /* 6. 全屏 */
  fsBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) wrap.requestFullscreen();
    else document.exitFullscreen();
  });
  document.addEventListener('fullscreenchange', () => {
    fsBtn.innerHTML = document.fullscreenElement
      ? '<i class="fas fa-compress"></i>'
      : '<i class="fas fa-expand"></i>';
  });
});
