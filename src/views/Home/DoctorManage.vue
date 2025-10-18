<!-- 医生信息管理 -->
<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header height="76px">
      <h2>医生信息管理</h2>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home/wel' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>医生信息管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容区域 -->
    <el-main>
      <!--header -->
      <div class="main-title">
        <h3>医生信息列表</h3>
        <el-button type="primary" @click="addFormVisible = true">新增</el-button>
      </div>
      <!-- 搜索 -->
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="23" class="search-col">
          <keep-alive>
            <el-input
                placeholder="查询（输入医生姓名、手机号或编号等）"
                size="small"
                v-model="keyword"
                @input="handleQuery"
            >
            </el-input>
          </keep-alive>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
          stripe
          highlight-current-row
          :default-sort="{ prop: 'id', order: 'descending'}"
          :data="doctorData"
      >
        <el-table-column prop="id" label="医生编号" sortable>
        </el-table-column>
        <el-table-column prop="name" label="医生姓名">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column label="操作">
          <!-- 通过slot-scope拿到对应行的数据 -->
          <template slot-scope="scope">
            <el-button size="mini" @click="updatePage(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteDoctor(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <pagination
            :page.sync="currentPage"
            :layout="'total,prev,pager,next,jumper'"
            :total="total"
            :page-size.sync="pageSize"
        ></pagination>
      </div>
    </el-main>
    <!-- 点击新增后的弹窗 -->
    <el-dialog
        title="新增医生信息"
        :visible.sync="addFormVisible"
        :modal-append-to-body="false"
        @close="handleAddClose"
    >
      <el-form
          :model="addForm"
          hide-required-asterisk
          ref="addForm"
          label-width="110px"
      >
        <el-form-item
            label="医生姓名"
            prop="name"
            :rules="rules.nameRules"
        >
          <el-input
              v-model.trim="addForm.name"
              autocomplete="off"
              required
          ></el-input>
        </el-form-item>
        <el-form-item
            label="联系电话"
            prop="phoneNumber"
            :rules="rules.phoneRules"
        >
          <el-input
              v-model="addForm.phoneNumber"
              autocomplete="off"
              required
          ></el-input>
        </el-form-item>
        <el-form-item
            label="年龄"
            prop="age"
            :rules="rules.ageRules"
        >
          <el-input
              v-model.number="addForm.age"
              autocomplete="off"
              required
          ></el-input>
        </el-form-item>
        <el-form-item
            label="性别"
            prop="sex"
            :rules="rules.requiredRules"
        >
          <el-select v-model="addForm.sex" placeholder="请选择性别">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item
            label="职称级别"
            prop="levelId"
            :rules="rules.requiredRules"
        >
          <el-select v-model="addForm.levelId" placeholder="请选择职称级别">
            <el-option
                v-for="item in levelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
            label="所属科室"
            prop="typeId"
            :rules="rules.requiredRules"
        >
          <el-select v-model="addForm.typeId" placeholder="请选择所属科室">
            <el-option
                v-for="item in treatTypeList"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
            label="登录密码"
            prop="pwd"
            :rules="rules.pwdRules"
        >
          <el-input
              type="password"
              v-model.trim="addForm.pwd"
              autocomplete="off"
              required
          ></el-input>
        </el-form-item>
        <el-form-item
            label="确认密码"
            prop="pwdCheck"
            :rules="rules.pwdCheckRules"
        >
          <el-input
              type="password"
              v-model.trim="addForm.pwdCheck"
              autocomplete="off"
              required
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddDoctor('addForm')"
        >确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 点击修改后的弹窗 -->
    <el-dialog
        title="修改医生信息"
        :visible.sync="modifyFormVisible"
        :modal-append-to-body="false"
    >
      <el-form
          v-bind:model="modifyForm"
          hide-required-asterisk
          ref="modifyForm"
          label-width="110px"
      >
        <el-form-item label="医生编号">
          <el-input
              v-model="modifyForm.id"
              autocomplete="off"
              disabled
          ></el-input>
        </el-form-item>
        <el-form-item
            label="医生姓名"
            prop="name"
            :rules="rules.nameRules"
        >
          <el-input
              v-model.trim="modifyForm.name"
              autocomplete="off"
              required
          ></el-input>
        </el-form-item>
        <el-form-item
            label="联系电话"
            prop="phoneNumber"
            :rules="rules.phoneRules"
        >
          <el-input
              v-model="modifyForm.phoneNumber"
              autocomplete="off"
              required
          ></el-input>
        </el-form-item>
        <el-form-item
            label="年龄"
            prop="age"
            :rules="rules.ageRules"
        >
          <el-input
              v-model.number="modifyForm.age"
              autocomplete="off"
              required
          ></el-input>
        </el-form-item>
        <el-form-item
            label="性别"
            prop="sex"
            :rules="rules.requiredRules"
        >
          <el-select v-model="modifyForm.sex" placeholder="请选择性别">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item
            label="职称级别"
            prop="levelId"
            :rules="rules.requiredRules"
        >
          <el-select v-model="modifyForm.levelId" placeholder="请选择职称级别">
            <el-option
                v-for="item in levelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
            label="所属科室"
            prop="typeId"
            :rules="rules.requiredRules"
        >
          <el-select v-model="modifyForm.typeId" placeholder="请选择所属科室">
            <el-option
                v-for="item in treatTypeList"
                :key="item.id"
                :label="item.departmentName"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleModifyDoctor('modifyForm')"
        >确 定
        </el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import Pagination from "@/layout/components/Pagination.vue";
