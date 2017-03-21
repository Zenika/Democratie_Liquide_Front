<template>
    <div class="subject-view">
      <div class="subject" v-if="Object.keys(subject).length">
        <div class="header">
          <div class="title">{{ subject.title }}</div>
          <div class="description">{{ subject.description }}</div>
          <div class="remaining-points"
            :class="{ empty: subject.maxPoints === totalPoints }"
          >
            {{ subject.maxPoints - totalPoints | pluralize('point') }} à distribuer
            
            <div class="line"
              :style="{ transform: 'scaleX(' + (subject.maxPoints - totalPoints) / subject.maxPoints + ')' }"
            />
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
        <div class="footer">
          <span class="actions" v-if="voteView">
            <button @click="reinitialize" title= "Réinitialiser" class="small refresh"><i class="fa fa-refresh" aria-hidden="true"></i></button>
            <button @click="send" title= "Envoyer" class="small refresh"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
          </span>
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

      .title {
        font-weight: bold;
        padding-right: 10px;
        font-size: 1.5em;
      }

    }

    .remaining-points {
      transition: all 500ms ease;      
      font-weight: bold;
      color: darkgray;
      position: relative;
      color: white;
      text-align: center;
      border-radius: 200px;
      overflow: hidden;
      padding: 0 20px;
      margin: 5px 0;
      z-index: 0;
      background-color: map-get($blues, 'light');

      &.empty {
        background-color: map-get($greens, 'medium');
      }
      

      .line {
        transform-origin: left;
        transition: all 500ms ease;
        background-color: map-get($blues, 'medium');
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
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
      border: 1px solid lightgrey;
      border-left-width: 0;
      border-right-width: 0;

      :not(:last-child) {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 10%;
          margin-top: -5px;
          right: 10%;
          border-bottom: 1px solid lightgray;
        }
      }

    }
  }

}


</style>
