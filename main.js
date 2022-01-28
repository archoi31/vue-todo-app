import Vue from 'vue'
import App from './App'

// main.js 진입점
// App.vue 최상위 컴포넌트

new Vue({
  el: '#app',
  render: h => h(App) // h는 createElement의 축약형
})
