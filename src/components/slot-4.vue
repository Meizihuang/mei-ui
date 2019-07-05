<template>
  <div class="slot4">
    <slot name="slot4" :person="person">无内容分发</slot>
  </div>
</template>

<script>
export default {
  name: "slot4",
  data() {
    return {
      person: {
        header: "header",
        footer: "footer"
      }
    };
  }
};
</script>