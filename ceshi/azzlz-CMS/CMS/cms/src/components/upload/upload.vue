<template>
    <div>
         <h2 style="margin-bottom:15px">上传管理</h2>        
        <Layout>
            <Sider :style="{background: '#fff',paddingRight:'10px'}">
                <div >
                    <Tree :data="treeData" @on-select-change="getTree"></Tree>
                </div>
            </Sider>
            <Sider :style="{background: '#fff',paddingRight:'10px'}">
                <Upload
                multiple
                type="drag"
                :data="uploadData"
                @click="uploadfile"
                action="http://localhost:3000/upload/uploadFile/"
                name="avatar">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>Click or drag files here to upload</p>
                </div>
            </Upload>
            </Sider>
            <Layout>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <Table border ref="selection" :columns="columns" :data="uploadList" @on-select="cheaked"></Table>
                    <Page :total="total" size="small" show-elevator show-sizer @on-change="onChangePage" @on-page-size-change="onPageSize"/>
                </Content>
            </Layout>
        </Layout>

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
      uploadList: [],
      module: "upload",
      belong: "",
      nodeid: "",
      uploadData: {},
      cheakeds: [],

      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "fieldname",
          key: "fieldname"
        },
        {
          title: "original",
          key: "originalname"
        },
        {
          title: "encoding",
          key: "encoding"
        },
        {
          title: "filename",
          key: "filename"
        },
        {
          title: "path",
          key: "path"
        },
        {
          title: "size",
          key: "size"
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      console.log(params);
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
      console.log(node);
      if (node != "") {
        this.belong = node[0].path + "," + node[0]._id;
        this.nodeid = node[0]._id;

        this.axios({
          url: `${this.GLOBAL.cmsurl}/upload/list`,
          method: "post",
          data: {
            id: this.nodeid
          }
        }).then(res => {
          //console.log('ok');
          //console.log(res);
          //console.log(res)
          this.uploadList = res.data.rows;
          this.total = res.data.total;
        });
        this.uploadData = {
          belong: this.belong
        };
      }
    },
    cheaked(selection, row) {
      console.log(row._id);
      this.cheakeds.push(row._id);
      console.log(this.cheakeds);
    },
    uploadfile() {
      this.axios({
        url: `${this.GLOBAL.cmsurl}/upload/uploadFile`,
        method: "post",
        data: {
          belong: this.uploadData
        }
      })
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

