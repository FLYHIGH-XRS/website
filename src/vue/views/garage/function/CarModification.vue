<template>
    <!-- 车辆选择 -->
    <div class="row g-2" style="margin-top: 10px;">
        <div class="col-12 col-md-9">
            <div class="form-floating">
                <select class="form-select" id="floatingSelectGrid_CarSelect" v-model="selectedCarId"
                    @change="getCarInfo()">
                    <option value="0" selected disabled>请选择车辆</option>
                    <option v-for="car in carList" :value="car.carId" :key="car.carId">{{ car.carNameInfo }}</option>
                </select>
                <label for="floatingSelectGrid_CarSelect">车辆选择</label>
            </div>
        </div>
        <div class="col-12 col-md-3">
            <button type="button" class="btn btn-primary w-100 h-100" style="white-space: nowrap;"
                id="refetchCarListBtn" @click="refetchCarList()">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                    id="refetchCarListBtnSpinner" hidden></span>
                重新获取
            </button>
        </div>
    </div>
    <div>
        <p class="form-text-sl" id="currentSelectedCarIdText" v-if="selectedCarId">当前选择的carId: {{ selectedCarId }}</p>
        <p class="form-text-sl" id="currentSelectedCarIdText" v-else>当前未选择车辆</p>
    </div>
    <p class="form-text-sl" id="currentSelectedCarIdText">请在游戏关闭时使用！否则有可能导致数据被二次覆盖！</p>
    <!-- 功能区 -->
    <div class="row g-2" style="margin-top: 0;">
        <!-- 基础数据 -->
        <div class="col-12 col-md-8">
            <div class="card h-100 w-100">
                <div class="card-header">
                    基础数据
                </div>
                <div class="card-body">
                    <div class="row g-2">
                        <!-- 名称 -->
                        <div class="col-12 col-md-6">
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="floatingInput_CarName" placeholder="请输入车辆名称"
                                    v-model="input_CarName" disabled>
                                <label for="floatingInput">名称</label>
                                <div class="form-text">最多5位，限制全角输入</div>
                            </div>
                        </div>
                        <!-- 等级 -->
                        <div class="col-12 col-md-6">
                            <div class="form-floating mb-2">
                                <select class="form-select" id="floatingSelect_CarLevel"
                                    aria-label="Floating label select" v-model="input_CarLevel" disabled>
                                    <option value="0" selected disabled>请选择车辆等级</option>
                                    <option v-for="level in carData.carLevels" :value="level.value" :key="level.value">
                                        {{ level.label }}</option>
                                </select>
                                <label for="floatingSelect_CarLevel">等级</label>
                                <div class="form-text">当前允许上限为SSS9</div>
                            </div>
                        </div>
                        <!-- 称号 -->
                        <div class="col-12 col-md-6">
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="floatingInput_CarTitle"
                                    placeholder="请输入车辆称号" v-model="input_CarTitle" disabled>
                                <label for="floatingInput">称号</label>
                                <div class="form-text">最多10位</div>
                            </div>
                        </div>
                        <!-- 公里数 -->
                        <div class="col-12 col-md-6">
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="floatingInput_CarOdoMeter"
                                    placeholder="请输入车辆公里数" v-model="input_CarOdoMeter" disabled>
                                <label for="floatingInput">行驶公里数</label>
                                <div class="form-text">范围：0~495000km</div>
                            </div>
                        </div>
                        <!-- 化身奖杯数 -->
                        <div class="col-12 col-md-6">
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="floatingInput_CarRgTrophy"
                                    placeholder="请输入车辆化身奖杯数" v-model="input_CarRgTrophy" disabled>
                                <label for="floatingInput">化身奖杯数</label>
                                <div class="form-text">范围：0~100</div>
                            </div>
                        </div>
                        <!-- 车牌号 -->
                        <div class="col-12 col-md-6">
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="floatingInput_CarPlateNumber"
                                    placeholder="请输入车牌号" v-model="input_CarPlateNumber" disabled>
                                <label for="floatingInput">车牌号</label>
                                <div class="form-text">范围：0~9999，0为初始车牌</div>
                            </div>
                        </div>
                    </div>
                    <!-- 车辆注册地区 -->
                    <div class="form-floating mb-2">
                        <select class="form-select" id="floatingSelect_CarRegionId" aria-label="Floating label select"
                            v-model="input_CarRegionId" disabled>
                            <option value="0" selected disabled>请选择车辆注册地区</option>
                            <option v-for="region in carData.carRegionIds" :value="region.value" :key="region.value">{{
                                region.label }}</option>
                        </select>
                        <label for="floatingSelect_CarRegionId">车辆注册地区</label>
                    </div>
                    <button type="button" class="btn btn-success" id="basicUpdateBtn" @click="updateCarData('Basic')"
                        disabled>
                        <span class="spinner-border spinner-border-sm" id="basicUpdateBtnSpinner" role="status"
                            aria-hidden="true" hidden></span>
                        提交修改
                    </button>
                </div>
            </div>
        </div>
        <!-- 故事 -->
        <div class="col-12 col-md-4">
            <div class="card h-100 w-100">
                <div class="card-header">
                    故事修改
                </div>
                <div class="card-body">
                    <div>
                        <h5 class="card-title" v-if="current_stNumber">当前已完成：{{ current_stNumber }}集</h5>
                        <h5 class="card-title" v-else>当前未选择车辆</h5>
                    </div>
                    <!-- 集数选择 -->
                    <div class="form-floating mb-2">
                        <select class="form-select" id="floatingSelect_CarStoryClearCount"
                            aria-label="Floating label select" v-model="input_CarStNumber" disabled>
                            <option value="0" selected disabled>请选择故事集数</option>
                            <option v-for="st in carData.stNumbers" :value="st.value" :key="st.value">{{ st.label }}
                            </option>
                        </select>
                        <label for="floatingSelect_CarStoryClearCount">选择故事集数</label>
                    </div>
                    <button type="button" class="btn btn-success" id="storyUpdateBtn" @click="updateCarData('Story')"
                        disabled>
                        <span class="spinner-border spinner-border-sm" id="storyUpdateBtnSpinner" role="status"
                            aria-hidden="true" hidden></span>
                        提交修改
                    </button>
                    <h6 class="card-subtitle mb-2 text-muted" style="margin-top: 10px;">⚠️ 使用前注意</h6>
                    <ul style="list-style-type: decimal; margin-top: -5px;">
                        <li class="card-text ct-vp-fix">故事修改只允许修改至每周目的最后一集。</li>
                        <li class="card-text ct-vp-fix">您必须完成每周目最后一集才能拿到其周目的奖励。</li>
                        <li class="card-text ct-vp-fix">若比赛输了，请立即按下机修键或直接退出游戏，否则您的连胜记录将会断掉。</li>
                        <li class="card-text ct-vp-fix">未满马力车辆将无法使用故事修改功能。</li>
                        <li class="card-text ct-vp-fix">服务器提供99-999共10个周目的修改。</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 高级 -->
        <div class="col-12 col-md-7">
            <div class="card h-100 w-100">
                <div class="card-header">
                    高级
                </div>
                <div class="card-body">
                    <div class="form-floating mb-2">
                        <select class="form-select" id="floatingSelect_CarWheel" aria-label="Floating label select"
                            v-model="input_CarWheel" disabled>
                            <option v-for="wheel in carData.carWheels" :value="wheel.value" :key="wheel.value">{{
                                wheel.label }}</option>
                        </select>
                        <label for="floatingSelect_CarWheel">轮毂选择</label>
                    </div>
                    <button type="button" class="btn btn-success" id="seniorUpdateBtn" @click="updateCarData('Senior')"
                        disabled>
                        <span class="spinner-border spinner-border-sm" id="seniorUpdateBtnSpinner" role="status"
                            aria-hidden="true" hidden></span>
                        提交修改
                    </button>
                </div>
            </div>
        </div>
        <!-- 其他 -->
        <div class="col-12 col-md-5">
            <div class="card text-bg-warning h-100 w-100">
                <div class="card-header">
                    其他
                </div>
                <div class="card-body">
                    <button type="button" class="btn btn-primary w-100 mb-1" id="getFullCarColorBtn"
                        @click="getAllCustomColor()" disabled>
                        <span class="spinner-border spinner-border-sm" id="getFullCarColorBtnSpinner" role="status"
                            aria-hidden="true" hidden></span>
                        获取全车检色
                    </button>
                    <p class="form-text"
                        style="line-height: normal; margin-bottom: 5px; color: rgba(33, 37, 41, 0.75);">
                        若该按钮不可用，则代表您的车已获取了全车检色或者该车辆不允许获取全车检色。</p>
                    <button type="button" class="btn btn-danger w-100 mb-1" id="deleteCarBtn" @click="deleteCar()"
                        disabled>
                        <span class="spinner-border spinner-border-sm" id="deleteCarBtnSpinner" role="status"
                            aria-hidden="true" hidden></span>
                        移除车辆
                    </button>
                    <p class="form-text"
                        style="line-height: normal; margin-bottom: 5px; color: rgba(33, 37, 41, 0.75);">
                        车辆会从您的游戏账户中移出。移出后非特殊原因，不可进行还原！请谨慎操作！<br>需注意：车辆仅为从您的卡中移出，并不代表直接从您的卡中删除。
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import * as carData from '../../../static/js/carModificationValues.js';
import * as validityCheck from '../../../static/js/validityCheck';

