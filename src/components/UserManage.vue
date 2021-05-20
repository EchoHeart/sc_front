<template>
  <div style="overflow: auto; height: 87%; width: 84%; position: absolute">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!--校长列表主体部分-->
    <el-card style="width: 99%">
      校长列表
      <el-row>
        <el-col :span="10">
          <!--搜索区域-->
          <el-input
              placeholder="请输入搜索内容"
              style="margin-top: 10px"
              v-model="queryInfo_headmaster.query"
              clearable
              @clear="getHeadmaster">
            <el-button slot="append" icon="el-icon-search" @click="getHeadmaster"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!--列表 border边框 stripe隔行变色-->
      <el-table :data="headmasterList" border style="width: 100%" stripe>
        <el-table-column prop="headmaster_id" label="ID" width="50"></el-table-column>
        <el-table-column fixed prop="headmaster_name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="password" label="密码" width="200"></el-table-column>
        <el-table-column prop="telephone" label="电话号码" width="200"></el-table-column>
        <el-table-column prop="school_name" label="所属学校" width="250"></el-table-column>
        <el-table-column prop="state" label="状态" width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" :active-value="1" :inactive-value="0" active-color="green" disabled></el-switch>
          </template>-->
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteHeadmaster(scope.row.headmaster_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div align="center">
        <el-pagination
            @size-change="headmasterSizeChange"
            @current-change="headmasterCurrentChange"
            :current-page="this.queryInfo_headmaster.pageNum"
            :page-sizes="[4, 6, 8, 10]"
            :page-size="this.queryInfo_headmaster.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total_headmaster">
        </el-pagination>
      </div>
    </el-card>

    <!--老师列表主体部分-->
    <el-card style="margin-top: 10px; width: 99%">
      老师列表
      <el-row>
        <el-col :span="10">
          <!--搜索区域-->
          <el-input
              placeholder="请输入搜索内容"
              style="margin-top: 10px"
              v-model="queryInfo_teacher.query"
              clearable
              @clear="getTeacher">
            <el-button slot="append" icon="el-icon-search" @click="getTeacher"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!--列表 border边框 stripe隔行变色-->
      <el-table :data="teacherList" border style="width: 100%" stripe>
        <el-table-column prop="teacher_id" label="ID" width="50"></el-table-column>
        <el-table-column fixed prop="teacher_name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="password" label="密码" width="200"></el-table-column>
        <el-table-column prop="telephone" label="电话号码" width="200"></el-table-column>
        <el-table-column prop="school_name" label="所属学校" width="250"></el-table-column>
        <el-table-column prop="state" label="状态" width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" :active-value="1" :inactive-value="0" active-color="green" disabled></el-switch>
          </template>-->
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteTeacher(scope.row.teacher_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div align="center">
        <el-pagination
            @size-change="teacherSizeChange"
            @current-change="teacherCurrentChange"
            :current-page="this.queryInfo_teacher.pageNum"
            :page-sizes="[4, 6, 8, 10]"
            :page-size="this.queryInfo_teacher.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total_teacher">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserManage",
  created() {
    this.getHeadmaster();
    this.getTeacher();
  },
  data(){
    return{
      //校长查询信息
      queryInfo_headmaster: {
        query: '', //查询条件
        pageNum: 1, //当前页
        pageSize: 4 //每页最大数
      },
      //老师查询信息
      queryInfo_teacher: {
        query: '', //查询条件
        pageNum: 1, //当前页
        pageSize: 4 //每页最大数
      },
      headmasterList: [],
      teacherList: [],
      total_headmaster: 0, //校长记录数
      total_teacher: 0, //老师记录数
    }
  },
  methods:{
    //获取校长列表
    async getHeadmaster(){
      const {data: res} = await this.$http.get("getHeadmaster",{params: this.queryInfo_headmaster});
      this.headmasterList = res.object;
      this.total_headmaster = res.count;
    },

    //pageSize触发事件
    headmasterSizeChange(newSize){
      this.queryInfo_headmaster.pageSize = newSize;
      this.getHeadmaster();
    },

    //pageNum触发事件
    headmasterCurrentChange(newPage){
      this.queryInfo_headmaster.pageNum = newPage;
      this.getHeadmaster();
    },

    //获取老师列表
    async getTeacher(){
      const {data: res} = await this.$http.get("getTeacher",{params: this.queryInfo_teacher});
      this.teacherList = res.object;
      this.total_teacher = res.count;
    },

    //pageSize触发事件
    teacherSizeChange(newSize){
      this.queryInfo_teacher.pageSize = newSize;
      this.getTeacher();
    },

    //pageNum触发事件
    teacherCurrentChange(newPage){
      this.queryInfo_teacher.pageNum = newPage;
      this.getTeacher();
    },

    //删除校长
    async deleteHeadmaster(headmaster_id){
      const confirmResult = await this.$confirm("此操作将永久删除该用户，是否继续？","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(confirmResult != 'confirm')
        return this.$message.info("已取消删除");
      else{
        const {data: res} = await this.$http.delete("deleteHeadmaster?headmaster_id=" + headmaster_id);
        if(res != "ok")
          return this.$message.error("删除失败");
        this.$message.success("删除成功");
        await this.getHeadmaster();
      }
    },

    //删除老师
    async deleteTeacher(teacher_id){
      const confirmResult = await this.$confirm("此操作将永久删除该用户，是否继续？","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(confirmResult != 'confirm')
        return this.$message.info("已取消删除");
      else{
        const {data: res} = await this.$http.delete("deleteTeacher?teacher_id=" + teacher_id);
        if(res != "ok")
          return this.$message.error("删除失败");
        this.$message.success("删除成功");
        await this.getTeacher();
      }
    },
  }
}
</script>

<style scoped>
.el-breadcrumb{
  margin-bottom: 15px;
  font-size: 15px;
}
.el-card{
  box-shadow: 0 1px 1px rgba(0,8,10,0.15) !important;
}
.el-scrollbar{
  height: 90%;
}
</style>