<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './resize'
require('echarts/theme/macarons')

export default {
    name: "LineChart",
    mixins: [resize],
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '960px'
        },
        height: {
            type: String,
            default: '320px'
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            chart: null
        }
    },
    watch: {
        chartData: {
            handler(val) {
                this.setOptions(val);
            },
            deep: true
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
            this.setOptions(this.chartData)
        },
        // setOptions ({ expectedData, actualData } = {}) {
        setOptions ({ actualData } = {}) {
            this.chart.setOption({
                xAxis: {
                    data: ['5/21', '5/22', '5/23', '5/24', '5/25', '5/26', '5/27'],
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    }
                },
                grid: {
                    left: 100,
                    right: 100,
                    bottom: 20,
                    top: 30,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    padding: [5, 10]
                },
                yAxis: {
                    axisTick: {
                        show: false
                    }
                },
                legend: {
                    // data: ['期望值', '实际值']
                    data: ['均分变化']
                },
                series: [
                    // {
                    // name: '期望值',
                    // itemStyle: {
                    //     normal: {
                    //         color: '#FF005A',
                    //         lineStyle: {
                    //             color: '#FF005A',
                    //             width: 2
                    //         }
                    //     }
                    // },
                    // smooth: true,
                    // type: 'line',
                    // data: expectedData,
                    // animationDuration: 2800,
                    // animationEasing: 'cubicInOut'
                    // },
                    {
                        name: '均分变化',
                        smooth: true,
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: '#3888fa',
                                lineStyle: {
                                    color: '#3888fa',
                                    width: 2
                                },
                                areaStyle: {
                                    color: '#f3f8ff'
                                }
                            }
                        },
                        data: actualData,
                        animationDuration: 2800,
                        animationEasing: 'quadraticOut'
                    }]
            }, true, false)
        }
    }
}
</script>
