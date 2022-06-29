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
import {createDialog} from '@/utils/helpers'
import AddOrUpdate from '@/views/PushConfig/AddOrUpdate'
import getTableMixin from '@/views/mixins/getTableMixin'

const AddOrUpdateService = createDialog(AddOrUpdate)

export default {
  name: 'PushConfigList',
  mixins: [getTableMixin],
  data() {
    return {
      chatGroupList: [],
      chatGroupListMap: {},
      rawKeyword: '',
      table: {
        loading: false,
        rowKey: 'id',
        scroll: {y: 'calc(100vh - 300px)'},
        dataSource: [],
        columns: [
          {dataIndex: 'id', title: 'ID', width: 80},
          {dataIndex: 'title', title: '标题', ellipsis: true},
          {dataIndex: 'description', title: '描述', ellipsis: true},
          {
            dataIndex: 'dynamicCover', title: '启用动态封面', customRender: (_) => {
              return _ ? '是' : '否'
            }
          },
          {dataIndex: 'pageUrl', title: '页面路径', ellipsis: true},
          {
            dataIndex: 'prefix', ellipsis: true, title: '前缀', customRender: (_, row) => {
              return row['coverConfig']['prefix']
            }
          },
          {
            dataIndex: 'interfaceName', title: '接口名称', customRender: (_, row) => {
              return row['coverConfig']['interfaceName']
            }, ellipsis: true
          },
          {
            dataIndex: 'targetChatGroup', title: '目标群', ellipsis: true, customRender: (_, row) => {
              const groupIds = row['targetChartGroupId']

              const names = (groupIds || '').split(',').map(_ => {
                return this.chatGroupListMap[_]
              })
              return names.join('，')
            }
          },
          {
            dataIndex: 'actions', title: '操作', width: 240, customRender: (_, row) => {
              return <div>
                <a-button type="link" size="small" onClick={this.openEdit.bind(this, row)}>编辑</a-button>
                <a-popconfirm title="确定推送吗？" onConfirm={this.pushRow.bind(this, row)}>
                  <a-button type="link" size="small">推送</a-button>
                </a-popconfirm>

                {
                  row.status === 'Frozen' &&
                  <a-popconfirm title="确定启用吗？" onConfirm={this.toggleRow.bind(this, row, 1)}>
                    <a-button type="link" size="small">启用</a-button>
                  </a-popconfirm>
                }
                {
                  row.status === 'Normal' &&
                  <a-popconfirm title="确定禁用吗？" onConfirm={this.toggleRow.bind(this, row, 0)}>
                    <a-button type="link" size="small"><span style="color: #ff4d4f">禁用</span></a-button>
                  </a-popconfirm>
                }
                <a-popconfirm title="确定删除吗？" onConfirm={this.deleteRow.bind(this, row)}>
                  <a-button type="link" size="small"><span style="color: #ff4d4f">删除</span></a-button>
                </a-popconfirm>
              </div>
            }
          }
        ]
      }
    }
  },
  created() {
    this.getChatGroupList()
  },
  methods: {
    getChatGroupList() {
      this.$axios.get('/api/admin/dataMessageConfig/listDingDingChartSessions').then(({data}) => {
        this.chatGroupList = data
        this.chatGroupListMap = (data || []).reduce((acc, cur) => {
          acc[cur['value']] = cur['key']
          return acc
        }, {})
      })
    },
    getTableList() {
      this.table.loading = true
      this.$axios.get('/api/admin/dataMessageConfig/list', {
        params: {
          keyword: this.keyword,
          page: this.pagination.current,
          pageSize: this.pagination.pageSize
        }
      }).then(({data: {list, totalRows}}) => {
        this.pagination.total = totalRows
        this.table.dataSource = list
      }).finally(() => {
        this.table.loading = false
      })
    },
    handleSearch() {
      this.keyword = this.rawKeyword
      this.getTableList()
    },
    handleSearchValueChange() {
    },
    openEdit(row) {
      AddOrUpdateService.create({
        destroy: true,
        propsData: {
          row,
          chatGroupList: this.chatGroupList
        },
        _parentListeners: {
          'submit-success': () => {
            this.getTableList()
          }
        }
      })
    },
    pushRow(row) {
      this.$axios.get('/api/admin/dataMessageConfig/send', {
        params: {id: row.id}
      }).then(() => {
        this.$message.success('推送成功')
      })
    },
    toggleRow(row, status) {
      let url = ''
      if (status === 1) {
        // 启用
        url = '/api/admin/dataMessageConfig/start'
      } else {
        url = '/api/admin/dataMessageConfig/stop'
      }
      this.$axios.get(url, {params: {id: row.id}}).then(() => {
        this.$message.success('操作成功')
        this.getTableList()
      })
    },
    deleteRow(row) {
      this.$axios.get('/api/admin/dataMessageConfig/delete', {
        params: {id: row.id}
      }).then(() => {
        this.$message.success('删除成功')
        this.getTableList()
      })
    }
  }
}
</script>

<style scoped>

</style>
