var gpio = require('node-atgpio');
var count = gpio.count();

// Get the number of GPIO pins in the device.
console.log('There are ' + count + ' GPIO(s)');

// Setup pin 0 for read-only input and print its current value:
gpio.setup(0, gpio.INPUT);
console.log('Pin 0 is currently set ' + (gpio.read(0) ? 'high' : 'low'));

// Setup pin 4 for output and set its value to 0 (low):
gpio.setup(4, gpio.OUTPUT, gpio.LOW);

// or
gpio.setup(4, gpio.OUTPUT);
gpio.write(4, gpio.LOW);

// Check the pin 0 is an input or output.
console.log('Pin 0 is an ' + (gpio.getmode(0) ? 'Input' : 'Output'));

