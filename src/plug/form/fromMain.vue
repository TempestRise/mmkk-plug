<!--form 表单组件-->
<template>
  <div id="formBar" class="plug-form-bar" :style="{ height: formHeight }">
    <el-form
      ref="form"
      status-icon
      :model="form"
      :label-position="formStyle ? formStyle.labelPosition || 'right' : 'right'"
      :label-width="formStyle ? formStyle.labelWidth || lableWidth : lableWidth"
      :size="formStyle ? formStyle.size || 'small' : 'small'"
      @keyup.enter.native="submitForm('form')"
    >
      <el-row :style="{ height: formHeight }">
        <template v-for="(item, index) in list">
          <!-- -----------------------      展示框      label   --------------------------- -->
          <el-col
            v-if="
              item.itemtype === 'label' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :span="24"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              :label="item.label"
              :prop="item.prop"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
            >
              <span :class="item.className" :style="item.style">{{
                form[item.prop]
              }}</span>
            </el-form-item>
          </el-col>
          <!-- -----------------------      文本输入框  input    --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'input' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              :label="item.label"
              :prop="item.prop"
              :rules="item.rules"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
            >
              <el-input
                v-model="form[item.prop]"
                class="flex-children-bar"
                :type="item.type"
                :clearable="item.clearable ? item.clearable : true"
                :maxlength="item.maxlength"
                :show-word-limit="item.maxlength?true: false"
                :placeholder="item.placeholder || '请输入' + item.label"
                :disabled="item.disabled ? item.disabled : false"
                :show-password="item.showPassword?item.showPassword:false"
              />
            </el-form-item>
          </el-col>
          <!-- -----------------------      下拉选择框   select   --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'select' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              :label="item.label"
              :prop="item.prop"
              :rules="item.rules"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
            >
              <!-- {{ typeof item.option == 'string' }} -->
              <el-select
                v-model="form[item.prop]"
                class="flex-children-bar"
                :collapse-tags="item.collapseTags == false ? false : true"
                :placeholder="item.placeholder || '请选择' + item.label"
                :clearable="item.clearable == false ? false : true"
                :multiple="item.multiple"
                :disabled="item.disabled ? item.disabled : false"
                :filterable="item.filterable"
                :allow-create="item.allowCreate"
                :default-first-option="item.defaultFirstOption"
                :value-key="item.valueKey"
                @change="(val) => switchchange(val, item)"
              >
                <el-option
                  v-for="optionItem in item.option"
                  :key="
                    item.valueName
                      ? optionItem[item.valueName]
                      : optionItem.value
                  "
                  :label="
                    item.lableName
                      ? optionItem[item.lableName]
                      : optionItem.label
                  "
                  :value="
                    item.valueName
                      ? item.valueKey
                        ? optionItem
                        : optionItem[item.valueName]
                      : item.valueKey
                        ? optionItem
                        : optionItem.value
                  "
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- -----------------------      日期时间段选择  date    --------------------------- -->
          <!-- <el-col :xl="8" :lg="12" :md="16" :sm="12" :xs="24"> -->
          <el-col
            v-if="
              item.itemtype == 'date' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="guide(item, 0, 8, 4, 4)"
            :lg="guide(item, 1, 12, 6, 6)"
            :md="guide(item, 2, 16, 8, 8)"
            :sm="guide(item, 3, 12, 12, 12)"
            :xs="guide(item, 4, 24, 24, 24)"
          >
            <el-form-item
              :prop="item.prop"
              :rules="item.rules"
              :label="item.label"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
            >
              <el-date-picker
                v-model="form[item.prop]"
                :picker-options="
                  item.type
                    ? item.type == 'datetimerange' || item.type == 'daterange'
                      ? pickerOptions
                      : ''
                    : ''
                "
                :type="item.type"
                :format="item.format"
                :value-format="item.format"
                :disabled="item.disabled"
                range-separator="至"
                :placeholder="item.placeholder || '请选择' + item.label"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :clearable="item.clearable == false ? false : true"
                @change="datePickerChange(form[item.prop], item)"
              />
            </el-form-item>
          </el-col>
          <!-- -----------------------      数字输入框   number   --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'number' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              :prop="item.prop"
              :rules="item.rules"
              :label="item.label"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
            >
              <template>
                <el-input-number
                  v-model="form[item.prop]"
                  class="flex-children-bar"
                  :placeholder="'请输入' + item.label"
                  :controls="item.controls ? item.controls : false"
                  :controls-position="item.controlsposition || ''"
                  :precision="item.precision ? item.precision : 0"
                  :step="item.step ? item.step : 0"
                  :max="item.max ? item.max : Infinity"
                  :min="item.min ? item.min : 0"
                  :disabled="item.disabled"
                  :clearable="item.clearable ? item.clearable : true"
                />
                <span v-if="item.unit" class="fixedelement">{{
                  item.unit
                }}</span>
              </template>
            </el-form-item>
          </el-col>
          <!-- -----------------------      开关   switch   --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'switch' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              :prop="item.prop"
              :label="item.label"
              :rules="item.rules"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
            >
              <el-switch
                v-model="form[item.prop]"
                class="flex-children-bar"
                :active-value="item.activeValue ? item.activeValue : 1"
                :inactive-value="item.inactiveValue ? item.inactiveValue : 0"
              />
            </el-form-item>
          </el-col>
          <!-- -----------------------      级联选择器   cascader   --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'cascader' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              :prop="item.prop"
              :rules="item.rules"
              :label="item.label"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
            >
              <el-cascader
                v-model="form[item.prop]"
                class="flex-children-bar"
                :disabled="item.disabled"
                :filterable="item.filterable"
                :clearable="item.clearable ? item.clearable : true"
                :placeholder="item.placeholder || '请选择' + item.label"
                :options="item.option || []"
                :props="{
                  checkStrictly: item.checkStrictly,
                  expandTrigger: 'hover',
                  value: item.valueName ? item.valueName : 'value',
                  label: item.lableName ? item.lableName : 'label',
                  multiple: item.multiple,
                  emitPath: item.emitPath,
                }"
                @change="(val) => switchchange(val, item)"
              />
            </el-form-item>
          </el-col>
          <!-- -----------------------      单选   radio   --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'radio' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              :prop="item.prop"
              :rules="item.rules"
              :label="item.label"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
              :placeholder="item.placeholder || '请选择' + item.label"
            >
              <template>
                <el-radio-group
                  v-model="form[item.prop]"
                  class="flex-children-bar"
                  @change="(val) => switchchange(val, item)"
                >
                  <el-radio
                    v-for="(itm, inx) in item.option"
                    :key="inx"
                    :disabled="item.disabled"
                    :label="itm.value"
                  >{{ itm.label }}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
          <!-- -----------------------      多选   checkbox   --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'checkbox' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              :prop="item.prop"
              :rules="item.rules"
              :label="item.title"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
              :placeholder="item.placeholder || '请选择' + item.title"
            >
              <template>
                <el-checkbox-group
                  v-model="form[item.prop]"
                  class="flex-children-bar"
                >
                  <el-checkbox
                    v-for="(itm, inx) in item.option"
                    :key="inx"
                    :label="itm.value"
                    :disabled="item.disabled"
                  >{{ itm.label }}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
          </el-col>
          <!-- -----------------------      图片/文件上传   upload   --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'upload' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :style="item.style"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              class="flex-bar upload-bar"
              :prop="item.prop"
              :rules="item.rules"
              :label="item.label"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
              :placeholder="item.placeholder || '请选择' + item.label"
            >
              <template>
                <!-- .xls,.xlsx    .png, .jpg -->
                <el-upload
                  ref="myUpload"
                  class="avatar-uploader"
                  action="#"
                  list-type="picture-card"
                  :accept="item.accept"
                  :limit="item.limit"
                  :http-request="httpRequest"
                  :file-list="item.fileList"
                  :before-upload="
                    (file) => {
                      beforeAvatarUpload(file, item)
                    }
                  "
                  :on-exceed="
                    (files, fileList) => {
                      onExceed(files, fileList, item)
                    }
                  "
                  :on-change="
                    (files, fileList) => {
                      uploadFile(files, fileList, item)
                    }
                  "
                >
                  <i slot="default" class="el-icon-plus" />
                  <div slot="file" slot-scope="{ file }">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt
                    >
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in" />
                      </span>
                      <span
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file, item.fileList)"
                      >
                        <i class="el-icon-delete" />
                      </span>
                    </span>
                  </div>
                  <div slot="tip" class="el-upload__tip">{{ item.tip }}</div>
                </el-upload>
                <el-dialog
                  title="预览"
                  :visible.sync="dialogVisible"
                  :append-to-body="true"
                >
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
              </template>
            </el-form-item>
          </el-col>
          <!-- -----------------------      文本输入框-只可输入数字    inputNumber --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'inputNumber' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              :prop="item.prop"
              :rules="item.rules"
              :label="item.label"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
            >
              <el-input
                v-model="form[item.prop]"
                class="flex-children-bar"
                type="number"
                :placeholder="item.placeholder || '请输入' + item.label"
                :disabled="item.disabled"
                :clearable="item.clearable ? item.clearable : true"
                @change="inputChange(form[item.prop], item)"
              />
              <template v-if="item.unit" slot="append">{{
                item.unit
              }}</template>
            </el-form-item>
          </el-col>
          <!-- -----------------------      数组输入框-区间输入    groupNumber   --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'groupNumber' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              class="flex-bar lable-right"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
              :label="item.label"
            >
              <el-row class="flex-children-bar">
                <el-col :span="10">
                  <el-form-item class="children-form-item" :prop="item.prop1">
                    <el-input-number
                      v-model="form[item.prop1]"
                      :controls="item.controls"
                      :controls-position="item.controlsposition || ''"
                      :max="form[item.prop2] ? form[item.prop2] : numberMax"
                      :placeholder="item.placeholder || '请输入'"
                      :precision="item.precision || 0"
                      :clearable="item.clearable ? item.clearable : true"
                      @blur="numberMaxBlur(form[item.prop1])"
                      @focus="numberMaxFocus(form[item.prop1])"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="4" style="text-align: center">-</el-col>
                <el-col :span="10">
                  <el-form-item class="children-form-item" :prop="item.prop2">
                    <el-input-number
                      v-model="form[item.prop2]"
                      :controls="item.controls"
                      :controls-position="item.controlsposition || ''"
                      :min="form[item.prop1] ? form[item.prop1] : null"
                      :placeholder="item.placeholder || '请输入'"
                      :precision="item.precision || 0"
                      :clearable="item.clearable ? item.clearable : true"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <!-- -----------------------      文本输入框-区间输入    groupInput  --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'groupInput' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              class="flex-bar lable-right"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
              :label="item.label"
            >
              <el-row class="flex-children-bar">
                <el-col :span="10">
                  <el-form-item class="children-form-item" :prop="item.prop1">
                    <el-input
                      v-model="form[item.prop1]"
                      class="flex-children-bar"
                      type="number"
                      :placeholder="item.placeholder || '请输入'"
                      :disabled="item.disabled"
                      :clearable="item.clearable ? item.clearable : true"
                      @blur="
                        inputNumber(
                          form[item.prop1],
                          item.precision,
                          item.prop1,
                          1,
                        )
                      "
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="4" style="text-align: center">-</el-col>
                <el-col :span="10">
                  <el-form-item class="children-form-item" :prop="item.prop2">
                    <el-input
                      v-model="form[item.prop2]"
                      class="flex-children-bar"
                      type="number"
                      :placeholder="item.placeholder || '请输入'"
                      :disabled="item.disabled"
                      :clearable="item.clearable ? item.clearable : true"
                      @blur="
                        inputNumber(
                          form[item.prop2],
                          item.precision,
                          item.prop2,
                          2,
                        )
                      "
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <!-- -----------------------      插槽   slot   --------------------------- -->
          <el-col
            v-if="
              item.itemtype == 'slot' &&
                (item.isShow === undefined ? true : item.isShow)
            "
            :key="item.id ? item.id : index"
            :xl="colcomputed(item, 0, 4)"
            :lg="colcomputed(item, 1, 6)"
            :md="colcomputed(item, 2, 8)"
            :sm="colcomputed(item, 3, 12)"
            :xs="colcomputed(item, 4, 24)"
          >
            <el-form-item
              :prop="item.prop"
              :rules="item.rules"
              :label="item.label"
              :label-width="item.lableWidth ? item.lableWidth : lableWidth"
              :style="item.style"
            >
              <slot :name="item.prop" :form="form" :row="item" />
            </el-form-item>
          </el-col>
        </template>
        <el-col
          v-if="formButton && formButton.btnShow"
          style="height: 50px"
          :xl="formButton.col ? formButton.col[0] : 4"
          :lg="formButton.col ? formButton.col[1] : 6"
          :md="formButton.col ? formButton.col[2] : 8"
          :sm="formButton.col ? formButton.col[3] : 12"
          :xs="formButton.col ? formButton.col[4] : 24"
        />
        <el-col
          v-if="formButton && formButton.btnShow"
          class="serch-btn"
          :xl="formButton.col ? formButton.col[0] : 4"
          :lg="formButton.col ? formButton.col[1] : 6"
          :md="formButton.col ? formButton.col[2] : 8"
          :sm="formButton.col ? formButton.col[3] : 12"
          :xs="formButton.col ? formButton.col[4] : 24"
        >
          <el-form-item>
            <span v-if="!formButton.list">
              <el-button
                v-if="formHightVisbale && !(formStyle&&formStyle.inline)"
                type="text"
                @click="stretch"
              >
                {{ stretchVisbale ? ' 收起 ' : ' 展开 ' }}
              </el-button>
              <el-button v-waves @click="resetForm('form')">重置</el-button>
              <el-button
                v-waves
                type="primary"
                @click="submitForm('form')"
              >查询</el-button>
            </span>
            <span v-else>
              <span
                v-for="(btnItem, btnIndex) in formButton.list"
                :key="btnIndex"
                class="btn-list"
              >
                <span v-if="btnItem.value === 0">
                  <el-button
                    v-if="btnItem.value === 0"
                    v-waves
                    @click="resetForm('form')"
                  >重置</el-button>
                </span>
                <span v-else>
                  <el-button
                    v-waves
                    type="primary"
                    @click="
                      formBtnClick(btnItem, btnIndex, {
                        value: btnItem.value,
                        label: btnItem.label,
                      })
                    "
                  >{{ btnItem.label }}</el-button>
                </span>
              </span>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
