<template>
  <div>
    <h1 class="text-center">Write the tags:</h1>
    <div class="card">
      <div class="card-body">
        <div class="form-group my-3">
          <input type="text" class="form-control form-control-lg" placeholder="Artist" v-model="artist">
        </div>
        <div class="form-group">
          <input type="text" class="form-control form-control-lg" placeholder="Album" v-model="album">
        </div>
        <p class="text-center mb-0 mt-3"><button v-on:click="onSaveClick" class="btn btn-lg btn-funky"><i class="icon ion-md-save"></i>&nbsp;&nbsp;Save</button></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit-tags',
  data: function() {
    return {
      artist: '',
      album: ''
    }
  },
  methods: {
    onSaveClick: async function() {
      if(this.artist != '' && this.album != '') {
        let tags = { artist: this.artist, album: this.album };
        let success = await this.$store.dispatch('processFilesToEdit', tags);
        window.alert(success ? 'Done!' : 'Done with errors :(');
        await this.$store.dispatch('reset');
        this.$router.push('/')
      } else {
        window.alert('Missing data!');
      }
    }
  }
}
</script>