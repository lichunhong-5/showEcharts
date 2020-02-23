<template>
  <div class="table-title">
    <img v-if="img === 'true'" src="@/assets/images/Kanban/table_title.png" alt />
    <span v-if="name">{{name}}</span>
  </div>
</template>

<script>
import "./TableTitle.scss";
export default {
    props:['name','img']
};
</script>