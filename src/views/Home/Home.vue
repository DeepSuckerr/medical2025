<script>
import Header from "@/layout/components/Header.vue";
import Sider from "@/layout/components/Sider.vue";
import Footer from "@/layout/components/Footer.vue";
export default {
  name: "Home",
  components:{
    Header,Sider,Footer,
  },

}
</script>

<template>

  <div>
    <el-container>
      <el-header style="padding: 0px">
        <Header/>
      </el-header>
      <br>
      <br>
      <el-container >
        <el-aside width="250px">
          <Sider/>
        </el-aside>
        <el-container>
          <el-main >
            <router-view/>
          </el-main>
          <el-footer >
            <Footer/>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>


</template>

<style lang="less">
.el-main{

}
.el-footer{
  background-color: #f3f3f4;
}
.el-header{
  //width: 100%;
}
</style>