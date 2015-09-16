/**
 * @provide pskl.tools.drawing.DitheringTool
 *
 * @require pskl.utils
 */
(function() {
  var ns = $.namespace('pskl.tools.drawing');

  ns.DitheringTool = function() {
    ns.SimplePen.call(this);
    this.toolId = 'tool-dithering';
    this.helpText = 'Dithering tool';
  };
  pskl.utils.inherit(ns.DitheringTool, ns.SimplePen);

  /**
   * @override
   */
  ns.DitheringTool.prototype.applyToolAt = function(col, row, color, frame, overlay, event) {
    // On Firefox/IE, the clicked button type is not part of the mousemove event.
    // Ensure we record the pressed button on the initial mousedown only.
    if (event.type == 'mousedown') {
      this.invertColors_ = event.button === Constants.RIGHT_BUTTON;
    }

    // Use primary selected color on cell with either an odd col or row.
    // Use secondary color otherwise.
    // When using the right mouse button, invert the above behavior to allow quick corrections.
    var usePrimaryColor = (col + row) % 2;
    usePrimaryColor = this.invertColors_ ? !usePrimaryColor : usePrimaryColor;

    var ditheringColor = usePrimaryColor ?
        pskl.app.selectedColorsService.getPrimaryColor() :
        pskl.app.selectedColorsService.getSecondaryColor();
    this.superclass.applyToolAt.call(this, col, row, ditheringColor, frame, overlay, event);
  };
})();
