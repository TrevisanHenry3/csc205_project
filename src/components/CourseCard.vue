<script setup lang="ts">

const props = defineProps({
    course: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <div class="courseCard">
        <div class="cardLeft">
            <div class="categoryIndicator">
                <div class="fill" style="height:100%;"></div>
            </div>
        </div>
        <div class="cardBody">
            <div class="cardCenter">
                <div class="courseName">
                    <label><strong>{{ course.number }}</strong></label>
                </div>
                <div class="courseInfo">
                    <p>Spring </p>
                    <div style="width: 20px;"></div>
                    <p> Pre-Reqs </p>
                </div>
            </div>
        </div>
        <div class="cardRight">
            <div class="progressIndicator">
                <p>test</p>
            </div>
            <div class="credits">{{ course.credits }}</div>
        </div>
    </div>
</template>

<style>
.courseCard {
    display: flex;
    border: 1px solid;
    border-radius: 8px;
    overflow: hidden;
    height: 80px;
    width: 100%;
    margin-bottom: 1rem;
}

.categoryIndicator {
    width: 10px;
    height: 100%;
    background-color: orange;
}

.cardBody {
    display: flex;
    flex: 1;
    padding: 10px;
}



.courseName {
    font-size: 1.5rem;

}

.courseInfo {
    display: flex;
    flex-direction: row;
}

.cardRight {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid;
    border-radius: 8px;
    margin-left: auto;
    padding: 10px;
}

.progressIndicator {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.credits {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fill {
    height: 100%;
    background: green;
}
</style>
