export default (http) =>
  class AuthService {
    static signin(payload) {
      return http.post('/auth/local/signin', payload)
    }

    static getUser() {
      return http.$get('/users/me')
    }

    static refreshToken(payload) {
      return http.post('/auth/local/refresh-token', payload)
    }
  }
