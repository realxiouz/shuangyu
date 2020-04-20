<template>
  <div class="bigBox">
    <div class="searchBox">
      <apiSearch @onSearch="handleSearch"></apiSearch>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px;margin-left:15px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        v-loading="loading"
        size="mini"
        :data="tableData"
        style="width: 100%;margin-bottom: 15px;"
      >
        <el-table-column prop="third.firmName" label="Open平台" width="300" align="center"></el-table-column>
        <el-table-column prop="url" label="url" width="300" align="center"></el-table-column>
        <el-table-column prop="method" label="方法名称" align="center"></el-table-column>
        <el-table-column label="是否启用" align="center" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enable" @change="handleSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row.apiId)" type="primary" size="mini">编辑</el-button>
            <el-button
              @click.native.prevent="handleRemove(scope.row.apiId,scope.$index,tableData)"
              type="danger"
              size="mini"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @prev-click="prevClick"
        @next-click="nextClick"
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
      <el-dialog title="OpenApi信息" center :visible.sync="dialogVisible" width="33%" :close-on-click-modal="false">
        <el-form ref="formData" :model="formData" label-width="100px" size="mini">
          <input type="hidden" v-model="formData.apiId"/>
          <el-form-item label="Open平台:">
            <el-select v-model="formData.openId" placeholder="请选择平台.." @change="handleThirdSelect" style="width: 100%">
              <el-option
                v-for="item in openList"
                :key="item.openId"
                :label="item.openName"
                :value="item.openId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="URL:">
            <el-input v-model="formData.url"></el-input>
          </el-form-item>
          <el-form-item label="方法:">
            <el-input v-model="formData.method"></el-input>
          </el-form-item>
          <el-form-item label="参数">
            <div style="width: 100%; height: 100px; border: #DCDFE6 solid 1px; border-radius: 4px">
              <el-tag closable :disable-transitions="false"
                      v-for="(tag,idx) in paramList"
                      :key="idx"
                      @close="handleClose(idx)"
                      @click="handleTagClick(idx)">
                {{tag.name+": "+tag.value}}
              </el-tag>
              <el-button class="button-new-tag" size="small" @click="addParams">+ 添加参数</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:right;">
          <el-button size="mini" @click="handleCancel">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleSave">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="API参数" :visible.sync="paramDialogVisible" width="20%" :close-on-click-modal="false">
        <el-form :model="paramFormData" label-width="100px" size="mini">
          <el-form-item label="参数名称">
            <el-input v-model="paramFormData.name" placeholder="参数名称.."></el-input>
          </el-form-item>
          <el-form-item label="参数值">
            <el-input v-model="paramFormData.value" placeholder="参数值.."></el-input>
          </el-form-item>
          <el-form-item label="是否只读">
            <el-select v-model="paramFormData.readonly" style="width: 100%">
              <el-option label="是" :value=true></el-option>
              <el-option label="否" :value=false></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="paramDialogCancel">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import apiSearch from "./Search.vue";

    function defaultData() {
        return {
            apiId: "",
            openId: "",
            url: "",
            method: ""
        };
    }

    export default {
        name: "openApiList",
        data() {
            return {
                loading: true,
                lastId: "blank",
                pageFlag: "next",
                pageSize: 10,
                total: 0,
                dialogVisible: false,
                tableData: [],
                apiId: "",
                paramDialogVisible: false,
                deleteForSearch: false,
                formData: defaultData(),
                paramFormData: {},
                paramList: [],
                openList: []
            };
        },
        methods: {
            defaultParamForm() {
                return {
                    //标签
                    label: '',
                    //名称
                    name: '',
                    //值
                    value: '',
                    //分组
                    group: '',
                    //标签
                    comment: '',
                    //输入框类型
                    inputType: '',
                    //数据类型
                    dataType: '',
                    //是否只读
                    readonly: false,
                    //禁用
                    disabled: false,
                    //是否必须
                    required: true,
                    //数据
                    data: ''
                };
            },
            prevClick() {
                this.pageFlag = "prev";
                this.lastId = this.tableData[0].apiId;
                this.loadData();
            },
            nextClick() {
                this.pageFlag = "next";
                this.lastId = this.tableData[this.tableData.length - 1].apiId;
                this.loadData();
            },
            loadData(params) {
                if (!params || !params.apiName) {
                    params = {};
                }
                this.$store
                    .dispatch("openApiService/getPageList", {
                        pageFlag: this.pageFlag,
                        pageSize: this.pageSize,
                        lastId: 'blank',
                        filters: params
                    })
                    .then(data => {
                        if (data) {
                            this.tableData = data;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            loadTotal: function (params) {
                if (!params || !params.apiName) {
                    params = {};
                }
                this.$store
                    .dispatch("openApiService/getTotal", {filters: params})
                    .then(response => {
                        this.total = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            //加载平台信息
            loadOpenParty() {
                this.$store.dispatch("open/getList", {filters: {}})
                    .then(data => {
                        this.openList = data;
                    }).catch(error => {
                    console.log(error);
                });
            },
            handleAdd() {
                this.formData = defaultData();
                this.paramList = [];
                this.loadOpenParty();
                this.dialogVisible = true;
                this.apiId = "";
            },
            handleSwitch(row) {
                row.enable = row.enable ? true : false;
                this.$store
                    .dispatch("openApiService/updateOne", row)
                    .then(() => {
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            handleRemove(id, index, rows) {
                this.$confirm("此操作将状态改为删除状态, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store
                            .dispatch("openApiService/removeOne", {apiId: id})
                            .then(() => {
                                if (1 === this.tableData.length && !this.deleteForSearch) {
                                    this.prevClick();
                                } else {
                                    this.loadData();
                                }
                                this.deleteForSearch = false;
                                rows.splice(index, 1);
                            });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            handleSave() {
                this.formData.params = this.paramList;
                let url = '';
                if ('' != this.formData.apiId) {
                    url = "openApiService/updateOne";
                } else {
                    url = "openApiService/addApi";
                }
                this.$store
                    .dispatch(url, this.formData)
                    .then(() => {
                        this.handleSearch();
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.dialogVisible = false;
            },
            handleUpdate(id) {
                this.paramList = [];
                this.loadOpenParty();
                this.handleGetOne(id);
                this.dialogVisible = true;
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSearch(params) {
                this.deleteForSearch = true;
                if (!params) {
                    params = {};
                }
                this.loadData(params);
                this.loadTotal(params);
            },
            handleGetOne(id) {
                if (id) {
                    this.$store
                        .dispatch("openApiService/getOne", id)
                        .then(data => {
                            this.formData = data;
                            this.dialogVisible = true;
                            Object.assign(this.paramList, data.params);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.paramList = [];
                    this.formData = defaultData();
                }
            },
            clearForm() {
                this.paramFormData = this.defaultParamForm();
            },
            addParams() {
                this.clearForm();
                this.paramDialogVisible = true;
            },
            paramDialogCancel() {
                this.paramDialogVisible = false;
            },
            handleConfirm() {
                let exits = true;
                for (let i = 0; i < this.paramList.length; i++) {
                    if (this.paramList[i].name === this.paramFormData.name) {
                        exits = false;
                        break;
                    }
                }
                if (exits) {
                    this.paramList.push(this.paramFormData);
                }
                this.paramDialogVisible = false;
            },
            handleClose(idx) {
                this.paramList.splice(idx, 1);
            },
            handleTagClick(idx) {
                this.clearForm();
                Object.assign(this.paramFormData, this.paramList[idx]);
                this.paramDialogVisible = true;
            }
        },
        created() {
            this.handleSearch();
        },
        components: {
            apiSearch
        }
    };
</script>

<style>
  .el-tag {
    margin: 5px 0 2px 3px;
  }

  .button-new-tag {
    margin: 5px 0 2px 3px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
