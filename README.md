# node-atgpio
Node.js Integration for Advantech IIoT GPIO function.

Notice that an Advantech IIoT Platform SDK have to be installed to make this node works correctly.
Advantech IIoT Platform SDK download link is shown below:
Windows:
  https://github.com/Advantech-IIoT/Platform-SDK/tree/master/windows/bin
Linux:
  https://github.com/Advantech-IIoT/Platform-SDK/tree/master/linux/bin

## Installation
``` bash
$ npm install node-atgpio
```
## Usage
GPIO provide following functions in this module.
  - Get GPIO Count (the number of GPIO pins in the device.)
  - Read/Write GPIO Value. HIGH(1), LOW(0)
  - Read/Write GPIO Pin Tye INPUT(1), OUTPUT(0)

## Example
Please refer to [`demo.js`](./demo.js).

## Quickstart
All these examples use the virtual numbering (0~n) and assume that the
example is started with:

```js
var gpio = require('node-atgpio');
```

### Get GPIO count
Get the number of GPIO pins in the device.

```js
var count = gpio.count();
console.log('There are ' + count + 'GPIO(s)');
```


### Read a pin
Setup pin 0 for read-only input and print its current value:

```js
gpio.setup(0, gpio.INPUT);
console.log('Pin 0 is currently set ' + (gpio.read(0) ? 'high' : 'low'));
```

### Write a pin
Setup pin 4 for output and set its value to 0 (low):

```js
gpio.setup(4, gpio.OUTPUT, gpio.LOW);
```

or

```js
gpio.setup(4, gpio.OUTPUT);
gpio.write(4, gpio.LOW);
```

### Get a pin type
Check the pin 0 is an input or output.

```js
console.log('Pin 0 is an' + (gpio.getmode(0) ? 'Input' : 'Output'));
```

## Tested Platform
- Windows 10 Enterprise LTSB with node.js 6.10.1

## History
- 0.2.2 - October 2017 : Initial Release

## License
Copyright 2017 ADVANTECH Corp. under [the Apache 2.0 license](LICENSE).
