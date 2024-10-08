// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

// Axios
import axios from 'axios'
axios.defaults.baseURL = "https://nw.xenon-rs.tech";

// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

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

        // 深浅色主题监听，用于给bootstrap5的控件更换样式
        setupThemeSwitcher();
    }
} satisfies Theme
