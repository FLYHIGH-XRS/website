<template>
    <!-- 下拉选择框 -->
    <div class="row g-2" style="margin-top: 15px;">
        <div class="col-md">
            <div class="form-floating">
                <select class="form-select" id="floatingSelectGrid_Course" aria-label="Floating label select"
                    @change="getTimeAttackResult()">
                    <option value="0">C1内环</option>
                    <option value="1">C1外环</option>
                    <option value="2">新环线左环</option>
                    <option value="3">新环线右环</option>
                    <option value="4">副都心区域 涉谷线 · 新宿线</option>
                    <option value="5">副都心区域 池袋线 · 山手隧道</option>
                    <option value="6">湾岸线东行</option>
                    <option value="7">湾岸线西行</option>
                    <option value="8">横羽线下行</option>
                    <option value="9">横羽线上行</option>
                    <option value="10">八重洲线内环</option>
                    <option value="11">八重洲线外环</option>
                    <option value="12">横滨线内环</option>
                    <option value="13">横滨线外环</option>
                    <option value="14">名古屋环状线</option>
                    <option value="15">阪神高速环状线（大阪）</option>
                    <option value="16">阪神高速3号 · 临港道路（神户）</option>
                    <option value="17">福冈都市高速</option>
                    <option value="18">箱根去路</option>
                    <option value="19">箱根归路</option>
                    <option value="20">大观山上行</option>
                    <option value="21">大观山下行</option>
                    <option value="22">首都高一周（东京区域）</option>
                    <option value="23">首都高一周（神奈川区域）</option>
                    <option value="24">广岛高速</option>
                </select>
                <label for="floatingSelectGrid_Course">选择行走区域</label>
            </div>
        </div>
        <div class="col-md">
            <div class="form-floating">
                <select class="form-select" id="floatingSelectGrid_CarModel" aria-label="Floating label select"
                    @change="getTimeAttackResult()">
                    <option v-for="model in carModels" :key="model.visualModel" :value="model.visualModel">
                        {{ model.name }}</option>
                </select>
                <label for="floatingSelectGrid_CarModel">按车辆型号筛选</label>
            </div>
        </div>
    </div>

    <div v-if="leaderboard && leaderboard.length > 0">
        <p class="form-text" id="dataFetchTimeText" style="margin-top: 0;">数据获取时间：{{ this.leaderboard[0].fetchTime }}
        </p>
        <p class="form-text" id="fetchInfoText" style="margin-top: -20px;">※ 每10分钟获取一次数据 | 每页显示{{ this.itemsPerPage
            }}名次数据</p>
    </div>
    <p class="form-text" id="loadingText" style="font-size: large;" hidden>加载数据中......请稍候</p>

    <!-- 分页 -->
    <nav aria-label="Page navigation" v-if="totalPages() > 1" class="d-flex justify-content-end"
        style="margin-bottom: -20px; margin-top: -25px;">
        <ul class="pagination justify-content-center" style="list-style: none;">
            <li class="page-item page-item-vp-fix" :class="{ disabled: currentPage === 1 }">
                <a class="page-link page-link-vp-fix" href="#" @click.prevent="changePage(1)">&laquo;</a>
            </li>
            <li class="page-item page-item-vp-fix" :class="{ disabled: currentPage === 1 }">
                <a class="page-link page-link-vp-fix" href="#" @click.prevent="changePage(currentPage - 1)">&lsaquo;</a>
            </li>
            <li class="page-item page-item-vp-fix active">
                <a class="page-link page-link-vp-fix">{{ currentPage }}</a>
            </li>
            <li class="page-item page-item-vp-fix" :class="{ disabled: currentPage === totalPages() }">
                <a class="page-link page-link-vp-fix" href="#" @click.prevent="changePage(currentPage + 1)">&rsaquo;</a>
            </li>
            <li class="page-item page-item-vp-fix" :class="{ disabled: currentPage === totalPages() }">
                <a class="page-link page-link-vp-fix" href="#" @click.prevent="changePage(totalPages())">&raquo;</a>
            </li>
        </ul>
    </nav>

    <!-- 电脑端布局 -->
    <table class="table table-striped table-hover pc_table" id="pc_table" style="width: 100%; table-layout: fixed;">
        <thead>
            <tr class="table-header">
                <th scope="col">排名</th>
                <th scope="col">名字 / 队名</th>
                <th scope="col">总用时</th>
                <th scope="col">车辆型号</th>
                <th scope="col">操控等级</th>
                <th scope="col">等级</th>
            </tr>
        </thead>
        <tbody>
            <tr class="table-row" style="cursor: pointer;" v-for="(entry, index) in getPaginatedData()" :key="index"
                title="点击查看此项详细数据" @click="this.modalData = entry" data-bs-target="#detailModal" data-bs-toggle="modal">
                <td :class="getRowClass(index)">
                    <div style="font-weight: bolder;">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</div>
                </td>
                <td :class="getRowClass(index)">
                    <div style="font-weight: bolder;">{{ entry.car.name }}</div><br>
                    <div style="font-size: 11px; margin-top: -30px;">{{ entry.car.windowStickerString }}</div>
                </td>
                <td :class="getRowClass(index)">
                    <div style="font-weight: bolder;">{{ entry.totalTime }}</div>
                </td>
                <td :class="getRowClass(index)">
                    <img :src="picsPath + '/wmmt/carModels/' + entry.car.visualModel + '.png'" class="img-thumbnail"
                        :alt="entry.carName" style="background: black; width: 150px;">
                </td>
                <td :class="getRowClass(index)">{{ entry.controlLevel }}</td>
                <td style="padding: 0px;" :class="getRowClass(index)">
                    <img :src="picsPath + '/wmmt/level/' + entry.car.level + '.png'" class="img-fluid"
                        :alt="entry.car.level" style="width: 200px;">
                </td>
            </tr>
        </tbody>
    </table>

    <!-- 手机端布局 -->
    <table class="table table-striped table-hover mobile_table" id="mobile_table"
        style="width: 100%; table-layout: fixed;">
        <tbody>
            <tr class="rankingBody mobile_table_body" v-for="(entry, index) in getPaginatedData()" :key="index"
                title="点击查看此项详细数据" @click="this.modalData = entry" data-bs-target="#detailModal" data-bs-toggle="modal">
                <th class="rank form-text" :class="getRowClass(index)">{{ index + 1 + (currentPage - 1) * itemsPerPage
                    }}</th>
                <td class="name form-text">
                    <div style="font-weight: bolder;">{{ entry.car.name }}</div>
                </td>
                <td class="control form-text">{{ entry.controlLevel }}</td>
                <td class="time form-text">
                    <div style="font-weight: bolder;">{{ entry.totalTime }}</div>
                </td>
                <td class="type form-text">
                    <img :src="picsPath + '/wmmt/carModels/' + entry.car.visualModel + '.png'" class="img-thumbnail"
                        :alt="entry.carName" style="background: black; margin-bottom: 8px;">
                </td>
                <td class="level form-text">
                    <img :src="picsPath + '/wmmt/level/' + entry.car.level + '.png'" :alt="entry.car.level"
                        style="margin-top: 15px;">
                </td>
                <td class="teamName form-text">
                    <p style="margin-top: 11px; font-size: 11px">{{ entry.car.windowStickerString }}</p>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- 详细数据 -->
    <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="detailModalLabel">详细数据</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card" style="width: 100%;">
                        <div class="card-body">
                            <h5 class="card-title" style="font-size: larger; font-weight:">{{
                                this.modalData.car.name }}</h5>
                            <p class="card-text" style="margin-top: -5px; margin-bottom: -10px;">{{
                                this.modalData.carName }}</p>
                        </div>
                        <ul class="list-group list-group-flush lg-vp-ul-fix">
                            <li class="list-group-item lg-vp-li-fix">游玩时间：{{ this.modalData.playedAtTime }}</li>
                            <li class="list-group-item lg-vp-li-fix">总用时：{{ this.modalData.totalTime }}</li>
                            <li class="list-group-item lg-vp-li-fix">行走区域：{{ this.modalData.racingCourse }}</li>
                            <li class="list-group-item lg-vp-li-fix">操控等级：{{ this.modalData.controlLevel }}</li>
                        </ul>
                    </div>
                    <div class="card" style="width: 100%; margin-top: 10px;">
                        <div class="card-header">
                            分段用时
                        </div>
                        <ul class="list-group list-group-flush lg-vp-ul-fix">
                            <li class="list-group-item lg-vp-li-fix">CP1: {{ this.modalData.sec1Time }}</li>
                            <li class="list-group-item lg-vp-li-fix">CP2: {{ this.modalData.sec2Time }}</li>
                            <li class="list-group-item lg-vp-li-fix">CP3: {{ this.modalData.sec3Time }}</li>
                            <li class="list-group-item lg-vp-li-fix">CP4: {{ this.modalData.sec4Time }}</li>
                            <li v-if="Number(modalData.sec5Time) !== 0" class="list-group-item">CP5: {{
                                modalData.sec5Time }}</li>
                            <li v-if="Number(modalData.sec6Time) !== 0" class="list-group-item">CP6: {{
                                modalData.sec6Time }}</li>
                            <li v-if="Number(modalData.sec7Time) !== 0" class="list-group-item">CP7: {{
                                modalData.sec7Time }}</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import carModels from '../../static/json/cars.json';

