<template>
    <div class="container" style="margin-top: 30px; margin-bottom: 30px;">
        <div class="row justify-content-md-center">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-5">
                <div class="card" style="border: none; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    <div class="card-body card-padding">
                        <!-- 标题 -->
                        <p class="card-title" style="font-weight: 500; font-size: 25px; margin-bottom: 30px;">注册&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;FLYHIGH XRS</p>
                        <form @submit.prevent="register" class="row g-3">
                            <!-- 用户名输入 -->
                            <div class="col-md-6">
                                <label for="formGroupInput_UserName" class="form-label">用户名</label>
                                <input type="text" class="form-control" id="formGroupInput_UserName"
                                    placeholder="请输入用户名" v-model="inputUserName">
                                <p class="form-text">4-10字符，限英文或数字</p>
                            </div>
                            <!-- QQ号输入 -->
                            <div class="col-md-6">
                                <label for="formGroupInput_QQNumber" class="form-label">QQ号</label>
                                <input type="number" class="form-control" id="formGroupInput_QQNumber"
                                    placeholder="请输入QQ号码" v-model="inputQQNumber">
                                <p class="form-text">使用已绑定邀请码的QQ号</p>
                            </div>
                            <!-- 密码输入 -->
                            <div class="col-md-6">
                                <label for="formGroupInput_Password" class="form-label">密码</label>
                                <input type="password" class="form-control" id="formGroupInput_Password"
                                    placeholder="请输入密码" v-model="inputPassword">
                                <p class="form-text">6-15字符，需包含英文与数字</p>
                            </div>
                            <!-- 密码再次输入 -->
                            <div class="col-md-6">
                                <label for="formGroupInput_PasswordConfirm" class="form-label">确认密码</label>
                                <input type="password" class="form-control" id="formGroupInput_PasswordConfirm"
                                    placeholder="请再次输入密码" v-model="inputConfirmPassword">
                                <p class="form-text">确认您的密码</p>
                            </div>
                            <!-- 邀请码 -->
                            <div>
                                <label for="formGroupInput_InviteCode" class="form-label">邀请码</label>
                                <input type="text" class="form-control" id="formGroupInput_InviteCode"
                                    placeholder="请输入与QQ号绑定的邀请码" v-model="inputInviteCode">
                            </div>
                            <!-- 同意条款 -->
                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck"
                                        v-model="isAcceptUserTerms" required>
                                    <label class="form-check-label" for="invalidCheck">
                                        阅读并接受<a href="/about/userAgreement" target="_blank"
                                            class="card-link link-vp-fix">用户协议</a>
                                    </label>
                                </div>
                            </div>
                            <!-- 注册按钮 -->
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;"
                                    id="registerBtn">
                                    <span class="spinner-border spinner-border-sm" id="registerBtnSpinner" role="status"
                                        aria-hidden="true" hidden></span>
                                    注册
                                </button>
                            </div>
                        </form>
                        <hr style="margin-top: 30px; margin-bottom: 30px;">
                        <!-- 登录跳转 -->
                        <p class="card-text" style="color: grey;">已经有账号了？<a href="#" @click="this.$jump('/garage/login')"
                                class="card-link link-vp-fix">登录</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import * as validityCheck from "../../static/js/validityCheck";
import * as encrypt from '../../static/js/encrypt';

export default {
    data() {
        return {
            inputUserName: null, // 用户名
            inputQQNumber: null, // QQ号
            inputPassword: null, // 密码
            inputConfirmPassword: null, // 密码再次输入
            inputInviteCode: null, // 邀请码
            isAcceptUserTerms: false, // 是否同意用户协议
        }
    },
    methods: {
        register() {
            // 检查合法性
            if (this.isAcceptUserTerms === false) {
                toast("请阅读并接受用户协议！", {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
                return;
            }
            const isInputValid = validityCheck.registerValidityCheck(this.inputUserName, this.inputQQNumber, this.inputPassword, this.inputConfirmPassword, this.inputInviteCode);
            console.log(isInputValid);
            if (!isInputValid.checkStatus) {
                toast(isInputValid.message, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
                return;
            }
            const encryptedPassword = encrypt.encryptPassword(this.inputPassword);
            console.log(encryptedPassword);
            // 禁用所有输入框
            document.getElementById("formGroupInput_UserName").setAttribute("disabled", "disabled");
            document.getElementById("formGroupInput_QQNumber").setAttribute("disabled", "disabled");
            document.getElementById("formGroupInput_Password").setAttribute("disabled", "disabled");
            document.getElementById("formGroupInput_PasswordConfirm").setAttribute("disabled", "disabled");
            document.getElementById("formGroupInput_InviteCode").setAttribute("disabled", "disabled");
            document.getElementById("invalidCheck").setAttribute("disabled", "disabled");
            document.getElementById("registerBtn").setAttribute("disabled", "disabled");
            document.getElementById("registerBtnSpinner").hidden = false;
            // 发送请求
            axios.post('/api/register', {
                userName: this.inputUserName,
                userQQ: this.inputQQNumber,
                userPassword: encryptedPassword,
                userInviteCode: this.inputInviteCode,
                isAcceptUserTerms: this.isAcceptUserTerms
            }, {
                setTimeout: 10000 // 10s超时
            }).then((response) => {
                if (response.data.registerStatus === true) {
                    toast("注册成功！", {
                        "theme": "colored",
                        "type": "success",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                    setTimeout(() => {
                        this.$jump('/garage/login');
                    }, 2000); // 2000为设定的toast时间
                } else {
                    toast("注册失败：" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
            }).catch((error) => {
                console.log(error);
                toast("注册失败，遇到了未知错误：\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
            }).finally(() => {
                // 恢复所有输入框
                document.getElementById("formGroupInput_UserName").removeAttribute("disabled");
                document.getElementById("formGroupInput_QQNumber").removeAttribute("disabled");
                document.getElementById("formGroupInput_Password").removeAttribute("disabled");
                document.getElementById("formGroupInput_PasswordConfirm").removeAttribute("disabled");
                document.getElementById("formGroupInput_InviteCode").removeAttribute("disabled");
                document.getElementById("invalidCheck").removeAttribute("disabled");
                document.getElementById("registerBtn").removeAttribute("disabled");
                document.getElementById("registerBtnSpinner").hidden = true;
            });
        },
    },
    mounted() {
        if (sessionStorage.getItem("UserInfo")) {
            this.$jump('/garage/overview');
        }
    }
}
</script>

<style scoped>
.card-padding {
    padding: 45px;
}

.link-vp-fix {
    color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1));
    text-decoration: underline;
}

/* 手机端适配 */
@media (max-width: 768px) {
    .card-padding {
        margin-top: 10px;
        padding: 25px;
    }
}
</style>