<template>
  <div style="width: 100%;" class="mcom">
    <div
      style="padding-bottom:30px;background-color: #22303C;width: 850px;border: 1px solid transparent;"
    >
      <div style="text-align: right;margin: 20px 30px 0 0">
        <img src="./sign.png" alt style="width: 300px" />
      </div>
      <div v-for="(id,index) in ids" :key="index" :id="id.id" style="width: 800px;height:200px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["compare"],
  data() {
    return {
      ids: [
        { id: "main", name: "管理类" },
        { id: "main1", name: "专业类" },
        { id: "main2", name: "基础类" }
      ],
      colors: [
        { first: "#DF6367", second: "#E53935", third: "#C62727" },
        {
          first: "#7986CB",
          second: "#5C6BC0",
          third: "#3F51B5",
          four: "303F9F"
        },
        {
          first: "#81C784",
          second: "#4CAF50",
          third: "#43A047",
          four: "388E3C",
          five: "1C7F33",
          six: "106235"
        }
      ],
      type: this.compare.type,
      X: this.compare.X
    };
  },
  mounted() {
    this.initCom();
  },
  watch: {
    "compare.X"() {
      this.initCom();
    },
    "compare.type"() {
      this.initCom();
    }
  },
  methods: {
    initCom() {
      var myChart = "";
      var option = {};
      for (let i = 0; i < this.ids.length; i++) {
        myChart = this.$echarts.init(document.getElementById(this.ids[i].id));
        option = {
          backgroundColor: "#22303C",
          title: {
            subtext: this.ids[i].name,
            subtextStyle: {
              color: "#fff",
              fontSize: 16
            },
            left: 20
          },
          grid: {
            left: 25,
            right: "4%",
            bottom: "3%",
            top: 40,
            containLabel: true
          },
          xAxis: {
            type: "value",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              // 网格
              show: false
            },
            axisLabel: {
              //刻度标签
              show: false
            }
          },
          yAxis: {
            type: "category",
            data: this.compare.X,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#fff",
              margin: 15
            }
          },
          series: [
            {
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  color: "#fff"
                }
              },
              data: this.compare.type[i][0],
              itemStyle: {
                color: this.colors[i].first,
                emphasis: {
                  color: this.colors[i].first
                }
              }
            },
            {
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  color: "#fff"
                }
              },
              data: this.compare.type[i][1],
              itemStyle: {
                color: this.colors[i].second,
                emphasis: {
                  color: this.colors[i].second
                }
              }
            },
            {
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  color: "#fff"
                }
              },
              data: this.compare.type[i][2],
              itemStyle: {
                color: this.colors[i].third,
                emphasis: {
                  color: this.colors[i].third
                }
              }
            },
            {
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  color: "#fff"
                }
              },
              data: this.compare.type[i][3],
              itemStyle: {
                color: this.colors[i].four,
                emphasis: {
                  color: this.colors[i].four
                }
              }
            },
            {
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  color: "#fff"
                }
              },
              data: this.compare.type[i][4],
              itemStyle: {
                color: this.colors[i].five,
                emphasis: {
                  color: this.colors[i].five
                }
              }
            },
            {
              type: "bar",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  color: "#fff"
                }
              },
              data: this.compare.type[i][5],
              itemStyle: {
                color: this.colors[i].six,
                emphasis: {
                  color: this.colors[i].six
                }
              }
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    }
  }
};
</script>