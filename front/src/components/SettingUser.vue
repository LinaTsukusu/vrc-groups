<template lang="pug">
  .setting-user
    v-alert(v-model="alert.show" :type="alert.type" dismissible) {{alert.message}}
    v-layout(justify-center row wrap)
      v-btn(flat color="warning" @click="confirmDialog = true") アカウントを削除する
        v-icon(right) warning

    v-dialog(v-model="confirmDialog" width="800")
      v-card
        v-card-title.headline.lighten-2(primary-title) アカウント削除
        v-card-text
          v-layout(justify-center row wrap)
            v-flex(xs12)
              span アカウントを削除しますか?
            v-flex(xs2)
              v-btn(@click="confirmDialog = false") キャンセル
            v-flex(xs2)
              v-btn(@click="removeUser" color="error") 削除
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import firebase from 'firebase/app'
  import 'firebase/firestore'
  
  
  @Component
  export default class SettingUser extends Vue {
    private alert = {
      show: false,
      type: 'success',
      message: '登録完了',
    }
    private confirmDialog = false

    private showAlert(success: boolean, message: string) {
      if (success) {
        this.alert.type = 'success'
      } else {
        this.alert.type = 'error'
      }
      this.alert.message = message
      this.alert.show = true
    }

    private async removeUser() {
      try {
        const user = firebase.auth().currentUser!
        await user.delete()
        location.reload()
      } catch (e) {
        this.confirmDialog = false
        this.showAlert(false, '再度ログインし直してから実行してください')
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
