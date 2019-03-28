<template lang="pug">
  .login
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
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('firebaseui-auth', {
      signInSuccessUrl: '',
    })
  }
}
</script>

<style scoped lang="stylus">

</style>
