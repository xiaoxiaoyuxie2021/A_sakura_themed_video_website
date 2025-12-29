// ===== 设置页面核心逻辑（类名修正版）=====

// 渲染分类菜单（如果存在）
if (typeof renderCategories === 'function') {
  renderCategories();
}

// ===== 初始化设置项可见性 =====
function initSettingsVisibility() {
  // 检查 isLoggedIn 函数是否存在
  if (typeof isLoggedIn !== 'function') {
    console.warn('isLoggedIn 函数未定义');
    return;
  }

  const loggedIn = isLoggedIn();
  const controlledTabs = ['account', 'privacy', 'security'];
  
  controlledTabs.forEach(tabName => {
    // 控制侧边栏菜单项
    const sidebarItem = document.querySelector(`.sidebar-item[data-tab="${tabName}"]`);
    // 控制主内容卡片
    const contentCard = document.getElementById(`${tabName}-tab`);
    
    if (sidebarItem) {
      sidebarItem.style.display = loggedIn ? '' : 'none';
    }
    if (contentCard) {
      contentCard.style.display = loggedIn ? '' : 'none';
    }
  });
}

// ===== 激活第一个可见的设置项 =====
function activateFirstVisibleTab() {
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const contentCards = document.querySelectorAll('.content-card');
  
  // 移除所有激活状态
  sidebarItems.forEach(i => i.classList.remove('active'));
  contentCards.forEach(c => c.classList.remove('active'));
  
  // 找到第一个可见的侧边栏项
  const firstVisibleItem = Array.from(sidebarItems).find(
    item => item.style.display !== 'none' && getComputedStyle(item).display !== 'none'
  );
  
  if (firstVisibleItem) {
    // 激活第一个可见的侧边栏项
    firstVisibleItem.classList.add('active');
    
    // 找到对应的内容卡片并激活
    const targetTab = firstVisibleItem.dataset.tab;
    const targetCard = document.getElementById(`${targetTab}-tab`);
    if (targetCard) {
      targetCard.classList.add('active');
    }
  }
}

// ===== 设置页导航切换（修正类名）=====
document.addEventListener('DOMContentLoaded', () => {
  // 先初始化可见性（在渲染之前执行）
  initSettingsVisibility();
  
  // ✅ 修正：使用新的类名 .sidebar-item
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  // ✅ 修正：使用新的类名 .content-card
  const contentCards = document.querySelectorAll('.content-card');

  // 防御检查
  if (sidebarItems.length === 0 || contentCards.length === 0) {
    console.warn('导航或卡片元素未找到');
    return;
  }

  // 激活第一个可见的设置项（而不是固定的第一个）
  activateFirstVisibleTab();

  // 点击切换
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      contentCards.forEach(c => c.classList.remove('active'));

      item.classList.add('active');
      const targetTab = item.dataset.tab;
      // ✅ 修正：使用新的ID格式
      const targetCard = document.getElementById(`${targetTab}-tab`);
      if (targetCard) {
        targetCard.classList.add('active');
      }
    });
  });

  // hover 效果
  sidebarItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (!item.classList.contains('active')) {
        item.style.background = 'rgba(255, 255, 255, 0.9)';
      }
    });
    item.addEventListener('mouseleave', () => {
      if (!item.classList.contains('active')) {
        item.style.background = '';
      }
    });
  });

  console.log('设置导航初始化完成');
});

// ===== 搜索功能 =====
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const keyword = e.target.value.trim();
      if (keyword) {
        window.location.href = `search.html?query=${encodeURIComponent(keyword)}`;
      }
    }
  });
}

// ===== 刷新按钮 =====
const refreshBtn = document.getElementById('refresh-btn');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    window.location.reload();
  });
}

// ===== 保存/取消按钮 =====
document.querySelectorAll('.save-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const originalText = btn.textContent;
    btn.textContent = '保存成功！';
    btn.style.background = 'linear-gradient(135deg, #d4edda, #28a745)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  });
});

document.querySelectorAll('.cancel-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('已取消更改');
  });
});

