<!--  -->
<template>
  <a-spin tip="Loading..." :spinning="isLoading">
    <a-row style="width: 100%; height: 960px; padding: 10px; box-sizing: border-box;"  :gutter="8">
      <a-col :span="3" style="height: 100%; border: 1px solid #becbff; background: white">
        <CustomHeader title="流程元素"></CustomHeader>
        <div ref="palette"></div>
      </a-col>
      <a-col :span="16">
        <a-tabs type="card">
          <a-tab-pane key="designer" tab="设计">
            <div class="grid-content bg-purple" style="height: 900px">
              <div class="containers">
                <div class="canvas" ref="canvas"></div>
                <div class="elbutton">
                  <a-button style="margin-left: 10px" type="primary" size="default">保存</a-button>
                  <a-button style="margin-left: 10px;" type="primary" size="default">生成</a-button>
                  <div class="elb-div">
                    <a style="display: none" ref="saveDiagram" href="javascript:" title="download BPMN diagram">BPMN</a>
                  </div>
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="source" tab="源码">
            <div class="grid-content bg-purple" style="height: 900px">
              <a-textarea placeholder="Basic usage" style="height: 100%" readOnly :value="sourceXml" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :span="5" style="height: 100%">
        <div class="grid-content bg-purple" style="margin-bottom: 10px; height: calc(25% - 10px) !important;">
          <CustomHeader title="FlowInfo"></CustomHeader>
          <a-form-item
              label="流程ID"
              style="width: 100%; margin-bottom: 6px"
              :label-col="{span: 5}"
              :wrapper-col="{span: 19}">
            <a-input :disabled="true" v-model="currentFlow" />
          </a-form-item>
          <a-form-item
              label="版本号"
              style="width: 100%; margin-bottom: 6px"
              :label-col="{span: 5}"
              :wrapper-col="{span: 19}">
            <a-input :disabled="true" v-model="currentFlowVersion" />
          </a-form-item>
          <a-form-item
              label="CreateUser"
              style="width: 100%; margin-bottom: 6px"
              :label-col="{span: 5}"
              :wrapper-col="{span: 19}">
            <a-input :disabled="true" v-model="currentFlowCreateUser" />
          </a-form-item>
        </div>
        <div class="grid-content bg-purple" style="height: 75% !important; overflow-y: auto">
          <a-form label-width="auto" size="mini" label-position="top">
            <!-- 动态显示属性面板 -->
            <component :is="propsComponent" :element="element" :key="key" :version="currentFlowVersion"
                       :process_flow_name="currentFlow"></component>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script>
import CommonProps from '@/components/CommonProps'
import StartEventProps from "@/components/StartEventProps";

