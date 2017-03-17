<template>
    <div class="subject-view">
      <div class="subject" v-if="Object.keys(subject).length">
        <div class="header">
          <div class="title">{{ subject.title }}</div>
          <div class="description">{{ subject.description }}</div>
        </div>
        <div class="proposals">
          <proposal :key="proposal.uuid" v-for="proposal in subject.propositions" :proposal="proposal"/>
        </div>
      </div>
      <div v-else>
        Aucun sujet trouvé
      </div>
    </div>
</template>

<script>
import Proposal from '@/components/Proposal'
import api from '@/config/api'

export default {
  props: {
    subjectId: String
  },

  data () {
    return {
      subject: {}
    }
  },

  created () {
    console.log(this.subjectId)
    api.get('api/subjects/' + this.subjectId).then(({data}) => {
      this.subject = data
    })
  },

  components: {
    Proposal
  }
}

</script>

<style lang="scss" scoped>

.subject-view {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%;


  .subject {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header {
      border-bottom: solid 1px lightgray;

      .title {
        font-weight: bold;
        font-size: 1.5em;
      }
    }

    .proposals {
      overflow: auto;
    }
  }

}


</style>
