<template lang="pug">
  q-layout(view='hHh lPr fFf')
    q-header(elevated)
      q-toolbar
        q-btn(
          flat
          dense
          round
          @click='setLeftDrawerOpen(!leftDrawerOpen)'
          icon='menu'
          aria-label='Menu'
          )
        q-toolbar-title My Test
        div Quasar v{{ $q.version }}
        q-btn-dropdown(
          label='Language'
          :icon-right='`img:statics/flag/${language}.png`'
          flat
          )
          q-list
            q-item(
              clickable
              v-close-popup
              @click='choiseLanguage("en-us")'
              )
              q-item-section English
              q-item-section(avatar)
                q-icon(name='img:statics/flag/en-us.png')
            q-item(
              clickable
              v-close-popup
              @click='choiseLanguage("zh-cn")'
              )
              q-item-section 简体中文
              q-item-section(avatar)
                q-icon(name='img:statics/flag/zh-cn.png')
    q-footer
      q-toolbar
        q-toolbar-title Footer
    router-view
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'MyLayout',
  mounted() {
    this.language = window.navigator.language.toLowerCase()
  },
  data() {
    return {
      language: 'en-us',
    }
  },
  computed: {
    ...mapState('master', ['leftDrawerOpen']),
  },
  methods: {
    ...mapMutations('master', ['setLeftDrawerOpen']),
    choiseLanguage(lan) {
      this.language = lan
    },
  },
  watch: {
    language: {
      handler(val) {
        this.$i18n.locale = val
      },
    },
  },
}
</script>
