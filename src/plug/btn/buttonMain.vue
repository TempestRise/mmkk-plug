<!-- 页面按钮组件 -->
<template>
  <div id="btnBar" class="btn-bar">
    <span v-for="(item, index) in list" :key="index">
      <!------------------------------------- slot returnType=1 返回文件对象 2 返回json ------------------------------------>
      <span>
        <slot v-if="item.btnType == 'slot'" class="btn" :name="item.value" :row="item" />
      </span>
      <!-------------------------------------  普通按钮  ------------------------------------>
      <el-button
        v-if="!item.btnType"
        v-waves
        class="btn"
        :icon="item.icon"
        :type="item.type ? item.type : item.type == '' ? '' : 'primary'"
        :size="item.size || 'small'"
        @click="BtnClick(item, index)"
      >
        {{ item.label }}
      </el-button>
    </span>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import waves from '../../directive/waves'
export default {
  name: 'mmkk-button',
  directives: {
    waves
  },
  // import引入的组件需要注入到对象中才能使用
  props: {
    /**
     * icon: 图标
     * type: 按钮类型
     * size: 按钮大小
     * label: 按钮名称
     * value: 按钮对应值
     */
    btnList: {
      type: Array,
      default: () => []
    },
    // 判断使用接口返回来的数据 还是父组件传过来的
    isAuthority: {
      type: Boolean,
      default: true
    }

  },
  data() {
    // 这里存放数据
    return {
      showHide: true,
      list: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log('进入按钮组件', this.$router.history.current.meta.resource)
    if (this.isAuthority) {
      var newlist = this.$router.history.current.meta.resource
      newlist.forEach(element => {
        if (element.name && element.resourceType == 30) {
          element.label = element.name
          this.list.push(element)
        }
      })
    } else {
      this.list = this.btnList
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // bus.$on('tableListData', (msg) => {
    //   this.showHide = msg
    // })
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() {
    // this.bus.$off('tableListData')
  }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    BtnClick(row, index) {
      this.$emit('btnClick', row, index)
    },

    // 选择文件 文件上传
    beforeUpload(file, item, index) {
      // console.log(file, item, index)
      // debugger
      const fileSize = file.size / 1024 / 1024 < 10
      // 判断文件大小
      if (fileSize) {
        if (item.returnType == 1) {
          const code = item.code
          const val = {
            file,
            item,
            code
          }
          this.$emit('btnClick', val, index)
          return false
        }
        return true
      }
      this.$message({
        message: '文件过大，请分批上传',
        type: 'warning'
      })
      return false
    },
    // 文件提交
    onSuccess(results, header, item, index) {
      // console.log('文件提交', results, header)
      const code = item.code
      const val = {
        results,
        header,
        item,
        code
      }
      this.$emit('btnClick', val, index)
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
.btn-bar {
  float: right;
  padding: 3px 0;
  display: flex;
  justify-content: flex-end;
  .btn {
    margin: 0 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}

.tip-bar {
  line-height: 35px;
  font-size: 14px;
  color: #333;
  span {
    margin-right: 20px;
    border-left: 3px #cf995f solid;
    padding-left: 5px;
    i {
      font-weight: bolder;
      font-style: normal;
      color: #ff0000;
    }
  }
}
</style>
