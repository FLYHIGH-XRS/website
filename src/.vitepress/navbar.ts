export const navbar = [
    { text: '主页', link: '/' },
    { text: '游戏', link: '/game/install' },
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
    { text: '车库', link: '/garage/' },
    { text: '关于', link: '/about' },
]