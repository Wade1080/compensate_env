window = this;
Object.create(window, {
    [Symbol.toStringTag]: {
        value: "Window",
        writable: false,
        enumerable: false,
        configurable: false
    }
}
)
window.document = {};
window.location = {};
window.navigator = {};

function watch(func, name) {
    return new Proxy(func, {
        get(target, p, receiver) {
            if (p === 'Math' || p === 'isNaN' || p === 'encodeURI' || p === 'Uint8Array' || p === 'zzz' || p === 'innerHTML') {
                let val = Reflect.get(...arguments)
                return val
            } else {
                let val = Reflect.get(...arguments)
                if (name === 'document.all' || p === 'all')
                    // if(p==='_proto_')
                    debugger

                // 修复：处理 Symbol 类型的属性名
                const propName = typeof p === 'symbol' ? p.toString() : p;
                dconsole.log('取值:', `${name}.${propName}`, '=>', val);
                return val
            }
        },
        set(target, p, value, receiver) {
            let val = Reflect.get(...arguments)
            // 修复：处理 Symbol 类型的属性名
            const propName = typeof p === 'symbol' ? p.toString() : p;
            dconsole.log('设置值:', `${name}.${propName}`, val, '=>', value);
            return Reflect.set(...arguments)
        }
    })
}


// 至尊宝解决toString
(() => {
    "use strict";
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)));
    const myToString = function() {
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    };

    function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            "enumberable": false,
            "configurable": true,
            "writable": true,
            "value": value
        })
    };
    delete Function.prototype['toString'];
    set_native(Function.prototype, 'toString', myToString);
    set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }");
    this.func_set_native = (func)=>{
        set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol,func.name || ''}() { [native code] }`);
    };
}).call(this);

const dconsole = {
    _enabled: true, // 控制开关，改为false或注释此行就能禁用所有dconsole日志

    log(...args) {
        if (this._enabled) {
            console.log(...args);
        }
    }
};
window = watch(window, "window");
navigator = watch(navigator, "navigator");
location = watch(location, "location");
document = watch(document, "document");























