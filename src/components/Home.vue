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
                <el-link @click="" icon="el-icon-user-solid">修改个人信息</el-link>
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
          <el-menu background-color="#0086b3" text-color="#fff" active-text-color="#ffd04b" style="width: 180px">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>信息管理</span>
              </template>
              <el-menu-item index="1-1" class="el-icon-user" v-bind:disabled="this.disable_1" @click="userManage">账户管理</el-menu-item>
              <el-menu-item index="1-2" class="el-icon-school" v-bind:disabled="this.disable_2" @click="schoolManage">学校管理</el-menu-item>
              <el-menu-item index="1-3" class="el-icon-check" v-bind:disabled="this.disable_3" @click="check">资质审核</el-menu-item>
              <el-submenu index="1-4">
                <template slot="title">
                  <i class="el-icon-food" style="margin-left: -6px"></i>
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
          欢迎使用本系统
        </el-main>
      </el-container>
    </el-container>
  </body>
</template>

<script>
export default {
  data(){
    return{
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
      disable_10: false
    }
  },
  created() {
    this.Identity = window.sessionStorage.getItem("Identity");
    if(this.Identity == "admin"){
      this.disable_4 = true;
      this.disable_6 = true;
      this.disable_7 = true;
      this.disable_8 = true;
      this.disable_9 = true;
      this.disable_10 = true;
    }
    if(this.Identity == "headmaster"){
      this.disable_5 = true;
      this.disable_6 = true;
      this.disable_7 = true;
    }
    if(this.Identity == "teacher"){
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
    userManage(){

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