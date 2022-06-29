import $axios from "@/utils/axios";
import store from "@/store";
let userInfoResolved = false

export const getLoginUser = () => {
  if(!userInfoResolved) {
    return $axios.get('/api/admin/user/getLoginUser').then(({data}) => {
      store.commit('user/setUserInfo', data?.user || {})
      store.commit('user/setUserPermission', data?.user?.permissionList || {})
      userInfoResolved = true
    })
  } else {
    return Promise.resolve()
  }
}

export const changeUserInfoResolved = (val) => {
  userInfoResolved = val
}


