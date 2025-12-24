document.addEventListener('DOMContentLoaded', function() {
  const promoModal = document.getElementById('promoModal');
  const promoClose = document.getElementById('promoClose');
  const promoDetail = document.querySelector('.promo-detail');
  
  // 页面加载完成后1秒显示弹窗
  setTimeout(() => {
    promoModal.classList.add('show');
  }, 1000);
  
  // 关闭按钮事件
  promoClose.addEventListener('click', function() {
    promoModal.classList.remove('show');
  });
  
  // 查看详情按钮事件
  promoDetail.addEventListener('click', function() {
    // 可以替换为实际的详情页链接
    window.location.href = 'article.html';
  });
  
  // 点击弹窗外部关闭
  promoModal.addEventListener('click', function(e) {
    if (e.target === promoModal) {
      promoModal.classList.remove('show');
    }
  });
});