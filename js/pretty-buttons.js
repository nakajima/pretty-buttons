(function($) {
  var PREFIX = '.is-button';

  function setCSSRules(selector, rules, suffix) {
    var ruleCSS = '';
    for (prop in rules) {
      var propName = prop.replace( /([A-Z])/g, "-$1" ).toLowerCase();
      ruleCSS += propName + ':' + rules[prop] + ';';
    };

    var css = [PREFIX, selector, suffix, '{', ruleCSS, '}'].join('');

    document.styleSheets[0].insertRule(css,
      document.styleSheets[0].cssRules.length);
  }

  function nextGradientColor(i) {
    return i - 11;
  }

  function toButton(opts) {
    if (this.hasClass('is-button')) { return this; }

    var elem = $(this);

    elem.addClass('is-button');
    elem.wrapInner('<span></span>').prepend('<b class="gradient"></b>')

    opts = opts || {};

    if (!opts.sharp) {
      elem.prepend(
        '<i class="top right"></i>' +
        '<i class="top left"></i>' +
        '<i class="bottom right"></i>' +
        '<i class="bottom left"></i>'
      );
    }

    if (rule = opts.background) {
      var light     = getRGB(rule);
      var gradient  = $.map(light, nextGradientColor);
      var dark      = $.map(gradient, nextGradientColor);

      setCSSRules(this.selector, {
        background: 'rgb(' + dark.join(', ') + ')'
      });

      setCSSRules(this.selector + ' .gradient', {
        background: 'rgb(' + light.join(', ') + ')',
        'border-color': 'rgb(' + gradient.join(', ') + ')',
      });

      setCSSRules(this.selector + ':active', {
        background: 'rgb(' + light.join(', ') + ')',
      });

      setCSSRules(this.selector + ':active .gradient', {
        background: 'rgb(' + dark.join(', ') + ')',
        'border-color': 'rgb(' + gradient.join(', ') + ')'
      });

      delete(opts.background);
    }

    setCSSRules(PREFIX + this.selector, opts);
  }

  // Parse strings looking for color tuples [255,255,255]
  // Taken from jQuery Color Animations plugin by John Resig
  function getRGB(color) {
      var result;

      // Check if we're already dealing with an array of colors
      if ( color && color.constructor == Array && color.length == 3 )
          return color;

      // Look for rgb(num,num,num)
      if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
          return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

      // Look for rgb(num%,num%,num%)
      if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
          return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

      // Look for #a0b1c2
      if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
          return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

      // Look for #fff
      if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
          return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

      // Look for rgba(0, 0, 0, 0) == transparent in Safari 3
      if (result = /rgba\(0, 0, 0, 0\)/.exec(color))
          return colors['transparent']

      // Otherwise, we're most likely dealing with a named color
      return colors[jQuery.trim(color).toLowerCase()];
  }

  $.getRGB = getRGB;
  $.fn.toButton = toButton;
})(jQuery);
