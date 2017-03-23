<template>
  <div class="confirmation">
    <div class="message">{{ message }}</div>
    <div class="buttons">
      <button class="small" v-for="(action, index) in actions" :key="index" @click="action.callback">{{ action.label }}</button>
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

  .confirmation {
    display: flex;
    flex-direction: column;
  }

  .message {
    padding: 10px 20px;
  }

  .buttons {
    display: flex;
    padding: 0 10px;
    margin-bottom: 10px;
    button {
      flex-grow: 1;
      height: 30px;
      margin: 0 10px;
    }
  }

</style>
