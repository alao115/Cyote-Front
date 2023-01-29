/* eslint-disable no-undef */
/* eslint-disable require-await */
import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  /* async fetchUser(endpoint) {
    // Token is required but not available
    if (!this.check().valid) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    // Try to fetch user and then set
    return this.$auth
      .requestWith(this.name, endpoint, this.options.endpoints.user)
      .then((response) => {
        const user = {} // getProp(response.data, this.options.user.property)

        // Transform the user object
        const customUser = {
          ...user,
          fullName: user.firstName + ' ' + user.lastName,
          roles: ['user'],
        }

        // Set the custom user
        // The `customUser` object will be accessible through `this.$auth.user`
        // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
        this.$auth.setUser(customUser)

        return response
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
      })
  } */

  /*

  setUserToken(token) {
    this.token.set(token)
    return this.fetchUser()
  }

  fetchUserCustom(endpoint) {
    if (!this.check().valid) {
      return Promise.resolve()
    }
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return Promise.resolve()
    }
    return this.$auth
      .requestWith(this.name, endpoint, this.options.endpoints.user)
      .then((response) => {
        const userData = getProp(response.data, this.options.user.property)
        if (!userData) {
          const error = new Error(
            `User Data response does not contain field ${this.options.user.property}`
          )
          return Promise.reject(error)
        }
        this.$auth.setUser(userData)
        return response
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
        return Promise.reject(error)
      })
  }

  async logout(endpoint = {}) {
    if (this.options.endpoints.logout) {
      await this.$auth
        .requestWith(this.name, endpoint, this.options.endpoints.logout)
        .catch(() => {})
    }
    return this.$auth.reset()
  }

  reset({ resetInterceptor = true } = {}) {
    this.$auth.setUser(false)
    this.token.reset()
    if (resetInterceptor) {
      this.requestHandler.reset()
    }
  } */

  async login(endpoint, { reset = true } = {}) {
    if (!this.options.endpoints.login) {
      return
    }
    if (reset) {
      this.$auth.reset({ resetInterceptor: false })
    }
    if (this.options.clientId) {
      endpoint.data.client_id = this.options.clientId
    }
    if (this.options.grantType) {
      endpoint.data.grant_type = this.options.grantType
    }
    if (this.options.scope) {
      endpoint.data.scope = this.options.scope
    }
    const response = await this.$auth.request(
      endpoint,
      this.options.endpoints.login
    )
    this.updateTokens(response.data)
    if (!this.requestHandler.interceptor) {
      this.initializeRequestInterceptor()
    }
    if (this.options.user.autoFetch) {
      await this.fetchUser()
    }
    return response
  }

  fetchUser(endpoint) {
    if (!this.check().valid) {
      return Promise.resolve()
    }
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return Promise.resolve()
    }
    return this.$auth
      .requestWith(this.name, endpoint, this.options.endpoints.user)
      .then((response) => {
        const userData = response.data.data[this.options.user.property]
        if (!userData) {
          const error = new Error(
            `User Data response does not contain field ${this.options.user.property}`
          )
          return Promise.reject(error)
        }
        if (userData.role !== 'admin') {
          const error = new Error(
            'Access Denied!!! Only an administrator is allowed here'
          )
          return Promise.reject(error)
        }
        this.$auth.setUser(userData)
        return response
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
        return Promise.reject(error)
      })
  }

  /* updateTokens(response) {
    console.log(response.data.data[this.options.token.property]) // getProp(response.data, this.options.token.property)
    const token = this.options.token.required
      ? response.data.data[this.options.token.property] // getProp(response.data, this.options.token.property)
      : true
    this.token.set(token)
  } */
}
