import {PAGE_SIZES} from '@/utils/const';

export const MIXIN_LIST = {
  data() {
    return {
      keyId: '',
      keyName: '',
      actionName: '',
      dialogVisible: false,
      pageFlag: 0,
      pageSize: PAGE_SIZES[0],
      lastId: null,
      total: 0,
      tableData: [],
      loading: false,
      pageSizes: PAGE_SIZES,
      params: {}
    };
  },
  methods: {
    loadData() {
      if (!this.actionName) {
        throw new Error('actionName不能为空');
      }
      this.loading = true;
      this.$store
        .dispatch(this.actionName, {
          pageSize: this.pageSize,
          lastId: this.lastId,
          pageFlag: this.pageFlag,
          ...this.params
        })
        .then(data => {
          if (data) {
            this.tableData = data.rows;
            this.total = data.total;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    onPrev() {
      this.pageFlag = -1;
      if (this.tableData.length > 0) {
        this.lastId = this.tableData[0][this.keyName];
      }
      this.loadData();
    },
    onNext() {
      this.pageFlag = 1;
      if (this.tableData.length > 0) {
        this.lastId = this.tableData[this.tableData.length - 1][this.keyName];
      }
      this.loadData();
    },
    onSearch(params) {
      if (!params) {
        for (const key in params) {
          !params[key] && delete params[key]
        }
      }
      this.params = params;
      this.pageFlag = 0;
      this.lastId = null;
      this.loadData();
    },
    onSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.lastId = null;
      this.pageFlag = 0;
      this.loadData();
    },
    onAdd() {
      this.keyId = '';
      this.dialogVisible = true;
    },
    onEdit(row) {
      this.keyId = row[this.keyName];
      this.dialogVisible = true;
    },
    onRefresh() {
      this.onSearch();
    }
  },
  created() {
    this.loadData();
  }
};
