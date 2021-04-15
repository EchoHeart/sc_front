<template>
  <body id="poster">
  <div>
    <!--登录表单-->
    <el-form :rules="rules_login" ref="loginForm" :model="loginForm" class="loginContainer">
      <!--标题-->
      <h3 class="loginTitle">欢迎使用安全圈后台管理系统</h3>
      <!--用户名-->
      <el-form-item prop="username">
        <el-input type="text" auto-complete="false" v-model="loginForm.username"
                  placeholder="请输入用户名" suffix-icon="iconfont icon-denglu-copy"></el-input>
      </el-form-item>
      <!--密码-->
      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password"
                  placeholder="请输入密码" suffix-icon="iconfont icon-icon-mima"></el-input>
      </el-form-item>
      <!--登录按钮-->
      <el-form-item align="center">
        <el-button type="info" icon="iconfont icon-jiaolian1" @click="teacherLogin">老师</el-button>
        <el-button type="info" icon="iconfont icon-Boss-laoban-1" @click="headmasterLogin">校长</el-button>
        <el-button type="info" icon="iconfont icon-guanliyuan" @click="adminLogin">管理员</el-button>
      </el-form-item>
      <!--注册-->
      <el-form-item align="center">
        <el-link :underline="false" icon="iconfont icon-jiaolian1" type="primary"
                 style="margin-right: 30px" @click="Visible=true">老师注册</el-link>
        <el-link :underline="false" icon="iconfont icon-Boss-laoban-1" type="primary"
                 @click="Visible=true">校长注册</el-link>
      </el-form-item>
      <!--密码找回-->
      <el-link :underline="false" href="" icon="iconfont icon-wangjimima" type="warning"
               style="margin-left: 50%; transform: translate(-50%)">忘记密码</el-link>
    </el-form>
    <!--注册表单-->
    <el-dialog title="用户注册" :visible.sync="Visible" :append-to-body="true">
      <el-form :model="registerForm" ref="registerForm" :rules="rules_register">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="register_username">
          <el-input v-model="registerForm.register_username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth" prop="register_password">
          <el-input type="password" v-model="registerForm.register_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" prop="register_telephone">
          <el-input v-model="registerForm.register_telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属学校" :label-width="formLabelWidth" prop="register_school">
          <el-input v-model="registerForm.register_school" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="register">注 册</el-button>
      </div>
    </el-dialog>
  </div>
  </body>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      Visible: false,
      formLabelWidth: '100px',
      loginForm:{
        username:'',
        password:''
      },
      registerForm: {
        register_username: '',
        register_password: '',
        register_telephone: '',
        register_school: ''
      },
      /**
       * 表单验证
       * required: 是否为必填项
       * message: 提示信息
       * trigger: 触发器
       */
      rules_login:{
        //用户名不能为空
        username: [{required:true, message:'请输入用户名', trigger:'blur'}],
        //密码不能为空
        password: [{required:true, message:'请输入密码', trigger:'blur'}]
      },
      rules_register:{
        //用户名称不能为空
        register_username: [{required:true, message:'请输入用户名', trigger:'blur'}],
        //用户密码不能为空
        register_password: [{required:true, message:'请输入密码', trigger:'blur'}],
        //电话号码不能为空
        register_telephone: [{required:true, message:'请输入密码', trigger:'blur'}],
        //所属学校不能为空
        register_school: [{required:true, message:'请输入密码', trigger:'blur'}],
      }
    }
  },
  methods:{
    adminLogin(){
      //valid用来判断表单规则是否通过
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const {data: res} = await this.$http.post("adminLogin", {
            admin_name: this.loginForm.username,
            password: this.loginForm.password
          });
          if(res.flag == "ok"){
            window.sessionStorage.setItem("user",res.object);//存储admin对象
            window.sessionStorage.setItem("Identity","admin");
            this.$message.success("欢迎"+this.loginForm.username+"，登录成功！");
            await this.$router.push({path: "/Home"});
          }else{
            this.$message.error("用户名或密码错误");
            //重置表单
            this.$refs.loginForm.resetFields();
          }
        } else {
          this.$message.error('用户名或密码不能为空！');
          return false;
        }
      });
    },
    teacherLogin(){
      //valid用来判断表单规则是否通过
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const {data: res} = await this.$http.post("teacherLogin", {
            teacher_name: this.loginForm.username,
            password: this.loginForm.password
          });
          if(res.flag == "ok"){
            window.sessionStorage.setItem("user",res.object);//存储teacher对象
            window.sessionStorage.setItem("Identity","teacher");
            this.$message.success("欢迎"+this.loginForm.username+"，登录成功！");
            await this.$router.push({path: "/Home"});
          }else{
            this.$message.error("用户名或密码错误");
            //重置表单
            this.$refs.loginForm.resetFields();
          }
        } else {
          this.$message.error('用户名或密码不能为空！');
          return false;
        }
      });
    },
    headmasterLogin(){
      //valid用来判断表单规则是否通过
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const {data: res} = await this.$http.post("headmasterLogin", {
            headmaster_name: this.loginForm.username,
            password: this.loginForm.password
          });
          if(res.flag == "ok"){
            window.sessionStorage.setItem("user",res.object);//存储headmaster对象
            window.sessionStorage.setItem("Identity","headmaster");
            this.$message.success("欢迎"+this.loginForm.username+"，登录成功！");
            await this.$router.push({path: "/Home"});
          }else{
            this.$message.error("用户名或密码错误");
            //重置表单
            this.$refs.loginForm.resetFields();
          }
        } else {
          this.$message.error('用户名或密码不能为空！');
          return false;
        }
      });
    },
    cancel(){
      this.Visible = false;
      this.$refs.registerForm.resetFields();
    },
    register(){
      this.$refs.registerForm.validate(async (valid) =>{
        if(valid){
          //注册

          this.Visible = false;
          this.$refs.registerForm.resetFields();
        }else{
          this.$message.error('个人信息需填写完整！');
        }
      })
    }
  }
}
</script>

<style>
.loginContainer{
  background-clip: padding-box;
  background-color: #fff;

  padding: 35px 35px 35px 35px;
  border-radius: 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  width: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.loginTitle{
  margin: 0px auto 15px auto;
  text-align: center;
}
#poster {
  background: url("../assets/loginBG.jpeg");
  height: 100%;
  width: 100%;
  margin: -8px 20px 30px -8px;
  background-size: cover;
  position: fixed;
}
</style>