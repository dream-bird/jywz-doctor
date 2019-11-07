<template>
  <div class="check-table">
    <!-- actions -->
    <div class="actions">
      <a-button class="action" type="primary" @click="onDrawerVisible"
        >新建
      </a-button>
      <a-button class="action" type="danger" @click="onDeleteTableData"
        >删除
      </a-button>
      <a-button class="action" @click="onCompleted">保存</a-button>
    </div>
    <!-- form -->
    <a-drawer
      title="开检查"
      :width="400"
      placement="right"
      :closable="false"
      :visible="drawerVisible"
    >
      <a-form :form="form" @submit="onFormSubmit">
        <a-form-item label="项目名称">
          <a-auto-complete
            :dataSource="autoInputDataSource"
            @select="onAutoInputSelected"
            @search="onAutoInputSearch"
            v-decorator="[
              'description',
              { rules: [{ required: true, message: '请输入项目名称' }] }
            ]"
          />
        </a-form-item>
        <a-form-item label="科室">
          <a-input
            v-decorator="[
              'department',
              {
                rules: [{ required: true, message: '请输入科室' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="费用">
          <a-input-number
            style="width: 100%;"
            :min="0"
            :max="1000"
            v-decorator="[
              'money',
              {
                rules: [
                  { type: 'number', required: true, message: '请输入药品价格' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            确定
          </a-button>
          <a-button
            type="primary"
            style="margin-left: 10px;"
            @click="onDrawerInvisible"
          >
            取消
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
    <!-- table -->
    <a-table
      :columns="tableColumns"
      :dataSource="tableData"
      :pagination="false"
      :rowKey="record => record.diagnosecode"
      bordered
      size="small"
      :locale="{ emptyText: '暂无检查' }"
      :rowSelection="{
        selectedRowKeys: tableSelectedRowKeys,
        onChange: onTableSelectedChange
      }"
    >
      <template slot="money" slot-scope="text">
        ￥{{ text }}
      </template>
    </a-table>
    <div class="amount">
      合计：<span style="color: red;">￥{{ amount }}</span>
    </div>
  </div>
</template>

<script>
const tableColumns = [
  {
    title: "项目名称",
    dataIndex: "description",
    scopedSlots: { customRender: "description" }
  },
  {
    title: "科室",
    dataIndex: "department",
    scopedSlots: { customRender: "department" }
  },
  {
    title: "费用",
    dataIndex: "money",
    scopedSlots: { customRender: "money" }
  }
];

const _tableData = [
  {
    description: "血常规01",
    diagnosecode: "01",
    department: "化验室",
    money: 56
  },
  {
    description: "胸部正位透视02",
    diagnosecode: "02",
    department: "透视室",
    money: 188
  }
];

export default {
  name: "check-table",
  data() {
    return {
      // table
      tableColumns,
      tableData: [],
      tableSelectedRowKeys: [],
      // drawer
      drawerVisible: false,
      // form
      form: this.$form.createForm(this),
      // auto input
      autoInputDataSource: [],
      // other
      amount: 0
    };
  },
  watch: {
    tableData(newVal) {
      let amount = 0;
      newVal.map(item => {
        amount = amount + item.money;
      });
      this.amount = amount;
    }
  },
  methods: {
    // form
    onFormSubmit(event) {
      event.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values["diagnosecode"] = new Date().getTime();
          this.tableData.push(values);
          this.onDrawerInvisible();
          this.form.resetFields();
        }
      });
    },
    // auto input
    onAutoInputSelected(val) {
      const data = _tableData.filter(item => {
        return item.description.indexOf(val) > -1;
      })[0];
      this.form.setFieldsValue({
        department: data.department,
        money: data.money
      });
    },
    onAutoInputSearch(val) {
      this.autoInputDataSource = [];
      if (val) {
        const recipes = _tableData.filter(item => {
          return (
            item.description.indexOf(val) > -1 &&
            this.autoInputDataSource.indexOf(item.description) < 0
          );
        });
        recipes.map(item => {
          this.autoInputDataSource.push(item.description);
        });
      } else {
        this.autoInputDataSource = [];
      }
    },
    // drawer
    onDrawerVisible() {
      this.drawerVisible = true;
    },
    onDrawerInvisible() {
      this.drawerVisible = false;
    },
    // table
    onTableSelectedChange(tableSelectedRowKeys) {
      this.tableSelectedRowKeys = tableSelectedRowKeys;
    },
    onDeleteTableData() {
      this.tableData = this.tableData.filter(item => {
        return this.tableSelectedRowKeys.indexOf(item.diagnosecode) < 0;
      });
      this.tableSelectedRowKeys = [];
    },
    // component
    onCompleted() {
      this.$emit("onCompleted", this.tableData);
    }
  }
};
</script>

<style lang="less" scoped>
.actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  .action {
    margin: 0 5px 15px;
  }
}

.amount {
  text-align: right;
  margin: 15px;
  font-size: 16px;
  font-weight: 400;
  /*color: rgba(255, 91, 91, 1);*/
  color: rgba(0, 0, 0, 0.65);
  line-height: 21px;
}
</style>
