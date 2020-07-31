import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _515e2aed = () => interopDefault(import('..\\pages\\components\\todoCreate.vue' /* webpackChunkName: "pages/components/todoCreate" */))
const _19c63fa4 = () => interopDefault(import('..\\pages\\components\\todoitem.vue' /* webpackChunkName: "pages/components/todoitem" */))
const _27a61bcf = () => interopDefault(import('..\\pages\\components\\todoList.vue' /* webpackChunkName: "pages/components/todoList" */))
const _93ba6a26 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/components/todoCreate",
    component: _515e2aed,
    name: "components-todoCreate"
  }, {
    path: "/components/todoitem",
    component: _19c63fa4,
    name: "components-todoitem"
  }, {
    path: "/components/todoList",
    component: _27a61bcf,
    name: "components-todoList"
  }, {
    path: "/",
    component: _93ba6a26,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
