<template>
    <div id="daily_title">
        <p class="syougou">
            <span id="syougou">
                {{ todayShogo }}
            </span>
        </p>
    </div>
</template>

<script>
import * as shogo from "../../static/js/shogo.js";
import 'bootstrap/dist/css/bootstrap.css'

export default {
    data() {
        return {
            todayShogo: "湾岸の新人"
        }
    },
    mounted() {
        this.todayShogo = shogo.syogo;
    }
}
</script>

<style scoped>
#daily_title p {
    margin: 7px;
    text-align: center;
    font-weight: bold;
    text-align: center;
    font-size: 130%;
    padding: 30px 10px;
    background-image: url(https://pic.imgdb.cn/item/66b3d2a16fe92525d5a26c34/shougou.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    position: relative;
    font-weight: bold;
    color: black;
    font-family: Microsoft YaHei, 微软雅黑, SimSun, sans-serif;
}

#daily_title p span {
    font-weight: bold;
}

#daily_title p:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(https://pic.imgdb.cn/item/66b3d2a16fe92525d5a26c35/shougou_left.png);
    background-repeat: no-repeat;
    background-position: left;
    background-size: auto 100%;
}

#daily_title p:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(https://pic.imgdb.cn/item/66b3d2a36fe92525d5a26c36/shougou_right.png);
    background-repeat: no-repeat;
    background-position: right;
    background-size: auto 100%;
}
</style>