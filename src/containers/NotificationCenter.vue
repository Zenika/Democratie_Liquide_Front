<template>
  <div class="notification-center">
    <transition-group name="zoom-out">
      <div v-for="(notification, index) in notifications"
        v-if="notification.visible"
        @click="hideNotification(notification)"
        @mouseenter="keepNotification(notification)"
        @mouseleave="hideNotificationAfterDelay(notification)"
        :class="notification.type || 'error'"
        :key="index"
        class="notification"
      >
        <div class="title">{{ notification.title }}</div>
        <div class="description">{{ notification.message }}</div>
        <div class="close"><i class="fa fa-times"/></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'notification-center',

  computed: {
    ...mapGetters(['notifications'])
  },

  methods: {
    ...mapActions(['hideNotification', 'keepNotification', 'hideNotificationAfterDelay'])
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style';
@import '../assets/transitions';

.notification-center {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  top: 5px;
  right: 5px;
  z-index: 25;

  .notification {
    position: relative;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    width: 300px;
    opacity: 0.9;
    color: white;
    text-align: center;
    transition: all 200ms ease;
    cursor: pointer;
    overflow: hidden;

    &.error {
      background: map-get($reds, 'medium');
    }
    &.info {
      background: map-get($blues, 'medium');
    }
    &.success {
      background: map-get($greens, 'medium');
    }

    &:hover {
      opacity: 0.5;
      transform: scale(0.95, 0.95);
    }

    .title {
      font-size: 1.1em;
      font-weight: bold;
    }

    .close {
      position: absolute;
      right: 5px;
      top: 1px;
    }
  }
}
</style>
