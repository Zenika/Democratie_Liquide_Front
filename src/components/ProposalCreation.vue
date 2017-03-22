<template>
  <div class="proposal-creation">
    <div class="index">{{ index + 1 }}</div>
    <div class="content">
      <input class="simple title" placeholder="Titre" v-model="proposal.title"/>
      <textarea class="simple description" placeholder="Description" v-model="proposal.description"/>
    </div>
    <button v-if="canRemove" @click="$emit('remove')" class="remove simple"><i class="fa fa-minus" aria-hidden="true"></i></button>
    <div class="void" v-else/>
  </div>
</template>

<script>

export default {
  name: 'proposal-creation',

  props: {
    proposal: Object,
    index: Number,
    canRemove: Boolean
  }
}
</script>

<style lang="scss" scoped>

  .proposal-creation {
    display: flex;
    position: relative;
    align-items: center;
  }

  input, textarea {
    &:not(:first-child) {
      margin: 5px 0;
    }
  }

  .index {
    text-shadow: 0 1px 0 white;
    position: relative;
    font-weight: bold;
    font-size: 2em;
    color: grey;
    padding-right: 15px;
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
    margin-left: 10px;
  }

  .void {
    width: 30px;
    height: 30px;
    margin-left: 10px;
  }
</style>
