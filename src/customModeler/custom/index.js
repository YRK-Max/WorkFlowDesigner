import CustomPaletteProvider from './CustomPaletteProvider'
import CustomRenderer from './CustomRenderer'
import CustomContextPadProvider from './CustomContextPadProvider'
import customPalette from './CustomPalette'

export default {
  __depends__: [
    customPalette
  ],
  __init__: ['customPaletteProvider', 'customRenderer', 'contextPadProvider'],
  customPaletteProvider: ['type', CustomPaletteProvider],
  customRenderer: ['type', CustomRenderer],
  contextPadProvider: ['type', CustomContextPadProvider]
}