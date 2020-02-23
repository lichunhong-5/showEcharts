<template>
  <div class="comPosition">
    <Title @goBack="goBack" title="各司职能分布">
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
        <div class="row-staff" @click="showPopFlag('GradientColor',staff)">
          <div class="sort" @click.stop="sort(staff,'all')">
            <span style="font-size:12px">排序</span>
            <img
              style="width:8px;height:10px;margin-left:2px"
              :src="staff.sort?(staff.sort===1?require('@/assets/images/Kanban/sort/small.png'):require('@/assets/images/Kanban/sort/big.png')):require('@/assets/images/Kanban/sort/no.png')"
              alt
            />
          </div>
          <GradientColor :id="staff.id" :gradientData="staff"></GradientColor>
        </div>
      </div>

      <TableTitle class="tableTitleTwo" name="区域数据" img="true"></TableTitle>
      <div class="row">
        <div
          class="col-50"
          v-for="(item,index) in staffArea"
          :key="item.id"
          @click="showPopFlag('GradientColor',item)"
        >
          <TableTitle :name="item.name"></TableTitle>
          <div class="sort" @click.stop="sort(item,'area',index)">
            <span style="font-size:12px">排序</span>
            <img
              style="width:8px;height:10px;margin-left:2px"
              :src="item.sort?(item.sort===1?require('@/assets/images/Kanban/sort/small.png'):require('@/assets/images/Kanban/sort/big.png')):require('@/assets/images/Kanban/sort/no.png')"
              alt
            />
          </div>
          <GradientColor :id="item.id" :gradientData="item"></GradientColor>
        </div>
      </div>

      <TableTitle class="tableTitleTwo" name="公司数据" img="true"></TableTitle>
      <div class="row">
        <div
          class="col-50"
          v-for="item in staffCom"
          :key="item.id"
          @click="showPopFlag('GradientColor',item)"
        >
          <TableTitle :name="item.name"></TableTitle>
          <div class="sort" @click.stop="sort(item,'com',index)">
            <span style="font-size:12px">排序</span>
            <img
              style="width:8px;height:10px;margin-left:2px"
              :src="item.sort?(item.sort===1?require('@/assets/images/Kanban/sort/small.png'):require('@/assets/images/Kanban/sort/big.png')):require('@/assets/images/Kanban/sort/no.png')"
              alt
            />
          </div>
          <GradientColor :id="item.id" :gradientData="item"></GradientColor>
        </div>
      </div>

      <Popover v-if="showPop.flag" :showPop="showPop" @close="showPop.flag = false"></Popover>
    </div>

    <div v-else>
      <TableTitle class="tableTitle" name="选中数据" img="true"></TableTitle>
      <div class="staff-row">
        <div class="row-staff height-450">
          <ComDataset id="com" :stackCompare="compareData"></ComDataset>
        </div>
      </div>
    </div>
    <goIndex></goIndex>
  </div>
</template>

