import {PAGE_SIZES} from '@/utils/const';

export const MIXIN_LIST = {
  data() {
    return {
      keyId: null,
      keyName: null,
      dialogVisible: false,
      pageFlag: 0,
      pageSize: PAGE_SIZES[0],
      lastId: null,
      total: 0,
      tableData: [],
      loading: false,
      pageSizes: PAGE_SIZES,
      params: {},
      extraParam: {},
      actions: {
        getPageList: null,
        removeOne: null
      }
    };
  },
  methods: {
    loadData() {
      console.log(this.actions)
      if (this.actions.getPageList) {
        this.loading = true;
        this.$store
          .dispatch(this.actions.getPageList, {
            pageSize: this.pageSize,
            lastId: this.lastId,
            pageFlag: this.pageFlag,
            ...this.params,
            ...this.extraParam
          })
          .then(data => {
            if (data) {
              this.tableData = data.rows;
              console.log(data)
              this.total = data.total;
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(_ => {
            this.loading = false;
          });
      }
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
      console.log('add')
      this.keyId = '';
      this.dialogVisible = true;
    },
    onEdit(row) {
      console.log('edit')
      this.keyId = row[this.keyName];
      console.log(this.keyId)
      this.dialogVisible = true;
    },
    onDel(id) {
      if (this.actions.removeOne) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(this.actions.removeOne, {deviceId: id}).then(() => {
            this.onRefresh();
            this.$message({type: "success", message: "删除成功"});
          });
        }).catch(error => {
          console.log(error);
        });
      }
    },
    onRefresh() {
      this.onSearch();
    }
  },
  created() {
    this.loadData();
  }
};

export const MIXIN_EDIT = {
  props: {
    keyId: {
      type: String,
      default: null
    },
    keyName: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      formData: this.defaultFormData(),
      formRules: {},
      actions: {
        getOne: null,
        saveOne: null
      }
    };
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
      if (val) {
        if (this.keyId) {
          this.loadData();
        } else {
          this.formData = this.defaultFormData();
        }
      }
    }
  },
  methods: {
    onOpen() {
      this.$emit('update:visible', true);
    },
    onClose() {
      this.$emit('update:visible', false);
    },
    onSave() {
      console.log(this.actions)
      if (this.actions.saveOne) {
        this.$store
          .dispatch(this.actions.saveOne, this.formData)
          .then(id => {
            if (!this._.isEmpty(id)) {
              this.formData[this.keyName] = id;
            }
            this.dialogVisible = false;
            this.$emit('refresh');
            this.$message({type: "success", message: "保存成功"});
          });
      }
    },
    defaultFormData() {
      return {};
    },
    clearForm() {
      this.formData = this.defaultFormData();
    },
    loadData() {
      if (this.actions.getOne) {
        if (this.keyId) {
          this.$store
            .dispatch(this.actions.getOne, {id: this.keyId})
            .then(data => {
              this.formData = data;
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
  },
  created() {
    this.clearForm();
  }
};
