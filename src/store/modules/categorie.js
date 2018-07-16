import wording from '@/config/wording'
import { getCategory, getCategories } from '@/api/category-api'

export default {
  state: {
    // list of all available categories
    categories: [],

    // last fetched category
    currentCategory: {}
  },
  getters: {
    currentCategory: state => state.currentCategory,

    defaultCategory: state => ({ title: wording.defaultCategory }),

    categories: (state, getters) => [
      getters.defaultCategory,
      ...state.categories
    ],

    categoryCheck: (state, getters) => subject =>
      !getters.filter.category.uuid ||
      (!!subject.category &&
        getters.filter.category.uuid === subject.category.uuid)
  },
  actions: {
    refreshCurrentCategory: ({ commit }, categoryId) => {
      return getCategory(categoryId).then(({ data }) =>
        commit('REFRESH_CURRENT_CATEGORY', data)
      )
    },

    refreshCategories: ({ commit }) => {
      return getCategories().then(({ data }) =>
        commit('REFRESH_CATEGORIES', data)
      )
    }
  },
  mutations: {
    REFRESH_CURRENT_CATEGORY: (state, category) => {
      state.currentCategory = category
    },

    REFRESH_CATEGORIES: (state, categories) => {
      state.categories = categories
    }
  }
}