export default {
    name: "TimeAttackView",
    data() {
        return {
            carModels: carModels, // 车辆型号数据
            leaderboard: [], // 排名数据
            itemsPerPage: 20, // 每页条数
            currentPage: 1, // 当前页
            picsPath: 'https://pics-a1c.pages.dev', // 图片URL
            modalData: {
                car: {
                    name: null,
                },
                carName: null,
                totalTime: null,
                controlLevel: null,
            }, // 用于存储模态框数据
        }
    },
    methods: {
        getTimeAttackResult() {
            this.leaderboard = [];
            // 禁用下拉框
            document.getElementById('floatingSelectGrid_Course').setAttribute('disabled', 'disabled');
            document.getElementById('floatingSelectGrid_CarModel').setAttribute('disabled', 'disabled');
            // 显示加载中文本
            document.getElementById('loadingText').hidden = false;
            // 隐藏表格
            document.getElementById('pc_table').hidden = true;
            document.getElementById('mobile_table').hidden = true;
            // 获取数据
            axios.post('/api/timeattack', {
                course: document.getElementById('floatingSelectGrid_Course').value,
                carModel: document.getElementById('floatingSelectGrid_CarModel').value
            }).then((response) => {
                // 如果没有数据则返回
                if (response.data.length === 0) {
                    this.leaderboard = [];
                    document.getElementById('loadingText').innerHTML = '暂无数据';
                } else {
                    this.leaderboard = response.data || [];
                    this.changePage(1);
                }
            }).catch((error) => {
                console.log(error);
            })
                .finally(() => {
                    // 恢复下拉框
                    document.getElementById('floatingSelectGrid_Course').removeAttribute('disabled');
                    document.getElementById('floatingSelectGrid_CarModel').removeAttribute('disabled');
                    if (this.leaderboard.length === 0) {
                        document.getElementById('loadingText').innerHTML = '暂无数据';
                        document.getElementById('loadingText').hidden = false;
                    } else {
                        document.getElementById('loadingText').innerHTML = '加载数据中......请稍候';
                        document.getElementById('loadingText').hidden = true;
                    }
                    // 显示表格
                    document.getElementById('pc_table').hidden = false;
                    document.getElementById('mobile_table').hidden = false;
                });
        },
        getRowClass(index) {
            if (index === 0 && this.currentPage === 1) {
                return 'gold';
            } else if (index === 1 && this.currentPage === 1) {
                return 'silver';
            } else if (index === 2 && this.currentPage === 1) {
                return 'bronze';
            } else {
                return;
            }
        },
        changePage(page) {
            this.currentPage = page;
        },
        getPaginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.leaderboard.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.leaderboard.length / this.itemsPerPage);
        },
    },
    mounted() {
        this.getTimeAttackResult();
    }
}
</script>

