<template lang="pug">
  .setting-view
    setting(v-if="isEditor")
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Edit from '@/components/Edit.vue'
  import firebase from 'firebase/app'


  @Component({
    components: {Setting: Edit},
  })
  export default class EditView extends Vue {
    private isEditor = false
    private mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          this.$emit('login')
        } else if (!this.$store.state.userData.editorGroups.includes(this.$route.params.id)) {
          this.$router.push({path: '/'})
        } else {
          this.isEditor = true
        }
      })
    }
  }
</script>

<style scoped lang="stylus">

</style>
