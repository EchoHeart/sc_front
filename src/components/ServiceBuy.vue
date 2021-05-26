
<template>
  <div style="overflow: auto; height: 87%; width: 84%; position: absolute">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>套餐管理</el-breadcrumb-item>
      <el-breadcrumb-item>套餐购买</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="width: 99%; margin-top: 15px">
      课程介绍
      <el-carousel type="card" height="450px" :interval="3000">
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

      <!--列表 border边框 stripe隔行变色-->
      <el-table :data="serviceList" border style="width: 100%;margin-top: 30px" stripe>
        <el-table-column fixed prop="service_type" label="套餐类型" width="150"></el-table-column>
        <el-table-column prop="service_price" label="套餐价格" width="150"></el-table-column>
        <el-table-column prop="service_infor" label="套餐信息" width="300"></el-table-column>
        <el-table-column prop="service_usable_time" label="有效时间" width="200"></el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button type="success" size="small" icon="el-icon-check" @click="buyService(scope.row)">购买</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
  import moment from 'moment'
export default {
  name: "ServiceBuy",
  created() {
    this.getService()
  },
  data(){
    return{
      serviceList: [],
      start_time: "",
      end_time: ""
    }
  },
  methods: {
    //获取套餐信息
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
    //购买套餐
    async buyService(e){
      //获取当前日期
      this.start_time=moment().format('YYYY-MM-DD');

      //按套餐计算截止日期
      if(e.service_type == "A"){
        this.end_time=moment().add(30,'days').format('YYYY-MM-DD');
      }
      if(e.service_type == "B"){
        this.end_time=moment().add(60,'days').format('YYYY-MM-DD');
      }
      if(e.service_type == "C"){
        this.end_time=moment().add(90,'days').format('YYYY-MM-DD');
      }
      console.log(this.end_time)
      const {data: res} = await this.$http.post("buyService" , {
        school_name: window.sessionStorage.getItem("school"),
        service_type: e.service_type,
        start_time: this.start_time,
        end_time: this.end_time
      })
      if(res == "ok"){
        this.$message.success("购买套餐成功！");
      }
      else{
        this.$message.error("购买套餐失败！");
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
.el-carousel__item{
  background-color: #d3dce6;
}
</style>