// ===== 头像上传（完整逻辑）=====
document.querySelectorAll('.upload-avatar-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.textContent;

    if (text.includes('更换头像')) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';

      input.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
          alert('请选择图片文件！');
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert('图片大小不能超过 5MB！');
          return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
          const previewImg = document.querySelector('.avatar-preview img');
          if (previewImg) previewImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });

      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);

    } else if (text.includes('拍摄照片')) {
      // 完整的拍照逻辑（保留原始版本）
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.style.cssText = 'width: 100%; border-radius: 8px; background: #000;';

        const modal = document.createElement('div');
        modal.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 1001; max-width: 400px; width: 90%;`;

        const captureBtn = document.createElement('button');
        captureBtn.innerHTML = '<i class="fas fa-camera"></i> 拍照';
        captureBtn.className = 'save-btn';
        captureBtn.style.marginRight = '10px';

        const cancelBtn = document.createElement('button');
        cancelBtn.innerHTML = '<i class="fas fa-times"></i> 取消';
        cancelBtn.className = 'cancel-btn';

        modal.innerHTML = '<h3 style="margin-top:0; margin-bottom:10px;">拍照</h3>';
        modal.appendChild(video);
        modal.appendChild(document.createElement('br'));
        modal.appendChild(captureBtn);
        modal.appendChild(cancelBtn);

        const overlay = document.createElement('div');
        overlay.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; backdrop-filter: blur(5px);`;

        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        captureBtn.onclick = function () {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0);
          canvas.toBlob(function (blob) {
            const url = URL.createObjectURL(blob);
            const previewImg = document.querySelector('.avatar-preview img');
            if (previewImg) previewImg.src = url;
            stream.getTracks().forEach(track => track.stop());
            document.body.removeChild(overlay);
            document.body.removeChild(modal);
          }, 'image/jpeg', 0.9);
        };

        const cleanup = function () {
          stream.getTracks().forEach(track => track.stop());
          document.body.removeChild(overlay);
          document.body.removeChild(modal);
        };

        cancelBtn.onclick = cleanup;
        overlay.onclick = cleanup;

      } catch (error) {
        let errorMsg = '无法访问摄像头';
        if (error.name === 'NotAllowedError') errorMsg = '请允许访问摄像头以拍摄照片';
        if (error.name === 'NotFoundError') errorMsg = '未找到可用的摄像头设备';
        if (error.name === 'NotSupportedError') errorMsg = '当前环境不支持摄像头功能';
        alert(errorMsg);
      }
    }
  });
});

// ===== 注销账号 =====
const dangerBtn = document.querySelector('.danger-btn');
if (dangerBtn) {
  dangerBtn.addEventListener('click', () => {
    if (confirm('确定要注销账号吗？此操作不可撤销，所有数据将被永久删除。')) {
      alert('账号注销流程已启动，请查收验证邮件完成后续操作');
    }
  });
}

// ===== 用户菜单和登录弹窗 =====
const userLink = document.querySelector('.user-link');
const authModal = document.getElementById('authModal');
if (userLink && authModal) {
  userLink.addEventListener('click', (e) => {
    e.stopPropagation();
    authModal.classList.add('show');
  });

  const modalClose = document.getElementById('modalClose');
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      authModal.classList.remove('show');
    });
  }
}

// ===== 浏览信息功能（完全保留原始逻辑）=====
// 确保函数在调用前已定义
function initBrowserInfo() {
  const browserTab = document.getElementById('browser-tab');
  if (!browserTab) return;

  // 填充信息
  const browserNameEl = document.getElementById('browserName');
  const browserVersionEl = document.getElementById('browserVersion');
  const platformEl = document.getElementById('platform');
  const screenResolutionEl = document.getElementById('screenResolution');
  const ipAddressEl = document.getElementById('ipAddress');
  const networkStatusEl = document.getElementById('networkStatus');

  if (browserNameEl) browserNameEl.textContent = getBrowserName();
  if (browserVersionEl) browserVersionEl.textContent = navigator.userAgent.split('/').pop().split(' ')[0];
  if (screenResolutionEl) screenResolutionEl.textContent = `${screen.width} × ${screen.height}`;

  // 异步获取操作系统（保留原始逻辑）
  if (platformEl) {
    getOSName().then(osName => {
      platformEl.textContent = osName;
    }).catch(() => {
      platformEl.textContent = navigator.platform;
    });
  }

  // 获取IP地址（保留原始的多API轮询逻辑）
  if (ipAddressEl) {
    (async function fetchIPAddress() {
      const apis = [
        'https://api.ipify.org?format=json',
        'https://api64.ipify.org?format=json',
        'https://ip.seeip.org/jsonip'
      ];

      for (const api of apis) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000);
          const response = await fetch(api, { signal: controller.signal });
          clearTimeout(timeoutId);
          if (response.ok) {
            const data = await response.json();
            ipAddressEl.textContent = data.ip;
            return;
          }
        } catch (error) {
          continue;
        }
      }
      ipAddressEl.textContent = '网络受限';
    })();
  }

  // 网络状态（保留原始逻辑）
  if (networkStatusEl) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const speed = Math.round(connection.downlink * 10) / 10;
      const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      let networkType = connection.effectiveType;
      if (!isMobile && networkType === '4g') networkType = 'WiFi';
      networkStatusEl.textContent = `${networkType} (${speed} Mbps)`;
    } else {
      networkStatusEl.textContent = '未知';
    }
  }
}

