export default {
  resizeTable() {
    if (window.innerHeight) {
      return window.innerHeight - 230
    } else if ((document.body) && (document.body.clientHeight)) {
      return document.body.clientHeight - 230
    }
    if (document.documentElement && document.documentElement.clientHeight) {
      return document.documentElement.clientHeight - 230
    }
  },
  splitArray(array, pageSize) {
    let currData = []
    let tempPages = []
    for (var i = 0; i < array.length; i++) {
      currData.push(array[i])
      if ((i !== 0 && (i + 1) % pageSize === 0) || i === array.length - 1) {
        tempPages.push(currData)
        currData = []
      }
    }
    return tempPages
  },
  isValidIP(ip) {
    let reg =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(ip)
  },
  isValidMac(mac) {
    let reg =
      /^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/
    return reg.test(mac)
  },
  formatDate(time, format = 'YYYY-MM-DD hh:mm:ss') {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    let preArr = Array.apply(null, Array(10)).map(function (elem, index) {
      return '0' + index
    })
    let newTime = format.replace(/YYYY/g, year)
      .replace(/MM/g, preArr[month] || month)
      .replace(/DD/g, preArr[day] || day)
      .replace(/hh/g, preArr[hour] || hour)
      .replace(/mm/g, preArr[min] || min)
      .replace(/ss/g, preArr[sec] || sec)
    return newTime
  },
  randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10)
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      default:
        return 0
    }
  },
  getIndex(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (this[i] == value) {
        return i;
      }
    }
  },
  isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      return true
    } else {
      return false
    }
  },
  findIndex(arr, item) {
    if (Array.prototype.indexOf) {
      return arr.indexOf(item)
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
          return i
        } else {
          return -1
        }
      }
    }
  },
  removeByName(arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === val) {
        arr.splice(i, 1)
        break
      }
    }
    return arr
  },
  errorMsg(str) {
    let res = ''
    switch (str) {
      case "UserAuthentication error":
        res = '用户权限错误'
        break
      case "the feild can't be empty":
        res = '包含空字段'
        break
      case 'The password needs to be MD5 32 bits':
        res = '登录密码需要MD5编码'
        break
      case 'SQL execute error':
        res = 'SQL执行错误'
        break
      case 'the user already exists':
        res = '该用户已存在'
        break
      case 'the user not exists,please first added':
        res = '该用户不存在，请先添加'
        break
      case 'the nvr login error:please check user or password':
        res = 'NVR登录错误，请检查用户名和密码'
        break
      case 'the nvr network error:nvr is offline or other network param error':
        res = 'NVR网络错误: NVR离线或者其他网络参数错误'
        break
      case 'the database is not bind':
        res = '数据库未绑定错误'
        break
      case 'the port is error':
        res = '端口号错误'
        break
      case 'the server is unauthorized':
        res = '服务器未授权错误'
        break
      default:
        res = str
    }
    return res
  },
  deepCompare(x, y) {
    console.log(x, y)
    var i, l, leftChain, rightChain

    function compare2Objects(x, y) {
      var p
      // remember that NaN === NaN returns false
      // and isNaN(undefined) returns true
      if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
        return true
      }
      // Compare primitives and functions.     
      // Check if both arguments link to the same object.
      // Especially useful on the step where we compare prototypes
      if (x === y) {
        return true
      }
      // Works in case when functions are created in constructor.
      // Comparing dates is a common scenario. Another built-ins?
      // We can even handle functions passed across iframes
      if (
        (typeof x === 'function' && typeof y === 'function') ||
        (x instanceof Date && y instanceof Date) ||
        (x instanceof RegExp && y instanceof RegExp) ||
        (x instanceof String && y instanceof String) ||
        (x instanceof Number && y instanceof Number)) {
        return x.toString() === y.toString()
      }
      // At last checking prototypes as good as we can
      if (!(x instanceof Object && y instanceof Object)) {
        return false
      }
      if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
        return false
      }
      if (x.constructor !== y.constructor) {
        return false
      }
      if (x.prototype !== y.prototype) {
        return false
      }
      // Check for infinitive linking loops
      if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
        return false
      }
      // Quick checking of one object being a subset of another.
      // todo: cache the structure of arguments[0] for performance
      for (p in y) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false
        } else if (typeof y[p] !== typeof x[p]) {
          return false
        }
      }
      for (p in x) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
          return false
        } else if (typeof y[p] !== typeof x[p]) {
          return false
        }
        switch (typeof (x[p])) {
          case 'object':
          case 'function':
            leftChain.push(x)
            rightChain.push(y)
            if (!compare2Objects(x[p], y[p])) {
              return false
            }
            leftChain.pop()
            rightChain.pop()
            break;
          default:
            if (x[p] !== y[p]) {
              return false
            }
            break
        }
      }
      return true
    }
    if (arguments.length < 1) {
      return true
      //Die silently? Don't know how to handle such case, please help...
      // throw "Need two or more arguments to compare"
    }
    for (i = 1, l = arguments.length; i < l; i++) {
      leftChain = [] //Todo: this can be cached
      rightChain = []
      if (!compare2Objects(arguments[0], arguments[i])) {
        return false
      }
    }
    return true
  }
}
