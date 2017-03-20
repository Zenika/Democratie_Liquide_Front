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
    padding: 5px;


    .header {
      border-bottom: solid 1px lightgray;
      padding-bottom: 10px;

      .title {
        font-weight: bold;
        padding-right: 10px;
        font-size: 1.5em;
      }

      .actions {
        margin-top: 5px;
      }

    }

    .proposals {
      overflow: auto;

      * {
        padding: 10px;
        position: relative;
        &:not(:last-child):after {
          content: '';
          height: 1px;
          left: 0;
          bottom: 0;
          right: 0;
          transform: scaleX(0.5);
          background: lightgray;
          position: absolute;
        }
      }
    }
  }

}


</style>
