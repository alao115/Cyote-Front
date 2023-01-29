export default function ({ store, redirect, $auth }) {
  if ($auth.loggedIn) redirect({ name: 'index' })
}
