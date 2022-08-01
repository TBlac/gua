<template>
  <div class="empInfo">
    <!-- <el-card>
      <div class="infoForm">
        <el-form
          :model="infoForm"
          status-icon
          :rules="rules"
          ref="infoForm"
          label-width="100px"
        >
          <el-row :gutter="20">
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-form-item label="工号" prop="id">
                  <el-input
                    type="text"
                    v-model.number="infoForm.id"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="picture">
                  <el-input
                    type="text"
                    v-model.number="infoForm.picture"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                  <el-input
                    type="text"
                    v-model="infoForm.name"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                  <el-input
                    type="text"
                    v-model="infoForm.address"
                    autocomplete="off"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-form-item label="性别" prop="sex">
                  <el-radio v-model="infoForm.sex" label="1">男</el-radio>
                  <el-radio v-model="infoForm.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                  <el-input
                    type="text"
                    v-model.number="infoForm.age"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="idcard">
                  <el-input
                    type="text"
                    v-model.number="infoForm.idcard"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                  <el-input
                    type="text"
                    v-model.number="infoForm.phone"
                    autocomplete="off"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-form-item label="生日" prop="birthday">
                  <el-date-picker
                    v-model="infoForm.birthday"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="部门" prop="department">
                  <el-input
                    type="text"
                    v-model="infoForm.department"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="入职时间" prop="startTime">
                  <el-date-picker
                    v-model="infoForm.startTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="离职时间" prop="endTime">
                  <el-date-picker
                    v-model="infoForm.endTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item></div
            ></el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="submitForm('infoForm')"
              >保存</el-button
            >
            <el-button @click="resetForm('infoForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card> -->
  </div>
</template>

<script>
export default {
  name: "EmpInfo",
  data() {
    return {
      tableData: [],
      //抽屉开关状态
      drawer: false,
      //抽屉内的表单
      infoForm: {
        //性别默认值
        sex: "1"
      },
      rules: {
        id: [
          { required: true, message: "请输入id", trigger: "blur" },
          { type: "number", message: "id必须为数字值" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { type: "number", message: "年龄必须为数字值" }
        ],
        birthday: [
          { required: true, message: "请选择出生日期", trigger: "blur" }
        ],
        department: [
          { required: true, message: "请输入员工部门", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { type: "number", message: "手机号必须为数字值" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm() {
      this.infoForm = {};
    }
  }
};
</script>

<style scoped lang="scss">
.empInfo {
  .el-card {
    margin-top: 30px;
  }
}
</style>
