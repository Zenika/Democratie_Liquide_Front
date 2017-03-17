import wording from '@/config/wording'
import { tabs } from '@/config/constants'

export const subjects = state => state.subjects.map(subject => {
  // if (Math.round(Math.random())) subject.isMine = true
  // if (Math.round(Math.random())) subject.isVoted = true
  // if (Math.round(Math.random())) subject.isClosed = true
  // if (Math.round(Math.random())) subject.receivedDelegation = true
  // if (Math.round(Math.random())) subject.givenDelegation = 'sandra.parlant@zenika.com'
  // if (Math.round(Math.random())) subject.category = state.categories[Math.round(Math.random())]
  return subject
}) // .concat(state.subjects)

export const defaultCategory = state => { return { title: wording.defaultCategory } }
export const defaultChannel = (state, getters) => { return { title: wording.defaultChannel, collaborators: [getters.collaborator] } }

export const channels = (state, getters) => [getters.defaultChannel, ...state.channels]
export const categories = (state, getters) => [getters.defaultCategory, ...state.categories]
export const collaborator = state => state.collaborator

export const filter = (state, getters) => {
  return {
    channel: state.filter.channel || getters.defaultChannel,
    category: state.filter.category || getters.defaultCategory,
    tab: state.filter.tab || tabs[0]
  }
}

export const categoryFilterCheck = (state, getters) => subject =>
  (!getters.filter.category.uuid || !!subject.category && getters.filter.category.uuid === subject.category.uuid)

export const channelFilterCheck = (state, getters) => subject =>
  (!getters.filter.channel.uuid && !subject.channel || subject.channel && getters.filter.channel && getters.filter.channel.uuid === subject.channel.uuid)

export const tabFilterCheck = (state, getters) => subject =>
  getters.filter.tab.test(subject)

export const globalFilterCheck = (state, getters) => subject =>
  getters.categoryFilterCheck(subject) && getters.channelFilterCheck(subject) && getters.tabFilterCheck(subject)

export const filteredSubjects = (state, getters) => getters.subjects.filter(subject => getters.globalFilterCheck(subject))
