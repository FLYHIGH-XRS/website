<template>
    <div class="form-floating" style="margin-top: 20px;">
        <select class="form-select" id="floatingSelect_ItemCategory" aria-label="Floating label select"
            v-model="selectedCategory">
            <option value="0">全部物品</option>
            <option value="1">普通铭牌</option>
            <option value="2">自定义边框</option>
            <option value="3">比赛用仪表</option>
            <option value="4">兑换券</option>
            <option value="5">OCM 金牌 & 甲子园铭牌</option>
            <option value="6">隐藏车</option>
        </select>
        <label for="floatingSelect_ItemCategory">物品种类</label>
    </div>

    <p v-if="userInventory && userInventory.length > 0">
        物品数量：<code>{{ userInventory.length }}</code> / <code>999</code>（最大数量）</p>

    <p v-if="userInventory && userInventory.length === 0" style="font-size: 25px;">您的账户里没有物品可以兑换！</p>

    <nav aria-label="Page navigation" v-if="totalPages > 1" class="d-flex justify-content-start"
        style="margin-bottom: -15px; margin-top: -20px;">
        <ul class="pagination justify-content-center" style="list-style: none; padding-left: 0 !important;">
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

    <div class="row row-cols-2 row-cols-md-4 g-3" style="margin-top: 0;">
        <div class="col" v-for="item in paginatedItems" :key="item.itemId" :index="item.itemId">
            <div class="card h-100">
                <!-- 普通铭牌 -->
                <img v-if="item.prizeCategory === 1" :src="picsPath + '/wmmt/namePlates/' + item.prizeItemId + '.png'"
                    class="card-img-top" :alt="item.prizeTypeName" style="height: 100%; object-fit: contain;">
                <!-- 自定义边框 -->
                <img v-if="item.prizeCategory === 2" :src="picsPath + '/wmmt/customFrames/' + item.prizeItemId + '.png'"
                    class="card-img-top" :alt="item.prizeTypeName" style="height: 100%; object-fit: contain;">
                <!-- 比赛用仪表 -->
                <img v-if="item.prizeCategory === 3" :src="picsPath + '/wmmt/racingMeters/' + item.prizeItemId + '.png'"
                    class="card-img-top" :alt="item.prizeTypeName" style="height: 100%; object-fit: contain;">
                <!-- 兑换券 -->
                <img v-if="item.prizeCategory === 4" :src="picsPath + '/wmmt/tickets/' + item.prizeItemId + '.png'"
                    class="card-img-top" :alt="item.prizeTypeName" style="height: 100%; object-fit: contain;">
                <!-- OCM 金牌 / 甲子园牌 -->
                <img v-if="item.prizeCategory === 5" :src="picsPath + '/wmmt/namePlates/' + item.prizeItemId + '.png'"
                    class="card-img-top" :alt="item.prizeTypeName" style="height: 100%; object-fit: contain;">
                <!-- 主体显示 -->
                <div class="card-body">
                    <div class="mt-auto">
                        <h5 class="card-title">{{ item.prizeTypeName }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ item.prizeName }}</h6>
                        <hr class="class-vp-fix">
                        <button type="button" :id="'exchangeItemBtn_' + item.dbId" class="btn btn-primary w-100"
                            @click="exchangeItemBtn_Click(item.prizeTypeName, item.prizeName, item.prizeCategory, item.dbId)">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                                :id="'exchangeItemBtnSpinner_' + item.dbId" hidden></span>
                            兑换
                        </button>
                    </div>
                </div>
                <div class="card-footer">
                    <small v-if="item.expireDay > 0" class="text-muted">剩余{{ item.expireDay }}天过期</small>
                    <small v-if="item.expireDay === 0" class="text-muted"
                        style="color: crimson !important;">永久有效</small>
                </div>
            </div>
        </div>
    </div>

    <!-- Exchange Item Modal -->
    <div class="modal fade" id="exchangeItem_StaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="exchangeItem_StaticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exchangeItem_StaticBackdropLabel">兑换物品</h1>
                </div>
                <div class="modal-body">
                    <h5 class="card-title">{{ exchangeItemTypeName }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ exchangeItemName }}</h6>
                    <!-- 普通兑换（直接兑换到车里） -->
                    <template
                        v-if="exchangeItemCategory === 1 || exchangeItemCategory === 2 || exchangeItemCategory === 3 || (exchangeItemCategory === 4 && exchangeItemName === '满改装商店券') || exchangeItemCategory === 5">
                        <div class="form-floating d-flex flex-column flex-md-row justify-content-md-center">
                            <select class="form-select mb-2 mb-md-0 me-md-2" id="floatingSelectCarId"
                                aria-label="Floating label select" v-model="selectedCarId" @change="fetchCarInfo"
                                disabled>
                                <option v-for="car in userCarList" :key="car.carId" :value="car.carId">{{
                                    car.carNameInfo }}
                                </option>
                            </select>
                            <label for="floatingSelectCarId">选择一辆您的车辆</label>
                            <button type="button" class="btn btn-primary" id="refetchCarListButton"
                                style="width: auto; white-space: nowrap;" @click="fetchCarList()"
                                disabled>重新获取车辆列表</button>
                        </div>
                        <p v-if="this.selectedCarId" class="card-text" style="margin: 0 !important;">{{ exchangeItemName
                            }}
                            将会被兑换至车辆：<br>{{
                                targetCarName }}</p>
                        <p class="form-text" style="margin: 0 !important;">*物品将被直接兑换至您的车辆，需进入终端机自行切换物品，但无需领取</p>
                        <p class="form-text" style="margin: 0 !important;">*该操作不能回退，请确认选择的车辆信息后再进行兑换</p>
                    </template>
                    <!-- 隐藏车兑换（直接兑换到玩家账户） -->
                    <template v-if="exchangeItemCategory === 6">
                        <p class="form-text" style="margin: 0 !important;">
                            *该车辆将被兑换至您的游戏终端机内，需进入终端机特殊物品领取处领取（终端机主页面右上角入口）。</p>
                        <p class="form-text" style="margin: 0 !important;">*该操作不能回退，兑换前请三思！</p>
                        <p class="form-text" style="margin: 0 !important;">*进入终端机后，有效期为7天，请及时领取！</p>
                    </template>
                    <!-- 满改券兑换（直接兑换到玩家账户） -->
                    <template v-if="(exchangeItemCategory === 4 && exchangeItemName === '初始满马力券')">
                        <p class="form-text" style="margin: 0 !important;">*满改券将被直接兑换至您的账户内。可在下一次新建车辆时使用。</p>
                        <p class="form-text" style="margin: 0 !important;">*该操作不能回退，兑换前请三思！</p>
                    </template>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        @click="closeModal()">取消</button>
                    <button type="button" class="btn btn-success" id="exchangeItemModalBtn" @click="exchangeItem()">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                            id="exchangeItemModalBtnSpinner" hidden></span>
                        兑换
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
            // 物品列表
            userInventory: [],
            selectedCategory: 0, // 当前选中的物品种类
            picsPath: 'https://pics-a1c.pages.dev', // 图床链接
            currentPage: 1, // 分页初始页
            itemsPerPage: 16, // 每页显示物品个数
            // Modal
            selectedCarId: null,
            targetCarName: null,
            exchangeItemCategory: null,
            exchangeItemTypeName: null,
            exchangeItemName: null,
            exchangeItemDbId: null,
            userCarList: [],
            checkTimeOutIntervalId: null // 检查超时定时器
        }
    },
    methods: {
        getUserInventory() {
            document.getElementById('floatingSelect_ItemCategory').setAttribute('disabled', 'disabled');
            axios.post('/api/getInventory', {
                userQQ: this.userInfo.userInfo.userQQ,
                userPassword: this.userInfo.userInfo.userPassword
            }, {
                timeout: 10000 // 10s超时
            }).then(response => {
                if (response.data.inventoryStatus) {
                    this.userInventory = response.data.userItems;
                } else {
                    toast("获取物品列表失败\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
            }).catch(error => {
                console.log(error);
                toast("获取物品列表失败\n发生了错误：\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
            }).finally(() => {
                const ItemCategorySelect = document.getElementById('floatingSelect_ItemCategory');
                if (ItemCategorySelect) {
                    document.getElementById('floatingSelect_ItemCategory').removeAttribute('disabled');
                }
            });
        },
        exchangeItemBtn_Click(typeName, name, category, dbId) {
            // 禁用按钮并启用Spinner
            document.getElementById(`exchangeItemBtn_${dbId}`).setAttribute('disabled', 'disabled');
            document.getElementById(`exchangeItemBtnSpinner_${dbId}`).removeAttribute('hidden');
            // 重置数据
            this.selectedCarId = null;
            this.targetCarName = null;
            this.exchangeItemCategory = category;
            this.exchangeItemTypeName = typeName;
            this.exchangeItemName = name;
            this.exchangeItemDbId = dbId;
            if (typeof window !== 'undefined') {
                import('bootstrap').then(({ Modal }) => {
                    const exchangeItem_StaticBackdrop = new Modal(document.getElementById('exchangeItem_StaticBackdrop'), {
                        keyboard: false
                    });
                    exchangeItem_StaticBackdrop.show();
                    if (!(this.exchangeItemCategory === 4 && this.exchangeItemName === '初始满马力券')) {
                        if (this.exchangeItemCategory !== 6) {
                            setTimeout(() => {
                                this.fetchCarList();
                            }, 300);
                        }
                    }
                });
            }
        },
        exchangeItem() {
            document.getElementById('exchangeItemModalBtn').setAttribute('disabled', 'disabled');
            document.getElementById('exchangeItemModalBtnSpinner').removeAttribute('hidden');
            axios.post('/api/exchangeItem', {
                operateQQ: this.userInfo.userInfo.userQQ,
                userPassword: this.userInfo.userInfo.userPassword,
                targetCarId: this.selectedCarId,
                itemCategory: this.exchangeItemCategory,
                itemDbId: this.exchangeItemDbId
            }, {
                timeout: 10000 // 10s超时
            }).then(response => {
                if (response.data.exchangeStatus) {
                    toast(response.data.message, {
                        "theme": "colored",
                        "type": "success",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    });
                    document.getElementById(`exchangeItemBtn_${this.exchangeItemDbId}`).removeAttribute('disabled');
                    document.getElementById(`exchangeItemBtnSpinner_${this.exchangeItemDbId}`).hidden = true;
                    // 删除已经兑换的物品
                    for (let i = 0; i < this.userInventory.length; i++) {
                        if (this.userInventory[i].dbId === this.exchangeItemDbId) {
                            this.userInventory.splice(i, 1);
                            break;
                        }
                    }
                    if (response.data.fttTickets) {
                        let userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
                        userInfo.fullTuneTicketNumber = response.data.fttTickets;
                        sessionStorage.setItem('UserInfo', JSON.stringify(userInfo));
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
                toast("兑换物品失败\n发生了错误：\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                });
            }).finally(() => {
                document.getElementById('exchangeItemModalBtn').removeAttribute('disabled');
                document.getElementById('exchangeItemModalBtnSpinner').setAttribute('hidden', 'hidden');
                this.selectedCarId = null;
                this.exchangeItemCategory = null;
                this.exchangeItemTypeName = null;
                this.exchangeItemName = null;
                this.exchangeItemDbId = null;
                if (typeof window !== 'undefined') {
                    import('bootstrap').then(({ Modal }) => {
                        const exchangeItem_StaticBackdrop = Modal.getInstance(document.getElementById('exchangeItem_StaticBackdrop'));
                        exchangeItem_StaticBackdrop.hide();
                    });
                }
            });
        },
        closeModal() {
            document.getElementById(`exchangeItemBtn_${this.exchangeItemDbId}`).removeAttribute('disabled');
            document.getElementById(`exchangeItemBtnSpinner_${this.exchangeItemDbId}`).setAttribute('hidden', 'hidden');
        },
        fetchCarList() {
            document.getElementById('refetchCarListButton').setAttribute('disabled', 'disabled');
            document.getElementById('floatingSelectCarId').setAttribute('disabled', 'disabled');
            axios.post('/api/carList', {
                userId: this.userInfo.userInfo.userId
            }, {
                timeout: 10000
            }).then(response => {
                if (response.data.fetchStatus === true) {
                    this.userCarList = response.data.car;
                } else {
                    toast(response.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.selectedCarId = null;
                document.getElementById('refetchCarListButton').removeAttribute('disabled');
                document.getElementById('floatingSelectCarId').removeAttribute('disabled');
            });
        },
        changePage(page) {
            this.currentPage = page;
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
        this.getUserInventory();
        this.checkTimeOutIntervalId = setInterval(() => {
            this.checkTimeExpired();
        }, 2000);
    },
    computed: {
        filteredItems() {
            if (Number(this.selectedCategory) === 0) {
                return this.userInventory;
            } else {
                return this.userInventory.filter(item => item.prizeCategory === Number(this.selectedCategory));
            }
        },
        totalPages() {
            if (this.filteredItems) {
                return Math.ceil(this.filteredItems.length / this.itemsPerPage);
            }
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            if (this.filteredItems) {
                return this.filteredItems.slice(start, end);
            }
        },
    },
    watch: {
        'selectedCarId': function (newVal, oldVal) {
            // 根据selectedCarId在userCarList中寻找车辆名字
            for (let i = 0; i < this.userCarList.length; i++) {
                if (this.userCarList[i].carId === this.selectedCarId) {
                    this.targetCarName = this.userCarList[i].carNameInfo;
                    break;
                }
            }
        }
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