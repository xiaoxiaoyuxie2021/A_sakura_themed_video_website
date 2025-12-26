// 渲染分类菜单
renderCategories();

// 设置页导航切换
document.querySelectorAll('.settings-nav-item').forEach(item => {
  item.addEventListener('click', () => {
    // 移除所有激活状态
    document.querySelectorAll('.settings-nav-item').forEach(nav => {
      nav.classList.remove('active');
    });
    
    // 隐藏所有内容
    document.querySelectorAll('.settings-card').forEach(card => {
      card.style.display = 'none';
    });
    
    // 激活当前项
    item.classList.add('active');
    
    // 显示对应内容
    const tabId = item.getAttribute('data-tab');
    document.getElementById(`${tabId}-tab`).style.display = 'block';
  });
});

// 搜索功能
document.getElementById('search-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const keyword = e.target.value.trim();
    if (keyword) {
      window.location.href = `search.html?query=${encodeURIComponent(keyword)}`;
    }
  }
});

// 刷新按钮
document.getElementById('refresh-btn').addEventListener('click', () => {
  window.location.reload();
});

// 保存按钮点击事件
document.querySelectorAll('.save-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // 显示保存成功提示
    const originalText = btn.textContent;
    btn.textContent = '保存成功！';
    btn.style.background = 'linear-gradient(135deg, #d4edda, #28a745)';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  });
});

// 取消按钮点击事件
document.querySelectorAll('.cancel-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // 实际应用中这里应该重置表单
    alert('已取消更改');
  });
});

// 头像上传按钮
document.querySelectorAll('.upload-avatar-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    if (btn.textContent.includes('更换头像')) {
      // 创建文件选择器
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      
      input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
          alert('请选择图片文件！');
          return;
        }
        
        // 验证文件大小 (最大5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          alert('图片大小不能超过 5MB！');
          return;
        }
        
        // 预览图片
        const reader = new FileReader();
        reader.onload = function(e) {
          const previewImg = document.querySelector('.avatar-preview img');
          if (previewImg) {
            previewImg.src = e.target.result;
          }
          // 这里可以调用上传API
          console.log('头像已选择，准备上传...');
        };
        reader.readAsDataURL(file);
      });
      
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
      
    } else if (btn.textContent.includes('拍摄照片')) {
      // 调用摄像头拍照
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        });
        
        // 创建拍照界面
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.style.cssText = 'width: 100%; border-radius: 8px; background: #000;';
        
        const modal = document.createElement('div');
        modal.style.cssText = `
          position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
          background: white; padding: 20px; border-radius: 12px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 1001; 
          max-width: 400px; width: 90%; max-height: 80vh; overflow: auto;
        `;
        
        const captureBtn = document.createElement('button');
        captureBtn.innerHTML = '<i class="fas fa-camera"></i> 拍照';
        captureBtn.className = 'save-btn';
        captureBtn.style.marginRight = '10px';
        captureBtn.style.marginTop = '15px';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.innerHTML = '<i class="fas fa-times"></i> 取消';
        cancelBtn.className = 'cancel-btn';
        cancelBtn.style.marginTop = '15px';
        
        modal.innerHTML = '<h3 style="margin-top:0; margin-bottom:10px;">拍照</h3>';
        modal.appendChild(video);
        modal.appendChild(document.createElement('br'));
        modal.appendChild(captureBtn);
        modal.appendChild(cancelBtn);
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5); z-index: 1000; backdrop-filter: blur(5px);
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        // 拍照功能
        captureBtn.onclick = function() {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0);
          
          canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const previewImg = document.querySelector('.avatar-preview img');
            if (previewImg) {
              previewImg.src = url;
            }
            
            // 清理资源
            stream.getTracks().forEach(track => track.stop());
            document.body.removeChild(overlay);
            document.body.removeChild(modal);
            
            // 这里可以调用上传API
            console.log('头像已拍摄，准备上传...');
          }, 'image/jpeg', 0.9);
        };
        
        // 取消功能
        const cleanup = function() {
          stream.getTracks().forEach(track => track.stop());
          document.body.removeChild(overlay);
          document.body.removeChild(modal);
        };
        
        cancelBtn.onclick = cleanup;
        overlay.onclick = cleanup;
        
      } catch (error) {
        console.error('摄像头访问失败:', error);
        let errorMsg = '无法访问摄像头';
        if (error.name === 'NotAllowedError') {
          errorMsg = '请允许访问摄像头以拍摄照片';
        } else if (error.name === 'NotFoundError') {
          errorMsg = '未找到可用的摄像头设备';
        } else if (error.name === 'NotSupportedError') {
          errorMsg = '当前环境不支持摄像头功能';
        }
        alert(errorMsg);
      }
      
    } else if (btn.textContent.includes('更改密码')) {
      alert('将跳转到密码修改页面');
    } else if (btn.textContent.includes('查看最近登录记录')) {
      alert('最近登录：今天 09:45 来自Chrome浏览器');
    }
  });
});


