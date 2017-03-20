<template>
    <div class="subject-view">
      <div class="subject" v-if="Object.keys(subject).length">
        <div class="header">
          <div class="title">{{ subject.title }}</div>
          <div class="description">{{ subject.description }}</div>
          <div class="actions" v-if="voteView">
            <button @click="reinitialize" title= "Réinitialiser" class="small refresh"><i class="fa fa-refresh" aria-hidden="true"></i></button>
            <button @click="send" title= "Envoyer" class="small refresh"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
          </div>
        </div>
        <div class="proposals">
          <proposal v-for="proposal in subject.propositions"
            :key="proposal.uuid"
            :maxPoints="subject.maxPoints"
            :totalPoints="totalPoints"
            :proposal="proposal"
            :mode="mode"
          />
        </div>
      </div>
      <div v-else>
        Aucun sujet trouvé
      </div>
    </div>
</template>

<script>
import Proposal from '@/components/Proposal'
import { getSubject, submitVote } from '@/api/subject-api'

export default {
  props: {
    subjectId: String,
    mode: {
      type: String,
      validator: value => ['create', 'vote', 'result'].indexOf(value) !== -1
    }
  },

  data () {
    return {
      subject: {}
    }
  },

  computed: {

    totalPoints () {
      return this.subject.propositions.reduce((sum, proposal) => sum + proposal.points || 0, 0)
    },

    createView () {
      return !this.subject
    },

    resultView () {
      return this.subject.isVoted || this.subject.isClosed
    },

    voteView () {
      return !this.resultView
    }
  },

  methods: {
    reinitialize () {
      this.subject.propositions.map(proposal => { proposal.points = 0 })
    },

    fetch () {
      getSubject(this.subjectId).then(({data}) => {
        this.subject = data
        // this.subject.maxPoints = 27
      })
    },

    send () {
      let choices = []
      this.subject.propositions.forEach(proposal => {
        choices.push({
          propositionId: proposal.id,
          points: proposal.points
        })
      })
      submitVote(this.subjectId, choices).then(

        () => {
          this.fetch()
        },

        error => {
          console.log(error)
        }
      )
    }
  },

  created () {
    this.fetch()
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
