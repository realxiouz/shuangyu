<template>
  <div class="bigBox">
    <div class="searchBox">
      <job-tag-search ref="search" @onSearch="handleSearch"></job-tag-search>
    </div>
    <div class="contentBox">
      <el-row style="margin-bottom:15px; margin-left:38px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table
        highlight-current-row
        v-loading="loading"
        :data="tableData"
        ref="tableData"
        style="width: 100%;margin-bottom: 20px;"
        size="mini"
      >
        <el-table-column prop="tagName" label="标签名称" align="center"></el-table-column>
        <el-table-column prop="tagCode" label="标签编码" align="center"></el-table-column>
        <el-table-column prop="tagType" label="标签类别" align="center">
          <template slot-scope="scope">
            <span v-html="formatTagType(scope.row.tagType)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="330">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="removeOne(scope.row.tagId)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev,next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
      ></el-pagination>
      <el-dialog
        :title="updateFlag?'更新':'新增'"
        center
        :visible.sync="dialogVisible"
        width="33%"
        ref="user-edit"
        :close-on-click-modal="false"
      >
        <job-tag-edit
          v-if="dialogVisible"
          ref="form"
          :job-tag-id="tagId"
          :update-flag="updateFlag"
          @onSave="handleSave"
          @onCancel="handleCancel"
        ></job-tag-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import jobTagEdit from "./Edit";
  import jobTagSearch from "./Search";

  export default {
    name: "jobTagList",
    data() {
      return {
        dialogVisible: false,
        updateFlag: false,
        tagId: "",
        pageFlag: 1,
        pageSize: 10,
        lastId: null,
        total: 0,
        tableData: [],
        tagTypes:[
          {
            label:"工厂",
            value:1
          },
          {
            label:"政策",
            value:2
          },
          {
            label:"其他",
            value:9
          }
        ],
        loading: true
      };
    },
    components: {
      jobTagEdit,
      jobTagSearch
    },
    methods: {
      loadData(params) {
        if (this.lastId) {
          params.lastId = this.lastId;
        }
        this.$store
          .dispatch("jobTag/getPageList", {
            pageFlag: this.pageFlag,
            pageSize: this.pageSize,
            filter: params
          })
          .then(data => {
            if (data) {
              this.tableData = data.rows;
              this.total = data.total;
            }
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.lastId = null;
        this.loadData();
      },
      handlePrevClick() {
        this.pageFlag = -1;
        this.lastId = this.tableData[0].tagId;
        this.loadData();
      },
      handleNextClick() {
        this.pageFlag = 1;
        this.lastId = this.tableData[this.tableData.length - 1].tagId;
        this.loadData();
      },
      handleSearch(params) {
        if (Object.keys(params).length == 0) {
          this.lastId = null;
        }
        this.loadData(params);
      },
      handleAdd() {
        this.dialogVisible = true;
        this.updateFlag = false;
        this.tagId = "";
      },
      handleEdit(row) {
        this.updateFlag = true;
        this.tagId = row.tagId;
        this.dialogVisible = true;

      },

      removeOne(tagId) {
        this.$confirm("是否确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store
              .dispatch("jobTag/removeOne", {jobTagId: tagId})
              .then(() => {
                this.loadData();
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => {
            console.error(err);
          });
      },
      handleCancel() {
        this.dialogVisible = false;
      },
      handleSave() {
        this.dialogVisible = false;
        this.loadData();
      },
      formatTagType(value){
        for (var i =0;i<this.tagTypes.length;i++){
          if (value==this.tagTypes[i].value){
            return this.tagTypes[i].label;
          }
        }
      }
    },
    created() {
      this.loadData();
    },
  };
</script>

