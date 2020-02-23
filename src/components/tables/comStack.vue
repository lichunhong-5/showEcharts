<template>
  <div style="width: 100%;height:100%;">
    <div :id="id" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
export default {
  props: ["id", "stackCompare", "top", "bottom"],
  data() {
    return {
      stack: this.stackCompare
    };
  },
  mounted() {
    this.initStack(this.stack);
  },
  methods: {
    initStack(stack) {
      var myChart = this.$echarts.init(document.getElementById(this.id));
      // 指定图表的配置项和数据
      var option = {
        barWidth: 28,
        legend: {
          data: stack.Y,
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "5%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: stack.names,
          axisLabel: {
            show: true,
            color: "#fff",
            margin: 20
          }
        },
        series: [
          {
            name: stack.Y[0],
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            itemStyle: {
              normal: {
                color: stack.colors[0],
                label: {
                  formatter: "{c}%"
                }
              },
              emphasis: {
                color: stack.colors[0]
              }
            },
            data: stack.X[0]
          },
          {
            name: stack.Y[1],
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            itemStyle: {
              normal: {
                color: stack.colors[1],
                label: {
                  formatter: "{c}%"
                }
              },
              emphasis: {
                color: stack.colors[1]
              }
            },
            data: stack.X[1]
          },
          {
            name: stack.Y[2],
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            itemStyle: {
              normal: {
                color: stack.colors[2],
                label: {
                  formatter: "{c}%"
                }
              },
              emphasis: {
                color: stack.colors[2]
              }
            },
            data: stack.X[2]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  watch: {
    "stack.X"() {
      this.initStack(this.stack);
    },
    "stack.names"() {
      this.initStack(this.stack);
    }
  }
};
</script>