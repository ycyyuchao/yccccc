export const Base = {
    data() {
        return {
            List: [],
            page: 1,
            limit: 10,
            total: 0,
            keywords: "",
            dataModal: false,
        };
    },
    methods: {
        edit(id) {
            this.axios({
                url: `${cmsurl}/${this.module}/data/${id}`,
                method: "put"
            }).then(res => {
                this.formValidate = res.data;
                this.dataModal = true;
            });
        },
        remove(id) {
            this.$Modal.confirm({
                title: "确认删除",
                content: "<p>你确认删除该条数据</p>",
                onOk: () => {
                    this.axios({
                        url: `${cmsurl}/${this.module}/data/${id}`,
                        method: "delete"
                    }).then(res => {
                        //console.log(res);
                        this.getList();
                    });
                    this.$Message.info("删除成功");
                }
            });
        },
        removes() {
            //console.log(this.selection)
            this.$Modal.confirm({
                title: "确认删除",
                content: "<p>你确认删除该条数据</p>",
                onOk: () => {
                    this.axios({
                        url: `${cmsurl}/${this.module}/data/removes`,
                        method: 'post',
                        data: {
                            ids: this.selection.join(',')
                        }
                    }).then(res => {
                        //console.log(res)
                        this.getList();
                    })
                }
            });
        },
        getList() {
            let url = '';
            if (this.module == 'news') {
                url = `${cmsurl}/news/list`
            } else if (this.module == "user") {
                url = `${cmsurl}/user/list`
            } else if (this.module == "product") {
                url = `${cmsurl}/product/list`
            } else if (this.module == "upload") {
                url = `${cmsurl}/upload/list`
            }
            this.axios({
                url: url,
                method: "post",
                data: {
                    id: this.nodeid,
                    page: this.page,
                    rows: this.limit,
                    class: this.keywords
                }
            }).then(res => {
                // console.log(res.data);
                // console.log(res.headers);
                // console.log(res.headers["x-total-count"]);
                this.List = res.data.rows;
                this.total = res.data.total
                for (var i in this.List) {
                    this.List[i].date = this.List[i].date.moment();
                }
            });
        },
        onChangePage(page) {
            //console.log(page);
            this.page = page;
            this.getList();
        },
        onPageSizeChange(pageSize) {
            //console.log(pageSize);
            this.limit = pageSize;
            this.getList();
        },
        search() {
            //console.log(this.keywords);
            if (this.module == "user") {
                this.axios({
                    url: `${cmsurl}/${this.module}/list`,
                    method: "post",
                    data: {
                        name: this.keywords
                    }
                }).then(res => {
                    this.List = res.data.rows;
                })
            } else {
                this.axios({
                    url: `${cmsurl}/${this.module}/list`,
                    method: "post",
                    data: {
                        class: this.keywords
                    }
                }).then(res => {
                    this.List = res.data.rows;
                })
            }

        },
        ok() {
            this.$Message.info("Clicked ok");
        },
        cancel() {
            this.$Message.info("Clicked cancel");
            this.formValidate = {};
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    //edit
                    if (this.formValidate._id) {
                        //console.log(this.formValidate);
                        this.axios({
                            url: `${cmsurl}/${this.module}/data/${this.formValidate._id}`,
                            method: "put",
                            data: this.formValidate
                        }).then(res => {
                            //console.log(res);
                            this.dataModal = false;
                            this.getList();
                            this.$Message.success("Success!");
                            // console.log(this.$data.formValidate)
                            // console.log(this.$options.data().formValidate)
                            this.formValidate = {};
                            Object.assign(this.$data.formValidate, this.$options.data().formValidate)
                        });
                    } else {
                        //add
                        delete this.formValidate._id;
                        if (this.module == 'user') {
                            this.axios({
                                url: `${cmsurl}/${this.module}/data`,
                                method: "post",
                                data: this.formValidate
                            }).then(res => {
                                //console.log(res); 
                                this.dataModal = false;
                                this.getList();
                                this.$Message.success("Success!");
                            });
                        } else {
                            this.axios({
                                url: `${cmsurl}/${this.module}/data`,
                                method: "post",
                                data: Object.assign(this.formValidate, {
                                    belong: this.belong
                                })
                            }).then(res => {
                                //console.log(res); 
                                this.dataModal = false;
                                this.axios({
                                    url: `${cmsurl}/${this.module}/list`,
                                    method: "post",
                                    data: {
                                        id: this.belong
                                    }
                                }).then(res => {
                                    //console.log(res)
                                    this.List = res.data.rows;
                                });
                                this.$Message.success("Success!");
                            });
                        }

                    }
                } else {
                    this.$Message.error("Fail!");
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        handleSelectionChange(val) {
            this.deletedId = val;
        },
    },
    mounted() {
        this.getList();
    }
}