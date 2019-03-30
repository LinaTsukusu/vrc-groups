<template lang="pug">
  .register-view
    register(v-if="isLoggedIn")
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import firebase from 'firebase/app'
  import Register from '@/components/Register.vue'


  @Component({
    components: {Register}
  })
  export default class RegisterView extends Vue {
    private isLoggedIn = false
    private mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          this.$emit('login')
        } else {
          this.isLoggedIn = true
        }
      })
    }
  }
</script>

<style scoped lang="stylus">

</style>
