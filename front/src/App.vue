<template lang="pug">
  v-app(:dark="isDarkMode")
    v-toolbar(dark dense)
      v-toolbar-side-icon(@click="menu = !menu")
      router-link(to="/")
        v-avatar(size="48px" tile): img(src="./assets/logo.png")
      v-toolbar-title.title: router-link(tag="div" to="/") VRC Groups
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(v-if="!$store.getters.userId" flat @click="showLogin") Login
        v-btn(v-else flat @click="$router.push({path: '/register'})") グループ新規登録
        v-btn(flat icon @click="toggleMode"): v-icon brightness_2
      v-toolbar-items.hidden-md-and-up
        v-btn(v-if="!$store.getters.userId" flat @click="showLogin" icon): v-icon input
        v-btn(v-else flat @click="$router.push({path: '/register'})" icon): v-icon group_add
        v-btn(flat icon @click="toggleMode"): v-icon brightness_2

    v-content
      router-view(@login="showLogin")
      v-navigation-drawer(v-model="menu" absolute temporary)
        v-list
          v-list-tile(v-if="$store.state.user")
            v-list-tile-avatar(size="32px")
              img(v-if="$store.state.user.photoURL" :src="$store.state.user.photoURL")
              v-icon(v-else large) account_circle
            v-list-tile-content
              v-list-tile-title {{$store.state.user.displayName || $store.state.user.email}}
          v-list-tile(v-else @click="showLogin")
            v-list-tile-action: v-icon arrow_forward
            v-list-tile-content: v-list-tile-title Login
          v-divider
          v-list-tile(v-if="$store.state.user" @click="$router.push({path: '/register'})")
            v-list-tile-action: v-icon group_add
            v-list-tile-content: v-list-tile-title グループ新規登録
          v-divider
          v-list-tile(v-if="$store.state.user" @click="editDialog = true")
            v-list-tile-action: v-icon edit
            v-list-tile-content: v-list-tile-title ユーザ情報編集
          v-list-tile(v-if="$store.state.user" @click="logout")
            v-list-tile-action: v-icon arrow_back
            v-list-tile-content: v-list-tile-title Logout

    v-footer(dark)
      v-layout(justify-center row wrap)
        v-flex(lighten-2 py-1 text-xs-center white--text xs12) &copy;2019 - LinaTsukusu

    v-dialog(v-if="!$store.getters.userId" v-model="loginDialog" width="500")
      v-card
        v-card-title.headline.grey.lighten-2(primary-title) Login
        v-card-text
          login
    v-dialog(v-if="$store.state.user" v-model="editDialog" width="500")
      v-card
        v-card-title.headline.grey.lighten-2(primary-title) ユーザ情報編集
        v-card-text
          setting-user
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Login from '@/components/Login.vue'
  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import SettingUser from '@/components/SettingUser.vue'
  import {DB} from '@/enum/db'

  @Component({
    components: {SettingUser, Login},
  })
  export default class App extends Vue {
    private loginDialog = false
    private editDialog = false
    private isDarkMode = false
    private menu = false

    private created() {
      this.isDarkMode = window.localStorage.darkMode === 'true'

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit('setUser', user)
          firebase.firestore().collection(DB.userdata).doc(user.uid).onSnapshot((snapshot) => {
            if (snapshot.exists) {
              this.$store.commit('setUserData', snapshot.data())
            }
          })
        } else {
          this.$store.commit('setUser', null)
          this.$store.commit('setUserData', null)
        }
      })
    }

    private showLogin() {
      this.loginDialog = true
    }

    private toggleMode() {
      this.isDarkMode = !this.isDarkMode
      window.localStorage.setItem('darkMode', this.isDarkMode.toString())
    }

    private logout() {
      firebase.auth().signOut()
      location.reload()
    }
  }
</script>

<style scoped lang="stylus">
  .title
    cursor pointer
</style>
