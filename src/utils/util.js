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

export { notCustomElements, customConfig, hasNoLabelElements }
