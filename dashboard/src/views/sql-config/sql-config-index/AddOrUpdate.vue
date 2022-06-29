<template>
  <a-drawer
      class="sql-config-drawer"
      :title="title"
      width="50vw"
      placement="right"
      :visible.sync="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
  >
    <div>
      <a-form-model ref="form" :model="data" :rules="rules">
        <a-form-model-item label="父级" prop="parentId">
          <a-select v-model="data.parentId" placeholder="请选择父级" show-search :filter-option="filterOption" allow-clear>
            <a-select-option v-for="item in interfaceList" :key="item.id" :value="item.id">{{ item.cnName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="中文名称" prop="cnName">
          <a-input v-model="data.cnName" placeholder="请输入中文名称"/>
        </a-form-model-item>
        <a-form-model-item label="接口前缀" prop="prefix">
          <a-input v-model="data.prefix" :disabled="!permissionList['dashboard-edit_sql_interface']" placeholder="只能包含大小写字母、数字、_和-"/>
        </a-form-model-item>
        <a-form-model-item label="接口名称" prop="interfaceName">
          <a-input v-model="data.interfaceName" :disabled="!permissionList['dashboard-edit_sql_interface']" placeholder="只能包含大小写字母、数字、_和-"/>
        </a-form-model-item>
        <a-form-model-item label="SQL语句" prop="sqlStr">
<!--          <a-textarea v-model="data.sqlStr" placeholder="请输入SQL语句" :rows="10"/>-->
            <codemirror style="line-height: initial; font-size: 12px"
                        v-model="data.sqlStr" :options="cmOptions"> </codemirror>
        </a-form-model-item>
        <a-form-model-item label="使用缓存" prop="useCache">
          <a-switch v-model="data.useCache"/>
        </a-form-model-item>
        <a-form-model-item label="使用从库" prop="useBakDataSource">
          <a-switch v-model="data.useBakDataSource"/>
        </a-form-model-item>
        <a-form-model-item label="描述" prop="description">
          <a-textarea v-model="data.description" placeholder="请输入描述信息" :rows="2"/>
        </a-form-model-item>
      </a-form-model>
      <div
          :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 999,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary" @click="onSubmit">
          确定
        </a-button>
      </div>
    </div>
  </a-drawer>
</template>

<script>
import codemirror from 'vue-codemirror/src/codemirror'
import 'codemirror/mode/sql/sql'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/addon/dialog/dialog.css'
import {mapState} from 'vuex'
export default {
  name: "AddOrUpdate",
  components: {codemirror},
  props: {
    type: {
      type: String,
      default: '',
    },
    record: {
      type: Object,
      default: () => ({})
    },
    isCopy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cmOptions: {
        tabSize: 2,
        styleActiveLine: true,
        line: true,
        mode: 'text/x-sql',
        theme: 'darcula'
      },
      interfaceList: [],
      data: {
        cnName: '',
        prefix: '',
        interfaceName: '',
        sqlStr: '',
        useCache: false,
        useBakDataSource: true,
        description: ''
      },
      visible: false,
      rules: {
        cnName: [{required: true, message: '此项必填'}],
        prefix: [{
          validator: (rule, value, cb) => {
            if (value && !/^[\w-]+$/.test(value)) {
              cb(new Error('格式有误'))
            } else {
              cb()
            }
          }, trigger: 'change'
        }],
        interfaceName: [{
          validator: (rule, value, cb) => {
            if (value && !/^[\w-]+$/.test(value)) {
              cb(new Error('格式有误'))
            } else {
              cb()
            }
          }, trigger: 'change'
        }]
      }
    }
  },
  computed: {
    ...mapState('user', ['permissionList']),
    title() {
      return this.isCopy ? '新增SQL配置' : this.record.id ? '更新SQL配置' : '新增SQL配置'
    }
  },
  methods: {
    getInterfaceList() {
      this.$axios.get('/api/admin/dataInterfaceConfig/findAll', {
        params: {
          interfaceType: this.type
        }
      }).then(({data}) => {
        this.interfaceList = data || []
      })
    },
    afterVisibleChange(val) {
      if (val) {
        this.getInterfaceList()
        let data = JSON.parse(JSON.stringify(this.record))
        data.parentId = data.parentId || (void 0)
        data.sqlStr = data.sqlStr || ''
        delete data.children
        this.data = {...this.data, ...data}
      }
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    onClose() {
      this.visible = false
      this.$refs.form.clearValidate()
    },
    onSubmit() {
      this.$refs.form.validate().then(() => {
        const data = {...this.data}
        data.interfaceType = this.type
        if(this.isCopy) {
          delete data.id
        }
        this.$axios.post('/api/admin/dataInterfaceConfig/saveOrUpdate', data).then(() => {
          this.visible = false
          this.$emit('update', data)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .sql-config-drawer /deep/ .ant-drawer-body {
   padding-bottom: 53px;
 }
</style>
