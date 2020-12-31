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

              <!--循环二级菜单-->
              <el-menu-item :index="smenu.path" v-for="smenu in menu.sList" :key="smenu.id" @click="saveNavState(smenu.path)">
                <template slot="title"><span>
                  {{smenu.title}}
                </span> </template>

              </el-menu-item>


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
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>
