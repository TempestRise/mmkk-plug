<template>
  <div class="table">
    <el-empty v-if="dataList.length == 0 && !isSkeleton" :description="description" />
    <el-skeleton v-else-if="dataList.length == 0 && isSkeleton" style="width: 100%" :loading="dataList.length == 0" animated :rows="12" />
    <div v-else class="table-bar">
      <div v-if="tableOption" class="option-bar">
        <el-dropdown :hide-on-click="false" :min="1">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown" class="dropdown-menu">
            <el-checkbox-group v-model="optionFrom">
              <el-dropdown-item>
                <!-- <el-checkbox :label="itm.label" :checked="itm.checked" /> -->
                <draggable
                  :list="optionList"
                  v-bind="$attrs"
                  class="board-column-content"
                  :set-data="setData"
                >
                  <el-row
                    v-for="(itm, ind) in optionList"
                    :key="ind"
                    class="item-menu"
                  >
                    <el-col :span="12">
                      <el-checkbox-group v-model="itm.checked" size="small">
                        <el-checkbox
                          :label="itm.label"
                          :checked="itm.checked"
                        />
                      </el-checkbox-group>
                    </el-col>
                    <el-col class="align-right" :span="12">
                      <el-switch
                        v-model="itm.fixed"
                        :disabled="itm.fixedDisabled"
                      />
                    </el-col>
                  </el-row>
                </draggable>
              </el-dropdown-item>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 表格 -->

      <el-table
        ref="multipleTable"
        :data="dataList"
        style="width: 100%"
        class="table_bar_style"
        empty-text="暂无数据"
        :max-height="height"
        :enterable="true"
        tooltip-effect="light"
        border
        stripe
        :row-key="rowKey"
        :tree-props="{ children: 'children', hasChildren: false }"
        @selection-change="selectionChange"
        @sort-change="sortChange"
      >
        <el-table-column
          v-if="selection"
          align="center"
          type="selection"
          width="60"
          fixed
        />
        <el-table-column
          v-if="numberSerial"
          type="index"
          align="center"
          label="序号"
          width="60"
          fixed
        />
        <template v-for="(item, index) in optionList">
          <el-table-column
            v-if="item.checked"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"
            :show-overflow-tooltip="item.showTooltip"
            :align="item.align || 'center'"
            :header-align="item.headerAlign || 'center'"
            :sortable="item.sortable"
            :fixed="item.fixed"
          >
            <template slot-scope="scope">
              <!-- ------------------ 根据数据展示相应的文字  filter  --------------- -->
              <span v-if="item.filter && item.filter.length > 0">
                <span v-for="(itm, inx) in item.filter" :key="inx">
                  <span v-if="itm.value === scope.row[item.prop]">
                    <span
                      v-if="item.copy"
                      v-clipboard:copy="itm.lable"
                      v-clipboard:success="clipboardSuccess"
                      style="cursor: pointer"
                    >{{ itm.lable }}</span>
                    <span v-else>{{ itm.lable }}</span>
                  </span>
                </span>
              </span>
              <!-- ----------------------- 可跳转  link  --------------------------- -->
              <span
                v-else-if="item.link"
                class="link-text"
                @click="onLink(scope.row, item, scope.$index)"
              >{{ scope.row[item.prop] || "--" }}</span>

              <!-- ----------------------- 图片  img  --------------------------- -->
              <span
                v-else-if="item.img"
                class="link-text"
                @click="onLink(scope.row, item, scope.$index)"
              >
                <el-image
                  fit="cover"
                  :src="scope.row[item.prop]"
                  :preview-src-list="[scope.row[item.prop]]"
                >
                  <div slot="placeholder" class="image-slot">
                    加载中
                    <span class="dot">...</span>
                  </div>
                  <div slot="error" class="image-slot">
                    <i
                      class="el-icon-picture-outline"
                      style="font-size: 24px"
                    />
                  </div>
                </el-image>
              </span>
              <!-- ----------------------- slot  slot  --------------------------- -->
              <span
                v-else-if="item.slot"
                @click="onLink(scope.row, item, scope.$index)"
              >
                <slot
                  :name="item.prop"
                  :sindex="scope.$index"
                  :row="scope.row"
                  :sitem="item"
                />
              </span>
              <!-- 正常展示值 -->
              <span v-else>
                <span
                  v-if="item.copy"
                  v-clipboard:copy="scope.row[item.prop]"
                  v-clipboard:success="clipboardSuccess"
                  style="cursor: pointer"
                >{{ scope.row[item.prop] || "--" }}</span>
                <span v-else>
                  {{
                    scope.row[item.prop] === ""
                      ? "--"
                      : scope.row[item.prop] === undefined
                        ? "--"
                        : scope.row[item.prop]
                  }}
                </span>
              </span>
            </template>
          </el-table-column>
        </template>

        <el-table-column
          v-if="listBtn.length > 0"
          align="center"
          fixed="right"
          label="操作"
          :width="operationWidth"
        >
          <template slot-scope="scope">
            <span
              v-for="(btnitem, btnindex) in listBtn"
              :key="btnindex"
              class="btn-span"
            >
              <!-- ----------------------- 过滤  filter  --------------------------- -->
              <span v-if="btnitem.filter && btnitem.filter.length > 0">
                <el-button
                  v-if="btnFilter(btnitem.filter, scope.row, btnitem)"
                  class="option-btn"
                  :icon="btnitem.icon"
                  :type="btnitem.type ? btnitem.type : 'text'"
                  :size="btnitem.size || 'small'"
                  @click.stop="
                    btnClick(scope.row, btnitem, scope.$index, btnindex)
                  "
                >{{ btnitem.label }}</el-button>
              </span>
              <!-- ----------------------- slot  slot  --------------------------- -->
              <span v-else-if="btnitem.slot">
                <slot
                  :name="btnitem.prop"
                  :sindex="btnindex"
                  :row="scope.row"
                  :sitem="btnitem"
                />
              </span>
              <!-- ----------------------- 普通按钮  --------------------------- -->
              <span v-else class="btn-span">
                <el-button
                  class="option-btn"
                  :type="btnitem.type ? btnitem.type : 'text'"
                  :size="btnitem.size || 'small'"
                  :icon="btnitem.icon"
                  @click.stop="
                    btnClick(scope.row, btnitem, scope.$index, btnindex)
                  "
                >{{ btnitem.label }}</el-button>
              </span>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <page-bar
      v-if="total > 0"
      :total="total"
      :page="paging[paging.pageName || 'pageIndex']"
      :limit="paging[paging.limitName || 'pageSize']"
      @pagination="pagination"
    />
  </div>
