<template>
  <a-modal v-drag :visible.sync="visible" title="编辑/更新" @cancel="handleCancel" @ok="handleOk">
    <a-form-model ref="form" :model="form" :rules="rules"
                  :label-col="{ span: 5 }" layout="horizontal" :wrapper-col="{ span: 19 }">
      <a-form-model-item label="标题" prop="title">
        <a-input v-model="form.title" :maxLength="30"></a-input>
      </a-form-model-item>
      <a-form-model-item label="sql配置" prop="coverConfigId">
        <div class="flex-start flex">
          <a-select @select="handleInterfaceTypeChange" v-model="form.interfaceType" style="width: 100px">
            <a-select-option
                v-for="item in interfaceTypeList" :value="item.key" :key="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
          <VSelect style="flex: 1" v-model="form.coverConfigId" :options="sqlConfigList" placeholder="搜索"
                   item-key-prop="id"
                   item-label-prop="cnName" item-value-prop="id"/>
        </div>
      </a-form-model-item>
      <a-form-model-item label="页面路径" prop="pageUrl">
        <a-select v-model="form.pageUrl">
          <a-select-option v-for="item in urlList" :key="item.id" :value="item.value">{{ item.key }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="cron" prop="cron">
        <a-input v-model="form.cron" :maxLength="30"/>
      </a-form-model-item>
      <a-form-model-item label="目标群号" prop="targetChartGroupId">
        <a-select mode="multiple" v-model="form.targetChartGroupId">
          <a-select-option v-for="item in chatGroupList" :key="item.value" :value="item.value">
            {{ item.key }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="启用动态封面" prop="dynamicCover">
        <a-switch v-model="form.dynamicCover"></a-switch>
      </a-form-model-item>
      <a-form-model-item label="描述" prop="description">
        <a-input v-model="form.description" :maxLength="100"></a-input>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import {drag} from '@/utils/directive'
import VSelect from '@/components/VSelect/VSelect'

const getDict = (type) => {
  return Vue.prototype.$axios('/api/user/sysConstantDict/findDictByConstantType', {
    params: {constantType: type}
  }).then(({data}) => {
    return data
  })
}

export default {
  name: 'AddOrUpdate',
  components: {VSelect},
  directives: {drag},
  props: {
    row: Object,
  },
  data() {
    return {
      urlList: [],
      chatGroupList: [],
      interfaceTypeList: [],
      rules: {
        title: [{required: true, message: '此项必填'}],
        coverConfigId: [{required: true, message: '此项必填'}],
        cron: [{required: true, message: '此项必填'}],
        pageUrl: [{required: true, message: '此项必填'}],
        targetChartGroupId: [{required: true, message: '此项必填'}],
      },
      sqlConfigList: [],
      form: {
        interfaceType: '',
        coverConfigId: '',
        id: undefined,
        title: '',
        cron: '0 30 8 * * ?',
        dynamicCover: false,
        pageUrl: '',
        targetChartGroupId: [],
        description: ''
      },
      visible: false
    }
  },
  watch: {
    'form.interfaceType': {
      handler() {
      },
      immediate: true
    }
  },
  async created() {
    this.urlList = await getDict('pushConfigUrl')
    this.getChatGroupList()
    if (this.row?.id) {
      const {description, id, dynamicCover, cron, title, pageUrl, targetChartGroupId, coverConfig} = this.row
      this.form.targetChartGroupId = (targetChartGroupId || '').split(',')
      this.form.description = description
      this.form.dynamicCover = dynamicCover
      this.form.cron = cron
      this.form.id = id
      this.form.title = title
      this.form.pageUrl = pageUrl
      this.form.coverConfigId = coverConfig.id
      this.form.interfaceType = coverConfig.interfaceType
    }
    this.getInterfaceTypeEnum()
    await this.handleInterfaceTypeChange()
  },

  methods: {
    getChatGroupList() {
      this.$axios.get('/api/admin/dataMessageConfig/listDingDingChartSessions').then(({data}) => {
        this.chatGroupList = data
      })
    },
    handleInterfaceTypeChange() {
      return this.$axios.get('/api/admin/dataInterfaceConfig/findAll', {
        params: {
          interfaceType: this.form.interfaceType || null
        }
      }).then(({data}) => {
        this.sqlConfigList = data.map(item => {
          return {
            label: item.cnName,
            value: item.id,
            ...item
          }
        })
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) > -1
    },
    getInterfaceTypeEnum() {
      this.$axios.get('/api/admin/dataInterfaceConfig/getSelectInterfaceTypeEnum').then(({data}) => {
        this.interfaceTypeList = data
      })
    },
    handleOk() {
      this.$refs.form.validate().then(() => {
        console.log(this.form)

        this.$axios.post('/api/admin/dataMessageConfig/saveOrUpdate', {
          ...this.form,
          targetChartGroupId: this.form.targetChartGroupId.join(',')
        }).then(() => {
          this.$message.success('操作成功')
          this.handleCancel()
          this.$emit('submit-success')
        })
      })
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
