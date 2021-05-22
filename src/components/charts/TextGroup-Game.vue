<template>
    <el-row :gutter="60" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" push="4" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('students')">
                <div class="card-panel-icon-wrapper icon-people">
                    <i class="el-icon-user-solid" style="font-size: 36px"></i>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        学生人数
                    </div>
                    <count-to :start-val="0" :end-val="6" :duration="2600" class="card-panel-num" />
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" push="8" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('scores')">
                <div class="card-panel-icon-wrapper icon-money">
                    <i class="el-icon-video-camera-solid" style="font-size: 36px"></i>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        均分变化
                    </div>
                    <count-to :start-val="0" :end-val="89" :duration="3200" class="card-panel-num" />
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import CountTo from 'vue-count-to'

    export default {
        name: "TextGroup",
        components: {
            CountTo
        },
        methods: {
            handleSetLineChartData (type) {
                this.$emit('handleSetLineChartData', type)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .panel-group {
        margin-top: 0;

        .card-panel-col {
            margin-bottom: 5px;
        }

        .card-panel {
            height: 60px;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            color: #666;
            background: #fff;
            box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
            border-color: rgba(0, 0, 0, .05);

            &:hover {
                .card-panel-icon-wrapper {
                    color: #fff;
                }

                .icon-people {
                    background: #40c9c6;
                }

                .icon-message {
                    background: #36a3f7;
                }

                .icon-money {
                    background: #f4516c;
                }

                .icon-shopping {
                    background: #34bfa3
                }
            }

            .icon-people {
                color: #40c9c6;
            }

            .icon-message {
                color: #36a3f7;
            }

            .icon-money {
                color: #f4516c;
            }

            .icon-shopping {
                color: #34bfa3
            }

            .card-panel-icon-wrapper {
                float: left;
                margin: 0 0 14px;
                padding: 12px;
                transition: all 0.38s ease-out;
                border-radius: 6px;
            }

            .card-panel-icon {
                float: left;
                font-size: 36px;
            }

            .card-panel-description {
                float: right;
                font-weight: bold;
                margin: 5px;

                .card-panel-text {
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 16px;
                }

                .card-panel-num {
                    font-size: 20px;
                }
            }
        }
    }

    @media (max-width:550px) {
        .card-panel-description {
            display: none;
        }

        .card-panel-icon-wrapper {
            float: none !important;
            width: 100%;
            height: 100%;
            margin: 0 !important;

            .svg-icon {
                display: block;
                margin: 14px auto !important;
                float: none !important;
            }
        }
    }
</style>