<style scoped>
.lg-vp-ul-fix {
    padding-left: 0 !important;
    margin: 0 !important;
}

.lg-vp-li-fix {
    margin-top: 0 !important;
}

.gold {
    color: black;
    background: linear-gradient(to bottom, rgba(252, 236, 114, 1) 0%, rgba(255, 239, 117, 1) 0%, rgba(251, 239, 119, 1) 1%, rgba(255, 240, 125, 1) 2%, rgba(254, 239, 120, 1) 4%, rgba(255, 240, 121, 1) 6%, rgba(255, 246, 145, 1) 27%, rgba(255, 246, 143, 1) 30%, rgba(255, 247, 149, 1) 33%, rgba(253, 248, 154, 1) 33%, rgba(254, 248, 162, 1) 38%, rgba(255, 248, 167, 1) 39%, rgba(255, 252, 175, 1) 44%, rgba(255, 250, 169, 1) 45%, rgba(254, 250, 176, 1) 46%, rgba(252, 252, 178, 1) 47%, rgba(255, 251, 170, 1) 48%, rgba(255, 251, 170, 1) 48%, rgba(254, 239, 146, 1) 49%, rgba(250, 231, 139, 1) 49%, rgba(255, 227, 128, 1) 50%, rgba(255, 230, 130, 1) 50%, rgba(255, 228, 125, 1) 51%, rgba(255, 227, 128, 1) 52%, rgba(252, 224, 124, 1) 52%, rgba(255, 224, 123, 1) 53%, rgba(255, 213, 111, 1) 60%, rgba(255, 214, 106, 1) 60%, rgba(254, 211, 99, 1) 63%, rgba(255, 208, 90, 1) 64%, rgba(255, 208, 90, 1) 66%, rgba(255, 208, 84, 1) 66%, rgba(254, 204, 81, 1) 67%, rgba(227, 179, 55, 1) 83%, rgba(222, 174, 50, 1) 85%, rgba(223, 175, 51, 1) 86%, rgba(217, 169, 45, 1) 88%, rgba(208, 163, 38, 1) 94%, rgba(207, 161, 41, 1) 97%, rgba(205, 159, 39, 1) 99%, rgba(197, 159, 58, 1) 100%, rgba(185, 147, 46, 1) 100%);
}

