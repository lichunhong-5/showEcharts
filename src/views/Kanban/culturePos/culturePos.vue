<template>
  <div class="culturePos">
    <Title @goBack="goBack" title="文化评估比例——职能"></Title>

    <TableTitle class="tableTitle" name="职能数据" img="true"></TableTitle>
      <div class="row row-func">
        <div
          class="col-50"
          v-for="item in staffPos"
          :key="item.id"
          @click="showPopFlag('Gallery',item)"
        >
          <TableTitle :name="item.id"></TableTitle>
          <Gallery :dataGallery="item" :id="item.id"></Gallery>
        </div>
      </div>
      <goIndex></goIndex>
    <Popover v-if="showPop.flag" :showPop="showPop" @close="showPop.flag = false"></Popover>
  </div>
</template>

<script>
import "./culturePos.scss";
import Gallery from "@/components/tables/gallery";
import TableTitle from "@/components/TableTitle/TableTitle";
import Title from "@/components/Title/Title";
import Popover from "@/components/Popover/Popover";
import goIndex from '@/components/goIndex/goIndex'
export default {
  components: {
    Gallery,
    TableTitle,
    Title,
    Popover,
    goIndex
  },
  methods: {
    showPopFlag(type, showData) {
      this.showPop = {
        flag: true,
        data: showData,
        type,
        name: showData.id
      };
    },
    goBack() {
      this.$router.push({
        name: "kanban"
      });
    }
  },
  data() {
    return {
      showPop: {},
      staffPos: []
    };
  },
  created() {
    this.$http
      .get("/companyperformancedata/selectPositionCulture")
      .then(response => {
        Object.keys(response)
          .forEach(element => {
            let obj = {
              X: ["深红 深蓝 深绿", "浅红 浅蓝 浅绿", "白 白 白"],
              Y: [[], [], []],
              color: ["rgba(207,64,69", "rgba(112,148,255", "rgba(13,203,130"],
              names: [
                {
                  name: "进取",
                  icon: "none",
                  textStyle: {
                    backgroundColor: "#CF4045"
                  }
                },
                {
                  name: "敏锐",
                  icon: "none",
                  textStyle: {
                    backgroundColor: "#7094FF"
                  }
                },
                {
                  name: "合作",
                  icon: "none",
                  textStyle: {
                    backgroundColor: "#0DCB82"
                  }
                }
              ],
              id: element
            };
            Object.keys(response[element]).forEach((key,i) => {
              console.log('key',key);
              Object.keys(response[element][key]).forEach(value => {
                obj.Y[i].push(response[element][key][value]);
              })
            });
            this.staffPos.push(obj);
          });
      })
      .catch(error => {
        alert(error.message);
      });
  }
};
</script>