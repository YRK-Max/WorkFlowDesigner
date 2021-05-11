let notCustomElements = [] // 自定义元素的类型
let customConfig = { // 自定义元素的配置
  'bpmn:Task': {
    'url': require('../assets/selectDB.svg'),
    'attr': { x: 0, y: 0, width: 48, height: 48 }
  },
  'bpmn:StartEvent': {
    'url': require('../assets/start.png'),
    'attr': { x: 0, y: 0, width: 40, height: 40 }
  },
  'bpmn:EndEvent': {
    'url': require('../assets/end.png'),
    'attr': { x: 0, y: 0, width: 40, height: 40 }
  },
  'bpmn:SubProcess': {
    'url': require('../assets/editDB.svg'),
    'attr': { x: 0, y: 0, width: 48, height: 48 }
  },
  'custom:JavaScript': {
    'url': require('../assets/java-script.svg'),
    'attr': { x: 0, y: 0, width: 48, height: 48 }
  },
  'custom:SqlScript': {
    'url': require('../assets/sql-script.svg'),
    'attr': { x: 0, y: 0, width: 48, height: 48 }
  },
  'custom:Message': {
    'url': require('../assets/message.svg'),
    'attr': { x: 0, y: 0, width: 48, height: 48 }
  },
  'custom:Join': {
    'url': require('../assets/join.svg'),
    'attr': { x: 0, y: 0, width: 48, height: 48 }
  },
  'custom:Switch': {
    'url': require('../assets/switch.svg'),
    'attr': { x: 0, y: 0, width: 48, height: 48 }
  },
  'custom:Sort': {
    'url': require('../assets/sort.svg'),
    'attr': { x: 0, y: 0, width: 48, height: 48 }
  },
  'custom:Filter': {
    'url': require('../assets/filter.svg'),
    'attr': { x: 0, y: 0, width: 48, height: 48 }
  }
}
let hasNoLabelElements = [
  'bpmn:StartEvent',
  'bpmn:EndEvent'
] // 一开始就有label标签的元素类型

function randomNumber() {
  // 生成 最小值 到 最大值 区间的随机数
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  if (arguments.length === 1) {
    let [length] = arguments
    // 生成指定长度的随机数字，首位一定不是 0
    let nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)))
    return parseInt(nums.join(''))
  } else if (arguments.length >= 2) {
    let [min, max] = arguments
    return random(min, max)
  } else {
    return Number.NaN
  }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
function randomString(length, chats) {
  if (!length) length = 1
  if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let str = ''
  for (let i = 0; i < length; i++) {
    let num = randomNumber(0, chats.length - 1)
    str += chats[num]
  }
  return str
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
function randomUUID() {
  let chats = '0123456789abcdef'
  return randomString(32, chats)
}

export { notCustomElements, customConfig, hasNoLabelElements, randomUUID }
