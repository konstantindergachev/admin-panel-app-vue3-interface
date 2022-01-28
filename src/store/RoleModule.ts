import { Role } from '@/models/Role';
import { Commit } from 'vuex';

export default {
  namespaced: true,
  state: {
    roles: new Array<Role>(),
  },
  actions: {
    setRoles: ({ commit }: { commit: Commit }, roles: Role[]) => commit('SET_ROLES', roles),
  },
  mutations: {
    SET_ROLES: (state: { roles: Role[] }, roles: Role[]) => (state.roles = roles),
  },
  modules: {},
};
