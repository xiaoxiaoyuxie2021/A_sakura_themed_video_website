// 侧边栏主导航 + 内容切换（模仿 settings.css 交互）
document.addEventListener('DOMContentLoaded', () => {
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const contentCards = document.querySelectorAll('.content-card');

  // 初始化：显示第一个（观看历史）
  sidebarItems[0].classList.add('active');
  if (contentCards[0]) contentCards[0].classList.add('active');

  // 点击切换
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      // 移除所有 active
      sidebarItems.forEach(i => i.classList.remove('active'));
      contentCards.forEach(c => c.classList.remove('active'));

      // 添加当前 active
      item.classList.add('active');
      const targetTab = item.dataset.tab;
      const targetCard = document.getElementById(`${targetTab}-section`);
      if (targetCard) targetCard.classList.add('active');
    });
  });

  // hover 效果增强
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
});
