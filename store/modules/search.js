import {RECEIVE_SEARCHLIST} from '../mutation-types'
import {reqSearchList} from '../../api/index'
//引入Vue
import Vue from 'vue'
const state = {
  //搜索结果列表信息
  searchList : []
}
const mutations = {
  //获取搜索列表信息
  [RECEIVE_SEARCHLIST](state,searchList){
    state.searchList=searchList
  }
}
const actions = {
  //获取列表信息
 async getsearchList ({commit},searchName) {
    const result = await reqSearchList(searchName)
    if(result.code===0){
      const searchList = result.datalist
      // console.log(searchList)
      commit(RECEIVE_SEARCHLIST,searchList)
    }
  }
}
const getters = {}


export default {
  state,
  mutations,
  actions,
  getters
}