<template>
  <div class="channels-view">

    <div class="channel-list">
      <div class="label">Mes channels</div>
      <channel-line v-for="channel in joinedChannels"
        :key="channel.uuid"
        :channel="channel"
        :quit="!!channel.uuid"
        @quit="quit(channel)"
      />
    </div>

    <div class="channel-list" v-if="unjoinedChannels.length">
      <div class="label">Les autres channels</div>
      <channel-line v-for="channel in unjoinedChannels"
        :key="channel.uuid"
        :channel="channel"
        :join="true"
        @join="join(channel)"
      />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChannelLine from '@/components/ChannelLine'
import { joinChannel, quitChannel } from '@/api/channel-api'

export default {
  name: 'channels-view',

  computed: {
    ...mapGetters([
      'joinedChannels',
      'unjoinedChannels'
    ])
  },

  methods: {
    join (channel) {
      joinChannel(channel.uuid)
    },

    quit (channel) {
      quitChannel(channel.uuid)
    }
  },

  components: {
    ChannelLine
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';

  .channels-view {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .channel-list {
    &:not(:first-child) {
      margin-top: 25px;
    }
  }

  .label {
    font-weight: bold;
    padding-bottom: 5px;
    text-shadow: 0 1px 0 white;
    border-bottom: solid 3px lightgrey;
    text-align: center;
  }

</style>
