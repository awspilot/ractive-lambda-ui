(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ractive"));
	else if(typeof define === 'function' && define.amd)
		define("ractive-lambda-ui", ["ractive"], factory);
	else if(typeof exports === 'object')
		exports["ractive-lambda-ui"] = factory(require("ractive"));
	else
		root["ractive-lambda-ui"] = factory(root["Ractive"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var support = __webpack_require__(2);
var base64 = __webpack_require__(13);
var nodejsUtils = __webpack_require__(6);
var setImmediate = __webpack_require__(36);
var external = __webpack_require__(5);


/**
 * Convert a string that pass as a "binary string": it should represent a byte
 * array but may have > 255 char codes. Be sure to take only the first byte
 * and returns the byte array.
 * @param {String} str the string to transform.
 * @return {Array|Uint8Array} the string in a binary format.
 */
function string2binary(str) {
    var result = null;
    if (support.uint8array) {
      result = new Uint8Array(str.length);
    } else {
      result = new Array(str.length);
    }
    return stringToArrayLike(str, result);
}

/**
 * Create a new blob with the given content and the given type.
 * @param {String|ArrayBuffer} part the content to put in the blob. DO NOT use
 * an Uint8Array because the stock browser of android 4 won't accept it (it
 * will be silently converted to a string, "[object Uint8Array]").
 *
 * Use only ONE part to build the blob to avoid a memory leak in IE11 / Edge:
 * when a large amount of Array is used to create the Blob, the amount of
 * memory consumed is nearly 100 times the original data amount.
 *
 * @param {String} type the mime type of the blob.
 * @return {Blob} the created blob.
 */
exports.newBlob = function(part, type) {
    exports.checkSupport("blob");

    try {
        // Blob constructor
        return new Blob([part], {
            type: type
        });
    }
    catch (e) {

        try {
            // deprecated, browser only, old way
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(part);
            return builder.getBlob(type);
        }
        catch (e) {

            // well, fuck ?!
            throw new Error("Bug : can't construct the Blob.");
        }
    }


};
/**
 * The identity function.
 * @param {Object} input the input.
 * @return {Object} the same input.
 */
function identity(input) {
    return input;
}

/**
 * Fill in an array with a string.
 * @param {String} str the string to use.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
 */
function stringToArrayLike(str, array) {
    for (var i = 0; i < str.length; ++i) {
        array[i] = str.charCodeAt(i) & 0xFF;
    }
    return array;
}

/**
 * An helper for the function arrayLikeToString.
 * This contains static informations and functions that
 * can be optimized by the browser JIT compiler.
 */
var arrayToStringHelper = {
    /**
     * Transform an array of int into a string, chunk by chunk.
     * See the performances notes on arrayLikeToString.
     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
     * @param {String} type the type of the array.
     * @param {Integer} chunk the chunk size.
     * @return {String} the resulting string.
     * @throws Error if the chunk is too big for the stack.
     */
    stringifyByChunk: function(array, type, chunk) {
        var result = [], k = 0, len = array.length;
        // shortcut
        if (len <= chunk) {
            return String.fromCharCode.apply(null, array);
        }
        while (k < len) {
            if (type === "array" || type === "nodebuffer") {
                result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
            }
            else {
                result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
            }
            k += chunk;
        }
        return result.join("");
    },
    /**
     * Call String.fromCharCode on every item in the array.
     * This is the naive implementation, which generate A LOT of intermediate string.
     * This should be used when everything else fail.
     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
     * @return {String} the result.
     */
    stringifyByChar: function(array){
        var resultStr = "";
        for(var i = 0; i < array.length; i++) {
            resultStr += String.fromCharCode(array[i]);
        }
        return resultStr;
    },
    applyCanBeUsed : {
        /**
         * true if the browser accepts to use String.fromCharCode on Uint8Array
         */
        uint8array : (function () {
            try {
                return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
            } catch (e) {
                return false;
            }
        })(),
        /**
         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
         */
        nodebuffer : (function () {
            try {
                return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
            } catch (e) {
                return false;
            }
        })()
    }
};

/**
 * Transform an array-like object to a string.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
 * @return {String} the result.
 */
function arrayLikeToString(array) {
    // Performances notes :
    // --------------------
    // String.fromCharCode.apply(null, array) is the fastest, see
    // see http://jsperf.com/converting-a-uint8array-to-a-string/2
    // but the stack is limited (and we can get huge arrays !).
    //
    // result += String.fromCharCode(array[i]); generate too many strings !
    //
    // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
    // TODO : we now have workers that split the work. Do we still need that ?
    var chunk = 65536,
        type = exports.getTypeOf(array),
        canUseApply = true;
    if (type === "uint8array") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
    } else if (type === "nodebuffer") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
    }

    if (canUseApply) {
        while (chunk > 1) {
            try {
                return arrayToStringHelper.stringifyByChunk(array, type, chunk);
            } catch (e) {
                chunk = Math.floor(chunk / 2);
            }
        }
    }

    // no apply or chunk error : slow and painful algorithm
    // default browser on android 4.*
    return arrayToStringHelper.stringifyByChar(array);
}

exports.applyFromCharCode = arrayLikeToString;


/**
 * Copy the data from an array-like to an other array-like.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
 */
function arrayLikeToArrayLike(arrayFrom, arrayTo) {
    for (var i = 0; i < arrayFrom.length; i++) {
        arrayTo[i] = arrayFrom[i];
    }
    return arrayTo;
}

// a matrix containing functions to transform everything into everything.
var transform = {};

// string to ?
transform["string"] = {
    "string": identity,
    "array": function(input) {
        return stringToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["string"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return stringToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": function(input) {
        return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
    }
};

// array to ?
transform["array"] = {
    "string": arrayLikeToString,
    "array": identity,
    "arraybuffer": function(input) {
        return (new Uint8Array(input)).buffer;
    },
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
    }
};

// arraybuffer to ?
transform["arraybuffer"] = {
    "string": function(input) {
        return arrayLikeToString(new Uint8Array(input));
    },
    "array": function(input) {
        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
    },
    "arraybuffer": identity,
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(new Uint8Array(input));
    }
};

// uint8array to ?
transform["uint8array"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return input.buffer;
    },
    "uint8array": identity,
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
    }
};

// nodebuffer to ?
transform["nodebuffer"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["nodebuffer"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": identity
};

/**
 * Transform an input into any type.
 * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
 * If no output type is specified, the unmodified input will be returned.
 * @param {String} outputType the output type.
 * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
 * @throws {Error} an Error if the browser doesn't support the requested output type.
 */
exports.transformTo = function(outputType, input) {
    if (!input) {
        // undefined, null, etc
        // an empty string won't harm.
        input = "";
    }
    if (!outputType) {
        return input;
    }
    exports.checkSupport(outputType);
    var inputType = exports.getTypeOf(input);
    var result = transform[inputType][outputType](input);
    return result;
};

/**
 * Return the type of the input.
 * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
 * @param {Object} input the input to identify.
 * @return {String} the (lowercase) type of the input.
 */
exports.getTypeOf = function(input) {
    if (typeof input === "string") {
        return "string";
    }
    if (Object.prototype.toString.call(input) === "[object Array]") {
        return "array";
    }
    if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
        return "nodebuffer";
    }
    if (support.uint8array && input instanceof Uint8Array) {
        return "uint8array";
    }
    if (support.arraybuffer && input instanceof ArrayBuffer) {
        return "arraybuffer";
    }
};

/**
 * Throw an exception if the type is not supported.
 * @param {String} type the type to check.
 * @throws {Error} an Error if the browser doesn't support the requested type.
 */
exports.checkSupport = function(type) {
    var supported = support[type.toLowerCase()];
    if (!supported) {
        throw new Error(type + " is not supported by this platform");
    }
};

exports.MAX_VALUE_16BITS = 65535;
exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

/**
 * Prettify a string read as binary.
 * @param {string} str the string to prettify.
 * @return {string} a pretty string.
 */
exports.pretty = function(str) {
    var res = '',
        code, i;
    for (i = 0; i < (str || "").length; i++) {
        code = str.charCodeAt(i);
        res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
    }
    return res;
};

/**
 * Defer the call of a function.
 * @param {Function} callback the function to call asynchronously.
 * @param {Array} args the arguments to give to the callback.
 */
exports.delay = function(callback, args, self) {
    setImmediate(function () {
        callback.apply(self || null, args || []);
    });
};

/**
 * Extends a prototype with an other, without calling a constructor with
 * side effects. Inspired by nodejs' `utils.inherits`
 * @param {Function} ctor the constructor to augment
 * @param {Function} superCtor the parent constructor to use
 */
exports.inherits = function (ctor, superCtor) {
    var Obj = function() {};
    Obj.prototype = superCtor.prototype;
    ctor.prototype = new Obj();
};

/**
 * Merge the objects passed as parameters into a new one.
 * @private
 * @param {...Object} var_args All objects to merge.
 * @return {Object} a new object with the data of the others.
 */
exports.extend = function() {
    var result = {}, i, attr;
    for (i = 0; i < arguments.length; i++) { // arguments is not enumerable in some browsers
        for (attr in arguments[i]) {
            if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
                result[attr] = arguments[i][attr];
            }
        }
    }
    return result;
};

/**
 * Transform arbitrary content into a Promise.
 * @param {String} name a name for the content being processed.
 * @param {Object} inputData the content to process.
 * @param {Boolean} isBinary true if the content is not an unicode string
 * @param {Boolean} isOptimizedBinaryString true if the string content only has one byte per character.
 * @param {Boolean} isBase64 true if the string content is encoded with base64.
 * @return {Promise} a promise in a format usable by JSZip.
 */
exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {

    // if inputData is already a promise, this flatten it.
    var promise = external.Promise.resolve(inputData).then(function(data) {
        
        
        var isBlob = support.blob && (data instanceof Blob || ['[object File]', '[object Blob]'].indexOf(Object.prototype.toString.call(data)) !== -1);

        if (isBlob && typeof FileReader !== "undefined") {
            return new external.Promise(function (resolve, reject) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    resolve(e.target.result);
                };
                reader.onerror = function(e) {
                    reject(e.target.error);
                };
                reader.readAsArrayBuffer(data);
            });
        } else {
            return data;
        }
    });

    return promise.then(function(data) {
        var dataType = exports.getTypeOf(data);

        if (!dataType) {
            return external.Promise.reject(
                new Error("Can't read the data of '" + name + "'. Is it " +
                          "in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
            );
        }
        // special case : it's way easier to work with Uint8Array than with ArrayBuffer
        if (dataType === "arraybuffer") {
            data = exports.transformTo("uint8array", data);
        } else if (dataType === "string") {
            if (isBase64) {
                data = base64.decode(data);
            }
            else if (isBinary) {
                // optimizedBinaryString === true means that the file has already been filtered with a 0xFF mask
                if (isOptimizedBinaryString !== true) {
                    // this is a string, not in a base64 format.
                    // Be sure that this is a correct "binary string"
                    data = string2binary(data);
                }
            }
        }
        return data;
    });
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A worker that does nothing but passing chunks to the next one. This is like
 * a nodejs stream but with some differences. On the good side :
 * - it works on IE 6-9 without any issue / polyfill
 * - it weights less than the full dependencies bundled with browserify
 * - it forwards errors (no need to declare an error handler EVERYWHERE)
 *
 * A chunk is an object with 2 attributes : `meta` and `data`. The former is an
 * object containing anything (`percent` for example), see each worker for more
 * details. The latter is the real data (String, Uint8Array, etc).
 *
 * @constructor
 * @param {String} name the name of the stream (mainly used for debugging purposes)
 */
function GenericWorker(name) {
    // the name of the worker
    this.name = name || "default";
    // an object containing metadata about the workers chain
    this.streamInfo = {};
    // an error which happened when the worker was paused
    this.generatedError = null;
    // an object containing metadata to be merged by this worker into the general metadata
    this.extraStreamInfo = {};
    // true if the stream is paused (and should not do anything), false otherwise
    this.isPaused = true;
    // true if the stream is finished (and should not do anything), false otherwise
    this.isFinished = false;
    // true if the stream is locked to prevent further structure updates (pipe), false otherwise
    this.isLocked = false;
    // the event listeners
    this._listeners = {
        'data':[],
        'end':[],
        'error':[]
    };
    // the previous worker, if any
    this.previous = null;
}

GenericWorker.prototype = {
    /**
     * Push a chunk to the next workers.
     * @param {Object} chunk the chunk to push
     */
    push : function (chunk) {
        this.emit("data", chunk);
    },
    /**
     * End the stream.
     * @return {Boolean} true if this call ended the worker, false otherwise.
     */
    end : function () {
        if (this.isFinished) {
            return false;
        }

        this.flush();
        try {
            this.emit("end");
            this.cleanUp();
            this.isFinished = true;
        } catch (e) {
            this.emit("error", e);
        }
        return true;
    },
    /**
     * End the stream with an error.
     * @param {Error} e the error which caused the premature end.
     * @return {Boolean} true if this call ended the worker with an error, false otherwise.
     */
    error : function (e) {
        if (this.isFinished) {
            return false;
        }

        if(this.isPaused) {
            this.generatedError = e;
        } else {
            this.isFinished = true;

            this.emit("error", e);

            // in the workers chain exploded in the middle of the chain,
            // the error event will go downward but we also need to notify
            // workers upward that there has been an error.
            if(this.previous) {
                this.previous.error(e);
            }

            this.cleanUp();
        }
        return true;
    },
    /**
     * Add a callback on an event.
     * @param {String} name the name of the event (data, end, error)
     * @param {Function} listener the function to call when the event is triggered
     * @return {GenericWorker} the current object for chainability
     */
    on : function (name, listener) {
        this._listeners[name].push(listener);
        return this;
    },
    /**
     * Clean any references when a worker is ending.
     */
    cleanUp : function () {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null;
        this._listeners = [];
    },
    /**
     * Trigger an event. This will call registered callback with the provided arg.
     * @param {String} name the name of the event (data, end, error)
     * @param {Object} arg the argument to call the callback with.
     */
    emit : function (name, arg) {
        if (this._listeners[name]) {
            for(var i = 0; i < this._listeners[name].length; i++) {
                this._listeners[name][i].call(this, arg);
            }
        }
    },
    /**
     * Chain a worker with an other.
     * @param {Worker} next the worker receiving events from the current one.
     * @return {worker} the next worker for chainability
     */
    pipe : function (next) {
        return next.registerPrevious(this);
    },
    /**
     * Same as `pipe` in the other direction.
     * Using an API with `pipe(next)` is very easy.
     * Implementing the API with the point of view of the next one registering
     * a source is easier, see the ZipFileWorker.
     * @param {Worker} previous the previous worker, sending events to this one
     * @return {Worker} the current worker for chainability
     */
    registerPrevious : function (previous) {
        if (this.isLocked) {
            throw new Error("The stream '" + this + "' has already been used.");
        }

        // sharing the streamInfo...
        this.streamInfo = previous.streamInfo;
        // ... and adding our own bits
        this.mergeStreamInfo();
        this.previous =  previous;
        var self = this;
        previous.on('data', function (chunk) {
            self.processChunk(chunk);
        });
        previous.on('end', function () {
            self.end();
        });
        previous.on('error', function (e) {
            self.error(e);
        });
        return this;
    },
    /**
     * Pause the stream so it doesn't send events anymore.
     * @return {Boolean} true if this call paused the worker, false otherwise.
     */
    pause : function () {
        if(this.isPaused || this.isFinished) {
            return false;
        }
        this.isPaused = true;

        if(this.previous) {
            this.previous.pause();
        }
        return true;
    },
    /**
     * Resume a paused stream.
     * @return {Boolean} true if this call resumed the worker, false otherwise.
     */
    resume : function () {
        if(!this.isPaused || this.isFinished) {
            return false;
        }
        this.isPaused = false;

        // if true, the worker tried to resume but failed
        var withError = false;
        if(this.generatedError) {
            this.error(this.generatedError);
            withError = true;
        }
        if(this.previous) {
            this.previous.resume();
        }

        return !withError;
    },
    /**
     * Flush any remaining bytes as the stream is ending.
     */
    flush : function () {},
    /**
     * Process a chunk. This is usually the method overridden.
     * @param {Object} chunk the chunk to process.
     */
    processChunk : function(chunk) {
        this.push(chunk);
    },
    /**
     * Add a key/value to be added in the workers chain streamInfo once activated.
     * @param {String} key the key to use
     * @param {Object} value the associated value
     * @return {Worker} the current worker for chainability
     */
    withStreamInfo : function (key, value) {
        this.extraStreamInfo[key] = value;
        this.mergeStreamInfo();
        return this;
    },
    /**
     * Merge this worker's streamInfo into the chain's streamInfo.
     */
    mergeStreamInfo : function () {
        for(var key in this.extraStreamInfo) {
            if (!this.extraStreamInfo.hasOwnProperty(key)) {
                continue;
            }
            this.streamInfo[key] = this.extraStreamInfo[key];
        }
    },

    /**
     * Lock the stream to prevent further updates on the workers chain.
     * After calling this method, all calls to pipe will fail.
     */
    lock: function () {
        if (this.isLocked) {
            throw new Error("The stream '" + this + "' has already been used.");
        }
        this.isLocked = true;
        if (this.previous) {
            this.previous.lock();
        }
    },

    /**
     *
     * Pretty print the workers chain.
     */
    toString : function () {
        var me = "Worker " + this.name;
        if (this.previous) {
            return this.previous + " -> " + me;
        } else {
            return me;
        }
    }
};

module.exports = GenericWorker;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.base64 = true;
exports.array = true;
exports.string = true;
exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
exports.nodebuffer = typeof Buffer !== "undefined";
// contains true if JSZip can read/generate Uint8Array, false otherwise.
exports.uint8array = typeof Uint8Array !== "undefined";

if (typeof ArrayBuffer === "undefined") {
    exports.blob = false;
}
else {
    var buffer = new ArrayBuffer(0);
    try {
        exports.blob = new Blob([buffer], {
            type: "application/zip"
        }).size === 0;
    }
    catch (e) {
        try {
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            exports.blob = builder.getBlob('application/zip').size === 0;
        }
        catch (e) {
            exports.blob = false;
        }
    }
}

try {
    exports.nodestream = !!__webpack_require__(12).Readable;
} catch(e) {
    exports.nodestream = false;
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');

function _has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var support = __webpack_require__(2);
var nodejsUtils = __webpack_require__(6);
var GenericWorker = __webpack_require__(1);

/**
 * The following functions come from pako, from pako/lib/utils/strings
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new Array(256);
for (var i=0; i<256; i++) {
  _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
}
_utf8len[254]=_utf8len[254]=1; // Invalid sequence start

// convert string to array (typed, when possible)
var string2buf = function (str) {
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

    // count binary size
    for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
    }

    // allocate buffer
    if (support.uint8array) {
        buf = new Uint8Array(buf_len);
    } else {
        buf = new Array(buf_len);
    }

    // convert
    for (i=0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        if (c < 0x80) {
            /* one byte */
            buf[i++] = c;
        } else if (c < 0x800) {
            /* two bytes */
            buf[i++] = 0xC0 | (c >>> 6);
            buf[i++] = 0x80 | (c & 0x3f);
        } else if (c < 0x10000) {
            /* three bytes */
            buf[i++] = 0xE0 | (c >>> 12);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        } else {
            /* four bytes */
            buf[i++] = 0xf0 | (c >>> 18);
            buf[i++] = 0x80 | (c >>> 12 & 0x3f);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        }
    }

    return buf;
};

// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
var utf8border = function(buf, max) {
    var pos;

    max = max || buf.length;
    if (max > buf.length) { max = buf.length; }

    // go back from last position, until start of sequence found
    pos = max-1;
    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

    // Fuckup - very small and broken sequence,
    // return max, because we should return something anyway.
    if (pos < 0) { return max; }

    // If we came to start of buffer - that means vuffer is too small,
    // return max too.
    if (pos === 0) { return max; }

    return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

// convert array to string
var buf2string = function (buf) {
    var str, i, out, c, c_len;
    var len = buf.length;

    // Reserve max possible length (2 words per char)
    // NB: by unknown reasons, Array is significantly faster for
    //     String.fromCharCode.apply than Uint16Array.
    var utf16buf = new Array(len*2);

    for (out=0, i=0; i<len;) {
        c = buf[i++];
        // quick process ascii
        if (c < 0x80) { utf16buf[out++] = c; continue; }

        c_len = _utf8len[c];
        // skip 5 & 6 byte codes
        if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

        // apply mask on first byte
        c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
        // join the rest
        while (c_len > 1 && i < len) {
            c = (c << 6) | (buf[i++] & 0x3f);
            c_len--;
        }

        // terminated by end of string?
        if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

        if (c < 0x10000) {
            utf16buf[out++] = c;
        } else {
            c -= 0x10000;
            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
        }
    }

    // shrinkBuf(utf16buf, out)
    if (utf16buf.length !== out) {
        if(utf16buf.subarray) {
            utf16buf = utf16buf.subarray(0, out);
        } else {
            utf16buf.length = out;
        }
    }

    // return String.fromCharCode.apply(null, utf16buf);
    return utils.applyFromCharCode(utf16buf);
};


// That's all for the pako functions.


/**
 * Transform a javascript string into an array (typed if possible) of bytes,
 * UTF-8 encoded.
 * @param {String} str the string to encode
 * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
 */
exports.utf8encode = function utf8encode(str) {
    if (support.nodebuffer) {
        return nodejsUtils.newBufferFrom(str, "utf-8");
    }

    return string2buf(str);
};


/**
 * Transform a bytes array (or a representation) representing an UTF-8 encoded
 * string into a javascript string.
 * @param {Array|Uint8Array|Buffer} buf the data de decode
 * @return {String} the decoded string.
 */
exports.utf8decode = function utf8decode(buf) {
    if (support.nodebuffer) {
        return utils.transformTo("nodebuffer", buf).toString("utf-8");
    }

    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);

    return buf2string(buf);
};

/**
 * A worker to decode utf8 encoded binary chunks into string chunks.
 * @constructor
 */
function Utf8DecodeWorker() {
    GenericWorker.call(this, "utf-8 decode");
    // the last bytes if a chunk didn't end with a complete codepoint.
    this.leftOver = null;
}
utils.inherits(Utf8DecodeWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Utf8DecodeWorker.prototype.processChunk = function (chunk) {

    var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);

    // 1st step, re-use what's left of the previous chunk
    if (this.leftOver && this.leftOver.length) {
        if(support.uint8array) {
            var previousData = data;
            data = new Uint8Array(previousData.length + this.leftOver.length);
            data.set(this.leftOver, 0);
            data.set(previousData, this.leftOver.length);
        } else {
            data = this.leftOver.concat(data);
        }
        this.leftOver = null;
    }

    var nextBoundary = utf8border(data);
    var usableData = data;
    if (nextBoundary !== data.length) {
        if (support.uint8array) {
            usableData = data.subarray(0, nextBoundary);
            this.leftOver = data.subarray(nextBoundary, data.length);
        } else {
            usableData = data.slice(0, nextBoundary);
            this.leftOver = data.slice(nextBoundary, data.length);
        }
    }

    this.push({
        data : exports.utf8decode(usableData),
        meta : chunk.meta
    });
};

/**
 * @see GenericWorker.flush
 */
Utf8DecodeWorker.prototype.flush = function () {
    if(this.leftOver && this.leftOver.length) {
        this.push({
            data : exports.utf8decode(this.leftOver),
            meta : {}
        });
        this.leftOver = null;
    }
};
exports.Utf8DecodeWorker = Utf8DecodeWorker;

/**
 * A worker to endcode string chunks into utf8 encoded binary chunks.
 * @constructor
 */
function Utf8EncodeWorker() {
    GenericWorker.call(this, "utf-8 encode");
}
utils.inherits(Utf8EncodeWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Utf8EncodeWorker.prototype.processChunk = function (chunk) {
    this.push({
        data : exports.utf8encode(chunk.data),
        meta : chunk.meta
    });
};
exports.Utf8EncodeWorker = Utf8EncodeWorker;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global Promise */


// load the global object first:
// - it should be better integrated in the system (unhandledRejection in node)
// - the environment may have a custom Promise implementation (see zone.js)
var ES6Promise = null;
if (typeof Promise !== "undefined") {
    ES6Promise = Promise;
} else {
    ES6Promise = __webpack_require__(37);
}

/**
 * Let the user use/change some implementations.
 */
module.exports = {
    Promise: ES6Promise
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    /**
     * True if this is running in Nodejs, will be undefined in a browser.
     * In a browser, browserify won't include this file and the whole module
     * will be resolved an empty object.
     */
    isNode : typeof Buffer !== "undefined",
    /**
     * Create a new nodejs Buffer from an existing content.
     * @param {Object} data the data to pass to the constructor.
     * @param {String} encoding the encoding to use.
     * @return {Buffer} a new Buffer.
     */
    newBufferFrom: function(data, encoding) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) {
            return Buffer.from(data, encoding);
        } else {
            if (typeof data === "number") {
                // Safeguard for old Node.js versions. On newer versions,
                // Buffer.from(number) / Buffer(number, encoding) already throw.
                throw new Error("The \"data\" argument must not be a number");
            }
            return new Buffer(data, encoding);
        }
    },
    /**
     * Create a new nodejs Buffer with the specified size.
     * @param {Integer} size the size of the buffer.
     * @return {Buffer} a new Buffer.
     */
    allocBuffer: function (size) {
        if (Buffer.alloc) {
            return Buffer.alloc(size);
        } else {
            var buf = new Buffer(size);
            buf.fill(0);
            return buf;
        }
    },
    /**
     * Find out if an object is a Buffer.
     * @param {Object} b the object to test.
     * @return {Boolean} true if the object is a Buffer, false otherwise.
     */
    isBuffer : function(b){
        return Buffer.isBuffer(b);
    },

    isStream : function (obj) {
        return obj &&
            typeof obj.on === "function" &&
            typeof obj.pause === "function" &&
            typeof obj.resume === "function";
    }
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var external = __webpack_require__(5);
var DataWorker = __webpack_require__(16);
var DataLengthProbe = __webpack_require__(17);
var Crc32Probe = __webpack_require__(18);
var DataLengthProbe = __webpack_require__(17);

/**
 * Represent a compressed object, with everything needed to decompress it.
 * @constructor
 * @param {number} compressedSize the size of the data compressed.
 * @param {number} uncompressedSize the size of the data after decompression.
 * @param {number} crc32 the crc32 of the decompressed file.
 * @param {object} compression the type of compression, see lib/compressions.js.
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the compressed data.
 */
function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
    this.compressedSize = compressedSize;
    this.uncompressedSize = uncompressedSize;
    this.crc32 = crc32;
    this.compression = compression;
    this.compressedContent = data;
}

CompressedObject.prototype = {
    /**
     * Create a worker to get the uncompressed content.
     * @return {GenericWorker} the worker.
     */
    getContentWorker : function () {
        var worker = new DataWorker(external.Promise.resolve(this.compressedContent))
        .pipe(this.compression.uncompressWorker())
        .pipe(new DataLengthProbe("data_length"));

        var that = this;
        worker.on("end", function () {
            if(this.streamInfo['data_length'] !== that.uncompressedSize) {
                throw new Error("Bug : uncompressed data size mismatch");
            }
        });
        return worker;
    },
    /**
     * Create a worker to get the compressed content.
     * @return {GenericWorker} the worker.
     */
    getCompressedWorker : function () {
        return new DataWorker(external.Promise.resolve(this.compressedContent))
        .withStreamInfo("compressedSize", this.compressedSize)
        .withStreamInfo("uncompressedSize", this.uncompressedSize)
        .withStreamInfo("crc32", this.crc32)
        .withStreamInfo("compression", this.compression)
        ;
    }
};

/**
 * Chain the given worker with other workers to compress the content with the
 * given compresion.
 * @param {GenericWorker} uncompressedWorker the worker to pipe.
 * @param {Object} compression the compression object.
 * @param {Object} compressionOptions the options to use when compressing.
 * @return {GenericWorker} the new worker compressing the content.
 */
CompressedObject.createWorkerFrom = function (uncompressedWorker, compression, compressionOptions) {
    return uncompressedWorker
    .pipe(new Crc32Probe())
    .pipe(new DataLengthProbe("uncompressedSize"))
    .pipe(compression.compressWorker(compressionOptions))
    .pipe(new DataLengthProbe("compressedSize"))
    .withStreamInfo("compression", compression);
};

module.exports = CompressedObject;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * The following functions come from pako, from pako/lib/zlib/crc32.js
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Use ordinary array, since untyped makes no boost here
function makeTable() {
    var c, table = [];

    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        table[n] = c;
    }

    return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
    var t = crcTable, end = pos + len;

    crc = crc ^ (-1);

    for (var i = pos; i < end; i++ ) {
        crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
}

// That's all for the pako functions.

/**
 * Compute the crc32 of a string.
 * This is almost the same as the function crc32, but for strings. Using the
 * same function for the two use cases leads to horrible performances.
 * @param {Number} crc the starting value of the crc.
 * @param {String} str the string to use.
 * @param {Number} len the length of the string.
 * @param {Number} pos the starting position for the crc32 computation.
 * @return {Number} the computed crc32.
 */
function crc32str(crc, str, len, pos) {
    var t = crcTable, end = pos + len;

    crc = crc ^ (-1);

    for (var i = pos; i < end; i++ ) {
        crc = (crc >>> 8) ^ t[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
}

module.exports = function crc32wrapper(input, crc) {
    if (typeof input === "undefined" || !input.length) {
        return 0;
    }

    var isArray = utils.getTypeOf(input) !== "string";

    if(isArray) {
        return crc32(crc|0, input, input.length, 0);
    } else {
        return crc32str(crc|0, input, input.length, 0);
    }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Representation a of zip file in js
 * @constructor
 */
function JSZip() {
    // if this constructor is used without `new`, it adds `new` before itself:
    if(!(this instanceof JSZip)) {
        return new JSZip();
    }

    if(arguments.length) {
        throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
    }

    // object containing the files :
    // {
    //   "folder/" : {...},
    //   "folder/data.txt" : {...}
    // }
    this.files = {};

    this.comment = null;

    // Where we are in the hierarchy
    this.root = "";
    this.clone = function() {
        var newObj = new JSZip();
        for (var i in this) {
            if (typeof this[i] !== "function") {
                newObj[i] = this[i];
            }
        }
        return newObj;
    };
}
JSZip.prototype = __webpack_require__(33);
JSZip.prototype.loadAsync = __webpack_require__(55);
JSZip.support = __webpack_require__(2);
JSZip.defaults = __webpack_require__(15);

// TODO find a better way to handle this version,
// a require('package.json').version doesn't work with webpack, see #327
JSZip.version = "3.2.0";

JSZip.loadAsync = function (content, options) {
    return new JSZip().loadAsync(content, options);
};

JSZip.external = __webpack_require__(5);
module.exports = JSZip;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * This file is used by module bundlers (browserify/webpack/etc) when
 * including a stream implementation. We use "readable-stream" to get a
 * consistent behavior between nodejs versions but bundlers often have a shim
 * for "stream". Using this shim greatly improve the compatibility and greatly
 * reduce the final size of the bundle (only one stream implementation, not
 * two).
 */
module.exports = __webpack_require__(34);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var utils = __webpack_require__(0);
var support = __webpack_require__(2);
// private property
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


// public method for encoding
exports.encode = function(input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0, len = input.length, remainingBytes = len;

    var isArray = utils.getTypeOf(input) !== "string";
    while (i < input.length) {
        remainingBytes = len - i;

        if (!isArray) {
            chr1 = input.charCodeAt(i++);
            chr2 = i < len ? input.charCodeAt(i++) : 0;
            chr3 = i < len ? input.charCodeAt(i++) : 0;
        } else {
            chr1 = input[i++];
            chr2 = i < len ? input[i++] : 0;
            chr3 = i < len ? input[i++] : 0;
        }

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = remainingBytes > 1 ? (((chr2 & 15) << 2) | (chr3 >> 6)) : 64;
        enc4 = remainingBytes > 2 ? (chr3 & 63) : 64;

        output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));

    }

    return output.join("");
};

// public method for decoding
exports.decode = function(input) {
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0, resultIndex = 0;

    var dataUrlPrefix = "data:";

    if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
        // This is a common error: people give a data url
        // (data:image/png;base64,iVBOR...) with a {base64: true} and
        // wonders why things don't work.
        // We can detect that the string input looks like a data url but we
        // *can't* be sure it is one: removing everything up to the comma would
        // be too dangerous.
        throw new Error("Invalid base64 input, it looks like a data url.");
    }

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    var totalLength = input.length * 3 / 4;
    if(input.charAt(input.length - 1) === _keyStr.charAt(64)) {
        totalLength--;
    }
    if(input.charAt(input.length - 2) === _keyStr.charAt(64)) {
        totalLength--;
    }
    if (totalLength % 1 !== 0) {
        // totalLength is not an integer, the length does not match a valid
        // base64 content. That can happen if:
        // - the input is not a base64 content
        // - the input is *almost* a base64 content, with a extra chars at the
        //   beginning or at the end
        // - the input uses a base64 variant (base64url for example)
        throw new Error("Invalid base64 input, bad content length.");
    }
    var output;
    if (support.uint8array) {
        output = new Uint8Array(totalLength|0);
    } else {
        output = new Array(totalLength|0);
    }

    while (i < input.length) {

        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output[resultIndex++] = chr1;

        if (enc3 !== 64) {
            output[resultIndex++] = chr2;
        }
        if (enc4 !== 64) {
            output[resultIndex++] = chr3;
        }

    }

    return output;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var ConvertWorker = __webpack_require__(39);
var GenericWorker = __webpack_require__(1);
var base64 = __webpack_require__(13);
var support = __webpack_require__(2);
var external = __webpack_require__(5);

var NodejsStreamOutputAdapter = null;
if (support.nodestream) {
    try {
        NodejsStreamOutputAdapter = __webpack_require__(40);
    } catch(e) {}
}

/**
 * Apply the final transformation of the data. If the user wants a Blob for
 * example, it's easier to work with an U8intArray and finally do the
 * ArrayBuffer/Blob conversion.
 * @param {String} type the name of the final type
 * @param {String|Uint8Array|Buffer} content the content to transform
 * @param {String} mimeType the mime type of the content, if applicable.
 * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the content in the right format.
 */
function transformZipOutput(type, content, mimeType) {
    switch(type) {
        case "blob" :
            return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);
        case "base64" :
            return base64.encode(content);
        default :
            return utils.transformTo(type, content);
    }
}

/**
 * Concatenate an array of data of the given type.
 * @param {String} type the type of the data in the given array.
 * @param {Array} dataArray the array containing the data chunks to concatenate
 * @return {String|Uint8Array|Buffer} the concatenated data
 * @throws Error if the asked type is unsupported
 */
function concat (type, dataArray) {
    var i, index = 0, res = null, totalLength = 0;
    for(i = 0; i < dataArray.length; i++) {
        totalLength += dataArray[i].length;
    }
    switch(type) {
        case "string":
            return dataArray.join("");
          case "array":
            return Array.prototype.concat.apply([], dataArray);
        case "uint8array":
            res = new Uint8Array(totalLength);
            for(i = 0; i < dataArray.length; i++) {
                res.set(dataArray[i], index);
                index += dataArray[i].length;
            }
            return res;
        case "nodebuffer":
            return Buffer.concat(dataArray);
        default:
            throw new Error("concat : unsupported type '"  + type + "'");
    }
}

/**
 * Listen a StreamHelper, accumulate its content and concatenate it into a
 * complete block.
 * @param {StreamHelper} helper the helper to use.
 * @param {Function} updateCallback a callback called on each update. Called
 * with one arg :
 * - the metadata linked to the update received.
 * @return Promise the promise for the accumulation.
 */
function accumulate(helper, updateCallback) {
    return new external.Promise(function (resolve, reject){
        var dataArray = [];
        var chunkType = helper._internalType,
            resultType = helper._outputType,
            mimeType = helper._mimeType;
        helper
        .on('data', function (data, meta) {
            dataArray.push(data);
            if(updateCallback) {
                updateCallback(meta);
            }
        })
        .on('error', function(err) {
            dataArray = [];
            reject(err);
        })
        .on('end', function (){
            try {
                var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
                resolve(result);
            } catch (e) {
                reject(e);
            }
            dataArray = [];
        })
        .resume();
    });
}

/**
 * An helper to easily use workers outside of JSZip.
 * @constructor
 * @param {Worker} worker the worker to wrap
 * @param {String} outputType the type of data expected by the use
 * @param {String} mimeType the mime type of the content, if applicable.
 */
function StreamHelper(worker, outputType, mimeType) {
    var internalType = outputType;
    switch(outputType) {
        case "blob":
        case "arraybuffer":
            internalType = "uint8array";
        break;
        case "base64":
            internalType = "string";
        break;
    }

    try {
        // the type used internally
        this._internalType = internalType;
        // the type used to output results
        this._outputType = outputType;
        // the mime type
        this._mimeType = mimeType;
        utils.checkSupport(internalType);
        this._worker = worker.pipe(new ConvertWorker(internalType));
        // the last workers can be rewired without issues but we need to
        // prevent any updates on previous workers.
        worker.lock();
    } catch(e) {
        this._worker = new GenericWorker("error");
        this._worker.error(e);
    }
}

StreamHelper.prototype = {
    /**
     * Listen a StreamHelper, accumulate its content and concatenate it into a
     * complete block.
     * @param {Function} updateCb the update callback.
     * @return Promise the promise for the accumulation.
     */
    accumulate : function (updateCb) {
        return accumulate(this, updateCb);
    },
    /**
     * Add a listener on an event triggered on a stream.
     * @param {String} evt the name of the event
     * @param {Function} fn the listener
     * @return {StreamHelper} the current helper.
     */
    on : function (evt, fn) {
        var self = this;

        if(evt === "data") {
            this._worker.on(evt, function (chunk) {
                fn.call(self, chunk.data, chunk.meta);
            });
        } else {
            this._worker.on(evt, function () {
                utils.delay(fn, arguments, self);
            });
        }
        return this;
    },
    /**
     * Resume the flow of chunks.
     * @return {StreamHelper} the current helper.
     */
    resume : function () {
        utils.delay(this._worker.resume, [], this._worker);
        return this;
    },
    /**
     * Pause the flow of chunks.
     * @return {StreamHelper} the current helper.
     */
    pause : function () {
        this._worker.pause();
        return this;
    },
    /**
     * Return a nodejs stream for this helper.
     * @param {Function} updateCb the update callback.
     * @return {NodejsStreamOutputAdapter} the nodejs stream.
     */
    toNodejsStream : function (updateCb) {
        utils.checkSupport("nodestream");
        if (this._outputType !== "nodebuffer") {
            // an object stream containing blob/arraybuffer/uint8array/string
            // is strange and I don't know if it would be useful.
            // I you find this comment and have a good usecase, please open a
            // bug report !
            throw new Error(this._outputType + " is not supported by this method");
        }

        return new NodejsStreamOutputAdapter(this, {
            objectMode : this._outputType !== "nodebuffer"
        }, updateCb);
    }
};


module.exports = StreamHelper;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.base64 = false;
exports.binary = false;
exports.dir = false;
exports.createFolders = true;
exports.date = null;
exports.compression = null;
exports.compressionOptions = null;
exports.comment = null;
exports.unixPermissions = null;
exports.dosPermissions = null;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var GenericWorker = __webpack_require__(1);

// the size of the generated chunks
// TODO expose this as a public variable
var DEFAULT_BLOCK_SIZE = 16 * 1024;

/**
 * A worker that reads a content and emits chunks.
 * @constructor
 * @param {Promise} dataP the promise of the data to split
 */
function DataWorker(dataP) {
    GenericWorker.call(this, "DataWorker");
    var self = this;
    this.dataIsReady = false;
    this.index = 0;
    this.max = 0;
    this.data = null;
    this.type = "";

    this._tickScheduled = false;

    dataP.then(function (data) {
        self.dataIsReady = true;
        self.data = data;
        self.max = data && data.length || 0;
        self.type = utils.getTypeOf(data);
        if(!self.isPaused) {
            self._tickAndRepeat();
        }
    }, function (e) {
        self.error(e);
    });
}

utils.inherits(DataWorker, GenericWorker);

/**
 * @see GenericWorker.cleanUp
 */
DataWorker.prototype.cleanUp = function () {
    GenericWorker.prototype.cleanUp.call(this);
    this.data = null;
};

/**
 * @see GenericWorker.resume
 */
DataWorker.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if (!this._tickScheduled && this.dataIsReady) {
        this._tickScheduled = true;
        utils.delay(this._tickAndRepeat, [], this);
    }
    return true;
};

/**
 * Trigger a tick a schedule an other call to this function.
 */
DataWorker.prototype._tickAndRepeat = function() {
    this._tickScheduled = false;
    if(this.isPaused || this.isFinished) {
        return;
    }
    this._tick();
    if(!this.isFinished) {
        utils.delay(this._tickAndRepeat, [], this);
        this._tickScheduled = true;
    }
};

/**
 * Read and push a chunk.
 */
DataWorker.prototype._tick = function() {

    if(this.isPaused || this.isFinished) {
        return false;
    }

    var size = DEFAULT_BLOCK_SIZE;
    var data = null, nextIndex = Math.min(this.max, this.index + size);
    if (this.index >= this.max) {
        // EOF
        return this.end();
    } else {
        switch(this.type) {
            case "string":
                data = this.data.substring(this.index, nextIndex);
            break;
            case "uint8array":
                data = this.data.subarray(this.index, nextIndex);
            break;
            case "array":
            case "nodebuffer":
                data = this.data.slice(this.index, nextIndex);
            break;
        }
        this.index = nextIndex;
        return this.push({
            data : data,
            meta : {
                percent : this.max ? this.index / this.max * 100 : 0
            }
        });
    }
};

module.exports = DataWorker;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var GenericWorker = __webpack_require__(1);

/**
 * A worker which calculate the total length of the data flowing through.
 * @constructor
 * @param {String} propName the name used to expose the length
 */
function DataLengthProbe(propName) {
    GenericWorker.call(this, "DataLengthProbe for " + propName);
    this.propName = propName;
    this.withStreamInfo(propName, 0);
}
utils.inherits(DataLengthProbe, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
DataLengthProbe.prototype.processChunk = function (chunk) {
    if(chunk) {
        var length = this.streamInfo[this.propName] || 0;
        this.streamInfo[this.propName] = length + chunk.data.length;
    }
    GenericWorker.prototype.processChunk.call(this, chunk);
};
module.exports = DataLengthProbe;



/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GenericWorker = __webpack_require__(1);
var crc32 = __webpack_require__(8);
var utils = __webpack_require__(0);

/**
 * A worker which calculate the crc32 of the data flowing through.
 * @constructor
 */
function Crc32Probe() {
    GenericWorker.call(this, "Crc32Probe");
    this.withStreamInfo("crc32", 0);
}
utils.inherits(Crc32Probe, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Crc32Probe.prototype.processChunk = function (chunk) {
    this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
    this.push(chunk);
};
module.exports = Crc32Probe;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GenericWorker = __webpack_require__(1);

exports.STORE = {
    magic: "\x00\x00",
    compressWorker : function (compressionOptions) {
        return new GenericWorker("STORE compression");
    },
    uncompressWorker : function () {
        return new GenericWorker("STORE decompression");
    }
};
exports.DEFLATE = __webpack_require__(43);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// String encode/decode helpers



var utils = __webpack_require__(3);


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safari
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // On Chrome, the arguments in a function call that are allowed is `65534`.
  // If the length of the buffer is smaller than that, we can use this optimization,
  // otherwise we will take a slower path.
  if (len < 65534) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means buffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.LOCAL_FILE_HEADER = "PK\x03\x04";
exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
exports.DATA_DESCRIPTOR = "PK\x07\x08";


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var support = __webpack_require__(2);
var ArrayReader = __webpack_require__(27);
var StringReader = __webpack_require__(57);
var NodeBufferReader = __webpack_require__(58);
var Uint8ArrayReader = __webpack_require__(29);

/**
 * Create a reader adapted to the data.
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.
 * @return {DataReader} the data reader.
 */
module.exports = function (data) {
    var type = utils.getTypeOf(data);
    utils.checkSupport(type);
    if (type === "string" && !support.uint8array) {
        return new StringReader(data);
    }
    if (type === "nodebuffer") {
        return new NodeBufferReader(data);
    }
    if (support.uint8array) {
        return new Uint8ArrayReader(utils.transformTo("uint8array", data));
    }
    return new ArrayReader(utils.transformTo("array", data));
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DataReader = __webpack_require__(28);
var utils = __webpack_require__(0);

function ArrayReader(data) {
    DataReader.call(this, data);
	for(var i = 0; i < this.data.length; i++) {
		data[i] = data[i] & 0xFF;
	}
}
utils.inherits(ArrayReader, DataReader);
/**
 * @see DataReader.byteAt
 */
ArrayReader.prototype.byteAt = function(i) {
    return this.data[this.zero + i];
};
/**
 * @see DataReader.lastIndexOfSignature
 */
ArrayReader.prototype.lastIndexOfSignature = function(sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3);
    for (var i = this.length - 4; i >= 0; --i) {
        if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
            return i - this.zero;
        }
    }

    return -1;
};
/**
 * @see DataReader.readAndCheckSignature
 */
ArrayReader.prototype.readAndCheckSignature = function (sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3),
        data = this.readData(4);
    return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
};
/**
 * @see DataReader.readData
 */
ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        return [];
    }
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = ArrayReader;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var utils = __webpack_require__(0);

function DataReader(data) {
    this.data = data; // type : see implementation
    this.length = data.length;
    this.index = 0;
    this.zero = 0;
}
DataReader.prototype = {
    /**
     * Check that the offset will not go too far.
     * @param {string} offset the additional offset to check.
     * @throws {Error} an Error if the offset is out of bounds.
     */
    checkOffset: function(offset) {
        this.checkIndex(this.index + offset);
    },
    /**
     * Check that the specified index will not be too far.
     * @param {string} newIndex the index to check.
     * @throws {Error} an Error if the index is out of bounds.
     */
    checkIndex: function(newIndex) {
        if (this.length < this.zero + newIndex || newIndex < 0) {
            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
        }
    },
    /**
     * Change the index.
     * @param {number} newIndex The new index.
     * @throws {Error} if the new index is out of the data.
     */
    setIndex: function(newIndex) {
        this.checkIndex(newIndex);
        this.index = newIndex;
    },
    /**
     * Skip the next n bytes.
     * @param {number} n the number of bytes to skip.
     * @throws {Error} if the new index is out of the data.
     */
    skip: function(n) {
        this.setIndex(this.index + n);
    },
    /**
     * Get the byte at the specified index.
     * @param {number} i the index to use.
     * @return {number} a byte.
     */
    byteAt: function(i) {
        // see implementations
    },
    /**
     * Get the next number with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {number} the corresponding number.
     */
    readInt: function(size) {
        var result = 0,
            i;
        this.checkOffset(size);
        for (i = this.index + size - 1; i >= this.index; i--) {
            result = (result << 8) + this.byteAt(i);
        }
        this.index += size;
        return result;
    },
    /**
     * Get the next string with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {string} the corresponding string.
     */
    readString: function(size) {
        return utils.transformTo("string", this.readData(size));
    },
    /**
     * Get raw data without conversion, <size> bytes.
     * @param {number} size the number of bytes to read.
     * @return {Object} the raw data, implementation specific.
     */
    readData: function(size) {
        // see implementations
    },
    /**
     * Find the last occurence of a zip signature (4 bytes).
     * @param {string} sig the signature to find.
     * @return {number} the index of the last occurence, -1 if not found.
     */
    lastIndexOfSignature: function(sig) {
        // see implementations
    },
    /**
     * Read the signature (4 bytes) at the current position and compare it with sig.
     * @param {string} sig the expected signature
     * @return {boolean} true if the signature matches, false otherwise.
     */
    readAndCheckSignature: function(sig) {
        // see implementations
    },
    /**
     * Get the next date.
     * @return {Date} the date.
     */
    readDate: function() {
        var dostime = this.readInt(4);
        return new Date(Date.UTC(
        ((dostime >> 25) & 0x7f) + 1980, // year
        ((dostime >> 21) & 0x0f) - 1, // month
        (dostime >> 16) & 0x1f, // day
        (dostime >> 11) & 0x1f, // hour
        (dostime >> 5) & 0x3f, // minute
        (dostime & 0x1f) << 1)); // second
    }
};
module.exports = DataReader;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayReader = __webpack_require__(27);
var utils = __webpack_require__(0);

function Uint8ArrayReader(data) {
    ArrayReader.call(this, data);
}
utils.inherits(Uint8ArrayReader, ArrayReader);
/**
 * @see DataReader.readData
 */
Uint8ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
        return new Uint8Array(0);
    }
    var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = Uint8ArrayReader;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ractive = __webpack_require__(10);

var _ractive2 = _interopRequireDefault(_ractive);

var _functionlist = __webpack_require__(31);

var _functionlist2 = _interopRequireDefault(_functionlist);

var _functioncreate = __webpack_require__(32);

var _functioncreate2 = _interopRequireDefault(_functioncreate);

var _functiondetail = __webpack_require__(60);

var _functiondetail2 = _interopRequireDefault(_functiondetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ractive2.default.extend({
	template: { v: 4, t: [{ t: 7, e: "hsplit", m: [{ t: 13, n: "style", f: ";", g: 1 }, { t: 13, n: "class", f: "ractive-lambda-ui", g: 1 }], f: [{ t: 7, e: "left", m: [{ t: 13, n: "style", f: "border-right: 1px solid #b9b8b6;background-color: #fff;", g: 1 }], f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "display: block;font-size: 12px;padding-left: 10px;font-size: 18px;font-weight: 700;color: #000;line-height: 2rem;padding: 12px 35px;border-bottom: 1px solid #ddd;", g: 1 }], f: ["AWS Lambda"] }, " ", { t: 7, e: "div", m: [{ t: 13, n: "style", f: "position: absolute;bottom: 0px;top: 60px;left: 0px;right: 0px;", g: 1 }], f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #000;", g: 1 }], f: ["Dashboard"] }, " ", { t: 7, e: "div", m: [{ t: 13, n: "style", f: "display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #000;", g: 1 }], f: ["Applications"] }, " ", { t: 7, e: "div", m: [{ t: 13, n: "style", f: "display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #ec7211;font-weight: bold;", g: 1 }], f: ["Functions"] }, " ", { t: 7, e: "div", m: [{ t: 13, n: "style", f: "display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #000;", g: 1 }], f: ["Layers"] }] }] }, " ", { t: 7, e: "content", m: [{ t: 13, n: "style", f: "background-color: transparent;border: 0px;overflow-x: auto;", g: 1 }], f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "position: absolute;top: 40px;left: 10px;right: 10px;bottom: 10px;", g: 1 }], f: [{ t: 4, f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "height: 30px;margin-left: 10px;line-height: 30px;font-size: 15px;", g: 1 }], f: [{ t: 7, e: "a", m: [{ t: 13, n: "style", f: "cursor: pointer;text-decoration: none;", g: 1 }], f: ["Lambda"] }, " > ", { t: 7, e: "a", m: [{ t: 13, n: "style", f: "cursor: pointer;text-decoration: none;color: #999;", g: 1 }], f: ["Functions"] }] }, " ", { t: 7, e: "div", m: [{ n: "style", f: ["position: absolute;top: 0px;left: 0px;width: ", { t: 4, f: ["260px; "], n: 50, x: { r: ["active_id"], s: "_0===\"stackdetails\"" } }, { t: 4, f: ["100%;"], n: 51, l: 1 }, "; box-shadow: 0 1px 1px 0 rgba(0,28,36,.5);border-top: 1px solid #eaeded;background-color: #fff"], t: 13 }], f: [{ t: 7, e: "functionlist" }] }], n: 50, x: { r: ["tab"], s: "_0===\"list\"" } }, " ", { t: 4, f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "height: 30px;margin-left: 10px;line-height: 30px;font-size: 15px;", g: 1 }], f: [{ t: 7, e: "a", m: [{ t: 13, n: "style", f: "cursor: pointer;text-decoration: none;", g: 1 }], f: ["Lambda"] }, " > ", { t: 7, e: "a", m: [{ t: 13, n: "style", f: "cursor: pointer;text-decoration: none;", g: 1 }, { n: ["click"], t: 70, f: { r: ["@this"], s: "[_0.gotolist()]" } }], f: ["Functions"] }, " > ", { t: 7, e: "a", m: [{ t: 13, n: "style", f: "cursor: pointer;text-decoration: none;color: #999;", g: 1 }], f: ["Create function"] }] }, " ", { t: 7, e: "functioncreate" }], n: 50, x: { r: ["tab"], s: "_0===\"create\"" } }, " ", { t: 4, f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "height: 30px;margin-left: 10px;line-height: 30px;font-size: 15px;", g: 1 }], f: [{ t: 7, e: "a", m: [{ t: 13, n: "style", f: "cursor: pointer;text-decoration: none;", g: 1 }], f: ["Lambda"] }, " > ", { t: 7, e: "a", m: [{ t: 13, n: "style", f: "cursor: pointer;text-decoration: none;", g: 1 }, { n: ["click"], t: 70, f: { r: ["@this"], s: "[_0.gotolist()]" } }], f: ["Functions"] }, " > ", { t: 7, e: "a", m: [{ t: 13, n: "style", f: "cursor: pointer;text-decoration: none;color: #999;", g: 1 }], f: [{ t: 2, r: "detailfunction" }] }] }, " ", { t: 7, e: "functiondetail", m: [{ n: "name", f: [{ t: 2, r: "detailfunction" }], t: 13 }] }], n: 50, x: { r: ["tab"], s: "_0===\"detail\"" } }] }] }] }], e: { "_0===\"stackdetails\"": function _0Stackdetails(_0) {
				return _0 === "stackdetails";
			}, "_0===\"list\"": function _0List(_0) {
				return _0 === "list";
			}, "[_0.gotolist()]": function _0Gotolist(_0) {
				return [_0.gotolist()];
			}, "_0===\"create\"": function _0Create(_0) {
				return _0 === "create";
			}, "_0===\"detail\"": function _0Detail(_0) {
				return _0 === "detail";
			} } },
	components: {
		functionlist: _functionlist2.default,
		functioncreate: _functioncreate2.default,
		functiondetail: _functiondetail2.default
	},
	css: ".hsplit {position: absolute;top:0px;left: 0px;right: 0px;bottom: 0px; /*background-color: #f0f0f0;*/background-color: #f2f3f3; color: #999999;} left {position:absolute;display: block;top: 0px;left: 0px;width: 260px;bottom: 0px;background-color: #fff;} content {position:absolute;display: block;top: 0px;left: 265px;right: 0px;bottom: 0px;margin-top: 5px;} content tabcontent {position: absolute;top: 28px;left: 0px;right: 0px;bottom: 0px;} .ractive-lambda-ui {font-family: sans-serif;} .ractive-lambda-ui * {box-sizing: border-box } content tabhead {position: absolute;top: 0px;left: 0px;right:0px;height: 38px;overflow: hidden;font-size: 0px;} content tabhead tab {display: inline-block;line-height: 28px;padding: 0px 25px 0px 25px; margin-bottom: 10px; cursor: pointer;font-size: 14px;} content tabhead tab.active {} body content tabhead { padding-bottom: 10px;border-bottom: 1px solid #cccccc;} body content tabhead tab:first-child {border-left: 0px;} body content tabhead tab {border-left: 1px solid #cccccc;font-weight: bold;color: #545b64;} body content tabhead tab.active {color: #eb5f07;position: relative;} body content tabhead tab.active:after {content: '';position: absolute;left: 0px;right: 0px;bottom: -9px;border-bottom: 2px solid #000;} ",
	data: function data() {
		return {
			tab: 'list'
		};
	},

	create_function: function create_function() {
		this.set({ tab: 'create' });
	},
	gotolist: function gotolist() {
		this.set({ tab: 'list' });
	},
	gotofunction: function gotofunction(fname) {
		this.set({ tab: 'detail', detailfunction: fname });
	},


	on: {
		init: function init() {
			lambda = new AWS.Lambda({
				endpoint: this.get('endpoint') || undefined,
				region: this.get('region'),
				credentials: {
					accessKeyId: this.get('accessKeyId'),
					secretAccessKey: this.get('secretAccessKey')
				}
			});

			iam = new AWS.IAM({
				endpoint: this.get('endpoint') || undefined,
				region: this.get('region'),
				credentials: {
					accessKeyId: this.get('accessKeyId'),
					secretAccessKey: this.get('secretAccessKey')
				}
			});
		}
	}
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Ractive.extend({
	template: '\n\n\t\t<div style="height: 50px;padding: 10px 10px 0px 0px;background-color: #fafafa;;">\n\n\t\t\t<div style="float: right;">\n\t\t\t\t<a class="btn btn-sm btn-default" on-click="refresh"><i class="icon zmdi zmdi-refresh"></i></a>\n\t\t\t\t<a class="btn btn-sm btn-default {{#if selection}}{{else}}disabled{{/if}}" {{#if selection}}on-click=\'delete\'{{/if}}> Delete </a>\n\t\t\t\t<a class="btn btn-sm btn-warning" on-click="createfunction"> Create function </a>\n\t\t\t</div>\n\t\t</div>\n\n\n\t\t<table style="border-collapse: collapse;border-spacing: 0; empty-cells: show; border: 1px solid #eaeded;width: 100%;">\n\t\t\t<thead style="background-color: #fafafa;color: #000;text-align: left;vertical-align: bottom;border-bottom: 1px solid #eaeded">\n\t\t\t\t<tr>\n\t\t\t\t\t<th style="padding: 0.5em 1em;"></th>\n\t\t\t\t\t<th style="padding: 0.5em 1em;">Function name</th>\n\t\t\t\t\t<th style="padding: 0.5em 1em;">Description</th>\n\t\t\t\t\t<th style="padding: 0.5em 1em;">Runtime</th>\n\t\t\t\t\t<th style="padding: 0.5em 1em;">Code size</th>\n\t\t\t\t\t<th style="padding: 0.5em 1em;">Last modified</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody>\n\t\t\t\t{{#functions}}\n\n\t\t\t\t<tr style="{{#if selection === .FunctionName }}background-color: #f1faff;{{/if}}">\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;"><input type="radio" name={{selection}} value=\'{{.FunctionName}}\'></td>\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;"><a style="cursor: pointer;" on-click="gotofunction">{{.FunctionName}}</a></td>\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;"></td>\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;">{{.Runtime}}</td>\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;">{{.CodeSize}}</td>\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;">{{.LastModified}}</td>\n\t\t\t\t</tr>\n\t\t\t\t{{/functions}}\n\n\t\t\t</tbody>\n\t\t</table>\n\n\n\t',
	load_functions: function load_functions() {
		var ractive = this;
		var params = {
			//Marker: "",
			// MaxItems: 50
		};
		ractive.set('functions', []);
		lambda.listFunctions(params, function (err, data) {
			if (err) return alert('failed getting functions list');

			ractive.set('functions', data.Functions);
			//console.log(data.Functions)
		});
	},

	data: function data() {
		return {
			selection: ''
		};
	},
	on: {
		init: function init() {
			this.load_functions();
		},
		refresh: function refresh() {
			this.load_functions();
		},
		delete: function _delete() {
			var ractive = this;
			console.log('delete', this.get('selection'));
			if (confirm('Are you sure you want to delete ' + this.get('selection') + ' ?')) {
				var params = {
					FunctionName: this.get('selection')
				};
				lambda.deleteFunction(params, function (err, data) {
					if (err) alert('Delete failed');

					ractive.load_functions();
				});
			}
		},
		createfunction: function createfunction() {
			this.parent.create_function();
		},
		gotofunction: function gotofunction(e) {
			this.parent.gotofunction(this.get(e.resolve() + '.FunctionName'));
		}
	}
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var JSZip = __webpack_require__(11);

exports.default = Ractive.extend({
	template: '\n\t\t<h2>Create function</h2>\n\n\t\t<div style="box-shadow: 0 1px 1px 0 rgba(0,28,36,.5);border-top: 1px solid #eaeded;background-color: #fff">\n\n\t\t\t<div style="height: 50px;padding: 0px 10px;background-color: #fafafa;font-size: 24px;font-weight: bold;line-height: 50px;;">\n\t\t\t\tBasic information\n\t\t\t</div>\n\n\t\t\t<div style="padding: 10px;">\n\t\t\t\t<div>Function name</div>\n\t\t\t\t<div>Enter a name that describes the purpose of your function.</div>\n\t\t\t\t<div>\n\t\t\t\t\t<input value={{function_name}} placeholder="myFunctionName" style="width: 50%;" />\n\t\t\t\t</div>\n\n\n\t\t\t\t<div>Runtime</div>\n\t\t\t\t<div>Choose the language to use to write your function.</div>\n\t\t\t\t<div>\n\t\t\t\t\t<select value={{runtime}} style="width: 50%;" >\n\t\t\t\t\t\t<option value="nodejs10.x">NodeJS 10.x</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\n\n\t\t\t\t<div>Permissions</div>\n\t\t\t\t<div>Choose a role that defines the permissions of your function.</div>\n\t\t\t\t<div>\n\t\t\t\t\t<select value={{role}} style="width: 50%;" >\n\t\t\t\t\t\t{{#if !roles}}\n\t\t\t\t\t\t\t<option>Loading...</option>\n\t\t\t\t\t\t{{/if}}\n\t\t\t\t\t\t{{#roles}}\n\t\t\t\t\t\t\t<option value={{.Arn}}>{{.RoleName}}</option>\n\t\t\t\t\t\t{{/roles}}\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\n\t\t<div style="text-align: right;padding: 10px 0px;">\n\t\t\t\t<a class="btn btn-sm" on-click="cancel"> Cancel </a>\n\t\t\t\t<a class="btn btn-sm btn-warning" on-click="createfunction"> Create function </a>\n\t\t</div>\n\t',
	get_roles: function get_roles() {
		var ractive = this;
		var params = {
			//Marker: 'STRING_VALUE',
			//MaxItems: 'NUMBER_VALUE',
			//PathPrefix: 'STRING_VALUE'
		};
		iam.listRoles(params, function (err, data) {
			if (err) return alert('failed listing roles');

			var roles = data.Roles.map(function (r) {
				try {
					r.policy = JSON.parse(decodeURIComponent(r.AssumeRolePolicyDocument));
				} catch (e) {
					r.policy = {};
				}
				return r;
			}).filter(function (r) {
				if (((((r.policy || {}).Statement || [])[0] || {}).Principal || {}).Service !== 'lambda.amazonaws.com') return false;

				return true;
			});

			ractive.set('roles', roles);
			console.log("roles=", roles);
		});
	},

	data: function data() {
		return {
			function_name: '',
			runtime: 'nodejs10.x',
			role: null,
			timeout: 3,
			memory: 128
		};
	},
	on: {
		init: function init() {
			this.get_roles();
		},
		cancel: function cancel() {
			this.parent.gotolist();
		},
		createfunction: function createfunction() {
			var ractive = this;

			var zip = new JSZip();
			zip.file("index.js", '\nexports.handler = async (event) => {\n    // TODO implement\n    const response = {\n        statusCode: 200,\n        body: JSON.stringify(\'Hello from Lambda!\'),\n    };\n    return response;\n};\n');
			zip.generateAsync({ type: "blob" }).then(function (content) {

				content.arrayBuffer().then(function (buff) {
					console.log('buff', buff); // content is blob

					var params = {
						Code: {
							ZipFile: buff
						},
						Description: "",
						FunctionName: ractive.get('function_name'),
						Handler: "index.handler",
						MemorySize: ractive.get('memory'),
						Publish: true,
						Role: ractive.get('role'),
						Runtime: ractive.get('runtime'),
						Timeout: ractive.get('timeout'),
						VpcConfig: {}
					};
					lambda.createFunction(params, function (err, data) {
						if (err) return alert('create failed');

						ractive.parent.gotolist();
					});
				});
			});
		}
	}
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var utf8 = __webpack_require__(4);
var utils = __webpack_require__(0);
var GenericWorker = __webpack_require__(1);
var StreamHelper = __webpack_require__(14);
var defaults = __webpack_require__(15);
var CompressedObject = __webpack_require__(7);
var ZipObject = __webpack_require__(41);
var generate = __webpack_require__(42);
var nodejsUtils = __webpack_require__(6);
var NodejsStreamInputAdapter = __webpack_require__(54);


/**
 * Add a file in the current folder.
 * @private
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
 * @param {Object} originalOptions the options of the file
 * @return {Object} the new file.
 */
var fileAdd = function(name, data, originalOptions) {
    // be sure sub folders exist
    var dataType = utils.getTypeOf(data),
        parent;


    /*
     * Correct options.
     */

    var o = utils.extend(originalOptions || {}, defaults);
    o.date = o.date || new Date();
    if (o.compression !== null) {
        o.compression = o.compression.toUpperCase();
    }

    if (typeof o.unixPermissions === "string") {
        o.unixPermissions = parseInt(o.unixPermissions, 8);
    }

    // UNX_IFDIR  0040000 see zipinfo.c
    if (o.unixPermissions && (o.unixPermissions & 0x4000)) {
        o.dir = true;
    }
    // Bit 4    Directory
    if (o.dosPermissions && (o.dosPermissions & 0x0010)) {
        o.dir = true;
    }

    if (o.dir) {
        name = forceTrailingSlash(name);
    }
    if (o.createFolders && (parent = parentFolder(name))) {
        folderAdd.call(this, parent, true);
    }

    var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
    if (!originalOptions || typeof originalOptions.binary === "undefined") {
        o.binary = !isUnicodeString;
    }


    var isCompressedEmpty = (data instanceof CompressedObject) && data.uncompressedSize === 0;

    if (isCompressedEmpty || o.dir || !data || data.length === 0) {
        o.base64 = false;
        o.binary = true;
        data = "";
        o.compression = "STORE";
        dataType = "string";
    }

    /*
     * Convert content to fit.
     */

    var zipObjectContent = null;
    if (data instanceof CompressedObject || data instanceof GenericWorker) {
        zipObjectContent = data;
    } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        zipObjectContent = new NodejsStreamInputAdapter(name, data);
    } else {
        zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
    }

    var object = new ZipObject(name, zipObjectContent, o);
    this.files[name] = object;
    /*
    TODO: we can't throw an exception because we have async promises
    (we can have a promise of a Date() for example) but returning a
    promise is useless because file(name, data) returns the JSZip
    object for chaining. Should we break that to allow the user
    to catch the error ?

    return external.Promise.resolve(zipObjectContent)
    .then(function () {
        return object;
    });
    */
};

/**
 * Find the parent folder of the path.
 * @private
 * @param {string} path the path to use
 * @return {string} the parent folder, or ""
 */
var parentFolder = function (path) {
    if (path.slice(-1) === '/') {
        path = path.substring(0, path.length - 1);
    }
    var lastSlash = path.lastIndexOf('/');
    return (lastSlash > 0) ? path.substring(0, lastSlash) : "";
};

/**
 * Returns the path with a slash at the end.
 * @private
 * @param {String} path the path to check.
 * @return {String} the path with a trailing slash.
 */
var forceTrailingSlash = function(path) {
    // Check the name ends with a /
    if (path.slice(-1) !== "/") {
        path += "/"; // IE doesn't like substr(-1)
    }
    return path;
};

/**
 * Add a (sub) folder in the current folder.
 * @private
 * @param {string} name the folder's name
 * @param {boolean=} [createFolders] If true, automatically create sub
 *  folders. Defaults to false.
 * @return {Object} the new folder.
 */
var folderAdd = function(name, createFolders) {
    createFolders = (typeof createFolders !== 'undefined') ? createFolders : defaults.createFolders;

    name = forceTrailingSlash(name);

    // Does this folder already exist?
    if (!this.files[name]) {
        fileAdd.call(this, name, null, {
            dir: true,
            createFolders: createFolders
        });
    }
    return this.files[name];
};

/**
* Cross-window, cross-Node-context regular expression detection
* @param  {Object}  object Anything
* @return {Boolean}        true if the object is a regular expression,
* false otherwise
*/
function isRegExp(object) {
    return Object.prototype.toString.call(object) === "[object RegExp]";
}

// return the actual prototype of JSZip
var out = {
    /**
     * @see loadAsync
     */
    load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },


    /**
     * Call a callback function for each entry at this folder level.
     * @param {Function} cb the callback function:
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     */
    forEach: function(cb) {
        var filename, relativePath, file;
        for (filename in this.files) {
            if (!this.files.hasOwnProperty(filename)) {
                continue;
            }
            file = this.files[filename];
            relativePath = filename.slice(this.root.length, filename.length);
            if (relativePath && filename.slice(0, this.root.length) === this.root) { // the file is in the current root
                cb(relativePath, file); // TODO reverse the parameters ? need to be clean AND consistent with the filter search fn...
            }
        }
    },

    /**
     * Filter nested files/folders with the specified function.
     * @param {Function} search the predicate to use :
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     * @return {Array} An array of matching elements.
     */
    filter: function(search) {
        var result = [];
        this.forEach(function (relativePath, entry) {
            if (search(relativePath, entry)) { // the file matches the function
                result.push(entry);
            }

        });
        return result;
    },

    /**
     * Add a file to the zip file, or search a file.
     * @param   {string|RegExp} name The name of the file to add (if data is defined),
     * the name of the file to find (if no data) or a regex to match files.
     * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
     * @param   {Object} o     File options
     * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
     * a file (when searching by string) or an array of files (when searching by regex).
     */
    file: function(name, data, o) {
        if (arguments.length === 1) {
            if (isRegExp(name)) {
                var regexp = name;
                return this.filter(function(relativePath, file) {
                    return !file.dir && regexp.test(relativePath);
                });
            }
            else { // text
                var obj = this.files[this.root + name];
                if (obj && !obj.dir) {
                    return obj;
                } else {
                    return null;
                }
            }
        }
        else { // more than one argument : we have data !
            name = this.root + name;
            fileAdd.call(this, name, data, o);
        }
        return this;
    },

    /**
     * Add a directory to the zip file, or search.
     * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
     * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
     */
    folder: function(arg) {
        if (!arg) {
            return this;
        }

        if (isRegExp(arg)) {
            return this.filter(function(relativePath, file) {
                return file.dir && arg.test(relativePath);
            });
        }

        // else, name is a new folder
        var name = this.root + arg;
        var newFolder = folderAdd.call(this, name);

        // Allow chaining by returning a new object with this folder as the root
        var ret = this.clone();
        ret.root = newFolder.name;
        return ret;
    },

    /**
     * Delete a file, or a directory and all sub-files, from the zip
     * @param {string} name the name of the file to delete
     * @return {JSZip} this JSZip object
     */
    remove: function(name) {
        name = this.root + name;
        var file = this.files[name];
        if (!file) {
            // Look for any folders
            if (name.slice(-1) !== "/") {
                name += "/";
            }
            file = this.files[name];
        }

        if (file && !file.dir) {
            // file
            delete this.files[name];
        } else {
            // maybe a folder, delete recursively
            var kids = this.filter(function(relativePath, file) {
                return file.name.slice(0, name.length) === name;
            });
            for (var i = 0; i < kids.length; i++) {
                delete this.files[kids[i].name];
            }
        }

        return this;
    },

    /**
     * Generate the complete zip file
     * @param {Object} options the options to generate the zip file :
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
     */
    generate: function(options) {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },

    /**
     * Generate the complete zip file as an internal stream.
     * @param {Object} options the options to generate the zip file :
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {StreamHelper} the streamed zip file.
     */
    generateInternalStream: function(options) {
      var worker, opts = {};
      try {
          opts = utils.extend(options || {}, {
              streamFiles: false,
              compression: "STORE",
              compressionOptions : null,
              type: "",
              platform: "DOS",
              comment: null,
              mimeType: 'application/zip',
              encodeFileName: utf8.utf8encode
          });

          opts.type = opts.type.toLowerCase();
          opts.compression = opts.compression.toUpperCase();

          // "binarystring" is prefered but the internals use "string".
          if(opts.type === "binarystring") {
            opts.type = "string";
          }

          if (!opts.type) {
            throw new Error("No output type specified.");
          }

          utils.checkSupport(opts.type);

          // accept nodejs `process.platform`
          if(
              opts.platform === 'darwin' ||
              opts.platform === 'freebsd' ||
              opts.platform === 'linux' ||
              opts.platform === 'sunos'
          ) {
              opts.platform = "UNIX";
          }
          if (opts.platform === 'win32') {
              opts.platform = "DOS";
          }

          var comment = opts.comment || this.comment || "";
          worker = generate.generateWorker(this, opts, comment);
      } catch (e) {
        worker = new GenericWorker("error");
        worker.error(e);
      }
      return new StreamHelper(worker, opts.type || "string", opts.mimeType);
    },
    /**
     * Generate the complete zip file asynchronously.
     * @see generateInternalStream
     */
    generateAsync: function(options, onUpdate) {
        return this.generateInternalStream(options).accumulate(onUpdate);
    },
    /**
     * Generate the complete zip file asynchronously.
     * @see generateInternalStream
     */
    generateNodeStream: function(options, onUpdate) {
        options = options || {};
        if (!options.type) {
            options.type = "nodebuffer";
        }
        return this.generateInternalStream(options).toNodejsStream(onUpdate);
    }
};
module.exports = out;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Emitter = __webpack_require__(35);

function Stream() {
  Emitter.call(this);
}
Stream.prototype = new Emitter();
module.exports = Stream;
// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (!this.hasListeners('error')) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.off('data', ondata);
    dest.off('drain', ondrain);

    source.off('end', onend);
    source.off('close', onclose);

    source.off('error', onerror);
    dest.off('error', onerror);

    source.off('end', cleanup);
    source.off('close', cleanup);

    dest.off('end', cleanup);
    dest.off('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('end', cleanup);
  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
}


/***/ }),
/* 35 */
/***/ (function(module, exports) {


/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = typeof setImmediate === 'function' ? setImmediate :
	function setImmediate() {
		var args = [].slice.apply(arguments);
		args.splice(1, 0, 0);
		setTimeout.apply(null, args);
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var immediate = __webpack_require__(38);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["finally"] = function (callback) {
  if (typeof callback !== 'function') {
    return this;
  }
  var p = this.constructor;
  return this.then(resolve, reject);

  function resolve(value) {
    function yes () {
      return value;
    }
    return p.resolve(callback()).then(yes);
  }
  function reject(reason) {
    function no () {
      throw reason;
    }
    return p.resolve(callback()).then(no);
  }
};
Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GenericWorker = __webpack_require__(1);
var utils = __webpack_require__(0);

/**
 * A worker which convert chunks to a specified type.
 * @constructor
 * @param {String} destType the destination type.
 */
function ConvertWorker(destType) {
    GenericWorker.call(this, "ConvertWorker to " + destType);
    this.destType = destType;
}
utils.inherits(ConvertWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
ConvertWorker.prototype.processChunk = function (chunk) {
    this.push({
        data : utils.transformTo(this.destType, chunk.data),
        meta : chunk.meta
    });
};
module.exports = ConvertWorker;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Readable = __webpack_require__(12).Readable;

var utils = __webpack_require__(0);
utils.inherits(NodejsStreamOutputAdapter, Readable);

/**
* A nodejs stream using a worker as source.
* @see the SourceWrapper in http://nodejs.org/api/stream.html
* @constructor
* @param {StreamHelper} helper the helper wrapping the worker
* @param {Object} options the nodejs stream options
* @param {Function} updateCb the update callback.
*/
function NodejsStreamOutputAdapter(helper, options, updateCb) {
    Readable.call(this, options);
    this._helper = helper;

    var self = this;
    helper.on("data", function (data, meta) {
        if (!self.push(data)) {
            self._helper.pause();
        }
        if(updateCb) {
            updateCb(meta);
        }
    })
    .on("error", function(e) {
        self.emit('error', e);
    })
    .on("end", function () {
        self.push(null);
    });
}


NodejsStreamOutputAdapter.prototype._read = function() {
    this._helper.resume();
};

module.exports = NodejsStreamOutputAdapter;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var StreamHelper = __webpack_require__(14);
var DataWorker = __webpack_require__(16);
var utf8 = __webpack_require__(4);
var CompressedObject = __webpack_require__(7);
var GenericWorker = __webpack_require__(1);

/**
 * A simple object representing a file in the zip file.
 * @constructor
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
 * @param {Object} options the options of the file
 */
var ZipObject = function(name, data, options) {
    this.name = name;
    this.dir = options.dir;
    this.date = options.date;
    this.comment = options.comment;
    this.unixPermissions = options.unixPermissions;
    this.dosPermissions = options.dosPermissions;

    this._data = data;
    this._dataBinary = options.binary;
    // keep only the compression
    this.options = {
        compression : options.compression,
        compressionOptions : options.compressionOptions
    };
};

ZipObject.prototype = {
    /**
     * Create an internal stream for the content of this object.
     * @param {String} type the type of each chunk.
     * @return StreamHelper the stream.
     */
    internalStream: function (type) {
        var result = null, outputType = "string";
        try {
            if (!type) {
                throw new Error("No output type specified.");
            }
            outputType = type.toLowerCase();
            var askUnicodeString = outputType === "string" || outputType === "text";
            if (outputType === "binarystring" || outputType === "text") {
                outputType = "string";
            }
            result = this._decompressWorker();

            var isUnicodeString = !this._dataBinary;

            if (isUnicodeString && !askUnicodeString) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
            }
            if (!isUnicodeString && askUnicodeString) {
                result = result.pipe(new utf8.Utf8DecodeWorker());
            }
        } catch (e) {
            result = new GenericWorker("error");
            result.error(e);
        }

        return new StreamHelper(result, outputType, "");
    },

    /**
     * Prepare the content in the asked type.
     * @param {String} type the type of the result.
     * @param {Function} onUpdate a function to call on each internal update.
     * @return Promise the promise of the result.
     */
    async: function (type, onUpdate) {
        return this.internalStream(type).accumulate(onUpdate);
    },

    /**
     * Prepare the content as a nodejs stream.
     * @param {String} type the type of each chunk.
     * @param {Function} onUpdate a function to call on each internal update.
     * @return Stream the stream.
     */
    nodeStream: function (type, onUpdate) {
        return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
    },

    /**
     * Return a worker for the compressed content.
     * @private
     * @param {Object} compression the compression object to use.
     * @param {Object} compressionOptions the options to use when compressing.
     * @return Worker the worker.
     */
    _compressWorker: function (compression, compressionOptions) {
        if (
            this._data instanceof CompressedObject &&
            this._data.compression.magic === compression.magic
        ) {
            return this._data.getCompressedWorker();
        } else {
            var result = this._decompressWorker();
            if(!this._dataBinary) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
            }
            return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
        }
    },
    /**
     * Return a worker for the decompressed content.
     * @private
     * @return Worker the worker.
     */
    _decompressWorker : function () {
        if (this._data instanceof CompressedObject) {
            return this._data.getContentWorker();
        } else if (this._data instanceof GenericWorker) {
            return this._data;
        } else {
            return new DataWorker(this._data);
        }
    }
};

var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
var removedFn = function () {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};

for(var i = 0; i < removedMethods.length; i++) {
    ZipObject.prototype[removedMethods[i]] = removedFn;
}
module.exports = ZipObject;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compressions = __webpack_require__(19);
var ZipFileWorker = __webpack_require__(53);

/**
 * Find the compression to use.
 * @param {String} fileCompression the compression defined at the file level, if any.
 * @param {String} zipCompression the compression defined at the load() level.
 * @return {Object} the compression object to use.
 */
var getCompression = function (fileCompression, zipCompression) {

    var compressionName = fileCompression || zipCompression;
    var compression = compressions[compressionName];
    if (!compression) {
        throw new Error(compressionName + " is not a valid compression method !");
    }
    return compression;
};

/**
 * Create a worker to generate a zip file.
 * @param {JSZip} zip the JSZip instance at the right root level.
 * @param {Object} options to generate the zip file.
 * @param {String} comment the comment to use.
 */
exports.generateWorker = function (zip, options, comment) {

    var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
    var entriesCount = 0;
    try {

        zip.forEach(function (relativePath, file) {
            entriesCount++;
            var compression = getCompression(file.options.compression, options.compression);
            var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
            var dir = file.dir, date = file.date;

            file._compressWorker(compression, compressionOptions)
            .withStreamInfo("file", {
                name : relativePath,
                dir : dir,
                date : date,
                comment : file.comment || "",
                unixPermissions : file.unixPermissions,
                dosPermissions : file.dosPermissions
            })
            .pipe(zipFileWorker);
        });
        zipFileWorker.entriesCount = entriesCount;
    } catch (e) {
        zipFileWorker.error(e);
    }

    return zipFileWorker;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var USE_TYPEDARRAY = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Uint32Array !== 'undefined');

var pako = __webpack_require__(44);
var utils = __webpack_require__(0);
var GenericWorker = __webpack_require__(1);

var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";

exports.magic = "\x08\x00";

/**
 * Create a worker that uses pako to inflate/deflate.
 * @constructor
 * @param {String} action the name of the pako function to call : either "Deflate" or "Inflate".
 * @param {Object} options the options to use when (de)compressing.
 */
function FlateWorker(action, options) {
    GenericWorker.call(this, "FlateWorker/" + action);

    this._pako = null;
    this._pakoAction = action;
    this._pakoOptions = options;
    // the `meta` object from the last chunk received
    // this allow this worker to pass around metadata
    this.meta = {};
}

utils.inherits(FlateWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
FlateWorker.prototype.processChunk = function (chunk) {
    this.meta = chunk.meta;
    if (this._pako === null) {
        this._createPako();
    }
    this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
};

/**
 * @see GenericWorker.flush
 */
FlateWorker.prototype.flush = function () {
    GenericWorker.prototype.flush.call(this);
    if (this._pako === null) {
        this._createPako();
    }
    this._pako.push([], true);
};
/**
 * @see GenericWorker.cleanUp
 */
FlateWorker.prototype.cleanUp = function () {
    GenericWorker.prototype.cleanUp.call(this);
    this._pako = null;
};

/**
 * Create the _pako object.
 * TODO: lazy-loading this object isn't the best solution but it's the
 * quickest. The best solution is to lazy-load the worker list. See also the
 * issue #446.
 */
FlateWorker.prototype._createPako = function () {
    this._pako = new pako[this._pakoAction]({
        raw: true,
        level: this._pakoOptions.level || -1 // default compression
    });
    var self = this;
    this._pako.onData = function(data) {
        self.push({
            data : data,
            meta : self.meta
        });
    };
};

exports.compressWorker = function (compressionOptions) {
    return new FlateWorker("Deflate", compressionOptions);
};
exports.uncompressWorker = function () {
    return new FlateWorker("Inflate", {});
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Top level file is just a mixin of submodules & constants


var assign    = __webpack_require__(3).assign;

var deflate   = __webpack_require__(45);
var inflate   = __webpack_require__(48);
var constants = __webpack_require__(24);

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var zlib_deflate = __webpack_require__(46);
var utils        = __webpack_require__(3);
var strings      = __webpack_require__(22);
var msg          = __webpack_require__(9);
var ZStream      = __webpack_require__(23);

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils   = __webpack_require__(3);
var trees   = __webpack_require__(47);
var adler32 = __webpack_require__(20);
var crc32   = __webpack_require__(21);
var msg     = __webpack_require__(9);

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

/* eslint-disable space-unary-ops */

var utils = __webpack_require__(3);

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var zlib_inflate = __webpack_require__(49);
var utils        = __webpack_require__(3);
var strings      = __webpack_require__(22);
var c            = __webpack_require__(24);
var msg          = __webpack_require__(9);
var ZStream      = __webpack_require__(23);
var GZheader     = __webpack_require__(52);

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);

  // Setup dictionary
  if (opt.dictionary) {
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) { //In raw mode we need to set the dictionary early
      status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== c.Z_OK) {
        throw new Error(msg[status]);
      }
    }
  }
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 aligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils         = __webpack_require__(3);
var adler32       = __webpack_require__(20);
var crc32         = __webpack_require__(21);
var inflate_fast  = __webpack_require__(50);
var inflate_table = __webpack_require__(51);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        state.flags = 0;           /* expect zlib header */
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f)/*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        }
        else if (len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }
        state.dmax = 1 << len;
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = hold & 0x200 ? DICTID : TYPE;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        else if (state.head) {
          state.head.extra = null/*Z_NULL*/;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) { copy = have; }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Array(state.head.extra_len);
              }
              utils.arraySet(
                state.head.extra,
                input,
                next,
                // extra field is limited to 65536 bytes
                // - no need for additional size check
                copy,
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) { break inf_leave; }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/)) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/)) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT;
        }
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = TYPE;
        /* falls through */
      case TYPE:
        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01)/*BITS(1)*/;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03)/*BITS(2)*/) {
          case 0:                             /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:                             /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_;             /* decode codes */
            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:                             /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) { copy = have; }
          if (copy > left) { copy = left; }
          if (copy === 0) { break inf_leave; }
          //--- zmemcpy(put, next, copy); ---
          utils.arraySet(output, input, next, copy, put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
//#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = { bits: state.lenbits };
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          }
          else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03);//BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            }
            else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f);//BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD) { break; }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = { bits: state.lenbits };
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = { bits: state.distbits };
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inflate_fast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
//#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) { break inf_leave; }
        copy = _out - left;
        if (state.offset > copy) {         /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          }
          else {
            from = state.wnext - copy;
          }
          if (copy > state.length) { copy = state.length; }
          from_source = state.window;
        }
        else {                              /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) { copy = left; }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) { state.mode = LEN; }
        break;
      case LIT:
        if (left === 0) { break inf_leave; }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            // Use '|' instead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if (_out) {
            strm.adler = state.check =
                /*UPDATE(state.check, put - _out, _out);*/
                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END;
        break inf_leave;
      case BAD:
        ret = Z_DATA_ERROR;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = __webpack_require__(3);

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var GenericWorker = __webpack_require__(1);
var utf8 = __webpack_require__(4);
var crc32 = __webpack_require__(8);
var signature = __webpack_require__(25);

/**
 * Transform an integer into a string in hexadecimal.
 * @private
 * @param {number} dec the number to convert.
 * @param {number} bytes the number of bytes to generate.
 * @returns {string} the result.
 */
var decToHex = function(dec, bytes) {
    var hex = "", i;
    for (i = 0; i < bytes; i++) {
        hex += String.fromCharCode(dec & 0xff);
        dec = dec >>> 8;
    }
    return hex;
};

/**
 * Generate the UNIX part of the external file attributes.
 * @param {Object} unixPermissions the unix permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
 *
 * TTTTsstrwxrwxrwx0000000000ADVSHR
 * ^^^^____________________________ file type, see zipinfo.c (UNX_*)
 *     ^^^_________________________ setuid, setgid, sticky
 *        ^^^^^^^^^________________ permissions
 *                 ^^^^^^^^^^______ not used ?
 *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
 */
var generateUnixExternalFileAttr = function (unixPermissions, isDir) {

    var result = unixPermissions;
    if (!unixPermissions) {
        // I can't use octal values in strict mode, hence the hexa.
        //  040775 => 0x41fd
        // 0100664 => 0x81b4
        result = isDir ? 0x41fd : 0x81b4;
    }
    return (result & 0xFFFF) << 16;
};

/**
 * Generate the DOS part of the external file attributes.
 * @param {Object} dosPermissions the dos permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * Bit 0     Read-Only
 * Bit 1     Hidden
 * Bit 2     System
 * Bit 3     Volume Label
 * Bit 4     Directory
 * Bit 5     Archive
 */
var generateDosExternalFileAttr = function (dosPermissions, isDir) {

    // the dir flag is already set for compatibility
    return (dosPermissions || 0)  & 0x3F;
};

/**
 * Generate the various parts used in the construction of the final zip file.
 * @param {Object} streamInfo the hash with informations about the compressed file.
 * @param {Boolean} streamedContent is the content streamed ?
 * @param {Boolean} streamingEnded is the stream finished ?
 * @param {number} offset the current offset from the start of the zip file.
 * @param {String} platform let's pretend we are this platform (change platform dependents fields)
 * @param {Function} encodeFileName the function to encode the file name / comment.
 * @return {Object} the zip parts.
 */
var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
    var file = streamInfo['file'],
    compression = streamInfo['compression'],
    useCustomEncoding = encodeFileName !== utf8.utf8encode,
    encodedFileName = utils.transformTo("string", encodeFileName(file.name)),
    utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
    comment = file.comment,
    encodedComment = utils.transformTo("string", encodeFileName(comment)),
    utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
    useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
    useUTF8ForComment = utfEncodedComment.length !== comment.length,
    dosTime,
    dosDate,
    extraFields = "",
    unicodePathExtraField = "",
    unicodeCommentExtraField = "",
    dir = file.dir,
    date = file.date;


    var dataInfo = {
        crc32 : 0,
        compressedSize : 0,
        uncompressedSize : 0
    };

    // if the content is streamed, the sizes/crc32 are only available AFTER
    // the end of the stream.
    if (!streamedContent || streamingEnded) {
        dataInfo.crc32 = streamInfo['crc32'];
        dataInfo.compressedSize = streamInfo['compressedSize'];
        dataInfo.uncompressedSize = streamInfo['uncompressedSize'];
    }

    var bitflag = 0;
    if (streamedContent) {
        // Bit 3: the sizes/crc32 are set to zero in the local header.
        // The correct values are put in the data descriptor immediately
        // following the compressed data.
        bitflag |= 0x0008;
    }
    if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
        // Bit 11: Language encoding flag (EFS).
        bitflag |= 0x0800;
    }


    var extFileAttr = 0;
    var versionMadeBy = 0;
    if (dir) {
        // dos or unix, we set the dos dir flag
        extFileAttr |= 0x00010;
    }
    if(platform === "UNIX") {
        versionMadeBy = 0x031E; // UNIX, version 3.0
        extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
    } else { // DOS or other, fallback to DOS
        versionMadeBy = 0x0014; // DOS, version 2.0
        extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
    }

    // date
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

    dosTime = date.getUTCHours();
    dosTime = dosTime << 6;
    dosTime = dosTime | date.getUTCMinutes();
    dosTime = dosTime << 5;
    dosTime = dosTime | date.getUTCSeconds() / 2;

    dosDate = date.getUTCFullYear() - 1980;
    dosDate = dosDate << 4;
    dosDate = dosDate | (date.getUTCMonth() + 1);
    dosDate = dosDate << 5;
    dosDate = dosDate | date.getUTCDate();

    if (useUTF8ForFileName) {
        // set the unicode path extra field. unzip needs at least one extra
        // field to correctly handle unicode path, so using the path is as good
        // as any other information. This could improve the situation with
        // other archive managers too.
        // This field is usually used without the utf8 flag, with a non
        // unicode path in the header (winrar, winzip). This helps (a bit)
        // with the messy Windows' default compressed folders feature but
        // breaks on p7zip which doesn't seek the unicode path extra field.
        // So for now, UTF-8 everywhere !
        unicodePathExtraField =
            // Version
            decToHex(1, 1) +
            // NameCRC32
            decToHex(crc32(encodedFileName), 4) +
            // UnicodeName
            utfEncodedFileName;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x70" +
            // size
            decToHex(unicodePathExtraField.length, 2) +
            // content
            unicodePathExtraField;
    }

    if(useUTF8ForComment) {

        unicodeCommentExtraField =
            // Version
            decToHex(1, 1) +
            // CommentCRC32
            decToHex(crc32(encodedComment), 4) +
            // UnicodeName
            utfEncodedComment;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x63" +
            // size
            decToHex(unicodeCommentExtraField.length, 2) +
            // content
            unicodeCommentExtraField;
    }

    var header = "";

    // version needed to extract
    header += "\x0A\x00";
    // general purpose bit flag
    header += decToHex(bitflag, 2);
    // compression method
    header += compression.magic;
    // last mod file time
    header += decToHex(dosTime, 2);
    // last mod file date
    header += decToHex(dosDate, 2);
    // crc-32
    header += decToHex(dataInfo.crc32, 4);
    // compressed size
    header += decToHex(dataInfo.compressedSize, 4);
    // uncompressed size
    header += decToHex(dataInfo.uncompressedSize, 4);
    // file name length
    header += decToHex(encodedFileName.length, 2);
    // extra field length
    header += decToHex(extraFields.length, 2);


    var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;

    var dirRecord = signature.CENTRAL_FILE_HEADER +
        // version made by (00: DOS)
        decToHex(versionMadeBy, 2) +
        // file header (common to file and central directory)
        header +
        // file comment length
        decToHex(encodedComment.length, 2) +
        // disk number start
        "\x00\x00" +
        // internal file attributes TODO
        "\x00\x00" +
        // external file attributes
        decToHex(extFileAttr, 4) +
        // relative offset of local header
        decToHex(offset, 4) +
        // file name
        encodedFileName +
        // extra field
        extraFields +
        // file comment
        encodedComment;

    return {
        fileRecord: fileRecord,
        dirRecord: dirRecord
    };
};

/**
 * Generate the EOCD record.
 * @param {Number} entriesCount the number of entries in the zip file.
 * @param {Number} centralDirLength the length (in bytes) of the central dir.
 * @param {Number} localDirLength the length (in bytes) of the local dir.
 * @param {String} comment the zip file comment as a binary string.
 * @param {Function} encodeFileName the function to encode the comment.
 * @return {String} the EOCD record.
 */
var generateCentralDirectoryEnd = function (entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
    var dirEnd = "";
    var encodedComment = utils.transformTo("string", encodeFileName(comment));

    // end of central dir signature
    dirEnd = signature.CENTRAL_DIRECTORY_END +
        // number of this disk
        "\x00\x00" +
        // number of the disk with the start of the central directory
        "\x00\x00" +
        // total number of entries in the central directory on this disk
        decToHex(entriesCount, 2) +
        // total number of entries in the central directory
        decToHex(entriesCount, 2) +
        // size of the central directory   4 bytes
        decToHex(centralDirLength, 4) +
        // offset of start of central directory with respect to the starting disk number
        decToHex(localDirLength, 4) +
        // .ZIP file comment length
        decToHex(encodedComment.length, 2) +
        // .ZIP file comment
        encodedComment;

    return dirEnd;
};

/**
 * Generate data descriptors for a file entry.
 * @param {Object} streamInfo the hash generated by a worker, containing informations
 * on the file entry.
 * @return {String} the data descriptors.
 */
var generateDataDescriptors = function (streamInfo) {
    var descriptor = "";
    descriptor = signature.DATA_DESCRIPTOR +
        // crc-32                          4 bytes
        decToHex(streamInfo['crc32'], 4) +
        // compressed size                 4 bytes
        decToHex(streamInfo['compressedSize'], 4) +
        // uncompressed size               4 bytes
        decToHex(streamInfo['uncompressedSize'], 4);

    return descriptor;
};


/**
 * A worker to concatenate other workers to create a zip file.
 * @param {Boolean} streamFiles `true` to stream the content of the files,
 * `false` to accumulate it.
 * @param {String} comment the comment to use.
 * @param {String} platform the platform to use, "UNIX" or "DOS".
 * @param {Function} encodeFileName the function to encode file names and comments.
 */
function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
    GenericWorker.call(this, "ZipFileWorker");
    // The number of bytes written so far. This doesn't count accumulated chunks.
    this.bytesWritten = 0;
    // The comment of the zip file
    this.zipComment = comment;
    // The platform "generating" the zip file.
    this.zipPlatform = platform;
    // the function to encode file names and comments.
    this.encodeFileName = encodeFileName;
    // Should we stream the content of the files ?
    this.streamFiles = streamFiles;
    // If `streamFiles` is false, we will need to accumulate the content of the
    // files to calculate sizes / crc32 (and write them *before* the content).
    // This boolean indicates if we are accumulating chunks (it will change a lot
    // during the lifetime of this worker).
    this.accumulate = false;
    // The buffer receiving chunks when accumulating content.
    this.contentBuffer = [];
    // The list of generated directory records.
    this.dirRecords = [];
    // The offset (in bytes) from the beginning of the zip file for the current source.
    this.currentSourceOffset = 0;
    // The total number of entries in this zip file.
    this.entriesCount = 0;
    // the name of the file currently being added, null when handling the end of the zip file.
    // Used for the emited metadata.
    this.currentFile = null;



    this._sources = [];
}
utils.inherits(ZipFileWorker, GenericWorker);

/**
 * @see GenericWorker.push
 */
ZipFileWorker.prototype.push = function (chunk) {

    var currentFilePercent = chunk.meta.percent || 0;
    var entriesCount = this.entriesCount;
    var remainingFiles = this._sources.length;

    if(this.accumulate) {
        this.contentBuffer.push(chunk);
    } else {
        this.bytesWritten += chunk.data.length;

        GenericWorker.prototype.push.call(this, {
            data : chunk.data,
            meta : {
                currentFile : this.currentFile,
                percent : entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
            }
        });
    }
};

/**
 * The worker started a new source (an other worker).
 * @param {Object} streamInfo the streamInfo object from the new source.
 */
ZipFileWorker.prototype.openedSource = function (streamInfo) {
    this.currentSourceOffset = this.bytesWritten;
    this.currentFile = streamInfo['file'].name;

    var streamedContent = this.streamFiles && !streamInfo['file'].dir;

    // don't stream folders (because they don't have any content)
    if(streamedContent) {
        var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        this.push({
            data : record.fileRecord,
            meta : {percent:0}
        });
    } else {
        // we need to wait for the whole file before pushing anything
        this.accumulate = true;
    }
};

/**
 * The worker finished a source (an other worker).
 * @param {Object} streamInfo the streamInfo object from the finished source.
 */
ZipFileWorker.prototype.closedSource = function (streamInfo) {
    this.accumulate = false;
    var streamedContent = this.streamFiles && !streamInfo['file'].dir;
    var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);

    this.dirRecords.push(record.dirRecord);
    if(streamedContent) {
        // after the streamed file, we put data descriptors
        this.push({
            data : generateDataDescriptors(streamInfo),
            meta : {percent:100}
        });
    } else {
        // the content wasn't streamed, we need to push everything now
        // first the file record, then the content
        this.push({
            data : record.fileRecord,
            meta : {percent:0}
        });
        while(this.contentBuffer.length) {
            this.push(this.contentBuffer.shift());
        }
    }
    this.currentFile = null;
};

/**
 * @see GenericWorker.flush
 */
ZipFileWorker.prototype.flush = function () {

    var localDirLength = this.bytesWritten;
    for(var i = 0; i < this.dirRecords.length; i++) {
        this.push({
            data : this.dirRecords[i],
            meta : {percent:100}
        });
    }
    var centralDirLength = this.bytesWritten - localDirLength;

    var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);

    this.push({
        data : dirEnd,
        meta : {percent:100}
    });
};

/**
 * Prepare the next source to be read.
 */
ZipFileWorker.prototype.prepareNextSource = function () {
    this.previous = this._sources.shift();
    this.openedSource(this.previous.streamInfo);
    if (this.isPaused) {
        this.previous.pause();
    } else {
        this.previous.resume();
    }
};

/**
 * @see GenericWorker.registerPrevious
 */
ZipFileWorker.prototype.registerPrevious = function (previous) {
    this._sources.push(previous);
    var self = this;

    previous.on('data', function (chunk) {
        self.processChunk(chunk);
    });
    previous.on('end', function () {
        self.closedSource(self.previous.streamInfo);
        if(self._sources.length) {
            self.prepareNextSource();
        } else {
            self.end();
        }
    });
    previous.on('error', function (e) {
        self.error(e);
    });
    return this;
};

/**
 * @see GenericWorker.resume
 */
ZipFileWorker.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if (!this.previous && this._sources.length) {
        this.prepareNextSource();
        return true;
    }
    if (!this.previous && !this._sources.length && !this.generatedError) {
        this.end();
        return true;
    }
};

/**
 * @see GenericWorker.error
 */
ZipFileWorker.prototype.error = function (e) {
    var sources = this._sources;
    if(!GenericWorker.prototype.error.call(this, e)) {
        return false;
    }
    for(var i = 0; i < sources.length; i++) {
        try {
            sources[i].error(e);
        } catch(e) {
            // the `error` exploded, nothing to do
        }
    }
    return true;
};

/**
 * @see GenericWorker.lock
 */
ZipFileWorker.prototype.lock = function () {
    GenericWorker.prototype.lock.call(this);
    var sources = this._sources;
    for(var i = 0; i < sources.length; i++) {
        sources[i].lock();
    }
};

module.exports = ZipFileWorker;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var GenericWorker = __webpack_require__(1);

/**
 * A worker that use a nodejs stream as source.
 * @constructor
 * @param {String} filename the name of the file entry for this stream.
 * @param {Readable} stream the nodejs stream.
 */
function NodejsStreamInputAdapter(filename, stream) {
    GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
    this._upstreamEnded = false;
    this._bindStream(stream);
}

utils.inherits(NodejsStreamInputAdapter, GenericWorker);

/**
 * Prepare the stream and bind the callbacks on it.
 * Do this ASAP on node 0.10 ! A lazy binding doesn't always work.
 * @param {Stream} stream the nodejs stream to use.
 */
NodejsStreamInputAdapter.prototype._bindStream = function (stream) {
    var self = this;
    this._stream = stream;
    stream.pause();
    stream
    .on("data", function (chunk) {
        self.push({
            data: chunk,
            meta : {
                percent : 0
            }
        });
    })
    .on("error", function (e) {
        if(self.isPaused) {
            this.generatedError = e;
        } else {
            self.error(e);
        }
    })
    .on("end", function () {
        if(self.isPaused) {
            self._upstreamEnded = true;
        } else {
            self.end();
        }
    });
};
NodejsStreamInputAdapter.prototype.pause = function () {
    if(!GenericWorker.prototype.pause.call(this)) {
        return false;
    }
    this._stream.pause();
    return true;
};
NodejsStreamInputAdapter.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if(this._upstreamEnded) {
        this.end();
    } else {
        this._stream.resume();
    }

    return true;
};

module.exports = NodejsStreamInputAdapter;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var utils = __webpack_require__(0);
var external = __webpack_require__(5);
var utf8 = __webpack_require__(4);
var utils = __webpack_require__(0);
var ZipEntries = __webpack_require__(56);
var Crc32Probe = __webpack_require__(18);
var nodejsUtils = __webpack_require__(6);

/**
 * Check the CRC32 of an entry.
 * @param {ZipEntry} zipEntry the zip entry to check.
 * @return {Promise} the result.
 */
function checkEntryCRC32(zipEntry) {
    return new external.Promise(function (resolve, reject) {
        var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
        worker.on("error", function (e) {
            reject(e);
        })
        .on("end", function () {
            if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
                reject(new Error("Corrupted zip : CRC32 mismatch"));
            } else {
                resolve();
            }
        })
        .resume();
    });
}

module.exports = function(data, options) {
    var zip = this;
    options = utils.extend(options || {}, {
        base64: false,
        checkCRC32: false,
        optimizedBinaryString: false,
        createFolders: false,
        decodeFileName: utf8.utf8decode
    });

    if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
    }

    return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64)
    .then(function(data) {
        var zipEntries = new ZipEntries(options);
        zipEntries.load(data);
        return zipEntries;
    }).then(function checkCRC32(zipEntries) {
        var promises = [external.Promise.resolve(zipEntries)];
        var files = zipEntries.files;
        if (options.checkCRC32) {
            for (var i = 0; i < files.length; i++) {
                promises.push(checkEntryCRC32(files[i]));
            }
        }
        return external.Promise.all(promises);
    }).then(function addFiles(results) {
        var zipEntries = results.shift();
        var files = zipEntries.files;
        for (var i = 0; i < files.length; i++) {
            var input = files[i];
            zip.file(input.fileNameStr, input.decompressed, {
                binary: true,
                optimizedBinaryString: true,
                date: input.date,
                dir: input.dir,
                comment : input.fileCommentStr.length ? input.fileCommentStr : null,
                unixPermissions : input.unixPermissions,
                dosPermissions : input.dosPermissions,
                createFolders: options.createFolders
            });
        }
        if (zipEntries.zipComment.length) {
            zip.comment = zipEntries.zipComment;
        }

        return zip;
    });
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var readerFor = __webpack_require__(26);
var utils = __webpack_require__(0);
var sig = __webpack_require__(25);
var ZipEntry = __webpack_require__(59);
var utf8 = __webpack_require__(4);
var support = __webpack_require__(2);
//  class ZipEntries {{{
/**
 * All the entries in the zip file.
 * @constructor
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntries(loadOptions) {
    this.files = [];
    this.loadOptions = loadOptions;
}
ZipEntries.prototype = {
    /**
     * Check that the reader is on the specified signature.
     * @param {string} expectedSignature the expected signature.
     * @throws {Error} if it is an other signature.
     */
    checkSignature: function(expectedSignature) {
        if (!this.reader.readAndCheckSignature(expectedSignature)) {
            this.reader.index -= 4;
            var signature = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
        }
    },
    /**
     * Check if the given signature is at the given index.
     * @param {number} askedIndex the index to check.
     * @param {string} expectedSignature the signature to expect.
     * @return {boolean} true if the signature is here, false otherwise.
     */
    isSignature: function(askedIndex, expectedSignature) {
        var currentIndex = this.reader.index;
        this.reader.setIndex(askedIndex);
        var signature = this.reader.readString(4);
        var result = signature === expectedSignature;
        this.reader.setIndex(currentIndex);
        return result;
    },
    /**
     * Read the end of the central directory.
     */
    readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2);
        this.diskWithCentralDirStart = this.reader.readInt(2);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
        this.centralDirRecords = this.reader.readInt(2);
        this.centralDirSize = this.reader.readInt(4);
        this.centralDirOffset = this.reader.readInt(4);

        this.zipCommentLength = this.reader.readInt(2);
        // warning : the encoding depends of the system locale
        // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
        // On a windows machine, this field is encoded with the localized windows code page.
        var zipComment = this.reader.readData(this.zipCommentLength);
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        // To get consistent behavior with the generation part, we will assume that
        // this is utf8 encoded unless specified otherwise.
        var decodeContent = utils.transformTo(decodeParamType, zipComment);
        this.zipComment = this.loadOptions.decodeFileName(decodeContent);
    },
    /**
     * Read the end of the Zip 64 central directory.
     * Not merged with the method readEndOfCentral :
     * The end of central can coexist with its Zip64 brother,
     * I don't want to read the wrong number of bytes !
     */
    readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8);
        this.reader.skip(4);
        // this.versionMadeBy = this.reader.readString(2);
        // this.versionNeeded = this.reader.readInt(2);
        this.diskNumber = this.reader.readInt(4);
        this.diskWithCentralDirStart = this.reader.readInt(4);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
        this.centralDirRecords = this.reader.readInt(8);
        this.centralDirSize = this.reader.readInt(8);
        this.centralDirOffset = this.reader.readInt(8);

        this.zip64ExtensibleData = {};
        var extraDataSize = this.zip64EndOfCentralSize - 44,
            index = 0,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;
        while (index < extraDataSize) {
            extraFieldId = this.reader.readInt(2);
            extraFieldLength = this.reader.readInt(4);
            extraFieldValue = this.reader.readData(extraFieldLength);
            this.zip64ExtensibleData[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Read the end of the Zip 64 central directory locator.
     */
    readBlockZip64EndOfCentralLocator: function() {
        this.diskWithZip64CentralDirStart = this.reader.readInt(4);
        this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
        this.disksCount = this.reader.readInt(4);
        if (this.disksCount > 1) {
            throw new Error("Multi-volumes zip are not supported");
        }
    },
    /**
     * Read the local files, based on the offset read in the central part.
     */
    readLocalFiles: function() {
        var i, file;
        for (i = 0; i < this.files.length; i++) {
            file = this.files[i];
            this.reader.setIndex(file.localHeaderOffset);
            this.checkSignature(sig.LOCAL_FILE_HEADER);
            file.readLocalPart(this.reader);
            file.handleUTF8();
            file.processAttributes();
        }
    },
    /**
     * Read the central directory.
     */
    readCentralDir: function() {
        var file;

        this.reader.setIndex(this.centralDirOffset);
        while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
            file = new ZipEntry({
                zip64: this.zip64
            }, this.loadOptions);
            file.readCentralPart(this.reader);
            this.files.push(file);
        }

        if (this.centralDirRecords !== this.files.length) {
            if (this.centralDirRecords !== 0 && this.files.length === 0) {
                // We expected some records but couldn't find ANY.
                // This is really suspicious, as if something went wrong.
                throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
            } else {
                // We found some records but not all.
                // Something is wrong but we got something for the user: no error here.
                // console.warn("expected", this.centralDirRecords, "records in central dir, got", this.files.length);
            }
        }
    },
    /**
     * Read the end of central directory.
     */
    readEndOfCentral: function() {
        var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
        if (offset < 0) {
            // Check if the content is a truncated zip or complete garbage.
            // A "LOCAL_FILE_HEADER" is not required at the beginning (auto
            // extractible zip for example) but it can give a good hint.
            // If an ajax request was used without responseType, we will also
            // get unreadable data.
            var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);

            if (isGarbage) {
                throw new Error("Can't find end of central directory : is this a zip file ? " +
                                "If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
            } else {
                throw new Error("Corrupted zip: can't find end of central directory");
            }

        }
        this.reader.setIndex(offset);
        var endOfCentralDirOffset = offset;
        this.checkSignature(sig.CENTRAL_DIRECTORY_END);
        this.readBlockEndOfCentral();


        /* extract from the zip spec :
            4)  If one of the fields in the end of central directory
                record is too small to hold required data, the field
                should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
                ZIP64 format record should be created.
            5)  The end of central directory record and the
                Zip64 end of central directory locator record must
                reside on the same disk when splitting or spanning
                an archive.
         */
        if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
            this.zip64 = true;

            /*
            Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
            the zip file can fit into a 32bits integer. This cannot be solved : JavaScript represents
            all numbers as 64-bit double precision IEEE 754 floating point numbers.
            So, we have 53bits for integers and bitwise operations treat everything as 32bits.
            see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
            and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
            */

            // should look for a zip64 EOCD locator
            offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            if (offset < 0) {
                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            }
            this.reader.setIndex(offset);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            this.readBlockZip64EndOfCentralLocator();

            // now the zip64 EOCD record
            if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
                // console.warn("ZIP64 end of central directory not where expected.");
                this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
                if (this.relativeOffsetEndOfZip64CentralDir < 0) {
                    throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                }
            }
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
            this.readBlockZip64EndOfCentral();
        }

        var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
        if (this.zip64) {
            expectedEndOfCentralDirOffset += 20; // end of central dir 64 locator
            expectedEndOfCentralDirOffset += 12 /* should not include the leading 12 bytes */ + this.zip64EndOfCentralSize;
        }

        var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;

        if (extraBytes > 0) {
            // console.warn(extraBytes, "extra bytes at beginning or within zipfile");
            if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {
                // The offsets seem wrong, but we have something at the specified offset.
                // So… we keep it.
            } else {
                // the offset is wrong, update the "zero" of the reader
                // this happens if data has been prepended (crx files for example)
                this.reader.zero = extraBytes;
            }
        } else if (extraBytes < 0) {
            throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
        }
    },
    prepareReader: function(data) {
        this.reader = readerFor(data);
    },
    /**
     * Read a zip file and create ZipEntries.
     * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
     */
    load: function(data) {
        this.prepareReader(data);
        this.readEndOfCentral();
        this.readCentralDir();
        this.readLocalFiles();
    }
};
// }}} end of ZipEntries
module.exports = ZipEntries;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DataReader = __webpack_require__(28);
var utils = __webpack_require__(0);

function StringReader(data) {
    DataReader.call(this, data);
}
utils.inherits(StringReader, DataReader);
/**
 * @see DataReader.byteAt
 */
StringReader.prototype.byteAt = function(i) {
    return this.data.charCodeAt(this.zero + i);
};
/**
 * @see DataReader.lastIndexOfSignature
 */
StringReader.prototype.lastIndexOfSignature = function(sig) {
    return this.data.lastIndexOf(sig) - this.zero;
};
/**
 * @see DataReader.readAndCheckSignature
 */
StringReader.prototype.readAndCheckSignature = function (sig) {
    var data = this.readData(4);
    return sig === data;
};
/**
 * @see DataReader.readData
 */
StringReader.prototype.readData = function(size) {
    this.checkOffset(size);
    // this will work because the constructor applied the "& 0xff" mask.
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = StringReader;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Uint8ArrayReader = __webpack_require__(29);
var utils = __webpack_require__(0);

function NodeBufferReader(data) {
    Uint8ArrayReader.call(this, data);
}
utils.inherits(NodeBufferReader, Uint8ArrayReader);

/**
 * @see DataReader.readData
 */
NodeBufferReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = NodeBufferReader;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var readerFor = __webpack_require__(26);
var utils = __webpack_require__(0);
var CompressedObject = __webpack_require__(7);
var crc32fn = __webpack_require__(8);
var utf8 = __webpack_require__(4);
var compressions = __webpack_require__(19);
var support = __webpack_require__(2);

var MADE_BY_DOS = 0x00;
var MADE_BY_UNIX = 0x03;

/**
 * Find a compression registered in JSZip.
 * @param {string} compressionMethod the method magic to find.
 * @return {Object|null} the JSZip compression object, null if none found.
 */
var findCompression = function(compressionMethod) {
    for (var method in compressions) {
        if (!compressions.hasOwnProperty(method)) {
            continue;
        }
        if (compressions[method].magic === compressionMethod) {
            return compressions[method];
        }
    }
    return null;
};

// class ZipEntry {{{
/**
 * An entry in the zip file.
 * @constructor
 * @param {Object} options Options of the current file.
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntry(options, loadOptions) {
    this.options = options;
    this.loadOptions = loadOptions;
}
ZipEntry.prototype = {
    /**
     * say if the file is encrypted.
     * @return {boolean} true if the file is encrypted, false otherwise.
     */
    isEncrypted: function() {
        // bit 1 is set
        return (this.bitFlag & 0x0001) === 0x0001;
    },
    /**
     * say if the file has utf-8 filename/comment.
     * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
     */
    useUTF8: function() {
        // bit 11 is set
        return (this.bitFlag & 0x0800) === 0x0800;
    },
    /**
     * Read the local part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readLocalPart: function(reader) {
        var compression, localExtraFieldsLength;

        // we already know everything from the central dir !
        // If the central dir data are false, we are doomed.
        // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
        // The less data we get here, the more reliable this should be.
        // Let's skip the whole header and dash to the data !
        reader.skip(22);
        // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
        // Strangely, the filename here is OK.
        // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
        // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
        // Search "unzip mismatching "local" filename continuing with "central" filename version" on
        // the internet.
        //
        // I think I see the logic here : the central directory is used to display
        // content and the local directory is used to extract the files. Mixing / and \
        // may be used to display \ to windows users and use / when extracting the files.
        // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
        this.fileNameLength = reader.readInt(2);
        localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
        // the fileName is stored as binary data, the handleUTF8 method will take care of the encoding.
        this.fileName = reader.readData(this.fileNameLength);
        reader.skip(localExtraFieldsLength);

        if (this.compressedSize === -1 || this.uncompressedSize === -1) {
            throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");
        }

        compression = findCompression(this.compressionMethod);
        if (compression === null) { // no compression found
            throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
        }
        this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
    },

    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readCentralPart: function(reader) {
        this.versionMadeBy = reader.readInt(2);
        reader.skip(2);
        // this.versionNeeded = reader.readInt(2);
        this.bitFlag = reader.readInt(2);
        this.compressionMethod = reader.readString(2);
        this.date = reader.readDate();
        this.crc32 = reader.readInt(4);
        this.compressedSize = reader.readInt(4);
        this.uncompressedSize = reader.readInt(4);
        var fileNameLength = reader.readInt(2);
        this.extraFieldsLength = reader.readInt(2);
        this.fileCommentLength = reader.readInt(2);
        this.diskNumberStart = reader.readInt(2);
        this.internalFileAttributes = reader.readInt(2);
        this.externalFileAttributes = reader.readInt(4);
        this.localHeaderOffset = reader.readInt(4);

        if (this.isEncrypted()) {
            throw new Error("Encrypted zip are not supported");
        }

        // will be read in the local part, see the comments there
        reader.skip(fileNameLength);
        this.readExtraFields(reader);
        this.parseZIP64ExtraField(reader);
        this.fileComment = reader.readData(this.fileCommentLength);
    },

    /**
     * Parse the external file attributes and get the unix/dos permissions.
     */
    processAttributes: function () {
        this.unixPermissions = null;
        this.dosPermissions = null;
        var madeBy = this.versionMadeBy >> 8;

        // Check if we have the DOS directory flag set.
        // We look for it in the DOS and UNIX permissions
        // but some unknown platform could set it as a compatibility flag.
        this.dir = this.externalFileAttributes & 0x0010 ? true : false;

        if(madeBy === MADE_BY_DOS) {
            // first 6 bits (0 to 5)
            this.dosPermissions = this.externalFileAttributes & 0x3F;
        }

        if(madeBy === MADE_BY_UNIX) {
            this.unixPermissions = (this.externalFileAttributes >> 16) & 0xFFFF;
            // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
        }

        // fail safe : if the name ends with a / it probably means a folder
        if (!this.dir && this.fileNameStr.slice(-1) === '/') {
            this.dir = true;
        }
    },

    /**
     * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
     * @param {DataReader} reader the reader to use.
     */
    parseZIP64ExtraField: function(reader) {

        if (!this.extraFields[0x0001]) {
            return;
        }

        // should be something, preparing the extra reader
        var extraReader = readerFor(this.extraFields[0x0001].value);

        // I really hope that these 64bits integer can fit in 32 bits integer, because js
        // won't let us have more.
        if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
            this.uncompressedSize = extraReader.readInt(8);
        }
        if (this.compressedSize === utils.MAX_VALUE_32BITS) {
            this.compressedSize = extraReader.readInt(8);
        }
        if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
            this.localHeaderOffset = extraReader.readInt(8);
        }
        if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
            this.diskNumberStart = extraReader.readInt(4);
        }
    },
    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readExtraFields: function(reader) {
        var end = reader.index + this.extraFieldsLength,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;

        if (!this.extraFields) {
            this.extraFields = {};
        }

        while (reader.index < end) {
            extraFieldId = reader.readInt(2);
            extraFieldLength = reader.readInt(2);
            extraFieldValue = reader.readData(extraFieldLength);

            this.extraFields[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Apply an UTF8 transformation if needed.
     */
    handleUTF8: function() {
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) {
            this.fileNameStr = utf8.utf8decode(this.fileName);
            this.fileCommentStr = utf8.utf8decode(this.fileComment);
        } else {
            var upath = this.findExtraFieldUnicodePath();
            if (upath !== null) {
                this.fileNameStr = upath;
            } else {
                // ASCII text or unsupported code page
                var fileNameByteArray =  utils.transformTo(decodeParamType, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
            }

            var ucomment = this.findExtraFieldUnicodeComment();
            if (ucomment !== null) {
                this.fileCommentStr = ucomment;
            } else {
                // ASCII text or unsupported code page
                var commentByteArray =  utils.transformTo(decodeParamType, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
            }
        }
    },

    /**
     * Find the unicode path declared in the extra field, if any.
     * @return {String} the unicode path, null otherwise.
     */
    findExtraFieldUnicodePath: function() {
        var upathField = this.extraFields[0x7075];
        if (upathField) {
            var extraReader = readerFor(upathField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the filename changed, this field is out of date.
            if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
                return null;
            }

            return utf8.utf8decode(extraReader.readData(upathField.length - 5));
        }
        return null;
    },

    /**
     * Find the unicode comment declared in the extra field, if any.
     * @return {String} the unicode comment, null otherwise.
     */
    findExtraFieldUnicodeComment: function() {
        var ucommentField = this.extraFields[0x6375];
        if (ucommentField) {
            var extraReader = readerFor(ucommentField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the comment changed, this field is out of date.
            if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
                return null;
            }

            return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
        }
        return null;
    }
};
module.exports = ZipEntry;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _editorRactive = __webpack_require__(62);

var _editorRactive2 = _interopRequireDefault(_editorRactive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Ractive.extend({
	components: {
		editor: _editorRactive2.default
	},
	template: '\n\t\t<div style="position: absolute;top: 30px;left: 10px;right: 0px;bottom:0px;">\n\t\t\t<div style="position: absolute;left: 0px;right:0px;top: 0px;height: 50px;">\n\t\t\t\t<div style="float: right;padding-top: 7px;">\n\t\t\t\t\t<a class="btn btn-sm btn-default disabled" > Delete </a>\n\t\t\t\t\t<a class="btn btn-sm btn-default" on-click="test" > Test </a>\n\t\t\t\t\t<a class="btn btn-sm btn-default" on-click="save" > Save </a>\n\t\t\t\t</div>\n\t\t\t\t<h4 style="color: #000;">{{name}}</h4>\n\t\t\t</div>\n\t\t\t<div style="position: absolute;left: 0px;right:0px;top: 40px;bottom: 0px;">\n\t\t\t\t<tabhead style="">\n\t\t\t\t\t<tab class=\'{{#if tab === "configuration" }}active{{/if}}\' on-click=\'@this.set("tab", "configuration")\'>Configuration</tab>\n\t\t\t\t\t<tab class=\'{{#if tab === "monitoring" }}active{{/if}}\' on-click=\'@this.set("tab", "monitoring")\'>Monitoring</tab>\n\t\t\t\t</tabhead>\n\n\t\t\t\t<tabcontent style="top: 50px;">\n\t\t\t\t\t<div style="box-shadow: 0 1px 1px 0 rgba(0,28,36,.5);border-top: 1px solid #eaeded;background-color: #fff">\n\n\t\t\t\t\t\t<div style="height: 50px;padding: 0px 10px;background-color: #fafafa;font-size: 18px;font-weight: bold;line-height: 50px;border-bottom: 1px solid #eaeded;">\n\t\t\t\t\t\t\tFunction code\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div style="padding: 10px;">\n\n\t\t\t\t\t\t\t{{#if function.Code.Location}}\n\t\t\t\t\t\t\t<editor\n\t\t\t\t\t\t\t\teditor_result_open={{editor_result_open}}\n\t\t\t\t\t\t\t\teditor_result_raw={{editor_result_raw}}\n\t\t\t\t\t\t\t\tzip-url={{function.Code.Location}}\n\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t{{/if}}\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t</tabcontent>\n\n\n\t\t\t</div>\n\n\n\n\n\n\n\n\n\t\t</div>\n\t',
	data: function data() {
		return {
			tab: 'configuration',
			busy: false,
			editor_result_open: false,
			editor_result_raw: ''
		};
	},

	get_function: function get_function(cb) {
		var ractive = this;
		var params = {
			FunctionName: this.get('name')
		};
		lambda.getFunction(params, function (err, data) {
			if (err) {
				alert('Failed getting function configuration');
				return cb(err);
			}

			console.log('getfunction', data);
			ractive.set({ function: data });
			cb(null, data);
		});
	},


	on: {
		init: function init() {
			var ractive = this;

			this.get_function(function (err, data) {});
		},
		// save: function() {
		// 	var ractive=this;
		//
		// 	var url = "http://localhost:8080/?proxyfile=" + encodeURIComponent( ractive.get('function').Code.Location )
		//
		// 	this.set({busy: true,})
		//
		// 	fetch(url, { mode: 'cors', cache: 'no-cache', })
		// 		.then(function(response) { return response.blob() })
		// 		.then(function(data) {
		// 			console.log("codebuff", data )
		// 			var new_zip = new JSZip();
		//
		// 			new_zip.loadAsync(data)
		// 			.then(function(contents) {
		//
		// 				console.log('zip loaded')
		//
		// 				new_zip.file("index.js", ractive.get('indexjs_content'))
		//
		// 				console.log("zip added index.js")
		// 				new_zip.generateAsync({
		// 					type:"blob",
		// 					//type: 'uint8array',
		// 					streamFiles: true,
		// 					compression: "DEFLATE",
		// 					compressionOptions: {level: 9}
		// 				})
		// 				.then(function(content) {
		//
		// 					console.log("zip regenerated")
		//
		// 					content.arrayBuffer().then(function(buff) {
		// 						console.log('save back buff', buff ) // content is blob
		//
		//
		// 						var params = {
		// 							FunctionName: ractive.get('name'),
		// 							Publish: true,
		// 							ZipFile: buff,
		// 						};
		// 						lambda.updateFunctionCode(params, function(err, data) {
		// 							if (err)
		// 								return alert('update code failed')
		//
		// 							ractive.set({busy: false,})
		// 							console.log(err,data)
		// 						});
		//
		// 					})
		//
		// 				});
		//
		//
		//
		//
		// 			});
		// 		})
		// },
		test: function test() {
			var ractive = this;
			this.set({ editor_result_open: true, editor_result_raw: '' });

			var ractive = this;
			var params = {
				FunctionName: ractive.get('name'),
				InvocationType: 'RequestResponse',
				LogType: "Tail",
				Payload: JSON.stringify({})
			};
			lambda.invoke(params, function (err, data) {
				if (err) {
					ractive.set({ editor_result_open: true, editor_result_raw: "Response:\n" + JSON.stringify(JSON.parse(err), null, "\t")
					});
					return;
				}

				ractive.set({ editor_result_open: true, editor_result_raw: "Response:\n" + JSON.stringify(JSON.parse(data.Payload), null, "\t") + "\n" + atob(data.LogResult)
				});
			});
		}
	}
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(10)):undefined}(window,function(i){return(o={},s.m=n=[function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},function(e,t){e.exports=i},function(e,t,i){"use strict";i.r(t);var n=i(2),s=i.n(n);i(4),i(5),i(6);t.default=s.a.extend({template:{v:4,t:[{t:7,e:"div",m:[{n:"id",f:"javascript-editor",t:13,g:1},{n:"class",f:[{t:2,r:"class"}],t:13},{n:"style",f:[{t:2,r:"style"}],t:13}],f:[{t:2,r:"value"}]}]},css:"",resize:function(){this.fire("resize")},on:{init:function(){},complete:function(){var e=this,n=ace.edit("javascript-editor",{mode:"ace/mode/javascript",theme:"ace/theme/iplastic",fontSize:this.get("font-size")||14,showInvisibles:this.get("show-invisibles")||!1,displayIndentGuides:this.get("show-indent-guides")||!1,readOnly:this.get("read-only")||!1,showPrintMargin:this.get("show-print-margin")||!1,tabSize:4,useSoftTabs:!1,useWorker:!1});n.getSession().on("change",function(){e.set({value:n.getSession().getValue()})}),this.observe("value",function(e,t,i){e!==n.getSession().getValue()&&(n.setValue(e),n.clearSelection())}),this.observe("font-size",function(e,t,i){n.setFontSize(parseInt(e))}),this.observe("show-invisibles",function(e,t,i){n.setShowInvisibles(e)}),this.observe("show-indent-guides",function(e,t,i){n.setDisplayIndentGuides(e)}),this.observe("show-print-margin",function(e,t,i){n.setShowPrintMargin(e)}),this.observe("read-only",function(e,t,i){n.setReadOnly(e)}),this.on("resize",function(){n.resize()}),this.set("editor",n)},teardown:function(){this.get("editor").destroy()}}})},function(e,t,b){(function(i){(function(){var e=function(){return this}();e||"undefined"==typeof window||(e=window);var o=function(e,t,i){"string"==typeof e?(2==arguments.length&&(i=t),o.modules[e]||(o.payloads[e]=i,o.modules[e]=null)):o.original?o.original.apply(this,arguments):(console.error("dropping module because define wasn't a string."),console.trace())};o.modules={},o.payloads={};function r(e,t,i){if("string"==typeof t){var n=c(e,t);if(null!=n)return i&&i(),n}else if("[object Array]"===Object.prototype.toString.call(t)){for(var s=[],o=0,r=t.length;o<r;++o){var a=c(e,t[o]);if(null==a&&l.original)return;s.push(a)}return i&&i.apply(null,s)||!0}}var t,i,l=function(e,t){var i=r("",e,t);return null==i&&l.original?l.original.apply(this,arguments):i},a=function(e,t){if(-1!==t.indexOf("!")){var i=t.split("!");return a(e,i[0])+"!"+a(e,i[1])}if("."==t.charAt(0))for(t=e.split("/").slice(0,-1).join("/")+"/"+t;-1!==t.indexOf(".")&&n!=t;){var n=t;t=t.replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}return t},c=function(e,i){i=a(e,i);var t=o.modules[i];if(!t){if("function"==typeof(t=o.payloads[i])){var n={},s={id:i,uri:"",exports:n,packaged:!0};n=t(function(e,t){return r(i,e,t)},n,s)||s.exports,o.modules[i]=n,delete o.payloads[i]}t=o.modules[i]=n||t}return t};i=e,(t="ace")&&(e[t]||(e[t]={}),i=e[t]),i.define&&i.define.packaged||(o.original=i.define,i.define=o,i.define.packaged=!0),i.require&&i.require.packaged||(l.original=i.require,i.require=l,i.require.packaged=!0)})(),ace.define("ace/lib/regexp",["require","exports","module"],function(e,t,i){"use strict";var n,o={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},r=void 0===o.exec.call(/()??/,"")[1],a=(n=/^/g,o.test.call(n,""),!n.lastIndex);a&&r||(RegExp.prototype.exec=function(e){var t,i,n=o.exec.apply(this,arguments);if("string"==typeof e&&n){if(!r&&1<n.length&&-1<function(e,t,i){if(Array.prototype.indexOf)return e.indexOf(t,i);for(var n=i||0;n<e.length;n++)if(e[n]===t)return n;return-1}(n,"")&&(i=RegExp(this.source,o.replace.call(function(e){return(e.global?"g":"")+(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":"")}(this),"g","")),o.replace.call(e.slice(n.index),i,function(){for(var e=1;e<arguments.length-2;e++)void 0===arguments[e]&&(n[e]=void 0)})),this._xregexp&&this._xregexp.captureNames)for(var s=1;s<n.length;s++)(t=this._xregexp.captureNames[s-1])&&(n[t]=n[s]);!a&&this.global&&!n[0].length&&this.lastIndex>n.index&&this.lastIndex--}return n},a||(RegExp.prototype.test=function(e){var t=o.exec.call(this,e);return t&&this.global&&!t[0].length&&this.lastIndex>t.index&&this.lastIndex--,!!t}))}),ace.define("ace/lib/es5-shim",["require","exports","module"],function(e,t,i){function o(){}function n(e){try{return Object.defineProperty(e,"sentinel",{}),"sentinel"in e}catch(e){}}function s(e){return(e=+e)!=e?e=0:0!==e&&e!==1/0&&e!==-1/0&&(e=(0<e||-1)*Math.floor(Math.abs(e))),e}Function.prototype.bind||(Function.prototype.bind=function(t){var i=this;if("function"!=typeof i)throw new TypeError("Function.prototype.bind called on incompatible "+i);var n=f.call(arguments,1),s=function(){if(this instanceof s){var e=i.apply(this,n.concat(f.call(arguments)));return Object(e)===e?e:this}return i.apply(t,n.concat(f.call(arguments)))};return i.prototype&&(o.prototype=i.prototype,s.prototype=new o,o.prototype=null),s});var r,a,l,c,h,u=Function.prototype.call,d=Array.prototype,g=Object.prototype,f=d.slice,m=u.bind(g.toString),p=u.bind(g.hasOwnProperty);if((h=p(g,"__defineGetter__"))&&(r=u.bind(g.__defineGetter__),a=u.bind(g.__defineSetter__),l=u.bind(g.__lookupGetter__),c=u.bind(g.__lookupSetter__)),2!=[1,2].splice(0).length)if(function(){function e(e){var t=new Array(e+2);return t[0]=t[1]=0,t}var t,i=[];if(i.splice.apply(i,e(20)),i.splice.apply(i,e(26)),t=i.length,i.splice(5,0,"XXX"),i.length,t+1==i.length)return 1}()){var v=Array.prototype.splice;Array.prototype.splice=function(e,t){return arguments.length?v.apply(this,[void 0===e?0:e,void 0===t?this.length-e:t].concat(f.call(arguments,2))):[]}}else Array.prototype.splice=function(e,t){var i=this.length;0<e?i<e&&(e=i):null==e?e=0:e<0&&(e=Math.max(i+e,0)),e+t<i||(t=i-e);var n=this.slice(e,e+t),s=f.call(arguments,2),o=s.length;if(e===i)o&&this.push.apply(this,s);else{var r=Math.min(t,i-e),a=e+r,l=a+o-r,c=i-a,h=i-r;if(l<a)for(var u=0;u<c;++u)this[l+u]=this[a+u];else if(a<l)for(u=c;u--;)this[l+u]=this[a+u];if(o&&e===h)this.length=h,this.push.apply(this,s);else for(this.length=h+o,u=0;u<o;++u)this[e+u]=s[u]}return n};Array.isArray||(Array.isArray=function(e){return"[object Array]"==m(e)});var w,b=Object("a"),y="a"!=b[0]||!(0 in b);if(Array.prototype.forEach||(Array.prototype.forEach=function(e){var t=M(this),i=y&&"[object String]"==m(this)?this.split(""):t,n=arguments[1],s=-1,o=i.length>>>0;if("[object Function]"!=m(e))throw new TypeError;for(;++s<o;)s in i&&e.call(n,i[s],s,t)}),Array.prototype.map||(Array.prototype.map=function(e){var t=M(this),i=y&&"[object String]"==m(this)?this.split(""):t,n=i.length>>>0,s=Array(n),o=arguments[1];if("[object Function]"!=m(e))throw new TypeError(e+" is not a function");for(var r=0;r<n;r++)r in i&&(s[r]=e.call(o,i[r],r,t));return s}),Array.prototype.filter||(Array.prototype.filter=function(e){var t,i=M(this),n=y&&"[object String]"==m(this)?this.split(""):i,s=n.length>>>0,o=[],r=arguments[1];if("[object Function]"!=m(e))throw new TypeError(e+" is not a function");for(var a=0;a<s;a++)a in n&&(t=n[a],e.call(r,t,a,i)&&o.push(t));return o}),Array.prototype.every||(Array.prototype.every=function(e){var t=M(this),i=y&&"[object String]"==m(this)?this.split(""):t,n=i.length>>>0,s=arguments[1];if("[object Function]"!=m(e))throw new TypeError(e+" is not a function");for(var o=0;o<n;o++)if(o in i&&!e.call(s,i[o],o,t))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(e){var t=M(this),i=y&&"[object String]"==m(this)?this.split(""):t,n=i.length>>>0,s=arguments[1];if("[object Function]"!=m(e))throw new TypeError(e+" is not a function");for(var o=0;o<n;o++)if(o in i&&e.call(s,i[o],o,t))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(e){var t=M(this),i=y&&"[object String]"==m(this)?this.split(""):t,n=i.length>>>0;if("[object Function]"!=m(e))throw new TypeError(e+" is not a function");if(!n&&1==arguments.length)throw new TypeError("reduce of empty array with no initial value");var s,o=0;if(2<=arguments.length)s=arguments[1];else for(;;){if(o in i){s=i[o++];break}if(++o>=n)throw new TypeError("reduce of empty array with no initial value")}for(;o<n;o++)o in i&&(s=e.call(void 0,s,i[o],o,t));return s}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(e){var t=M(this),i=y&&"[object String]"==m(this)?this.split(""):t,n=i.length>>>0;if("[object Function]"!=m(e))throw new TypeError(e+" is not a function");if(!n&&1==arguments.length)throw new TypeError("reduceRight of empty array with no initial value");var s,o=n-1;if(2<=arguments.length)s=arguments[1];else for(;;){if(o in i){s=i[o--];break}if(--o<0)throw new TypeError("reduceRight of empty array with no initial value")}for(;o in this&&(s=e.call(void 0,s,i[o],o,t)),o--;);return s}),Array.prototype.indexOf&&-1==[0,1].indexOf(1,2)||(Array.prototype.indexOf=function(e){var t=y&&"[object String]"==m(this)?this.split(""):M(this),i=t.length>>>0;if(!i)return-1;var n=0;for(1<arguments.length&&(n=s(arguments[1])),n=0<=n?n:Math.max(0,i+n);n<i;n++)if(n in t&&t[n]===e)return n;return-1}),Array.prototype.lastIndexOf&&-1==[0,1].lastIndexOf(0,-3)||(Array.prototype.lastIndexOf=function(e){var t=y&&"[object String]"==m(this)?this.split(""):M(this),i=t.length>>>0;if(!i)return-1;var n=i-1;for(1<arguments.length&&(n=Math.min(n,s(arguments[1]))),n=0<=n?n:i-Math.abs(n);0<=n;n--)if(n in t&&e===t[n])return n;return-1}),Object.getPrototypeOf||(Object.getPrototypeOf=function(e){return e.__proto__||(e.constructor?e.constructor.prototype:g)}),!Object.getOwnPropertyDescriptor){Object.getOwnPropertyDescriptor=function(e,t){if("object"!=typeof e&&"function"!=typeof e||null===e)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: "+e);if(p(e,t)){var i;if(i={enumerable:!0,configurable:!0},h){var n=e.__proto__;e.__proto__=g;var s=l(e,t),o=c(e,t);if(e.__proto__=n,s||o)return s&&(i.get=s),o&&(i.set=o),i}return i.value=e[t],i}}}Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(e){return Object.keys(e)}),Object.create||(w=null===Object.prototype.__proto__?function(){return{__proto__:null}}:function(){var e={};for(var t in e)e[t]=null;return e.constructor=e.hasOwnProperty=e.propertyIsEnumerable=e.isPrototypeOf=e.toLocaleString=e.toString=e.valueOf=e.__proto__=null,e},Object.create=function(e,t){var i;if(null===e)i=w();else{if("object"!=typeof e)throw new TypeError("typeof prototype["+typeof e+"] != 'object'");function n(){}n.prototype=e,(i=new n).__proto__=e}return void 0!==t&&Object.defineProperties(i,t),i});if(Object.defineProperty){var $=n({}),C="undefined"==typeof document||n(document.createElement("div"));if(!$||!C)var S=Object.defineProperty}if(!Object.defineProperty||S){Object.defineProperty=function(e,t,i){if("object"!=typeof e&&"function"!=typeof e||null===e)throw new TypeError("Object.defineProperty called on non-object: "+e);if("object"!=typeof i&&"function"!=typeof i||null===i)throw new TypeError("Property description must be an object: "+i);if(S)try{return S.call(Object,e,t,i)}catch(e){}if(p(i,"value"))if(h&&(l(e,t)||c(e,t))){var n=e.__proto__;e.__proto__=g,delete e[t],e[t]=i.value,e.__proto__=n}else e[t]=i.value;else{if(!h)throw new TypeError("getters & setters can not be defined on this javascript engine");p(i,"get")&&r(e,t,i.get),p(i,"set")&&a(e,t,i.set)}return e}}Object.defineProperties||(Object.defineProperties=function(e,t){for(var i in t)p(t,i)&&Object.defineProperty(e,i,t[i]);return e}),Object.seal||(Object.seal=function(e){return e}),Object.freeze||(Object.freeze=function(e){return e});try{Object.freeze(function(){})}catch(e){Object.freeze=function(t){return function(e){return"function"==typeof e?e:t(e)}}(Object.freeze)}if(Object.preventExtensions||(Object.preventExtensions=function(e){return e}),Object.isSealed||(Object.isSealed=function(e){return!1}),Object.isFrozen||(Object.isFrozen=function(e){return!1}),Object.isExtensible||(Object.isExtensible=function(e){if(Object(e)===e)throw new TypeError;for(var t="";p(e,t);)t+="?";e[t]=!0;var i=p(e,t);return delete e[t],i}),!Object.keys){var x=!0,A=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],k=A.length;for(var L in{toString:null})x=!1;Object.keys=function(e){if("object"!=typeof e&&"function"!=typeof e||null===e)throw new TypeError("Object.keys called on a non-object");var t=[];for(var i in e)p(e,i)&&t.push(i);if(x)for(var n=0,s=k;n<s;n++){var o=A[n];p(e,o)&&t.push(o)}return t}}Date.now||(Date.now=function(){return(new Date).getTime()});var R="\t\n\v\f\r                　\u2028\u2029\ufeff";if(!String.prototype.trim){R="["+R+"]";var E=new RegExp("^"+R+R+"*"),_=new RegExp(R+R+"*$");String.prototype.trim=function(){return String(this).replace(E,"").replace(_,"")}}var M=function(e){if(null==e)throw new TypeError("can't convert "+e+" to object");return Object(e)}}),ace.define("ace/lib/fixoldbrowsers",["require","exports","module","ace/lib/regexp","ace/lib/es5-shim"],function(e,t,i){"use strict";e("./regexp"),e("./es5-shim"),"undefined"==typeof Element||Element.prototype.remove||Object.defineProperty(Element.prototype,"remove",{enumerable:!1,writable:!0,configurable:!0,value:function(){this.parentNode&&this.parentNode.removeChild(this)}})}),ace.define("ace/lib/useragent",["require","exports","module"],function(e,t,i){"use strict";t.OS={LINUX:"LINUX",MAC:"MAC",WINDOWS:"WINDOWS"},t.getOS=function(){return t.isMac?t.OS.MAC:t.isLinux?t.OS.LINUX:t.OS.WINDOWS};var n="object"==typeof navigator?navigator:{},s=(/mac|win|linux/i.exec(n.platform)||["other"])[0].toLowerCase(),o=n.userAgent||"",r=n.appName||"";t.isWin="win"==s,t.isMac="mac"==s,t.isLinux="linux"==s,t.isIE="Microsoft Internet Explorer"==r||0<=r.indexOf("MSAppHost")?parseFloat((o.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1]):parseFloat((o.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/)||[])[1]),t.isOldIE=t.isIE&&t.isIE<9,t.isGecko=t.isMozilla=o.match(/ Gecko\/\d+/),t.isOpera="object"==typeof opera&&"[object Opera]"==Object.prototype.toString.call(window.opera),t.isWebKit=parseFloat(o.split("WebKit/")[1])||void 0,t.isChrome=parseFloat(o.split(" Chrome/")[1])||void 0,t.isEdge=parseFloat(o.split(" Edge/")[1])||void 0,t.isAIR=0<=o.indexOf("AdobeAIR"),t.isAndroid=0<=o.indexOf("Android"),t.isChromeOS=0<=o.indexOf(" CrOS "),t.isIOS=/iPad|iPhone|iPod/.test(o)&&!window.MSStream,t.isIOS&&(t.isMac=!0),t.isMobile=t.isIOS||t.isAndroid}),ace.define("ace/lib/dom",["require","exports","module","ace/lib/useragent"],function(e,a,t){"use strict";var i=e("./useragent");if(a.buildDom=function e(t,i,n){if("string"==typeof t&&t){var s=document.createTextNode(t);return i&&i.appendChild(s),s}if(!Array.isArray(t))return t;if("string"!=typeof t[0]||!t[0]){for(var o=[],r=0;r<t.length;r++){var a=e(t[r],i,n);a&&o.push(a)}return o}var l=document.createElement(t[0]),c=t[1],h=1;c&&"object"==typeof c&&!Array.isArray(c)&&(h=2);for(r=h;r<t.length;r++)e(t[r],l,n);return 2==h&&Object.keys(c).forEach(function(e){var t=c[e];"class"===e?l.className=Array.isArray(t)?t.join(" "):t:"function"==typeof t||"value"==e?l[e]=t:"ref"===e?n&&(n[t]=l):null!=t&&l.setAttribute(e,t)}),i&&i.appendChild(l),l},a.getDocumentHead=function(e){return(e=e||document).head||e.getElementsByTagName("head")[0]||e.documentElement},a.createElement=function(e,t){return document.createElementNS?document.createElementNS(t||"http://www.w3.org/1999/xhtml",e):document.createElement(e)},a.removeChildren=function(e){e.innerHTML=""},a.createTextNode=function(e,t){return(t?t.ownerDocument:document).createTextNode(e)},a.createFragment=function(e){return(e?e.ownerDocument:document).createDocumentFragment()},a.hasCssClass=function(e,t){return-1!==(e.className+"").split(/\s+/g).indexOf(t)},a.addCssClass=function(e,t){a.hasCssClass(e,t)||(e.className+=" "+t)},a.removeCssClass=function(e,t){for(var i=e.className.split(/\s+/g);;){var n=i.indexOf(t);if(-1==n)break;i.splice(n,1)}e.className=i.join(" ")},a.toggleCssClass=function(e,t){for(var i=e.className.split(/\s+/g),n=!0;;){var s=i.indexOf(t);if(-1==s)break;n=!1,i.splice(s,1)}return n&&i.push(t),e.className=i.join(" "),n},a.setCssClass=function(e,t,i){i?a.addCssClass(e,t):a.removeCssClass(e,t)},a.hasCssString=function(e,t){var i,n=0;if(i=(t=t||document).querySelectorAll("style"))for(;n<i.length;)if(i[n++].id===e)return!0},a.importCssString=function(e,t,i){var n=i;i&&i.getRootNode&&(n=i.getRootNode())&&n!=i||(n=document);var s=n.ownerDocument||n;if(t&&a.hasCssString(t,n))return null;t&&(e+="\n/*# sourceURL=ace/css/"+t+" */");var o=a.createElement("style");o.appendChild(s.createTextNode(e)),t&&(o.id=t),n==s&&(n=a.getDocumentHead(s)),n.insertBefore(o,n.firstChild)},a.importCssStylsheet=function(e,t){a.buildDom(["link",{rel:"stylesheet",href:e}],a.getDocumentHead(t))},a.scrollbarWidth=function(e){var t=a.createElement("ace_inner");t.style.width="100%",t.style.minWidth="0px",t.style.height="200px",t.style.display="block";var i=a.createElement("ace_outer"),n=i.style;n.position="absolute",n.left="-10000px",n.overflow="hidden",n.width="200px",n.minWidth="0px",n.height="150px",n.display="block",i.appendChild(t);var s=e.documentElement;s.appendChild(i);var o=t.offsetWidth;n.overflow="scroll";var r=t.offsetWidth;return o==r&&(r=i.clientWidth),s.removeChild(i),o-r},"undefined"==typeof document&&(a.importCssString=function(){}),a.computedStyle=function(e,t){return window.getComputedStyle(e,"")||{}},a.setStyle=function(e,t,i){e[t]!==i&&(e[t]=i)},a.HAS_CSS_ANIMATION=!1,a.HAS_CSS_TRANSFORMS=!1,a.HI_DPI=!i.isWin||"undefined"!=typeof window&&1.5<=window.devicePixelRatio,"undefined"!=typeof document){var n=document.createElement("div");a.HI_DPI&&void 0!==n.style.transform&&(a.HAS_CSS_TRANSFORMS=!0),i.isEdge||void 0===n.style.animationName||(a.HAS_CSS_ANIMATION=!0),n=null}a.HAS_CSS_TRANSFORMS?a.translate=function(e,t,i){e.style.transform="translate("+Math.round(t)+"px, "+Math.round(i)+"px)"}:a.translate=function(e,t,i){e.style.top=Math.round(i)+"px",e.style.left=Math.round(t)+"px"}}),ace.define("ace/lib/oop",["require","exports","module"],function(e,i,t){"use strict";i.inherits=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})},i.mixin=function(e,t){for(var i in t)e[i]=t[i];return e},i.implement=function(e,t){i.mixin(e,t)}}),ace.define("ace/lib/keys",["require","exports","module","ace/lib/oop"],function(e,t,i){"use strict";var n=e("./oop"),s=function(){var e,t,i={MODIFIER_KEYS:{16:"Shift",17:"Ctrl",18:"Alt",224:"Meta",91:"MetaLeft",92:"MetaRight",93:"ContextMenu"},KEY_MODS:{ctrl:1,alt:2,option:2,shift:4,super:8,meta:8,command:8,cmd:8},FUNCTION_KEYS:{8:"Backspace",9:"Tab",13:"Return",19:"Pause",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"Print",45:"Insert",46:"Delete",96:"Numpad0",97:"Numpad1",98:"Numpad2",99:"Numpad3",100:"Numpad4",101:"Numpad5",102:"Numpad6",103:"Numpad7",104:"Numpad8",105:"Numpad9","-13":"NumpadEnter",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Numlock",145:"Scrolllock"},PRINTABLE_KEYS:{32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",111:"/",106:"*"}};for(t in i.FUNCTION_KEYS)e=i.FUNCTION_KEYS[t].toLowerCase(),i[e]=parseInt(t,10);for(t in i.PRINTABLE_KEYS)e=i.PRINTABLE_KEYS[t].toLowerCase(),i[e]=parseInt(t,10);return n.mixin(i,i.MODIFIER_KEYS),n.mixin(i,i.PRINTABLE_KEYS),n.mixin(i,i.FUNCTION_KEYS),i.enter=i.return,i.escape=i.esc,i.del=i.delete,i[173]="-",function(){for(var e=["cmd","ctrl","alt","shift"],t=Math.pow(2,e.length);t--;)i.KEY_MODS[t]=e.filter(function(e){return t&i.KEY_MODS[e]}).join("-")+"-"}(),i.KEY_MODS[0]="",i.KEY_MODS[-1]="input-",i}();n.mixin(t,s),t.keyCodeToString=function(e){var t=s[e];return"string"!=typeof t&&(t=String.fromCharCode(e)),t.toLowerCase()}}),ace.define("ace/lib/event",["require","exports","module","ace/lib/keys","ace/lib/useragent"],function(e,u,t){"use strict";function o(e,t,i){var n=h(t);if(!d.isMac&&l){if(t.getModifierState&&(t.getModifierState("OS")||t.getModifierState("Win"))&&(n|=8),l.altGr){if(3==(3&n))return;l.altGr=0}if(18===i||17===i){var s="location"in t?t.location:t.keyLocation;if(17===i&&1===s)1==l[i]&&(c=t.timeStamp);else if(18===i&&3===n&&2===s){t.timeStamp-c<50&&(l.altGr=!0)}}}if((i in a.MODIFIER_KEYS&&(i=-1),!n&&13===i)&&(3===(s="location"in t?t.location:t.keyLocation)&&(e(t,n,-i),t.defaultPrevented)))return;if(d.isChromeOS&&8&n){if(e(t,n,i),t.defaultPrevented)return;n&=-9}return!!(n||i in a.FUNCTION_KEYS||i in a.PRINTABLE_KEYS)&&e(t,n,i)}function r(){l=Object.create(null)}var a=e("./keys"),d=e("./useragent"),l=null,c=0;u.addListener=function(e,t,i){if(e.addEventListener)return e.addEventListener(t,i,!1);if(e.attachEvent){var n=function(){i.call(e,window.event)};i._wrapper=n,e.attachEvent("on"+t,n)}},u.removeListener=function(e,t,i){if(e.removeEventListener)return e.removeEventListener(t,i,!1);e.detachEvent&&e.detachEvent("on"+t,i._wrapper||i)},u.stopEvent=function(e){return u.stopPropagation(e),u.preventDefault(e),!1},u.stopPropagation=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},u.preventDefault=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},u.getButton=function(e){return"dblclick"==e.type?0:"contextmenu"==e.type||d.isMac&&e.ctrlKey&&!e.altKey&&!e.shiftKey?2:e.preventDefault?e.button:{1:0,2:2,4:1}[e.button]},u.capture=function(e,t,i){function n(e){t&&t(e),i&&i(e),u.removeListener(document,"mousemove",t,!0),u.removeListener(document,"mouseup",n,!0),u.removeListener(document,"dragstart",n,!0)}return u.addListener(document,"mousemove",t,!0),u.addListener(document,"mouseup",n,!0),u.addListener(document,"dragstart",n,!0),n},u.addMouseWheelListener=function(e,t){"onmousewheel"in e?u.addListener(e,"mousewheel",function(e){void 0!==e.wheelDeltaX?(e.wheelX=-e.wheelDeltaX/8,e.wheelY=-e.wheelDeltaY/8):(e.wheelX=0,e.wheelY=-e.wheelDelta/8),t(e)}):"onwheel"in e?u.addListener(e,"wheel",function(e){switch(e.deltaMode){case e.DOM_DELTA_PIXEL:e.wheelX=.35*e.deltaX||0,e.wheelY=.35*e.deltaY||0;break;case e.DOM_DELTA_LINE:case e.DOM_DELTA_PAGE:e.wheelX=5*(e.deltaX||0),e.wheelY=5*(e.deltaY||0)}t(e)}):u.addListener(e,"DOMMouseScroll",function(e){e.axis&&e.axis==e.HORIZONTAL_AXIS?(e.wheelX=5*(e.detail||0),e.wheelY=0):(e.wheelX=0,e.wheelY=5*(e.detail||0)),t(e)})},u.addMultiMouseDownListener=function(e,i,n,s){function t(e){if(0!==u.getButton(e)?c=0:1<e.detail?4<++c&&(c=1):c=1,d.isIE){var t=5<Math.abs(e.clientX-r)||5<Math.abs(e.clientY-a);l&&!t||(c=1),l&&clearTimeout(l),l=setTimeout(function(){l=null},i[c-1]||600),1==c&&(r=e.clientX,a=e.clientY)}if(e._clicks=c,n[s]("mousedown",e),4<c)c=0;else if(1<c)return n[s](h[c],e)}function o(e){c=2,l&&clearTimeout(l),l=setTimeout(function(){l=null},i[c-1]||600),n[s]("mousedown",e),n[s](h[c],e)}var r,a,l,c=0,h={2:"dblclick",3:"tripleclick",4:"quadclick"};Array.isArray(e)||(e=[e]),e.forEach(function(e){u.addListener(e,"mousedown",t),d.isOldIE&&u.addListener(e,"dblclick",o)})};var h=!d.isMac||!d.isOpera||"KeyboardEvent"in window?function(e){return 0|(e.ctrlKey?1:0)|(e.altKey?2:0)|(e.shiftKey?4:0)|(e.metaKey?8:0)}:function(e){return 0|(e.metaKey?1:0)|(e.altKey?2:0)|(e.shiftKey?4:0)|(e.ctrlKey?8:0)};if(u.getModifierString=function(e){return a.KEY_MODS[h(e)]},u.addCommandKeyListener=function(e,i){var t=u.addListener;if(d.isOldGecko||d.isOpera&&!("KeyboardEvent"in window)){var n=null;t(e,"keydown",function(e){n=e.keyCode}),t(e,"keypress",function(e){return o(i,e,n)})}else{var s=null;t(e,"keydown",function(e){l[e.keyCode]=(l[e.keyCode]||0)+1;var t=o(i,e,e.keyCode);return s=e.defaultPrevented,t}),t(e,"keypress",function(e){s&&(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey)&&(u.stopEvent(e),s=null)}),t(e,"keyup",function(e){l[e.keyCode]=null}),l||(r(),t(window,"focus",r))}},"object"==typeof window&&window.postMessage&&!d.isOldIE){var g=1;u.nextTick=function(t,i){i=i||window;var n="zero-timeout-message-"+g++,s=function(e){e.data==n&&(u.stopPropagation(e),u.removeListener(i,"message",s),t())};u.addListener(i,"message",s),i.postMessage(n,"*")}}u.$idleBlocked=!1,u.onIdle=function(t,e){return setTimeout(function e(){u.$idleBlocked?setTimeout(e,100):t()},e)},u.$idleBlockId=null,u.blockIdle=function(e){u.$idleBlockId&&clearTimeout(u.$idleBlockId),u.$idleBlocked=!0,u.$idleBlockId=setTimeout(function(){u.$idleBlocked=!1},e||100)},u.nextFrame="object"==typeof window&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame),u.nextFrame?u.nextFrame=u.nextFrame.bind(window):u.nextFrame=function(e){setTimeout(e,17)}}),ace.define("ace/range",["require","exports","module"],function(e,t,i){"use strict";function o(e,t,i,n){this.start={row:e,column:t},this.end={row:i,column:n}}(function(){this.isEqual=function(e){return this.start.row===e.start.row&&this.end.row===e.end.row&&this.start.column===e.start.column&&this.end.column===e.end.column},this.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},this.contains=function(e,t){return 0==this.compare(e,t)},this.compareRange=function(e){var t,i=e.end,n=e.start;return 1==(t=this.compare(i.row,i.column))?1==(t=this.compare(n.row,n.column))?2:0==t?1:0:-1==t?-2:-1==(t=this.compare(n.row,n.column))?-1:1==t?42:0},this.comparePoint=function(e){return this.compare(e.row,e.column)},this.containsRange=function(e){return 0==this.comparePoint(e.start)&&0==this.comparePoint(e.end)},this.intersects=function(e){var t=this.compareRange(e);return-1==t||0==t||1==t},this.isEnd=function(e,t){return this.end.row==e&&this.end.column==t},this.isStart=function(e,t){return this.start.row==e&&this.start.column==t},this.setStart=function(e,t){"object"==typeof e?(this.start.column=e.column,this.start.row=e.row):(this.start.row=e,this.start.column=t)},this.setEnd=function(e,t){"object"==typeof e?(this.end.column=e.column,this.end.row=e.row):(this.end.row=e,this.end.column=t)},this.inside=function(e,t){return 0==this.compare(e,t)&&(!this.isEnd(e,t)&&!this.isStart(e,t))},this.insideStart=function(e,t){return 0==this.compare(e,t)&&!this.isEnd(e,t)},this.insideEnd=function(e,t){return 0==this.compare(e,t)&&!this.isStart(e,t)},this.compare=function(e,t){return this.isMultiLine()||e!==this.start.row?e<this.start.row?-1:e>this.end.row?1:this.start.row===e?t>=this.start.column?0:-1:this.end.row===e?t<=this.end.column?0:1:0:t<this.start.column?-1:t>this.end.column?1:0},this.compareStart=function(e,t){return this.start.row==e&&this.start.column==t?-1:this.compare(e,t)},this.compareEnd=function(e,t){return this.end.row==e&&this.end.column==t?1:this.compare(e,t)},this.compareInside=function(e,t){return this.end.row==e&&this.end.column==t?1:this.start.row==e&&this.start.column==t?-1:this.compare(e,t)},this.clipRows=function(e,t){if(this.end.row>t)var i={row:t+1,column:0};else if(this.end.row<e)i={row:e,column:0};if(this.start.row>t)var n={row:t+1,column:0};else if(this.start.row<e)n={row:e,column:0};return o.fromPoints(n||this.start,i||this.end)},this.extend=function(e,t){var i=this.compare(e,t);if(0==i)return this;if(-1==i)var n={row:e,column:t};else var s={row:e,column:t};return o.fromPoints(n||this.start,s||this.end)},this.isEmpty=function(){return this.start.row===this.end.row&&this.start.column===this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return o.fromPoints(this.start,this.end)},this.collapseRows=function(){return 0==this.end.column?new o(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new o(this.start.row,0,this.end.row,0)},this.toScreenRange=function(e){var t=e.documentToScreenPosition(this.start),i=e.documentToScreenPosition(this.end);return new o(t.row,t.column,i.row,i.column)},this.moveBy=function(e,t){this.start.row+=e,this.start.column+=t,this.end.row+=e,this.end.column+=t}}).call(o.prototype),o.fromPoints=function(e,t){return new o(e.row,e.column,t.row,t.column)},o.comparePoints=function(e,t){return e.row-t.row||e.column-t.column},o.comparePoints=function(e,t){return e.row-t.row||e.column-t.column},t.Range=o}),ace.define("ace/lib/lang",["require","exports","module"],function(e,t,i){"use strict";t.last=function(e){return e[e.length-1]},t.stringReverse=function(e){return e.split("").reverse().join("")},t.stringRepeat=function(e,t){for(var i="";0<t;)1&t&&(i+=e),(t>>=1)&&(e+=e);return i};var n=/^\s\s*/,s=/\s\s*$/;t.stringTrimLeft=function(e){return e.replace(n,"")},t.stringTrimRight=function(e){return e.replace(s,"")},t.copyObject=function(e){var t={};for(var i in e)t[i]=e[i];return t},t.copyArray=function(e){for(var t=[],i=0,n=e.length;i<n;i++)e[i]&&"object"==typeof e[i]?t[i]=this.copyObject(e[i]):t[i]=e[i];return t},t.deepCopy=function e(t){if("object"!=typeof t||!t)return t;var i;if(Array.isArray(t)){i=[];for(var n=0;n<t.length;n++)i[n]=e(t[n]);return i}if("[object Object]"!==Object.prototype.toString.call(t))return t;for(var n in i={},t)i[n]=e(t[n]);return i},t.arrayToMap=function(e){for(var t={},i=0;i<e.length;i++)t[e[i]]=1;return t},t.createMap=function(e){var t=Object.create(null);for(var i in e)t[i]=e[i];return t},t.arrayRemove=function(e,t){for(var i=0;i<=e.length;i++)t===e[i]&&e.splice(i,1)},t.escapeRegExp=function(e){return e.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},t.escapeHTML=function(e){return(""+e).replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;")},t.getMatchOffsets=function(e,t){var i=[];return e.replace(t,function(e){i.push({offset:arguments[arguments.length-2],length:e.length})}),i},t.deferredCall=function(e){function t(){i=null,e()}var i=null,n=function(e){return n.cancel(),i=setTimeout(t,e||0),n};return(n.schedule=n).call=function(){return this.cancel(),e(),n},n.cancel=function(){return clearTimeout(i),i=null,n},n.isPending=function(){return i},n},t.delayedCall=function(e,t){function i(){s=null,e()}function n(e){null==s&&(s=setTimeout(i,e||t))}var s=null;return n.delay=function(e){s&&clearTimeout(s),s=setTimeout(i,e||t)},(n.schedule=n).call=function(){this.cancel(),e()},n.cancel=function(){s&&clearTimeout(s),s=null},n.isPending=function(){return s},n}}),ace.define("ace/clipboard",["require","exports","module"],function(e,t,i){"use strict";var n;i.exports={lineMode:!1,pasteCancelled:function(){return!!(n&&n>Date.now()-50)||(n=!1)},cancel:function(){n=Date.now()}}}),ace.define("ace/keyboard/textinput",["require","exports","module","ace/lib/event","ace/lib/useragent","ace/lib/dom","ace/lib/lang","ace/clipboard","ace/lib/keys"],function(e,t,i){"use strict";var B=e("../lib/event"),D=e("../lib/useragent"),P=e("../lib/dom"),H=e("../lib/lang"),N=e("../clipboard"),z=D.isChrome<18,V=D.isIE,U=63<D.isChrome,K=e("../lib/keys"),G=K.KEY_MODS,j=D.isIOS,q=j?/\s/:/\n/;t.TextInput=function(e,u){function i(){t=!0,d.blur(),d.focus(),t=!1}function l(){clearTimeout(M),M=setTimeout(function(){h&&(d.style.cssText=h,h=""),u.renderer.$isMousePressed=!1,u.renderer.$keepTextAreaAtCursor&&u.renderer.$moveTextAreaToCursor()},0)}var d=P.createElement("textarea");d.className="ace_text-input",d.setAttribute("wrap","off"),d.setAttribute("autocorrect","off"),d.setAttribute("autocapitalize","off"),d.setAttribute("spellcheck",!1),d.style.opacity="0",e.insertBefore(d,e.firstChild);var r=!1,g=!1,c=!1,f=!1,h="";D.isMobile||(d.style.fontSize="1px");var m=!1,t=!1,p="",v=0,w=0,b=0;try{var y=document.activeElement===d}catch(e){}B.addListener(d,"blur",function(e){t||(u.onBlur(e),y=!1)}),B.addListener(d,"focus",function(e){if(!t){if(y=!0,D.isEdge)try{if(!document.hasFocus())return}catch(e){}u.onFocus(e),D.isEdge?setTimeout($):$()}}),this.$focusScroll=!1,this.focus=function(){if(h||U||"browser"==this.$focusScroll)return d.focus({preventScroll:!0});var e=d.style.top;d.style.position="fixed",d.style.top="0px";try{var t=0!=d.getBoundingClientRect().top}catch(e){return}var i=[];if(t)for(var n=d.parentElement;n&&1==n.nodeType;)i.push(n),n.setAttribute("ace_nocontext",!0),n=!n.parentElement&&n.getRootNode?n.getRootNode().host:n.parentElement;d.focus({preventScroll:!0}),t&&i.forEach(function(e){e.removeAttribute("ace_nocontext")}),setTimeout(function(){d.style.position="","0px"==d.style.top&&(d.style.top=e)},0)},this.blur=function(){d.blur()},this.isFocused=function(){return y},u.on("beforeEndOperation",function(){u.curOp&&"insertstring"==u.curOp.command.name||(c&&(p=d.value="",R()),$())});var $=j?function(e){if(y&&(!r||e)&&!f){var t="\n ab"+(e=e||"")+"cde fg\n";t!=d.value&&(d.value=p=t);var i=4+(e.length||(u.selection.isEmpty()?0:1));4==v&&w==i||d.setSelectionRange(4,i),v=4,w=i}}:function(){if(!c&&!f&&(y||A)){c=!0;var e=u.selection,t=e.getRange(),i=e.cursor.row,n=t.start.column,s=t.end.column,o=u.session.getLine(i);if(t.start.row!=i){var r=u.session.getLine(i-1);n=t.start.row<i-1?0:n,s+=r.length+1,o=r+"\n"+o}else if(t.end.row!=i){var a=u.session.getLine(i+1);s=t.end.row>i+1?a.length:s,s+=o.length+1,o=o+"\n"+a}400<o.length&&(n<400&&s<400?o=o.slice(0,400):(o="\n",n=0,s=1));var l=o+"\n\n";if(l!=p&&(d.value=p=l,v=w=l.length),A&&(v=d.selectionStart,w=d.selectionEnd),w!=s||v!=n||d.selectionEnd!=w)try{d.setSelectionRange(n,s),v=n,w=s}catch(e){}c=!1}};y&&u.onFocus();var n=null;this.setInputHandler=function(e){n=e};function s(e,t){if(A=A&&!1,g)return $(),e&&u.onPaste(e),g=!1,"";for(var i=d.selectionStart,n=d.selectionEnd,s=v,o=p.length-w,r=e,a=e.length-i,l=e.length-n,c=0;0<s&&p[c]==e[c];)c++,s--;for(r=r.slice(c),c=1;0<o&&p.length-c>v-1&&p[p.length-c]==e[e.length-c];)c++,o--;a-=c-1,l-=c-1;var h=r.length-c+1;return h<0&&(s=-h,h=0),r=r.slice(0,h),t||r||a||s||o||l?(f=!0,r&&!s&&!o&&!a&&!l||m?u.onTextInput(r):u.onTextInput(r,{extendLeft:s,extendRight:o,restoreStart:a,restoreEnd:l}),f=!1,p=e,v=i,w=n,b=l,r):""}function o(e){if(c)return L();if(e&&e.inputType){if("historyUndo"==e.inputType)return u.execCommand("undo");if("historyRedo"==e.inputType)return u.execCommand("redo")}var t=d.value,i=s(t,!0);(500<t.length||q.test(i))&&$()}function a(e,t){var i=u.getCopyText();if(!i)return B.preventDefault(e);k(e,i)?(j&&($(i),r=i,setTimeout(function(){r=!1},10)),t?u.onCut():u.onCopy(),B.preventDefault(e)):(r=!0,d.value=i,d.select(),setTimeout(function(){r=!1,$(),t?u.onCut():u.onCopy()}))}function C(e){a(e,!0)}function S(e){a(e,!1)}function x(e){var t=k(e);N.pasteCancelled()||("string"==typeof t?(t&&u.onPaste(t,e),D.isIE&&setTimeout($),B.preventDefault(e)):(d.value="",g=!0))}var A=!(this.getInputHandler=function(){return n}),k=function(e,t,i){var n=e.clipboardData||window.clipboardData;if(n&&!z){var s=V||i?"Text":"text/plain";try{return t?!1!==n.setData(s,t):n.getData(s)}catch(e){if(!i)return k(e,t,!0)}}};B.addCommandKeyListener(d,u.onCommandKey.bind(u)),B.addListener(d,"select",function(e){c||(r?r=!1:function(e){return 0===e.selectionStart&&e.selectionEnd>=p.length&&e.value===p&&p&&e.selectionEnd!==w}(d)&&(u.selectAll(),$()))}),B.addListener(d,"input",o),B.addListener(d,"cut",C),B.addListener(d,"copy",S),B.addListener(d,"paste",x),"oncut"in d&&"oncopy"in d&&"onpaste"in d||B.addListener(e,"keydown",function(e){if((!D.isMac||e.metaKey)&&e.ctrlKey)switch(e.keyCode){case 67:S(e);break;case 86:x(e);break;case 88:C(e)}});var L=function(){if(c&&u.onCompositionUpdate&&!u.$readOnly){if(m)return i();if(c.useTextareaForIME)u.onCompositionUpdate(d.value);else{var e=d.value;s(e),c.markerRange&&(c.context&&(c.markerRange.start.column=c.selectionStart=c.context.compositionStartOffset),c.markerRange.end.column=c.markerRange.start.column+w-c.selectionStart+b)}}},R=function(e){u.onCompositionEnd&&!u.$readOnly&&(c=!1,u.onCompositionEnd(),u.off("mousedown",i),e&&o())},E=H.delayedCall(L,50).schedule.bind(null,null);B.addListener(d,"compositionstart",function(e){if(!c&&u.onCompositionStart&&!u.$readOnly&&(c={},!m)){setTimeout(L,0),u.on("mousedown",i);var t=u.getSelectionRange();t.end.row=t.start.row,t.end.column=t.start.column,c.markerRange=t,c.selectionStart=v,u.onCompositionStart(c),c.useTextareaForIME?(d.value="",p="",w=v=0):(d.msGetInputContext&&(c.context=d.msGetInputContext()),d.getInputContext&&(c.context=d.getInputContext()))}}),B.addListener(d,"compositionupdate",L),B.addListener(d,"keyup",function(e){27==e.keyCode&&d.value.length<d.selectionStart&&(c||(p=d.value),v=w=-1,$()),E()}),B.addListener(d,"keydown",E),B.addListener(d,"compositionend",R),this.getElement=function(){return d},this.setCommandMode=function(e){m=e,d.readOnly=!1},this.setReadOnly=function(e){m||(d.readOnly=e)},this.setCopyWithEmptySelection=function(e){},this.onContextMenu=function(e){A=!0,$(),u._emit("nativecontextmenu",{target:u,domEvent:e}),this.moveToMouse(e,!0)},this.moveToMouse=function(e,t){h=h||d.style.cssText,d.style.cssText=(t?"z-index:100000;":"")+(D.isIE?"opacity:0.1;":"")+"text-indent: -"+(v+w)*u.renderer.characterWidth*.5+"px;";function i(e){P.translate(d,e.clientX-r-2,Math.min(e.clientY-o-2,a))}var n=u.container.getBoundingClientRect(),s=P.computedStyle(u.container),o=n.top+(parseInt(s.borderTopWidth)||0),r=n.left+(parseInt(n.borderLeftWidth)||0),a=n.bottom-o-d.clientHeight-2;i(e),"mousedown"==e.type&&(u.renderer.$isMousePressed=!0,clearTimeout(M),D.isWin&&B.capture(u.container,i,l))},this.onContextMenuClose=l;function _(e){u.textInput.onContextMenu(e),l()}var M,T,F,O,I;function W(e){if(document.activeElement===F&&!(I||c||T.$mouseHandler.isMousePressed||r)){var t=F.selectionStart,i=F.selectionEnd,n=null,s=0;if(0==t?n=K.up:1==t?n=K.home:w<i&&"\n"==p[i]?n=K.end:t<v&&" "==p[t-1]?(n=K.left,s=G.option):t<v||t==v&&w!=v&&t==i?n=K.left:w<i&&2<p.slice(0,i).split("\n").length?n=K.down:w<i&&" "==p[i-1]?(n=K.right,s=G.option):(w<i||i==w&&w!=v&&t==i)&&(n=K.right),t!==i&&(s|=G.shift),n){if(!T.onCommandKey({},s,n)&&T.commands){n=K.keyCodeToString(n);var o=T.commands.findKeyCommand(s,n);o&&T.execCommand(o)}v=t,w=i,$("")}}}B.addListener(d,"mouseup",_),B.addListener(d,"mousedown",function(e){e.preventDefault(),l()}),B.addListener(u.renderer.scroller,"contextmenu",_),B.addListener(d,"contextmenu",_),j&&(T=u,O=null,I=!1,(F=d).addEventListener("keydown",function(e){O&&clearTimeout(O),I=!0},!0),F.addEventListener("keyup",function(e){O=setTimeout(function(){I=!1},100)},!0),document.addEventListener("selectionchange",W),T.on("destroy",function(){document.removeEventListener("selectionchange",W)}))}}),ace.define("ace/mouse/default_handlers",["require","exports","module","ace/lib/useragent"],function(e,t,i){"use strict";function n(t){t.$clickSelection=null;var e=t.editor;e.setDefaultHandler("mousedown",this.onMouseDown.bind(t)),e.setDefaultHandler("dblclick",this.onDoubleClick.bind(t)),e.setDefaultHandler("tripleclick",this.onTripleClick.bind(t)),e.setDefaultHandler("quadclick",this.onQuadClick.bind(t)),e.setDefaultHandler("mousewheel",this.onMouseWheel.bind(t));["select","startSelect","selectEnd","selectAllEnd","selectByWordsEnd","selectByLinesEnd","dragWait","dragWaitEnd","focusWait"].forEach(function(e){t[e]=this[e]},this),t.selectByLines=this.extendSelectionBy.bind(t,"getLineRange"),t.selectByWords=this.extendSelectionBy.bind(t,"getWordRange")}function l(e,t){if(e.start.row==e.end.row)var i=2*t.column-e.start.column-e.end.column;else if(e.start.row!=e.end.row-1||e.start.column||e.end.column)i=2*t.row-e.start.row-e.end.row;else var i=t.column-4;return i<0?{cursor:e.start,anchor:e.end}:{cursor:e.end,anchor:e.start}}var o=e("../lib/useragent");(function(){this.onMouseDown=function(e){var t=e.inSelection(),i=e.getDocumentPosition();this.mousedownEvent=e;var n=this.editor,s=e.getButton();return 0!==s?(!n.getSelectionRange().isEmpty()&&1!=s||n.selection.moveToPosition(i),void(2==s&&(n.textInput.onContextMenu(e.domEvent),o.isMozilla||e.preventDefault()))):(this.mousedownEvent.time=Date.now(),!t||n.isFocused()||(n.focus(),!this.$focusTimeout||this.$clickSelection||n.inMultiSelectMode)?(this.captureMouse(e),this.startSelect(i,1<e.domEvent._clicks),e.preventDefault()):(this.setState("focusWait"),void this.captureMouse(e)))},this.startSelect=function(e,t){e=e||this.editor.renderer.screenToTextCoordinates(this.x,this.y);var i=this.editor;this.mousedownEvent&&(this.mousedownEvent.getShiftKey()?i.selection.selectToPosition(e):t||i.selection.moveToPosition(e),t||this.select(),i.renderer.scroller.setCapture&&i.renderer.scroller.setCapture(),i.setStyle("ace_selecting"),this.setState("select"))},this.select=function(){var e,t=this.editor,i=t.renderer.screenToTextCoordinates(this.x,this.y);if(this.$clickSelection){var n=this.$clickSelection.comparePoint(i);if(-1==n)e=this.$clickSelection.end;else if(1==n)e=this.$clickSelection.start;else{var s=l(this.$clickSelection,i);i=s.cursor,e=s.anchor}t.selection.setSelectionAnchor(e.row,e.column)}t.selection.selectToPosition(i),t.renderer.scrollCursorIntoView()},this.extendSelectionBy=function(e){var t,i=this.editor,n=i.renderer.screenToTextCoordinates(this.x,this.y),s=i.selection[e](n.row,n.column);if(this.$clickSelection){var o=this.$clickSelection.comparePoint(s.start),r=this.$clickSelection.comparePoint(s.end);if(-1==o&&r<=0)t=this.$clickSelection.end,s.end.row==n.row&&s.end.column==n.column||(n=s.start);else if(1==r&&0<=o)t=this.$clickSelection.start,s.start.row==n.row&&s.start.column==n.column||(n=s.end);else if(-1==o&&1==r)n=s.end,t=s.start;else{var a=l(this.$clickSelection,n);n=a.cursor,t=a.anchor}i.selection.setSelectionAnchor(t.row,t.column)}i.selection.selectToPosition(n),i.renderer.scrollCursorIntoView()},this.selectEnd=this.selectAllEnd=this.selectByWordsEnd=this.selectByLinesEnd=function(){this.$clickSelection=null,this.editor.unsetStyle("ace_selecting"),this.editor.renderer.scroller.releaseCapture&&this.editor.renderer.scroller.releaseCapture()},this.focusWait=function(){var e=function(e,t,i,n){return Math.sqrt(Math.pow(i-e,2)+Math.pow(n-t,2))}(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y),t=Date.now();(0<e||t-this.mousedownEvent.time>this.$focusTimeout)&&this.startSelect(this.mousedownEvent.getDocumentPosition())},this.onDoubleClick=function(e){var t=e.getDocumentPosition(),i=this.editor,n=i.session.getBracketRange(t);n?(n.isEmpty()&&(n.start.column--,n.end.column++),this.setState("select")):(n=i.selection.getWordRange(t.row,t.column),this.setState("selectByWords")),this.$clickSelection=n,this.select()},this.onTripleClick=function(e){var t=e.getDocumentPosition(),i=this.editor;this.setState("selectByLines");var n=i.getSelectionRange();n.isMultiLine()&&n.contains(t.row,t.column)?(this.$clickSelection=i.selection.getLineRange(n.start.row),this.$clickSelection.end=i.selection.getLineRange(n.end.row).end):this.$clickSelection=i.selection.getLineRange(t.row),this.select()},this.onQuadClick=function(e){var t=this.editor;t.selectAll(),this.$clickSelection=t.getSelectionRange(),this.setState("selectAll")},this.onMouseWheel=function(e){if(!e.getAccelKey()){e.getShiftKey()&&e.wheelY&&!e.wheelX&&(e.wheelX=e.wheelY,e.wheelY=0);var t=this.editor;this.$lastScroll||(this.$lastScroll={t:0,vx:0,vy:0,allowed:0});var i=this.$lastScroll,n=e.domEvent.timeStamp,s=n-i.t,o=s?e.wheelX/s:i.vx,r=s?e.wheelY/s:i.vy;s<550&&(o=(o+i.vx)/2,r=(r+i.vy)/2);var a=Math.abs(o/r),l=!1;if(1<=a&&t.renderer.isScrollableBy(e.wheelX*e.speed,0)&&(l=!0),a<=1&&t.renderer.isScrollableBy(0,e.wheelY*e.speed)&&(l=!0),l)i.allowed=n;else if(n-i.allowed<550){var c=Math.abs(o)<=1.5*Math.abs(i.vx)&&Math.abs(r)<=1.5*Math.abs(i.vy);i.allowed=c?(l=!0,n):0}return i.t=n,i.vx=o,i.vy=r,l?(t.renderer.scrollBy(e.wheelX*e.speed,e.wheelY*e.speed),e.stop()):void 0}}}).call(n.prototype),t.DefaultHandlers=n}),ace.define("ace/tooltip",["require","exports","module","ace/lib/oop","ace/lib/dom"],function(e,t,i){"use strict";function n(e){this.isOpen=!1,this.$element=null,this.$parentNode=e}e("./lib/oop");var s=e("./lib/dom");(function(){this.$init=function(){return this.$element=s.createElement("div"),this.$element.className="ace_tooltip",this.$element.style.display="none",this.$parentNode.appendChild(this.$element),this.$element},this.getElement=function(){return this.$element||this.$init()},this.setText=function(e){this.getElement().textContent=e},this.setHtml=function(e){this.getElement().innerHTML=e},this.setPosition=function(e,t){this.getElement().style.left=e+"px",this.getElement().style.top=t+"px"},this.setClassName=function(e){s.addCssClass(this.getElement(),e)},this.show=function(e,t,i){null!=e&&this.setText(e),null!=t&&null!=i&&this.setPosition(t,i),this.isOpen||(this.getElement().style.display="block",this.isOpen=!0)},this.hide=function(){this.isOpen&&(this.getElement().style.display="none",this.isOpen=!1)},this.getHeight=function(){return this.getElement().offsetHeight},this.getWidth=function(){return this.getElement().offsetWidth},this.destroy=function(){this.isOpen=!1,this.$element&&this.$element.parentNode&&this.$element.parentNode.removeChild(this.$element)}}).call(n.prototype),t.Tooltip=n}),ace.define("ace/mouse/default_gutter_handler",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event","ace/tooltip"],function(e,t,i){"use strict";function n(e){r.call(this,e)}var s=e("../lib/dom"),o=e("../lib/oop"),f=e("../lib/event"),r=e("../tooltip").Tooltip;o.inherits(n,r),function(){this.setPosition=function(e,t){var i=window.innerWidth||document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight,s=this.getWidth(),o=this.getHeight();i<(e+=15)+s&&(e-=e+s-i),n<(t+=15)+o&&(t-=20+o),r.prototype.setPosition.call(this,e,t)}}.call(n.prototype),t.GutterHandler=function(r){function a(){i=i&&clearTimeout(i),h&&(g.hide(),h=null,u._signal("hideGutterTooltip",g),u.removeEventListener("mousewheel",a))}function l(e){g.setPosition(e.x,e.y)}var i,c,h,u=r.editor,d=u.renderer.$gutterLayer,g=new n(u.container);r.editor.setDefaultHandler("guttermousedown",function(e){if(u.isFocused()&&0==e.getButton()&&"foldWidgets"!=d.getRegion(e)){var t=e.getDocumentPosition().row,i=u.session.selection;if(e.getShiftKey())i.selectTo(t,0);else{if(2==e.domEvent.detail)return u.selectAll(),e.preventDefault();r.$clickSelection=u.selection.getLineRange(t)}return r.setState("selectByLines"),r.captureMouse(e),e.preventDefault()}}),r.editor.setDefaultHandler("guttermousemove",function(e){var t=e.domEvent.target||e.domEvent.srcElement;if(s.hasCssClass(t,"ace_fold-widget"))return a();h&&r.$tooltipFollowsMouse&&l(e),c=e,i=i||setTimeout(function(){i=null,c&&!r.isMousePressed?function(){var e=c.getDocumentPosition().row,t=d.$annotations[e];if(!t)return a();if(e==u.session.getLength()){var i=u.renderer.pixelToScreenCoordinates(0,c.y).row,n=c.$pos;if(i>u.session.documentToScreenRow(n.row,n.column))return a()}if(h!=t)if(h=t.text.join("<br/>"),g.setHtml(h),g.show(),u._signal("showGutterTooltip",g),u.on("mousewheel",a),r.$tooltipFollowsMouse)l(c);else{var s=c.domEvent.target.getBoundingClientRect(),o=g.getElement().style;o.left=s.right+"px",o.top=s.bottom+"px"}}():a()},50)}),f.addListener(u.renderer.$gutter,"mouseout",function(e){c=null,h&&!i&&(i=setTimeout(function(){i=null,a()},50))}),u.on("changeSession",a)}}),ace.define("ace/mouse/mouse_event",["require","exports","module","ace/lib/event","ace/lib/useragent"],function(e,t,i){"use strict";var n=e("../lib/event"),s=e("../lib/useragent"),o=t.MouseEvent=function(e,t){this.domEvent=e,this.editor=t,this.x=this.clientX=e.clientX,this.y=this.clientY=e.clientY,this.$pos=null,this.$inSelection=null,this.propagationStopped=!1,this.defaultPrevented=!1};(function(){this.stopPropagation=function(){n.stopPropagation(this.domEvent),this.propagationStopped=!0},this.preventDefault=function(){n.preventDefault(this.domEvent),this.defaultPrevented=!0},this.stop=function(){this.stopPropagation(),this.preventDefault()},this.getDocumentPosition=function(){return this.$pos||(this.$pos=this.editor.renderer.screenToTextCoordinates(this.clientX,this.clientY)),this.$pos},this.inSelection=function(){if(null!==this.$inSelection)return this.$inSelection;var e=this.editor.getSelectionRange();if(e.isEmpty())this.$inSelection=!1;else{var t=this.getDocumentPosition();this.$inSelection=e.contains(t.row,t.column)}return this.$inSelection},this.getButton=function(){return n.getButton(this.domEvent)},this.getShiftKey=function(){return this.domEvent.shiftKey},this.getAccelKey=s.isMac?function(){return this.domEvent.metaKey}:function(){return this.domEvent.ctrlKey}}).call(o.prototype)}),ace.define("ace/mouse/dragdrop_handler",["require","exports","module","ace/lib/dom","ace/lib/event","ace/lib/useragent"],function(e,t,i){"use strict";function n(t){function e(){var e=u;(function(e,t){var i=Date.now(),n=!t||e.row!=t.row,s=!t||e.column!=t.column;!w||n||s?(g.moveCursorToPosition(e),w=i,b={x:f,y:m}):5<S(b.x,b.y,f,m)?w=null:200<=i-w&&(g.renderer.scrollCursorIntoView(),w=null)})(u=g.renderer.screenToTextCoordinates(f,m),e),function(e,t){var i=Date.now(),n=g.renderer.layerConfig.lineHeight,s=g.renderer.layerConfig.characterWidth,o=g.renderer.scroller.getBoundingClientRect(),r={x:{left:f-o.left,right:o.right-f},y:{top:m-o.top,bottom:o.bottom-m}},a=Math.min(r.x.left,r.x.right),l=Math.min(r.y.top,r.y.bottom),c={row:e.row,column:e.column};a/s<=2&&(c.column+=r.x.left<r.x.right?-3:2),l/n<=1&&(c.row+=r.y.top<r.y.bottom?-1:1);var h=e.row!=c.row,u=e.column!=c.column,d=!t||e.row!=t.row;h||u&&!d?v?200<=i-v&&g.renderer.scrollCursorIntoView(c):v=i:v=null}(u,e)}function i(){h=g.selection.toOrientedRange(),l=g.session.addMarker(h,"ace_selection",g.getSelectionStyle()),g.clearSelection(),g.isFocused()&&g.renderer.$cursorLayer.setBlinking(!1),clearInterval(c),e(),c=setInterval(e,20),$=0,A.addListener(document,"mousemove",s)}function n(){clearInterval(c),g.session.removeMarker(l),l=null,g.selection.fromOrientedRange(h),g.isFocused()&&!p&&g.$resetCursorStyle(),$=0,w=v=u=h=null,A.removeListener(document,"mousemove",s)}function s(){null==C&&(C=setTimeout(function(){null!=C&&l&&n()},20))}function o(e){var t=e.types;return!t||Array.prototype.some.call(t,function(e){return"text/plain"==e||"Text"==e})}function r(e){var t=["copy","copymove","all","uninitialized"],i=k.isMac?e.altKey:e.ctrlKey,n="uninitialized";try{n=e.dataTransfer.effectAllowed.toLowerCase()}catch(e){}var s="none";return i&&0<=t.indexOf(n)?s="copy":0<=["move","copymove","linkmove","all","uninitialized"].indexOf(n)?s="move":0<=t.indexOf(n)&&(s="copy"),s}var g=t.editor,a=x.createElement("img");a.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",k.isOpera&&(a.style.cssText="width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;");["dragWait","dragWaitEnd","startDrag","dragReadyEnd","onMouseDrag"].forEach(function(e){t[e]=this[e]},this),g.addEventListener("mousedown",this.onMouseDown.bind(t));var l,f,m,c,h,u,d,p,v,w,b,y=g.container,$=0;this.onDragStart=function(e){if(this.cancelDrag||!y.draggable){var t=this;return setTimeout(function(){t.startSelect(),t.captureMouse(e)},0),e.preventDefault()}h=g.getSelectionRange();var i=e.dataTransfer;i.effectAllowed=g.getReadOnly()?"copy":"copyMove",k.isOpera&&(g.container.appendChild(a),a.scrollTop=0),i.setDragImage&&i.setDragImage(a,0,0),k.isOpera&&g.container.removeChild(a),i.clearData(),i.setData("Text",g.session.getTextRange()),p=!0,this.setState("drag")},this.onDragEnd=function(e){if(y.draggable=!1,p=!1,this.setState(null),!g.getReadOnly()){var t=e.dataTransfer.dropEffect;d||"move"!=t||g.session.remove(g.getSelectionRange()),g.$resetCursorStyle()}this.editor.unsetStyle("ace_dragging"),this.editor.renderer.setCursorStyle("")},this.onDragEnter=function(e){if(!g.getReadOnly()&&o(e.dataTransfer))return f=e.clientX,m=e.clientY,l||i(),$++,e.dataTransfer.dropEffect=d=r(e),A.preventDefault(e)},this.onDragOver=function(e){if(!g.getReadOnly()&&o(e.dataTransfer))return f=e.clientX,m=e.clientY,l||(i(),$++),null!==C&&(C=null),e.dataTransfer.dropEffect=d=r(e),A.preventDefault(e)},this.onDragLeave=function(e){if(--$<=0&&l)return n(),d=null,A.preventDefault(e)},this.onDrop=function(e){if(u){var t=e.dataTransfer;if(p)switch(d){case"move":h=h.contains(u.row,u.column)?{start:u,end:u}:g.moveText(h,u);break;case"copy":h=g.moveText(h,u,!0)}else{var i=t.getData("Text");h={start:u,end:g.session.insert(u,i)},g.focus(),d=null}return n(),A.preventDefault(e)}},A.addListener(y,"dragstart",this.onDragStart.bind(t)),A.addListener(y,"dragend",this.onDragEnd.bind(t)),A.addListener(y,"dragenter",this.onDragEnter.bind(t)),A.addListener(y,"dragover",this.onDragOver.bind(t)),A.addListener(y,"dragleave",this.onDragLeave.bind(t)),A.addListener(y,"drop",this.onDrop.bind(t));var C=null}function S(e,t,i,n){return Math.sqrt(Math.pow(i-e,2)+Math.pow(n-t,2))}var x=e("../lib/dom"),A=e("../lib/event"),k=e("../lib/useragent");(function(){this.dragWait=function(){Date.now()-this.mousedownEvent.time>this.editor.getDragDelay()&&this.startDrag()},this.dragWaitEnd=function(){this.editor.container.draggable=!1,this.startSelect(this.mousedownEvent.getDocumentPosition()),this.selectEnd()},this.dragReadyEnd=function(e){this.editor.$resetCursorStyle(),this.editor.unsetStyle("ace_dragging"),this.editor.renderer.setCursorStyle(""),this.dragWaitEnd()},this.startDrag=function(){this.cancelDrag=!1;var e=this.editor;e.container.draggable=!0,e.renderer.$cursorLayer.setBlinking(!1),e.setStyle("ace_dragging");var t=k.isWin?"default":"move";e.renderer.setCursorStyle(t),this.setState("dragReady")},this.onMouseDrag=function(e){var t=this.editor.container;k.isIE&&"dragReady"==this.state&&3<S(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y)&&t.dragDrop();"dragWait"===this.state&&0<S(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y)&&(t.draggable=!1,this.startSelect(this.mousedownEvent.getDocumentPosition()))},this.onMouseDown=function(e){if(this.$dragEnabled){this.mousedownEvent=e;var t=this.editor,i=e.inSelection(),n=e.getButton();if(1===(e.domEvent.detail||1)&&0===n&&i){if(e.editor.inMultiSelectMode&&(e.getAccelKey()||e.getShiftKey()))return;this.mousedownEvent.time=Date.now();var s=e.domEvent.target||e.domEvent.srcElement;if("unselectable"in s&&(s.unselectable="on"),t.getDragDelay()){if(k.isWebKit)this.cancelDrag=!0,t.container.draggable=!0;this.setState("dragWait")}else this.startDrag();this.captureMouse(e,this.onMouseDrag.bind(this)),e.defaultPrevented=!0}}}}).call(n.prototype),t.DragdropHandler=n}),ace.define("ace/mouse/touch_handler",["require","exports","module","ace/mouse/mouse_event","ace/lib/dom"],function(e,t,i){"use strict";var M=e("./mouse_event").MouseEvent,r=e("../lib/dom");t.addTouchListeners=function(e,v){function n(){function t(e){var t=e.target.getAttribute("action");if("more"==t||!n)return n=!n,function(){var e=v.getCopyText(),t=v.session.getUndoManager().hasUndo();o.replaceChild(r.buildDom(n?["span",!e&&["span",{class:"ace_mobile-button",action:"selectall"},"Select All"],e&&["span",{class:"ace_mobile-button",action:"copy"},"Copy"],e&&["span",{class:"ace_mobile-button",action:"cut"},"Cut"],i&&["span",{class:"ace_mobile-button",action:"paste"},"Paste"],t&&["span",{class:"ace_mobile-button",action:"undo"},"Undo"],["span",{class:"ace_mobile-button",action:"find"},"Find"],["span",{class:"ace_mobile-button",action:"openCommandPallete"},"Pallete"]]:["span"]),o.firstChild)}();"paste"==t?i.readText().then(function(e){v.execCommand(t,e)}):t&&("cut"!=t&&"copy"!=t||(i?i.writeText(v.getCopyText()):document.execCommand("copy")),v.execCommand(t)),o.firstChild.style.display="none",n=!1,"openCommandPallete"!=t&&v.focus()}var i=window.navigator&&window.navigator.clipboard,n=!1;o=r.buildDom(["div",{class:"ace_mobile-menu",ontouchstart:function(e){k="menu",e.stopPropagation(),e.preventDefault(),v.textInput.focus()},ontouchend:function(e){e.stopPropagation(),e.preventDefault(),t(e)},onclick:t},["span"],["span",{class:"ace_mobile-button",action:"more"},"..."]],v.container)}function i(){o||n();var e=v.selection.cursor,t=v.renderer.textToScreenCoordinates(e.row,e.column),i=v.container.getBoundingClientRect();o.style.top=t.pageY-i.top-3+"px",o.style.right="10px",o.style.display="",o.firstChild.style.display="none",v.on("input",s)}function s(e){o&&(o.style.display="none"),v.off("input",s)}function w(){S=null,clearTimeout(S);var e=v.selection.getRange(),t=e.contains(x.row,x.column);!e.isEmpty()&&t||(v.selection.moveToPosition(x),v.selection.selectWord()),k="wait",i()}var b,y,$,C,S,t,x,A,o,k="scroll",L=0,R=0,E=0,_=0;e.addEventListener("contextmenu",function(e){A&&v.textInput.getElement().focus()}),e.addEventListener("touchstart",function(e){var t=e.touches;if(S||1<t.length)return clearTimeout(S),S=null,$=-1,void(k="zoom");A=v.$mouseHandler.isMousePressed=!0;var i=v.renderer.layerConfig.lineHeight,n=v.renderer.layerConfig.lineHeight,s=e.timeStamp;C=s;var o=t[0],r=o.clientX,a=o.clientY;Math.abs(b-r)+Math.abs(y-a)>i&&($=-1),b=e.clientX=r,y=e.clientY=a,E=_=0;var l=new M(e,v);if(x=l.getDocumentPosition(),s-$<500&&1==t.length&&!L)R++,e.preventDefault(),e.button=0,function(){S=null,clearTimeout(S),v.selection.moveToPosition(x);var e=2<=R?v.selection.getLineRange(x.row):v.session.getBracketRange(x);e&&!e.isEmpty()?v.selection.setRange(e):v.selection.selectWord(),k="wait"}();else{R=0;var c=v.selection.cursor,h=v.selection.isEmpty()?c:v.selection.anchor,u=v.renderer.$cursorLayer.getPixelPosition(c,!0),d=v.renderer.$cursorLayer.getPixelPosition(h,!0),g=v.renderer.scroller.getBoundingClientRect(),f=function(e,t){return(e/=n)*e+(t=t/i-.75)*t};if(e.clientX<g.left)return void(k="zoom");var m=f(e.clientX-g.left-u.left,e.clientY-g.top-u.top),p=f(e.clientX-g.left-d.left,e.clientY-g.top-d.top);m<3.5&&p<3.5&&(k=p<m?"cursor":"anchor"),k=p<3.5?"anchor":m<3.5?"cursor":"scroll",S=setTimeout(w,450)}$=s}),e.addEventListener("touchend",function(e){A=v.$mouseHandler.isMousePressed=!1,t&&clearInterval(t),"zoom"==k?(k="",L=0):S?(v.selection.moveToPosition(x),L=0,i()):"scroll"==k?(L+=60,t=setInterval(function(){L--<=0&&(clearInterval(t),t=null),Math.abs(E)<.01&&(E=0),Math.abs(_)<.01&&(_=0),L<20&&(E*=.9),L<20&&(_*=.9);var e=v.session.getScrollTop();v.renderer.scrollBy(10*E,10*_),e==v.session.getScrollTop()&&(L=0)},10),e.preventDefault(),s()):i(),clearTimeout(S),S=null}),e.addEventListener("touchmove",function(e){S&&(clearTimeout(S),S=null);var t=e.touches;if(!(1<t.length||"zoom"==k)){var i=t[0],n=b-i.clientX,s=y-i.clientY;if("wait"==k){if(!(4<n*n+s*s))return e.preventDefault();k="cursor"}b=i.clientX,y=i.clientY,e.clientX=i.clientX,e.clientY=i.clientY;var o=e.timeStamp,r=o-C;if(C=o,"scroll"==k){var a=new M(e,v);a.speed=1,a.wheelX=n,a.wheelY=s,10*Math.abs(n)<Math.abs(s)&&(n=0),10*Math.abs(s)<Math.abs(n)&&(s=0),0!=r&&(E=n/r,_=s/r),v._emit("mousewheel",a),a.propagationStopped||(E=_=0)}else{var l=new M(e,v).getDocumentPosition();"cursor"==k?v.selection.moveCursorToPosition(l):"anchor"==k&&v.selection.setSelectionAnchor(l.row,l.column),v.renderer.scrollCursorIntoView(l),e.preventDefault()}}})}}),ace.define("ace/lib/net",["require","exports","module","ace/lib/dom"],function(e,t,i){"use strict";var s=e("./dom");t.get=function(e,t){var i=new XMLHttpRequest;i.open("GET",e,!0),i.onreadystatechange=function(){4===i.readyState&&t(i.responseText)},i.send(null)},t.loadScript=function(e,i){var t=s.getDocumentHead(),n=document.createElement("script");n.src=e,t.appendChild(n),n.onload=n.onreadystatechange=function(e,t){!t&&n.readyState&&"loaded"!=n.readyState&&"complete"!=n.readyState||(n=n.onload=n.onreadystatechange=null,t||i())}},t.qualifyURL=function(e){var t=document.createElement("a");return t.href=e,t.href}}),ace.define("ace/lib/event_emitter",["require","exports","module"],function(e,t,i){"use strict";function o(){this.propagationStopped=!0}function r(){this.defaultPrevented=!0}var n={};n._emit=n._dispatchEvent=function(e,t){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={});var i=this._eventRegistry[e]||[],n=this._defaultHandlers[e];if(i.length||n){"object"==typeof t&&t||(t={}),t.type||(t.type=e),t.stopPropagation||(t.stopPropagation=o),t.preventDefault||(t.preventDefault=r),i=i.slice();for(var s=0;s<i.length&&(i[s](t,this),!t.propagationStopped);s++);return n&&!t.defaultPrevented?n(t,this):void 0}},n._signal=function(e,t){var i=(this._eventRegistry||{})[e];if(i){i=i.slice();for(var n=0;n<i.length;n++)i[n](t,this)}},n.once=function(t,i){var n=this;if(this.addEventListener(t,function e(){n.removeEventListener(t,e),i.apply(null,arguments)}),!i)return new Promise(function(e){i=e})},n.setDefaultHandler=function(e,t){var i=this._defaultHandlers;if((i=i||(this._defaultHandlers={_disabled_:{}}))[e]){var n=i[e],s=i._disabled_[e];s||(i._disabled_[e]=s=[]),s.push(n);var o=s.indexOf(t);-1!=o&&s.splice(o,1)}i[e]=t},n.removeDefaultHandler=function(e,t){var i=this._defaultHandlers;if(i){var n=i._disabled_[e];if(i[e]==t)n&&this.setDefaultHandler(e,n.pop());else if(n){var s=n.indexOf(t);-1!=s&&n.splice(s,1)}}},n.on=n.addEventListener=function(e,t,i){this._eventRegistry=this._eventRegistry||{};var n=this._eventRegistry[e];return-1==(n=n||(this._eventRegistry[e]=[])).indexOf(t)&&n[i?"unshift":"push"](t),t},n.off=n.removeListener=n.removeEventListener=function(e,t){this._eventRegistry=this._eventRegistry||{};var i=this._eventRegistry[e];if(i){var n=i.indexOf(t);-1!==n&&i.splice(n,1)}},n.removeAllListeners=function(e){this._eventRegistry&&(this._eventRegistry[e]=[])},t.EventEmitter=n}),ace.define("ace/lib/app_config",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(e,t,i){function n(e){"undefined"!=typeof console&&console.warn&&console.warn.apply(console,arguments)}function s(e,t){var i=new Error(e);i.data=t,"object"==typeof console&&console.error&&console.error(i),setTimeout(function(){throw i})}function o(){this.$defaultOptions={}}var r=e("./oop"),a=e("./event_emitter").EventEmitter,l={setOptions:function(t){Object.keys(t).forEach(function(e){this.setOption(e,t[e])},this)},getOptions:function(e){var t={};if(e)Array.isArray(e)||(t=e,e=Object.keys(t));else{var i=this.$options;e=Object.keys(i).filter(function(e){return!i[e].hidden})}return e.forEach(function(e){t[e]=this.getOption(e)},this),t},setOption:function(e,t){if(this["$"+e]!==t){var i=this.$options[e];return i?i.forwardTo?this[i.forwardTo]&&this[i.forwardTo].setOption(e,t):(i.handlesSet||(this["$"+e]=t),void(i&&i.set&&i.set.call(this,t))):n('misspelled option "'+e+'"')}},getOption:function(e){var t=this.$options[e];return t?t.forwardTo?this[t.forwardTo]&&this[t.forwardTo].getOption(e):t&&t.get?t.get.call(this):this["$"+e]:n('misspelled option "'+e+'"')}};(function(){r.implement(this,a),this.defineOptions=function(i,e,n){return i.$options||(this.$defaultOptions[e]=i.$options={}),Object.keys(n).forEach(function(e){var t=n[e];"string"==typeof t&&(t={forwardTo:t}),t.name||(t.name=e),"initialValue"in(i.$options[t.name]=t)&&(i["$"+t.name]=t.initialValue)}),r.implement(i,l),this},this.resetOptions=function(i){Object.keys(i.$options).forEach(function(e){var t=i.$options[e];"value"in t&&i.setOption(e,t.value)})},this.setDefaultValue=function(e,t,i){if(!e){for(e in this.$defaultOptions)if(this.$defaultOptions[e][t])break;if(!this.$defaultOptions[e][t])return!1}var n=this.$defaultOptions[e]||(this.$defaultOptions[e]={});n[t]&&(n.forwardTo?this.setDefaultValue(n.forwardTo,t,i):n[t].value=i)},this.setDefaultValues=function(t,i){Object.keys(i).forEach(function(e){this.setDefaultValue(t,e,i[e])},this)},this.warn=n,this.reportError=s}).call(o.prototype),t.AppConfig=o}),ace.define("ace/config",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/lib/net","ace/lib/app_config"],function(f,m,p){var e=f("./lib/lang"),o=(f("./lib/oop"),f("./lib/net")),t=f("./lib/app_config").AppConfig;p.exports=m=new t;var v=function(){return this||"undefined"!=typeof window&&window}(),w={packaged:!1,workerPath:null,modePath:null,themePath:null,basePath:"",suffix:".js",$moduleUrls:{},loadWorkerFromBlob:!0,sharedPopups:!1};m.get=function(e){if(!w.hasOwnProperty(e))throw new Error("Unknown config key: "+e);return w[e]},m.set=function(e,t){if(w.hasOwnProperty(e))w[e]=t;else if(0==this.setDefaultValue("",e,t))throw new Error("Unknown config key: "+e)},m.all=function(){return e.copyObject(w)},m.$modes={},m.moduleUrl=function(e,t){if(w.$moduleUrls[e])return w.$moduleUrls[e];var i=e.split("/"),n="snippets"==(t=t||i[i.length-2]||"")?"/":"-",s=i[i.length-1];if("worker"==t&&"-"==n){var o=new RegExp("^"+t+"[\\-_]|[\\-_]"+t+"$","g");s=s.replace(o,"")}(!s||s==t)&&1<i.length&&(s=i[i.length-2]);var r=w[t+"Path"];return null==r?r=w.basePath:"/"==n&&(t=n=""),r&&"/"!=r.slice(-1)&&(r+="/"),r+t+n+s+this.get("suffix")},m.setModuleUrl=function(e,t){return w.$moduleUrls[e]=t},m.$loading={},m.loadModule=function(i,e){var t,n;Array.isArray(i)&&(n=i[0],i=i[1]);try{t=f(i)}catch(e){}if(t&&!m.$loading[i])return e&&e(t);if(m.$loading[i]||(m.$loading[i]=[]),m.$loading[i].push(e),!(1<m.$loading[i].length)){function s(){f([i],function(t){m._emit("load.module",{name:i,module:t});var e=m.$loading[i];m.$loading[i]=null,e.forEach(function(e){e&&e(t)})})}if(!m.get("packaged"))return s();o.loadScript(m.moduleUrl(i,n),s),r()}};var r=function(){w.basePath||w.workerPath||w.modePath||w.themePath||Object.keys(w.$moduleUrls).length||(console.error("Unable to infer path to ace from script src,","use ace.config.set('basePath', 'path') to enable dynamic loading of modes and themes","or with webpack use ace/webpack-resolver"),r=function(){})};m.init=function(e){if(v&&v.document){w.packaged=e||f.packaged||p.packaged||v.define&&b(1).packaged;for(var t={},i="",n=document.currentScript||document._currentScript,s=(n&&n.ownerDocument||document).getElementsByTagName("script"),o=0;o<s.length;o++){var r=s[o],a=r.src||r.getAttribute("src");if(a){for(var l=r.attributes,c=0,h=l.length;c<h;c++){var u=l[c];0===u.name.indexOf("data-ace-")&&(t[u.name.replace(/^data-ace-/,"").replace(/-(.)/g,function(e,t){return t.toUpperCase()})]=u.value)}var d=a.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);d&&(i=d[1])}}for(var g in i&&(t.base=t.base||i,t.packaged=!0),t.basePath=t.base,t.workerPath=t.workerPath||t.base,t.modePath=t.modePath||t.base,t.themePath=t.themePath||t.base,delete t.base,t)void 0!==t[g]&&m.set(g,t[g])}},m.version="1.4.7"}),ace.define("ace/mouse/mouse_handler",["require","exports","module","ace/lib/event","ace/lib/useragent","ace/mouse/default_handlers","ace/mouse/default_gutter_handler","ace/mouse/mouse_event","ace/mouse/dragdrop_handler","ace/mouse/touch_handler","ace/config"],function(e,t,i){"use strict";function n(s){var o=this;function e(e){document.hasFocus&&document.hasFocus()&&(s.isFocused()||document.activeElement!=(s.textInput&&s.textInput.getElement()))||window.focus(),s.focus()}this.editor=s,new r(this),new a(this),new l(this);var t=s.renderer.getMouseEventTarget();h.addListener(t,"click",this.onMouseEvent.bind(this,"click")),h.addListener(t,"mousemove",this.onMouseMove.bind(this,"mousemove")),h.addMultiMouseDownListener([t,s.renderer.scrollBarV&&s.renderer.scrollBarV.inner,s.renderer.scrollBarH&&s.renderer.scrollBarH.inner,s.textInput&&s.textInput.getElement()].filter(Boolean),[400,300,250],this,"onMouseEvent"),h.addMouseWheelListener(s.container,this.onMouseWheel.bind(this,"mousewheel")),c(s.container,s);var i=s.renderer.$gutter;h.addListener(i,"mousedown",this.onMouseEvent.bind(this,"guttermousedown")),h.addListener(i,"click",this.onMouseEvent.bind(this,"gutterclick")),h.addListener(i,"dblclick",this.onMouseEvent.bind(this,"gutterdblclick")),h.addListener(i,"mousemove",this.onMouseEvent.bind(this,"guttermousemove")),h.addListener(t,"mousedown",e),h.addListener(i,"mousedown",e),u.isIE&&s.renderer.scrollBarV&&(h.addListener(s.renderer.scrollBarV.element,"mousedown",e),h.addListener(s.renderer.scrollBarH.element,"mousedown",e)),s.on("mousemove",function(e){if(!o.state&&!o.$dragDelay&&o.$dragEnabled){var t=s.renderer.screenToTextCoordinates(e.x,e.y),i=s.session.selection.getRange(),n=s.renderer;!i.isEmpty()&&i.insideStart(t.row,t.column)?n.setCursorStyle("default"):n.setCursorStyle("")}})}var h=e("../lib/event"),u=e("../lib/useragent"),r=e("./default_handlers").DefaultHandlers,a=e("./default_gutter_handler").GutterHandler,d=e("./mouse_event").MouseEvent,l=e("./dragdrop_handler").DragdropHandler,c=e("./touch_handler").addTouchListeners,s=e("../config");(function(){this.onMouseEvent=function(e,t){this.editor._emit(e,new d(t,this.editor))},this.onMouseMove=function(e,t){var i=this.editor._eventRegistry&&this.editor._eventRegistry.mousemove;i&&i.length&&this.editor._emit(e,new d(t,this.editor))},this.onMouseWheel=function(e,t){var i=new d(t,this.editor);i.speed=2*this.$scrollSpeed,i.wheelX=t.wheelX,i.wheelY=t.wheelY,this.editor._emit(e,i)},this.setState=function(e){this.state=e},this.captureMouse=function(e,t){this.x=e.x,this.y=e.y,this.isMousePressed=!0;var i=this.editor,n=this.editor.renderer;n.$isMousePressed=!0;function s(e){if(e)return u.isWebKit&&!e.which&&r.releaseMouse?r.releaseMouse():(r.x=e.clientX,r.y=e.clientY,t&&t(e),r.mouseEvent=new d(e,r.editor),void(r.$mouseMoved=!0))}function o(e){i.off("beforeEndOperation",l),clearInterval(c),a(),r[r.state+"End"]&&r[r.state+"End"](e),r.state="",r.isMousePressed=n.$isMousePressed=!1,n.$keepTextAreaAtCursor&&n.$moveTextAreaToCursor(),r.$onCaptureMouseMove=r.releaseMouse=null,e&&r.onMouseEvent("mouseup",e),i.endOperation()}var r=this,a=function(){r[r.state]&&r[r.state](),r.$mouseMoved=!1};if(u.isOldIE&&"dblclick"==e.domEvent.type)return setTimeout(function(){o(e)});var l=function(e){r.releaseMouse&&i.curOp.command.name&&i.curOp.selectionChanged&&(r[r.state+"End"]&&r[r.state+"End"](),r.state="",r.releaseMouse())};i.on("beforeEndOperation",l),i.startOperation({command:{name:"mouse"}}),r.$onCaptureMouseMove=s,r.releaseMouse=h.capture(this.editor.container,s,o);var c=setInterval(a,20)},this.releaseMouse=null,this.cancelContextMenu=function(){var t=function(e){e&&e.domEvent&&"contextmenu"!=e.domEvent.type||(this.editor.off("nativecontextmenu",t),e&&e.domEvent&&h.stopEvent(e.domEvent))}.bind(this);setTimeout(t,10),this.editor.on("nativecontextmenu",t)}}).call(n.prototype),s.defineOptions(n.prototype,"mouseHandler",{scrollSpeed:{initialValue:2},dragDelay:{initialValue:u.isMac?150:0},dragEnabled:{initialValue:!0},focusTimeout:{initialValue:0},tooltipFollowsMouse:{initialValue:!0}}),t.MouseHandler=n}),ace.define("ace/mouse/fold_handler",["require","exports","module","ace/lib/dom"],function(e,t,i){"use strict";var o=e("../lib/dom");t.FoldHandler=function(r){r.on("click",function(e){var t=e.getDocumentPosition(),i=r.session,n=i.getFoldAt(t.row,t.column,1);n&&(e.getAccelKey()?i.removeFold(n):i.expandFold(n),e.stop());var s=e.domEvent&&e.domEvent.target;s&&o.hasCssClass(s,"ace_inline_button")&&o.hasCssClass(s,"ace_toggle_wrap")&&(i.setOption("wrap",!i.getUseWrapMode()),r.renderer.scrollCursorIntoView())}),r.on("gutterclick",function(e){if("foldWidgets"==r.renderer.$gutterLayer.getRegion(e)){var t=e.getDocumentPosition().row,i=r.session;i.foldWidgets&&i.foldWidgets[t]&&r.session.onFoldWidgetClick(t,e),r.isFocused()||r.focus(),e.stop()}}),r.on("gutterdblclick",function(e){if("foldWidgets"==r.renderer.$gutterLayer.getRegion(e)){var t=e.getDocumentPosition().row,i=r.session,n=i.getParentFoldRangeData(t,!0),s=n.range||n.firstRange;if(s){t=s.start.row;var o=i.getFoldAt(t,i.getLine(t).length,1);o?i.removeFold(o):(i.addFold("...",s),r.renderer.scrollCursorIntoView({row:s.start.row,column:0}))}e.stop()}})}}),ace.define("ace/keyboard/keybinding",["require","exports","module","ace/lib/keys","ace/lib/event"],function(e,t,i){"use strict";function n(e){this.$editor=e,this.$data={editor:e},this.$handlers=[],this.setDefaultHandler(e.commands)}var s=e("../lib/keys"),l=e("../lib/event");(function(){this.setDefaultHandler=function(e){this.removeKeyboardHandler(this.$defaultHandler),this.$defaultHandler=e,this.addKeyboardHandler(e,0)},this.setKeyboardHandler=function(e){var t=this.$handlers;if(t[t.length-1]!=e){for(;t[t.length-1]&&t[t.length-1]!=this.$defaultHandler;)this.removeKeyboardHandler(t[t.length-1]);this.addKeyboardHandler(e,1)}},this.addKeyboardHandler=function(e,t){if(e){"function"!=typeof e||e.handleKeyboard||(e.handleKeyboard=e);var i=this.$handlers.indexOf(e);-1!=i&&this.$handlers.splice(i,1),null==t?this.$handlers.push(e):this.$handlers.splice(t,0,e),-1==i&&e.attach&&e.attach(this.$editor)}},this.removeKeyboardHandler=function(e){var t=this.$handlers.indexOf(e);return-1!=t&&(this.$handlers.splice(t,1),e.detach&&e.detach(this.$editor),!0)},this.getKeyboardHandler=function(){return this.$handlers[this.$handlers.length-1]},this.getStatusText=function(){var t=this.$data,i=t.editor;return this.$handlers.map(function(e){return e.getStatusText&&e.getStatusText(i,t)||""}).filter(Boolean).join(" ")},this.$callKeyboardHandlers=function(e,t,i,n){for(var s,o=!1,r=this.$editor.commands,a=this.$handlers.length;a--&&!((s=this.$handlers[a].handleKeyboard(this.$data,e,t,i,n))&&s.command&&((o="null"==s.command||r.exec(s.command,this.$editor,s.args,n))&&n&&-1!=e&&1!=s.passEvent&&1!=s.command.passEvent&&l.stopEvent(n),o)););return o||-1!=e||(s={command:"insertstring"},o=r.exec("insertstring",this.$editor,t)),o&&this.$editor._signal&&this.$editor._signal("keyboardActivity",s),o},this.onCommandKey=function(e,t,i){var n=s.keyCodeToString(i);return this.$callKeyboardHandlers(t,n,i,e)},this.onTextInput=function(e){return this.$callKeyboardHandlers(-1,e)}}).call(n.prototype),t.KeyBinding=n}),ace.define("ace/lib/bidiutil",["require","exports","module"],function(e,l,t){"use strict";function c(e,t,i){if(!(w<e))if(1!=e||1!=v||y)for(var n,s,o,r,a=i.length,l=0;l<a;){if(t[l]>=e){for(n=l+1;n<a&&t[n]>=e;)n++;for(s=l,o=n-1;s<o;s++,o--)r=i[s],i[s]=i[o],i[o]=r;l=n}l++}else i.reverse()}function m(e,t,i,n){var s,o,r,a,l=t[n];switch(l){case u:case d:b=!1;case x:case f:return l;case g:return b?f:g;case L:return b=!0,d;case R:return x;case E:return n<1||n+1>=t.length||(s=i[n-1])!=g&&s!=f||(o=t[n+1])!=g&&o!=f?x:(b&&(o=f),o==s?o:x);case _:return(s=0<n?i[n-1]:A)==g&&n+1<t.length&&t[n+1]==g?g:x;case M:if(0<n&&i[n-1]==g)return g;if(b)return x;for(a=n+1,r=t.length;a<r&&t[a]==M;)a++;return a<r&&t[a]==g?g:x;case T:for(r=t.length,a=n+1;a<r&&t[a]==T;)a++;if(a<r){var c=e[n],h=1425<=c&&c<=2303||64286==c;if(s=t[a],h&&(s==d||s==L))return d}return n<1||(s=t[n-1])==A?x:i[n-1];case A:return y=!(b=!1),v;case k:return $=!0,x;case F:case O:case W:case B:case I:b=!1;case D:return x}}function p(e){var t=e.charCodeAt(0),i=t>>8;return 0==i?191<t?u:n[t]:5==i?/[\u0591-\u05f4]/.test(e)?d:u:6==i?/[\u0610-\u061a\u064b-\u065f\u06d6-\u06e4\u06e7-\u06ed]/.test(e)?T:/[\u0660-\u0669\u066b-\u066c]/.test(e)?f:1642==t?M:/[\u06f0-\u06f9]/.test(e)?g:L:32==i&&t<=8287?s[255&t]:254==i&&65136<=t?L:x}var v=0,w=0,b=!1,y=!1,$=!1,C=[[0,3,0,1,0,0,0],[0,3,0,1,2,2,0],[0,3,0,17,2,0,1],[0,3,5,5,4,1,0],[0,3,21,21,4,0,1],[0,3,5,5,4,2,0]],S=[[2,0,1,1,0,1,0],[2,0,1,1,0,2,0],[2,0,2,1,3,2,0],[2,0,2,33,3,1,1]],u=0,d=1,g=2,f=3,x=4,A=5,k=6,L=7,R=8,E=9,_=10,M=11,T=12,F=13,O=14,I=15,W=16,B=17,D=18,n=[D,D,D,D,D,D,D,D,D,k,A,k,R,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,A,A,A,k,R,x,x,M,M,M,x,x,x,x,x,_,E,_,E,E,g,g,g,g,g,g,g,g,g,g,E,x,x,x,x,x,x,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,x,x,x,x,x,x,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,x,x,x,x,D,D,D,D,D,D,A,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,E,x,M,M,M,M,x,x,x,x,u,x,x,D,x,x,M,M,g,g,x,u,x,x,x,g,u,x,x,x,x,x],s=[R,R,R,R,R,R,R,R,R,R,R,D,D,D,u,d,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,R,A,F,O,I,W,B,E,M,M,M,M,M,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,E,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,R];l.L=u,l.R=d,l.EN=g,l.ON_R=3,l.AN=4,l.R_H=5,l.B=6,l.RLE=7,l.DOT="·",l.doBidiReorder=function(e,t,i){if(e.length<2)return{};var n=e.split(""),s=new Array(n.length),o=new Array(n.length),r=[];v=i?1:0,function(e,t,i,n){var s=v?S:C,o=null,r=null,a=null,l=0,c=null,h=-1,u=null,d=null,g=[];if(!n)for(u=0,n=[];u<i;u++)n[u]=p(e[u]);for(w=v,$=y=b=!1,d=0;d<i;d++){if(o=l,g[d]=r=m(e,n,g,d),c=240&(l=s[o][r]),l&=15,t[d]=a=s[l][5],0<c)if(16==c){for(u=h;u<d;u++)t[u]=1;h=-1}else h=-1;if(s[l][6])-1==h&&(h=d);else if(-1<h){for(u=h;u<d;u++)t[u]=a;h=-1}n[d]==A&&(t[d]=0),w|=a}if($)for(u=0;u<i;u++)if(n[u]==k){t[u]=v;for(var f=u-1;0<=f&&n[f]==R;f--)t[f]=v}}(n,r,n.length,t);for(var a=0;a<s.length;s[a]=a,a++);c(2,r,s),c(1,r,s);for(a=0;a<s.length-1;a++)t[a]===f?r[a]=l.AN:r[a]===d&&(t[a]>L&&t[a]<F||t[a]===x||t[a]===D)?r[a]=l.ON_R:0<a&&"ل"===n[a-1]&&/\u0622|\u0623|\u0625|\u0627/.test(n[a])&&(r[a-1]=r[a]=l.R_H,a++);n[n.length-1]===l.DOT&&(r[n.length-1]=l.B),"‫"===n[0]&&(r[0]=l.RLE);for(a=0;a<s.length;a++)o[a]=r[s[a]];return{logicalFromVisual:s,bidiLevels:o}},l.hasBidiCharacters=function(e,t){for(var i=!1,n=0;n<e.length;n++)t[n]=p(e.charAt(n)),i||t[n]!=d&&t[n]!=L&&t[n]!=f||(i=!0);return i},l.getVisualFromLogicalIdx=function(e,t){for(var i=0;i<t.logicalFromVisual.length;i++)if(t.logicalFromVisual[i]==e)return i;return 0}}),ace.define("ace/bidihandler",["require","exports","module","ace/lib/bidiutil","ace/lib/lang"],function(e,t,i){"use strict";function n(e){this.session=e,this.bidiMap={},this.currentRow=null,this.bidiUtil=a,this.charWidths=[],this.EOL="¬",this.showInvisibles=!0,this.isRtlDir=!1,this.$isRtl=!1,this.line="",this.wrapIndent=0,this.EOF="¶",this.RLE="‫",this.contentWidth=0,this.fontMetrics=null,this.rtlLineOffset=0,this.wrapOffset=0,this.isMoveLeftOperation=!1,this.seenBidi=s.test(e.getValue())}var a=e("./lib/bidiutil"),l=e("./lib/lang"),s=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\u202B]/;(function(){this.isBidiRow=function(e,t,i){return!!this.seenBidi&&(e!==this.currentRow&&(this.currentRow=e,this.updateRowLine(t,i),this.updateBidiMap()),this.bidiMap.bidiLevels)},this.onChange=function(e){this.seenBidi?this.currentRow=null:"insert"==e.action&&s.test(e.lines.join("\n"))&&(this.seenBidi=!0,this.currentRow=null)},this.getDocumentRow=function(){var e=0,t=this.session.$screenRowCache;if(t.length){var i=this.session.$getRowCacheIndex(t,this.currentRow);0<=i&&(e=this.session.$docRowCache[i])}return e},this.getSplitIndex=function(){var e=0,t=this.session.$screenRowCache;if(t.length)for(var i,n=this.session.$getRowCacheIndex(t,this.currentRow);0<this.currentRow-e&&(i=this.session.$getRowCacheIndex(t,this.currentRow-e-1))===n;)n=i,e++;else e=this.currentRow;return e},this.updateRowLine=function(e,t){void 0===e&&(e=this.getDocumentRow());var i=e===this.session.getLength()-1?this.EOF:this.EOL;if(this.wrapIndent=0,this.line=this.session.getLine(e),this.isRtlDir=this.$isRtl||this.line.charAt(0)===this.RLE,this.session.$useWrapMode){var n=this.session.$wrapData[e];n&&(void 0===t&&(t=this.getSplitIndex()),0<t&&n.length?(this.wrapIndent=n.indent,this.wrapOffset=this.wrapIndent*this.charWidths[a.L],this.line=t<n.length?this.line.substring(n[t-1],n[t]):this.line.substring(n[n.length-1])):this.line=this.line.substring(0,n[t])),t==n.length&&(this.line+=this.showInvisibles?i:a.DOT)}else this.line+=this.showInvisibles?i:a.DOT;var s,o=this.session,r=0;this.line=this.line.replace(/\t|[\u1100-\u2029, \u202F-\uFFE6]/g,function(e,t){return"\t"===e||o.isFullWidth(e.charCodeAt(0))?(s="\t"===e?o.getScreenTabSize(t+r):2,r+=s-1,l.stringRepeat(a.DOT,s)):e}),this.isRtlDir&&(this.fontMetrics.$main.textContent=this.line.charAt(this.line.length-1)==a.DOT?this.line.substr(0,this.line.length-1):this.line,this.rtlLineOffset=this.contentWidth-this.fontMetrics.$main.getBoundingClientRect().width)},this.updateBidiMap=function(){var e=[];a.hasBidiCharacters(this.line,e)||this.isRtlDir?this.bidiMap=a.doBidiReorder(this.line,e,this.isRtlDir):this.bidiMap={}},this.markAsDirty=function(){this.currentRow=null},this.updateCharacterWidths=function(e){if(this.characterWidth!==e.$characterSize.width){this.fontMetrics=e;var t=this.characterWidth=e.$characterSize.width,i=e.$measureCharWidth("ה");this.charWidths[a.L]=this.charWidths[a.EN]=this.charWidths[a.ON_R]=t,this.charWidths[a.R]=this.charWidths[a.AN]=i,this.charWidths[a.R_H]=.45*i,this.charWidths[a.B]=this.charWidths[a.RLE]=0,this.currentRow=null}},this.setShowInvisibles=function(e){this.showInvisibles=e,this.currentRow=null},this.setEolChar=function(e){this.EOL=e},this.setContentWidth=function(e){this.contentWidth=e},this.isRtlLine=function(e){return!!this.$isRtl||(null!=e?this.session.getLine(e).charAt(0)==this.RLE:this.isRtlDir)},this.setRtlDirection=function(e,t){for(var i=e.getCursorPosition(),n=e.selection.getSelectionAnchor().row;n<=i.row;n++)t||e.session.getLine(n).charAt(0)!==e.session.$bidiHandler.RLE?t&&e.session.getLine(n).charAt(0)!==e.session.$bidiHandler.RLE&&e.session.doc.insert({column:0,row:n},e.session.$bidiHandler.RLE):e.session.doc.removeInLine(n,0,1)},this.getPosLeft=function(e){e-=this.wrapIndent;var t=this.line.charAt(0)===this.RLE?1:0,i=t<e?this.session.getOverwrite()?e:e-1:t,n=a.getVisualFromLogicalIdx(i,this.bidiMap),s=this.bidiMap.bidiLevels,o=0;!this.session.getOverwrite()&&e<=t&&s[n]%2!=0&&n++;for(var r=0;r<n;r++)o+=this.charWidths[s[r]];return!this.session.getOverwrite()&&t<e&&s[n]%2==0&&(o+=this.charWidths[s[n]]),this.wrapIndent&&(o+=this.isRtlDir?-1*this.wrapOffset:this.wrapOffset),this.isRtlDir&&(o+=this.rtlLineOffset),o},this.getSelections=function(e,t){var i,n=this.bidiMap,s=n.bidiLevels,o=[],r=0,a=Math.min(e,t)-this.wrapIndent,l=Math.max(e,t)-this.wrapIndent,c=!1,h=!1,u=0;this.wrapIndent&&(r+=this.isRtlDir?-1*this.wrapOffset:this.wrapOffset);for(var d,g=0;g<s.length;g++)d=n.logicalFromVisual[g],i=s[g],(c=a<=d&&d<l)&&!h?u=r:!c&&h&&o.push({left:u,width:r-u}),r+=this.charWidths[i],h=c;if(c&&g===s.length&&o.push({left:u,width:r-u}),this.isRtlDir)for(var f=0;f<o.length;f++)o[f].left+=this.rtlLineOffset;return o},this.offsetToCol=function(e){this.isRtlDir&&(e-=this.rtlLineOffset);var t=0,i=(e=Math.max(e,0),0),n=0,s=this.bidiMap.bidiLevels,o=this.charWidths[s[n]];for(this.wrapIndent&&(e-=this.isRtlDir?-1*this.wrapOffset:this.wrapOffset);i+o/2<e;){if(i+=o,n===s.length-1){o=0;break}o=this.charWidths[s[++n]]}return 0===(t=0<n&&s[n-1]%2!=0&&s[n]%2==0?(e<i&&n--,this.bidiMap.logicalFromVisual[n]):0<n&&s[n-1]%2==0&&s[n]%2!=0?1+(i<e?this.bidiMap.logicalFromVisual[n]:this.bidiMap.logicalFromVisual[n-1]):this.isRtlDir&&n===s.length-1&&0===o&&s[n-1]%2==0||!this.isRtlDir&&0===n&&s[n]%2!=0?1+this.bidiMap.logicalFromVisual[n]:(0<n&&s[n-1]%2!=0&&0!==o&&n--,this.bidiMap.logicalFromVisual[n]))&&this.isRtlDir&&t++,t+this.wrapIndent}}).call(n.prototype),t.BidiHandler=n}),ace.define("ace/selection",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/range"],function(e,t,i){"use strict";function n(e){this.session=e,this.doc=e.getDocument(),this.clearSelection(),this.cursor=this.lead=this.doc.createAnchor(0,0),this.anchor=this.doc.createAnchor(0,0),this.$silent=!1;var t=this;this.cursor.on("change",function(e){t.$cursorChanged=!0,t.$silent||t._emit("changeCursor"),t.$isEmpty||t.$silent||t._emit("changeSelection"),t.$keepDesiredColumnOnChange||e.old.column==e.value.column||(t.$desiredColumn=null)}),this.anchor.on("change",function(){t.$anchorChanged=!0,t.$isEmpty||t.$silent||t._emit("changeSelection")})}var s=e("./lib/oop"),r=e("./lib/lang"),o=e("./lib/event_emitter").EventEmitter,a=e("./range").Range;(function(){s.implement(this,o),this.isEmpty=function(){return this.$isEmpty||this.anchor.row==this.lead.row&&this.anchor.column==this.lead.column},this.isMultiLine=function(){return!this.$isEmpty&&this.anchor.row!=this.cursor.row},this.getCursor=function(){return this.lead.getPosition()},this.setSelectionAnchor=function(e,t){this.$isEmpty=!1,this.anchor.setPosition(e,t)},this.getAnchor=this.getSelectionAnchor=function(){return this.$isEmpty?this.getSelectionLead():this.anchor.getPosition()},this.getSelectionLead=function(){return this.lead.getPosition()},this.isBackwards=function(){var e=this.anchor,t=this.lead;return e.row>t.row||e.row==t.row&&e.column>t.column},this.getRange=function(){var e=this.anchor,t=this.lead;return this.$isEmpty?a.fromPoints(t,t):this.isBackwards()?a.fromPoints(t,e):a.fromPoints(e,t)},this.clearSelection=function(){this.$isEmpty||(this.$isEmpty=!0,this._emit("changeSelection"))},this.selectAll=function(){this.$setSelection(0,0,Number.MAX_VALUE,Number.MAX_VALUE)},this.setRange=this.setSelectionRange=function(e,t){var i=t?e.end:e.start,n=t?e.start:e.end;this.$setSelection(i.row,i.column,n.row,n.column)},this.$setSelection=function(e,t,i,n){var s=this.$isEmpty,o=this.inMultiSelectMode;this.$silent=!0,this.$cursorChanged=this.$anchorChanged=!1,this.anchor.setPosition(e,t),this.cursor.setPosition(i,n),this.$isEmpty=!a.comparePoints(this.anchor,this.cursor),this.$silent=!1,this.$cursorChanged&&this._emit("changeCursor"),(this.$cursorChanged||this.$anchorChanged||s!=this.$isEmpty||o)&&this._emit("changeSelection")},this.$moveSelection=function(e){var t=this.lead;this.$isEmpty&&this.setSelectionAnchor(t.row,t.column),e.call(this)},this.selectTo=function(e,t){this.$moveSelection(function(){this.moveCursorTo(e,t)})},this.selectToPosition=function(e){this.$moveSelection(function(){this.moveCursorToPosition(e)})},this.moveTo=function(e,t){this.clearSelection(),this.moveCursorTo(e,t)},this.moveToPosition=function(e){this.clearSelection(),this.moveCursorToPosition(e)},this.selectUp=function(){this.$moveSelection(this.moveCursorUp)},this.selectDown=function(){this.$moveSelection(this.moveCursorDown)},this.selectRight=function(){this.$moveSelection(this.moveCursorRight)},this.selectLeft=function(){this.$moveSelection(this.moveCursorLeft)},this.selectLineStart=function(){this.$moveSelection(this.moveCursorLineStart)},this.selectLineEnd=function(){this.$moveSelection(this.moveCursorLineEnd)},this.selectFileEnd=function(){this.$moveSelection(this.moveCursorFileEnd)},this.selectFileStart=function(){this.$moveSelection(this.moveCursorFileStart)},this.selectWordRight=function(){this.$moveSelection(this.moveCursorWordRight)},this.selectWordLeft=function(){this.$moveSelection(this.moveCursorWordLeft)},this.getWordRange=function(e,t){if(void 0===t){var i=e||this.lead;e=i.row,t=i.column}return this.session.getWordRange(e,t)},this.selectWord=function(){this.setSelectionRange(this.getWordRange())},this.selectAWord=function(){var e=this.getCursor(),t=this.session.getAWordRange(e.row,e.column);this.setSelectionRange(t)},this.getLineRange=function(e,t){var i,n="number"==typeof e?e:this.lead.row,s=this.session.getFoldLine(n);return i=s?(n=s.start.row,s.end.row):n,!0===t?new a(n,0,i,this.session.getLine(i).length):new a(n,0,i+1,0)},this.selectLine=function(){this.setSelectionRange(this.getLineRange())},this.moveCursorUp=function(){this.moveCursorBy(-1,0)},this.moveCursorDown=function(){this.moveCursorBy(1,0)},this.wouldMoveIntoSoftTab=function(e,t,i){var n=e.column,s=e.column+t;return i<0&&(n=e.column-t,s=e.column),this.session.isTabStop(e)&&this.doc.getLine(e.row).slice(n,s).split(" ").length-1==t},this.moveCursorLeft=function(){var e,t=this.lead.getPosition();if(e=this.session.getFoldAt(t.row,t.column,-1))this.moveCursorTo(e.start.row,e.start.column);else if(0===t.column)0<t.row&&this.moveCursorTo(t.row-1,this.doc.getLine(t.row-1).length);else{var i=this.session.getTabSize();this.wouldMoveIntoSoftTab(t,i,-1)&&!this.session.getNavigateWithinSoftTabs()?this.moveCursorBy(0,-i):this.moveCursorBy(0,-1)}},this.moveCursorRight=function(){var e,t=this.lead.getPosition();if(e=this.session.getFoldAt(t.row,t.column,1))this.moveCursorTo(e.end.row,e.end.column);else if(this.lead.column==this.doc.getLine(this.lead.row).length)this.lead.row<this.doc.getLength()-1&&this.moveCursorTo(this.lead.row+1,0);else{var i=this.session.getTabSize();t=this.lead;this.wouldMoveIntoSoftTab(t,i,1)&&!this.session.getNavigateWithinSoftTabs()?this.moveCursorBy(0,i):this.moveCursorBy(0,1)}},this.moveCursorLineStart=function(){var e=this.lead.row,t=this.lead.column,i=this.session.documentToScreenRow(e,t),n=this.session.screenToDocumentPosition(i,0),s=this.session.getDisplayLine(e,null,n.row,n.column).match(/^\s*/);s[0].length==t||this.session.$useEmacsStyleLineStart||(n.column+=s[0].length),this.moveCursorToPosition(n)},this.moveCursorLineEnd=function(){var e=this.lead,t=this.session.getDocumentLastRowColumnPosition(e.row,e.column);if(this.lead.column==t.column){var i=this.session.getLine(t.row);if(t.column==i.length){var n=i.search(/\s+$/);0<n&&(t.column=n)}}this.moveCursorTo(t.row,t.column)},this.moveCursorFileEnd=function(){var e=this.doc.getLength()-1,t=this.doc.getLine(e).length;this.moveCursorTo(e,t)},this.moveCursorFileStart=function(){this.moveCursorTo(0,0)},this.moveCursorLongWordRight=function(){var e=this.lead.row,t=this.lead.column,i=this.doc.getLine(e),n=i.substring(t);this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0;var s=this.session.getFoldAt(e,t,1);if(s)this.moveCursorTo(s.end.row,s.end.column);else{if(this.session.nonTokenRe.exec(n)&&(t+=this.session.nonTokenRe.lastIndex,this.session.nonTokenRe.lastIndex=0,n=i.substring(t)),t>=i.length)return this.moveCursorTo(e,i.length),this.moveCursorRight(),void(e<this.doc.getLength()-1&&this.moveCursorWordRight());this.session.tokenRe.exec(n)&&(t+=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0),this.moveCursorTo(e,t)}},this.moveCursorLongWordLeft=function(){var e,t=this.lead.row,i=this.lead.column;if(e=this.session.getFoldAt(t,i,-1))this.moveCursorTo(e.start.row,e.start.column);else{var n=this.session.getFoldStringAt(t,i,-1);null==n&&(n=this.doc.getLine(t).substring(0,i));var s=r.stringReverse(n);if(this.session.nonTokenRe.lastIndex=0,this.session.tokenRe.lastIndex=0,this.session.nonTokenRe.exec(s)&&(i-=this.session.nonTokenRe.lastIndex,s=s.slice(this.session.nonTokenRe.lastIndex),this.session.nonTokenRe.lastIndex=0),i<=0)return this.moveCursorTo(t,0),this.moveCursorLeft(),void(0<t&&this.moveCursorWordLeft());this.session.tokenRe.exec(s)&&(i-=this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex=0),this.moveCursorTo(t,i)}},this.$shortWordEndIndex=function(e){var t,i=0,n=/\s/,s=this.session.tokenRe;if(s.lastIndex=0,this.session.tokenRe.exec(e))i=this.session.tokenRe.lastIndex;else{for(;(t=e[i])&&n.test(t);)i++;if(i<1)for(s.lastIndex=0;(t=e[i])&&!s.test(t);)if(s.lastIndex=0,i++,n.test(t)){if(2<i){i--;break}for(;(t=e[i])&&n.test(t);)i++;if(2<i)break}}return s.lastIndex=0,i},this.moveCursorShortWordRight=function(){var e=this.lead.row,t=this.lead.column,i=this.doc.getLine(e),n=i.substring(t),s=this.session.getFoldAt(e,t,1);if(s)return this.moveCursorTo(s.end.row,s.end.column);if(t==i.length){for(var o=this.doc.getLength();e++,n=this.doc.getLine(e),e<o&&/^\s*$/.test(n););/^\s+/.test(n)||(n=""),t=0}var r=this.$shortWordEndIndex(n);this.moveCursorTo(e,t+r)},this.moveCursorShortWordLeft=function(){var e,t=this.lead.row,i=this.lead.column;if(e=this.session.getFoldAt(t,i,-1))return this.moveCursorTo(e.start.row,e.start.column);var n=this.session.getLine(t).substring(0,i);if(0===i){for(;t--,n=this.doc.getLine(t),0<t&&/^\s*$/.test(n););i=n.length,/\s+$/.test(n)||(n="")}var s=r.stringReverse(n),o=this.$shortWordEndIndex(s);return this.moveCursorTo(t,i-o)},this.moveCursorWordRight=function(){this.session.$selectLongWords?this.moveCursorLongWordRight():this.moveCursorShortWordRight()},this.moveCursorWordLeft=function(){this.session.$selectLongWords?this.moveCursorLongWordLeft():this.moveCursorShortWordLeft()},this.moveCursorBy=function(e,t){var i,n=this.session.documentToScreenPosition(this.lead.row,this.lead.column);0===t&&(0!==e&&(this.session.$bidiHandler.isBidiRow(n.row,this.lead.row)?(i=this.session.$bidiHandler.getPosLeft(n.column),n.column=Math.round(i/this.session.$bidiHandler.charWidths[0])):i=n.column*this.session.$bidiHandler.charWidths[0]),this.$desiredColumn?n.column=this.$desiredColumn:this.$desiredColumn=n.column);var s=this.session.screenToDocumentPosition(n.row+e,n.column,i);0!==e&&0===t&&s.row===this.lead.row&&s.column===this.lead.column&&this.session.lineWidgets&&this.session.lineWidgets[s.row]&&(0<s.row||0<e)&&s.row++,this.moveCursorTo(s.row,s.column+t,0===t)},this.moveCursorToPosition=function(e){this.moveCursorTo(e.row,e.column)},this.moveCursorTo=function(e,t,i){var n=this.session.getFoldAt(e,t,1);n&&(e=n.start.row,t=n.start.column),this.$keepDesiredColumnOnChange=!0;var s=this.session.getLine(e);/[\uDC00-\uDFFF]/.test(s.charAt(t))&&s.charAt(t-1)&&(this.lead.row==e&&this.lead.column==t+1?t-=1:t+=1),this.lead.setPosition(e,t),this.$keepDesiredColumnOnChange=!1,i||(this.$desiredColumn=null)},this.moveCursorToScreen=function(e,t,i){var n=this.session.screenToDocumentPosition(e,t);this.moveCursorTo(n.row,n.column,i)},this.detach=function(){this.lead.detach(),this.anchor.detach(),this.session=this.doc=null},this.fromOrientedRange=function(e){this.setSelectionRange(e,e.cursor==e.start),this.$desiredColumn=e.desiredColumn||this.$desiredColumn},this.toOrientedRange=function(e){var t=this.getRange();return e?(e.start.column=t.start.column,e.start.row=t.start.row,e.end.column=t.end.column,e.end.row=t.end.row):e=t,e.cursor=this.isBackwards()?e.start:e.end,e.desiredColumn=this.$desiredColumn,e},this.getRangeOfMovements=function(e){var t=this.getCursor();try{e(this);var i=this.getCursor();return a.fromPoints(t,i)}catch(e){return a.fromPoints(t,t)}finally{this.moveCursorToPosition(t)}},this.toJSON=function(){if(this.rangeCount)var e=this.ranges.map(function(e){var t=e.clone();return t.isBackwards=e.cursor==e.start,t});else(e=this.getRange()).isBackwards=this.isBackwards();return e},this.fromJSON=function(e){if(null==e.start){if(this.rangeList&&1<e.length){this.toSingleRange(e[0]);for(var t=e.length;t--;){var i=a.fromPoints(e[t].start,e[t].end);e[t].isBackwards&&(i.cursor=i.start),this.addRange(i,!0)}return}e=e[0]}this.rangeList&&this.toSingleRange(e),this.setSelectionRange(e,e.isBackwards)},this.isEqual=function(e){if((e.length||this.rangeCount)&&e.length!=this.rangeCount)return!1;if(!e.length||!this.ranges)return this.getRange().isEqual(e);for(var t=this.ranges.length;t--;)if(!this.ranges[t].isEqual(e[t]))return!1;return!0}}).call(n.prototype),t.Selection=n}),ace.define("ace/tokenizer",["require","exports","module","ace/config"],function(e,t,i){"use strict";function n(e){for(var t in this.states=e,this.regExps={},this.matchMappings={},this.states){for(var i=this.states[t],n=[],s=0,o=this.matchMappings[t]={defaultToken:"text"},r="g",a=[],l=0;l<i.length;l++){var c=i[l];if(c.defaultToken&&(o.defaultToken=c.defaultToken),c.caseInsensitive&&(r="gi"),null!=c.regex){c.regex instanceof RegExp&&(c.regex=c.regex.toString().slice(1,-1));var h=c.regex,u=new RegExp("(?:("+h+")|(.))").exec("a").length-2;Array.isArray(c.token)?1==c.token.length||1==u?c.token=c.token[0]:u-1!=c.token.length?(this.reportError("number of classes and regexp groups doesn't match",{rule:c,groupCount:u-1}),c.token=c.token[0]):(c.tokenArray=c.token,c.token=null,c.onMatch=this.$arrayTokens):"function"!=typeof c.token||c.onMatch||(c.onMatch=1<u?this.$applyToken:c.token),1<u&&(h=/\\\d/.test(c.regex)?c.regex.replace(/\\([0-9]+)/g,function(e,t){return"\\"+(parseInt(t,10)+s+1)}):(u=1,this.removeCapturingGroups(c.regex)),c.splitRegex||"string"==typeof c.token||a.push(c)),o[s]=l,s+=u,n.push(h),c.onMatch||(c.onMatch=null)}}n.length||(o[0]=0,n.push("$")),a.forEach(function(e){e.splitRegex=this.createSplitterRegexp(e.regex,r)},this),this.regExps[t]=new RegExp("("+n.join(")|(")+")|($)",r)}}var s=e("./config"),w=2e3;(function(){this.$setMaxTokenCount=function(e){w=0|e},this.$applyToken=function(e){var t=this.splitRegex.exec(e).slice(1),i=this.token.apply(this,t);if("string"==typeof i)return[{type:i,value:e}];for(var n=[],s=0,o=i.length;s<o;s++)t[s]&&(n[n.length]={type:i[s],value:t[s]});return n},this.$arrayTokens=function(e){if(!e)return[];var t=this.splitRegex.exec(e);if(!t)return"text";for(var i=[],n=this.tokenArray,s=0,o=n.length;s<o;s++)t[s+1]&&(i[i.length]={type:n[s],value:t[s+1]});return i},this.removeCapturingGroups=function(e){return e.replace(/\\.|\[(?:\\.|[^\\\]])*|\(\?[:=!]|(\()/g,function(e,t){return t?"(?:":e})},this.createSplitterRegexp=function(e,t){if(-1!=e.indexOf("(?=")){var r=0,a=!1,l={};e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g,function(e,t,i,n,s,o){return a?a="]"!=s:s?a=!0:n?(r==l.stack&&(l.end=o+1,l.stack=-1),r--):i&&(r++,1!=i.length&&(l.stack=r,l.start=o)),e}),null!=l.end&&/^\)*$/.test(e.substr(l.end))&&(e=e.substring(0,l.start)+e.substr(l.end))}return"^"!=e.charAt(0)&&(e="^"+e),"$"!=e.charAt(e.length-1)&&(e+="$"),new RegExp(e,(t||"").replace("g",""))},this.getLineTokens=function(e,t){if(t&&"string"!=typeof t)"#tmp"===(t=(i=t.slice(0))[0])&&(i.shift(),t=i.shift());else var i=[];var n=t||"start",s=this.states[n];s||(n="start",s=this.states[n]);for(var o,r=this.matchMappings[n],a=this.regExps[n],l=[],c=a.lastIndex=0,h=0,u={type:null,value:""};o=a.exec(e);){var d=r.defaultToken,g=null,f=o[0],m=a.lastIndex;if(m-f.length>c){var p=e.substring(c,m-f.length);u.type==d?u.value+=p:(u.type&&l.push(u),u={type:d,value:p})}for(var v=0;v<o.length-2;v++)if(void 0!==o[v+1]){d=(g=s[r[v]]).onMatch?g.onMatch(f,n,i,e):g.token,g.next&&(n="string"==typeof g.next?g.next:g.next(n,i),(s=this.states[n])||(this.reportError("state doesn't exist",n),n="start",s=this.states[n]),r=this.matchMappings[n],c=m,(a=this.regExps[n]).lastIndex=m),g.consumeLineEnd&&(c=m);break}if(f)if("string"==typeof d)g&&!1===g.merge||u.type!==d?(u.type&&l.push(u),u={type:d,value:f}):u.value+=f;else if(d){u.type&&l.push(u),u={type:null,value:""};for(v=0;v<d.length;v++)l.push(d[v])}if(c==e.length)break;if(c=m,h++>w){for(h>2*e.length&&this.reportError("infinite loop with in ace tokenizer",{startState:t,line:e});c<e.length;)u.type&&l.push(u),u={value:e.substring(c,c+=500),type:"overflow"};n="start",i=[];break}}return u.type&&l.push(u),1<i.length&&i[0]!==n&&i.unshift("#tmp",n),{tokens:l,state:i.length?i:n}},this.reportError=s.reportError}).call(n.prototype),t.Tokenizer=n}),ace.define("ace/mode/text_highlight_rules",["require","exports","module","ace/lib/lang"],function(e,t,i){"use strict";function n(){this.$rules={start:[{token:"empty_line",regex:"^$"},{defaultToken:"text"}]}}var c=e("../lib/lang");(function(){this.addRules=function(e,t){if(t)for(var i in e){for(var n=e[i],s=0;s<n.length;s++){var o=n[s];(o.next||o.onMatch)&&("string"==typeof o.next&&0!==o.next.indexOf(t)&&(o.next=t+o.next),o.nextState&&0!==o.nextState.indexOf(t)&&(o.nextState=t+o.nextState))}this.$rules[t+i]=n}else for(var i in e)this.$rules[i]=e[i]},this.getRules=function(){return this.$rules},this.embedRules=function(e,t,i,n,s){var o="function"==typeof e?(new e).getRules():e;if(n)for(var r=0;r<n.length;r++)n[r]=t+n[r];else for(var a in n=[],o)n.push(t+a);if(this.addRules(o,t),i){var l=Array.prototype[s?"push":"unshift"];for(r=0;r<n.length;r++)l.apply(this.$rules[n[r]],c.deepCopy(i))}this.$embeds||(this.$embeds=[]),this.$embeds.push(t)},this.getEmbeds=function(){return this.$embeds};function g(e,t){return"start"==e&&!t.length||t.unshift(this.nextState,e),this.nextState}function f(e,t){return t.shift(),t.shift()||"start"}this.normalizeRules=function(){var u=0,d=this.$rules;Object.keys(d).forEach(function e(t){var i=d[t];i.processed=!0;for(var n=0;n<i.length;n++){var s=i[n],o=null;Array.isArray(s)&&(o=s,s={}),!s.regex&&s.start&&(s.regex=s.start,s.next||(s.next=[]),s.next.push({defaultToken:s.token},{token:s.token+".end",regex:s.end||s.start,next:"pop"}),s.token=s.token+".start",s.push=!0);var r=s.next||s.push;if(r&&Array.isArray(r)){var a=s.stateName;a||("string"!=typeof(a=s.token)&&(a=a[0]||""),d[a]&&(a+=u++)),d[a]=r,e(s.next=a)}else"pop"==r&&(s.next=f);if(s.push&&(s.nextState=s.next||s.push,s.next=g,delete s.push),s.rules)for(var l in s.rules)d[l]?d[l].push&&d[l].push.apply(d[l],s.rules[l]):d[l]=s.rules[l];var c="string"==typeof s?s:s.include;if(c&&(o=Array.isArray(c)?c.map(function(e){return d[e]}):d[c]),o){var h=[n,1].concat(o);s.noEscape&&(h=h.filter(function(e){return!e.next})),i.splice.apply(i,h),n--}s.keywordMap&&(s.token=this.createKeywordMapper(s.keywordMap,s.defaultToken||"text",s.caseInsensitive),delete s.defaultToken)}},this)},this.createKeywordMapper=function(s,t,o,r){var a=Object.create(null);return Object.keys(s).forEach(function(e){var t=s[e];o&&(t=t.toLowerCase());for(var i=t.split(r||"|"),n=i.length;n--;)a[i[n]]=e}),Object.getPrototypeOf(a)&&(a.__proto__=null),this.$keywordList=Object.keys(a),s=null,o?function(e){return a[e.toLowerCase()]||t}:function(e){return a[e]||t}},this.getKeywords=function(){return this.$keywords}}).call(n.prototype),t.TextHighlightRules=n}),ace.define("ace/mode/behaviour",["require","exports","module"],function(e,t,i){"use strict";function n(){this.$behaviours={}}(function(){this.add=function(e,t,i){switch(void 0){case this.$behaviours:this.$behaviours={};case this.$behaviours[e]:this.$behaviours[e]={}}this.$behaviours[e][t]=i},this.addBehaviours=function(e){for(var t in e)for(var i in e[t])this.add(t,i,e[t][i])},this.remove=function(e){this.$behaviours&&this.$behaviours[e]&&delete this.$behaviours[e]},this.inherit=function(e,t){if("function"==typeof e)var i=(new e).getBehaviours(t);else i=e.getBehaviours(t);this.addBehaviours(i)},this.getBehaviours=function(e){if(!e)return this.$behaviours;for(var t={},i=0;i<e.length;i++)this.$behaviours[e[i]]&&(t[e[i]]=this.$behaviours[e[i]]);return t}}).call(n.prototype),t.Behaviour=n}),ace.define("ace/token_iterator",["require","exports","module","ace/range"],function(e,t,i){"use strict";function n(e,t,i){this.$session=e,this.$row=t,this.$rowTokens=e.getTokens(t);var n=e.getTokenAt(t,i);this.$tokenIndex=n?n.index:-1}var s=e("./range").Range;(function(){this.stepBackward=function(){for(this.$tokenIndex-=1;this.$tokenIndex<0;){if(this.$row-=1,this.$row<0)return this.$row=0,null;this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=this.$rowTokens.length-1}return this.$rowTokens[this.$tokenIndex]},this.stepForward=function(){var e;for(this.$tokenIndex+=1;this.$tokenIndex>=this.$rowTokens.length;){if(this.$row+=1,e=e||this.$session.getLength(),this.$row>=e)return this.$row=e-1,null;this.$rowTokens=this.$session.getTokens(this.$row),this.$tokenIndex=0}return this.$rowTokens[this.$tokenIndex]},this.getCurrentToken=function(){return this.$rowTokens[this.$tokenIndex]},this.getCurrentTokenRow=function(){return this.$row},this.getCurrentTokenColumn=function(){var e=this.$rowTokens,t=this.$tokenIndex,i=e[t].start;if(void 0!==i)return i;for(i=0;0<t;)i+=e[t-=1].value.length;return i},this.getCurrentTokenPosition=function(){return{row:this.$row,column:this.getCurrentTokenColumn()}},this.getCurrentTokenRange=function(){var e=this.$rowTokens[this.$tokenIndex],t=this.getCurrentTokenColumn();return new s(this.$row,t,this.$row,t+e.value.length)}}).call(n.prototype),t.TokenIterator=n}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,i){"use strict";function C(e){var t=-1;if(e.multiSelect&&(t=e.selection.index,l.rangeCount!=e.multiSelect.rangeCount&&(l={rangeCount:e.multiSelect.rangeCount})),l[t])return f=l[t];f=l[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""}}function S(e,t,i,n){var s=e.end.row-e.start.row;return{text:i+t+n,selection:[0,e.start.column+1,s,e.end.column+(s?0:1)]}}var f,n=e("../../lib/oop"),s=e("../behaviour").Behaviour,o=e("../../token_iterator").TokenIterator,m=e("../../lib/lang"),r=["text","paren.rparen","rparen","paren","punctuation.operator"],a=["text","paren.rparen","rparen","paren","punctuation.operator","comment"],l={},x={'"':'"',"'":"'"},p=function(g){this.add("braces","insertion",function(e,t,i,n,s){var o=i.getCursorPosition(),r=n.doc.getLine(o.row);if("{"==s){C(i);var a=i.getSelectionRange(),l=n.doc.getTextRange(a);if(""!==l&&"{"!==l&&i.getWrapBehavioursEnabled())return S(a,l,"{","}");if(p.isSaneInsertion(i,n))return/[\]\}\)]/.test(r[o.column])||i.inMultiSelectMode||g&&g.braces?(p.recordAutoInsert(i,n,"}"),{text:"{}",selection:[1,1]}):(p.recordMaybeInsert(i,n,"{"),{text:"{",selection:[1,1]})}else if("}"==s){if(C(i),"}"==r.substring(o.column,o.column+1))if(null!==n.$findOpeningBracket("}",{column:o.column+1,row:o.row})&&p.isAutoInsertedClosing(o,r,s))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}else{if("\n"==s||"\r\n"==s){C(i);var c="";if(p.isMaybeInsertedClosing(o,r)&&(c=m.stringRepeat("}",f.maybeInsertedBrackets),p.clearMaybeInsertedClosing()),"}"===r.substring(o.column,o.column+1)){var h=n.findMatchingBracket({row:o.row,column:o.column+1},"}");if(!h)return null;var u=this.$getIndent(n.getLine(h.row))}else{if(!c)return void p.clearMaybeInsertedClosing();u=this.$getIndent(r)}var d=u+n.getTabString();return{text:"\n"+d+"\n"+u+c,selection:[1,d.length,1,d.length]}}p.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,i,n,s){var o=n.doc.getTextRange(s);if(!s.isMultiLine()&&"{"==o){if(C(i),"}"==n.doc.getLine(s.start.row).substring(s.end.column,s.end.column+1))return s.end.column++,s;f.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,i,n,s){if("("==s){C(i);var o=i.getSelectionRange(),r=n.doc.getTextRange(o);if(""!==r&&i.getWrapBehavioursEnabled())return S(o,r,"(",")");if(p.isSaneInsertion(i,n))return p.recordAutoInsert(i,n,")"),{text:"()",selection:[1,1]}}else if(")"==s){C(i);var a=i.getCursorPosition(),l=n.doc.getLine(a.row);if(")"==l.substring(a.column,a.column+1))if(null!==n.$findOpeningBracket(")",{column:a.column+1,row:a.row})&&p.isAutoInsertedClosing(a,l,s))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}),this.add("parens","deletion",function(e,t,i,n,s){var o=n.doc.getTextRange(s);if(!s.isMultiLine()&&"("==o&&(C(i),")"==n.doc.getLine(s.start.row).substring(s.start.column+1,s.start.column+2)))return s.end.column++,s}),this.add("brackets","insertion",function(e,t,i,n,s){if("["==s){C(i);var o=i.getSelectionRange(),r=n.doc.getTextRange(o);if(""!==r&&i.getWrapBehavioursEnabled())return S(o,r,"[","]");if(p.isSaneInsertion(i,n))return p.recordAutoInsert(i,n,"]"),{text:"[]",selection:[1,1]}}else if("]"==s){C(i);var a=i.getCursorPosition(),l=n.doc.getLine(a.row);if("]"==l.substring(a.column,a.column+1))if(null!==n.$findOpeningBracket("]",{column:a.column+1,row:a.row})&&p.isAutoInsertedClosing(a,l,s))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}),this.add("brackets","deletion",function(e,t,i,n,s){var o=n.doc.getTextRange(s);if(!s.isMultiLine()&&"["==o&&(C(i),"]"==n.doc.getLine(s.start.row).substring(s.start.column+1,s.start.column+2)))return s.end.column++,s}),this.add("string_dquotes","insertion",function(e,t,i,n,s){var o=n.$mode.$quotes||x;if(1==s.length&&o[s]){if(this.lineCommentStart&&-1!=this.lineCommentStart.indexOf(s))return;C(i);var r=s,a=i.getSelectionRange(),l=n.doc.getTextRange(a);if(""!==l&&(1!=l.length||!o[l])&&i.getWrapBehavioursEnabled())return S(a,l,r,r);if(!l){var c=i.getCursorPosition(),h=n.doc.getLine(c.row),u=h.substring(c.column-1,c.column),d=h.substring(c.column,c.column+1),g=n.getTokenAt(c.row,c.column),f=n.getTokenAt(c.row,c.column+1);if("\\"==u&&g&&/escape/.test(g.type))return null;var m,p=g&&/string|escape/.test(g.type),v=!f||/string|escape/.test(f.type);if(d==r)(m=p!==v)&&/string\.end/.test(f.type)&&(m=!1);else{if(p&&!v)return null;if(p&&v)return null;var w=n.$mode.tokenRe;w.lastIndex=0;var b=w.test(u);w.lastIndex=0;var y=w.test(u);if(b||y)return null;if(d&&!/[\s;,.})\]\\]/.test(d))return null;var $=h[c.column-2];if(u==r&&($==r||w.test($)))return null;m=!0}return{text:m?r+r:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,i,n,s){var o=n.$mode.$quotes||x,r=n.doc.getTextRange(s);if(!s.isMultiLine()&&o.hasOwnProperty(r)&&(C(i),n.doc.getLine(s.start.row).substring(s.start.column+1,s.start.column+2)==r))return s.end.column++,s})};p.isSaneInsertion=function(e,t){var i=e.getCursorPosition(),n=new o(t,i.row,i.column);if(!this.$matchTokenType(n.getCurrentToken()||"text",r)){if(/[)}\]]/.test(e.session.getLine(i.row)[i.column]))return!0;var s=new o(t,i.row,i.column+1);if(!this.$matchTokenType(s.getCurrentToken()||"text",r))return!1}return n.stepForward(),n.getCurrentTokenRow()!==i.row||this.$matchTokenType(n.getCurrentToken()||"text",a)},p.$matchTokenType=function(e,t){return-1<t.indexOf(e.type||e)},p.recordAutoInsert=function(e,t,i){var n=e.getCursorPosition(),s=t.doc.getLine(n.row);this.isAutoInsertedClosing(n,s,f.autoInsertedLineEnd[0])||(f.autoInsertedBrackets=0),f.autoInsertedRow=n.row,f.autoInsertedLineEnd=i+s.substr(n.column),f.autoInsertedBrackets++},p.recordMaybeInsert=function(e,t,i){var n=e.getCursorPosition(),s=t.doc.getLine(n.row);this.isMaybeInsertedClosing(n,s)||(f.maybeInsertedBrackets=0),f.maybeInsertedRow=n.row,f.maybeInsertedLineStart=s.substr(0,n.column)+i,f.maybeInsertedLineEnd=s.substr(n.column),f.maybeInsertedBrackets++},p.isAutoInsertedClosing=function(e,t,i){return 0<f.autoInsertedBrackets&&e.row===f.autoInsertedRow&&i===f.autoInsertedLineEnd[0]&&t.substr(e.column)===f.autoInsertedLineEnd},p.isMaybeInsertedClosing=function(e,t){return 0<f.maybeInsertedBrackets&&e.row===f.maybeInsertedRow&&t.substr(e.column)===f.maybeInsertedLineEnd&&t.substr(0,e.column)==f.maybeInsertedLineStart},p.popAutoInsertedClosing=function(){f.autoInsertedLineEnd=f.autoInsertedLineEnd.substr(1),f.autoInsertedBrackets--},p.clearMaybeInsertedClosing=function(){f&&(f.maybeInsertedBrackets=0,f.maybeInsertedRow=-1)},n.inherits(p,s),t.CstyleBehaviour=p}),ace.define("ace/unicode",["require","exports","module"],function(e,t,i){"use strict";for(var n=[48,9,8,25,5,0,2,25,48,0,11,0,5,0,6,22,2,30,2,457,5,11,15,4,8,0,2,0,18,116,2,1,3,3,9,0,2,2,2,0,2,19,2,82,2,138,2,4,3,155,12,37,3,0,8,38,10,44,2,0,2,1,2,1,2,0,9,26,6,2,30,10,7,61,2,9,5,101,2,7,3,9,2,18,3,0,17,58,3,100,15,53,5,0,6,45,211,57,3,18,2,5,3,11,3,9,2,1,7,6,2,2,2,7,3,1,3,21,2,6,2,0,4,3,3,8,3,1,3,3,9,0,5,1,2,4,3,11,16,2,2,5,5,1,3,21,2,6,2,1,2,1,2,1,3,0,2,4,5,1,3,2,4,0,8,3,2,0,8,15,12,2,2,8,2,2,2,21,2,6,2,1,2,4,3,9,2,2,2,2,3,0,16,3,3,9,18,2,2,7,3,1,3,21,2,6,2,1,2,4,3,8,3,1,3,2,9,1,5,1,2,4,3,9,2,0,17,1,2,5,4,2,2,3,4,1,2,0,2,1,4,1,4,2,4,11,5,4,4,2,2,3,3,0,7,0,15,9,18,2,2,7,2,2,2,22,2,9,2,4,4,7,2,2,2,3,8,1,2,1,7,3,3,9,19,1,2,7,2,2,2,22,2,9,2,4,3,8,2,2,2,3,8,1,8,0,2,3,3,9,19,1,2,7,2,2,2,22,2,15,4,7,2,2,2,3,10,0,9,3,3,9,11,5,3,1,2,17,4,23,2,8,2,0,3,6,4,0,5,5,2,0,2,7,19,1,14,57,6,14,2,9,40,1,2,0,3,1,2,0,3,0,7,3,2,6,2,2,2,0,2,0,3,1,2,12,2,2,3,4,2,0,2,5,3,9,3,1,35,0,24,1,7,9,12,0,2,0,2,0,5,9,2,35,5,19,2,5,5,7,2,35,10,0,58,73,7,77,3,37,11,42,2,0,4,328,2,3,3,6,2,0,2,3,3,40,2,3,3,32,2,3,3,6,2,0,2,3,3,14,2,56,2,3,3,66,5,0,33,15,17,84,13,619,3,16,2,25,6,74,22,12,2,6,12,20,12,19,13,12,2,2,2,1,13,51,3,29,4,0,5,1,3,9,34,2,3,9,7,87,9,42,6,69,11,28,4,11,5,11,11,39,3,4,12,43,5,25,7,10,38,27,5,62,2,28,3,10,7,9,14,0,89,75,5,9,18,8,13,42,4,11,71,55,9,9,4,48,83,2,2,30,14,230,23,280,3,5,3,37,3,5,3,7,2,0,2,0,2,0,2,30,3,52,2,6,2,0,4,2,2,6,4,3,3,5,5,12,6,2,2,6,67,1,20,0,29,0,14,0,17,4,60,12,5,0,4,11,18,0,5,0,3,9,2,0,4,4,7,0,2,0,2,0,2,3,2,10,3,3,6,4,5,0,53,1,2684,46,2,46,2,132,7,6,15,37,11,53,10,0,17,22,10,6,2,6,2,6,2,6,2,6,2,6,2,6,2,6,2,31,48,0,470,1,36,5,2,4,6,1,5,85,3,1,3,2,2,89,2,3,6,40,4,93,18,23,57,15,513,6581,75,20939,53,1164,68,45,3,268,4,27,21,31,3,13,13,1,2,24,9,69,11,1,38,8,3,102,3,1,111,44,25,51,13,68,12,9,7,23,4,0,5,45,3,35,13,28,4,64,15,10,39,54,10,13,3,9,7,22,4,1,5,66,25,2,227,42,2,1,3,9,7,11171,13,22,5,48,8453,301,3,61,3,105,39,6,13,4,6,11,2,12,2,4,2,0,2,1,2,1,2,107,34,362,19,63,3,53,41,11,5,15,17,6,13,1,25,2,33,4,2,134,20,9,8,25,5,0,2,25,12,88,4,5,3,5,3,5,3,2],s=0,o=[],r=0;r<n.length;r+=2)o.push(s+=n[r]),n[r+1]&&o.push(45,s+=n[r+1]);t.wordChars=String.fromCharCode.apply(null,o)}),ace.define("ace/mode/text",["require","exports","module","ace/config","ace/tokenizer","ace/mode/text_highlight_rules","ace/mode/behaviour/cstyle","ace/unicode","ace/lib/lang","ace/token_iterator","ace/range"],function(e,t,i){"use strict";function n(){this.HighlightRules=o}var r=e("../config"),s=e("../tokenizer").Tokenizer,o=e("./text_highlight_rules").TextHighlightRules,a=e("./behaviour/cstyle").CstyleBehaviour,l=e("../unicode"),$=e("../lib/lang"),m=e("../token_iterator").TokenIterator,p=e("../range").Range;(function(){this.$defaultBehaviour=new a,this.tokenRe=new RegExp("^["+l.wordChars+"\\$_]+","g"),this.nonTokenRe=new RegExp("^(?:[^"+l.wordChars+"\\$_]|\\s])+","g"),this.getTokenizer=function(){return this.$tokenizer||(this.$highlightRules=this.$highlightRules||new this.HighlightRules(this.$highlightRuleConfig),this.$tokenizer=new s(this.$highlightRules.getRules())),this.$tokenizer},this.lineCommentStart="",this.blockComment="",this.toggleCommentLines=function(e,s,i,n){function t(e){for(var t=i;t<=n;t++)e(o.getLine(t),t)}var o=s.doc,r=!0,a=!0,l=1/0,c=s.getTabSize(),h=!1;if(this.lineCommentStart){if(Array.isArray(this.lineCommentStart))m=this.lineCommentStart.map($.escapeRegExp).join("|"),g=this.lineCommentStart[0];else m=$.escapeRegExp(this.lineCommentStart),g=this.lineCommentStart;m=new RegExp("^(\\s*)(?:"+m+") ?"),h=s.getUseSoftTabs();w=function(e,t){var i=e.match(m);if(i){var n=i[1].length,s=i[0].length;d(e,n,s)||" "!=i[0][s-1]||s--,o.removeInLine(t,n,s)}};var u=g+" ",d=(v=function(e,t){r&&!/\S/.test(e)||(d(e,l,l)?o.insertInLine({row:t,column:l},u):o.insertInLine({row:t,column:l},g))},b=function(e,t){return m.test(e)},function(e,t,i){for(var n=0;t--&&" "==e.charAt(t);)n++;if(n%c!=0)return!1;for(n=0;" "==e.charAt(i++);)n++;return 2<c?n%c!=c-1:n%c==0})}else{if(!this.blockComment)return!1;var g=this.blockComment.start,f=this.blockComment.end,m=new RegExp("^(\\s*)(?:"+$.escapeRegExp(g)+")"),p=new RegExp("(?:"+$.escapeRegExp(f)+")\\s*$"),v=function(e,t){b(e,t)||r&&!/\S/.test(e)||(o.insertInLine({row:t,column:e.length},f),o.insertInLine({row:t,column:l},g))},w=function(e,t){var i;(i=e.match(p))&&o.removeInLine(t,e.length-i[0].length,e.length),(i=e.match(m))&&o.removeInLine(t,i[1].length,i[0].length)},b=function(e,t){if(m.test(e))return!0;for(var i=s.getTokens(t),n=0;n<i.length;n++)if("comment"===i[n].type)return!0}}var y=1/0;t(function(e,t){var i=e.search(/\S/);-1!==i?(i<l&&(l=i),a&&!b(e,t)&&(a=!1)):y>e.length&&(y=e.length)}),l==1/0&&(l=y,a=r=!1),h&&l%c!=0&&(l=Math.floor(l/c)*c),t(a?w:v)},this.toggleBlockComment=function(e,t,i,n){var s=this.blockComment;if(s){!s.start&&s[0]&&(s=s[0]);var o,r,a=(g=new m(t,n.row,n.column)).getCurrentToken(),l=(t.selection,t.selection.toOrientedRange());if(a&&/comment/.test(a.type)){for(var c,h;a&&/comment/.test(a.type);){if(-1!=(f=a.value.indexOf(s.start))){var u=g.getCurrentTokenRow(),d=g.getCurrentTokenColumn()+f;c=new p(u,d,u,d+s.start.length);break}a=g.stepBackward()}var g;for(a=(g=new m(t,n.row,n.column)).getCurrentToken();a&&/comment/.test(a.type);){var f;if(-1!=(f=a.value.indexOf(s.end))){u=g.getCurrentTokenRow(),d=g.getCurrentTokenColumn()+f;h=new p(u,d,u,d+s.end.length);break}a=g.stepForward()}h&&t.remove(h),c&&(t.remove(c),o=c.start.row,r=-s.start.length)}else r=s.start.length,o=i.start.row,t.insert(i.end,s.end),t.insert(i.start,s.start);l.start.row==o&&(l.start.column+=r),l.end.row==o&&(l.end.column+=r),t.selection.fromOrientedRange(l)}},this.getNextLineIndent=function(e,t,i){return this.$getIndent(t)},this.checkOutdent=function(e,t,i){return!1},this.autoOutdent=function(e,t,i){},this.$getIndent=function(e){return e.match(/^\s*/)[0]},this.createWorker=function(e){return null},this.createModeDelegates=function(e){for(var n in this.$embeds=[],this.$modes={},e)if(e[n]){var t=e[n],i=t.prototype.$id,s=r.$modes[i];s||(r.$modes[i]=s=new t),r.$modes[n]||(r.$modes[n]=s),this.$embeds.push(n),this.$modes[n]=s}var o=["toggleBlockComment","toggleCommentLines","getNextLineIndent","checkOutdent","autoOutdent","transformAction","getCompletions"];for(n=0;n<o.length;n++)!function(e){var t=o[n],i=e[t];e[o[n]]=function(){return this.$delegator(t,arguments,i)}}(this)},this.$delegator=function(e,t,i){var n=t[0]||"start";if("string"!=typeof n){if(Array.isArray(n[2])){var s=n[2][n[2].length-1];if(r=this.$modes[s])return r[e].apply(r,[n[1]].concat([].slice.call(t,1)))}n=n[0]||"start"}for(var o=0;o<this.$embeds.length;o++)if(this.$modes[this.$embeds[o]]){var r,a=n.split(this.$embeds[o]);if(!a[0]&&a[1])return t[0]=a[1],(r=this.$modes[this.$embeds[o]])[e].apply(r,t)}var l=i.apply(this,t);return i?l:void 0},this.transformAction=function(e,t,i,n,s){if(this.$behaviour){var o=this.$behaviour.getBehaviours();for(var r in o)if(o[r][t]){var a=o[r][t].apply(this,arguments);if(a)return a}}},this.getKeywords=function(e){if(!this.completionKeywords){var t=this.$tokenizer.rules,i=[];for(var n in t)for(var s=t[n],o=0,r=s.length;o<r;o++)if("string"==typeof s[o].token)/keyword|support|storage/.test(s[o].token)&&i.push(s[o].regex);else if("object"==typeof s[o].token)for(var a=0,l=s[o].token.length;a<l;a++)if(/keyword|support|storage/.test(s[o].token[a])){n=s[o].regex.match(/\(.+?\)/g)[a];i.push(n.substr(1,n.length-2))}this.completionKeywords=i}return e?i.concat(this.$keywordList||[]):this.$keywordList},this.$createKeywordList=function(){return this.$highlightRules||this.getTokenizer(),this.$keywordList=this.$highlightRules.$keywordList||[]},this.getCompletions=function(e,t,i,n){return(this.$keywordList||this.$createKeywordList()).map(function(e){return{name:e,value:e,score:0,meta:"keyword"}})},this.$id="ace/mode/text"}).call(n.prototype),t.Mode=n}),ace.define("ace/apply_delta",["require","exports","module"],function(e,t,i){"use strict";t.applyDelta=function(e,t,i){var n=t.start.row,s=t.start.column,o=e[n]||"";switch(t.action){case"insert":if(1===t.lines.length)e[n]=o.substring(0,s)+t.lines[0]+o.substring(s);else{var r=[n,1].concat(t.lines);e.splice.apply(e,r),e[n]=o.substring(0,s)+e[n],e[n+t.lines.length-1]+=o.substring(s)}break;case"remove":var a=t.end.column,l=t.end.row;n===l?e[n]=o.substring(0,s)+o.substring(a):e.splice(n,l-n+1,o.substring(0,s)+e[l].substring(a))}}}),ace.define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(e,t,i){"use strict";var n=e("./lib/oop"),s=e("./lib/event_emitter").EventEmitter,o=t.Anchor=function(e,t,i){this.$onChange=this.onChange.bind(this),this.attach(e),void 0===i?this.setPosition(t.row,t.column):this.setPosition(t,i)};(function(){function l(e,t,i){var n=i?e.column<=t.column:e.column<t.column;return e.row<t.row||e.row==t.row&&n}n.implement(this,s),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.$insertRight=!1,this.onChange=function(e){if(!(e.start.row==e.end.row&&e.start.row!=this.row||e.start.row>this.row)){var t=function(e,t,i){var n="insert"==e.action,s=(n?1:-1)*(e.end.row-e.start.row),o=(n?1:-1)*(e.end.column-e.start.column),r=e.start,a=n?r:e.end;return l(t,r,i)?{row:t.row,column:t.column}:l(a,t,!i)?{row:t.row+s,column:t.column+(t.row==a.row?o:0)}:{row:r.row,column:r.column}}(e,{row:this.row,column:this.column},this.$insertRight);this.setPosition(t.row,t.column,!0)}},this.setPosition=function(e,t,i){var n;if(n=i?{row:e,column:t}:this.$clipPositionToDocument(e,t),this.row!=n.row||this.column!=n.column){var s={row:this.row,column:this.column};this.row=n.row,this.column=n.column,this._signal("change",{old:s,value:n})}},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.attach=function(e){this.document=e||this.document,this.document.on("change",this.$onChange)},this.$clipPositionToDocument=function(e,t){var i={};return e>=this.document.getLength()?(i.row=Math.max(0,this.document.getLength()-1),i.column=this.document.getLine(i.row).length):e<0?(i.row=0,i.column=0):(i.row=e,i.column=Math.min(this.document.getLine(i.row).length,Math.max(0,t))),t<0&&(i.column=0),i}}).call(o.prototype)}),ace.define("ace/document",["require","exports","module","ace/lib/oop","ace/apply_delta","ace/lib/event_emitter","ace/range","ace/anchor"],function(e,t,i){"use strict";function n(e){this.$lines=[""],0===e.length?this.$lines=[""]:Array.isArray(e)?this.insertMergedLines({row:0,column:0},e):this.insert({row:0,column:0},e)}var s=e("./lib/oop"),o=e("./apply_delta").applyDelta,r=e("./lib/event_emitter").EventEmitter,h=e("./range").Range,a=e("./anchor").Anchor;(function(){s.implement(this,r),this.setValue=function(e){var t=this.getLength()-1;this.remove(new h(0,0,t,this.getLine(t).length)),this.insert({row:0,column:0},e)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(e,t){return new a(this,e,t)},0==="aaa".split(/a/).length?this.$split=function(e){return e.replace(/\r\n|\r/g,"\n").split("\n")}:this.$split=function(e){return e.split(/\r\n|\r|\n/)},this.$detectNewLine=function(e){var t=e.match(/^.*?(\r\n|\r|\n)/m);this.$autoNewLine=t?t[1]:"\n",this._signal("changeNewLineMode")},this.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return"\r\n";case"unix":return"\n";default:return this.$autoNewLine||"\n"}},this.$autoNewLine="",this.$newLineMode="auto",this.setNewLineMode=function(e){this.$newLineMode!==e&&(this.$newLineMode=e,this._signal("changeNewLineMode"))},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(e){return"\r\n"==e||"\r"==e||"\n"==e},this.getLine=function(e){return this.$lines[e]||""},this.getLines=function(e,t){return this.$lines.slice(e,t+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(e){return this.getLinesForRange(e).join(this.getNewLineCharacter())},this.getLinesForRange=function(e){var t;if(e.start.row===e.end.row)t=[this.getLine(e.start.row).substring(e.start.column,e.end.column)];else{(t=this.getLines(e.start.row,e.end.row))[0]=(t[0]||"").substring(e.start.column);var i=t.length-1;e.end.row-e.start.row==i&&(t[i]=t[i].substring(0,e.end.column))}return t},this.insertLines=function(e,t){return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."),this.insertFullLines(e,t)},this.removeLines=function(e,t){return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."),this.removeFullLines(e,t)},this.insertNewLine=function(e){return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."),this.insertMergedLines(e,["",""])},this.insert=function(e,t){return this.getLength()<=1&&this.$detectNewLine(t),this.insertMergedLines(e,this.$split(t))},this.insertInLine=function(e,t){var i=this.clippedPos(e.row,e.column),n=this.pos(e.row,e.column+t.length);return this.applyDelta({start:i,end:n,action:"insert",lines:[t]},!0),this.clonePos(n)},this.clippedPos=function(e,t){var i=this.getLength();void 0===e?e=i:e<0?e=0:i<=e&&(e=i-1,t=void 0);var n=this.getLine(e);return null==t&&(t=n.length),{row:e,column:t=Math.min(Math.max(t,0),n.length)}},this.clonePos=function(e){return{row:e.row,column:e.column}},this.pos=function(e,t){return{row:e,column:t}},this.$clipPosition=function(e){var t=this.getLength();return e.row>=t?(e.row=Math.max(0,t-1),e.column=this.getLine(t-1).length):(e.row=Math.max(0,e.row),e.column=Math.min(Math.max(e.column,0),this.getLine(e.row).length)),e},this.insertFullLines=function(e,t){var i=0;i=(e=Math.min(Math.max(e,0),this.getLength()))<this.getLength()?(t=t.concat([""]),0):(t=[""].concat(t),e--,this.$lines[e].length),this.insertMergedLines({row:e,column:i},t)},this.insertMergedLines=function(e,t){var i=this.clippedPos(e.row,e.column),n={row:i.row+t.length-1,column:(1==t.length?i.column:0)+t[t.length-1].length};return this.applyDelta({start:i,end:n,action:"insert",lines:t}),this.clonePos(n)},this.remove=function(e){var t=this.clippedPos(e.start.row,e.start.column),i=this.clippedPos(e.end.row,e.end.column);return this.applyDelta({start:t,end:i,action:"remove",lines:this.getLinesForRange({start:t,end:i})}),this.clonePos(t)},this.removeInLine=function(e,t,i){var n=this.clippedPos(e,t),s=this.clippedPos(e,i);return this.applyDelta({start:n,end:s,action:"remove",lines:this.getLinesForRange({start:n,end:s})},!0),this.clonePos(n)},this.removeFullLines=function(e,t){e=Math.min(Math.max(0,e),this.getLength()-1);var i=(t=Math.min(Math.max(0,t),this.getLength()-1))==this.getLength()-1&&0<e,n=t<this.getLength()-1,s=i?e-1:e,o=i?this.getLine(s).length:0,r=n?t+1:t,a=n?0:this.getLine(r).length,l=new h(s,o,r,a),c=this.$lines.slice(e,t+1);return this.applyDelta({start:l.start,end:l.end,action:"remove",lines:this.getLinesForRange(l)}),c},this.removeNewLine=function(e){e<this.getLength()-1&&0<=e&&this.applyDelta({start:this.pos(e,this.getLine(e).length),end:this.pos(e+1,0),action:"remove",lines:["",""]})},this.replace=function(e,t){return e instanceof h||(e=h.fromPoints(e.start,e.end)),0===t.length&&e.isEmpty()?e.start:t==this.getTextRange(e)?e.end:(this.remove(e),t?this.insert(e.start,t):e.start)},this.applyDeltas=function(e){for(var t=0;t<e.length;t++)this.applyDelta(e[t])},this.revertDeltas=function(e){for(var t=e.length-1;0<=t;t--)this.revertDelta(e[t])},this.applyDelta=function(e,t){var i="insert"==e.action;(i?e.lines.length<=1&&!e.lines[0]:!h.comparePoints(e.start,e.end))||(i&&2e4<e.lines.length?this.$splitAndapplyLargeDelta(e,2e4):(o(this.$lines,e,t),this._signal("change",e)))},this.$splitAndapplyLargeDelta=function(e,t){for(var i=e.lines,n=i.length-t+1,s=e.start.row,o=e.start.column,r=0,a=0;r<n;r=a){a+=t-1;var l=i.slice(r,a);l.push(""),this.applyDelta({start:this.pos(s+r,o),end:this.pos(s+a,o=0),action:e.action,lines:l},!0)}e.lines=i.slice(r),e.start.row=s+r,e.start.column=o,this.applyDelta(e,!0)},this.revertDelta=function(e){this.applyDelta({start:this.clonePos(e.start),end:this.clonePos(e.end),action:"insert"==e.action?"remove":"insert",lines:e.lines.slice()})},this.indexToPosition=function(e,t){for(var i=this.$lines||this.getAllLines(),n=this.getNewLineCharacter().length,s=t||0,o=i.length;s<o;s++)if((e-=i[s].length+n)<0)return{row:s,column:e+i[s].length+n};return{row:o-1,column:e+i[o-1].length+n}},this.positionToIndex=function(e,t){for(var i=this.$lines||this.getAllLines(),n=this.getNewLineCharacter().length,s=0,o=Math.min(e.row,i.length),r=t||0;r<o;++r)s+=i[r].length+n;return s+e.column}}).call(n.prototype),t.Document=n}),ace.define("ace/background_tokenizer",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(e,t,i){"use strict";function n(e,t){this.running=!1,this.lines=[],this.states=[],this.currentLine=0,this.tokenizer=e;var a=this;this.$worker=function(){if(a.running){for(var e=new Date,t=a.currentLine,i=-1,n=a.doc,s=t;a.lines[t];)t++;var o=n.getLength(),r=0;for(a.running=!1;t<o;){for(a.$tokenizeRow(t),i=t;t++,a.lines[t];);if(++r%5==0&&20<new Date-e){a.running=setTimeout(a.$worker,20);break}}a.currentLine=t,-1==i&&(i=t),s<=i&&a.fireUpdateEvent(s,i)}}}var s=e("./lib/oop"),o=e("./lib/event_emitter").EventEmitter;(function(){s.implement(this,o),this.setTokenizer=function(e){this.tokenizer=e,this.lines=[],this.states=[],this.start(0)},this.setDocument=function(e){this.doc=e,this.lines=[],this.states=[],this.stop()},this.fireUpdateEvent=function(e,t){var i={first:e,last:t};this._signal("update",{data:i})},this.start=function(e){this.currentLine=Math.min(e||0,this.currentLine,this.doc.getLength()),this.lines.splice(this.currentLine,this.lines.length),this.states.splice(this.currentLine,this.states.length),this.stop(),this.running=setTimeout(this.$worker,700)},this.scheduleStart=function(){this.running||(this.running=setTimeout(this.$worker,700))},this.$updateOnChange=function(e){var t=e.start.row,i=e.end.row-t;if(0==i)this.lines[t]=null;else if("remove"==e.action)this.lines.splice(t,1+i,null),this.states.splice(t,1+i,null);else{var n=Array(1+i);n.unshift(t,1),this.lines.splice.apply(this.lines,n),this.states.splice.apply(this.states,n)}this.currentLine=Math.min(t,this.currentLine,this.doc.getLength()),this.stop()},this.stop=function(){this.running&&clearTimeout(this.running),this.running=!1},this.getTokens=function(e){return this.lines[e]||this.$tokenizeRow(e)},this.getState=function(e){return this.currentLine==e&&this.$tokenizeRow(e),this.states[e]||"start"},this.$tokenizeRow=function(e){var t=this.doc.getLine(e),i=this.states[e-1],n=this.tokenizer.getLineTokens(t,i,e);return this.states[e]+""!=n.state+""?(this.states[e]=n.state,this.lines[e+1]=null,this.currentLine>e+1&&(this.currentLine=e+1)):this.currentLine==e&&(this.currentLine=e+1),this.lines[e]=n.tokens}}).call(n.prototype),t.BackgroundTokenizer=n}),ace.define("ace/search_highlight",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/range"],function(e,t,i){"use strict";function n(e,t,i){this.setRegexp(e),this.clazz=t,this.type=i||"text"}var c=e("./lib/lang"),h=(e("./lib/oop"),e("./range").Range);(function(){this.MAX_RANGES=500,this.setRegexp=function(e){this.regExp+""!=e+""&&(this.regExp=e,this.cache=[])},this.update=function(e,t,i,n){if(this.regExp)for(var s=n.firstRow,o=n.lastRow,r=s;r<=o;r++){var a=this.cache[r];null==a&&((a=c.getMatchOffsets(i.getLine(r),this.regExp)).length>this.MAX_RANGES&&(a=a.slice(0,this.MAX_RANGES)),a=a.map(function(e){return new h(r,e.offset,r,e.offset+e.length)}),this.cache[r]=a.length?a:"");for(var l=a.length;l--;)t.drawSingleLineMarker(e,a[l].toScreenRange(i),this.clazz,n)}}}).call(n.prototype),t.SearchHighlight=n}),ace.define("ace/edit_session/fold_line",["require","exports","module","ace/range"],function(e,t,i){"use strict";function c(e,t){this.foldData=e,Array.isArray(t)?this.folds=t:t=this.folds=[t];var i=t[t.length-1];this.range=new n(t[0].start.row,t[0].start.column,i.end.row,i.end.column),this.start=this.range.start,this.end=this.range.end,this.folds.forEach(function(e){e.setFoldLine(this)},this)}var n=e("../range").Range;(function(){this.shiftRow=function(t){this.start.row+=t,this.end.row+=t,this.folds.forEach(function(e){e.start.row+=t,e.end.row+=t})},this.addFold=function(e){if(e.sameRow){if(e.start.row<this.startRow||e.endRow>this.endRow)throw new Error("Can't add a fold to this FoldLine as it has no connection");this.folds.push(e),this.folds.sort(function(e,t){return-e.range.compareEnd(t.start.row,t.start.column)}),0<this.range.compareEnd(e.start.row,e.start.column)?(this.end.row=e.end.row,this.end.column=e.end.column):this.range.compareStart(e.end.row,e.end.column)<0&&(this.start.row=e.start.row,this.start.column=e.start.column)}else if(e.start.row==this.end.row)this.folds.push(e),this.end.row=e.end.row,this.end.column=e.end.column;else{if(e.end.row!=this.start.row)throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");this.folds.unshift(e),this.start.row=e.start.row,this.start.column=e.start.column}e.foldLine=this},this.containsRow=function(e){return e>=this.start.row&&e<=this.end.row},this.walk=function(e,t,i){var n,s,o=0,r=this.folds,a=!0;null==t&&(t=this.end.row,i=this.end.column);for(var l=0;l<r.length;l++){if(-1==(s=(n=r[l]).range.compareStart(t,i)))return void e(null,t,i,o,a);if(!e(null,n.start.row,n.start.column,o,a)&&e(n.placeholder,n.start.row,n.start.column,o)||0===s)return;a=!n.sameRow,o=n.end.column}e(null,t,i,o,a)},this.getNextFoldTo=function(e,t){for(var i,n,s=0;s<this.folds.length;s++){if(-1==(n=(i=this.folds[s]).range.compareEnd(e,t)))return{fold:i,kind:"after"};if(0===n)return{fold:i,kind:"inside"}}return null},this.addRemoveChars=function(e,t,i){var n,s,o=this.getNextFoldTo(e,t);if(o)if(n=o.fold,"inside"==o.kind&&n.start.column!=t&&n.start.row!=e)window.console&&window.console.log(e,t,n);else if(n.start.row==e){var r=(s=this.folds).indexOf(n);for(0===r&&(this.start.column+=i);r<s.length;r++){if((n=s[r]).start.column+=i,!n.sameRow)return;n.end.column+=i}this.end.column+=i}},this.split=function(e,t){var i=this.getNextFoldTo(e,t);if(!i||"inside"==i.kind)return null;var n=i.fold,s=this.folds,o=this.foldData,r=s.indexOf(n),a=s[r-1];this.end.row=a.end.row,this.end.column=a.end.column;var l=new c(o,s=s.splice(r,s.length-r));return o.splice(o.indexOf(this)+1,0,l),l},this.merge=function(e){for(var t=e.folds,i=0;i<t.length;i++)this.addFold(t[i]);var n=this.foldData;n.splice(n.indexOf(e),1)},this.toString=function(){var t=[this.range.toString()+": ["];return this.folds.forEach(function(e){t.push("  "+e.toString())}),t.push("]"),t.join("\n")},this.idxToPosition=function(e){for(var t=0,i=0;i<this.folds.length;i++){var n=this.folds[i];if((e-=n.start.column-t)<0)return{row:n.start.row,column:n.start.column+e};if((e-=n.placeholder.length)<0)return n.start;t=n.end.column}return{row:this.end.row,column:this.end.column+e}}}).call(c.prototype),t.FoldLine=c}),ace.define("ace/range_list",["require","exports","module","ace/range"],function(e,t,i){"use strict";function n(){this.ranges=[],this.$bias=1}var l=e("./range").Range.comparePoints;(function(){this.comparePoints=l,this.pointIndex=function(e,t,i){for(var n=this.ranges,s=i||0;s<n.length;s++){var o=n[s],r=l(e,o.end);if(!(0<r)){var a=l(e,o.start);return 0===r?t&&0!==a?-s-2:s:0<a||0===a&&!t?s:-s-1}}return-s-1},this.add=function(e){var t=!e.isEmpty(),i=this.pointIndex(e.start,t);i<0&&(i=-i-1);var n=this.pointIndex(e.end,t,i);return n<0?n=-n-1:n++,this.ranges.splice(i,n-i,e)},this.addList=function(e){for(var t=[],i=e.length;i--;)t.push.apply(t,this.add(e[i]));return t},this.substractPoint=function(e){var t=this.pointIndex(e);if(0<=t)return this.ranges.splice(t,1)},this.merge=function(){for(var e,t=[],i=this.ranges,n=(i=i.sort(function(e,t){return l(e.start,t.start)}))[0],s=1;s<i.length;s++){e=n,n=i[s];var o=l(e.end,n.start);o<0||(0!=o||e.isEmpty()||n.isEmpty())&&(l(e.end,n.end)<0&&(e.end.row=n.end.row,e.end.column=n.end.column),i.splice(s,1),t.push(n),n=e,s--)}return this.ranges=i,t},this.contains=function(e,t){return 0<=this.pointIndex({row:e,column:t})},this.containsPoint=function(e){return 0<=this.pointIndex(e)},this.rangeAtPoint=function(e){var t=this.pointIndex(e);if(0<=t)return this.ranges[t]},this.clipRows=function(e,t){var i=this.ranges;if(i[0].start.row>t||i[i.length-1].start.row<e)return[];var n=this.pointIndex({row:e,column:0});n<0&&(n=-n-1);var s=this.pointIndex({row:t,column:0},n);s<0&&(s=-s-1);for(var o=[],r=n;r<s;r++)o.push(i[r]);return o},this.removeAll=function(){return this.ranges.splice(0,this.ranges.length)},this.attach=function(e){this.session&&this.detach(),this.session=e,this.onChange=this.$onChange.bind(this),this.session.on("change",this.onChange)},this.detach=function(){this.session&&(this.session.removeListener("change",this.onChange),this.session=null)},this.$onChange=function(e){for(var t=e.start,i=e.end,n=t.row,s=i.row,o=this.ranges,r=0,a=o.length;r<a;r++){if((h=o[r]).end.row>=n)break}if("insert"==e.action)for(var l=s-n,c=-t.column+i.column;r<a;r++){if((h=o[r]).start.row>n)break;if(h.start.row==n&&h.start.column>=t.column&&(h.start.column==t.column&&this.$bias<=0||(h.start.column+=c,h.start.row+=l)),h.end.row==n&&h.end.column>=t.column){if(h.end.column==t.column&&this.$bias<0)continue;h.end.column==t.column&&0<c&&r<a-1&&h.end.column>h.start.column&&h.end.column==o[r+1].start.column&&(h.end.column-=c),h.end.column+=c,h.end.row+=l}}else for(l=n-s,c=t.column-i.column;r<a;r++){if((h=o[r]).start.row>s)break;h.end.row<s&&(n<h.end.row||n==h.end.row&&t.column<h.end.column)?(h.end.row=n,h.end.column=t.column):h.end.row==s?h.end.column<=i.column?(l||h.end.column>t.column)&&(h.end.column=t.column,h.end.row=t.row):(h.end.column+=c,h.end.row+=l):h.end.row>s&&(h.end.row+=l),h.start.row<s&&(n<h.start.row||n==h.start.row&&t.column<h.start.column)?(h.start.row=n,h.start.column=t.column):h.start.row==s?h.start.column<=i.column?(l||h.start.column>t.column)&&(h.start.column=t.column,h.start.row=t.row):(h.start.column+=c,h.start.row+=l):h.start.row>s&&(h.start.row+=l)}if(0!=l&&r<a)for(;r<a;r++){var h;(h=o[r]).start.row+=l,h.end.row+=l}}}).call(n.prototype),t.RangeList=n}),ace.define("ace/edit_session/fold",["require","exports","module","ace/range_list","ace/lib/oop"],function(e,t,i){"use strict";function u(e,t){e.row-=t.row,0==e.row&&(e.column-=t.column)}function n(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row}var s=e("../range_list").RangeList,o=e("../lib/oop"),r=t.Fold=function(e,t){this.foldLine=null,this.placeholder=t,this.range=e,this.start=e.start,this.end=e.end,this.sameRow=e.start.row==e.end.row,this.subFolds=this.ranges=[]};o.inherits(r,s),function(){this.toString=function(){return'"'+this.placeholder+'" '+this.range.toString()},this.setFoldLine=function(t){this.foldLine=t,this.subFolds.forEach(function(e){e.setFoldLine(t)})},this.clone=function(){var e=this.range.clone(),t=new r(e,this.placeholder);return this.subFolds.forEach(function(e){t.subFolds.push(e.clone())}),t.collapseChildren=this.collapseChildren,t},this.addSubFold=function(e){if(!this.range.isEqual(e)){!function(e,t){u(e.start,t),u(e.end,t)}(e,this.start);for(var t=e.start.row,i=e.start.column,n=0,s=-1;n<this.subFolds.length&&1==(s=this.subFolds[n].range.compare(t,i));n++);var o=this.subFolds[n],r=0;if(0==s){if(o.range.containsRange(e))return o.addSubFold(e);r=1}t=e.range.end.row,i=e.range.end.column;var a=n;for(s=-1;a<this.subFolds.length&&1==(s=this.subFolds[a].range.compare(t,i));a++);0==s&&a++;for(var l=this.subFolds.splice(n,a-n,e),c=0==s?l.length-1:l.length,h=r;h<c;h++)e.addSubFold(l[h]);return e.setFoldLine(this.foldLine),e}},this.restoreRange=function(e){return function(e,t){n(e.start,t),n(e.end,t)}(e,this.start)}}.call(r.prototype)}),ace.define("ace/edit_session/folding",["require","exports","module","ace/range","ace/edit_session/fold_line","ace/edit_session/fold","ace/token_iterator"],function(e,t,i){"use strict";var h=e("../range").Range,m=e("./fold_line").FoldLine,p=e("./fold").Fold,u=e("../token_iterator").TokenIterator;t.Folding=function(){this.getFoldAt=function(e,t,i){var n=this.getFoldLine(e);if(!n)return null;for(var s=n.folds,o=0;o<s.length;o++){var r=s[o].range;if(r.contains(e,t)){if(1==i&&r.isEnd(e,t)&&!r.isEmpty())continue;if(-1==i&&r.isStart(e,t)&&!r.isEmpty())continue;return s[o]}}},this.getFoldsInRange=function(e){var t=e.start,i=e.end,n=this.$foldData,s=[];t.column+=1,i.column-=1;for(var o=0;o<n.length;o++){var r=n[o].range.compareRange(e);if(2!=r){if(-2==r)break;for(var a=n[o].folds,l=0;l<a.length;l++){var c=a[l];if(-2==(r=c.range.compareRange(e)))break;if(2!=r){if(42==r)break;s.push(c)}}}}return t.column-=1,i.column+=1,s},this.getFoldsInRangeList=function(e){if(Array.isArray(e)){var t=[];e.forEach(function(e){t=t.concat(this.getFoldsInRange(e))},this)}else t=this.getFoldsInRange(e);return t},this.getAllFolds=function(){for(var e=[],t=this.$foldData,i=0;i<t.length;i++)for(var n=0;n<t[i].folds.length;n++)e.push(t[i].folds[n]);return e},this.getFoldStringAt=function(e,t,i,n){if(!(n=n||this.getFoldLine(e)))return null;for(var s,o,r={end:{column:0}},a=0;a<n.folds.length;a++){var l=(o=n.folds[a]).range.compareEnd(e,t);if(-1==l){s=this.getLine(o.start.row).substring(r.end.column,o.start.column);break}if(0===l)return null;r=o}return s=s||this.getLine(o.start.row).substring(r.end.column),-1==i?s.substring(0,t-r.end.column):1==i?s.substring(t-r.end.column):s},this.getFoldLine=function(e,t){var i=this.$foldData,n=0;for(t&&(n=i.indexOf(t)),-1==n&&(n=0);n<i.length;n++){var s=i[n];if(s.start.row<=e&&s.end.row>=e)return s;if(s.end.row>e)return null}return null},this.getNextFoldLine=function(e,t){var i=this.$foldData,n=0;for(t&&(n=i.indexOf(t)),-1==n&&(n=0);n<i.length;n++){var s=i[n];if(s.end.row>=e)return s}return null},this.getFoldedRowCount=function(e,t){for(var i=this.$foldData,n=t-e+1,s=0;s<i.length;s++){var o=i[s],r=o.end.row,a=o.start.row;if(t<=r){a<t&&(e<=a?n-=t-a:n=0);break}e<=r&&(n-=e<=a?r-a:r-e+1)}return n},this.$addFoldLine=function(e){return this.$foldData.push(e),this.$foldData.sort(function(e,t){return e.start.row-t.start.row}),e},this.addFold=function(e,t){var i,n=this.$foldData,s=!1;e instanceof p?i=e:(i=new p(t,e)).collapseChildren=t.collapseChildren,this.$clipRangeToDocument(i.range);var o=i.start.row,r=i.start.column,a=i.end.row,l=i.end.column,c=this.getFoldAt(o,r,1),h=this.getFoldAt(a,l,-1);if(c&&h==c)return c.addSubFold(i);c&&!c.range.isStart(o,r)&&this.removeFold(c),h&&!h.range.isEnd(a,l)&&this.removeFold(h);var u=this.getFoldsInRange(i.range);0<u.length&&(this.removeFolds(u),u.forEach(function(e){i.addSubFold(e)}));for(var d=0;d<n.length;d++){var g=n[d];if(a==g.start.row){g.addFold(i),s=!0;break}if(o==g.end.row){if(g.addFold(i),s=!0,!i.sameRow){var f=n[d+1];if(f&&f.start.row==a){g.merge(f);break}}break}if(a<=g.start.row)break}return s||(g=this.$addFoldLine(new m(this.$foldData,i))),this.$useWrapMode?this.$updateWrapData(g.start.row,g.start.row):this.$updateRowLengthCache(g.start.row,g.start.row),this.$modified=!0,this._signal("changeFold",{data:i,action:"add"}),i},this.addFolds=function(e){e.forEach(function(e){this.addFold(e)},this)},this.removeFold=function(e){var t=e.foldLine,i=t.start.row,n=t.end.row,s=this.$foldData,o=t.folds;if(1==o.length)s.splice(s.indexOf(t),1);else if(t.range.isEnd(e.end.row,e.end.column))o.pop(),t.end.row=o[o.length-1].end.row,t.end.column=o[o.length-1].end.column;else if(t.range.isStart(e.start.row,e.start.column))o.shift(),t.start.row=o[0].start.row,t.start.column=o[0].start.column;else if(e.sameRow)o.splice(o.indexOf(e),1);else{var r=t.split(e.start.row,e.start.column);(o=r.folds).shift(),r.start.row=o[0].start.row,r.start.column=o[0].start.column}this.$updating||(this.$useWrapMode?this.$updateWrapData(i,n):this.$updateRowLengthCache(i,n)),this.$modified=!0,this._signal("changeFold",{data:e,action:"remove"})},this.removeFolds=function(e){for(var t=[],i=0;i<e.length;i++)t.push(e[i]);t.forEach(function(e){this.removeFold(e)},this),this.$modified=!0},this.expandFold=function(t){this.removeFold(t),t.subFolds.forEach(function(e){t.restoreRange(e),this.addFold(e)},this),0<t.collapseChildren&&this.foldAll(t.start.row+1,t.end.row,t.collapseChildren-1),t.subFolds=[]},this.expandFolds=function(e){e.forEach(function(e){this.expandFold(e)},this)},this.unfold=function(e,t){var i,n;if(null==e?(i=new h(0,0,this.getLength(),0),t=!0):i="number"==typeof e?new h(e,0,e,this.getLine(e).length):"row"in e?h.fromPoints(e,e):e,n=this.getFoldsInRangeList(i),t)this.removeFolds(n);else for(var s=n;s.length;)this.expandFolds(s),s=this.getFoldsInRangeList(i);if(n.length)return n},this.isRowFolded=function(e,t){return!!this.getFoldLine(e,t)},this.getRowFoldEnd=function(e,t){var i=this.getFoldLine(e,t);return i?i.end.row:e},this.getRowFoldStart=function(e,t){var i=this.getFoldLine(e,t);return i?i.start.row:e},this.getFoldDisplayLine=function(e,t,i,s,o){null==s&&(s=e.start.row),null==o&&(o=0),null==t&&(t=e.end.row),null==i&&(i=this.getLine(t).length);var r=this.doc,a="";return e.walk(function(e,t,i,n){if(!(t<s)){if(t==s){if(i<o)return;n=Math.max(o,n)}a+=null!=e?e:r.getLine(t).substring(n,i)}},t,i),a},this.getDisplayLine=function(e,t,i,n){var s,o=this.getFoldLine(e);return o?this.getFoldDisplayLine(o,e,t,i,n):(s=this.doc.getLine(e)).substring(n||0,t||s.length)},this.$cloneFoldData=function(){var i=[];return i=this.$foldData.map(function(e){var t=e.folds.map(function(e){return e.clone()});return new m(i,t)})},this.toggleFold=function(e){var t,i,n=this.selection.getRange();if(n.isEmpty()){var s=n.start;if(t=this.getFoldAt(s.row,s.column))return void this.expandFold(t);(i=this.findMatchingBracket(s))?1==n.comparePoint(i)?n.end=i:(n.start=i,n.start.column++,n.end.column--):(i=this.findMatchingBracket({row:s.row,column:s.column+1}))?(1==n.comparePoint(i)?n.end=i:n.start=i,n.start.column++):n=this.getCommentFoldRange(s.row,s.column)||n}else{var o=this.getFoldsInRange(n);if(e&&o.length)return void this.expandFolds(o);1==o.length&&(t=o[0])}if((t=t||this.getFoldAt(n.start.row,n.start.column))&&t.range.toString()==n.toString())this.expandFold(t);else{var r="...";if(!n.isMultiLine()){if((r=this.getTextRange(n)).length<4)return;r=r.trim().substring(0,2)+".."}this.addFold(r,n)}},this.getCommentFoldRange=function(e,t,i){var n=new u(this,e,t),s=n.getCurrentToken(),o=s.type;if(s&&/^comment|string/.test(o)){"comment"==(o=o.match(/comment|string/)[0])&&(o+="|doc-start");var r=new RegExp(o),a=new h;if(1!=i){for(;(s=n.stepBackward())&&r.test(s.type););n.stepForward()}if(a.start.row=n.getCurrentTokenRow(),a.start.column=n.getCurrentTokenColumn()+2,n=new u(this,e,t),-1!=i){var l=-1;do{if(s=n.stepForward(),-1==l){var c=this.getState(n.$row);r.test(c)||(l=n.$row)}else if(n.$row>l)break}while(s&&r.test(s.type));s=n.stepBackward()}else s=n.getCurrentToken();return a.end.row=n.getCurrentTokenRow(),a.end.column=n.getCurrentTokenColumn()+s.value.length-2,a}},this.foldAll=function(e,t,i){null==i&&(i=1e5);var n=this.foldWidgets;if(n){t=t||this.getLength();for(var s=e=e||0;s<t;s++)if(null==n[s]&&(n[s]=this.getFoldWidget(s)),"start"==n[s]){var o=this.getFoldWidgetRange(s);if(o&&o.isMultiLine()&&o.end.row<=t&&o.start.row>=e){s=o.end.row;try{var r=this.addFold("...",o);r&&(r.collapseChildren=i)}catch(e){}}}}},this.$foldStyles={manual:1,markbegin:1,markbeginend:1},this.$foldStyle="markbegin",this.setFoldStyle=function(e){if(!this.$foldStyles[e])throw new Error("invalid fold style: "+e+"["+Object.keys(this.$foldStyles).join(", ")+"]");if(this.$foldStyle!=e){"manual"==(this.$foldStyle=e)&&this.unfold();var t=this.$foldMode;this.$setFolding(null),this.$setFolding(t)}},this.$setFolding=function(e){this.$foldMode!=e&&(this.$foldMode=e,this.off("change",this.$updateFoldWidgets),this.off("tokenizerUpdate",this.$tokenizerUpdateFoldWidgets),this._signal("changeAnnotation"),e&&"manual"!=this.$foldStyle?(this.foldWidgets=[],this.getFoldWidget=e.getFoldWidget.bind(e,this,this.$foldStyle),this.getFoldWidgetRange=e.getFoldWidgetRange.bind(e,this,this.$foldStyle),this.$updateFoldWidgets=this.updateFoldWidgets.bind(this),this.$tokenizerUpdateFoldWidgets=this.tokenizerUpdateFoldWidgets.bind(this),this.on("change",this.$updateFoldWidgets),this.on("tokenizerUpdate",this.$tokenizerUpdateFoldWidgets)):this.foldWidgets=null)},this.getParentFoldRangeData=function(e,t){var i=this.foldWidgets;if(!i||t&&i[e])return{};for(var n,s=e-1;0<=s;){var o=i[s];if(null==o&&(o=i[s]=this.getFoldWidget(s)),"start"==o){var r=this.getFoldWidgetRange(s);if(n=n||r,r&&r.end.row>=e)break}s--}return{range:-1!==s&&r,firstRange:n}},this.onFoldWidgetClick=function(e,t){var i={children:(t=t.domEvent).shiftKey,all:t.ctrlKey||t.metaKey,siblings:t.altKey};if(!this.$toggleFoldWidget(e,i)){var n=t.target||t.srcElement;n&&/ace_fold-widget/.test(n.className)&&(n.className+=" ace_invalid")}},this.$toggleFoldWidget=function(e,t){if(this.getFoldWidget){var i=this.getFoldWidget(e),n=this.getLine(e),s="end"===i?-1:1,o=this.getFoldAt(e,-1==s?0:n.length,s);if(o)return t.children||t.all?this.removeFold(o):this.expandFold(o),o;var r=this.getFoldWidgetRange(e,!0);if(r&&!r.isMultiLine()&&(o=this.getFoldAt(r.start.row,r.start.column,1))&&r.isEqual(o.range))return this.removeFold(o),o;if(t.siblings){var a=this.getParentFoldRangeData(e);if(a.range)var l=a.range.start.row+1,c=a.range.end.row;this.foldAll(l,c,t.all?1e4:0)}else t.children?(c=r?r.end.row:this.getLength(),this.foldAll(e+1,c,t.all?1e4:0)):r&&(t.all&&(r.collapseChildren=1e4),this.addFold("...",r));return r}},this.toggleFoldWidget=function(e){var t=this.selection.getCursor().row;t=this.getRowFoldStart(t);var i=this.$toggleFoldWidget(t,{});if(!i){var n=this.getParentFoldRangeData(t,!0);if(i=n.range||n.firstRange){t=i.start.row;var s=this.getFoldAt(t,this.getLine(t).length,1);s?this.removeFold(s):this.addFold("...",i)}}},this.updateFoldWidgets=function(e){var t=e.start.row,i=e.end.row-t;if(0==i)this.foldWidgets[t]=null;else if("remove"==e.action)this.foldWidgets.splice(t,1+i,null);else{var n=Array(1+i);n.unshift(t,1),this.foldWidgets.splice.apply(this.foldWidgets,n)}},this.tokenizerUpdateFoldWidgets=function(e){var t=e.data;t.first!=t.last&&this.foldWidgets.length>t.first&&this.foldWidgets.splice(t.first,this.foldWidgets.length)}}}),ace.define("ace/edit_session/bracket_match",["require","exports","module","ace/token_iterator","ace/range"],function(e,t,i){"use strict";var u=e("../token_iterator").TokenIterator,a=e("../range").Range;t.BracketMatch=function(){this.findMatchingBracket=function(e,t){if(0==e.column)return null;var i=t||this.getLine(e.row).charAt(e.column-1);if(""==i)return null;var n=i.match(/([\(\[\{])|([\)\]\}])/);return n?n[1]?this.$findClosingBracket(n[1],e):this.$findOpeningBracket(n[2],e):null},this.getBracketRange=function(e){var t,i=this.getLine(e.row),n=!0,s=i.charAt(e.column-1),o=s&&s.match(/([\(\[\{])|([\)\]\}])/);if(o||(s=i.charAt(e.column),e={row:e.row,column:e.column+1},o=s&&s.match(/([\(\[\{])|([\)\]\}])/),n=!1),!o)return null;if(o[1]){if(!(r=this.$findClosingBracket(o[1],e)))return null;t=a.fromPoints(e,r),n||(t.end.column++,t.start.column--),t.cursor=t.end}else{var r;if(!(r=this.$findOpeningBracket(o[2],e)))return null;t=a.fromPoints(r,e),n||(t.start.column++,t.end.column--),t.cursor=t.start}return t},this.$brackets={")":"(","(":")","]":"[","[":"]","{":"}","}":"{","<":">",">":"<"},this.$findOpeningBracket=function(e,t,i){var n=this.$brackets[e],s=1,o=new u(this,t.row,t.column),r=o.getCurrentToken();if(r=r||o.stepForward()){i=i||new RegExp("(\\.?"+r.type.replace(".","\\.").replace("rparen",".paren").replace(/\b(?:end)\b/,"(?:start|begin|end)")+")+");for(var a=t.column-o.getCurrentTokenColumn()-2,l=r.value;;){for(;0<=a;){var c=l.charAt(a);if(c==n){if(0==(s-=1))return{row:o.getCurrentTokenRow(),column:a+o.getCurrentTokenColumn()}}else c==e&&(s+=1);a-=1}for(;(r=o.stepBackward())&&!i.test(r.type););if(null==r)break;a=(l=r.value).length-1}return null}},this.$findClosingBracket=function(e,t,i){var n=this.$brackets[e],s=1,o=new u(this,t.row,t.column),r=o.getCurrentToken();if(r=r||o.stepForward()){i=i||new RegExp("(\\.?"+r.type.replace(".","\\.").replace("lparen",".paren").replace(/\b(?:start|begin)\b/,"(?:start|begin|end)")+")+");for(var a=t.column-o.getCurrentTokenColumn();;){for(var l=r.value,c=l.length;a<c;){var h=l.charAt(a);if(h==n){if(0==(s-=1))return{row:o.getCurrentTokenRow(),column:a+o.getCurrentTokenColumn()}}else h==e&&(s+=1);a+=1}for(;(r=o.stepForward())&&!i.test(r.type););if(null==r)break;a=0}return null}}}}),ace.define("ace/edit_session",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/bidihandler","ace/config","ace/lib/event_emitter","ace/selection","ace/mode/text","ace/range","ace/document","ace/background_tokenizer","ace/search_highlight","ace/edit_session/folding","ace/edit_session/bracket_match"],function(e,t,i){"use strict";var n=e("./lib/oop"),s=e("./lib/lang"),o=e("./bidihandler").BidiHandler,r=e("./config"),l=e("./lib/event_emitter").EventEmitter,a=e("./selection").Selection,c=e("./mode/text").Mode,h=e("./range").Range,u=e("./document").Document,d=e("./background_tokenizer").BackgroundTokenizer,g=e("./search_highlight").SearchHighlight,f=function(e,t){this.$breakpoints=[],this.$decorations=[],this.$frontMarkers={},this.$backMarkers={},this.$markerId=1,this.$undoSelect=!0,this.$foldData=[],this.id="session"+ ++f.$uid,this.$foldData.toString=function(){return this.join("\n")},this.on("changeFold",this.onChangeFold.bind(this)),this.$onChange=this.onChange.bind(this),"object"==typeof e&&e.getLine||(e=new u(e)),this.setDocument(e),this.selection=new a(this),this.$bidiHandler=new o(this),r.resetOptions(this),this.setMode(t),r._signal("session",this)};f.$uid=0,function(){function a(e){return!(e<4352)&&(4352<=e&&e<=4447||4515<=e&&e<=4519||4602<=e&&e<=4607||9001<=e&&e<=9002||11904<=e&&e<=11929||11931<=e&&e<=12019||12032<=e&&e<=12245||12272<=e&&e<=12283||12288<=e&&e<=12350||12353<=e&&e<=12438||12441<=e&&e<=12543||12549<=e&&e<=12589||12593<=e&&e<=12686||12688<=e&&e<=12730||12736<=e&&e<=12771||12784<=e&&e<=12830||12832<=e&&e<=12871||12880<=e&&e<=13054||13056<=e&&e<=19903||19968<=e&&e<=42124||42128<=e&&e<=42182||43360<=e&&e<=43388||44032<=e&&e<=55203||55216<=e&&e<=55238||55243<=e&&e<=55291||63744<=e&&e<=64255||65040<=e&&e<=65049||65072<=e&&e<=65106||65108<=e&&e<=65126||65128<=e&&e<=65131||65281<=e&&e<=65376||65504<=e&&e<=65510)}n.implement(this,l),this.setDocument=function(e){this.doc&&this.doc.removeListener("change",this.$onChange),(this.doc=e).on("change",this.$onChange),this.bgTokenizer&&this.bgTokenizer.setDocument(this.getDocument()),this.resetCaches()},this.getDocument=function(){return this.doc},this.$resetRowCache=function(e){if(!e)return this.$docRowCache=[],void(this.$screenRowCache=[]);var t=this.$docRowCache.length,i=this.$getRowCacheIndex(this.$docRowCache,e)+1;i<t&&(this.$docRowCache.splice(i,t),this.$screenRowCache.splice(i,t))},this.$getRowCacheIndex=function(e,t){for(var i=0,n=e.length-1;i<=n;){var s=i+n>>1,o=e[s];if(o<t)i=1+s;else{if(!(t<o))return s;n=s-1}}return i-1},this.resetCaches=function(){this.$modified=!0,this.$wrapData=[],this.$rowLengthCache=[],this.$resetRowCache(0),this.bgTokenizer&&this.bgTokenizer.start(0)},this.onChangeFold=function(e){var t=e.data;this.$resetRowCache(t.start.row)},this.onChange=function(e){this.$modified=!0,this.$bidiHandler.onChange(e),this.$resetRowCache(e.start.row);var t=this.$updateInternalDataOnChange(e);!this.$fromUndo&&this.$undoManager&&(t&&t.length&&(this.$undoManager.add({action:"removeFolds",folds:t},this.mergeUndoDeltas),this.mergeUndoDeltas=!0),this.$undoManager.add(e,this.mergeUndoDeltas),this.mergeUndoDeltas=!0,this.$informUndoManager.schedule()),this.bgTokenizer&&this.bgTokenizer.$updateOnChange(e),this._signal("change",e)},this.setValue=function(e){this.doc.setValue(e),this.selection.moveTo(0,0),this.$resetRowCache(0),this.setUndoManager(this.$undoManager),this.getUndoManager().reset()},this.getValue=this.toString=function(){return this.doc.getValue()},this.getSelection=function(){return this.selection},this.getState=function(e){return this.bgTokenizer.getState(e)},this.getTokens=function(e){return this.bgTokenizer.getTokens(e)},this.getTokenAt=function(e,t){var i,n=this.bgTokenizer.getTokens(e),s=0;if(null==t){var o=n.length-1;s=this.getLine(e).length}else for(o=0;o<n.length&&!(t<=(s+=n[o].value.length));o++);return(i=n[o])?(i.index=o,i.start=s-i.value.length,i):null},this.setUndoManager=function(e){if(this.$undoManager=e,this.$informUndoManager&&this.$informUndoManager.cancel(),e){var t=this;e.addSession(this),this.$syncInformUndoManager=function(){t.$informUndoManager.cancel(),t.mergeUndoDeltas=!1},this.$informUndoManager=s.delayedCall(this.$syncInformUndoManager)}else this.$syncInformUndoManager=function(){}},this.markUndoGroup=function(){this.$syncInformUndoManager&&this.$syncInformUndoManager()},this.$defaultUndoManager={undo:function(){},redo:function(){},hasUndo:function(){},hasRedo:function(){},reset:function(){},add:function(){},addSelection:function(){},startNewGroup:function(){},addSession:function(){}},this.getUndoManager=function(){return this.$undoManager||this.$defaultUndoManager},this.getTabString=function(){return this.getUseSoftTabs()?s.stringRepeat(" ",this.getTabSize()):"\t"},this.setUseSoftTabs=function(e){this.setOption("useSoftTabs",e)},this.getUseSoftTabs=function(){return this.$useSoftTabs&&!this.$mode.$indentWithTabs},this.setTabSize=function(e){this.setOption("tabSize",e)},this.getTabSize=function(){return this.$tabSize},this.isTabStop=function(e){return this.$useSoftTabs&&e.column%this.$tabSize==0},this.setNavigateWithinSoftTabs=function(e){this.setOption("navigateWithinSoftTabs",e)},this.getNavigateWithinSoftTabs=function(){return this.$navigateWithinSoftTabs},this.$overwrite=!1,this.setOverwrite=function(e){this.setOption("overwrite",e)},this.getOverwrite=function(){return this.$overwrite},this.toggleOverwrite=function(){this.setOverwrite(!this.$overwrite)},this.addGutterDecoration=function(e,t){this.$decorations[e]||(this.$decorations[e]=""),this.$decorations[e]+=" "+t,this._signal("changeBreakpoint",{})},this.removeGutterDecoration=function(e,t){this.$decorations[e]=(this.$decorations[e]||"").replace(" "+t,""),this._signal("changeBreakpoint",{})},this.getBreakpoints=function(){return this.$breakpoints},this.setBreakpoints=function(e){this.$breakpoints=[];for(var t=0;t<e.length;t++)this.$breakpoints[e[t]]="ace_breakpoint";this._signal("changeBreakpoint",{})},this.clearBreakpoints=function(){this.$breakpoints=[],this._signal("changeBreakpoint",{})},this.setBreakpoint=function(e,t){void 0===t&&(t="ace_breakpoint"),t?this.$breakpoints[e]=t:delete this.$breakpoints[e],this._signal("changeBreakpoint",{})},this.clearBreakpoint=function(e){delete this.$breakpoints[e],this._signal("changeBreakpoint",{})},this.addMarker=function(e,t,i,n){var s=this.$markerId++,o={range:e,type:i||"line",renderer:"function"==typeof i?i:null,clazz:t,inFront:!!n,id:s};return n?(this.$frontMarkers[s]=o,this._signal("changeFrontMarker")):(this.$backMarkers[s]=o,this._signal("changeBackMarker")),s},this.addDynamicMarker=function(e,t){if(e.update){var i=this.$markerId++;return e.id=i,e.inFront=!!t,t?(this.$frontMarkers[i]=e,this._signal("changeFrontMarker")):(this.$backMarkers[i]=e,this._signal("changeBackMarker")),e}},this.removeMarker=function(e){var t=this.$frontMarkers[e]||this.$backMarkers[e];t&&(delete(t.inFront?this.$frontMarkers:this.$backMarkers)[e],this._signal(t.inFront?"changeFrontMarker":"changeBackMarker"))},this.getMarkers=function(e){return e?this.$frontMarkers:this.$backMarkers},this.highlight=function(e){if(!this.$searchHighlight){var t=new g(null,"ace_selected-word","text");this.$searchHighlight=this.addDynamicMarker(t)}this.$searchHighlight.setRegexp(e)},this.highlightLines=function(e,t,i,n){"number"!=typeof t&&(i=t,t=e),i=i||"ace_step";var s=new h(e,0,t,1/0);return s.id=this.addMarker(s,i,"fullLine",n),s},this.setAnnotations=function(e){this.$annotations=e,this._signal("changeAnnotation",{})},this.getAnnotations=function(){return this.$annotations||[]},this.clearAnnotations=function(){this.setAnnotations([])},this.$detectNewLine=function(e){var t=e.match(/^.*?(\r?\n)/m);this.$autoNewLine=t?t[1]:"\n"},this.getWordRange=function(e,t){var i=this.getLine(e),n=!1;if(0<t&&(n=!!i.charAt(t-1).match(this.tokenRe)),n=n||!!i.charAt(t).match(this.tokenRe))var s=this.tokenRe;else if(/^\s+$/.test(i.slice(t-1,t+1)))s=/\s/;else s=this.nonTokenRe;var o=t;if(0<o){for(;0<=--o&&i.charAt(o).match(s););o++}for(var r=t;r<i.length&&i.charAt(r).match(s);)r++;return new h(e,o,e,r)},this.getAWordRange=function(e,t){for(var i=this.getWordRange(e,t),n=this.getLine(i.end.row);n.charAt(i.end.column).match(/[ \t]/);)i.end.column+=1;return i},this.setNewLineMode=function(e){this.doc.setNewLineMode(e)},this.getNewLineMode=function(){return this.doc.getNewLineMode()},this.setUseWorker=function(e){this.setOption("useWorker",e)},this.getUseWorker=function(){return this.$useWorker},this.onReloadTokenizer=function(e){var t=e.data;this.bgTokenizer.start(t.first),this._signal("tokenizerUpdate",e)},this.$modes=r.$modes,this.$mode=null,this.$modeId=null,this.setMode=function(e,t){if(e&&"object"==typeof e){if(e.getTokenizer)return this.$onChangeMode(e);var i=e,n=i.path}else n=e||"ace/mode/text";if(this.$modes["ace/mode/text"]||(this.$modes["ace/mode/text"]=new c),this.$modes[n]&&!i)return this.$onChangeMode(this.$modes[n]),void(t&&t());this.$modeId=n,r.loadModule(["mode",n],function(e){if(this.$modeId!==n)return t&&t();this.$modes[n]&&!i?this.$onChangeMode(this.$modes[n]):e&&e.Mode&&(e=new e.Mode(i),i||((this.$modes[n]=e).$id=n),this.$onChangeMode(e)),t&&t()}.bind(this)),this.$mode||this.$onChangeMode(this.$modes["ace/mode/text"],!0)},this.$onChangeMode=function(e,t){if(t||(this.$modeId=e.$id),this.$mode!==e){this.$mode=e,this.$stopWorker(),this.$useWorker&&this.$startWorker();var i=e.getTokenizer();if(void 0!==i.addEventListener){var n=this.onReloadTokenizer.bind(this);i.addEventListener("update",n)}if(this.bgTokenizer)this.bgTokenizer.setTokenizer(i);else{this.bgTokenizer=new d(i);var s=this;this.bgTokenizer.addEventListener("update",function(e){s._signal("tokenizerUpdate",e)})}this.bgTokenizer.setDocument(this.getDocument()),this.tokenRe=e.tokenRe,this.nonTokenRe=e.nonTokenRe,t||(e.attachToSession&&e.attachToSession(this),this.$options.wrapMethod.set.call(this,this.$wrapMethod),this.$setFolding(e.foldingRules),this.bgTokenizer.start(0),this._emit("changeMode"))}},this.$stopWorker=function(){this.$worker&&(this.$worker.terminate(),this.$worker=null)},this.$startWorker=function(){try{this.$worker=this.$mode.createWorker(this)}catch(e){r.warn("Could not load worker",e),this.$worker=null}},this.getMode=function(){return this.$mode},this.$scrollTop=0,this.setScrollTop=function(e){this.$scrollTop===e||isNaN(e)||(this.$scrollTop=e,this._signal("changeScrollTop",e))},this.getScrollTop=function(){return this.$scrollTop},this.$scrollLeft=0,this.setScrollLeft=function(e){this.$scrollLeft===e||isNaN(e)||(this.$scrollLeft=e,this._signal("changeScrollLeft",e))},this.getScrollLeft=function(){return this.$scrollLeft},this.getScreenWidth=function(){return this.$computeWidth(),this.lineWidgets?Math.max(this.getLineWidgetMaxWidth(),this.screenWidth):this.screenWidth},this.getLineWidgetMaxWidth=function(){if(null!=this.lineWidgetsWidth)return this.lineWidgetsWidth;var t=0;return this.lineWidgets.forEach(function(e){e&&e.screenWidth>t&&(t=e.screenWidth)}),this.lineWidgetWidth=t},this.$computeWidth=function(e){if(this.$modified||e){if(this.$modified=!1,this.$useWrapMode)return this.screenWidth=this.$wrapLimit;for(var t=this.doc.getAllLines(),i=this.$rowLengthCache,n=0,s=0,o=this.$foldData[s],r=o?o.start.row:1/0,a=t.length,l=0;l<a;l++){if(r<l){if(a<=(l=o.end.row+1))break;r=(o=this.$foldData[s++])?o.start.row:1/0}null==i[l]&&(i[l]=this.$getStringScreenWidth(t[l])[0]),i[l]>n&&(n=i[l])}this.screenWidth=n}},this.getLine=function(e){return this.doc.getLine(e)},this.getLines=function(e,t){return this.doc.getLines(e,t)},this.getLength=function(){return this.doc.getLength()},this.getTextRange=function(e){return this.doc.getTextRange(e||this.selection.getRange())},this.insert=function(e,t){return this.doc.insert(e,t)},this.remove=function(e){return this.doc.remove(e)},this.removeFullLines=function(e,t){return this.doc.removeFullLines(e,t)},this.undoChanges=function(e,t){if(e.length){this.$fromUndo=!0;for(var i=e.length-1;-1!=i;i--){var n=e[i];"insert"==n.action||"remove"==n.action?this.doc.revertDelta(n):n.folds&&this.addFolds(n.folds)}!t&&this.$undoSelect&&(e.selectionBefore?this.selection.fromJSON(e.selectionBefore):this.selection.setRange(this.$getUndoSelection(e,!0))),this.$fromUndo=!1}},this.redoChanges=function(e,t){if(e.length){this.$fromUndo=!0;for(var i=0;i<e.length;i++){var n=e[i];"insert"!=n.action&&"remove"!=n.action||this.doc.applyDelta(n)}!t&&this.$undoSelect&&(e.selectionAfter?this.selection.fromJSON(e.selectionAfter):this.selection.setRange(this.$getUndoSelection(e,!1))),this.$fromUndo=!1}},this.setUndoSelect=function(e){this.$undoSelect=e},this.$getUndoSelection=function(e,t){function i(e){return t?"insert"!==e.action:"insert"===e.action}for(var n,s,o=0;o<e.length;o++){var r=e[o];r.start&&(n?i(r)?(s=r.start,-1==n.compare(s.row,s.column)&&n.setStart(s),s=r.end,1==n.compare(s.row,s.column)&&n.setEnd(s),!0):(s=r.start,-1==n.compare(s.row,s.column)&&(n=h.fromPoints(r.start,r.start)),!1):i(r)?(n=h.fromPoints(r.start,r.end),!0):(n=h.fromPoints(r.start,r.start),!1))}return n},this.replace=function(e,t){return this.doc.replace(e,t)},this.moveText=function(e,t,i){var n=this.getTextRange(e),s=this.getFoldsInRange(e),o=h.fromPoints(t,t);if(!i){this.remove(e);var r=e.start.row-e.end.row;(c=r?-e.end.column:e.start.column-e.end.column)&&(o.start.row==e.end.row&&o.start.column>e.end.column&&(o.start.column+=c),o.end.row==e.end.row&&o.end.column>e.end.column&&(o.end.column+=c)),r&&o.start.row>=e.end.row&&(o.start.row+=r,o.end.row+=r)}if(o.end=this.insert(o.start,n),s.length){var a=e.start,l=o.start,c=(r=l.row-a.row,l.column-a.column);this.addFolds(s.map(function(e){return(e=e.clone()).start.row==a.row&&(e.start.column+=c),e.end.row==a.row&&(e.end.column+=c),e.start.row+=r,e.end.row+=r,e}))}return o},this.indentRows=function(e,t,i){i=i.replace(/\t/g,this.getTabString());for(var n=e;n<=t;n++)this.doc.insertInLine({row:n,column:0},i)},this.outdentRows=function(e){for(var t=e.collapseRows(),i=new h(0,0,0,0),n=this.getTabSize(),s=t.start.row;s<=t.end.row;++s){var o=this.getLine(s);i.start.row=s,i.end.row=s;for(var r=0;r<n&&" "==o.charAt(r);++r);r<n&&"\t"==o.charAt(r)?(i.start.column=r,i.end.column=r+1):(i.start.column=0,i.end.column=r),this.remove(i)}},this.$moveLines=function(e,t,i){if(e=this.getRowFoldStart(e),t=this.getRowFoldEnd(t),i<0){if((s=this.getRowFoldStart(e+i))<0)return 0;var n=s-e}else if(0<i){var s;if((s=this.getRowFoldEnd(t+i))>this.doc.getLength()-1)return 0;n=s-t}else{e=this.$clipRowToDocument(e);n=(t=this.$clipRowToDocument(t))-e+1}var o=new h(e,0,t,Number.MAX_VALUE),r=this.getFoldsInRange(o).map(function(e){return(e=e.clone()).start.row+=n,e.end.row+=n,e}),a=0==i?this.doc.getLines(e,t):this.doc.removeFullLines(e,t);return this.doc.insertFullLines(e+n,a),r.length&&this.addFolds(r),n},this.moveLinesUp=function(e,t){return this.$moveLines(e,t,-1)},this.moveLinesDown=function(e,t){return this.$moveLines(e,t,1)},this.duplicateLines=function(e,t){return this.$moveLines(e,t,0)},this.$clipRowToDocument=function(e){return Math.max(0,Math.min(e,this.doc.getLength()-1))},this.$clipColumnToRow=function(e,t){return t<0?0:Math.min(this.doc.getLine(e).length,t)},this.$clipPositionToDocument=function(e,t){if(t=Math.max(0,t),e<0)t=e=0;else{var i=this.doc.getLength();t=i<=e?(e=i-1,this.doc.getLine(i-1).length):Math.min(this.doc.getLine(e).length,t)}return{row:e,column:t}},this.$clipRangeToDocument=function(e){e.start.row<0?(e.start.row=0,e.start.column=0):e.start.column=this.$clipColumnToRow(e.start.row,e.start.column);var t=this.doc.getLength()-1;return e.end.row>t?(e.end.row=t,e.end.column=this.doc.getLine(t).length):e.end.column=this.$clipColumnToRow(e.end.row,e.end.column),e},this.$wrapLimit=80,this.$useWrapMode=!1,this.$wrapLimitRange={min:null,max:null},this.setUseWrapMode=function(e){if(e!=this.$useWrapMode){if(this.$useWrapMode=e,this.$modified=!0,this.$resetRowCache(0),e){var t=this.getLength();this.$wrapData=Array(t),this.$updateWrapData(0,t-1)}this._signal("changeWrapMode")}},this.getUseWrapMode=function(){return this.$useWrapMode},this.setWrapLimitRange=function(e,t){this.$wrapLimitRange.min===e&&this.$wrapLimitRange.max===t||(this.$wrapLimitRange={min:e,max:t},this.$modified=!0,this.$bidiHandler.markAsDirty(),this.$useWrapMode&&this._signal("changeWrapMode"))},this.adjustWrapLimit=function(e,t){var i=this.$wrapLimitRange;i.max<0&&(i={min:t,max:t});var n=this.$constrainWrapLimit(e,i.min,i.max);return n!=this.$wrapLimit&&1<n&&(this.$wrapLimit=n,this.$modified=!0,this.$useWrapMode&&(this.$updateWrapData(0,this.getLength()-1),this.$resetRowCache(0),this._signal("changeWrapLimit")),!0)},this.$constrainWrapLimit=function(e,t,i){return t&&(e=Math.max(t,e)),i&&(e=Math.min(i,e)),e},this.getWrapLimit=function(){return this.$wrapLimit},this.setWrapLimit=function(e){this.setWrapLimitRange(e,e)},this.getWrapLimitRange=function(){return{min:this.$wrapLimitRange.min,max:this.$wrapLimitRange.max}},this.$updateInternalDataOnChange=function(e){var t=this.$useWrapMode,i=e.action,n=e.start,s=e.end,o=n.row,r=s.row,a=r-o,l=null;if(this.$updating=!0,0!=a)if("remove"===i){this[t?"$wrapData":"$rowLengthCache"].splice(o,a);var c=this.$foldData;l=this.getFoldsInRange(e),this.removeFolds(l);var h=0;if(m=this.getFoldLine(s.row)){m.addRemoveChars(s.row,s.column,n.column-s.column),m.shiftRow(-a);var u=this.getFoldLine(o);u&&u!==m&&(u.merge(m),m=u),h=c.indexOf(m)+1}for(;h<c.length;h++){(m=c[h]).start.row>=s.row&&m.shiftRow(-a)}r=o}else{var d=Array(a);d.unshift(o,0);var g=t?this.$wrapData:this.$rowLengthCache;g.splice.apply(g,d);c=this.$foldData,h=0;if(m=this.getFoldLine(o)){var f=m.range.compareInside(n.row,n.column);0==f?(m=m.split(n.row,n.column))&&(m.shiftRow(a),m.addRemoveChars(r,0,s.column-n.column)):-1==f&&(m.addRemoveChars(o,0,s.column-n.column),m.shiftRow(a)),h=c.indexOf(m)+1}for(;h<c.length;h++){var m;(m=c[h]).start.row>=o&&m.shiftRow(a)}}else a=Math.abs(e.start.column-e.end.column),"remove"===i&&(l=this.getFoldsInRange(e),this.removeFolds(l),a=-a),(m=this.getFoldLine(o))&&m.addRemoveChars(o,n.column,a);return t&&this.$wrapData.length!=this.doc.getLength()&&console.error("doc.getLength() and $wrapData.length have to be the same!"),this.$updating=!1,t?this.$updateWrapData(o,r):this.$updateRowLengthCache(o,r),l},this.$updateRowLengthCache=function(e,t,i){this.$rowLengthCache[e]=null,this.$rowLengthCache[t]=null},this.$updateWrapData=function(e,t){var r,i,a=this.doc.getAllLines(),n=this.getTabSize(),s=this.$wrapData,o=this.$wrapLimit,l=e;for(t=Math.min(t,a.length-1);l<=t;)(i=this.getFoldLine(l,i))?(r=[],i.walk(function(e,t,i,n){var s;if(null!=e){(s=this.$getDisplayTokens(e,r.length))[0]=f;for(var o=1;o<s.length;o++)s[o]=m}else s=this.$getDisplayTokens(a[t].substring(n,i),r.length);r=r.concat(s)}.bind(this),i.end.row,a[i.end.row].length+1),s[i.start.row]=this.$computeWrapSplits(r,o,n),l=i.end.row+1):(r=this.$getDisplayTokens(a[l]),s[l]=this.$computeWrapSplits(r,o,n),l++)};var f=3,m=4;this.$computeWrapSplits=function(s,e,o){function t(e){for(var t=e-a,i=a;i<e;i++){var n=s[i];12!==n&&2!==n||(t-=1)}r.length||(d=function(){var e=0;if(0===u)return e;if(h)for(var t=0;t<s.length;t++){var i=s[t];if(10==i)e+=1;else{if(11!=i){if(12==i)continue;break}e+=o}}return c&&!1!==h&&(e+=o),Math.min(e,u)}(),r.indent=d),l+=t,r.push(l),a=e}if(0==s.length)return[];for(var r=[],i=s.length,a=0,l=0,c=this.$wrapAsCode,h=this.$indentedSoftWrap,u=e<=Math.max(2*o,8)||!1===h?0:Math.floor(e/2),d=0;e-d<i-a;){var n=a+e-d;if(10<=s[n-1]&&10<=s[n])t(n);else if(s[n]!=f&&s[n]!=m){for(var g=Math.max(n-(e-(e>>2)),a-1);g<n&&s[n]<f;)n--;if(c){for(;g<n&&s[n]<f;)n--;for(;g<n&&9==s[n];)n--}else for(;g<n&&s[n]<10;)n--;g<n?t(++n):(2==s[n=a+e]&&n--,t(n-d))}else{for(;n!=a-1&&s[n]!=f;n--);if(a<n){t(n);continue}for(n=a+e;n<s.length&&s[n]==m;n++);if(n==s.length)break;t(n)}}return r},this.$getDisplayTokens=function(e,t){var i,n=[];t=t||0;for(var s=0;s<e.length;s++){var o=e.charCodeAt(s);if(9==o){i=this.getScreenTabSize(n.length+t),n.push(11);for(var r=1;r<i;r++)n.push(12)}else 32==o?n.push(10):39<o&&o<48||57<o&&o<64?n.push(9):4352<=o&&a(o)?n.push(1,2):n.push(1)}return n},this.$getStringScreenWidth=function(e,t,i){if(0==t)return[0,0];var n,s;for(null==t&&(t=1/0),i=i||0,s=0;s<e.length&&(9==(n=e.charCodeAt(s))?i+=this.getScreenTabSize(i):4352<=n&&a(n)?i+=2:i+=1,!(t<i));s++);return[i,s]},this.lineWidgets=null,this.getRowLength=function(e){if(this.lineWidgets)var t=this.lineWidgets[e]&&this.lineWidgets[e].rowCount||0;else t=0;return this.$useWrapMode&&this.$wrapData[e]?this.$wrapData[e].length+1+t:1+t},this.getRowLineCount=function(e){return this.$useWrapMode&&this.$wrapData[e]?this.$wrapData[e].length+1:1},this.getRowWrapIndent=function(e){if(this.$useWrapMode){var t=this.screenToDocumentPosition(e,Number.MAX_VALUE),i=this.$wrapData[t.row];return i.length&&i[0]<t.column?i.indent:0}return 0},this.getScreenLastRowColumn=function(e){var t=this.screenToDocumentPosition(e,Number.MAX_VALUE);return this.documentToScreenColumn(t.row,t.column)},this.getDocumentLastRowColumn=function(e,t){var i=this.documentToScreenRow(e,t);return this.getScreenLastRowColumn(i)},this.getDocumentLastRowColumnPosition=function(e,t){var i=this.documentToScreenRow(e,t);return this.screenToDocumentPosition(i,Number.MAX_VALUE/10)},this.getRowSplitData=function(e){return this.$useWrapMode?this.$wrapData[e]:void 0},this.getScreenTabSize=function(e){return this.$tabSize-(e%this.$tabSize|0)},this.screenToDocumentRow=function(e,t){return this.screenToDocumentPosition(e,t).row},this.screenToDocumentColumn=function(e,t){return this.screenToDocumentPosition(e,t).column},this.screenToDocumentPosition=function(e,t,i){if(e<0)return{row:0,column:0};var n,s,o=0,r=0,a=0,l=0,c=this.$screenRowCache,h=this.$getRowCacheIndex(c,e),u=c.length;if(u&&0<=h){a=c[h],o=this.$docRowCache[h];var d=e>c[u-1]}else d=!u;for(var g=this.getLength()-1,f=this.getNextFoldLine(o),m=f?f.start.row:1/0;a<=e&&!(e<a+(l=this.getRowLength(o))||g<=o);)a+=l,m<++o&&(o=f.end.row+1,m=(f=this.getNextFoldLine(o,f))?f.start.row:1/0),d&&(this.$docRowCache.push(o),this.$screenRowCache.push(a));if(f&&f.start.row<=o)n=this.getFoldDisplayLine(f),o=f.start.row;else{if(a+l<=e||g<o)return{row:g,column:this.getLine(g).length};n=this.getLine(o),f=null}var p=0,v=Math.floor(e-a);if(this.$useWrapMode){var w=this.$wrapData[o];w&&(s=w[v],0<v&&w.length&&(p=w.indent,r=w[v-1]||w[w.length-1],n=n.substring(r)))}return void 0!==i&&this.$bidiHandler.isBidiRow(a+v,o,v)&&(t=this.$bidiHandler.offsetToCol(i)),r+=this.$getStringScreenWidth(n,t-p)[1],this.$useWrapMode&&s<=r&&(r=s-1),f?f.idxToPosition(r):{row:o,column:r}},this.documentToScreenPosition=function(e,t){if(void 0===t)var i=this.$clipPositionToDocument(e.row,e.column);else i=this.$clipPositionToDocument(e,t);e=i.row,t=i.column;var n,s=0,o=null;(n=this.getFoldAt(e,t,1))&&(e=n.start.row,t=n.start.column);var r,a=0,l=this.$docRowCache,c=this.$getRowCacheIndex(l,e),h=l.length;if(h&&0<=c){a=l[c],s=this.$screenRowCache[c];var u=e>l[h-1]}else u=!h;for(var d=this.getNextFoldLine(a),g=d?d.start.row:1/0;a<e;){if(g<=a){if(e<(r=d.end.row+1))break;g=(d=this.getNextFoldLine(r,d))?d.start.row:1/0}else r=a+1;s+=this.getRowLength(a),a=r,u&&(this.$docRowCache.push(a),this.$screenRowCache.push(s))}var f="";o=d&&g<=a?(f=this.getFoldDisplayLine(d,e,t),d.start.row):(f=this.getLine(e).substring(0,t),e);var m=0;if(this.$useWrapMode){var p=this.$wrapData[o];if(p){for(var v=0;f.length>=p[v];)s++,v++;f=f.substring(p[v-1]||0,f.length),m=0<v?p.indent:0}}return{row:s,column:m+this.$getStringScreenWidth(f)[0]}},this.documentToScreenColumn=function(e,t){return this.documentToScreenPosition(e,t).column},this.documentToScreenRow=function(e,t){return this.documentToScreenPosition(e,t).row},this.getScreenLength=function(){var e=0,t=null;if(this.$useWrapMode)for(var i=this.$wrapData.length,n=0,s=(a=0,(t=this.$foldData[a++])?t.start.row:1/0);n<i;){var o=this.$wrapData[n];e+=o?o.length+1:1,s<++n&&(n=t.end.row+1,s=(t=this.$foldData[a++])?t.start.row:1/0)}else{e=this.getLength();for(var r=this.$foldData,a=0;a<r.length;a++)e-=(t=r[a]).end.row-t.start.row}return this.lineWidgets&&(e+=this.$getWidgetScreenLength()),e},this.$setFontMetrics=function(o){this.$enableVarChar&&(this.$getStringScreenWidth=function(e,t,i){if(0===t)return[0,0];var n,s;for(t=t||1/0,i=i||0,s=0;s<e.length&&!(t<(i+="\t"===(n=e.charAt(s))?this.getScreenTabSize(i):o.getCharacterWidth(n)));s++);return[i,s]})},this.destroy=function(){this.bgTokenizer&&(this.bgTokenizer.setDocument(null),this.bgTokenizer=null),this.$stopWorker()},this.isFullWidth=a}.call(f.prototype),e("./edit_session/folding").Folding.call(f.prototype),e("./edit_session/bracket_match").BracketMatch.call(f.prototype),r.defineOptions(f.prototype,"session",{wrap:{set:function(e){if(e&&"off"!=e?"free"==e?e=!0:"printMargin"==e?e=-1:"string"==typeof e&&(e=parseInt(e,10)||!1):e=!1,this.$wrap!=e)if(this.$wrap=e){var t="number"==typeof e?e:null;this.setWrapLimitRange(t,t),this.setUseWrapMode(!0)}else this.setUseWrapMode(!1)},get:function(){return this.getUseWrapMode()?-1==this.$wrap?"printMargin":this.getWrapLimitRange().min?this.$wrap:"free":"off"},handlesSet:!0},wrapMethod:{set:function(e){(e="auto"==e?"text"!=this.$mode.type:"text"!=e)!=this.$wrapAsCode&&(this.$wrapAsCode=e,this.$useWrapMode&&(this.$useWrapMode=!1,this.setUseWrapMode(!0)))},initialValue:"auto"},indentedSoftWrap:{set:function(){this.$useWrapMode&&(this.$useWrapMode=!1,this.setUseWrapMode(!0))},initialValue:!0},firstLineNumber:{set:function(){this._signal("changeBreakpoint")},initialValue:1},useWorker:{set:function(e){this.$useWorker=e,this.$stopWorker(),e&&this.$startWorker()},initialValue:!0},useSoftTabs:{initialValue:!0},tabSize:{set:function(e){0<(e=parseInt(e))&&this.$tabSize!==e&&(this.$modified=!0,this.$rowLengthCache=[],this.$tabSize=e,this._signal("changeTabSize"))},initialValue:4,handlesSet:!0},navigateWithinSoftTabs:{initialValue:!1},foldStyle:{set:function(e){this.setFoldStyle(e)},handlesSet:!0},overwrite:{set:function(e){this._signal("changeOverwrite")},initialValue:!1},newLineMode:{set:function(e){this.doc.setNewLineMode(e)},get:function(){return this.doc.getNewLineMode()},handlesSet:!0},mode:{set:function(e){this.setMode(e)},get:function(){return this.$modeId},handlesSet:!0}}),t.EditSession=f}),ace.define("ace/search",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/range"],function(e,t,i){"use strict";function n(){this.$options={}}var y=e("./lib/lang"),s=e("./lib/oop"),$=e("./range").Range;(function(){this.set=function(e){return s.mixin(this.$options,e),this},this.getOptions=function(){return y.copyObject(this.$options)},this.setOptions=function(e){this.$options=e},this.find=function(e){var s=this.$options,t=this.$matchIterator(e,s);if(!t)return!1;var o=null;return t.forEach(function(e,t,i,n){return o=new $(e,t,i,n),!(t==n&&s.start&&s.start.start&&0!=s.skipCurrent&&o.isEqual(s.start))||(o=null,!1)}),o},this.findAll=function(e){var t=this.$options;if(!t.needle)return[];this.$assembleRegExp(t);var i=t.range,n=i?e.getLines(i.start.row,i.end.row):e.doc.getAllLines(),s=[],o=t.re;if(t.$isMultiLine){var r,a=o.length,l=n.length-a;e:for(var c=o.offset||0;c<=l;c++){for(var h=0;h<a;h++)if(-1==n[c+h].search(o[h]))continue e;var u=n[c],d=n[c+a-1],g=u.length-u.match(o[0])[0].length,f=d.match(o[a-1])[0].length;r&&r.end.row===c&&r.end.column>g||(s.push(r=new $(c,g,c+a-1,f)),2<a&&(c=c+a-2))}}else for(var m=0;m<n.length;m++){var p=y.getMatchOffsets(n[m],o);for(h=0;h<p.length;h++){var v=p[h];s.push(new $(m,v.offset,m,v.offset+v.length))}}if(i){var w=i.start.column,b=i.start.column;for(m=0,h=s.length-1;m<h&&s[m].start.column<w&&s[m].start.row==i.start.row;)m++;for(;m<h&&s[h].end.column>b&&s[h].end.row==i.end.row;)h--;for(s=s.slice(m,h+1),m=0,h=s.length;m<h;m++)s[m].start.row+=i.start.row,s[m].end.row+=i.start.row}return s},this.replace=function(e,t){var i=this.$options,n=this.$assembleRegExp(i);if(i.$isMultiLine)return t;if(n){var s=n.exec(e);if(!s||s[0].length!=e.length)return null;if(t=e.replace(n,t),i.preserveCase){t=t.split("");for(var o=Math.min(e.length,e.length);o--;){var r=e[o];r&&r.toLowerCase()!=r?t[o]=t[o].toUpperCase():t[o]=t[o].toLowerCase()}t=t.join("")}return t}},this.$assembleRegExp=function(e,t){if(e.needle instanceof RegExp)return e.re=e.needle;var i=e.needle;if(!e.needle)return e.re=!1;e.regExp||(i=y.escapeRegExp(i)),e.wholeWord&&(i=function(e,t){function i(e){return/\w/.test(e)||t.regExp?"\\b":""}return i(e[0])+e+i(e[e.length-1])}(i,e));var n=e.caseSensitive?"gm":"gmi";if(e.$isMultiLine=!t&&/[\n\r]/.test(i),e.$isMultiLine)return e.re=this.$assembleMultilineRegExp(i,n);try{var s=new RegExp(i,n)}catch(e){s=!1}return e.re=s},this.$assembleMultilineRegExp=function(e,t){for(var i=e.replace(/\r\n|\r|\n/g,"$\n^").split("\n"),n=[],s=0;s<i.length;s++)try{n.push(new RegExp(i[s],t))}catch(e){return!1}return n},this.$matchIterator=function(h,i){var u=this.$assembleRegExp(i);if(!u)return!1;var l=1==i.backwards,e=0!=i.skipCurrent,t=i.range,n=i.start;(n=n||(t?t[l?"end":"start"]:h.selection.getRange())).start&&(n=n[e!=l?"end":"start"]);var s=t?t.start.row:0,o=t?t.end.row:h.getLength()-1;if(l)var r=function(e){var t=n.row;if(!a(t,n.column,e)){for(t--;s<=t;t--)if(a(t,Number.MAX_VALUE,e))return;if(0!=i.wrap)for(t=o,s=n.row;s<=t;t--)if(a(t,Number.MAX_VALUE,e))return}};else r=function(e){var t=n.row;if(!a(t,n.column,e)){for(t+=1;t<=o;t++)if(a(t,0,e))return;if(0!=i.wrap)for(t=s,o=n.row;t<=o;t++)if(a(t,0,e))return}};if(i.$isMultiLine)var c=u.length,a=function(e,t,i){var n=l?e-c+1:e;if(!(n<0)){var s=h.getLine(n),o=s.search(u[0]);if(!(!l&&o<t||-1===o)){for(var r=1;r<c;r++)if(-1==(s=h.getLine(n+r)).search(u[r]))return;var a=s.match(u[c-1])[0].length;if(!(l&&t<a))return!!i(n,o,n+c-1,a)||void 0}}};else if(l)a=function(e,t,i){var n,s=h.getLine(e),o=[],r=0;for(u.lastIndex=0;n=u.exec(s);){var a=n[0].length;if(r=n.index,!a){if(r>=s.length)break;u.lastIndex=r+=1}if(n.index+a>t)break;o.push(n.index,a)}for(var l=o.length-1;0<=l;l-=2){var c=o[l-1];if(i(e,c,e,c+(a=o[l])))return!0}};else a=function(e,t,i){var n,s,o=h.getLine(e);for(u.lastIndex=t;s=u.exec(o);){var r=s[0].length;if(i(e,n=s.index,e,n+r))return!0;if(!r&&(u.lastIndex=n+=1,n>=o.length))return!1}};return{forEach:r}}}).call(n.prototype),t.Search=n}),ace.define("ace/keyboard/hash_handler",["require","exports","module","ace/lib/keys","ace/lib/useragent"],function(e,t,i){"use strict";function n(e,t){this.platform=t||(o.isMac?"mac":"win"),this.commands={},this.commandKeyBinding={},this.addCommands(e),this.$singleCommand=!0}function s(e,t){n.call(this,e,t),this.$singleCommand=!1}var a=e("../lib/keys"),o=e("../lib/useragent"),l=a.KEY_MODS;s.prototype=n.prototype,function(){function r(e){return"object"==typeof e&&e.bindKey&&e.bindKey.position||(e.isDefault?-100:0)}this.addCommand=function(e){this.commands[e.name]&&this.removeCommand(e),(this.commands[e.name]=e).bindKey&&this._buildKeyHash(e)},this.removeCommand=function(e,t){var i=e&&("string"==typeof e?e:e.name);e=this.commands[i],t||delete this.commands[i];var n=this.commandKeyBinding;for(var s in n){var o=n[s];if(o==e)delete n[s];else if(Array.isArray(o)){var r=o.indexOf(e);-1!=r&&(o.splice(r,1),1==o.length&&(n[s]=o[0]))}}},this.bindKey=function(e,o,r){if("object"==typeof e&&e&&(null==r&&(r=e.position),e=e[this.platform]),e)return"function"==typeof o?this.addCommand({exec:o,bindKey:e,name:o.name||e}):void e.split("|").forEach(function(e){var n="";if(-1!=e.indexOf(" ")){var t=e.split(/\s+/);e=t.pop(),t.forEach(function(e){var t=this.parseKeys(e),i=l[t.hashId]+t.key;n+=(n?" ":"")+i,this._addCommandToBinding(n,"chainKeys")},this),n+=" "}var i=this.parseKeys(e),s=l[i.hashId]+i.key;this._addCommandToBinding(n+s,o,r)},this)},this._addCommandToBinding=function(e,t,i){var n,s=this.commandKeyBinding;if(t)if(!s[e]||this.$singleCommand)s[e]=t;else{Array.isArray(s[e])?-1!=(n=s[e].indexOf(t))&&s[e].splice(n,1):s[e]=[s[e]],"number"!=typeof i&&(i=r(t));var o=s[e];for(n=0;n<o.length;n++){if(i<r(o[n]))break}o.splice(n,0,t)}else delete s[e]},this.addCommands=function(i){i&&Object.keys(i).forEach(function(e){var t=i[e];if(t){if("string"==typeof t)return this.bindKey(t,e);"function"==typeof t&&(t={exec:t}),"object"==typeof t&&(t.name||(t.name=e),this.addCommand(t))}},this)},this.removeCommands=function(t){Object.keys(t).forEach(function(e){this.removeCommand(t[e])},this)},this.bindKeys=function(t){Object.keys(t).forEach(function(e){this.bindKey(e,t[e])},this)},this._buildKeyHash=function(e){this.bindKey(e.bindKey,e)},this.parseKeys=function(e){var t=e.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(e){return e}),i=t.pop(),n=a[i];if(a.FUNCTION_KEYS[n])i=a.FUNCTION_KEYS[n].toLowerCase();else{if(!t.length)return{key:i,hashId:-1};if(1==t.length&&"shift"==t[0])return{key:i.toUpperCase(),hashId:-1}}for(var s=0,o=t.length;o--;){var r=a.KEY_MODS[t[o]];if(null==r)return"undefined"!=typeof console&&console.error("invalid modifier "+t[o]+" in "+e),!1;s|=r}return{key:i,hashId:s}},this.findKeyCommand=function(e,t){var i=l[e]+t;return this.commandKeyBinding[i]},this.handleKeyboard=function(e,t,i,n){if(!(n<0)){var s=l[t]+i,o=this.commandKeyBinding[s];return e.$keyChain&&(e.$keyChain+=" "+s,o=this.commandKeyBinding[e.$keyChain]||o),!o||"chainKeys"!=o&&"chainKeys"!=o[o.length-1]?(e.$keyChain&&(t&&4!=t||1!=i.length?(-1==t||0<n)&&(e.$keyChain=""):e.$keyChain=e.$keyChain.slice(0,-s.length-1)),{command:o}):(e.$keyChain=e.$keyChain||s,{command:"null"})}},this.getStatusText=function(e,t){return t.$keyChain||""}}.call(n.prototype),t.HashHandler=n,t.MultiHashHandler=s}),ace.define("ace/commands/command_manager",["require","exports","module","ace/lib/oop","ace/keyboard/hash_handler","ace/lib/event_emitter"],function(e,t,i){"use strict";function n(e,t){o.call(this,t,e),this.byName=this.commands,this.setDefaultHandler("exec",function(e){return e.command.exec(e.editor,e.args||{})})}var s=e("../lib/oop"),o=e("../keyboard/hash_handler").MultiHashHandler,r=e("../lib/event_emitter").EventEmitter;s.inherits(n,o),function(){s.implement(this,r),this.exec=function(e,t,i){if(Array.isArray(e)){for(var n=e.length;n--;)if(this.exec(e[n],t,i))return!0;return!1}if("string"==typeof e&&(e=this.commands[e]),!e)return!1;if(t&&t.$readOnly&&!e.readOnly)return!1;if(0!=this.$checkCommandState&&e.isAvailable&&!e.isAvailable(t))return!1;var s={editor:t,command:e,args:i};return s.returnValue=this._emit("exec",s),this._signal("afterExec",s),!1!==s.returnValue},this.toggleRecording=function(e){if(!this.$inReplay)return e&&e._emit("changeStatus"),this.recording?(this.macro.pop(),this.removeEventListener("exec",this.$addCommandToMacro),this.macro.length||(this.macro=this.oldMacro),this.recording=!1):(this.$addCommandToMacro||(this.$addCommandToMacro=function(e){this.macro.push([e.command,e.args])}.bind(this)),this.oldMacro=this.macro,this.macro=[],this.on("exec",this.$addCommandToMacro),this.recording=!0)},this.replay=function(t){if(!this.$inReplay&&this.macro){if(this.recording)return this.toggleRecording(t);try{this.$inReplay=!0,this.macro.forEach(function(e){"string"==typeof e?this.exec(e,t):this.exec(e[0],t,e[1])},this)}finally{this.$inReplay=!1}}},this.trimMacro=function(e){return e.map(function(e){return"string"!=typeof e[0]&&(e[0]=e[0].name),e[1]||(e=e[0]),e})}}.call(n.prototype),t.CommandManager=n}),ace.define("ace/commands/default_commands",["require","exports","module","ace/lib/lang","ace/config","ace/range"],function(e,t,i){"use strict";function n(e,t){return{win:e,mac:t}}var c=e("../lib/lang"),s=e("../config"),h=e("../range").Range;t.commands=[{name:"showSettingsMenu",bindKey:n("Ctrl-,","Command-,"),exec:function(t){s.loadModule("ace/ext/settings_menu",function(e){e.init(t),t.showSettingsMenu()})},readOnly:!0},{name:"goToNextError",bindKey:n("Alt-E","F4"),exec:function(t){s.loadModule("./ext/error_marker",function(e){e.showErrorMarker(t,1)})},scrollIntoView:"animate",readOnly:!0},{name:"goToPreviousError",bindKey:n("Alt-Shift-E","Shift-F4"),exec:function(t){s.loadModule("./ext/error_marker",function(e){e.showErrorMarker(t,-1)})},scrollIntoView:"animate",readOnly:!0},{name:"selectall",description:"Select all",bindKey:n("Ctrl-A","Command-A"),exec:function(e){e.selectAll()},readOnly:!0},{name:"centerselection",description:"Center selection",bindKey:n(null,"Ctrl-L"),exec:function(e){e.centerSelection()},readOnly:!0},{name:"gotoline",description:"Go to line...",bindKey:n("Ctrl-L","Command-L"),exec:function(e,t){"number"!=typeof t||isNaN(t)||e.gotoLine(t),e.prompt({$type:"gotoLine"})},readOnly:!0},{name:"fold",bindKey:n("Alt-L|Ctrl-F1","Command-Alt-L|Command-F1"),exec:function(e){e.session.toggleFold(!1)},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"unfold",bindKey:n("Alt-Shift-L|Ctrl-Shift-F1","Command-Alt-Shift-L|Command-Shift-F1"),exec:function(e){e.session.toggleFold(!0)},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"toggleFoldWidget",bindKey:n("F2","F2"),exec:function(e){e.session.toggleFoldWidget()},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"toggleParentFoldWidget",bindKey:n("Alt-F2","Alt-F2"),exec:function(e){e.session.toggleFoldWidget(!0)},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"foldall",description:"Fold all",bindKey:n(null,"Ctrl-Command-Option-0"),exec:function(e){e.session.foldAll()},scrollIntoView:"center",readOnly:!0},{name:"foldOther",description:"Fold other",bindKey:n("Alt-0","Command-Option-0"),exec:function(e){e.session.foldAll(),e.session.unfold(e.selection.getAllRanges())},scrollIntoView:"center",readOnly:!0},{name:"unfoldall",description:"Unfold all",bindKey:n("Alt-Shift-0","Command-Option-Shift-0"),exec:function(e){e.session.unfold()},scrollIntoView:"center",readOnly:!0},{name:"findnext",description:"Find next",bindKey:n("Ctrl-K","Command-G"),exec:function(e){e.findNext()},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"findprevious",description:"Find previous",bindKey:n("Ctrl-Shift-K","Command-Shift-G"),exec:function(e){e.findPrevious()},multiSelectAction:"forEach",scrollIntoView:"center",readOnly:!0},{name:"selectOrFindNext",description:"Select or find next",bindKey:n("Alt-K","Ctrl-G"),exec:function(e){e.selection.isEmpty()?e.selection.selectWord():e.findNext()},readOnly:!0},{name:"selectOrFindPrevious",description:"Select or find previous",bindKey:n("Alt-Shift-K","Ctrl-Shift-G"),exec:function(e){e.selection.isEmpty()?e.selection.selectWord():e.findPrevious()},readOnly:!0},{name:"find",description:"Find",bindKey:n("Ctrl-F","Command-F"),exec:function(t){s.loadModule("ace/ext/searchbox",function(e){e.Search(t)})},readOnly:!0},{name:"overwrite",description:"Overwrite",bindKey:"Insert",exec:function(e){e.toggleOverwrite()},readOnly:!0},{name:"selecttostart",description:"Select to start",bindKey:n("Ctrl-Shift-Home","Command-Shift-Home|Command-Shift-Up"),exec:function(e){e.getSelection().selectFileStart()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"gotostart",description:"Go to start",bindKey:n("Ctrl-Home","Command-Home|Command-Up"),exec:function(e){e.navigateFileStart()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"selectup",description:"Select up",bindKey:n("Shift-Up","Shift-Up|Ctrl-Shift-P"),exec:function(e){e.getSelection().selectUp()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"golineup",description:"Go line up",bindKey:n("Up","Up|Ctrl-P"),exec:function(e,t){e.navigateUp(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selecttoend",description:"Select to end",bindKey:n("Ctrl-Shift-End","Command-Shift-End|Command-Shift-Down"),exec:function(e){e.getSelection().selectFileEnd()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"gotoend",description:"Go to end",bindKey:n("Ctrl-End","Command-End|Command-Down"),exec:function(e){e.navigateFileEnd()},multiSelectAction:"forEach",readOnly:!0,scrollIntoView:"animate",aceCommandGroup:"fileJump"},{name:"selectdown",description:"Select down",bindKey:n("Shift-Down","Shift-Down|Ctrl-Shift-N"),exec:function(e){e.getSelection().selectDown()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"golinedown",description:"Go line down",bindKey:n("Down","Down|Ctrl-N"),exec:function(e,t){e.navigateDown(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectwordleft",description:"Select word left",bindKey:n("Ctrl-Shift-Left","Option-Shift-Left"),exec:function(e){e.getSelection().selectWordLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotowordleft",description:"Go to word left",bindKey:n("Ctrl-Left","Option-Left"),exec:function(e){e.navigateWordLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selecttolinestart",description:"Select to line start",bindKey:n("Alt-Shift-Left","Command-Shift-Left|Ctrl-Shift-A"),exec:function(e){e.getSelection().selectLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotolinestart",description:"Go to line start",bindKey:n("Alt-Left|Home","Command-Left|Home|Ctrl-A"),exec:function(e){e.navigateLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectleft",description:"Select left",bindKey:n("Shift-Left","Shift-Left|Ctrl-Shift-B"),exec:function(e){e.getSelection().selectLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotoleft",description:"Go to left",bindKey:n("Left","Left|Ctrl-B"),exec:function(e,t){e.navigateLeft(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectwordright",description:"Select word right",bindKey:n("Ctrl-Shift-Right","Option-Shift-Right"),exec:function(e){e.getSelection().selectWordRight()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotowordright",description:"Go to word right",bindKey:n("Ctrl-Right","Option-Right"),exec:function(e){e.navigateWordRight()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selecttolineend",description:"Select to line end",bindKey:n("Alt-Shift-Right","Command-Shift-Right|Shift-End|Ctrl-Shift-E"),exec:function(e){e.getSelection().selectLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotolineend",description:"Go to line end",bindKey:n("Alt-Right|End","Command-Right|End|Ctrl-E"),exec:function(e){e.navigateLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectright",description:"Select right",bindKey:n("Shift-Right","Shift-Right"),exec:function(e){e.getSelection().selectRight()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"gotoright",description:"Go to right",bindKey:n("Right","Right|Ctrl-F"),exec:function(e,t){e.navigateRight(t.times)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectpagedown",description:"Select page down",bindKey:"Shift-PageDown",exec:function(e){e.selectPageDown()},readOnly:!0},{name:"pagedown",description:"Page down",bindKey:n(null,"Option-PageDown"),exec:function(e){e.scrollPageDown()},readOnly:!0},{name:"gotopagedown",description:"Go to page down",bindKey:n("PageDown","PageDown|Ctrl-V"),exec:function(e){e.gotoPageDown()},readOnly:!0},{name:"selectpageup",description:"Select page up",bindKey:"Shift-PageUp",exec:function(e){e.selectPageUp()},readOnly:!0},{name:"pageup",description:"Page up",bindKey:n(null,"Option-PageUp"),exec:function(e){e.scrollPageUp()},readOnly:!0},{name:"gotopageup",description:"Go to page up",bindKey:"PageUp",exec:function(e){e.gotoPageUp()},readOnly:!0},{name:"scrollup",description:"Scroll up",bindKey:n("Ctrl-Up",null),exec:function(e){e.renderer.scrollBy(0,-2*e.renderer.layerConfig.lineHeight)},readOnly:!0},{name:"scrolldown",description:"Scroll down",bindKey:n("Ctrl-Down",null),exec:function(e){e.renderer.scrollBy(0,2*e.renderer.layerConfig.lineHeight)},readOnly:!0},{name:"selectlinestart",description:"Select line start",bindKey:"Shift-Home",exec:function(e){e.getSelection().selectLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"selectlineend",description:"Select line end",bindKey:"Shift-End",exec:function(e){e.getSelection().selectLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"togglerecording",description:"Toggle recording",bindKey:n("Ctrl-Alt-E","Command-Option-E"),exec:function(e){e.commands.toggleRecording(e)},readOnly:!0},{name:"replaymacro",description:"Replay macro",bindKey:n("Ctrl-Shift-E","Command-Shift-E"),exec:function(e){e.commands.replay(e)},readOnly:!0},{name:"jumptomatching",description:"Jump to matching",bindKey:n("Ctrl-\\|Ctrl-P","Command-\\"),exec:function(e){e.jumpToMatching()},multiSelectAction:"forEach",scrollIntoView:"animate",readOnly:!0},{name:"selecttomatching",description:"Select to matching",bindKey:n("Ctrl-Shift-\\|Ctrl-Shift-P","Command-Shift-\\"),exec:function(e){e.jumpToMatching(!0)},multiSelectAction:"forEach",scrollIntoView:"animate",readOnly:!0},{name:"expandToMatching",description:"Expand to matching",bindKey:n("Ctrl-Shift-M","Ctrl-Shift-M"),exec:function(e){e.jumpToMatching(!0,!0)},multiSelectAction:"forEach",scrollIntoView:"animate",readOnly:!0},{name:"passKeysToBrowser",description:"Pass keys to browser",bindKey:n(null,null),exec:function(){},passEvent:!0,readOnly:!0},{name:"copy",description:"Copy",exec:function(e){},readOnly:!0},{name:"cut",description:"Cut",exec:function(e){var t=e.$copyWithEmptySelection&&e.selection.isEmpty()?e.selection.getLineRange():e.selection.getRange();e._emit("cut",t),t.isEmpty()||e.session.remove(t),e.clearSelection()},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"paste",description:"Paste",exec:function(e,t){e.$handlePaste(t)},scrollIntoView:"cursor"},{name:"removeline",description:"Remove line",bindKey:n("Ctrl-D","Command-D"),exec:function(e){e.removeLines()},scrollIntoView:"cursor",multiSelectAction:"forEachLine"},{name:"duplicateSelection",description:"Duplicate selection",bindKey:n("Ctrl-Shift-D","Command-Shift-D"),exec:function(e){e.duplicateSelection()},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"sortlines",description:"Sort lines",bindKey:n("Ctrl-Alt-S","Command-Alt-S"),exec:function(e){e.sortLines()},scrollIntoView:"selection",multiSelectAction:"forEachLine"},{name:"togglecomment",description:"Toggle comment",bindKey:n("Ctrl-/","Command-/"),exec:function(e){e.toggleCommentLines()},multiSelectAction:"forEachLine",scrollIntoView:"selectionPart"},{name:"toggleBlockComment",description:"Toggle block comment",bindKey:n("Ctrl-Shift-/","Command-Shift-/"),exec:function(e){e.toggleBlockComment()},multiSelectAction:"forEach",scrollIntoView:"selectionPart"},{name:"modifyNumberUp",description:"Modify number up",bindKey:n("Ctrl-Shift-Up","Alt-Shift-Up"),exec:function(e){e.modifyNumber(1)},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"modifyNumberDown",description:"Modify number down",bindKey:n("Ctrl-Shift-Down","Alt-Shift-Down"),exec:function(e){e.modifyNumber(-1)},scrollIntoView:"cursor",multiSelectAction:"forEach"},{name:"replace",description:"Replace",bindKey:n("Ctrl-H","Command-Option-F"),exec:function(t){s.loadModule("ace/ext/searchbox",function(e){e.Search(t,!0)})}},{name:"undo",description:"Undo",bindKey:n("Ctrl-Z","Command-Z"),exec:function(e){e.undo()}},{name:"redo",description:"Redo",bindKey:n("Ctrl-Shift-Z|Ctrl-Y","Command-Shift-Z|Command-Y"),exec:function(e){e.redo()}},{name:"copylinesup",description:"Copy lines up",bindKey:n("Alt-Shift-Up","Command-Option-Up"),exec:function(e){e.copyLinesUp()},scrollIntoView:"cursor"},{name:"movelinesup",description:"Move lines up",bindKey:n("Alt-Up","Option-Up"),exec:function(e){e.moveLinesUp()},scrollIntoView:"cursor"},{name:"copylinesdown",description:"Copy lines down",bindKey:n("Alt-Shift-Down","Command-Option-Down"),exec:function(e){e.copyLinesDown()},scrollIntoView:"cursor"},{name:"movelinesdown",description:"Move lines down",bindKey:n("Alt-Down","Option-Down"),exec:function(e){e.moveLinesDown()},scrollIntoView:"cursor"},{name:"del",description:"Delete",bindKey:n("Delete","Delete|Ctrl-D|Shift-Delete"),exec:function(e){e.remove("right")},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"backspace",description:"Backspace",bindKey:n("Shift-Backspace|Backspace","Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),exec:function(e){e.remove("left")},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"cut_or_delete",description:"Cut or delete",bindKey:n("Shift-Delete",null),exec:function(e){if(!e.selection.isEmpty())return!1;e.remove("left")},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolinestart",description:"Remove to line start",bindKey:n("Alt-Backspace","Command-Backspace"),exec:function(e){e.removeToLineStart()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolineend",description:"Remove to line end",bindKey:n("Alt-Delete","Ctrl-K|Command-Delete"),exec:function(e){e.removeToLineEnd()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolinestarthard",description:"Remove to line start hard",bindKey:n("Ctrl-Shift-Backspace",null),exec:function(e){var t=e.selection.getRange();t.start.column=0,e.session.remove(t)},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removetolineendhard",description:"Remove to line end hard",bindKey:n("Ctrl-Shift-Delete",null),exec:function(e){var t=e.selection.getRange();t.end.column=Number.MAX_VALUE,e.session.remove(t)},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removewordleft",description:"Remove word left",bindKey:n("Ctrl-Backspace","Alt-Backspace|Ctrl-Alt-Backspace"),exec:function(e){e.removeWordLeft()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"removewordright",description:"Remove word right",bindKey:n("Ctrl-Delete","Alt-Delete"),exec:function(e){e.removeWordRight()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"outdent",description:"Outdent",bindKey:n("Shift-Tab","Shift-Tab"),exec:function(e){e.blockOutdent()},multiSelectAction:"forEach",scrollIntoView:"selectionPart"},{name:"indent",description:"Indent",bindKey:n("Tab","Tab"),exec:function(e){e.indent()},multiSelectAction:"forEach",scrollIntoView:"selectionPart"},{name:"blockoutdent",description:"Block outdent",bindKey:n("Ctrl-[","Ctrl-["),exec:function(e){e.blockOutdent()},multiSelectAction:"forEachLine",scrollIntoView:"selectionPart"},{name:"blockindent",description:"Block indent",bindKey:n("Ctrl-]","Ctrl-]"),exec:function(e){e.blockIndent()},multiSelectAction:"forEachLine",scrollIntoView:"selectionPart"},{name:"insertstring",description:"Insert string",exec:function(e,t){e.insert(t)},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"inserttext",description:"Insert text",exec:function(e,t){e.insert(c.stringRepeat(t.text||"",t.times||1))},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"splitline",description:"Split line",bindKey:n(null,"Ctrl-O"),exec:function(e){e.splitLine()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"transposeletters",description:"Transpose letters",bindKey:n("Alt-Shift-X","Ctrl-T"),exec:function(e){e.transposeLetters()},multiSelectAction:function(e){e.transposeSelections(1)},scrollIntoView:"cursor"},{name:"touppercase",description:"To uppercase",bindKey:n("Ctrl-U","Ctrl-U"),exec:function(e){e.toUpperCase()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"tolowercase",description:"To lowercase",bindKey:n("Ctrl-Shift-U","Ctrl-Shift-U"),exec:function(e){e.toLowerCase()},multiSelectAction:"forEach",scrollIntoView:"cursor"},{name:"expandtoline",description:"Expand to line",bindKey:n("Ctrl-Shift-L","Command-Shift-L"),exec:function(e){var t=e.selection.getRange();t.start.column=t.end.column=0,t.end.row++,e.selection.setRange(t,!1)},multiSelectAction:"forEach",scrollIntoView:"cursor",readOnly:!0},{name:"joinlines",description:"Join lines",bindKey:n(null,null),exec:function(e){for(var t=e.selection.isBackwards(),i=t?e.selection.getSelectionLead():e.selection.getSelectionAnchor(),n=t?e.selection.getSelectionAnchor():e.selection.getSelectionLead(),s=e.session.doc.getLine(i.row).length,o=e.session.doc.getTextRange(e.selection.getRange()).replace(/\n\s*/," ").length,r=e.session.doc.getLine(i.row),a=i.row+1;a<=n.row+1;a++){var l=c.stringTrimLeft(c.stringTrimRight(e.session.doc.getLine(a)));0!==l.length&&(l=" "+l),r+=l}n.row+1<e.session.doc.getLength()-1&&(r+=e.session.doc.getNewLineCharacter()),e.clearSelection(),e.session.doc.replace(new h(i.row,0,n.row+2,0),r),0<o?(e.selection.moveCursorTo(i.row,i.column),e.selection.selectTo(i.row,i.column+o)):(s=e.session.doc.getLine(i.row).length>s?s+1:s,e.selection.moveCursorTo(i.row,s))},multiSelectAction:"forEach",readOnly:!0},{name:"invertSelection",description:"Invert selection",bindKey:n(null,null),exec:function(e){var t=e.session.doc.getLength()-1,i=e.session.doc.getLine(t).length,n=e.selection.rangeList.ranges,s=[];n.length<1&&(n=[e.selection.getRange()]);for(var o=0;o<n.length;o++)o!=n.length-1||n[o].end.row===t&&n[o].end.column===i||s.push(new h(n[o].end.row,n[o].end.column,t,i)),0===o?0===n[o].start.row&&0===n[o].start.column||s.push(new h(0,0,n[o].start.row,n[o].start.column)):s.push(new h(n[o-1].end.row,n[o-1].end.column,n[o].start.row,n[o].start.column));e.exitMultiSelectMode(),e.clearSelection();for(o=0;o<s.length;o++)e.selection.addRange(s[o],!1)},readOnly:!0,scrollIntoView:"none"},{name:"openCommandPallete",description:"Open command pallete",bindKey:n("F1","F1"),exec:function(e){e.prompt({$type:"commands"})},readOnly:!0},{name:"modeSelect",description:"Change language mode...",bindKey:n(null,null),exec:function(e){e.prompt({$type:"modes"})},readOnly:!0}]}),ace.define("ace/editor",["require","exports","module","ace/lib/fixoldbrowsers","ace/lib/oop","ace/lib/dom","ace/lib/lang","ace/lib/useragent","ace/keyboard/textinput","ace/mouse/mouse_handler","ace/mouse/fold_handler","ace/keyboard/keybinding","ace/edit_session","ace/search","ace/range","ace/lib/event_emitter","ace/commands/command_manager","ace/commands/default_commands","ace/config","ace/token_iterator","ace/clipboard"],function(e,t,i){"use strict";e("./lib/fixoldbrowsers");var o=e("./lib/oop"),n=e("./lib/dom"),p=e("./lib/lang"),s=e("./lib/useragent"),r=e("./keyboard/textinput").TextInput,a=e("./mouse/mouse_handler").MouseHandler,l=e("./mouse/fold_handler").FoldHandler,c=e("./keyboard/keybinding").KeyBinding,h=e("./edit_session").EditSession,u=e("./search").Search,m=e("./range").Range,d=e("./lib/event_emitter").EventEmitter,g=e("./commands/command_manager").CommandManager,f=e("./commands/default_commands").commands,v=e("./config"),w=e("./token_iterator").TokenIterator,b=e("./clipboard"),y=function(e,t,i){var n=e.getContainerElement();this.container=n,this.renderer=e,this.id="editor"+ ++y.$uid,this.commands=new g(s.isMac?"mac":"win",f),"object"==typeof document&&(this.textInput=new r(e.getTextAreaContainer(),this),this.renderer.textarea=this.textInput.getElement(),this.$mouseHandler=new a(this),new l(this)),this.keyBinding=new c(this),this.$search=(new u).set({wrap:!0}),this.$historyTracker=this.$historyTracker.bind(this),this.commands.on("exec",this.$historyTracker),this.$initOperationListeners(),this._$emitInputEvent=p.delayedCall(function(){this._signal("input",{}),this.session&&this.session.bgTokenizer&&this.session.bgTokenizer.scheduleStart()}.bind(this)),this.on("change",function(e,t){t._$emitInputEvent.schedule(31)}),this.setSession(t||i&&i.session||new h("")),v.resetOptions(this),i&&this.setOptions(i),v._signal("editor",this)};y.$uid=0,function(){o.implement(this,d),this.$initOperationListeners=function(){this.commands.on("exec",this.startOperation.bind(this),!0),this.commands.on("afterExec",this.endOperation.bind(this),!0),this.$opResetTimer=p.delayedCall(this.endOperation.bind(this,!0)),this.on("change",function(){this.curOp||(this.startOperation(),this.curOp.selectionBefore=this.$lastSel),this.curOp.docChanged=!0}.bind(this),!0),this.on("changeSelection",function(){this.curOp||(this.startOperation(),this.curOp.selectionBefore=this.$lastSel),this.curOp.selectionChanged=!0}.bind(this),!0)},this.curOp=null,this.prevOp={},this.startOperation=function(e){if(this.curOp){if(!e||this.curOp.command)return;this.prevOp=this.curOp}e||(this.previousCommand=null,e={}),this.$opResetTimer.schedule(),this.curOp=this.session.curOp={command:e.command||{},args:e.args,scrollTop:this.renderer.scrollTop},this.curOp.selectionBefore=this.selection.toJSON()},this.endOperation=function(e){if(this.curOp){if(e&&!1===e.returnValue)return this.curOp=null;if(1==e&&this.curOp.command&&"mouse"==this.curOp.command.name)return;if(this._signal("beforeEndOperation"),!this.curOp)return;var t=this.curOp.command,i=t&&t.scrollIntoView;if(i){switch(i){case"center-animate":i="animate";case"center":this.renderer.scrollCursorIntoView(null,.5);break;case"animate":case"cursor":this.renderer.scrollCursorIntoView();break;case"selectionPart":var n=this.selection.getRange(),s=this.renderer.layerConfig;(n.start.row>=s.lastRow||n.end.row<=s.firstRow)&&this.renderer.scrollSelectionIntoView(this.selection.anchor,this.selection.lead)}"animate"==i&&this.renderer.animateScrolling(this.curOp.scrollTop)}var o=this.selection.toJSON();this.curOp.selectionAfter=o,this.$lastSel=this.selection.toJSON(),this.session.getUndoManager().addSelection(o),this.prevOp=this.curOp,this.curOp=null}},this.$mergeableCommands=["backspace","del","insertstring"],this.$historyTracker=function(e){if(this.$mergeUndoDeltas){var t=this.prevOp,i=this.$mergeableCommands,n=t.command&&e.command.name==t.command.name;if("insertstring"==e.command.name){var s=e.args;void 0===this.mergeNextCommand&&(this.mergeNextCommand=!0),n=n&&this.mergeNextCommand&&(!/\s/.test(s)||/\s/.test(t.args)),this.mergeNextCommand=!0}else n=n&&-1!==i.indexOf(e.command.name);"always"!=this.$mergeUndoDeltas&&2e3<Date.now()-this.sequenceStartTime&&(n=!1),n?this.session.mergeUndoDeltas=!0:-1!==i.indexOf(e.command.name)&&(this.sequenceStartTime=Date.now())}},this.setKeyboardHandler=function(t,i){if(t&&"string"==typeof t&&"ace"!=t){this.$keybindingId=t;var n=this;v.loadModule(["keybinding",t],function(e){n.$keybindingId==t&&n.keyBinding.setKeyboardHandler(e&&e.handler),i&&i()})}else this.$keybindingId=null,this.keyBinding.setKeyboardHandler(t),i&&i()},this.getKeyboardHandler=function(){return this.keyBinding.getKeyboardHandler()},this.setSession=function(e){if(this.session!=e){this.curOp&&this.endOperation(),this.curOp={};var t=this.session;if(t){this.session.off("change",this.$onDocumentChange),this.session.off("changeMode",this.$onChangeMode),this.session.off("tokenizerUpdate",this.$onTokenizerUpdate),this.session.off("changeTabSize",this.$onChangeTabSize),this.session.off("changeWrapLimit",this.$onChangeWrapLimit),this.session.off("changeWrapMode",this.$onChangeWrapMode),this.session.off("changeFold",this.$onChangeFold),this.session.off("changeFrontMarker",this.$onChangeFrontMarker),this.session.off("changeBackMarker",this.$onChangeBackMarker),this.session.off("changeBreakpoint",this.$onChangeBreakpoint),this.session.off("changeAnnotation",this.$onChangeAnnotation),this.session.off("changeOverwrite",this.$onCursorChange),this.session.off("changeScrollTop",this.$onScrollTopChange),this.session.off("changeScrollLeft",this.$onScrollLeftChange);var i=this.session.getSelection();i.off("changeCursor",this.$onCursorChange),i.off("changeSelection",this.$onSelectionChange)}(this.session=e)?(this.$onDocumentChange=this.onDocumentChange.bind(this),e.on("change",this.$onDocumentChange),this.renderer.setSession(e),this.$onChangeMode=this.onChangeMode.bind(this),e.on("changeMode",this.$onChangeMode),this.$onTokenizerUpdate=this.onTokenizerUpdate.bind(this),e.on("tokenizerUpdate",this.$onTokenizerUpdate),this.$onChangeTabSize=this.renderer.onChangeTabSize.bind(this.renderer),e.on("changeTabSize",this.$onChangeTabSize),this.$onChangeWrapLimit=this.onChangeWrapLimit.bind(this),e.on("changeWrapLimit",this.$onChangeWrapLimit),this.$onChangeWrapMode=this.onChangeWrapMode.bind(this),e.on("changeWrapMode",this.$onChangeWrapMode),this.$onChangeFold=this.onChangeFold.bind(this),e.on("changeFold",this.$onChangeFold),this.$onChangeFrontMarker=this.onChangeFrontMarker.bind(this),this.session.on("changeFrontMarker",this.$onChangeFrontMarker),this.$onChangeBackMarker=this.onChangeBackMarker.bind(this),this.session.on("changeBackMarker",this.$onChangeBackMarker),this.$onChangeBreakpoint=this.onChangeBreakpoint.bind(this),this.session.on("changeBreakpoint",this.$onChangeBreakpoint),this.$onChangeAnnotation=this.onChangeAnnotation.bind(this),this.session.on("changeAnnotation",this.$onChangeAnnotation),this.$onCursorChange=this.onCursorChange.bind(this),this.session.on("changeOverwrite",this.$onCursorChange),this.$onScrollTopChange=this.onScrollTopChange.bind(this),this.session.on("changeScrollTop",this.$onScrollTopChange),this.$onScrollLeftChange=this.onScrollLeftChange.bind(this),this.session.on("changeScrollLeft",this.$onScrollLeftChange),this.selection=e.getSelection(),this.selection.on("changeCursor",this.$onCursorChange),this.$onSelectionChange=this.onSelectionChange.bind(this),this.selection.on("changeSelection",this.$onSelectionChange),this.onChangeMode(),this.onCursorChange(),this.onScrollTopChange(),this.onScrollLeftChange(),this.onSelectionChange(),this.onChangeFrontMarker(),this.onChangeBackMarker(),this.onChangeBreakpoint(),this.onChangeAnnotation(),this.session.getUseWrapMode()&&this.renderer.adjustWrapLimit(),this.renderer.updateFull()):(this.selection=null,this.renderer.setSession(e)),this._signal("changeSession",{session:e,oldSession:t}),this.curOp=null,t&&t._signal("changeEditor",{oldEditor:this}),e&&e._signal("changeEditor",{editor:this}),e&&e.bgTokenizer&&e.bgTokenizer.scheduleStart()}},this.getSession=function(){return this.session},this.setValue=function(e,t){return this.session.doc.setValue(e),t?1==t?this.navigateFileEnd():-1==t&&this.navigateFileStart():this.selectAll(),e},this.getValue=function(){return this.session.getValue()},this.getSelection=function(){return this.selection},this.resize=function(e){this.renderer.onResize(e)},this.setTheme=function(e,t){this.renderer.setTheme(e,t)},this.getTheme=function(){return this.renderer.getTheme()},this.setStyle=function(e){this.renderer.setStyle(e)},this.unsetStyle=function(e){this.renderer.unsetStyle(e)},this.getFontSize=function(){return this.getOption("fontSize")||n.computedStyle(this.container).fontSize},this.setFontSize=function(e){this.setOption("fontSize",e)},this.$highlightBrackets=function(){if(this.session.$bracketHighlight&&(this.session.removeMarker(this.session.$bracketHighlight),this.session.$bracketHighlight=null),!this.$highlightPending){var n=this;this.$highlightPending=!0,setTimeout(function(){n.$highlightPending=!1;var e=n.session;if(e&&e.bgTokenizer){var t=e.findMatchingBracket(n.getCursorPosition());if(t)var i=new m(t.row,t.column,t.row,t.column+1);else if(e.$mode.getMatching)i=e.$mode.getMatching(n.session);i&&(e.$bracketHighlight=e.addMarker(i,"ace_bracket","text"))}},50)}},this.$highlightTags=function(){if(!this.$highlightTagPending){var u=this;this.$highlightTagPending=!0,setTimeout(function(){u.$highlightTagPending=!1;var e=u.session;if(e&&e.bgTokenizer){var t=u.getCursorPosition(),i=new w(u.session,t.row,t.column),n=i.getCurrentToken();if(!n||!/\b(?:tag-open|tag-name)/.test(n.type))return e.removeMarker(e.$tagHighlight),void(e.$tagHighlight=null);if(-1==n.type.indexOf("tag-open")||(n=i.stepForward())){var s=n.value,o=0,r=i.stepBackward();if("<"==r.value)for(;r=n,(n=i.stepForward())&&n.value===s&&-1!==n.type.indexOf("tag-name")&&("<"===r.value?o++:"</"===r.value&&o--),n&&0<=o;);else{for(;n=r,r=i.stepBackward(),n&&n.value===s&&-1!==n.type.indexOf("tag-name")&&("<"===r.value?o++:"</"===r.value&&o--),r&&o<=0;);i.stepForward()}if(!n)return e.removeMarker(e.$tagHighlight),void(e.$tagHighlight=null);var a=i.getCurrentTokenRow(),l=i.getCurrentTokenColumn(),c=new m(a,l,a,l+n.value.length),h=e.$backMarkers[e.$tagHighlight];e.$tagHighlight&&null!=h&&0!==c.compareRange(h.range)&&(e.removeMarker(e.$tagHighlight),e.$tagHighlight=null),e.$tagHighlight||(e.$tagHighlight=e.addMarker(c,"ace_bracket","text"))}}},50)}},this.focus=function(){var e=this;setTimeout(function(){e.isFocused()||e.textInput.focus()}),this.textInput.focus()},this.isFocused=function(){return this.textInput.isFocused()},this.blur=function(){this.textInput.blur()},this.onFocus=function(e){this.$isFocused||(this.$isFocused=!0,this.renderer.showCursor(),this.renderer.visualizeFocus(),this._emit("focus",e))},this.onBlur=function(e){this.$isFocused&&(this.$isFocused=!1,this.renderer.hideCursor(),this.renderer.visualizeBlur(),this._emit("blur",e))},this.$cursorChange=function(){this.renderer.updateCursor()},this.onDocumentChange=function(e){var t=this.session.$useWrapMode,i=e.start.row==e.end.row?e.end.row:1/0;this.renderer.updateLines(e.start.row,i,t),this._signal("change",e),this.$cursorChange(),this.$updateHighlightActiveLine()},this.onTokenizerUpdate=function(e){var t=e.data;this.renderer.updateLines(t.first,t.last)},this.onScrollTopChange=function(){this.renderer.scrollToY(this.session.getScrollTop())},this.onScrollLeftChange=function(){this.renderer.scrollToX(this.session.getScrollLeft())},this.onCursorChange=function(){this.$cursorChange(),this.$highlightBrackets(),this.$highlightTags(),this.$updateHighlightActiveLine(),this._signal("changeSelection")},this.$updateHighlightActiveLine=function(){var e,t=this.getSession();if(this.$highlightActiveLine&&("line"==this.$selectionStyle&&this.selection.isMultiLine()||(e=this.getCursorPosition()),this.renderer.theme&&this.renderer.theme.$selectionColorConflict&&!this.selection.isEmpty()&&(e=!1),!this.renderer.$maxLines||1!==this.session.getLength()||1<this.renderer.$minLines||(e=!1)),t.$highlightLineMarker&&!e)t.removeMarker(t.$highlightLineMarker.id),t.$highlightLineMarker=null;else if(!t.$highlightLineMarker&&e){var i=new m(e.row,e.column,e.row,1/0);i.id=t.addMarker(i,"ace_active-line","screenLine"),t.$highlightLineMarker=i}else e&&(t.$highlightLineMarker.start.row=e.row,t.$highlightLineMarker.end.row=e.row,t.$highlightLineMarker.start.column=e.column,t._signal("changeBackMarker"))},this.onSelectionChange=function(e){var t=this.session;if(t.$selectionMarker&&t.removeMarker(t.$selectionMarker),t.$selectionMarker=null,this.selection.isEmpty())this.$updateHighlightActiveLine();else{var i=this.selection.getRange(),n=this.getSelectionStyle();t.$selectionMarker=t.addMarker(i,"ace_selection",n)}var s=this.$highlightSelectedWord&&this.$getSelectionHighLightRegexp();this.session.highlight(s),this._signal("changeSelection")},this.$getSelectionHighLightRegexp=function(){var e=this.session,t=this.getSelectionRange();if(!t.isEmpty()&&!t.isMultiLine()){var i=t.start.column,n=t.end.column,s=e.getLine(t.start.row),o=s.substring(i,n);if(!(5e3<o.length)&&/[\w\d]/.test(o)){var r=this.$search.$assembleRegExp({wholeWord:!0,caseSensitive:!0,needle:o}),a=s.substring(i-1,n+1);if(r.test(a))return r}}},this.onChangeFrontMarker=function(){this.renderer.updateFrontMarkers()},this.onChangeBackMarker=function(){this.renderer.updateBackMarkers()},this.onChangeBreakpoint=function(){this.renderer.updateBreakpoints()},this.onChangeAnnotation=function(){this.renderer.setAnnotations(this.session.getAnnotations())},this.onChangeMode=function(e){this.renderer.updateText(),this._emit("changeMode",e)},this.onChangeWrapLimit=function(){this.renderer.updateFull()},this.onChangeWrapMode=function(){this.renderer.onResize(!0)},this.onChangeFold=function(){this.$updateHighlightActiveLine(),this.renderer.updateFull()},this.getSelectedText=function(){return this.session.getTextRange(this.getSelectionRange())},this.getCopyText=function(){var e=this.getSelectedText(),t=this.session.doc.getNewLineCharacter(),i=!1;if(!e&&this.$copyWithEmptySelection){i=!0;for(var n=this.selection.getAllRanges(),s=0;s<n.length;s++){var o=n[s];s&&n[s-1].start.row==o.start.row||(e+=this.session.getLine(o.start.row)+t)}}var r={text:e};return this._signal("copy",r),b.lineMode=i?r.text:"",r.text},this.onCopy=function(){this.commands.exec("copy",this)},this.onCut=function(){this.commands.exec("cut",this)},this.onPaste=function(e,t){var i={text:e,event:t};this.commands.exec("paste",this,i)},this.$handlePaste=function(e){"string"==typeof e&&(e={text:e}),this._signal("paste",e);var t=e.text,i=t==b.lineMode,n=this.session;if(!this.inMultiSelectMode||this.inVirtualSelectionMode)i?n.insert({row:this.selection.lead.row,column:0},t):this.insert(t);else if(i)this.selection.rangeList.ranges.forEach(function(e){n.insert({row:e.start.row,column:0},t)});else{var s=t.split(/\r\n|\r|\n/),o=this.selection.rangeList.ranges,r=!(2!=s.length||s[0]&&s[1]);if(s.length!=o.length||r)return this.commands.exec("insertstring",this,t);for(var a=o.length;a--;){var l=o[a];l.isEmpty()||n.remove(l),n.insert(l.start,s[a])}}},this.execCommand=function(e,t){return this.commands.exec(e,this,t)},this.insert=function(e,t){var i=this.session,n=i.getMode(),s=this.getCursorPosition();if(this.getBehavioursEnabled()&&!t){var o=n.transformAction(i.getState(s.row),"insertion",this,i,e);o&&(e!==o.text&&(this.inVirtualSelectionMode||(this.session.mergeUndoDeltas=!1,this.mergeNextCommand=!1)),e=o.text)}if("\t"==e&&(e=this.session.getTabString()),this.selection.isEmpty()){if(this.session.getOverwrite()&&-1==e.indexOf("\n")){(r=new m.fromPoints(s,s)).end.column+=e.length,this.session.remove(r)}}else{var r=this.getSelectionRange();s=this.session.remove(r),this.clearSelection()}if("\n"==e||"\r\n"==e){var a=i.getLine(s.row);if(s.column>a.search(/\S|$/)){var l=a.substr(s.column).search(/\S|$/);i.doc.removeInLine(s.row,s.column,s.column+l)}}this.clearSelection();var c=s.column,h=i.getState(s.row),u=(a=i.getLine(s.row),n.checkOutdent(h,a,e));if(i.insert(s,e),o&&o.selection&&(2==o.selection.length?this.selection.setSelectionRange(new m(s.row,c+o.selection[0],s.row,c+o.selection[1])):this.selection.setSelectionRange(new m(s.row+o.selection[0],o.selection[1],s.row+o.selection[2],o.selection[3]))),i.getDocument().isNewLine(e)){var d=n.getNextLineIndent(h,a.slice(0,s.column),i.getTabString());i.insert({row:s.row+1,column:0},d)}u&&n.autoOutdent(h,i,s.row)},this.onTextInput=function(e,t){if(!t)return this.keyBinding.onTextInput(e);this.startOperation({command:{name:"insertstring"}});var i=this.applyComposition.bind(this,e,t);this.selection.rangeCount?this.forEachSelection(i):i(),this.endOperation()},this.applyComposition=function(e,t){var i;(t.extendLeft||t.extendRight)&&((i=this.selection.getRange()).start.column-=t.extendLeft,i.end.column+=t.extendRight,this.selection.setRange(i),e||i.isEmpty()||this.remove());!e&&this.selection.isEmpty()||this.insert(e,!0),(t.restoreStart||t.restoreEnd)&&((i=this.selection.getRange()).start.column-=t.restoreStart,i.end.column-=t.restoreEnd,this.selection.setRange(i))},this.onCommandKey=function(e,t,i){return this.keyBinding.onCommandKey(e,t,i)},this.setOverwrite=function(e){this.session.setOverwrite(e)},this.getOverwrite=function(){return this.session.getOverwrite()},this.toggleOverwrite=function(){this.session.toggleOverwrite()},this.setScrollSpeed=function(e){this.setOption("scrollSpeed",e)},this.getScrollSpeed=function(){return this.getOption("scrollSpeed")},this.setDragDelay=function(e){this.setOption("dragDelay",e)},this.getDragDelay=function(){return this.getOption("dragDelay")},this.setSelectionStyle=function(e){this.setOption("selectionStyle",e)},this.getSelectionStyle=function(){return this.getOption("selectionStyle")},this.setHighlightActiveLine=function(e){this.setOption("highlightActiveLine",e)},this.getHighlightActiveLine=function(){return this.getOption("highlightActiveLine")},this.setHighlightGutterLine=function(e){this.setOption("highlightGutterLine",e)},this.getHighlightGutterLine=function(){return this.getOption("highlightGutterLine")},this.setHighlightSelectedWord=function(e){this.setOption("highlightSelectedWord",e)},this.getHighlightSelectedWord=function(){return this.$highlightSelectedWord},this.setAnimatedScroll=function(e){this.renderer.setAnimatedScroll(e)},this.getAnimatedScroll=function(){return this.renderer.getAnimatedScroll()},this.setShowInvisibles=function(e){this.renderer.setShowInvisibles(e)},this.getShowInvisibles=function(){return this.renderer.getShowInvisibles()},this.setDisplayIndentGuides=function(e){this.renderer.setDisplayIndentGuides(e)},this.getDisplayIndentGuides=function(){return this.renderer.getDisplayIndentGuides()},this.setShowPrintMargin=function(e){this.renderer.setShowPrintMargin(e)},this.getShowPrintMargin=function(){return this.renderer.getShowPrintMargin()},this.setPrintMarginColumn=function(e){this.renderer.setPrintMarginColumn(e)},this.getPrintMarginColumn=function(){return this.renderer.getPrintMarginColumn()},this.setReadOnly=function(e){this.setOption("readOnly",e)},this.getReadOnly=function(){return this.getOption("readOnly")},this.setBehavioursEnabled=function(e){this.setOption("behavioursEnabled",e)},this.getBehavioursEnabled=function(){return this.getOption("behavioursEnabled")},this.setWrapBehavioursEnabled=function(e){this.setOption("wrapBehavioursEnabled",e)},this.getWrapBehavioursEnabled=function(){return this.getOption("wrapBehavioursEnabled")},this.setShowFoldWidgets=function(e){this.setOption("showFoldWidgets",e)},this.getShowFoldWidgets=function(){return this.getOption("showFoldWidgets")},this.setFadeFoldWidgets=function(e){this.setOption("fadeFoldWidgets",e)},this.getFadeFoldWidgets=function(){return this.getOption("fadeFoldWidgets")},this.remove=function(e){this.selection.isEmpty()&&("left"==e?this.selection.selectLeft():this.selection.selectRight());var t=this.getSelectionRange();if(this.getBehavioursEnabled()){var i=this.session,n=i.getState(t.start.row),s=i.getMode().transformAction(n,"deletion",this,i,t);if(0===t.end.column){var o=i.getTextRange(t);if("\n"==o[o.length-1]){var r=i.getLine(t.end.row);/^\s+$/.test(r)&&(t.end.column=r.length)}}s&&(t=s)}this.session.remove(t),this.clearSelection()},this.removeWordRight=function(){this.selection.isEmpty()&&this.selection.selectWordRight(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeWordLeft=function(){this.selection.isEmpty()&&this.selection.selectWordLeft(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeToLineStart=function(){this.selection.isEmpty()&&this.selection.selectLineStart(),this.selection.isEmpty()&&this.selection.selectLeft(),this.session.remove(this.getSelectionRange()),this.clearSelection()},this.removeToLineEnd=function(){this.selection.isEmpty()&&this.selection.selectLineEnd();var e=this.getSelectionRange();e.start.column==e.end.column&&e.start.row==e.end.row&&(e.end.column=0,e.end.row++),this.session.remove(e),this.clearSelection()},this.splitLine=function(){this.selection.isEmpty()||(this.session.remove(this.getSelectionRange()),this.clearSelection());var e=this.getCursorPosition();this.insert("\n"),this.moveCursorToPosition(e)},this.transposeLetters=function(){if(this.selection.isEmpty()){var e=this.getCursorPosition(),t=e.column;if(0!==t){var i,n,s=this.session.getLine(e.row);n=t<s.length?(i=s.charAt(t)+s.charAt(t-1),new m(e.row,t-1,e.row,t+1)):(i=s.charAt(t-1)+s.charAt(t-2),new m(e.row,t-2,e.row,t)),this.session.replace(n,i),this.session.selection.moveToPosition(n.end)}}},this.toLowerCase=function(){var e=this.getSelectionRange();this.selection.isEmpty()&&this.selection.selectWord();var t=this.getSelectionRange(),i=this.session.getTextRange(t);this.session.replace(t,i.toLowerCase()),this.selection.setSelectionRange(e)},this.toUpperCase=function(){var e=this.getSelectionRange();this.selection.isEmpty()&&this.selection.selectWord();var t=this.getSelectionRange(),i=this.session.getTextRange(t);this.session.replace(t,i.toUpperCase()),this.selection.setSelectionRange(e)},this.indent=function(){var e=this.session,t=this.getSelectionRange();if(!(t.start.row<t.end.row)){if(t.start.column<t.end.column){var i=e.getTextRange(t);if(!/^\s+$/.test(i)){c=this.$getSelectedRows();return void e.indentRows(c.first,c.last,"\t")}}var n=e.getLine(t.start.row),s=t.start,o=e.getTabSize(),r=e.documentToScreenColumn(s.row,s.column);if(this.session.getUseSoftTabs())var a=o-r%o,l=p.stringRepeat(" ",a);else{for(a=r%o;" "==n[t.start.column-1]&&a;)t.start.column--,a--;this.selection.setSelectionRange(t),l="\t"}return this.insert(l)}var c=this.$getSelectedRows();e.indentRows(c.first,c.last,"\t")},this.blockIndent=function(){var e=this.$getSelectedRows();this.session.indentRows(e.first,e.last,"\t")},this.blockOutdent=function(){var e=this.session.getSelection();this.session.outdentRows(e.getRange())},this.sortLines=function(){for(var e=this.$getSelectedRows(),t=this.session,i=[],n=e.first;n<=e.last;n++)i.push(t.getLine(n));i.sort(function(e,t){return e.toLowerCase()<t.toLowerCase()?-1:e.toLowerCase()>t.toLowerCase()?1:0});var s=new m(0,0,0,0);for(n=e.first;n<=e.last;n++){var o=t.getLine(n);s.start.row=n,s.end.row=n,s.end.column=o.length,t.replace(s,i[n-e.first])}},this.toggleCommentLines=function(){var e=this.session.getState(this.getCursorPosition().row),t=this.$getSelectedRows();this.session.getMode().toggleCommentLines(e,this.session,t.first,t.last)},this.toggleBlockComment=function(){var e=this.getCursorPosition(),t=this.session.getState(e.row),i=this.getSelectionRange();this.session.getMode().toggleBlockComment(t,this.session,i,e)},this.getNumberAt=function(e,t){var i=/[\-]?[0-9]+(?:\.[0-9]+)?/g;i.lastIndex=0;for(var n=this.session.getLine(e);i.lastIndex<t;){var s=i.exec(n);if(s.index<=t&&s.index+s[0].length>=t)return{value:s[0],start:s.index,end:s.index+s[0].length}}return null},this.modifyNumber=function(e){var t=this.selection.getCursor().row,i=this.selection.getCursor().column,n=new m(t,i-1,t,i),s=this.session.getTextRange(n);if(!isNaN(parseFloat(s))&&isFinite(s)){var o=this.getNumberAt(t,i);if(o){var r=0<=o.value.indexOf(".")?o.start+o.value.indexOf(".")+1:o.end,a=o.start+o.value.length-r,l=parseFloat(o.value);l*=Math.pow(10,a),r!==o.end&&i<r?e*=Math.pow(10,o.end-i-1):e*=Math.pow(10,o.end-i),l+=e;var c=(l/=Math.pow(10,a)).toFixed(a),h=new m(t,o.start,t,o.end);this.session.replace(h,c),this.moveCursorTo(t,Math.max(o.start+1,i+c.length-o.value.length))}}else this.toggleWord()},this.$toggleWordPairs=[["first","last"],["true","false"],["yes","no"],["width","height"],["top","bottom"],["right","left"],["on","off"],["x","y"],["get","set"],["max","min"],["horizontal","vertical"],["show","hide"],["add","remove"],["up","down"],["before","after"],["even","odd"],["in","out"],["inside","outside"],["next","previous"],["increase","decrease"],["attach","detach"],["&&","||"],["==","!="]],this.toggleWord=function(){var i=this.selection.getCursor().row,e=this.selection.getCursor().column;this.selection.selectWord();var n=this.getSelectedText(),s=this.selection.getWordRange().start.column,t=n.replace(/([a-z]+|[A-Z]+)(?=[A-Z_]|$)/g,"$1 ").split(/\s/),o=e-s-1;o<0&&(o=0);var r=0,a=0,l=this;n.match(/[A-Za-z0-9_]+/)&&t.forEach(function(e,t){a=r+e.length,r<=o&&o<=a&&(n=e,l.selection.clearSelection(),l.moveCursorTo(i,r+s),l.selection.selectTo(i,a+s)),r=a});for(var c,h=this.$toggleWordPairs,u=0;u<h.length;u++)for(var d=h[u],g=0;g<=1;g++){var f=+!g,m=n.match(new RegExp("^\\s?_?("+p.escapeRegExp(d[g])+")\\s?$","i"));if(m)n.match(new RegExp("([_]|^|\\s)("+p.escapeRegExp(m[1])+")($|\\s)","g"))&&(c=n.replace(new RegExp(p.escapeRegExp(d[g]),"i"),function(e){var t=d[f];return e.toUpperCase()==e?t=t.toUpperCase():e.charAt(0).toUpperCase()==e.charAt(0)&&(t=t.substr(0,0)+d[f].charAt(0).toUpperCase()+t.substr(1)),t}),this.insert(c),c="")}},this.removeLines=function(){var e=this.$getSelectedRows();this.session.removeFullLines(e.first,e.last),this.clearSelection()},this.duplicateSelection=function(){var e=this.selection,t=this.session,i=e.getRange(),n=e.isBackwards();if(i.isEmpty()){var s=i.start.row;t.duplicateLines(s,s)}else{var o=n?i.start:i.end,r=t.insert(o,t.getTextRange(i),!1);i.start=o,i.end=r,e.setSelectionRange(i,n)}},this.moveLinesDown=function(){this.$moveLines(1,!1)},this.moveLinesUp=function(){this.$moveLines(-1,!1)},this.moveText=function(e,t,i){return this.session.moveText(e,t,i)},this.copyLinesUp=function(){this.$moveLines(-1,!0)},this.copyLinesDown=function(){this.$moveLines(1,!0)},this.$moveLines=function(e,t){var i,n,s=this.selection;if(!s.inMultiSelectMode||this.inVirtualSelectionMode){var o=s.toOrientedRange();i=this.$getSelectedRows(o),n=this.session.$moveLines(i.first,i.last,t?0:e),t&&-1==e&&(n=0),o.moveBy(n,0),s.fromOrientedRange(o)}else{var r=s.rangeList.ranges;s.rangeList.detach(this.session),this.inVirtualSelectionMode=!0;for(var a=0,l=0,c=r.length,h=0;h<c;h++){var u=h;r[h].moveBy(a,0);for(var d=(i=this.$getSelectedRows(r[h])).first,g=i.last;++h<c;){l&&r[h].moveBy(l,0);var f=this.$getSelectedRows(r[h]);if(t&&f.first!=g)break;if(!t&&f.first>g+1)break;g=f.last}for(h--,a=this.session.$moveLines(d,g,t?0:e),t&&-1==e&&(u=h+1);u<=h;)r[u].moveBy(a,0),u++;t||(a=0),l+=a}s.fromOrientedRange(s.ranges[0]),s.rangeList.attach(this.session),this.inVirtualSelectionMode=!1}},this.$getSelectedRows=function(e){return e=(e||this.getSelectionRange()).collapseRows(),{first:this.session.getRowFoldStart(e.start.row),last:this.session.getRowFoldEnd(e.end.row)}},this.onCompositionStart=function(e){this.renderer.showComposition(e)},this.onCompositionUpdate=function(e){this.renderer.setCompositionText(e)},this.onCompositionEnd=function(){this.renderer.hideComposition()},this.getFirstVisibleRow=function(){return this.renderer.getFirstVisibleRow()},this.getLastVisibleRow=function(){return this.renderer.getLastVisibleRow()},this.isRowVisible=function(e){return e>=this.getFirstVisibleRow()&&e<=this.getLastVisibleRow()},this.isRowFullyVisible=function(e){return e>=this.renderer.getFirstFullyVisibleRow()&&e<=this.renderer.getLastFullyVisibleRow()},this.$getVisibleRowCount=function(){return this.renderer.getScrollBottomRow()-this.renderer.getScrollTopRow()+1},this.$moveByPage=function(e,t){var i=this.renderer,n=this.renderer.layerConfig,s=e*Math.floor(n.height/n.lineHeight);!0===t?this.selection.$moveSelection(function(){this.moveCursorBy(s,0)}):!1===t&&(this.selection.moveCursorBy(s,0),this.selection.clearSelection());var o=i.scrollTop;i.scrollBy(0,s*n.lineHeight),null!=t&&i.scrollCursorIntoView(null,.5),i.animateScrolling(o)},this.selectPageDown=function(){this.$moveByPage(1,!0)},this.selectPageUp=function(){this.$moveByPage(-1,!0)},this.gotoPageDown=function(){this.$moveByPage(1,!1)},this.gotoPageUp=function(){this.$moveByPage(-1,!1)},this.scrollPageDown=function(){this.$moveByPage(1)},this.scrollPageUp=function(){this.$moveByPage(-1)},this.scrollToRow=function(e){this.renderer.scrollToRow(e)},this.scrollToLine=function(e,t,i,n){this.renderer.scrollToLine(e,t,i,n)},this.centerSelection=function(){var e=this.getSelectionRange(),t={row:Math.floor(e.start.row+(e.end.row-e.start.row)/2),column:Math.floor(e.start.column+(e.end.column-e.start.column)/2)};this.renderer.alignCursor(t,.5)},this.getCursorPosition=function(){return this.selection.getCursor()},this.getCursorPositionScreen=function(){return this.session.documentToScreenPosition(this.getCursorPosition())},this.getSelectionRange=function(){return this.selection.getRange()},this.selectAll=function(){this.selection.selectAll()},this.clearSelection=function(){this.selection.clearSelection()},this.moveCursorTo=function(e,t){this.selection.moveCursorTo(e,t)},this.moveCursorToPosition=function(e){this.selection.moveCursorToPosition(e)},this.jumpToMatching=function(e,t){var i=this.getCursorPosition(),n=new w(this.session,i.row,i.column),s=n.getCurrentToken(),o=s||n.stepForward();if(o){var r,a,l=!1,c={},h=i.column-o.start,u={")":"(","(":"(","]":"[","[":"[","{":"{","}":"{"};do{if(o.value.match(/[{}()\[\]]/g)){for(;h<o.value.length&&!l;h++)if(u[o.value[h]])switch(a=u[o.value[h]]+"."+o.type.replace("rparen","lparen"),isNaN(c[a])&&(c[a]=0),o.value[h]){case"(":case"[":case"{":c[a]++;break;case")":case"]":case"}":c[a]--,-1===c[a]&&(r="bracket",l=!0)}}else-1!==o.type.indexOf("tag-name")&&(isNaN(c[o.value])&&(c[o.value]=0),"<"===s.value?c[o.value]++:"</"===s.value&&c[o.value]--,-1===c[o.value]&&(r="tag",l=!0));l||(s=o,o=n.stepForward(),h=0)}while(o&&!l);if(r){var d,g;if("bracket"===r)(d=this.session.getBracketRange(i))||(g=(d=new m(n.getCurrentTokenRow(),n.getCurrentTokenColumn()+h-1,n.getCurrentTokenRow(),n.getCurrentTokenColumn()+h-1)).start,(t||g.row===i.row&&Math.abs(g.column-i.column)<2)&&(d=this.session.getBracketRange(g)));else if("tag"===r){if(!o||-1===o.type.indexOf("tag-name"))return;var f=o.value;if(0===(d=new m(n.getCurrentTokenRow(),n.getCurrentTokenColumn()-2,n.getCurrentTokenRow(),n.getCurrentTokenColumn()-2)).compare(i.row,i.column))for(l=!1;o=s,(s=n.stepBackward())&&(-1!==s.type.indexOf("tag-close")&&d.setEnd(n.getCurrentTokenRow(),n.getCurrentTokenColumn()+1),o.value===f&&-1!==o.type.indexOf("tag-name")&&("<"===s.value?c[f]++:"</"===s.value&&c[f]--,0===c[f]&&(l=!0))),s&&!l;);o&&o.type.indexOf("tag-name")&&((g=d.start).row==i.row&&Math.abs(g.column-i.column)<2&&(g=d.end))}(g=d&&d.cursor||g)&&(e?d&&t?this.selection.setRange(d):d&&d.isEqual(this.getSelectionRange())?this.clearSelection():this.selection.selectTo(g.row,g.column):this.selection.moveTo(g.row,g.column))}}},this.gotoLine=function(e,t,i){this.selection.clearSelection(),this.session.unfold({row:e-1,column:t||0}),this.exitMultiSelectMode&&this.exitMultiSelectMode(),this.moveCursorTo(e-1,t||0),this.isRowFullyVisible(e-1)||this.scrollToLine(e-1,!0,i)},this.navigateTo=function(e,t){this.selection.moveTo(e,t)},this.navigateUp=function(e){if(this.selection.isMultiLine()&&!this.selection.isBackwards()){var t=this.selection.anchor.getPosition();return this.moveCursorToPosition(t)}this.selection.clearSelection(),this.selection.moveCursorBy(-e||-1,0)},this.navigateDown=function(e){if(this.selection.isMultiLine()&&this.selection.isBackwards()){var t=this.selection.anchor.getPosition();return this.moveCursorToPosition(t)}this.selection.clearSelection(),this.selection.moveCursorBy(e||1,0)},this.navigateLeft=function(e){if(this.selection.isEmpty())for(e=e||1;e--;)this.selection.moveCursorLeft();else{var t=this.getSelectionRange().start;this.moveCursorToPosition(t)}this.clearSelection()},this.navigateRight=function(e){if(this.selection.isEmpty())for(e=e||1;e--;)this.selection.moveCursorRight();else{var t=this.getSelectionRange().end;this.moveCursorToPosition(t)}this.clearSelection()},this.navigateLineStart=function(){this.selection.moveCursorLineStart(),this.clearSelection()},this.navigateLineEnd=function(){this.selection.moveCursorLineEnd(),this.clearSelection()},this.navigateFileEnd=function(){this.selection.moveCursorFileEnd(),this.clearSelection()},this.navigateFileStart=function(){this.selection.moveCursorFileStart(),this.clearSelection()},this.navigateWordRight=function(){this.selection.moveCursorWordRight(),this.clearSelection()},this.navigateWordLeft=function(){this.selection.moveCursorWordLeft(),this.clearSelection()},this.replace=function(e,t){t&&this.$search.set(t);var i=this.$search.find(this.session),n=0;return i&&(this.$tryReplace(i,e)&&(n=1),this.selection.setSelectionRange(i),this.renderer.scrollSelectionIntoView(i.start,i.end)),n},this.replaceAll=function(e,t){t&&this.$search.set(t);var i=this.$search.findAll(this.session),n=0;if(!i.length)return n;var s=this.getSelectionRange();this.selection.moveTo(0,0);for(var o=i.length-1;0<=o;--o)this.$tryReplace(i[o],e)&&n++;return this.selection.setSelectionRange(s),n},this.$tryReplace=function(e,t){var i=this.session.getTextRange(e);return null!==(t=this.$search.replace(i,t))?(e.end=this.session.replace(e,t),e):null},this.getLastSearchOptions=function(){return this.$search.getOptions()},this.find=function(e,t,i){t=t||{},"string"==typeof e||e instanceof RegExp?t.needle=e:"object"==typeof e&&o.mixin(t,e);var n=this.selection.getRange();null==t.needle&&((e=this.session.getTextRange(n)||this.$search.$options.needle)||(n=this.session.getWordRange(n.start.row,n.start.column),e=this.session.getTextRange(n)),this.$search.set({needle:e})),this.$search.set(t),t.start||this.$search.set({start:n});var s=this.$search.find(this.session);return t.preventScroll?s:s?(this.revealRange(s,i),s):(t.backwards?n.start=n.end:n.end=n.start,void this.selection.setRange(n))},this.findNext=function(e,t){this.find({skipCurrent:!0,backwards:!1},e,t)},this.findPrevious=function(e,t){this.find(e,{skipCurrent:!0,backwards:!0},t)},this.revealRange=function(e,t){this.session.unfold(e),this.selection.setSelectionRange(e);var i=this.renderer.scrollTop;this.renderer.scrollSelectionIntoView(e.start,e.end,.5),!1!==t&&this.renderer.animateScrolling(i)},this.undo=function(){this.session.getUndoManager().undo(this.session),this.renderer.scrollCursorIntoView(null,.5)},this.redo=function(){this.session.getUndoManager().redo(this.session),this.renderer.scrollCursorIntoView(null,.5)},this.destroy=function(){this.renderer.destroy(),this._signal("destroy",this),this.session&&this.session.destroy()},this.setAutoScrollEditorIntoView=function(e){if(e){var s,o=this,r=!1;this.$scrollAnchor||(this.$scrollAnchor=document.createElement("div"));var a=this.$scrollAnchor;a.style.cssText="position:absolute",this.container.insertBefore(a,this.container.firstChild);var t=this.on("changeSelection",function(){r=!0}),i=this.renderer.on("beforeRender",function(){r&&(s=o.renderer.container.getBoundingClientRect())}),n=this.renderer.on("afterRender",function(){if(r&&s&&(o.isFocused()||o.searchBox&&o.searchBox.isFocused())){var e=o.renderer,t=e.$cursorLayer.$pixelPos,i=e.layerConfig,n=t.top-i.offset;null!=(r=0<=t.top&&n+s.top<0||!(t.top<i.height&&t.top+s.top+i.lineHeight>window.innerHeight)&&null)&&(a.style.top=n+"px",a.style.left=t.left+"px",a.style.height=i.lineHeight+"px",a.scrollIntoView(r)),r=s=null}});this.setAutoScrollEditorIntoView=function(e){e||(delete this.setAutoScrollEditorIntoView,this.off("changeSelection",t),this.renderer.off("afterRender",n),this.renderer.off("beforeRender",i))}}},this.$resetCursorStyle=function(){var e=this.$cursorStyle||"ace",t=this.renderer.$cursorLayer;t&&(t.setSmoothBlinking(/smooth/.test(e)),t.isBlinking=!this.$readOnly&&"wide"!=e,n.setCssClass(t.element,"ace_slim-cursors",/slim/.test(e)))},this.prompt=function(t,i,n){var s=this;v.loadModule("./ext/prompt",function(e){e.prompt(s,t,i,n)})}}.call(y.prototype),v.defineOptions(y.prototype,"editor",{selectionStyle:{set:function(e){this.onSelectionChange(),this._signal("changeSelectionStyle",{data:e})},initialValue:"line"},highlightActiveLine:{set:function(){this.$updateHighlightActiveLine()},initialValue:!0},highlightSelectedWord:{set:function(e){this.$onSelectionChange()},initialValue:!0},readOnly:{set:function(e){this.textInput.setReadOnly(e),this.$resetCursorStyle()},initialValue:!1},copyWithEmptySelection:{set:function(e){this.textInput.setCopyWithEmptySelection(e)},initialValue:!1},cursorStyle:{set:function(e){this.$resetCursorStyle()},values:["ace","slim","smooth","wide"],initialValue:"ace"},mergeUndoDeltas:{values:[!1,!0,"always"],initialValue:!0},behavioursEnabled:{initialValue:!0},wrapBehavioursEnabled:{initialValue:!0},autoScrollEditorIntoView:{set:function(e){this.setAutoScrollEditorIntoView(e)}},keyboardHandler:{set:function(e){this.setKeyboardHandler(e)},get:function(){return this.$keybindingId},handlesSet:!0},value:{set:function(e){this.session.setValue(e)},get:function(){return this.getValue()},handlesSet:!0,hidden:!0},session:{set:function(e){this.setSession(e)},get:function(){return this.session},handlesSet:!0,hidden:!0},showLineNumbers:{set:function(e){this.renderer.$gutterLayer.setShowLineNumbers(e),this.renderer.$loop.schedule(this.renderer.CHANGE_GUTTER),e&&this.$relativeLineNumbers?$.attach(this):$.detach(this)},initialValue:!0},relativeLineNumbers:{set:function(e){this.$showLineNumbers&&e?$.attach(this):$.detach(this)}},placeholder:{set:function(e){this.$updatePlaceholder||(this.$updatePlaceholder=function(){var e=this.renderer.$composition||this.getValue();if(e&&this.renderer.placeholderNode)this.renderer.off("afterRender",this.$updatePlaceholder),n.removeCssClass(this.container,"ace_hasPlaceholder"),this.renderer.placeholderNode.remove(),this.renderer.placeholderNode=null;else if(!e&&!this.renderer.placeholderNode){this.renderer.on("afterRender",this.$updatePlaceholder),n.addCssClass(this.container,"ace_hasPlaceholder");var t=n.createElement("div");t.className="ace_placeholder",t.textContent=this.$placeholder||"",this.renderer.placeholderNode=t,this.renderer.content.appendChild(this.renderer.placeholderNode)}}.bind(this),this.on("input",this.$updatePlaceholder)),this.$updatePlaceholder()}},hScrollBarAlwaysVisible:"renderer",vScrollBarAlwaysVisible:"renderer",highlightGutterLine:"renderer",animatedScroll:"renderer",showInvisibles:"renderer",showPrintMargin:"renderer",printMarginColumn:"renderer",printMargin:"renderer",fadeFoldWidgets:"renderer",showFoldWidgets:"renderer",displayIndentGuides:"renderer",showGutter:"renderer",fontSize:"renderer",fontFamily:"renderer",maxLines:"renderer",minLines:"renderer",scrollPastEnd:"renderer",fixedWidthGutter:"renderer",theme:"renderer",hasCssTransforms:"renderer",maxPixelHeight:"renderer",useTextareaForIME:"renderer",scrollSpeed:"$mouseHandler",dragDelay:"$mouseHandler",dragEnabled:"$mouseHandler",focusTimeout:"$mouseHandler",tooltipFollowsMouse:"$mouseHandler",firstLineNumber:"session",overwrite:"session",newLineMode:"session",useWorker:"session",useSoftTabs:"session",navigateWithinSoftTabs:"session",tabSize:"session",wrap:"session",indentedSoftWrap:"session",foldStyle:"session",mode:"session"});var $={getText:function(e,t){return(Math.abs(e.selection.lead.row-t)||t+1+(t<9?"·":""))+""},getWidth:function(e,t,i){return Math.max(t.toString().length,(i.lastRow+1).toString().length,2)*i.characterWidth},update:function(e,t){t.renderer.$loop.schedule(t.renderer.CHANGE_GUTTER)},attach:function(e){e.renderer.$gutterLayer.$renderer=this,e.on("changeSelection",this.update),this.update(null,e)},detach:function(e){e.renderer.$gutterLayer.$renderer==this&&(e.renderer.$gutterLayer.$renderer=null),e.off("changeSelection",this.update),this.update(null,e)}};t.Editor=y}),ace.define("ace/undomanager",["require","exports","module","ace/range"],function(e,t,i){"use strict";function a(e){return{row:e.row,column:e.column}}function n(e){if(e=e||this,Array.isArray(e))return e.map(n).join("\n");var t="";return e.action?(t="insert"==e.action?"+":"-",t+="["+e.lines+"]"):e.value&&(t=Array.isArray(e.value)?e.value.map(s).join("\n"):s(e.value)),e.start&&(t+=s(e)),(e.id||e.rev)&&(t+="\t("+(e.id||e.rev)+")"),t}function s(e){return e.start.row+":"+e.start.column+"=>"+e.end.row+":"+e.end.column}function o(e,t){var i="insert"==e.action,n="insert"==t.action;if(i&&n)if(0<=m(t.start,e.end))c(t,e,-1);else{if(!(m(t.start,e.start)<=0))return null;c(e,t,1)}else if(i&&!n)if(0<=m(t.start,e.end))c(t,e,-1);else{if(!(m(t.end,e.start)<=0))return null;c(e,t,-1)}else if(!i&&n)if(0<=m(t.start,e.start))c(t,e,1);else{if(!(m(t.start,e.start)<=0))return null;c(e,t,1)}else if(!i&&!n)if(0<=m(t.start,e.start))c(t,e,1);else{if(!(m(t.end,e.start)<=0))return null;c(e,t,-1)}return[t,e]}function r(e,t){for(var i=e.length;i--;)for(var n=0;n<t.length;n++)if(!o(e[i],t[n])){for(;i<e.length;){for(;n--;)o(t[n],e[i]);n=t.length,i++}return[e,t]}return e.selectionBefore=t.selectionBefore=e.selectionAfter=t.selectionAfter=null,[t,e]}function l(e,t){var i="insert"==e.action,n="insert"==t.action;if(i&&n)m(e.start,t.start)<0?c(t,e,1):c(e,t,1);else if(i&&!n)0<=m(e.start,t.end)?c(e,t,-1):(m(e.start,t.start)<=0||c(e,f.fromPoints(t.start,e.start),-1),c(t,e,1));else if(!i&&n)0<=m(t.start,e.end)?c(t,e,-1):(m(t.start,e.start)<=0||c(t,f.fromPoints(e.start,t.start),-1),c(e,t,1));else if(!i&&!n)if(0<=m(t.start,e.end))c(t,e,-1);else{var s,o;if(!(m(t.end,e.start)<=0))return m(e.start,t.start)<0&&(e=u(s=e,t.start)),0<m(e.end,t.end)&&(o=u(e,t.end)),h(t.end,e.start,e.end,-1),o&&!s&&(e.lines=o.lines,e.start=o.start,e.end=o.end,o=e),[t,s,o].filter(Boolean);c(e,t,-1)}return[t,e]}function c(e,t,i){h(e.start,t.start,t.end,i),h(e.end,t.start,t.end,i)}function h(e,t,i,n){e.row==(1==n?t:i).row&&(e.column+=n*(i.column-t.column)),e.row+=n*(i.row-t.row)}function u(e,t){var i=e.lines,n=e.end;e.end=a(t);var s=e.end.row-e.start.row,o=i.splice(s,i.length),r=s?t.column:t.column-e.start.column;return i.push(o[0].substring(0,r)),o[0]=o[0].substr(r),{start:a(t),end:n,lines:o,action:e.action}}function d(e,t){t=function(e){return{start:a(e.start),end:a(e.end),action:e.action,lines:e.lines.slice()}}(t);for(var i=e.length;i--;){for(var n=e[i],s=0;s<n.length;s++){var o=l(n[s],t);t=o[0],2!=o.length&&(o[2]?(n.splice(s+1,1,o[1],o[2]),s++):o[1]||(n.splice(s,1),s--))}n.length||e.splice(i,1)}return e}function g(){this.$maxRev=0,this.$fromUndo=!1,this.reset()}(function(){this.addSession=function(e){this.$session=e},this.add=function(e,t,i){this.$fromUndo||e!=this.$lastDelta&&(!1!==t&&this.lastDeltas||(this.lastDeltas=[],this.$undoStack.push(this.lastDeltas),e.id=this.$rev=++this.$maxRev),"remove"!=e.action&&"insert"!=e.action||(this.$lastDelta=e),this.lastDeltas.push(e))},this.addSelection=function(e,t){this.selections.push({value:e,rev:t||this.$rev})},this.startNewGroup=function(){return this.lastDeltas=null,this.$rev},this.markIgnored=function(e,t){null==t&&(t=this.$rev+1);for(var i=this.$undoStack,n=i.length;n--;){var s=i[n][0];if(s.id<=e)break;s.id<t&&(s.ignore=!0)}this.lastDeltas=null},this.getSelection=function(e,t){for(var i=this.selections,n=i.length;n--;){var s=i[n];if(s.rev<e)return t&&(s=i[n+1]),s}},this.getRevision=function(){return this.$rev},this.getDeltas=function(e,t){null==t&&(t=this.$rev+1);for(var i=this.$undoStack,n=null,s=0,o=i.length;o--;){var r=i[o][0];if(r.id<t&&!n&&(n=o+1),r.id<=e){s=o+1;break}}return i.slice(s,n)},this.getChangedRanges=function(e,t){null==t&&(t=this.$rev+1)},this.getChangedLines=function(e,t){null==t&&(t=this.$rev+1)},this.undo=function(e,t){this.lastDeltas=null;var i=this.$undoStack;if(function(e,t){for(var i=t;i--;){var n=e[i];if(n&&!n[0].ignore){for(;i<t-1;){var s=r(e[i],e[i+1]);e[i]=s[0],e[i+1]=s[1],i++}return!0}}}(i,i.length)){e=e||this.$session,this.$redoStackBaseRev!==this.$rev&&this.$redoStack.length&&(this.$redoStack=[]),this.$fromUndo=!0;var n=i.pop(),s=null;return n&&n.length&&(s=e.undoChanges(n,t),this.$redoStack.push(n),this.$syncRev()),this.$fromUndo=!1,s}},this.redo=function(e,t){if(this.lastDeltas=null,e=e||this.$session,this.$fromUndo=!0,this.$redoStackBaseRev!=this.$rev){var i=this.getDeltas(this.$redoStackBaseRev,this.$rev+1);(function(e,t){for(var i=0;i<t.length;i++)for(var n=t[i],s=0;s<n.length;s++)d(e,n[s])})(this.$redoStack,i),this.$redoStackBaseRev=this.$rev,this.$redoStack.forEach(function(e){e[0].id=++this.$maxRev},this)}var n=this.$redoStack.pop(),s=null;return n&&(s=e.redoChanges(n,t),this.$undoStack.push(n),this.$syncRev()),this.$fromUndo=!1,s},this.$syncRev=function(){var e=this.$undoStack,t=e[e.length-1],i=t&&t[0].id||0;this.$redoStackBaseRev=i,this.$rev=i},this.reset=function(){this.lastDeltas=null,this.$lastDelta=null,this.$undoStack=[],this.$redoStack=[],this.$rev=0,this.mark=0,this.$redoStackBaseRev=this.$rev,this.selections=[]},this.canUndo=function(){return 0<this.$undoStack.length},this.canRedo=function(){return 0<this.$redoStack.length},this.bookmark=function(e){null==e&&(e=this.$rev),this.mark=e},this.isAtBookmark=function(){return this.$rev===this.mark},this.toJSON=function(){},this.fromJSON=function(){},this.hasUndo=this.canUndo,this.hasRedo=this.canRedo,this.isClean=this.isAtBookmark,this.markClean=this.bookmark,this.$prettyPrint=function(e){return e?n(e):n(this.$undoStack)+"\n---\n"+n(this.$redoStack)}}).call(g.prototype);var f=e("./range").Range,m=f.comparePoints;f.comparePoints;t.UndoManager=g}),ace.define("ace/layer/lines",["require","exports","module","ace/lib/dom"],function(e,t,i){"use strict";function n(e,t){this.element=e,this.canvasHeight=t||5e5,this.element.style.height=2*this.canvasHeight+"px",this.cells=[],this.cellCache=[],this.$offsetCoefficient=0}var r=e("../lib/dom");(function(){this.moveContainer=function(e){r.translate(this.element,0,-e.firstRowScreen*e.lineHeight%this.canvasHeight-e.offset*this.$offsetCoefficient)},this.pageChanged=function(e,t){return Math.floor(e.firstRowScreen*e.lineHeight/this.canvasHeight)!==Math.floor(t.firstRowScreen*t.lineHeight/this.canvasHeight)},this.computeLineTop=function(e,t,i){var n=t.firstRowScreen*t.lineHeight,s=Math.floor(n/this.canvasHeight);return i.documentToScreenRow(e,0)*t.lineHeight-s*this.canvasHeight},this.computeLineHeight=function(e,t,i){return t.lineHeight*i.getRowLength(e)},this.getLength=function(){return this.cells.length},this.get=function(e){return this.cells[e]},this.shift=function(){this.$cacheCell(this.cells.shift())},this.pop=function(){this.$cacheCell(this.cells.pop())},this.push=function(e){if(Array.isArray(e)){this.cells.push.apply(this.cells,e);for(var t=r.createFragment(this.element),i=0;i<e.length;i++)t.appendChild(e[i].element);this.element.appendChild(t)}else this.cells.push(e),this.element.appendChild(e.element)},this.unshift=function(e){if(Array.isArray(e)){this.cells.unshift.apply(this.cells,e);for(var t=r.createFragment(this.element),i=0;i<e.length;i++)t.appendChild(e[i].element);this.element.firstChild?this.element.insertBefore(t,this.element.firstChild):this.element.appendChild(t)}else this.cells.unshift(e),this.element.insertAdjacentElement("afterbegin",e.element)},this.last=function(){return this.cells.length?this.cells[this.cells.length-1]:null},this.$cacheCell=function(e){e&&(e.element.remove(),this.cellCache.push(e))},this.createCell=function(e,t,i,n){var s=this.cellCache.pop();if(!s){var o=r.createElement("div");n&&n(o),this.element.appendChild(o),s={element:o,text:"",row:e}}return s.row=e,s}}).call(n.prototype),t.Lines=n}),ace.define("ace/layer/gutter",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/layer/lines"],function(e,t,i){"use strict";function c(e){var t=document.createTextNode("");e.appendChild(t);var i=w.createElement("span");return e.appendChild(i),e}function n(e){this.element=w.createElement("div"),this.element.className="ace_layer ace_gutter-layer",e.appendChild(this.element),this.setShowFoldWidgets(this.$showFoldWidgets),this.gutterWidth=0,this.$annotations=[],this.$updateAnnotations=this.$updateAnnotations.bind(this),this.$lines=new r(this.element),this.$lines.$offsetCoefficient=1}var w=e("../lib/dom"),s=e("../lib/oop"),a=e("../lib/lang"),o=e("../lib/event_emitter").EventEmitter,r=e("./lines").Lines;(function(){s.implement(this,o),this.setSession=function(e){this.session&&this.session.removeEventListener("change",this.$updateAnnotations),(this.session=e)&&e.on("change",this.$updateAnnotations)},this.addGutterDecoration=function(e,t){window.console&&console.warn&&console.warn("deprecated use session.addGutterDecoration"),this.session.addGutterDecoration(e,t)},this.removeGutterDecoration=function(e,t){window.console&&console.warn&&console.warn("deprecated use session.removeGutterDecoration"),this.session.removeGutterDecoration(e,t)},this.setAnnotations=function(e){this.$annotations=[];for(var t=0;t<e.length;t++){var i=e[t],n=i.row,s=this.$annotations[n];s=s||(this.$annotations[n]={text:[]});var o=i.text;o=o?a.escapeHTML(o):i.html||"",-1===s.text.indexOf(o)&&s.text.push(o);var r=i.type;"error"==r?s.className=" ace_error":"warning"==r&&" ace_error"!=s.className?s.className=" ace_warning":"info"!=r||s.className||(s.className=" ace_info")}},this.$updateAnnotations=function(e){if(this.$annotations.length){var t=e.start.row,i=e.end.row-t;if(0!=i)if("remove"==e.action)this.$annotations.splice(t,1+i,null);else{var n=new Array(1+i);n.unshift(t,1),this.$annotations.splice.apply(this.$annotations,n)}}},this.update=function(e){this.config=e;var t=this.session,i=e.firstRow,n=Math.min(e.lastRow+e.gutterOffset,t.getLength()-1);this.oldLastRow=n,this.config=e,this.$lines.moveContainer(e),this.$updateCursorRow();for(var s=t.getNextFoldLine(i),o=s?s.start.row:1/0,r=null,a=-1,l=i;;){if(o<l&&(l=s.end.row+1,o=(s=t.getNextFoldLine(l,s))?s.start.row:1/0),n<l){for(;this.$lines.getLength()>a+1;)this.$lines.pop();break}(r=this.$lines.get(++a))?r.row=l:(r=this.$lines.createCell(l,e,this.session,c),this.$lines.push(r)),this.$renderCell(r,e,s,l),l++}this._signal("afterRender"),this.$updateGutterWidth(e)},this.$updateGutterWidth=function(e){var t=this.session,i=t.gutterRenderer||this.$renderer,n=t.$firstLineNumber,s=this.$lines.last()?this.$lines.last().text:"";(this.$fixedWidth||t.$useWrapMode)&&(s=t.getLength()+n-1);var o=i?i.getWidth(t,s,e):s.toString().length*e.characterWidth,r=this.$padding||this.$computePadding();(o+=r.left+r.right)===this.gutterWidth||isNaN(o)||(this.gutterWidth=o,this.element.parentNode.style.width=this.element.style.width=Math.ceil(this.gutterWidth)+"px",this._signal("changeGutterWidth",o))},this.$updateCursorRow=function(){if(this.$highlightGutterLine){var e=this.session.selection.getCursor();this.$cursorRow!==e.row&&(this.$cursorRow=e.row)}},this.updateLineHighlight=function(){if(this.$highlightGutterLine){var e=this.session.selection.cursor.row;if(this.$cursorRow=e,!this.$cursorCell||this.$cursorCell.row!=e){this.$cursorCell&&(this.$cursorCell.element.className=this.$cursorCell.element.className.replace("ace_gutter-active-line ",""));var t=this.$lines.cells;this.$cursorCell=null;for(var i=0;i<t.length;i++){var n=t[i];if(n.row>=this.$cursorRow){if(n.row>this.$cursorRow){var s=this.session.getFoldLine(this.$cursorRow);if(!(0<i&&s&&s.start.row==t[i-1].row))break;n=t[i-1]}n.element.className="ace_gutter-active-line "+n.element.className,this.$cursorCell=n;break}}}}},this.scrollLines=function(e){var t=this.config;if(this.config=e,this.$updateCursorRow(),this.$lines.pageChanged(t,e))return this.update(e);this.$lines.moveContainer(e);var i=Math.min(e.lastRow+e.gutterOffset,this.session.getLength()-1),n=this.oldLastRow;if(this.oldLastRow=i,!t||n<e.firstRow)return this.update(e);if(i<t.firstRow)return this.update(e);if(t.firstRow<e.firstRow)for(var s=this.session.getFoldedRowCount(t.firstRow,e.firstRow-1);0<s;s--)this.$lines.shift();if(i<n)for(s=this.session.getFoldedRowCount(i+1,n);0<s;s--)this.$lines.pop();e.firstRow<t.firstRow&&this.$lines.unshift(this.$renderLines(e,e.firstRow,t.firstRow-1)),n<i&&this.$lines.push(this.$renderLines(e,n+1,i)),this.updateLineHighlight(),this._signal("afterRender"),this.$updateGutterWidth(e)},this.$renderLines=function(e,t,i){for(var n=[],s=t,o=this.session.getNextFoldLine(s),r=o?o.start.row:1/0;r<s&&(s=o.end.row+1,r=(o=this.session.getNextFoldLine(s,o))?o.start.row:1/0),!(i<s);){var a=this.$lines.createCell(s,e,this.session,c);this.$renderCell(a,e,o,s),n.push(a),s++}return n},this.$renderCell=function(e,t,i,n){var s=e.element,o=this.session,r=s.childNodes[0],a=s.childNodes[1],l=o.$firstLineNumber,c=o.$breakpoints,h=o.$decorations,u=o.gutterRenderer||this.$renderer,d=this.$showFoldWidgets&&o.foldWidgets,g=i?i.start.row:Number.MAX_VALUE,f="ace_gutter-cell ";if(this.$highlightGutterLine&&(n==this.$cursorRow||i&&n<this.$cursorRow&&g<=n&&this.$cursorRow<=i.end.row)&&(f+="ace_gutter-active-line ",this.$cursorCell!=e&&(this.$cursorCell&&(this.$cursorCell.element.className=this.$cursorCell.element.className.replace("ace_gutter-active-line ","")),this.$cursorCell=e)),c[n]&&(f+=c[n]),h[n]&&(f+=h[n]),this.$annotations[n]&&(f+=this.$annotations[n].className),s.className!=f&&(s.className=f),d){var m=d[n];null==m&&(m=d[n]=o.getFoldWidget(n))}if(m){f="ace_fold-widget ace_"+m;"start"==m&&n==g&&n<i.end.row?f+=" ace_closed":f+=" ace_open",a.className!=f&&(a.className=f);var p=t.lineHeight+"px";w.setStyle(a.style,"height",p),w.setStyle(a.style,"display","inline-block")}else a&&w.setStyle(a.style,"display","none");var v=(u?u.getText(o,n):n+l).toString();return v!==r.data&&(r.data=v),w.setStyle(e.element.style,"height",this.$lines.computeLineHeight(n,t,o)+"px"),w.setStyle(e.element.style,"top",this.$lines.computeLineTop(n,t,o)+"px"),e.text=v,e},this.$fixedWidth=!1,this.$highlightGutterLine=!0,this.$renderer="",this.setHighlightGutterLine=function(e){this.$highlightGutterLine=e},this.$showLineNumbers=!0,this.$renderer="",this.setShowLineNumbers=function(e){this.$renderer=!e&&{getWidth:function(){return 0},getText:function(){return""}}},this.getShowLineNumbers=function(){return this.$showLineNumbers},this.$showFoldWidgets=!0,this.setShowFoldWidgets=function(e){e?w.addCssClass(this.element,"ace_folding-enabled"):w.removeCssClass(this.element,"ace_folding-enabled"),this.$showFoldWidgets=e,this.$padding=null},this.getShowFoldWidgets=function(){return this.$showFoldWidgets},this.$computePadding=function(){if(!this.element.firstChild)return{left:0,right:0};var e=w.computedStyle(this.element.firstChild);return this.$padding={},this.$padding.left=(parseInt(e.borderLeftWidth)||0)+(parseInt(e.paddingLeft)||0)+1,this.$padding.right=(parseInt(e.borderRightWidth)||0)+(parseInt(e.paddingRight)||0),this.$padding},this.getRegion=function(e){var t=this.$padding||this.$computePadding(),i=this.element.getBoundingClientRect();return e.x<t.left+i.left?"markers":this.$showFoldWidgets&&e.x>i.right-t.right?"foldWidgets":void 0}}).call(n.prototype),t.Gutter=n}),ace.define("ace/layer/marker",["require","exports","module","ace/range","ace/lib/dom"],function(e,t,i){"use strict";function n(e){this.element=s.createElement("div"),this.element.className="ace_layer ace_marker-layer",e.appendChild(this.element)}var g=e("../range").Range,s=e("../lib/dom");(function(){this.$padding=0,this.setPadding=function(e){this.$padding=e},this.setSession=function(e){this.session=e},this.setMarkers=function(e){this.markers=e},this.elt=function(e,t){var i=-1!=this.i&&this.element.childNodes[this.i];i?this.i++:(i=document.createElement("div"),this.element.appendChild(i),this.i=-1),i.style.cssText=t,i.className=e},this.update=function(e){if(e){var t;for(var i in this.config=e,this.i=0,this.markers){var n=this.markers[i];if(n.range){var s=n.range.clipRows(e.firstRow,e.lastRow);if(!s.isEmpty())if(s=s.toScreenRange(this.session),n.renderer){var o=this.$getTop(s.start.row,e),r=this.$padding+s.start.column*e.characterWidth;n.renderer(t,s,r,o,e)}else"fullLine"==n.type?this.drawFullLineMarker(t,s,n.clazz,e):"screenLine"==n.type?this.drawScreenLineMarker(t,s,n.clazz,e):s.isMultiLine()?"text"==n.type?this.drawTextMarker(t,s,n.clazz,e):this.drawMultiLineMarker(t,s,n.clazz,e):this.drawSingleLineMarker(t,s,n.clazz+" ace_start ace_br15",e)}else n.update(t,this,this.session,e)}if(-1!=this.i)for(;this.i<this.element.childElementCount;)this.element.removeChild(this.element.lastChild)}},this.$getTop=function(e,t){return(e-t.firstRowScreen)*t.lineHeight},this.drawTextMarker=function(e,t,i,n,s){for(var o=this.session,r=t.start.row,a=t.end.row,l=r,c=0,h=0,u=o.getScreenLastRowColumn(l),d=new g(l,t.start.column,l,h);l<=a;l++)d.start.row=d.end.row=l,d.start.column=l==r?t.start.column:o.getRowWrapIndent(l),c=h,h=d.end.column=u,u=l+1<a?o.getScreenLastRowColumn(l+1):l==a?0:t.end.column,this.drawSingleLineMarker(e,d,i+(l==r?" ace_start":"")+" ace_br"+((l==r||l==r+1&&t.start.column?1:0)|(c<h?2:0)|(u<h?4:0)|(l==a?8:0)),n,l==a?0:1,s)},this.drawMultiLineMarker=function(e,t,i,n,s){var o=this.$padding,r=n.lineHeight,a=this.$getTop(t.start.row,n),l=o+t.start.column*n.characterWidth;(s=s||"",this.session.$bidiHandler.isBidiRow(t.start.row))?((c=t.clone()).end.row=c.start.row,c.end.column=this.session.getLine(c.start.row).length,this.drawBidiSingleLineMarker(e,c,i+" ace_br1 ace_start",n,null,s)):this.elt(i+" ace_br1 ace_start","height:"+r+"px;right:0;top:"+a+"px;left:"+l+"px;"+(s||""));if(this.session.$bidiHandler.isBidiRow(t.end.row)){var c;(c=t.clone()).start.row=c.end.row,c.start.column=0,this.drawBidiSingleLineMarker(e,c,i+" ace_br12",n,null,s)}else{a=this.$getTop(t.end.row,n);var h=t.end.column*n.characterWidth;this.elt(i+" ace_br12","height:"+r+"px;width:"+h+"px;top:"+a+"px;left:"+o+"px;"+(s||""))}if(!((r=(t.end.row-t.start.row-1)*n.lineHeight)<=0)){a=this.$getTop(t.start.row+1,n);var u=(t.start.column?1:0)|(t.end.column?0:8);this.elt(i+(u?" ace_br"+u:""),"height:"+r+"px;right:0;top:"+a+"px;left:"+o+"px;"+(s||""))}},this.drawSingleLineMarker=function(e,t,i,n,s,o){if(this.session.$bidiHandler.isBidiRow(t.start.row))return this.drawBidiSingleLineMarker(e,t,i,n,s,o);var r=n.lineHeight,a=(t.end.column+(s||0)-t.start.column)*n.characterWidth,l=this.$getTop(t.start.row,n),c=this.$padding+t.start.column*n.characterWidth;this.elt(i,"height:"+r+"px;width:"+a+"px;top:"+l+"px;left:"+c+"px;"+(o||""))},this.drawBidiSingleLineMarker=function(e,t,i,n,s,o){var r=n.lineHeight,a=this.$getTop(t.start.row,n),l=this.$padding;this.session.$bidiHandler.getSelections(t.start.column,t.end.column).forEach(function(e){this.elt(i,"height:"+r+"px;width:"+e.width+(s||0)+"px;top:"+a+"px;left:"+(l+e.left)+"px;"+(o||""))},this)},this.drawFullLineMarker=function(e,t,i,n,s){var o=this.$getTop(t.start.row,n),r=n.lineHeight;t.start.row!=t.end.row&&(r+=this.$getTop(t.end.row,n)-o),this.elt(i,"height:"+r+"px;top:"+o+"px;left:0;right:0;"+(s||""))},this.drawScreenLineMarker=function(e,t,i,n,s){var o=this.$getTop(t.start.row,n),r=n.lineHeight;this.elt(i,"height:"+r+"px;top:"+o+"px;left:0;right:0;"+(s||""))}}).call(n.prototype),t.Marker=n}),ace.define("ace/layer/text",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/lang","ace/layer/lines","ace/lib/event_emitter"],function(e,t,i){"use strict";function n(e){this.dom=c,this.element=this.dom.createElement("div"),this.element.className="ace_layer ace_text-layer",e.appendChild(this.element),this.$updateEolChar=this.$updateEolChar.bind(this),this.$lines=new o(this.element)}var s=e("../lib/oop"),c=e("../lib/dom"),w=e("../lib/lang"),o=e("./lines").Lines,r=e("../lib/event_emitter").EventEmitter;(function(){s.implement(this,r),this.EOF_CHAR="¶",this.EOL_CHAR_LF="¬",this.EOL_CHAR_CRLF="¤",this.EOL_CHAR=this.EOL_CHAR_LF,this.TAB_CHAR="—",this.SPACE_CHAR="·",this.$padding=0,this.MAX_LINE_LENGTH=1e4,this.$updateEolChar=function(){var e=this.session.doc,t="\n"==e.getNewLineCharacter()&&"windows"!=e.getNewLineMode()?this.EOL_CHAR_LF:this.EOL_CHAR_CRLF;if(this.EOL_CHAR!=t)return this.EOL_CHAR=t,!0},this.setPadding=function(e){this.$padding=e,this.element.style.margin="0 "+e+"px"},this.getLineHeight=function(){return this.$fontMetrics.$characterSize.height||0},this.getCharacterWidth=function(){return this.$fontMetrics.$characterSize.width||0},this.$setFontMetrics=function(e){this.$fontMetrics=e,this.$fontMetrics.on("changeCharacterSize",function(e){this._signal("changeCharacterSize",e)}.bind(this)),this.$pollSizeChanges()},this.checkForSizeChanges=function(){this.$fontMetrics.checkForSizeChanges()},this.$pollSizeChanges=function(){return this.$pollSizeChangesTimer=this.$fontMetrics.$pollSizeChanges()},this.setSession=function(e){(this.session=e)&&this.$computeTabString()},this.showInvisibles=!1,this.setShowInvisibles=function(e){return this.showInvisibles!=e&&(this.showInvisibles=e,this.$computeTabString(),!0)},this.displayIndentGuides=!0,this.setDisplayIndentGuides=function(e){return this.displayIndentGuides!=e&&(this.displayIndentGuides=e,this.$computeTabString(),!0)},this.$tabStrings=[],this.onChangeTabSize=this.$computeTabString=function(){var e=this.session.getTabSize();this.tabSize=e;for(var t=this.$tabStrings=[0],i=1;i<e+1;i++)if(this.showInvisibles){(n=this.dom.createElement("span")).className="ace_invisible ace_invisible_tab",n.textContent=w.stringRepeat(this.TAB_CHAR,i),t.push(n)}else t.push(this.dom.createTextNode(w.stringRepeat(" ",i),this.element));if(this.displayIndentGuides){this.$indentGuideRe=/\s\S| \t|\t |\s$/;var n,s="ace_indent-guide",o="",r="";if(this.showInvisibles){s+=" ace_invisible",o=" ace_invisible_space",r=" ace_invisible_tab";var a=w.stringRepeat(this.SPACE_CHAR,this.tabSize),l=w.stringRepeat(this.TAB_CHAR,this.tabSize)}else l=a=w.stringRepeat(" ",this.tabSize);(n=this.dom.createElement("span")).className=s+o,n.textContent=a,this.$tabStrings[" "]=n,(n=this.dom.createElement("span")).className=s+r,n.textContent=l,this.$tabStrings["\t"]=n}},this.updateLines=function(e,t,i){if(this.config.lastRow!=e.lastRow||this.config.firstRow!=e.firstRow)return this.update(e);this.config=e;for(var n=Math.max(t,e.firstRow),s=Math.min(i,e.lastRow),o=this.element.childNodes,r=0,a=e.firstRow;a<n;a++){if(l=this.session.getFoldLine(a)){if(l.containsRow(n)){n=l.start.row;break}a=l.end.row}r++}for(var l,c=!1,h=(a=n,(l=this.session.getNextFoldLine(a))?l.start.row:1/0);h<a&&(a=l.end.row+1,h=(l=this.session.getNextFoldLine(a,l))?l.start.row:1/0),!(s<a);){var u=o[r++];if(u){this.dom.removeChildren(u),this.$renderLine(u,a,a==h&&l),c&&(u.style.top=this.$lines.computeLineTop(a,e,this.session)+"px");var d=e.lineHeight*this.session.getRowLength(a)+"px";u.style.height!=d&&(c=!0,u.style.height=d)}a++}if(c)for(;r<this.$lines.cells.length;){var g=this.$lines.cells[r++];g.element.style.top=this.$lines.computeLineTop(g.row,e,this.session)+"px"}},this.scrollLines=function(e){var t=this.config;if(this.config=e,this.$lines.pageChanged(t,e))return this.update(e);this.$lines.moveContainer(e);var i=e.lastRow,n=t?t.lastRow:-1;if(!t||n<e.firstRow)return this.update(e);if(i<t.firstRow)return this.update(e);if(!t||t.lastRow<e.firstRow)return this.update(e);if(e.lastRow<t.firstRow)return this.update(e);if(t.firstRow<e.firstRow)for(var s=this.session.getFoldedRowCount(t.firstRow,e.firstRow-1);0<s;s--)this.$lines.shift();if(t.lastRow>e.lastRow)for(s=this.session.getFoldedRowCount(e.lastRow+1,t.lastRow);0<s;s--)this.$lines.pop();e.firstRow<t.firstRow&&this.$lines.unshift(this.$renderLinesFragment(e,e.firstRow,t.firstRow-1)),e.lastRow>t.lastRow&&this.$lines.push(this.$renderLinesFragment(e,t.lastRow+1,e.lastRow))},this.$renderLinesFragment=function(e,t,i){for(var n=[],s=t,o=this.session.getNextFoldLine(s),r=o?o.start.row:1/0;r<s&&(s=o.end.row+1,r=(o=this.session.getNextFoldLine(s,o))?o.start.row:1/0),!(i<s);){var a=this.$lines.createCell(s,e,this.session),l=a.element;this.dom.removeChildren(l),c.setStyle(l.style,"height",this.$lines.computeLineHeight(s,e,this.session)+"px"),c.setStyle(l.style,"top",this.$lines.computeLineTop(s,e,this.session)+"px"),this.$renderLine(l,s,s==r&&o),this.$useLineGroups()?l.className="ace_line_group":l.className="ace_line",n.push(a),s++}return n},this.update=function(e){this.$lines.moveContainer(e);for(var t=(this.config=e).firstRow,i=e.lastRow,n=this.$lines;n.getLength();)n.pop();n.push(this.$renderLinesFragment(e,t,i))},this.$textToken={text:!0,rparen:!0,lparen:!0},this.$renderToken=function(e,t,i,n){for(var s,o=this,r=/(\t)|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\uFEFF\uFFF9-\uFFFC]+)|(\u3000)|([\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]|[\uD800-\uDBFF][\uDC00-\uDFFF])/g,a=this.dom.createFragment(this.element),l=0;s=r.exec(n);){var c=s[1],h=s[2],u=s[3],d=s[4],g=s[5];if(o.showInvisibles||!h){var f=l!=s.index?n.slice(l,s.index):"";if(l=s.index+s[0].length,f&&a.appendChild(this.dom.createTextNode(f,this.element)),c){var m=o.session.getScreenTabSize(t+s.index);a.appendChild(o.$tabStrings[m].cloneNode(!0)),t+=m-1}else if(h)if(o.showInvisibles){(v=this.dom.createElement("span")).className="ace_invisible ace_invisible_space",v.textContent=w.stringRepeat(o.SPACE_CHAR,h.length),a.appendChild(v)}else a.appendChild(this.com.createTextNode(h,this.element));else if(u){(v=this.dom.createElement("span")).className="ace_invisible ace_invisible_space ace_invalid",v.textContent=w.stringRepeat(o.SPACE_CHAR,u.length),a.appendChild(v)}else if(d){t+=1,(v=this.dom.createElement("span")).style.width=2*o.config.characterWidth+"px",v.className=o.showInvisibles?"ace_cjk ace_invisible ace_invisible_space":"ace_cjk",v.textContent=o.showInvisibles?o.SPACE_CHAR:d,a.appendChild(v)}else if(g){t+=1,(v=this.dom.createElement("span")).style.width=2*o.config.characterWidth+"px",v.className="ace_cjk",v.textContent=g,a.appendChild(v)}}}if(a.appendChild(this.dom.createTextNode(l?n.slice(l):n,this.element)),this.$textToken[i.type])e.appendChild(a);else{var p="ace_"+i.type.replace(/\./g," ace_"),v=this.dom.createElement("span");"fold"==i.type&&(v.style.width=i.value.length*this.config.characterWidth+"px"),v.className=p,v.appendChild(a),e.appendChild(v)}return t+n.length},this.renderIndentGuide=function(e,t,i){var n=t.search(this.$indentGuideRe);if(n<=0||i<=n)return t;if(" "==t[0]){for(var s=(n-=n%this.tabSize)/this.tabSize,o=0;o<s;o++)e.appendChild(this.$tabStrings[" "].cloneNode(!0));return t.substr(n)}if("\t"!=t[0])return t;for(o=0;o<n;o++)e.appendChild(this.$tabStrings["\t"].cloneNode(!0));return t.substr(n)},this.$createLineElement=function(e){var t=this.dom.createElement("div");return t.className="ace_line",t.style.height=this.config.lineHeight+"px",t},this.$renderWrappedLine=function(e,t,i){var n=0,s=0,o=i[0],r=0,a=this.$createLineElement();e.appendChild(a);for(var l=0;l<t.length;l++){var c=t[l],h=c.value;if(0==l&&this.displayIndentGuides){if(n=h.length,!(h=this.renderIndentGuide(a,h,o)))continue;n-=h.length}if(n+h.length<o)r=this.$renderToken(a,r,c,h),n+=h.length;else{for(;n+h.length>=o;)r=this.$renderToken(a,r,c,h.substring(0,o-n)),h=h.substring(o-n),n=o,a=this.$createLineElement(),e.appendChild(a),a.appendChild(this.dom.createTextNode(w.stringRepeat(" ",i.indent),this.element)),r=0,o=i[++s]||Number.MAX_VALUE;0!=h.length&&(n+=h.length,r=this.$renderToken(a,r,c,h))}}i[i.length-1]>this.MAX_LINE_LENGTH&&this.$renderOverflowMessage(a,r,null,"",!0)},this.$renderSimpleLine=function(e,t){var i=0,n=t[0],s=n.value;this.displayIndentGuides&&(s=this.renderIndentGuide(e,s)),s&&(i=this.$renderToken(e,i,n,s));for(var o=1;o<t.length;o++){if(i+(s=(n=t[o]).value).length>this.MAX_LINE_LENGTH)return this.$renderOverflowMessage(e,i,n,s);i=this.$renderToken(e,i,n,s)}},this.$renderOverflowMessage=function(e,t,i,n,s){i&&this.$renderToken(e,t,i,n.slice(0,this.MAX_LINE_LENGTH-t));var o=this.dom.createElement("span");o.className="ace_inline_button ace_keyword ace_toggle_wrap",o.textContent=s?"<hide>":"<click to see more...>",e.appendChild(o)},this.$renderLine=function(e,t,i){if(i||0==i||(i=this.session.getFoldLine(t)),i)var n=this.$getFoldLineTokens(t,i);else n=this.session.getTokens(t);var s=e;if(n.length){var o=this.session.getRowSplitData(t);if(o&&o.length){this.$renderWrappedLine(e,n,o);s=e.lastChild}else{s=e;this.$useLineGroups()&&(s=this.$createLineElement(),e.appendChild(s)),this.$renderSimpleLine(s,n)}}else this.$useLineGroups()&&(s=this.$createLineElement(),e.appendChild(s));if(this.showInvisibles&&s){i&&(t=i.end.row);var r=this.dom.createElement("span");r.className="ace_invisible ace_invisible_eol",r.textContent=t==this.session.getLength()-1?this.EOF_CHAR:this.EOL_CHAR,s.appendChild(r)}},this.$getFoldLineTokens=function(e,t){var o=this.session,r=[],a=o.getTokens(e);return t.walk(function(e,t,i,n,s){null!=e?r.push({type:"fold",value:e}):(s&&(a=o.getTokens(t)),a.length&&function(e,t,i){for(var n=0,s=0;s+e[n].value.length<t;)if(s+=e[n].value.length,++n==e.length)return;for(s!=t&&((o=e[n].value.substring(t-s)).length>i-t&&(o=o.substring(0,i-t)),r.push({type:e[n].type,value:o}),s=t+o.length,n+=1);s<i&&n<e.length;){var o;(o=e[n].value).length+s>i?r.push({type:e[n].type,value:o.substring(0,i-s)}):r.push(e[n]),s+=o.length,n+=1}}(a,n,i))},t.end.row,this.session.getLine(t.end.row).length),r},this.$useLineGroups=function(){return this.session.getUseWrapMode()},this.destroy=function(){}}).call(n.prototype),t.Text=n}),ace.define("ace/layer/cursor",["require","exports","module","ace/lib/dom"],function(e,t,i){"use strict";function n(e){this.element=c.createElement("div"),this.element.className="ace_layer ace_cursor-layer",e.appendChild(this.element),this.isVisible=!1,this.isBlinking=!0,this.blinkInterval=1e3,this.smoothBlinking=!1,this.cursors=[],this.cursor=this.addCursor(),c.addCssClass(this.element,"ace_hidden-cursors"),this.$updateCursors=this.$updateOpacity.bind(this)}var c=e("../lib/dom");(function(){this.$updateOpacity=function(e){for(var t=this.cursors,i=t.length;i--;)c.setStyle(t[i].style,"opacity",e?"":"0")},this.$startCssAnimation=function(){for(var e=this.cursors,t=e.length;t--;)e[t].style.animationDuration=this.blinkInterval+"ms";setTimeout(function(){c.addCssClass(this.element,"ace_animate-blinking")}.bind(this))},this.$stopCssAnimation=function(){c.removeCssClass(this.element,"ace_animate-blinking")},this.$padding=0,this.setPadding=function(e){this.$padding=e},this.setSession=function(e){this.session=e},this.setBlinking=function(e){e!=this.isBlinking&&(this.isBlinking=e,this.restartTimer())},this.setBlinkInterval=function(e){e!=this.blinkInterval&&(this.blinkInterval=e,this.restartTimer())},this.setSmoothBlinking=function(e){e!=this.smoothBlinking&&(this.smoothBlinking=e,c.setCssClass(this.element,"ace_smooth-blinking",e),this.$updateCursors(!0),this.restartTimer())},this.addCursor=function(){var e=c.createElement("div");return e.className="ace_cursor",this.element.appendChild(e),this.cursors.push(e),e},this.removeCursor=function(){if(1<this.cursors.length){var e=this.cursors.pop();return e.parentNode.removeChild(e),e}},this.hideCursor=function(){this.isVisible=!1,c.addCssClass(this.element,"ace_hidden-cursors"),this.restartTimer()},this.showCursor=function(){this.isVisible=!0,c.removeCssClass(this.element,"ace_hidden-cursors"),this.restartTimer()},this.restartTimer=function(){var e=this.$updateCursors;if(clearInterval(this.intervalId),clearTimeout(this.timeoutId),this.$stopCssAnimation(),this.smoothBlinking&&c.removeCssClass(this.element,"ace_smooth-blinking"),e(!0),this.isBlinking&&this.blinkInterval&&this.isVisible)if(this.smoothBlinking&&setTimeout(function(){c.addCssClass(this.element,"ace_smooth-blinking")}.bind(this)),c.HAS_CSS_ANIMATION)this.$startCssAnimation();else{var t=function(){this.timeoutId=setTimeout(function(){e(!1)},.6*this.blinkInterval)}.bind(this);this.intervalId=setInterval(function(){e(!0),t()},this.blinkInterval),t()}else this.$stopCssAnimation()},this.getPixelPosition=function(e,t){if(!this.config||!this.session)return{left:0,top:0};e=e||this.session.selection.getCursor();var i=this.session.documentToScreenPosition(e);return{left:this.$padding+(this.session.$bidiHandler.isBidiRow(i.row,e.row)?this.session.$bidiHandler.getPosLeft(i.column):i.column*this.config.characterWidth),top:(i.row-(t?this.config.firstRowScreen:0))*this.config.lineHeight}},this.isCursorInView=function(e,t){return 0<=e.top&&e.top<t.maxHeight},this.update=function(e){this.config=e;var t=this.session.$selectionMarkers,i=0,n=0;void 0!==t&&0!==t.length||(t=[{cursor:null}]);i=0;for(var s=t.length;i<s;i++){var o=this.getPixelPosition(t[i].cursor,!0);if(!((o.top>e.height+e.offset||o.top<0)&&1<i)){var r=this.cursors[n++]||this.addCursor(),a=r.style;this.drawCursor?this.drawCursor(r,o,e,t[i],this.session):this.isCursorInView(o,e)?(c.setStyle(a,"display","block"),c.translate(r,o.left,o.top),c.setStyle(a,"width",Math.round(e.characterWidth)+"px"),c.setStyle(a,"height",e.lineHeight+"px")):c.setStyle(a,"display","none")}}for(;this.cursors.length>n;)this.removeCursor();var l=this.session.getOverwrite();this.$setOverwrite(l),this.$pixelPos=o,this.restartTimer()},this.drawCursor=null,this.$setOverwrite=function(e){e!=this.overwrite&&((this.overwrite=e)?c.addCssClass(this.element,"ace_overwrite-cursors"):c.removeCssClass(this.element,"ace_overwrite-cursors"))},this.destroy=function(){clearInterval(this.intervalId),clearTimeout(this.timeoutId)}}).call(n.prototype),t.Cursor=n}),ace.define("ace/scrollbar",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/event","ace/lib/event_emitter"],function(e,t,i){"use strict";function n(e){this.element=o.createElement("div"),this.element.className="ace_scrollbar ace_scrollbar"+this.classSuffix,this.inner=o.createElement("div"),this.inner.className="ace_scrollbar-inner",this.inner.textContent=" ",this.element.appendChild(this.inner),e.appendChild(this.element),this.setVisible(!1),this.skipEvent=!1,r.addListener(this.element,"scroll",this.onScroll.bind(this)),r.addListener(this.element,"mousedown",r.preventDefault)}var s=e("./lib/oop"),o=e("./lib/dom"),r=e("./lib/event"),a=e("./lib/event_emitter").EventEmitter;(function(){s.implement(this,a),this.setVisible=function(e){this.element.style.display=e?"":"none",this.isVisible=e,this.coeff=1}}).call(n.prototype);function l(e,t){n.call(this,e),this.scrollTop=0,this.scrollHeight=0,t.$scrollbarWidth=this.width=o.scrollbarWidth(e.ownerDocument),this.inner.style.width=this.element.style.width=(this.width||15)+5+"px",this.$minWidth=0}s.inherits(l,n),function(){this.classSuffix="-v",this.onScroll=function(){if(!this.skipEvent){if(this.scrollTop=this.element.scrollTop,1!=this.coeff){var e=this.element.clientHeight/this.scrollHeight;this.scrollTop=this.scrollTop*(1-e)/(this.coeff-e)}this._emit("scroll",{data:this.scrollTop})}this.skipEvent=!1},this.getWidth=function(){return Math.max(this.isVisible?this.width:0,this.$minWidth||0)},this.setHeight=function(e){this.element.style.height=e+"px"},this.setInnerHeight=this.setScrollHeight=function(e){32768<(this.scrollHeight=e)?(this.coeff=32768/e,e=32768):1!=this.coeff&&(this.coeff=1),this.inner.style.height=e+"px"},this.setScrollTop=function(e){this.scrollTop!=e&&(this.skipEvent=!0,this.scrollTop=e,this.element.scrollTop=e*this.coeff)}}.call(l.prototype);function c(e,t){n.call(this,e),this.scrollLeft=0,this.height=t.$scrollbarWidth,this.inner.style.height=this.element.style.height=(this.height||15)+5+"px"}s.inherits(c,n),function(){this.classSuffix="-h",this.onScroll=function(){this.skipEvent||(this.scrollLeft=this.element.scrollLeft,this._emit("scroll",{data:this.scrollLeft})),this.skipEvent=!1},this.getHeight=function(){return this.isVisible?this.height:0},this.setWidth=function(e){this.element.style.width=e+"px"},this.setInnerWidth=function(e){this.inner.style.width=e+"px"},this.setScrollWidth=function(e){this.inner.style.width=e+"px"},this.setScrollLeft=function(e){this.scrollLeft!=e&&(this.skipEvent=!0,this.scrollLeft=this.element.scrollLeft=e)}}.call(c.prototype),t.ScrollBar=l,t.ScrollBarV=l,t.ScrollBarH=c,t.VScrollBar=l,t.HScrollBar=c}),ace.define("ace/renderloop",["require","exports","module","ace/lib/event"],function(e,t,i){"use strict";function n(e,t){this.onRender=e,this.pending=!1,this.changes=0,this.$recursionLimit=2,this.window=t||window;var i=this;this._flush=function(e){i.pending=!1;var t=i.changes;if(t&&(s.blockIdle(100),i.changes=0,i.onRender(t)),i.changes){if(i.$recursionLimit--<0)return;i.schedule()}else i.$recursionLimit=2}}var s=e("./lib/event");(function(){this.schedule=function(e){this.changes=this.changes|e,this.changes&&!this.pending&&(s.nextFrame(this._flush),this.pending=!0)},this.clear=function(e){var t=this.changes;return this.changes=0,t}}).call(n.prototype),t.RenderLoop=n}),ace.define("ace/layer/font_metrics",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/lib/lang","ace/lib/event","ace/lib/useragent","ace/lib/event_emitter"],function(e,t,i){var n=e("../lib/oop"),s=e("../lib/dom"),o=e("../lib/lang"),r=e("../lib/event"),a=e("../lib/useragent"),l=e("../lib/event_emitter").EventEmitter,c="function"==typeof ResizeObserver,h=t.FontMetrics=function(e){this.el=s.createElement("div"),this.$setMeasureNodeStyles(this.el.style,!0),this.$main=s.createElement("div"),this.$setMeasureNodeStyles(this.$main.style),this.$measureNode=s.createElement("div"),this.$setMeasureNodeStyles(this.$measureNode.style),this.el.appendChild(this.$main),this.el.appendChild(this.$measureNode),e.appendChild(this.el),this.$measureNode.innerHTML=o.stringRepeat("X",256),this.$characterSize={width:0,height:0},c?this.$addObserver():this.checkForSizeChanges()};(function(){n.implement(this,l),this.$characterSize={width:0,height:0},this.$setMeasureNodeStyles=function(e,t){e.width=e.height="auto",e.left=e.top="0px",e.visibility="hidden",e.position="absolute",e.whiteSpace="pre",a.isIE<8?e["font-family"]="inherit":e.font="inherit",e.overflow=t?"hidden":"visible"},this.checkForSizeChanges=function(e){if(void 0===e&&(e=this.$measureSizes()),e&&(this.$characterSize.width!==e.width||this.$characterSize.height!==e.height)){this.$measureNode.style.fontWeight="bold";var t=this.$measureSizes();this.$measureNode.style.fontWeight="",this.$characterSize=e,this.charSizes=Object.create(null),this.allowBoldFonts=t&&t.width===e.width&&t.height===e.height,this._emit("changeCharacterSize",{data:e})}},this.$addObserver=function(){var i=this;this.$observer=new window.ResizeObserver(function(e){var t=e[0].contentRect;i.checkForSizeChanges({height:t.height,width:t.width/256})}),this.$observer.observe(this.$measureNode)},this.$pollSizeChanges=function(){if(this.$pollSizeChangesTimer||this.$observer)return this.$pollSizeChangesTimer;var t=this;return this.$pollSizeChangesTimer=r.onIdle(function e(){t.checkForSizeChanges(),r.onIdle(e,500)},500)},this.setPolling=function(e){e?this.$pollSizeChanges():this.$pollSizeChangesTimer&&(clearInterval(this.$pollSizeChangesTimer),this.$pollSizeChangesTimer=0)},this.$measureSizes=function(e){var t={height:(e||this.$measureNode).clientHeight,width:(e||this.$measureNode).clientWidth/256};return 0===t.width||0===t.height?null:t},this.$measureCharWidth=function(e){return this.$main.innerHTML=o.stringRepeat(e,256),this.$main.getBoundingClientRect().width/256},this.getCharacterWidth=function(e){var t=this.charSizes[e];return void 0===t&&(t=this.charSizes[e]=this.$measureCharWidth(e)/this.$characterSize.width),t},this.destroy=function(){clearInterval(this.$pollSizeChangesTimer),this.$observer&&this.$observer.disconnect(),this.el&&this.el.parentNode&&this.el.parentNode.removeChild(this.el)},this.$getZoom=function e(t){return t?(window.getComputedStyle(t).zoom||1)*e(t.parentElement):1},this.$initTransformMeasureNodes=function(){function e(e,t){return["div",{style:"position: absolute;top:"+e+"px;left:"+t+"px;"}]}this.els=s.buildDom([e(0,0),e(200,0),e(0,200),e(200,200)],this.el)},this.transformCoordinates=function(e,t){function i(e,t,i){var n=e[1]*t[0]-e[0]*t[1];return[(-t[1]*i[0]+t[0]*i[1])/n,(e[1]*i[0]-e[0]*i[1])/n]}function n(e,t){return[e[0]-t[0],e[1]-t[1]]}function s(e,t){return[e[0]+t[0],e[1]+t[1]]}function o(e,t){return[e*t[0],e*t[1]]}function r(e){var t=e.getBoundingClientRect();return[t.left,t.top]}e=e&&o(1/this.$getZoom(this.el),e);this.els||this.$initTransformMeasureNodes();var a=r(this.els[0]),l=r(this.els[1]),c=r(this.els[2]),h=r(this.els[3]),u=i(n(h,l),n(h,c),n(s(l,c),s(h,a))),d=o(1+u[0],n(l,a)),g=o(1+u[1],n(c,a));if(t){var f=t;return s(o(1/(u[0]*f[0]/200+u[1]*f[1]/200+1)/200,s(o(f[0],d),o(f[1],g))),a)}var m=n(e,a);return o(200,i(n(d,o(u[0],m)),n(g,o(u[1],m)),m))}}).call(h.prototype)}),ace.define("ace/virtual_renderer",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/config","ace/layer/gutter","ace/layer/marker","ace/layer/text","ace/layer/cursor","ace/scrollbar","ace/scrollbar","ace/renderloop","ace/layer/font_metrics","ace/lib/event_emitter","ace/lib/useragent"],function(e,t,i){"use strict";var n=e("./lib/oop"),h=e("./lib/dom"),o=e("./config"),s=e("./layer/gutter").Gutter,r=e("./layer/marker").Marker,a=e("./layer/text").Text,l=e("./layer/cursor").Cursor,c=e("./scrollbar").HScrollBar,u=e("./scrollbar").VScrollBar,d=e("./renderloop").RenderLoop,g=e("./layer/font_metrics").FontMetrics,f=e("./lib/event_emitter").EventEmitter,m='.ace_br1 {border-top-left-radius    : 3px;}.ace_br2 {border-top-right-radius   : 3px;}.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}.ace_br4 {border-bottom-right-radius: 3px;}.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}.ace_br8 {border-bottom-left-radius : 3px;}.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}.ace_editor {position: relative;overflow: hidden;font: 12px/normal \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'source-code-pro\', monospace;direction: ltr;text-align: left;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;cursor: text;}.ace_content {position: absolute;box-sizing: border-box;min-width: 100%;contain: style size layout;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: \'\';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;contain: style size layout;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {position: absolute;top: 0;left: 0;right: 0;padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");}.ace_scrollbar {contain: strict;position: absolute;right: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-v{overflow-x: hidden;overflow-y: scroll;top: 0;}.ace_scrollbar-h {overflow-x: scroll;overflow-y: hidden;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;contain: strict;-ms-user-select: text;-moz-user-select: text;-webkit-user-select: text;user-select: text;white-space: pre!important;}.ace_text-input.ace_composition {background: transparent;color: inherit;z-index: 1000;opacity: 1;}.ace_composition_placeholder { color: transparent }.ace_composition_marker { border-bottom: 1px solid;position: absolute;border-radius: 0;margin-top: 1px;}[ace_nocontext=true] {transform: none!important;filter: none!important;perspective: none!important;clip-path: none!important;mask : none!important;contain: none!important;perspective: none!important;mix-blend-mode: initial!important;z-index: auto;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;word-wrap: normal;white-space: pre;height: 100%;width: 100%;box-sizing: border-box;pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;height: 1000000px;contain: style size layout;}.ace_text-layer {font: inherit !important;position: absolute;height: 1000000px;width: 1000000px;contain: style size layout;}.ace_text-layer > .ace_line, .ace_text-layer > .ace_line_group {contain: style size layout;position: absolute;top: 0;left: 0;right: 0;}.ace_hidpi .ace_text-layer,.ace_hidpi .ace_gutter-layer,.ace_hidpi .ace_content,.ace_hidpi .ace_gutter {contain: strict;will-change: transform;}.ace_hidpi .ace_text-layer > .ace_line, .ace_hidpi .ace_text-layer > .ace_line_group {contain: strict;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;box-sizing: border-box;border-left: 2px solid;transform: translatez(0);}.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_hasPlaceholder .ace_hidden-cursors .ace_cursor {opacity: 0;}.ace_smooth-blinking .ace_cursor {transition: opacity 0.18s;}.ace_animate-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: step-end;animation-name: blink-ace-animate;animation-iteration-count: infinite;}.ace_animate-blinking.ace_smooth-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: ease-in-out;animation-name: blink-ace-animate-smooth;}@keyframes blink-ace-animate {from, to { opacity: 1; }60% { opacity: 0; }}@keyframes blink-ace-animate-smooth {from, to { opacity: 1; }45% { opacity: 1; }60% { opacity: 0; }85% { opacity: 0; }}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;box-sizing: border-box;}.ace_line .ace_fold {box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");}.ace_tooltip {background-color: #FFF;background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;max-width: 100%;padding: 3px 4px;position: fixed;z-index: 999999;box-sizing: border-box;cursor: default;white-space: pre;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;pointer-events: none;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");}.ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}.ace_dark .ace_fold-widget {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");}.ace_dark .ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_inline_button {border: 1px solid lightgray;display: inline-block;margin: -1px 8px;padding: 0 5px;pointer-events: auto;cursor: pointer;}.ace_inline_button:hover {border-color: gray;background: rgba(200,200,200,0.2);display: inline-block;pointer-events: auto;}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}.ace_mobile-menu {position: absolute;line-height: 1.5;border-radius: 4px;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;background: white;box-shadow: 1px 3px 2px grey;border: 1px solid #dcdcdc;color: black;}.ace_dark > .ace_mobile-menu {background: #333;color: #ccc;box-shadow: 1px 3px 2px grey;border: 1px solid #444;}.ace_mobile-button {padding: 2px;cursor: pointer;overflow: hidden;}.ace_mobile-button:hover {background-color: #eee;opacity:1;}.ace_mobile-button:active {background-color: #ddd;}.ace_placeholder {font-family: arial;transform: scale(0.9);opacity: 0.7;transform-origin: left;text-indent: 10px;}',p=e("./lib/useragent"),v=p.isIE;h.importCssString(m,"ace_editor.css");function w(e,t){var i=this;this.container=e||h.createElement("div"),h.addCssClass(this.container,"ace_editor"),h.HI_DPI&&h.addCssClass(this.container,"ace_hidpi"),this.setTheme(t),this.$gutter=h.createElement("div"),this.$gutter.className="ace_gutter",this.container.appendChild(this.$gutter),this.$gutter.setAttribute("aria-hidden",!0),this.scroller=h.createElement("div"),this.scroller.className="ace_scroller",this.container.appendChild(this.scroller),this.content=h.createElement("div"),this.content.className="ace_content",this.scroller.appendChild(this.content),this.$gutterLayer=new s(this.$gutter),this.$gutterLayer.on("changeGutterWidth",this.onGutterResize.bind(this)),this.$markerBack=new r(this.content);var n=this.$textLayer=new a(this.content);this.canvas=n.element,this.$markerFront=new r(this.content),this.$cursorLayer=new l(this.content),this.$horizScroll=!1,this.$vScroll=!1,this.scrollBar=this.scrollBarV=new u(this.container,this),this.scrollBarH=new c(this.container,this),this.scrollBarV.addEventListener("scroll",function(e){i.$scrollAnimation||i.session.setScrollTop(e.data-i.scrollMargin.top)}),this.scrollBarH.addEventListener("scroll",function(e){i.$scrollAnimation||i.session.setScrollLeft(e.data-i.scrollMargin.left)}),this.scrollTop=0,this.scrollLeft=0,this.cursorPos={row:0,column:0},this.$fontMetrics=new g(this.container),this.$textLayer.$setFontMetrics(this.$fontMetrics),this.$textLayer.addEventListener("changeCharacterSize",function(e){i.updateCharacterSize(),i.onResize(!0,i.gutterWidth,i.$size.width,i.$size.height),i._signal("changeCharacterSize",e)}),this.$size={width:0,height:0,scrollerHeight:0,scrollerWidth:0,$dirty:!0},this.layerConfig={width:1,padding:0,firstRow:0,firstRowScreen:0,lastRow:0,lineHeight:0,characterWidth:0,minHeight:1,maxHeight:1,offset:0,height:1,gutterOffset:1},this.scrollMargin={left:0,right:0,top:0,bottom:0,v:0,h:0},this.margin={left:0,right:0,top:0,bottom:0,v:0,h:0},this.$keepTextAreaAtCursor=!p.isIOS,this.$loop=new d(this.$renderChanges.bind(this),this.container.ownerDocument.defaultView),this.$loop.schedule(this.CHANGE_FULL),this.updateCharacterSize(),this.setPadding(4),o.resetOptions(this),o._signal("renderer",this)}(function(){this.CHANGE_CURSOR=1,this.CHANGE_MARKER=2,this.CHANGE_GUTTER=4,this.CHANGE_SCROLL=8,this.CHANGE_LINES=16,this.CHANGE_TEXT=32,this.CHANGE_SIZE=64,this.CHANGE_MARKER_BACK=128,this.CHANGE_MARKER_FRONT=256,this.CHANGE_FULL=512,this.CHANGE_H_SCROLL=1024,n.implement(this,f),this.updateCharacterSize=function(){this.$textLayer.allowBoldFonts!=this.$allowBoldFonts&&(this.$allowBoldFonts=this.$textLayer.allowBoldFonts,this.setStyle("ace_nobold",!this.$allowBoldFonts)),this.layerConfig.characterWidth=this.characterWidth=this.$textLayer.getCharacterWidth(),this.layerConfig.lineHeight=this.lineHeight=this.$textLayer.getLineHeight(),this.$updatePrintMargin(),h.setStyle(this.scroller.style,"line-height",this.lineHeight+"px")},this.setSession=function(e){this.session&&this.session.doc.off("changeNewLineMode",this.onChangeNewLineMode),(this.session=e)&&this.scrollMargin.top&&e.getScrollTop()<=0&&e.setScrollTop(-this.scrollMargin.top),this.$cursorLayer.setSession(e),this.$markerBack.setSession(e),this.$markerFront.setSession(e),this.$gutterLayer.setSession(e),this.$textLayer.setSession(e),e&&(this.$loop.schedule(this.CHANGE_FULL),this.session.$setFontMetrics(this.$fontMetrics),this.scrollBarH.scrollLeft=this.scrollBarV.scrollTop=null,this.onChangeNewLineMode=this.onChangeNewLineMode.bind(this),this.onChangeNewLineMode(),this.session.doc.on("changeNewLineMode",this.onChangeNewLineMode))},this.updateLines=function(e,t,i){if(void 0===t&&(t=1/0),this.$changedLines?(this.$changedLines.firstRow>e&&(this.$changedLines.firstRow=e),this.$changedLines.lastRow<t&&(this.$changedLines.lastRow=t)):this.$changedLines={firstRow:e,lastRow:t},this.$changedLines.lastRow<this.layerConfig.firstRow){if(!i)return;this.$changedLines.lastRow=this.layerConfig.lastRow}this.$changedLines.firstRow>this.layerConfig.lastRow||this.$loop.schedule(this.CHANGE_LINES)},this.onChangeNewLineMode=function(){this.$loop.schedule(this.CHANGE_TEXT),this.$textLayer.$updateEolChar(),this.session.$bidiHandler.setEolChar(this.$textLayer.EOL_CHAR)},this.onChangeTabSize=function(){this.$loop.schedule(this.CHANGE_TEXT|this.CHANGE_MARKER),this.$textLayer.onChangeTabSize()},this.updateText=function(){this.$loop.schedule(this.CHANGE_TEXT)},this.updateFull=function(e){e?this.$renderChanges(this.CHANGE_FULL,!0):this.$loop.schedule(this.CHANGE_FULL)},this.updateFontSize=function(){this.$textLayer.checkForSizeChanges()},this.$changes=0,this.$updateSizeAsync=function(){this.$loop.pending?this.$size.$dirty=!0:this.onResize()},this.onResize=function(e,t,i,n){if(!(2<this.resizing)){0<this.resizing?this.resizing++:this.resizing=e?1:0;var s=this.container;n=n||(s.clientHeight||s.scrollHeight),i=i||(s.clientWidth||s.scrollWidth);var o=this.$updateCachedSize(e,t,i,n);if(!this.$size.scrollerHeight||!i&&!n)return this.resizing=0;e&&(this.$gutterLayer.$padding=null),e?this.$renderChanges(o|this.$changes,!0):this.$loop.schedule(o|this.$changes),this.resizing&&(this.resizing=0),this.scrollBarV.scrollLeft=this.scrollBarV.scrollTop=null}},this.$updateCachedSize=function(e,t,i,n){n-=this.$extraHeight||0;var s=0,o=this.$size,r={width:o.width,height:o.height,scrollerHeight:o.scrollerHeight,scrollerWidth:o.scrollerWidth};if(n&&(e||o.height!=n)&&(o.height=n,s|=this.CHANGE_SIZE,o.scrollerHeight=o.height,this.$horizScroll&&(o.scrollerHeight-=this.scrollBarH.getHeight()),this.scrollBarV.element.style.bottom=this.scrollBarH.getHeight()+"px",s|=this.CHANGE_SCROLL),i&&(e||o.width!=i)){s|=this.CHANGE_SIZE,o.width=i,null==t&&(t=this.$showGutter?this.$gutter.offsetWidth:0),this.gutterWidth=t,h.setStyle(this.scrollBarH.element.style,"left",t+"px"),h.setStyle(this.scroller.style,"left",t+this.margin.left+"px"),o.scrollerWidth=Math.max(0,i-t-this.scrollBarV.getWidth()-this.margin.h),h.setStyle(this.$gutter.style,"left",this.margin.left+"px");var a=this.scrollBarV.getWidth()+"px";h.setStyle(this.scrollBarH.element.style,"right",a),h.setStyle(this.scroller.style,"right",a),h.setStyle(this.scroller.style,"bottom",this.scrollBarH.getHeight()),(this.session&&this.session.getUseWrapMode()&&this.adjustWrapLimit()||e)&&(s|=this.CHANGE_FULL)}return o.$dirty=!i||!n,s&&this._signal("resize",r),s},this.onGutterResize=function(e){var t=this.$showGutter?e:0;t!=this.gutterWidth&&(this.$changes|=this.$updateCachedSize(!0,t,this.$size.width,this.$size.height)),this.session.getUseWrapMode()&&this.adjustWrapLimit()?this.$loop.schedule(this.CHANGE_FULL):this.$size.$dirty?this.$loop.schedule(this.CHANGE_FULL):this.$computeLayerConfig()},this.adjustWrapLimit=function(){var e=this.$size.scrollerWidth-2*this.$padding,t=Math.floor(e/this.characterWidth);return this.session.adjustWrapLimit(t,this.$showPrintMargin&&this.$printMarginColumn)},this.setAnimatedScroll=function(e){this.setOption("animatedScroll",e)},this.getAnimatedScroll=function(){return this.$animatedScroll},this.setShowInvisibles=function(e){this.setOption("showInvisibles",e),this.session.$bidiHandler.setShowInvisibles(e)},this.getShowInvisibles=function(){return this.getOption("showInvisibles")},this.getDisplayIndentGuides=function(){return this.getOption("displayIndentGuides")},this.setDisplayIndentGuides=function(e){this.setOption("displayIndentGuides",e)},this.setShowPrintMargin=function(e){this.setOption("showPrintMargin",e)},this.getShowPrintMargin=function(){return this.getOption("showPrintMargin")},this.setPrintMarginColumn=function(e){this.setOption("printMarginColumn",e)},this.getPrintMarginColumn=function(){return this.getOption("printMarginColumn")},this.getShowGutter=function(){return this.getOption("showGutter")},this.setShowGutter=function(e){return this.setOption("showGutter",e)},this.getFadeFoldWidgets=function(){return this.getOption("fadeFoldWidgets")},this.setFadeFoldWidgets=function(e){this.setOption("fadeFoldWidgets",e)},this.setHighlightGutterLine=function(e){this.setOption("highlightGutterLine",e)},this.getHighlightGutterLine=function(){return this.getOption("highlightGutterLine")},this.$updatePrintMargin=function(){if(this.$showPrintMargin||this.$printMarginEl){if(!this.$printMarginEl){var e=h.createElement("div");e.className="ace_layer ace_print-margin-layer",this.$printMarginEl=h.createElement("div"),this.$printMarginEl.className="ace_print-margin",e.appendChild(this.$printMarginEl),this.content.insertBefore(e,this.content.firstChild)}var t=this.$printMarginEl.style;t.left=Math.round(this.characterWidth*this.$printMarginColumn+this.$padding)+"px",t.visibility=this.$showPrintMargin?"visible":"hidden",this.session&&-1==this.session.$wrap&&this.adjustWrapLimit()}},this.getContainerElement=function(){return this.container},this.getMouseEventTarget=function(){return this.scroller},this.getTextAreaContainer=function(){return this.container},this.$moveTextAreaToCursor=function(){if(!this.$isMousePressed){var e=this.textarea.style,t=this.$composition;if(this.$keepTextAreaAtCursor||t){var i=this.$cursorLayer.$pixelPos;if(i){t&&t.markerRange&&(i=this.$cursorLayer.getPixelPosition(t.markerRange.start,!0));var n=this.layerConfig,s=i.top,o=i.left;s-=n.offset;var r=t&&t.useTextareaForIME?this.lineHeight:v?0:1;if(s<0||s>n.height-r)h.translate(this.textarea,0,0);else{var a=1,l=this.$size.height-r;if(t)if(t.useTextareaForIME){var c=this.textarea.value;a=this.characterWidth*this.session.$getStringScreenWidth(c)[0]}else s+=this.lineHeight+2;else s+=this.lineHeight;(o-=this.scrollLeft)>this.$size.scrollerWidth-a&&(o=this.$size.scrollerWidth-a),o+=this.gutterWidth+this.margin.left,h.setStyle(e,"height",r+"px"),h.setStyle(e,"width",a+"px"),h.translate(this.textarea,Math.min(o,this.$size.scrollerWidth-a),Math.min(s,l))}}}else h.translate(this.textarea,-100,0)}},this.getFirstVisibleRow=function(){return this.layerConfig.firstRow},this.getFirstFullyVisibleRow=function(){return this.layerConfig.firstRow+(0===this.layerConfig.offset?0:1)},this.getLastFullyVisibleRow=function(){var e=this.layerConfig,t=e.lastRow;return this.session.documentToScreenRow(t,0)*e.lineHeight-this.session.getScrollTop()>e.height-e.lineHeight?t-1:t},this.getLastVisibleRow=function(){return this.layerConfig.lastRow},this.$padding=null,this.setPadding=function(e){this.$padding=e,this.$textLayer.setPadding(e),this.$cursorLayer.setPadding(e),this.$markerFront.setPadding(e),this.$markerBack.setPadding(e),this.$loop.schedule(this.CHANGE_FULL),this.$updatePrintMargin()},this.setScrollMargin=function(e,t,i,n){var s=this.scrollMargin;s.top=0|e,s.bottom=0|t,s.right=0|n,s.left=0|i,s.v=s.top+s.bottom,s.h=s.left+s.right,s.top&&this.scrollTop<=0&&this.session&&this.session.setScrollTop(-s.top),this.updateFull()},this.setMargin=function(e,t,i,n){var s=this.margin;s.top=0|e,s.bottom=0|t,s.right=0|n,s.left=0|i,s.v=s.top+s.bottom,s.h=s.left+s.right,this.$updateCachedSize(!0,this.gutterWidth,this.$size.width,this.$size.height),this.updateFull()},this.getHScrollBarAlwaysVisible=function(){return this.$hScrollBarAlwaysVisible},this.setHScrollBarAlwaysVisible=function(e){this.setOption("hScrollBarAlwaysVisible",e)},this.getVScrollBarAlwaysVisible=function(){return this.$vScrollBarAlwaysVisible},this.setVScrollBarAlwaysVisible=function(e){this.setOption("vScrollBarAlwaysVisible",e)},this.$updateScrollBarV=function(){var e=this.layerConfig.maxHeight,t=this.$size.scrollerHeight;!this.$maxLines&&this.$scrollPastEnd&&(e-=(t-this.lineHeight)*this.$scrollPastEnd,this.scrollTop>e-t&&(e=this.scrollTop+t,this.scrollBarV.scrollTop=null)),this.scrollBarV.setScrollHeight(e+this.scrollMargin.v),this.scrollBarV.setScrollTop(this.scrollTop+this.scrollMargin.top)},this.$updateScrollBarH=function(){this.scrollBarH.setScrollWidth(this.layerConfig.width+2*this.$padding+this.scrollMargin.h),this.scrollBarH.setScrollLeft(this.scrollLeft+this.scrollMargin.left)},this.$frozen=!1,this.freeze=function(){this.$frozen=!0},this.unfreeze=function(){this.$frozen=!1},this.$renderChanges=function(e,t){if(this.$changes&&(e|=this.$changes,this.$changes=0),this.session&&this.container.offsetWidth&&!this.$frozen&&(e||t)){if(this.$size.$dirty)return this.$changes|=e,this.onResize(!0);this.lineHeight||this.$textLayer.checkForSizeChanges(),this._signal("beforeRender"),this.session&&this.session.$bidiHandler&&this.session.$bidiHandler.updateCharacterWidths(this.$fontMetrics);var i=this.layerConfig;if(e&this.CHANGE_FULL||e&this.CHANGE_SIZE||e&this.CHANGE_TEXT||e&this.CHANGE_LINES||e&this.CHANGE_SCROLL||e&this.CHANGE_H_SCROLL){if(e|=this.$computeLayerConfig()|this.$loop.clear(),i.firstRow!=this.layerConfig.firstRow&&i.firstRowScreen==this.layerConfig.firstRowScreen){var n=this.scrollTop+(i.firstRow-this.layerConfig.firstRow)*this.lineHeight;0<n&&(this.scrollTop=n,e|=this.CHANGE_SCROLL,e|=this.$computeLayerConfig()|this.$loop.clear())}i=this.layerConfig,this.$updateScrollBarV(),e&this.CHANGE_H_SCROLL&&this.$updateScrollBarH(),h.translate(this.content,-this.scrollLeft,-i.offset);var s=i.width+2*this.$padding+"px",o=i.minHeight+"px";h.setStyle(this.content.style,"width",s),h.setStyle(this.content.style,"height",o)}return e&this.CHANGE_H_SCROLL&&(h.translate(this.content,-this.scrollLeft,-i.offset),this.scroller.className=this.scrollLeft<=0?"ace_scroller":"ace_scroller ace_scroll-left"),e&this.CHANGE_FULL?(this.$changedLines=null,this.$textLayer.update(i),this.$showGutter&&this.$gutterLayer.update(i),this.$markerBack.update(i),this.$markerFront.update(i),this.$cursorLayer.update(i),this.$moveTextAreaToCursor()):e&this.CHANGE_SCROLL?(this.$changedLines=null,e&this.CHANGE_TEXT||e&this.CHANGE_LINES?this.$textLayer.update(i):this.$textLayer.scrollLines(i),this.$showGutter&&(e&this.CHANGE_GUTTER||e&this.CHANGE_LINES?this.$gutterLayer.update(i):this.$gutterLayer.scrollLines(i)),this.$markerBack.update(i),this.$markerFront.update(i),this.$cursorLayer.update(i),this.$moveTextAreaToCursor()):(e&this.CHANGE_TEXT?(this.$changedLines=null,this.$textLayer.update(i),this.$showGutter&&this.$gutterLayer.update(i)):e&this.CHANGE_LINES?(this.$updateLines()||e&this.CHANGE_GUTTER&&this.$showGutter)&&this.$gutterLayer.update(i):e&this.CHANGE_TEXT||e&this.CHANGE_GUTTER?this.$showGutter&&this.$gutterLayer.update(i):e&this.CHANGE_CURSOR&&this.$highlightGutterLine&&this.$gutterLayer.updateLineHighlight(i),e&this.CHANGE_CURSOR&&(this.$cursorLayer.update(i),this.$moveTextAreaToCursor()),e&(this.CHANGE_MARKER|this.CHANGE_MARKER_FRONT)&&this.$markerFront.update(i),e&(this.CHANGE_MARKER|this.CHANGE_MARKER_BACK)&&this.$markerBack.update(i)),void this._signal("afterRender")}this.$changes|=e},this.$autosize=function(){var e=this.session.getScreenLength()*this.lineHeight,t=this.$maxLines*this.lineHeight,i=Math.min(t,Math.max((this.$minLines||1)*this.lineHeight,e))+this.scrollMargin.v+(this.$extraHeight||0);this.$horizScroll&&(i+=this.scrollBarH.getHeight()),this.$maxPixelHeight&&i>this.$maxPixelHeight&&(i=this.$maxPixelHeight);var n=!(i<=2*this.lineHeight)&&t<e;if(i!=this.desiredHeight||this.$size.height!=this.desiredHeight||n!=this.$vScroll){n!=this.$vScroll&&(this.$vScroll=n,this.scrollBarV.setVisible(n));var s=this.container.clientWidth;this.container.style.height=i+"px",this.$updateCachedSize(!0,this.$gutterWidth,s,i),this.desiredHeight=i,this._signal("autosize")}},this.$computeLayerConfig=function(){var e=this.session,t=this.$size,i=t.height<=2*this.lineHeight,n=this.session.getScreenLength()*this.lineHeight,s=this.$getLongestLine(),o=!i&&(this.$hScrollBarAlwaysVisible||t.scrollerWidth-s-2*this.$padding<0),r=this.$horizScroll!==o;r&&(this.$horizScroll=o,this.scrollBarH.setVisible(o));var a=this.$vScroll;this.$maxLines&&1<this.lineHeight&&this.$autosize();var l=t.scrollerHeight+this.lineHeight,c=!this.$maxLines&&this.$scrollPastEnd?(t.scrollerHeight-this.lineHeight)*this.$scrollPastEnd:0;n+=c;var h=this.scrollMargin;this.session.setScrollTop(Math.max(-h.top,Math.min(this.scrollTop,n-t.scrollerHeight+h.bottom))),this.session.setScrollLeft(Math.max(-h.left,Math.min(this.scrollLeft,s+2*this.$padding-t.scrollerWidth+h.right)));var u=!i&&(this.$vScrollBarAlwaysVisible||t.scrollerHeight-n+c<0||this.scrollTop>h.top),d=a!==u;d&&(this.$vScroll=u,this.scrollBarV.setVisible(u));var g,f,m=this.scrollTop%this.lineHeight,p=Math.ceil(l/this.lineHeight)-1,v=Math.max(0,Math.round((this.scrollTop-m)/this.lineHeight)),w=v+p,b=this.lineHeight;v=e.screenToDocumentRow(v,0);var y=e.getFoldLine(v);y&&(v=y.start.row),g=e.documentToScreenRow(v,0),f=e.getRowLength(v)*b,w=Math.min(e.screenToDocumentRow(w,0),e.getLength()-1),l=t.scrollerHeight+e.getRowLength(w)*b+f,m=this.scrollTop-g*b;var $=0;return this.layerConfig.width==s&&!r||($=this.CHANGE_H_SCROLL),(r||d)&&($|=this.$updateCachedSize(!0,this.gutterWidth,t.width,t.height),this._signal("scrollbarVisibilityChanged"),d&&(s=this.$getLongestLine())),this.layerConfig={width:s,padding:this.$padding,firstRow:v,firstRowScreen:g,lastRow:w,lineHeight:b,characterWidth:this.characterWidth,minHeight:l,maxHeight:n,offset:m,gutterOffset:b?Math.max(0,Math.ceil((m+t.height-t.scrollerHeight)/b)):0,height:this.$size.scrollerHeight},this.session.$bidiHandler&&this.session.$bidiHandler.setContentWidth(s-this.$padding),$},this.$updateLines=function(){if(this.$changedLines){var e=this.$changedLines.firstRow,t=this.$changedLines.lastRow;this.$changedLines=null;var i=this.layerConfig;if(!(e>i.lastRow+1||t<i.firstRow))return t===1/0?(this.$showGutter&&this.$gutterLayer.update(i),void this.$textLayer.update(i)):(this.$textLayer.updateLines(i,e,t),!0)}},this.$getLongestLine=function(){var e=this.session.getScreenWidth();return this.showInvisibles&&!this.session.$useWrapMode&&(e+=1),this.$textLayer&&e>this.$textLayer.MAX_LINE_LENGTH&&(e=this.$textLayer.MAX_LINE_LENGTH+30),Math.max(this.$size.scrollerWidth-2*this.$padding,Math.round(e*this.characterWidth))},this.updateFrontMarkers=function(){this.$markerFront.setMarkers(this.session.getMarkers(!0)),this.$loop.schedule(this.CHANGE_MARKER_FRONT)},this.updateBackMarkers=function(){this.$markerBack.setMarkers(this.session.getMarkers()),this.$loop.schedule(this.CHANGE_MARKER_BACK)},this.addGutterDecoration=function(e,t){this.$gutterLayer.addGutterDecoration(e,t)},this.removeGutterDecoration=function(e,t){this.$gutterLayer.removeGutterDecoration(e,t)},this.updateBreakpoints=function(e){this.$loop.schedule(this.CHANGE_GUTTER)},this.setAnnotations=function(e){this.$gutterLayer.setAnnotations(e),this.$loop.schedule(this.CHANGE_GUTTER)},this.updateCursor=function(){this.$loop.schedule(this.CHANGE_CURSOR)},this.hideCursor=function(){this.$cursorLayer.hideCursor()},this.showCursor=function(){this.$cursorLayer.showCursor()},this.scrollSelectionIntoView=function(e,t,i){this.scrollCursorIntoView(e,i),this.scrollCursorIntoView(t,i)},this.scrollCursorIntoView=function(e,t,i){if(0!==this.$size.scrollerHeight){var n=this.$cursorLayer.getPixelPosition(e),s=n.left,o=n.top,r=i&&i.top||0,a=i&&i.bottom||0,l=this.$scrollAnimation?this.session.getScrollTop():this.scrollTop;o<l+r?(t&&l+r>o+this.lineHeight&&(o-=t*this.$size.scrollerHeight),0===o&&(o=-this.scrollMargin.top),this.session.setScrollTop(o)):l+this.$size.scrollerHeight-a<o+this.lineHeight&&(t&&l+this.$size.scrollerHeight-a<o-this.lineHeight&&(o+=t*this.$size.scrollerHeight),this.session.setScrollTop(o+this.lineHeight+a-this.$size.scrollerHeight));var c=this.scrollLeft;s<c?(s<this.$padding+2*this.layerConfig.characterWidth&&(s=-this.scrollMargin.left),this.session.setScrollLeft(s)):c+this.$size.scrollerWidth<s+this.characterWidth?this.session.setScrollLeft(Math.round(s+this.characterWidth-this.$size.scrollerWidth)):c<=this.$padding&&s-c<this.characterWidth&&this.session.setScrollLeft(0)}},this.getScrollTop=function(){return this.session.getScrollTop()},this.getScrollLeft=function(){return this.session.getScrollLeft()},this.getScrollTopRow=function(){return this.scrollTop/this.lineHeight},this.getScrollBottomRow=function(){return Math.max(0,Math.floor((this.scrollTop+this.$size.scrollerHeight)/this.lineHeight)-1)},this.scrollToRow=function(e){this.session.setScrollTop(e*this.lineHeight)},this.alignCursor=function(e,t){"number"==typeof e&&(e={row:e,column:0});var i=this.$cursorLayer.getPixelPosition(e),n=this.$size.scrollerHeight-this.lineHeight,s=i.top-n*(t||0);return this.session.setScrollTop(s),s},this.STEPS=8,this.$calcSteps=function(e,t){var i,n,s=0,o=this.STEPS,r=[];for(s=0;s<o;++s)r.push((i=s/this.STEPS,(t-(n=e))*(Math.pow(i-1,3)+1)+n));return r},this.scrollToLine=function(e,t,i,n){var s=this.$cursorLayer.getPixelPosition({row:e,column:0}).top;t&&(s-=this.$size.scrollerHeight/2);var o=this.scrollTop;this.session.setScrollTop(s),!1!==i&&this.animateScrolling(o,n)},this.animateScrolling=function(e,t){var i=this.scrollTop;if(this.$animatedScroll){var n=this;if(e!=i){if(this.$scrollAnimation){var s=this.$scrollAnimation.steps;if(s.length&&(e=s[0])==i)return}var o=n.$calcSteps(e,i);this.$scrollAnimation={from:e,to:i,steps:o},clearInterval(this.$timer),n.session.setScrollTop(o.shift()),n.session.$scrollTop=i,this.$timer=setInterval(function(){o.length?(n.session.setScrollTop(o.shift()),n.session.$scrollTop=i):null!=i?(n.session.$scrollTop=-1,n.session.setScrollTop(i),i=null):(n.$timer=clearInterval(n.$timer),n.$scrollAnimation=null,t&&t())},10)}}},this.scrollToY=function(e){this.scrollTop!==e&&(this.$loop.schedule(this.CHANGE_SCROLL),this.scrollTop=e)},this.scrollToX=function(e){this.scrollLeft!==e&&(this.scrollLeft=e),this.$loop.schedule(this.CHANGE_H_SCROLL)},this.scrollTo=function(e,t){this.session.setScrollTop(t),this.session.setScrollLeft(t)},this.scrollBy=function(e,t){t&&this.session.setScrollTop(this.session.getScrollTop()+t),e&&this.session.setScrollLeft(this.session.getScrollLeft()+e)},this.isScrollableBy=function(e,t){return t<0&&this.session.getScrollTop()>=1-this.scrollMargin.top||(0<t&&this.session.getScrollTop()+this.$size.scrollerHeight-this.layerConfig.maxHeight<-1+this.scrollMargin.bottom||(e<0&&this.session.getScrollLeft()>=1-this.scrollMargin.left||(0<e&&this.session.getScrollLeft()+this.$size.scrollerWidth-this.layerConfig.width<-1+this.scrollMargin.right||void 0)))},this.pixelToScreenCoordinates=function(e,t){var i;if(this.$hasCssTransforms){i={top:0,left:0};var n=this.$fontMetrics.transformCoordinates([e,t]);e=n[1]-this.gutterWidth-this.margin.left,t=n[0]}else i=this.scroller.getBoundingClientRect();var s=e+this.scrollLeft-i.left-this.$padding,o=s/this.characterWidth,r=Math.floor((t+this.scrollTop-i.top)/this.lineHeight),a=this.$blockCursor?Math.floor(o):Math.round(o);return{row:r,column:a,side:0<o-a?1:-1,offsetX:s}},this.screenToTextCoordinates=function(e,t){var i;if(this.$hasCssTransforms){i={top:0,left:0};var n=this.$fontMetrics.transformCoordinates([e,t]);e=n[1]-this.gutterWidth-this.margin.left,t=n[0]}else i=this.scroller.getBoundingClientRect();var s=e+this.scrollLeft-i.left-this.$padding,o=s/this.characterWidth,r=this.$blockCursor?Math.floor(o):Math.round(o),a=Math.floor((t+this.scrollTop-i.top)/this.lineHeight);return this.session.screenToDocumentPosition(a,Math.max(r,0),s)},this.textToScreenCoordinates=function(e,t){var i=this.scroller.getBoundingClientRect(),n=this.session.documentToScreenPosition(e,t),s=this.$padding+(this.session.$bidiHandler.isBidiRow(n.row,e)?this.session.$bidiHandler.getPosLeft(n.column):Math.round(n.column*this.characterWidth)),o=n.row*this.lineHeight;return{pageX:i.left+s-this.scrollLeft,pageY:i.top+o-this.scrollTop}},this.visualizeFocus=function(){h.addCssClass(this.container,"ace_focus")},this.visualizeBlur=function(){h.removeCssClass(this.container,"ace_focus")},this.showComposition=function(e){(this.$composition=e).cssText||(e.cssText=this.textarea.style.cssText),e.useTextareaForIME=this.$useTextareaForIME,this.$useTextareaForIME?(h.addCssClass(this.textarea,"ace_composition"),this.textarea.style.cssText="",this.$moveTextAreaToCursor(),this.$cursorLayer.element.style.display="none"):e.markerId=this.session.addMarker(e.markerRange,"ace_composition_marker","text")},this.setCompositionText=function(e){var t=this.session.selection.cursor;this.addToken(e,"composition_placeholder",t.row,t.column),this.$moveTextAreaToCursor()},this.hideComposition=function(){this.$composition&&(this.$composition.markerId&&this.session.removeMarker(this.$composition.markerId),h.removeCssClass(this.textarea,"ace_composition"),this.textarea.style.cssText=this.$composition.cssText,this.$composition=null,this.$cursorLayer.element.style.display="")},this.addToken=function(e,t,i,n){var s=this.session;s.bgTokenizer.lines[i]=null;var o={type:t,value:e},r=s.getTokens(i);if(null==n)r.push(o);else for(var a=0,l=0;l<r.length;l++){var c=r[l];if(n<=(a+=c.value.length)){var h=c.value.length-(a-n),u=c.value.slice(0,h),d=c.value.slice(h);r.splice(l,1,{type:c.type,value:u},o,{type:c.type,value:d});break}}this.updateLines(i,i)},this.setTheme=function(i,n){function e(e){if(s.$themeId!=i)return n&&n();if(!e||!e.cssClass)throw new Error("couldn't load module "+i+" or it didn't call define");e.$id&&(s.$themeId=e.$id),h.importCssString(e.cssText,e.cssClass,s.container),s.theme&&h.removeCssClass(s.container,s.theme.cssClass);var t="padding"in e?e.padding:"padding"in(s.theme||{})?4:s.$padding;s.$padding&&t!=s.$padding&&s.setPadding(t),s.$theme=e.cssClass,s.theme=e,h.addCssClass(s.container,e.cssClass),h.setCssClass(s.container,"ace_dark",e.isDark),s.$size&&(s.$size.width=0,s.$updateSizeAsync()),s._dispatchEvent("themeLoaded",{theme:e}),n&&n()}var s=this;if(this.$themeId=i,s._dispatchEvent("themeChange",{theme:i}),i&&"string"!=typeof i)e(i);else{var t=i||this.$options.theme.initialValue;o.loadModule(["theme",t],e)}},this.getTheme=function(){return this.$themeId},this.setStyle=function(e,t){h.setCssClass(this.container,e,!1!==t)},this.unsetStyle=function(e){h.removeCssClass(this.container,e)},this.setCursorStyle=function(e){h.setStyle(this.scroller.style,"cursor",e)},this.setMouseCursor=function(e){h.setStyle(this.scroller.style,"cursor",e)},this.attachToShadowRoot=function(){h.importCssString(m,"ace_editor.css",this.container)},this.destroy=function(){this.freeze(),this.$fontMetrics.destroy(),this.$cursorLayer.destroy()}}).call(w.prototype),o.defineOptions(w.prototype,"renderer",{animatedScroll:{initialValue:!1},showInvisibles:{set:function(e){this.$textLayer.setShowInvisibles(e)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!1},showPrintMargin:{set:function(){this.$updatePrintMargin()},initialValue:!0},printMarginColumn:{set:function(){this.$updatePrintMargin()},initialValue:80},printMargin:{set:function(e){"number"==typeof e&&(this.$printMarginColumn=e),this.$showPrintMargin=!!e,this.$updatePrintMargin()},get:function(){return this.$showPrintMargin&&this.$printMarginColumn}},showGutter:{set:function(e){this.$gutter.style.display=e?"block":"none",this.$loop.schedule(this.CHANGE_FULL),this.onGutterResize()},initialValue:!0},fadeFoldWidgets:{set:function(e){h.setCssClass(this.$gutter,"ace_fade-fold-widgets",e)},initialValue:!1},showFoldWidgets:{set:function(e){this.$gutterLayer.setShowFoldWidgets(e),this.$loop.schedule(this.CHANGE_GUTTER)},initialValue:!0},displayIndentGuides:{set:function(e){this.$textLayer.setDisplayIndentGuides(e)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!0},highlightGutterLine:{set:function(e){this.$gutterLayer.setHighlightGutterLine(e),this.$loop.schedule(this.CHANGE_GUTTER)},initialValue:!0},hScrollBarAlwaysVisible:{set:function(e){this.$hScrollBarAlwaysVisible&&this.$horizScroll||this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:!1},vScrollBarAlwaysVisible:{set:function(e){this.$vScrollBarAlwaysVisible&&this.$vScroll||this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:!1},fontSize:{set:function(e){"number"==typeof e&&(e+="px"),this.container.style.fontSize=e,this.updateFontSize()},initialValue:12},fontFamily:{set:function(e){this.container.style.fontFamily=e,this.updateFontSize()}},maxLines:{set:function(e){this.updateFull()}},minLines:{set:function(e){this.$minLines<562949953421311||(this.$minLines=0),this.updateFull()}},maxPixelHeight:{set:function(e){this.updateFull()},initialValue:0},scrollPastEnd:{set:function(e){e=+e||0,this.$scrollPastEnd!=e&&(this.$scrollPastEnd=e,this.$loop.schedule(this.CHANGE_SCROLL))},initialValue:0,handlesSet:!0},fixedWidthGutter:{set:function(e){this.$gutterLayer.$fixedWidth=!!e,this.$loop.schedule(this.CHANGE_GUTTER)}},theme:{set:function(e){this.setTheme(e)},get:function(){return this.$themeId||this.theme},initialValue:"./theme/textmate",handlesSet:!0},hasCssTransforms:{},useTextareaForIME:{initialValue:!p.isMobile&&!p.isIE}}),t.VirtualRenderer=w}),ace.define("ace/worker/worker_client",["require","exports","module","ace/lib/oop","ace/lib/net","ace/lib/event_emitter","ace/config"],function(a,e,t){"use strict";function l(e){if("undefined"==typeof Worker)return{postMessage:function(){},terminate:function(){}};if(u.get("loadWorkerFromBlob")){var t=function(e){var t="importScripts('"+n.qualifyURL(e)+"');";try{return new Blob([t],{type:"application/javascript"})}catch(e){var i=new(window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder);return i.append(t),i.getBlob("application/javascript")}}(e),i=(window.URL||window.webkitURL).createObjectURL(t);return new Worker(i)}return new Worker(e)}function c(e){e.postMessage||(e=this.$createWorkerFromOldConfig.apply(this,arguments)),this.$worker=e,this.$sendDeltaQueue=this.$sendDeltaQueue.bind(this),this.changeListener=this.changeListener.bind(this),this.onMessage=this.onMessage.bind(this),this.callbackId=1,this.callbacks={},this.$worker.onmessage=this.onMessage}var i=a("../lib/oop"),n=a("../lib/net"),h=a("../lib/event_emitter").EventEmitter,u=a("../config");(function(){i.implement(this,h),this.$createWorkerFromOldConfig=function(e,t,i,n,s){if(a.nameToUrl&&!a.toUrl&&(a.toUrl=a.nameToUrl),u.get("packaged")||!a.toUrl)n=n||u.moduleUrl(t,"worker");else{var o=this.$normalizePath;n=n||o(a.toUrl("ace/worker/worker.js",null,"_"));var r={};e.forEach(function(e){r[e]=o(a.toUrl(e,null,"_").replace(/(\.js)?(\?.*)?$/,""))})}return this.$worker=l(n),s&&this.send("importScripts",s),this.$worker.postMessage({init:!0,tlns:r,module:t,classname:i}),this.$worker},this.onMessage=function(e){var t=e.data;switch(t.type){case"event":this._signal(t.name,{data:t.data});break;case"call":var i=this.callbacks[t.id];i&&(i(t.data),delete this.callbacks[t.id]);break;case"error":this.reportError(t.data);break;case"log":window.console&&console.log&&console.log.apply(console,t.data)}},this.reportError=function(e){window.console&&console.error&&console.error(e)},this.$normalizePath=function(e){return n.qualifyURL(e)},this.terminate=function(){this._signal("terminate",{}),this.deltaQueue=null,this.$worker.terminate(),this.$worker=null,this.$doc&&this.$doc.off("change",this.changeListener),this.$doc=null},this.send=function(e,t){this.$worker.postMessage({command:e,args:t})},this.call=function(e,t,i){if(i){var n=this.callbackId++;this.callbacks[n]=i,t.push(n)}this.send(e,t)},this.emit=function(e,t){try{t.data&&t.data.err&&(t.data.err={message:t.data.err.message,stack:t.data.err.stack,code:t.data.err.code}),this.$worker.postMessage({event:e,data:{data:t.data}})}catch(e){console.error(e.stack)}},this.attachToDocument=function(e){this.$doc&&this.terminate(),this.$doc=e,this.call("setValue",[e.getValue()]),e.on("change",this.changeListener)},this.changeListener=function(e){this.deltaQueue||(this.deltaQueue=[],setTimeout(this.$sendDeltaQueue,0)),"insert"==e.action?this.deltaQueue.push(e.start,e.lines):this.deltaQueue.push(e.start,e.end)},this.$sendDeltaQueue=function(){var e=this.deltaQueue;e&&(this.deltaQueue=null,50<e.length&&e.length>this.$doc.getLength()>>1?this.call("setValue",[this.$doc.getValue()]):this.emit("change",{data:e}))}}).call(c.prototype);e.UIWorkerClient=function(e,t,i){var n=null,s=!1,o=Object.create(h),r=[],a=new c({messageBuffer:r,terminate:function(){},postMessage:function(e){r.push(e),n&&(s?setTimeout(l):l())}});a.setEmitSync=function(e){s=e};var l=function(){var e=r.shift();e.command?n[e.command].apply(n,e.args):e.event&&o._signal(e.event,e.data)};return o.postMessage=function(e){a.onMessage({data:e})},o.callback=function(e,t){this.postMessage({type:"call",id:t,data:e})},o.emit=function(e,t){this.postMessage({type:"event",name:e,data:t})},u.loadModule(["worker",t],function(e){for(n=new e[i](o);r.length;)l()}),a},e.WorkerClient=c,e.createWorker=l}),ace.define("ace/placeholder",["require","exports","module","ace/range","ace/lib/event_emitter","ace/lib/oop"],function(e,t,i){"use strict";function n(e,t,i,n,s,o){var r=this;this.length=t,this.session=e,this.doc=e.getDocument(),this.mainClass=s,this.othersClass=o,this.$onUpdate=this.onUpdate.bind(this),this.doc.on("change",this.$onUpdate),this.$others=n,this.$onCursorChange=function(){setTimeout(function(){r.onCursorChange()})},this.$pos=i;var a=e.getUndoManager().$undoStack||e.getUndoManager().$undostack||{length:-1};this.$undoStackDepth=a.length,this.setup(),e.selection.on("changeCursor",this.$onCursorChange)}var l=e("./range").Range,s=e("./lib/event_emitter").EventEmitter,o=e("./lib/oop");(function(){o.implement(this,s),this.setup=function(){var i=this,n=this.doc,e=this.session;this.selectionBefore=e.selection.toJSON(),e.selection.inMultiSelectMode&&e.selection.toSingleRange(),this.pos=n.createAnchor(this.$pos.row,this.$pos.column);var t=this.pos;t.$insertRight=!0,t.detach(),t.markerId=e.addMarker(new l(t.row,t.column,t.row,t.column+this.length),this.mainClass,null,!1),this.others=[],this.$others.forEach(function(e){var t=n.createAnchor(e.row,e.column);t.$insertRight=!0,t.detach(),i.others.push(t)}),e.setUndoSelect(!1)},this.showOtherMarkers=function(){if(!this.othersActive){var t=this.session,i=this;this.othersActive=!0,this.others.forEach(function(e){e.markerId=t.addMarker(new l(e.row,e.column,e.row,e.column+i.length),i.othersClass,null,!1)})}},this.hideOtherMarkers=function(){if(this.othersActive){this.othersActive=!1;for(var e=0;e<this.others.length;e++)this.session.removeMarker(this.others[e].markerId)}},this.onUpdate=function(e){if(this.$updating)return this.updateAnchors(e);var t=e;if(t.start.row===t.end.row&&t.start.row===this.pos.row){this.$updating=!0;var i="insert"===e.action?t.end.column-t.start.column:t.start.column-t.end.column,n=t.start.column>=this.pos.column&&t.start.column<=this.pos.column+this.length+1,s=t.start.column-this.pos.column;if(this.updateAnchors(e),n&&(this.length+=i),n&&!this.session.$fromUndo)if("insert"===e.action)for(var o=this.others.length-1;0<=o;o--){var r={row:(a=this.others[o]).row,column:a.column+s};this.doc.insertMergedLines(r,e.lines)}else if("remove"===e.action)for(o=this.others.length-1;0<=o;o--){var a;r={row:(a=this.others[o]).row,column:a.column+s};this.doc.remove(new l(r.row,r.column,r.row,r.column-i))}this.$updating=!1,this.updateMarkers()}},this.updateAnchors=function(e){this.pos.onChange(e);for(var t=this.others.length;t--;)this.others[t].onChange(e);this.updateMarkers()},this.updateMarkers=function(){if(!this.$updating){var i=this,n=this.session,e=function(e,t){n.removeMarker(e.markerId),e.markerId=n.addMarker(new l(e.row,e.column,e.row,e.column+i.length),t,null,!1)};e(this.pos,this.mainClass);for(var t=this.others.length;t--;)e(this.others[t],this.othersClass)}},this.onCursorChange=function(e){if(!this.$updating&&this.session){var t=this.session.selection.getCursor();t.row===this.pos.row&&t.column>=this.pos.column&&t.column<=this.pos.column+this.length?(this.showOtherMarkers(),this._emit("cursorEnter",e)):(this.hideOtherMarkers(),this._emit("cursorLeave",e))}},this.detach=function(){this.session.removeMarker(this.pos&&this.pos.markerId),this.hideOtherMarkers(),this.doc.removeEventListener("change",this.$onUpdate),this.session.selection.removeEventListener("changeCursor",this.$onCursorChange),this.session.setUndoSelect(!0),this.session=null},this.cancel=function(){if(-1!==this.$undoStackDepth){for(var e=this.session.getUndoManager(),t=(e.$undoStack||e.$undostack).length-this.$undoStackDepth,i=0;i<t;i++)e.undo(this.session,!0);this.selectionBefore&&this.session.selection.fromJSON(this.selectionBefore)}}}).call(n.prototype),t.PlaceHolder=n}),ace.define("ace/mouse/multi_select_handler",["require","exports","module","ace/lib/event","ace/lib/useragent"],function(e,t,i){function k(e,t){return e.row==t.row&&e.column==t.column}var L=e("../lib/event"),R=e("../lib/useragent");t.onMouseDown=function(e){var t=e.domEvent,i=t.altKey,n=t.shiftKey,s=t.ctrlKey,o=e.getAccelKey(),r=e.getButton();if(s&&R.isMac&&(r=t.button),e.editor.inMultiSelectMode&&2==r)e.editor.textInput.onContextMenu(e.domEvent);else if(s||i||o){if(0===r){var a,l=e.editor,c=l.selection,h=l.inMultiSelectMode,u=e.getDocumentPosition(),d=c.getCursor(),g=e.inSelection()||c.isEmpty()&&k(u,d),f=e.x,m=e.y,p=l.session,v=l.renderer.pixelToScreenCoordinates(f,m),w=v;if(l.$mouseHandler.$enableJumpToDef)s&&i||o&&i?a=n?"block":"add":i&&l.$blockSelectEnabled&&(a="block");else if(o&&!i){if(a="add",!h&&n)return}else i&&l.$blockSelectEnabled&&(a="block");if(a&&R.isMac&&t.ctrlKey&&l.$mouseHandler.cancelContextMenu(),"add"==a){if(!h&&g)return;if(!h){var b=c.toOrientedRange();l.addSelectionMarker(b)}var y=c.rangeList.rangeAtPoint(u);l.inVirtualSelectionMode=!0,n&&(y=null,b=c.ranges[0]||b,l.removeSelectionMarker(b)),l.once("mouseup",function(){var e=c.toOrientedRange();y&&e.isEmpty()&&k(y.cursor,e.cursor)?c.substractPoint(e.cursor):(n?c.substractPoint(b.cursor):b&&(l.removeSelectionMarker(b),c.addRange(b)),c.addRange(e)),l.inVirtualSelectionMode=!1})}else if("block"==a){e.stop(),l.inVirtualSelectionMode=!0;function $(){var e=l.renderer.pixelToScreenCoordinates(f,m),t=p.screenToDocumentPosition(e.row,e.column,e.offsetX);k(w,e)&&k(t,c.lead)||(w=e,l.selection.moveToPosition(t),l.renderer.scrollCursorIntoView(),l.removeSelectionMarkers(S),S=c.rectangularRangeBlock(w,v),l.$mouseHandler.$clickSelection&&1==S.length&&S[0].isEmpty()&&(S[0]=l.$mouseHandler.$clickSelection.clone()),S.forEach(l.addSelectionMarker,l),l.updateSelectionMarkers())}var C,S=[];h&&!o?c.toSingleRange():!h&&o&&(C=c.toOrientedRange(),l.addSelectionMarker(C)),n?v=p.documentToScreenPosition(c.lead):c.moveToPosition(u),w={row:-1,column:-1};var x=$;L.capture(l.container,function(e){f=e.clientX,m=e.clientY},function(e){$(),clearInterval(A),l.removeSelectionMarkers(S),S.length||(S=[c.toOrientedRange()]),C&&(l.removeSelectionMarker(C),c.toSingleRange(C));for(var t=0;t<S.length;t++)c.addRange(S[t]);l.inVirtualSelectionMode=!1,l.$mouseHandler.$clickSelection=null});var A=setInterval(function(){x()},20);return e.preventDefault()}}}else 0===r&&e.editor.inMultiSelectMode&&e.editor.exitMultiSelectMode()}}),ace.define("ace/commands/multi_select_commands",["require","exports","module","ace/keyboard/hash_handler"],function(e,t,i){t.defaultCommands=[{name:"addCursorAbove",description:"Add cursor above",exec:function(e){e.selectMoreLines(-1)},bindKey:{win:"Ctrl-Alt-Up",mac:"Ctrl-Alt-Up"},scrollIntoView:"cursor",readOnly:!0},{name:"addCursorBelow",description:"Add cursor below",exec:function(e){e.selectMoreLines(1)},bindKey:{win:"Ctrl-Alt-Down",mac:"Ctrl-Alt-Down"},scrollIntoView:"cursor",readOnly:!0},{name:"addCursorAboveSkipCurrent",description:"Add cursor above (skip current)",exec:function(e){e.selectMoreLines(-1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Up",mac:"Ctrl-Alt-Shift-Up"},scrollIntoView:"cursor",readOnly:!0},{name:"addCursorBelowSkipCurrent",description:"Add cursor below (skip current)",exec:function(e){e.selectMoreLines(1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Down",mac:"Ctrl-Alt-Shift-Down"},scrollIntoView:"cursor",readOnly:!0},{name:"selectMoreBefore",description:"Select more before",exec:function(e){e.selectMore(-1)},bindKey:{win:"Ctrl-Alt-Left",mac:"Ctrl-Alt-Left"},scrollIntoView:"cursor",readOnly:!0},{name:"selectMoreAfter",description:"Select more after",exec:function(e){e.selectMore(1)},bindKey:{win:"Ctrl-Alt-Right",mac:"Ctrl-Alt-Right"},scrollIntoView:"cursor",readOnly:!0},{name:"selectNextBefore",description:"Select next before",exec:function(e){e.selectMore(-1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Left",mac:"Ctrl-Alt-Shift-Left"},scrollIntoView:"cursor",readOnly:!0},{name:"selectNextAfter",description:"Select next after",exec:function(e){e.selectMore(1,!0)},bindKey:{win:"Ctrl-Alt-Shift-Right",mac:"Ctrl-Alt-Shift-Right"},scrollIntoView:"cursor",readOnly:!0},{name:"splitIntoLines",description:"Split into lines",exec:function(e){e.multiSelect.splitIntoLines()},bindKey:{win:"Ctrl-Alt-L",mac:"Ctrl-Alt-L"},readOnly:!0},{name:"alignCursors",description:"Align cursors",exec:function(e){e.alignCursors()},bindKey:{win:"Ctrl-Alt-A",mac:"Ctrl-Alt-A"},scrollIntoView:"cursor"},{name:"findAll",description:"Find all",exec:function(e){e.findAll()},bindKey:{win:"Ctrl-Alt-K",mac:"Ctrl-Alt-G"},scrollIntoView:"cursor",readOnly:!0}],t.multiSelectCommands=[{name:"singleSelection",description:"Single selection",bindKey:"esc",exec:function(e){e.exitMultiSelectMode()},scrollIntoView:"cursor",readOnly:!0,isAvailable:function(e){return e&&e.inMultiSelectMode}}];var n=e("../keyboard/hash_handler").HashHandler;t.keyboardHandler=new n(t.multiSelectCommands)}),ace.define("ace/multi_select",["require","exports","module","ace/range_list","ace/range","ace/selection","ace/mouse/multi_select_handler","ace/lib/event","ace/lib/lang","ace/commands/multi_select_commands","ace/search","ace/edit_session","ace/editor","ace/config"],function(e,t,i){function n(e){e.$multiselectOnSessionChange||(e.$onAddRange=e.$onAddRange.bind(e),e.$onRemoveRange=e.$onRemoveRange.bind(e),e.$onMultiSelect=e.$onMultiSelect.bind(e),e.$onSingleSelect=e.$onSingleSelect.bind(e),e.$multiselectOnSessionChange=t.onSessionChange.bind(e),e.$checkMultiselectChange=e.$checkMultiselectChange.bind(e),e.$multiselectOnSessionChange(e),e.on("changeSession",e.$multiselectOnSessionChange),e.on("mousedown",o),e.commands.addCommands(a.defaultCommands),function(i){function n(e){s&&(i.renderer.setMouseCursor(""),s=!1)}if(!i.textInput)return;var e=i.textInput.getElement(),s=!1;r.addListener(e,"keydown",function(e){var t=18==e.keyCode&&!(e.ctrlKey||e.shiftKey||e.metaKey);i.$blockSelectEnabled&&t?s||(i.renderer.setMouseCursor("crosshair"),s=!0):s&&n()}),r.addListener(e,"keyup",n),r.addListener(e,"blur",n)}(e))}var s=e("./range_list").RangeList,y=e("./range").Range,m=e("./selection").Selection,o=e("./mouse/multi_select_handler").onMouseDown,r=e("./lib/event"),p=e("./lib/lang"),a=e("./commands/multi_select_commands");t.commands=a.defaultCommands.concat(a.multiSelectCommands);var l=new(e("./search").Search),c=e("./edit_session").EditSession;(function(){this.getSelectionMarkers=function(){return this.$selectionMarkers}}).call(c.prototype),function(){this.ranges=null,this.rangeList=null,this.addRange=function(e,t){if(e){if(!this.inMultiSelectMode&&0===this.rangeCount){var i=this.toOrientedRange();if(this.rangeList.add(i),this.rangeList.add(e),2!=this.rangeList.ranges.length)return this.rangeList.removeAll(),t||this.fromOrientedRange(e);this.rangeList.removeAll(),this.rangeList.add(i),this.$onAddRange(i)}e.cursor||(e.cursor=e.end);var n=this.rangeList.add(e);return this.$onAddRange(e),n.length&&this.$onRemoveRange(n),1<this.rangeCount&&!this.inMultiSelectMode&&(this._signal("multiSelect"),this.inMultiSelectMode=!0,this.session.$undoSelect=!1,this.rangeList.attach(this.session)),t||this.fromOrientedRange(e)}},this.toSingleRange=function(e){e=e||this.ranges[0];var t=this.rangeList.removeAll();t.length&&this.$onRemoveRange(t),e&&this.fromOrientedRange(e)},this.substractPoint=function(e){var t=this.rangeList.substractPoint(e);if(t)return this.$onRemoveRange(t),t[0]},this.mergeOverlappingRanges=function(){var e=this.rangeList.merge();e.length&&this.$onRemoveRange(e)},this.$onAddRange=function(e){this.rangeCount=this.rangeList.ranges.length,this.ranges.unshift(e),this._signal("addRange",{range:e})},this.$onRemoveRange=function(e){if(this.rangeCount=this.rangeList.ranges.length,1==this.rangeCount&&this.inMultiSelectMode){var t=this.rangeList.ranges.pop();e.push(t),this.rangeCount=0}for(var i=e.length;i--;){var n=this.ranges.indexOf(e[i]);this.ranges.splice(n,1)}this._signal("removeRange",{ranges:e}),0===this.rangeCount&&this.inMultiSelectMode&&(this.inMultiSelectMode=!1,this._signal("singleSelect"),this.session.$undoSelect=!0,this.rangeList.detach(this.session)),(t=t||this.ranges[0])&&!t.isEqual(this.getRange())&&this.fromOrientedRange(t)},this.$initRangeList=function(){this.rangeList||(this.rangeList=new s,this.ranges=[],this.rangeCount=0)},this.getAllRanges=function(){return this.rangeCount?this.rangeList.ranges.concat():[this.getRange()]},this.splitIntoLines=function(){if(1<this.rangeCount){var e=this.rangeList.ranges,t=e[e.length-1],i=y.fromPoints(e[0].start,t.end);this.toSingleRange(),this.setSelectionRange(i,t.cursor==t.start)}else{i=this.getRange();var n=this.isBackwards(),s=i.start.row,o=i.end.row;if(s==o){if(n)var r=i.end,a=i.start;else r=i.start,a=i.end;return this.addRange(y.fromPoints(a,a)),void this.addRange(y.fromPoints(r,r))}var l=[],c=this.getLineRange(s,!0);c.start.column=i.start.column,l.push(c);for(var h=s+1;h<o;h++)l.push(this.getLineRange(h,!0));(c=this.getLineRange(o,!0)).end.column=i.end.column,l.push(c),l.forEach(this.addRange,this)}},this.toggleBlockSelection=function(){if(1<this.rangeCount){var e=this.rangeList.ranges,t=e[e.length-1],i=y.fromPoints(e[0].start,t.end);this.toSingleRange(),this.setSelectionRange(i,t.cursor==t.start)}else{var n=this.session.documentToScreenPosition(this.cursor),s=this.session.documentToScreenPosition(this.anchor);this.rectangularRangeBlock(n,s).forEach(this.addRange,this)}},this.rectangularRangeBlock=function(e,t,i){var n=[],s=e.column<t.column;if(s)var o=e.column,r=t.column,a=e.offsetX,l=t.offsetX;else o=t.column,r=e.column,a=t.offsetX,l=e.offsetX;var c,h,u,d=e.row<t.row;if(d)var g=e.row,f=t.row;else g=t.row,f=e.row;o<0&&(o=0),g<0&&(g=0),g==f&&(i=!0);for(var m=g;m<=f;m++){var p=y.fromPoints(this.session.screenToDocumentPosition(m,o,a),this.session.screenToDocumentPosition(m,r,l));if(p.isEmpty()){if(c&&(h=p.end,u=c,h.row==u.row&&h.column==u.column))break;c=p.end}p.cursor=s?p.start:p.end,n.push(p)}if(d&&n.reverse(),!i){for(var v=n.length-1;n[v].isEmpty()&&0<v;)v--;if(0<v)for(var w=0;n[w].isEmpty();)w++;for(var b=v;w<=b;b--)n[b].isEmpty()&&n.splice(b,1)}return n}}.call(m.prototype);var h=e("./editor").Editor;(function(){this.updateSelectionMarkers=function(){this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.addSelectionMarker=function(e){e.cursor||(e.cursor=e.end);var t=this.getSelectionStyle();return e.marker=this.session.addMarker(e,"ace_selection",t),this.session.$selectionMarkers.push(e),this.session.selectionMarkerCount=this.session.$selectionMarkers.length,e},this.removeSelectionMarker=function(e){if(e.marker){this.session.removeMarker(e.marker);var t=this.session.$selectionMarkers.indexOf(e);-1!=t&&this.session.$selectionMarkers.splice(t,1),this.session.selectionMarkerCount=this.session.$selectionMarkers.length}},this.removeSelectionMarkers=function(e){for(var t=this.session.$selectionMarkers,i=e.length;i--;){var n=e[i];if(n.marker){this.session.removeMarker(n.marker);var s=t.indexOf(n);-1!=s&&t.splice(s,1)}}this.session.selectionMarkerCount=t.length},this.$onAddRange=function(e){this.addSelectionMarker(e.range),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onRemoveRange=function(e){this.removeSelectionMarkers(e.ranges),this.renderer.updateCursor(),this.renderer.updateBackMarkers()},this.$onMultiSelect=function(e){this.inMultiSelectMode||(this.inMultiSelectMode=!0,this.setStyle("ace_multiselect"),this.keyBinding.addKeyboardHandler(a.keyboardHandler),this.commands.setDefaultHandler("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers())},this.$onSingleSelect=function(e){this.session.multiSelect.inVirtualMode||(this.inMultiSelectMode=!1,this.unsetStyle("ace_multiselect"),this.keyBinding.removeKeyboardHandler(a.keyboardHandler),this.commands.removeDefaultHandler("exec",this.$onMultiSelectExec),this.renderer.updateCursor(),this.renderer.updateBackMarkers(),this._emit("changeSelection"))},this.$onMultiSelectExec=function(e){var t=e.command,i=e.editor;if(i.multiSelect){if(t.multiSelectAction)n="forEach"==t.multiSelectAction?i.forEachSelection(t,e.args):"forEachLine"==t.multiSelectAction?i.forEachSelection(t,e.args,!0):"single"==t.multiSelectAction?(i.exitMultiSelectMode(),t.exec(i,e.args||{})):t.multiSelectAction(i,e.args||{});else{var n=t.exec(i,e.args||{});i.multiSelect.addRange(i.multiSelect.toOrientedRange()),i.multiSelect.mergeOverlappingRanges()}return n}},this.forEachSelection=function(e,t,i){if(!this.inVirtualSelectionMode){var n,s=i&&i.keepOrder,o=1==i||i&&i.$byLines,r=this.session,a=this.selection,l=a.rangeList,c=(s?a:l).ranges;if(!c.length)return e.exec?e.exec(this,t||{}):e(this,t||{});var h=a._eventRegistry;a._eventRegistry={};var u=new m(r);this.inVirtualSelectionMode=!0;for(var d=c.length;d--;){if(o)for(;0<d&&c[d].start.row==c[d-1].end.row;)d--;u.fromOrientedRange(c[d]),u.index=d,this.selection=r.selection=u;var g=e.exec?e.exec(this,t||{}):e(this,t||{});n||void 0===g||(n=g),u.toOrientedRange(c[d])}u.detach(),this.selection=r.selection=a,this.inVirtualSelectionMode=!1,a._eventRegistry=h,a.mergeOverlappingRanges(),a.ranges[0]&&a.fromOrientedRange(a.ranges[0]);var f=this.renderer.$scrollAnimation;return this.onCursorChange(),this.onSelectionChange(),f&&f.from==f.to&&this.renderer.animateScrolling(f.from),n}},this.exitMultiSelectMode=function(){this.inMultiSelectMode&&!this.inVirtualSelectionMode&&this.multiSelect.toSingleRange()},this.getSelectedText=function(){var e="";if(this.inMultiSelectMode&&!this.inVirtualSelectionMode){for(var t=this.multiSelect.rangeList.ranges,i=[],n=0;n<t.length;n++)i.push(this.session.getTextRange(t[n]));var s=this.session.getDocument().getNewLineCharacter();(e=i.join(s)).length==(i.length-1)*s.length&&(e="")}else this.selection.isEmpty()||(e=this.session.getTextRange(this.getSelectionRange()));return e},this.$checkMultiselectChange=function(e,t){if(this.inMultiSelectMode&&!this.inVirtualSelectionMode){var i=this.multiSelect.ranges[0];if(this.multiSelect.isEmpty()&&t==this.multiSelect.anchor)return;var n=t==this.multiSelect.anchor?i.cursor==i.start?i.end:i.start:i.cursor;n.row!=t.row||this.session.$clipPositionToDocument(n.row,n.column).column!=t.column?this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange()):this.multiSelect.mergeOverlappingRanges()}},this.findAll=function(e,t,i){if((t=t||{}).needle=e||t.needle,null==t.needle){var n=this.selection.isEmpty()?this.selection.getWordRange():this.selection.getRange();t.needle=this.session.getTextRange(n)}this.$search.set(t);var s=this.$search.findAll(this.session);if(!s.length)return 0;var o=this.multiSelect;i||o.toSingleRange(s[0]);for(var r=s.length;r--;)o.addRange(s[r],!0);return n&&o.rangeList.rangeAtPoint(n.start)&&o.addRange(n,!0),s.length},this.selectMoreLines=function(e,t){var i=this.selection.toOrientedRange(),n=i.cursor==i.end,s=this.session.documentToScreenPosition(i.cursor);this.selection.$desiredColumn&&(s.column=this.selection.$desiredColumn);var o,r=this.session.screenToDocumentPosition(s.row+e,s.column);if(i.isEmpty())l=r;else var a=this.session.documentToScreenPosition(n?i.end:i.start),l=this.session.screenToDocumentPosition(a.row+e,a.column);n?(o=y.fromPoints(r,l)).cursor=o.start:(o=y.fromPoints(l,r)).cursor=o.end;if(o.desiredColumn=s.column,this.selection.inMultiSelectMode){if(t)var c=i.cursor}else this.selection.addRange(i);this.selection.addRange(o),c&&this.selection.substractPoint(c)},this.transposeSelections=function(e){for(var t=this.session,i=t.multiSelect,n=i.ranges,s=n.length;s--;){if((a=n[s]).isEmpty()){var o=t.getWordRange(a.start.row,a.start.column);a.start.row=o.start.row,a.start.column=o.start.column,a.end.row=o.end.row,a.end.column=o.end.column}}i.mergeOverlappingRanges();var r=[];for(s=n.length;s--;){var a=n[s];r.unshift(t.getTextRange(a))}e<0?r.unshift(r.pop()):r.push(r.shift());for(s=n.length;s--;){o=(a=n[s]).clone();t.replace(a,r[s]),a.start.row=o.start.row,a.start.column=o.start.column}i.fromOrientedRange(i.ranges[0])},this.selectMore=function(e,t,i){var n=this.session,s=n.multiSelect.toOrientedRange();if(!s.isEmpty()||((s=n.getWordRange(s.start.row,s.start.column)).cursor=-1==e?s.start:s.end,this.multiSelect.addRange(s),!i)){var o=n.getTextRange(s),r=function(e,t,i){return l.$options.wrap=!0,l.$options.needle=t,l.$options.backwards=-1==i,l.find(e)}(n,o,e);r&&(r.cursor=-1==e?r.start:r.end,this.session.unfold(r),this.multiSelect.addRange(r),this.renderer.scrollCursorIntoView(null,.5)),t&&this.multiSelect.substractPoint(s.cursor)}},this.alignCursors=function(){var o=this.session,t=o.multiSelect,e=t.ranges,i=-1,n=e.filter(function(e){if(e.cursor.row==i)return!0;i=e.cursor.row});if(e.length&&n.length!=e.length-1){n.forEach(function(e){t.substractPoint(e.cursor)});var r=0,a=1/0,l=e.map(function(e){var t=e.cursor,i=o.getLine(t.row).substr(t.column).search(/\S/g);return-1==i&&(i=0),t.column>r&&(r=t.column),i<a&&(a=i),i});e.forEach(function(e,t){var i=e.cursor,n=r-i.column,s=l[t]-a;s<n?o.insert(i,p.stringRepeat(" ",n-s)):o.remove(new y(i.row,i.column,i.row,i.column-n+s)),e.start.column=e.end.column=r,e.start.row=e.end.row=i.row,e.cursor=e.end}),t.fromOrientedRange(e[0]),this.renderer.updateCursor(),this.renderer.updateBackMarkers()}else{var s=this.selection.getRange(),c=s.start.row,h=s.end.row,u=c==h;if(u){for(var d,g=this.session.getLength();d=this.session.getLine(h),/[=:]/.test(d)&&++h<g;);for(;d=this.session.getLine(c),/[=:]/.test(d)&&0<--c;);c<0&&(c=0),g<=h&&(h=g-1)}var f=this.session.removeFullLines(c,h);f=this.$reAlignText(f,u),this.session.insert({row:c,column:0},f.join("\n")+"\n"),u||(s.start.column=0,s.end.column=f[f.length-1].length),this.selection.setRange(s)}},this.$reAlignText=function(e,t){function i(e){return p.stringRepeat(" ",e)}function n(e){return e[2]?i(s)+e[2]+i(o-e[2].length+r)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]}var s,o,r,a=!0,l=!0;return e.map(function(e){var t=e.match(/(\s*)(.*?)(\s*)([=:].*)/);return t?(null==s?(s=t[1].length,o=t[2].length,r=t[3].length):(s+o+r!=t[1].length+t[2].length+t[3].length&&(l=!1),s!=t[1].length&&(a=!1),s>t[1].length&&(s=t[1].length),o<t[2].length&&(o=t[2].length),r>t[3].length&&(r=t[3].length)),t):[e]}).map(t?n:a?l?function(e){return e[2]?i(s+o-e[2].length)+e[2]+i(r)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]}:n:function(e){return e[2]?i(s)+e[2]+i(r)+e[4].replace(/^([=:])\s+/,"$1 "):e[0]})}}).call(h.prototype),t.onSessionChange=function(e){var t=e.session;t&&!t.multiSelect&&(t.$selectionMarkers=[],t.selection.$initRangeList(),t.multiSelect=t.selection),this.multiSelect=t&&t.multiSelect;var i=e.oldSession;i&&(i.multiSelect.off("addRange",this.$onAddRange),i.multiSelect.off("removeRange",this.$onRemoveRange),i.multiSelect.off("multiSelect",this.$onMultiSelect),i.multiSelect.off("singleSelect",this.$onSingleSelect),i.multiSelect.lead.off("change",this.$checkMultiselectChange),i.multiSelect.anchor.off("change",this.$checkMultiselectChange)),t&&(t.multiSelect.on("addRange",this.$onAddRange),t.multiSelect.on("removeRange",this.$onRemoveRange),t.multiSelect.on("multiSelect",this.$onMultiSelect),t.multiSelect.on("singleSelect",this.$onSingleSelect),t.multiSelect.lead.on("change",this.$checkMultiselectChange),t.multiSelect.anchor.on("change",this.$checkMultiselectChange)),t&&this.inMultiSelectMode!=t.selection.inMultiSelectMode&&(t.selection.inMultiSelectMode?this.$onMultiSelect():this.$onSingleSelect())},t.MultiSelect=n,e("./config").defineOptions(h.prototype,"editor",{enableMultiselect:{set:function(e){n(this),e?(this.on("changeSession",this.$multiselectOnSessionChange),this.on("mousedown",o)):(this.off("changeSession",this.$multiselectOnSessionChange),this.off("mousedown",o))},value:!0},enableBlockSelect:{set:function(e){this.$blockSelectEnabled=e},value:!0}})}),ace.define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(e,t,i){"use strict";var g=e("../../range").Range,n=t.FoldMode=function(){};(function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(e,t,i){var n=e.getLine(i);return this.foldingStartMarker.test(n)?"start":"markbeginend"==t&&this.foldingStopMarker&&this.foldingStopMarker.test(n)?"end":""},this.getFoldWidgetRange=function(e,t,i){return null},this.indentationBlock=function(e,t,i){var n=/\S/,s=e.getLine(t),o=s.search(n);if(-1!=o){for(var r=i||s.length,a=e.getLength(),l=t,c=t;++t<a;){var h=e.getLine(t).search(n);if(-1!=h){if(h<=o){var u=e.getTokenAt(t,0);if(!u||"string"!==u.type)break}c=t}}if(l<c){var d=e.getLine(c).length;return new g(l,r,c,d)}}},this.openingBracketBlock=function(e,t,i,n,s){var o={row:i,column:n+1},r=e.$findClosingBracket(t,o,s);if(r){var a=e.foldWidgets[r.row];return null==a&&(a=e.getFoldWidget(r.row)),"start"==a&&r.row>o.row&&(r.row--,r.column=e.getLine(r.row).length),g.fromPoints(o,r)}},this.closingBracketBlock=function(e,t,i,n,s){var o={row:i,column:n},r=e.$findOpeningBracket(t,o);if(r)return r.column++,o.column--,g.fromPoints(r,o)}}).call(n.prototype)}),ace.define("ace/theme/textmate",["require","exports","module","ace/lib/dom"],function(e,t,i){"use strict";t.isDark=!1,t.cssClass="ace-tm",t.cssText='.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;color: black;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}',t.$id="ace/theme/textmate",e("../lib/dom").importCssString(t.cssText,t.cssClass)}),ace.define("ace/line_widgets",["require","exports","module","ace/lib/oop","ace/lib/dom","ace/range"],function(e,t,i){"use strict";function n(e){this.session=e,(this.session.widgetManager=this).session.getRowLength=this.getRowLength,this.session.$getWidgetScreenLength=this.$getWidgetScreenLength,this.updateOnChange=this.updateOnChange.bind(this),this.renderWidgets=this.renderWidgets.bind(this),this.measureWidgets=this.measureWidgets.bind(this),this.session._changedWidgets=[],this.$onChangeEditor=this.$onChangeEditor.bind(this),this.session.on("change",this.updateOnChange),this.session.on("changeFold",this.updateOnFold),this.session.on("changeEditor",this.$onChangeEditor)}e("./lib/oop");var o=e("./lib/dom");e("./range").Range;(function(){this.getRowLength=function(e){var t;return t=this.lineWidgets&&this.lineWidgets[e]&&this.lineWidgets[e].rowCount||0,this.$useWrapMode&&this.$wrapData[e]?this.$wrapData[e].length+1+t:1+t},this.$getWidgetScreenLength=function(){var t=0;return this.lineWidgets.forEach(function(e){e&&e.rowCount&&!e.hidden&&(t+=e.rowCount)}),t},this.$onChangeEditor=function(e){this.attach(e.editor)},this.attach=function(e){e&&e.widgetManager&&e.widgetManager!=this&&e.widgetManager.detach(),this.editor!=e&&(this.detach(),(this.editor=e)&&(e.widgetManager=this,e.renderer.on("beforeRender",this.measureWidgets),e.renderer.on("afterRender",this.renderWidgets)))},this.detach=function(e){var t=this.editor;if(t){this.editor=null,t.widgetManager=null,t.renderer.off("beforeRender",this.measureWidgets),t.renderer.off("afterRender",this.renderWidgets);var i=this.session.lineWidgets;i&&i.forEach(function(e){e&&e.el&&e.el.parentNode&&(e._inDocument=!1,e.el.parentNode.removeChild(e.el))})}},this.updateOnFold=function(e,t){var i=t.lineWidgets;if(i&&e.action){for(var n=e.data,s=n.start.row,o=n.end.row,r="add"==e.action,a=s+1;a<o;a++)i[a]&&(i[a].hidden=r);i[o]&&(r?i[s]?i[o].hidden=r:i[s]=i[o]:(i[s]==i[o]&&(i[s]=void 0),i[o].hidden=r))}},this.updateOnChange=function(e){var t=this.session.lineWidgets;if(t){var i=e.start.row,n=e.end.row-i;if(0!=n)if("remove"==e.action){t.splice(i+1,n).forEach(function(e){e&&this.removeLineWidget(e)},this),this.$updateRows()}else{var s=new Array(n);s.unshift(i,0),t.splice.apply(t,s),this.$updateRows()}}},this.$updateRows=function(){var e=this.session.lineWidgets;if(e){var i=!0;e.forEach(function(e,t){if(e)for(i=!1,e.row=t;e.$oldWidget;)e.$oldWidget.row=t,e=e.$oldWidget}),i&&(this.session.lineWidgets=null)}},this.addLineWidget=function(e){this.session.lineWidgets||(this.session.lineWidgets=new Array(this.session.getLength()));var t=this.session.lineWidgets[e.row];!t||(e.$oldWidget=t).el&&t.el.parentNode&&(t.el.parentNode.removeChild(t.el),t._inDocument=!1),(this.session.lineWidgets[e.row]=e).session=this.session;var i=this.editor.renderer;e.html&&!e.el&&(e.el=o.createElement("div"),e.el.innerHTML=e.html),e.el&&(o.addCssClass(e.el,"ace_lineWidgetContainer"),e.el.style.position="absolute",e.el.style.zIndex=5,i.container.appendChild(e.el),e._inDocument=!0),e.coverGutter||(e.el.style.zIndex=3),null==e.pixelHeight&&(e.pixelHeight=e.el.offsetHeight),null==e.rowCount&&(e.rowCount=e.pixelHeight/i.layerConfig.lineHeight);var n=this.session.getFoldAt(e.row,0);if(e.$fold=n){var s=this.session.lineWidgets;e.row!=n.end.row||s[n.start.row]?e.hidden=!0:s[n.start.row]=e}return this.session._emit("changeFold",{data:{start:{row:e.row}}}),this.$updateRows(),this.renderWidgets(null,i),this.onWidgetChanged(e),e},this.removeLineWidget=function(e){if(e._inDocument=!1,e.session=null,e.el&&e.el.parentNode&&e.el.parentNode.removeChild(e.el),e.editor&&e.editor.destroy)try{e.editor.destroy()}catch(e){}if(this.session.lineWidgets){var t=this.session.lineWidgets[e.row];if(t==e)this.session.lineWidgets[e.row]=e.$oldWidget,e.$oldWidget&&this.onWidgetChanged(e.$oldWidget);else for(;t;){if(t.$oldWidget==e){t.$oldWidget=e.$oldWidget;break}t=t.$oldWidget}}this.session._emit("changeFold",{data:{start:{row:e.row}}}),this.$updateRows()},this.getWidgetsAtRow=function(e){for(var t=this.session.lineWidgets,i=t&&t[e],n=[];i;)n.push(i),i=i.$oldWidget;return n},this.onWidgetChanged=function(e){this.session._changedWidgets.push(e),this.editor&&this.editor.renderer.updateFull()},this.measureWidgets=function(e,t){var i=this.session._changedWidgets,n=t.layerConfig;if(i&&i.length){for(var s=1/0,o=0;o<i.length;o++){var r=i[o];if(r&&r.el&&r.session==this.session){if(!r._inDocument){if(this.session.lineWidgets[r.row]!=r)continue;r._inDocument=!0,t.container.appendChild(r.el)}r.h=r.el.offsetHeight,r.fixedWidth||(r.w=r.el.offsetWidth,r.screenWidth=Math.ceil(r.w/n.characterWidth));var a=r.h/n.lineHeight;r.coverLine&&((a-=this.session.getRowLineCount(r.row))<0&&(a=0)),r.rowCount!=a&&(r.rowCount=a,r.row<s&&(s=r.row))}}s!=1/0&&(this.session._emit("changeFold",{data:{start:{row:s}}}),this.session.lineWidgetWidth=null),this.session._changedWidgets=[]}},this.renderWidgets=function(e,t){var i=t.layerConfig,n=this.session.lineWidgets;if(n){for(var s=Math.min(this.firstRow,i.firstRow),o=Math.max(this.lastRow,i.lastRow,n.length);0<s&&!n[s];)s--;this.firstRow=i.firstRow,this.lastRow=i.lastRow,t.$cursorLayer.config=i;for(var r=s;r<=o;r++){var a=n[r];if(a&&a.el)if(a.hidden)a.el.style.top=-100-(a.pixelHeight||0)+"px";else{a._inDocument||(a._inDocument=!0,t.container.appendChild(a.el));var l=t.$cursorLayer.getPixelPosition({row:r,column:0},!0).top;a.coverLine||(l+=i.lineHeight*this.session.getRowLineCount(a.row)),a.el.style.top=l-i.offset+"px";var c=a.coverGutter?0:t.gutterWidth;a.fixedWidth||(c-=t.scrollLeft),a.el.style.left=c+"px",a.fullWidth&&a.screenWidth&&(a.el.style.minWidth=i.width+2*i.padding+"px"),a.fixedWidth?a.el.style.right=t.scrollBar.getWidth()+"px":a.el.style.right=""}}}}}).call(n.prototype),t.LineWidgets=n}),ace.define("ace/ext/error_marker",["require","exports","module","ace/line_widgets","ace/lib/dom","ace/range"],function(e,t,i){"use strict";function f(e,t,i){var n=e.getAnnotations().sort(a.comparePoints);if(n.length){var s=function(e,t,i){for(var n=0,s=e.length-1;n<=s;){var o=n+s>>1,r=i(t,e[o]);if(0<r)n=1+o;else{if(!(r<0))return o;s=o-1}}return-(n+1)}(n,{row:t,column:-1},a.comparePoints);s<0&&(s=-s-1),s>=n.length?s=0<i?0:n.length-1:0===s&&i<0&&(s=n.length-1);var o=n[s];if(o&&i){if(o.row===t){for(;(o=n[s+=i])&&o.row===t;);if(!o)return n.slice()}var r=[];for(t=o.row;r[i<0?"unshift":"push"](o),(o=n[s+=i])&&o.row==t;);return r.length&&r}}}var m=e("../line_widgets").LineWidgets,p=e("../lib/dom"),a=e("../range").Range;t.showErrorMarker=function(e,t){var i=e.session;i.widgetManager||(i.widgetManager=new m(i),i.widgetManager.attach(e));var n=e.getCursorPosition(),s=n.row,o=i.widgetManager.getWidgetsAtRow(s).filter(function(e){return"errorMarker"==e.type})[0];o?o.destroy():s-=t;var r,a=f(i,s,t);if(a){var l=a[0];n.column=(l.pos&&"number"!=typeof l.column?l.pos.sc:l.column)||0,n.row=l.row,r=e.renderer.$gutterLayer.$annotations[n.row]}else{if(o)return;r={text:["Looks good!"],className:"ace_ok"}}e.session.unfold(n.row),e.selection.moveToPosition(n);var c={row:n.row,fixedWidth:!0,coverGutter:!0,el:p.createElement("div"),type:"errorMarker"},h=c.el.appendChild(p.createElement("div")),u=c.el.appendChild(p.createElement("div"));u.className="error_widget_arrow "+r.className;var d=e.renderer.$cursorLayer.getPixelPosition(n).left;u.style.left=d+e.renderer.gutterWidth-5+"px",c.el.className="error_widget_wrapper",h.className="error_widget "+r.className,h.innerHTML=r.text.join("<br>"),h.appendChild(p.createElement("div"));function g(e,t,i){if(0===t&&("esc"===i||"return"===i))return c.destroy(),{command:"null"}}c.destroy=function(){e.$mouseHandler.isMousePressed||(e.keyBinding.removeKeyboardHandler(g),i.widgetManager.removeLineWidget(c),e.off("changeSelection",c.destroy),e.off("changeSession",c.destroy),e.off("mouseup",c.destroy),e.off("change",c.destroy))},e.keyBinding.addKeyboardHandler(g),e.on("changeSelection",c.destroy),e.on("changeSession",c.destroy),e.on("mouseup",c.destroy),e.on("change",c.destroy),e.session.widgetManager.addLineWidget(c),c.el.onmousedown=e.focus.bind(e),e.renderer.scrollCursorIntoView(null,.5,{bottom:c.el.offsetHeight})},p.importCssString("    .error_widget_wrapper {        background: inherit;        color: inherit;        border:none    }    .error_widget {        border-top: solid 2px;        border-bottom: solid 2px;        margin: 5px 0;        padding: 10px 40px;        white-space: pre-wrap;    }    .error_widget.ace_error, .error_widget_arrow.ace_error{        border-color: #ff5a5a    }    .error_widget.ace_warning, .error_widget_arrow.ace_warning{        border-color: #F1D817    }    .error_widget.ace_info, .error_widget_arrow.ace_info{        border-color: #5a5a5a    }    .error_widget.ace_ok, .error_widget_arrow.ace_ok{        border-color: #5aaa5a    }    .error_widget_arrow {        position: absolute;        border: solid 5px;        border-top-color: transparent!important;        border-right-color: transparent!important;        border-left-color: transparent!important;        top: -5px;    }","")}),ace.define("ace/ace",["require","exports","module","ace/lib/fixoldbrowsers","ace/lib/dom","ace/lib/event","ace/range","ace/editor","ace/edit_session","ace/undomanager","ace/virtual_renderer","ace/worker/worker_client","ace/keyboard/hash_handler","ace/placeholder","ace/multi_select","ace/mode/folding/fold_mode","ace/theme/textmate","ace/ext/error_marker","ace/config"],function(e,l,t){"use strict";e("./lib/fixoldbrowsers");var c=e("./lib/dom"),h=e("./lib/event"),i=e("./range").Range,u=e("./editor").Editor,n=e("./edit_session").EditSession,s=e("./undomanager").UndoManager,d=e("./virtual_renderer").VirtualRenderer;e("./worker/worker_client"),e("./keyboard/hash_handler"),e("./placeholder"),e("./multi_select"),e("./mode/folding/fold_mode"),e("./theme/textmate"),e("./ext/error_marker"),l.config=e("./config"),l.require=e,l.define=b(1),l.edit=function(e,t){if("string"==typeof e){var i=e;if(!(e=document.getElementById(i)))throw new Error("ace.edit can't find div #"+i)}if(e&&e.env&&e.env.editor instanceof u)return e.env.editor;var n="";if(e&&/input|textarea/i.test(e.tagName)){var s=e;n=s.value,e=c.createElement("pre"),s.parentNode.replaceChild(e,s)}else e&&(n=e.textContent,e.innerHTML="");var o=l.createEditSession(n),r=new u(new d(e),o,t),a={document:o,editor:r,onResize:r.resize.bind(r,null)};return s&&(a.textarea=s),h.addListener(window,"resize",a.onResize),r.on("destroy",function(){h.removeListener(window,"resize",a.onResize),a.editor.container.env=null}),r.container.env=r.env=a,r},l.createEditSession=function(e,t){var i=new n(e,t);return i.setUndoManager(new s),i},l.Range=i,l.Editor=u,l.EditSession=n,l.UndoManager=s,l.VirtualRenderer=d,l.version=l.config.version}),ace.require(["ace/ace"],function(e){for(var t in e&&(e.config.init(!0),e.define=ace.define),window.ace||(window.ace=e),e)e.hasOwnProperty(t)&&(window.ace[t]=e[t]);window.ace.default=window.ace,i&&(i.exports=window.ace)})}).call(this,b(0)(e))},function(e,t,i){(function(t){ace.define("ace/theme/iplastic",["require","exports","module","ace/lib/dom"],function(e,t,i){t.isDark=!1,t.cssClass="ace-iplastic",t.cssText=".ace-iplastic .ace_gutter {background: #dddddd;color: #666666}.ace-iplastic .ace_print-margin {width: 1px;background: #bbbbbb}.ace-iplastic {background-color: #eeeeee;color: #333333}.ace-iplastic .ace_cursor {color: #333}.ace-iplastic .ace_marker-layer .ace_selection {background: #BAD6FD;}.ace-iplastic.ace_multiselect .ace_selection.ace_start {border-radius: 4px}.ace-iplastic .ace_marker-layer .ace_step {background: #444444}.ace-iplastic .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid #49483E;background: #FFF799}.ace-iplastic .ace_marker-layer .ace_active-line {background: #e5e5e5}.ace-iplastic .ace_gutter-active-line {background-color: #eeeeee}.ace-iplastic .ace_marker-layer .ace_selected-word {border: 1px solid #555555;border-radius:4px}.ace-iplastic .ace_invisible {color: #999999}.ace-iplastic .ace_entity.ace_name.ace_tag,.ace-iplastic .ace_keyword,.ace-iplastic .ace_meta.ace_tag,.ace-iplastic .ace_storage {color: #0000FF}.ace-iplastic .ace_punctuation,.ace-iplastic .ace_punctuation.ace_tag {color: #000}.ace-iplastic .ace_constant {color: #333333;font-weight: 700}.ace-iplastic .ace_constant.ace_character,.ace-iplastic .ace_constant.ace_language,.ace-iplastic .ace_constant.ace_numeric,.ace-iplastic .ace_constant.ace_other {color: #0066FF;font-weight: 700}.ace-iplastic .ace_constant.ace_numeric{font-weight: 100}.ace-iplastic .ace_invalid {color: #F8F8F0;background-color: #F92672}.ace-iplastic .ace_invalid.ace_deprecated {color: #F8F8F0;background-color: #AE81FF}.ace-iplastic .ace_support.ace_constant,.ace-iplastic .ace_support.ace_function {color: #333333;font-weight: 700}.ace-iplastic .ace_fold {background-color: #464646;border-color: #F8F8F2}.ace-iplastic .ace_storage.ace_type,.ace-iplastic .ace_support.ace_class,.ace-iplastic .ace_support.ace_type {color: #3333fc;font-weight: 700}.ace-iplastic .ace_entity.ace_name.ace_function,.ace-iplastic .ace_entity.ace_other,.ace-iplastic .ace_entity.ace_other.ace_attribute-name,.ace-iplastic .ace_variable {color: #3366cc;font-style: italic}.ace-iplastic .ace_variable.ace_parameter {font-style: italic;color: #2469E0}.ace-iplastic .ace_string {color: #a55f03}.ace-iplastic .ace_comment {color: #777777;font-style: italic}.ace-iplastic .ace_fold-widget {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==);}.ace-iplastic .ace_indent-guide {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAABlJREFUeNpi+P//PwMzMzPzfwAAAAD//wMAGRsECSML/RIAAAAASUVORK5CYII=) right repeat-y}",e("../lib/dom").importCssString(t.cssText,t.cssClass)}),ace.require(["ace/theme/iplastic"],function(e){t&&(t.exports=e)})}).call(this,i(0)(e))},function(e,t,i){(function(t){ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,i){"use strict";var n=e("../lib/oop"),s=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},o.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};n.inherits(o,s),o.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},o.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},o.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=o}),ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,i){"use strict";function n(e){return[{token:"comment",regex:/\/\*/,next:[r.getTagRule(),{token:"comment",regex:"\\*\\/",next:e||"pop"},{defaultToken:"comment",caseInsensitive:!0}]},{token:"comment",regex:"\\/\\/",next:[r.getTagRule(),{token:"comment",regex:"$|^",next:e||"pop"},{defaultToken:"comment",caseInsensitive:!0}]}]}function s(e){var t=this.createKeywordMapper({"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},"identifier"),i="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)";this.$rules={no_regex:[r.getStartRule("doc-start"),n("no_regex"),{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator"],regex:"("+l+")(\\.)(prototype)(\\.)("+l+")(\\s*)(=)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+l+")(\\.)("+l+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+l+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+l+")(\\.)("+l+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+l+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+l+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:"from(?=\\s*('|\"))"},{token:"keyword",regex:"(?:case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void)\\b",next:"start"},{token:["support.constant"],regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/},{token:t,regex:l},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"storage.type",regex:/=>/,next:"start"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+l+")(\\.)("+l+")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:l},{regex:"",token:"empty",next:"no_regex"}],start:[r.getStartRule("doc-start"),n("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],function_arguments:[{token:"variable.parameter",regex:l},{token:"punctuation.operator",regex:"[, ]+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],qqstring:[{token:"constant.language.escape",regex:i},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:i},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},e&&e.noES6||(this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(e,t,i){if(this.next="{"==e?this.nextState:"","{"==e&&i.length)i.unshift("start",t);else if("}"==e&&i.length&&(i.shift(),this.next=i.shift(),-1!=this.next.indexOf("string")||-1!=this.next.indexOf("jsx")))return"paren.quasi.end";return"{"==e?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:i},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]}),e&&0==e.jsx||function(){var e=l.replace("\\d","\\d\\-"),t={onMatch:function(e,t,i){var n="/"==e.charAt(1)?2:1;return 1==n?(t!=this.nextState?i.unshift(this.next,this.nextState,0):i.unshift(this.next),i[2]++):2==n&&t==this.nextState&&(i[1]--,(!i[1]||i[1]<0)&&(i.shift(),i.shift())),[{type:"meta.tag.punctuation."+(1==n?"":"end-")+"tag-open.xml",value:e.slice(0,n)},{type:"meta.tag.tag-name.xml",value:e.substr(n)}]},regex:"</?"+e,next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(t);var i={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[i,t,{include:"reference"},{defaultToken:"string"}],this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(e,t,i){return t==i[0]&&i.shift(),2==e.length&&(i[0]==this.nextState&&i[1]--,(!i[1]||i[1]<0)&&i.splice(0,2)),this.next=i[0]||"start",[{type:this.token,value:e}]},nextState:"jsx"},i,n("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:e},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},t],this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}.call(this)),this.embedRules(r,"doc-",[r.getEndRule("no_regex")]),this.normalizeRules()}var o=e("../lib/oop"),r=e("./doc_comment_highlight_rules").DocCommentHighlightRules,a=e("./text_highlight_rules").TextHighlightRules,l="[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*";o.inherits(s,a),t.JavaScriptHighlightRules=s}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,i){"use strict";function n(){}var r=e("../range").Range;(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var i=e.getLine(t).match(/^(\s*\})/);if(!i)return 0;var n=i[1].length,s=e.findMatchingBracket({row:t,column:n});if(!s||s.row==t)return 0;var o=this.$getIndent(e.getLine(s.row));e.replace(new r(t,0,t,n-1),o)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(n.prototype),t.MatchingBraceOutdent=n}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,i){"use strict";var n=e("../../lib/oop"),h=e("../../range").Range,s=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(o,s),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,i){var n=e.getLine(i);if(this.singleLineBlockCommentRe.test(n)&&!this.startRegionRe.test(n)&&!this.tripleStarBlockCommentRe.test(n))return"";var s=this._getFoldWidgetBase(e,t,i);return!s&&this.startRegionRe.test(n)?"start":s},this.getFoldWidgetRange=function(e,t,i,n){var s,o=e.getLine(i);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,i);if(s=o.match(this.foldingStartMarker)){var r=s.index;if(s[1])return this.openingBracketBlock(e,s[1],i,r);var a=e.getCommentFoldRange(i,r+s[0].length,1);return a&&!a.isMultiLine()&&(n?a=this.getSectionRange(e,i):"all"!=t&&(a=null)),a}if("markbegin"!==t&&(s=o.match(this.foldingStopMarker))){r=s.index+s[0].length;return s[1]?this.closingBracketBlock(e,s[1],i,r):e.getCommentFoldRange(i,r,-1)}},this.getSectionRange=function(e,t){for(var i=e.getLine(t),n=i.search(/\S/),s=t,o=i.length,r=t+=1,a=e.getLength();++t<a;){var l=(i=e.getLine(t)).search(/\S/);if(-1!==l){if(l<n)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=s)break;if(c.isMultiLine())t=c.end.row;else if(n==l)break}r=t}}return new h(s,o,r,e.getLine(r).length)},this.getCommentRegionBlock=function(e,t,i){for(var n=t.search(/\s*$/),s=e.getLength(),o=i,r=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,a=1;++i<s;){t=e.getLine(i);var l=r.exec(t);if(l&&(l[1]?a--:a++,!a))break}if(o<i)return new h(o,n,i,t.length)}}.call(o.prototype)}),ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t,i){"use strict";function n(){this.HighlightRules=r,this.$outdent=new a,this.$behaviour=new c,this.foldingRules=new h}var s=e("../lib/oop"),o=e("./text").Mode,r=e("./javascript_highlight_rules").JavaScriptHighlightRules,a=e("./matching_brace_outdent").MatchingBraceOutdent,l=e("../worker/worker_client").WorkerClient,c=e("./behaviour/cstyle").CstyleBehaviour,h=e("./folding/cstyle").FoldMode;s.inherits(n,o),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$quotes={'"':'"',"'":"'","`":"`"},this.getNextLineIndent=function(e,t,i){var n=this.$getIndent(t),s=this.getTokenizer().getLineTokens(t,e),o=s.tokens,r=s.state;if(o.length&&"comment"==o[o.length-1].type)return n;if("start"==e||"no_regex"==e)(a=t.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/))&&(n+=i);else if("doc-start"==e){if("start"==r||"no_regex"==r)return"";var a;(a=t.match(/^\s*(\/?)\*/))&&(a[1]&&(n+=" "),n+="* ")}return n},this.checkOutdent=function(e,t,i){return this.$outdent.checkOutdent(t,i)},this.autoOutdent=function(e,t,i){this.$outdent.autoOutdent(t,i)},this.createWorker=function(t){var e=new l(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return e.attachToDocument(t.getDocument()),e.on("annotate",function(e){t.setAnnotations(e.data)}),e.on("terminate",function(){t.clearAnnotations()}),e},this.$id="ace/mode/javascript"}.call(n.prototype),t.Mode=n}),ace.require(["ace/mode/javascript"],function(e){t&&(t.exports=e)})}).call(this,i(0)(e))}],s.c=o,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=3)).default;function s(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}var n,o});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ractiveAceEditor = __webpack_require__(61);

var _ractiveAceEditor2 = _interopRequireDefault(_ractiveAceEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JSZip = __webpack_require__(11);
exports.default = Ractive.extend({
	components: {
		ace: _ractiveAceEditor2.default
	},
	css: " .editor-menubar {position: absolute;top: 0px;left: 0px;right: 0px;height: 40px;box-sizing: border-box;border-bottom: 1px solid #eaeaea;background-color: #f2f3f3;} .editor-tabheads {position: absolute;top: 40px;left: 233px;right: 0px;height: 33px;box-sizing: border-box;border-bottom: 1px solid #eaeaea;} ",
	template: { v: 4, t: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "height: 600px;border: 1px solid #545b64;position: relative;", g: 1 }], f: [{ t: 7, e: "div", m: [{ t: 13, n: "class", f: "editor-menubar", g: 1 }] }, " ", { t: 7, e: "div", m: [{ t: 13, n: "style", f: "position: absolute;top: 40px;left: 0px;bottom: 0px;width: 233px;border-right: 1px solid #eaeaea;", g: 1 }], f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "text-align: center;margin-top: 280px;", g: 1 }], f: ["Folder preview", { t: 7, e: "br" }, " not implemented."] }] }, " ", { t: 7, e: "div", m: [{ t: 13, n: "class", f: "editor-tabheads", g: 1 }], f: [] }, " ", { t: 7, e: "div", m: [{ n: "style", f: ["position: absolute;top: 73px;left: 233px;right: 0px; ", { t: 4, f: ["bottom: 280px;"], n: 50, r: "editor_result_open" }, { t: 4, f: ["bottom: 0px;"], n: 51, l: 1 }], t: 13 }], f: [{ t: 4, f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "text-align: center;margin-top: 280px;", g: 1 }], f: ["Downloading and unpacking zip locally ", { t: 7, e: "div", f: [] }] }], n: 50, x: { r: ["indexjs_content"], s: "_0===false" } }, { t: 4, f: [{ t: 7, e: "ace", m: [{ t: 13, n: "style", f: "position: absolute;top: 0px;left: 0px;right: 0px;bottom: 0px;", g: 1 }, { t: 13, n: "class", f: "", g: 1 }, { n: "font-size", f: [{ t: 2, x: { r: [], s: "13" } }], t: 13 }, { n: "show-invisibles", f: [{ t: 2, x: { r: [], s: "false" } }], t: 13 }, { n: "show-indent-guides", f: [{ t: 2, x: { r: [], s: "false" } }], t: 13 }, { n: "read-only", f: [{ t: 2, r: "busy" }], t: 13 }, { n: "value", f: [{ t: 2, r: "indexjs_content" }], t: 13 }] }], n: 51, l: 1 }] }, " ", { t: 4, f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "position: absolute;left: 233px;right: 0px;height: 280px;bottom: 0px;border-top: 1px solid #ccc;", g: 1 }], f: [{ t: 7, e: "pre", m: [{ t: 13, n: "style", f: "position: absolute;top: 0px;left: 0px;right: 0px;bottom: 0px;white-space: pre-wrap;border: 0px;background-color: transparent;", g: 1 }], f: [{ t: 2, r: "editor_result_raw" }] }] }], n: 50, r: "editor_result_open" }] }], e: { "13": function _() {
				return 13;
			}, "_0===false": function _0False(_0) {
				return _0 === false;
			}, "false": function _false() {
				return false;
			} } },
	data: function data() {
		return {
			indexjs_content: false
		};
	},
	on: {
		init: function init() {

			var ractive = this;

			this.observe('editor_result_open', function () {

				setTimeout(function () {
					try {
						ractive.findComponent('ace').resize();
					} catch (e) {
						console.log("resize failed", e);
					}
				}, 200);
			});

			var url = "http://localhost:8080/?proxyfile=" + encodeURIComponent(ractive.get('zip-url'));
			//var url = "https://cors-anywhere.herokuapp.com/" + encodeURIComponent( ractive.get('zip-url') )


			fetch(url, { mode: 'cors', cache: 'no-cache' }).then(function (response) {
				return response.blob();
			}).then(function (data) {
				console.log("codebuff", data);
				var new_zip = new JSZip();

				new_zip.loadAsync(data).then(function (contents) {
					// contents.files
					console.log("after zip.loadAsync", contents);
					new_zip.file('index.js').async('string').then(function (response) {
						//console.log('contents of index.js', response )
						ractive.set({ indexjs_content: response });
					});
					//    // you now have every files contained in the loaded zip
					//    new_zip.file("hello.txt").async("string"); // a promise of "Hello World\n"
				});
			});
		}
	}
});

/***/ })
/******/ ])["default"];
});