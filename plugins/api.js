import services from './services'

export default ({ $axios, store }, inject) => {
  $axios.onRequest((config) => {
    if (config.baseURL !== 'http://localhost:3001/api') {
      config.baseURL = 'http://localhost:3001/api'
    }
    /* if (process.client) {
      if (store.getters['auth/isLoggedIn']) {
        const token = store.getters['auth/getToken']
        config.headers.Authorization = 'Bearer ' + token
      } else if (config.url === '/users/me') {
        const token = JSON.parse(
          localStorage.getItem('coyote_tokens')
        ).accessToken
        config.headers.Authorization = 'Bearer ' + token
      }
    } */

    return config
  }, null)

  inject('api', services($axios))
}
