<template>
    <div class="row g-3" style="margin-top: 0;">
        <div class="col-12 col-md-8">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">用户信息</h5>
                    <div class="row row-cols-1 row-cols-md-3 g-2">
                        <div class="col">
                            <p class="ai-grid-title">用户名</p>
                            <p class="ai-grid-text">{{ userInfo.userInfo.userName }}</p>
                        </div>
                        <div class="col">
                            <p class="ai-grid-title">用户QQ</p>
                            <p class="ai-grid-text">{{ userInfo.userInfo.userQQ }}</p>
                        </div>
                        <div class="col">
                            <p class="ai-grid-title">用户ID</p>
                            <p class="ai-grid-text">{{ userInfo.userInfo.userId }}</p>
                        </div>
                        <div class="col">
                            <p class="ai-grid-title">满改券</p>
                            <p class="ai-grid-text">{{ userInfo.fullTuneTicketNumber }}</p>
                        </div>
                        <div class="col">
                            <p class="ai-grid-title">废车卡</p>
                            <p class="ai-grid-text">{{ userInfo.ticket600HpNumber }}</p>
                        </div>
                        <div class="col">
                            <p class="ai-grid-title">抽奖券</p>
                            <p class="ai-grid-text">{{ userInfo.userInfo.lotteryTicket }}</p>
                        </div>
                        <div class="col">
                            <p class="ai-grid-title">XR点数</p>
                            <p class="ai-grid-text">{{ userInfo.userInfo.xrCredit }}</p>
                        </div>
                        <div class="col">
                            <p class="ai-grid-title">最近登录时间</p>
                            <p class="ai-grid-text" style="white-space: nowrap;">{{ lastLoginAtText }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">用户设置</h5>
                    <div class="row row-cols-2 row-cols-md-1 g-1">
                        <div class="col">
                            <button type="button" class="btn btn-primary" style="width: 100%;" @click="logout()">登出</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger" style="width: 100%;">重置密码</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-info" style="width: 100%;">用户名更改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-7">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">Bana Passport</h5>
                    <div class="row row-cols-2 row-cols-md-3 g-1">
                        <div class="col">
                            <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapse_BanaCardInfo" aria-expanded="false"
                                aria-controls="collapse_BanaCardInfo" style="width: 100%;">
                                查看卡信息
                            </button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-success" style="width: 100%;">下载卡文件</button>
                        </div>
                    </div>
                    <div class="collapse" id="collapse_BanaCardInfo" style="margin-top: 15px;">
                        <div class="card card-body">
                            <ul class="list-group lg-vp-fix-ul">
                                <li class="list-group-item lg-vp-fix-li list-group-item-success">Chip Id</li>
                                <li class="list-group-item lg-vp-fix-li">{{ userInfo.chipId }}</li>
                                <li class="list-group-item lg-vp-fix-li list-group-item-danger">Access Code</li>
                                <li class="list-group-item lg-vp-fix-li">{{ userInfo.accessCode }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-5">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">兑换礼品卡</h5>
                    <div class="mb-2">
                        <label for="formGroupInput_GiftCardCode" class="form-label" style="color: rgb(118, 124, 130); font-size: 14px;">礼品卡号：</label>
                        <input type="text" class="form-control" id="formGroupInput_GiftCardCode"
                            placeholder="XXXX-XXXX-XXXX-XXXX">
                    </div>
                    <div class="gift-card-code">
                        <button type="button" class="btn btn-success gift-card-code-btn">兑换</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
            lastLoginAtText: null
        }
    },
    methods: {
        logout() {
            sessionStorage.removeItem("UserInfo");
            this.$jump('/garage/login');
        }
    },
    mounted() {
        const userInfo = sessionStorage.getItem("UserInfo");
        if (!userInfo) {
            this.$jump('/garage/login');
        } else {
            this.userInfo = JSON.parse(userInfo);
            this.lastLoginAtText = new Date(this.userInfo.userInfo.lastLoginAt * 1000).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false });
        }
    }
}
</script>

<style scoped>
.ai-grid-title {
    font-weight: 400;
    font-size: 14px;
    color: rgb(118, 124, 130);
    transition: .3s color cubic-bezier(.4, 0, .2, 1);
    margin-top: 0;
    margin-bottom: 0;
}

.ai-grid-text {
    font-weight: 500;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 0;
}

.ai-lastLoginTimeText {
    font-weight: 500;
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 0;
}

.lg-vp-fix-ul {
    padding-left: 0 !important;
    margin: 0 !important;
}

.lg-vp-fix-li {
    margin-top: 0 !important;
}

.gift-card-code {
    display: flex;
    justify-content: flex-end;
}

.gift-card-code-btn {
    width: auto;
}

@media (max-width: 768px) {
    .gift-card-code-btn {
        width: 100%;
    }
}
</style>