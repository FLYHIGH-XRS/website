<template>
    <div class="container" style="margin-top: 30px;">
        <div class="row justify-content-md-center">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-5">
                <div class="card" style="border: none; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    <div class="card-body card-padding">
                        <form @submit.prevent="login">
                            <!-- 标题 -->
                            <p class="card-title" style="font-weight: 500; font-size: 25px; margin-bottom: 30px;">登录&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;FLYHIGH XRS</p>
                            <!-- QQ号输入 -->
                            <div class="mb-3">
                                <label for="formGroupInput_QQNumber" class="form-label">QQ号</label>
                                <input type="number" class="form-control" id="formGroupInput_QQNumber"
                                    placeholder="请输入QQ号码" v-model="inputQQNumber">
                            </div>
                            <!-- 密码输入 -->
                            <div class="mb-3">
                                <label for="formGroupInput_Password" class="form-label">密码</label>
                                <input type="password" class="form-control" id="formGroupInput_Password"
                                    placeholder="请输入密码" v-model="inputPassword">
                            </div>
                            <!-- 登录按钮 -->
                            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;"
                                id="loginBtn">
                                <span class="spinner-border spinner-border-sm" id="loginBtnSpinner" role="status"
                                    aria-hidden="true" hidden></span>
                                登录
                            </button>
                            <hr style="margin-top: 30px; margin-bottom: 30px;">
                            <!-- 注册跳转 -->
                            <p class="card-text" style="color: grey;">还没有账号？<a href="#" @click="this.$jump('/garage/register')"
                                    class="card-link register-link-vp-fix">注册</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as encrypt from '../../static/js/encrypt';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import * as validityCheck from "../../static/js/validityCheck";

export default {
    data() {
        return {
            inputQQNumber: null,
            inputPassword: null
        }
    },
    methods: {
        login() {
            // 检测输入
            const isInputValid = validityCheck.loginValidityCheck(this.inputQQNumber, this.inputPassword);
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
            // 禁用登录按钮
            document.getElementById("loginBtn").setAttribute("disabled", "disabled");
            document.getElementById("loginBtnSpinner").hidden = false;
            // 加密密码
            let encryptedPassword = encrypt.encryptPassword(this.inputPassword);
            console.log(encryptedPassword);
            // 发送请求
            axios.post('/api/login', {
                userQQ: this.inputQQNumber,
                userPassword: encryptedPassword
            }, {
                timeout: 10000 // 10s超时
            }).then(response => {
                if (response.data.loginStatus === true) {
                    toast("登录成功！", {
                        "theme": "colored",
                        "type": "success",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                    sessionStorage.setItem("UserInfo", JSON.stringify(response.data.user));
                    setTimeout(() => {
                        this.$jump('/garage/overview');
                    }, 2000); // 2000为设定的toast时间
                } else {
                    toast("登录失败：\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                    this.inputQQNumber = null;
                    this.inputPassword = null;
                }
            }).catch(error => {
                console.log(error);
                toast("登录失败，出现了意外错误：\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
            }).finally(() => {
                // 启用登录按钮
                document.getElementById("loginBtn").removeAttribute("disabled");
                document.getElementById("loginBtnSpinner").hidden = true;
            });
        },
    }
}
</script>

<style scoped>
.card-padding {
    padding: 45px;
}

.register-link-vp-fix {
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