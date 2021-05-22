<template>
    <div class="dashboard-editor-container">
        <!--！！！命名！！！-->
        <text-group @handleSetLineChartData="handleSetLineChartData" />

        <el-row class="chart-wrapper">
            <el-col :xs="24" :sm="24" :lg="8" push="-1">
                <line-chart :chart-data="lineChartData" />
            </el-col>
        </el-row>

        <el-row class="chart-wrapper">
            <el-col :xs="24" :sm="24" :lg="8" push="1">
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
        students: {
            expectedData: [20, 40, 60, 80, 100, 120, 140],
            actualData: [0, 0, 3, 5, 5, 10, 10]
        },
        teachers: {
            expectedData: [2, 4, 6, 8, 10, 12, 14],
            actualData: [0, 1, 3, 5, 7, 9, 9]
        },
        scores: {
            expectedData: [40, 60, 70, 80, 90, 95, 99],
            actualData: [0, 0, 60, 70, 70, 75, 89]
        },
        questions: {
            expectedData: [0, 10, 20, 40, 60, 100, 150],
            actualData: [5, 15, 30, 40, 60, 65, 70]
        }
    }

    export default {
        name: 'SchoolInfo',
        components: {
            TextGroup,
            LineChart,
            BarChart
        },
        data () {
            return {
                lineChartData: lineChartData.students
            }
        },
        methods: {
            handleSetLineChartData (type) {
                this.lineChartData = lineChartData[type]
            }
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
