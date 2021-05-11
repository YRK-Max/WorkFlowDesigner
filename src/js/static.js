/*
 * static.js文件为自动生成文件，修改无效 
 * 如要修改请到 test im.dhc.workflow.tools文件下 
 * 运行generateJsFilesTest函数进行修改
 */
export var IntAttri = {
    START_VERSION: '1',
    UN_IMPORTART_NODE: 0,
    IMPORTART_NODE: 1,
    START_NODE: 2,
    ACTIVE_STATUS: '1',
    SUSPEND_STATUS: '0',
    CMD_ACTIVE: '1',
    CMD_CANCEL: '0',
    CMD_NOTRUN: '-1',
    CMD_COMPLETED: '2',
    CMD_TYPE_SELF: '0',
    CMD_TYPE_OTHER: '1',
    APPLY_TASK: '1',
    CHECK_TASK: '2',
    TRIAL_TASK: '6',
    AUDIT_TASK: '3',
    APPROVE_TASK: '4',
    REACHED_TASK: '8',
    ACCEPTED_TASK: '9',
    AUTHENTICATE_TASK: '7',
    ACCOUNT_TASK: '5',
    SINGLE_HANDLE: '0',
    BATCH_HANDLE: '1',
    MOLE_MODEL: '0',
    ATOM_MODEL: '1',
    FULL_MODEL: '2',
    GLOBAL_PRIORITY: '1',
    CALLACTIVITY_PRIORITY: '2',
    EXCLUSIVEGATEWAY_PRIORITY: '3',
    USERTASK_PRIORITY: '4',
    STARTEVENT_PRIORITY: '5',
    ENDEVENT_PRIORITY: '6',
    CANNOTDO: '0',
    CANDO: '1',
    YES: '1',
    NO: '0',
    ASSIGNEE: '0',
    CANDIDATEUSER: '1',
    CANDIDATEGROUP: '2',
    INTERNAL_FORM: '0',
    EXTERNAL_FORM: '1',
    FROM_SELF: '0',
    FROM_OTHER: '1',
    VIEW_SINGLE_PROCESS: '0',
    VIEW_FULL_PROCESS: '1',
    TRACE_SINGLE_INSTANCE: '2',
    TRACE_FULL_INSTANCE: '3',
    CALLELEMENT_SQL: '1',
    MULTIINSTANCE_INPUTITEM_SQL: '2',
    MULTIINSTANCE_COMPLETIONCONDITION: '3',
    INTERFIX_LENGTH: '4',
    WORKPANEL_NORMAL: '0',
    WORKPANEL_TODAY_TOTAL: '1',
    WORKPANEL_TODAY_CANCLAIM: '2',
    WORKPANEL_TODAY_CLAIMED: '3',
    WORKPANEL_TODAY_COMPLETED: '4',
    WORKPANEL_TODAY_SINGAL: '5',
    CALL_EXPRESS_TYPE_DEFAULT: '0',
    CALL_EXPRESS_TYPE_SQL: '1',
    CALL_EXPRESS_TYPE_TENANT: '2',
    CALLBACK_TYPE_CATEGORY: '1',
    CALLBACK_TYPE_MOLE: '2',
    CALLBACK_TYPE_ATOM: '3'
};

export var LoggerName = {
    CONTROLLER_LOG: 'workflow.controller',
    SERVICE_LOG: 'workflow.service'
};