</template>
<script>
import clipboard from '../../directive/clipboard/index'
import pageBar from './components/pagination.vue'
import draggable from 'vuedraggable'
// import adaptive from '@/directive/el-table'
export default {
  name: 'mmkk-table',
  components: { pageBar, draggable },
  directives: {
    clipboard
    // adaptive
  },
  props: {
    dataList: {
      // 表格数据
      type: Array,
      default: () => []
    },
    tableColumn: {
      // 表格表头及设置
      type: Array,
      default: () => []
    },
    operationbtn: {
      // 操作列按钮
      type: Array,
      default: () => []
    },
    operationWidth: {
      // 列宽度
      type: String,
      default: '120px'
    },
    numberSerial: {
      // 是否显示序号
      type: Boolean,
      default: false
    },
    selection: {
      // 是否显示选择框
      type: Boolean,
      default: false
    },
    tableOption: {
      // 是否启用表格列操作按钮
      type: Boolean,
      default: false
    },
    total: {
      // 分页总条数
      type: Number,
      default: 0
    },
    paging: {
      // 分页配置
      type: Object,
      default: () => { }
    },
    tableHelght: {
      // 表格用于计算高度差值
      type: Number,
      default: 0
    },
    rowKey: {
      // 折叠表格设置key值
      type: String,
      default: 'id'
    },
    errorMsg: {
      // 页面错误提示
      type: String,
      default: '暂无数据'
    },
    isAuthority: {
      // 是否使用权限
      type: Boolean,
      default: true
    },
    isSkeleton: {
      // 是否使用骨架屏
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      description: '正在查询',
      qwer: 1,
      height: '600px',
      optionList: {},
      optionFrom: {},
      listBtn: []
    }
  },
  computed: {
    formHeightMax() {
      return this.$store.state.settings.formBarHeight
    }
  },
  watch: {
    tableColumn(newValue) {
      this.optopnListFun()
    },
    formHeightMax(val, oldVal) {
      // 获取页面内的表格高度
      this.tableHeight()
    },
    dataList(val, oldval) {
      if (val.length === 0) {
        this.description = this.errorMsg
      } else {
        setTimeout(() => {
          this.tableHeight()
        }, 500)
      }
    }
  },
  created() {
    // console.log('表格组件', this.dataList)
    this.optopnListFun()
    if (this.isAuthority) {
      var newlistBtn = this.$router.history.current.meta.resource
      // console.log(newlistBtn, 'this.showDefBtnthis.showDefBtn')

      newlistBtn.forEach(element => {
        if (element.name && element.resourceType == 40) {
          element.label = element.name
          this.listBtn.push(element)
        }
      })
    } else {
      this.listBtn = this.operationbtn
    }
  },
  mounted() {
  },
  methods: {
    // 表格列操作
    optopnListFun() {
      const optionFrom = {}
      const list = []
      for (let i = 0; i < this.tableColumn.length; i++) {
        const el = this.tableColumn[i]
        optionFrom[el.prop] = true
        list.push(Object.assign({ checked: true }, el))
      }
      this.optionFrom = optionFrom
      this.optionList = list
    },
    // 计算表格高度
    tableHeight() {
      // 分页组件的高度
      const Pagination = document.getElementById('Pagination')
        ? document.getElementById('Pagination').offsetHeight
        : 0
      // 搜索表单的高度
      const height = document.getElementById('formBar')
        ? document.getElementById('formBar').offsetHeight + 40
        : 0
      // 按钮区高度
      const btnBar = document.getElementById('btnBar')
        ? document.getElementById('btnBar').offsetHeight + 10
        : 0
      // 是否是固定头部
      const header = document.querySelector('.fixed-header')
      // console.log('高度 :>> ', Pagination, height, btnBar)
      setTimeout(() => {
        // 当前高度 = 页面可见高度 - 分页组件的高度 - 搜索表单的高度 - 页面头部 -（页面的margin， 大概是45）
        this.height =
          document.body.clientHeight -
          height -
          Pagination -
          btnBar -
          this.tableHelght -
          (header ? 84 : 0) -
          35 +
          'px'
      }, 100)
    },
    // 按钮条件判断过滤
    btnFilter(val, item, btn) {
      let data = false
      const list = []
      for (let i = 0; i < val.length; i++) {
        const el = val[i]
        if (el.value == item[el.prop]) {
          data = true
          list.push(1)
        } else {
          list.push(0)
        }
      }
      if (btn.flootdata === 'list' && list.indexOf(0) > -1) {
        data = false
      }
      return data
    },
    // 操作列按钮
    btnClick(row, btn, rowindex, btnindex) {
      switch (btn.label) {
        case '删除':
          this.deletefunction(row, btn, rowindex, btnindex)
          break
        default:
          this.$emit('BtnClick', row, btn, rowindex, btnindex)
          break
      }
    },
    deletefunction(row, btn, rowindex, btnindex) {
      this.$confirm('您正在执行删除操作, 是否继续?', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$emit('BtnClick', row, btn, rowindex, btnindex)
        })
        .catch(() => { })
    },
    // 点击跳转的回调
    onLink(row, btn, rowindex) {
      this.$emit('BtnClick', row, btn, rowindex, 'link')
    },
    // 选择数据触发
    selectionChange(val) {
      this.checkedindex = []
      this.tablechecked = val
      val.forEach((val, index) => {
        this.checkedindex.push(val.selectindex)
      })
      this.$emit('btnselectionChange', this.tablechecked)
    },
    // 排序触发事件
    sortChange(val) {
      console.log('重新排序', val)
      this.$emit(
        'BtnClick',
        val.column,
        {
          order: val.order,
          prop: val.prop
        },
        null,
        'order'
      )
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    },
    // 分页
    pagination(val) {
      const paging = {}
      paging[this.paging.pageName || 'pageIndex'] = val.page
      paging[this.paging.limitName || 'pageSize'] = val.limit
      if (this.paging.pageName || this.paging.limitName) {
        paging.pageName = this.paging.pageName
        paging.limitName = this.paging.limitName
      }
      this.$emit('pagination', paging)
      // this.resData.currentPage = val.page
      // this.resData.pageSize = val.limit
      // this.orderListArrFun()
    },
    // 列定位
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss" scoped>
.table .el-table th {
  color: #333;
}
.table {
  ::v-deep .el-table td {
    padding: 8px 0;
  }
  ::v-deep .link-text {
    color: #fff;
  }
}

.table .el-table__fixed-right::before,
.table .el-table__fixed::before {
  background-color: rgba(0, 0, 0, 0);
}
.table .imgtable .el-image-viewer__btn.el-image-viewer__close {
  color: #ffffff;
}
.null-bar {
  width: 100%;
  text-align: center;
  padding: 100px;
  color: #c8c8c8;

  .icon-null {
    font-size: 100px;
    margin-bottom: 20px;
  }
  .null-img {
    width: 24%;
    margin-bottom: 50px;
  }
}
.btn-span {
  margin: 0;

  &.left {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  &.right {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }
  span .option-btn {
    padding: 0 10px !important;
  }
}

.table-button {
  position: absolute;
  right: 40px;
  top: 10px;
}
.table-bar {
  position: relative;
  /* transition: all .3s; */
}
.option-bar {
  position: absolute;
  right: 34px;
  top: 14px;
  z-index: 99;
}
.dropdown-menu {
  overflow: scroll;
  max-height: 50vh;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.txt-style {
  cursor: copy;
}
.link-text {
  color: #409eff;
  cursor: pointer;
}
.link-text:hover {
  text-decoration: underline;
}
.item-menu {
  width: 200px;
  .align-right {
    text-align: right;
  }
}
::v-deep tr td:last-child {
  border-left: 1px solid #dfe6ec;
}
::v-deep tr th:last-child {
  border-left: 1px solid #dfe6ec;
}
</style>
