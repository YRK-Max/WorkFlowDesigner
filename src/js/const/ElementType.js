const BPMN_PREFIX = 'bpmn:'
const CUSTOM_PROFIX = 'custom:'
const ELEMETN_TYPE = {
  //以下为 bpmn规范的元素
  collaboration: BPMN_PREFIX + 'Collaboration',
  textAnnotation: BPMN_PREFIX + 'TextAnnotation',
  group: BPMN_PREFIX + 'Group',
  process: BPMN_PREFIX + 'Process',
  subProcess: BPMN_PREFIX + 'SubProcess',
  documentation: BPMN_PREFIX + 'Documentation',

  startEvent: BPMN_PREFIX + 'StartEvent',
  endEvent: BPMN_PREFIX + 'EndEvent',
  throwEvent: BPMN_PREFIX + 'IntermediateThrowEvent',
  exclusiveGateway: BPMN_PREFIX + 'ExclusiveGateway',
  inclusiveGateway: BPMN_PREFIX + 'InclusiveGateway',
  parallelGateway: BPMN_PREFIX + 'ParallelGateway',
  sequenceFlow: BPMN_PREFIX + 'SequenceFlow',

  userTask: BPMN_PREFIX + 'UserTask',
  Task: BPMN_PREFIX + 'Task',
  callActivity: BPMN_PREFIX + 'CallActivity',
  //以下为custom的拓展元素
  JavaScript: CUSTOM_PROFIX + 'JavaScript',
  SqlScript: CUSTOM_PROFIX + 'SqlScript',
  Message: CUSTOM_PROFIX + 'Message',
  Join: CUSTOM_PROFIX + 'Join',
  Switch: CUSTOM_PROFIX + 'Switch',
  // 只读设计器
  startEventReadonly: BPMN_PREFIX + 'StartEventReadonly',
  endEventReadonly: BPMN_PREFIX + 'EndEventReadonly',
  throwEventReadonly: BPMN_PREFIX + 'IntermediateThrowEventReadonly',
  exclusiveGatewayReadonly: BPMN_PREFIX + 'ExclusiveGatewayReadonly',
  inclusiveGatewayReadonly: BPMN_PREFIX + 'InclusiveGatewayReadonly',
  parallelGatewayReadonly: BPMN_PREFIX + 'ParallelGatewayReadonly',
  sequenceFlowReadonly: BPMN_PREFIX + 'SequenceFlowReadonly',

  userTaskReadonly: BPMN_PREFIX + 'UserTaskReadonly',
  callActivityReadonly: BPMN_PREFIX + 'CallActivityReadonly'

}
export default ELEMETN_TYPE