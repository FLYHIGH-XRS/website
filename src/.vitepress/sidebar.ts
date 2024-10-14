export const sidebar = {
    '/ranking/': [
        { text: '计时挑战模式 排行榜', link: '/ranking/timeAttack' },
        { text: '全服冠军争夺战 排行榜', link: '/ranking/ocmRanking' },
    ],
    '/events/': [
        {
            text: '最新活动',
            items: [
                { text: '限量车收集活动', link: '/events/latest' }
            ]
        },
        {
            text: '历史活动',
            items: [
                { text: '概览', link: '/events/history/overview' },
                { text: '#2 第17回 OCM 大阪区域', link: '/events/history/2' },
                { text: '#1 第19回 OCM 名古屋区域', link: '/events/history/1' },
            ]
        },
    ],
    '/about/': [
        { text: '关于我们', link: '/about/about' },
        { text: '用户协议', link: '/about/userAgreement' },
    ],
    '/garage/': [
        { text: '用户概览', link: '/garage/overview' },
        {
            text: '功能',
            items: [
                { text: '自主改车', link: '/garage/function/carModification' },
                { text: '用户仓库', link: '/garage/function/inventory' },
                { text: '湾岸抽抽乐', link: '/garage/function/lottery' },
                { text: '兑换商店', link: '/garage/function/shop' }
            ]
        }
    ]
}