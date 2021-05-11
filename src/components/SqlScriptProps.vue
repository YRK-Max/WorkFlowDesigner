<template>
  <div>
    <a-form-item label="编号" required>
      <a-input v-model="id" read-only></a-input>
    </a-form-item>
    <a-form-item label="Sql语句" required>
      <a-textarea placeholder="textarea with clear icon" allow-clear @change="onChange" />
    </a-form-item>
  </div>
</template>
<script>
const forEach = require('lodash/forEach')

// 用户任务属性组件
export default {
  props: ['element', 'version', 'process_flow_name'],
  inject: ['bpmnModeler'],
  data() {
    return {
      modeling: null,
      id: this.element.id || '',
      name: '',
      operation_options: [],
      // 原子节点属性
      positions: [],
      priority: ''
    }
  },
  methods: {
    handlerOperationChange(value) {
      this.name = value
    },
    onChange(e) {
      console.log(e);
    },
  },
  mounted() {
  },
  watch: {
    name: {
      handler(newVal, oldVal) {
        if(newVal && oldVal != '') {
          const temp_id = this.process_flow_name + '_' + this.version.replaceAll('.', '_') + '_' + newVal
          const bpmnModeler = this.bpmnModeler()
          const modeling = bpmnModeler.get('modeling')
          if(bpmnModeler.get('elementRegistry').get(temp_id)){
            this.$message.error('该站点已存在，请勿重复添加')
            return
          }
          this.id = temp_id
          modeling.updateProperties(this.element, {
            name: newVal,
            id: temp_id
          })
        }
      }
    },
    //监视元素变化
    element: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal.type == 'bpmn:Task') {
          const bpmnModeler = this.bpmnModeler()
          const modeling = bpmnModeler.get('modeling')
          const businessObject = newVal.businessObject
          this.name = businessObject.name
          // 原子
          const candidateGroupsTemp = businessObject.get('candidateGroups')
          // 解决后端反显和切换节点反显candidateGroupsTemp类型不一致问题
          if (candidateGroupsTemp && candidateGroupsTemp.length > 0) {
            if (Array.isArray(candidateGroupsTemp)) {
              //切换节点反显
              this.candidateGroups = businessObject.get('candidateGroups')
            } else {
              //后端反显
              this.candidateGroups = businessObject.get('candidateGroups').split(',')
            }

          }

          this.multiinstance_type = businessObject.get('multiinstance_type') || 'None'
          this.multiinstance_condition = businessObject.get('multiinstance_condition') || ''
          modeling.updateProperties(newVal, { 'multiinstance_type': this.multiinstance_type })
          modeling.updateProperties(newVal, { 'multiinstance_condition': this.multiinstance_condition })
        }
      }
    }
  }

}
</script>
<style>

</style>
