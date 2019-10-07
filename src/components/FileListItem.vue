<template>
  <li class="list-group-item" v-bind:class="{ 'is-to-edit': isFileToEdit }" v-on:click="onClick">
    {{ file.name }}
    <span v-if="hasArtist"> - {{ file.artist }}</span>
    <span v-if="hasAlbum"> - {{ file.album }}</span>
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

<style>
  .list-group-item {
    cursor: pointer;
  }
  .is-to-edit {
    background: rgba(0, 255, 0, 0.5);
  }
</style>