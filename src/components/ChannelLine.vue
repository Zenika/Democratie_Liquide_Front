<template>
  <div class="channel-line">

    <div class="text">
      <div class="collaborators">
        <i class="fa fa-user" aria-hidden="true"></i>
        {{ channel.uuid ? channel.collaborators.length : 'all' }}
      </div>

      <div class="title">
        {{ channel.title }}
      </div>

      <div class="description">
        {{ channel.description }}
      </div>
    </div>

    <div class="actions">
      <button v-if="join" @click="$emit('join')" title="Rejoindre" class="small"><i class="fa fa-sign-in" aria-hidden="true"></i></button>
      <button v-if="quit" @click="$emit('quit')" title="Quitter" class="small"><i class="fa fa-sign-out" aria-hidden="true"></i></button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'channel-line',

  props: {
    channel: Object,
    join: Boolean,
    quit: Boolean
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';

  .channel-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    &:nth-child(2n) {
      background: rgba(0,0,0,0.05);
    }
  }

  .collaborators {
    color: grey;
    font-weight: bold;
    font-size: 0.7em;
    width: 30px;
    white-space: nowrap;
    .fa {
      margin-right: -2px;
      font-size: 1.3em;
    }
  }

  .title {
    font-weight: bold;
  }

  .text {
    display: flex;
    align-items: center;
    & > {
      padding-right: 20px;
    }
  }

</style>
