import $axios from "@/utils/axios";
import store from "@/store";
import * as dd from 'dingtalk-jsapi/entry/union'
import requestAuthCode from 'dingtalk-jsapi/api/runtime/permission/requestAuthCode'

export let permissionListResolved = false


export const dingTalkAuth = () => {
  if(dd.env.platform !== 'notInDingTalk') {
    return requestAuthCode({
      corpId: process.env.VUE_APP_CORP_ID,
    }).then(({code}) => {
      console.log(code)
      return $axios.post('/dd/login', null, {
        params: {
          authCode: code
        },
        failedTip: false
      })
    }).then(() => {
      return Promise.resolve()
    }).catch((err) => {
      return Promise.reject(err)
    })
  } else {
    return Promise.resolve()
  }
}

export const getLoginUser = () => {
  if(!permissionListResolved) {
    return dingTalkAuth().then(() => {
      return $axios.get('/api/admin/user/getLoginUser').then(({data}) => {
        let permissionList = data?.user?.permissionList || {}
        if(!Object.values(permissionList).filter(Boolean).length) {
          return Promise.reject({msg: '没有权限访问本系统,请联系管理员'})
        }
        
        // 新加的开始2020-12-30 username  setPermissionRoleList
        store.commit('app/setgetLoginUserFirst', data.isFirstLogin);
        store.commit('app/setgetusername', data.user.nickName+' '+data.user.username);
        // 2021-07-12 新加角色权限控制
        store.commit('user/setPermissionRoleList', data.user.roles);
        store.commit('user/setAdminRole', data.user.admin);
        // 2021-07-12 新加角色权限控制

        // 新加的结束
        store.commit('user/setPermissionList', permissionList)
        permissionListResolved = true
      })
    })
  } else {
    return Promise.resolve()
  }
}
