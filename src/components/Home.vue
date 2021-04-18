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
                <el-link @click="" icon="el-icon-edit">编辑资料</el-link>
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
        <el-aside width="180px">
          <el-menu background-color="#0086b3" text-color="#fff"
                   active-text-color="#ffd04b" style="width: 180px"
                   :router= true :default-active="activePath">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>信息管理</span>
              </template>
              <el-menu-item index="UserManage" class="el-icon-user" v-bind:disabled="this.disable_1" @click="savePath('UserManage')">账户管理</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-school" v-bind:disabled="this.disable_2" @click="schoolManage">学校管理</el-menu-item>
              <el-menu-item index="1-3" class="el-icon-check" v-bind:disabled="this.disable_3" @click="check">资质审核</el-menu-item>
              <el-submenu index="1-4">
                <template slot="title">
                  <i class="el-icon-food" style="margin-left: -6px; color: white"></i>
                  <span style="margin-left: -8px">套餐管理</span>
                </template>
                <el-menu-item index="1-4-1" v-bind:disabled="this.disable_4" class="el-icon-shopping-cart-2">套餐购买</el-menu-item>
                <el-menu-item index="1-4-2" v-bind:disabled="this.disable_5" class="el-icon-setting">套餐设置</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>教学管理</span>
              </template>
              <el-menu-item index="2-1" v-bind:disabled="this.disable_6" class="el-icon-document-copy">题库管理</el-menu-item>
              <el-menu-item index="2-2" v-bind:disabled="this.disable_7" class="el-icon-menu">安排课程</el-menu-item>
            </el-submenu>
            <el-submenu index="3" >
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>数据图表</span>
              </template>
              <el-menu-item index="3-1" v-bind:disabled="this.disable_8" class="el-icon-data-line" style="font-size: 14.5px;font-weight: lighter">地震</el-menu-item>
              <el-menu-item index="3-2" v-bind:disabled="this.disable_9" class="el-icon-data-line" style="font-size: 14.5px;font-weight: lighter">火灾</el-menu-item>
              <el-menu-item index="3-3" v-bind:disabled="this.disable_10" class="el-icon-data-line" style="font-size: 14.5px;font-weight: lighter">泥石流</el-menu-item>
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
          <span >{{ msg_ID }}</span>
        </div>
        <el-divider></el-divider>
        <div style="margin-top: 20px">
          <span>{{ msg_name }}</span>
        </div>
        <el-divider></el-divider>
        <div style="margin-top: 20px">
          <span>{{ msg_telephone }}</span>
        </div>
        <el-divider></el-divider>
        <div style="margin-top: 20px">
          <span>{{ msg_school }}</span>
        </div>
        <el-divider></el-divider>
        <div style="margin-top: 20px">
          <span>{{ msg_identity }}</span>
        </div>
      </el-card>
    </el-drawer>
  </body>
</template>

<script>
export default {
  data(){
    return{
      activePath: '/Welcome',
      drawer: false,
      Identity: '',
      disable_1: false,
      disable_2: false,
      disable_3: false,
      disable_4: false,
      disable_5: false,
      disable_6: false,
      disable_7: false,
      disable_8: false,
      disable_9: false,
      disable_10: false,
      msg_ID: '用户ID：'+window.sessionStorage.getItem("id"),
      msg_name: '用户名称：'+window.sessionStorage.getItem("name"),
      msg_telephone: '电话号码：'+window.sessionStorage.getItem("telephone"),
      msg_school: '所属学校：'+window.sessionStorage.getItem("school"),
      msg_identity: '我的身份：'+window.sessionStorage.getItem("identity"),
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
    this.Identity = window.sessionStorage.getItem("identity");
    if(this.Identity == "管理员"){
      this.disable_4 = true;
      this.disable_6 = true;
      this.disable_7 = true;
      this.disable_8 = true;
      this.disable_9 = true;
      this.disable_10 = true;
    }
    if(this.Identity == "校长"){
      this.disable_5 = true;
      this.disable_6 = true;
      this.disable_7 = true;
    }
    if(this.Identity == "老师"){
      this.disable_1 = true;
      this.disable_2 = true;
      this.disable_3 = true;
      this.disable_4 = true;
      this.disable_5 = true;
    }
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
    //保存路径
    savePath(path){
      window.sessionStorage.setItem("activePath",path);
      this.activePath = path;
    },
    schoolManage(){

    },
    check(){

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
.el-aside{
  background-color: #0086b3;
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