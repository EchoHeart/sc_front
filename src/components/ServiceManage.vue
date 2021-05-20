<template>
  <div style="overflow: auto; height: 87%; position: absolute">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>套餐管理</el-breadcrumb-item>
      <el-breadcrumb-item>套餐设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="width: 99%; margin-top: 15px">
      套餐列表
      <el-row>
        <el-button
            type="primary"
            style="margin-top: 10px;margin-left: 895px"
            icon="el-icon-plus"
            @click="visible_addService_form = true">添加套餐</el-button>
      </el-row>

      <!--列表 border边框 stripe隔行变色-->
      <el-table :data="serviceList" border style="width: 100%" stripe>
        <el-table-column fixed prop="service_type" label="套餐类型" width="150"></el-table-column>
        <el-table-column prop="service_price" label="套餐价格" width="150"></el-table-column>
        <el-table-column prop="service_infor" label="套餐信息" width="300"></el-table-column>
        <el-table-column prop="service_usable_time" label="有效时间" width="200"></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="添加套餐" :visible.sync="visible_addService_form" :append-to-body="true">
      <el-form ref="addService_form" :model="addService_form" label-width="80px">
        <el-form-item label="套餐类型" prop="service_type">
          <el-radio-group v-model="addService_form.service_type">
            <el-radio-button label="套餐A"></el-radio-button>
            <el-radio-button label="套餐B"></el-radio-button>
            <el-radio-button label="套餐C"></el-radio-button>
            <el-radio-button label="套餐D"></el-radio-button>
            <el-radio-button label="套餐E"></el-radio-button>
            <el-radio-button label="套餐F"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="套餐价格" prop="service_price">
          <el-input v-model="addService_form.service_price" style="width: 50%" placeholder="请输入套餐价格"></el-input>
          <span>   元</span>
        </el-form-item>
        <el-form-item label="灾害类型">
          <el-checkbox-group v-model="addService_form.disaster_type">
            <el-checkbox label="应急疏散" name="evacuate"></el-checkbox>
            <el-checkbox label="泥石流" name="torrent"></el-checkbox>
            <el-checkbox label="地震" name="earthquake"></el-checkbox>
            <el-checkbox label="火灾" name="earthquake"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="套餐时间" style="width: 400px">
          <el-input-number v-model="addService_form.service_usable_time" :step="10"></el-input-number>
          <span>   天</span>
        </el-form-item>
        <el-form-item style="margin-left: 320px">
          <el-button type="info" @click="cancel">取消</el-button>
          <el-button type="primary" @click="addService">添加套餐</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "ServiceManage",
  created() {
    this.getService()
  },
  data(){
    return{
      serviceList: [],
      typeList: [],
      visible_addService_form: false,
      service_infor: '',
      addService_form: {
        service_type: '套餐A',
        service_price: '',
        disaster_type: ['应急疏散'],
        service_usable_time: 30,
      }
    }
  },
  methods: {
    async getService() {
      const {data: res} = await this.$http.get("getAllService");
      if(res.flag == "ok"){
        this.serviceList = res.object;
        for(let i=0; i<this.serviceList.length; i++){
          this.typeList.push(this.serviceList[i].service_type);
        }
      }
      else
        this.$message.error("套餐获取失败！");
    },
    cancel(){
      this.addService_form.service_type = '套餐A';
      this.addService_form.service_price = '';
      this.addService_form.disaster_type = ['应急疏散'];
      this.addService_form.service_usable_time = 30;
      this.visible_addService_form = false;
    },
    async addService(){
      for (let i = 0; i < this.addService_form.disaster_type.length; i++) {
        this.service_infor = this.service_infor + this.addService_form.disaster_type[i] + " ";
      }
      if(this.typeList.includes(this.addService_form.service_type.replace("套餐", ""))){
        this.$message.error("该类套餐已存在，请重新选择套餐类型！");
      }
      else{
        const {data: res} = await this.$http.post("addService", {
          service_type: this.addService_form.service_type.replace("套餐", ""),
          service_price: this.addService_form.service_price,
          service_infor: this.service_infor,
          service_usable_time: this.addService_form.service_usable_time
        })
        if(res == "ok"){
          this.cancel();
          await this.getService();
          this.$message.success("添加套餐成功！");
        }
        else{
          this.cancel();
          this.$message.error("添加套餐失败！");
        }
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
.el-card{
  box-shadow: 0 1px 1px rgba(0,8,10,0.15) !important;
}
</style>