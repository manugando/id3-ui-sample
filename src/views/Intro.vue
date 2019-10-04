<template>
  <div class="text-center">
    <h1>Welcome!</h1>
    <p>Pick a folder to start:</p>
    <p><button v-on:click="onFolderPickClick" class="btn btn-primary">Pick a folder</button></p>
  </div>
</template>

<script>

const { remote } = window.require('electron');

export default {
  name: 'intro',
  methods: {
    onFolderPickClick: function() {
      remote.dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
        if(result.filePaths.length > 0) {
          this.$store.commit('setMainFolder', result.filePaths[0]);
          this.$router.push('file-list');
        }
      });
    }
  }
}
</script>
