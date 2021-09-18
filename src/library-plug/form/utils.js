/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 *
 * @param {data} number 时间
 * @param {string} options 转换格式
 * @returns string
 */
export function formatDate(number, options) {
  if (!number) {
    return ''
  }
  const times = new Date(number)
  const year = times.getFullYear()
  const month = times.getMonth() + 1
  const date = times.getDate()
  const fullMonth =
    times.getMonth() + 1 < 10
      ? '0' + (times.getMonth() + 1)
      : times.getMonth() + 1
  const fullDate =
    times.getDate() < 10 ? '0' + times.getDate() : times.getDate()
  const hours =
    times.getHours() < 10 ? '0' + times.getHours() : times.getHours()
  const minutes =
    times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes()
  const seconds =
    times.getSeconds() < 10 ? '0' + times.getSeconds() : times.getSeconds()
  let time
  switch (options) {
    case 'yyyy年M月d日 HH:mm:ss':
      time = `${year}年${month}月${date}日 ${hours}:${minutes}:${seconds}`
      break
    case 'yyyy年M月d日':
      time = `${year}年${month}月${date}日`
      break
    case 'yyyy年MM月dd日 HH:mm:ss':
      time = `${year}年${fullMonth}月${fullDate}日 ${hours}:${minutes}:${seconds}`
      break
    case 'MM月dd日 HH:mm':
      time = `${fullMonth}月${fullDate}日 ${hours}:${minutes}`
      break
    case 'yyyy/MM/dd HH:mm':
      time = `${year}/${fullMonth}/${fullDate} ${hours}:${minutes}`
      break
    case 'yyyy-MM-dd HH:mm':
      time = `${year}-${fullMonth}-${fullDate} ${hours}:${minutes}`
      break
    case 'yyyy-MM-dd':
      time = `${year}-${fullMonth}-${fullDate}`
      break
    case 'yyyy/MM/dd':
      time = `${year}/${fullMonth}/${fullDate}`
      break
    case 'MM-dd':
      time = `${fullMonth}-${fullDate}`
      break
    case 'HH:mm':
      time = `${hours}:${minutes}`
      break
    case 'yyyy-MM-dd HH:mm:ss':
    default:
      time = `${year}-${fullMonth}-${fullDate} ${hours}:${minutes}:${seconds}`
  }
  return time
}
/**
 * 日期范围工具类
 * @param {string} type  (0)>今日 (1)>昨天 (2)>本周 (3)>上周 (4)>本月 (5)>上月 (6)>本年
 * @returns {Array} [开始时间, 结束时间]
 */
