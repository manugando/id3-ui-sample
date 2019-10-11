<template>
  <div>
    <h1 class="text-center">Write the tags:</h1>
    <div class="form-group my-3">
      <input type="text" class="form-control form-control-lg" placeholder="Artist" v-model="artist">
    </div>
    <div class="form-group">
      <input type="text" class="form-control form-control-lg" placeholder="Album" v-model="album">
    </div>
    <p class="text-center"><button v-on:click="onSaveClick" class="btn btn-primary">Save</button></p>
  </div>
</template>

<script>
const NodeID3 = window.require('node-id3');

export default {
  name: 'edit-tags',
  data: function() {
    return {
      artist: '',
      album: ''
    }
  },
  methods: {
    onSaveClick: function() {
      let doneWithErrors = false;
      if(this.artist != '' && this.album != '') {
        let tags = {
          artist: this.artist,
          album: this.album,
        }
        for(const fileToEdit of this.$store.state.filesToEdit) {
          if(!NodeID3.update(tags, fileToEdit.path)) {
            doneWithErrors = true;
          }
        }
        if(doneWithErrors) {
          window.alert('Done with errors :(');
        } else {
          window.alert('Done!');
        }
        this.$store.dispatch('reset').then(() => this.$router.push('/'));
      } else {
        window.alert('Missing data!');
      }
    }
  }
}
</script>