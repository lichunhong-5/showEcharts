<template>
  <div class="ManagementTrainee">
    <Title @goBack="goBack" title="管培生绩效分布">
      <div class="btn">
        <button
          v-for="name in buttons"
          :key="name"
          :class="[currentTab === name?'active':'']"
          @click="changeData(name)"
        >{{name}}</button>
      </div>
    </Title>

    <div v-if="currentTab === '公司'">
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

      <TableTitle class="tableTitleTwo" name="公司数据" img="true"></TableTitle>
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
    </div>

    <div v-if="currentTab === '职能'" style="border:.1px solid transparent">
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
    </div>
    <goIndex></goIndex>
    <Popover v-if="showPop.flag" :showPop="showPop" @close="showPop.flag = false"></Popover>
  </div>
</template>

<script>
import "./ManagementTrainee.scss";
import Gallery from "@/components/tables/gallery";
import TableTitle from "@/components/TableTitle/TableTitle";
import Title from "@/components/Title/Title";
import Popover from "@/components/Popover/Popover";
import { log } from "util";
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
    changeData(item) {
      this.currentTab = item;
    },
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
      buttons: ["公司", "职能"],
      currentTab: "公司",
      showPop: {},
      staff: {
        X: ["A", "B+", "B", "B-", "C"],
        Y: [[], []],
        color: ["rgba(104, 219, 216", "rgba(186,166,234"],
        names: [
          {
            name: "标准",
            icon: "none",
            textStyle: {
              backgroundColor: "#8554db"
            }
          },
          {
            name: "实际",
            icon: "none",
            textStyle: {
              backgroundColor: "#06999e"
            }
          }
        ],
        id: "全部数据"
      },
      staffArea: [],
      staffCom: [],
      staffPos: []
    };
  },
  created() {
    const para = {
      type: 2
    };
    this.$http
      .get("/companyperformancedata/selectPerformanceAssess", para)
      .then(response => {
        Object.keys(response.allmap)
          .reverse()
          .forEach((element, i) => {
            Object.keys(response.allmap[element]).forEach(key => {
              this.staff.Y[i].push(response.allmap[element][key]);
            });
          });

        Object.keys(response.companymap)
          .reverse()
          .forEach(element => {
            let obj = {
              X: ["A", "B+", "B", "B-", "C"],
              Y: [[], []],
              color: ["rgba(104, 219, 216", "rgba(186,166,234"],
              names: [
                {
                  name: "标准",
                  icon: "none",
                  textStyle: {
                    backgroundColor: "#8554db"
                  }
                },
                {
                  name: "实际",
                  icon: "none",
                  textStyle: {
                    backgroundColor: "#06999e"
                  }
                }
              ],
              id: 'com'+element,
              name:element
            };
            Object.keys(response.companymap[element]).reverse().forEach((key, i) => {
              Object.keys(response.companymap[element][key]).forEach(value => {
                obj.Y[i].push(response.companymap[element][key][value]);
              });
            });
            this.staffCom.push(obj);
          });

        Object.keys(response.areamap)
          .reverse()
          .forEach(element => {
            let obj = {
              X: ["A", "B+", "B", "B-", "C"],
              Y: [[], []],
              color: ["rgba(104, 219, 216", "rgba(186,166,234"],
              names: [
                {
                  name: "标准",
                  icon: "none",
                  textStyle: {
                    backgroundColor: "#8554db"
                  }
                },
                {
                  name: "实际",
                  icon: "none",
                  textStyle: {
                    backgroundColor: "#06999e"
                  }
                }
              ],
              id: 'area'+element,
              name:element
            };
            Object.keys(response.areamap[element]).reverse().forEach((key, i) => {
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
    //职能
    this.$http
      .get("/companyperformancedata/selectPerformanceAssessPosition", para)
      .then(response => {
        Object.keys(response)
          .forEach(element => {
            let obj = {
              X: ["A", "B+", "B", "B-", "C"],
              Y: [[], []],
              color: ["rgba(104, 219, 216", "rgba(186,166,234"],
              names: [
                {
                  name: "标准",
                  icon: "none",
                  textStyle: {
                    backgroundColor: "#8554db"
                  }
                },
                {
                  name: "实际",
                  icon: "none",
                  textStyle: {
                    backgroundColor: "#06999e"
                  }
                }
              ],
              id: element,
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