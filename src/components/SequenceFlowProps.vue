<template>
  <div>
    <a-form-item label="编号" v-show="true">
      <a-input v-model="id"></a-input>
    </a-form-item>
    <a-form-item label="名称">
      <a-input v-model="name" read-only></a-input>
    </a-form-item>
    <a-form-item label="跳转条件" v-show="needConditiona">
      <a-input v-model="condition" read-only @click="openDialog"></a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox id="isReworkFlow" v-model="reworkFlag">返工流程</a-checkbox>
    </a-form-item>
    <!-- <a-form-item label="默认跳线" v-show="needConditiona">
        <el-select v-model="defaultflow" filterable placeholder="请选择" >
            <el-option label="是" :value=true></el-option>
            <el-option label="否" :value=false></el-option>
        </el-select>
    </a-form-item> -->

    <a-modal title="跳转条件配置" v-model="dialogTableVisible" width="1000px">
      <template slot="footer">
        <a-button type="primary" @click="dialogTableVisible = false">取 消</a-button>
        <a-button type="primary" @click="saveConditions">保存并关闭</a-button>
      </template>
      <a-layout>
        <a-layout-content>
          <a-layout>
            <a-layout-sider width="500px" style="background: white; margin: 5px">
              <vxe-grid
                :sort-config="{multiple: true}"
                ref="xTable"
                class="table mytable-scrollbar"
                align="center"
                height="500"
                border
                resizable
                show-overflow
                column-key
                highlight-hover-row
                highlight-current-row
                :columns="condition_columns"
                :data="table.conditions"
                @cell-click="rowClick">
              </vxe-grid>
              <div style="textAlign:right; margin-right: 5px; margin-bottom: 5px">
                <a-button-group style="margin-left:5px; margin-right:0; margin-top:8px">
                  <a-button type="primary" icon="minus" @click="removeRow"></a-button>
                  <a-button type="primary" icon="plus" @click="addRow"></a-button>
                </a-button-group>
              </div>
            </a-layout-sider>
            <a-layout-content style="margin: 5px">
              <div v-if="formShow === true">
                <a-form label-width="auto" size="mini" label-position="top">
                  <a-form-item label="ID">
                    <a-input v-model="this.table.selectedRow['id']" read-only></a-input>
                  </a-form-item>
                  <a-form-item label="跳转条件" required>
                    <a-select v-model="form.variable"
                              :options="conditionList"
                              placeholder="请选择"
                              @select="handleConditionSelect">
                    </a-select>
                  </a-form-item>
                  <a-form-item label="值" required>
                    <a-select v-model="form.conditionalVal"
                              :options="conditionValueList"
                              placeholder="请选择">
                    </a-select>
                  </a-form-item>
                </a-form>
              </div>
              <div v-else>
                未选择条件
              </div>
            </a-layout-content>
          </a-layout>
        </a-layout-content>
      </a-layout>
    </a-modal>
  </div>
</template>
<script>
import bpmnHelper from '../js/helper/BpmnHelper'
import { is } from 'bpmn-js/lib/util/ModelUtil'
import AdjacencyMatrixGraph from '../js/utils/AdjacencyMatrixGraph'
import { isBlank } from '@/js/utils/CommonUtils'
import AdapterComponent from './AdapterComponent.vue'
import { randomUUID } from '@/utils/util'

const condition_columns = [
  {
    title: '序号',
    type: 'seq',
    width: 60
  },
  {
    title: 'ID',
    field: 'id',
    width: 100,
    sortable: true,
    resizable: true,
    showOverflow: 'ellipsis'
  },
  {
    title: '变量',
    field: 'variable',
    sortable: true,
    resizable: true,
    showOverflow: 'ellipsis'
  },
  {
    title: '值',
    field: 'conditionalVal',
    resizable: true,
    showOverflow: 'ellipsis'
  }
]
const eventDefinitionHelper = require('../js/helper/EventDefinitionHelper'),
  isAny = require('bpmn-js/lib/features/modeling/util/ModelingUtil').isAny,
  elementHelper = require('../js/helper/ElementHelper'),
  forEach = require('lodash/forEach'),
  filter = require('lodash/filter'),
  find = require('lodash/find'),
  findIndex = require('lodash/findIndex'),
  includes = require('lodash/includes'),
  replace = require('lodash/replace'),
  map = require('lodash/map')
