<template lang="pug">
  main
    q-drawer(
      :value='leftDrawerOpen'
      show-if-above
      bordered
      content-class='bg-grey-2'
      )
      q-scroll-area.fit
        q-list
          q-item(
            clickable
            @click='$router.push({ name: "CalcGame" }).catch(err => {err})'
            )
            q-item-section
              q-item-label Calc Test
              //- q-item-label(caption)
    q-page-container
      router-view
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PageIndex',
  components: {},
  data() {
    return {}
  },
  mounted() {},
  computed: {
    ...mapState('master', ['leftDrawerOpen']),
  },
  methods: {
    ddd() {
      this.$router.push({ name: 'CalcGame' })
    },
  },
}
</script>
