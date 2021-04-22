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
                 style="margin-right: 30px" @click="getSchool">老师注册</el-link>
        <el-link :underline="false" icon="iconfont icon-Boss-laoban-1" type="primary"
                 @click="visible_headmaster=true">校长注册</el-link>
      </el-form-item>
      <!--密码找回-->
      <el-link :underline="false" icon="iconfont icon-wangjimima" type="warning"
               style="margin-left: 50%; transform: translate(-50%)" @click="getSchool">忘记密码</el-link>
    </el-form>

    <!--校长注册表单-->
    <el-dialog title="校长注册" :visible.sync="visible_headmaster" :append-to-body="true">
      <el-form :model="registerForm_headmaster" ref="registerForm_headmaster" :rules="rules_register_headmaster">
        <el-form-item label="您的姓名" :label-width="formLabelWidth" prop="headmaster_name">
          <el-input v-model="registerForm_headmaster.headmaster_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设置密码" :label-width="formLabelWidth" prop="headmaster_password">
          <el-input type="password" v-model="registerForm_headmaster.headmaster_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="headmaster_password_certain">
          <el-input type="password" v-model="registerForm_headmaster.headmaster_password_certain" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" prop="headmaster_telephone">
          <el-input v-model="registerForm_headmaster.headmaster_telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属学校" :label-width="formLabelWidth" prop="headmaster_school">
          <el-input v-model="registerForm_headmaster.headmaster_school" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="headmasterCancel">取 消</el-button>
        <el-button type="primary" @click="headmasterRegister">注 册</el-button>
      </div>
    </el-dialog>

    <!--老师注册表单-->
    <el-dialog title="老师注册" :visible.sync="visible_teacher" :append-to-body="true">
      <el-form :model="registerForm_teacher" ref="registerForm_teacher" :rules="rules_register_teacher">
        <el-form-item label="您的姓名" :label-width="formLabelWidth" prop="teacher_name">
          <el-input v-model="registerForm_teacher.teacher_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设置密码" :label-width="formLabelWidth" prop="teacher_password">
          <el-input type="password" v-model="registerForm_teacher.teacher_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="teacher_password_certain">
          <el-input type="password" v-model="registerForm_teacher.teacher_password_certain" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" prop="teacher_telephone">
          <el-input v-model="registerForm_teacher.teacher_telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属学校" :label-width="formLabelWidth" prop="teacher_school">
          <el-select v-model="registerForm_teacher.teacher_school" size="mini" placeholder="请选择学校...">
            <el-option v-for="item in this.schoolData" :key="item.key" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="teacherCancel">取 消</el-button>
        <el-button type="primary" @click="teacherRegister">注 册</el-button>
      </div>
    </el-dialog>

  </div>
  </body>
</template>

