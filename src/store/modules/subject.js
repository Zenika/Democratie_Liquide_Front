import { getSubjects, getSubject } from '@/api/subject-api'

export default {
  state: {
    // list of all available subjects
    subjects: [],

    // last fetched subject
    currentSubject: {}
  },
  getters: {
    subjects: state => state.subjects,

    currentSubject: state => state.currentSubject,

    filteredSubjects: (state, getters) =>
      getters.subjects.filter(subject => getters.globalCheck(subject)),

    subjectTypeCheck: (state, getters) => subject =>
      getters.filter.subjectType.test(subject),

    globalCheck: (state, getters) => subject =>
      getters.categoryCheck(subject) &&
      getters.channelCheck(subject) &&
      getters.subjectTypeCheck(subject)
  },
  actions: {
    refreshSubjects: ({ commit }) => {
      return getSubjects().then(({ data }) => commit('REFRESH_SUBJECTS', data))
    },

    refreshCurrentSubject: ({ commit }, subjectId) => {
      return getSubject(subjectId).then(({ data }) => {
        if (!data.isVoted && !data.isClosed) {
          data.propositions.forEach(proposal => {
            proposal.points = 0
          })
        } else {
          data.propositions.sort(
            (proposalA, proposalB) => proposalB.points - proposalA.points
          )
          data.maxPoints =
            data.propositions.reduce(
              (sum, proposal) => 0 + sum + proposal.points || 0,
              0
            ) || 1
        }
        commit('REFRESH_CURRENT_SUBJECT', data)
      })
    }
  },
  mutations: {
    REFRESH_SUBJECTS: (state, subjects) => {
      state.subjects = subjects
    },

    REFRESH_CURRENT_SUBJECT: (state, subject) => {
      state.currentSubject = subject
    }
  }
}