<script>
import "./ComPosition.scss";
import GradientColor from "@/components/tables/GradientColor";
import ComDataset from "@/components/tables/comDataset";
import TableTitle from "@/components/TableTitle/TableTitle";
import Title from "@/components/Title/Title";
import Popover from "@/components/Popover/Popover";
import { Select, Option } from "element-ui";
import goIndex from '@/components/goIndex/goIndex'
export default {
  components: {
    GradientColor,
    ComDataset,
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
    sort(staff, type, index) {
      console.log(11, staff);

      staff.num++;
      if (staff.num % 2 === 1) {
        staff.sort = 1;
        var len = staff.Y.length;
        let obj = {};
        for (var i = 0; i < len - 1; i++) {
          for (var j = 0; j < len - 1 - i; j++) {
            if (staff.Y[j] > staff.Y[j + 1]) {
              var temp = staff.Y[j];
              staff.Y[j] = staff.Y[j + 1];
              staff.Y[j + 1] = temp;
              var tempY = staff.X[j];
              staff.X[j] = staff.X[j + 1];
              staff.X[j + 1] = tempY;
            }
          }
        }
        obj = staff;
        if (type === "all") {
          this.staff = Object.assign({}, staff);
        } else if (type === "area") {
          obj.id = 'update0'+staff.id;
          this.staffArea.slice(index, 1, obj);
        } else if (type === "com") {
          obj.id = 'update0'+staff.id;
          this.staffCom.slice(index, 1, obj);
        }
      } else {
        staff.sort = 2;
        var len = staff.Y.length;
        let obj = {};
        for (var i = 0; i < len - 1; i++) {
          for (var j = 0; j < len - 1 - i; j++) {
            if (staff.Y[j] < staff.Y[j + 1]) {
              var temp = staff.Y[j];
              staff.Y[j] = staff.Y[j + 1];
              staff.Y[j + 1] = temp;
              var tempY = staff.X[j];
              staff.X[j] = staff.X[j + 1];
              staff.X[j + 1] = tempY;
            }
          }
        }
        obj = staff;
        if (type === "all") {
          this.staff = Object.assign({}, staff);
        } else if (type === "area") {
          obj.id = 'update1'+staff.id;
          this.staffArea.slice(index, 1, obj);
        } else if (type === "com") {
          obj.id = 'update1'+staff.id;
          this.staffCom.slice(index, 1, obj);
        }
      }
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
          this.compareData.names = ["product"];
          let para = {
            "companyIds[]": this.com.join(","),
            "areaIds[]": this.region.join(",")
          };
          this.$http
            .get("/companyperformancedata/selectAllPostionData", para)
            .then(response => {
              Object.keys(response).forEach((element, i) => {
                let obj = {
                  product: ""
                };
                obj.product = element;
                Object.keys(response[element]).forEach(key => {
                  obj[key] = response[element][key];
                  if (i === 0) {
                    this.compareData.names.push(key);
                  }
                });
                this.compareData.X.push(obj);
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
        names: ["product"],
        colors: [
          "#FFD3CC",
          "#EA8F7E",
          "#FF8C75",
          "#FFB584",
          "#F5C16C",
          "#8EE89E",
          "#71C17F",
          "#62A56C",
          "#D7E7F2",
          "#ACCAF2",
          "#3FA2FF",
          "#4F9DF2",
          "#0069CA",
          "#CDB3FF",
          "#8B4FFF",
          "#7731FF",
          "#C79EF2"
        ]
      },
      showPop: {},
      staff: {
        Y: [],
        X: [],
        colors: ["#06999e", "#00F1FE", "#0050A8"],
        id: "全部数据",
        sort: null,
        num: 0
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
      .get("/companyperformancedata/selectAllPostionData", para)
      .then(response => {
        //全部
        Object.keys(response.allmap).forEach((element, i) => {
          this.staff.Y.push(response.allmap[element]);
          this.staff.X.push(element);
        });

        //区域
        Object.keys(response.areamap)
          .reverse()
          .forEach(element => {
            let obj = {
              Y: [],
              X: [],
              colors: ["#06999e", "#00F1FE", "#0050A8"],
              id: "area" + element,
              name: element,
              sort: null,
              num: 0
            };
            Object.keys(response.areamap[element]).forEach((key, i) => {
              obj.Y.push(response.areamap[element][key]);
              obj.X.push(key);
            });
            this.staffArea.push(obj);
          });

        //公司
        Object.keys(response.company)
          .reverse()
          .forEach(element => {
            let obj = {
              Y: [],
              X: [],
              colors: ["#06999e", "#00F1FE", "#0050A8"],
              id: "com" + element,
              name: element,
              sort: null,
              num: 0
            };
            Object.keys(response.company[element]).forEach((key, i) => {
              obj.Y.push(response.company[element][key]);
              obj.X.push(key);
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

<style lang="scss" scoped>
</style>