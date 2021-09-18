
**引入：**

```javascript
  npm i mmkk-plug -S
```

****

**.vue：**

```javascript
import { btnBar, tableBar, formBar } from 'mmkk-plug'

components: {
  formBar,
  tableBar,
  btnBar
},
```
<!-- ```javascript
require('mmkkPlug')
``` -->

****

**按钮 参数：**

|  字段 | 注释 | 类型 | 必传 | 默认 |
|:---- |:-------    |:--- |:---|:------      |
| btnList |   按钮列表  | Array     | 是   | []  |
| isAuthority |   是否启用权限  | Boolean | 否 | true |

- 备注：isAuthority 默认启用权限，使用的数据源为接口返回的数据列表

**按钮 btnList参数：**

| 字段 | 注释 | 类型 | 必传 | 默认 |
|:----    |:-------    |:--- |---|------      |
| label | 按钮名称  | String     | 是   | ''  |
| value | 按钮对应值  | String/Number     |是   | ''  |
| icon |   图标  | String     | 否  | ''  |
| type |   按钮类型  | String     | 否   | ''  |
| size |   按钮大小  | String     | 否   | ''  |

****

**表单 参数：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|formStyle |   form表单的样式及相关参数  |Object     |否   | {} |
|formButton |   表单的按钮  |Object     |否   | {} |
|formData |   form表单的值,用于编辑表单的赋值时传入，默认值不建议使用此参数，该方式传递默认值会被清空，请使用formItem中的value传递默认参数  |Object     |否   | {} |
|formItem |   form表单项、表单元素  |Object     |是   | {} |

**表单 formStyle参数：**

|字段|说明|类型|必传|默认|
| :------------:    | :------------:   | :------------:| :------------:| :------------:|
|lableWidth |   表单域标签的宽度|String|否   | '80px' |
|inline | 一行内显示一个表单项 （ 查询表单默认是一行显示多个，只有在添加或编辑等表单会需要传此参数）|Boolean     |否   | false |
|labelPosition |   表单域标签的对齐方向|String     |否   |'right' |
|size | 用于控制该表单内组件的尺寸 |String     |否   | 'small' |

**表单 formButton参数：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|btnShow | 是否使用按钮组件 （传递true后或显示查询和重置两个按钮，用于查询表单） |Boolean     |否   | false |
|col | 按钮区域的排列 |Array     |否   | [4,6,8,12,24] |
|list |   表单的其他按钮（此处按钮是没有权限验证的，需要 权限验证的按钮需要放在按钮组件中 ） |Array     |否   | [] |
|list - label |   按钮名称  |String     |否   | ''|
|list - value |   按钮标识  |String/Number     |否   | '' |

**表单 formItem参数-公共：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|itemtype |  表单项类型，详见下表 【表单项类型参数】  |String     |是   | '' |
|label | 表单标签文本  |String     |是   | '' |
|value | 表单标签文本  |String     |否   | '' |
|col | 表单项排列 |Array     |否   | [4,6,8,12,24] |
|isShow |  表单项是否显示  |Boolean     |否  | true |
|id | 表单项key，表格项有变化或者表单项像是隐藏时需要此id  |Number     |否   | '' |
|value | 表单标签文本  |String     |否   | '' |
|lableWidth | 表单域标签的宽度  |String     |否   | '80px'|
|rules | 表单验证条件  |Array     |否   | [] |
|clearable | 是否显示清空按钮  |Boolean     |否   | true |
|placeholder |  占位提示语  |String     |否   | '请输入/请选择' + label |
|disabled | 是否可编辑  |Boolean     |否   | false |

**表单 表单项类型参数 ：**

|类型|说明|
| :------------:| :------------:|
|label |  展示框  |
|input |  文本输入框  |
|select |  下拉选择框  |
|date |  日期时间段选择  |
|number |  数字输入框  |
|switch |  开关  |
|cascader |  级联选择器  |
|radio |  单选  |
|checkbox |  多选  |
|upload |  图片/文件上传  |
|inputNumber |  文本输入框-只可输入数字  |
|groupNumber |  数组输入框-区间输入  |
|groupInput |  文本输入框-区间输入  |
|slot |  插槽  |

