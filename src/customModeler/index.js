import Modeler from 'bpmn-js/lib/Modeler'

import inherits from 'inherits'

import CustomModule from './custom'

export default function CustomModeler(options) {
  CustomModeler.prototype._modules = [].concat(
    CustomModeler.prototype._modules, [
      CustomModule
    ]
  )
  Modeler.call(this, options)
  this._customElements = []
  return this
}

inherits(CustomModeler, Modeler)

