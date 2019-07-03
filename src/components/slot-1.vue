<template>
  <div class="slot-1">
    <a v-bind:href="url">
      <slot>111111111</slot>
    </a>
  </div>
</template>

<script>
export default {
  props: ["url"]
};
</script>
