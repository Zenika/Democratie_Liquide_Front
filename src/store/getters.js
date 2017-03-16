import wording from '../config/wording'

export const subjects = state => state.subjects.map(subject => {
//   if (Math.round(Math.random())) subject.isMine = true
//   if (Math.round(Math.random())) subject.isVoted = true
//   if (Math.round(Math.random())) subject.isClosed = true
//   if (Math.round(Math.random())) subject.receivedDelegation = true
//   if (Math.round(Math.random())) subject.givenDelegation = 'sandra.parlant@zenika.com'
//   if (Math.round(Math.random())) subject.category = state.categories[Math.round(Math.random())]
  return subject
})

export const defaultCategory = state => { return { title: wording.defaultCategory } }
export const defaultChannel = (state, getters) => { return { title: wording.defaultChannel, collaborators: [getters.collaborator] } }

export const channels = (state, getters) => [getters.defaultChannel, ...state.channels]
export const categories = (state, getters) => [getters.defaultCategory, ...state.categories]

export const collaborator = state => state.collaborator

export const filter = (state, getters) => {
  return {
    channel: state.filter.channel || getters.defaultChannel,
    category: state.filter.category || getters.defaultCategory
  }
}

export const filteredSubjects = ({ filter }, getters) => getters.subjects.filter(subject =>
    (!filter.category || !!subject.category && filter.category.uuid === subject.category.uuid) &&
    (!filter.channel && !subject.channel || subject.channel && filter.channel && filter.channel.uuid === subject.channel.uuid)
)

export const mySubjects = (state, getters) => getters.filteredSubjects.filter(subject => subject.isMine)
export const votedSubjects = (state, getters) => getters.filteredSubjects.filter(subject => subject.isVoted)
export const delegatedSubjects = (state, getters) => getters.filteredSubjects.filter(subject => !!subject.givenDelegation)
export const newSubjects = (state, getters) => getters.filteredSubjects.filter(subject =>
    !subject.isClosed && !subject.givenDelegation
)
export const archivedSubjects = (state, getters) => getters.filteredSubjects.filter(subject => subject.isClosed)
