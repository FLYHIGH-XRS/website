export const setupThemeSwitcher = () => {
    const updateBootstrapTheme = () => {
        // 确保在客户端环境中执行
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            // 获取 VitePress 当前主题模式
            const isDarkMode = localStorage.getItem('vitepress-theme-appearance') === 'dark';

            // 检查是否能获取到主题设置
            if (!localStorage.getItem('vitepress-theme-appearance')) {
                alert('无法获取主题设置，请确保已正确配置主题。');
                return; // 如果没有找到主题设置，提前返回
            }

            const htmlElement = document.documentElement;

            // 根据当前 VitePress 主题切换 Bootstrap 的主题
            if (isDarkMode) {
                htmlElement.setAttribute('data-bs-theme', 'dark');
            } else {
                htmlElement.setAttribute('data-bs-theme', 'light');
            }
        }
    };

    // 仅在浏览器环境中执行
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        // 初始化时同步 Bootstrap 主题
        updateBootstrapTheme();

        // 监听 localStorage 变化，同步 VitePress 和 Bootstrap 主题切换
        window.addEventListener('storage', (event: StorageEvent) => {
            if (event.key === 'vitepress-theme-appearance') {
                updateBootstrapTheme();
            }
        });

        // 监听 VitePress 主题切换按钮点击事件
        document.addEventListener('DOMContentLoaded', () => {
            const toggleButton = document.querySelector('.vitepress-theme-appearance-toggle');
            if (toggleButton) {
                toggleButton.addEventListener('click', () => {
                    setTimeout(() => {
                        updateBootstrapTheme(); // 等待切换完成后同步 Bootstrap 主题
                    }, 0);
                });
            }
        });
    }
};