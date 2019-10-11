<template>
  <div>
    <h1 class="text-center">Choose the files that you want to edit:</h1>
    <ul class="list-group my-3">
      <file-list-item v-for="file in files" v-bind:key="file.name" v-bind:file="file"></file-list-item>
    </ul>
    <p class="text-center"><button v-on:click="onEditTagsClick" class="btn btn-primary">Edit tags</button></p>
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
  },
  methods: {
    onEditTagsClick: function() {
      if(this.$store.state.filesToEdit.length > 0) {
        this.$router.push('edit-tags');
      } else {
        window.alert('You must choose at least one file!');
      }
    }
  }
}
</script>