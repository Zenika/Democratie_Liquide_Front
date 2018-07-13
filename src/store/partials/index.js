import * as filter from './filter'
import * as channel from './channel'
import * as subject from './subject'
import * as categorie from './categorie'
import * as collaborator from './collaborator'
import * as notification from './notification'

// List of all imported partials state of the application
const partials = [filter, channel, subject, categorie, collaborator, notification]

// Return all exports of partial states in a new object to use it in VueX options
const getAll = param =>
  partials.reduce((res, partialState) => ({ ...res, ...partialState[param] }), {})

export const actions = getAll('actions')
export const getters = getAll('getters')
export const state = getAll('initialState')
export const mutations = getAll('mutations')
