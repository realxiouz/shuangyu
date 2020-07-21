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
      actions: {
        getPageList: null,
        removeOne: null
      }
    };
  },
  methods: {
    loadData() {
      if (this.actions.getPageList) {
        this.loading = true;
        this.$store
          .dispatch(this.actions.getPageList, {
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
      this.keyId = '';
      this.dialogVisible = true;
    },
    onEdit(id) {
      this.keyId = id;
      this.dialogVisible = true;
    },
    onDel(id) {
      if (this.actions.removeOne) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(this.actions.removeOne, {[this.keyName]: id}).then(() => {
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
          this.loadDetail();
        } else {
          this.formData = this.defaultFormData();
        }
      }
    }
  },
  methods: {
    onOpen() {
      this.refreshForm(1);
      this.$emit('update:visible', true);
    },
    onClose() {
      this.$emit('update:visible', false);
    },
    onSave() {
      if (this.actions.saveOne) {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.$store
              .dispatch(this.actions.saveOne, this.formData)
              .then(id => {
                if (!this._.isEmpty(id)) {
                  this.formData[this.keyName] = id;
                }
                this.dialogVisible = false;
                this.$emit('refresh');
                this.$message({ type: 'success', message: '保存成功' });
              });
          } else {
            this.refreshForm(1000);
          }
        });
      }
    },
    defaultFormData() {
      return {};
    },
    refreshForm(time) {
      if (!time || isNaN(time)) {
        time = 1000;
      }
      let that = this;
      let timer = window.setTimeout(function(){
        that.$nextTick(function () {
          that.$refs['form'].clearValidate();
          window.clearTimeout(timer);
        });
      }, time);
    },
    clearForm() {
      this.formData = this.defaultFormData();
    },
    loadDetail() {
      if (this.actions.getOne) {
        if (this.keyId) {
          this.$store
            .dispatch(this.actions.getOne, { [this.keyName]: this.keyId })
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
