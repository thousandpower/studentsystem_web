import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex);



//创建store仓库
const store = new Vuex.Store({
  state:{
    //存储共用数据的位置

  },
  mutations:{
    //↑这是操作数据的唯一入口，这是同步操作

  },
  actions:{
    //↑异步操作
    //定义方法，调用mutations中定义的方法进行数据处理

  },
  getters:{

  },

  modules:{
    a:moduleA,
    b:moduleB
  }
});



//将当前仓库模块导出
export default store;
