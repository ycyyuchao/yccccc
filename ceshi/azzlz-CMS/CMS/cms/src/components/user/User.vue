<template>
<div> 
    <h2 style="margin-bottom:15px">用户管理</h2>
    <Input search enter-button="Search" placeholder="请输入名字" style="margin-bottom:15px" @on-search="search" v-model="keywords"/>
    <div style="margin-bottom:15px">
       <Button type="info" @click="dataModal=true">添加</Button>
       <Button type="error" @click="removes">批量删除</Button> 
    </div>
    
    <Table border ref="selection" :columns="columns7" :data="List" style='margin-bottom:30p' 
    @on-select="onSelect" @on-select-cancel="handleSelectionChange" 
    @on-select-all="handleSelectionChange" @on-select-all-cancel="handleSelectionChange" >
    </Table>
    <Page :total="total" size="small" show-elevator show-sizer @on-change='onChangePage' @on-page-size-change='onPageSizeChange'/>
    <Modal
        title="数据处理"
        v-model="dataModal"
        :mask-closable="false"
        @on-ok='ok'
        @on-cancel='cancel'
        footer-hide>

        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name" ></Input>
        </FormItem>
        <FormItem label="年龄" prop="age">
            <Input v-model="formValidate.age" placeholder="Enter your age" number></Input>
        </FormItem>
        <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formValidate.sex">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="日期" prop="date">
            <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
        </FormItem>
        <FormItem label="邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="地址" prop="address">
            <Input v-model="formValidate.address" placeholder="Enter your address"></Input>
        </FormItem>
        <FormItem label="号码" prop="phone">
            <Input v-model="formValidate.phone" placeholder="Enter your address" number></Input>
        </FormItem>
         <FormItem label="爱好" prop="hobby">
            <CheckboxGroup v-model="formValidate.hobby">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="城市" prop="city">
            <Select v-model="formValidate.city" placeholder="Select your city">
              <Option v-for="item in citylist" :value="item.cityname" :key="item.cityId"> 
                {{item.cityname}}
              </Option>
            </Select>
        </FormItem>
        <FormItem label="简介" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    </Modal>
</div>
</template>
<script>
import { Base } from "../base/base.js";
export default {
  mixins: [Base],
  data() {
    return {
      module:"user",
      citylist: [
        { cityId: "1", cityname: "北京" },
        { cityId: "2", cityname: "上海" },
        { cityId: "3", cityname: "杭州" },
        { cityId: "4", cityname: "深圳" },
        { cityId: "5", cityname: "湖南" },
        { cityId: "6", cityname: "成都" },
        { cityId: "7", cityname: "重庆" },
        { cityId: "8", cityname: "武汉" },
        { cityId: "9", cityname: "南昌" },
        { cityId: "10", cityname: "广州" }
      ],
      columns7: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "性别",
          key: "sex"
        },
        {
          title: "注册日期",
          key: "date"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "电话号码",
          key: "phone"
        },
        {
          title: "爱好",
          key: "hobby"
        },
        {
          title: "城市",
          key: "city"
        },
        {
          title: "个人简介",
          key: "desc"
        },
        {
          title: "操作",
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
        _id: "",
        name: "",
        age: 0,
        sex: "",
        date: "",
        email: "",
        address: "",
        phone: "",
        hobby: [],
        city: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "Please select the address",
            trigger: "change"
          }
        ],
        sex: [
          {
            required: true,
            message: "Please select gender",
            trigger: "change"
          }
        ],
        hobby: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ],
        age: [
          {
            required: true,
            message: "Please enter your age",
            trigger: "blur",
            type: "number"
          }
        ],
        phone: [
          {
            required: true,
            message: "Please enter your phoneNumber",
            trigger: "blur",
            type: "number"
          }
        ]
      },
      selection:[]
    };
  },
  methods:{
     onSelect(selection,row){
      console.log(row._id);
      this.selection.push(row._id);
      console.log(this.selection)
    }
  }
};
</script>
