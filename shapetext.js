/* globals $, d3 */

$.fn.shapeText = function () {

  return this.each(function () {
    var $element = $(this),
        d3element = d3.select($element[0]),
        modelSelector = $element.data('model'),
        $model = $(modelSelector);

    // Set up text field
    var d3text = setupTextField($element);

    // Get position of element
    var x = +$element.attr('x'), y = +$element.attr('y');

    var changeFn = function () {
      // Update text
      d3text.text($model.val());

      // Get bounding box
      var bbox = d3text.node().getBBox();

      // Update sizes
      d3text
        .attr('x', x)
        .attr('y', y + bbox.height);
      d3element
        .attr('width', bbox.width)
        .attr('height', bbox.height + 5);
    };

    $model.on('input change', changeFn);
  });

  function setupTextField($element) {

    var d3parent = d3.select($element[0].parentNode),
        bbox = $element[0].getBBox(),

        d3text = d3parent.append('text')
        .attr('font-size', 16)
        .attr('font-family', 'Arial')
        .attr('x', bbox.x)
        .attr('y', bbox.y);

    return d3text;
  }

};
