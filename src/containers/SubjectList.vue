<template>
  <div class="subject-list">

    <template v-for="subject in subjects" v-show="filteredSubjects.length">
      <keep-alive>
        <subject-line class="subject-line" v-if="globalCheck(subject)"
          :subject="subject"
          :key="subject.uuid"
          @removeSubject="removeSubject(subject)"
      />
      </keep-alive>
    </template>
    <div class="empty" v-show="!filteredSubjects.length">{{ filter.subjectType.empty }}</div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SubjectLine from '../components/SubjectLine'

export default {
  name: 'subject-list',

  computed: {
    ...mapGetters([
      'subjects',
      'filteredSubjects',
      'globalCheck',
      'filter'
    ])
  },

  components: {
    SubjectLine
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';
  @import '../assets/transitions';

  .subject-list {
    text-align: center;
    overflow-y: auto;
  }

  .empty {
    padding: 20px;
    font-weight: bold;
    font-size: 1.5em;
    color: lightgray;
  }

  .subject-line {
    transition: all 100ms linear;
    border-left: 0px solid map-get($reds, 'medium');

    &:nth-child(2n) {
      background: rgba(0,0,0,0.05);
    }
    &:hover {
      background: map-get($reds, 'lightest');
      color: map-get($reds, 'medium');
      border-left-width: 5px;
    }
  }
</style>
