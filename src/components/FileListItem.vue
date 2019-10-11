<template>
  <li class="list-group-item row" v-bind:class="{ 'is-to-edit': isFileToEdit }" v-on:click="onClick">
    <div class="row w-100">
      <div class="col">
        <i class="icon is-to-edit-icon" v-bind:class="[isFileToEdit ? 'ion-md-checkmark' : 'ion-md-close' ]"></i>
        {{ file.name }}
      </div>
      <div v-if="hasArtist" class="col"> 
        <i class="icon ion-md-person"></i>
        {{ file.artist }}
      </div>
      <div v-if="hasAlbum" class="col">
        <i class="icon ion-md-disc"></i>
        {{ file.album }}
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'FileListItem',
  props: ['file'],
  computed: {
    hasArtist: function() { return this.file.artist != null; },
    hasAlbum: function() { return this.file.album != null; },
    isFileToEdit: function() { return this.$store.getters.isFileToEdit(this.file); }
  },
  methods: {
    onClick: function() {
      this.$store.dispatch('toggleFileToEdit', this.file);
    }
  }
}
</script>

<style scoped>
  .list-group-item {
    cursor: pointer;
  }
  .is-to-edit {
    background: rgba(133, 216, 206, 0.1);
  }
  .is-to-edit-icon {
    display: inline-block;
    width: 12px;
    margin-right: 5px;
  } 
</style>