export default function CustomPaletteProvider (
  paletteEntries,
  customPalette,
  spaceTool
) {
  this._entries = paletteEntries
  console.log('spaceTool', spaceTool)
  customPalette.registerProvider(this)
}

CustomPaletteProvider.$inject = [
  'config.paletteEntries',
  'customPalette',
  'spaceTool'
]

CustomPaletteProvider.prototype.getPaletteEntries = function (element) {
  console.log(element);
  return this._entries
}
