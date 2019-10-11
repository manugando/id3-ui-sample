<template>
  <div class="text-center">
    <h1>Welcome!</h1>
    <div class="card">
      <div class="card-body">
        <p>Pick a folder to start:</p>
        <p><button v-on:click="onFolderPickClick" class="btn btn-lg btn-funky"><i class="icon ion-md-folder"></i>&nbsp;&nbsp;Pick a folder</button></p>
      </div>
    </div>
  </div>
</template>

<script>

const { remote } = window.require('electron');

export default {
  name: 'intro',
  methods: {
    onFolderPickClick: function() {
      remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
      .then(result => {
        if(result.filePaths.length > 0) {
          return this.$store.dispatch('chooseMainFolder', result.filePaths[0]);
        }
      })
      .then(() => {
        if(this.$store.state.files.length > 0) {
          this.$router.push('file-list');
        } else {
          window.alert('No mp3 found in the selected folder!');
        }
      });
    }
  }
}
</script>
