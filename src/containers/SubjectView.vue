<template>
    <div class="subject-view">
      <div class="subject" v-if="Object.keys(subject).length">
        <div class="header">
          <div class="title">{{ subject.title }}</div>
          <div class="description">{{ subject.description }}</div>
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
        <div class="footer">
          <div class="actions" v-if="voteView">
            <button @click="reinitialize" title= "Réinitialiser" class="small refresh"><i class="fa fa-refresh" aria-hidden="true"></i></button>
            <button @click="send" title= "Envoyer" class="small refresh"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
          </div>
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
      return this.subject.propositions.reduce((sum, proposal) => 0 + sum + proposal.points || 0, 0)
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

@import '../assets/style';

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
      padding-bottom: 10px;

      .title {
        font-weight: bold;
        padding-right: 10px;
        font-size: 1.5em;
      }

    }

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;

      button {
        margin-left: 10px;
      }
    }

    .proposals {
      overflow: auto;
      border: 1px solid lightgrey; //map-get($colors, 'light');
      border-left-width: 0;
      border-right-width: 0;

      * {
        padding: 10px;
        position: relative;
      }
    }
  }

}


</style>
