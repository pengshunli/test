//引入Vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//引入模块
import search from './modules/search'
//声明使用
Vue.use(Vuex)
//暴露对象
export default new Vuex.Store({
  modules:{
    search
  }
})
