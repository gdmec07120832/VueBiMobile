<template>
  <a-modal v-drag v-model="visible" :title="title" @ok="handleOk" width="690px" @cancel="handleClose" :maskClosable="false">
    <a-form-model ref="form" :model="data" :rules="rules" layout="horizontal"
                  :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 20 }">
      <a-form-model-item label="角色名称" prop="name">
        <a-input v-model="data.name" placeholder="请输入角色名称"/>
      </a-form-model-item>
      <a-form-model-item label="角色描述" prop="description">
        <a-textarea v-model="data.description" :rows="3" placeholder="请输入角色描述"/>
      </a-form-model-item>
      <a-form-model-item label="角色权限" prop="permission" :label-col="{span: 4}" :wrapper-col="{span: 24}">
<!--        <a-select mode="multiple" placeholder="请选择角色权限" :value="data.permissions" :filter-option="filterOption"-->
<!--                  @change="handleSelectChange">-->
<!--          <a-select-option v-for="item in permissionList" :key="item.id" :value="item.id">{{ item.name }}-->
<!--          </a-select-option>-->
<!--        </a-select>-->
        <a-transfer
            :list-style="{
                width: '300px',
                height: '300px',
            }"
            :target-keys="data.permissions"
            show-search
            :locale="{ itemUnit: '项', itemsUnit: '项', notFoundContent: '列表为空', searchPlaceholder: '请输入搜索内容' }"
            :titles="['未选', '已选']"
            :data-source="permissionList.map(_ => ({key: String(_.id), title: _.name}))"
            :render="item => item.title"
            @change="handleSelectChange"
        />
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
      default: () => ({})
    }
  },
  data() {
    return {
      permissionList: [],
      visible: false,
      data: {},
      rules: {
        name: [{required: true, message: '此项必填'}],
        description: [{required: true, message: '此项必填'}]
      }
    }
  },
  computed: {
    title() {
      return this.record.id ? '更新角色' : '新增角色'
    }
  },
  watch: {
    visible(val) {
      if (val) {
        let data = JSON.parse(JSON.stringify(this.record))
        let permissions = data.permissions || []
        data.permissions = permissions.map(item => String(item.id))
        this.data = data
      }
    }
  },
  created() {
    this.getPermissions()
  },
  methods: {
    getPermissions() {
      this.$axios.get('/api/admin/permission/findAll').then(({data}) => {
        this.permissionList = data || []
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    handleSelectChange(targetKeys) {
      this.data.permissions = targetKeys
    },
    handleOk() {
      this.$refs.form.validate().then(() => {
        this.$axios.post('/api/admin/role/saveOrUpdate', {
          ...this.data,
          permissions: this.data.permissions.map(item => ({id: item}))
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
