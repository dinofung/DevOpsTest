<template lang="pug">
  #q-app
    router-view
</template>

<script>
import loginManager from './util/loginManager'
export default {
  name: 'App',
  mounted() {
    loginManager.init(window.location.origin)
    // const version = window.location.origin
    // console.debug(version)
  },
  created() {
    // loginManager.init()
  },
  methods: {},
}
</script>