.silver {
    color: black;
    background: linear-gradient(to bottom, rgba(223, 223, 223, 1) 0%, rgba(220, 220, 220, 1) 0%, rgba(225, 225, 225, 1) 1%, rgba(221, 221, 221, 1) 1%, rgba(224, 224, 224, 1) 2%, rgba(222, 222, 222, 1) 24%, rgba(223, 223, 223, 1) 46%, rgba(221, 221, 221, 1) 49%, rgba(195, 195, 195, 1) 50%, rgba(187, 187, 187, 1) 50%, rgba(185, 185, 185, 1) 51%, rgba(187, 187, 187, 1) 51%, rgba(185, 185, 185, 1) 52%, rgba(187, 187, 187, 1) 53%, rgba(185, 185, 185, 1) 53%, rgba(187, 187, 187, 1) 58%, rgba(183, 183, 183, 1) 69%, rgba(184, 184, 184, 1) 77%, rgba(180, 180, 180, 1) 89%, rgba(180, 180, 180, 1) 100%);
}

.bronze {
    color: black;
    background: linear-gradient(to bottom, rgba(240, 191, 147, 1) 0%, rgba(241, 193, 142, 1) 3%, rgba(247, 196, 149, 1) 6%, rgba(248, 198, 148, 1) 10%, rgba(246, 196, 145, 1) 18%, rgba(238, 189, 142, 1) 23%, rgba(238, 189, 143, 1) 25%, rgba(219, 175, 135, 1) 35%, rgba(219, 175, 137, 1) 37%, rgba(207, 166, 129, 1) 44%, rgba(207, 164, 132, 1) 47%, rgba(207, 164, 127, 1) 47%, rgba(205, 164, 126, 1) 49%, rgba(204, 162, 129, 1) 49%, rgba(201, 160, 127, 1) 50%, rgba(196, 154, 128, 1) 50%, rgba(195, 152, 132, 1) 51%, rgba(196, 156, 130, 1) 54%, rgba(209, 163, 135, 1) 63%, rgba(235, 183, 145, 1) 77%, rgba(246, 191, 150, 1) 86%, rgba(246, 191, 150, 1) 94%, rgba(238, 186, 147, 1) 97%, rgba(235, 184, 147, 1) 100%);
}

.page-item-vp-fix {
    margin-top: 0px !important;
}

.page-link-vp-fix {
    text-decoration: none !important;
}

.table tr th {
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
}

.table tr td {
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
}

.pc_table {
    display: block;
}

.mobile_table {
    display: none;
}

@media (max-width: 768px) {
    .pc_table {
        display: none;
    }

    .mobile_table {
        display: block;
    }

    .mobile_table_body {
        display: block;
    }

    .rankingBody {
        font-size: 12px;
        overflow: hidden;
        height: auto;
        position: relative;
    }

    .rankingBody td {
        box-sizing: border-box;
        float: left;
        padding: 8px;
        text-align: center;
    }

    .rankingBody th.rank {
        width: 32767px;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
    }

    .rankingBody td.name {
        width: 33.333%;
        padding-bottom: 32767px;
        margin-bottom: -32767px;
        margin-top: -0.6px;
    }

    .rankingBody td.control {
        width: 33.333%;
        padding-bottom: 32767px;
        margin-bottom: -32767px;
        margin-top: -0.6px;
    }

    .rankingBody td.time {
        width: 33.333%;
        padding-bottom: 32767px;
        margin-bottom: -32767px;
        margin-top: -0.6px;
    }

    .rankingBody td.type {
        width: 33.333%;
        text-align: center;
        padding-bottom: 32767px;
        margin-bottom: -32767px;
        clear: both;
    }

    .rankingBody td.level {
        width: 33.333%;
        text-align: center;
        padding-bottom: 32767px;
        margin-bottom: -32767px;
    }

    .rankingBody td.teamName {
        width: 33.333%;
        padding-bottom: 32767px;
        margin-bottom: -32767px;
    }
}
</style>