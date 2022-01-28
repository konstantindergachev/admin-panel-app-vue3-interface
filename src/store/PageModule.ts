import { Commit } from 'vuex';

export default {
  namespaced: true,
  state: {
    page: 0,
  },
  actions: {
    setPage: ({ commit }: { commit: Commit }, page: number) => commit('SET_PAGE', page),
  },
  mutations: {
    SET_PAGE: (state: { page: number }, page: number) => (state.page = page),
  },
  modules: {},
};
