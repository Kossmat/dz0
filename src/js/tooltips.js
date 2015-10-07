// Создаёт тултипы
var createQtip = function (el, position, text) {

	console.log(el);
	console.log(position);
	console.log(text);

	// позиция
	if(position === 'right'){
		position = {
			my: 'left center', 
			at: 'right center'
		};
	}else{
		position = {
			my: 'right center', 
			at: 'left center'
		};
	}

	// создание тултипа
	el.qtip({
		content: {
			text: function () {
				return text;
			}
		},
		show: {
			event: 'show'
		},
		hide: {
			event: 'keydown hideTooltip'
		},
		position : position,
		style: {
			classes: 'qtip-rounded myclass'
		}
	}).trigger('show');
};

// Показывает тултипы по айдишнику
var showQtip = function (id) {
	var el = $('#' + id),
			pos = el.attr('qtip-position'),
			text = el.attr('qtip-content');

	createQtip(el, pos, text);
};

