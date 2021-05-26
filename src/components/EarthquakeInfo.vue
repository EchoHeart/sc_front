<template>
    <div class="dashboard-editor-container">
        <text-group @handleSetLineChartData="handleSetLineChartData" />

        <el-row style="background:#fff" class="chart-wrapper">
            <el-col :xs="24" :sm="24" :lg="8">
                <line-chart :chart-data="LineChartData" />
            </el-col>
        </el-row>

        <el-row :gutter="64">
            <el-col :xs="24" :sm="24" :lg="80" class="chart-wrapper">
                <pie-chart />
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TextGroup from './charts/TextGroup-Game'
    import LineChart from './charts/LineChart'
    import PieChart from './charts/PieChart-Earthquake'

    const LineChartData = {
        students: {
            expectedData: [20, 40, 60, 80, 100, 120, 140],
            actualData: [0, 0, 1, 3, 4, 4, 6]
        },
        scores: {
            expectedData: [40, 60, 70, 80, 90, 95, 99],
            actualData: [0, 0, 30, 60, 80, 70, 89]
        },
    }

    export default {
        name: "EarthquakeInfo",
        components: {
            TextGroup,
            LineChart,
            PieChart,
        },
        data () {
            return {
                LineChartData: LineChartData.students
            }
        },
        methods: {
            handleSetLineChartData (type) {
                this.LineChartData = LineChartData[type]
            }
        }
    }
</script>

<style scoped lang="scss">
    .dashboard-editor-container {
        padding: 32px;
        background-color: #f6f6f6;
        position: relative;
        margin: -48px 0 0 -32px;

        .chart-wrapper {
            background: #fff;
            padding: 16px 16px 0;
            margin-bottom: 5px;
        }
    }

    @media (max-width:1024px) {
        .chart-wrapper {
            padding: 8px;
        }
    }
</style>
