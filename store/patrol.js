export const state = () => ({
  patrols: [],
})

export const getters = {
  patrols: (state) => state.patrols,
}

export const mutations = {
  setPatrols: (state, payload) => (state.patrols = payload),
}

export const actions = {
  addPatrols({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$api.patrolService
        .create(payload)
        .then((result) => {
          dispatch('fetchPatrols')
          resolve()
        })
        .catch((err) => {
          reject(err.response.data.error)
        })
    })
  },
  async fetchPatrols({ commit }) {
    const response = await this.$api.patrolService.getAll()
    commit('setPatrols', response.data.users)
  },
  async deletePatrol({ dispatch }, payload) {
    await this.$api.patrolService.delete(payload)
    dispatch('fetchPatrols')
  },
  editPatrol({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$api.patrolService
        .edit(payload)
        .then((result) => {
          dispatch('fetchPatrols')
          resolve()
        })
        .catch((err) => {
          reject(err.response.data.error)
        })
    })
  },
}