**formItem参数-input：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|type |  原生属性 text，textarea 等  |String     |否   | '' |
|maxlength | 最大输入数  |String     |否   | '' |
|showPassword | 是否显示切换密码图标 |Boolean     |否   | false |

****示例：****
```javascript
{
		itemtype: 'input',
		label: '关键字',
		maxlength: 10,
		placeholder: '请输入用户昵称/账号/姓名',
		col: [6, 8, 12, 24, 24]
}
```

**表单 formItem参数-select：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|option | 选择框数据列 |Array/String   |是   | [] |
|valueName | option中的显示内容属性名称。 |String     |否   | '' |
|lableName |  option中的值属性名称。 |String     |否   | '' |
|collapseTags |  多选时是否将选中值按文字的形式展示  |Boolean     |否   |false |
|multiple | 是否多选  |Boolean     |否   |false |
|filterable | 是否可搜索 |Boolean     |否   | false |
|allowCreate | 是否允许用户创建新条目，需配合 filterable 使用 |Boolean     |否   | false |
|defaultFirstOption | 在输入框按下回车，选择第一个匹配项 |Boolean     |否   | false |
|valueKey | 如果 Select 的绑定值为对象类型，请务必指定 value-key 作为它的唯一性标识。 |String     |否   | '' |

****示例：****
```javascript
{
          itemtype: 'select',
          label: '状态',
          option: [
            { label: '全部', value: '' },
            { label: '启用', value: 10 },
            { label: '禁用', value: 20 }
          ],
          placeholder: '用户状态',
          col: [6, 8, 12, 24, 24]
}
```

- 备注：option参数比较复杂，分三种情况，文档推荐直接传递数组一种形式

**表单 formItem参数-date：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|type | 时间选择框类型 year/month/date/week/ datetime/datetimerange/daterange |String     |否   | 'date ' |
|format | 可选，绑定值的格式。不指定则绑定值为 Date 对象  |String     |否   | '' |

****示例：****

```javascript
{
          itemtype: 'date',
          label: '创建时间',
          type: 'datetimerange',
          col: [6, 16, 12, 24, 24]
}
```

**表单 formItem参数-number：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|controls | 是否使用控制按钮 |Boolean     |否   | false|
|controlsposition | 控制按钮位置   |String     |否   | 'right'  |
|precision | 数值精度   |Number      |否   | 0  |
|step | 计数器步长   |Number     |否   | 0  |
|max | 最大值   |Number     |否   | Infinity |
|min | 控制按钮位置   |Number     |否   | 0  |
|unit | 单位   |String     |否   | ''  |

**表单 formItem参数-switch：**

|字段|说明|类型|空|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|activeValue | switch 打开时的值 |boolean / string / number     |否   | 1 |
|inactiveValue | switch 关闭时的值  |boolean / string / number     |否   | 0 |

**表单 formItem参数-cascader：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|option | 选择框数据列 |Array/String   |是   | [] |
|filterable | 是否可搜索 |Boolean     |否   | false |
|checkStrictly | 是否严格的遵守父子节点不互相关联。 |Boolean     |否   |false |
|valueName | option中的显示内容属性名称。 |String     |否   | '' |
|lableName |  option中的值属性名称。 |String     |否   | '' |
|multiple | 是否多选  |Boolean     |否   |false |
|emitPath |  在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值  |Boolean     |否   |false |

- 备注：option参数比较复杂，分三种情况，文档推荐直接传递数组一种形式

**表单 formItem参数-radio/checkbox：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|option | 选择框数据列 |Array   |是   | [] |

**formItem参数-upload：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|accept | 接受上传的文件类型（thumbnail-mode 模式下此参数无效   .xls,.xlsx    .png, .jpg） |String    |是   | '' |
|limit | 最大允许上传个数 |Number     |否   | '' |
|fileList | 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] |Array     |否   | [] |
|tip | 提示内容 |String    |否   | '' |

