import formBar from './index.vue';

formBar.install = Vue => Vue.component(formBar.name, formBar);//注册组件

export default formBar;