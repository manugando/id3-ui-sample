<template>
  <div>
    <h1 class="text-center">Choose the files that you want to edit:</h1>
    <ul class="list-group mt-3">
      <li class="list-group-item" v-for="file in files" v-bind:key="file">{{ file }}</li>
    </ul>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'file-list',
  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState([
      'files'
    ])
  }
}
</script>