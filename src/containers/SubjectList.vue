<template>
  <div class="subject-list">

    <template v-for="subject in subjects" v-show="filteredSubjects.length">
      <transition name="shrink-Y" :key="subject.uuid">
        <keep-alive>
          <subject-line
            v-if="globalCheck(subject)"
            class="subject-line"
            :subject="subject"
            :key="subject.uuid"
            @removeSubject="removeSubject(subject)"
          />
        </keep-alive>
      </transition>
    </template>
    <transition name="shrink-Y">
      <div class="empty" v-show="!filteredSubjects.length">{{ filter.subjectType.empty }}</div>
    </transition>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SubjectLine from '../components/SubjectLine'

export default {
  name: 'subject-list',

  computed: {
    ...mapGetters(['subjects', 'filteredSubjects', 'globalCheck', 'filter'])
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
  transition: border-left 100ms linear, background-color 100ms linear;
  border-left: 0px solid map-get($reds, 'medium');

  &:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &:hover {
    background-color: map-get($reds, 'lightest');
    color: map-get($reds, 'medium');
    border-left-width: 5px;
  }
}
</style>
