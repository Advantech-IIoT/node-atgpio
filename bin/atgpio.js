/**
 * detect whether windows OS is a 64 bits or 32 bits
 * http://ss64.com/nt/syntax-64bit.html
 * http://blogs.msdn.com/b/david.wang/archive/2006/03/26/howto-detect-process-bitness.aspx
 * @return {number}
 */

const bindingPath = './binding/' + process.platform + '-' + process.arch + '/node-atgpio.node';
const binding = require(bindingPath);

let gpioInited = false;
let gpioCount = 0;

function AtGpio() {
    if (!gpioInited) {
        AtGpio.prototype.init();
    }
}

function checkPin(pin) {
    const newpin = Number(pin);
    if (!gpioInited) {
        AtGpio.prototype.init();
    }
    if (newpin < 0 || newpin >= gpioCount) {
        throw new Error('Invalid pin');
    }
    return newpin;
}

function checkValue(val) {
    const newval = Number(val);
    if (!gpioInited) {
        AtGpio.prototype.init();
    }
    if (newval !== AtGpio.prototype.LOW && AtGpio.prototype.HIGH !== newval) {
        throw new Error('Invalid value');
    }
    return newval;
}

function checkMode(val) {
    const newMode = Number(val);
    if (!gpioInited) {
        AtGpio.prototype.init();
    }
    if (newMode !== AtGpio.prototype.INPUT && newMode !== AtGpio.prototype.OUTPUT) {
        throw new Error(`Unsupported mode ${newMode}`);
    }
    return newMode;
}

function cleanup() {
    binding.Close();
    gpioCount = 0;
    gpioInited = false;
}

/*
 * Constants.
 */
AtGpio.prototype.LOW = 0x0;
AtGpio.prototype.HIGH = 0x1;

/*
 * Supported function select modes.
 */
AtGpio.prototype.INPUT = 0x1;
AtGpio.prototype.OUTPUT = 0x0;

AtGpio.prototype.init = () => {
    /*
     * Open the GPIO driver.
     */
    binding.Open();
    gpioCount = binding.GetGPIOCount();
    gpioInited = true;
};

AtGpio.prototype.setup = (pin, mode, initval) => {
    if (!gpioInited) {
        AtGpio.prototype.init();
    }
    const gpiopin = checkPin(pin);
    const gpioMode = checkMode(mode);
    if (initval !== undefined) {
        binding.Setup(gpiopin, gpioMode, checkValue(initval));
    } else {
        binding.Setup(gpiopin, gpioMode);
    }
};

AtGpio.prototype.read = pin => binding.Read(checkPin(pin));

AtGpio.prototype.write = (pin, value) => binding.Write(checkPin(pin), checkValue(value));

AtGpio.prototype.getmode = (pin) => {
    const gpiopin = checkPin(pin);
    return binding.GetGPIODirection(gpiopin);
};

/*
AtGpio.prototype.getmodecap = (pin, mode) => {
const gpiopin = checkPin(pin);
const gpioMode = checkMode(mode);
return binding.GetDirectionCaps(gpiopin, gpioMode);
};
 */

AtGpio.prototype.count = () => {
    if (!gpioInited) {
        AtGpio.prototype.init();
    }
    return gpioCount;
};

process.on('exit', (code) => {
    console.log(`[ATGPIO] About to exit with code: ${code}`);
    cleanup();
});

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
    process.exit(1);
});

module.exports = new AtGpio();
