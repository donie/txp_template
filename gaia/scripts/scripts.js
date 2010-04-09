var Gaia = {};

//utility functions
Gaia.Util = {
	//addEvent by John Resig, slightly modified
	addEvent: function(el, type, fn) {
		if (el.addEventListener) el.addEventListener(type, fn, false);
		else if (el.attachEvent) {
			el['e' + type + fn] = fn;
			el[type + fn] = function() { el['e' + type + fn](window.event); };
			el.attachEvent('on' + type, el[type + fn]);
		}
	}
};

//a module for unobtrusive shadow decorations
Gaia.Shadows = function() {
	
	function createShadow(id, wrapper) {
		var div = document.createElement('div');
		div.className = 'shadow';
		div.id = id;		

		var D = Gaia.IEDecorator;	
		if (D.ready) //if IE6
			D.setPNGFilter(div, D.pathToImage(id + '.png'));

		wrapper.appendChild(div);
	}
	
	return {
		init: function() {
			Gaia.Util.addEvent(window, 'load', function() {
				var wrapper = document.getElementById('wrapper');
				createShadow('shadow-tl', wrapper);
				createShadow('shadow-tr', wrapper);
				createShadow('shadow-bl', wrapper);
				createShadow('shadow-br', wrapper);
			});
		}
	}
}();

//semitransparent overlay for IE6
Gaia.Overlay = {
	init: function() {
		Gaia.Util.addEvent(window, 'load', function() {
			var D = Gaia.IEDecorator;
			if(!D.ready) return; //if not IE6, do nothing
			var overlay = D.pathToImage(D.theme + '/overlay.png');
			D.setPNGFilter(document.getElementById('container'), overlay, 'scale');
		});
	}
}

//handles PNG IE6 quirks in Gaia
Gaia.IEDecorator = {
	init: function(rootUrl, theme) {
		this.ready = true;
		this.rootUrl = rootUrl;
		this.theme = theme;
	},

	pathToImage: function(image) {
		return this.rootUrl + 'gaia/images/' + image;
	},
	
	setPNGFilter: function(element, image, sizing) {
		sizing = sizing || 'crop';
		element.style.background = 'none';
		element.style.filter = 
			'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + 
			image + '", sizingMethod="' + sizing + '")';
	}
};

Gaia.Shadows.init();
Gaia.Overlay.init();