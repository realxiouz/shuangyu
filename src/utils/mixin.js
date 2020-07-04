import { PAGE_SIZES } from '@/utils/const'

export const MIXIN_TABLE = {
    data() {
        return {
            dialogVisible: false,
            pageFlag: 0,
            pageSize: PAGE_SIZES[0],
            lastId: null,
            total: 0,
            tableData: [],
            loading: false,
            beanIdName: '',
            pageSizes: PAGE_SIZES,
            params: {},
        }
    },
    methods: {
        loadData() {
            if (!this.actionName) {
                throw new Error('actionName不能为空')
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
        handlePrev() {
            this.pageFlag = -1;
            if (this.tableData.length > 0) {
                this.lastId = this.tableData[0][this.beanIdName];
            }
            this.loadData();
        },
        handleNext() {
            this.pageFlag = 1;
            if (this.tableData.length > 0) {
                this.lastId = this.tableData[this.tableData.length - 1][this.beanIdName];
            }
            this.loadData();
        },
        handleSearch(params) {
            console.log(params)
            this.params = params;
            this.pageFlag = 0;
            this.lastId = null;
            this.loadData();
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.lastId = null;
            this.pageFlag = 0;
            this.loadData();
        },
        handleAdd() {
            this[this.beanIdName] = "";
            this.dialogVisible = true;
        },
        handleEdit(i) {
            this[this.beanIdName] = i[this.beanIdName];
            this.dialogVisible = true;
        },
    },
    created() {
        this.loadData()
    },
}