**表单 formItem参数-groupNumber：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|controls | 是否使用控制按钮 |Boolean     |否   | false|
|controlsposition | 控制按钮位置   |String     |否   | 'right'  |
|precision | 数值精度   |Number      |否   | 0  |
|numberMax | 最大值   |Number     |否   | Infinity |
|min | 控制按钮位置   |Number     |否   | 0  |
|prop1 | 起始值属性名称   |String     |否   | 0  |
|prop2 | 终止值属性名称   |String     |否   | ''  |

**表单 formItem参数-slot：**

|字段|说明|类型|必传|默认|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|style | 样式 |Array   |是   | {} |
****示例：****
```javascript
	{
		itemtype: 'slot',
		label: '门店',
		heightAuto: true,
		col: [6, 16, 12, 24, 24],
		style: {
			'height': 'auto !important'
		}
	}
```
****

**表单 事件**

|字段|说明|返回参数|
| :------------:| :------------:| :------------:| :------------:| :------------:|
|formClick | 返回通过验证的form对象  | form, item, row, index|
|formChange | 公共触发事件 change事件  |val, item, form|
|uploadCallback | 覆盖默认的上传行为，可以自定义上传的实现  |file|
|uploadRemove | 删除文件  |file|

**表单 formClick事件返回参数说明**

|字段|说明|类型|
| :------------:| :------------:| :------------:|
|form | 表单对象  | Object |
|item | 按钮对象 两个默认按钮 0：重置  1：查询  其他的类型是需要传入的   牢记传入的类型不可为0和1  | Object |
|row | 传入的按钮对象，传入按钮参数会返回  | Object |
|index | 传入的按钮角标，传入按钮参数会返回  | Object |

**表单 父组件可调用方法**

|字段|说明|类型|
| :------------:| :------------:| :------------:|
|forceUpdate | 表单重绘 更新  | function |
|formClear | 表单清空  | function |
|formReset | 表单重置  | function |
|formCreated | 表单数据重新转换，用于编辑表单赋值不成功的情况  | function |

**表单 父组件可调用其他操作**

- 父组件获取表单数据 this.$refs.组件ref.form
- 父组件获取表单通过验证的数据结果
```javascript
this.$refs.组件ref.$refs.form.validate(valid => {
        if (valid) {
          通过验证
        } else {
          console.log('表单验证失败')
          return false
        }
})
```

****

****表单 示例****

```html
<form-bar
  ref="serchform"
  :form-item="formItem"
  :form-button="formButton"
  @formClick="formClick"
>
  <template slot="storeIds" slot-scope="scope">
    <el-select
      v-model="scope.form.storeIds"
      class="width-style"
      placeholder="请选择门店"
      clearable
      multiple
      filterable
      remote
      reserve-keyword
      collapse-tags
      :remote-method="remoteMethod"
:loading="storeLoading"
size="small"
>
<el-option
v-for="item in storetList"
:key="item.id"
:label="item.storeName"
:value="item.id"
/>
</el-select>
</template>
</form-bar>
```
```javascript
formItem: {
searchWord: {
itemtype: 'input',
label: '关键字',
// maxlength: 10,
placeholder: '请输入用户昵称/账号/姓名',
col: [6, 8, 12, 24, 24]
},
status: {
itemtype: 'select',
label: '状态',
option: [
  { label: '全部', value: '' },
  { label: '启用', value: 10 },
  { label: '禁用', value: 20 }
],
placeholder: '用户状态',
col: [6, 8, 12, 24, 24]
},
storeIds: {
itemtype: 'slot',
label: '门店',
heightAuto: true,
col: [6, 16, 12, 24, 24],
style: {
  'height': 'auto !important'
}
},
startTime: {
itemtype: 'date',
label: '创建时间',
type: 'datetimerange',
col: [6, 16, 12, 24, 24]
}
},
formButton: {
btnShow: true,
col: [6, 8, 12, 24, 24]
},
```

****


**表格 参数：**

