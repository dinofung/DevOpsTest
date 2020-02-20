import _ from 'lodash'

export default {
  // mixins: [],
  methods: {
    showAlert({ title, type, message, position, autoClose }) {
      const defaultTimeout = 5
      let isClosed = false
      const icon = {
        positive: `<i aria-hidden="true" role="presentation" class="text-positive material-icons q-icon notranslate" style="font-size: 32px;">check_circle</i>`, //_outline
        negative: `<i aria-hidden="true" role="presentation" class="text-negative material-icons q-icon notranslate" style="font-size: 32px;">cancel</i>`,
        warning: `<i aria-hidden="true" role="presentation" class="text-warning material-icons q-icon notranslate" style="font-size: 32px;">warning</i>`,
        info: `<i aria-hidden="true" role="presentation" class="text-info material-icons q-icon notranslate" style="font-size: 32px;">info</i>`,
      }
      const html =
        type && icon[type]
          ? `<div class="row"><div class="col-1 q-ma-sm">${icon[type]}</div><div class="col q-ma-sm" style="white-space: pre-wrap;">${message}</div></div>`
          : `<div class="row"><div class="col q-ma-sm" style="white-space: pre-wrap;">${message}</div>`
      const dialog = this.$q
        .dialog({
          title,
          message: html,
          position,
          persistent: true,
          html: true,
        })
        .onDismiss(() => {
          isClosed = true
        })

      if (autoClose) {
        const closeTime = _.isNumber(autoClose) ? _.toNumber(autoClose) : defaultTimeout
        const closeTimer = setTimeout(() => {
          if (!isClosed) {
            dialog.hide()
          }
          clearTimeout(closeTimer)
        }, closeTime * 1000)
      }

      return dialog
    },
    // showWarning(msg, position, timeout) {
    //   const opt = _.merge({}, defOptions.notifyWarningOptions, {
    //     position,
    //     timeout,
    //   })
    //   if (_.isPlainObject(msg)) {
    //     _.merge(opt, msg)
    //   } else if (_.isString(msg)) {
    //     _.merge(opt, { message: msg })
    //   }
    //   this.$q.notify(opt)
    // },

    // showInformation(msg, position, timeout) {
    //   const opt = _.merge({}, defOptions.notifyInformationOptions, {
    //     position,
    //     timeout,
    //   })
    //   if (_.isPlainObject(msg)) {
    //     _.merge(opt, msg)
    //   } else if (_.isString(msg)) {
    //     _.merge(opt, { message: msg })
    //   }
    //   this.$q.notify(opt)
    // },

    // showError(error, position, timeout) {
    //   const opt = _.merge({}, defOptions.notifyErrorOptions, {
    //     position,
    //     timeout,
    //   })
    //   const { message } = error
    //   // if (_.isPlainObject(msg)) {
    //   //   _.merge(defOpt, msg)
    //   // } else if (_.isString(msg)) {
    //   _.merge(opt, { message: message || error })
    //   // }
    //   this.$q.notify(opt)
    // },

    // showErrorDialog(error, options) {
    //   const { title, timeout, message } = options || {}
    //   return this.$q.dialog({
    //     component: errorDialog,
    //     root: this.$root,
    //     title,
    //     error,
    //     timeout,
    //     message,
    //   })
    //   // .onOk(() => {
    //   //   console.log('OK')
    //   // })
    //   // .onCancel(() => {
    //   //   console.log('Cancel')
    //   // })
    //   // .onDismiss(() => {
    //   //   console.log('I am triggered on both OK and Cancel')
    //   // })
    // },

    // showConfirmDialog(msg, options) {
    //   const { title, timeout, confirmLabel, cancelLabel } = options || {}
    //   return this.$q.dialog({
    //     component: confirmDialog,
    //     root: this.$root,
    //     title,
    //     msg,
    //     timeout,
    //     confirmLabel,
    //     cancelLabel,
    //   })
    //   // .onOk(() => {
    //   //   // this.$emit('ok')
    //   //   // console.debug('OK')
    //   // })
    //   // .onCancel(() => {
    //   //   console.debug('Cancel')
    //   // })
    //   // .onDismiss(() => {
    //   //   console.debug('I am triggered on both OK and Cancel')
    //   // })
    // },

    // showInfoDialog(msg, options) {
    //   const { title, timeout } = options || {}
    //   return this.$q.dialog({
    //     component: infoDialog,
    //     root: this.$root,
    //     title,
    //     timeout,
    //     msg,
    //   })
    //   // .onOk(() => {
    //   //   console.log('OK')
    //   // })
    //   // .onCancel(() => {
    //   //   console.log('Cancel')
    //   // })
    //   // .onDismiss(() => {
    //   //   console.log('I am triggered on both OK and Cancel')
    //   // })
    // },
  },
}
