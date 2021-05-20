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

  </div>
</template>

<script>
export default {
  name: "ServiceBuy"
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