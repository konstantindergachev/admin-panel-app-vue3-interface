<template>
  <label class="btn btn-info">
    Upload <input type="file" hidden @change="upload($event.target.files)" />
  </label>
</template>

<script lang="ts">
import axios from 'axios';
import { SetupContext } from 'vue';

export default {
  emits: ['uploaded'],
  setup(props: any, ctx: SetupContext) {
    const upload = async (files: FileList) => {
      if (!files) return;

      const formData = new FormData();
      formData.append('image', files[0]);

      const { data } = await axios.post('upload', formData);
      ctx.emit('uploaded', data.url);
    };

    return { upload };
  },
};
</script>
