<template>
  <div class="empList">
    <el-card>
      <div class="query">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="工号">
            <el-input
              v-model="formInline.id"
              placeholder="请输入工号"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              v-model="formInline.name"
              placeholder="请输入员工姓名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="add">新增</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        :data="
          tableData.slice(pageSize * (currentPage - 1), pageSize * currentPage)
        "
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="id" label="工号"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birthday" label="生日"> </el-table-column>
        <el-table-column prop="department" label="部门"> </el-table-column>
        <el-table-column prop="phone" label="联系方式"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
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
      <el-pagination
        @size-change="handleSize"
        @current-change="handleCurrent"
        background
        layout="jumper,prev, pager, next,sizes,total"
        :pageSize="pageSize"
        :total="total"
        :current-page="currentPage"
        :page-sizes="pageSizes"
      >
      </el-pagination>
    </el-card>
    <!-- 抽屉 -->
    <el-drawer
      :title="state ? '添加员工信息' : '修改员工信息'"
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
          <el-form-item label="工号" prop="id">
            <el-input
              type="text"
              v-model.number="drawerForm.id"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input
              type="text"
              v-model="drawerForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio v-model="drawerForm.sex" label="1">男</el-radio>
            <el-radio v-model="drawerForm.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input
              type="text"
              v-model.number="drawerForm.age"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-date-picker
              v-model="drawerForm.birthday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input
              type="text"
              v-model="drawerForm.department"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input
              type="text"
              v-model.number="drawerForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input
              type="text"
              v-model="drawerForm.address"
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
  name: "EmpList",
  data() {
    return {
      //加载图标
      loading: true,
      //总页数
      total: 100,
      //当前页
      currentPage: 1,
      //每页多少条
      pageSize: 10,
      //总共多少个分页类型
      pageSizes: [10, 20, 30, 40, 50, 100],
      //要修改数据的索引
      tableDataIndex: 0,
      //设置添加或者修改的开关 添加则为 true,修改为false
      state: true,
      //列表数据
      tableData: [],
      //查询数据
      formInline: {
        id: "",
        name: ""
      },
      //抽屉开关状态
      drawer: false,
      //抽屉内的表单
      drawerForm: {
        //性别默认值
        sex: "1"
      },
      //抽屉内表单组件的校验规则
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
    //修改每页多少条时触发函数
    handleSize(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    //修改当前页数时触发函数
    handleCurrent(val) {
      this.currentPage = val;
    },
    //查询方法
    onSubmit() {
      this.service
        .get("/api/users", { params: this.formInline })
        .then(res => {
          this.tableData = [...res.data];
        })
        .catch(err => {
          console.log(err);
        });
    },
    //初始化页面数据
    bindHTML() {
      setTimeout(() => (this.loading = false), 1500);
      this.service
        .get("/api/users")
        .then(res => {
          this.tableData = [...res.data];
          //分页总页数
          this.total = this.tableData.length;
          //遍历数组，并把item.birthday的值转换为字符串
          this.tableData.forEach(item => {
            item.birthday ? (item.birthday = item.birthday.slice(0, 10)) : "";
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.state = false;
      this.drawer = true;
      this.tableDataIndex = index;
      this.drawerForm = { ...row }; //使用深拷贝防止一修改数据，数据就发生变化
    },
    //删除方法
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.service.delete("/api/users", { data: { id: row.id } });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.bindHTML();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //新增员工
    add() {
      this.drawer = true;
      this.state = true;
    },
    //关闭抽屉时提示
    handleClose(done) {
      this.$confirm(this.state ? "是否继续添加?" : "是否继续修改?")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //提交表单组件的方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //首先判断是否符合校验条件
        if (valid) {
          //获取接口数据
          //判断是新增
          if (this.state) {
            //判断获取到的生日是否是date类型不是就转化
            this.tableData.push(this.drawerForm);
            this.service
              .post("/api/users", this.drawerForm)
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    type: "success",
                    message: "新增成功!"
                  });
                  this.bindHTML();
                } else {
                  // ....
                }
              })
              .catch(err => {
                this.$message.error(
                  "新增失败,失败原因:" + err + "请联系工程师！"
                );
              });
          } else {
            //修改接口
            this.service
              .patch("/api/users", this.drawerForm)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.bindHTML();
              })
              .catch(() => {
                this.$message.error(
                  "修改失败,失败原因:" + err + "请联系工程师！"
                );
              });
          }
          //获取数组中成员的索引值
          // this.tableData.splice(this.tableDataIndex, 1, this.drawerForm);
          //清空抽屉中的数据
          this.drawerForm = {};
        } else {
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
  },
  created() {
    this.bindHTML(); //渲染数据
  }
};
</script>

<style scoped lang="scss">
.empList {
  .el-card {
    margin-top: 30px;
    .el-pagination {
      margin: auto;
      margin-top: 20px;
    }
    .query {
      text-align: left;
    }
  }
  .el-drawer {
    .drawerForm {
      text-align: center;
      .el-form {
        margin-right: 40px;
      }
    }
  }
}
</style>
