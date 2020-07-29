<template>
  <el-row>
    <el-col :span="24">
      <el-table
        :data="list"
        border
        size="mini"
        @selection-change="handleSelectionChange"
        :max-height="tableHeight"
        v-bind="$attrs"
      >
        <template v-for="(column, index) in columns">
          <slot name="front-slot"></slot>
          <el-table-column
            :key="index"
            v-if="column.type === 'selection'"
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column
            :key="index"
            v-else-if="column.type === 'index'"
            type="index"
            width="50"
            label="序号"
          ></el-table-column>
          <el-table-column
            :key="index"
            v-else
            align="left"
            :label="column.title"
            :width="column.width"
          >
            <template slot-scope="scope">
              <label v-if="!column.hidden">
                <label v-if="column.type === 'operate'">
                  <a
                    href="javascript:void(0)"
                    class="operate-button"
                    v-for="(operate, index) in column.operates"
                    :key="index"
                    @click="handleClick(operate, scope.row)"
                  >
                    {{operate.name}}
                    &nbsp;&nbsp;
                  </a>
                </label>
                <span v-else>{{scope.row[column.key]}}</span>
              </label>
              <label v-if="column.slot">
                <slot v-if="column.slot" :name="column.slot" :scope="scope"></slot>
              </label>
            </template>
          </el-table-column>
        </template>
        <slot />
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "base-table",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      tableHeight: xxx
    };
  },
  methods: {
    // 处理点击事件
    handleClick(action, data) {
      // emit事件
      this.$emit(`${action.emitKey}`, data);
    }
  }
};
</script>
