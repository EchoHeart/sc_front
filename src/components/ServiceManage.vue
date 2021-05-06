<template>
  <div style="overflow: auto; height: 85%; position: absolute">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>套餐管理</el-breadcrumb-item>
      <el-breadcrumb-item>套餐设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="width: 99%">
      套餐介绍
      <el-carousel type="card" height="400px" :interval="4000">
        <el-carousel-item style="width: 500px">
          <img src="../assets/earthquake.png" style="width: 500px; height: 300px">
          <div>地震灾害逃避演练</div>
        </el-carousel-item>
        <el-carousel-item style="width: 500px">
          <img src="../assets/fire.png" style="width: 500px; height: 300px">
          <div>火灾灾害逃避演练</div>
        </el-carousel-item>
        <el-carousel-item style="width: 500px">
          <img src="../assets/torrent.png" style="width: 500px; height: 300px">
          <div>泥石流灾害逃避演练</div>
        </el-carousel-item>
        <el-carousel-item style="width: 500px">
          <img src="../assets/evacuate.png" style="width: 500px; height: 300px">
          <div>应急疏散演练</div>
        </el-carousel-item>
      </el-carousel>
    </el-card>

    <el-card style="width: 99%; margin-top: 15px">
      套餐列表
      <el-row>
        <el-button type="primary" style="margin-top: 10px;margin-left: 895px" icon="el-icon-plus" @click="addService">添加套餐</el-button>
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
            <el-radio-button label="套餐A" :disabled="true"></el-radio-button>
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
          <el-button type="primary" @click="">立即创建</el-button>
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
      visible_addService_form: false,
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
      if(res.flag == "ok")
        this.serviceList = res.object;
      else
        this.$message.error("套餐获取失败！");
    },
    addService(){
      this.visible_addService_form = true;
    },
    cancel(){
      this.addService_form.service_type = '套餐A';
      this.addService_form.service_price = '';
      this.addService_form.disaster_type = [];
      this.addService_form.service_usable_time = 30;
      this.visible_addService_form = false;
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
.el-carousel__item:nth-child(2n){
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1){
  background-color: #d3dce6;
}
</style>