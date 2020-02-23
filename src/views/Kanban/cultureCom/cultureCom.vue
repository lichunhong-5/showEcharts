<template>
  <div class="cultureCom">
    <Title @goBack="goBack" title="文化评估比例——公司"></Title>

    <TableTitle class="tableTitle" name="全部数据" img="true"></TableTitle>
    <div class="staff-row">
      <div class="row-staff" @click="showPopFlag('Gallery',staff)">
        <Gallery :dataGallery="staff" :id="staff.id"></Gallery>
      </div>
    </div>

    <TableTitle class="tableTitleTwo" name="区域数据" img="true"></TableTitle>
    <div class="row">
      <div
        class="col-50"
        v-for="item in staffArea"
        :key="item.id"
        @click="showPopFlag('Gallery',item)"
      >
        <TableTitle :name="item.name"></TableTitle>
        <Gallery :dataGallery="item" :id="item.id"></Gallery>
      </div>
    </div>

    <TableTitle class="tableTitleTwo" name="区域数据" img="true"></TableTitle>
    <div class="row">
      <div
        class="col-50"
        v-for="item in staffCom"
        :key="item.id"
        @click="showPopFlag('Gallery',item)"
      >
        <TableTitle :name="item.name"></TableTitle>
        <Gallery :dataGallery="item" :id="item.id"></Gallery>
      </div>
    </div>
    <goIndex></goIndex>
    <Popover v-if="showPop.flag" :showPop="showPop" @close="showPop.flag = false"></Popover>
  </div>
</template>

<script>
import "./cultureCom.scss";
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
        name: showData.name
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
      staff: {
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
        id: "全部数据"
      },
      staffArea: [],
      staffCom: []
    };
  },
  created() {
    this.$http
      .get("/companyperformancedata/selectAllCulture")
      .then(response => {
        // 全部
        Object.keys(response.allmap)
          .reverse()
          .forEach((element, i) => {
            Object.keys(response.allmap[element]).forEach(key => {
              this.staff.Y[i].push(response.allmap[element][key]);
            });
          });
        //区域
        Object.keys(response.companymap)
          .reverse()
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
              id: 'com'+element,
              name:element
            };
            Object.keys(response.companymap[element]).forEach((key, i) => {
              Object.keys(response.companymap[element][key]).forEach(value => {
                obj.Y[i].push(response.companymap[element][key][value]);
              });
            });
            this.staffCom.push(obj);
          });

        //公司
        Object.keys(response.areamap)
          .reverse()
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
              id: 'area'+element,
              name:element
            };
            Object.keys(response.areamap[element]).forEach((key, i) => {
              Object.keys(response.areamap[element][key]).forEach(value => {
                obj.Y[i].push(response.areamap[element][key][value]);
              });
            });
            this.staffArea.push(obj);
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