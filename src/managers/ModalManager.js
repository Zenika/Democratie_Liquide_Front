import Modal from '../components/modal'
import Vue from 'vue'

let modal = new Vue({
  el: '#modal',
  data () {
    return {
      visible: false,
      title: '',
      renderContent: createElement => createElement('div')
    }
  },

  methods: {
    show () {
      this.visible = true
    },

    hide () {
      this.visible = false
    }
  },

  render: function (createElement, context) {
    let props = { title: this.title }
    let style = this.visible ? {} : { display: 'none' }
    let on = { close: this.hide }
    let domProps = this.html ? { innerHTML: this.html } : {}

    return createElement(Modal, { props, style, on, domProps }, [ this.renderContent(createElement) ])
  }
})

export default {

  display (title, renderContent) {
    modal.title = title
    modal.renderContent = renderContent
    modal.show()
  }
}
