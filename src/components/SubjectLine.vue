<template>
  <div class="subject-line">

    <span class="title">{{ subject.title }}</span>

    <span class="tags">
      <span v-if="subject.category"><i class="fa fa-tag"/> {{ subject.category.title }}</span>
      <span v-if="remainingHours"><i class="fa fa-clock-o"/> {{ remainingHours | remainingHoursLabel('heure restante', 'jour restant', 'sujet clos')}}</span>
      <span><i class="fa fa-check-circle-o"/> {{ subject.voteCount | pluralize('vote')}}</span>
      <span v-if="subject.givenDelegation"><i class="fa fa-user"/> {{ subject.givenDelegation.split('@zenika.com')[0].replace('.', ' ') }}</span>
    </span>

    <span class="actions">
      <button title="Supprimer" v-if="subject.isMine && !subject.voteCount"><i class="fa fa-times"/></button>
      <button title="Déléguer" v-if="!subject.isVoted && !subject.isClosed"><i class="fa fa-users"/></button>
      <button title="Voter" v-if="!subject.isClosed && !subject.isVoted"><i class="fa fa-check-circle-o"/></button>
      <button title="Résultats" v-if="subject.isVoted"><i class="fa fa-list"/></button>
    </span>

  </div>
</template>

<script>

export default {
  name: 'subject-line',

  props: {
    subject: {
      type: Object
    }
  },

  computed: {
    remainingHours () {
      if (!this.subject.deadLine) return
      let deadline = new Date(this.subject.deadLine)
      let now = new Date()
      let hours = Math.ceil((deadline - now) / 1000 / 3600)
      return hours
    }
  },

  methods: {
  },

  filters: {
    remainingHoursLabel (value, hourLabel, dayLabel, endLabel) {
      let label = hourLabel
      if (value > 24) {
        value = Math.floor(value / 24)
        label = dayLabel
      } else if (value <= 0) {
        return endLabel
      }
      return value + ' ' + (value <= 1 ? label : label.split(' ').map(word => word + 's').join(' '))
    },

    pluralize (value, label) {
      return value + ' ' + (value <= 1 ? label : label.split(' ').map(word => word + 's').join(' '))
    }
  }

}
</script>

<style lang="scss">

  @import '../assets/style';

  .subject-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tags {
    span {
      background-color: #2196bd;
      color: white;
      padding: 2px 10px;
      border-radius: 50px;
      font-size: 12px;
      white-space: nowrap;
    }
  }

  .actions {

    button {
      cursor: pointer;
      border: 1px solid lightgray;
      background: white;
      height: 100%;
      border-radius: 50px;
      outline: none;

      &:hover, &:active, &:focus {
        color: map-get($colors, 'base');
      }

      &::before {
        content: attr(title);
        padding-right: 5px;
      }
    }
  }


</style>
