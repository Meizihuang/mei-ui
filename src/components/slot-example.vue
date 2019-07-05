<template>
  <ul class="slot-example">
    <slot>nothing</slot>
    <li class="header" :style="styleObjectHeader">
      <slot name="header"></slot>
    </li>
    <li class="body" v-for="(todo,index) in data" :key="index" :style="styleObjectItem">
      <slot name="body" :body="todo">
        <!-- 备用方案 -->
        <p v-for="(val,name) in todo" :key="name">{{ val }}</p>
      </slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: "slotExample",
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      tableProp: null
    };
  },
  computed: {
    styleObjectHeader() {
      return {
        display: "flex"
      };
    },
    styleObjectItem() {
      return {
        display: "flex"
      };
    }
  }
};
</script>