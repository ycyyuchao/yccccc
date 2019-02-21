<template>
    <div class="layout">
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Tree :data="tree" @on-select-change="onSelectChange"></Tree>
            </Sider>
            <Layout>
                <Content>
                    <div>
                        <Input search enter-button placeholder="Enter something..." @on-search="search" v-model="keywords"/>
                        <Button type="primary" @click="dataModal = true">添加</Button>
                        <Button type="error" @click="removes">批量删除</Button>
                        <Table border :columns="columns" :data="List" ref="selection" @on-select="onSelect"></Table>
                        <Page :total="total" size="small" show-elevator show-sizer @on-change="onChangePage" @on-page-size-change="onPageSizeChange"/>
                        <Modal
                            v-model="dataModal"
                            title="数据处理"
                            @on-ok="ok"
                            @on-cancel="cancel">
                            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                                <FormItem label="ID" prop="id">
                                    <Input v-model="formValidate.id" placeholder="Enter your id"></Input>
                                </FormItem>
                                <FormItem label="Class" prop="class">
                                    <Input v-model="formValidate.class" placeholder="Enter your class"></Input>
                                </FormItem>
                                <FormItem label="Commonprice" prop="commonprice">
                                    <Input v-model="formValidate.commonprice" placeholder="Enter your commonprice"></Input>
                                </FormItem>
                                <FormItem label="Holidayprice" prop="holidayprice">
                                    <Input v-model="formValidate.holidayprice" placeholder="Enter your holidayprice"></Input>
                                </FormItem>
                                <FormItem label="doubleoneprice" prop="doubleoneprice">
                                    <Input v-model="formValidate.doubleoneprice" placeholder="Enter your doubleoneprice"></Input>
                                </FormItem>
                                <FormItem label="doubletwoprice" prop="doubletwoprice">
                                    <Input v-model="formValidate.doubletwoprice" placeholder="Enter your doubletwoprice"></Input>
                                </FormItem>
                                <FormItem label="Phopinfo" prop="phopinfo">
                                    <Input v-model="formValidate.phopinfo" placeholder="Enter your phopinfo"></Input>
                                </FormItem>
                                <FormItem label="Address" prop="address">
                                    <Input v-model="formValidate.address" placeholder="Enter your address"></Input>
                                </FormItem>
                                <FormItem label="Date">
                                    <Row>
                                        <Col span="11">
                                            <FormItem prop="date">
                                                <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import { Base } from "../base/Base.js";
export default {
  mixins: [Base],
  data() {
    return {
      module: "product",
      tree: [],
      nodeid: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "Class",
          key: "class"
        },
        {
          title: "Commonprice",
          key: "commonprice"
        },
        {
          title: "Holidayprice",
          key: "holidayprice"
        },
        {
          title: "Doubleoneprice",
          key: "doubleoneprice"
        },
        {
          title: "Doubletwoprice",
          key: "doubletwoprice"
        },
        {
          title: "Phopinfo",
          key: "phopinfo"
        },
        {
          title: "Address",
          key: "address"
        },
        {
          title: "Date",
          key: "date"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      console.log(params);
                      this.edit(params.row._id);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row._id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      formValidate: {
        id: "",
        class: "",
        commonprice: 0,
        holidayprice: 0,
        doubleoneprice: 0,
        doubletwoprice: 0,
        phopinfo: "",
        address: "",
        date: ""
      },
      ruleValidate: {
        class: [
          {
            required: true,
            message: "The class cannot be empty",
            trigger: "blur"
          }
        ],
        commonprice: [
          {
            required: true,
            message: "The commonprice cannot be empty",
            trigger: "blur"
          }
        ],
        holidayprice: [
          {
            required: true,
            message: "The holidayprice cannot be empty",
            trigger: "blur"
          }
        ],
        doubleoneprice: [
          {
            required: true,
            message: "The doubleoneprice cannot be empty",
            trigger: "blur"
          }
        ],
        doubletwoprice: [
          {
            required: true,
            message: "The doubletwoprice cannot be empty",
            trigger: "blur"
          }
        ],
        phopinfo: [
          {
            required: true,
            message: "The phopinfo cannot be empty",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "The address cannot be empty",
            trigger: "blur"
          }
        ]
      },
      List: [],
      belong: "",
      selection:[]
    };
  },
  methods: {
    getData() {
      this.axios({
        url: `${this.GLOBAL.cmsurl}/cate/list/3`,
        method: "get"
      }).then(res => {
        this.tree = res.data;
      });
    },
    onSelectChange(node) {
      //console.log(node[0]._id)
      //console.log(node[0].path);
      this.belong = node[0].path + "," + node[0]._id;
      this.nodeid = node[0]._id;
      this.axios({
        url: `${this.GLOBAL.cmsurl}/product/list`,
        method: "post",
        data: {
          id: this.nodeid
        }
      }).then(res => {
        //console.log(res)
        this.List = res.data.rows;
        this.total = res.data.total;
        for (var i in this.List) {
          this.List[i].date = this.List[i].date.moment();
        }
      });
    },
    onSelect(selection,row){
      console.log(row._id);
      this.selection.push(row._id);
      console.log(this.selection)
    }
  },
  mounted() {
    this.getData();
    this.getList();
  }
};
</script>
