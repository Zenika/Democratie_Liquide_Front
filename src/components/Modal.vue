<template>
  <transition name="fade">
    <div v-show="visible" class="modal-container">
      <div class="overlay" @click="close"></div>
      <div class="modal-box">
        <div class="close" @click="close"><i class="fa fa-times"/></div>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/transitions';

.modal-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .overlay {
    background: rgba(0,0,0,0.5);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .modal-box {
    background: white;
    position: relative;
    border-radius: 10px;
    min-width: 200px;
    min-height: 200px;
    z-index: 20;
    box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.25);

      .close {
        position: absolute;
        color: darkgrey;
        right: 5px;
        top: 1px;
    }

    .modal-content {
      position: relative;
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
}

</style>
