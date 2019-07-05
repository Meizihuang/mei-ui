<template>
  <div class="slot3">
    <slot></slot>
    <slot name="slot3" :user="user" :person="person">{{ user.firstName }}</slot>
  </div>
</template>

<script>
export default {
  name: "slot3",
  data() {
    return {
      user: {
        firstName: "zhang",
        lastName: "peng"
      },
      person: {
        header: "header",
        footer: "footer"
      }
    };
  }
};
</script>