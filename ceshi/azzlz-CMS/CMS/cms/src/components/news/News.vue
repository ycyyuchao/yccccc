<template>
    <div>
        <div style="float:left;width:20%">
            <Tree :data="treeData" @on-select-change="getTree"></Tree>
        </div>    
        <div style="float:left;width:78%" >
            <Input search enter-button placeholder="Enter something..." @on-search="search" v-model="keywords"/>
            <div style="padding:10px 0 10px">
                <Button type="info"  @click="datamodal = true">添加</Button>
                <Button type="success" @click="removes">批量删除</Button>
                <Button type="error" ><router-link to="/comment" active-class="active" style="color:#fff">评论</router-link></Button>
            </div>
            
            <Table border ref="selection" :columns="columns" :data="list" @on-select="cheaked"></Table>
            <Page :total="total" size="small" show-elevator show-sizer @on-change="onChangePage" @on-page-size-change="onPageSize"/>


            <Modal
                v-model="datamodal"
                title="数据处理"
                @on-ok="ok"
                @on-cancel="cancel">

                


                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="id" prop="id">
                        <Input v-model="formValidate.id"></Input>
                    </FormItem>
                    <FormItem label="Type" prop="type">
                        <Input v-model="formValidate.type" placeholder="Enter your type"></Input>
                    </FormItem>
                    <FormItem label="Newname" prop="newname">
                        <Input v-model="formValidate.newname" placeholder="Enter your newname"></Input>
                    </FormItem>
                    <FormItem label="Title" prop="title">
                        <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
                    </FormItem>
                    <FormItem label="City" prop="city">
                        <Input v-model="formValidate.city" placeholder="Enter your city"></Input>
                    </FormItem>
                    <FormItem label="Author" prop="author">
                        <Input v-model="formValidate.author" placeholder="Enter your author"></Input>
                    </FormItem>
                    <FormItem label="Date">
                        <Row>
                            <Col span="11">
                                <FormItem prop="newsdate">
                                    <DatePicker type="date" placeholder="Select date" v-model="formValidate.newsdate"></DatePicker>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
  
                    <FormItem label="Content" prop="content">
                        <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                </Form>


            </Modal>

        </div> 
    </div>
    
</template>
<script>
import { Base } from "@/components/base/Basenew.js";
export default {
  mixins: [Base],
  data() {
    return {
      list: [],
      treeData: [],
      module: "news",
      belong: "",
      nodeid: "",
      cheakeds:[],
      formValidate: {
        id: "",
        type: "",
        newname: "",
        title: "",
        city: "",
        author: "",
        newsdate: "",
        content: ""
      },
      ruleValidate: {
        newname: [
          {
            required: true,
            message: "The newname cannot be empty",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "The title cannot be empty",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "The city cannot be empty",
            trigger: "blur"
          }
        ],
        author: [
          {
            required: true,
            message: "The author cannot be empty",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "The address cannot be empty",
            trigger: "blur"
          }
        ],
        newsdate: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ]
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "新闻名称",
          key: "newname"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "城市",
          key: "city"
        },
        {
          title: "作者",
          key: "author"
        },
        {
          title: "时间",
          key: "newsdate"
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
                      //console.log(params)
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
    getData() {
      this.axios({
        url: `${this.GLOBAL.cmsurl}/cate/list/1`,
        method: "get"
      }).then(res => {
        this.treeData = res.data;
      });
    },
    getTree(node) {
      if (node !='') {
        this.belong = node[0].path + "," + node[0]._id;
        this.nodeid = node[0]._id;
        this.axios({
          url: `${this.GLOBAL.cmsurl}/news/list`,
          method: "post",
          data: {
            id: this.nodeid
          }
        }).then(res => {
          //console.log('ok');
          console.log(res);
          //console.log(res)
          this.list = res.data.rows;
          this.total = res.data.total;
          for (var i in this.list) {
            this.list[i].newsdate = this.list[i].newsdate.moment();
          }
        });
      }
    },
    cheaked(selection,row){
      console.log(row._id);
      this.cheakeds.push(row._id);
      console.log( this.cheakeds);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
