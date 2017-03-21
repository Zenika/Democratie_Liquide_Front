import Modal from '@/components/modal'
import Vue from 'vue'
import store from '@/store/index'

let modal = new Vue({
  el: '#modal',
  store,

  data () {
    return {
      visible: false,
      title: '',
      renderContent: null,
      onClose: null
    }
  },

  render: function (createElement, context) {
    let props = { visible: this.visible, title: this.title }
    let on = { close: () => {
      this.visible = false
      this.onClose && this.onClose()
      this.renderContent = null
    } }

    return createElement(Modal, { props, on }, [
      this.renderContent && this.renderContent(createElement)
    ])
  }
})

export default {

  display (title, renderContent, onClose) {
    modal.title = title
    modal.renderContent = renderContent
    modal.onClose = onClose
    modal.visible = true
  }
}
