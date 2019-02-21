<template>
<div>
    <Input search enter-button placeholder="请输入标题..." @on-search="search" v-model="keywords" style="margin-bottom:10px"/>
    
    <Button type="primary" @click="dataModal = true">添加</Button>
    <Button type="error" @click="removes">批量删除</Button>
    <Button type="success" @click="checkData">批量通过</Button>
    <Button type="success" @click="uncheckData">批量不通过</Button>
   
    <Table border :columns="columns7" :data="list"  style="margin-top:10px"
     @on-select="handleSelectionChange" @on-select-cancel="handleSelectionChange" 
    @on-select-all="handleSelectionChange" @on-select-all-cancel="handleSelectionChange"></Table>
    <Page :total="total" show-elevator @on-change="onChangePage" @on-page-size-change="onPageSizeChange" style="margin-top:10px"/>

    <Modal
        v-model="dataModal"
        title="数据处理"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="id" prop="id">
            <Input v-model="formValidate.id" placeholder="Enter your id"></Input>
        </FormItem>
        
        <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
        </FormItem>
        
        <FormItem label="内容" prop="content">
            <Input v-model="formValidate.content" placeholder="Enter your content"></Input>
        </FormItem>
       


        <FormItem label="发布时间" prop="time">
            <DatePicker type="date" placeholder="Select date" v-model="formValidate.time" style="width:410px"></DatePicker>
        </FormItem>
       

        <FormItem label="审核状态" prop="status">
            <Input v-model="formValidate.status" placeholder="Enter your status"></Input>
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
import moment from "../../../moment";
import { Base } from "../base/BaseComment.js";
export default {
  mixins: [Base],
  data() {
    return {
      formValidate: {
        id: "",
        title: "",
        content: "",
        //date: '',
        time: "",
        status: "未审核",
        module: "comment",
        cheakeds: []
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "The firstName cannot be empty",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "The lastName cannot be empty",
            trigger: "blur"
          }
        ],

        time: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        status: [
          /* { required: true, message: 'The word cannot be empty', trigger: 'blur' } */
        ]
      },
      columns7: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "发布时间",
          key: "time"
        },
        {
          title: "审核状态",
          key: "status"
        },
        {
          title: "用户操作",
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
                      console.log("---" + params);
                      console.log("---" + params.row._id);
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
                      console.log("-------------" + params);
                      console.log("-------------" + params.row._id);
                      this.remove(params.row._id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    handleReset(title) {
      this.$refs[title].resetFields();
    },
    
  },
  mounted() {
    this.getList();
  }
};
</script>

