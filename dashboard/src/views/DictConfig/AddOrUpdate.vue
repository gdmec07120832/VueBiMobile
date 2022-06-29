<template>
  <AModal :width="800" v-drag :visible.sync="visible" title="新增/编辑" @cancel="handleCancel" @ok="handleOk">
    <div>
      <a-form-model ref="form" size="small" :model="form"
                    :rules="rules"
                    :label-col="{ span: 5 }" layout="horizontal" :wrapper-col="{ span: 19 }">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-model-item label="字典名称" prop="key">
              <AInput v-model="form.key" :maxLength="300" :disabled="!!row.id"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="描述" prop="description">
              <AInput v-model="form.description" :maxLength="50"/>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
      <div v-if="row.id" class="flex flex-between mb20">
        <div>
          <AInput style="width: 200px" v-model="rawKeyword" allow-clear placeholder="关键字"/>
          <a-button @click="handleSearch">搜索</a-button>
        </div>

        <PopoverForm title="新增" :row="{seq: 1, constantType: row.key}" @save="handleSubmitKeyValue">
          <a-button>新增</a-button>
        </PopoverForm>
      </div>
      <a-table v-if="row.id" v-bind="table" :pagination="pagination" @change="handleTableChange"/>
    </div>
  </AModal>
</template>

<script>
import getTableMixin from '@/views/mixins/getTableMixin'
import { drag } from '@/utils/directive'
import PopoverForm from '@/views/DictConfig/PopoverForm'

export default {
  name: 'AddOrUpdate',
  mixins: [getTableMixin],
  directives: { drag },
  components: { PopoverForm },
  props: {
    row: {
      default: () => ({}),
      type: Object
    }
  },
  data () {
    return {
      visible: false,
      form: {
        key: undefined,
        value: undefined,
        id: undefined,
        description: undefined
      },
      rules: {
        key: [{ required: true, message: '此项必填' }, {
          validator (rule, value, cb) {
            if (/^[a-z|A-Z_\d]+$/g.test(value)) {
              cb()
            } else {
              cb(new Error('请输入字母、数字、下划线_'))
            }
          }
        }],
      },
      keyword: '',
      table: {
        size: 'small',
        loading: false,
        columns: [
          { title: '排序', dataIndex: 'seq', width: 50, ellipsis: true },
          { title: 'key', dataIndex: 'key', ellipsis: true },
          { title: 'value', dataIndex: 'value', ellipsis: true },
          {
            title: '操作', dataIndex: 'actions', width: 140, customRender: (_, row) => {
              return <div>
                <PopoverForm row={row} title={'编辑'} onSave={this.handleSubmitKeyValue}>
                  <a-button type="link" size="small">编辑</a-button>
                </PopoverForm>
                <a-popconfirm title="确定删除吗？" onConfirm={this.deleteRow.bind(this, row)}>
                  <a-button type="link" size="small"><span style="color: #ff4d4f">删除</span></a-button>
                </a-popconfirm>

              </div>
            }
          }
        ]
      },
      popoverVisible: false,
      popoverForm: {
        constantType: this.row.key,
        key: '',
        value: '',
        description: '',
        id: '',
        seq: 1
      }
    }
  },
  created () {
    if (this.row.id) {
      this.form.id = this.row.id
      this.form.key = this.row.key
      this.form.value = this.row.value
      this.form.description = this.row.description
    }
  },
  methods: {
    getTableList () {
      if (!this.row.id) {
        return
      }
      this.table.loading = true
      this.$axios.get('/api/admin/sysConstantDict/list', {
        params: {
          keyword: this.keyword,
          constantType: this.row.key,
          page: this.pagination.current,
          pageSize: this.pagination.pageSize
        }
      }).then(({ data: { list, totalRows } }) => {
        this.pagination.total = totalRows
        this.table.dataSource = list
      }).finally(() => {
        this.table.loading = false
      })
    },
    handleSubmitKeyValue (form, close) {
      this.$axios.post('/api/admin/sysConstantDict/saveOrUpdate', {
        ...form
      }).then(() => {
        this.$message.success('操作成功')
        this.pagination.current = 1
        close()
        this.getTableList()
      })
    },
    handleSearch () {
      this.keyword = this.rawKeyword
      this.getTableList()
    },
    handleOk () {
      this.$refs.form.validate().then(() => {
        this.form.value = this.form.key
        this.$axios.post('/api/admin/sysConstantType/saveOrUpdate', {
          ...this.form
        }).then(() => {
          this.$message.success('操作成功')
          this.$emit('submit-success')
          this.handleCancel()
        })
      })
    },
    deleteRow (row) {
      this.$axios.get('/api/admin/sysConstantDict/delete', {
        params: {
          id: row.id
        }
      }).then(() => {
        this.$message.success('删除成功')
        this.getTableList()
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
