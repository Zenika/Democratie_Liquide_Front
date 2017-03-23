<template>
  <div class="confirmation">
    <div class="message">{{ message }}</div>
    <div class="buttons">
      <button class="simple" v-for="(action, index) in actions" :key="index" @click="action.callback">{{ action.label }}</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'confirmation',

  props: {
    message: String,
    actions: Array
  }

}

</script>

<style lang="scss" scoped>

  @import '../assets/style';

</style>
