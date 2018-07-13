<template>
  <div class="proposal-creation">
    <div class="index">{{ index + 1 }}</div>
    <div class="content">
      <text-input class="simple title" placeholder="Titre" v-model="proposal.title"/>
      <text-input textarea class="simple description" placeholder="Description" v-model="proposal.description"/>
    </div>
    <button v-if="canRemove" @click="$emit('remove')" class="remove simple"><i class="fa fa-minus" aria-hidden="true"></i></button>
    <div class="void" v-else/>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput'

export default {
  name: 'proposal-creation',

  props: {
    proposal: Object,
    index: Number,
    canRemove: Boolean
  },

  components: {
    TextInput
  }
}
</script>

<style lang="scss" scoped>
.proposal-creation {
  display: flex;
  position: relative;
  align-items: center;
  flex-shrink: 0;
  justify-content: space-around;
}

.text-input {
  &:not(:first-child) {
    margin: 10px 0;
  }
}

.index {
  text-shadow: 0 1px 0 white;
  position: relative;
  font-weight: bold;
  font-size: 2em;
  color: grey;
  padding-right: 20px;
  display: flex;
  justify-content: center;
  width: 30px;
}

.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  font-weight: bold;
  font-size: 1em;
}
.description {
  font-size: 0.7em;
}

.remove {
  width: 30px;
  height: 30px;
  margin-left: 20px;
}

.void {
  width: 40px;
  height: 40px;
  margin-left: 10px;
}
</style>
