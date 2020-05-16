<template>
  <div>
    <!-- 功能列表弹窗 -->
    <el-dialog :title="myTitle" :visible.sync="showMask" ref="my-dialog">
      <el-form
        label-width="120px"
        label-position="top"
        ref="device-form"
        :model="deviceForm"
        :rules="rules"
      >
        <el-row :gutter="30">
          <el-col :span="currentSpan">
            <el-form-item label="设备名称" prop="deviceName">
              <el-input
                v-model="deviceForm.deviceName"
                :disabled="handleType=='ADD_MANY'"
                placeholder="请输入设备名称"
              />
            </el-form-item>
          </el-col>

          <el-col :span="currentSpan">
            <el-form-item label="设备编码" prop="deviceCode">
              <el-input v-model="deviceForm.deviceCode" placeholder="请输入设备编码" />
            </el-form-item>
          </el-col>
          <!--  -->
          <el-col :span="currentSpan">
            <el-form-item label="设备Key" prop="deviceKey">
              <el-input v-model="deviceForm.deviceKey" placeholder="请输入设备Key" />
            </el-form-item>
          </el-col>
          <!--  -->
          <el-col :span="lineSpan">
            <el-divider></el-divider>
          </el-col>
          <!--  -->
          <el-col :span="currentSpan">
            <el-form-item label="客户/供应商账号" prop="accountId">
              <el-input v-model="deviceForm.accountId" placeholder="请输入客户/供应商账号" />
            </el-form-item>
          </el-col>
          <el-col :span="lineSpan">
            <el-divider></el-divider>
          </el-col>

          <el-col :span="currentSpan">
            <el-form-item label="联系人姓名" prop="contactName">
              <el-input v-model="deviceForm.contactName" placeholder="请输入联系人姓名" />
            </el-form-item>
          </el-col>

          <el-col :span="currentSpan">
            <el-form-item label="联系人电话" prop="contactPhone">
              <el-input v-model="deviceForm.contactPhone" maxlength="11" placeholder="请输入联系人电话" />
            </el-form-item>
          </el-col>
          <!--  -->
          <el-col :span="lineSpan">
            <el-divider></el-divider>
          </el-col>

          <el-col :span="currentSpan">
            <el-form-item label="企业/单位域名" prop="domain">
              <el-input v-model="deviceForm.domain" placeholder="请输入企业/单位域名" />
            </el-form-item>
          </el-col>
          <!--  -->

          <el-col :span="currentSpan">
            <el-form-item label="企业/单位名称" prop="firmName">
              <el-input v-model="deviceForm.firmName" placeholder="请输入企业/单位名称" />
            </el-form-item>
          </el-col>

          <el-col :span="currentSpan">
            <el-form-item label="企业/单位id" prop="firmId">
              <el-input v-model="deviceForm.firmId" placeholder="请输入企业/单位id" />
            </el-form-item>
          </el-col>
          <!--  -->

          <el-col :span="lineSpan">
            <el-divider></el-divider>
          </el-col>

          <el-col :span="currentSpan">
            <el-form-item label="商户(客户/供应商)姓名" prop="merchantName">
              <el-select
                v-model="deviceForm.merchantName"
                placeholder="请选择"
                @change="changeMerchantName"
              >
                <el-option
                  v-for="item in merchantOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--  -->

          <el-col :span="currentSpan">
            <el-form-item label="商户(客户/供应商)id" prop="merchantId">
              <el-input v-model="deviceForm.merchantId" disabled placeholder="请选择商户(客户/供应商)" />
            </el-form-item>
          </el-col>
          <el-col :span="lineSpan">
            <el-divider></el-divider>
          </el-col>
          <!--  -->
          <el-col :span="currentSpan">
            <el-form-item label="固件版本" prop="otaVersion">
              <el-input :min="1" v-model="deviceForm.otaVersion" placeholder="请输入固件版本" />
            </el-form-item>
          </el-col>
          <!--  -->
          <el-col :span="currentSpan">
            <el-form-item label="连接密码" prop="password">
              <el-input
                v-model="deviceForm.password"
                placeholder="请输入连接密码"
                show-password
                type="password"
              />
            </el-form-item>
          </el-col>
          <!--  -->

          <el-col :span="lineSpan">
            <el-divider></el-divider>
          </el-col>
          <el-col :span="currentSpan">
            <el-form-item label="商品名称" prop="productName">
              <el-select
                v-model="deviceForm.productName"
                placeholder="请选择"
                style="width:100%"
                @change="changeProductName"
              >
                <el-option
                  v-for="item in productOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="currentSpan">
            <el-form-item label="商品编码" prop="productCode">
              <el-input v-model="deviceForm.productCode" disabled placeholder="请选择商品" />
            </el-form-item>
          </el-col>
          <!--  -->

          <!--  -->

          <el-col :span="currentSpan">
            <el-form-item label="商品id" prop="productId">
              <el-input v-model="deviceForm.productId" disabled placeholder="请选择商品" />
            </el-form-item>
          </el-col>
          <!--  -->
          <el-col :span="lineSpan">
            <el-divider></el-divider>
          </el-col>

          <el-col :span="currentSpan">
            <el-form-item label="项目id" prop="projectId">
              <el-input v-model="deviceForm.projectId" placeholder="请输入项目id" />
            </el-form-item>
          </el-col>
          <!--  -->

          <el-col :span="currentSpan">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="deviceForm.projectName" placeholder="请输入项目名称" />
            </el-form-item>
          </el-col>
          <el-col :span="lineSpan">
            <el-divider></el-divider>
          </el-col>
          <!--  -->

          <el-col :span="currentSpan">
            <el-form-item label="当前状态" prop="status">
              <el-select v-model="deviceForm.status">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--  -->

          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="deviceForm.remark" placeholder="请输入备注" type="textarea" />
            </el-form-item>
          </el-col>
          <!--  -->
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="checkForm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="addManyForm" ref="add-many">
        <el-form-item
          label="请输入设备数量"
          prop="deviceCount"
          type="number"
          :rules="[{required: true,message: '请输入设备数量',trigger:'blur'}]"
        >
          <el-input-number v-model="addManyForm.deviceCount" :min="1"></el-input-number>
        </el-form-item>

        <el-form-item
          label="设备名称"
          prop="deviceName"
          :rules="[{required: true,message: '请输入设备名称',trigger:'blur'}]"
        >
          <el-input v-model="addManyForm.deviceName" placeholder="请输入设备名称" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toAddDeviceList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const ADD = "ADD";
