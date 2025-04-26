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
            // 添加切换动画
            themeToggleBtn.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggleBtn.style.transform = '';
            }, 300);
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.classList.remove('bi-moon-fill');
            themeToggleBtn.classList.add('bi-sun-fill');
            // 添加切换动画
            themeToggleBtn.style.transform = 'rotate(-360deg)';
            setTimeout(() => {
                themeToggleBtn.style.transform = '';
            }, 300);
        }
    });
    
    // 初始动画效果
    const categories = document.querySelectorAll('.category');
    categories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    // 搜索功能增强
    const searchInput = document.getElementById('search');
    const toolCards = document.querySelectorAll('.tool-card');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        // 添加打字延迟，优化性能
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = this.value.toLowerCase().trim();
            let hasResults = false;
            
            // 如果搜索框为空，显示所有工具和分类
            if (searchTerm === '') {
                toolCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                });
                
                document.querySelectorAll('.category').forEach(category => {
                    category.style.display = 'block';
                });
                
                hasResults = true;
            } else {
                toolCards.forEach(card => {
                    const toolName = card.querySelector('h3').textContent.toLowerCase();
                    const toolDesc = card.querySelector('p').textContent.toLowerCase();
                    
                    if (toolName.includes(searchTerm) || toolDesc.includes(searchTerm)) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        hasResults = true;
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            if (card.style.opacity === '0') {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                });
                
                // 显示/隐藏分类标题
                document.querySelectorAll('.category').forEach(category => {
                    const visibleCards = Array.from(category.querySelectorAll('.tool-card')).filter(
                        card => card.style.display !== 'none' && card.style.opacity !== '0'
                    );
                    
                    if (visibleCards.length === 0) {
                        category.style.display = 'none';
                    } else {
                        category.style.display = 'block';
                    }
                });
            }
            
            // 显示搜索结果状态
            const searchResultMessage = document.getElementById('search-result-message');
            if (!searchResultMessage && !hasResults && searchTerm !== '') {
                const message = document.createElement('div');
                message.id = 'search-result-message';
                message.className = 'search-no-results';
                message.innerHTML = `<i class="bi bi-emoji-frown"></i> 未找到与 <strong>"${searchTerm}"</strong> 相关的工具`;
                document.querySelector('main .container').prepend(message);
            } else if (searchResultMessage) {
                if (!hasResults && searchTerm !== '') {
                    searchResultMessage.innerHTML = `<i class="bi bi-emoji-frown"></i> 未找到与 <strong>"${searchTerm}"</strong> 相关的工具`;
                    searchResultMessage.style.display = 'block';
                } else {
                    searchResultMessage.style.display = 'none';
                }
            }
        }, 300);
    });
    
    // 搜索快捷键提示
    searchInput.setAttribute('title', '按 "/" 键快速聚焦 (按 Esc 清除搜索)');
    
    // 搜索取消按钮
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && this.value) {
            this.value = '';
            this.dispatchEvent(new Event('input'));
        }
    });
    
    // 提交工具模态框增强
    const modal = document.getElementById('add-tool-modal');
    const addToolBtn = document.getElementById('add-tool');
    const closeBtn = document.querySelector('.close');
    const toolForm = document.getElementById('tool-form');
    
    addToolBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
        
        // 添加模态框显示动画
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.transform = 'translateY(20px)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.3s ease';
            modalContent.style.transform = 'translateY(0)';
            modalContent.style.opacity = '1';
        }, 10);
        
        // 自动聚焦第一个输入框
        setTimeout(() => {
            document.getElementById('tool-name').focus();
        }, 300);
    });
    
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    function closeModal() {
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.transform = 'translateY(20px)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            modalContent.style.transform = '';
            modalContent.style.opacity = '';
        }, 300);
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // 高级表单验证
    const inputs = toolForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateInput.call(this);
            }
        });
    });
    
    function validateInput() {
        if (!this.checkValidity()) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    }
    
    toolForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 验证所有输入
        let isValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
                isValid = false;
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // 获取表单数据
        const toolName = document.getElementById('tool-name').value;
        const toolUrl = document.getElementById('tool-url').value;
        const toolDesc = document.getElementById('tool-desc').value;
        const toolCategory = document.getElementById('tool-category').value;
        
        // 显示提交中状态
        const submitBtn = toolForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i> 提交中...';
        
        // 模拟提交
        setTimeout(() => {
            // 这里可以添加将数据发送到服务器的逻辑
            // 或者保存到本地存储
            
            // 显示成功消息
            submitBtn.innerHTML = '<i class="bi bi-check2"></i> 提交成功!';
            
            // 2秒后关闭模态框
            setTimeout(() => {
                closeModal();
                
                // 重置表单和按钮
                toolForm.reset();
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 300);
                
                // 显示成功提示
                showToast(`感谢提交！工具 "${toolName}" 已成功添加，我们将尽快审核。`);
            }, 1500);
        }, 1500);
    });
    
    // 添加弹出提示框功能
    function showToast(message) {
        // 检查是否已存在toast
        let toast = document.querySelector('.toast-message');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-message';
            document.body.appendChild(toast);
        }
        
        // 设置消息并显示
        toast.textContent = message;
        toast.classList.add('show');
        
        // 3秒后隐藏
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // 添加工具卡片悬停效果
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // 添加页面载入完成提示
    setTimeout(() => {
        showToast('欢迎使用 DevToolKit 开发者工具导航！');
    }, 1000);
});

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // 按下ESC键关闭模态框
    if (e.key === 'Escape') {
        const modal = document.getElementById('add-tool-modal');
        if (modal.style.display === 'block') {
            const closeBtn = document.querySelector('.close');
            closeBtn.click();
        } else {
            // 如果没有模态框打开，清除搜索框
            const searchInput = document.getElementById('search');
            if (document.activeElement !== searchInput && searchInput.value) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    }
    
    // 按下"/"键聚焦到搜索框
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        document.getElementById('search').focus();
    }
});
