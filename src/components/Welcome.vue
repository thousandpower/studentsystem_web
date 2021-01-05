<template>

<div class="home-container">
  <el-container>
    <el-header><h1></h1></el-header>
  <h1 style="font-size: 30px">欢迎您，{{uname}},登录金桥学员成长跟踪系统</h1>
    <el-footer></el-footer>
  </el-container>
</div>


</template>

<script>
    export default {
        name: "Welcome",
      data(){
          return{
            uname:""
          }

      },
      mounted() {
          this.uname = sessionStorage.getItem("uname")
      }
    }
</script>

<style scoped>

  .home-container {
    height: 768px;
  }
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 30px;
    height: 50px !important;
  }

</style>
