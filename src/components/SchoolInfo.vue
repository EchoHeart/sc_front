<template>
    <div class="dashboard-editor-container">
        <!--！！！命名！！！-->
        <text-group @handleSetLineChartData="handleSetLineChartData" />
        <!--<text-group />-->

        <el-row class="chart-wrapper">
            <el-col :xs="24" :sm="24" :lg="8" :push="-1">
                <line-chart :chart-data="lineChartData" />
            </el-col>
        </el-row>

        <el-row class="chart-wrapper">
            <el-col :xs="24" :sm="24" :lg="8" :push="1">
                <div>
                    <bar-chart />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TextGroup from './charts/TextGroup'
    import LineChart from './charts/LineChart'
    import BarChart from './charts/BarChart'

    const lineChartData = {
        scores_Landslide: {
            // expectedData: [40, 60, 70, 80, 90, 95, 99],
            actualData: [0,0,0,0,0,0,0]
        },
        scores_Earthquake: {
            actualData: [0,0,0,0,0,0,0]
        },
        scores_Fire: {
            actualData: [0,0,0,0,0,0,0]
        },
    }

    export default {
        name: 'SchoolInfo',
        components: {
            TextGroup,
            LineChart,
            // BarChart
        },
        created() {
          this.getAverageScore();
        },
        data () {
            return {
                lineChartData: lineChartData.scores_Landslide,
                dateList: ['2021-05-21', '2021-05-22', '2021-05-23', '2021-05-24', '2021-05-25', '2021-05-26', '2021-05-27'],
            }
        },
        methods: {
            handleSetLineChartData (type) {
                this.lineChartData = lineChartData[type]
            },
            async getAverageScore(){
                for(let i=0; i<this.dateList.length; i++){
                    const {data: res1} = await this.$http.get("getAverageScore?game_type="+"泥石流"+"&play_date="+this.dateList[i]);
                    lineChartData.scores_Landslide.actualData[i] = res1;
                    const {data: res2} = await this.$http.get("getAverageScore?game_type="+"地震"+"&play_date="+this.dateList[i]);
                    lineChartData.scores_Earthquake.actualData[i] = res2;
                    const {data: res3} = await this.$http.get("getAverageScore?game_type="+"火灾"+"&play_date="+this.dateList[i]);
                    lineChartData.scores_Fire.actualData[i] = res3;
                }
            },
        }
    }
</script>

<!--https://blog.csdn.net/weixin_42752574/article/details/115816585-->
<!--解决Syntax Error: TypeError: this.getOptions is not a function错误-->
<!--https://blog.csdn.net/weixin_45414277/article/details/112902591-->
<!--解决node-sass、sass-loader、webpack版本冲突-->
<style scoped lang="scss">
    .dashboard-editor-container {
        padding: 32px;
        background-color: #f6f6f6;
        position: relative;
        margin: -15px 0 0 0;

        .chart-wrapper {
            background: #fff;
            padding: 0 0 0;
            margin-bottom: 5px;
        }
    }

    @media (max-width:1024px) {
        .chart-wrapper {
            padding: 8px;
        }
    }
</style>
