<template>
  <div class="home contentBox">
    <el-row>
      <el-col :xs="11" :sm="10" :md="9" :lg="8" :xl="2" >
        <el-tabs :tab-position="tabPosition" style="min-height: 200px;" @tab-click="handleClick">
          <el-tab-pane v-for="(item,index) in configNavs" :key="index" :label=item.navName></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xs="13" :sm="14" :md="15" :lg="16" :xl="21">
        <transition name="fade-transform" mode="out-in">
          <div>
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </transition>
      </el-col>
    </el-row>
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
    handleClick(tab){
      this.$router.push(this.configNavs[tab.index].navUrl)
    }
  },
  
  };
  
</script>
<style scoped>
</style>