const EDIT = "EDIT";
const ADD_MANY = "ADD_MANY";

import { rules, defaultDeviceForm } from "./rules";
export default {
  data() {
    return {
      showMask: false,
      dialogVisible: false,
      handleType: ADD,
      addManyForm: {
        deviceCount: 0,
        deviceName: ""
      },
      deviceForm: {
        deviceName: "", //*	string //设备名称
        deviceCode: "", //*	string //设备编码
        deviceKey: "", //*	string //设备Key
        accountId: "", //*	string客户/供应商账号
        // activateDate: "", //*	integer($int64) //激活时间
        // addDate: "", //*	integer($int64) //添加时间
        contactId: "", //*	string //联系人ID
        contactName: "", //*	string //
        contactPhone: "", //*	string //联系人电话
        // deviceId: "", //*	string //设备Id
        domain: "", //*	string //企业/单位域名
        firmId: "", //*	string //企业/单位
        firmName: "", //*	string //企业/单位名称
        // ip: "", //*	string //IP地址
        // lastOnlineTime: "", //*	integer($int64) //最后上线时间
        merchantId: "", //*	string //商户(客户/供应商)
        merchantName: "", //*	string //商户(客户/供应商)名称
        otaVersion: "", //*	string //固件版本
        password: "", //*	string //连接密码
        productCode: "", //*	string //商品编码
        productId: "", //*	string //商品ID
        productName: "", //*	string //商品名称
        projectId: "", //*	string //项目
        projectName: "", //*	string //项目名称
        remark: "", //	string //备注
        // sort: "", //	integer($int32) //排序号
        status: 0 //*	integer($int32) //当前状态
      },
       rules,
      // 默认的设备配置
      // deviceForm: defaultDeviceForm,
      merchantOptions: [
        {
          value: "商户1",
          id: "10086"
        },
        {
          value: "商户2",
          id: "123"
        }
      ],
      productOptions: [
        {
          value: "冰箱",
          id: "1999",
          code: "bx"
        },
        {
          value: "汽车",
          id: "2000",
          code: "qc"
        }
      ],
      statusOptions: [{ value: 0 }, { value: 1 }, { value: 2 }],
      winWidth: 0,
   
    };
  },
  methods: {
    // 复制对象
    copyObject(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    // 新增设备
    async addDevice() {
      this.showMask = true;
      this.handleType = ADD;
      await this.$nextTick();
      this.$refs["device-form"].resetFields();
    },
    // 批量新增设备
    addManyDevice() {
      this.handleType = ADD_MANY;
      this.dialogVisible = true;
    },
    // 编辑操作
    handleEdit(data) {
      this.handleType = EDIT;
      const formData = this.copyObject(data);
      formData.status = Number(formData.status);
      this.deviceForm = formData;
      this.showMask = true;
    },
    // 表单验证
    checkForm() {
      const formData = this.copyObject(this.deviceForm);
      formData.status = Number(formData.status);
      // 根据 handleType 匹配操作
      this.$refs["device-form"].validate(result => {
        if (!result) return;
        switch (this.handleType) {
          case ADD:
            this.$store.dispatch("device/addOne", formData).then(data => {
              this.handleComplete("添加成功");
            });
            break;
          case EDIT:
            this.$store.dispatch("device/editById", formData).then(data => {
              this.handleComplete("修改成功");
            });
            break;
          case ADD_MANY:
            let list = [];
            for (let count = 0; count < this.addManyForm.deviceCount; count++) {
              list.push(formData);
            }
            this.$store.dispatch("device/addMany", list).then(data => {
              this.handleComplete("添加成功");
            });
            break;
          default:
            break;
        }
      });
    },
    // 操作完成，通知列表页面
    handleComplete(message) {
      this.$message({
        message,
        type: "success"
      });
      this.showMask = false;
      this.$emit("handleComplete");
    },
    // 取消编辑
    cancelEdit() {
      this.showMask = false;
    },
    // 切换商户
    changeMerchantName(e) {
      const { id } = this.merchantOptions.find(item => item.value == e);
      this.deviceForm.merchantId = id;
    },
    // 切换产品
    changeProductName(e) {
      const { id, code } = this.productOptions.find(item => item.value == e);
      this.deviceForm.productCode = code;
      this.deviceForm.productId = id;
    },
    // 批量添加
    toAddDeviceList(data) {
      this.$refs["add-many"].validate(result => {
        if (result) {
          this.deviceForm.deviceName = this.addManyForm.deviceName;
          this.dialogVisible = false;
          this.showMask = true;
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    }
  },
  components: {},
  computed: {
    // 当前title
    myTitle() {
      return this.handleType == "ADD" ? "新增设备" : "修改设备";
    },
      // 自适应匹配
    currentSpan() {
      return this.winWidth < 1200 ? 24 : this.winWidth > 1400 ? 8 : 11;
    },
    lineSpan() {
      return this.currentSpan == 11 ? 22 : 24;
    }
  },
  created() {
    this.winWidth = document.documentElement.clientWidth;
    window.addEventListener("resize", () => {
      this.winWidth = document.documentElement.clientWidth;
    });
  },
};
</script>
