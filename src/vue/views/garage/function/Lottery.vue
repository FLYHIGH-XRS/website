<template>
    <figure class="figure" style="margin-top: 20px;">
        <img src="https://pic.imgdb.cn/item/66b3d29f6fe92525d5a26c31/lottery.png" class="figure-img img-fluid rounded"
            alt="Lottery">
        <figcaption class="figure-caption">本活动一切解释权归发行者所有</figcaption>
    </figure>

    <!-- 抽卡按钮 -->
    <ClientOnly>
        <div class="d-grid gap-4 d-md-flex justify-content-md-end">
            <!-- 单抽 -->
            <button type="button" class="btn btn-success position-relative" id="draw1Time_btn" @click="draw(1)" disabled>
                抽 1 次
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    v-if="userInfo">
                    {{ userInfo.userInfo.lotteryTicket }}🎫
                </span>
                <span class="spinner-border spinner-border-sm" id="spinner_1TimeBtn" role="status" aria-hidden="true"
                    hidden></span>
            </button>
            <!-- 10连 -->
            <button type="button" class="btn btn-success position-relative" id="draw10Times_btn" @click="draw(10)" disabled>
                抽 10 次
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    v-if="userInfo">
                    {{ userInfo.userInfo.lotteryTicket }}🎫
                </span>
                <span class="spinner-border spinner-border-sm" id="spinner_10TimeBtn" role="status" aria-hidden="true"
                    hidden></span>
            </button>
        </div>
    </ClientOnly>

    <!-- 抽卡进度 -->
    <ClientOnly>
        <p class="form-text" style="font-size: x-small; margin: 0;">
            当前已抽：<code>{{ this.userInfo.userInfo.currentDrawCount }}</code> 次</p>
        <div class="progress" role="progressbar" aria-label="Animated striped" aria-valuenow="45" aria-valuemin="0"
            aria-valuemax="100" style="margin-bottom: 10px;">
            <div class="progress-bar progress-bar-striped progress-bar-animated"
                :style="{ width: progressPercentage + '%' }">{{ userInfo.userInfo.currentDrawCount }} / 70</div>
        </div>
    </ClientOnly>

    <!-- 抽卡规则 -->
    <div class="row row-cols-1 row-cols-md-2 g-2">
        <div class="col">
            <div class="card h-100">
                <div class="card-header" style="font-size: small;">
                    湾岸抽抽乐玩法规则
                </div>
                <div class="card-body">
                    <ul style="list-style-type: decimal; margin-top: -5px;">
                        <li class="card-text ct-vp-fix">每天第一次登录服务器网页的"玩家车库"的时候将发放 1 张抽奖券</li>
                        <li class="card-text ct-vp-fix">抽奖券还可以通过参与活动获取</li>
                        <li class="card-text ct-vp-fix">抽奖券没有使用时间限制，您可以囤积到一定数量再进行抽奖</li>
                        <li class="card-text ct-vp-fix">获得的奖项将发放到您的网页账户的仓库里，您需要前往前往您的账户仓库进行兑换。请不要去到游戏的终端机里进行使用了！</li>
                        <li class="card-text ct-vp-fix">您可以在上方蓝色进度条获知您的保底进度</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card h-100">
                <div class="card-header" style="font-size: small;">
                    奖励概率一览
                </div>
                <div class="card-body">
                    <div class="card" style="width: 100%;">
                        <ul class="list-group lg-vp-fix-ul">
                            <li style="font-size: small;"
                                class="list-group-item d-flex justify-content-between align-items-center list-group-item-warning lg-vp-fix-li">
                                OCM 金牌 & 甲子园铭牌
                                <span class="badge bg-primary rounded-pill">出率：1%</span>
                            </li>
                            <li style="font-size: small;"
                                class="list-group-item d-flex justify-content-between align-items-center list-group-item-danger lg-vp-fix-li">
                                满改装商店兑换券
                                <span class="badge bg-primary rounded-pill">出率：1%</span>
                            </li>
                            <li style="font-size: small;"
                                class="list-group-item d-flex justify-content-between align-items-center list-group-item-success lg-vp-fix-li">
                                比赛用仪表（非故事、甲子园仪表）
                                <span class="badge bg-primary rounded-pill">出率：10%</span>
                            </li>
                            <li style="font-size: small;"
                                class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary lg-vp-fix-li">
                                自定义边框
                                <span class="badge bg-primary rounded-pill">出率：38%</span>
                            </li>
                            <li style="font-size: small;"
                                class="list-group-item d-flex justify-content-between align-items-center list-group-item-light lg-vp-fix-li">
                                普通铭牌
                                <span class="badge bg-primary rounded-pill">出率：50%</span>
                            </li>
                        </ul>
                    </div>
                    <p style="font-size: small; margin: 0;">*普通铭牌不包含OCM、VSORG参与牌</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card h-100">
                <div class="card-header" style="font-size: small;">
                    抽奖机制说明
                </div>
                <div class="card-body">
                    <ul style="list-style-type: decimal; margin-top: -5px;">
                        <li class="card-text ct-vp-fix">抽奖分为1抽/10连抽，没有其他的抽奖次数选项</li>
                        <li class="card-text ct-vp-fix">抽奖次数将会累计，如果70抽内没有出现过OCM 金牌 & 甲子园铭牌的奖项，则在第70抽时出现1次。出现过后将重置抽奖次数累计
                        </li>
                        <li class="card-text ct-vp-fix">您可以通过抽奖记录查询按钮查询近70次的抽奖记录</li>
                        <li class="card-text ct-vp-fix">所有物品的出现概率不会随抽数上涨而叠加</li>
                        <li class="card-text ct-vp-fix">账户仓库中存放的抽奖物品过期时间为7天，超时将自动删除</li>
                    </ul>
                    <button type="button" class="btn btn-primary w-100" id="getLotteryHistory_btn"
                        @click="getLotteryHistory()">查询抽奖记录
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" hidden></span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 抽卡结果弹窗 -->
    <div class="modal fade" id="lotteryResultStaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="lotteryResultStaticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="lotteryResultStaticBackdropLabel">您获得了</h1>
                </div>
                <div class="modal-body">
                    <ol class="list-group lg-vp-fix-ul">
                        <li class="list-group-item d-flex justify-content-between align-items-start lg-vp-fix-li"
                            v-for="(item, index) in prizeList" :key="index" :class="getClass(item.prizeType)">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold" style="margin-left: -10px;">{{ item.prizeTypeName }}</div>
                            </div>
                            <p class="form-text" style="margin: 0;">{{ item.prizeName }}</p>
                        </li>
                    </ol>
                    <p class="form-text" style="margin: 0;">*获得奖品后，请前往账户仓库进行兑换，非游戏内终端机。奖品将在获取起 <code>7</code> 天后到期</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="dismissDrawResult()">好的</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 抽卡历史记录弹窗 -->
    <div class="modal fade" id="lotteryHistoryStaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="lotteryHistoryStaticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="lotteryHistoryStaticBackdropLabel">抽奖记录
                    </h1>
                </div>
                <div class="modal-body">
                    <p v-if="getPaginatedData() && getPaginatedData().length === 0" class="form-text">没有找到抽奖记录哦</p>
                    <ul class="list-group lg-vp-fix-ul" style="list-style: none;">
                        <li v-for="(item, index) in getPaginatedData()" :key="index"
                            class="list-group-item lg-vp-fix-li" :class="getClass(item.prizeType)">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 style="margin: 0;" class="mb-1">{{ item.prizeTypeName }}</h6>
                                <small style="white-space: nowrap;">获取时间：{{ item.lotteryAt }}</small>
                            </div>
                            <p style="margin: 0;">{{ item.prizeName }}</p>
                        </li>
                    </ul>
                    <!-- Page Change -->
                    <nav aria-label="Page navigation" v-if="totalPages() > 1" class="d-flex justify-content-left"
                        style="margin-bottom: -10px; margin-left: -20px;">
                        <ul class="pagination justify-content-center" style="list-style: none;">
                            <li class="page-item switch-li-vp-fix" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link switch-li-in-vp-fix" href="#"
                                    @click.prevent="changePage(1)">&laquo;</a>
                            </li>
                            <li class="page-item switch-li-vp-fix" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link switch-li-in-vp-fix" href="#"
                                    @click.prevent="changePage(currentPage - 1)">&lsaquo;</a>
                            </li>
                            <li class="page-item active switch-li-vp-fix">
                                <a class="page-link switch-li-in-vp-fix">{{ currentPage }}</a>
                            </li>
                            <li class="page-item switch-li-vp-fix" :class="{ disabled: currentPage === totalPages() }">
                                <a class="page-link switch-li-in-vp-fix" href="#"
                                    @click.prevent="changePage(currentPage + 1)">&rsaquo;</a>
                            </li>
                            <li class="page-item switch-li-vp-fix" :class="{ disabled: currentPage === totalPages() }">
                                <a class="page-link switch-li-in-vp-fix" href="#"
                                    @click.prevent="changePage(totalPages())">&raquo;</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
    data() {
        return {
            // 用户数据
            userInfo: {
                accessCode: null,
                chipId: null,
                fullTuneTicketNumber: null,
                isAdmin: false,
                isTodayLogin: null,
                ticket600HpNumber: null,
                userInfo: { // Detail
                    currentDrawCount: null,
                    lastLoginAt: null,
                    lotteryTicket: null,
                    usedInviteCode: null,
                    userId: null,
                    userName: null,
                    userPassword: null,
                    userQQ: null,
                    xrCredit: null,
                }
            },
            progressPercentage: 0, // 抽卡进度
            prizeList: null, // 抽取到的奖品列表
            lotteryHistoryList: [
                {
                    prizeType: "暂无数据",
                    prizeItemId: "暂无数据",
                    prizeTypeName: "暂无数据",
                    prizeName: "暂无数据",
                    lotteryAt: "暂无数据"
                }
            ],
            currentPage: 1,
            itemsPerPage: 5,
            checkTimeOutIntervalId: null // 检查超时定时器
        }
    },
    methods: {
        getClass(prizeType) {
            switch (prizeType) {
                case 5:
                    return 'list-group-item-warning';
                case 4:
                    return 'list-group-item-danger';
                case 3:
                    return 'list-group-item-success';
                case 2:
                    return 'list-group-item-primary';
                case 1:
                    return 'list-group-item-light';
                default:
                    return null;
            }
        },
        draw(drawTime) {
            document.getElementById('draw1Time_btn').setAttribute('disabled', 'disabled');
            document.getElementById('draw10Times_btn').setAttribute('disabled', 'disabled');
            document.getElementById("spinner_1TimeBtn").removeAttribute("hidden");
            document.getElementById("spinner_10TimeBtn").removeAttribute("hidden");
            axios.post('/api/lottery', {
                operateUserQQ: this.userInfo.userInfo.userQQ,
                userPassword: this.userInfo.userInfo.userPassword,
                time: drawTime
            }, {
                timeout: 10000 // 10s超时
            }).then(response => {
                if (response.data.drawStatus) {
                    this.userInfo.userInfo.lotteryTicket = response.data.lotteryTicket; // 更新用户信息
                    this.userInfo.userInfo.currentDrawCount = response.data.currentDrawCount; // 更新抽卡次数
                    this.prizeList = null;
                    this.prizeList = response.data.prizeList;
                    // 更新sessionStorage中的值
                    let userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
                    userInfo.userInfo.lotteryTicket = response.data.lotteryTicket;
                    userInfo.userInfo.currentDrawCount = response.data.currentDrawCount;
                    sessionStorage.setItem('UserInfo', JSON.stringify(userInfo));
                    // 更新进度条百分比
                    this.progressPercentage = (this.userInfo.userInfo.currentDrawCount / 70) * 100;
                    // 防止编译报错
                    if (typeof window !== 'undefined') {
                        import('bootstrap').then(({ Modal }) => {
                            const lotteryResultStaticBackdrop = new Modal(document.getElementById('lotteryResultStaticBackdrop'), {
                                keyboard: false
                            });
                            lotteryResultStaticBackdrop.show();
                        });
                    }
                } else {
                    toast(response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    });
                }
            }).catch(error => {
                console.log(error);
                toast(error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                });
            }).finally(() => {
                document.getElementById('draw1Time_btn').removeAttribute('disabled');
                document.getElementById('draw10Times_btn').removeAttribute('disabled');
                document.getElementById("spinner_1TimeBtn").setAttribute("hidden", "hidden");
                document.getElementById("spinner_10TimeBtn").setAttribute("hidden", "hidden");
            });
        },
        dismissDrawResult() {
            document.getElementById("spinner_1TimeBtn").setAttribute("hidden", "hidden");
            document.getElementById("spinner_10TimeBtn").setAttribute("hidden", "hidden");
            if (this.userInfo.userInfo.lotteryTicket < 1) {
                document.getElementById('draw1Time_btn').setAttribute('disabled', 'disabled');
                document.getElementById('draw10Times_btn').setAttribute('disabled', 'disabled');
            }
            if (this.userInfo.userInfo.lotteryTicket >= 1 && this.userInfo.userInfo.lotteryTicket < 10) {
                document.getElementById('draw1Time_btn').removeAttribute('disabled');
                document.getElementById('draw10Times_btn').setAttribute('disabled', 'disabled');
            }
            if (this.userInfo.userInfo.lotteryTicket >= 10) {
                document.getElementById('draw1Time_btn').removeAttribute('disabled');
                document.getElementById('draw10Times_btn').removeAttribute('disabled');
            }
        },
        changePage(page) {
            this.currentPage = page;
        },
        getPaginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.lotteryHistoryList.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.lotteryHistoryList.length / this.itemsPerPage);
        },
        getLotteryHistory() {
            document.getElementById("getLotteryHistory_btn").setAttribute("disabled", "disabled");
            document.getElementById("getLotteryHistory_btn").querySelector("span").removeAttribute("hidden");
            axios.post('/api/getLotteryLog', {
                operateUserQQ: this.userInfo.userInfo.userQQ,
                userPassword: this.userInfo.userInfo.userPassword,
            }, {
                timeout: 10000 // 10s超时
            }).then(response => {
                if (response.data.fetchStatus) {
                    this.lotteryHistoryList = response.data.lotteryHistoryList;
                    // 防止编译报错
                    if (typeof window !== 'undefined') {
                        import('bootstrap').then(({ Modal }) => {
                            const lotteryHistoryStaticBackdrop = new Modal(document.getElementById('lotteryHistoryStaticBackdrop'), {
                                keyboard: false
                            });
                            lotteryHistoryStaticBackdrop.show();
                        });
                    }
                } else {
                    toast("获取抽奖记录失败\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    });
                }
            }).catch(error => {
                console.log(error);
                toast("获取抽奖记录的过程中发生了错误：\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                });
            }).finally(() => {
                document.getElementById("getLotteryHistory_btn").removeAttribute("disabled");
                document.getElementById("getLotteryHistory_btn").querySelector("span").setAttribute("hidden", "hidden");
            });
        },
        getLotteryInfo() {
            axios.post('/api/getLotteryInfo', {
                operateUserQQ: this.userInfo.userInfo.userQQ,
                userPassword: this.userInfo.userInfo.userPassword,
            }, {
                timeout: 10000 // 10s超时
            }).then(response => {
                if (response.data.fetchStatus) {
                    // 更新用户信息
                    this.userInfo.userInfo.lotteryTicket = response.data.lotteryTicket;
                    // 更新抽奖次数
                    this.userInfo.userInfo.currentDrawCount = response.data.currentDrawCount;
                    // 更新sessionStorage中的值
                    let userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
                    userInfo.userInfo.lotteryTicket = response.data.lotteryTicket;
                    userInfo.userInfo.currentDrawCount = response.data.currentDrawCount;
                    sessionStorage.setItem('UserInfo', JSON.stringify(userInfo));
                    // 更新进度条百分比
                    this.progressPercentage = (this.userInfo.userInfo.currentDrawCount / 70) * 100;
                    if (this.userInfo.userInfo.lotteryTicket < 10) {
                        document.getElementById('draw1Time_btn').removeAttribute('disabled');
                        document.getElementById('draw10Times_btn').setAttribute('disabled', 'disabled');
                    } else if (this.userInfo.userInfo.lotteryTicket >= 10) {
                        document.getElementById('draw1Time_btn').removeAttribute('disabled');
                        document.getElementById('draw10Times_btn').removeAttribute('disabled');
                    }
                    if (this.userInfo.userInfo.lotteryTicket < 1) {
                        document.getElementById('draw1Time_btn').setAttribute('disabled', 'disabled');
                        document.getElementById('draw10Times_btn').setAttribute('disabled', 'disabled');
                    }
                } else {
                    console.error("获取抽奖券数量失败", response.data);
                    toast("获取抽奖券数量失败\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                    document.getElementById('draw1Time_btn').setAttribute('disabled', 'disabled');
                    document.getElementById('draw10Times_btn').setAttribute('disabled', 'disabled');
                }
            }).catch(error => {
                console.error("获取抽奖券数量失败", error);
                toast("获取抽奖券数量失败\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
                document.getElementById('draw1Time_btn').setAttribute('disabled', 'disabled');
                document.getElementById('draw10Times_btn').setAttribute('disabled', 'disabled');
            })
        },
        checkTimeExpired() {
            let now = Math.floor(new Date().getTime() / 1000);
            let lastLoginAt = this.userInfo.userInfo.lastLoginAt;
            let userIsLogin = sessionStorage.getItem('UserInfo');
            if (now - lastLoginAt > 600) {
                if (!userIsLogin) {
                    return;
                } else {
                    console.log("登录已过期！请重新登录！");
                    toast("登录已过期！请重新登录！", {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                    sessionStorage.removeItem('UserInfo');
                    setTimeout(() => {
                        clearInterval(this.checkTimeOutIntervalId);
                        window.location.href = '/garage/login'; // 避免触发bug，使用window.location.href
                    }, 2000)
                }
            }
        },
    },
    mounted() {
        const userInfo = sessionStorage.getItem("UserInfo");
        if (!userInfo) {
            this.$jump('/garage/login');
        } else {
            this.userInfo = JSON.parse(userInfo);
        }
        this.getLotteryInfo();
        // 更新进度条百分比
        this.progressPercentage = (this.userInfo.userInfo.currentDrawCount / 70) * 100;
        this.checkTimeOutIntervalId = setInterval(() => {
            this.checkTimeExpired();
        }, 2000);
    }
}
</script>

<style scoped>
.card-text-vp-fix {
    line-height: normal !important;
    margin: 0 !important;
}

.lg-vp-fix-ul {
    padding-left: 0 !important;
    margin: 0 !important;
}

.lg-vp-fix-li {
    margin-top: 0 !important;
}

.ct-vp-fix {
    margin: 0 !important;
    line-height: normal !important;
    font-size: 14px;
}

.switch-li-vp-fix {
    padding-left: 0 !important;
    margin: 0 !important;
}

.switch-li-in-vp-fix {
    text-decoration: none !important;
}
</style>