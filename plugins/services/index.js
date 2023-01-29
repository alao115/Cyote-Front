import patroles from './patroles'
import records from './records'
import auth from './auth'

export default (http) => ({
  patrolService: patroles(http),
  recordService: records(http),
  authService: auth(http),
})
