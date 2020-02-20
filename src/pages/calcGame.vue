<template lang="pug">
  q-page(:style-fn='myTweak')
    //- q-toolbar(class='bg-grey-3')
    .q-pa-md
      q-toolbar.text-black
        .col.column
          .col.row.items-center
            q-btn(
              color='positive'
              @click='beginGame'
              ) Bgein Game
            q-space
            span.col-2 consume &nbsp; {{showSecond}}
            span.col-2 your score: &nbsp; {{score}}
          .col.row.items-center
            | &emsp;&emsp; 
            q-input.q-pa-sm(v-model='a' label='a' style='width:100px' dense disable)
            | X
            q-input.q-pa-sm(v-model='b' label='b' style='width:100px' dense disable)
            | X
            q-input.q-pa-sm(v-model='c' label='c' style='width:100px' dense disable)
            | =
            q-input.q-pa-sm(v-model='s' label='s' style='width:100px' dense)

            q-btn(
              color='info' 
              :disable='!begin'
              @click='onSubmit'
              ) Submit
      //- img(
      //-   alt='Quasar logo'
      //-   src='~assets/quasar-logo-full.svg'
      //-   )
</template>

<script>
import _ from 'lodash'
import notify from '../mixin/notify'
export default {
  name: 'PageCalcGame',
  components: {},
  mixins: [notify],
  data() {
    return {
      a: 0,
      b: 0,
      c: 0,
      s: '',
      score: 0,
      second: 0,
      countSecond: null,
      begin: false,
    }
  },
  computed: {
    showSecond() {
      const m = Math.floor(this.second / 60)
      const s = this.second - m * 60
      return `${m}:${s}`
    },
  },
  methods: {
    myTweak(offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh', overflow: 'auto' }
    },
    genRandom(n) {
      return Math.round(Math.random() * Math.pow(10, n) * 100) / 100
    },
    beginGame() {
      this.score = 0
      this.genQuestion()
      this.begin = true
    },
    genQuestion() {
      if (!_.isNil(this.countSecond)) {
        clearInterval(this.countSecond)
        this.second = 0
        this.countSecond = null
      }

      this.a = this.genRandom(1)
      this.b = this.genRandom(1)
      this.c = this.genRandom(2)
      this.s = ''
      this.beginTime = new Date()
      if (_.isNil(this.countSecond)) {
        this.countSecond = setInterval(() => {
          ++this.second
        }, 1000)
      }
    },
    calcResult() {
      const s1 = Math.round((Math.round(this.a * this.b * 100) / 100) * this.c * 100) / 100
      const s2 = Math.round((Math.round(this.a * this.c * 100) / 100) * this.b * 100) / 100
      const s3 = Math.round((Math.round(this.c * this.b * 100) / 100) * this.a * 100) / 100
      const s4 = Math.round(this.a * this.b * this.c * 100) / 100
      return Array.from(new Set([s1, s2, s3, s4]))
    },
    calcConsume(beginTime) {
      const endTime = new Date()
      const ms = endTime.getTime() - new Date(beginTime).getTime()
      const s = Math.round(ms / 1000)
      return s
    },
    onSubmit() {
      const perMinute = 60
      const t = this.calcConsume(this.beginTime)
      const answers = this.calcResult()
      const myAnswer = _.toNumber(this.s)
      const isCorrect = answers.includes(myAnswer)

      const alertOption = {}
      if (isCorrect) {
        _.merge(alertOption, {
          title: 'Correct',
          type: 'positive',
          autoClose: 1.5,
        })
        if (t <= 3 * perMinute) {
          alertOption.message = `Great! You are Wonderful!`
          this.score += 20
        } else if (t <= 4 * perMinute) {
          alertOption.message = `Good! Well done.`
          this.score += 10
        } else if (t <= 5 * perMinute) {
          alertOption.message = `Good! Not bad.`
          this.score += 5
        } else {
          alertOption.message = `Ok, But so slow.`
        }
      } else {
        _.merge(alertOption, {
          type: 'negative',
          title: 'Mistake',
          message: `Sorry, Your answer(${this.s}) is mistake! The correct is ${answers.join(' or ')}`,
          autoClose: false,
        })
        if (t > 5 * perMinute) {
          this.score += -20
        } else {
          this.score += -10
        }
      }
      this.showAlert(alertOption).onDismiss(() => {
        this.genQuestion()
      })
    },
  },
}
</script>
