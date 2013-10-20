var fixture = $('#qunit-fixture'),
	$injector = angular.injector(['ng', 'myMod']),
	$compile = $injector.get('$compile'),
	$rootScope = $injector.get('$rootScope');

test("binding: Foo Rect", function(){
	var scope = $rootScope.$new();
	scope.text = "Foo";
	var svg = $compile(
		'<svg width="500" height="200">\
			<rect shape-text="{{ text }}" x="0" y="20" fill="lightblue" />\
		</svg>')(scope);
	fixture.append(svg);
	scope.$digest();
	equal(svg.find('rect').attr('width'), 28);
	equal(svg.find('rect').attr('height'), 23);
});

test("binding: BizBang Circle", function(){
	var scope = $rootScope.$new();
	scope.text = "BizBang";
	var svg = $compile(
		'<svg width="500" height="200">\
			<circle shape-text="{{ text }}" cx="50" cy="50" r="0" fill="lightgreen" />\
		</svg>')(scope);
	fixture.append(svg);
	scope.$digest();
	equal(svg.find('circle').attr('r'), 35.5);
});

test('binding: BeebleBobble (both)', function(){
	var scope = $rootScope.$new();
	scope.text = "BeebleBobble";
	var svg = $compile(
		'<svg width="500" height="200">\
			<rect shape-text="{{ text }}" x="0" y="20" fill="lightblue" />\
			<circle shape-text="{{ text }}" cx="50" cy="50" r="0" fill="lightgreen" />\
		</svg>')(scope);
	fixture.append(svg);
	scope.$digest();
	equal(svg.find('rect').attr('width'), 102);
	equal(svg.find('rect').attr('height'), 23);
	equal(svg.find('circle').attr('r'), 56);
});