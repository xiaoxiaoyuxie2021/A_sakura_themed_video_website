// player.js - 修复版（删繁就简，保留一套逻辑）
document.addEventListener('DOMContentLoaded', () => {
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
  const settingToggle = document.getElementById('settingToggle');
  const settingDropdown = document.getElementById('settingDropdown');

  // 检查元素是否存在
  if (!video || !playPauseBtn) {
    console.error('[播放器] 关键元素缺失');
    return;
  }

  // ===== 1. 播放/暂停 =====
  function togglePlay() {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  }
  playPauseBtn.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);

  // 播放状态图标切换
  video.addEventListener('play', () => {
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  });
  video.addEventListener('pause', () => {
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  });

  // 🔴 **修复Bug 2：播放结束后重置图标**
  video.addEventListener('ended', () => {
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    video.pause(); // 确保状态正确
  });

  // ===== 2. 进度条（核心修复） =====
  function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(video.currentTime);
  }
  video.addEventListener('timeupdate', updateProgress);

  video.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(video.duration);
  });

  // 🔴 **修复Bug 1：可拖动进度条**
  let isDragging = false;

  progressBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateScrub(e);
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateScrub(e);
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // 点击跳转
  progressBar.addEventListener('click', updateScrub);

  function updateScrub(e) {
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = percent * video.duration;
  }

  // 修改 player.js 的 updateScrub 函数，使用节流控制
  let lastUpdateTime = 0;
  const THROTTLE_DELAY = 10; // 50ms更新一次（数值越大越迟钝）

  function updateScrub(e) {
    const now = Date.now();
    if (now - lastUpdateTime < THROTTLE_DELAY) {
      return; // 跳过更新
    }
    lastUpdateTime = now;

    const rect = progressBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = percent * video.duration;
  }


  // ===== 3. 音量 =====
  function updateVolumeIcon() {
    const vol = video.muted ? 0 : video.volume;
    const icon = vol === 0 ? 'mute' : vol < 0.5 ? 'down' : 'up';
    volumeBtn.innerHTML = `<i class="fas fa-volume-${icon}"></i>`;
  }

  volumeSlider.value = video.volume;
  volumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value;
    video.muted = false;
    updateVolumeIcon();
  });

  volumeBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    updateVolumeIcon();
  });

  // ===== 4. 全屏 =====
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      videoWrapper.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    fullscreenBtn.innerHTML = document.fullscreenElement
      ? '<i class="fas fa-compress"></i>'
      : '<i class="fas fa-expand"></i>';
  });

  // ===== 5. 评论 =====
  const sendBtn = document.querySelector('.send-btn');
  const commentInput = document.querySelector('.comment-input input');
  if (sendBtn && commentInput) {
    sendBtn.addEventListener('click', () => {
      const text = commentInput.value.trim();
      if (!text) return;
      console.log('评论:', text);
      commentInput.value = '';
    });
  }

  // ===== 工具函数 =====
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
});

// ===== 全屏模式控制条智能隐藏 =====
let hideControlsTimer = null;

// 清除隐藏计时器
function clearHideTimer() {
  if (hideControlsTimer) {
    clearTimeout(hideControlsTimer);
    hideControlsTimer = null;
  }
}

// 启动隐藏计时器（3秒后隐藏）
function startHideTimer() {
  clearHideTimer();
  hideControlsTimer = setTimeout(() => {
    if (document.fullscreenElement && !video.paused) {
      controls.style.opacity = '0';
      controls.style.transform = 'translateY(8px)';
      controls.style.pointerEvents = 'none'; // 隐藏时禁用点击
    }
  }, 3000);
}

// 显示控制条
function showControls() {
  clearHideTimer();
  controls.style.opacity = '1';
  controls.style.transform = 'translateY(0)';
  controls.style.pointerEvents = 'all';
}

// 监听全屏变化
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    // 全屏时：3秒后自动隐藏
    startHideTimer();
  } else {
    // 非全屏时：恢复CSS默认行为
    clearHideTimer();
    controls.style.opacity = '';
    controls.style.transform = '';
    controls.style.pointerEvents = '';
  }
});

// 在全屏模式下，监听光标移动
if (document.fullscreenEnabled) {
  document.addEventListener('mousemove', (e) => {
    if (document.fullscreenElement) {
      // 光标在视频区域内
      if (videoWrapper.contains(e.target)) {
        showControls();
        startHideTimer();
      }
    }
  });
}

// 所有交互操作后重置计时器
[playPauseBtn, volumeBtn, volumeSlider, fullscreenBtn].forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      if (document.fullscreenElement) {
        showControls();
        startHideTimer();
      }
    });
  }
});

