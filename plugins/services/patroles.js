export default (http) =>
  class PatrolService {
    static create(params) {
      return http.post('/users', params)
    }

    static getAll() {
      return http.$get('/users')
    }

    static delete(id) {
      return http.delete(`/users/${id}`)
    }

    static edit(payload) {
      return http.patch(`/users/${payload.id}`, payload.data)
    }
  }
