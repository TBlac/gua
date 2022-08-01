<template>
  <div class="empWork">
    <el-card>
      <div class="query">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="项目id">
            <el-input
              v-model="formInline.proId"
              placeholder="请输入项目id"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              v-model="formInline.user"
              placeholder="请输入员工姓名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="proId" label="项目编号"> </el-table-column>
        <el-table-column prop="proName" label="项目名称"> </el-table-column>
        <el-table-column prop="longTime" label="项目时长"> </el-table-column>
        <el-table-column prop="department" label="部门"> </el-table-column>
        <el-table-column prop="empId" label="员工工号"> </el-table-column>
        <el-table-column prop="empName" label="员工姓名"> </el-table-column>
        <el-table-column prop="startTime" label="项目开始日期">
        </el-table-column>
        <el-table-column prop="endTime" label="项目结束日期"> </el-table-column>
        <el-table-column prop="workExperience" label="参与工作情况">
        </el-table-column>
        <el-table-column prop="responsibleModule" label="所负责模块">
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 抽屉 -->
    <el-drawer
      title="修改员工工作情况"
      :visible.sync="drawer"
      :before-close="handleClose"
    >
      <!-- 抽屉内的表单 -->
      <div class="drawerForm">
        <el-form
          :model="drawerForm"
          status-icon
          :rules="rules"
          ref="drawerForm"
          label-width="100px"
        >
          <el-form-item label="项目编号" prop="proId">
            <el-input
              type="text"
              v-model.number="drawerForm.proId"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="proName">
            <el-input
              type="text"
              v-model="drawerForm.proName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目时长" prop="longTime">
            <el-input
              type="text"
              v-model="drawerForm.longTime"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input
              type="text"
              v-model="drawerForm.department"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="员工工号" prop="empId">
            <el-input
              type="text"
              v-model="drawerForm.empId"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" prop="empName">
            <el-input
              type="text"
              v-model="drawerForm.empname"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目开始日期" prop="startTime">
            <el-date-picker
              v-model="drawerForm.startTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="项目结束日期" prop="endTime">
            <el-date-picker
              v-model="drawerForm.endTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="参与工作情况" prop="workExperience">
            <el-input
              type="text"
              v-model.number="drawerForm.workExperience"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="所负责模块" prop="responsibleModule">
            <el-input
              type="text"
              v-model="drawerForm.responsibleModule"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('drawerForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('drawerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "EmpWork",
  data() {
    return {
      //查询数据
      formInline: {
        proId: "",
        empName: ""
      },
      //列表数据
      tableData: [],
      //抽屉表单数据
      drawerForm: {},
      //抽屉的开关状态
      drawer: false,
      //抽屉内表单组件的校验规则
      rules: {
        proId: [
          { required: true, message: "请输入项目id", trigger: "blur" },
          { type: "number", message: "id必须为数字值" }
        ],
        proName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        longTime: [{ required: true }],
        department: [
          { required: true, message: "请输入员工部门", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "请选择项目开始日期", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请选择项目结束日期", trigger: "blur" }
        ],
        workExperience: [
          { required: true, message: "请选择员工工作经历", trigger: "blur" }
        ],
        responsibleModule: [
          { required: true, message: "请输入员工所负责的模块", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //关闭抽屉时提示
    handleClose(done) {
      this.$confirm(this.state ? "是否继续添加?" : "是否继续修改?")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //查询方法
    onSubmit() {
      console.log("submit!");
    },
    handleEdit(index, row) {
      this.state = false;
      this.drawer = true;
      this.tableDataIndex = index;
      this.drawerForm = row;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //提交表单组件的方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //判断是新增还是修改
          if (this.state) {
            this.tableData.push(this.drawerForm);
          }
          //获取数组中成员的索引值
          // this.tableData.splice(this.tableDataIndex, 1, this.drawerForm);
          //清空抽屉中的数据
          this.drawerForm = {};
        } else {
          console.log("error submit!!");
          return false;
        }
        this.drawer = false;
      });
    },
    //重置表单数据
    resetForm() {
      this.drawerForm = {};
      // this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.empWork {
  .el-card {
    margin-top: 30px;
    .query {
      text-align: left;
    }
  }
}
</style>
