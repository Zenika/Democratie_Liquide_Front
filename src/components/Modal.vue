<template>
  <div class="modal-container">
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
</template>

<script>
export default {
  name: 'modal',

  props: {
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

.modal-container {
  // overflow-x: hidden;
  // overflow-y: auto;
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
    max-height: 90%;
    max-width: 90%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

      .header {
        display: flex;
        justify-content: center;
        flex-shrink: 0;

        .title {
          text-shadow: 0px 1px 0px white;
          color: darkgray;
          padding-right: 50px;
          padding-left: 50px;
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
