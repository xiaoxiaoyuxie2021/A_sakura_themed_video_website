// FAQ折叠功能
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    item.classList.toggle('active');
  });
});

// 渲染分类菜单
if (document.querySelector('.category-dropdown')) {
  renderCategories();
}
