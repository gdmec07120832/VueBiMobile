<template>
  <a-popover v-model="visible"
             placement="bottom"
             ref="popoverForm"
             :title="title" trigger="click" @visibleChange="handleVisibleChange" destroyTooltipOnHide>
    <div slot="content">
      <a-form-model :model="form" ref="popoverForm"
                    :rules="{
                            key: [{required: true, message: '此项必填'}],
                             value: [{required: true, message: '此项必填'}]
                          }"
                    :label-col="{ span: 6 }" layout="horizontal" :wrapper-col="{ span: 18 }">
        <a-form-model-item label="key" prop="key">
          <a-input :maxLength="300" v-model="form.key"/>
        </a-form-model-item>
        <a-form-model-item label="value" prop="value">
          <a-input :maxLength="300" v-model="form.value"/>
        </a-form-model-item>
        <a-form-model-item label="顺序" prop="seq">
          <a-input-number :min="1" :max="100" v-model="form.seq"/>
        </a-form-model-item>
      </a-form-model>
      <div class="flex flex-around">
        <a-button @click="visible = false">取消</a-button>
        <a-button @click="handleSubmitKeyValue">确定</a-button>
      </div>
    </div>
    <slot/>
  </a-popover>
</template>

<script>
export default {
  name: 'PopoverForm',
  props: ['title', 'row'],
  created () {
    console.log(this.row)
    Object.keys(this.form).forEach(key => {
      this.form[key] = this.row[key]
    })
  },
  data () {
    return {
      visible: false,
      form: {
        constantType: this.row.key,
        key: '',
        value: '',
        description: '',
        id: '',
        seq: 1
      }
    }
  },
  methods: {
    handleClose () {
      this.visible = false
    },
    handleVisibleChange (visible) {
      if (visible) {
        console.log(this.row)
        Object.keys(this.form).forEach(key => {
          this.form[key] = this.row[key]
        })
      }
    },
    handleSubmitKeyValue () {
      this.$refs.popoverForm.validate().then(() => {
        this.$emit('save', this.form, this.handleClose)
      })
    }
  }
}
</script>

<style scoped>

</style>
