<template>
  <div class="app-container">
    <policy-search @onSearch="handleSearch" @onAdd="handleAdd"></policy-search>
    <el-row style="margin-bottom:15px;margin-left:35px;">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table :data="tableData"
              highlight-current-row
              style="width: 100%;"
              border
              fit>
      <el-table-column
        prop="airlineCode"
        label="航司"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="dpt"
        label="出发地"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="arr"
        label="到达地"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="actFlightCode"
        label="主航班号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="flightCode"
        label="航班号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="cabin"
        label="舱位"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="discountValue"
        label="票面价/折扣"
        width="100"
      ></el-table-column>
      <el-table-column
        label="销售起始日期"
        width="150"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.sellStartDate" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.sellStartDate,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="销售结束日期"
        width="150"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.sellEndDate" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.sellEndDate,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="出发日期"
        width="150"
        align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.flightDate" class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ formatDate(scope.row.flightDate,'YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="earliestAdvanceDays"
        label="最早出票时限"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="policyCode"
        label="政策编码"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="policySource"
        label="政策来源"
        width="100"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="300">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row.policyId)" type="primary" size="mini">编辑</el-button>
          <el-button @click="handleRemove(scope.row.policyId)" type="danger"
                     size="mini">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog title="政策信息" :visible.sync="dialogVisible" width="35%" :close-on-click-modal="false">
      <policy-edit v-if="dialogVisible" :policy-id="policyId"  @onSave="handleSave"
                   @onCancel="handleCancel"></policy-edit>
    </el-dialog>
  </div>
</template>
<script>
    import policySearch from "./Search.vue"
    import policyEdit from "./Edit.vue"

    export default {
        name: 'policyList',
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                policyId: ''
            }
        },
        methods: {
            loadData(params) {
                this.$store
                    .dispatch("policy/getList", {
                            filters: params
                        }
                    ).then(data => {
                    if (data) {
                        this.tableData = data;
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            handleSearch(params) {
                if (!params) {
                    params = {};
                    this.loadData(params);
                }else {
                    const newParams ={};
                    if(params.policyCode){
                        newParams.policyCode = params.policyCode.toLocaleLowerCase();
                    }
                    if(params.airlineCode){
                        newParams.airlineCode = params.airlineCode.toLocaleLowerCase();
                    }
                    if(params.cabin){
                        newParams.cabin = params.cabin.toLocaleLowerCase();
                    }
                    if(params.dpt){
                        newParams.dpt = params.dpt.toLocaleLowerCase();
                    }
                    if(params.arr){
                        newParams.arr = params.arr.toLocaleLowerCase();
                    }
                    if(params.sellStartDate){
                        newParams.sellStartDate = params.sellStartDate;
                    }
                    if(params.sellEndDate){
                        newParams.sellEndDate = params.sellEndDate;
                    }
                    if(params.flightDate){
                        newParams.flightDate = params.flightDate;
                    }
                    this.loadData(newParams);
                }
            },
            handleUpdate(policyId) {
                this.policyId = policyId;
                this.dialogVisible = true;
            },
            handleRemove(user, domain) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$store
                        .dispatch("policy/removeOne", {user: user, domain: domain})
                        .then(() => {
                            this.handleSearch();
                        });
                }).catch(err => {
                    console.error(err);
                });
            }, handleCancel() {
                this.dialogVisible = false;
            },
            handleAdd() {
                this.dialogVisible = true;
                this.user = '';
                this.domain = '';
            },
            handleSave(formData) {
                this.$store
                    .dispatch("policy/save", formData)
                    .then(() => {
                        this.handleSearch();
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.dialogVisible = false;
            },
            /*初始化用工列表中的生日日期格式*/
            initDate(dateStr, format) {
                if (null != dateStr) {
                    let date = new Date(dateStr);
                    return this.$moment(date).format(format);
                } else {
                    return '';
                }
            }
        },
        created() {
            this.handleSearch();
        },
        computed:{
            formatDate() {
                return function (dateStr, format) {
                    return this.initDate(dateStr, format);
                }
            },
        },
        components: {
            policySearch,
            policyEdit
        }
    }
</script>
