import '@/style/bpmn.less'

export default function ContextPadProvider(contextPad, config, injector, translate, bpmnFactory, elementFactory, create, modeling, connect) {
  this.create = create
  this.elementFactory = elementFactory
  this.translate = translate
  this.bpmnFactory = bpmnFactory
  this.modeling = modeling
  this.connect = connect
  config = config || {}
  if (config.autoPlace !== false) {
    this.autoPlace = injector.get('autoPlace', false)
  }
  contextPad.registerProvider(this)
}

ContextPadProvider.$inject = [
  'contextPad',
  'config',
  'injector',
  'translate',
  'bpmnFactory',
  'elementFactory',
  'create',
  'modeling',
  'connect'
]

ContextPadProvider.prototype.getContextPadEntries = function(element) {
  const {
    translate,
    modeling,
    connect
  } = this

  // 删除功能
  function removeElement(e) {
    console.log(e);
    modeling.removeElements([element])
  }

  function connectStart(e, t) {
    connect.start(e, t)
  }

  function clickElement(e) {
    console.log(e);
    console.log(element)
  }

  // function appendTask(event, element) {
  //   console.log(autoPlace)
  //   if (autoPlace) {
  //     const shape = elementFactory.createShape({ type: 'bpmn:Task' })
  //     autoPlace.append(element, shape)
  //   } else {
  //     appendTaskStart(event, element)
  //   }
  // }

  // function appendTaskStart(event) {
  //   console.log(event)
  //   const shape = elementFactory.createShape({ type: 'bpmn:Task' })
  //   create.start(event, shape, element)
  // }

  // function appendSP(event, element) {
  //   console.log(autoPlace)
  //   if (autoPlace) {
  //     const shape = elementFactory.createShape({ type: 'bpmn:SubProcess' })
  //     autoPlace.append(element, shape)
  //   } else {
  //     appendTaskStart(event, element)
  //   }
  // }

  // function appendSPStart(event) {
  //   console.log(event)
  //   const shape = elementFactory.createShape({ type: 'bpmn:SubProcess' })
  //   create.start(event, shape, element)
  // }
  //
  // function editElement() { // 创建编辑图标
  //   return {
  //     group: 'edit',
  //     className: 'icon-custom icon-custom-edit',
  //     title: translate('编辑'),
  //     action: {
  //       click: clickElement
  //     }
  //   }
  // }

  function connectElement() {
    return {
      group: 'connect',
      className: 'bpmn-icon-connection-multi',
      title: translate('Connect using DataInputAssociation'),
      action: { click: clickElement, dragstart: connectStart }
    }
  }

  function deleteElement() {
    return {
      group: 'edit',
      className: 'icon-custom icon-custom-delete',
      title: translate('删除'),
      action: {
        click: removeElement
      }
    }
  }

  if (element.type == 'bpmn:Task' || element.type == 'bpmn:SubProcess' || element.type == 'bpmn:StartEvent' || element.type.indexOf('custom') >= 0) {
    return {
      // 'append.operation-task': {
      //   group: 'model',
      //   className: 'icon-custom operation-task',
      //   title: translate('创建站点节点'),
      //   action: {
      //     click: appendTask,
      //     dragstart: appendTaskStart
      //   }
      // },
      // 'append.flow-subprocess': {
      //   group: 'model',
      //   className: 'icon-custom flow-subprocess',
      //   title: translate('引用流程'),
      //   action: {
      //     click: appendSP,
      //     dragstart: appendSPStart
      //   }
      // },
      // 'edit': editElement(),
      'delete': deleteElement(),
      'connect': connectElement()
    }
  } else if (element.type === 'bpmn:SequenceFlow' || element.type === 'bpmn:EndEvent') {
    return { 'delete': deleteElement() }
  }

  return {}
}
