<template>

  <div style="height:645px;font-size: 24px;margin-top: 120px">
    <div style="height: 200px;width: 820px;text-align: left;margin-left: 200px;">
      <h1 style="font-size: 36px">欢迎登陆金桥学员成长跟踪系统</h1>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金现代信息产业股份有限公司，
        是一家为电力、铁路、石化等行业提供信息化解决方案的高新技术企业，
        是国家规划布局内重点软件企业、国家高新技术企业、国家火炬计划软件产业基地骨干企业、
        中国区域卓越IT服务商、双软认证企业、山东省优秀软件企业、
        山东省大数据重点骨干企业、山东省重点服务业企业、济南总部企业。
        公司顺利通过了CMMI5级软件成熟度国际认证、ITSS信息技术服务运行维护三级认证、
        ISO27001信息安全管理体系认证、ISO20000信息技术服务管理体系等资格认证。</p>
    </div>
  </div>


</template>

<script>
  export default {
    name: "Welcome",
    data() {
      return {
        uname: ""
      }

    },
    methods: {
      isLogin: function () {
        if (!sessionStorage.getItem("user")) {
          this.$router.push("/");
        }
      },
    },
    mounted() {
      this.uname = sessionStorage.getItem("uname");
      this.isLogin();
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
