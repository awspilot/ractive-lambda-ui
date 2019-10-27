(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ractive"));
	else if(typeof define === 'function' && define.amd)
		define("ractive-lambda-ui", ["ractive"], factory);
	else if(typeof exports === 'object')
		exports["ractive-lambda-ui"] = factory(require("ractive"));
	else
		root["ractive-lambda-ui"] = factory(root["Ractive"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ractive = __webpack_require__(1);

var _ractive2 = _interopRequireDefault(_ractive);

var _functionlist = __webpack_require__(2);

var _functionlist2 = _interopRequireDefault(_functionlist);

var _functioncreate = __webpack_require__(3);

var _functioncreate2 = _interopRequireDefault(_functioncreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ractive2.default.extend({
	template: { v: 4, t: [{ t: 7, e: "hsplit", m: [{ t: 13, n: "style", f: ";", g: 1 }, { t: 13, n: "class", f: "ractive-lambda-ui", g: 1 }], f: [{ t: 7, e: "left", m: [{ t: 13, n: "style", f: "border-right: 1px solid #b9b8b6;background-color: #fff;", g: 1 }], f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "display: block;font-size: 12px;padding-left: 10px;font-size: 18px;font-weight: 700;color: #000;line-height: 2rem;padding: 12px 35px;border-bottom: 1px solid #ddd;", g: 1 }], f: ["AWS Lambda"] }, " ", { t: 7, e: "div", m: [{ t: 13, n: "style", f: "position: absolute;bottom: 0px;top: 60px;left: 0px;right: 0px;", g: 1 }], f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #000;", g: 1 }], f: ["Dashboard"] }, " ", { t: 7, e: "div", m: [{ t: 13, n: "style", f: "display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #000;", g: 1 }], f: ["Applications"] }, " ", { t: 7, e: "div", m: [{ t: 13, n: "style", f: "display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #ec7211;font-weight: bold;", g: 1 }], f: ["Functions"] }, " ", { t: 7, e: "div", m: [{ t: 13, n: "style", f: "display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #000;", g: 1 }], f: ["Layers"] }] }] }, " ", { t: 7, e: "content", m: [{ t: 13, n: "style", f: "background-color: transparent;border: 0px;overflow-x: auto;", g: 1 }], f: [{ t: 7, e: "div", m: [{ t: 13, n: "style", f: "height: 30px;margin-left: 10px;line-height: 30px;font-size: 15px;", g: 1 }], f: [{ t: 7, e: "a", m: [{ t: 13, n: "style", f: "cursor: pointer;text-decoration: none;", g: 1 }], f: ["Lambda"] }, " > ", { t: 7, e: "a", m: [{ t: 13, n: "style", f: "cursor: pointer;text-decoration: none;color: #999;", g: 1 }], f: ["Functions"] }] }, " ", { t: 7, e: "div", m: [{ t: 13, n: "style", f: "position: absolute;top: 40px;left: 10px;right: 10px;bottom: 10px;", g: 1 }], f: [{ t: 4, f: [{ t: 7, e: "div", m: [{ n: "style", f: ["position: absolute;top: 0px;left: 0px;width: ", { t: 4, f: ["260px; "], n: 50, x: { r: ["active_id"], s: "_0===\"stackdetails\"" } }, { t: 4, f: ["100%;"], n: 51, l: 1 }, "; box-shadow: 0 1px 1px 0 rgba(0,28,36,.5);border-top: 1px solid #eaeded;background-color: #fff"], t: 13 }], f: [{ t: 7, e: "functionlist" }] }], n: 50, x: { r: ["tab"], s: "_0===\"list\"" } }, " ", { t: 4, f: [{ t: 7, e: "functioncreate" }], n: 50, x: { r: ["tab"], s: "_0===\"create\"" } }] }] }] }], e: { "_0===\"stackdetails\"": function _0Stackdetails(_0) {
				return _0 === "stackdetails";
			}, "_0===\"list\"": function _0List(_0) {
				return _0 === "list";
			}, "_0===\"create\"": function _0Create(_0) {
				return _0 === "create";
			} } },
	components: {
		functionlist: _functionlist2.default,
		functioncreate: _functioncreate2.default
	},
	css: ".hsplit {position: absolute;top:0px;left: 0px;right: 0px;bottom: 0px; /*background-color: #f0f0f0;*/background-color: #f2f3f3; color: #999999;} left {position:absolute;display: block;top: 0px;left: 0px;width: 260px;bottom: 0px;background-color: #fff;} content {position:absolute;display: block;top: 0px;left: 265px;right: 0px;bottom: 0px;margin-top: 5px;} content tabcontent {position: absolute;top: 28px;left: 0px;right: 0px;bottom: 0px;} .ractive-lambda-ui {font-family: sans-serif;} .ractive-lambda-ui * {box-sizing: border-box } ",
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
		}
	}
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Ractive.extend({
	template: '\n\n\t\t<div style="height: 50px;padding: 10px 10px 0px 0px;background-color: #fafafa;;">\n\n\t\t\t<div style="float: right;">\n\t\t\t\t<a class="btn btn-sm btn-default" on-click="refresh"><i class="icon zmdi zmdi-refresh"></i></a>\n\t\t\t\t<a class="btn btn-sm btn-default {{#if selection}}{{else}}disabled{{/if}}" {{#if selection}}on-click=\'delete\'{{/if}}> Delete </a>\n\t\t\t\t<a class="btn btn-sm btn-warning" on-click="createfunction"> Create function </a>\n\t\t\t</div>\n\t\t</div>\n\n\n\t\t<table style="border-collapse: collapse;border-spacing: 0; empty-cells: show; border: 1px solid #eaeded;width: 100%;">\n\t\t\t<thead style="background-color: #fafafa;color: #000;text-align: left;vertical-align: bottom;border-bottom: 1px solid #eaeded">\n\t\t\t\t<tr>\n\t\t\t\t\t<th style="padding: 0.5em 1em;"></th>\n\t\t\t\t\t<th style="padding: 0.5em 1em;">Function name</th>\n\t\t\t\t\t<th style="padding: 0.5em 1em;">Description</th>\n\t\t\t\t\t<th style="padding: 0.5em 1em;">Runtime</th>\n\t\t\t\t\t<th style="padding: 0.5em 1em;">Code size</th>\n\t\t\t\t\t<th style="padding: 0.5em 1em;">Last modified</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody>\n\t\t\t\t{{#functions}}\n\n\t\t\t\t<tr style="{{#if selection === .FunctionName }}background-color: #f1faff;{{/if}}">\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;"><input type="radio" name={{selection}} value=\'{{.FunctionName}}\'></td>\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;"><a style="cursor: pointer;" on-click="gotostack">{{.FunctionName}}</a></td>\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;"></td>\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;">{{.Runtime}}</td>\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;">{{.CodeSize}}</td>\n\t\t\t\t\t<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;">{{.LastModified}}</td>\n\t\t\t\t</tr>\n\t\t\t\t{{/functions}}\n\n\t\t\t</tbody>\n\t\t</table>\n\n\n\t',
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
			console.log(data.Functions);
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
			if (confirm('Are you sure you want to delete ' + this.get('selection'))) {
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
		}
	}
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Ractive.extend({
	template: "\n\t\t<h3>Create function</h3>\n\n\t\t<div style=\"box-shadow: 0 1px 1px 0 rgba(0,28,36,.5);border-top: 1px solid #eaeded;background-color: #fff\">\n\t\t\tcreate function form\n\t\t</div>\n\n\t\t<div style=\"text-align: right;padding: 10px 0px;\">\n\t\t\t\t<a class=\"btn btn-sm\" on-click=\"cancel\"> Cancel </a>\n\t\t\t\t<a class=\"btn btn-sm btn-warning\" on-click=\"createfunction\"> Create function </a>\n\t\t</div>\n\t",
	on: {
		cancel: function cancel() {
			this.parent.gotolist();
		}
	}
});

/***/ })
/******/ ])["default"];
});