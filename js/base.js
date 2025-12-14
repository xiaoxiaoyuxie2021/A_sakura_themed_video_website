window.addEventListener('load', function () {
  // 用户菜单交互
  const userLink = document.querySelector('.user-link');
  const userDropdown = document.querySelector('.user-dropdown');
  
  if (userLink && userDropdown) {
    userLink.addEventListener('click', function(e) {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
    });
  }

  // 点击空白处关闭下拉菜单
  document.addEventListener('click', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
  });

  // 登录/注册弹窗控制
  const loginBtn = document.querySelector('.login-btn');
  const registerBtn = document.querySelector('.register-btn');
  const authModal = document.getElementById('authModal');
  const modalClose = document.getElementById('modalClose');
  const authTabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.querySelector('.login-form');
  const registerForm = document.querySelector('.register-form');

  // 打开登录弹窗
  if (loginBtn && authModal) {
    loginBtn.addEventListener('click', function() {
      authModal.classList.add('show');
      if (loginForm) loginForm.style.display = 'block';
      if (registerForm) registerForm.style.display = 'none';
      if (authTabs[0]) authTabs[0].classList.add('active');
      if (authTabs[1]) authTabs[1].classList.remove('active');
    });
  }

  // 打开注册弹窗
  if (registerBtn && authModal) {
    registerBtn.addEventListener('click', function() {
      authModal.classList.add('show');
      if (loginForm) loginForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'block';
      if (authTabs[1]) authTabs[1].classList.add('active');
      if (authTabs[0]) authTabs[0].classList.remove('active');
    });
  }

  // 关闭弹窗
  if (modalClose && authModal) {
    modalClose.addEventListener('click', function() {
      authModal.classList.remove('show');
    });
  }

  // 点击遮罩层关闭弹窗
  if (authModal) {
    authModal.addEventListener('click', function(e) {
      if (e.target === authModal) {
        authModal.classList.remove('show');
      }
    });
  }

  // 切换登录/注册标签
  authTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      authTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      if (this.dataset.tab === 'login') {
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
      } else {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
      }
    });
  });
});
