import tableBar from './index.vue';

tableBar.install = Vue => Vue.component(tableBar.name, tableBar);//注册组件

export default tableBar;