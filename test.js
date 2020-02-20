const { genUUID } = require('./src-ssr/common')
const _ = require('lodash')

;(async () => {
  const arg = process.argv.slice(2)
  const max = _.toNumber(arg)
  if (_.isNumber(max)) {
    const x = ' '.repeat(max).split('')
    const uuidList = await Promise.all(x.map(() => genUUID()))
    const uuidSet = new Set(uuidList)
    console.debug(uuidList.length, uuidSet.size)
  }
})()
