<template>
  <div class="chooseInfo">
    <Title title="员工绩效展示系统"></Title>

    <div class="img-info">
        <img src="@/assets/images/Login/kanban.png" alt="" @click="goDetail('kanban')">
        <img src="@/assets/images/Login/grade.png" alt="" @click="goDetail('grade')">
        <img src="@/assets/images/Login/sudoku.png" alt="" @click="goDetail('sudoku')">
    </div>

    <div class="img-bottom">
      <img src="@/assets/images/Login/logo-bottom.png" alt />
    </div>
  </div>
</template>

<script>
import "./ChooseInfo.scss";
import Title from '@/components/Title/Title'
export default {
    components: {
        Title,
    },
    methods: {
        goDetail(item) {
            this.$router.push({name:item})
        }
    },
};
</script>