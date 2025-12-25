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
  btn.addEventListener('click', () => {
    if (btn.textContent.includes('更换头像') || btn.textContent.includes('拍摄照片')) {
      // 模拟头像上传
      alert('请选择图片文件');
    } else if (btn.textContent.includes('更改密码')) {
      // 模拟修改密码
      alert('将跳转到密码修改页面');
    } else if (btn.textContent.includes('查看最近登录记录')) {
      // 模拟登录历史
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
