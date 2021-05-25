<template>
    <div style="overflow: auto; height: 85%; position: absolute">
        <!--面包屑导航区-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>教学管理</el-breadcrumb-item>
            <el-breadcrumb-item>题库管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!--题库列表主体部分-->
        <el-card style="width: 72%">
            题库列表
            <el-row>
                <el-col :span="10">
                    <!--搜索区域-->
                    <el-input
                            placeholder="请输入搜索内容"
                            style="margin-top: 10px"
                            v-model="queryInfo_question.query"
                            clearable
                            @clear="getQuestion">
                        <el-button slot="append" icon="el-icon-search" @click="getQuestion"></el-button>
                    </el-input>
                </el-col>

                <el-button type="primary" plain style="margin-left: 30px; margin-top: 10px" @click="visible_addQuestion_form = true">添加问题</el-button>

            </el-row>

            <!--问题列表-->
            <el-table :data="questionList" border style="width: 100%;margin-top:5px" class="tb-edit" stripe>
                <el-table-column fixed prop="question_id" label="ID" width="50"></el-table-column>
                <el-table-column prop="game_type" label="游戏模块" width="100">
                </el-table-column>
                <el-table-column prop="question_answer" label="问题答案" width="100"></el-table-column>
                <el-table-column prop="question_description" label="问题描述" width="200"></el-table-column>
                <el-table-column prop="option_A_description" label="A选项" width="200"></el-table-column>
                <el-table-column prop="option_B_description" label="B选项" width="200"></el-table-column>
                <el-table-column prop="option_C_description" label="C选项" width="200"></el-table-column>
                <el-table-column prop="option_D_description" label="D选项" width="200"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" icon="el-icon-edit" @click="">编辑</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="deletequestion(scope.row.question_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!---->


            <!--分页-->
            <div align="center">
                <el-pagination
                        @size-change="questionSizeChange"
                        @current-change="questionCurrentChange"
                        :current-page="this.queryInfo_question.pageNum"
                        :page-sizes="[4, 6, 8, 10]"
                        :page-size="this.queryInfo_question.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="this.total_question">
                </el-pagination>
            </div>
        </el-card>

        <!--添加问题-->
        <el-dialog title="添加问题" :visible.sync="visible_addQuestion_form" :append-to-body="true">
            <el-form ref="addQuestion_form" :rules="formRules" :model="addQuestion_form" label-width="80px">
                <el-select v-model="addQuestion_form.game_type" placeholder="游戏模块" prop="game_type" style="margin-bottom: 20px">
                    <el-option label="应急疏散" value="应急疏散"></el-option>
                    <el-option label="泥石流" value="泥石流"></el-option>
                    <el-option label="地震" value="地震"></el-option>
                    <el-option label="火灾" value="火灾"></el-option>
                </el-select>

                <el-form-item label="问题描述" prop="question_description">
                    <el-input v-model="addQuestion_form.question_description"></el-input>
                </el-form-item>
                <el-form-item label="A选项" prop="option_A_description">
                    <el-input v-model="addQuestion_form.option_A_description"></el-input>
                </el-form-item>
                <el-form-item label="B选项" prop="option_B_description">
                    <el-input v-model="addQuestion_form.option_B_description"></el-input>
                </el-form-item>
                <el-form-item label="C选项" prop="option_C_description">
                    <el-input v-model="addQuestion_form.option_C_description"></el-input>
                </el-form-item>
                <el-form-item label="D选项" prop="option_D_description">
                    <el-input v-model="addQuestion_form.option_D_description"></el-input>
                </el-form-item>

                <el-select v-model="addQuestion_form.question_answer" placeholder="正确答案" prop="question_answer">
                    <el-option label="A选项" value="A"></el-option>
                    <el-option label="B选项" value="B"></el-option>
                    <el-option label="C选项" value="C"></el-option>
                    <el-option label="D选项" value="D"></el-option>
                </el-select>

                <el-form-item style="margin-left: 320px">
                    <el-button type="info" @click="cancel">取消</el-button>
                    <el-button type="primary" @click="addQuestion">立即创建</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "QuestionBank",
        created() {
            this.getQuestion();
        },
        data(){
            return{
                //校长查询信息
                queryInfo_question: {
                    query: '', //查询条件
                    pageNum: 1, //当前页
                    pageSize: 4 //每页最大数
                },
                questionList: [],
                total_question: 0, //问题记录数

                //设置添加问题表单不可见
                visible_addQuestion_form: false,

                //添加问题的表单
                addQuestion_form: {
                    game_type: '',
                    question_description: '',
                    option_A_description: '',
                    option_B_description: '',
                    option_C_description: '',
                    option_D_description: '',
                    question_answer: '',
                },

                // 表单验证
                formRules: {
                    game_type: [
                        {required:true, message:"请选择游戏模块", trigger:"blur"}
                    ],
                    question_description: [
                        {required:true, message:"请输入问题描述", trigger:"blur"}
                    ],
                    option_A_description: [
                        {required:true, message:"请输入选项A", trigger:"blur"}
                    ],
                    option_B_description: [
                        {required:true, message:"请输入选项B", trigger:"blur"}
                    ],
                    option_C_description: [
                        {required:true, message:"请输入选项C", trigger:"blur"}
                    ],
                    option_D_description: [
                        {required:true, message:"请输入选项D", trigger:"blur"}
                    ],
                    question_answer: [
                        {required:true, message:"请输入问题答案", trigger:"blur"}
                    ]
                }
            }

        },
        methods:{
            //获取问题列表
            async getQuestion(){
                const {data: res} = await this.$http.get("getQuestion",{params: this.queryInfo_question});
                this.questionList = res.object;
                console.log(res.object)
                this.total_question = res.count;
            },

            //pageSize触发事件
            questionSizeChange(newSize){
                this.queryInfo_question.pageSize = newSize;
                this.getQuestion();
            },

            //pageNum触发事件
            questionCurrentChange(newPage){
                this.queryInfo_question.pageNum = newPage;
                this.getQuestion();
            },

            //添加问题
            async addQuestion(){
                const {data: res} = await this.$http.post("addQuestion", {
                    game_type: this.addQuestion_form.game_type,
                    question_description: this.addQuestion_form.question_description,
                    option_A_description: this.addQuestion_form.option_A_description,
                    option_B_description: this.addQuestion_form.option_B_description,
                    option_C_description: this.addQuestion_form.option_C_description,
                    option_D_description: this.addQuestion_form.option_D_description,
                    question_answer: this.addQuestion_form.question_answer
                })
                if(res == "ok"){
                    this.cancel();
                    await this.getQuestion();
                    this.$message.success("添加问题成功！");
                }
                else{
                    this.cancel();
                    this.$message.error("添加问题失败！");
                }
            },

            //取消添加问题
            cancel(){
                this.addQuestion_form.game_type = '';
                this.addQuestion_form.question_description = '';
                this.addQuestion_form.option_A_description = '';
                this.addQuestion_form.option_B_description = '';
                this.addQuestion_form.option_C_description = '';
                this.addQuestion_form.option_D_description = '';
                this.addQuestion_form.question_answer = '';
                this.visible_addQuestion_form = false;
            },

            //删除问题
            async deletequestion(question_id){
                const confirmResult = await this.$confirm("此操作将永久删除该用户，是否继续？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
                if(confirmResult != 'confirm')
                    return this.$message.info("已取消删除");
                else{
                    const {data: res} = await this.$http.delete("deleteQuestion?question_id=" + question_id);
                    if(res != "ok")
                        return this.$message.error("删除失败");
                    this.$message.success("删除成功");
                    await this.getQuestion();
                }
            },
        }
    }
</script>

<style scoped>
    .tb-edit.el-input {
        display: none;
    }
    .tb-edit.current-row.el-input {
        display: block;
    }
    .tb-edit.current-row.el-input + span {
        display: none;
    }

</style>