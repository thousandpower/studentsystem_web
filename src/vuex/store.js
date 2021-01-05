import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex);


//创建store仓库
const store = new Vuex.Store({
    state: {
        //存储共用数据的位置
        username: "",
        password: "",
        role: "",
        userid: ""
    },
    mutations: {
        //↑这是操作数据的唯一入口，这是同步操作
        setUser: function (state, userid) {//state代表存储数据的仓库，userid为从页面接收的数据
            state.userid = userid;
        }
    },
    actions: {
        //↑异步操作
        //定义方法，调用mutations中定义的方法进行数据处理
        setUser: function (context, userid) {
            //setUser代表mutations中的方法名称 ，username代表要存储的值
            context.commit("setUser", userid);
        }
    },
    getters: {}
});


//将当前仓库模块导出
export default store;
