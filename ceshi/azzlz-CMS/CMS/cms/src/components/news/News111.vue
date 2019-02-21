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
      <FormItem label="Title" prop="title">
              <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
          </FormItem>
          <FormItem label="Date" prop="date">
              <Input v-model="formValidate.date" placeholder="Enter your date"></Input>
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
      module: "news",
      columns: [
        {
          title: "Title",
          key: "title"
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
                      //console.log(params)
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
      formValidate: {
        id: "",
        title: "",
        date: 0,
        content: ""
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "The title cannot be empty",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "The date cannot be empty",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "The content cannot be empty",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    //在mounted里加载
    this.getList();
  }
};
</script>


