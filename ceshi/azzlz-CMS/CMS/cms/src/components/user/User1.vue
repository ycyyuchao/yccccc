<template>
<div>
	<Input search enter-button placeholder="Enter something..." @on-search="search" v-model="keywords"/>
	<Button type="primary" @click="dataModal = true">添加</Button>
    <Button type="error">批量删除</Button>
	<Table border :columns="columns" :data="List"></Table>
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
		    <FormItem label="Name" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="Age" prop="age">
            <Input v-model="formValidate.age" placeholder="Enter your age"></Input>
        </FormItem>
        <FormItem label="Phone" prop="phone">
            <Input v-model="formValidate.phone" placeholder="Enter your phone"></Input>
        </FormItem>
        <FormItem label="Email" prop="email">
            <Input v-model="formValidate.email" placeholder="Enter your email"></Input>
        </FormItem>
		    <FormItem label="Address" prop="address">
            <Input v-model="formValidate.address" placeholder="Enter your address"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
    </Modal>
	
</div>
</template>

<script>
import { Base } from "../base/Base.js";
export default {
  mixins: [Base],
  data() {
    return {
      columns: [
        {
          title: "Name",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Phone",
          key: "phone"
        },
        {
          title: "Email",
          key: "email"
        },
        {
          title: "Address",
          key: "address"
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
                      this.edit(params.row.id);
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
                      console.log(params)
                      this.remove(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      //   List: [],
      //   page: 1,
      //   limit: 10,
      //   total: 0,
      //   keywords: "",
      //   dataModal: false,
      formValidate: {
        id: "",
        name: "",
        age: 0,
        phone:'',
        email:'',
        address: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        age: [
          {
            required: true,
            message: "The age cannot be zero",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "The phone cannot be empty",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "The email cannot be empty",
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
      }
    };
  },
  //   methods: {
  //     edit(id) {
  //       this.axios({
  //         url: `http://localhost:3000/people/${id}`,
  //         method: "get"
  //       }).then(res => {
  //         this.formValidate = res.data;
  //         this.dataModal = true;
  //       });
  //     },
  //     remove(id) {
  //       this.$Modal.confirm({
  //         title: "确认删除",
  //         content: "<p>你确认删除该条数据</p>",
  //         onOk: () => {
  //           this.axios({
  //             url: `http://localhost:3000/people/${id}`,
  //             method: "delete"
  //           }).then(res => {
  //             //console.log(res);
  //             this.getList();
  //           });
  //         }
  //       });
  //     },
  //     getList() {
  //       this.axios({
  //         url: `http://localhost:3000/people/?_page=${this.page}&_limit=${
  //           this.limit
  //         }&name_like=${this.keywords}`,
  //         methods: "get"
  //       }).then(res => {
  //         // console.log(res.data);
  //         // console.log(res.headers);
  //         // console.log(res.headers["x-total-count"]);
  //         this.List = res.data;
  //         this.total = +res.headers["x-total-count"];
  //       });
  //     },
  //     onChangePage(page) {
  //       //console.log(page);
  //       this.page = page;
  //       this.getList();
  //     },
  //     onPageSizeChange(pageSize) {
  //       //console.log(pageSize);
  //       this.limit = pageSize;
  //       this.getList();
  //     },
  //     search() {
  //       console.log(this.keywords);
  //       this.getList();
  //     },
  //     ok() {
  //       this.$Message.info("Clicked ok");
  //     },
  //     cancel() {
  //       this.$Message.info("Clicked cancel");
  //     },
  //     handleSubmit(name) {
  //       this.$refs[name].validate(valid => {
  //         if (valid) {
  //           if (this.formValidate.id >= 0) {
  //             //console.log(this.formValidate);
  //             this.axios({
  //               url: `http://localhost:3000/people/${this.formValidate.id}`,
  //               method: "put",
  //               data: this.formValidate
  //             }).then(res => {
  //               console.log(res);
  //               this.dataModal = false;
  //               this.getList();
  //               this.$Message.success("Success!");
  //             });
  //           }else{
  // 			 this.axios({
  //               url: "http://localhost:3000/people",
  //               method: "post",
  //               data: this.formValidate
  //             }).then(res => {
  //               console.log(res);
  //               this.dataModal = false;
  //               this.getList();
  //               this.$Message.success("Success!");
  //             });
  // 		  }
  //         } else {
  //           this.$Message.error("Fail!");
  //         }
  //       });
  //     },
  //     handleReset(name) {
  //       this.$refs[name].resetFields();
  //     }
  //   },
  mounted() {
    //在mounted里加载
    this.getList();
  }
};
</script>

