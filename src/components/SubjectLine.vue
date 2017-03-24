<template>
  <router-link tag="div" :to="'/subject/view/' + subject.uuid" class="subject-line">

    <span class="title">{{ subject.title }}</span>

    <span class="tags">
      <span class="tag" v-if="subject.category"><i class="fa fa-tag"/> {{ subject.category.title }}</span>
      <span class="tag" v-if="remainingHours"><i class="fa fa-clock-o"/> {{ remainingHours | remainingHoursLabel('heure restante', 'jour restant', 'sujet clos')}}</span>
      <span class="tag"><i class="fa fa-check-circle-o"/> {{ subject.voteCount | pluralize('vote')}}</span>
      <span class="tag" v-if="subject.givenDelegation"><i class="fa fa-user"/> {{ subject.givenDelegation | mailToName }}</span>
    </span>

    <span class="actions">
      <router-link tag="button" :to="'/subject/delete/' + subject.uuid" class="small" title="Supprimer" v-if="subject.isMine && !subject.voteCount"><i class="fa fa-times"/></router-link>
      <router-link tag="button" :to="'/subject/delegate/' + subject.uuid" class="small" title="Déléguer" v-if="!subject.isVoted && !subject.isClosed"><i class="fa fa-users"/></router-link>
    </span>

  </router-link>
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
  }


</style>
