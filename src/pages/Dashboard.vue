<template>
  <h2 class="text-center mt-3">Dashboard</h2>
  <div id="chart"></div>
</template>

<script lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import * as c3 from 'c3';
import { Chart } from '@/models/Chart';

export default {
  setup() {
    const store = useStore();
    const storedChart = computed(() => store.state.chartModule.chart);
    let data = [] as Chart[];

    onMounted(async () => {
      const chart = c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [['x'], ['Sales']],
          types: { Sales: 'bar' },
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d',
            },
          },
        },
      });

      if (!storedChart.value.length) {
        const { data: responseData } = await axios.get('chart');
        data = responseData;
        store.dispatch('chartModule/setChart', responseData);
      } else {
        data = storedChart.value;
      }

      chart.load({
        columns: [
          ['x', ...data.map((item: any) => new Date(item.date))],
          ['Sales', ...data.map((item: any) => item.sum)],
        ],
      });
    });
    return {};
  },
};
</script>
