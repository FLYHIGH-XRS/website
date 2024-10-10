// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

// Axios
import axios from 'axios'
// @ts-ignore 不加老是报错
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

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
    }
} satisfies Theme
