// 上传区域交互
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const filePreview = document.getElementById('filePreview');
const previewVideo = document.getElementById('previewVideo');
const fileName = document.getElementById('fileName');
const removeFileBtn = document.getElementById('removeFileBtn');
const uploadForm = document.getElementById('uploadForm');
const uploadProgress = document.getElementById('uploadProgress');
const progressBar = document.getElementById('progressBar');
const cancelBtn = document.getElementById('cancelBtn');
const videoTitleInput = document.getElementById('videoTitle');
const videoCategorySelect = document.getElementById('videoCategory');

// 打开文件选择
browseBtn.addEventListener('click', () => {
  fileInput.click();
});

// 点击上传区域打开文件选择
uploadArea.addEventListener('click', (e) => {
  if (e.target !== browseBtn) {
    fileInput.click();
  }
});

// 处理文件选择
fileInput.addEventListener('change', handleFileSelect);

// 拖放功能
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy'; // 明确拖放效果
  uploadArea.style.borderColor = '#e85d75';
  uploadArea.style.background = 'rgba(255, 253, 254, 0.8)';
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.style.borderColor = '#ffccd5';
  uploadArea.style.background = 'rgba(255, 253, 254, 0.5)';
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = '#ffccd5';
  uploadArea.style.background = 'rgba(255, 253, 254, 0.5)';

  if (e.dataTransfer.files.length) {
    fileInput.files = e.dataTransfer.files;
    handleFileSelect(e);
  }
});

// 处理文件选择
function handleFileSelect(e) {
  // 验证必要元素是否存在
  if (!videoTitleInput || !previewVideo || !fileName || !filePreview) {
    console.error('缺少必要的DOM元素');
    return;
  }

  const file = e.target.files ? e.target.files[0] : (e.dataTransfer?.files[0] || null);
  if (!file) return;

  // 验证文件类型（MIME类型+扩展名双重验证）
  const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.flv', '.wmv'];
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  if (!file.type.startsWith('video/') && !videoExtensions.includes(fileExtension)) {
    alert('请上传视频文件（支持mp4、mov、avi、mkv、flv、wmv格式）！');
    return;
  }

  // 验证文件大小 (2GB)
  if (file.size > 2 * 1024 * 1024 * 1024) {
    alert('视频文件不能超过2GB！');
    return;
  }

  // 显示预览
  const videoURL = URL.createObjectURL(file);
  previewVideo.src = videoURL;
  fileName.textContent = file.name;
  filePreview.classList.add('show');

  // 自动填充标题（可选）
  if (!videoTitleInput.value) {
    const title = file.name.replace(/\.[^/.]+$/, "");
    videoTitleInput.value = title;
  }
}

// 移除文件
removeFileBtn.addEventListener('click', () => {
  if (previewVideo.src) {
    URL.revokeObjectURL(previewVideo.src); // 释放内存
  }
  fileInput.value = '';
  previewVideo.src = '';
  filePreview.classList.remove('show');
  uploadProgress.classList.remove('show');
  progressBar.style.width = '0%';
});

// 取消按钮
cancelBtn.addEventListener('click', () => {
  if (uploadProgress.classList.contains('show')) {
    // 如果正在上传，先清除上传进度定时器
    if (window.uploadInterval) {
      clearInterval(window.uploadInterval);
      window.uploadInterval = null;
    }
  }

  if (confirm('确定要取消上传吗？已填写的内容将会丢失。')) {
    window.location.href = 'index.html';
  }
});

// 表单提交
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // 检查必要元素是否存在
  if (!videoTitleInput || !videoCategorySelect) {
    alert('页面元素不完整，无法提交');
    return;
  }

  // 检查是否选择了文件
  if (!fileInput.files.length) {
    alert('请先选择要上传的视频文件');
    return;
  }

  // 检查标题是否填写
  if (!videoTitleInput.value.trim()) {
    alert('请输入视频标题');
    videoTitleInput.focus();
    return;
  }

  // 检查分类是否选择
  if (!videoCategorySelect.value) {
    alert('请选择视频分类');
    videoCategorySelect.focus();
    return;
  }

  // 模拟上传进度
  uploadProgress.classList.add('show');
  let progress = 0;
  // 使用全局变量存储定时器，方便取消
  window.uploadInterval = setInterval(() => {
    // 确保进度只增不减，每次增长1-5%
    progress += Math.random() * 4 + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(window.uploadInterval);
      window.uploadInterval = null;
      // 上传完成后跳转
      setTimeout(() => {
        alert('视频上传成功！');
        window.location.href = 'index.html';
      }, 500);
    }
    progressBar.style.width = `${progress}%`;
  }, 500);
});

// 搜索功能
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const keyword = searchInput.value.trim();
      if (keyword) {
        // 实际项目中这里会发起搜索请求
        alert(`正在搜索视频：${keyword}`);
      } else {
        alert('请输入搜索内容哦~');
      }
    }
  });
}

// 刷新功能
const refreshBtn = document.getElementById('refresh-btn');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    window.location.reload();
  });
}

// 用户菜单和登录弹窗
const userLink = document.querySelector('.user-link');
const authModal = document.getElementById('authModal');
const modalClose = document.getElementById('modalClose');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

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

if (authModal) {
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.classList.remove('show');
    }
  });
}

if (authTabs && authForms.length) {
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      authForms.forEach(f => f.style.display = 'none');
      tab.classList.add('active');
      const targetForm = document.querySelector(`.${tab.dataset.tab}-form`);
      if (targetForm) {
        targetForm.style.display = 'block';
      }
    });
  });
}