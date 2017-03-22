<template>
  <div class="subject-creation">
    <input class="simple title" placeholder="Titre" v-model="subject.title"/>
    <textarea class="simple description" placeholder="Description" v-model="subject.description"/>

    <div class="line">
        Dans la catégorie
        <dropdown :title="subject.category === defaultCategory ? 'Aucune' : subject.category && subject.category.title">
          <div v-for="category in categories"
            class="list-element"
            :class="{ selected: category === subject.category }"
            @click="subject.category = category"
          >{{ category === defaultCategory ? "Aucune" : category.title }}</div>
        </dropdown>

        et le channel
        <dropdown :title="subject.channel && subject.channel.title">
          <div v-for="channel in channels"
            class="list-element"
            :class="{ selected: channel === subject.channel }"
            @click="subject.channel = channel"
          >{{ channel.title }}</div>
        </dropdown>

        avec
        <input class="simple points" type="number" min="1" max="99" placeholder="" v-model="subject.maxPoints"/>
        points à distribuer

        et se cloturant le
        <input class="simple date" type="date" placeholder="" v-model="subject.deadLine"/>

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
    Dropdown
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';

  .subject-creation {
    display: flex;
    flex-direction: column;
    min-width: 75vw;
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
    margin: 10px 25px;
    text-align: center;
    line-height: 2em;
  }

  .list-element {
    padding: 5px 10px;
    cursor: pointer;

    &:nth-child(2n) {
      background: rgba(0,0,0,0.05);
    }

    &:hover {
      background: map-get($reds, 'lightest');
      color: map-get($reds, 'medium');
    }

    &.selected {
      font-weight: bold;
    }
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
    // background: rgba(0,0,0,0.05);
    border-radius: 5px;
    padding: 0 10px 5px 10px;
    overflow-y: auto;
    overflow-x: hidden;

    *:not(:first-child):not(:last-child) {
      margin: 20px 0;
      position: relative;
      // &::after {
      //   content: '';
      //   position: absolute;
      //   top: 0;
      //   margin-top: -10px;
      //   left: 0;
      //   transform: scaleX(0.75);
      //   width: 100%;
      //   border-bottom: 1px solid rgba(0,0,0,0.2);
      // }
    }
    .new-proposal {
      font-size: 2em;
      width: 100%;
    }

  }

</style>
