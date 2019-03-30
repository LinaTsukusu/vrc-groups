<template lang="pug">
  .register
    v-container(text-xs-center grid-list-md)
      v-form(v-model="form")
        h2.display-1 グループ登録
        v-layout(justify-center row wrap)
          v-flex(xs12 lg6)
            v-text-field(v-model="group.name" label="グループ名" :rules="[rules.required,]")
        v-layout(justify-center row wrap)
          v-flex(xs12 lg6)
            v-textarea(v-model="group.bio" label="詳細" :rules="[rules.required,]")
        v-layout(justify-center row wrap)
          v-flex(xs12 lg6)
            v-text-field(v-model="group.thumbnailUrl" label="サムネイルURL")
        v-layout(justify-center row wrap)
          v-flex(xs12 lg6)
            v-text-field(v-model="group.discord" label="Discord")
        v-layout(justify-center row wrap)
          v-flex(xs12 lg6)
            v-text-field(v-model="group.baseWorldId" label="拠点ワールドID")
        v-layout(justify-center row wrap)
          v-flex(xs12 lg6)
            v-combobox(v-model="group.tags" :items="[]" label="タグ" persistent-hint chips multiple clearable hide-selected)
              template(v-slot:selection="data")
                v-chip(close :selected="data.selected" @input="removeTag(data.item, group.tags)") {{data.item}}
        v-layout(justify-center row wrap)
          v-flex(xs12 lg6)
            v-text-field(v-model="group.owner" label="リーダー VRChatID" :rules="[rules.required,]")
        v-layout(justify-center row wrap)
          v-flex(xs12 lg6)
            v-combobox(v-model="group.members" :items="[]" label="メンバー VRChatID" persistent-hint chips multiple clearable hide-selected)
              template(v-slot:selection="data")
                v-chip(close :selected="data.selected" @input="removeTag(data.item, group.members)") {{data.item}}
        v-layout(justify-center row wrap)
          v-flex(xs12 lg6)
            v-menu(v-model="dateMenu")
              template(v-slot:activator="{ on }")
                v-text-field(v-model="date" label="設立日" v-on="on")
              v-date-picker(v-model="date")
        v-layout(justify-center row wrap)
          v-flex(xs12 lg6)
            v-btn(depressed large color="primary" @click="registerGroup") 登録


</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator'
  import firebase from 'firebase'
  import 'firebase/firestore'
  import {DB} from '@/enum/db'

  @Component
  export default class Register extends Vue {
    private form = false
    private dateMenu = false
    private date = new Date().toISOString().substr(0, 10)

    private rules = {
      required: (value: string) => !!value || '必須項目'
    }

    private group: Group = {
      name: '',
      bio: '',
      thumbnailUrl: '',
      discord: '',
      baseWorldId: '',
      owner: '',
      members: [],
      tags: [],
      since: new Date(this.date),
    }

    private async registerGroup() {
      console.log(this.group)
      console.log(this.form)
      if (this.form) {
        await firebase.firestore().collection(DB.groups).add(this.group)

      }
    }

    private removeTag(item: string, arr: string[]) {
      arr.splice(arr.indexOf(item), 1)
    }

    @Watch('date')
    private onChangeDate(value: string) {
      this.group.since = new Date(value)
    }
  }
</script>

<style scoped lang="stylus">

</style>
