<script>
export default {
  name: "Sider",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
}
</script>

<template>
  <div id="sider">
    <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#2ABEB2"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
      <el-menu-item index="/home/welcome">
        <i class="el-icon-location"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/home/company">
        <i class="el-icon-menu"></i>
        <span slot="title">医药公司管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">销售地址管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-news"></i>
        <span slot="title">城市信息管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-thumb"></i>
        <span slot="title">药品信息管理</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-bangzhu"></i>
        <span slot="title">医药公司政策管理</span>
      </el-menu-item>
      <el-menu-item index="/home/DoctorManage">
        <i class="el-icon-copy-document"></i>
        <span slot="title">医生信息管理</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-ice-tea"></i>
        <span slot="title">必备材料管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
#sider {
  width: 250px;
  height: 900px;
  background-color: #2ABEB2;
}
</style>