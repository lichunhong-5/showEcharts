<template>
  <div class="popover">
    <div class="show">
      <div id="info" :class="[showPop.type === 'StackBar' ? 'height-354' : (showPop.type === 'GradientColor' ? 'height-404' : (showPop.type === 'Gallery' ? 'height-435' : (showPop.type==='sCompare'?'height-346':''))) ]">
        <div class="title center">{{showPop.name}}</div>
        <img @click="$emit('close')" class="close" src="@/assets/images/components/close.png" alt />
        <component :is="showPop.type" v-bind:[type]="showPop.data" id="showPop.data.id" :top="top"></component>
      </div>
    </div>
  </div>
</template>

<script>
import "./Popover.scss";
import StackBar from "@/components/tables/stackBar";
import GradientColor from "@/components/tables/GradientColor";
import Gallery from "@/components/tables/gallery";
import sCompare from "@/components/tables/sCompare";
export default {
    props:['showPop'],
    components: {
        StackBar,
        GradientColor,
        Gallery,
        sCompare,
    },
    data() {
        return {
            type: this.showPop.type+'Data',
            top:''
        }
    },
    beforeMount () {
        if(this.showPop.type === 'StackBar'){
            this.type = 'stackData'
        }else if(this.showPop.type === 'GradientColor'){
            this.type = 'gradientData'
        }else if(this.showPop.type === 'Gallery'){
            this.type = 'dataGallery';
            this.top = '13%'
        }else if(this.showPop.type === 'sCompare'){
            this.type = 'sCompareData';
            this.top = '13%'
        }
    },
};
</script>