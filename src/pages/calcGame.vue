<template lang="pug">
  q-page(:style-fn='myTweak')
    q-resize-observer(@resize='onResize')
    .q-pa-xs(ref='main')
      sticky-header-table(
        :data='tableRows'
        :columns='tableColumns'
        :pagination='pagination'
        :tableHeight='tableHeight'
        :table-header-style="{ backgroundColor: '#eee' ,textTransform:'uppercase'}"
        row-key='_id'
        hide-bottom
        @rowClick='rowClick'
        )
        template(v-slot:top)
          q-btn(
            color='positive'
            @click='beginGame'
            ) Bgein Game
          q-space
          span.col-2.text-uppercase consume &nbsp; {{showSecond}}
          span.col-2.text-uppercase your score: &nbsp; {{score}}
        template(v-slot:body='props')
          q-tr(:props='props')
            q-td()
              .col.row.items-center(v-if='!props.row.result')
                | &emsp;&emsp; 
                q-input.q-pa-sm(v-model='a' label='a' style='width:100px' dense disable)
                | X
                q-input.q-pa-sm(v-model='b' label='b' style='width:100px' dense disable)
                | X
                q-input.q-pa-sm(v-model='c' label='c' style='width:100px' dense disable)
                | =
                q-input.q-pa-sm(v-model='s' label='s' style='width:100px' dense)
              .col.row.items-center(v-else) 
                span.col {{props.cols[0].value}}
                q-space 
                span {{props.row.consuming}} second
                q-icon.col-1.text-positive(v-if='props.row.isCorrect' name='check_circle' style='font-size: 24px;')
                q-icon.col-1.text-negative(v-else name='cancel' style='font-size: 24px;')
            q-td
              q-btn(
                v-if='!props.row.result'
                color='info' 
                :disable='!begin'
                @click='onSubmit'
                ) Submit
              span(v-else) {{props.cols[1].value}}
            q-td
              span(v-if='!props.row.result') 0
              span(v-else) {{props.cols[2].value}}
            
    //- q-toolbar(class='bg-grey-3')
    //- .q-pa-md
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
import stickyHeaderTable from '../components/stickyHeaderTable'
import tools from '../util/tools'
export default {
  name: 'PageCalcGame',
  components: { stickyHeaderTable },
  mixins: [notify],
  mounted() {
    this.pagePadding = tools.getPaddingValue(this.$refs.main)
    console.debug(this.$el.ownerDocument)
  },
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

      pageSize: {},
      pagePadding: {},
      pagination: {
        rowsPerPage: 0,
      },
      tableTopHeight: 60,
      historyList: [],
    }
  },
  computed: {
    showSecond() {
      const m = Math.floor(this.second / 60)
      const s = this.second - m * 60
      return `${m}:${s}`
    },
    tableHeight() {
      const { height } = this.pageSize
      const { top, bottom } = this.pagePadding
      return height - top - bottom - this.tableTopHeight
    },
    tableColumns() {
      return [
        {
          name: 'equation',
          label: 'equation',
          align: 'left',
          field: 'equation',
        },
        {
          name: 'result',
          label: 'result',
          align: 'left',
          field: 'result',
        },
        {
          name: 'score',
          label: 'score',
          align: 'left',
          field: 'score',
        },
      ]
    },
    tableRows() {
      return this.begin
        ? [
            {
              equation: '1',
              result: '',
              score: '',
            },
            ...this.historyList,
          ]
        : this.historyList
    },
  },
  methods: {
    myTweak(offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh', overflow: 'auto' }
    },
    rowClick(index, row) {
      console.debug({ index, row })
    },
    onResize(size) {
      console.debug(size)
      this.pageSize = size
    },
    genRandom(n) {
      return Math.round(Math.random() * Math.pow(10, n) * 100) / 100
    },
    beginGame() {
      this.score = 0
      this.genQuestion()
      this.begin = true
      this.historyList = []
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
      let score = 0

      const alertOption = {}
      if (isCorrect) {
        _.merge(alertOption, {
          title: 'Correct',
          type: 'positive',
          autoClose: 1.5,
        })
        if (t <= 3 * perMinute) {
          alertOption.message = `Great! You are Wonderful!`
          score = 20
        } else if (t <= 4 * perMinute) {
          alertOption.message = `Good! Well done.`
          score = 10
        } else if (t <= 5 * perMinute) {
          alertOption.message = `Good! Not bad.`
          score = 5
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
          score = -20
        } else {
          score = -10
        }
      }
      this.score += score
      const row = {
        equation: ` ${this.a} X ${this.b} X ${this.c} = ${this.s} `,
        result: answers,
        isCorrect,
        consuming: t,
        score,
      }
      this.showAlert(alertOption).onDismiss(() => {
        this.historyList.splice(0, 0, row)
        this.genQuestion()
      })
    },
  },
}
</script>
