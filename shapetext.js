/* globals d3, angular */
angular.module('myMod', [])

.directive('shapeText', function () {

  return {
    controller: shapeTextController,
    link: linkFn
  };

  function shapeTextController() {
    this.$render = angular.noop;
  }

  function linkFn(scope, iElement, iAttrs, ctrl) {
    var d3element = d3.select(iElement[0]);

    // Set up text field
    var d3text = setupTextField(iElement);

    var changeFn = function (val) {
      // Update text
      d3text.text(val);

      // Get bounding box
      var bbox = d3text.node().getBBox();

      // Update sizes
      ctrl.$render(d3text, bbox);
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

})

.directive('rect', function () {

  return {
    restrict: 'E',
    require: '?shapeText',
    link: linkFn
  };

  function linkFn(scope, iElement, iAttrs, shapeTextCtrl) {
    if (!shapeTextCtrl) return;

    // Get position of element
    var x = +iAttrs.x, y = +iAttrs.y;

    shapeTextCtrl.$render = function (d3text, bbox) {
      d3text
        .attr('x', x)
        .attr('y', y + bbox.height);
      iElement
        .attr('width', bbox.width)
        .attr('height', bbox.height + 5);
    };
  }

})

.directive('circle', function () {

  return {
    restrict: 'E',
    require: '?shapeText',
    link: linkFn
  };

  function linkFn(scope, iElement, iAttrs, shapeTextCtrl) {

    if (!shapeTextCtrl) return;

    // Get position of element
    var x = +iAttrs.cx, y = +iAttrs.cy;

    shapeTextCtrl.$render = function (d3text, bbox) {
      d3text
        .attr('x', x - bbox.width / 2)
        .attr('y', y + 5);
      iElement
        .attr('r', bbox.width / 2 + 5);
    };
  }

});
