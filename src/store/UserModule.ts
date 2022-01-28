import { User } from '@/models/User';
import { Commit } from 'vuex';

export default {
  namespaced: true,
  state: {
    user: new User(),
  },
  actions: {
    setUser: ({ commit }: { commit: Commit }, user: User) => commit('SET_USER', user),
  },
  mutations: {
    SET_USER: (state: { user: User }, user: User) => (state.user = user),
  },
  modules: {},
};
