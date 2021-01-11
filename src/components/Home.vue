<template>

  <div>

    <el-container class="home-container">
      <el-header>
        <div>
          <span>金桥学员成长跟踪系统（{{roleName}}）</span>
        </div>

        <div class="block" style="margin: 50px 0 50px 1100px">  <el-row class="demo-avatar demo-basic"><el-avatar> user </el-avatar></el-row><span >{{uname}}</span>
        </div>



        <el-button size="mini"  @click="exitThisSystem" >安全退出</el-button>
      </el-header>


      <el-container>
        <!--导航显示下-->
        <el-aside :width="isCollapse ?'64px': '200px'">
          <div class="toggle-button" @click="toggleCollapase" v-html="sign"></div>
          <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" unique-opened :router="true"
                   :collapse="isCollapse" :collapse-transition="false" :default-active="activePath"
          >
            <!--循环二级菜单-->
            <el-menu-item :index="menu.path" v-for="menu in menuList" :key="menu.id" @click="saveNavState(menu.path)">
              <template slot="title"><span>
                  {{menu.title}}
                </span> </template>
            </el-menu-item>
            <template>
              <el-menu-item  @click="exitThisSystem">退出</el-menu-item>
            </template>
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
  import Welcome from "./Welcome";


  export default {
    name: "Home",
    data() {
      return {
        uname:"",//存储从sessionStorage中的用户名
        menuList: [],
        isCollapse:false,
        activePath :"/Welcome",
        roleName:"",
        sign:"<<<",
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        sizeList: ["large", "medium", "small"]

      }
    },

    methods: {
      getMenuList: function () {
        this.
        axios.post("/getAllMenu",sessionStorage.getItem("role")).then(res => {
          if (res.data.status == "200") {
            this.menuList = res.data.data;

          } else {
            this.$message.error("数据获取失败")
          }
        })
      },
      toggleCollapase:function () {
        this.isCollapse = !this.isCollapse
        if (this.isCollapse){
          this.sign =">>>"
        } else {
          this.sign="<<<"
        }


      },
      saveNavState:function (activePath) {
        this.activePath = activePath;
        sessionStorage.setItem('activePath',activePath);
      },
      exitThisSystem: function () {
        this.$confirm('确认退出吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!',
          });

          //清空session
          sessionStorage.clear();
          //  跳转到登录
          this.$router.push('/')
        }).catch(() => {

        });
      },
      isLogin: function () {
        if (!sessionStorage.getItem("user")) {
          this.$router.push("/");
        }
      },
    },


    created() {
      this.roleName = sessionStorage.getItem("roleName");
      this.getMenuList();
      this.activePath = sessionStorage.getItem("activePath");
      //从sessionStroage中获取用户名
      this.uname = sessionStorage.getItem("uname");
      this.isLogin();
    }

  }
</script>

<style scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
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
    font-size: 15px;
    line-height: 38px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }




</style>
