<template>
  <div style="overflow: auto; height: 87%; width: 84%; position: absolute">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="width: 95%">
      <el-button type="primary" icon="el-icon-plus" @click="visible_studentForm = true" style="margin-bottom: 10px"></el-button>

      <!--列表 border边框 stripe隔行变色-->
      <el-table :data="studentList" border style="width: 100%" stripe>
        <el-table-column prop="user_id" label="ID" width="80"></el-table-column>
        <el-table-column fixed prop="user_name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="user_sex" label="性别" width="80"></el-table-column>
        <el-table-column prop="user_age" label="年龄" width="80"></el-table-column>
        <el-table-column prop="school_name" label="所属学校" width="200"></el-table-column>
        <el-table-column prop="teacher_name" label="所属老师" width="100"></el-table-column>
        <el-table-column prop="user_grade" label="所在年级" width="100"
                         :filters="[{text: '一年级', value: 1},{text: '二年级', value: 2},{text: '三年级', value: 3},{text: '四年级', value: 4},{text: '五年级', value: 5},{text: '六年级', value: 6}]"
                         :filter-method="filterHandler"></el-table-column>
        <el-table-column prop="user_class" label="所在班级" width="100"
                         :filters="[{text: '（1）班', value: 1},{text: '（2）班', value: 2},{text: '（3）班', value: 3},{text: '（4）班', value: 4},{text: '（5）班', value: 5},{text: '（6）班', value: 6},{text: '（7）班', value: 7},{text: '（8）班', value: 8},{text: '（9）班', value: 9},{text: '（10）班', value: 10}]"
                         :filter-method="filterHandler"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="录入学生" :visible.sync="visible_studentForm" :append-to-body="true" style="margin-top: -50px">
        <el-form ref="studentForm" :model="studentForm" label-width="80px">
          <el-form-item label="学生姓名">
            <el-input v-model="studentForm.name" style="width: 50%" placeholder="请输入学生姓名"></el-input>
          </el-form-item>
          <el-form-item label="学生性别">
            <el-radio-group v-model="studentForm.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学生年龄">
            <el-input-number v-model="studentForm.age" :min="6" :max="25"></el-input-number>
          </el-form-item>
          <el-form-item label="所属学校">
            <span>{{this.studentForm.school}}</span>
          </el-form-item>
          <el-form-item label="所属老师">
            <span>{{this.studentForm.teacher}}</span>
          </el-form-item>
          <el-form-item label="班级信息">
            <el-select v-model="studentForm.grade" placeholder="请选择年级">
              <el-option label="一年级" value="1"></el-option>
              <el-option label="二年级" value="2"></el-option>
              <el-option label="三年级" value="3"></el-option>
              <el-option label="四年级" value="4"></el-option>
              <el-option label="五年级" value="5"></el-option>
              <el-option label="六年级" value="6"></el-option>
            </el-select>
            <el-select v-model="studentForm.class" placeholder="请选择班级" style="margin-left: 15px">
              <el-option label="（1）班" value="1"></el-option>
              <el-option label="（2）班" value="2"></el-option>
              <el-option label="（3）班" value="3"></el-option>
              <el-option label="（4）班" value="4"></el-option>
              <el-option label="（5）班" value="5"></el-option>
              <el-option label="（6）班" value="6"></el-option>
              <el-option label="（7）班" value="7"></el-option>
              <el-option label="（8）班" value="8"></el-option>
              <el-option label="（9）班" value="9"></el-option>
              <el-option label="（10）班" value="10"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="this.addUser" style="margin-left: 400px">录入学生</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "ClassManage",

  created() {
    this.getUserBySchoolAndTeacher();
  },

  data() {
    return{
      visible_studentForm: false,

      studentForm: {
        name: '',
        sex: '',
        age: '',
        school: window.sessionStorage.getItem("school"),
        teacher: window.sessionStorage.getItem("name"),
        grade: '',
        class: '',
      },

      studentList: [],
    }
  },

  methods: {
    searchClass(){
      console.log(this.classForm.grade)
    },

    async getUserBySchoolAndTeacher(){
      const {data: res} = await this.$http.get("getUserBySchoolAndTeacher?school_name="+window.sessionStorage.getItem("school")+
                                                   "&teacher_name="+window.sessionStorage.getItem("name"));
      if(res.flag == "ok")
        this.studentList = res.object;
      else
        this.$message.error("获取学生信息失败！");
    },

    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    async addUser(){
      const {data: res} = await this.$http.post("addUser",{
        user_name: this.studentForm.name,
        user_sex: this.studentForm.sex,
        user_age: this.studentForm.age,
        school_name: this.studentForm.school,
        teacher_name: this.studentForm.teacher,
        user_grade: this.studentForm.grade,
        user_class: this.studentForm.class
      })
      if(res == "ok"){
        this.$message.success("录入学生成功！");
        this.$refs.studentForm.resetFields();
        this.visible_studentForm = false;

        await this.getUserBySchoolAndTeacher();
      }
    }

  }
}
</script>

<style scoped>
.el-breadcrumb{
  margin-bottom: 15px;
  font-size: 15px;
}
</style>