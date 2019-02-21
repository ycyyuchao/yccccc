<template>
    <div>
         <!-- <h2>Upload file</h2>
        <vue-base64-file-upload 
            class="v1"
            accept="image/png,image/jpeg"
            image-class="v1-image"
            input-class="v1-input"
            :max-size="customImageMaxSize"
            @size-exceeded="onSizeExceeded"
            @file="onFile"
            @load="onLoad" /> -->
        <Layout>
            <Sider :style="{background: '#fff',paddingRight:'10px'}">
                <div >
                    <Tree :data="tree" @on-select-change="onSelectChange"></Tree>
                </div>
            </Sider>
            <Sider :style="{background: '#fff',paddingRight:'10px'}">
                <Upload
                multiple
                type="drag"
                action="http://localhost:3000/upload/uploadFile/"
                name="avatar">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p >
                    </div>
                </Upload>
            </Sider>
            <!-- <Layout>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <Table border ref="selection" :columns="columns" :data="uploadList" @on-select="cheaked"></Table>
                     <Page :total="total" size="small" show-elevator show-sizer @on-change="onChangePage" @on-page-size-change="onPageSizeChange"/>
                </Content>
            </Layout> -->
        </Layout>
    </div>
</template>

<script>
// import VueBase64FileUpload from "vue-base64-file-upload";
// export default {
//   components: {
//     VueBase64FileUpload
//   },
//   data() {
//     return {
//       fileData:{},
//       customImageMaxSize: 3 // megabytes
//     };
//   },
//   methods: {//base64字符串的上传方式(上传图片)
//     onFile(file) {
//       console.log(file); // file object
//       this.fileData=file;
//     },

//     onLoad(dataUri) {
//       console.log(dataUri); // data-uri string
//       this.fileData.base64=dataUri;
//       console.log(this.fileData);
//       this.axios({
//           url:"",
//           method:'post',
//           data:this.fileData
//       })
//     },

//     onSizeExceeded(size) {
//       alert(
//         `Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`
//       );
//     }
//   }
// };
import { Base } from "../base/Base.js";
export default {
  mixins: [Base],
  data() {
    return {
      tree: [],
      module: "upload",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "Fieldname",
          key: "fieldname"
        },
        {
          title: "Originalname",
          key: "originalname"
        },
        {
          title: "Encoding",
          key: "encoding"
        },
        {
          title: "Mimetype",
          key: "mimetype"
        },
        {
          title: "Destination",
          key: "destination"
        },
        {
          title: "Filename",
          key: "filename"
        },
        {
          title: "Path",
          key: "path"
        },
        {
          title: "Size",
          key: "size"
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
    };
  },
  methods: {
    getData() {
      this.axios({
        url: `${this.GLOBAL.cmsurl}/cate/list/4`,
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
        url: `${this.GLOBAL.cmsurl}/upload/list`,
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
  },
  mounted() {
      this.getData()
  },
};
</script>

