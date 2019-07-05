<template>
  <div class="slot-example-header" :style="styleObject">{{ label }}</div>
</template>

<script>
export default {
  name: "slotExampleHeader",
  props: {
    prop: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    width: {
      type: [Number, String],
      default: 180
    }
  },
  computed: {
    styleObject() {
      return {
        width: `${Number(this.width)}px`,
        cloor: "rgb(247, 172, 10)",
        fontSize: "16px",
        textAlign: "center",
        backgroundColor: "#555"
      };
    }
  }
};
</script>
