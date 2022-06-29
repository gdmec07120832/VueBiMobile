export default {
  data() {
    return {
      rawKeyword: '',
      keyword: '',
      tableLoading: false,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: total => `共${total}条记录`
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      console.warn('请在业务组件中实现 %c getTableList %c 方法', 'background: #01bb92;color: #fff', '')
    },
    handleSearch() {
      this.keyword = this.rawKeyword.trim()
      this.getTableList()
    },
    handleSearchValueChange(e) {
      if(!e.target.value) {
        this.handleSearch()
      }
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current
      this.getTableList()
    }
  }
}
