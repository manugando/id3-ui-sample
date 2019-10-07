<template>
  <div>
    <h1 class="text-center">Choose the files that you want to edit:</h1>
    <ul class="list-group my-3">
      <file-list-item v-for="file in files" v-bind:key="file.name" v-bind:file="file"></file-list-item>
    </ul>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import FileListItem from '../components/FileListItem.vue'

export default {
  name: 'file-list',
  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState([
      'files'
    ])
  },
  components: {
    FileListItem
  }
}
</script>