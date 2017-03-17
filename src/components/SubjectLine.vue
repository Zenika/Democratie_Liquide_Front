<template>
  <div class="subject-line" @click="$emit('selectSubject')">

    <span class="title">{{ subject.title }}</span>

    <span class="tags">
      <span v-if="subject.category"><i class="fa fa-tag"/> {{ subject.category.title }}</span>
      <span v-if="remainingHours"><i class="fa fa-clock-o"/> {{ remainingHours | remainingHoursLabel('heure restante', 'jour restant', 'sujet clos')}}</span>
      <span><i class="fa fa-check-circle-o"/> {{ subject.voteCount | pluralize('vote')}}</span>
      <span v-if="subject.givenDelegation"><i class="fa fa-user"/> {{ subject.givenDelegation.split('@zenika.com')[0].replace('.', ' ') }}</span>
    </span>

    <span class="actions">
      <button title="Supprimer" v-if="subject.isMine && !subject.voteCount" @click.stop="$emit('removeSubject')"><i class="fa fa-times"/></button>
      <button title="Déléguer" v-if="!subject.isVoted && !subject.isClosed" @click.stop="$emit('delegateSubject')"><i class="fa fa-users"/></button>
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
    padding: 10px 10px;
    cursor: pointer;
    &:hover {
      background: rgba(0,0,0,0.1);
    }
  }

  .tags {
    span {
      background-color: #2196bd;
      color: white;
      padding: 2px 10px;
      border-radius: 50px;
      font-size: 12px;
      white-space: pre;
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
