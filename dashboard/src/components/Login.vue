<template>
  <div class="login-page">
    <a-form-model
        layout="horizontal"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
    >
      <a-form-model-item has-feedback label="工号" prop="account">
        <a-input v-model="loginForm.account" type="text" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="pass">
        <a-input v-model="loginForm.pass" type="password" autocomplete="off" @keydown.enter.native="submitForm"/>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">
        <a-button type="primary" @click="submitForm" :loading="submitLoading">{{submitLoading ? '登录中...' : '登录'}}</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      submitLoading: false,
      loginForm: {
        pass: '',
        account: ''
      }
    }
  },
  created() {
  },
  methods: {
    submitForm() {
      const {pass, account} = this.loginForm
      this.submitLoading = true
      this.$axios.post('/pc/login', null, {
        params: {
          password: pass,
          username: account
        }
      }).then(() => {
        this.$message.success('登录成功')
        let redirect = this.$route.query.redirect || '/'
        if(redirect.indexOf('/') === 0) {
          this.$router.push(redirect)
        } else {
          this.$router.push('/')
        }
      }).finally(() => {
        this.submitLoading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login-page {
  max-width: 580px;
  margin: auto;
}
</style>
