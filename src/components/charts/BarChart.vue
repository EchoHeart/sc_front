<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    import resize from './resize'
    require('echarts/theme/macarons')

    const animationDuration = 6000

    export default {
        name: "BarChart",
        mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '1000px'
            },
            height: {
                type: String,
                default: '200px'
            }
        },
        data () {
            return {
                chart: null
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        beforeDestroy () {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart () {
                this.chart = echarts.init(this.$el, 'macarons')

                this.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        // 坐标轴指示器，坐标轴触发有效
                        axisPointer: {
                            // 默认为直线，可选为：'line' | 'shadow'
                            type: 'shadow'
                        }
                    },
                    grid: {
                        top: 10,
                        left: 100,
                        right: 200,
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['5/16', '5/17', '5/18', '5/19', '5/20', '5/21', '5/22'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisTick: {
                            show: false
                        }
                    }],
                    series: [{
                        name: '应急疏散',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: [1, 2, 3, 5, 8, 15, 20],
                        animationDuration
                    }, {
                        name: '泥石流',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: [1, 3, 4, 12, 30, 32, 15],
                        animationDuration
                    }, {
                        name: '地震',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: [3, 5, 7, 11, 12, 15, 14],
                        animationDuration
                    }]
                })
            }
        }
    }
</script>
