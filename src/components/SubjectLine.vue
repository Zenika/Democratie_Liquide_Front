<template>
  <div class="subject-line">

    <span class="title">{{ subject.title }}</span>

    <span class="tags">
      <span class="category" v-if="subject.category">{{ subject.category.title }}</span>
      <span class="deadline" v-if="remainingHours">{{ remainingHours | remainingHoursLabel('heure restante', 'jour restant', 'sujet clos')}}</span>
      <span class="vote-count">{{ subject.voteCount | pluralize('vote')}}</span>
    </span>

    <span class="actions">
      <button title="Supprimer" class="fa fa-times" v-if="subject.isMine && !subject.voteCount"/>
      <button title="Déléguer" class="fa fa-users" v-if="!subject.isVoted && !subject.isClosed"/>
      <button title="Voter" class="fa fa-check-circle-o" v-if="!subject.isClosed && !subject.isVoted"/>
      <button title="Résultats" class="fa fa-list" v-if="subject.isVoted"/>
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
  }

  .tags {
    * {
      background-color: rgba(0,0,0,0.05);      
      padding: 2px 10px;
      border-radius: 50px;
      font-size: 12px;
      white-space: nowrap;
    }
  }

  .title {
    align-self: flex-start;
    // flex-basis: 50%;
    // text-align: left;
  }

  .actions {
    align-self: flex-end;
    display: block;

    button {
      float: right;
      margin: 0;
      cursor: pointer;
      border: none;
      outline: none;
      background: transparent;

      &:hover, &:active, &:focus {
        color: map-get($colors, 'base');
      }
    }
  }


</style>
