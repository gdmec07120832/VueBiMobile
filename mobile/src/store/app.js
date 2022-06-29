export default {
  namespaced: true,
  state: {
    navbarTopOffset: 0
    // 新加的
    ,ProductMarket:{
      type:1
    }
    // 2021-07-15 增加了权限角色的列表
    ,PermissionArrList:{ 
    }    
    // 2021-07-21 增加了首页跳转参数
    ,JumpToPageVal:{ 
    }   
    ,getLoginUserFirst:false

    ,getusername:""

  },
  mutations:{
    setNavbarTopOffset(state, payload) {
      state.navbarTopOffset = payload
    },
    setProductMarket(state,payload){
      state.ProductMarket.type=payload
    },
    setPermissionArrList(state,payload){
      state.PermissionArrList=payload
    },
    // 2021-07-21 增加了首页跳转参数
    setJumpToPageVal(state,payload){
      state.JumpToPageVal=payload
    },    
    setgetLoginUserFirst(state,payload){
      state.getLoginUserFirst = payload
    },
    setgetusername(state,payload){
      state.getusername = payload
    }
    
  }
}