export default {
    data() {
        return {
            // 数值
            carData: {
                carLevels: carData.carLevels, // 所有车辆等级
                carRegionIds: carData.carRegionIds, // 所有车辆注册地区
                stNumbers: carData.stNumbers, // 所有车辆集数
                carWheels: carData.carWheels // 所有车辆轮毂
            },
            // 信息
            carList: null, // 车辆列表
            selectedCarId: 0, // 正在选择的车辆ID
            isFullCustomColor: null, // 是否已经全车检色
            // 基础修改
            input_CarName: null, // 名称
            input_CarLevel: 0, // 等级
            input_CarTitle: null, // 称号
            input_CarOdoMeter: null, // 公里数
            input_CarRgTrophy: null, // 化身奖杯数
            input_CarPlateNumber: null, // 车牌号
            input_CarRegionId: 0, // 车辆注册地区
            // 故事修改
            current_stNumber: 0, // 当前集数
            input_CarStNumber: 0, // 集数
            // 高级修改
            input_CarWheel: 0,
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
            checkTimeOutIntervalId: null // 检查超时定时器
        }
    },
    methods: {
        getCarList() {
            document.getElementById('floatingSelectGrid_CarSelect').setAttribute('disabled', 'disabled');
            document.getElementById('refetchCarListBtn').setAttribute('disabled', 'disabled');
            document.getElementById('refetchCarListBtnSpinner').hidden = false;
            axios.post('/api/carList', {
                userId: this.userInfo.userInfo.userId
            }, {
                timeout: 10000 // 10s超时
            }, { timeout: 10000 }).then((response) => {
                if (response.data.fetchStatus) {
                    this.carList = response.data.car;
                } else {
                    toast("获取车辆列表失败\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
            }).catch((error) => {
                console.log(error);
                toast("获取车辆列表失败\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
            }).finally(() => {
                document.getElementById('floatingSelectGrid_CarSelect').removeAttribute('disabled');
                document.getElementById('refetchCarListBtn').removeAttribute('disabled');
                document.getElementById('refetchCarListBtnSpinner').hidden = true;
            })
        },
        refetchCarList() {
            this.input_CarName = null; // 名称
            this.input_CarLevel = 0; // 等级
            this.input_CarTitle = null; // 称号
            this.input_CarOdoMeter = null; // 公里数
            this.input_CarRgTrophy = null; // 化身奖杯数
            this.input_CarPlateNumber = null; // 车牌号
            this.input_CarRegionId = 0; // 车辆注册地区
            this.input_CarStNumber = 0; // 集数
            this.input_CarWheel = 0; // 轮毂
            this.isFullCustomColor = null; // 是否已经全车检色
            this.selectedCarId = 0; // 正在选择的车辆ID
            const Ids = [
                'floatingSelectGrid_CarSelect',
                'refetchCarListBtn',
                // 基础修改
                'floatingInput_CarName',
                'floatingSelect_CarLevel',
                'floatingInput_CarTitle',
                'floatingInput_CarOdoMeter',
                'floatingInput_CarRgTrophy',
                'floatingInput_CarPlateNumber',
                'floatingSelect_CarRegionId',
                'basicUpdateBtn',
                // 故事修改
                'floatingSelect_CarStoryClearCount',
                'storyUpdateBtn',
                // 高级修改
                'floatingSelect_CarWheel',
                'seniorUpdateBtn',
                // 其他
                'getFullCarColorBtn',
                'deleteCarBtn'
            ]
            for (let i = 0; i < Ids.length; i++) {
                document.getElementById(Ids[i]).setAttribute('disabled', 'disabled');
            }
            // 获取车辆列表
            this.getCarList();
        },
        getCarInfo() {
            const Ids = [
                'floatingSelectGrid_CarSelect',
                'refetchCarListBtn',
                // 基础修改
                'floatingInput_CarName',
                'floatingSelect_CarLevel',
                'floatingInput_CarTitle',
                'floatingInput_CarOdoMeter',
                'floatingInput_CarRgTrophy',
                'floatingInput_CarPlateNumber',
                'floatingSelect_CarRegionId',
                'basicUpdateBtn',
                // 故事修改
                'floatingSelect_CarStoryClearCount',
                'storyUpdateBtn',
                // 高级修改
                'floatingSelect_CarWheel',
                'seniorUpdateBtn',
                // 其他
                'getFullCarColorBtn',
                'deleteCarBtn'
            ]
            for (let i = 0; i < Ids.length; i++) {
                document.getElementById(Ids[i]).setAttribute('disabled', 'disabled');
            }
            this.input_CarName = null; // 名称
            this.input_CarLevel = 0; // 等级
            this.input_CarTitle = null; // 称号
            this.input_CarOdoMeter = null; // 公里数
            this.input_CarRgTrophy = null; // 化身奖杯数
            this.input_CarPlateNumber = null; // 车牌号
            this.input_CarRegionId = 0; // 车辆注册地区
            this.current_stNumber = 0;
            this.input_CarStNumber = 0; // 集数
            this.input_CarWheel = 0; // 轮毂
            this.isFullCustomColor = null; // 是否已经全车检色
            axios.post('/api/getCarInfo', {
                carId: this.selectedCarId
            }, { timeout: 10000 }).then((response) => {
                if (response.data.fetchStatus) {
                    this.input_CarName = response.data.car.name; // 名称
                    this.input_CarLevel = response.data.car.level; // 等级
                    this.input_CarTitle = response.data.car.title; // 称号
                    this.input_CarOdoMeter = response.data.car.odometer; // 公里数
                    this.input_CarRgTrophy = response.data.car.rgTrophy; // 化身奖杯数
                    this.input_CarPlateNumber = response.data.car.plateNumber; // 车牌号
                    this.input_CarRegionId = response.data.car.regionId; // 车辆注册地区
                    this.current_stNumber = response.data.car.stClearCount; // 集数
                    this.input_CarStNumber = response.data.car.stClearCount; // 集数
                    this.input_CarWheel = response.data.car.wheel; // 轮毂
                    this.isFullCustomColor = response.data.car.isFullCustomColor; // 是否已经全车检色
                } else {
                    toast("获取车辆信息失败\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
            }).catch((error) => {
                console.log(error);
                toast("获取车辆信息失败\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
            }).finally(() => {
                let dIds = Ids;
                if (this.isFullCustomColor) {
                    dIds.splice(dIds.indexOf('getFullCarColorBtn'), 1);
                }
                for (let i = 0; i < dIds.length; i++) {
                    document.getElementById(dIds[i]).removeAttribute('disabled');
                }
            })
        },
        updateCarData(type) {
            const Ids = [
                'floatingSelectGrid_CarSelect',
                'refetchCarListBtn',
                // 基础修改
                'floatingInput_CarName',
                'floatingSelect_CarLevel',
                'floatingInput_CarTitle',
                'floatingInput_CarOdoMeter',
                'floatingInput_CarRgTrophy',
                'floatingInput_CarPlateNumber',
                'floatingSelect_CarRegionId',
                'basicUpdateBtn',
                // 故事修改
                'floatingSelect_CarStoryClearCount',
                'storyUpdateBtn',
                // 高级修改
                'floatingSelect_CarWheel',
                'seniorUpdateBtn',
                // 其他
                'getFullCarColorBtn',
                'deleteCarBtn'
            ]
            for (let i = 0; i < Ids.length; i++) {
                document.getElementById(Ids[i]).setAttribute('disabled', 'disabled');
            }
            if (type === 'Basic') {
                document.getElementById('basicUpdateBtnSpinner').hidden = false;
            } else if (type === 'Story') {
                // 检查故事修改是否符合要求
                const checkStatus = validityCheck.storyValidityCheck(this.current_stNumber, this.input_CarStNumber);
                if (!checkStatus.checkStatus) {
                    toast(checkStatus.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                    for (let i = 0; i < Ids.length; i++) {
                        document.getElementById(Ids[i]).removeAttribute('disabled');
                    }
                    // 清理所有数据
                    this.input_CarName = null; // 名称
                    this.input_CarLevel = 0; // 等级
                    this.input_CarTitle = null; // 称号
                    this.input_CarOdoMeter = null; // 公里数
                    this.input_CarRgTrophy = null; // 化身奖杯数
                    this.input_CarPlateNumber = null; // 车牌号
                    this.input_CarRegionId = 0; // 车辆注册地区
                    this.input_CarStNumber = 0; // 集数
                    this.input_CarWheel = 0; // 轮毂
                    this.isFullCustomColor = null; // 是否已经全车检色
                    // 重新获取车辆信息
                    this.getCarInfo();
                    document.getElementById('storyUpdateBtnSpinner').hidden = true;
                    return;
                }
                document.getElementById('storyUpdateBtnSpinner').hidden = false;
            } else if (type === 'Senior') {
                document.getElementById('seniorUpdateBtnSpinner').hidden = false;
            }
            axios.post('/api/modifyUpdate', {
                type: type,
                carId: this.selectedCarId,
                name: this.input_CarName,
                level: this.input_CarLevel,
                title: this.input_CarTitle,
                odometer: this.input_CarOdoMeter,
                rgTrophy: this.input_CarRgTrophy,
                plateNumber: this.input_CarPlateNumber,
                regionId: this.input_CarRegionId,
                wheel: this.input_CarWheel,
                stClearCount: this.input_CarStNumber,
                operateUserQQ: this.userInfo.userInfo.userQQ,
                userPassword: this.userInfo.userInfo.userPassword
            }, {
                timeout: 10000 // 10s
            }, { timeout: 10000 }).then((response) => {
                if (response.data.fetchStatus === true) {
                    toast("修改车辆信息成功！", {
                        "theme": "colored",
                        "type": "success",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                } else {
                    toast("修改车辆信息失败：\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
            }).catch((error) => {
                console.log(error);
                toast("修改车辆信息失败\n问题：\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
            }).finally(() => {
                for (let i = 0; i < Ids.length; i++) {
                    document.getElementById(Ids[i]).removeAttribute('disabled');
                }
                // 清理所有数据
                this.input_CarName = null; // 名称
                this.input_CarLevel = 0; // 等级
                this.input_CarTitle = null; // 称号
                this.input_CarOdoMeter = null; // 公里数
                this.input_CarRgTrophy = null; // 化身奖杯数
                this.input_CarPlateNumber = null; // 车牌号
                this.input_CarRegionId = 0; // 车辆注册地区
                this.input_CarStNumber = 0; // 集数
                this.input_CarWheel = 0; // 轮毂
                this.isFullCustomColor = null; // 是否已经全车检色
                // 重新获取车辆信息
                this.getCarInfo();
                // 隐藏按钮旋转提示
                if (type === 'Basic') {
                    document.getElementById('basicUpdateBtnSpinner').hidden = true;
                } else if (type === 'Story') {
                    document.getElementById('storyUpdateBtnSpinner').hidden = true;
                } else if (type === 'Senior') {
                    document.getElementById('seniorUpdateBtnSpinner').hidden = true;
                }
            });
        },
        getAllCustomColor() {
            const Ids = [
                'floatingSelectGrid_CarSelect',
                'refetchCarListBtn',
                // 基础修改
                'floatingInput_CarName',
                'floatingSelect_CarLevel',
                'floatingInput_CarTitle',
                'floatingInput_CarOdoMeter',
                'floatingInput_CarRgTrophy',
                'floatingInput_CarPlateNumber',
                'floatingSelect_CarRegionId',
                'basicUpdateBtn',
                // 故事修改
                'floatingSelect_CarStoryClearCount',
                'storyUpdateBtn',
                // 高级修改
                'floatingSelect_CarWheel',
                'seniorUpdateBtn',
                // 其他
                'getFullCarColorBtn',
                'deleteCarBtn'
            ]
            for (let i = 0; i < Ids.length; i++) {
                document.getElementById(Ids[i]).setAttribute('disabled', 'disabled');
            }
            document.getElementById('getFullCarColorBtnSpinner').hidden = false;
            axios.post('/api/giveFullCustomColor', {
                carId: this.selectedCarId,
                operateUserQQ: this.userInfo.userInfo.userQQ,
                userPassword: this.userInfo.userInfo.userPassword
            }, { timeout: 10000 }).then((response) => {
                if (response.data.giveStatus === true) {
                    toast("获取满车检色成功！\n请前往游戏终端机\n在您的车辆改装处即可更换车检色！", {
                        "theme": "colored",
                        "type": "success",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                } else {
                    toast("获取满车检色失败：\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
            }).catch((error) => {
                console.log(error);
                toast("获取满车检色失败\n问题：\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
            }).finally(() => {
                for (let i = 0; i < Ids.length; i++) {
                    document.getElementById(Ids[i]).removeAttribute('disabled');
                }
                document.getElementById('getFullCarColorBtnSpinner').hidden = true;
            });
        },
        deleteCar() {
            const Ids = [
                'floatingSelectGrid_CarSelect',
                'refetchCarListBtn',
                // 基础修改
                'floatingInput_CarName',
                'floatingSelect_CarLevel',
                'floatingInput_CarTitle',
                'floatingInput_CarOdoMeter',
                'floatingInput_CarRgTrophy',
                'floatingInput_CarPlateNumber',
                'floatingSelect_CarRegionId',
                'basicUpdateBtn',
                // 故事修改
                'floatingSelect_CarStoryClearCount',
                'storyUpdateBtn',
                // 高级修改
                'floatingSelect_CarWheel',
                'seniorUpdateBtn',
                // 其他
                'getFullCarColorBtn',
                'deleteCarBtn'
            ]
            for (let i = 0; i < Ids.length; i++) {
                document.getElementById(Ids[i]).setAttribute('disabled', 'disabled');
            }
            document.getElementById('deleteCarBtnSpinner').hidden = false;
            axios.post('/api/deleteCarFromUser', {
                carId: this.selectedCarId,
                operateUserQQ: this.userInfo.userInfo.userQQ,
                userPassword: this.userInfo.userInfo.userPassword
            }, { timeout: 10000 }).then(response => {
                if (response.data.deleteStatus === true) {
                    toast("移出成功！", {
                        "theme": "colored",
                        "type": "success",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                } else {
                    toast("移出失败：\n" + response.data.message, {
                        "theme": "colored",
                        "type": "error",
                        "position": "top-center",
                        "autoClose": 2000,
                        "dangerouslyHTMLString": true
                    })
                }
            }).catch(error => {
                console.log(error);
                toast("移出失败\n问题：\n" + error, {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center",
                    "autoClose": 2000,
                    "dangerouslyHTMLString": true
                })
            }).finally(() => {
                document.getElementById('deleteCarBtnSpinner').hidden = true;
                // 清理所有数据
                this.input_CarName = null; // 名称
                this.input_CarLevel = 0; // 等级
                this.input_CarTitle = null; // 称号
                this.input_CarOdoMeter = null; // 公里数
                this.input_CarRgTrophy = null; // 化身奖杯数
                this.input_CarPlateNumber = null; // 车牌号
                this.input_CarRegionId = 0; // 车辆注册地区
                this.input_CarStNumber = 0; // 集数
                this.input_CarWheel = 0; // 轮毂
                this.isFullCustomColor = null; // 是否已经全车检色
                // 取消车辆选择
                this.selectedCarId = 0;
                // 刷新车辆列表
                this.getCarList();
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
        }
        this.getCarList();
        this.checkTimeOutIntervalId = setInterval(() => {
            this.checkTimeExpired();
        }, 2000);
    },
    watch: {
        'input_CarStNumber': function (new_input_CarStNumber) {
            const options = document.getElementById('floatingSelect_CarStoryClearCount').options;
            for (let i = 0; i < options.length; i++) {
                const optionValue = parseInt(options[i].value, 10);
                if (optionValue > new_input_CarStNumber) {
                    options[i].removeAttribute('disabled');
                } else {
                    options[i].setAttribute('disabled', 'disabled');
                }
                if (optionValue > new_input_CarStNumber) {
                    for (let j = i + 1; j < options.length; j++) {
                        options[j].setAttribute('disabled', 'disabled');
                    }
                    break;
                }
            }
        }
    }
}
</script>

<style scoped>
.form-text {
    font-size: 12px !important;
    margin-top: 1px !important;
}

.form-text-sl {
    font-size: 12px !important;
    margin-bottom: -8px !important;
    margin: 0;
    color: var(--bs-secondary-color);
}

.card-header {
    font-size: 14px;
}

.ct-vp-fix {
    margin: 0 !important;
    line-height: normal !important;
    font-size: 14px;
}
</style>