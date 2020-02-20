import axios from 'axios'
// import tools from './tools'
// const baseHost = `http://localhost:8080`
const loginManager = {
  assignId: null,
  async init(baseHost) {
    // let assignId = tools.getAssignId()
    // const baseHost = win.location.origin
    // console.debug(baseHost)
    const assignId = await axios
      .request({
        url: `${baseHost}/api/login`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'post',
        data: {},
        timeout: 0,
      })
      .then(response => response.data)
      .catch(error => console.error(error))
    // tools.saveAssignId(assignId)
    this.assignId = assignId
  },
}
export default loginManager