/**
 * 表单返回参数
 * formClick  // 按钮返回
 * {
 *   form: 表单对象
 *   btn: {
 *    value: 按钮类型   0：重置  1：查询  其他的类型是需要传入的   牢记传入的类型不可为0和1
 *    lable： 按钮名称
 *   }
 *   row： 传入按钮参数会返回
 *   index： 传入按钮参数会返回
 * }
 * ------------------
 * formChange 表单的change等非按钮事件返回
 * {
 *   value： 应该是你想要的值，
 *   item：配置对象
 *   form: 表单对象
 * }
 */
import { dateRangeUtil } from './utils'
import waves from '../../directive/waves'
export default {
  name: 'mmkk-form',
  components: {},
  directives: {
    waves
  },
  props: {
    formStyle: {
      type: Object,
      default: () => {}
    },
    formItem: {
      type: Object,
      default: () => {}
    },
    formButton: {
      type: Object,
      default: () => {}
    },
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      lableWidth: '80px',
      formHeight: '',
      formHightVisbale: false,
      dialogVisible: false,
      dialogImageUrl: '',
      stretchVisbale: true, // true: ’收起‘  false：’展开‘
      form: {},
      list: [],
      numberMax: null,
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', dateRangeUtil(0))
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              picker.$emit('pick', dateRangeUtil(1))
            }
          },
          {
            text: '本周',
            onClick(picker) {
              picker.$emit('pick', dateRangeUtil(2))
            }
          },
          {
            text: '上周',
            onClick(picker) {
              picker.$emit('pick', dateRangeUtil(3))
            }
          },
          {
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', dateRangeUtil(4))
            }
          },
          {
            text: '上月',
            onClick(picker) {
              picker.$emit('pick', dateRangeUtil(5))
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              picker.$emit('pick', dateRangeUtil(8))
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              picker.$emit('pick', dateRangeUtil(9))
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              picker.$emit('pick', dateRangeUtil(10))
            }
          }
        ]
      },
      formHeightMax: 0
    }
  },
  // 监听属性，类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    formHeightMax(val, oldVal) {
      this.$store.commit('settings/SET_FORMBARHEIGHT', val)
    }
  },
  // 生命周期-创建完成（可以访问当前this实例）
  created() {
    this.formCreated()
    // lableWidth 计算
    if (this.formStyle && this.formStyle.lableWidth) {
      this.lableWidth = this.formStyle.lableWidth
    }
  },
  beforeDestroy() {
    window.onresize = null
  },
  // 生命周期-挂载完成（可以访问DOM元素）
  mounted() {
    this.formHeightMax = document.querySelector('.plug-form-bar').clientHeight
    if (this.formHeightMax <= 110) {
      this.formHightVisbale = false
    } else {
      this.formHightVisbale = true
    }
    window.onresize = () => {
      // const width = document.documentElement.clientWidth
      const formHight = document.querySelector('.plug-form-bar').clientHeight
      this.formHeightMax = formHight
      this.stretchVisbale = true
      this.formHeight = ''
      if (formHight <= 100) {
        this.formHightVisbale = false
      } else {
        this.formHightVisbale = true
      }
    }
  },
  methods: {
    // 数据转换
    formCreated() {
      // 将传入的对象拆分成键值两个数组
      const formKey = Object.keys(this.formItem)
      this.list = Object.values(this.formItem)
      // 键数组转对象  并完成赋值操作  this.form[item] = this.list[index].value
      if (
        this.formData !== undefined &&
        Object.keys(this.formData).length > 0
      ) {
        const str = JSON.stringify(this.formData)
        this.form = JSON.parse(str)
      } else {
        formKey.forEach((item, index) =>
          this.$set(
            this.form,
            item,
            Object.prototype.toString.apply(this.list[index].value) ===
              '[object Undefined]'
              ? null
              : this.list[index].value
          )
        )
      }

      // 在值的数组对象中加入 prop  v-model和验证需要使用
      this.list.forEach((item, i) => (this.list[i].prop = formKey[i]))
      // console.log('----表单组件---- :>> ', this.form, this.list)
    },
    // 重置
    formReset() {
      const formKey = Object.keys(this.formItem)
      for (let i = 0; i < formKey.length; i++) {
        const el = formKey[i]
        this.$set(this.form, el, el.value || null)
      }
      setTimeout(() => {
        try {
          this.$refs['form'].clearValidate()
        } catch (error) {
          // console.log('顺序问题 :>> ', error)
        }
      }, 0)
    },
    // 清空
    formClear() {
      const formKey = Object.keys(this.formItem)
      for (let i = 0; i < formKey.length; i++) {
        const el = formKey[i]
        this.$set(this.form, el, null)
      }
      setTimeout(() => {
        try {
          this.$refs['form'].clearValidate()
        } catch (error) {
          // console.log('顺序问题 :>> ', error)
        }
      }, 0)
    },
    // 日期的栅格计算
    guide(item, i, v1, v2, v3) {
      return item.col
        ? item.col[i]
        : this.formStyle && this.formStyle.inline
          ? 24
          : item.type
            ? item.type === 'datetimerange' || item.type === 'daterange'
              ? v1
              : v2
            : v3
    },
    // col计算
    colcomputed(item, i, v1) {
      return item.col
        ? item.col[i]
        : this.formStyle && this.formStyle.inline
          ? 24
          : v1
    },
    // 日期选择回调
    datePickerChange(val, item) {
      // this.$emit('datePickerChange', val, item)
      // this.$emit('inputChange', val, item)
      console.log(val, item, this.form)
    },
    // 计算区间数字最大值
    numberMaxBlur(value) {
      console.log('value :>> ', value)
      this.numberMax = value == null ? null : value
    },
    // 计算区间数字最大值
    numberMaxFocus(value) {
      this.numberMax = Infinity
    },
    // input number 数字位数计算
    inputNumber(val, precision, prop, type) {
      if (precision) {
        console.log('val :>> ', val)
        val = parseFloat(val).toFixed(precision)
        console.log('val :>> ', val)
        this.$set(this.form, prop, val)
      }
    },
    // 公共触发事件
    switchchange(val, item) {
      this.$emit('formChange', val, item, this.form)
    },
    selectOption(item) {
      if (this.$store.state.formOptions[item.option].length > 0) {
        return this.$store.state.formOptions[item.option]
      } else {
        this.$store.dispatch('get' + item.option).then(res => {
        })
      }
    },
    // 查询
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('formClick', this.form, { value: 1, label: '查询' })
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.numberMax = null
      this.$emit('formClick', this.form, { value: 0, label: '重置' })
    },
    formBtnClick(row, index, item) {
      this.$emit('formClick', this.form, item, row, index)
    },
    reset(formName) {
      this.$refs.form.resetFields()
      try {
        this.$refs.myUpload.clearFiles()
      } catch (error) {
        console.log('表单清空:>> ')
      }
    },
    // 上传
    handleAvatarSuccess(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file, item) {
      // const isJPG = file.type === 'image/jpeg';
      const size = file.size / 1024 / 1024 < item.fileSize

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!size && item.fileSize) {
        this.$message.error(
          `上传头像图片大小不能超过 ${item.fileSize / 1024 / 1024} M!`
        )
      }
      // return isJPG && isLt2M;
      return size
    },
    httpRequest(file) {
      this.$emit('uploadCallback', file)
    },
    handleRemove(file, fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const el = fileList[i]
        if (file.url === el.url) {
          this.$emit('uploadRemove', i)
          // fileList.splice(i, 1);
          return
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件超出个数限制时的钩子
    onExceed(files, fileList, item) {
      if (fileList.length >= item.limit) {
        this.$message.error(`${item.label}${item.tip}`)
      }
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    uploadFile(files, fileList, item) {
      item.fileList = fileList
    },
    stretch() {
      if (this.stretchVisbale) {
        this.formHeight = '100px'
      } else {
        this.formHeight = this.formHeightMax + 'px'
      }
      this.stretchVisbale = !this.stretchVisbale
    },
    // 刷新
    forceUpdate() {
      this.$forceUpdate()
    }
  }
}
</script>
<style lang='scss' scoped>
.plug-form-bar {
  overflow: hidden;
  position: relative;
  transition: all 0.3s;
  .serch-btn {
    z-index: 99;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #ffffff, $alpha: 1);
    text-align: right;
    transition: all 0.3s;
  }
}
::v-deep .el-form-item--small.el-form-item {
  height: 32px;
}
::v-deep .el-form-item__label {
  padding: 0 10px;
}
::v-deep .el-input-number--small .el-input__inner {
  text-align: left;
}

::v-deep .el-input--small .el-input__inner,
.el-cascader--small,
.el-select,
.el-select.el-select--small,
.el-input-number--small,
.el-range-editor--small.el-input__inner {
  width: 100%;
}
.upload-bar {
  height: 170px !important;
}
.btn-list {
  margin: 0 10px;
}
</style>
