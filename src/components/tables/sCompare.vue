<template>
  <div style="width: 100%;height:100%;" class="scom">
    <div style="width: 100%;height:100%;border:.1px solid transparent">
      <div class="img" :class="[top?'mt-5':'', {'mt_20':mt}]">
        <img src="./sign.png" alt style="width: 200px" />
      </div>
      <div :id="id" style="width: 100%;" :class="[top?'height-68':'height-75']"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "top", "mt", "sCompareData"],
  data() {
    return {
      compare: this.sCompareData
    };
  },
  mounted() {
    this.initStack(this.compare);
  },
  watch: {
    "compare.X"() {
      this.initStack(this.compare);
    }
  },
  methods: {
    initStack() {
      var myChart = this.$echarts.init(document.getElementById(this.id));
      var option = {
        barWidth: 18,
        grid: {
          left: "5%",
          right: "4%",
          bottom: "13%",
          top: 25,
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
          data: ["基础类", "专业类", "管理类"],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#fff",
            margin: 20,
            fontSize: 10
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
            data: [this.compare.X[0][0] !== 0 ? this.compare.X[0][0] : null],
            itemStyle: {
              color: "#81C784",
              emphasis: {
                color: "#81C78"
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
            data: [this.compare.X[0][1] !== 0 ? this.compare.X[0][1] : null],
            itemStyle: {
              color: "#4CAF50",
              emphasis: {
                color: "#4CAF50"
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
            data: [this.compare.X[0][2] !== 0 ? this.compare.X[0][2] : null],
            itemStyle: {
              color: "#43A047",
              emphasis: {
                color: "#43A047"
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
            data: [this.compare.X[0][3] !== 0 ? this.compare.X[0][3] : null],
            itemStyle: {
              color: "#388E3C",
              emphasis: {
                color: "#388E3C"
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
            data: [this.compare.X[0][4] !== 0 ? this.compare.X[0][4] : null],
            itemStyle: {
              color: "#1C7F33",
              emphasis: {
                color: "#1C7F33"
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
            data: [this.compare.X[0][5] !== 0 ? this.compare.X[0][5] : null],
            itemStyle: {
              color: "#106235",
              emphasis: {
                color: "#106235"
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
            data: [
              null,
              this.compare.X[1][0] !== 0 ? this.compare.X[1][0] : null
            ],
            itemStyle: {
              color: "#7986CB",
              emphasis: {
                color: "#7986CB"
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
            data: [
              null,
              this.compare.X[1][1] !== 0 ? this.compare.X[1][1] : null
            ],
            itemStyle: {
              color: "#5C6BC0",
              emphasis: {
                color: "#5C6BC0"
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
            data: [
              null,
              this.compare.X[1][2] !== 0 ? this.compare.X[1][2] : null
            ],
            itemStyle: {
              color: "#3F51B5",
              emphasis: {
                color: "#3F51B5"
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
            data: [
              null,
              this.compare.X[1][3] !== 0 ? this.compare.X[1][3] : null
            ],
            itemStyle: {
              color: "#303F9F",
              emphasis: {
                color: "#303F9F"
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
            data: [
              null,
              null,
              this.compare.X[2][0] !== 0 ? this.compare.X[2][0] : null
            ],
            itemStyle: {
              color: "#DF6367",
              emphasis: {
                color: "#DF6367"
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
            data: [
              null,
              null,
              this.compare.X[2][1] !== 0 ? this.compare.X[2][1] : null
            ],
            itemStyle: {
              color: "#E53935",
              emphasis: {
                color: "#E53935"
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
            data: [
              null,
              null,
              this.compare.X[2][2] !== 0 ? this.compare.X[2][2] : null
            ],
            itemStyle: {
              color: "#C62727",
              emphasis: {
                color: "#C62727"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.scom {
  .img {
    text-align: right;
    margin: 11px 11px 0 0;
  }
  .mt-5 {
    margin-top: 5%;
  }
  .mt_20 {
    margin: 20px 20px 0 0;
  }
  .height-68 {
    height: 68%;
  }
  .height-75 {
    height: 75%;
  }
}
</style>