|字段|注释|类型|必传|默认|
|:----    |:-------    |:--- |---|------      |
|dataList |   数据列表  |Array     |是   | []  |
|tableColumn |   表格表头及设置  |Array     |是   | []  |
|operationbtn |   操作列按钮  |Array     |否   | []  |
|operationWidth |   列宽度  |String     |否   | '120px'  |
|numberSerial |   是否显示序号  |Boolean     |否   |false |
|selection |   是否显示选择框  |Boolean     |否   |false |
|tableOption |   是否启用表格列操作按钮  |Boolean     |否   |false |
|total |   分页总条数  |Boolean     |否   |false |
|paging |   分页配置  |Object     |否   |{}  |
|tableHelght |   表格用于计算高度差值  |Number     |否   | 0  |
|rowKey |   折叠表格设置key值  |String     |否   | 'id' |
|errorMsg |   页面错误提示  |String     |否   | '暂无数据' |
|isAuthority |   是否使用权限  |Boolean     |否   |false |
|isSkeleton |  是否使用骨架屏   |Boolean     |否   |false |

- 备注：isAuthority 默认启用权限，使用的数据源为接口返回的数据列表

**表格 tableColumn参数：**

|字段|注释|类型|必传|默认|
|:----    |:-------    |:--- |---|------      |
|label |   列名称  |String     |是   | ''  |
|prop |   列名称对应的数据属性名  |String     |是   | ''  |
|width |   列宽度  |String     |否  | ''  |
|showTooltip |   超出隐藏并悬浮提示 |String     |否   | ''  |
|align |   数据对齐方式  |String     |否   | 'center'  |
|headerAlign |   表头对齐方式  |String     |否   | 'center'  |
|sortable |   对应列是否可以排序 true, false, 'custom'  |Boolean/String     |否   | 'false |
|fixed |   列是否固定在左侧或者右侧,true 表示固定在左侧  |String     |否   | true |
|filter |    根据数据展示相应的文字 建议使用slot  |Array     |否   | []  |
|copy |   是否使用复制  |Boolean     |否   |  false |
|link |   是否使用超链接跳转  |Boolean     |否   |  false |
|img |   是否使用图片展示  |Boolean     |否   |  false |
|slot |   是否使用slot  |Boolean     |否   |  false |

**表格 tableColumn参数 - filter：**

|字段|注释|类型|必传|默认|
|:----    |:-------    |:--- |---|------      |
|value |   需要转义的值  |String     |是   | ''  |
|lable |   将值转义成的字符串  |String     |是   | ''  |

**表格 operationbtn参数：**

|字段|注释|类型|必传|默认|
|:----    |:-------    |:--- |---|------      |
|filter |  根据数据展示相应的文字 建议使用slot  |Array     |否   | []  |
|slot |   是否使用slot  |Boolean     |否   |  false |
|label |   按钮名称  |String     |是   | ''  |
|value |   按钮对应值  |String/     |是   | ''  |
|icon |   图标  |String     |否  | ''  |
|type |   按钮类型  |String     |否   | ''  |
|size |   按钮大小  |String     |否   | ''  |

****

**表格 返回事件**

|字段|注释|参数|
|:----    |:-------    |:--- |
|btnClick |   表单按钮返回数据  |row, index |
|btnselectionChange |   选择数据触发  |row |
|pagination |   分页数据  | paging |

****

****表格 示例****

```html
<table-bar
  :data-list="dataList"
  :table-column="tableColumn"
  :operationbtn="operationbtn"
  :total="total"
  :paging="paging"
  :operation-width="'200px'"
  :selection="true"
  @pagination="pagination"
  @btnselectionChange="selectionChange"
  @BtnClick="BtnClick"
>
  <template slot="status" slot-scope="scope">
    <el-switch
      v-model="scope.row.status"
      :active-value="10"
      :inactive-value="20"
      @change="handleStatusChange(scope.row)"
    />
  </template>
</table-bar>
```

```javascript
tableColumn: [
  {
    label: '用户编号',
    width: '180',
    prop: 'userId'
  },
  {
    label: '员工号/账号',
    width: '100',
    prop: 'userName'
  },
  {
    label: '用户状态',
    prop: 'status',
    slot: true,
    width: '120'
  },
],
operationbtn: [
  {
    value: 2,
    label: '修改'
  },
  {
    value: 3,
    label: '删除'
  },
  {
    value: 4,
    label: '重置密码'
  }
],
paging: {
  pageSize: 10,
  pageIndex: 1
}
```

****