<template>
  <div class="bigBox">
    <el-card class="contentBox">
      <div slot="header">
        <span>去哪儿订单通知接口</span>
      </div>
      <el-form :model="notifyData" label-width="130px" size="mini">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="域名:">
              <el-input v-model="notifyData.domain" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <span>代理商TTS域名,系统自动读取。</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="安全码:">
              <el-input v-model="notifyData.securityCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <span>作为安全标识，我们会将安全码配置在系统中。</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="消息通知地址:">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入消息通知地址"
                v-model="notifyData.url"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <span>用于我们推送消息通知机制和您返回信息，详见《TTS消息通知机制说明文档》。
此处可添加多个消息通知地址，以回车隔开
必须以http://开头，并且每个URL最多输入200个字
示例：
http://api.abc.com/order
http://123.123.123.1:9000</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item>
              <el-button
                @click="handleRemove()"
                type="primary"
                size="mini"
              >保存
              </el-button>
              <el-button
                @click="handleRemove()"
                type="danger"
                size="mini"
              >删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="contentBox">
      <div slot="header">
        <span>去哪儿订单接口账号</span>
      </div>
      <el-form :model="orderData" label-width="130px" size="mini">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="域名:">
              <el-input v-model="orderData.domain" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <span>代理商TTS域名,系统自动读取。</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="用户名:">
              <el-input v-model="orderData.user"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <span>代理商自己定义的非中文的用户名。</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="密码:">
              <el-input v-model="orderData.pass"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <span>代理商自己定义的密码。</span>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item label="IP:">
              <el-input
                type="textarea"
                :rows="3"
                v-model="orderData.ips"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <span>代理商用于导出导入的服务器IP地址,多个IP时一行一个。</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <el-form-item>
              <el-button
                @click="handleRemove()"
                type="primary"
                size="mini"
              >保存
              </el-button>
              <el-button
                @click="handleRemove()"
                type="danger"
                size="mini"
              >删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="contentBox">
      <div slot="header">
        <span>去哪儿政策导入接口</span>
      </div>
      <el-row style="margin-bottom:15px; margin-left:25px;">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-row>
      <el-table :data="policyData" size="mini" style="width: 100%;">
        <el-table-column prop="user" label="用户名称" width="200" align="center"></el-table-column>
        <el-table-column prop="ip" label="IP地址" width="200" align="center"></el-table-column>
        <el-table-column prop="callbackUrl" label="回调地址" width="200" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" width="200" align="center"></el-table-column>
        <el-table-column prop="airlineCode" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleRemove()"
              type="danger"
              size="mini"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
    export default {
        name: "config",
        data() {
            return {
                notifyData: [],
                orderData: [],
                policyData: []
            };
        }
    };
</script>
