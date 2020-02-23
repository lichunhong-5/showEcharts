<template>
  <div class="staff">
    <Title @goBack="goBack" title="全员数据">
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
      <TableTitle class="tableTitle" name="全员数据" img="true"></TableTitle>
      <div class="staff-row">
        <div class="row-staff" @click="showPopFlag('StackBar',staff)">
          <StackBar :stackData="staff" :id="staff.id" top="20"></StackBar>
        </div>
      </div>

      <TableTitle class="tableTitleTwo" name="区域数据" img="true"></TableTitle>
      <div class="row">
        <div
          class="col-50"
          v-for="item in staffArea"
          :key="item.id"
          @click="showPopFlag('StackBar',item)"
        >
          <TableTitle :name="item.name"></TableTitle>
          <StackBar :stackData="item" :id="item.id" top="50"></StackBar>
        </div>
      </div>

      <TableTitle class="tableTitleTwo" name="公司数据" img="true"></TableTitle>
      <div class="row">
        <div
          class="col-50"
          v-for="item in staffCom"
          :key="item.id"
          @click="showPopFlag('StackBar',item)"
        >
          <TableTitle :name="item.name"></TableTitle>
          <StackBar :stackData="item" :id="item.id"></StackBar>
        </div>
      </div>

      <Popover v-if="showPop.flag" :showPop="showPop" @close="showPop.flag = false"></Popover>
    </div>

    <div v-else>
      <TableTitle class="tableTitle" name="全员数据" img="true"></TableTitle>
      <div class="staff-row">
        <div class="row-staff height-500" @click="showPopFlag('StackBar',staff)">
          <ComTotal :id="id" :stackCompare="compareData"></ComTotal>
        </div>
      </div>
    </div>
    <!-- <goIndex></goIndex> -->
  </div>
</template>

<script>
import "./Staff.scss";
import StackBar from "@/components/tables/stackBar";
import ComTotal from "@/components/tables/comTotal";
import TableTitle from "@/components/TableTitle/TableTitle";
import Title from "@/components/Title/Title";
import Popover from "@/components/Popover/Popover";
import { Select, Option } from "element-ui";
import goIndex from '@/components/goIndex/goIndex'
export default {
  components: {
    StackBar,
    ComTotal,
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
          this.compareData.Y = [];
          this.compareData.names = [];
          this.id = 'c'+this.id;
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
            .get("/allstaffpromotedata/allData", para)
            .then(response => {
              Object.keys(response).forEach(element => {
                Object.keys(response[element]).forEach((key, j) => {
                  this.compareData.names.push(key);
                  console.log("key", key);
                  let arr = [];
                  Object.keys(response[element][key]).forEach((value, i) => {
                    arr.unshift(response[element][key][value]);
                    if (j === 0) {
                      this.compareData.Y.unshift(value);
                    }
                  });
                  this.compareData.X[j] = arr;
                  console.log(1212,this.compareData.names);
                  
                });
              });
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
    },
    getData() {
      const para = {
        "companyIds[]": "",
        "areaIds[]": ""
      };
      this.$http
        .get("/allstaffpromotedata/allData", para)
        .then(response => {
          //全部
          Object.keys(response.allmap)
            .reverse()
            .forEach((element, i) => {
              console.log(222, response.allmap[element]);
              this.staff.X.push(response.allmap[element]);
            });

          //区域
          Object.keys(response.areamap)
            // .reverse()
            .forEach(element => {
              let obj = {
                Y: [
                  "总在岗人数",
                  "2019年年度离职",
                  "2019年年度入职",
                  "总参评人数"
                ],
                X: [],
                colors: ["#02c0e8", "#0296f3", "#32ccff", "#33ffcc"],
                id: "area" + element,
                name: element
              };
              Object.keys(response.areamap[element]).forEach((key, i) => {
                obj.X.push(response.areamap[element][key]);
              });
              this.staffArea.push(obj);
            });

          //公司
          Object.keys(response.companymap)
            // .reverse()
            .forEach(element => {
              let obj = {
                Y: [
                  "总在岗人数",
                  "2019年年度离职",
                  "2019年年度入职",
                  "总参评人数"
                ],
                X: [],
                colors: ["#02c0e8", "#0296f3", "#32ccff", "#33ffcc"],
                id: "com" + element,
                name: element
              };
              Object.keys(response.companymap[element]).forEach((key, i) => {
                obj.X.push(response.companymap[element][key]);
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
  },
  data() {
    return {
      id:'c',
      height: "",
      active: "",
      btns: [{ name: "确认", active: false }, { name: "重置", active: false }],
      regionOptions: [],
      comOptions: [],
      region: [],
      com: [],
      compareData: {
        Y: [],
        X: [[], [], []],
        names: [],
        colors: [
          "#1DBF97",
          "#30B8E5",
          "#0296F3",
          "#1DBF97",
          "#30B8E5",
          "#0296F3",
          "#1DBF97",
          "#30B8E5",
          "#1DBF97"
        ]
      },
      showPop: {},
      staff: {
        Y: ["总在岗人数", "2019年年度离职", "2019年年度入职", "总参评人数"],
        X: [],
        colors: ["#02c0e8", "#0296f3", "#32ccff", "#33ffcc"],
        id: "全员数据"
      },
      staffArea: [],
      staffCom: []
    };
  },
  created() {
    this.getData();
  }
};
</script>