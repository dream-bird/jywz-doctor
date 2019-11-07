<template>
  <div class="recipe-table-2">
    <!-- actions -->
    <div class="actions">
      <a-button class="action" type="primary" @click="onDrawerVisible"
        >新建</a-button
      >
      <a-button class="action" type="danger" @click="onDeleteTableData"
        >删除</a-button
      >
      <a-button class="action" @click="onCompleted">保存</a-button>
    </div>
    <!-- form -->
    <a-drawer
      title="开处方"
      :width="400"
      placement="right"
      :closable="false"
      :visible="drawerVisible"
    >
      <a-form :form="form" @submit="onFormSubmit">
        <a-form-item label="药品名称">
          <a-auto-complete
            :dataSource="autoInputDataSource"
            @select="onAutoInputSelected"
            @search="onAutoInputSearch"
            v-decorator="[
              'medicinename',
              { rules: [{ required: true, message: '请输入药品名称' }] }
            ]"
          />
        </a-form-item>
        <a-form-item label="品牌">
          <a-input
            v-decorator="[
              'brandname',
              {
                rules: [{ required: true, message: '请输入品牌' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="出库包装">
          <a-input
            v-decorator="[
              'sellpackage',
              {
                rules: [{ required: true, message: '请输入出库包装' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="药品剂型">
          <a-input
            v-decorator="[
              'dosageform',
              {
                rules: [{ required: true, message: '请输入药品剂型' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="剂量/次">
          <a-input
            v-decorator="[
              'dosesiz',
              {
                rules: [{ required: true, message: '请输入剂量/次' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="使用频次">
          <a-input
            v-decorator="[
              'frequency',
              {
                rules: [{ required: true, message: '请输入单次使用频次' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="药品数量">
          <a-input-number
            style="width: 100%;"
            :min="1"
            :max="10"
            v-decorator="[
              'medicinecnt',
              {
                rules: [
                  { type: 'number', required: true, message: '请输入药品数量' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="药品价格">
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
      bordered
      size="small"
      :locale="{ emptyText: '暂无处方' }"
      :rowSelection="{
        selectedRowKeys: tableSelectedRowKeys,
        onChange: onTableSelectedChange
      }"
    >
      <template slot="money" slot-scope="text">
        ￥{{ text }}
      </template>
      <template slot="allmoney" slot-scope="text">
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
    title: "药品名称",
    dataIndex: "medicinename",
    scopedSlots: { customRender: "medicinename" }
  },
  {
    title: "品牌",
    dataIndex: "brandname",
    scopedSlots: { customRender: "brandname" }
  },
  {
    title: "出库包装",
    dataIndex: "sellpackage",
    scopedSlots: { customRender: "sellpackage" }
  },
  {
    title: "药品剂型",
    dataIndex: "dosageform",
    scopedSlots: { customRender: "dosageform" }
  },
  {
    title: "剂量/次",
    dataIndex: "dosesiz",
    scopedSlots: { customRender: "dosesiz" }
  },
  {
    title: "使用频次",
    dataIndex: "frequency",
    scopedSlots: { customRender: "frequency" }
  },
  // {
  //   title: "药品规格",
  //   dataIndex: "medicinesize"
  // },
  // {
  //   title: "备注信息",
  //   dataIndex: "remark"
  // },
  {
    title: "药品数量",
    dataIndex: "medicinecnt",
    scopedSlots: { customRender: "medicinecnt" }
  },
  {
    title: "药品价格",
    dataIndex: "money",
    scopedSlots: { customRender: "money" }
  },
  {
    title: "费用小计",
    dataIndex: "allmoney",
    scopedSlots: { customRender: "allmoney" }
  }
  // {
  //   title: "operation",
  //   dataIndex: "operation",
  //   scopedSlots: { customRender: "operation" }
  // }
];

const _tableData = [
  {
    medicinename: "999感冒灵颗粒",
    brandname: "华润三九医药股份有限公司",
    sellpackage: "10袋",
    dosageform: "粉剂",
    dosesiz: "一次1袋",
    frequency: "一日3次",
    medicinecnt: 1,
    money: 10,
    allmoney: ""
  },
  {
    medicinename: "急支糖浆",
    brandname: "华润三九医药股份有限公司",
    sellpackage: "200ML",
    dosageform: "糖浆剂",
    dosesiz: "一次20～30ml",
    frequency: "一日3～4次",
    medicinecnt: 1,
    money: 29,
    allmoney: ""
  }
];

export default {
  name: "recipe-table-2",
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
        amount = amount + item.allmoney;
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
          values["key"] = new Date().getTime();
          values["allmoney"] = values.medicinecnt * values.money;
          this.tableData.push(values);
          this.onDrawerInvisible();
          this.form.resetFields();
        }
      });
    },
    // auto input
    onAutoInputSelected(val) {
      const data = _tableData.filter(item => {
        return item.medicinename.indexOf(val) > -1;
      })[0];
      this.form.setFieldsValue({
        brandname: data.brandname,
        sellpackage: data.sellpackage,
        dosageform: data.dosageform,
        dosesiz: data.dosesiz,
        frequency: data.frequency,
        medicinecnt: data.medicinecnt,
        money: data.money
      });
    },
    onAutoInputSearch(val) {
      this.autoInputDataSource = [];
      if (val) {
        const recipes = _tableData.filter(item => {
          return (
            item.medicinename.indexOf(val) > -1 &&
            this.autoInputDataSource.indexOf(item.medicinename) < 0
          );
        });
        recipes.map(item => {
          this.autoInputDataSource.push(item.medicinename);
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
        return this.tableSelectedRowKeys.indexOf(item.key) < 0;
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
