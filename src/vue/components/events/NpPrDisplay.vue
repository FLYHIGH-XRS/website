<template>
    <div class="rankPlate">
        <div class="rankPlateInner">
            <dl style="margin-bottom: 10px;">
                <!-- 预赛铭牌1 -->
                <dt>{{ namePlate1Name }}</dt>
                <dd>
                    <div class="clearfix">
                        <figure><img :src="namePlate1Src1" :alt="namePlate1Name"></figure>
                        <figure v-if="namePlate1Src2"><img :src="namePlate1Src2" :alt="namePlate1Name"></figure>
                        <figure v-if="namePlate1Src3"><img :src="namePlate1Src3" :alt="namePlate1Name"></figure>
                        <figure v-if="namePlate1Src4"><img :src="namePlate1Src4" :alt="namePlate1Name"></figure>
                    </div>
                </dd>
                <!-- 预赛铭牌2 -->
                <dt>{{ namePlate2Name }}</dt>
                <dd>
                    <div class="clearfix">
                        <figure><img :src="namePlate2Src1" :alt="namePlate2Name"></figure>
                        <figure v-if="namePlate2Src2"><img :src="namePlate2Src2" :alt="namePlate2Name"></figure>
                        <figure v-if="namePlate2Src3"><img :src="namePlate2Src3" :alt="namePlate2Name"></figure>
                        <figure v-if="namePlate2Src4"><img :src="namePlate2Src4" :alt="namePlate2Name"></figure>
                    </div>
                </dd>
                <!-- 预赛铭牌3 -->
                <dt>{{ namePlate3Name }}</dt>
                <dd>
                    <div class="clearfix">
                        <figure><img :src="namePlate3Src1" :alt="namePlate3Name"></figure>
                        <figure v-if="namePlate3Src2"><img :src="namePlate3Src2" :alt="namePlate3Name"></figure>
                        <figure v-if="namePlate3Src3"><img :src="namePlate3Src3" :alt="namePlate3Name"></figure>
                        <figure v-if="namePlate3Src4"><img :src="namePlate3Src4" :alt="namePlate3Name"></figure>
                    </div>
                </dd>
                <!-- 预赛铭牌4 -->
                <dt>{{ namePlate4Name }}</dt>
                <dd>
                    <div class="clearfix">
                        <figure><img :src="namePlate4Src1" :alt="namePlate4Name"></figure>
                        <figure v-if="namePlate4Src2"><img :src="namePlate4Src2" :alt="namePlate4Name"></figure>
                        <figure v-if="namePlate4Src3"><img :src="namePlate4Src3" :alt="namePlate4Name"></figure>
                        <figure v-if="namePlate4Src4"><img :src="namePlate4Src4" :alt="namePlate4Name"></figure>
                    </div>
                </dd>
            </dl>
            <p class="form-text p-vp-fix" style="margin-top: 10px;">※ 展示的铭牌是本次比赛 <{{ ocmName }}> 的限定奖品</p>
            <p class="form-text p-vp-fix">※ 铭牌仅发放至参加比赛的车辆</p>
            <p class="form-text p-vp-fix">※ 请注意，它无法通过其他方法获得</p>
            <p class="form-text p-vp-fix">※ 该图像仅供参考</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // OCM名字
        ocmName: { type: String, required: true },
        // 第一个铭牌
        namePlate1Name: { type: String, required: true },
        namePlate1Src1: { type: String, required: true },
        namePlate1Src2: { type: String, required: false },
        namePlate1Src3: { type: String, required: false },
        namePlate1Src4: { type: String, required: false },
        // 第二个铭牌
        namePlate2Name: { type: String, required: true },
        namePlate2Src1: { type: String, required: true },
        namePlate2Src2: { type: String, required: false },
        namePlate2Src3: { type: String, required: false },
        namePlate2Src4: { type: String, required: false },
        // 第三个铭牌
        namePlate3Name: { type: String, required: true },
        namePlate3Src1: { type: String, required: true },
        namePlate3Src2: { type: String, required: false },
        namePlate3Src3: { type: String, required: false },
        namePlate3Src4: { type: String, required: false },
        // 第四个铭牌
        namePlate4Name: { type: String, required: true },
        namePlate4Src1: { type: String, required: true },
        namePlate4Src2: { type: String, required: false },
        namePlate4Src3: { type: String, required: false },
        namePlate4Src4: { type: String, required: false },
    }
}
</script>

<style scoped>
.p-vp-fix {
    margin: 0;
    line-height: normal;
}

.rankPlate .rankPlateInner dl {
    border-top: #9da1a7 1px solid;
    margin-top: 20px;
    margin-bottom: 0;
}

.rankPlate .rankPlateInner dl dt {
    font-size: 16px;
    line-height: 140%;
    font-weight: bold;
    text-align: center;
    padding: 14px 30px;
    overflow: hidden;
    position: relative;
    border-left: #9da1a7 1px solid;
    border-right: #9da1a7 1px solid;
}

.rankPlate .rankPlateInner dl dd {
    border: #9da1a7 1px solid;
    padding: 10px 0;
    margin-bottom: 0;
}

.rankPlate .rankPlateInner dl dd div figure {
    float: left;
    width: 50%;
    padding: 0 15px 0 0;
    height: 105px;
    overflow: hidden;
}

.rankPlate .rankPlateInner dl dd div figure.center {
    clear: both;
    float: none;
    margin: 0 auto;
}

@media screen and (max-width:700px) {
    .rankPlate .rankPlateInner dl dt {
        font-size: 14px;
        padding: 12px 10px;
    }

    .rankPlate .rankPlateInner dl dd {
        padding: 6px 0;
    }

    .rankPlate .rankPlateInner dl dd div figure {
        float: none;
        width: 100%;
        padding: 0 10px 0 0;
        height: auto;
    }

    .rankPlate .rankPlateInner dl dd div figure.center {
        clear: both;
        float: none;
        margin: 0 auto;
    }
}
</style>