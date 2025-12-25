document.addEventListener('DOMContentLoaded', function() {
  const promoModal = document.getElementById('promoModal');
  const promoClose = document.getElementById('promoClose');
  const promoDetail = document.querySelector('.promo-detail');
  
  // 显示弹窗
  setTimeout(() => {
    promoModal.classList.add('show');
    // 禁用页面滚动和全局点击事件
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none'; // 关键：禁用body所有子元素的点击
  }, 1000);
  
  // 关闭按钮事件
  promoClose.addEventListener('click', function() {
    promoModal.classList.remove('show');
    document.body.style.overflow = ''; // 恢复滚动
    document.body.style.pointerEvents = ''; // 恢复点击
  });
  
  // 查看详情按钮事件
  promoDetail.addEventListener('click', function() {
    window.location.href = 'article.html';
  });
  
  // 确保弹窗本身可以接收事件
  promoModal.style.pointerEvents = 'all';
});
