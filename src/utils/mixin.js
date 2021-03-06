import {PAGE_SIZES} from '@/utils/const';
import { Alert } from 'element-ui';

export const MIXIN_LIST = {
  category: {
    type: Number,
    default: null
  },
  data() {
    return {
      keyId: null,
      keyName: null,
      dialogVisible: false,
      pageFlag: 0,
      pageSize: PAGE_SIZES[0],
      currentPage: 1,
      lastId: null,
      total: 0,
      tableData: [],
      loading: false,
      pageSizes: PAGE_SIZES,
      params: {},
      actions: {
        getPageList: null,
        getList: null,
        removeOne: null
      }
    };
  },
  methods: {
    beforeLoadData(data) {
      return data;
    },
    afterLoadData() {
    },
    loadData() {
      if (this.actions.getPageList) {
        let payload = {
          pageSize: this.pageSize,
          pageFlag: this.pageFlag,
          ...this.params
        };
        if (this.lastId) {
          payload.lastId = this.lastId;
        }
        this.loading = true;
        this.$store
          .dispatch(this.actions.getPageList, payload)
          .then(data => {
            if (data) {
              let _data = this.beforeLoadData(data);
              this.tableData = _data.rows;
              this.total = _data.total;
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(_ => {
            this.loading = false;
            this.afterLoadData();
          });
      } else if (this.actions.getList) {
        this.loading = true;
        this.$store
          .dispatch(this.actions.getList, {
            ...this.params
          })
          .then(data => {
            if (data) {
              let _data = this.beforeLoadData(data);
              this.tableData = _data;
              this.total = _data.length;
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(_ => {
            this.loading = false;
            this.afterLoadData();
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
      if (params) {
        this.params = Object.assign({}, this.params, params);
      }
      let _params = {};
      for (let key in this.params) {
        let val = this.params[key];
        if (val !== "" && val !== null && val !== undefined && /[^\s]/.test(val)) {
          _params[key] = val;
        }
      }
      this.params = _params;
      this.pageFlag = 0;
      this.currentPage = 1;
      this.lastId = null;
      this.loadData();
    },
    onSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.lastId = null;
      this.pageFlag = 0;
      this.loadData();
    },
    onCurrentChange(currentPage) {
      this.currentPage = currentPage;
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
          this.$store
            .dispatch(this.actions.removeOne, {[this.keyName]: id})
            .then(() => {
              this.onRefresh();
              this.$message({type: 'success', message: '删除成功'});
            });
        }).catch(error => {
          console.log(error);
        });
      }
    },
    onRefresh() {
      this.loadData();
    }
  },
  created() {
    this.$nextTick(_ => {
      this.loadData();
    })
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
      let that = this;
      that.dialogVisible = val;
      if (val) {
        if (that.keyId) {
          that.loadData();
        } else {
          that.formData = that.defaultFormData();
        }
        that.$nextTick(function () {
          that.$refs['form'].clearValidate();
        });
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
      if (this.actions.saveOne) {
        this.$refs['form'].validate(valid => {
          if (valid && this.validateOther()) {
            this.$store
              .dispatch(this.actions.saveOne, this.beforeSave(this.formData))
              .then(id => {
                if (!this._.isEmpty(id)) {
                  this.formData[this.keyName] = id;
                }
                this.dialogVisible = false;
                this.$emit('refresh');
                this.$message({type: 'success', message: '保存成功'});
              })
              // eslint-disable-next-line no-unused-vars
              .finally(_ => {
                this.afterSave();
              });
          }
        });
      }
    },
    beforeSave(data) {
      return data;
    },
    afterSave() {
    },
    defaultFormData() {
      return {};
    },
    validateOther() {
      return true;
    },
    clearForm() {
      this.formData = this.defaultFormData();
    },
    loadData() {
      this.clearForm();
      if (this.actions.getOne) {
        if (this.keyId) {
          this.$store
            .dispatch(this.actions.getOne, {[this.keyName]: this.keyId})
            .then(data => {
              this.formData = this.beforeLoadData(data);
            })
            .catch(error => {
              console.log(error);
            })
            .finally(_ => {
              this.afterLoadData();
            });
        }
      }
    },
    beforeLoadData(data) {
      return data;
    },
    afterLoadData() {
    }
  },
  created() {
    this.clearForm();
  }
};
