export const sidebar = {
    '/ranking/': [
        { text: '计时挑战模式 排行榜', link: '/ranking/timeAttack' },
        { text: '全服冠军争夺战 排行榜', link: '/ranking/ocmRanking' },
        { text: '海外化身对战 排行榜', link: '/ranking/vsorgRanking' },
    ],
    '/events/': [
        {
            text: '最新活动',
            items: [
                { text: '海外化身对战 - 澳大利亚', link: '/events/latest' }
            ]
        },
        {
            text: '历史活动',
            items: [
                { text: '概览', link: '/events/history/overview' },
                { text: '#2 第17回 OCM 大阪区域', link: '/events/history/2' },
                { text: '#1 第19回 OCM 名古屋区域', link: '/events/history/1' },
                { text: '#1 限量车收集活动', link: '/events/history/3' },
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
    ],
    '/game/': [
        {
            text: '安装 & 问题修复',
            items: [
                { text: '游戏安装', link: '/game/install' },
                {
                    text: '问题修复',
                    collapsed: false,
                    items: [
                        { text: '启动时卡在“湾岸タ一ミナル入接続中です”', link: '/game/issueFix/1' },
                        { text: '车辆跑偏', link: '/game/issueFix/2' },
                        { text: '游戏启动后直接闪退', link: '/game/issueFix/3' },
                        { text: '游戏过程中闪退（键盘操控）', link: '/game/issueFix/4' },
                    ]
                },
                { text: '联机对战', link: '/game/vs' },
            ]
        },
        {
            text: '信息',
            items: [
                { text: '每日奖品', link: '/game/dailyPrize' },
                { text: '可用店铺', link: '/game/netId' },
            ]
        }
    ]
}