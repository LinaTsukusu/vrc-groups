<template lang="pug">
  v-app
    v-toolbar
      v-toolbar-title VRC Groups
      v-spacer
      v-toolbar-items
        v-btn(v-if="!$store.getters.userId" flat @click="showLogin") Login
        v-btn(v-else flat @click="$router.push({path: '/register'})") グループ新規登録

    v-content
      router-view(@login="showLogin")

    v-footer
      v-layout(justify-center row wrap)
        v-flex(primary lighten-2 py-3 text-xs-center white--text xs12) &copy;2019 - LinaTsukusu

    v-dialog(v-if="!$store.getters.userId" v-model="loginDialog" width="50vw")
      v-card
        v-card-title.headline.grey.lighten-2(primary-title) Login
        v-card-text
          login
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Login from '@/components/Login.vue'
  import firebase from 'firebase/app'

  @Component({
    components: {Login},
  })
  export default class App extends Vue {
    private loginDialog = false

    private created() {
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
  }
</script>
