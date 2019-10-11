<template>
  <div>
    <h1 class="text-center">Choose the files that you want to edit:</h1>
    <div class="card">
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <file-list-item v-for="file in files" v-bind:key="file.name" v-bind:file="file"></file-list-item>
        </ul>
        <p class="text-center mb-0 mt-3"><button v-on:click="onEditFilesClick" class="btn btn-lg btn-funky"><i class="icon ion-md-pricetags"></i>&nbsp;&nbsp;Edit {{ filesToEditNumber }} files</button></p>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import FileListItem from '../components/FileListItem.vue'

export default {
  name: 'file-list',
  computed: {
    filesToEditNumber: function() { return this.$store.state.filesToEdit.length },
    ...mapState([
      'files'
    ])
  },
  components: {
    FileListItem
  },
  methods: {
    onEditFilesClick: function() {
      if(this.$store.state.filesToEdit.length > 0) {
        this.$router.push('edit-tags');
      } else {
        window.alert('You must choose at least one file!');
      }
    }
  }
}
</script>

<style scoped>
  .card-body {
    padding-top: 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>