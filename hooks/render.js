/* eslint-disable no-console */
import redirectRootToPortal from './route-redirect-portal'

export default (nuxtConfig) => {
  const router = nuxtConfig?.router ? nuxtConfig.router : {}
  const base = router?.base ? router.base : '/records'

  return {
    /**
     * 'render:setupMiddleware'
     * {@link node_modules/nuxt/lib/core/renderer.js}
     */
    setupMiddleware(app) {
      app.use('/', redirectRootToPortal(base))
    },
  }
}
