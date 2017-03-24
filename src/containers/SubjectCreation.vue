<template>
  <div class="subject-creation">
    <input class="simple title" placeholder="Titre" v-model="subject.title"/>
    <textarea class="simple description" placeholder="Description" v-model="subject.description"/>

    <div class="line">
        Comportera
        <dropdown maxHeight="200px" :title="subject.maxPoints | pluralize('point')">
          <dropdown-element v-for="i in 100"
            :key="i"
            :selected="subject.maxPoints === i"
            @click.native="subject.maxPoints = i"
          >{{ i | pluralize('point') }}</dropdown-element>
        </dropdown>
        se cloturera dans
        <dropdown maxHeight="200px" :title="subject.deadLine || 'une infinité de' | pluralize('jour')">
          <dropdown-element :selected="subject.deadLine === null" @click.native="subject.deadLine = null">
            une infinité de jours
          </dropdown-element>
          <dropdown-element v-for="i in 31"
            :key="i"
            :selected="subject.deadLine === i"
            @click.native="subject.deadLine = i"
          >{{ i | pluralize('jour') }}</dropdown-element>
        </dropdown>

        sera posté dans la catégorie
        <dropdown :title="subject.category && subject.category.title">
          <dropdown-element v-for="category in categories"
            :key="category.uuid"
            :selected="category === subject.category"
            @click.native="subject.category = category"
          >{{ category.title }}</dropdown-element>
        </dropdown>

        et dans le channel
        <dropdown :title="subject.channel && subject.channel.title">
          <dropdown-element v-for="channel in joinedChannels"
            :key="channel.uuid"
            :selected="channel === subject.channel"
            @click.native="subject.channel = channel"
          >{{ channel.title }}</dropdown-element>
        </dropdown>

        avec les propositions suivantes :
    </div>

    <div class="proposals" ref="proposals">
      <proposal-creation v-for="(proposal, index) in subject.propositions"
        :key="'proposal-' + index"
        :proposal="proposal"
        :index="index"
        :canRemove="subject.propositions.length > 2"
        @remove="removeProposal(index)"
      />
      <button @click="addProposal"class="new-proposal simple"><i class="fa fa-plus" aria-hidden="true"></i></button>
    </div>

    <div class="footer">
      <span class="actions">
        <button @click="reinit" title= "Réinitialiser" class="small refresh"><i class="fa fa-refresh" aria-hidden="true"></i></button>
        <button @click="submit" title= "Envoyer" class="small refresh"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProposalCreation from '@/components/ProposalCreation'
import Dropdown from '@/components/Dropdown'
import DropdownElement from '@/components/DropdownElement'
import { createSubject } from '@/api/subject-api'
import { goToSubject } from '@/config/router'

const daysToDate = days => {
  let deadLine = new Date()
  deadLine.setDate(deadLine.getDate() + days)
  deadLine.setHours(24)
  deadLine.setMinutes(0)
  deadLine.setSeconds(0)
  deadLine.setMilliseconds(0)
  return deadLine
}

export default {
  name: 'subject-creation',

  data () {
    return {
      subject: {}
    }
  },

  computed: {
    ...mapGetters([
      'filter',
      'joinedChannels',
      'categories'
    ])
  },

  methods: {
    ...mapActions([]),

    addProposal () {
      // add new object in propositions array
      this.subject.propositions.push({})
      // scroll to bottom after adding new proposal
      setTimeout(() => { this.$refs.proposals.scrollTop = this.$refs.proposals.scrollHeight }, 0)
    },

    removeProposal (index) {
      this.subject.propositions.splice(index, 1)
    },

    reinit () {
      this.subject = {
        title: '',
        description: '',
        maxPoints: 10,
        propositions: [{}, {}],
        deadLine: 3,
        channel: this.filter.channel,
        category: this.filter.category
      }
    },

    submit () {
      // format subject
      let formattedSubject = {
        ...this.subject,
        deadLine: this.subject.deadLine ? daysToDate(this.subject.deadLine).toISOString() : null,
        channel: !this.subject.channel.uuid ? null : { uuid: this.subject.channel.uuid },
        category: !this.subject.category.uuid ? null : { uuid: this.subject.category.uuid }
      }

      // send to backend
      createSubject(formattedSubject).then(response => {
        goToSubject(response.subjectId)
      })
    }
  },

  created () {
    this.reinit()
  },

  components: {
    ProposalCreation,
    Dropdown,
    DropdownElement
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';

  .subject-creation {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 5px;
  }
  input, textarea {
    min-height: 15px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }


  .title {
    font-weight: bold;
    font-size: 1.5em;
    flex-shrink: 0;
  }

  .description {
    font-size: 1em;
    flex-shrink: 0;
  }


  .line {
    display: block;
    flex-shrink: 0;

     text-align: center;
    padding: 10px 30px;
    margin: 5px 30px;
    background: rgba(0,0,0,0.025);
    line-height: 2em;
    font-size: 0.8em;
    border-top: 1px solid rgba(0,0,0,0.1);
    border-bottom: 1px solid rgba(0,0,0,0.1);

  }

  .points {
    width: 40px;
    font-size: 1em;
    font-weight: bold;
  }


  .label {
    margin: 5px;
    font-weight: bold;
  }

  .proposals {
    border-radius: 5px;
    padding: 0 10px 5px 10px;
    margin-top: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    *:not(:first-child):not(:last-child) {
      margin: 10px 0;
      position: relative;
    }
    .new-proposal {
      font-size: 2em;
      margin: 0 50px;
      flex-shrink: 0;
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

</style>
