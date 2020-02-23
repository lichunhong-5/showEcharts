<template>
  <div class="function">
    <Title @goBack="goBack" title="各司职位序列分布">
      <div class="select-btn">
        <el-select @change="changeRegion" v-model="region" multiple placeholder="区域对比">
          <el-option
            v-for="item in regionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select
          v-model="com"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="公司对比"
        >
          <el-option
            v-for="item in comOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div
          :class="[btn.name === active?'active':'']"
          class="btn"
          v-for="btn in btns"
          @click="filter(btn)"
        >{{btn.name}}</div>
      </div>
    </Title>

    <div v-if="active !== '确认'">
      <TableTitle class="tableTitle" name="全部数据" img="true"></TableTitle>
      <div class="staff-row">
        <div class="row-staff" @click="showPopFlag('sCompare',staff)">
          <sCompare :id="staff.id" :sCompareData="staff" :mt="true"></sCompare>
        </div>
      </div>

      <TableTitle class="tableTitleTwo" name="区域数据" img="true"></TableTitle>
      <div class="row">
        <div
          class="col-50"
          v-for="(item,index) in staffArea"
          :key="index"
          @click="showPopFlag('sCompare',item)"
        >
          <TableTitle :name="item.name"></TableTitle>
          <sCompare :id="item.id" :sCompareData="item"></sCompare>
        </div>
      </div>

      <TableTitle class="tableTitleTwo" name="公司数据" img="true"></TableTitle>
      <div class="row">
        <div
          class="col-50"
          v-for="(item,index) in staffCom"
          :key="index"
          @click="showPopFlag('sCompare',item)"
        >
          <TableTitle :name="item.name"></TableTitle>
          <sCompare :id="item.id" :sCompareData="item"></sCompare>
        </div>
      </div>

      <Popover v-if="showPop.flag" :showPop="showPop" @close="showPop.flag = false"></Popover>
    </div>

    <div v-else>
      <TableTitle class="tableTitle" name="选中数据" img="true"></TableTitle>
      <div class="staff-row">
        <div class="row-mcom" :class="height">
          <mCompare :compare="compareData"></mCompare>
        </div>
      </div>
    </div>
    <goIndex></goIndex>
  </div>
</template>

