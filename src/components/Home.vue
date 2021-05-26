<template>
  <body id="home">
  <!--引入container布局-->
  <el-container class="home-container">
    <!--头部-->
    <el-header>
      <!--logo + title-->
      <div style="display: flex; align-items: center; margin-left: 5px">
        <img src="../assets/安全圈5.0.png" alt class="logo">
        <span style="margin-left: 15px">安全圈后台管理系统</span>
      </div>
      <!--用户下拉菜单-->
      <div style="align-items: center; margin-top: 10px">
        <el-dropdown>
          <span class="el-dropdown-link" style="margin-right: 30px;color: white" >
            欢迎使用
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-link @click="drawer=true" icon="el-icon-document">我的资料</el-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-link @click="dialog=true" icon="el-icon-edit">修改密码</el-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-link @click="exit" icon="el-icon-switch-button">退出</el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
      <!--侧边栏-->
      <el-aside style="width: 200px">
        <el-menu background-color="#0086b3" text-color="#fff"
                 active-text-color="#ffd04b" style="width: 200px; height: 100%"
                 :router= true :default-active="activePath">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item index="UserManage" class="el-icon-user" v-show="Identity == '管理员'" @click="savePath('UserManage')">账户管理</el-menu-item>
            <el-menu-item index="SchoolInfo" class="el-icon-school" v-show="Identity == '校长'" @click="">学校管理</el-menu-item>
            <el-menu-item index="ClassManage" class="el-icon-school" v-show="Identity == '老师'" @click="savePath('ClassManage')">班级管理</el-menu-item>
            <el-menu-item index="QualificationCheck" class="el-icon-check" v-show="Identity == '管理员'" @click="savePath('QualificationCheck')">资质审核</el-menu-item>
            <el-submenu index="1-4" v-show="Identity != '老师'">
              <template slot="title">
                <i class="el-icon-food" style="margin-left: -6px; color: white"></i>
                <span style="margin-left: -8px">套餐管理</span>
              </template>
              <el-menu-item index="ServiceBuy" v-show="Identity == '校长'" class="el-icon-shopping-cart-2" @click="savePath('ServiceBuy')">套餐购买</el-menu-item>
              <el-menu-item index="ServiceManage" v-show="Identity == '管理员'" class="el-icon-setting" @click="savePath('ServiceManage')">套餐设置</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2" v-show="Identity == '老师'">
            <template slot="title">
              <i class="el-icon-reading"></i>
              <span>教学管理</span>
            </template>
            <el-menu-item index="QuestionBank" class="el-icon-document-copy" @click="">题库管理</el-menu-item>
            <el-menu-item index="LessonManage" class="el-icon-menu" @click="savePath('LessonManage')">课程预约</el-menu-item>
          </el-submenu>
          <el-submenu index="3" v-show="Identity != '管理员'">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>数据图表</span>
            </template>
            <el-menu-item index="3-1" class="el-icon-data-line" style="font-size: 14.5px;font-weight: lighter" >应急疏散</el-menu-item>
            <el-menu-item index="3-2" class="el-icon-data-line" style="font-size: 14.5px;font-weight: lighter">泥石流</el-menu-item>
            <el-menu-item index="3-3" class="el-icon-data-line" style="font-size: 14.5px;font-weight: lighter">地震</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!--主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

  <!--用户资料查看-->
  <el-drawer
          title="资料卡片"
          :visible.sync="drawer"
          :append-to-body=true>
    <el-card class="box-card"
             style="
                  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px #0086b3;
                  margin-left: 20px;
                  margin-right: 20px;
                  height: 90%">
      <div>
        用户 I D：
        <el-input style="width: 130px" v-model="msg_ID" disabled></el-input>
      </div>
      <el-divider></el-divider>
      <div style="margin-top: 20px">
        用户名称：
        <el-input style="width: 130px" v-model="msg_name" disabled></el-input>
      </div>
      <el-divider></el-divider>
      <div style="margin-top: 20px">
        电话号码：
        <el-input style="width: 130px" v-model="msg_telephone" :disabled="is_disable"></el-input>
        <el-button type="text" style="margin-left: 10px" @click="edit">编辑</el-button>
        <el-button type="text" style="margin-left: 10px" @click="change_telephone" :disabled="is_disable">保存</el-button>
      </div>
      <el-divider></el-divider>
      <div style="margin-top: 20px">
        所属学校：
        <el-input style="width: 200px" v-model="msg_school" disabled></el-input>
      </div>
      <el-divider></el-divider>
      <div style="margin-top: 20px">
        我的身份：
        <el-input style="width: 130px" v-model="msg_identity" disabled></el-input>
      </div>
    </el-card>
  </el-drawer>

  <!--用户修改密码-->
  <el-dialog
          title="修改密码"
          :visible.sync="dialog"
          :append-to-body="true"
          style="width: 800px; margin-left: 21%; margin-top: 4%"
          @closed="handleClose">
    <el-form :model="change_password_form" ref="change_password_form">
      <el-form-item label="原密码" prop="old_password">
        <el-input
                type="password"
                autocomplete="off"
                style="width: 300px"
                v-model="change_password_form.old_password">
        </el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input
                type="password"
                autocomplete="off"
                style="width: 300px"
                v-model="change_password_form.new_password"
                :disabled="!pass">
        </el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-tooltip effect="dark" content="请先验证原密码" placement="bottom">
          <el-button type="primary" @click="check">验证</el-button>
        </el-tooltip>
        <el-button type="primary" :disabled="!pass" @click="change_password">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  </body>
