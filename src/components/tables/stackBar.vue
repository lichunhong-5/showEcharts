<template>
  <div style="width: 100%;height:100%;">
    <div :id="id" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
export default {
  props: ["id", "stackData", "top", "flag"],
  data() {
    return {
      stack: this.stackData
    };
  },
  methods: {
    initStack(stackData) {
      var myChart = this.$echarts.init(document.getElementById(this.id));
      // 指定图表的配置项和数据
      var option = {
        barWidth: 18,
        textStyle: {
          color: "#fff"
        },
        grid: {
          top: this.top ? this.top : 60,
          left: "5%",
          right: "10%",
          bottom: 0,
          height: "auto",
          containLabel: true
        },
        xAxis: {
          type: "value",
          formatter: "{value}%",
          show: false
        },
        yAxis: {
          type: "category",
          data: stackData.Y,
          axisLine: {
            show: false
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          axisLabel: {
            show: true,
            margin: 20,
            fontSize: 10
          }
        },
        series: [
          {
            // name: '直接访问',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[0],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[0],
              }
            },
            data: [stackData.X[0]]
          },
          {
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[1],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[1],
              }
            },
            data: [, stackData.X[1]]
          },
          {
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[2],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[2],
              }
            },
            data: [, , stackData.X[2]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[3],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[3],
              }
            },
            data: [, , , stackData.X[3]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[4],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[4],
              }
            },
            data: [, , , , stackData.X[4]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[5],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[5],
              }
            },
            data: [, , , , , stackData.X[5]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[6],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[6],
              }
            },
            data: [, , , , , , stackData.X[6]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[7],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[7],
              }
            },
            data: [, , , , , , , stackData.X[7]]
          },

          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[8],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[8],
              }
            },
            data: [, , , , , , , , stackData.X[8]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[9],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[9],
              }
            },
            data: [, , , , , , , , , stackData.X[9]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[10],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[10],
              }
            },
            data: [, , , , , , , , , ,stackData.X[10]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[11],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[11],
              }
            },
            data: [, , , , , , , , ,,, stackData.X[11]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[12],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[12],
              }
            },
            data: [, , , , , , , , ,,,, stackData.X[12]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[13],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[13],
              }
            },
            data: [, , , , , , , , ,,,,, stackData.X[13]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[14],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[14],
              }
            },
            data: [, , , , , , , , ,,,,,, stackData.X[14]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[15],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[15],
              }
            },
            data: [, , , , , , , , ,,,,,,, stackData.X[15]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[16],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[16],
              }
            },
            data: [, , , , , , , , ,,,,,,,, stackData.X[16]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[17],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[17],
              }
            },
            data: [, , , , , , , , ,,,,,,,,, stackData.X[17]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[18],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[18],
              }
            },
            data: [, , , , , , , , ,,,,,,,,,, stackData.X[18]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[19],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[19],
              }
            },
            data: [, , , , , , , , ,,,,,,,,,,, stackData.X[19]]
          },
          {
            // name: '',
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                offset: [8, 0],
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                color: stackData.colors[20],
                label: {
                  formatter: this.flag === "sum" ? "{c}%" : "{c}"
                }
              },
              emphasis: {
                color: stackData.colors[20],
              }
            },
            data: [, , , , , , , , ,,,,,,,,,,,, stackData.X[20]]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option,true);
    }
  },
  mounted() {
    this.initStack(this.stackData);
  },
  watch: {
    "stack.X"(newValue, oldValue) {
      this.initStack(this.stackData);
    }
  }
};
</script>