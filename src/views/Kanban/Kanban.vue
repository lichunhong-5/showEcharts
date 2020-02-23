<template>
  <div class="Kanban">
    <Title @goBack="goBack" title="数据看版"></Title>
    <div class="row">
      <div class="col-50">
        <div style="width:100%;margin-left:9%">
          <div class="row-left staff" @click="goDetail('staff')" v-if="status[0]">
            <TableTitle name="全员数据" img="true"></TableTitle>
            <StackBar :stackData="staff" id="staff" top="40"></StackBar>
          </div>
          <div class="row-left sCom" @click="goDetail('function')" v-if="status[2]">
            <TableTitle name="各司职位序列分布" img="true"></TableTitle>
            <sCompare id="job-sCom" :sCompareData="sCom"></sCompare>
          </div>
          <div class="row-left ManagementTrainee" @click="goDetail('managementTrainee')" v-if="status[4]">
            <TableTitle name="管培生绩效分布" img="true"></TableTitle>
            <Gallery :dataGallery="ManagementTrainee" id="ManagementTrainee"></Gallery>
          </div>
          <div class="row-left cultureCom" @click="goDetail('cultureCom')" v-if="status[6]">
            <TableTitle name="文化评估比例-公司" img="true"></TableTitle>
            <Gallery :dataGallery="cultureCom" id="cultureCom"></Gallery>
          </div>
          <div class="row-left functionSum" @click="goDetail('functionSum')" v-if="status[8]">
            <TableTitle name="各职能总数据" img="true"></TableTitle>
            <div class="btn">
              <img src="@/assets/images/Kanban/click.png" alt />
            </div>
          </div>
        </div>
      </div>

      <div class="col-50">
        <div class="row-right job" @click="goDetail('comPosition')" v-if="status[1]">
          <TableTitle name="各司职能分布" img="true"></TableTitle>
          <GradientColor :gradientData="comPosition" id="job"></GradientColor>
        </div>
        <div class="row-right kpiDis" @click="goDetail('kpiDis')" v-if="status[3]">
          <TableTitle name="绩效评估分布" img="true"></TableTitle>
          <Gallery :dataGallery="kpiDis" id="kpiDis"></Gallery>
        </div>
        <div class="row-right score-sum" @click="goDetail('scoreSum')" v-if="status[5]">
          <TableTitle name="文化总分分布" img="true"></TableTitle>
          <StackBar flag="sum" :stackData="scoreSum" id="score-sum"></StackBar>
        </div>
        <div class="row-right culturePos" @click="goDetail('culturePos')" v-if="status[7]">
          <TableTitle name="文化评估比例-职能" img="true"></TableTitle>
          <Gallery :dataGallery="culturePos" id="culturePos"></Gallery>
        </div>
        <div class="row-right promotion" @click="goDetail('promotion')" v-if="status[9]">
          <TableTitle name="晋升比例看板" img="true"></TableTitle>
          <div class="btn">
            <img src="@/assets/images/Kanban/click.png" alt />
          </div>
        </div>
      </div>
    </div>
    <goIndex></goIndex>
  </div>
</template>

<script>
import "./Kanban.scss";
import Title from "@/components/Title/Title";
import Gallery from "@/components/tables/gallery";
import StackBar from "@/components/tables/stackBar";
import TableTitle from "@/components/TableTitle/TableTitle";
import sCompare from "@/components/tables/sCompare";
import GradientColor from "@/components/tables/GradientColor";
import goIndex from '@/components/goIndex/goIndex'
export default {
  components: {
    Title,
    Gallery,
    TableTitle,
    StackBar,
    sCompare,
    GradientColor,
    goIndex
  },
  methods: {
    goDetail(item) {
      this.$router.push({
        name: item
      });
    },
    goBack() {
      this.$router.push({
        name: "chooseInfo"
      });
    }
  },
  data() {
    return {
      status:[],
      ManagementTrainee: {
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
        ]
      },
      kpiDis: {
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
        ]
      },
      cultureCom: {
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
        ]
      },
      culturePos: {
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
        ]
      },
      staff: {
        Y: ["总在岗人数", "2019年年度离职", "2019年年度入职", "总参评人数"],
        X: [],
        colors: ["#02c0e8", "#0296f3", "#32ccff", "#33ffcc"]
      },
      scoreSum: {
        Y: ["高", "中", "低"],
        X: [],
        colors: ["#0296f3", "#32ccff", "#33ffcc"],
        long: "%"
      },
      comPosition: {
        Y: [],
        X: [],
        colors: ["#06999e", "#00F1FE", "#0050A8"],
        id: "华东区域"
      },
      sCom: {
        X: [[], [], []]
      }
    };
  },
  created() {
    this.$http
      .get("/allstaffpromotedata/queryData")
      .then(response => {
        Object.keys(response).forEach(element => {
          if (element === "全员数据") {
            Object.keys(response[element])
              .reverse()
              .forEach((e, i) => {
                this.staff.X.push(response[element][e]);
              });
          } else if (element === "各司职能排布") {
            Object.keys(response[element])
              .forEach((e, i) => {
                this.comPosition.Y.push(response[element][e]);
                this.comPosition.X.push(e);
              });
          } else if (element === "各司职位序列分布") {
            Object.keys(response[element])
              .reverse()
              .forEach((e, i) => {
                Object.keys(response[element][e]).forEach(key => {
                  this.sCom.X[i].push(response[element][e][key]);
                });
              });
          } else if (element === "绩效评估分布") {
            Object.keys(response[element])
              .reverse()
              .forEach((e, i) => {
                Object.keys(response[element][e]).forEach(key => {
                  this.kpiDis.Y[i].push(response[element][e][key]);
                });
              });
          } else if (element === "管培生绩效评估分布") {
            Object.keys(response[element])
              .reverse()
              .forEach((e, i) => {
                Object.keys(response[element][e]).forEach(key => {
                  this.ManagementTrainee.Y[i].push(
                    response[element][e][key]
                  );
                });
              });
          } else if (element === "文化总分分布") {
            Object.keys(response[element])
              // .reverse()
              .forEach((e, i) => {
                this.scoreSum.X.push(response[element][e]);
              });
          } else if (element === "文化评估比例-公司") {
            Object.keys(response[element])
              // .reverse()
              .forEach((e, i) => {
                Object.keys(response[element][e]).forEach(key => {
                  this.cultureCom.Y[i].push(response[element][e][key]);
                });
              });
          } else if (element === "文化评估比例-职能") {
            Object.keys(response[element])
              // .reverse()
              .forEach((e, i) => {
                Object.keys(response[element][e]).forEach(key => {
                  this.culturePos.Y[i].push(response[element][e][key]);
                });
              });
          }
        });
      })
      .catch(error => {
        alert(error.message);
      });
    //状态
    this.$http
      .get("/chartconfig/getChartConfig")
      .then(response => {
        response.forEach(element => {
          this.status.push(element.status)
        })
      })
      .catch(error => {
        alert(error.message);
      });
  }
};
</script>