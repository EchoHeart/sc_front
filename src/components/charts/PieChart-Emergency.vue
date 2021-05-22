<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    import resize from './resize'
    require('echarts/theme/macarons')

    export default {
        name: "PieChart-Emergency",
        mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
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
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        left: 'center',
                        bottom: '-5',
                        data: ['关卡1', '关卡2', '关卡3', '关卡4']
                    },
                    series: [
                        {
                            name: '失败人数',
                            type: 'pie',
                            roseType: 'radius',
                            radius: [15, 80],
                            center: ['50%', '45%'],
                            data: [
                                { value: 5, name: '关卡1' },
                                { value: 5, name: '关卡2' },
                                { value: 8, name: '关卡3' },
                                { value: 12, name: '关卡4' }
                            ],
                            animationEasing: 'cubicInOut',
                            animationDuration: 2600
                        }
                    ]
                })
            }
        }
    }
</script>
