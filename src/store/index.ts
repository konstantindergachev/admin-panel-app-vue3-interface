import { createStore } from 'vuex';
import moduleChart from './ChartModule';
import moduleUser from './UserModule';
import moduleRole from './RoleModule';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    chartModule: moduleChart,
    userModule: moduleUser,
    roleModule: moduleRole,
  },
});