import bpmnHelper from "@/js/helper/BpmnHelper";
import CustomHeader from "@/components/tools/CustomHeader";
import CustomModeler from '@/customModeler'
import entries from '@/config/paletteEntries'
import etlExtension from '@/config/etl.json'
import BpmData from '@/js/BpmnData'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    CustomHeader,
    CommonProps,
    StartEventProps
  },
  props: ['params'],
  provide: function() {
    return {
      bpmnModeler: this.getBpmnModeler,
      params: this.params
    }
  },
  data() {
    return {
      propsComponent: 'CommonProps',
      bpmData: new BpmData(),
      isLoading: false,
      sourceXml: '',
      currentFlow: '',
      currentFlowVersion: '',
      currentFlowCreateUser: '',
      key: '1',
      bpmnModeler: null,
      defaultData: {
        'bpmn:IntermediateThrowEvent': '工艺终止'
      }
    }
  },
  mounted() {
    let _this = this

    /**********************Flow画布部分**************************/
    const canvas = _this.$refs.canvas
    const palette = _this.$refs.palette
    // 去除默认工具栏
    const modules = CustomModeler.prototype._modules
    const index = modules.findIndex(it => it.paletteProvider)
    modules.splice(index, 1)
    // 生成实例
    _this.bpmnModeler = new CustomModeler({
      container: canvas,
      paletteContainer: palette,
      // 工具栏配置及实现自定义渲染方法
      paletteEntries: entries,
      // 开启键盘快捷
      keyboard: {
        bindTo: document
      },
      // 添加自定义元模型
      moddleExtensions: {
        etl: etlExtension
      },
      additionalModules: [
        { labelEditingProvider: ['value', ''] }
      ]
    })

    _this.createNewDiagram(null)
  },
  methods: {
    createNewDiagram(bpmnXmlStr) {
      this.isLoading = true
      if (bpmnXmlStr == null || bpmnXmlStr === '') {
        bpmnXmlStr = bpmnHelper.getBpmnTempate(this.currentFlow)
      }
      // 将字符串转换成图显示出来
      try {
        const result = this.bpmnModeler.importXML(bpmnXmlStr)
        const { warnings } = result
        console.log(warnings)
        this.addModelerListener()
        this.addEventBusListener()
      } catch (error) {
        console.log(error)
      }
      this.sourceXml = bpmnXmlStr
      this.isLoading = false
    },
    addModelerListener() {
      // 监听 modeler
      const bpmnjs = this.bpmnModeler
      const that = this
      // 'shape.removed', 'connect.end', 'connect.move'
      const events = ['shape.added', 'shape.move.end', 'shape.removed']
      events.forEach(function(event) {
        that.bpmnModeler.on(event, (e) => {
          const elementRegistry = bpmnjs.get('elementRegistry')
          const shape = e.element ? elementRegistry.get(e.element.id) : e.shape
          // console.log(shape)
          if (shape.type !== 'label') {
            if (event === 'shape.added') {
              // 展示新增图形的属性
              that.key = e.element.id.replace('_label', '')
              that.propsComponent = bpmnHelper.getComponentByEleType(shape.type)
              that.element = e.element
            } else if (event === 'shape.move.end') {
              // 展示新增图形的属性
              that.key = shape.id
              that.propsComponent = bpmnHelper.getComponentByEleType(shape.type)
              that.element = e.shape
            } else {
              // 展示默认的属性
              that.propsComponent = 'CommonProps'
            }
          }
        })
      })
    },
    addEventBusListener() {
      // 监听 element
      let that = this
      const eventBus = this.bpmnModeler.get('eventBus')
      const eventTypes = ['element.click', 'element.changed', 'selection.changed']
      eventTypes.forEach(function(eventType) {
        eventBus.on(eventType, function(e) {
          if (eventType === 'element.changed') {
            that.elementChanged(e)
          } else if (eventType === 'element.click' && e.element.type !== 'label') {
            if (!e || e.element.type === 'bpmn:Process') {
              that.key = '1'
              that.propsComponent = 'CommonProps'
              that.element = e.element
            } else {
              // 展示新增图形的属性
              that.key = e.element.id
              that.propsComponent = bpmnHelper.getComponentByEleType(e.element.type)
              that.element = e.element
            }
          }
        })
      })
    },
    elementChanged(e) {
      const id = e.element.id.replace('_label', '')
      const shape = this.getShape(id)
      this.element = shape
      const that = this
      if (!shape) {
        return
      }
      if (!this.isInvalid(shape.type)) {
        if (this.isSequenceFlow(shape.type)) {
          console.log('改变了线')
        } else {
          that.setDefaultProperties()
        }
      }
    },
    getShape(id) {
      const elementRegistry = this.bpmnModeler.get('elementRegistry')
      return elementRegistry.get(id)
    },
    isInvalid(param) {
      // 判断是否是无效的值
      return param === null || param === undefined || param === ''
    },
    getBpmnModeler() {
      return this.bpmnModeler
    },
    isSequenceFlow(type) {
      // 判断是否是线
      return type === 'bpmn:SequenceFlow'
    },
    setDefaultProperties() {
      const that = this
      const { element } = that
      if (element) {
        // 这里可以拿到当前点击的节点的所有属性
        const { type, businessObject } = element
        const { name } = businessObject
        if (that.verifyIsEvent(type)) {
          const eventType = businessObject.eventDefinitions ? businessObject.eventDefinitions[0]['$type'] : ''
          console.log(eventType)
        } else if (this.verifyIsTask(type)) {
          console.log(type)
        }
        that.element['name'] = name || that.defaultData[element.type]
      }
    },
    verifyIsEvent(type) {
      return type.includes('Event')
    },
    verifyIsTask(type) {
      return type.includes('Task')
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../node_modules/bpmn-js/dist/assets/diagram-js.css';
@import '../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import '../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import '../../node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
@import "~@/style/bpmn.less";
</style>
