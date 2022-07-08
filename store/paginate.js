export const state = () => ({
  page: 1,
  sort: 1,
  category: 0,
  pageSize: 5
})

export const getters = {
  all(state) {
    return state;
  },
  getPage(state) {
    return state.page
  },
  getSort(state) {
    return state.sort
  },
  getCategory(state) {
    return state.category
  },
  getPageSize(state) {
    return state.pageSize
  }
}

export const mutations = {
  all(state, data) {
    state = data
  },
  setPage(state, data) {
    state.page = data
  },
  setSort(state, data) {
    state.sort = data
  },
  setCategory(state, data) {
    state.category = data
  },
  setPageSize(state, data) {
    state.pageSize = data
  }
}