</template>

<script>
  export default {
    data(){
      return{
        //修改密码表单是否可见
        dialog: false,
        //用户资料卡片是否可见
        drawer: false,
        //是否可修改电话号码
        is_disable: true,
        //原密码输入是否通过
        pass: false,

        activePath: '',
        Identity: '',

        msg_ID: window.sessionStorage.getItem("id"),
        msg_name: window.sessionStorage.getItem("name"),
        msg_telephone: window.sessionStorage.getItem("telephone"),
        msg_school: window.sessionStorage.getItem("school"),
        msg_identity: window.sessionStorage.getItem("identity"),
        change_password_form: {
          old_password: '',
          new_password: ''
        },
      }
    },
    created() {
      this.activePath = window.sessionStorage.getItem("activePath");
      this.Identity = window.sessionStorage.getItem("identity");
    },
    name: "Home",
    methods: {
      /**
       * function: 安全退出
       * description: 用户退出时，清空用户所有信息
       */
      exit(){
        window.sessionStorage.clear();
        // 返回登录页面
        this.$router.push("/");
      },

      //设置电话号码可编辑
      edit(){
        this.is_disable = false;
      },

      //修改电话号码
      async change_telephone() {
        const {data: res} = await this.$http.post("editTelephone", {
          name: this.msg_name,
          telephone: this.msg_telephone,
          identity: this.msg_identity
        });
        if (res == "ok") {
          this.$message.success("编辑成功！");
          window.sessionStorage.setItem("telephone",this.msg_telephone);
          this.is_disable = true;
        }
        else{
          this.$message.error("编辑失败！");
          this.msg_telephone = window.sessionStorage.getItem("telephone");
          this.is_disable = true;
        }
      },

      //检查原密码输入是否准确
      check(){
        if(this.change_password_form.old_password == window.sessionStorage.getItem("password")){
          this.pass = true;
          this.$message.success("验证通过！");
        }
        else
          this.$message.error("验证失败！");
      },

      //修改密码
      async change_password() {
        const {data: res} = await this.$http.post("editPassword", {
          name: this.msg_name,
          password: this.change_password_form.new_password,
          identity: this.msg_identity
        });
        if (res == "ok") {
          this.$message.success("修改成功！");
          window.sessionStorage.setItem("password",this.change_password_form.new_password);
          this.pass = false;
        }
        else{
          this.$message.error("修改失败！");
          this.change_password_form.new_password = '';
          this.pass = false;
        }
      },

      //修改密码对话框关闭后的操作——清空表单
      handleClose(){
        this.$refs.change_password_form.resetFields();
      },

      //保存路径
      savePath(path){
        window.sessionStorage.setItem("activePath",path);
        this.activePath = path;
      }
    }
  }
</script>

<style scoped>
  .el-header{
    display: flex;
    justify-content: space-between;
    padding-left: 0px;
    font-size: 20px;
    font-weight: bolder;
    background: -webkit-linear-gradient(left,white,#0086b3) no-repeat;
  }
  .el-main{
    background-color: #eaedf1;
  }
  .home-container{
    height: 100%;
  }
  .logo{
    width: 55px;
    height: 55px;
  }
  #home {
    height: 100%;
    width: 100%;
    margin: -8px 20px 30px -8px;
    background-size: cover;
    position: fixed;
  }
</style>
