<template>
  <div>
    <div class="flex flex-between mb5">
      <div class="flex" style="width: 30%">
        <a-input v-model="rawKeyword" @keydown.enter.native="handleSearch" @change="handleSearchValueChange" allow-clear
                 placeholder="输入关键字查找"/>
        <a-button class="ml5" @click="handleSearch">查找</a-button>
      </div>
      <a-button type="primary" @click="openEdit({})">新增</a-button>
    </div>

    <a-table v-bind="table" :pagination="pagination" @change="handleTableChange"/>
  </div>
</template>

<script>
import { createDialog } from '@/utils/helpers'
import getTableMixin from '@/views/mixins/getTableMixin'

import AddOrUpdate from '@/views/DictConfig/AddOrUpdate'

const services = createDialog(AddOrUpdate)

export default {
  name: 'DictConfigList',
  mixins: [getTableMixin],
  data () {
    return {
      rawKeyword: '',
      keyword: '',
      table: {
        loading: false,
        scroll: { y: 'calc(100vh - 300px)' },
        rowKey: 'id',
        dataSource: [],
        columns: [
          { dataIndex: 'id', title: 'ID', width: 80 },
          { dataIndex: 'key', title: '字典名称', ellipsis: true },
          { dataIndex: 'description', title: '描述', ellipsis: true },
          {
            dataIndex: 'actions', title: '操作', width: 240, customRender: (_, row) => {
              return <div>
                <a-button type="link" size="small" onClick={this.openEdit.bind(this, row)}>编辑</a-button>
                <a-popconfirm title="确定删除吗？" onConfirm={this.deleteRow.bind(this, row)}>
                  <a-button type="link" size="small"><span style="color: #ff4d4f">删除</span></a-button>
                </a-popconfirm>
              </div>
            }
          }
        ]
      },
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    handleSearchValueChange () {},
    handleSearch () {
      this.keyword = this.rawKeyword
      this.getTableList()
    },
    getTableList () {
      this.table.loading = true
      this.$axios.get('/api/admin/sysConstantType/list', {
        params: {
          keyword: this.keyword,
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
    openEdit (row) {
      services.create({
        destroy: true,
        propsData: {
          row
        },
        _parentListeners: {
          'submit-success': () => {
            this.getTableList()
          }
        }
      }, () => {})
    },
    deleteRow () {}
  }
}
</script>

<style scoped>

</style>
