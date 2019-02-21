<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  width: 100px;
  height: 50px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 6px;
  left: 20px;
}
.layout-logo img {
  width: 100%;
  height: 100%;
}
.layout-nav {
  width: 100px;
  margin: 0 auto;
  margin-right: 20px;
}
.ivu-layout-sider-children ul {
  height: 100%;
}
.login {
  background-image: url(./assets/timg.jpg);
  background-position: 50%;
  background-size: cover;
  height: 100%;
  position: relative;
  width: 100%;
}
.login-con {
  -webkit-transform: translateY(-60%);
  position: absolute;
  right: 160px;
  top: 50%;
  transform: translateY(-60%);
  width: 300px;
}
.ivu-form-item-content{
    width:100%;
}
.ivu-form-item-label{
  width:100px;
  margin-left:-10px;
}
</style>
<template>
    <div class="layout">
        <div class="layout" style="height:100%"  v-if="login">
            <Layout style="height:100%">
                <Header>
                    <Menu mode="horizontal" theme="dark" active-name="1">
                        <div class="layout-logo">
                            <img src="./assets/u=1983629807,1418853664&fm=27&gp=0.jpg" alt="图片加载失败">
                        </div>
                        <div class="layout-nav">
                            <MenuItem name="1">
                                <Icon type="md-close" />
                                <button  @click="close" style="background: #515a6e;border:0;color: rgba(255,255,255,.7);outline:0"> 退出</button>
                            </MenuItem>
                        </div>
                    </Menu>
                </Header>
                <Layout>
                    <Sider hide-trigger :style="{background: '#fff'}">
                        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-navigate"></Icon>
                                    用户模块
                                </template>
                                <MenuItem name="1-1"><router-link to="/user" active-class="active">用户管理</router-link></MenuItem>
                                <MenuItem name="2-1"><router-link to="/comment" active-class="active">用户评论</router-link></MenuItem>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-keypad"></Icon>
                                    信息模块
                                </template>
                                <MenuItem name="2-1"><router-link to="/news" active-class="active">新闻管理</router-link></MenuItem>
                        
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-analytics"></Icon>
                                    分类模块
                                </template>
                                <MenuItem name="3-1"><router-link to="/cate" active-class="active">分类管理</router-link></MenuItem>
                            </Submenu>
                            <Submenu name="4">
                                <template slot="title">
                                    <Icon type="ios-jet"></Icon>
                                    产品模块
                                </template>
                                <MenuItem name="4-1"><router-link to="/product" active-class="active">产品管理</router-link></MenuItem>
                            </Submenu>
                            <Submenu name="5">
                                <template slot="title">
                                    <Icon type="ios-cloud-upload-outline"></Icon>
                                    上传模块
                                </template>
                                <MenuItem name="5-1"><router-link to="/upload" active-class="active">上传管理</router-link></MenuItem>
                            </Submenu>
                        </Menu>
                    </Sider>
                    <Layout :style="{padding: '0 24px 24px'}">
                        <Breadcrumb :style="{margin: '24px 0'}">
                            <BreadcrumbItem>Home</BreadcrumbItem>
                            <BreadcrumbItem>Components</BreadcrumbItem>
                            <BreadcrumbItem>Layout</BreadcrumbItem>
                        </Breadcrumb>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <router-view></router-view>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
        <div class="login" v-else>
            <div class="login-con">
                <div class="ivu-card">
                    <div class="ivu-card-head">
                        <p>
                            <i class="ivu-icon ivu-icon-log-in"></i>
                             <span>欢迎登录</span>
                        </p>
                    </div>  
                    <div class="ivu-card-body">
                        <div class="form-con">
                            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline autocomplete="off">
                                <FormItem prop="user">
                                    <Input type="text" v-model="formInline.user" placeholder="Username">
                                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem prop="password">
                                    <Input type="password" v-model="formInline.password" placeholder="Password">
                                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem style="width:100%">
                                    <Button type="primary" @click="handleSubmit('formInline')" style="width:87%">登录</Button>
                                </FormItem>
                            </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["login"])
  },

  methods: {
    ...mapActions(['checklogin','logins']),
    handleSubmit(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                // console.log(this.formInline.user)
               
                this.logins(this.formInline.user);

            } else {
                this.$Message.error('登录失败!');
            }
        })
    },
    close(){
        this.$cookie.delete('User');
        this.checklogin(false);
    }
  },
  mounted() {
      if(this.$cookie.get('User')){
            this.checklogin(true);
      }
  }
};
</script>

