<template>
 <div class="goIndex" @click="goIndex">
      <img src="@/assets/images/components/back_icon.png" />
 </div>
</template>

<script>
import './goIndex.scss'
export default {
  methods: {
    goIndex() {
      this.$router.push({
        name: "chooseInfo"
      });
    }
  },
  data() {
    return {
    };
  }
};
</script>