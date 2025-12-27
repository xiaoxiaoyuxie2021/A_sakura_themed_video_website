  // 切换内容标签
  const contentTabs = document.querySelectorAll('.content-tab');
  const historySection = document.getElementById('history-section');
  const favoritesSection = document.getElementById('favorites-section');
  
  contentTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      contentTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      if (tab.dataset.tab === 'history') {
        historySection.style.display = 'block';
        favoritesSection.style.display = 'none';
      } else {
        historySection.style.display = 'none';
        favoritesSection.style.display = 'block';
      }
    });
  });
  
  // 侧边栏菜单切换
  const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
