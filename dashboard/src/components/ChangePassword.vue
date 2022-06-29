<template>
  <a-modal v-drag v-model="visible" title="修改密码"  @ok="handleOk" @cancel="handleClose">
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="新密码" prop="pass">
        <a-input type="password" v-model="form.pass" placeholder="请输入新密码"/>
      </a-form-model-item>
      <a-form-model-item label="确认新密码" prop="confirmPass">
        <a-input type="password" v-model="form.confirmPass" placeholder="请确认新密码"/>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "ChangePassword",
  data() {
    return {
      visible: false,
      form: {
        pass: '',
        confirmPass: ''
      },
      rules: {
        pass: [{required: true, message: '此项必填'}, {min:6, message: '长度至少为6位'}, {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.form.confirmPass !== '') {
                this.$refs.form.validateField('confirmPass');
              }
              callback();
            }
          }
        }],
        confirmPass: [{required: true, message: '此项必填'}, {min:6, message: '长度至少为6位'}, {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.form.pass) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          }
        }]
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    handleOk() {
      this.$refs.form.validate().then(() => {
        this.$axios.get('/api/admin/user/restPassword', {
          params: {
            id: this.userInfo?.id,
            password: this.form.pass
          }
        }).then(() => {
          this.$message.success('密码修改成功')
          this.visible = false
          this.$refs.form.resetFields()
          this.$emit('submit-success')
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
