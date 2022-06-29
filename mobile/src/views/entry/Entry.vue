<template>
  <div>
    <Entry v-if="pd_val==true"></Entry>
    <EntryTag v-else></EntryTag>
    <!-- <Entry></Entry> -->
  </div>
</template>



<script>
import entryset from "@/views/entry/Entry_all.vue";
import entrytagset from "@/views/entry/Entry_tag.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      pd_val:false,
    }
  },
  components: {
    Entry: entryset,
    EntryTag: entrytagset,
  },
  computed: {
    ...mapState("user", ["permissionList","permissionRoleList","AdminRole"]),
  },
  created(){



    if(this.AdminRole==true){
      this.pd_val=true;
    }else{
      Object.keys(this.permissionRoleList).forEach((permkey) => {
        if(this.permissionRoleList[permkey].name=='首页-全部权限'||(this.permissionRoleList[permkey].name).indexOf("全权限")>=0){
          this.pd_val=true;
        }
      });        
    }

    console.log(this.pd_val);
    
  }


};
</script>

<style>
</style>


