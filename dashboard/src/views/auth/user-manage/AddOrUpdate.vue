<template>
  <a-modal v-drag v-model="visible" :title="title" @ok="handleOk" @cancel="handleClose" :maskClosable="false">
    <a-form-model ref="form" :model="data" :rules="rules" layout="horizontal"
                  :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 20 }">
      <a-form-model-item label="工号" prop="username">
        <a-input v-model="data.username" :disabled="isUpdate" placeholder="请输入工号"></a-input>
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password" v-if="!isUpdate">
        <a-input v-model="data.password" placeholder="请输入密码"></a-input>
      </a-form-model-item>
      <a-form-model-item label="昵称" prop="nickName">
        <a-input v-model="data.nickName" placeholder="请输入昵称" />
      </a-form-model-item>
      <a-form-model-item label="手机号码" prop="phone">
        <a-input v-model="data.phone" placeholder="请输入手机号码"/>
      </a-form-model-item>
      <a-form-model-item label="邮箱地址" prop="email">
        <a-input v-model="data.email" placeholder="请输入邮箱地址"/>
      </a-form-model-item>
      <a-form-model-item label="是否管理员" prop="admin">
        <a-switch v-model="data.admin"/>
      </a-form-model-item>
      <a-form-model-item label="是否可登录后台" :label-col="{span: 6}" :wrapper-col="{span: 18}" prop="canLoginBackend">
        <a-switch v-model="data.canLoginBackend"/>
      </a-form-model-item>
      <a-form-model-item label="用户角色" prop="roles">
        <a-select mode="multiple" placeholder="请选择用户角色" :value="data.roles" :filter-option="filterOption" @change="handleChange">
          <a-select-option v-for="item in roleList" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import {drag} from "@/utils/directive";

export default {
  name: "AddOrUpdate",
  directives: {drag},
  props: {
    record: {
      type: Object,
      default: () => ({
        canLoginBackend: false
      })
    }
  },
  data() {
    return {
      roleList: [],
      visible: false,
      data: {},
      rules: {
        username: [{required: true, message: '此项必填'}],
        password: [{required: true, message: '此项必填'}],
        nickName: [{required: true, message: '此项必填'}]
      }
    }
  },
  computed: {
    isUpdate() {
      return !!this.record.id
    },
    title() {
      return this.isUpdate ? '更新用户' : '新增用户'
    },
  },
  watch: {
    async visible(val) {
      if (val) {
        let data = JSON.parse(JSON.stringify(this.record))
        data.roles = []
        if (data.id) {
          // 获取当前用户角色
          let roles = await this.getUserRoleById(data.id)
          data.roles = roles.map(item => item.id)
        }
        this.data = data
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      this.$axios.get('/api/admin/role/findAll').then(({data}) => {
        this.roleList = data || []
      })
    },
    handleChange(items) {
      this.data.roles = items
    },
    getUserRoleById(id) {
      return this.$axios.get('/api/admin/user/findById', {
        params: {
          id
        }
      }).then(({data: {roles}}) => {
        return roles || []
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    handleOk() {
      this.$refs.form.validate().then(() => {
        this.$axios.post('/api/admin/user/saveOrUpdate', {
          ...this.data,
          roles: this.data.roles.map(item => ({id: item}))
        }).then(() => {
          this.visible = false
          this.$message.success('操作成功')
          this.$emit('update')
        })
      })
    },
    handleClose() {
      this.$refs.form.clearValidate()
    }
  }

}
</script>

<style scoped>

</style>
