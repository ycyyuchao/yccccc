export const Base = {
  data() {
    return {
      list: [],
      page: 1,
      limit: 10,
      total: 0,
      keywords: '',
      dataModal: false,
      // module:'people' 
      // module:'' ,
      removesId: [],
      _id: ''

    }
  },
  methods: {
    handleSelectionChange(val) {
      //console.log(val);
      this.removesId = val;
    },
    edit(id) {
      this.dataModal = true;
      console.log(id)
      this.axios({
        url: `${this.GLOBAL.cmsurl}/comment/data/${id}`,
        method: 'get',

      }).then(res => {
        console.log(res.data);
        this.formValidate = res.data;

      })
    },
    remove(_id) {
      this.$Modal.confirm({
        title: '确认删除',
        content: '<p>你确定删除该条记录吗？</p>',
        onOk: () => {
          this.axios({
            url: `${this.GLOBAL.cmsurl}/comment/data/${_id}`,
            method: 'delete'
          }).then(res => {
            console.log(this.formValidate.id)
            this.getList();
          })
        },
      });
    },
    removes() {
      var arr = this.removesId;
      var ids = [];
      for (let i = 0; i < arr.length; i++) {
        ids.push(arr[i]._id);
      }

      this.$Modal.confirm({
        title: '确认删除',
        content: '<p>你确定删除这些记录吗？</p>',
        onOk: () => {
          this.axios({
            url: `${this.GLOBAL.cmsurl}/comment/data/removes`,
            method: 'post',
            data: {
              ids: ids.toString()
            }
          }).then(res => {
            this.getList();
          });
          this.$Message.success('delect success!');
        },
      });
    },

    checkData() {
      var arr1 = this.removesId;
      var ids = [];
      for (let i = 0; i < arr1.length; i++) {
        ids.push(arr1[i]._id);
      }
      this.$Modal.confirm({
        title: '确认审核',
        content: '<p>你确定审核这些记录吗？</p>',
        onOk: () => {
          this.axios({
            url: `${this.GLOBAL.cmsurl}/comment/data/updates`,
            method: 'post',
            data: {
              ids: ids.toString()
            }
          }).then(res => {
            console.log(ids);
            this.getList();
          });
          this.$Message.success('success!');
        },
      });
    },

    uncheckData() {
      var arr1 = this.removesId;
      var ids = [];
      for (let i = 0; i < arr1.length; i++) {
        ids.push(arr1[i]._id);
      }

      this.$Modal.confirm({
        title: '确认审核',
        content: '<p>你确定审核这些记录吗？</p>',
        onOk: () => {
          this.axios({
            url: `${this.GLOBAL.cmsurl}/comment/data/unupdates`,
            method: 'post',
            data: {
              ids: ids.toString()
            }
          }).then(res => {
            console.log(ids);
            this.getList();
          });
          this.$Message.success('success!');
        },
      });
    },

    getList() {
      this.axios({
        // url:`${this.GLOBAL.cmsurl}/${this.module}/?_page=${this.page}&_limit=${this.limit}&firstName_like=${this.keywords}`,
        url: `${this.GLOBAL.cmsurl}/comment/list`,
        method: 'post',
        data: {
          page: this.page,
          limit: this.limit,
          title: this.keywords
        }
      }).then(res => {
        console.log(res.data.limit); //当前显示条数
        // console.log(res.headers);                
        this.list = res.data.rows;
        this.total = res.data.total;
        console.log(this.list);
        console.log(res.data.total); //总条数       
        //this.total=+res.headers['X-Total-Count'];


        //格式化时间
        for (var i in this.list) {
          //console.log(this.list[i].time); 
          console.log(this.list[i].time.moment())
          this.list[i].time = this.list[i].time.moment();
        }


      })
    },
    onChangePage(page) {
      console.log(this.page)
      this.page = page;
      this.getList();
    },
    onPageSizeChange(pageSize) {
      this.limit = pageSize;
      this.getList();
    },
    search(keywords) {
      console.log(keywords);
      this.keywords = keywords;
      this.getList();
    },

    ok() {
      this.$Message.info('Clicked ok');
      //清空表单数据
      this.$refs['formValidate'].resetFields()
    },
    cancel() {
      this.$Message.info('Clicked cancel');
      //清空表单数据
      this.$refs['formValidate'].resetFields()
    },
    handleSubmit(title) {
      this.$refs[title].validate((valid) => {
        //console.log(this.$refs[title]);
        console.log(valid) //布尔值
        if (valid) {
          console.log(this.formValidate); //表单的数据

          if (this.formValidate._id) {
            console.log(this.formValidate._id);
            //edit
            this.axios({
              url: `${this.GLOBAL.cmsurl}/comment/data/${this.formValidate._id}`,
              method: 'put',
              data: this.formValidate,
            }).then(res => {
              this.dataModal = false;
              this.getList();
              console.log(this.formValidate);
              this.$Message.success('success!');
              Object.assign(this.$data.formValidate, this.$options.data().formValidate)
            })
          } else {
            //add
            delete this.formValidate._id;
            this.axios({
              url: `${this.GLOBAL.cmsurl}/comment/data`,
              method: 'post',
              data: this.formValidate
            }).then(res => {
              this.dataModal = false;
              this.getList();
              this.$Message.success('success!');
              console.log(this.formValidate); //表单的数据
              Object.assign(this.$data.formValidate, this.$options.data().formValidate)
            })
          }
          //this.$Message.success('Success!');
          /* this.axios({
              url:`${this.GLOBAL.cmsurl}/comment/list`,
              method:'post',
              data:this.formValidate
          }).then(res=>{
             console.log(res);
          }) */
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset(title) {
      this.$refs[title].resetFields();
    }
  },
  mounted() {
    this.getList()
  }

}
