<template>
    <div>
        <el-row :gutter="120" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
                <!--<div class="card-panel" @click="handleSetLineChartData('students')">-->
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-people">
                        <i class="el-icon-user-solid" style="font-size: 50px"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            学生人数
                        </div>
                        <count-to :start-val="0" :end-val=studentNum :duration="2600" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
                <!--<div class="card-panel" @click="handleSetLineChartData('teachers')">-->
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-message">
                        <i class="el-icon-s-custom" style="font-size: 50px"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            教师人数
                        </div>
                        <count-to :start-val="0" :end-val=teacherNum :duration="3000" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="60" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <div class="card-panel" @click="handleSetLineChartData('scores_Landslide')">
                    <div class="card-panel-icon-wrapper icon-money">
                        <i class="el-icon-s-data" style="font-size: 50px"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            泥石流均分
                        </div>
                        <count-to :start-val="0" :end-val=averageScore_Landslide :duration="3200" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <div class="card-panel" @click="handleSetLineChartData('scores_Earthquake')">
                    <div class="card-panel-icon-wrapper icon-money">
                        <i class="el-icon-s-data" style="font-size: 50px"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            地震均分
                        </div>
                        <count-to :start-val="0" :end-val=averageScore_Earthquake :duration="3200" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <div class="card-panel" @click="handleSetLineChartData('scores_Fire')">
                    <div class="card-panel-icon-wrapper icon-money">
                        <i class="el-icon-s-data" style="font-size: 50px"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            火灾均分
                        </div>
                        <count-to :start-val="0" :end-val=averageScore_Fire :duration="3200" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import CountTo from 'vue-count-to'

    export default {
        name: "TextGroup",
        created() {
            this.getStudentNum();
            this.getTeacherNum();
            this.getAverageScore();
        },
        components: {
            CountTo
        },
        data() {
            return{
                studentNum: '',
                teacherNum: '',
                averageScore_Landslide: '',
                averageScore_Earthquake: '',
                averageScore_Fire: '',
            }
        },
        methods: {
            handleSetLineChartData (type) {
                this.$emit('handleSetLineChartData', type)
            },
            async getStudentNum(){
                const {data: res} = await this.$http.get("getStudentNum?school_name=" + window.sessionStorage.getItem("school"))
                this.studentNum = res.count;
            },
            async getTeacherNum(){
                const {data: res} = await this.$http.get("getTeacherNum?school_name=" + window.sessionStorage.getItem("school"))
                this.teacherNum = res.count;
            },
            async getAverageScore(){
                const {data: res1} = await this.$http.get("getAverageScore?game_type="+"泥石流"+"&play_date="+"2021-05-27");
                this.averageScore_Landslide = res1;
                const {data: res2} = await this.$http.get("getAverageScore?game_type="+"地震"+"&play_date="+"2021-05-27");
                this.averageScore_Earthquake = res2;
                const {data: res3} = await this.$http.get("getAverageScore?game_type="+"火灾"+"&play_date="+"2021-05-27");
                this.averageScore_Fire = res3;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .panel-group {
        margin-top: -20px;

        .card-panel-col {
            margin-bottom: 5px;
        }

        .card-panel {
            height: 80px;
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
                padding: 16px;
                transition: all 0.38s ease-out;
                border-radius: 6px;
            }

            .card-panel-icon {
                float: left;
                font-size: 50px;
            }

            .card-panel-description {
                float: right;
                font-weight: bold;
                margin: 15px;
                margin-left: 0px;

                .card-panel-text {
                    line-height: 15px;
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 16px;
                    margin-bottom: 12px;
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
