<template>
  <div class="subject-creation">
    <input class="simple title" placeholder="Titre" v-model="subject.title"/>
    <textarea class="simple description" placeholder="Description" v-model="subject.description"/>

    <div class="line">
        Comportant
        <dropdown maxHeight="200px" :title="subject.maxPoints | pluralize('point')">
          <dropdown-element v-for="i in 100"
            :key="i"
            :selected="subject.maxPoints === i"
            @click.native="subject.maxPoints = i"
          >{{ i | pluralize('point') }}</dropdown-element>
        </dropdown>
        à distribuer dans un délai de
        <dropdown maxHeight="200px" :title="subject.deadLine | pluralize('jour')">
          <dropdown-element v-for="i in 31"
            :key="i"
            :selected="subject.deadLine === i"
            @click.native="subject.deadLine = i"
          >{{ i | pluralize('jour') }}</dropdown-element>
        </dropdown>

        , sera posté dans la catégorie
        <dropdown :title="subject.category && subject.category.title">
          <dropdown-element v-for="category in categories"
            :key="category.uuid"
            :selected="category === subject.category"
            @click.native="subject.category = category"
          >{{ category.title }}</dropdown-element>
        </dropdown>

        et le channel
        <dropdown :title="subject.channel && subject.channel.title">
          <dropdown-element v-for="channel in channels"
            :key="channel.uuid"
            :selected="channel === subject.channel"
            @click.native="subject.channel = channel"
          >{{ channel.title }}</dropdown-element>
        </dropdown>

        avec les propositions suivantes :

    </div>

    <!--<span class="label">Propositions :</span>-->
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProposalCreation from '@/components/ProposalCreation'
import Dropdown from '@/components/Dropdown'
import DropdownElement from '@/components/DropdownElement'

export default {
  name: 'subject-creation',

  props: {
    subject: Object
  },

  computed: {
    ...mapGetters([
      'filter',
      'channels',
      'categories',
      'defaultChannel',
      'defaultCategory'
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
    }
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
  }

  .description {
    font-size: 1em;
  }


  .line {
    display: block;

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

    *:not(:first-child):not(:last-child) {
      margin: 20px 0;
      position: relative;
    }
    .new-proposal {
      font-size: 2em;
      width: 100%;
    }

  }

</style>
