export const navbar = [
    { text: '主页', link: '/' },
    {
        text: '游戏',
        items: [
            {
                text: '安装 & 问题修复',
                items: [
                    { text: '游戏安装', link: '/game/install' },
                    { text: '问题修复', link: '/game/issueFix/1' },
                ]
            },
            {
                text: '信息',
                items: [
                    { text: '每日奖品', link: '/game/dailyPrize' },
                    { text: '可用店铺', link: '/game/netId' },
                ]
            },
        ]
    },
    {
        text: '活动',
        items: [
            { text: '最新活动', link: '/events/latest' },
            { text: '历史活动', link: '/events/history/overview' },
        ]
    },
    {
        text: '排行',
        items: [
            { text: '计时挑战模式 排行榜', link: '/ranking/timeAttack' },
            { text: '全服冠军争夺战 排行榜', link: '/ranking/ocmRanking' },
        ]
    },
    { text: '车库', link: '/garage/overview' },
    {
        text: '关于',
        items: [
            { text: '关于我们', link: '/about/about' },
            { text: '用户协议', link: '/about/userAgreement' },
        ]
    },
]