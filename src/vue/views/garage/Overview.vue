<template>
    <div class="row g-2" style="margin-top: 0;">
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
                            <button type="button" class="btn btn-primary" style="width: 100%;"
                                @click="logout()">登出</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger" style="width: 100%;" data-bs-toggle="modal"
                                data-bs-target="#resetPasswordStaticBackdrop">重置密码</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-info" style="width: 100%;" data-bs-toggle="modal"
                                data-bs-target="#editUserNameStaticBackdrop">用户名更改</button>
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
                            <button type="button" class="btn btn-success w-100"
                                @click="generateCardFile()">下载卡文件</button>
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
                        <label for="formGroupInput_GiftCardCode" class="form-label"
                            style="color: rgb(118, 124, 130); font-size: 14px;">礼品卡号：</label>
                        <input type="text" class="form-control" id="formGroupInput_GiftCardCode"
                            placeholder="XXXX-XXXX-XXXX-XXXX" v-model="code">
                    </div>
                    <div class="gift-card-code">
                        <button type="button" class="btn btn-success gift-card-code-btn" id="exchangeGiftCardBtn"
                            @click="exchangeGiftCard()">
                            <span class="spinner-border spinner-border-sm" role="status" id="exchangeGiftCardBtnSpinner" aria-hidden="true" hidden></span>
                            兑换
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">废车卡 ==> 满改券</h5>
                    <p class="normal-card-text">您可以将废车卡转换为满改券<br>比例为 5:1</p>
                    <button type="button" style="width: 100%;" id="exchange600ToFTTBtn" class="btn btn-primary">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="exchange600ToFTTBtnSpinner" hidden></span>
                        兑换（可兑换 {{ calculateFTTExchangeNumber() }} 张）
                    </button>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-8">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">站点公告</h5>
                    <ul style="list-style-type: decimal;">
                        <li class="card-text ct-vp-fix">本新站点正处于Beta阶段，如遇意外问题，请带上截图和触发问题的操作联系群主。</li>
                        <li class="card-text ct-vp-fix">若因站点问题导致用户数据丢失，请联系群主，我们会给予一定补偿。</li>
                        <li class="card-text ct-vp-fix">登入有效期为10分钟，超时将自动登出。</li>
                        <li class="card-text ct-vp-fix">为保证您的Bana Passport卡号不被泄露，请勿在直播期间点击本页面中Bana Passport处的的“查看卡信息”按钮！</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Welcome Back -->
    <div class="modal fade" id="welcomeBackStaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="welcomeBackStaticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="welcomeBackStaticBackdropLabel">欢迎回来！</h1>
                </div>
                <div class="modal-body">
                    <p class="form-text" style="margin: 0;">您今天是第一次登录！</p>
                    <p class="form-text" style="margin: 0;">您获得了刮刮乐抽奖券 x1</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">好的</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Reset Password -->
    <div class="modal fade" id="resetPasswordStaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="resetPasswordStaticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="resetPasswordStaticBackdropLabel">重置密码</h1>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label for="formGroupInput_OriginalPassword" class="form-label">原密码</label>
                        <input type="password" class="form-control" id="formGroupInput" placeholder="请输入原来的密码"
                            v-model="originalPassword">
                    </div>
                    <div class="mb-2">
                        <label for="formGroupInput_NewPassword" class="form-label">新密码</label>
                        <input type="password" class="form-control" id="formGroupInput_NewPassword"
                            placeholder="请输入新的密码" v-model="newPassword">
                    </div>
                    <p class="form-text" style="margin: 0;">*新密码长度为6-15字符，需包含英文与数字</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" id="resetBtnModalBtn" @click="resetPassword()">
                        <span class="spinner-border spinner-border-sm" role="status" id="resetBtnModalBtnSpinner"
                            aria-hidden="true" hidden></span>
                        确认重置
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Reset User Name -->
    <div class="modal fade" id="editUserNameStaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="editUserNameStaticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editUserNameStaticBackdropLabel">用户名更改</h1>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label for="formGroupInput_NewUserName" class="form-label">新的用户名</label>
                        <input type="text" class="form-control" id="formGroupInput_NewUserName" placeholder="请输入新的用户名"
                            v-model="newUserName">
                    </div>
                    <p class="form-text" style="margin: 0;">*新用户名长度为4-10字符，限英文或数字</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" id="editUserNameBtnModalBtn" @click="editUserName()">
                        <span class="spinner-border spinner-border-sm" role="status" id="editUserNameBtnModalBtnSpinner"
                            aria-hidden="true" hidden></span>
                        确认更改
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import * as encrypt from '../../static/js/encrypt';
import * as validityCheck from "../../static/js/validityCheck";

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
            lastLoginAtText: null,
            // 密码重置
            originalPassword: null,
            newPassword: null,
            // 用户名更改
            newUserName: null,
            // 兑换礼品卡
            code: null,
            checkTimeOutIntervalId: null // 检查超时定时器
        }
    },
    methods: {
        logout() {
            sessionStorage.removeItem("UserInfo");
            this.$jump('/garage/login');
        },
        generateCardFile() {
            const content = `[card]\nchipId=${this.userInfo.chipId}\naccessCode=${this.userInfo.accessCode}`;
            const blob = new Blob([content], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'card.ini';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast("下载卡文件后\n请将其复制并覆盖到游戏根目录内\n浏览器可能会拦截下载，请放行下载", {
                "theme": "colored",
                "type": "success",
                "position": "top-center",
                "autoClose": 5000,
                "dangerouslyHTMLString": true
            })
        },
        exchangeGiftCard() {
            if (this.code === null) {
                toast("请输入兑换码", {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
                return;
            }
            if (!validityCheck.isGiftCardCodeValid(this.code)) {
                toast("兑换码不符合规范！", {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
                return;
            }
            document.getElementById('exchangeGiftCardBtn').setAttribute("disabled", "disabled");
            document.getElementById('exchangeGiftCardBtnSpinner').hidden = false;
            axios.post('/api/exchangeGiftCardCode', {
                code: this.code,
                userQQ: this.userInfo.userInfo.userQQ
            })
                .then(response => {
                    if (response.data.exchangeGiftCardCodeStatus === true) {
                        toast("兑换成功！", {
                            "theme": "colored",
                            "type": "success",
                            "position": "top-center",
                            "autoClose": 2000,
                            "dangerouslyHTMLString": true
                        })
                        this.code = null;
                        if (response.data.newLotteryTicket !== undefined) {
                            this.userInfo.userInfo.lotteryTicket = response.data.newLotteryTicket;
                            sessionStorage.setItem("UserInfo", JSON.stringify(this.userInfo));
                        }
                        if (response.data.newXRCredit !== undefined) {
                            this.userInfo.userInfo.xrCredit = response.data.newXRCredit;
                            sessionStorage.setItem("UserInfo", JSON.stringify(this.userInfo));
                        }
                    } else {
                        toast("兑换失败！\n" + response.data.message, {
                            "theme": "colored",
                            "type": "error",
                            "position": "top-center",
                            "autoClose": 2000,
                            "dangerouslyHTMLString": true
                        })
                        this.code = null;
                    }
                })
                .catch(error => {
                    toast("兑换失败！\n" + error, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                })
                .finally(() => {
                    document.getElementById('exchangeGiftCardBtn').removeAttribute("disabled");
                    document.getElementById('exchangeGiftCardBtnSpinner').hidden = true;
                });
        },
        resetPassword() {
            document.getElementById('resetBtnModalBtn').setAttribute("disabled", "disabled");
            document.getElementById('resetBtnModalBtnSpinner').hidden = false;
            let isInputValid = validityCheck.isValidPassword(this.newPassword);
            if (!isInputValid) {
                toast(isInputValid.message, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
                document.getElementById('resetBtnModalBtn').removeAttribute("disabled");
                document.getElementById('resetBtnModalBtnSpinner').hidden = true;
                return;
            }
            axios.post('/api/resetUserPassword', {
                oldPass: encrypt.encryptPassword(this.originalPassword),
                newPass: encrypt.encryptPassword(this.newPassword),
                userQQ: this.userInfo.userInfo.userQQ
            })
                .then(response => {
                    if (response.data.resetStatus === true) {
                        toast("密码重置成功！\n请重新登录！", {
                            "theme": "colored",
                            "type": "success",
                            "position": "top-center",
                            "autoClose": 2000,
                            "dangerouslyHTMLString": true
                        });
                        this.originalPassword = null;
                        this.newPassword = null;
                        sessionStorage.removeItem("UserInfo");
                        setTimeout(() => {
                            window.location.href = '/garage/login';
                        }, 1000);
                    } else {
                        toast("密码重置失败！\n" + response.data.message, {
                            "theme": "colored",
                            "type": "error",
                            "position": "top-center",
                            "autoClose": 2000,
                            "dangerouslyHTMLString": true
                        });
                        this.originalPassword = null;
                        this.newPassword = null;
                    }
                })
                .catch(error => {
                    console.error(error);
                    toast("密码重置失败！\n遇到了未知错误：\n" + error, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    });
                })
                .finally(() => {
                    document.getElementById('resetBtnModalBtn').removeAttribute("disabled");
                    document.getElementById('resetBtnModalBtnSpinner').hidden = true;
                });
        },
        editUserName() {
            document.getElementById('editUserNameBtnModalBtn').setAttribute("disabled", "disabled");
            document.getElementById('editUserNameBtnModalBtnSpinner').hidden = false;
            let isInputValid = validityCheck.isValidUserName(this.newUserName);
            if (!isInputValid) {
                toast('用户名不符合规范！', {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
                document.getElementById('editUserNameBtnModalBtn').removeAttribute("disabled");
                document.getElementById('editUserNameBtnModalBtnSpinner').hidden = true;
                return;
            }
            axios.post('/api/editUserName', {
                newUserName: this.newUserName,
                userQQ: this.userInfo.userInfo.userQQ
            })
                .then(response => {
                    if (response.data.editStatus === true) {
                        toast("用户名更改成功！\n请重新登录！\n", {
                            "theme": "colored",
                            "type": "success",
                            "position": "top-center",
                            "autoClose": 2000,
                            "dangerouslyHTMLString": true
                        });
                        this.newUserName = null;
                        sessionStorage.removeItem("UserInfo");
                        setTimeout(() => {
                            window.location.href = '/garage/login';
                        }, 1000);

                    } else {
                        toast("用户名更改失败！\n" + response.data.message, {
                            "theme": "colored",
                            "type": "error",
                            "position": "top-center",
                            "autoClose": 2000,
                            "dangerouslyHTMLString": true
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                    toast("用户名更改失败！\n遇到了未知错误：\n" + error, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    });
                })
                .finally(() => {
                    document.getElementById('editUserNameBtnModalBtn').removeAttribute("disabled");
                    document.getElementById('editUserNameBtnModalBtnSpinner').hidden = true;
                });
        },
        calculateFTTExchangeNumber() {
            // 5:1兑换
            return Math.floor(this.userInfo.ticket600HpNumber / 5);
        },
        exchange600ToFTT() {
            document.getElementById('exchange600ToFTTBtn').setAttribute("disabled", "disabled");
            document.getElementById('exchange600ToFTTBtnSpinner').hidden = false;
            axios.post('/api/exchangeFTTTicket', {
                userQQ: this.userInfo.userInfo.userQQ,
                userPassword: encrypt.encryptPassword(this.userInfo.userInfo.userPassword)
            }, {
                timeout: 10000
            })
                .then(response => {
                    if (response.data.exchangeStatus === true) {
                        toast("兑换成功！", {
                            "theme": "colored",
                            "type": "success",
                            "position": "top-center",
                            "autoClose": 2000,
                            "dangerouslyHTMLString": true
                        });
                        this.userInfo.ticket600HpNumber = this.userInfo.ticket600HpNumber - 1;
                        sessionStorage.setItem("UserInfo", JSON.stringify(this.userInfo));
                    } else {
                        toast("兑换失败！\n" + response.data.message, {
                            "theme": "colored",
                            "type": "error",
                            "position": "top-center",
                            "autoClose": 2000,
                            "dangerouslyHTMLString": true
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                    toast("兑换失败！\n遇到了未知错误：\n" + error, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    });
                })
                .finally(() => {
                    document.getElementById('exchange600ToFTTBtn').removeAttribute("disabled");
                    document.getElementById('exchange600ToFTTBtnSpinner').hidden = true;
                });
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
            this.lastLoginAtText = new Date(this.userInfo.userInfo.lastLoginAt * 1000).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false });
        }
        // 每日第一次登录欢迎弹窗
        if (!this.userInfo.isTodayLogin) {
            if (typeof window !== 'undefined') {
                import('bootstrap').then(({ Modal }) => {
                    const welcomeBackModel = new Modal(document.getElementById('welcomeBackStaticBackdrop'), {
                        keyboard: false
                    });
                    welcomeBackModel.show();
                });
            }
            // 更新sessionStorage中的值
            let userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
            userInfo.isTodayLogin = true;
            sessionStorage.setItem('UserInfo', JSON.stringify(userInfo));
        }
        // 如果不足数量兑换满改券则禁用兑换按钮
        if (this.userInfo.ticket600HpNumber < 5) {
            document.getElementById('exchange600ToFTTBtn').setAttribute("disabled", "disabled");
        }
        this.checkTimeOutIntervalId = setInterval(() => {
            this.checkTimeExpired();
        }, 2000);
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

.normal-card-text {
    font-weight: 400;
    font-size: 14px;
    color: rgb(118, 124, 130);
    transition: .3s color cubic-bezier(.4, 0, .2, 1);
    margin-top: 0;
    margin-bottom: 0;
}

.gift-card-code-btn {
    width: auto;
}

@media (max-width: 768px) {
    .gift-card-code-btn {
        width: 100%;
    }
}

.ct-vp-fix {
    margin: 0 !important;
    line-height: normal !important;
    font-size: 14px;
}
</style>