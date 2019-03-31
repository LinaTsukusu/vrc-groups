<template lang="pug">
  .search
    v-layout(justify-center row wrap)
      v-flex(xs11 lg6)
        v-text-field(
          v-model="search"
          append-outer-icon="search"
          clear="mdi-close-circle"
          clearable
          type="text"
          label="Search"
          @click:append-outer="searchGroup"
          @change="searchGroup"
          @click:clear="clearSearch"
          )
      v-flex(xs12 lg10)
        v-list(v-if="groups" two-line)
          template(v-for="(group, index) in displayList")
            v-list-tile(:key="group.name" avatar @click="showDetail(group)")
              v-list-tile-avatar(size="64")
                img(v-if="group.thumbnailUrl" :src="group.thumbnailUrl")
                v-icon(v-else large) group
              v-list-tile-content
                v-list-tile-title(v-html="group.name")
                v-list-tile-sub-title
                  v-chip(v-for="tag in group.tags" @click="searchTag(tag)") {{tag}}
            v-divider(v-if="index + 1 < displayList.length")
    v-dialog(v-if="selected" v-model="selected" width="800")
      detail(:group="selected")
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import Detail from '@/components/Detail.vue'
  @Component({
    components: {Detail},
  })
  export default class Search extends Vue {
    private groups: Group[] = []
    private displayList: Group[] = []
    private search = ''
    private selected: Group | null = null
    private shouldShow = true

    private mounted() {
      firebase.firestore().collection('groups').onSnapshot((snapshot) => {
        this.groups = snapshot.docs.map((v) => v.data() as Group)
        if (!this.search) {
          this.displayList = this.groups
        }
      })
    }

    private searchGroup() {
      console.log('search')
      if (this.search) {
        this.displayList = this.groups.filter((s) => {
          return s.name.includes(this.search)
            || !!s.tags.find((t) => t.includes(this.search))
            || s.bio.includes(this.search)
            || s.owner.includes(this.search)
        })
      } else {
        this.clearSearch()
      }
    }

    private searchTag(tag: string) {
      this.shouldShow = false
      this.search = tag
      this.searchGroup()
    }

    private clearSearch() {
      this.search = ''
      this.displayList = this.groups
    }

    private showDetail(group: Group) {
      if (this.shouldShow) {
        this.selected = group
      } else {
        this.shouldShow = true
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
