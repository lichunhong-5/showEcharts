<template>
  <div class="promotion">
    <Title @goBack="goBack" title="晋升比例看版"></Title>

    <TableTitle class="tableTitle" name="区域数据" img="true"></TableTitle>
    <div class="row first-row">
      <div class="col-33" v-for="(item,index) in staffArea" :key="index">
        <div class="title-row">
          <img :src="item.icon" alt />
          <span>{{item.name}}</span>
        </div>
        <div class="content-row">
          <div class="first color">
            <div class="col-40"></div>
            <div class="col-30">人数</div>
            <div class="col-30">比例</div>
          </div>
          <div class="first">
            <div class="col-40">半年度晋升</div>
            <div class="col-30">{{item.半年度晋升人数}}</div>
            <div class="col-30">{{item.半年度晋升比例}}</div>
          </div>
          <div class="first">
            <div class="col-40">过程晋升</div>
            <div class="col-30">{{item.过程晋升人数}}</div>
            <div class="col-30">{{item.过程晋升比例}}</div>
          </div>
        </div>
        <div class="footer">
          <div class="first">
            <div class="col-40">年度晋升</div>
            <div class="col-30">{{item.年度晋升人数}}</div>
            <div class="col-30">{{item.年度晋升比例}}</div>
          </div>
        </div>
      </div>
    </div>

    <TableTitle class="tableTitleTwo" name="公司数据" img="true"></TableTitle>
    <div class="row">
      <div class="col-33" v-for="(item,index) in staffCom" :key="index">
        <div class="title-row">
          <img :src="item.icon" alt />
          <span>{{item.name}}</span>
        </div>
        <div class="content-row">
          <div class="first color">
            <div class="col-40"></div>
            <div class="col-30">人数</div>
            <div class="col-30">比例</div>
          </div>
          <div class="first">
            <div class="col-40">半年度晋升</div>
            <div class="col-30">{{item.半年度晋升人数}}</div>
            <div class="col-30">{{item.半年度晋升比例}}</div>
          </div>
          <div class="first">
            <div class="col-40">过程晋升</div>
            <div class="col-30">{{item.过程晋升人数}}</div>
            <div class="col-30">{{item.过程晋升比例}}</div>
          </div>
        </div>
        <div class="footer">
          <div class="first">
            <div class="col-40">年度晋升</div>
            <div class="col-30">{{item.年度晋升人数}}</div>
            <div class="col-30">{{item.年度晋升比例}}</div>
          </div>
        </div>
      </div>
    </div>
    <goIndex></goIndex>
  </div>
</template>

<script>
import "./Promotion.scss";
import TableTitle from "@/components/TableTitle/TableTitle";
import Title from "@/components/Title/Title";
import goIndex from '@/components/goIndex/goIndex'
export default {
  components: {
    TableTitle,
    Title,
    goIndex
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "kanban"
      });
    }
  },
  data() {
    return {
      staffArea: [],
      staffCom: []
    };
  },
  created() {
    this.$http
      .get("/allstaffpromotedata/selectAllUp")
      .then(response => {
        //区域
        Object.keys(response.areamap).forEach((element, i) => {
          response.areamap[element].name = element;
          if (i % 3 === 1) {
            response.areamap[
              element
            ].icon = require("@/assets/images/grade/icon-third.png");
          } else if (i % 3 === 2) {
            response.areamap[
              element
            ].icon = require("@/assets/images/grade/icon-two.png");
          } else if (i % 3 === 0) {
            response.areamap[
              element
            ].icon = require("@/assets/images/grade/icon-one.png");
          }
          this.staffArea.push(response.areamap[element]);
        });
        //公司
        Object.keys(response.companymap).forEach((element, i) => {
          response.companymap[element].name = element;
          if (i % 3 === 1) {
            response.companymap[
              element
            ].icon = require("@/assets/images/grade/icon-third.png");
          } else if (i % 3 === 2) {
            response.companymap[
              element
            ].icon = require("@/assets/images/grade/icon-two.png");
          } else if (i % 3 === 0) {
            response.companymap[
              element
            ].icon = require("@/assets/images/grade/icon-one.png");
          }
          this.staffCom.push(response.companymap[element]);
        });
      })
      .catch(error => {
        alert(error.message);
      });
  }
};
</script>