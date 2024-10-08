export const setupThemeSwitcher = () => {
    const updateBootstrapTheme = () => {
        // 确保在客户端环境中执行
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            // 获取 VitePress 当前主题模式
            const isDarkMode = localStorage.getItem('vitepress-theme-appearance');

            const htmlElement = document.documentElement;

            // 根据当前 VitePress 主题切换 Bootstrap 的主题
            if (isDarkMode === "dark") {
                htmlElement.setAttribute('data-bs-theme', 'dark');
            } else if (isDarkMode === "light") {
                htmlElement.setAttribute('data-bs-theme', 'light');
            } else {
                const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                htmlElement.setAttribute('data-bs-theme', isSystemDark ? 'dark' : 'light');
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

        // 监听系统主题变化
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQueryList.addEventListener('change', () => {
            updateBootstrapTheme(); // 系统主题变化时更新 Bootstrap 主题
        });
    }
};
