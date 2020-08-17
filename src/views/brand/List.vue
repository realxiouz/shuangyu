<template>
  <div class="page">
    <search class="page-search" ref="search" @onSearch="onSearch"/>
    <el-row class="page-tools" type="flex" justify="space-between" align="bottom">
      <el-button icon="el-icon-plus" type="primary" size="mini" @click="onAdd">添加</el-button>
    </el-row>
    <el-table class="page-table" size="mini" v-loading="loading" :data="tableData" style="width: 100%;">
      <el-table-column prop="brandCode" label="品牌编码" align="center"></el-table-column>
      <el-table-column prop="brandName" label="品牌名称" align="center"></el-table-column>
      <el-table-column prop="categoryName" label="商品类目" align="center"></el-table-column>
      <el-table-column label="品牌故事" align="center">
        <template slot-scope="prop">
          <span style="text-align: left">{{prop.row.brandStory}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="prop">
          <span style="text-align: left">{{prop.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="onEdit(scope.row.brandId)" style="border:none;color:#409EFF">编辑</el-button>
          <el-button @click="onDel(scope.row.brandId)" style="border:none;color:#F56C6C">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
       class="page-footer"
      background
      prev-text="上一页"
      next-text="下一页"
      :total="total"
      @prev-click="onPrev"
      @next-click="onNext"
      @size-change="onSizeChange"
      layout="total,sizes,prev,next"
      :page-size="pageSizes[0]"
      :page-sizes="pageSizes"
       @current-change="onCurrentChange"
       :current-page.sync="currentPage"
    ></el-pagination>
    <edit :visible.sync="dialogVisible" :key-id="keyId" :key-name="keyName" @onSave="handleSave"/>
  </div>
</template>

<script>
    import search from "./Search.vue";
    import edit from "./Edit.vue";
    import {MIXIN_LIST} from "@/utils/mixin";


    export default {
        mixins: [MIXIN_LIST],
        data() {
            return {
                lastId: null,
                total: 0,
                keyId: '',
                dialogVisible: false,
                brandId: "",
                keyName:'brandId',
                actions: {
                    getPageList: 'brand/getPageList',
                    removeOne: 'brand/removeOne'
                }
            };
        },
        methods: {
            handleSave(formData) {
                if (this.brandId) {
                    this.$store
                        .dispatch("brand/updateOne", {brandId: formData.brandId, data: formData})
                        .then(() => {
                            this.loadData();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.$store
                        .dispatch("brand/addOne", formData)
                        .then(() => {
                            this.loadData({});
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            
        },
       
        components: {
            search,
            edit
        }
    };
</script>
