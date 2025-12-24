// 适配文章容器内滚动的JS
document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.getElementById('backToTop');
  // 获取文章所在的滚动容器（根据实际布局调整选择器）
  const scrollContainer = document.querySelector('.player-container, .article-scroll-container, main');
  
  if (!backToTopBtn || !scrollContainer) return;

  // 监听容器滚动而非window滚动
  scrollContainer.addEventListener('scroll', function() {
    // 当容器内滚动超过300px时显示按钮
    if (scrollContainer.scrollTop > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // 点击滚动到容器顶部
  backToTopBtn.addEventListener('click', function() {
    scrollContainer.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
