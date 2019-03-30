<template lang="pug">
  .login
    h1 login
    #firebaseui-auth
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import firebase from 'firebase/app'
  import firebaseui from 'firebaseui'
  import 'firebaseui/dist/firebaseui.css'


  @Component
  export default class Login extends Vue {
    private mounted() {
      console.log('aaa')
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('firebaseui-auth', {
        signInSuccessUrl: this.$route.params.to,
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
      })
    }
  }
</script>

<style scoped lang="stylus">

</style>
