import { Chart } from '@/models/Chart';
import { Commit } from 'vuex';

export default {
  namespaced: true,
  state: {
    chart: new Array<Chart>(),
  },
  actions: {
    setChart: ({ commit }: { commit: Commit }, chart: Chart) => commit('SET_CHART', chart),
  },
  mutations: {
    SET_CHART: (state: { chart: Chart }, chart: Chart) => (state.chart = chart),
  },
  modules: {},
};
