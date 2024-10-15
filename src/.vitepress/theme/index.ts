// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// https://vitepress.dev/guide/custom-theme
import { h, watch } from 'vue'
import { useRouter, type Route, type Router, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

// Axios
import axios from 'axios'
// @ts-ignore 不加老是报错
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

// Toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// 时间线
import "vitepress-markdown-timeline/dist/theme/index.css";

import { setupThemeSwitcher } from './themeSwitcher';

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app, router, siteData }) {
        // ...
        // 仅在浏览器（客户端）中加载 Bootstrap JS
        if (typeof window !== 'undefined') {
            import('bootstrap/dist/js/bootstrap.js');
        }

        // 深浅色主题监听，用于给bootstrap5的控件更换样式
        setupThemeSwitcher();

        // 路由守卫：跳转路由前检查是否允许访问
        if (typeof window !== 'undefined') {
            router.onBeforeRouteChange = (to) => {
                return checkIsNeedToLogin(to, router);
            }   
        }

        app.config.globalProperties.$jump = (url: string) => {
            router.go(url);
        }
    },

} satisfies Theme

// 跳转需要用户数据的页面前，检查是否存在已登录的用户数据
function checkIsNeedToLogin(to: string, router: Router) {
    const needCheckRoutes = [
        '/garage/overview',
    ]

    if (needCheckRoutes.includes(to)) {
        const userInfo = sessionStorage.getItem('UserInfo');
        if (!userInfo) {
            /* toast("请先登录！\n即将跳转到登录界面......", {
                "theme": "colored",
                "type": "warning",
                "position": "top-center",
                "autoClose": 1500,
                "dangerouslyHTMLString": true
            }) */
            // 等待2秒
            setTimeout(() => {
                router.go('/garage/login');
            }, 1500);
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}