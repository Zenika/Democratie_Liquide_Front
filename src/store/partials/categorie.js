import wording from '@/config/wording'
import { getCategory, getCategories } from '@/api/category-api'

export const initialState = {
  // list of all available categories
  categories: [],

  // last fetched category
  currentCategory: {}
}

export const getters = {
  currentCategory: state => state.currentCategory,

  defaultCategory: state => ({ title: wording.defaultCategory }),

  categories: (state, getters) => [getters.defaultCategory, ...state.categories],

  categoryCheck: (state, getters) => subject =>
    !getters.filter.category.uuid ||
    (!!subject.category && getters.filter.category.uuid === subject.category.uuid)
}

export const types = {
  REFRESH_CATEGORIES: 'REFRESH_CATEGORIES',
  REFRESH_CURRENT_CATEGORY: 'REFRESH_CURRENT_CATEGORY'
}

export const actions = {
  refreshCurrentCategory: ({ commit }, categoryId) => {
    return getCategory(categoryId).then(({ data }) => commit(types.REFRESH_CURRENT_CATEGORY, data))
  },

  refreshCategories: ({ commit }) => {
    return getCategories().then(({ data }) => commit(types.REFRESH_CATEGORIES, data))
  }
}

export const mutations = {
  [types.REFRESH_CURRENT_CATEGORY](state, category) {
    state.currentCategory = category
  },

  [types.REFRESH_CATEGORIES](state, categories) {
    state.categories = categories
  }
}
