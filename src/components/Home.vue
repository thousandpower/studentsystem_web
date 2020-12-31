<template>

  <div>

    <el-container class="home-container">
      <el-header>
        <div>
          <span>员工管理系统</span>
        </div>
        <el-button type="intfo">安全退出</el-button>
      </el-header>


      <el-container>
        <!--导航显示下-->
        <el-aside :width="isCollapse ?'64px': '200px'">
          <div class="toggle-button" @click="toggleCollapase">|||</div>
          <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" unique-opened :router="true"
                   :collapse="isCollapse" :collapse-transition="false" :default-active="activePath" >
            <el-submenu :index="menu.id+''" v-for="menu in menuList" :key="menu.id">
              <template slot="title">
                <span>{{menu.title}}</span>
              </template>



            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!--显示内容页面，占位符  router-view-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>


</template>

<script>
  import axios from "axios"

  export default {
    name: "Home",
    data() {
      return {
        menuList: [],
        isCollapse:false,
        activePath :"/welcome"
      }
    },

    methods: {
      getMenuList: function () {
        axios.get("/getAllMenu").then(res => {
          if (res.data.status == "200") {
            this.menuList = res.data.data;

          } else {
            this.$message.error("数据获取失败")
          }
        })
      },
      toggleCollapase:function () {
        this.isCollapse = !this.isCollapse
      },
      saveNavState:function (activePath) {
        this.activePath = activePath;
        sessionStorage.setItem('activePath',activePath);
      }
    },

    created() {
      this.getMenuList();
      this.activePath = sessionStorage.getItem("activePath")
    }

  }
</script>

<style scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0%;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-aside el-menu {
    border-right: none;
  }

  .el-main {
    background-color: #eaedf1;
  }

  .el-header div {
    display: flex;
    align-items: center;
  }

  .el-header div span {
    margin-left: 15px;
  }

  .logo_img {
    width: 55px;
    height: 55px;
  }

  .toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }




</style>
