<template lang="pug">
  .search-view
    search
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Search from '@/components/Search.vue'
  @Component({
    components: {Search},
  })
  export default class SearchView extends Vue {
    private mounted() {
      if (this.$route.query.to) {
        this.$emit('login', this.$route.query.to)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
