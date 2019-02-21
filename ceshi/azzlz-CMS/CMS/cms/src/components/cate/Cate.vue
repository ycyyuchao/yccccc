<template>
    <div>
        <div :style="{paddingBottom:bottom+'px'}">
            <Modal
                v-model="dataModal"
                title="数据处理"
                @on-ok="ok"
                @on-cancel="cancel">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="title" prop="title">
                        <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                </Form>
            </Modal>
        </div>
        <Button type="info" @click="getData(1)">新闻分类</Button>
        <Button type="success" @click="getData(2)">用户分类</Button>
        <Button type="warning" @click="getData(3)">产品分类</Button>
        <Button type="error" @click="getData(4)">上传分类</Button>
        <Tree :data="tree" :render="renderContent"></Tree>
    </div>
    
</template>

<script>
export default {
  data() {
    return {
      bottom: 20,
      tree: [],
      formValidate: {
        title: "",
        id: "",
        type:"",
        parentId:""
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "The title cannot be empty",
            trigger: "blur"
          }
        ]
      },
      dataModal: false,
      bstop:false
    };
  },
  methods: {
    getData(i) {
      this.axios({
        url: `${this.GLOBAL.cmsurl}/cate/list/${i}`,
        method: "get"
      }).then(res => {
        this.tree = res.data;
      });
    },
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-paper-outline"
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-add"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.append(data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-remove"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.remove(data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-brush"
                }),
                on: {
                  click: () => {
                    this.brush(data);
                    this.bstop=true;
                  }
                }
              })
            ]
          )
        ]
      );
    },
    append(data) {
      this.id = data._id;
      this.dataModal = true;
      this.type=data.type
    },
    remove(data) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "<p>你确认删除该条数据</p>",
        onOk: () => {
          this.axios({
            url: `${this.GLOBAL.cmsurl}/cate/data/${data._id}`,
            method: "delete"
          }).then(res => {
            this.getData(data.type);
          });
        }
      });
    },
    brush(data) {
      this.dataModal = true;
      this.id=data._id;
      this.formValidate.title=data.title;
      this.type=data.type
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.bstop) {
            //brush
            this.axios({
              url: `${this.GLOBAL.cmsurl}/cate/data/${this.id}`,
              method: "put",
              data: {
                  title:this.formValidate.title,
                  type:this.type
              }
            }).then(res => {
              this.dataModal = false;
              this.getData(this.type);
              this.$Message.success("Success!");
            });
          } else {
            //add
            this.axios({
              url: `${this.GLOBAL.cmsurl}/cate/data`,
              method: "post",
              data: {
                title: this.formValidate.title,
                parentId: this.id,
                type:this.type
              }
            }).then(res => {
              this.dataModal = false;
              this.getData(this.type);
              this.$Message.success("Success!");
            });
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    }
  },
  mounted() {
    this.getData(1);
  }
};
</script>
