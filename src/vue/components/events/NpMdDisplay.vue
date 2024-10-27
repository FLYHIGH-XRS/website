<template>
    <div class="rankPlate">
        <div class="rankPlateInner">
            <dl>
                <dt>排名前{{ rank }}名（{{ goldPlateName }}）</dt>
                <dd>
                    <div class="clearfix">
                        <figure class="center"><img :src="goldPlate" :alt="goldPlate">
                        </figure>
                    </div>
                </dd>
                <dt>参与奖（{{ normalPlateName }}）</dt>
                <dd>
                    <div class="clearfix">
                        <figure><img :src="namePlate1" :alt="namePlate1"></figure>
                        <figure><img :src="namePlate2" :alt="namePlate2"></figure>
                    </div>
                </dd>
            </dl>
            <p class="form-text p-vp-fix" style="margin-top: 10px;">※ 正赛结束后统计最终成绩后，即可在湾岸终端机查看到已发放的奖品</p>
            <p class="form-text p-vp-fix">※ “排名前{{ rank }}奖”将颁发给最终排名前{{ rank }}名的车辆</p>
            <p class="form-text p-vp-fix">※ 该图像仅供参考，实际以游戏内显示为准</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        rank: {
            type: String,
            required: true
        },
        goldPlateName: {
            type: String,
            required: true
        },
        goldPlate: {
            type: String,
            required: true
        },
        normalPlateName: {
            type: String,
            required: true
        },
        namePlate1: {
            type: String,
            required: true
        },
        namePlate2: {
            type: String,
            required: true
        }
    },
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