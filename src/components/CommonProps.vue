<template>
  <div>
    <a-form-item label="编号" v-show="true">
      <a-input v-model="id" read-only></a-input>
    </a-form-item>
    <a-form-item label="流程名称" required>
      <a-input v-model="name"></a-input>
    </a-form-item>
  </div>
</template>
<script>
import elementHelper from '../js/helper/ElementHelper'

export default {
  name: 'CommonProps',
  //依赖注入
  props: ['element'],
  inject: ['bpmnModeler', 'params'],
  data() {
    return {
      id: '',
      name: '',
      process_namespace: '',
      documentation: '',
      activeName: 'common',
      candidateStarterGroups: '',
      candidateStarterUsers: '',
      listenerType: '',
      eventType: '',
      listenerValue: '',
      isShow: true,
      listenerValueLabel: 'Java类'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  watch: {
    id(newVal) {
      if (this.element) {
        const bpmnModeler = this.bpmnModeler()
        const modeling = bpmnModeler.get('modeling')
        modeling.updateProperties(this.element, { id: newVal })
      }
    },
    name(newVal) {
      if (this.element) {
        const bpmnModeler = this.bpmnModeler()
        const modeling = bpmnModeler.get('modeling')
        modeling.updateProperties(this.element, { name: newVal })
      }
    },
    // 监控element值，当发生改变时获取响应的属性
    element: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
          const bpmnModeler = this.bpmnModeler()
          this.id = newVal.businessObject.get('id')
          this.name = newVal.businessObject.get('name')
          // 初始化赋值
          const modeling = bpmnModeler.get('modeling')
          modeling.updateProperties(this.element, { name: this.name })
          modeling.updateProperties(this.element, { process_namespace: this.process_namespace })
          modeling.updateProperties(this.element, { process_id: this.id })
        }
      }
    },
    eventType(newVal) {
      if (newVal) {
        this.isShow = true
      }
    },
    listenerType(newVal) {
      if (newVal === 'class') {
        this.listenerValueLabel = 'java类'
      } else if (newVal === 'expression') {
        this.listenerValueLabel = '表达式'
      } else if (newVal === 'delegateExpression') {
        this.listenerValueLabel = '代理表达式'
      }
    },
    listenerValue(newVal) {
      if (newVal) {
        const bpmnModeler = this.bpmnModeler()
        const bpmnFactory = bpmnModeler.get('bpmnFactory')
        let extensionElements = this.element.businessObject.get('extensionElements')
        if (!extensionElements) {
          extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, this.element, bpmnFactory)
        }
        const length = extensionElements.get('values').length
        for (let i = 0; i < length; i++) {
          // 清除旧值
          extensionElements.get('values').pop()
        }
        this.eventType.forEach((evt) => {
          const executionListener = elementHelper.createElement(
            'activiti:ExecutionListener',
            null,
            this.element,
            bpmnFactory
          )
          executionListener.$attrs['event'] = evt
          executionListener.$attrs[this.listenerType] = newVal
          extensionElements.get('values').push(executionListener)
        })
        const modeling = bpmnModeler.get('modeling')
        modeling.updateProperties(this.element, {
          extensionElements: extensionElements
        })
      }
    }
  }
}
</script>
