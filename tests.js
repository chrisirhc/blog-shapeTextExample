test("binding basics", function(){
	$('.text-from-model').shapeText();
	var input = $('#myText'), rect = $('svg > rect');
	input.val('Foo').change();
	equal($('svg > text').text(), 'Foo');
	equal(rect.attr('width'), 28);
	equal(rect.attr('height'), 23);
	input.val('BizBang').change();
	equal($('svg > text').text(), 'BizBang');
	equal(rect.attr('width'), 61);
	equal(rect.attr('height'), 23);
});
