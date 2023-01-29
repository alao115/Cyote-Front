/* eslint-disable camelcase */
import moment from 'moment'

export const state = () => ({})

export const getters = {
  isTokenExpired: () => {
    const expires_in = JSON.parse(
      localStorage.getItem('coyote_tokens')
    )?.expiresIn
    return moment().isAfter(moment(expires_in))
  },
}

export const mutations = {}

export const actions = {
  signin({ dispatch }, payload) {
    return this.$auth.loginWith('customStrategy', { data: payload })
  },

  refreshToken({ getters, dispatch }) {
    return new Promise((resolve, reject) => {
      this.$api.authService
        .refreshToken({
          'refresh-token': getters.getRefreshToken,
        })
        .then(({ data }) => {
          localStorage.setItem('coyote_tokens', JSON.stringify(data.data))
          resolve(data.data.accessToken)
        })
        .catch((err) => reject(err))
    })
  },

  logout({ commit }) {
    return this.$auth.logout()
    /* return new Promise((resolve, reject) => {
      this.$auth.lo
      resolve()
    }) */
  },
}
