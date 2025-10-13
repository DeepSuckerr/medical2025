<!-- 医药公司信息管理 -->
<template>

  <el-container>
    <!-- 头部区域 -->
    <el-header height="76px">
      <h2>医药公司信息管理</h2>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home/wel' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>医药公司信息管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 主体内容区域 -->
    <el-main>
      <!--header -->
      <div class="main-title">
        <h3>医药公司信息列表</h3>
        <el-button type="primary" @click="addFormVisible = true">新增</el-button>
      </div>
      <!-- 搜索 -->
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="23" class="search-col">
          <keep-alive>
            <el-input
                placeholder="查询（输入要查询的公司名称）"
                size="small"
                v-model="keyword"
                @input="handelQuery"
            >
            </el-input>
          </keep-alive>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
          stripe
          highlight-current-row
          :default-sort="{ prop: 'companyId', order: 'descending'}"
          :data="drugCompanyData"
      >
        <el-table-column prop="companyId" label="医药公司编号" sortable>
        </el-table-column>
        <el-table-column prop="companyName" label="公司名称">
        </el-table-column>
        <el-table-column prop="companyPhone" label="公司电话">
        </el-table-column>
        <el-table-column prop="companyOperation" label="操作">
          <!-- 通过slot-scope拿到对应行的数据 -->
          <template slot-scope="scope">
            <el-button size="mini" @click="">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteCompany()">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <!--        <pagination
                    :current-page.sync="currentPage"
                    :layout="'total,prev,pager,next,jumper'"
                    :total="tableData.total"
                    :page-size.sync="pageSize"
                    @currentChange="handleCurrentChange($event)"
                    @update:page="currentPage = $event"
                ></pagination>-->
      </div>
    </el-main>
    <!-- 点击新增后的弹窗 -->
    <el-dialog
        title="新增医药公司"
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
            label="公司名称"
            prop="companyName"
            :rules="rules.nameRules"
        >
          <el-input
              v-model.trim="addForm.companyName"
              autocomplete="off"
              required
          ></el-input>
        </el-form-item>
        <el-form-item
            label="公司电话"
            prop="companyPhone"
            :rules="rules.phoneRules"
        >
          <el-input
              v-model.number="addForm.companyPhone"
              autocomplete="off"
              required
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddCompany('addForm')"
        >确 定
        </el-button
        >
      </div>
    </el-dialog>
    <!-- 点击修改后的弹窗 -->
    <!--    <el-dialog-->
    <!--        title="修改医药公司信息"-->
    <!--        :visible.sync="modifyFormVisible"-->
    <!--        :modal-append-to-body="false"-->
    <!--        @close="handleModifyClose"-->
    <!--    >-->
    <!--      <el-form-->
    <!--          :model="modifyForm"-->
    <!--          hide-required-asterisk-->
    <!--          ref="modifyForm"-->
    <!--          label-width="110px"-->
    <!--      >-->
    <!--        <el-form-item label="医药公司编号">-->
    <!--          <el-input-->
    <!--              v-model="modifyForm.companyId"-->
    <!--              autocomplete="off"-->
    <!--              disabled-->
    <!--          ></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item-->
    <!--            label="公司名称"-->
    <!--            prop="companyName"-->
    <!--            :rules="rules.nameRules"-->
    <!--        >-->
    <!--          <el-input-->
    <!--              v-model.trim="modifyForm.companyName"-->
    <!--              autocomplete="off"-->
    <!--              required-->
    <!--          ></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item-->
    <!--            label="公司电话"-->
    <!--            prop="companyPhone"-->
    <!--            :rules="rules.phoneRules"-->
    <!--        >-->
    <!--          <el-input-->
    <!--              v-model.number="modifyForm.companyPhone"-->
    <!--              autocomplete="off"-->
    <!--              required-->
    <!--          ></el-input>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <el-button @click="modifyFormVisible = false">取 消</el-button>-->
    <!--        <el-button type="primary" @click="handleModifyCompany('modifyForm')"-->
    <!--        >确 定-->
    <!--        </el-button-->
    <!--        >-->
    <!--      </div>-->
    <!--    </el-dialog>-->
  </el-container>
</template>

<script>
/*import Pagination from "../../components/Pagination";*/
import {mapGetters} from "vuex";
import rules from "../../utils/validator";
import Home from "@/views/Home/Home.vue";
import axios from '@/http/http.js'
import DrugCompany, {addCompanyInfo} from "@/apis/DrugCompany.js"


export default {
  name: "CompanyManage",
  components: {
    Home
    /* Pagination,*/
  },
  data() {
    return {
      rules, // 封装好的表单验证
      drugCompanyData: [],
      currentPage: 1,
      pageSize: 5, // 每页的数据条数
      keywordDefault: "",
      addFormVisible: false, // 控制新增公司页面的显示
      addForm: {
        companyName: "",
        companyPhone: "",
      },
      modifyFormVisible: false, // 控制修改信息页面的显示
      modifyForm: {
        companyId: "",
        companyName: "",
        companyPhone: "",
      },
    };
  },
  methods: {


    handleDeleteCompany(companyId) {


    },


    handleAddCompany(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const name = this.addForm.companyName;
          const phone = this.addForm.companyPhone;
          addCompanyInfo(name, phone).then(res => {
            if (res.code === 200) {
              this.$message.success("新增成功!");
              this.getCompanyInfo(); // Refresh data
            } else {
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


    // 切换分页及首次进入获取数据
    getCompanyInfo() {
      axios.get("http://localhost:8081/drugCompany/getCompanyAll").then(res => {
        if (res.code === 200) {
          this.drugCompanyData = res.data;
        }
      });
    },
    // 处理搜索
    handelQuery() {
      console.log("处理搜索:", this.keyword);
    },
    // 关闭新增弹窗
    handleAddClose() {
      console.log("关闭新增弹窗");
      this.$refs.addForm.resetFields();
    },
  },
  //   当挂载时渲染默认数据，代码如下。
  mounted() {
    this.getCompanyInfo(); // 首次渲染
  },
  computed: {
    ...mapGetters({
      tableData: "companyInfo",
    }), //后端返回的数据
    keyword: {
      get() {
        return this.keywordDefault;
      },
      set(val) {
        this.keywordDefault = val;
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>