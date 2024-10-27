<template>
    <div class="parts_wrap_03" style="margin-bottom: 20px; margin-top: 20px;">
        <figure style="max-width:600px;">
            <img :src="imgSrc" alt="image">
        </figure>
    </div>
    <div>
        <table style="margin: 0;">
            <tbody class="pcDisplay">
                <tr>
                    <th>预赛</th>
                    <th>正赛</th>
                </tr>
                <tr>
                </tr>
                <tr>
                    <td>{{ preRaceTime }}</td>
                    <td>{{ mainDrawTime }}</td>
                </tr>
            </tbody>
            <tbody class="phoneDisplay">
                <tr>
                    <th>预赛</th>
                </tr>
                <tr />
                <tr>
                    <td>{{ preRaceTime }}</td>
                </tr>
                <tr>
                    <th>正赛</th>
                </tr>
                <tr>
                    <td>{{ mainDrawTime }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <p class="form-text p-vp-fix" style="margin: 10px 0 10px 0;">
        ※“计算”将在预赛和正赛之间以及正赛期间的以下时间进行。请注意，“计算中”状态下不能进行全国冠军争夺战。</p>
    <div style="margin-bottom: -20px;">
        <table style="margin: 0;">
            <tbody>
                <tr>
                    <th>计算时段</th>
                </tr>
                <tr />
                <tr v-for="time in timeList" :key="time.time">
                    <td>{{ time.time }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        imgSrc: { type: String, required: true },
        preRaceTime: { type: String, required: true },
        mainDrawTime: { type: String, required: true },
        timeList: { type: Array, required: true },
    }
}
</script>

<style scoped>
.p-vp-fix {
    margin: 0;
    line-height: normal;
}

.parts_wrap_03>* {
    max-width: 520px !important;
    width: 100%;
    margin: 0 auto;
}

.pcDisplay {
    display: block;
}

.phoneDisplay {
    display: none;
}

.pcDisplay tr th {
    text-align: center;
}

.pcDisplay tr td {
    text-align: center;
}

.phoneDisplay tr th {
    text-align: center;
}

.phoneDisplay tr td {
    text-align: center;
}

@media screen and (max-width: 768px) {
    .pcDisplay {
        display: none;
    }

    .phoneDisplay {
        display: block;
    }
}
</style>