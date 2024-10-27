<template>
    <div id="daily_customFrame">
        <img class="customFramePic" :src="getCustomFramePic(todayFrame)" :alt="todayFrame">
        <h2 class="frameTitle">{{ todayFrame }}</h2>
    </div>
</template>

<script>
import * as customFrame from "../../static/js/customFrame.js";
import customFrames from "../../static/json/customFrames.json";

import 'bootstrap/dist/css/bootstrap.css'

export default {
    data() {
        return {
            todayFrame: "湾岸の新人"
        }
    },
    methods: {
        getCustomFramePic(itemName) {
            for (let i = 0; i < customFrames.length; i++) {
                if (customFrames[i].customFrame === itemName) {
                    return customFrames[i].src;
                }
            }
        }
    },
    mounted() {
        this.todayFrame = customFrame.todayFrame;
    }
}
</script>

<style scoped>
#daily_customFrame {
    text-align: center;
    align-items: center;
}

.frameTitle {
    margin: 0;
    padding-top: 5px;
    font-size: 18px;
    font-weight: bold;
    line-height: 140%;
    position: relative;
    text-align: center;
    border-top: 0;
}

.customFramePic {
    display: block;
    margin: 0 auto;
}
</style>