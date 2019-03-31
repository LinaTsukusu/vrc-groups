<template lang="pug">
  .detail
    v-card
      v-card-title.headline.grey.lighten-2(primary-title)
        v-avatar(size="48px"): img(:src="group.thumbnailUrl")
        span {{group.name}}
      v-card-text
        v-container(grid-list-md)
          v-layout(justify-center row wrap)
            v-flex(xs2 align-self-baseline) bio
            v-flex(xs9 v-html="bio()")
          v-divider
          v-layout(v-if="group.tags" justify-center row wrap)
            v-flex(xs2 align-self-baseline) タグ
            v-flex(xs9)
              v-chip(v-for="tag in group.tags") {{tag}}
          v-divider(v-if="group.tags")
          v-layout(v-if="group.discord" justify-center row wrap)
            v-flex(xs2 align-self-baseline) Discordサーバ
            v-flex(xs9)
              v-btn(color="primary" @click="openUrl(group.discord)") Discord
          v-divider(v-if="group.discord")
          v-layout(v-if="group.baseWorldId" justify-center row wrap)
            v-flex(xs2 align-self-baseline) 拠点ワールド
            v-flex(xs9)
              v-btn(color="primary" @click="openUrl(`https://vrchat.net/home/world/${group.baseWorldId}`)") ワールドページ
          v-divider(v-if="group.baseWorldId")
          v-layout(justify-center row wrap)
            v-flex(xs2 align-self-baseline) リーダー VRChatID
            v-flex(xs9 align-self-center) {{group.owner}}
          v-divider
          v-layout(justify-center row wrap)
            v-flex(xs2 align-self-baseline) 設立日
            v-flex(xs9 align-self-center) {{group.since.toDate().toLocaleDateString()}}

</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'

  @Component
  export default class Detail extends Vue {
    @Prop()
    private group!: Group

    private bio() {
      return this.group.bio.replace(/\n/g, '<br>')
    }

    private openUrl(url: string) {
      window.open(url)
    }
  }
</script>

<style scoped lang="stylus">

</style>