<script>
import "./Function.scss";
import sCompare from "@/components/tables/sCompare";
import mCompare from "@/components/tables/mCompare";
import TableTitle from "@/components/TableTitle/TableTitle";
import Title from "@/components/Title/Title";
import Popover from "@/components/Popover/Popover";
import { Select, Option } from "element-ui";
import goIndex from '@/components/goIndex/goIndex'
export default {
  components: {
    sCompare,
    mCompare,
    TableTitle,
    Title,
    Popover,
    elSelect: Select,
    elOption: Option,
    goIndex
  },
  methods: {
    changeRegion() {
      this.comOptions = [];
      this.com = [];
      this.$http
        .get("/company/queryForArea", { "areaIds[]": this.region.join(",") })
        .then(response => {
          response.forEach((element, i) => {
            element.label = element.companyName;
            element.value = element.id;
            this.comOptions.push(element);
          });
        })
        .catch(error => {
          alert(error.message);
        });
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
    },
    filter(btn) {
      if (btn.name !== "确认") {
        this.active = btn.name;
      }
      if (btn.name === "确认") {
        if (this.com.length > 0 || this.region.length > 0) {
          this.active = btn.name;
          this.compareData.X = [];
          this.compareData.type = [
            [[], [], []],
            [[], [], [], []],
            [[], [], [], [], [], []]
          ];
          if (
            (this.com.length > 5 && this.com.length < 10) ||
            (this.region.length > 5 && this.region.length < 10)
          ) {
            this.height = "height-400";
          } else if (
            (this.com.length > 10 && this.com.length < 15) ||
            (this.region.length > 10 && this.region.length < 15)
          ) {
            this.height = "height-600";
          }
          let para = {
            "companyIds[]": this.com.join(","),
            "areaIds[]": this.region.join(",")
          };
          this.$http
            .get("/companyperformancedata/selectJobSort", para)
            .then(response => {
              Object.keys(response).forEach((element, index) => {
                Object.keys(response[element]).forEach((key, i) => {
                  Object.keys(response[element][key]).forEach(value => {
                    if (index === 0 && i === 0) {
                      this.compareData.X.push(value);
                    }
                    if (element === "管理类") {
                      if (response[element][key][value] === 0) {
                        this.compareData.type[0][i].push(null);
                      } else {
                        this.compareData.type[0][i].push(
                          response[element][key][value]
                        );
                      }
                    } else if (element === "专业类") {
                      if (response[element][key][value] === 0) {
                        this.compareData.type[1][i].push(null);
                      } else {
                        this.compareData.type[1][i].push(
                          response[element][key][value]
                        );
                      }
                      // this.compareData.type[1][i].push(
                      //   response[element][key][value]
                      // );
                    } else if (element === "基础类") {
                      if (response[element][key][value] === 0) {
                        this.compareData.type[2][i].push(null);
                      } else {
                        this.compareData.type[2][i].push(
                          response[element][key][value]
                        );
                      }
                      // this.compareData.type[2][i].push(
                      //   response[element][key][value]
                      // );
                    }
                  });
                });
              });
              console.log(3333, this.compareData.type);
            })
            .catch(error => {
              alert(error.message);
            });
        }
      } else {
        this.changeRegion();
        this.com = [];
        this.region = [];
      }
    }
  },
  data() {
    return {
      height: "",
      active: "",
      btns: [{ name: "确认", active: false }, { name: "重置", active: false }],
      regionOptions: [],
      comOptions: [],
      region: [],
      com: [],
      compareData: {
        X: [],
        type: [[[], [], []], [[], [], [], []], [[], [], [], [], [], []]]
      },
      showPop: {},
      staff: {
        id: "全部数据",
        X: [[], [], []]
      },
      staffArea: [],
      staffCom: []
    };
  },
  created() {
    const para = {
      "companyIds[]": "",
      "areaIds[]": ""
    };
    this.$http
      .get("/companyperformancedata/selectJobSort", para)
      .then(response => {
        //全部
        Object.keys(response.allmap)
          .reverse()
          .forEach((element, i) => {
            Object.keys(response.allmap[element]).forEach(key => {
              this.staff.X[i].push(response.allmap[element][key]);
            });
          });

        //区域
        Object.keys(response.areamap).forEach(element => {
          let obj = {
            id: "area" + element,
            name: element,
            X: [[], [], []]
          };
          Object.keys(response.areamap[element])
            .reverse()
            .forEach((key, i) => {
              Object.keys(response.areamap[element][key]).forEach(value => {
                obj.X[i].push(response.areamap[element][key][value]);
              });
            });
          this.staffArea.push(obj);
        });
        //公司
        Object.keys(response.company).forEach(element => {
          let obj = {
            id: "com" + element,
            name: element,
            X: [[], [], []]
          };
          Object.keys(response.company[element])
            .reverse()
            .forEach((key, i) => {
              Object.keys(response.company[element][key]).forEach(value => {
                obj.X[i].push(response.company[element][key][value]);
              });
            });
          this.staffCom.push(obj);
        });
      })
      .catch(error => {
        alert(error.message);
      });

    //查区域
    this.$http
      .get("/area/selectPerformanceArea", { subdataShow: true })
      .then(response => {
        response.forEach((element, i) => {
          element.label = element.areaName;
          element.value = element.id;
          this.regionOptions.push(element);
        });
      })
      .catch(error => {
        alert(error.message);
      });
    //查公司
    this.$http
      .get("/company/queryForArea", { "areaIds[]": "" })
      .then(response => {
        response.forEach((element, i) => {
          element.label = element.companyName;
          element.value = element.id;
          this.comOptions.push(element);
        });
      })
      .catch(error => {
        alert(error.message);
      });
  }
};
</script>