export default {
  namespaced: true,
  state: () => ({
    userInfo: {
      admin: false,
      createDate: '',
      email: '',
      id: '',
      nickName: '',
      phone: '',
      status: '',
      updateDate: '',
      username: '',
    },
    permissionList: {}
  }),
  getters: {},
  mutations: {
    setUserInfo(state, payload = {}) {
      state.userInfo = payload
    },
    setUserPermission(state, payload = {}) {
      state.permissionList = payload
    }
  },
  actions: {}
}