import axios from '@/http/http.js'
import {addDoctorInfo, updateDoctorInfo, getAllLevels, getAllTypes, deleteDoctorInfo} from "@/apis/DoctorAPI";

export default {
  name: "DoctorManage",
  components: {
    Pagination,
  },
  data() {
    return {
      rules: {
        nameRules: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
        ],
        phoneRules: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号格式", trigger: "blur" },
        ],
        ageRules: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { type: "number", message: "年龄必须为数字", trigger: "blur" },
          { type: "number", min: 20, max: 70, message: "年龄在 20 到 70 之间", trigger: "blur" },
        ],
        requiredRules: [
          { required: true, message: "该项为必填项", trigger: "change" },
        ],
        pwdRules: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" },
        ],
        pwdCheckRules: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.addForm.pwd) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      doctorData: [],
      currentPage: 1,
      pageSize: 5, // 每页的数据条数
      keyword: "",
      addFormVisible: false, // 控制新增医生页面的显示
      addForm: {
        name: "",
        phoneNumber: "",
        age: "",
        sex: "",
        levelId: "",
        typeId: "",
        pwd: "",
        pwdCheck: "",
      },
      total: 0,
      modifyFormVisible: false, // 控制修改信息页面的显示
      modifyForm: {
        id: "",
        name: "",
        phoneNumber: "",
        age: "",
        sex: "",
        levelId: "",
        typeId: "",
      },
      // 医生级别列表
      levelList: [],
      // 科室列表
      treatTypeList: [],
    };
  },
  methods: {
    // 获取下拉框数据
    async fetchSelectionData() {
      try {
        const levelsRes = await getAllLevels();
        if (levelsRes.code === 200) {
          this.levelList = levelsRes.data;
        } else {
          this.$message.error("获取医生级别列表失败");
        }

        const typesRes = await getAllTypes();
        if (typesRes.code === 200) {
          this.treatTypeList = typesRes.data;
        } else {
          this.$message.error("获取科室列表失败");
        }
      } catch (error) {
        console.error("获取下拉框数据失败:", error);
        this.$message.error("请求下拉框数据失败，请稍后再试");
      }
    },

    // 修改医生信息
    handleModifyDoctor(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateDoctorInfo(this.modifyForm).then(res => {
            if (res.code === 200) {
              this.$message.success("修改成功!");
              this.modifyFormVisible = false; // 在成功后关闭弹窗
              this.getDoctorInfo(); // 重新加载数据
            }else {
              this.$message.error(res.msg || '修改失败');
            }
          }).catch(err => {
            console.error("修改失败:", err);
            this.$message.error("请求失败，请稍后再试");
          });
        } else {
          return false;
        }
      });
    },



    // 点击修改按钮
    updatePage(obj) {
      this.modifyFormVisible = true;
      // 创建一个新对象以避免直接修改表格数据，并正确映射字段
      this.modifyForm = {
        id: obj.id,
        name: obj.name,
        phoneNumber: obj.phone, // 将 obj.phone 映射到 modifyForm.phoneNumber
        age: obj.age,
        sex: obj.sex,
        levelId: obj.levelId,
        typeId: obj.typeId,
      };
    },

    // 删除医生
    handleDeleteDoctor(row) {
      this.$confirm("此操作将永久删除该医生信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            deleteDoctorInfo(row).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getDoctorInfo(); // 重新加载数据
              } else {
                this.$message.error(res.msg || '删除失败');
              }
            }).catch(err => {
              console.error("删除失败:", err);
              this.$message.error('请求失败，请稍后再试');
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
    },

    // 新增医生
    handleAddDoctor(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addDoctorInfo(this.addForm).then(res => {

            if (res.code === 200) {
              this.$message.success("新增成功!");
            }else {
              this.$message.error(res.msg || '新增失败');
            }
          }).catch(err => {
            console.error("新增失败:", err);
            this.$message.error("请求失败，请稍后再试");
          });
          this.addFormVisible = false;
        } else {
          return false;
        }
      });
    },

    // 获取医生信息
    getDoctorInfo() {
      this.handleQuery();
    },

    // 处理搜索
    handleQuery() {
      axios.get("/doctor/getDoctorAll", {
        params: {
          keyword: this.keyword,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },

        headers: {
          token: localStorage.getItem("token")
        }

      }).then((res) => {
        if (res.code === 200) {
          this.doctorData = res.data.records;
          this.total = res.data.total;
        }


      })
    },

    // 关闭新增弹窗
    handleAddClose() {
      console.log("关闭新增弹窗");
      this.$refs.addForm.resetFields();
    },
  },
  // 当挂载时渲染默认数据
  mounted() {
    this.getDoctorInfo(); // 首次渲染
    this.fetchSelectionData(); // 获取下拉框数据
  },
  computed: {
    ...mapGetters({
      tableData: "doctorInfo",
    }), // 后端返回的数据
  },
  watch: {
    pageSize: {
      handler: "handleQuery",
    },
    currentPage: {
      handler: "handleQuery",
    },
  },
};
</script>

<style lang="less" scoped>
</style>