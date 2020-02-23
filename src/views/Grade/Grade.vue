<template>
  <div class="Grade">
    <Title @goBack="goBack" title="员工绩效"></Title>

    <div class="flex">
      <div class="row">
        <div class="col-25" v-for="(area,index) in all" :key="index" @click="goDetail(area.id)">
          <img class="bg" :src="area.bg" alt="area.bg" />
          <div class="desc">
            <img :src="area.icon" alt />
            <div>{{area.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <goIndex></goIndex>
  </div>
</template>

<script>
import "./Grade.scss";
import Title from "@/components/Title/Title";
import goIndex from '@/components/goIndex/goIndex'
export default {
  methods: {
    goBack() {
      this.$router.push({
        name: "chooseInfo"
      });
    },
    goDetail(id){
        this.$router.push({
            name: 'employeeGrade',
            params: {id}
        })
    }
  },
  components: {
    Title,
    goIndex
  },
  data() {
    return {
      all: []
    };
  },
  created() {
    //查区域
    this.$http
      .get("/area/selectPerformanceArea", { "employeePerformance": true })
      .then(response => {
        this.all = [
          {
            icon: require("@/assets/images/grade/all.png"),
            bg: require("@/assets/images/grade/bg-third.png"),
            name: "全部区域",
            id: ''
          }
        ];
        response.forEach((element, i) => {
          let obj = {};
          if (i % 3 === 1) {
            obj.icon = require("@/assets/images/grade/icon-third.png");
            obj.bg = require("@/assets/images/grade/bg-third.png");
          } else if (i % 3 === 2) {
            obj.icon = require("@/assets/images/grade/icon-two.png");
            obj.bg = require("@/assets/images/grade/bg-two.png");
          } else if (i % 3 === 0) {
            obj.icon = require("@/assets/images/grade/icon-one.png");
            obj.bg = require("@/assets/images/grade/bg-one.png");
          }
          obj.name = element.areaName;
          obj.id = element.id;
          this.all.push(obj);
        });
      })
      .catch(error => {
        alert(error.message);
      });
  }
};
</script>

<style lang="scss" scoped>
</style>