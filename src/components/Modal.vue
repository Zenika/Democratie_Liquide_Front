<template>
  <transition name="modal">
    <div class="modal-container">
      <div class="overlay" @click="close"></div>
      <div class="modal-box">
        <div class="header">
          <div :title="title" class="title">{{ title }}</div>
          <div class="close" @click="close"><i class="fa fa-times"/></div>
        </div>
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
    title: {
      type: String,
      default: 'Lorem ipsum coucou coucou'
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

    .header {
      position: absolute;
      border-bottom: solid 1px lightgray;
      color: darkgray;
      top: 0;
      left: 0;
      right: 0;
      height: 35px;

      .title {
        margin-top: 8px;
        margin-left: 10px;
        margin-right: 35px;
        text-shadow: 0px 1px 0px white;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .close {
        position: absolute;
        color: darkgrey;
        right: 10px;
        top: 10px;
        * {
          vertical-align: top;
        }
      }
    }

    .modal-content {
      position: relative;
      margin-top: 40px;
      margin-bottom: 5px;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


</style>
