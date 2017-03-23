import wording from '@/config/wording'
import { subjectTypes } from '@/config/constants'

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
    subjectType: state.filter.subjectType || subjectTypes[0]
  }
}

export const categoryCheck = (state, getters) => subject =>
  (!getters.filter.category.uuid || !!subject.category && getters.filter.category.uuid === subject.category.uuid)

export const channelCheck = (state, getters) => subject =>
  (!getters.filter.channel.uuid && !subject.channel || subject.channel && getters.filter.channel && getters.filter.channel.uuid === subject.channel.uuid)

export const subjectTypeCheck = (state, getters) => subject =>
  getters.filter.subjectType.test(subject)

export const globalCheck = (state, getters) => subject =>
  getters.categoryCheck(subject) && getters.channelCheck(subject) && getters.subjectTypeCheck(subject)

export const filteredSubjects = (state, getters) => getters.subjects.filter(subject => getters.globalCheck(subject))

export const joinedChannels = (state, getters) => getters.channels.filter(channel => !!channel.collaborators.find(collaborator => collaborator.email === state.collaborator.email))
export const unjoinedChannels = (state, getters) => getters.channels.filter(channel => !channel.collaborators.find(collaborator => collaborator.email === state.collaborator.email))
