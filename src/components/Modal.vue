<template>
  <transition name="modal">
    <div v-show="visible" class="modal-container">
      <div class="overlay" @click="close"></div>
      <div class="modal-box">
        <div class="header">
          <div class="title">{{ title }}</div>
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
  name: 'modal',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
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


.modal-enter, .modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.modal-enter-active, .modal-leave-active {
  transition: all 250ms
}

.modal-enter-to, .modal-leave {
  opacity: 1;
}


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
  z-index: 10;

  .overlay {
    background: rgba(0,0,0,0.5);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .modal-box {
    background: #eee;
    position: relative;
    border-radius: 10px;
    min-width: 100px;
    min-height: 100px;
    z-index: 20;
    box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.25);
    max-height: 90vh;
    max-width: 90vw;
    overflow-y: hidden;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

      .header {
        display: flex;
        justify-content: center;

        .title {
          text-shadow: 0px 1px 0px white;
          color: darkgray;
          padding-right: 20px;
          padding-left: 20px;
          padding-top: 3px;
          padding-bottom: 3px;
          font-size: 0.8em;
          font-weight: bold;
          text-align: center;
          white-space: nowrap;
        }

        .close {
          text-shadow: 0px 1px 0px white;
          cursor: pointer;
          position: absolute;
          color: darkgrey;
          right: 5px;
          top: 1px;
          &:hover {
            color: gray;
          }
        }
      }


    .modal-content {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding-bottom: 5px;
      padding-left: 5px;
      padding-right: 5px;
    }
  }
}

</style>
