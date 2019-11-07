<template>
  <a-table :columns="recipeColumns" :dataSource="recipeData" bordered>
    <template slot="medicinename" slot-scope="text, record">
      <div>
        <a-auto-complete
          :dataSource="nameDs"
          @select="onSelectName(nameDs[0], record.key)"
          @search="onSearchName"
        />
      </div>
    </template>
    <template
      v-for="col in [
        // 'medicinename',
        'brandname',
        'sellpackage',
        'dosageform',
        'dosesiz',
        'frequency',
        'medicinecnt',
        'money',
        'allmoney'
      ]"
      :slot="col"
      slot-scope="text, record"
    >
      <div :key="col">
        <a-input
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
      </div>
    </template>
  </a-table>
</template>

<script>
const recipeColumns = [
  // {
  //   title: "id",
  //   dataIndex: "id"
  // },
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

const defaultRecipe = {
  key: "10",
  medicinename: "",
  brandname: "",
  sellpackage: "",
  dosageform: "",
  dosesiz: "",
  frequency: "",
  medicinecnt: "",
  money: "",
  allmoney: ""
};

const recipeList = [
  {
    key: "10",
    medicinename: "999感冒灵颗粒",
    brandname: "华润三九医药股份有限公司",
    sellpackage: "10袋",
    dosageform: "粉剂",
    dosesiz: "一次1袋",
    frequency: "一日3次",
    medicinecnt: 1,
    money: "10",
    allmoney: "10"
  },
  {
    key: "1",
    medicinename: "急支糖浆",
    brandname: "华润三九医药股份有限公司",
    sellpackage: "200ML",
    dosageform: "糖浆剂",
    dosesiz: "一次20～30ml",
    frequency: "一日3～4次",
    medicinecnt: 1,
    money: "29",
    allmoney: "29"
  }
];

export default {
  name: "recipe-table",
  data() {
    return {
      recipeColumns,
      recipeData: [defaultRecipe],
      nameDs: []
    };
  },
  methods: {
    onSelectName(name, key) {
      const recipe = recipeList.filter(item => {
        return (
          item.medicinename.indexOf(name) > -1 &&
          this.nameDs.indexOf(item.medicinename) < 0
        );
      })[0];
      const newData = [...this.recipeData];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target["medicinename"] = recipe.medicinename;
        target["brandname"] = recipe.brandname;
        this.recipeData = newData;
      }
    },
    onSearchName(name) {
      if (name) {
        const recipes = recipeList.filter(item => {
          return (
            item.medicinename.indexOf(name) > -1 &&
            this.nameDs.indexOf(item.medicinename) < 0
          );
        });
        if (recipes.length > 0) {
          recipes.map(item => {
            this.nameDs.push(item.medicinename);
          });
        }
      } else {
        this.nameDs = [];
      }
    },
    handleChange(value, key, column) {
      const newData = [...this.recipeData];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.recipeData = newData;
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
