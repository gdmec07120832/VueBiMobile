export default {
  namespaced: true,
  state: {
    permissionList: {
      'overview-ka_reach': false
    },
    // 2021-07-12 新加角色权限控制
    permissionRoleList: {
      'overview-ka_reach': false
    },
    AdminRole:{
      'overview-ka_reach': false
    }
  },
  mutations: {
    setPermissionList(state, payload) {
      state.permissionList = payload
    },
    // 2021-07-12 新加角色权限控制
    setPermissionRoleList(state, payload) {
      state.permissionRoleList = payload
    },
    setAdminRole(state, payload) {
      state.AdminRole = payload
    }
  }
}
