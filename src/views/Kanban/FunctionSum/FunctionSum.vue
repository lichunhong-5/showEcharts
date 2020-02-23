<template>
  <div class="functionSum">
    <Title @goBack="goBack" title="各职能总数据"></Title>

    <TableTitle class="tableTitle" name="区域数据" img="true"></TableTitle>
    <div class="row first-row">
      <div
        class="col-50"
        v-for="(item,index) in staffArea"
        :key="item.id"
        @click="showPopFlag('StackBar',item)"
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
        <div class="sort" @click.stop="sort(item,'com',index)">
          <span style="font-size:12px">排序</span>
          <img
            style="width:8px;height:10px;margin-left:2px"
            :src="item.sort?(item.sort===1?require('@/assets/images/Kanban/sort/small.png'):require('@/assets/images/Kanban/sort/big.png')):require('@/assets/images/Kanban/sort/no.png')"
            alt
          />
        </div>
        <StackBar :stackData="item" :id="item.id"></StackBar>
      </div>
    </div>
    <goIndex></goIndex>
    <Popover v-if="showPop.flag" :showPop="showPop" @close="showPop.flag = false"></Popover>
  </div>
</template>

<script>
import "./FunctionSum.scss";
import StackBar from "@/components/tables/stackBar";
import TableTitle from "@/components/TableTitle/TableTitle";
import Title from "@/components/Title/Title";
import Popover from "@/components/Popover/Popover";
import goIndex from '@/components/goIndex/goIndex'
export default {
  components: {
    StackBar,
    TableTitle,
    Title,
    Popover,
    goIndex
  },
  methods: {
    sort(staff, type, index) {
      staff.num++;
      if (staff.num % 2 === 1) {
        staff.sort = 1;
        var len = staff.X.length;
        let obj = {};
        for (var i = 0; i < len - 1; i++) {
          for (var j = 0; j < len - 1 - i; j++) {
            if (staff.X[j] > staff.X[j + 1]) {
              var temp = staff.X[j];
              staff.X[j] = staff.X[j + 1];
              staff.X[j + 1] = temp;
              var tempX = staff.Y[j];
              staff.Y[j] = staff.Y[j + 1];
              staff.Y[j + 1] = tempX;
            }
          }
        }
        obj = staff;
        if (type === "area") {
          obj.id = 'update0'+staff.id;
          this.staffArea.slice(index, 1, obj);
        } else if (type === "com") {
          obj.id = 'update0'+staff.id;
          this.staffCom.slice(index, 1, obj);
        }
      } else {
        staff.sort = 2;
        var len = staff.X.length;
        let obj = {};
        for (var i = 0; i < len - 1; i++) {
          for (var j = 0; j < len - 1 - i; j++) {
            if (staff.X[j] < staff.X[j + 1]) {
              var temp = staff.X[j];
              staff.X[j] = staff.X[j + 1];
              staff.X[j + 1] = temp;
              var tempX = staff.Y[j];
              staff.Y[j] = staff.Y[j + 1];
              staff.Y[j + 1] = tempX;
            }
          }
        }
        obj = staff;
        if (type === "area") {
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
    }
  },
  data() {
    return {
      showPop: {},
      staffArea: [],
      staffCom: []
    };
  },
  created() {
    this.$http
      .get("/companyperformancedata/selectAllPosition")
      .then(response => {
        //区域
        Object.keys(response.areamap).forEach(element => {
          let obj = {
            Y: [],
            X: [],
            colors: [],
            id: "reg" + element,
            name: element,
            sort: null,
            num: 0
          };
          Object.keys(response.areamap[element]).forEach((key, i) => {
            obj.Y.push(key);
            obj.X.push(response.areamap[element][key]);
            switch (i) {
              case 0:
                obj.colors.push("#FFD3CC");
                break;
              case 1:
                obj.colors.push("#EA8F7E");
                break;
              case 2:
                obj.colors.push("#FF8C75");
                break;
              case 3:
                obj.colors.push("#FFB584");
                break;
              case 4:
                obj.colors.push("#F5C16C");
                break;
              case 5:
                obj.colors.push("#8EE89E");
                break;
              case 6:
                obj.colors.push("#71C17F");
                break;
              case 7:
                obj.colors.push("#62A56C");
                break;
              case 8:
                obj.colors.push("#D7E7F2");
                break;
              case 9:
                obj.colors.push("#ACCAF2");
                break;
              case 10:
                obj.colors.push("#3FA2FF");
                break;
              case 11:
                obj.colors.push("#4F9DF2");
                break;
              case 12:
                obj.colors.push("#0069CA");
                break;
              case 13:
                obj.colors.push("#CDB3FF");
                break;
              case 14:
                obj.colors.push("#C79EF2");
                break;
              case 15:
                obj.colors.push("#8B4FFF");
                break;
              case 16:
                obj.colors.push("#7731FF");
                break;
            }
          });
          this.staffArea.push(obj);
        });

        //公司
        Object.keys(response.companymap).forEach(element => {
          let obj = {
            Y: [],
            X: [],
            colors: ["#02c0e8", "#0296f3", "#32ccff", "#33ffcc"],
            id: "com" + element,
            name: element,
            sort: null,
            num: 0
          };
          Object.keys(response.companymap[element]).forEach((key, i) => {
            obj.Y.push(key);
            obj.X.push(response.companymap[element][key]);
            switch (i) {
              case 0:
                obj.colors.push("#FFD3CC");
                break;
              case 1:
                obj.colors.push("#EA8F7E");
                break;
              case 2:
                obj.colors.push("#FF8C75");
                break;
              case 3:
                obj.colors.push("#FFB584");
                break;
              case 4:
                obj.colors.push("#F5C16C");
                break;
              case 5:
                obj.colors.push("#8EE89E");
                break;
              case 6:
                obj.colors.push("#71C17F");
                break;
              case 7:
                obj.colors.push("#62A56C");
                break;
              case 8:
                obj.colors.push("#D7E7F2");
                break;
              case 9:
                obj.colors.push("#ACCAF2");
                break;
              case 10:
                obj.colors.push("#3FA2FF");
                break;
              case 11:
                obj.colors.push("#4F9DF2");
                break;
              case 12:
                obj.colors.push("#0069CA");
                break;
              case 13:
                obj.colors.push("#CDB3FF");
                break;
              case 14:
                obj.colors.push("#C79EF2");
                break;
              case 15:
                obj.colors.push("#8B4FFF");
                break;
              case 16:
                obj.colors.push("#7731FF");
                break;
            }
          });
          this.staffCom.push(obj);
        });
      })
      .catch(error => {
        alert(error.message);
      });
  }
};
</script>