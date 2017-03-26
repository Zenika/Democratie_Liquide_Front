<template>
    <div class="subject-view">
      <div class="subject" v-if="Object.keys(subject).length">
        <div class="header">
          <div class="title">{{ subject.title }}</div>
          <div class="description">{{ subject.description }}</div>
          <div class="remaining-points"
            :class="{ green: (subject.maxPoints === totalPoints) || !isVote }"
          >
            <span v-if="!isVote">Résultats du vote</span>
            <span v-else-if="isVote && !delegation">{{ subject.maxPoints - totalPoints | pluralize('point') }} à distribuer</span>
            <span v-else>Vote délégué à {{ delegation | mailToName }}</span>

            <div v-if="isVote" class="line"
              :style="{ transform: 'scaleX(' + (subject.maxPoints - totalPoints) / subject.maxPoints + ')' }"
            />
          </div>

        </div>
        <div class="proposals" ref="proposals">
          <proposal v-for="proposal in subject.propositions"
            :key="proposal.uuid"
            :maxPoints="subject.maxPoints"
            :totalPoints="totalPoints"
            :proposal="proposal"
            :isVote="isVote"
            :isDelegated="!!delegation"
          />
        </div>
        <div class="footer" v-if="isVote && !delegation">
          <span class="actions">
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
import { mapGetters } from 'vuex'
import Proposal from '@/components/Proposal'
import { submitVote } from '@/api/subject-api'
import { cloneDeep } from 'lodash'

export default {
  name: 'subject-view',

  data () {
    return {
      subject: {}
    }
  },

  computed: {

    ...mapGetters(['currentSubject']),

    totalPoints () {
      return this.subject.propositions.reduce((sum, proposal) => 0 + sum + proposal.points || 0, 0)
    },

    isVote () {
      return !this.subject.isVoted && !this.subject.isClosed
    },

    delegation () {
      return this.subject.givenDelegation
    }
  },

  methods: {
    initialize () {
      this.subject = cloneDeep(this.currentSubject)
    },

    reinitialize () {
      this.subject.propositions.map(proposal => { proposal.points = 0 })
    },

    send () {
      let choices = []
      this.subject.propositions.forEach(proposal => {
        choices.push({
          propositionId: proposal.id,
          points: proposal.points
        })
      })
      submitVote(this.subject.uuid, choices).then(() => {
        // deep clone new updated subject
        this.initialize()

        // and go back to top to see the top voted results
        this.$refs.proposals.scrollTop = 0
      })
    }
  },

  created () {
    this.initialize()
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
    padding-top: 0;


    .header {
      border-bottom: 1px solid lightgrey;

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

      &.green {
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

    .footer {
      margin-top: 10px;
      border-top: 1px solid lightgrey;
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

      :not(:last-child) {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 10%;
          margin-bottom: -5px;
          bottom: 0;
          right: 10%;
          border-bottom: 1px solid lightgray;
        }
      }

    }
  }

}


</style>
