<template>
  <div class="page-form">
    <el-dialog :title="keyId!=''?'编辑':'添加'" :visible.sync="dialogVisible" width="30%" @open="onOpen" @close="onClose">
      <el-form ref="form" label-width="80px" size="mini">
        <el-form-item label="账户编号:" >
          <el-input placeholder="请输入账户编号" ></el-input>
        </el-form-item>
        <el-form-item label="类型:" >
          <el-select type="" placeholder="请选择账户类型" >
            <el-option > </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" >
          <el-switch style="display: block"  >
          </el-switch>
        </el-form-item>
        <el-form-item label="余额:" >
          <el-input placeholder="请输入余额" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {MIXIN_EDIT} from "@/utils/mixin";
  export default {
    mixins: [MIXIN_EDIT],
  }
</script>