<template lang="pug">
  v-app(:dark="isDarkMode")
    v-toolbar(dark dense)
      v-toolbar-title.title
        router-link(tag="div" to="/") VRC Groups
      v-spacer
      v-toolbar-items
        v-btn(v-if="!$store.getters.userId" flat @click="showLogin") Login
        v-btn(v-else flat @click="$router.push({path: '/register'})") グループ新規登録
        v-btn(flat icon @click="toggleMode")
          v-icon brightness_2

    v-content
      router-view(@login="showLogin")

    v-footer(dark)
      v-layout(justify-center row wrap)
        v-flex(lighten-2 py-1 text-xs-center white--text xs12) &copy;2019 - LinaTsukusu

    v-dialog(v-if="!$store.getters.userId" v-model="loginDialog" width="500")
      v-card
        v-card-title.headline.grey.lighten-2(primary-title) Login
        v-card-text
          login
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Login from '@/components/Login.vue'
  import firebase from 'firebase/app'
  import 'firebase/firestore'

  @Component({
    components: {Login},
  })
  export default class App extends Vue {
    private loginDialog = false
    private isDarkMode = false

    private created() {
      this.isDarkMode = window.localStorage.darkMode === 'true'

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit('setUser', user)
          firebase.firestore().collection('users').doc(user.uid).onSnapshot((snapshot) => {
            if (snapshot.exists) {
              this.$store.commit('setUserData', snapshot.data())
            }
          })
        }
      })
    }

    private showLogin(url: string) {
      this.loginDialog = true
    }

    private toggleMode() {
      this.isDarkMode = !this.isDarkMode
      window.localStorage.setItem('darkMode', this.isDarkMode.toString())
    }
  }
</script>

<style scoped lang="stylus">
  .title
    cursor pointer
</style>
