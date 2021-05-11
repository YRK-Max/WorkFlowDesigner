import { assign } from 'min-dash'

export default {
  'create.custom-JavaScript': createAction(
    'custom:JavaScript', // etl.json 定义
    '脚本',
    'icon-custom icon-custom-java-script',
    'JavaScript脚本'
  ),
  'create.custom-SqlScript': createAction(
    'custom:SqlScript', // etl.json 定义
    '脚本',
    'icon-custom icon-custom-sql-script',
    'SQL脚本'
  ),
  'create.custom-Message': createAction(
    'custom:Message', // etl.json 定义
    '任务',
    'icon-custom icon-custom-message',
    '邮件任务'
  ),
  'create.start-StartEvent': createAction(
    'bpmn:StartEvent',
    '事件',
    'icon-custom icon-custom-start',
    '开始节点'
  ),
  'create.end-event': createAction(
    'bpmn:EndEvent',
    '事件',
    'icon-custom icon-custom-end',
    '结束节点'
  ),
  'create.task': createAction(
    'bpmn:Task',
    '任务',
    'icon-custom operation-task',
    '数据库检索'
  ),
  'create.sub-process': createAction(
    'bpmn:SubProcess',
    '任务',
    'icon-custom flow-subprocess',
    '数据库写入'
  ),
  'create.custom-Join': createAction(
    'custom:Join', // etl.json 定义
    '数据操作',
    'icon-custom icon-custom-join',
    '数据连接'
  ),
  'create.custom-Switch': createAction(
    'custom:Switch', // etl.json 定义
    '数据操作',
    'icon-custom icon-custom-switch',
    '数据分发'
  ),
  'create.custom-Sort': createAction(
    'custom:Sort', // etl.json 定义
    '数据操作',
    'icon-custom icon-custom-sort',
    '数据排序'
  ),
  'create.custom-Filter': createAction(
    'custom:Filter', // etl.json 定义
    '数据操作',
    'icon-custom icon-custom-filter',
    '数据过滤'
  ),
}

function createAction (
  type,
  group,
  className,
  title,
  drawShape,
  translate,
  options
) {
  var shortType = type.replace(/^bpmn:/, '')

  function createListener (event, autoActivate, elementFactory, create) {
    var shape = elementFactory.createShape(assign({ type: type }, options))

    if (options) {
      shape.businessObject.di.isExpanded = options.isExpanded
    }

    // TODO: 自定义元模型 需要 实现 createText
    shape.businessObject.name = title

    create.start(event, shape)
  }
  return {
    type,
    group: group,
    className: className,
    title: title || translate('Create {type}', { type: shortType }),
    drawShape,
    action: {
      dragstart: createListener,
      click: createListener
    }
  }
}