// 注销账号按钮
document.querySelector('.danger-btn').addEventListener('click', () => {
  if (confirm('确定要注销账号吗？此操作不可撤销，所有数据将被永久删除。')) {
    alert('账号注销流程已启动，请查收验证邮件完成后续操作');
  }
});

// 用户菜单和登录弹窗
const userLink = document.querySelector('.user-link');
const authModal = document.getElementById('authModal');
const modalClose = document.getElementById('modalClose');

if (userLink && authModal) {
  userLink.addEventListener('click', (e) => {
    e.stopPropagation();
    authModal.classList.add('show');
  });
}

if (modalClose && authModal) {
  modalClose.addEventListener('click', () => {
    authModal.classList.remove('show');
  });
}

// 获取并显示浏览信息
document.addEventListener('DOMContentLoaded', function() {
  // 浏览器信息
  const browserInfo = {
    '浏览器名称': getBrowserName(),
    '浏览器版本': navigator.appVersion,
    '用户代理': navigator.userAgent.substring(0, 30) + '...',
    '平台': navigator.platform,
    '语言': navigator.language,
    'Cookie 启用': navigator.cookieEnabled ? '是' : '否'
  };
  // 浏览信息标签页
const browserTab = document.getElementById('browser-tab');
if (browserTab) {
  // 填充浏览器信息
  document.getElementById('browserName').textContent = getBrowserName();
  document.getElementById('browserVersion').textContent = navigator.userAgent.split('/').pop().split(' ')[0];
  // 异步获取操作系统名称
getOSName().then(osName => {
  document.getElementById('platform').textContent = osName;
}).catch(() => {
  // 回退方案：使用已弃用的 API（为兼容性保留）
  document.getElementById('platform').textContent = navigator.platform;
});
  document.getElementById('screenResolution').textContent = `${screen.width} × ${screen.height}`;
  
  // 获取IP地址（带备用方案）
(async function fetchIPAddress() {
  const apis = [
    'https://api.ipify.org?format=json',      // 主API
    'https://api64.ipify.org?format=json',    // 备用API（支持IPv6）
    'https://ip.seeip.org/jsonip'             // 备用API2
  ];
  
  for (const api of apis) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3秒超时
      
      const response = await fetch(api, { 
        signal: controller.signal,
        method: 'GET'
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        document.getElementById('ipAddress').textContent = data.ip;
        return; // 成功则退出
      }
    } catch (error) {
      console.warn(`API ${api} 失败:`, error.message);
      continue; // 失败则尝试下一个
    }
  }
  
  // 全部失败
  document.getElementById('ipAddress').textContent = '网络受限';
})();

  
  // 网络状态检测（增强版）
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if (connection) {
  const speed = Math.round(connection.downlink * 10) / 10;
  let networkType = connection.effectiveType;
  
  // 判断是否为移动设备
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  
  // 如果不是移动设备且显示4g，很可能是WiFi
  if (!isMobile && networkType === '4g') {
    networkType = 'WiFi';
  }
  
  // 如果浏览器明确返回wifi类型
  if (connection.type === 'wifi' || connection.type === 'ethernet') {
    networkType = 'WiFi';
  }
  
  document.getElementById('networkStatus').textContent = `${networkType} (${speed} Mbps)`;
} else {
  document.getElementById('networkStatus').textContent = '不支持检测';
}

}

  // 填充浏览器信息网格
  const browserInfoGrid = document.getElementById('browserInfo');
  for (const [key, value] of Object.entries(browserInfo)) {
    const infoItem = document.createElement('div');
    infoItem.className = 'browser-info-item';
    infoItem.innerHTML = `
      <div class="browser-info-label">${key}</div>
      <div class="browser-info-value">${value}</div>
    `;
    browserInfoGrid.appendChild(infoItem);
  }
  
  // 屏幕分辨率
  document.getElementById('screenResolution').textContent = 
    `${screen.width} × ${screen.height}`;
  
  // 浏览器引擎
  document.getElementById('browserEngine').textContent = getBrowserEngine();
  
  // 网络状态
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) {
    document.getElementById('networkStatus').textContent = 
      `${connection.effectiveType} (${Math.round(connection.downlink * 10) / 10} Mbps)`;
  } else {
    document.getElementById('networkStatus').textContent = '未知';
  }
  
});

