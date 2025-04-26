document.addEventListener('DOMContentLoaded', function() {
    // 主题切换
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.classList.remove('bi-moon-fill');
        themeToggleBtn.classList.add('bi-sun-fill');
    }
    
    // 主题切换事件
    themeToggleBtn.addEventListener('click', function() {
        if (htmlElement.getAttribute('data-theme') === 'dark') {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.classList.remove('bi-sun-fill');
            themeToggleBtn.classList.add('bi-moon-fill');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.classList.remove('bi-moon-fill');
            themeToggleBtn.classList.add('bi-sun-fill');
        }
    });
    
    // 搜索功能
    const searchInput = document.getElementById('search');
    const toolCards = document.querySelectorAll('.tool-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        toolCards.forEach(card => {
            const toolName = card.querySelector('h3').textContent.toLowerCase();
            const toolDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (toolName.includes(searchTerm) || toolDesc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // 显示/隐藏分类标题
        document.querySelectorAll('.category').forEach(category => {
            const visibleCards = category.querySelectorAll('.tool-card[style="display: block"]').length;
            const hiddenCards = category.querySelectorAll('.tool-card[style="display: none"]').length;
            const allHidden = hiddenCards === category.querySelectorAll('.tool-card').length;
            
            if (allHidden) {
                category.style.display = 'none';
            } else {
                category.style.display = 'block';
            }
        });
    });
    
    // 提交工具模态框
    const modal = document.getElementById('add-tool-modal');
    const addToolBtn = document.getElementById('add-tool');
    const closeBtn = document.querySelector('.close');
    const toolForm = document.getElementById('tool-form');
    
    addToolBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    toolForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const toolName = document.getElementById('tool-name').value;
        const toolUrl = document.getElementById('tool-url').value;
        const toolDesc = document.getElementById('tool-desc').value;
        const toolCategory = document.getElementById('tool-category').value;
        
        // 这里可以添加将数据发送到服务器的逻辑
        // 或者保存到本地存储
        
        // 显示成功消息
        alert(`感谢提交！\n工具: ${toolName}\n网址: ${toolUrl}\n分类: ${toolCategory}\n\n我们会尽快审核您的提交。`);
        
        // 重置表单并关闭模态框
        toolForm.reset();
        modal.style.display = 'none';
    });
    
    // 添加滚动到顶部功能
    // 可以在这里添加一个滚动到顶部的按钮逻辑
    
    // 初始化提示工具提示框
    // 如果使用第三方库如Bootstrap或Tippy.js，可以在这里初始化提示框
});

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // 按下ESC键关闭模态框
    if (e.key === 'Escape') {
        document.getElementById('add-tool-modal').style.display = 'none';
    }
    
    // 按下"/"键聚焦到搜索框
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        document.getElementById('search').focus();
    }
});
