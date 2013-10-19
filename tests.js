test("binding basics", function(){
	$('.text-from-model').shapeText();
	var input = $('#myText'),
		rect = $('svg > rect'),
		circle = $('svg > circle');

	equal(circle.attr('r'), 0);

	input.val('Foo').change();
	equal($('text:nth-of-type(1)').text(), 'Foo');
	equal(rect.attr('width'), 28);
	equal(rect.attr('height'), 23);
	equal(circle.attr('r'), 19);

	input.val('BizBang').change();
	equal($('text:nth-of-type(2)').text(), 'BizBang');
	equal(rect.attr('width'), 61);
	equal(rect.attr('height'), 23);
	equal(circle.attr('r'), 35.5);
});

test('exceptional svg', function(){
	try {
		$('<svg><ellipse /></svg>').find('ellipse').shapeText();
		equal(false, true, 'Should have thrown exception');
	}
	catch (e) {
		equal(e.message, 'shapeText called on unsupported element');
	}
});
