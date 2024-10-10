import { defineConfig } from 'vitepress'
// 导航栏和侧边栏
import { navbar } from './navbar';
import { sidebar } from './sidebar';

// 时间线
import timeline from "vitepress-markdown-timeline";

export default defineConfig({
    lang: 'zh-CN',
    title: "FLYHIGH XRS",
    description: "Xenon Racing Server",
    cleanUrls: true,
    // 图片懒加载
    markdown: {
        image: {
            lazyLoading: true
        },
        config: (md) => {
            md.use(timeline);
        }
    },
    // 最后更新时间
    lastUpdated: true,
    themeConfig: {
        // 导航栏和侧边栏
        nav: navbar,
        sidebar: sidebar,
        // 社交链接（右上角）
        socialLinks: [
            { icon: "github", link: "https://github.com/FLYHIGH-XRS" },
        ],
        // 页脚
        footer: {
            message: 'Released Under the <a href=\"https://mit-license.org/\"style=\"color: #de4f7a; text-decoration: underline;\" target=blank>MIT License</a>.',
            copyright: 'Copyright © 2023-Present <a href=\"https://github.com/FLYHIGH-XRS\" style=\"color: #de4f7a; text-decoration: underline;\" target=blank>FLYHIGH XRS</a>'
        },
        // 底部 编辑此文档
        editLink: {
            text: '在 GitHub 上编辑此页面',
            pattern: 'https://github.com/FLYHIGH-XRS/website/blob/main/docs/:path'
        },
        // 汉化
        lastUpdatedText: '最后一次更新于',
        outlineTitle: '在此页面上的内容',
        docFooter: {
            next: '下一篇',
            prev: '上一篇'
        },
        returnToTopLabel: '返回顶部',
        darkModeSwitchLabel: '浅色/深色模式',
        sidebarMenuLabel: '菜单',
        // 搜索（本地）
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: '搜索',
                        buttonAriaLabel: '搜索'
                    },
                    modal: {
                        displayDetails: '显示详细信息',
                        resetButtonTitle: '重置搜索结果',
                        backButtonTitle: '返回上一页',
                        noResultsText: '没有搜索到',
                        footer: {
                            selectText: '选择',
                            selectKeyAriaLabel: '选择搜索结果',
                            navigateText: '切换',
                            navigateUpKeyAriaLabel: '向上切换搜索结果',
                            navigateDownKeyAriaLabel: '向下切换搜索结果',
                            closeText: '关闭',
                            closeKeyAriaLabel: '关闭搜索结果'
                        }
                    }
                },
            }
        }
    }
})
