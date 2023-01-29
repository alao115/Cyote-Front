export const state = () => ({
  records: [],
})

export const getters = {
  records: (state) => state.records,
}

export const mutations = {
  setRecords: (state, payload) => {
    state.records = payload
  },
}

export const actions = {
  async fetchRecords({ commit }) {
    const response = await this.$api.recordService.getAll()
    commit('setRecords', response.data.speedEntries)
  },
  editRecord({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$api.recordService
        .edit(payload)
        .then((result) => {
          dispatch('fetchRecords')
          resolve()
        })
        .catch((err) => {
          reject(err.response.data.error)
        })
    })
  },
}
