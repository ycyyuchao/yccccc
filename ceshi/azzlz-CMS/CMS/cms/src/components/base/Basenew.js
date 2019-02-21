export const Base = {
    data() {
        return {
            list: [],
            page: 1,
            limit: 10,
            total: 0,
            keywords: '',
            datamodal: false,
            module: 'people'
        }
    },
    methods: {
        edit(id) {
            this.axios({
                url: `${this.GLOBAL.cmsurl}/${this.module}/data/${id}`,
                method: 'get'
            }).then(res => {
                //console.log(res.data)
                this.formValidate = res.data;
                this.formValidate.date = res.data.newsdate;
                this.datamodal = true;
            })
        },
        remove(id) {
            //console.log(id)
            this.$Modal.confirm({
                title: '确认删除',
                content: '<p>你确认删除吗？</p>',
                onOk: () => {
                    this.axios({
                        url: `${this.GLOBAL.cmsurl}/${this.module}/data/${id}`,
                        method: 'delete'
                    }).then(res => {
                        //console.log('ok')
                        this.getList()
                    })
                }
            });
        },
        removes() {
            this.$Modal.confirm({
                title: '确认删除',
                content: '<p>你确认删除选择所有吗？</p>',
                onOk: () => {
                    this.axios({
                        url: `${this.GLOBAL.cmsurl}/${this.module}/data/removes`,
                        method: 'post',
                        data: {
                            ids: this.cheakeds.join(',')
                        }
                    }).then(res => {
                        //console.log('ok')
                        this.getList()
                    })
                }
            });
        },
        getList() {
            var url = '';
            if (this.module == 'news') {
                url = `${this.GLOBAL.cmsurl}/news/list`;
            }
            if (this.module == 'upload') {
                url = `${this.GLOBAL.cmsurl}/upload/list`;
            }
            if (this.module == 'comment') {
                url = `${this.GLOBAL.cmsurl}/comment/list`;
            }
            this.axios({
                url: url,
                method: 'post',
                data: {
                    id: this.nodeid,
                    page: this.page,
                    rows: this.limit
                }
            }).then(res => {
                //this.total = +res.headers['x-total-count'];
                //console.log(res.data)
                //console.log('ok')
                if (this.module == 'upload') {
                    this.uploadList = res.data.rows;

                    this.total = res.data.total;
                }
                if (this.module == 'news' || this.module == 'comment') {
                    this.list = res.data.rows;

                    for (var i in this.list) {
                        this.list[i].newsdate = this.list[i].newsdate.moment();
                    }
                    //console.log(this.list[i].newsdate.moment())
                    this.total = res.data.total;
                }

            })
        },
        onChangePage(page) {
            console.log(page)
            this.page = page;
            this.getList();
        },
        onPageSize(pageSize) {
            // console.log(pageSize)
            this.limit = pageSize;
            this.getList();
        },
        search() {
            //this.getList();
            this.axios({
                url: `${this.GLOBAL.cmsurl}/news/list`,
                method: "post",
                data: {
                    title: this.keywords
                }
            }).then(res => {
                this.list = res.data.rows;
            })
        },
        ok() {
            this.$Message.info('Clicked ok');
        },
        cancel() {
            this.$Message.info('Clicked cancel');
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //console.log(valid)
                    //console.log(this.formValidate._id)
                    if (this.formValidate._id) {
                        //edit
                        //console.log(this.formValidate._id)
                        this.axios({
                            url: `${this.GLOBAL.cmsurl}/${this.module}/data/${this.formValidate._id}`,
                            method: 'put',
                            data: this.formValidate
                        }).then(res => {
                            //console.log(this.$data)
                            this.datamodal = false;
                            this.getList();
                            this.$Message.success('Success!');
                            Object.assign(this.$data.formValidate, this.$options.data().formValidate)
                        })
                    } else {
                        //add
                        if (this.module == "news") {
                            delete this.formValidate.id;
                            console.log(this.formValidate)
                            this.axios({
                                url: `${this.GLOBAL.cmsurl}/news/data`,
                                method: 'post',
                                data: Object.assign(this.formValidate, {
                                    belong: this.belong
                                })
                            }).then(res => {
                                this.datamodal = false;
                                //this.getList();
                                this.axios({
                                    url: `${this.GLOBAL.cmsurl}/news/list`,
                                    method: "post",
                                    data: {
                                        id: this.belong
                                    }
                                }).then(res => {
                                    this.list = res.data.rows;
                                })
                                this.$Message.success('Success!');
                                Object.assign(this.$data.formValidate, this.$options.data().formValidate)
                            })
                        }

                    }


                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        handleSelectionChange(val) {
            //console.log(val);
            this.removesId = val;
        },
    },
    mounted(page) {
        this.getList();
    }

}