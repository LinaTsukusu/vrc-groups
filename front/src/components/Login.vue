<template lang="pug">
  .login
    #firebaseui-auth
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import firebaseui from 'firebaseui'

  @Component
  export default class Login extends Vue {
    private mounted() {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('firebaseui-auth', {
        signInSuccessUrl: '',
      })
    }
  }
</script>

<style scoped lang="stylus">

</style>