<script>
export default {
  name: "Login",
  data(){
    //校长注册检验密码一致
    let check_headmaster = (rule,value,callback) =>{
      if(value != this.registerForm_headmaster.headmaster_password)
        callback(new Error("两次输入密码不一致"));
      else
        callback();
    }

    //老师注册检验密码一致
    let check_teacher = (rule,value,callback) =>{
      if(value != this.registerForm_teacher.teacher_password)
        callback(new Error("两次输入密码不一致"));
      else
        callback();
    }

    return{
      //校长注册表单是否可见
      visible_headmaster: false,
      //老师注册表单是否可见
      visible_teacher: false,
      formLabelWidth: '100px',
      schoolList: [],
      schoolData: [],
      //登录表单
      loginForm:{
        username:'',
        password:''
      },

      //校长注册表单
      registerForm_headmaster: {
        headmaster_name: '',
        headmaster_password: '',
        headmaster_password_certain: '',
        headmaster_telephone: '',
        headmaster_school: ''
      },

      //老师注册表单
      registerForm_teacher: {
        teacher_name: '',
        teacher_password: '',
        teacher_password_certain: '',
        teacher_telephone: '',
        teacher_school: '',
      },

      /**
       * 登录表单验证规则
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
      /**
       * 校长注册表单验证规则
       */
      rules_register_headmaster:{
        //用户名称不能为空
        headmaster_name: [{required:true, message:'姓名不能为空', trigger:'blur'}],
        //用户密码不能为空
        headmaster_password: [{required:true, message:'密码不能为空', trigger:'blur'}],
        //确认密码不能为空且必须一致
        headmaster_password_certain: [
            {required:true, message:'确认密码不能为空', trigger:'blur'},
            {validator:check_headmaster, trigger:'blur'}
        ],
        //电话号码不能为空
        headmaster_telephone: [{required:true, message:'电话号码不能为空', trigger:'blur'}],
        //所属学校不能为空
        headmaster_school: [{required:true, message:'学校不能为空', trigger:'blur'}],
      },

      /**
       * 老师注册表单验证规则
       */
      rules_register_teacher:{
        //用户名称不能为空
        teacher_name: [{required:true, message:'姓名不能为空', trigger:'blur'}],
        //用户密码不能为空
        teacher_password: [{required:true, message:'密码不能为空', trigger:'blur'}],
        //确认密码不能为空且必须一致
        teacher_password_certain: [
          {required:true, message:'确认密码不能为空', trigger:'blur'},
          {validator:check_teacher, trigger:'blur'}
        ],
        //电话号码不能为空
        teacher_telephone: [{required:true, message:'电话号码不能为空', trigger:'blur'}],
        //所属学校不能为空
        teacher_school: [{required:true, message:'学校不能为空', trigger:'blur'}],
      }
    }
  },

  // mounted(){
  //   this.getSchool();
  // },

  methods:{
    //管理员登录
    adminLogin(){
      //valid用来判断表单规则是否通过
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const {data: res} = await this.$http.post("adminLogin", {
            admin_name: this.loginForm.username,
            password: this.loginForm.password
          });
          if(res.flag == "ok"){
            //存储admin对象信息
            window.sessionStorage.setItem("id",res.object.admin_id);
            window.sessionStorage.setItem("name",res.object.admin_name);
            window.sessionStorage.setItem("password",res.object.password);
            window.sessionStorage.setItem("telephone",res.object.telephone);
            window.sessionStorage.setItem("school","NULL")
            window.sessionStorage.setItem("identity","管理员");
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

    //老师登录
    teacherLogin(){
      //valid用来判断表单规则是否通过
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const {data: res} = await this.$http.post("teacherLogin", {
            teacher_name: this.loginForm.username,
            password: this.loginForm.password
          });
          if(res.flag == "ok" && res.object.state == 1){
            //存储teacher对象
            window.sessionStorage.setItem("id",res.object.teacher_id);
            window.sessionStorage.setItem("name",res.object.teacher_name);
            window.sessionStorage.setItem("password",res.object.password);
            window.sessionStorage.setItem("telephone",res.object.telephone);
            window.sessionStorage.setItem("school",res.object.school_name);
            window.sessionStorage.setItem("identity","老师");
            this.$message.success("欢迎"+this.loginForm.username+"，登录成功！");
            await this.$router.push({path: "/Home"});
          }
          if(res.flag != "ok"){
            this.$message.error("用户名或密码错误！");
            //重置表单
            this.$refs.loginForm.resetFields();
          }
          if(res.object.state != 1){
            this.$message.error("管理员审核未通过，不予登录！");
            //重置表单
            this.$refs.loginForm.resetFields();
          }
        } else {
          this.$message.error('用户名或密码不能为空！');
          return false;
        }
      });
    },

    //校长登录
    headmasterLogin(){
      //valid用来判断表单规则是否通过
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const {data: res} = await this.$http.post("headmasterLogin", {
            headmaster_name: this.loginForm.username,
            password: this.loginForm.password
          });
          if(res.flag == "ok" && res.object.state == 1){
            //存储headmaster对象
            window.sessionStorage.setItem("id",res.object.headmaster_id);
            window.sessionStorage.setItem("name",res.object.headmaster_name);
            window.sessionStorage.setItem("password",res.object.password);
            window.sessionStorage.setItem("telephone",res.object.telephone);
            window.sessionStorage.setItem("school",res.object.school_name);
            window.sessionStorage.setItem("identity","校长");
            this.$message.success("欢迎"+this.loginForm.username+"，登录成功！");
            await this.$router.push({path: "/Home"});
          }
          if(res.flag != "ok"){
            this.$message.error("用户名或密码错误！");
            //重置表单
            this.$refs.loginForm.resetFields();
          }
          if(res.object.state != 1){
            this.$message.error("管理员审核未通过，不予登录！");
            //重置表单
            this.$refs.loginForm.resetFields();
          }
        } else {
          this.$message.error('用户名或密码不能为空！');
          return false;
        }
      });
    },

    //校长注册表单关闭
    headmasterCancel(){
      this.visible_headmaster = false;
      this.$refs.registerForm_headmaster.resetFields();
    },

    //老师注册表单关闭
    teacherCancel(){
      this.visible_teacher = false;
      this.$refs.registerForm_teacher.resetFields();
    },

    //校长注册
    headmasterRegister(){
      this.$refs.registerForm_headmaster.validate(async (valid) =>{
        if(valid){
          //注册
          const {data: res} = await this.$http.post("headmasterRegister", {
            headmaster_name: this.registerForm_headmaster.headmaster_name,
            password: this.registerForm_headmaster.headmaster_password_certain,
            telephone: this.registerForm_headmaster.headmaster_telephone,
            school_name: this.registerForm_headmaster.headmaster_school
          });
          if(res == "ok"){
            this.$message.success("注册成功！");
          }else{
            this.$message.error("注册失败！");
          }
          this.headmasterCancel();
        }else{
          this.$message.error('个人信息需填写完整！');
        }
      })
    },

    //老师注册
    teacherRegister(){
      this.$refs.registerForm_teacher.validate(async (valid) =>{
        if(valid){
          //注册
          const {data: res} = await this.$http.post("teacherRegister", {
            teacher_name: this.registerForm_teacher.teacher_name,
            password: this.registerForm_teacher.teacher_password_certain,
            telephone: this.registerForm_teacher.teacher_telephone,
            school_name: this.registerForm_teacher.teacher_school
          });
          if(res == "ok"){
            this.$message.success("注册成功！");
          }else{
            this.$message.error("注册失败！");
          }
          this.teacherCancel();
        }else{
          this.$message.error('个人信息需填写完整！');
        }
      })
    },

    async getSchool(){
      this.visible_teacher = true;
      const {data: res} = await this.$http.get("getSchool");
      this.schoolList = res;
      for(let i=0; i<this.schoolList.length; i++){
        this.schoolData.push({
          key: i,
          label: this.schoolList[i]
        })
      }
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
