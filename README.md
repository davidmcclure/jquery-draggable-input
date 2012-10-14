
jQuery Draggable Input
======================

`draggable-input` is a jQuery plugin that handles mouse events on text inputs to increase and decrease their integer / float values. Clicking and dragging up results in increasing the number, dragging down decreases the number.

```js
	$('input.integer').draggableInput({
		type: 'float',         // Value type (integer or float)
        min: -1.0,             // Minimum value
        max: 1.0,              // Maximum value
        scrollPrecision: 0.01, // How much to add / remove per pixel
        precision: 2           // Decimal precision
	});
```

## License

Copyright © 2012 Sascha Gehlich, licensed under the [MIT License](https://github.com/saschagehlich/jquery-draggable-input/master/LICENSE.txt).
