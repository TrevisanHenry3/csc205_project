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
                    <label><strong>Course Name</strong></label>
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
                <o-icon icon="check"></o-icon>
            </div>
            <div class="credits">3</div>
        </div>
    </div>
</template>
<script lang="ts">

</script>
<style>
.courseCard {
    display: flex;
    border: 1px solid;
    border-radius: 8px;
    overflow: hidden;
    height: 80px;
    width: 100%;
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
