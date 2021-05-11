/* eslint-disable no-unused-vars */
import inherits from 'inherits'
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'
import { append as svgAppend, create as svgCreate } from 'tiny-svg'
import { customConfig, notCustomElements, hasNoLabelElements } from '@/utils/util'
import { some, find } from 'min-dash'
import { is } from 'bpmn-js/lib/util/ModelUtil'

/**
 * A renderer that knows how to render custom elements.
 */
export default function CustomRenderer(
  config, eventBus, styles, pathMap,
  canvas, textRenderer, paletteEntries) {
  BaseRenderer.call(this, eventBus, 2000)

  this._paletteEntries = paletteEntries
  this._textRenderer = textRenderer

  this.drawCustomElements = function(parentNode, element) {
    const type = element.type // 获取到类型
    if (type !== 'label') {
      if (!notCustomElements.includes(type)) { // or customConfig[type]
        const { url, attr } = customConfig[type]
        const customIcon = svgCreate('image', {
          ...attr,
          href: url
        })
        element['width'] = attr.width // 这里我是取了巧, 直接修改了元素的宽高
        element['height'] = attr.height
        svgAppend(parentNode, customIcon)
        //判断是否有name属性来决定是否要渲染出label
        if (!hasNoLabelElements.includes(type) && element.businessObject.name) {
            const text = svgCreate('text', {
                x: attr.x,
                y: attr.y + attr.height + 20,
                "font-size": "14",
                "fill": "#000"
            })
            text.innerHTML = element.businessObject.name
            svgAppend(parentNode, text)
        }
        return customIcon
      }
      return this.bpmnRenderer.drawShape(parentNode, element)
    } else {
      return element
    }
  }
}

inherits(CustomRenderer, BaseRenderer)

CustomRenderer.$inject = [
  'config.bpmnRenderer',
  'eventBus',
  'styles',
  'pathMap',
  'canvas',
  'textRenderer',
  'config.paletteEntries'
]

CustomRenderer.prototype.canRender = function(element) {
  // only render tasks and events (ignore labels)
  const paletteEntries = this._paletteEntries

  return some(paletteEntries, (entry) => {
    return is(element, entry.type)
  }) && !element.labelTarget
}

CustomRenderer.prototype.drawShape = function(p, element) {
  // console.log(element)
  // console.log(element.type)
  if (!notCustomElements.includes(element.type)) {
    return this.drawCustomElements(p, element)
  }
}

CustomRenderer.prototype.getShapePath = function(shape) {
  // console.log(shape)
}
