<template>
  <div class="submit-line">
    <span class="submitting"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></span>
    <button @click="$emit('reinit')" title= "Réinitialiser" class="small refresh"><i class="fa fa-refresh" aria-hidden="true"></i></button>
    <button @click="$emit('submit')" title= "Envoyer" class="small refresh"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
  </div>
</template>

<script>


export default {
  name: 'submit-line',

  props: {
    status: String
  },


  methods: {

  },

}
</script>

<style lang="scss" scoped>
  @import '../assets/style';

  .submit-line {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    button {
      margin-left: 10px;
    }
  }

</style>