export function dateRangeUtil(type, timeVal) {
  /** *
   * 获得当前时间
   */
  const getCurrentDate = function() {
    if (timeVal) {
      return new Date(timeVal)
    } else {
      return new Date()
    }
  }

  /** *
   * 获得本周起止时间
   */
  const getCurrentWeek = function() {
    // 起止日期数组
    var startStop = new Array()
    // 获取当前时间
    var currentDate = getCurrentDate()
    // 返回date是一周中的某一天
    var week = currentDate.getDay()
    // 返回date是一个月中的某一天
    var month = currentDate.getDate()

    // 一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24
    // 减去的天数
    var minusDay = week != 0 ? week - 1 : 6
    // alert(minusDay);
    // 本周 周一
    var monday = new Date(currentDate.getTime() - minusDay * millisecond)
    // 本周 周日
    var sunday = new Date(monday.getTime() + 6 * millisecond)
    console.log(monday, 'monday', sunday, 'sunday')
    // 添加本周时间
    startStop.push(
      monday
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 00:00:00'
    ) // 本周起始时间
    // 添加本周最后一天时间
    startStop.push(
      sunday
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 23:59:59'
    ) // 本周终止时间
    // 返回
    return startStop
  }

  /** *
   * 获得本月的起止时间
   */
  const getCurrentMonth = function() {
    // 起止日期数组
    var startStop = new Array()
    // 获取当前时间
    var currentDate = getCurrentDate()
    // 获得当前月份0-11
    var currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear()
    // 求出本月第一天
    var firstDay = new Date(currentYear, currentMonth, 1)

    // 当为12月的时候年份需要加1
    // 月份需要更新为0 也就是下一年的第一个月
    if (currentMonth == 11) {
      currentYear++
      currentMonth = 0 // 就为
    } else {
      // 否则只是月份增加,以便求的下一月的第一天
      currentMonth++
    }

    // 一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24
    // 下月的第一天
    var nextMonthDayOne = new Date(currentYear, currentMonth, 1)
    // 求出上月的最后一天
    var lastDay = new Date(nextMonthDayOne.getTime() - millisecond)

    // 添加至数组中返回
    startStop.push(
      firstDay
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 00:00:00'
    )
    startStop.push(
      lastDay
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 23:59:59'
    )
    // 返回
    return startStop
  }

  /**
   * 得到本季度开始的月份
   * @param month 需要计算的月份
   ***/
  const getQuarterSeasonStartMonth = function(month) {
    var quarterMonthStart = 0
    var spring = 0 // 春
    var summer = 3 // 夏
    var fall = 6 // 秋
    var winter = 9 // 冬
    // 月份从0-11
    if (month < 3) {
      return spring
    }

    if (month < 6) {
      return summer
    }

    if (month < 9) {
      return fall
    }

    return winter
  }

  /**
   * 获得该月的天数
   * @param year年份
   * @param month月份
   * */
  const getMonthDays = function(year, month) {
    // 本月第一天 1-31
    var relativeDate = new Date(year, month, 1)
    // 获得当前月份0-11
    var relativeMonth = relativeDate.getMonth()
    // 获得当前年份4位年
    var relativeYear = relativeDate.getFullYear()

    // 当为12月的时候年份需要加1
    // 月份需要更新为0 也就是下一年的第一个月
    if (relativeMonth == 11) {
      relativeYear++
      relativeMonth = 0
    } else {
      // 否则只是月份增加,以便求的下一月的第一天
      relativeMonth++
    }
    // 一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24
    // 下月的第一天
    var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1)
    // 返回得到上月的最后一天,也就是本月总天数
    return new Date(nextMonthDayOne.getTime() - millisecond).getDate()
  }

  /**
   * 获得本季度的起止日期
   */
  const getCurrentSeason = function() {
    // 起止日期数组
    var startStop = new Array()
    // 获取当前时间
    var currentDate = getCurrentDate()
    // 获得当前月份0-11
    var currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear()
    // 获得本季度开始月份
    var quarterSeasonStartMonth = getQuarterSeasonStartMonth(currentMonth)
    // 获得本季度结束月份
    var quarterSeasonEndMonth = quarterSeasonStartMonth + 2

    // 获得本季度开始的日期
    var quarterSeasonStartDate = new Date(
      currentYear,
      quarterSeasonStartMonth,
      1
    )
    // 获得本季度结束的日期
    var quarterSeasonEndDate = new Date(
      currentYear,
      quarterSeasonEndMonth,
      getMonthDays(currentYear, quarterSeasonEndMonth)
    )
    // 加入数组返回
    startStop.push(
      quarterSeasonStartDate
        .toLocaleDateString()
        .split('/')
        .join('-')
    )
    startStop.push(
      quarterSeasonEndDate
        .toLocaleDateString()
        .split('/')
        .join('-')
    )
    // 返回
    return startStop
  }

  /** *
   * 得到本年的起止日期
   *
   */
  const getCurrentYear = function() {
    // 起止日期数组
    var startStop = new Array()
    // 获取当前时间
    var currentDate = getCurrentDate()
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear()

    // 本年第一天
    var currentYearFirstDate = new Date(currentYear, 0, 1)
    // 本年最后一天
    var currentYearLastDate = new Date(currentYear, 11, 31)
    // 添加至数组
    startStop.push(
      currentYearFirstDate
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 00:00:00'
    )
    startStop.push(
      currentYearLastDate
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 23:59:59'
    )
    // 返回
    return startStop
  }

  /**
   * 返回上一个月的第一天Date类型
   * @param year 年
   * @param month 月
   **/
  const getPriorMonthFirstDay = function(year, month) {
    // 年份为0代表,是本年的第一月,所以不能减
    if (month == 0) {
      month = 11 // 月份为上年的最后月份
      year-- // 年份减1
      return new Date(year, month, 1)
    }
    // 否则,只减去月份
    month--
    return new Date(year, month, 1)
  }

  /**
   * 获得上一月的起止日期
   * ***/
  const getPreviousMonth = function() {
    // 起止日期数组
    var startStop = new Array()
    // 获取当前时间
    var currentDate = getCurrentDate()
    // 获得当前月份0-11
    var currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear()
    // 获得上一个月的第一天
    var priorMonthFirstDay = getPriorMonthFirstDay(currentYear, currentMonth)
    // 获得上一月的最后一天
    var priorMonthLastDay = new Date(
      priorMonthFirstDay.getFullYear(),
      priorMonthFirstDay.getMonth(),
      getMonthDays(
        priorMonthFirstDay.getFullYear(),
        priorMonthFirstDay.getMonth()
      )
    )
    // 添加至数组
    startStop.push(
      priorMonthFirstDay
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 00:00:00'
    )
    startStop.push(
      priorMonthLastDay
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 23:59:59'
    )
    // 返回
    return startStop
  }

  /**
   * 获得上一周的起止日期
   * **/
  const getPreviousWeek = function() {
    // 起止日期数组
    var startStop = new Array()
    // 获取当前时间
    var currentDate = getCurrentDate()
    // 返回date是一周中的某一天
    var week = currentDate.getDay()
    // 返回date是一个月中的某一天
    var month = currentDate.getDate()
    // 一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24
    // 减去的天数
    var minusDay = week != 0 ? week - 1 : 6
    // 获得当前周的第一天
    var currentWeekDayOne = new Date(
      currentDate.getTime() - millisecond * minusDay
    )
    // 上周最后一天即本周开始的前一天
    var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond)
    // 上周的第一天
    var priorWeekFirstDay = new Date(
      priorWeekLastDay.getTime() - millisecond * 6
    )

    // 添加至数组
    startStop.push(
      priorWeekFirstDay
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 00:00:00'
    )
    startStop.push(
      priorWeekLastDay
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 23:59:59'
    )

    return startStop
  }

  /**
   * 得到上季度的起始日期
   * year 这个年应该是运算后得到的当前本季度的年份
   * month 这个应该是运算后得到的当前季度的开始月份
   * */
  const getPriorSeasonFirstDay = function(year, month) {
    var quarterMonthStart = 0
    var spring = 0 // 春
    var summer = 3 // 夏
    var fall = 6 // 秋
    var winter = 9 // 冬
    // 月份从0-11
    switch (
      month // 季度的其实月份
    ) {
      case spring:
        // 如果是第一季度则应该到去年的冬季
        year--
        month = winter
        break
      case summer:
        month = spring
        break
      case fall:
        month = summer
        break
      case winter:
        month = fall
        break
    }

    return new Date(year, month, 1)
  }

  /**
   * 得到上季度的起止日期
   * **/
  const getPreviousSeason = function() {
    // 起止日期数组
    var startStop = new Array()
    // 获取当前时间
    var currentDate = getCurrentDate()
    // 获得当前月份0-11
    var currentMonth = currentDate.getMonth()
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear()
    // 上季度的第一天
    var priorSeasonFirstDay = getPriorSeasonFirstDay(currentYear, currentMonth)
    // 上季度的最后一天
    var priorSeasonLastDay = new Date(
      priorSeasonFirstDay.getFullYear(),
      priorSeasonFirstDay.getMonth() + 2,
      getMonthDays(
        priorSeasonFirstDay.getFullYear(),
        priorSeasonFirstDay.getMonth() + 2
      )
    )
    // 添加至数组
    startStop.push(
      priorSeasonFirstDay
        .toLocaleDateString()
        .split('/')
        .join('-')
    )
    startStop.push(
      priorSeasonLastDay
        .toLocaleDateString()
        .split('/')
        .join('-')
    )
    return startStop
  }

  /**
   * 得到去年的起止日期
   * **/
  const getPreviousYear = function() {
    // 起止日期数组
    var startStop = new Array()
    // 获取当前时间
    var currentDate = getCurrentDate()
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear()
    currentYear--
    var priorYearFirstDay = new Date(currentYear, 0, 1)
    var priorYearLastDay = new Date(currentYear, 11, 1)
    // 添加至数组
    startStop.push(
      priorYearFirstDay
        .toLocaleDateString()
        .split('/')
        .join('-')
    )
    startStop.push(
      priorYearLastDay
        .toLocaleDateString()
        .split('/')
        .join('-')
    )
    return startStop
  }

  /**
   * 最近一周
   * **/
  const getLatelyWeek = function() {
    // 起止日期数组
    var startStop = new Array()
    const end = new Date()
    const start = new Date().getTime() - 3600 * 1000 * 24 * 7
    // 添加至数组
    startStop.push(
      new Date(start)
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 00:00:00'
    )
    startStop.push(
      end
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 23:59:59'
    )

    return startStop
  }
  /**
   * 最近一个月
   * **/
  const getLatelyMonth = function() {
    // 起止日期数组
    var startStop = new Array()
    const end = new Date()
    const start = new Date().getTime() - 3600 * 1000 * 24 * 30
    // 添加至数组
    startStop.push(
      new Date(start)
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 00:00:00'
    )
    startStop.push(
      end
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 23:59:59'
    )
    return startStop
  }
  /**
   * 最近三个月
   * **/
  const getLatelySeason = function() {
    // 起止日期数组
    var startStop = new Array()
    const end = new Date()
    const start = new Date().getTime() - 3600 * 1000 * 24 * 90
    // 添加至数组
    startStop.push(
      new Date(start)
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 00:00:00'
    )
    startStop.push(
      end
        .toLocaleDateString()
        .split('/')
        .join('-') + ' 23:59:59'
    )
    return startStop
  }
  // 计算返回值
  let dateList = []
  switch (type) {
    case 0:
      // 今天
      // eslint-disable-next-line no-case-declarations
      const time0 = formatDate(getCurrentDate(), 'yyyy-MM-dd')
      dateList = [time0 + ' 00:00:00', time0 + ' 23:59:59']
      break
    case 1:
      // 昨天
      // eslint-disable-next-line no-case-declarations
      const time1 = formatDate(
        getCurrentDate() - 24 * 60 * 60 * 1000,
        'yyyy-MM-dd'
      )
      dateList = [time1 + ' 00:00:00', time1 + ' 23:59:59']
      break
    case 2:
      // 本周
      dateList = [
        formatDate(getCurrentWeek()[0]),
        formatDate(getCurrentWeek()[1])
      ]
      break
    case 3:
      // 上周
      dateList = [
        formatDate(getPreviousWeek()[0]),
        formatDate(getPreviousWeek()[1])
      ]
      break
    case 4:
      // 本月
      dateList = [
        formatDate(getCurrentMonth()[0]),
        formatDate(getCurrentMonth()[1])
      ]
      break
    case 5:
      // 上月
      dateList = [
        formatDate(getPreviousMonth()[0]),
        formatDate(getPreviousMonth()[1])
      ]
      break
    case 6:
      // 本年
      dateList = [
        formatDate(getCurrentYear()[0]),
        formatDate(getCurrentYear()[1])
      ]
      break
    case 7:
      // 去年
      dateList = [
        formatDate(getPreviousYear()[0]),
        formatDate(getPreviousYear()[1])
      ]
      break
    case 8:
      // 最近一周
      dateList = [
        formatDate(getLatelyWeek()[0]),
        formatDate(getLatelyWeek()[1])
      ]
      break
    case 9:
      // 最近一个月
      dateList = [
        formatDate(getLatelyMonth()[0]),
        formatDate(getLatelyMonth()[1])
      ]
      break
    case 10:
      // 最近三个月
      dateList = [
        formatDate(getLatelySeason()[0]),
        formatDate(getLatelySeason()[1])
      ]
      break
    default:
      break
  }
  return dateList
}