const DEFAULT_VALUE = {
  condition: '未配置任何条件',
  logicLabel: '无'
}
export default {
  props: ['element'],
  inject: ['bpmnModeler'],
  components: { AdapterComponent },
  data() {
    return {
      modeling: null,
      id: this.element.id || '',
      name: '',
      condition: DEFAULT_VALUE.condition,
      reworkFlag: false,
      // defaultflow:false,
      //时都需要条件
      needConditiona: false,
      dialogTableVisible: false,
      //条件列表
      conditionList: [],
      conditionValueList: [],
      logicOptions: LogicOptions,
      formShow: false,
      form: {
        id: '',
        variable: '',
        conditionalVal: '',
        tmp: {
          //变量的详细信息
          variableInfo: undefined,
          componentType: 'input',
          conditionalValData: undefined
        }
      },
      table: {
        conditions: [],
        selectedRow: undefined
      },
      condition_columns
    }
  },
  mounted() {
    const bpmnModeler = this.bpmnModeler()
    this.modeling = bpmnModeler.get('modeling')
  },
  methods: {
    openDialog() {
      this.table.conditions = []
      this.table.selectedRow = undefined
      this.form.tmp.componentType = 'input'
      //加载可配置的条件列表
      this.loadCanditionList()
      this.loadCondition()
      //翻译
      this.translateAllConditions()
      this.dialogTableVisible = true
    },
    closeDialog() {
      let bo = bpmnHelper.getBo(this.element)
      this.loadCondition(bo)
      this.dialogTableVisible = false
    },
    addRow() {
      this.table.conditions.push({
        id: randomUUID(),
        variable: '',
        variableLabel: '',
        conditionalVal: '',
        conditionalValLabel: '',
        ReworkFlag: 'N'
      })
    },
    //保存条件
    saveConditions() {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      let conditions = this.table.conditions
      let conditionExpress = ''
      let conditionList = this.conditionList
      if (validateConditions(conditions)) {
        forEach(conditions, function(condition, index) {
          let conditionInfo = find(conditionList, { value: condition.variable })
          if (conditionInfo) {
            let conditionalVal
            if (conditionInfo.type != 'number') {
              if(conditionExpress != ''){
                conditionExpress += '&&'
              }
              conditionalVal = '"' + condition.conditionalVal + '"'
              conditionExpress += condition.variable+"="+conditionalVal
            }
          }
        })
        let conditionOrConditionExpression = undefined
        let bo = bpmnHelper.getBo(this.element)
        const bpmnModeler = this.bpmnModeler()
        const commandStack = bpmnModeler.get('commandStack')
        if (conditionExpress.length > 0) {
          let conditionalEventDefinition = eventDefinitionHelper.getConditionalEventDefinition(this.element)
          const bpmnFactory = bpmnModeler.get('bpmnFactory')

          modeling.updateProperties(this.element, {name: conditionExpress.replaceAll('&&', '\n')})
          this.name = conditionExpress.replaceAll('&&', '\n')
          //生成表达式
          conditionExpress = '${' + conditionExpress + '}'
          //设置表达式的值
          conditionOrConditionExpression = elementHelper.createElement(
            'bpmn:FormalExpression',
            { body: conditionExpress },
            conditionalEventDefinition || bo,
            bpmnFactory
          )
          let source = this.element.source
          // 如果是默认条线，移除source的属性
          // if (source && source.businessObject.defaultflow) {
          //     bpmnHelper.updatePropertiesByCmd(source,commandStack,{ 'defaultflow': false });
          // }
        }
        bpmnHelper.updatePropertiesByCmd(this.element, commandStack, { conditionExpression: conditionOrConditionExpression })
        this.dialogTableVisible = false
      }

    },
    removeRow() {
      if (this.table.selectedRow !== undefined) {
        //删除选定的数组
        let index = findIndex(this.table.conditions, { id: this.table.selectedRow.id })
        this.table.conditions.splice(index, 1)
        this.table.selectedRow = undefined
      }
    },
    loadCondition(bo) {
      bo = bo || bpmnHelper.getBo(this.element)
      let conditionalEventDefinition = eventDefinitionHelper.getConditionalEventDefinition(this.element)
      let conditionExpression = conditionalEventDefinition ? conditionalEventDefinition.condition : bo.conditionExpression
      this.condition = '未配置任何条件'
      if (conditionExpression) {
        //获取配置的条件表达
        let condition = conditionExpression.get('body')
        this.parseCondition(condition)
      }
      //获取返工标识
      let reworkProp = bpmnHelper.getPropertie(this.element, 'reworkFlag')
      if(reworkProp){
        this.reworkFlag = reworkProp === 'true'
      }
    },
    parseCondition(conditionExpress) {
      let operators = ['!', '=', '>', '<']
      let logicOperators = ['&', '|']
      conditionExpress = conditionExpress.replace('$', '').replace('{', '').replace('}', '').replace(new RegExp('"', 'g'), '')
      this.table.conditions = []
      let self = this
      splitConditionExpress(conditionExpress)

      //截取表达时候
      function splitConditionExpress(str) {
        //正查找查找操作符
        let idx = findChar(str, true, true, logicOperators)
        if (idx == -1) {
          let row = createConditionRow(str)
          self.table.conditions.push(row)
          return
        } else {
          //操作符
          let logic = str.substring(idx, idx + 2)
          let conditionExpress = str.substring(0, idx)
          let row = createConditionRow(conditionExpress, logic)
          self.table.conditions.push(row)
          let newStr = str.substring(idx + 2)
          splitConditionExpress(newStr)
        }
      }

      function createConditionRow(conditionExpress, logic) {
        let row = {}
        //纯表达式
        let headOptIdx = findChar(conditionExpress, true, false, operators)
        let footOptIdx = findChar(conditionExpress, false, false, operators)
        //变量
        let variable = conditionExpress.substring(0, headOptIdx).trim()
        //值
        let val = conditionExpress.substring(footOptIdx + 1, conditionExpress.length).trim()
        //操作符
        let opt = conditionExpress.substring(headOptIdx, footOptIdx + 1).trim()
        row.id = randomUUID()
        row.variable = variable
        row.conditionalVal = val
        row.logic = logic
        return row
      }

      /**
       * @description 检索第一个的操作操作符
       * @param str 需要被检索的字符串
       * @param  type 类型 true:正查找 false:反查找
       * @param report 检索的字符是否需要重复 true | false
       */
      function findChar(str, type, report, operators) {
        let index = -1
        let len = str.length
        if (type) {
          for (let i = 0; i < len; i++) {
            let char = str.charAt(i)
            if (includes(operators, char)) {
              //查找第一个
              if (report) {
                if (char == str.charAt(i + 1)) {
                  index = i
                  break
                }
              } else {
                index = i
                break
              }
            }
          }
        } else if (!type) {
          for (let i = (len - 1); i >= 0; i--) {
            let char = str.charAt(i)
            if (includes(operators, char)) {
              //从末尾查找最后一个
              if (report) {
                if (char == str.charAt(i - 1)) {
                  index = i
                  break
                }
              } else {
                index = i
                break
              }
            }
          }
        }
        return index
      }
    },
    loadCanditionList() {
      let formKeys = ''
      let nodeSet = []
      const bpmnModeler = this.bpmnModeler()
      const canvas = bpmnModeler.get('canvas')
      let children = canvas.getRootElement().children
      let shapes = filter(children, function(c) {
        return !(c.type == 'label')
      })

      //创建有向图
      let ngGraph = new AdjacencyMatrixGraph()
      //将流程图中所有元素当作有向图的顶点加入
      forEach(shapes, function(item) {
        ngGraph.setNode(item.id)
      })
      //根据流程图的添加图的弧
      forEach(shapes, function(item) {
        //如果是连线，没有outgoing，只有target
        if (is(item, 'bpmn:SequenceFlow')) {
          ngGraph.setEdge(item.id, item.target.id)
        } else {
          forEach(item.outgoing, function(outgoing) {
            ngGraph.setEdge(item.id, outgoing.id)
          })
        }
      })
      //获取流程图中的所有可能经历过的节点
      let allPreNodes = ngGraph.allPredecessors(this.element.id)
      let params_json_str = { sql_name: 'getFlowCondition' }
      executeSQL(params_json_str).then(res => {
        this.conditionList = res['result']
      })
    },
    //设置组件的值
    initSubComponent(variableInfo) {
      variableInfo = variableInfo || this.getVariableInfo()
      if (variableInfo) {
        if (variableInfo.type == 'result') {
          this.form.tmp.componentType = 'select'
          this.form.tmp.conditionalValData = wfResult
        }
        if (variableInfo.type == 'number') {
          $scope.dataStatus.INPUT = true
          return
        }

        //如果是select型则要获取select列表数据
        if (variableInfo.type == 'select') {
          // TODO
          return
        }
        //如果是日期控件
        if (variableInfo.type == 'date') {
          // TODO
          return
        }

        //如果是tree
        if (variableInfo.type == 'inputtree') {
          // TODO
          return
        }

        //如果是lookup
        if (variableInfo.type == 'lookup') {
          // TODO
          return
        }
      }
    },
    translateAllConditions() {
      let conditions = this.table.conditions
      let conditionList = this.conditionList
      forEach(conditions, function(condition) {
        let conditionInfo = find(conditionList, { VALUE: condition.variable })
        if (conditionInfo) {
          //翻译变量名称
          condition.variableLabel = conditionInfo.TEXT
          //如果条件类型为结果类型的
          if (conditionInfo.type = 'result') {
            //翻译条件值
            let resultInfo = find(wfResult, { VALUE: condition.conditionalVal })
            condition.conditionalValLabel = resultInfo.TEXT
          }
        }
        let logicInfo = find(LogicOptions, { VALUE: condition.logic })
        if (logicInfo) {
          //翻译逻辑符
          condition.logicLabel = logicInfo.TEXT
        } else {
          condition.logicLabel = '无'
        }
      })
    },
    getVariableInfo(variableVal) {
      if (variableVal === undefined) {
        variableVal = this.form.variable
      }
      return find(this.conditionList, { VALUE: variableVal })
    },
    rowClick({ row }) {
      this.form.variable = '&uuuteiy'
      this.table.selectedRow = row
    },
    handleConditionSelect(value) {
      this.form.conditionalVal = ''
      let params_json_str = { sql_name: 'getFlowConditionValue', condition: value }
      executeSQL(params_json_str).then(res => {
        this.conditionValueList = res['result']
      })
    }
  },
  watch: {
    element: {
      deep: true,
      immediate: true,
      handler(element, oldVal) {
        this.name = element.businessObject.name
        //显示条件配置选项
        this.needConditiona = true
        // this.defaultflow = false;
        //获取source节点
        let sourceBo = bpmnHelper.getBo(element.source)
        if (!sourceBo) {
          return
        }
        //获取source上的默认连线
        // let defalutSequence = element.businessObject.get('defaultflow');
        // if(defalutSequence){
        //     this.defaultflow = true;
        // }
        //加载条件
        this.loadCondition()
      }
    },
    name: {
      handler(newVal, oldVal) {
        this.modeling.updateProperties(this.element, {
          'name': newVal
        })
      }
    },
    condition: {
      handler(newVal, oldVal) {
        this.modeling.updateProperties(this.element, {
          'condition': newVal
        })
      }
    },
    reworkFlag: {
      handler(newVal, oldVal){
        this.modeling.updateProperties(this.element, {
          'reworkFlag': newVal
        })
      }
    },
    //监控变量的值
    'form.variable': {
      immediate: true,
      handler: function(newVal, oldVal) {
        if (newVal === '' || newVal === '&uuuteiy') {
          return
        }
        if (this.table.conditions.findIndex((v) => { return v.variable === newVal }) !== -1 && oldVal !== '&uuuteiy') {
          this.$message.error('该条件已存在，请勿重复添加')
          return
        }
        let currentRow = this.table.selectedRow
        let index = findIndex(this.table.conditions, { id: currentRow.id })
        currentRow.variable = newVal
        this.$set(this.table.conditions, index, currentRow)
      }
    },
    'form.conditionalVal': function(newVal, oldVal) {
      if (newVal !== oldVal) {
        let currentRow = this.table.selectedRow
        if (currentRow) {
          let index = findIndex(this.table.conditions, { id: currentRow.id })
          currentRow.conditionalVal = newVal
          this.$set(this.table.conditions, index, currentRow)
        }
      }
    },
    'table.selectedRow': {
      deep: true,
      immediate: true,
      handler: function(newVal) {
        if (newVal !== undefined) {
          this.formShow = true
          this.form.variable = newVal.variable
          let variableInfo = this.getVariableInfo()
          this.initSubComponent(variableInfo)
          this.form.conditionalVal = newVal.conditionalVal
          this.form.logic = newVal.logic
          this.form.tmp.variableInfo = undefined
        } else {
          this.formShow = false
        }
      }
    },
    'table.conditions': {
      immediate: true,
      handler: function(conditions) {
        if (conditions === undefined || conditions.length == 0) {
          this.condition = '未配置任何条件'
        } else {
          this.condition = '已配置' + conditions.length + '条件'
        }
      }
    }
  }
}
//只有网关和活动才需要配置条件
const CONDITIONAL_SOURCES = [
  'bpmn:Activity',
  'bpmn:ExclusiveGateway',
  'bpmn:InclusiveGateway',
  'bpmn:ComplexGateway'
]
function isConditionalSource(element) {
  return isAny(element, CONDITIONAL_SOURCES)
}
//判断是否需要条件配置
function idNeedCondition(element, bo) {
  if (!bo) {
    return false
  }
  let conditionalEventDefinition = eventDefinitionHelper.getConditionalEventDefinition(element)
  if (!(is(element, 'bpmn:SequenceFlow') && isConditionalSource(element.source))
    && !conditionalEventDefinition) {
    return false
  }
  return true
}
//校验表达式的正确性
function validateConditions(conditions) {
  let flag = true
  forEach(conditions, function(condition, index) {
    index = index + 1
    if (isBlank(condition.variable)) {
      console.error('第' + index + '个条件,变量不能为空')
      flag = false
      return
    }

    if (isBlank(condition.conditionalVal)) {
      console.error('第' + index + '个条件,变量值不能为空')
      flag = false
    }
  })
  return flag
}
</script>
<style>

</style>
