/* globals d3, angular */
angular.module('myMod', [])

.directive('rect', function () {

  return {
    restrict: 'E',
    link: linkFn
  };

  function linkFn(scope, iElement, iAttrs) {
    var d3element = d3.select(iElement[0]);

    // Set up text field
    var d3text = setupTextField(iElement);

    var updateSizeFn = rectUpdateSizeFn(d3element, d3text);

    var changeFn = function (val) {
      // Update text
      d3text.text(val);

      // Get bounding box
      var bbox = d3text.node().getBBox();

      // Update sizes
      updateSizeFn(bbox);
    };

    iAttrs.$observe('shapeText', changeFn);
  }

  function setupTextField(iElement) {

    var d3parent = d3.select(iElement[0].parentNode),
        bbox = iElement[0].getBBox(),

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

})

.directive('circle', function () {

  return {
    restrict: 'E',
    link: linkFn
  };

  function linkFn(scope, iElement, iAttrs) {
    var d3element = d3.select(iElement[0]);

    // Set up text field
    var d3text = setupTextField(iElement);

    var updateSizeFn = circleUpdateSizeFn(d3element, d3text);

    var changeFn = function (val) {
      // Update text
      d3text.text(val);

      // Get bounding box
      var bbox = d3text.node().getBBox();

      // Update sizes
      updateSizeFn(bbox);
    };

    iAttrs.$observe('shapeText', changeFn);
  }

  function setupTextField($element) {

    var d3element = d3.select($element[0].parentNode),
        bbox = $element[0].getBBox(),

        d3text = d3element.append('text')
        .attr('font-size', 16)
        .attr('font-family', 'Arial')
        .attr('x', bbox.x)
        .attr('y', bbox.y);

    return d3text;
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

});
