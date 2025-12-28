window.addEventListener('load', function () {
  // 点击空白处关闭下拉菜单
  document.addEventListener('click', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
  });

  // 登录注册弹窗切换功能
  document.addEventListener('DOMContentLoaded', function() {
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

});
