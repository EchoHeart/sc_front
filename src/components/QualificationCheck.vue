<template>
  <div style="overflow: auto; height: 85%; position: absolute">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>资质审核</el-breadcrumb-item>
    </el-breadcrumb>

    <!--校长资质审核-->
    <el-card>
      校长资质审核
      <el-transfer
          style="text-align: left; margin-top: 20px; margin-left: 150px"
          v-model="headmaster_value"
          :render-content="renderFunc"
          :titles="['待审核校长列表', '已通过校长列表']"
          :button-texts="['取消通过', '确认通过']"
          :format="{noChecked: '${total}', hasChecked: '${checked}/${total}'}"
          :data="headmaster_data">
        <el-button
            class="transfer-footer"
            slot="left-footer"
            size="small"
            type="primary"
            @click="headmaster_generateData"
            :disabled="click_1"
            icon="el-icon-refresh">刷新</el-button>
        <el-button
            class="transfer-footer"
            slot="right-footer"
            size="small"
            type="primary"
            @click="headmaster_submit"
            icon="el-icon-check">提交</el-button>
      </el-transfer>
    </el-card>

    <!--老师资质审核-->
    <el-card style="margin-top: 15px">
      老师资质审核
      <el-transfer
          style="text-align: left; margin-top: 20px; margin-left: 150px"
          v-model="teacher_value"
          filterable
          :render-content="renderFunc"
          :titles="['待审核老师列表', '已通过老师列表']"
          :button-texts="['取消通过', '确认通过']"
          :format="{noChecked: '${total}', hasChecked: '${checked}/${total}'}"
          :data="teacher_data">
        <el-button
            class="transfer-footer"
            slot="left-footer"
            size="small"
            type="primary"
            @click="teacher_generateData"
            :disabled="click_2"
            icon="el-icon-refresh">刷新</el-button>
        <el-button
            class="transfer-footer"
            slot="right-footer"
            size="small"
            type="primary"
            @click="teacher_submit"
            icon="el-icon-check">提交</el-button>
      </el-transfer>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "QualificationCheck",
  created() {
    this.getHeadmaster();
    this.getTeacher();
  },
  data() {
    return {
      click_1: false,
      click_2: false,

      headmaster_data: [],
      teacher_data: [],

      headmaster_value: [],
      teacher_value: [],

      headmasterList: [],
      teacherList: [],

      headmaster_return: [],
      teacher_return: [],

      renderFunc(h, option) {
        return <span>{ option.key } - { option.label }</span>;
      },
    };
  },
  methods: {
    async getHeadmaster() {
      const {data: res} = await this.$http.get("getHeadmasterByState");
      this.headmasterList = res;
    },
    async getTeacher() {
      const {data: res} = await this.$http.get("getTeacherByState");
      this.teacherList = res;
    },
    headmaster_generateData(){
      for(let i=0; i<this.headmasterList.length; i++){
        this.headmaster_data.push({
          key: i+1,
          label: this.headmasterList[i]
        })
      }
      this.click_1 = true;
    },
    teacher_generateData(){
      for(let i=0; i<this.teacherList.length; i++){
        this.teacher_data.push({
          key: i+1,
          label: this.teacherList[i]
        })
      }
      this.click_2 = true;
    },
    async headmaster_submit() {
      for (let i = 0; i < this.headmaster_value.length; i++) {
        this.headmaster_return.push(this.headmaster_data[this.headmaster_value[i] - 1].label);
      }
      const {data: res} = await this.$http.post("editHeadmasterByState", this.headmaster_return);
      if(res == "ok")
        this.$message.success("审核成功");
      else
        this.$message.error("审核失败");
      this.headmaster_value = [];
      this.headmaster_data = [];
      await this.getHeadmaster();
      this.headmaster_generateData();
    },
    async teacher_submit() {
      for (let i = 0; i < this.teacher_value.length; i++) {
        this.teacher_return.push(this.teacher_data[this.teacher_value[i] - 1].label);
      }
      const {data: res} = await this.$http.post("editTeacherByState", this.teacher_return);
      if (res == "ok")
        this.$message.success("审核成功");
      else
        this.$message.error("审核失败");
      this.teacher_value = [];
      this.teacher_data = [];
      await this.getTeacher();
      this.teacher_generateData();
    }
  }
}
</script>

<style scoped>
.transfer-footer {
  margin-left: 140px;
  padding: 6px 5px;
  ;
}
.el-breadcrumb{
  margin-bottom: 15px;
  font-size: 15px;
}
.el-card{
  box-shadow: 0 1px 1px rgba(0,8,10,0.15) !important;
  width: 1060px;
}
</style>