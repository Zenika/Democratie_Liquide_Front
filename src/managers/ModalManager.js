import Modal from '../components/modal'
import Vue from 'vue'

let modal = new Vue({
  el: '#modal',

  data () {
    return {
      visible: false,
      renderContent: createElement => createElement('div')
    }
  },

  render: function (createElement, context) {
    let props = { visible: this.visible }
    let on = { close: () => { this.visible = false } }

    return createElement(Modal, { props, on }, [
      this.renderContent(createElement)
    ])
  }
})

export default {

  display (renderContent) {
    modal.renderContent = renderContent
    modal.visible = true
  }
}
