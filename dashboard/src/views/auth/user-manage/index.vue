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
    <a-table :columns="table.columns" :data-source="table.data" :pagination="pagination" row-key="id" :loading="tableLoading"
             :scroll="{x: 1000, y: 'calc(100vh - 300px)'}"
             @change="handleTableChange">
      <template slot="nickName" slot-scope="text, record">
        <span>{{ record.nickName }}（{{ record.username }}）</span>
      </template>
      <template slot="action" slot-scope="text, record" v-if="record.status !== 'Delete'">
        <template v-if="record.username !== 'admin'">
          <a-button size="small" type="link" @click="openEdit(record)">编辑</a-button>
          <a-button size="small" v-if="record.status === 'Normal'" type="link" class="text-danger"
                    @click="changeUserStatus(record, 'Frozen')">冻结
          </a-button>
          <a-button size="small" v-if="record.status === 'Frozen'" type="link" class="text-success"
                    @click="changeUserStatus(record, 'Normal')">启用
          </a-button>
          <a-popconfirm
              ok-text="确定"
              cancel-text="取消"
              title="确定删除吗？"
              @confirm="changeUserStatus(record, 'Delete')"
          >
            <a-button size="small" class="text-danger" type="link">删除</a-button>
          </a-popconfirm>
        </template>
        <span v-else>管理员账号不可操作</span>
      </template>
    </a-table>
  </div>
</template>

<script>
import {createDialog} from "@/utils/helpers";
import AddOrUpdate from "@/views/auth/user-manage/AddOrUpdate";
import getTableMixin from "@/views/mixins/getTableMixin";

const DialogService = createDialog(AddOrUpdate)

export default {
  name: 'userManage',
  mixins: [getTableMixin],
  data() {
    return {
      table: {
        columns: [
          {title: 'ID', dataIndex: 'id', width: 100},
          {title: '昵称（工号）', dataIndex: 'nickName', width: 170, scopedSlots: {customRender: 'nickName'}},
          {title: '手机号码', dataIndex: 'phone', width: 100},
          {title: '邮箱地址', dataIndex: 'email', width: 100},
          {
            title: '是否是管理员', dataIndex: 'admin', width: 120, customRender: (val) => {
              return val ? '是' : '否'
            }
          },
          {
            title: '是否可登录后台', dataIndex: 'canLoginBackend', width: 130, customRender: (val) => {
              return val ? '是' : '否'
            }
          },
          {
            title: '账户状态', dataIndex: 'status', width: 100, customRender: (val) => {
              return <span class={{'text-danger': val === 'Delete', 'text-warning': val === 'Frozen'}}>
                {({Normal: '正常', Frozen: '冻结', Delete: '已被删除'})[val]}
              </span>
            }
          },
          {title: '操作', dataIndex: 'action', width: 170, scopedSlots: {customRender: 'action'}}
        ],
        data: []
      },
      rawKeyword: ''
    }
  },
  methods: {
    getTableList() {
      this.tableLoading = true
      this.$axios.get('/api/admin/user/list', {
        params: {
          page: this.pagination.current,
          pageSize: this.pagination.pageSize,
          keyword: this.keyword
        }
      }).then(({data: {list, totalRows}}) => {
        this.pagination.total = totalRows
        this.table.data = list
      }).finally(() => {
        this.tableLoading = false
      })
    },
    changePassword() {

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
    changeUserStatus(record, status) {
      this.$axios.get('/api/admin/user/updateStatus', {
        params: {
          id: record.id,
          userStatus: status
        }
      }).then(() => {
        this.$message.success('操作成功')
        this.getTableList()
      })
    }
  }
}
</script>

<style scoped></style>
