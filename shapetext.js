/* globals $, d3 */

$.fn.shapeText = function () {

  return this.each(function () {
    var $element = $(this),
        d3element = d3.select($element[0]),
        modelSelector = $element.data('model'),
        $model = $(modelSelector);

    // Set up text field
    var d3text = setupTextField($element);

    // Set up update functions depending on type of element
    var updateSizeFn;
    if ($element.is('rect')) {
      updateSizeFn = rectUpdateSizeFn(d3element, d3text);
    } else if ($element.is('circle')) {
      updateSizeFn = circleUpdateSizeFn(d3element, d3text);
    } else {
      throw new Error('shapeText called on unsupported element');
    }

    var changeFn = function () {
      // Update text
      d3text.text($model.val());

      // Get bounding box
      var bbox = d3text.node().getBBox();

      // Update sizes
      updateSizeFn(bbox);
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

  function rectUpdateSizeFn(d3element, d3text) {

    // Get position of element
    var x = +d3element.attr('x'), y = +d3element.attr('y');

    function updateSizeFn(bbox) {
      d3text
        .attr('x', x)
        .attr('y', y + bbox.height);
      d3element
        .attr('width', bbox.width)
        .attr('height', bbox.height + 5);
    }

    return updateSizeFn;
  }

  function circleUpdateSizeFn(d3element, d3text) {

    // Get position of element
    var x = +d3element.attr('cx'), y = +d3element.attr('cy');

    function updateSizeFn(bbox) {
      d3text
        .attr('x', x - bbox.width / 2)
        .attr('y', y + 5);
      d3element
        .attr('r', bbox.width / 2 + 5);
    }

    return updateSizeFn;
  }

};
