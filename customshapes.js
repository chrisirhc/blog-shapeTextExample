/* globals d3, angular */
angular.module('myCustomShapes', ['myMod'])

.directive('myTriangle', function () {
  var line = d3.svg.line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; });

  return {
      restrict: 'E',
      require: '?shapeText',
      compile: compileFn
  };

  function compileFn(tElement, tAttrs, transclude) {

    // Replace this template with the actual shape
    setupShape(tElement, tAttrs);

    return linkFn;
  }

  function linkFn(scope, iElement, iAttrs, shapeTextCtrl) {

    if (!shapeTextCtrl) return;

    // Get position of element
    var x = +iAttrs.x, y = +iAttrs.y;

    shapeTextCtrl.$render = function (d3text, bbox) {
      d3text
        .attr('x', x)
        .attr('y', y+bbox.height)
        .attr('transform', 'rotate(45,' + x + ',' + y + ')');
      iElement
        .attr('d', line(points(x, y, bbox.width / 2)));
    };
  }

  function setupShape(tElement, tAttrs) {
    var parent = d3.select(tElement[0].parentNode);
    var path = parent.append('path')
        .attr('d', line(points(+tAttrs.x, +tAttrs.y, 10)))
        .attr('transform', 'rotate(45,' + tAttrs.x + ',' + tAttrs.y + ')');

    // Replace old template element
    tElement.replaceWith(path[0]);

    // Copy attributes into new element
    angular.forEach(tAttrs.$attr, function (attr, normAttr) {
      path.attr(attr, tAttrs[normAttr]);
    });
  }

  function points(x, y, width) {
      return [
        {x: x, y: y},
        {x: x + width*2, y: y},
        {x: x + width*1, y: y + width*2},
      ];
  }
});