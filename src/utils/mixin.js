export const MIXIN_TABLE = {
    data() {
        return {
            dialogVisible: false,
            pageFlag: 0,
            pageSize: 10,
            lastId: null,
            total: 30,
            tableData: [],
            loading: true,
            beanIdName: '',
            params: {},
        }
    },
    methods: {
        loadData() {
            
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
            this.params = params;
            this.pageFlag = 0;
            this.lastId = null;
            this.loadData();
        },
    },
    created() {
        this.loadData()
    },
}