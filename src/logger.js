// Simple logging utility.
// Exports a singleton. See "Module instance" in https://medium.com/@dmnsgn/singleton-pattern-in-es6-d2d021d150ae.
// Optionally logs context info, controlled by _config.

class Logger {
    constructor() {
        this._config = {
            active: true,
            // Log?
            componentName: false,
            // Include component name in context. Not necessary if callerName is true.
            callerName: true,
            // Include component method name in context. Includes component name.
        };
    }

    configure(options) {
        return Object.assign(this._config, options);
    }
}

const nameFromStackLine = /^\s*at (\S+) .*$/;

// Add the fancy logging methods to Logger.prototype
[
    'assert',
    'error',
    'info',
    'log',
    'warn'
].forEach(level => {
    function method(instance, ...args) {
        if (this._config.active) {
            let context = [];
            if (this._config.componentName) {
                context.push(instance.constructor.name);
            }
            if (this._config.callerName) {
                // This cleverness courtesy of https://stackoverflow.com/a/38435618/1858846
                const stackLines = new Error().stack.split('\n');
                const match = stackLines[2].match(nameFromStackLine);
                const methodName = match && match[1];
                context.push(methodName);
            }
            console[level](`[${context.join('; ')}]`, ...args);
        }
    }

    Logger.prototype[level] = method;
});

// Proxy other console methods through Logger
[
    'count',
    'group',
    'groupCollapsed',
    'groupEnd',
    'table',
    'time',
    'timeEnd',
    'trace',
].forEach(name => {
    function method(...args) {
        if (this._config.active) {
            console[name](...args);
        }
    }
    Logger.prototype[name] = method;
});

export default new Logger();