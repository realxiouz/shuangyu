<template>
  <div class="home contentBox">
    <div class="left">
      <el-tabs :tab-position="tabPosition" style="min-height: 200px;" @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in configNavs" :key="index" :label=item.navName></el-tab-pane>
      </el-tabs>
    </div>
    <div class="right" >
      <transition name="fade-transform" mode="out-in">
        <div>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {MIXIN_LIST} from "@/utils/mixin";
  export default {
    mixins: [MIXIN_LIST],
    name: "firmConfig",
    data() {
    return {
      configNavs: [],
      tabPosition: "left",
      current: 0,
      checked: false,
      actions: {
        getList: 'firmOpenAuth/getList',
      },
      params:{openId: localStorage.getItem("openId")},
      form: {
        name: "",
        type: [],
      }
    };
  },
  methods: {
    beforeLoadData(data){ 
      if(data && data.length > 0 && data[0].configNavs){
         this.configNavs = data[0].configNavs;
      }
      return data;
    },
    goBack() {
      let lastName = localStorage.getItem("lastName");
      if (lastName) {
        this.$router.push({ name: lastName });
        localStorage.removeItem("lastName");
      } else {
        this.$router.go(-1);
      }
    },
    handleSave( ) {},
    handleClick(tab){
      this.$router.push(this.configNavs[tab.index].navUrl)
    }
  },
  
  };
  
</script>
<style scoped>
.el-row-item {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 20px 20px 0 0;
  width: 870px;
  margin-left: 20px;
}
.page-back {
  margin-bottom: 20px;
  margin-left: 20px;
}
.left{
  float: left;
}
.right{
  margin-top: -20px;
  margin-left: 150px;
}
.contentBox{
  min-height: 260px;
}
</style>