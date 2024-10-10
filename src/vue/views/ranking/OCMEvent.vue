<template>
    <!-- 下拉选择框 -->
    <div class="row g-2" style="margin-top: 15px;">
        <div class="col-md">
            <div class="form-floating">
                <select class="form-select" id="floatingSelectGrid_Race" aria-label="Floating label select">
                    <option value="2">第17回 大阪区域</option>
                    <option value="1">第19回 名古屋区域</option>
                </select>
                <label for="floatingSelectGrid_Race">选择比赛场次</label>
            </div>
        </div>
    </div>

    <p class="form-text" id="raceMainPeriodText">当前比赛时段：正赛</p>
    <p class="form-text" id="raceTimeText">比赛时间：2024/10/1 00:00 ~ 2024/10/7 00:00</p>
</template>