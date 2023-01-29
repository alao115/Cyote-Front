export default (http) =>
  class RecordService {
    static getAll() {
      return http.$get('/speed-entries')
    }

    static edit(payload) {
      return http.patch(`/speed-entries/${payload.id}`, payload.data)
    }
  }
