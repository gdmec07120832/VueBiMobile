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
    <a-table :columns="table.columns" :data-source="table.data" :pagination="pagination" :loading="tableLoading"
             :scroll="{y: 'calc(100vh - 300px)'}"
             @change="handleTableChange" rowKey="id">
      <template slot="action" slot-scope="text, record">
        <a-button size="small" type="link" @click="openEdit(record)">编辑</a-button>
        <a-popconfirm
            ok-text="确定"
            cancel-text="取消"
            title="确定删除吗？"
            @confirm="onDelete(record)"
        >
          <a-button size="small" type="link" class="text-danger">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import {createDialog} from "@/utils/helpers";
import AddOrUpdate from "@/views/auth/auth-configuration/AddOrUpdate";
import getTableMixin from "@/views/mixins/getTableMixin";

const DialogService = createDialog(AddOrUpdate)

export default {
  name: "auth-configuration",
  mixins: [getTableMixin],
  data() {
    return {
      table: {
        columns: [
          {title: 'ID', dataIndex: 'id', width: 100},
          {title: '名称', dataIndex: 'name'},
          {title: '表达式', dataIndex: 'expression'},
          {title: '操作', dataIndex: 'action', width: 130, scopedSlots: {customRender: 'action'}}
        ],
        data: []
      }
    }
  },
  methods: {
    getTableList() {
      this.tableLoading = true
      this.$axios.get('/api/admin/permission/list', {
        params: {
          page: this.pagination.current,
          pageSize: this.pagination.pageSize,
          keyword: this.keyword
        }
      }).then(({data: {totalRows, list}}) => {
        this.pagination.total = totalRows
        this.table.data = list
      }).finally(() => {
        this.tableLoading = false
      })
    },
    openEdit(record) {
      DialogService.create.call(this, {
        propsData: {
          record
        },
        _parentListeners: {
          update: () => {
            this.getTableList()
          }
        }
      })
    },
    onDelete(record) {
      if(/^SQL/.test(record.expression)) {
        this.$message.error('不能删除由SQL配置生成的权限')
        return
      }
      this.$axios.get('/api/admin/permission/delete', {
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
