const uuidv1 = require('uuid/v1')

const NS_PER_SEC = 1e9
const MS_PER_SEC = 1e6
const wrapAsync = func => async (req, res, next) => {
  const begin = process.hrtime()
  let result = null
  try {
    result = await func(req, res, next)
    res.status(200)
  } catch (error) {
    const { name, message, stack } = error
    result = { error: { name, message, stack } }
    res.status(500)
    // next
  } finally {
    const end = process.hrtime(begin)
    res.append('durationMs', (end[0] * NS_PER_SEC + end[1]) / MS_PER_SEC)
    res.json(result)
  }
}

const genUUID = () => uuidv1()

module.exports = { wrapAsync, genUUID }
