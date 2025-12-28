window.addEventListener('load', function () {
  // 点击空白处关闭下拉菜单
  document.addEventListener('click', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
  });

  // 获取真实统计数据
  function updateStats() {
    // 模拟获取真实统计数据的函数
    // 在实际应用中，这里应该是真实的API调用
    
    // 模拟总访问人次数据
    fetchTotalVisits().then(count => {
      document.getElementById('totalVisits').textContent = formatNumber(count);
    }).catch(() => {
      // 如果API调用失败，使用随机数模拟数据
      const randomCount = Math.floor(Math.random() * 100000) + 50000;
      document.getElementById('totalVisits').textContent = formatNumber(randomCount);
    });
    
    // 模拟当前在线人数数据
    fetchOnlineUsers().then(count => {
      document.getElementById('onlineUsers').textContent = formatNumber(count);
    }).catch(() => {
      // 如果API调用失败，使用随机数模拟数据
      const randomCount = Math.floor(Math.random() * 100) + 20;
      document.getElementById('onlineUsers').textContent = formatNumber(randomCount);
    });
  }

  // 格式化数字显示（如：123456 -> 123,456）
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 模拟API调用函数 - 在实际应用中替换为真实的API调用
  function fetchTotalVisits() {
    return new Promise((resolve) => {
      // 模拟网络延迟
      setTimeout(() => {
        // 这里应该替换为真实的API调用
        // 例如: fetch('/api/stats/totalVisits').then(res => res.json()).then(data => data.count)
        resolve(Math.floor(Math.random() * 50000) + 100000); // 模拟真实数据
      }, 500);
    });
  }

  function fetchOnlineUsers() {
    return new Promise((resolve) => {
      // 模拟网络延迟
      setTimeout(() => {
        // 这里应该替换为真实的API调用
        // 例如: fetch('/api/stats/onlineUsers').then(res => res.json()).then(data => data.count)
        resolve(Math.floor(Math.random() * 50) + 30); // 模拟真实数据
      }, 500);
    });
  }

  // 页面加载完成后更新统计数据
  document.addEventListener('DOMContentLoaded', function() {
    // 初始化统计数据
    updateStats();
    
    // 每隔一段时间更新统计数据（例如每分钟更新一次）
    setInterval(updateStats, 60000);
    
    // 获取登录注册相关元素
    const authModal = document.getElementById('authModal');
    const modalClose = document.getElementById('modalClose');
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    // 检查元素是否存在，避免报错
    if (authModal && modalClose && authTabs.length > 0) {
      // 关闭弹窗
      modalClose.addEventListener('click', function() {
        authModal.classList.remove('show');
        authModal.style.display = 'none';
      });

      // 点击遮罩层关闭弹窗
      authModal.addEventListener('click', function(e) {
        if (e.target === authModal) {
          authModal.classList.remove('show');
          authModal.style.display = 'none';
        }
      });

      // 登录注册切换
      authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // 移除所有激活状态
          authTabs.forEach(t => t.classList.remove('active'));
          loginForm.classList.remove('active');
          registerForm.classList.remove('active');
          
          // 添加当前激活状态
          this.classList.add('active');
          
          // 显示对应表单
          if (this.dataset.tab === 'login') {
            loginForm.classList.add('active');
          } else {
            registerForm.classList.add('active');
          }
        });
      });
    }
  });

  // 显示登录弹窗的函数，可被其他页面调用
  function showLoginModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
      authModal.classList.add('show');
      authModal.style.display = 'flex';
    }
  }

  // 隐藏登录弹窗的函数，可被其他页面调用
  function hideLoginModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
      authModal.classList.remove('show');
      authModal.style.display = 'none';
    }
  }

});
