<template lang="pug">
  v-app
    h1 vrc groups
    v-content
      router-view
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class App extends Vue {
  }
</script>