// 在 DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', initBrowserInfo);

// ===== 辅助函数（完全保留原始版本）=====

function getBrowserName() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('MiuiBrowser') > -1) return '小米浏览器';
  if (userAgent.indexOf('HuaweiBrowser') > -1 || userAgent.indexOf('HUAWEI/') > -1) return '华为浏览器';
  if (userAgent.indexOf('SamsungBrowser') > -1) return '三星浏览器';
  if (userAgent.indexOf('OppoBrowser') > -1) return 'OPPO浏览器';
  if (userAgent.indexOf('vivoBrowser') > -1 || userAgent.indexOf('VivoBrowser') > -1) return 'vivo浏览器';
  if (userAgent.indexOf('OnePlus') > -1) return '一加浏览器';
  if (userAgent.indexOf('QQBrowser') > -1) return 'QQ浏览器';
  if (userAgent.indexOf('UCBrowser') > -1) return 'UC浏览器';
  if (userAgent.indexOf('Baidu') > -1 || userAgent.indexOf('baidu') > -1) return '百度浏览器';
  if (userAgent.indexOf('360SE') > -1 || userAgent.indexOf('QihooBrowser') > -1) return '360安全浏览器';
  if (userAgent.indexOf('360EE') > -1) return '360极速浏览器';
  if (userAgent.indexOf('Edg/') > -1) return 'Microsoft Edge';
  if (userAgent.indexOf('Edge/') > -1) return 'Microsoft Edge (旧版)';
  if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg/') === -1 && userAgent.indexOf('SamsungBrowser') === -1) {
    return userAgent.indexOf('Mobile') > -1 ? 'Chrome Mobile' : 'Chrome';
  }
  if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
  if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
    return userAgent.indexOf('Mobile') > -1 ? 'Safari (iOS)' : 'Safari';
  }
  if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) return 'Internet Explorer';
  return '未知浏览器';
}

function getBrowserEngine() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('WebKit') > -1) return 'WebKit';
  if (userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('WebKit') === -1) return 'Gecko';
  if (userAgent.indexOf('Trident') > -1) return 'Trident';
  if (userAgent.indexOf('Presto') > -1) return 'Presto';
  return '未知引擎';
}

async function getOSName() {
  if (navigator.userAgentData) {
    try {
      const highEntropyValues = await navigator.userAgentData.getHighEntropyValues(["platformVersion"]);
      const platformVersion = highEntropyValues.platformVersion;
      if (navigator.userAgentData.platform === "Windows") {
        if (platformVersion && parseFloat(platformVersion) >= 13.0) return "Windows 11";
        return "Windows 10";
      }
      return navigator.userAgentData.platform || '未知系统';
    } catch (e) {
      console.log("无法获取高熵值数据:", e);
    }
  }

  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  if (platform.indexOf('Win') > -1) {
    if (userAgent.indexOf('Windows NT 10.0') > -1) return 'Windows 10/11';
    if (userAgent.indexOf('Windows NT 6.3') > -1) return 'Windows 8.1';
    if (userAgent.indexOf('Windows NT 6.2') > -1) return 'Windows 8';
    if (userAgent.indexOf('Windows NT 6.1') > -1) return 'Windows 7';
    if (userAgent.indexOf('WOW64') > -1 || userAgent.indexOf('Win64') > -1) return 'Windows (64-bit)';
    return 'Windows (32-bit)';
  }

  if (platform.indexOf('Mac') > -1) return 'macOS';
  if (platform.indexOf('Linux') > -1) return 'Linux';
  if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';

  if (userAgent.indexOf('Android') > -1) {
    const versionMatch = userAgent.match(/Android\s+(\d+)(?:\.(\d+))?/);
    if (versionMatch) {
      const major = versionMatch[1];
      const minor = versionMatch[2];
      return minor ? `Android ${major}.${minor}` : `Android ${major}`;
    }
    return 'Android';
  }

  return platform || '未知系统';
}
