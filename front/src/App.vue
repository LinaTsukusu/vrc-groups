<template lang="pug">
  v-app
    v-content
      router-view
    v-footer
      v-layout(justify-center row wrap)
        v-flex(primary lighten-2 py-3 text-xs-center white--text xs12) &copy;2019 - LinaTsukusu
    v-dialog(v-if="!$store.getters.userId" v-model="loginDialog" width="50vw")
      v-card
        v-card-title.headline.grey.lighten-2(primary-title) Login
        v-card-media
          login
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Login from '@/components/Login.vue'
  @Component({
    components: {Login},
  })
  export default class App extends Vue {
    private loginDialog = false

    private mounted() {
    }
  }
</script>
