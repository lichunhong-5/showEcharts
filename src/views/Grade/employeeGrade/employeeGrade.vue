<template>
  <div class="employeeGrade">
    <Title @goBack="goBack" title="员工绩效">
      <div class="select-btn">
        <el-select @change="changeRegion" v-model="region" multiple placeholder="全部区域" v-if="!id">
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
          placeholder="全部公司"
        >
          <el-option
            v-for="item in comOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select
          v-model="pos"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="全部职能"
        >
          <el-option
            v-for="item in posOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-select v-model="promotion" collapse-tags style="margin-left: 20px;" placeholder="是否晋升">
          <el-option
            v-for="item in promotionOptions"
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

    <TableTitle class="tableTitle" name="A" img="true"></TableTitle>
    <div class="row first-row">
      <div class="col-33" v-for="(item,index) in showInfo.A" :key="index" @click="searchInfo(item)">
        <div class="col-40">
          <!-- <div> -->
          <img
            :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')"
            alt
          />
          <div style="top: 15%;left: 50%;position: absolute;margin-left: -47px">
            <img
              class="promote"
              v-if="item.promote"
              src="@/assets/images/grade/employee/promote.png"
              alt
            />
          </div>
          <!-- </div> -->
        </div>
        <div class="col-60">
          <div class="staffName">
            <span>{{item.staffName}}</span>
            <p>{{item.areaName}}</p>
          </div>
          <div class="jobName">
            <span>{{item.jobName}}</span>
          </div>
          <div class="history">最近两次绩效：{{item.historyPerformanceOne}}/{{item.historyPerformanceTwo}}</div>
          <div class="now">本次绩效：{{item.performanceAssess}}</div>
          <div class="culture">文化价值观评估：{{item.allCultureGrade}}</div>
          <div class="color">
            <span
              :class="[item.progressCultureGrade==='深红'?'deepRed':(item.progressCultureGrade==='浅红'?'red':'white')]"
            >{{item.progressCultureGrade}}</span>
            <span
              :class="[item.keenCultureGrade==='深蓝'?'deepBlue':(item.keenCultureGrade==='浅蓝'?'blue':'white')]"
            >{{item.keenCultureGrade}}</span>
            <span
              :class="[item.cooperationCultureGrade==='深绿'?'deepGreen':(item.cooperationCultureGrade==='浅绿'?'green':'white')]"
            >{{item.cooperationCultureGrade}}</span>
          </div>
        </div>
      </div>
    </div>
    <TableTitle class="tableTitleTwo" name="B+" img="true"></TableTitle>
    <div class="row">
      <div class="col-33" v-for="(item,index) in showInfo.B" :key="index" @click="searchInfo(item)">
        <div class="col-40">
          <img
            :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')"
            alt
          />
          <div style="top: 15%;left: 50%;position: absolute;margin-left: -47px">
            <img
              class="promote"
              v-if="item.promote"
              src="@/assets/images/grade/employee/promote.png"
              alt
            />
          </div>
        </div>
        <div class="col-60">
          <div class="staffName">
            <span>{{item.staffName}}</span>
            <p>{{item.areaName}}</p>
          </div>
          <div class="jobName">
            <span>{{item.jobName}}</span>
          </div>
          <div class="history">最近两次绩效：{{item.historyPerformanceOne}}/{{item.historyPerformanceTwo}}</div>
          <div class="now">本次绩效：{{item.performanceAssess}}</div>
          <div class="culture">文化价值观评估：{{item.allCultureGrade}}</div>
          <div class="color">
            <span
              :class="[item.progressCultureGrade==='深红'?'deepRed':(item.progressCultureGrade==='浅红'?'red':'white')]"
            >{{item.progressCultureGrade}}</span>
            <span
              :class="[item.keenCultureGrade==='深蓝'?'deepBlue':(item.keenCultureGrade==='浅蓝'?'blue':'white')]"
            >{{item.keenCultureGrade}}</span>
            <span
              :class="[item.cooperationCultureGrade==='深绿'?'deepGreen':(item.cooperationCultureGrade==='浅绿'?'green':'white')]"
            >{{item.cooperationCultureGrade}}</span>
          </div>
        </div>
      </div>
    </div>
    <TableTitle class="tableTitleTwo" name="B" img="true"></TableTitle>
    <div class="row">
      <div class="col-33" v-for="(item,index) in showInfo.C" :key="index" @click="searchInfo(item)">
        <div class="col-40">
          <img
            :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')"
            alt
          />
          <div style="top: 15%;left: 50%;position: absolute;margin-left: -47px">
            <img
              class="promote"
              v-if="item.promote"
              src="@/assets/images/grade/employee/promote.png"
              alt
            />
          </div>
        </div>
        <div class="col-60">
          <div class="staffName">
            <span>{{item.staffName}}</span>
            <p>{{item.areaName}}</p>
          </div>
          <div class="jobName">
            <span>{{item.jobName}}</span>
          </div>
          <div class="history">最近两次绩效：{{item.historyPerformanceOne}}/{{item.historyPerformanceTwo}}</div>
          <div class="now">本次绩效：{{item.performanceAssess}}</div>
          <div class="culture">文化价值观评估：{{item.allCultureGrade}}</div>
          <div class="color">
            <span
              :class="[item.progressCultureGrade==='深红'?'deepRed':(item.progressCultureGrade==='浅红'?'red':'white')]"
            >{{item.progressCultureGrade}}</span>
            <span
              :class="[item.keenCultureGrade==='深蓝'?'deepBlue':(item.keenCultureGrade==='浅蓝'?'blue':'white')]"
            >{{item.keenCultureGrade}}</span>
            <span
              :class="[item.cooperationCultureGrade==='深绿'?'deepGreen':(item.cooperationCultureGrade==='浅绿'?'green':'white')]"
            >{{item.cooperationCultureGrade}}</span>
          </div>
        </div>
      </div>
    </div>
    <TableTitle class="tableTitleTwo" name="B-" img="true"></TableTitle>
    <div class="row">
      <div class="col-33" v-for="(item,index) in showInfo.D" :key="index" @click="searchInfo(item)">
        <div class="col-40">
          <img
            :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')"
            alt
          />
          <div style="top: 15%;left: 50%;position: absolute;margin-left: -47px">
            <img
              class="promote"
              v-if="item.promote"
              src="@/assets/images/grade/employee/promote.png"
              alt
            />
          </div>
        </div>
        <div class="col-60">
          <div class="staffName">
            <span>{{item.staffName}}</span>
            <p>{{item.areaName}}</p>
          </div>
          <div class="jobName">
            <span>{{item.jobName}}</span>
          </div>
          <div class="history">最近两次绩效：{{item.historyPerformanceOne}}/{{item.historyPerformanceTwo}}</div>
          <div class="now">本次绩效：{{item.performanceAssess}}</div>
          <div class="culture">文化价值观评估：{{item.allCultureGrade}}</div>
          <div class="color">
            <span
              :class="[item.progressCultureGrade==='深红'?'deepRed':(item.progressCultureGrade==='浅红'?'red':'white')]"
            >{{item.progressCultureGrade}}</span>
            <span
              :class="[item.keenCultureGrade==='深蓝'?'deepBlue':(item.keenCultureGrade==='浅蓝'?'blue':'white')]"
            >{{item.keenCultureGrade}}</span>
            <span
              :class="[item.cooperationCultureGrade==='深绿'?'deepGreen':(item.cooperationCultureGrade==='浅绿'?'green':'white')]"
            >{{item.cooperationCultureGrade}}</span>
          </div>
        </div>
      </div>
    </div>
    <TableTitle class="tableTitleTwo" name="C" img="true"></TableTitle>
    <div class="row">
      <div class="col-33" v-for="(item,index) in showInfo.E" :key="index" @click="searchInfo(item)">
        <div class="col-40">
          <img
            :src="item.headimgurl?item.headimgurl:require('@/assets/images/grade/no_headimg.png')"
            alt
          />
          <div style="top: 15%;left: 50%;position: absolute;margin-left: -47px">
            <img
              class="promote"
              v-if="item.promote"
              src="@/assets/images/grade/employee/promote.png"
              alt
            />
          </div>
        </div>
        <div class="col-60">
          <div class="staffName">
            <span>{{item.staffName}}</span>
            <p>{{item.areaName}}</p>
          </div>
          <div class="jobName">
            <span>{{item.jobName}}</span>
          </div>
          <div class="history">最近两次绩效：{{item.historyPerformanceOne}}/{{item.historyPerformanceTwo}}</div>
          <div class="now">本次绩效：{{item.performanceAssess}}</div>
          <div class="culture">文化价值观评估：{{item.allCultureGrade}}</div>
          <div class="color">
            <span
              :class="[item.progressCultureGrade==='深红'?'deepRed':(item.progressCultureGrade==='浅红'?'red':'white')]"
            >{{item.progressCultureGrade}}</span>
            <span
              :class="[item.keenCultureGrade==='深蓝'?'deepBlue':(item.keenCultureGrade==='浅蓝'?'blue':'white')]"
            >{{item.keenCultureGrade}}</span>
            <span
              :class="[item.cooperationCultureGrade==='深绿'?'deepGreen':(item.cooperationCultureGrade==='浅绿'?'green':'white')]"
            >{{item.cooperationCultureGrade}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-footer">
      <div class="button-o" @click="popover = 'pending'">结果待定</div>
      <div class="button-t" @click="popover = 'confirm'">结果确认</div>
    </div>

    <div class="popover" v-if="popover!==''||JSON.stringify(info)!=='{}'">
      <div class="img">
        <img
          v-if="popover!==''"
          @click="popover = ''"
          :src="popover==='confirm'?require('@/assets/images/grade/employee/confirm.png'):(popover==='pending'?require('@/assets/images/grade/employee/pending.png'):'')"
          alt
        />

        <div class="info" v-else>
          <img class="close" @click="info = {}" src="@/assets/images/grade/close.png" alt />
          <div class="headimg">
            <img
              :src="info.headimgurl?info.headimgurl:require('@/assets/images/grade/no_headimg.png')"
              alt
            />
            <div style="top: 0;left: 50%;width: 45px;height: 45px;position: absolute;margin-left: -50px;">
              <img
                class="promote"
                v-if="info.promote"
                src="@/assets/images/grade/employee/promote.png"
                alt
              />
            </div>
          </div>
          <div class="staff">{{info.staffName}}</div>
          <div class="row">
            <div class="col-45">职位头衔</div>
            <div class="col-55">{{info.jobName}}</div>
          </div>
          <div class="row">
            <div class="col-45">入职时间</div>
            <div class="col-55">{{info.entryTime}}</div>
          </div>
          <div class="row">
            <div class="col-45">晋升信息</div>
            <div class="col-55">{{info.upgradeText}}</div>
          </div>
          <div class="row">
            <div class="col-45">调动信息</div>
            <div class="col-55">{{info.transferText}}</div>
          </div>
          <div class="row">
            <div class="col-45">直接评估人</div>
            <div class="col-55">{{info.directPeopleName}}</div>
          </div>
          <div class="row">
            <div class="col-45">直接评估人-绩效评价</div>
            <div class="col-55">{{info.directPeoplePerformanceEvaluate}}</div>
          </div>
          <div class="row last-row">
            <div class="col-45">直接评估人-文化评价</div>
            <div class="col-55">{{info.directPeopleCultureEvaluate}}</div>
          </div>
        </div>
      </div>
    </div>
    <goIndex></goIndex>
  </div>
</template>

<script>
import "./employeeGrade.scss";
import StackBar from "@/components/tables/stackBar";
import ComTotal from "@/components/tables/comTotal";
import TableTitle from "@/components/TableTitle/TableTitle";
import Title from "@/components/Title/Title";
import { Select, Option } from "element-ui";
import goIndex from '@/components/goIndex/goIndex'
export default {
  components: {
    StackBar,
    ComTotal,
    TableTitle,
    Title,
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
    searchInfo(info) {
      this.info = info;
      console.log(1111, info);
    },
    goBack() {
      this.$router.push({
        name: "grade"
      });
    },
    filter(btn) {
      this.active = btn.name;
      if (btn.name === "确认") {
        debugger;
        if (
          this.com.length > 0 ||
          this.region.length > 0 ||
          this.pos.length > 0 ||
          this.promotion !== ""
        ) {
          let para = {
            "companyIds[]": this.com.join(","),
            "areaIds[]": this.id ? this.id : this.region.join(","),
            "positionIds[]": this.pos.join(","),
            isPromote: this.promotion
          };
          this.$http
            .get("/companyperformancedata/selectPerformacePage", para)
            .then(response => {
              this.showInfo = response;
            })
            .catch(error => {
              alert(error.message);
            });
        }
      } else {
        this.changeRegion();
        this.com = [];
        this.region = [];
        this.pos = [];
        this.promotion = "";
        this.getData();
      }
    },
    getData() {
      const para = {
        "companyIds[]": "",
        "areaIds[]": this.id,
        "positionIds[]": "",
        isPromote: ""
      };
      this.$http
        .get("/companyperformancedata/selectPerformacePage", para)
        .then(response => {
          //全部
          this.showInfo = response;
        })
        .catch(error => {
          alert(error.message);
        });
    }
  },
  data() {
    return {
      info: {},
      height: "",
      active: "",
      popover: "",
      btns: [{ name: "确认", active: false }, { name: "重置", active: false }],
      regionOptions: [],
      comOptions: [],
      posOptions: [],
      promotionOptions: [
        { label: "是", value: true },
        { label: "否", value: false }
      ],
      promotion: "",
      region: [],
      com: [],
      pos: [],
      showInfo: {}
    };
  },
  created() {
    this.id = this.$route.params.id || "";
    this.getData();

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
    //查职能
    this.$http
      .get("/position/selectPosition", { "positionIds[]": "" })
      .then(response => {
        response.forEach((element, i) => {
          element.label = element.positionName;
          element.value = element.id;
          this.posOptions.push(element);
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