export var StrAttri = {
    APPLY_TASK: '申请',
    CHECK_TASK: '复核',
    TRIAL_TASK: '初审',
    AUDIT_TASK: '审核',
    APPROVE_TASK: '审批',
    REACHED_TASK: '达成',
    ACCEPTED_TASK: '受理',
    AUTHENTICATE_TASK: '确认',
    ACCOUNT_TASK: '记账',
    PREFIX: 'T_',
    INTERFIX: '9__9',
    SUFFIX: '_E',
    MUTLI_TRACE_URL: '/workflow/process-edit/viewer-app/traceView.jsp',
    SINGLE_TRACE_URL: '/workflow/process-edit/viewer-app/callactivityTraceView.jsp',
    MODEL_PRINT_URL: '/workflow/process-edit/print-app/printView.jsp',
    PROCESS_VIEW_URL: '/workflow/page/base/process/processTree.jsp',
    MOLO_TENANT: 'xxxxxx',
    DEFAULT_VALUE: 'xxxxxx',
    MOLE: 'mole',
    ATOM: 'atom',
    BPMN_NAMESPACE: 'http://b3mn.org/stencilset/bpmn2.0#',
    MODLE_TYPE: 'type',
    BPMN_FILE_EXT: '.bpmn20.xml',
    DEFAULT_CHARSET: 'UTF-8',
    APPEND_SEPARATOR: '-',
    PROCESS: 'process',
    EXCLUSIVEGATEWAY: 'exclusiveGateway',
    USERTASK: 'userTask',
    STARTEVENT: 'startEvent',
    ENDEVENT: 'endEvent',
    CALLACTIVITY: 'callActivity',
    IMAGE_RESOURCE: 'image',
    XML_RESOURCE: 'xml',
    ACTIVITY_DOCUMENTATION: 'documentation',
    TRUE: 'true',
    FALSE: 'false',
    ACTIVE_STATUS: 'active',
    COMPLETED_STATUS: 'complete',
    ROLLBACK_STATUS: 'rollback',
    RESULT_PASS: 'pass',
    RESULT_UNPASS: 'unpass',
    RESULT_ROLLBACK_LAST: 'rollback_last',
    RESULT_ROLLBACK_START: 'rollback_start',
    RESULT_ROLLBACK_DEFINE: 'rollback_define',
    CALL_VALUE_KEY: 'act_yw_call',
    NEXTPROCESS: 'nextProcess',
    CATEGORY_FULL_TREE: 'categoryTree',
    REASON_CANCEL: '子流程取消',
    ROLE_TYPE_ADMINISTARTOR: '1',
    ROLE_TYPE_TELLER: '3',
    ROLE_TYPE_DIRECTOR: '2'
};

export var PageUrl = {
    MOLE_NODE_MAIN: '/workflow/page/mole/node/moleNodeMain.jsp',
    MOLE_NODE_EDIT: '',
    MOLE_MODEL_MAIN: '/workflow/page/mole/model/moleModelMain.jsp',
    MOLE_MODEL_EDIT: '',
    MOLE_PROCESS_MAIN: '/workflow/page/mole/process/moleProcessMain.jsp',
    MOLE_PROCESS_EDIT: '',
    ATOM_NODE_MAIN: '/workflow/page/atom/node/atomNodeMain.jsp',
    ATOM_NODE_EDIT: '',
    ATOM_MODEL_MAIN: '/workflow/page/atom/model/atomModelMain.jsp',
    ATOM_MODEL_EDIT: '',
    ATOM_PROCESS_MAIN: '/workflow/page/atom/process/atomProcessMain.jsp',
    ATOM_PROCESS_EDIT: '',
    WORK_INDEX: '/workflow/page/biz/workIndexMain.jsp',
    REQUEST_CANCEL_LIST: '/workflow/page/biz/requestCancelList.jsp',
    FILED_MAIN: '/workflow/page/mole/field/fieldMain.jsp'
};
//
export const OperatorAllOptions = [
    { TEXT: '等于', VALUE: '==' },
    { TEXT: '不等于', VALUE: '!=' },
    { TEXT: '小于', VALUE: '<' },
    { TEXT: '大于', VALUE: '>' },
    { TEXT: '大于等于', VALUE: '>=' },
    { TEXT: '小于等于', VALUE: '<=' }];
export const OperatorLessOptions = [
    { TEXT: '等于', VALUE: '==' },
    { TEXT: '不等于', VALUE: '!=' }
];
export const LogicOptions = [
    { TEXT: '无', VALUE: '' },
    { TEXT: '并且', VALUE: '&&' },
    { TEXT: '或者', VALUE: '||' }
];
export const wfResult = [
    { TEXT: '通过', VALUE: 'pass' },
    { TEXT: '不通过', VALUE: 'unpass' }
];
export const TxType = ['',
    StrAttri.APPLY_TASK,
    StrAttri.CHECK_TASK,
    StrAttri.AUDIT_TASK,
    StrAttri.APPROVE_TASK,
    StrAttri.ACCOUNT_TASK,
    StrAttri.EXAMINE_TASK,
    StrAttri.AUTHENTICATE_TASK,
    StrAttri.REACHED_TASK,
    StrAttri.ACCEPTED_TASK
];

export const TxTypeMap = { 1: '申请', 4: '审批', 5: '记账' };


export const NodeTypeMap = { 0: '非关键节点', 1: '关键节点', 2: '开始节点' };


