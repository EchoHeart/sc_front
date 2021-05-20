<template>
  <div style="overflow: auto; height: 86%; width: 84%; position: absolute">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教学管理</el-breadcrumb-item>
      <el-breadcrumb-item>安排课程</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="container">
      <!--预约时间-->
      <div class="scroll-view scroll-view_H">
        <div class='list' style="width: 1050px">
          <div v-for="(item,index) in calendar" :key="index" @click="select(index)"
               class='listItem' :class='[index===currentIndex? "current":""]'>
            <div class='text name'>{{ item.week }}</div>
            <div class='text date'>{{ item.date }}</div>
          </div>
        </div>
      </div>
      <div class="time">
        <div v-for="(timeItem,timeIndex) in timeArr" :key="timeIndex" @click="selectTime(timeIndex)"
             class="listItem" :class='[currentTime===timeIndex? "current":""]'>
          <div class="text">时间：{{ timeItem.time }}</div>
          <div v-show="timeItem.status == '0'">
            <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                style="margin-top: 10px"></el-button>
          </div>
          <div class="text" v-show="timeItem.status == '1'">课程：{{timeItem.lesson}}</div>
          <div class="text" v-show="timeItem.status == '1'">老师：{{timeItem.teacher}}</div>
          <div class="text" v-show="timeItem.status == '-1'">课间休息</div>
        </div>
      </div>
    </div>

    <el-dialog
        :visible.sync="visible_classForm"
        :append-to-body="true" title="添加课程">
      <el-form ref="classForm" :model="classForm">
        <el-form-item label="日期" style="margin-left: 20px">
          {{this.classForm.date}}
        </el-form-item>
        <el-form-item label="时间" style="margin-left: 20px">
          {{this.classForm.time}}
        </el-form-item>
        <el-form-item label="课程" style="margin-left: 20px">
          <el-radio-group v-model="classForm.class">
            <el-radio label="应急疏散" v-bind:disabled="disabled_1">应急疏散</el-radio>
            <el-radio label="泥石流" v-bind:disabled="disabled_2">泥石流</el-radio>
            <el-radio label="地震" v-bind:disabled="disabled_3">地震</el-radio>
            <el-radio label="火灾" v-bind:disabled="disabled_4">火灾</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="老师" style="margin-left: 20px">
          <el-input v-model="classForm.teacher" style="width: 35%"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 20px">
          <el-button type="primary" style="margin-left: 70%" @click="addLesson">添加课程</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "ClassManage",
  data(){
    return {
      today: '',
      teacher_name: window.sessionStorage.getItem("name"),

      visible_classForm: false,
      disabled_1: true,
      disabled_2: true,
      disabled_3: true,
      disabled_4: true,

      classForm: {
        date: '',
        time: '',
        class: '应急疏散',
        teacher: window.sessionStorage.getItem("name")
      },

      calendar: [],
      twoCalendar: [],
      maxDays: 7,
      currentIndex: 0,
      currentTime: 0,
      timeArr: [],
      dateArr: [],
      cur_date: [],

      //课程表
      lessonList: [],
      //套餐内容表
      serviceList: [],

      //-1:休息 0:可排 1:已排
      allTimeArr: [
        { "time": "8:15-9:00", "lesson": "", "teacher": "", "status": "0" },
        { "time": "9:00-9:10", "lesson": "", "teacher": "", "status": "-1" },
        { "time": "9:10-9:55", "lesson": "", "teacher": "", "status": "0" },
        { "time": "9:55-10:15", "lesson": "", "teacher": "", "status": "-1" },
        { "time": "10:15-10:55", "lesson": "", "teacher": "", "status": "0" },
        { "time": "10:55-11:10", "lesson": "", "teacher": "", "status": "-1" },
        { "time": "11:10-11:55", "lesson": "", "teacher": "", "status": "0" },
        { "time": "11:55-13:50", "lesson": "", "teacher": "", "status": "-1" },
        { "time": "13:50-14:35", "lesson": "", "teacher": "", "status": "0" },
        { "time": "14:35-14:45", "lesson": "", "teacher": "", "status": "-1" },
        { "time": "14:45-15:30", "lesson": "", "teacher": "", "status": "0" },
        { "time": "15:30-15:40", "lesson": "", "teacher": "", "status": "-1" },
        { "time": "15:40-16:25", "lesson": "", "teacher": "", "status": "0" },
        { "time": "16:25-16:55", "lesson": "", "teacher": "", "status": "-1" },
        { "time": "16:55-17:40", "lesson": "", "teacher": "", "status": "0" },
        { "time": "17:40-17:50", "lesson": "", "teacher": "", "status": "-1" },
        { "time": "17:50-18:35", "lesson": "", "teacher": "", "status": "0" },
        { "time": "18:35-19:20", "lesson": "", "teacher": "", "status": "-1" },
        { "time": "19:20-20:05", "lesson": "", "teacher": "", "status": "0" },
        { "time": "20:05-20:15", "lesson": "", "teacher": "", "status": "-1" },
        { "time": "20:15-21:00", "lesson": "", "teacher": "", "status": "0" },
        { "time": "21:00-21:10", "lesson": "", "teacher": "", "status": "-1" },
        { "time": "21:10-21:55", "lesson": "", "teacher": "", "status": "0" }
      ]
    }
  },
  mounted() {
    this.timeArr = this.allTimeArr;
    const that = this

    //获取当前日期
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_date = date.getDate();
    this.cur_date = cur_date;

    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];

    //当前月份的天数
    let monthLength = that.getThisMonthDays(cur_year, cur_month)

    // 下个月
    let next_date = 1;
    let next_month = date.getMonth() + 2;
    let next_year = date.getFullYear();
    if (next_month > 12) {
      next_month = 1;
      next_year = date.getFullYear() + 1;
    }
    //下个月份的天数
    let nextMonthLength = that.getThisMonthDays(next_year, next_month)

    //利用构造函数创建对象
    function calendar(date, week, cur_month, cur_year) {
      this.date = [cur_year, cur_month, date].map(that.utils().formatNumber).join('-');
      if (date == cur_date) {
        this.week = "今天";
      } else {
        this.week = '星期' + week;
      }
    }

    //当前月份的第一天是星期几
    let week = that.getFirstDayOfWeek(cur_year, cur_month)

    let x = week;
    for (let i = 1; i <= monthLength; i++) {
      //当循环完一周后，初始化再次循环
      if (x > 6) {
        x = 0;
      }
      //利用构造函数创建对象
      that.twoCalendar[i] = new calendar(i, [weeks_ch[x]][0], cur_month, cur_year)
      x++;
    }

    let next_week = that.getFirstDayOfWeek(next_year, next_month);
    let next_x = next_week;
    for (let i = 1; i <= nextMonthLength; i++) {
      //当循环完一周后，初始化再次循环
      if (next_x > 6) {
        next_x = 0;
      }
      //利用构造函数创建对象
      that.twoCalendar[monthLength + i] = new calendar(i, [weeks_ch[next_x]][0], next_month, next_year)
      next_x++;
    }

    that.getCalenderByDay(that.maxDays, that.cur_date, that.twoCalendar)
    that.today = that.calendar[0].date

    //获取当天排课信息
    that.getLesson(that.teacher_name,that.today)

  },
  methods: {
    // 获取当月天数
    getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    },
    // 计算每月第一天是星期几
    getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },

    utils(){
      const formatTime = date => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
      }

      const formatDate = date => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return [year, month, day].map(formatNumber).join('-')
      }
      const formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0' + n
      }
      const dateDiff = (firstDate, secoundDate) => {
        // 如果 firstDate >= secoundDate 返回true 反之 false
        return new Date(firstDate) - new Date(secoundDate) >= 0
      }
      return {
        formatTime,
        formatDate,
        formatNumber,
        dateDiff
      }
    },

    // 日期赋值(原)
    getCalenderByDay(maxDays, current_date, twoCalendar) {
      const that = this;
      //限制要渲染的日历数据天数为7天以内（用户体验）
      let flag = twoCalendar.slice(current_date, twoCalendar.length - current_date <= maxDays ? twoCalendar.length : (current_date + maxDays));
      that.calendar = flag;
    },

    select: function (index) {
      //为上半部分的点击事件
      this.currentIndex = index;
      this.currentTime = 0;
      this.today = this.calendar[this.currentIndex].date;

      //重新获取排课信息
      this.getLesson(this.teacher_name,this.today);
    },

    //为下半部分的点击事件
    selectTime: async function (index) {
      if (this.timeArr[index].status == "0") {
        this.currentTime = index;

        const {data: res} = await this.$http.get("getServiceType?school_name=" + window.sessionStorage.getItem("school"));
        if(res == "There is no service")
          this.$message.info("所在学校未购买任何套餐！");
        else{
          this.getService(res);

          this.classForm.date = this.calendar[this.currentIndex].date;
          this.classForm.time = this.timeArr[this.currentTime].time;
          this.visible_classForm = true;
        }
      }
      else
        this.$message.error("该时间段内不允许排课！");
    },

    //添加课程
    async addLesson(){
      const {data: res} = await this.$http.post("addLesson",{
        lesson_name: this.classForm.class,
        teacher_name: this.classForm.teacher,
        lesson_date: this.classForm.date,
        lesson_time: this.classForm.time
      })
      if(res == "ok"){
        //重新获取排课信息
        this.getLesson(this.teacher_name,this.today);

        this.classForm.class = "应急疏散";
        this.visible_classForm = false;

        this.$message.success("添加课程成功！");
      }
      else{
        this.$message.error("添加课程失败！");
      }
    },

    //获取排课信息
    async getLesson(teacher, date){
      const {data: res} = await this.$http.get("getLesson?teacher_name="+teacher+"&lesson_date="+date)
      if(res.flag == "ok"){
        this.lessonList = res.object;

        this.default();
        if(this.lessonList.length != 0){
          for(let i=0; i<this.lessonList.length; i++){
            for(let j=0; j<this.timeArr.length; j++){
              let temp = this.timeArr[j];
              if(temp.time == this.lessonList[i].lesson_time){
                temp.lesson = this.lessonList[i].lesson_name;
                temp.teacher = this.lessonList[i].teacher_name;
                temp.status = 1;
              }//if
            }//for
          }//for
        }//if

      }
      else{
        this.$message.error("获取课程失败！")
      }
    },

    //课表信息恢复默认
    default(){
      for(let i=0; i<this.timeArr.length; i++){
        let temp = this.timeArr[i];
        temp.lesson = '';
        temp.teacher = '';
        if(temp.status == 1)
          temp.status = 0;
      }
    },

    //获取套餐信息
    async getService(service_type) {
      const {data: res} = await this.$http.get("getServiceInfo?service_type="+service_type);
      if(res.split(" ").indexOf("应急疏散") != -1)
        this.disabled_1 = false;
      if(res.split(" ").indexOf("泥石流") != -1)
        this.disabled_2 = false;
      if(res.split(" ").indexOf("地震") != -1)
        this.disabled_3 = false;
      if(res.split(" ").indexOf("火灾") != -1)
        this.disabled_4 = false;
    }

  }
}
</script>