// 辅助函数：获取浏览器名称
function getBrowserName() {
  const userAgent = navigator.userAgent;
  
  // 手机自带浏览器（优先级最高）
  if (userAgent.indexOf('MiuiBrowser') > -1) return '小米浏览器';
  if (userAgent.indexOf('HuaweiBrowser') > -1 || userAgent.indexOf('HUAWEI/') > -1) return '华为浏览器';
  if (userAgent.indexOf('SamsungBrowser') > -1) return '三星浏览器';
  if (userAgent.indexOf('OppoBrowser') > -1) return 'OPPO浏览器';
  if (userAgent.indexOf('vivoBrowser') > -1 || userAgent.indexOf('VivoBrowser') > -1) return 'vivo浏览器';
  if (userAgent.indexOf('OnePlus') > -1) return '一加浏览器';
  if (userAgent.indexOf('QQBrowser') > -1) return 'QQ浏览器';
  if (userAgent.indexOf('UCBrowser') > -1) return 'UC浏览器';
  if (userAgent.indexOf('Baidu') > -1 || userAgent.indexOf('baidu') > -1) return '百度浏览器';
  
  // 360浏览器
  if (userAgent.indexOf('360SE') > -1 || userAgent.indexOf('QihooBrowser') > -1) {
    return '360安全浏览器';
  }
  if (userAgent.indexOf('360EE') > -1) {
    return '360极速浏览器';
  }
  
  // Edge（新旧内核）
  if (userAgent.indexOf('Edg/') > -1) {
    return 'Microsoft Edge';
  }
  if (userAgent.indexOf('Edge/') > -1) {
    return 'Microsoft Edge (旧版)';
  }
  
  // Chrome（需排除其他基于Chromium的浏览器）
  if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg/') === -1 && 
      userAgent.indexOf('SamsungBrowser') === -1 &&
      userAgent.indexOf('MiuiBrowser') === -1 &&
      userAgent.indexOf('HuaweiBrowser') === -1) {
    // 判断是否为手机版Chrome
    if (userAgent.indexOf('Mobile') > -1) {
      return 'Chrome Mobile';
    }
    return 'Chrome';
  }
  
  // Firefox
  if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox';
  }
  
  // Safari（需排除Chrome）
  if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
    // 判断是否为手机版Safari
    if (userAgent.indexOf('Mobile') > -1) {
      return 'Safari (iOS)';
    }
    return 'Safari';
  }
  
  // IE
  if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
    return 'Internet Explorer';
  }
  
  return '未知浏览器';
}


// 辅助函数：获取浏览器引擎
function getBrowserEngine() {
  const userAgent = navigator.userAgent;
  
  if (userAgent.indexOf('WebKit') > -1) return 'WebKit';
  if (userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('WebKit') === -1) return 'Gecko';
  if (userAgent.indexOf('Trident') > -1) return 'Trident';
  if (userAgent.indexOf('Presto') > -1) return 'Presto';
  
  return '未知引擎';
}

// 辅助函数：获取操作系统名称（支持 Windows 10/11 精确识别）
async function getOSName() {
  // 尝试使用现代的 userAgentData API（Chrome/Edge 93+ 支持）
  if (navigator.userAgentData) {
    try {
      const highEntropyValues = await navigator.userAgentData.getHighEntropyValues(["platformVersion"]);
      const platformVersion = highEntropyValues.platformVersion;
      
      // Windows 11 的平台版本号 >= 13.0.0
      if (navigator.userAgentData.platform === "Windows") {
        if (platformVersion && parseFloat(platformVersion) >= 13.0) {
          return "Windows 11";
        } else {
          return "Windows 10";
        }
      }
      
      // 其他系统
      return navigator.userAgentData.platform || '未知系统';
    } catch (e) {
      console.log("无法获取高熵值数据:", e);
    }
  }
  
  // 降级方案：传统 User-Agent 检测
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  
  // Windows 系统
  if (platform.indexOf('Win') > -1) {
    if (userAgent.indexOf('Windows NT 10.0') > -1) return 'Windows 10/11';
    if (userAgent.indexOf('Windows NT 6.3') > -1) return 'Windows 8.1';
    if (userAgent.indexOf('Windows NT 6.2') > -1) return 'Windows 8';
    if (userAgent.indexOf('Windows NT 6.1') > -1) return 'Windows 7';
    
    // 检测是否为64位
    if (userAgent.indexOf('WOW64') > -1 || userAgent.indexOf('Win64') > -1) {
      return 'Windows (64-bit)';
    }
    
    return 'Windows (32-bit)';
  }
  
  // macOS
  if (platform.indexOf('Mac') > -1) return 'macOS';
  
  // Linux
  if (platform.indexOf('Linux') > -1) return 'Linux';
  
  // iOS
  if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';
  
  // Android
  if (userAgent.indexOf('Android') > -1) return 'Android';
  
  // 其他情况返回原始 platform
  return platform || '未知系统';
}
