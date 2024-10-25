<template>
    <!-- 种类选择 -->
    <div class="form-floating" style="margin-top: 20px;">
        <select class="form-select" id="floatingSelect_ItemCategory" aria-label="Floating label select"
            v-model="selectedCategory" @change="getShopInfo(selectedCategory); changePage(1);">
            <option value="0" selected disabled>请选择一个种类</option>
            <option v-for="(category, index) in itemCategory" :key="index" :value="category.category">{{
                category.name }}</option>
        </select>
        <label for="floatingSelect_ItemCategory">选择物品种类</label>
    </div>

    <p class="form-text" style="margin-bottom: 20px; margin: 0; margin-top: 5px;">
        您的XR点数：<code>{{ userInfo.userInfo.xrCredit }}</code> 点</p>

    <p v-if="!shopItems" class="form-text" style="margin: 0;">请点击上方“选择物品种类”并选择一个物品种类以查看该种类的物品</p>

    <!-- 分页 -->
    <nav aria-label="Page navigation" v-if="totalPages > 1">
        <ul class="pagination justify-content-start" style="list-style: none; margin-left: -20px;">
            <li class="page-item page-item-vp-fix" :class="{ disabled: currentPage === 1 }">
                <a class="page-link page-link-vp-fix" href="#" @click.prevent="changePage(1)">&laquo;</a>
            </li>
            <li class="page-item page-item-vp-fix" :class="{ disabled: currentPage === 1 }">
                <a class="page-link page-link-vp-fix" href="#" @click.prevent="changePage(currentPage - 1)">&lsaquo;</a>
            </li>
            <li class="page-item page-item-vp-fix active">
                <a class="page-link page-link-vp-fix">{{ currentPage }}</a>
            </li>
            <li class="page-item page-item-vp-fix" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link page-link-vp-fix" href="#" @click.prevent="changePage(currentPage + 1)">&rsaquo;</a>
            </li>
            <li class="page-item page-item-vp-fix" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link page-link-vp-fix" href="#" @click.prevent="changePage(totalPages)">&raquo;</a>
            </li>
        </ul>
    </nav>

    <!-- 物品显示 -->
    <div class="row row-cols-2 row-cols-md-4 g-2" v-if="shopItems && shopItems.length > 0">
        <div class="col" v-for="item in paginatedItems" :key="item.dbId">
            <div class="card h-100">
                <div class="card-header" style="font-size: small;">
                    {{ item.itemCategoryName }}
                </div>
                <!-- 普通铭牌 -->
                <img v-if="item.itemCategory === 1" :src="picsPath + '/wmmt/namePlates/' + item.itemId + '.png'"
                    class="card-img-top" :alt="item.itemName" style="height: 100%; object-fit: contain;">
                <!-- 自定义边框 -->
                <img v-if="item.itemCategory === 2" :src="picsPath + '/wmmt/customFrames/' + item.itemId + '.png'"
                    class="card-img-top" :alt="item.itemName" style="height: 100%; object-fit: contain;">
                <!-- 比赛用仪表 -->
                <img v-if="item.itemCategory === 3" :src="picsPath + '/wmmt/racingMeters/' + item.itemId + '.png'"
                    class="card-img-top" :alt="item.itemName"
                    style="width: 100%; max-height: 60%; object-fit: contain;">
                <!-- 券 -->
                <img v-if="item.itemCategory === 4" :src="picsPath + '/wmmt/tickets/' + item.itemId + '.png'"
                    class="card-img-top" :alt="item.itemName" style="height: 100%; object-fit: contain;">
                <!-- 主体部分 -->
                <div class="card-body d-flex flex-column">
                    <div class="mt-auto">
                        <h5 class="card-title">{{ item.itemName }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ item.itemType }}</h6>
                        <hr class="class-vp-fix">
                        <p class="card-text" style="font-size: small; margin: 0;">==> <code>{{ item.itemPrice }}</code>
                            XR点</p>
                        <button v-if="userInfo.userInfo.xrCredit >= item.itemPrice" type="button"
                            :id="'exchangeItemBtn_' + item.dbId" class="btn btn-primary w-100"
                            @click="exchangeItemBtn_Click(item.dbId, item.itemCategory, item.itemCategoryName, item.itemName, item.itemId, item.itemPrice, item.itemType)"
                            style="margin-top: 5px;">兑换
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                                :id="'exchangeItemBtnSpinner_' + item.dbId" hidden></span>
                        </button>
                        <button v-if="userInfo.userInfo.xrCredit < item.itemPrice" type="button"
                            style="margin-top: 10px; width: 100%;" class="btn btn-primary" disabled>点数不足</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 兑换弹窗 -->
    <div class="modal fade" id="staticBackdrop_ExchangeItem" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel_ExchangeItem" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel_ExchangeItem" style="line-height: normal;">
                        <small style="color: gray; opacity: 0.8; font-size: 0.6em;">兑换物品
                        </small>
                        <br>
                        {{ exchangeTargetItemName }}
                    </h1>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="card-header" style="font-size: small;">
                            物品信息
                        </div>
                        <ul class="list-group list-group-flush" style="padding-left: 0; margin: 0;">
                            <li class="list-group-item" style="margin-top: 0;">类别 ==> {{ exchangeTargetItemCategoryName
                                }}</li>
                            <li class="list-group-item" style="margin-top: 0;">物品名 ==> {{ exchangeTargetItemName }}</li>
                            <li class="list-group-item" style="margin-top: 0;">所属 ==> {{ exchangeTargetItemType }}</li>
                        </ul>
                    </div>
                    <p style="font-size: 15px; margin: 0;">
                        是否要兑换此物品？</p>
                    <div style="margin-bottom: -15px;" class="alert alert-warning" role="alert">
                        ⚠️ 一经兑换，无法回退。兑换前请三思！<br>⚠️ 兑换后有效期为 <code>7</code> 天，超时物品将失效！
                    </div>
                </div>
                <hr style="color: var(--bs-border-color); opacity: 0.8; height: 1px;">
                <div class="modal-body">
                    <p style="font-size: 15px; margin: 0; margin-top: -20px;">本次兑换所需XR点</p>
                    <p style="font-size: 25px; font-weight: bolder; margin: 0">{{ exchangeTargetItemPrice }} 点</p>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-success" @click="exchangeItem()"
                        id="exchangeItemBtn_OnModal">兑换
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                            id="exchangeItemBtnSpinner_OnModal" hidden></span>
                    </button>
                    <button type="button" class="btn btn-dark" @click="exchangeItemModal_Cancel()"
                        data-bs-dismiss="modal">取消</button>
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
            // 用户信息
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
            itemCategory: [ // 物品种类
                { category: 1, name: '普通铭牌' },
                { category: 2, name: '自定义边框' },
                { category: 3, name: '比赛用仪表' },
                { category: 4, name: '兑换券' },
                /* { category: 5, name: 'OCM 金牌 & 甲子园铭牌' }, */
                { category: 6, name: '隐藏车' }
            ],
            selectedCategory: 0,
            shopItems: null,
            currentPage: 1, // 分页定义初始页
            itemsPerPage: 16, // 分页，每页所显示的数量
            picsPath: 'https://pics-a1c.pages.dev', // 图片URL
            // 兑换物品信息
            exchangeTargetItemDbId: null,
            exchangeTargetItemCategory: null,
            exchangeTargetItemCategoryName: null,
            exchangeTargetItemName: null,
            exchangeTargetItemId: null,
            exchangeTargetItemPrice: null,
            exchangeTargetItemType: null,
            checkTimeOutIntervalId: null // 检查超时定时器
        }
    },
    methods: {
        getShopInfo(category) {
            document.getElementById("floatingSelect_ItemCategory").setAttribute("disabled", "disabled");
            axios.post('/api/getShopInfo', {
                itemCategory: category
            }, {
                timeout: 10000 // 10s
            }).then(response => {
                if (response.data.getShopInfoStatus) {
                    this.shopItems = response.data.shopItems;
                } else {
                    toast("获取商店物品信息失败！\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
            }).catch(error => {
                console.log(error);
                toast("获取商店物品信息失败！\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
            }).finally(() => {
                document.getElementById("floatingSelect_ItemCategory").removeAttribute("disabled");
            });
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        exchangeItemBtn_Click(dbId, category, categoryName, name, itemId, price, type) {
            // 禁用按钮并启用Spinner
            document.getElementById(`exchangeItemBtn_${dbId}`).setAttribute('disabled', 'disabled');
            document.getElementById(`exchangeItemBtnSpinner_${dbId}`).removeAttribute('hidden');
            // 重置数据
            this.exchangeTargetItemDbId = dbId;
            this.exchangeTargetItemCategory = category;
            this.exchangeTargetItemCategoryName = categoryName;
            this.exchangeTargetItemName = name;
            this.exchangeTargetItemId = itemId;
            this.exchangeTargetItemPrice = price;
            this.exchangeTargetItemType = type;
            // 防止编译报错
            if (typeof window !== 'undefined') {
                import('bootstrap').then(({ Modal }) => {
                    const exchangeItem_StaticBackdrop = new Modal(document.getElementById('staticBackdrop_ExchangeItem'), {
                        keyboard: false
                    });
                    exchangeItem_StaticBackdrop.show();
                });
            }
        },
        exchangeItemModal_Cancel() {
            if (this.exchangeTargetItemDbId) {
                document.getElementById(`exchangeItemBtn_${this.exchangeTargetItemDbId}`).removeAttribute('disabled');
                document.getElementById(`exchangeItemBtnSpinner_${this.exchangeTargetItemDbId}`).setAttribute('hidden', 'hidden');
            }
            this.exchangeTargetItemDbId = null;
            this.exchangeTargetItemCategory = null;
            this.exchangeTargetItemCategoryName = null;
            this.exchangeTargetItemName = null;
            this.exchangeTargetItemId = null;
            this.exchangeTargetItemPrice = null;
            this.exchangeTargetItemType = null;
        },
        exchangeItem() {
            document.getElementById('exchangeItemBtn_OnModal').setAttribute('disabled', 'disabled');
            document.getElementById('exchangeItemBtnSpinner_OnModal').removeAttribute('hidden');
            if (!this.exchangeTargetItemDbId || !this.exchangeTargetItemCategory || !this.exchangeTargetItemCategoryName || !this.exchangeTargetItemName || !this.exchangeTargetItemId || !this.exchangeTargetItemPrice || !this.exchangeTargetItemType) {
                toast("无法检索当前兑换的物品信息，请联系管理员！", {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
                return;
            } else if (this.userInfo.userInfo.xrCredit < this.exchangeTargetItemPrice) {
                toast("您的XR点数不足！", {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
                return;
            } else if (!this.userInfo.userInfo.userQQ || !this.userInfo.userInfo.userPassword) {
                toast("请先登录！", {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
                return;
            }
            axios.post('/api/shopExchangeItem', {
                userQQ: this.userInfo.userInfo.userQQ,
                userPassword: this.userInfo.userInfo.userPassword,
                itemDbId: this.exchangeTargetItemDbId,
                itemCategory: this.exchangeTargetItemCategory,
                itemCategoryName: this.exchangeTargetItemCategoryName,
                itemName: this.exchangeTargetItemName,
                itemId: this.exchangeTargetItemId,
                itemPrice: this.exchangeTargetItemPrice
            }, {
                timeout: 10000 // 10s
            }).then((response) => {
                if (response.data.shopExchangeItemStatus) {
                    toast("兑换成功！", {
                        "theme": "colored",
                        "type": "success",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                    this.getUserCredit()
                    this.exchangeItemModal_Cancel();
                    this.userInfo.userInfo.xrCredit = response.data.remainXRCredit;
                    let userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
                    userInfo.userInfo.xrCredit = response.data.remainXRCredit;
                    sessionStorage.setItem('UserInfo', JSON.stringify(userInfo));
                } else {
                    toast("兑换失败！\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
            }).catch((error) => {
                console.log(error);
                toast("兑换失败！\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
            }).finally(() => {
                document.getElementById('exchangeItemBtn_OnModal').removeAttribute('disabled');
                document.getElementById('exchangeItemBtnSpinner_OnModal').setAttribute('hidden', 'hidden');
                // 防止编译报错
                if (typeof window !== 'undefined') {
                    import('bootstrap').then(({ Modal }) => {
                        const exchangeItem_StaticBackdrop = Modal.getInstance(document.getElementById('staticBackdrop_ExchangeItem'));
                        exchangeItem_StaticBackdrop.hide();
                    });
                }
            });
        },
        getUserCredit() {
            axios.post('/api/getUserCredit', {
                userQQ: this.userInfo.userInfo.userQQ,
                userPassword: this.userInfo.userInfo.userPassword
            }, {
                timeout: 10000
            }).then((response) => {
                if (response.data.getCredit) {
                    this.userInfo.userInfo.xrCredit = response.data.xrCredit;
                } else {
                    toast("获取用户XR点数失败！\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
            }).catch((error) => {
                console.log(error);
                toast("获取用户XR点数失败！\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
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
    computed: {
        totalPages() {
            if (this.shopItems) {
                return Math.ceil(this.shopItems.length / this.itemsPerPage);
            }
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            if (this.shopItems) {
                return this.shopItems.slice(start, end);
            }
        },
    },
    mounted() {
        if (!sessionStorage.getItem("UserInfo")) {
            this.$jump('/garage/login');
        } else {
            this.userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
        }
        this.getUserCredit();
        let userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
        userInfo.userInfo.xrCredit = this.userInfo.userInfo.xrCredit;
        sessionStorage.setItem('UserInfo', JSON.stringify(userInfo));
        this.checkTimeOutIntervalId = setInterval(() => {
            this.checkTimeExpired();
        }, 2000);
    }
}
</script>

<style scoped>
.class-vp-fix {
    margin: 1rem 0 !important;
    color: inherit !important;
    border: 0 !important;
    border-top: var(--bs-border-width) solid !important;
    opacity: 0.25 !important;
}

.page-item-vp-fix {
    margin-top: 0px !important;
}

.page-link-vp-fix {
    text-decoration: none !important;
}
</style>