<template>
  <div>
    <div class="flex flex-between mb5">
      <div class="flex" style="width: 30%">
        <search-input @search="handleSearch"></search-input>
      </div>
      <a-button type="primary" @click="openEdit({})">新增</a-button>
    </div>
    <a-table style="height: calc(100% - 37px)"
             :columns="table.columns"
             :data-source="table.data"
             :loading="tableLoading"
             :scroll="{x: 1000, y: 'calc(100vh - 250px)'}"
             :expand-icon="table.expandIcon"
             :default-expanded-row-keys="table.defaultExpandedRowKeys"
             :pagination="false"
             @expandedRowsChange="handleExpandRowsChange"
             childrenColumnName="children" row-key="id">
      <template slot="sqlStr" slot-scope="text, record">
        <div class="text-ellipsis" style="cursor: pointer" @click="openEdit(record)">{{ text }}</div>
      </template>
      <template slot="action" slot-scope="text, record">
        <a-button size="small" type="link" @click="openEdit(record, false)">编辑</a-button>
        <a-button size="small" type="link" @click="openEdit(record, true)">复制</a-button>
        <a-popconfirm
            ok-text="确定"
            cancel-text="取消"
            title="确定删除吗？"
            @confirm="onDelete(record)"
        >
          <a-button class="text-danger" size="small" type="link">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import { createDialog } from '@/utils/helpers'
import AddOrUpdate from '@/views/sql-config/sql-config-index/AddOrUpdate'
import getTableMixin from '@/views/mixins/getTableMixin'
import SearchInput from '@/views/sql-config/sql-config-index/SearchInput'

import cloneDeep from 'lodash/cloneDeep'
import filterDeep from 'deepdash/es/filterDeep'

const searchField = ['cnName', 'description', 'interfaceName', 'prefix', 'sqlStr']

const DialogService = createDialog(AddOrUpdate)

export default {
  name: 'sql-config',
  components: { SearchInput },
  mixins: [getTableMixin],
  data () {
    return {
      type: '',
      query: {
        keyword: ''
      },
      dataCopy: [],
      allMenus: [],
      menuMaps: {},
      selectedMenuMap: {},
      currentMenuMap: {},
      flattenDataCopy: [],
      expandRowsIds: [],
      table: {
        data: [],
        defaultExpandedRowKeys: [],
        expandIcon: (props) => {
          if (props.record.children && props.record.children.length) {
            if (props.expanded) {
              return <a style={{ color: '#666', marginRight: '4px' }} onClick={e => {
                props.onExpand(props.record, e)
              }}>
                <a-icon type="minus-square" style={{ fontSize: '18px' }}/>
              </a>
            } else {
              return <a style={{ color: '#666', marginRight: '4px' }} onClick={e => {
                props.onExpand(props.record, e)
              }}>
                <a-icon type="plus-square" style={{ fontSize: '18px' }}/>
              </a>
            }
          } else {
            return <span style={{ marginRight: '20px' }}/>
          }
        },
        columns: [
          { title: '中文名称', dataIndex: 'cnName', ellipsis: true, width: 280 },
          { title: '前缀', dataIndex: 'prefix', ellipsis: true, width: 120 },
          { title: '接口名称', dataIndex: 'interfaceName', ellipsis: true, width: 150 },
          { title: 'SQL语句', dataIndex: 'sqlStr', scopedSlots: { customRender: 'sqlStr' }, width: 150 },
          { title: '描述', dataIndex: 'description', width: 150, ellipsis: true },
          { title: '操作', dataIndex: 'action', width: 165, scopedSlots: { customRender: 'action' }, fixed: 'right' }
        ]
      }
    }
  },
  created () {
    this.type = ({
      '/sql_config/index': 'MobileTerminal-old',
      '/sql_config2/index': 'PcTerminal',
      '/sql_config3/index': 'LargeScreenTerminal',
      '/sql_config4/index': 'ExternalInterface',
      '/sql_config5/index': 'DataMessage'
    })[this.$route.path]
  },
  methods: {
    getTableList () {
      this.tableLoading = true
      this.$axios.get('/api/admin/dataInterfaceConfig/list', {
        params: {
          interfaceType: ({
            '/sql_config/index': 'MobileTerminal-old',
            '/sql_config2/index': 'PcTerminal',
            '/sql_config3/index': 'LargeScreenTerminal',
            '/sql_config4/index': 'ExternalInterface',
            '/sql_config5/index': 'DataMessage'
          })[this.$route.path]
        }
      }).then(({ data }) => {
        this.table.data = Object.freeze(data)
        this.dataCopy = cloneDeep(data)
      }).finally(() => {
        this.tableLoading = false
      })
    },
    handleExpandRowsChange (rows) {
      this.expandRowsIds = rows
    },
    handleSearch (keyword) {
      const word = (keyword || '').trim()
      if (!word) {
        this.getTableList()
        return
      }
      this.query.keyword = word
      const result = filterDeep(this.dataCopy, item => {
        for (let prop of searchField) {
          if ((item[prop] || '').indexOf(word) > -1) {
            return true
          }
        }
      }, { cloneDeep: cloneDeep, childrenPath: ['children'] })
      this.tableLoading = true
      setTimeout(() => {
        this.table.data = Object.freeze(result)
        setTimeout(() => {
          this.tableLoading = false
        })
      }, 40)
    },
    openEdit (record, isCopy) {
      if (isCopy) {
        this.$message.success('复制成功')
      }
      DialogService.create.call(this, {
        destroy: true,
        propsData: {
          type: this.type,
          record,
          isCopy
        },
        _parentListeners: {
          update: (data) => {
            if (isCopy || !data.id) {
              this.getTableList()
            } else {
              Object.assign(record, data)
              this.$message.success('保存成功')
            }
          }
        }
      })
    },
    onDelete (record) {
      this.$axios.get('/api/admin/dataInterfaceConfig/delete', {
        params: {
          id: record.id
        }
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
