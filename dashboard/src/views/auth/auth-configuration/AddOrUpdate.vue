<template>
  <a-modal v-drag v-model="visible" :title="title" @ok="handleOk" @cancel="handleClose" :maskClosable="false">
    <a-form-model ref="form" :model="data" :rules="rules" layout="horizontal"
                  :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 20 }">
      <a-form-model-item label="名称" prop="name">
        <a-input v-model="data.name" placeholder="请输入权限名称" :disabled="isAutoGenerate"/>
      </a-form-model-item>
      <a-form-model-item label="表达式" prop="expression">
        <a-textarea v-model="data.expression" :rows="3" placeholder="请输入权限表达式" :disabled="isAutoGenerate"/>
      </a-form-model-item>
    </a-form-model>
    <p v-if="isAutoGenerate" style="color: #ff4d4f; text-align: center">不能修改由【SQL配置】自动生成的权限</p>
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
      data: {},
      visible: false,
      isAutoGenerate: false,
      rules: {
        name: [{required: true, message: '此项必填'}],
        expression: [{required: true, message: '此项必填'}, {
          validator: (rule, val, cb) => {
            if(val && /^SQL.*/.test(val)) {
              cb(new Error('请勿以【SQL】开头作为权限表达式'))
            } else {
              cb()
            }
          }
        }]
      }
    }
  },
  computed: {
    title() {
      return this.record.id ? '更新权限' : '新增权限'
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.data = JSON.parse(JSON.stringify(this.record))
        this.isAutoGenerate = /^SQL.*/.test(this.data.expression);
      }
    }
  },
  methods: {
    handleOk() {
      if(this.isAutoGenerate) {
        this.visible = false
        this.$refs.form.clearValidate()
        return
      }
      this.$refs.form.validate().then(() => {
        this.$axios.post('/api/admin/permission/saveOrUpdate', this.data).then(() => {
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
