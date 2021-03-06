/*
  jquery-draggable-input
  https://github.com/saschagehlich/jquery-draggable-input

  Copyright (c) 2012 Sascha Gehlich <contact@filshmedia.net>
  MIT Licensed
*/

$(function() {

  $.fn.extend({

    draggableInput: function(_options) {

      var defaults = {
        type: 'integer',
        min: 0,
        max: -1,
        scrollPrecision: 0.2,
        precision: 2
      };

      // Merge defaults with input options
      var options = $.extend(defaults, _options);

      // Get started
      return this.each(function() {

        if (this.nodeName.toLowerCase() != 'input') {
          throw new Error('The node is not an <input> tag.');
        }

        var $el = $(this);

        var parse;
        if (options.type === 'integer') parse = parseInt;
        if (options.type === 'float') parse = parseFloat;

        // Parse options correctly
        var value = parse($el.val());
        var precision = parseInt(options.precision);
        var max = parse(options.max);
        var min = parse(options.min);

        var checkBoundaries = function(newValue){
          return parse( Math.min( max, Math.max( min, newValue ) ) );
        };

        var checkPrecision = function(newValue){
          if (options.type === 'float')
            newValue = newValue.toFixed(options.precision);
          return newValue;
        };

        $(this).mousedown(function(e) {

          var initialPos = { x: e.pageX, y: e.pageY };

          var onMouseMove = function(e) {

            var deltaY = e.pageY - initialPos.y;
            var newValue = value - deltaY * options.scrollPrecision;

            // Boundaries
            newValue = checkBoundaries(newValue);

            // Decimal precision
            newValue = checkPrecision(newValue);
            $el.val(newValue).trigger('change');

          };

          $(document).mousemove(onMouseMove);
          $(document).one('mouseup', function(e) {
            $(document).off('mousemove', onMouseMove);
            value = parse($el.val());
          });

        });

        $(this).blur(function(e){

          var currentValue = $(this).val();
          var newValue = checkBoundaries(currentValue);
          newValue = checkPrecision(newValue);

          if (currentValue != newValue){
            $(this).val(newValue).trigger('change');
          }

        });

      });
    }

  });

});
