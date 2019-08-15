import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/global.scss'

Vue.config.productionTip = false;
Vue.use(ElementUI);

/**
 * 增加组件通信的中间组件 bus
 * 
 * 发送事件
 * this.bus.$emit("onChangeAuditList");
 * 监听后的执行
 * this.bus.$on("onChangeAuditList", () => {});
 */
let bus = new Vue();
Vue.prototype.bus = bus;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
