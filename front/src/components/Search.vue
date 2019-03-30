<template lang="pug">
  .search
    v-layout(justify-center row wrap)
      v-flex(xs6)
        v-text-field(
          v-model="search"
          append-outer-icon="search"
          clear="mdi-close-circle"
          clearable
          type="text"
          label="Search"
          @click:append-outer="searchGroup"
          @click:clear="clearSearch"
          )
      v-flex(xs10)
        v-list(v-if="groups" two-line)
          template(v-for="(group, index) in groups")
            v-list-tile(:key="group.name" avatar @click="showDetail")
              v-list-tile-avatar(size="64")
                img(:src="group.thumbnailUrl")
              v-list-tile-content
                v-list-tile-title(v-html="group.name")
                v-list-tile-sub-title
                  v-chip(v-for="tag in group.tags") {{tag}}
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import firebase from 'firebase/app'
  import 'firebase/firestore'

  
  @Component
  export default class Search extends Vue {
    private groups: Group[] = []
    private search = ''

    private mounted() {
      firebase.firestore().collection('groups').onSnapshot((snapshot) => {
        this.groups = snapshot.docs.map((v) => v.data() as Group)
      })
    }

    private searchGroup() {

    }

    private clearSearch() {
      this.search = ''
    }

    private showDetail(group: Group) {

    }
  }
</script>

<style scoped lang="stylus">

</style>
