export default {
  namespaced: true,
  state: () => ({
    cachedRoutes: [],
    currentPath: ''
  }),
  getters: {},
  mutations: {
    setCurrentPath(state, payload) {
      state.currentPath = payload
    },
    addCachedRoute(state, payload) {
      if(payload.path === '/index') {
        state.cachedRoutes.unshift(payload)
      } else {
        state.cachedRoutes.push(payload)
      }

    },
    removeCachedRoute(state, payload) {
      const index = state.cachedRoutes.findIndex(item => item.path === payload.path)
      if (index > -1) {
        state.cachedRoutes.splice(index, 1)
      }
    },
  },
  actions: {}
}