<style scoped>
.el-breadcrumb{
  margin-bottom: 15px;
  font-size: 15px;
}
.scroll-view{
  height: 100px;
  width: 1050px;
  overflow: auto;
}
.scroll-view .listItem{
  text-align: center;
  width: 150px;
  height: 80px;
  background-color: #f1f2f6;
  padding-top: 8px;
  box-sizing: border-box;
  display: inline-block;
}
.scroll-view .listItem text{
  display: block;
}
.scroll-view .listItem .name{
  font-size: 20px;
}
.scroll-view .listItem .date{
  font-size: 20px;
}
.scroll-view .current{
  background-color: #76aef8;
}
.scroll-view .current .text{
  color: #fff;
}

.time{
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 auto;
  margin-top: 5px;
}
.time .listItem{
  width: 25%;
  height: 100px;
  text-align: center;
  box-sizing: border-box;
  background-color: #fff;
  padding-top: 18px;
  border: 1px solid #b9c1c8;
}
.time .listItem text{
  display: block;
  font-size: 21px;
}
.time .current{
  background-color: #e2e2e2;
}
.operate button{
  width:300px;
  height: 88px;
  background-color: #fff;
}
.operate .del{
  color: #e54449;
}
.operate button::after{
  border: 2px solid #e54449;
}
.operate{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.operate button:nth-child(2):after{
  border: 2px solid #e54449;
}
.operate .save{
  color: #fff;
  background-color: #e54449;

}
.operate{
  width: 100%;
  padding: 30px 0;
  background-color: #fff;
  position: fixed;
  bottom: 0;
}
</style>