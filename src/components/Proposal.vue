<template>
  <div class="proposal">
    <div class="title">{{ proposal.title }}</div>
    <div class="description">{{ proposal.description }}</div>
  </div>
</template>

<script>

export default {
  name: 'proposal',

  props: {
    proposal: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
