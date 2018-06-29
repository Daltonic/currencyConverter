/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // ................................................IMPORTING LIB...........................................................


var _idb = __webpack_require__(/*! idb */ "./node_modules/idb/lib/idb.js");

var _idb2 = _interopRequireDefault(_idb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ................................................APP START...........................................................
var AppComponent = function () {
    function AppComponent() {
        _classCallCheck(this, AppComponent);

        this.url = 'https://free.currencyconverterapi.com/api/v5/';
        this.currencies = [];
        this.dbPromise = _idb2.default.open('currency-Store', 1, function (upgradeDB) {
            upgradeDB.createObjectStore('currencies');
        });
        this.main = document.querySelector("main");
        this.getFromIDB(); // If this fails to fetch from indexDB it falls back to the api
        this.getFromApi(); // The api calls goes through only if user is online
        // On window load function....
    }

    _createClass(AppComponent, [{
        key: 'changeView',
        value: function changeView() {
            this.main.innerHTML = '\n            <div class="row">\n                <div class="col-md-6 ml-auto mr-auto">\n                    <div class="card">\n                        <div class="card-body text-center">\n                            <h4 class="card-title text-muted">Convert Now!</h4>\n                            <p class="card-subtitle text-muted">ALC Challenge 2.0</p>\n                            <hr>\n                            <div class="row">\n                                <div class="col-md-6 col-sm-6">\n                                    <label class="text-left">From</label>\n                                    <br />\n                                    <select class="form-control" id="fromCurrency">\n                                        ' + this.currencies.map(function (currency) {
                return '<option value="' + currency.id + '">' + currency.id + ' - ' + currency.currencyName + '</option>';
            }) + '\n                                    </select>\n                                </div>\n                                <div class="col-md-6 col-sm-6">\n                                    <div class="form-group">\n                                     <br />\n                                        <input type="number" value="1" class="form-control" id="fromAmount">\n                                    </div>\n                                </div>\n                                <div class="col-md-6 col-sm-6">\n                                <label class="text-left">To</label>\n                                    <br />\n                                    <select class="form-control" id="toCurrency">\n                                        ' + this.currencies.map(function (currency) {
                return '<option value="' + currency.id + '">' + currency.id + ' - ' + currency.currencyName + '</option>';
            }) + '\n                                    </select>\n                                </div>\n                                <div class="col-md-6 col-sm-6">\n                                    <div class="form-group">\n                                     <br />\n                                        <input type="text" value="" class="form-control" id="toAmount">\n                                    </div>\n                                </div>\n                                <div class="col-md-12">\n                                    <br>\n                                    <button class="btn btn-info" id="convertMe">Convert Me!</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ';
        }
    }, {
        key: 'getFromApi',
        value: function getFromApi() {
            var _this = this;

            // Defining the forEach iterator function...
            if (!Object.prototype.forEach) {
                Object.defineProperty(Object.prototype, 'forEach', {
                    value: function value(callback, thisArg) {
                        if (this == null) {
                            throw new TypeError('Not an object');
                        }
                        thisArg = thisArg || window;
                        for (var key in this) {
                            if (this.hasOwnProperty(key)) {
                                callback.call(thisArg, this[key], key, this);
                            }
                        }
                    }
                });
            }
            var currencies = [];
            // Getting our currencies from our free api
            fetch(this.url + 'currencies').then(function (response) {
                return response.json();
            }).then(function (myJson) {
                myJson.results.forEach(function (value, key) {
                    currencies.push(value);
                });
            }).then(function () {
                // Setting data on IndexBD
                _this.dbPromise.then(function (db) {
                    var tx = db.transaction('currencies', 'readwrite');
                    var currenciesStore = tx.objectStore('currencies');
                    currencies.forEach(function (value, key) {
                        currenciesStore.put(value, value.id);
                    });
                    return tx.complete;
                }).then(function () {
                    _this.getFromIDB();
                });
            });
        }
    }, {
        key: 'getFromIDB',
        value: function getFromIDB() {
            var _this2 = this;

            // Getting data from indexDB and populate the this.currencies array
            return this.dbPromise.then(function (db) {
                return db.transaction('currencies').objectStore('currencies').getAll();
            }).then(function (allObjs) {
                _this2.currencies = allObjs;
                _this2.changeView();
                _this2.usd = document.querySelector("#fromCurrency option[value='USD']").setAttribute('selected', '');
                _this2.ngn = document.querySelector("#toCurrency option[value='NGN']").setAttribute('selected', '');
                _this2.getDefaultConvert();
                _this2.extraSetup();
            });
        }
    }, {
        key: 'extraSetup',
        value: function extraSetup() {
            var _this3 = this;

            // On convert function....
            var button = document.querySelector('button');
            button.addEventListener("click", function () {
                // Getting values from options
                var f = document.getElementById('fromCurrency');
                var t = document.getElementById('toCurrency');
                var fromCurrency = f.options[f.selectedIndex].value;
                var toCurrency = t.options[t.selectedIndex].value;

                // Setting an event listener for a click event
                fetch(_this3.url + ('convert?q=' + fromCurrency + '_' + toCurrency + '&compact=ultra')).then(function (response) {
                    return response.json();
                }).then(function (equivalent) {
                    var value = equivalent[fromCurrency + '_' + toCurrency];
                    value = document.getElementById('fromAmount').value * value;
                    document.getElementById('toAmount').setAttribute('value', '' + toCurrency + value.toFixed(2));
                });
            });
        }
    }, {
        key: 'getDefaultConvert',
        value: function getDefaultConvert() {
            // Getting values from options
            var f = document.getElementById('fromCurrency');
            var t = document.getElementById('toCurrency');
            var fromCurrency = f.options[f.selectedIndex].value;
            var toCurrency = t.options[t.selectedIndex].value;

            // Setting an event listener for a click event
            fetch(this.url + ('convert?q=' + fromCurrency + '_' + toCurrency + '&compact=ultra')).then(function (response) {
                return response.json();
            }).then(function (equivalent) {
                var value = equivalent[fromCurrency + '_' + toCurrency];
                value = document.getElementById('fromAmount').value * value;
                document.getElementById('toAmount').setAttribute('value', '' + toCurrency + value.toFixed(2));
            });
        }
    }]);

    return AppComponent;
}();

new AppComponent();

/***/ }),

/***/ "./node_modules/idb/lib/idb.js":
/*!*************************************!*\
  !*** ./node_modules/idb/lib/idb.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function() {
  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject(request.error);
      };
    });
  }

  function promisifyRequestCall(obj, method, args) {
    var request;
    var p = new Promise(function(resolve, reject) {
      request = obj[method].apply(obj, args);
      promisifyRequest(request).then(resolve, reject);
    });

    p.request = request;
    return p;
  }

  function promisifyCursorRequestCall(obj, method, args) {
    var p = promisifyRequestCall(obj, method, args);
    return p.then(function(value) {
      if (!value) return;
      return new Cursor(value, p.request);
    });
  }

  function proxyProperties(ProxyClass, targetProp, properties) {
    properties.forEach(function(prop) {
      Object.defineProperty(ProxyClass.prototype, prop, {
        get: function() {
          return this[targetProp][prop];
        },
        set: function(val) {
          this[targetProp][prop] = val;
        }
      });
    });
  }

  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return this[targetProp][prop].apply(this[targetProp], arguments);
      };
    });
  }

  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyCursorRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function Index(index) {
    this._index = index;
  }

  proxyProperties(Index, '_index', [
    'name',
    'keyPath',
    'multiEntry',
    'unique'
  ]);

  proxyRequestMethods(Index, '_index', IDBIndex, [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(Index, '_index', IDBIndex, [
    'openCursor',
    'openKeyCursor'
  ]);

  function Cursor(cursor, request) {
    this._cursor = cursor;
    this._request = request;
  }

  proxyProperties(Cursor, '_cursor', [
    'direction',
    'key',
    'primaryKey',
    'value'
  ]);

  proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
    'update',
    'delete'
  ]);

  // proxy 'next' methods
  ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
    if (!(methodName in IDBCursor.prototype)) return;
    Cursor.prototype[methodName] = function() {
      var cursor = this;
      var args = arguments;
      return Promise.resolve().then(function() {
        cursor._cursor[methodName].apply(cursor._cursor, args);
        return promisifyRequest(cursor._request).then(function(value) {
          if (!value) return;
          return new Cursor(value, cursor._request);
        });
      });
    };
  });

  function ObjectStore(store) {
    this._store = store;
  }

  ObjectStore.prototype.createIndex = function() {
    return new Index(this._store.createIndex.apply(this._store, arguments));
  };

  ObjectStore.prototype.index = function() {
    return new Index(this._store.index.apply(this._store, arguments));
  };

  proxyProperties(ObjectStore, '_store', [
    'name',
    'keyPath',
    'indexNames',
    'autoIncrement'
  ]);

  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'put',
    'add',
    'delete',
    'clear',
    'get',
    'getAll',
    'getKey',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'openCursor',
    'openKeyCursor'
  ]);

  proxyMethods(ObjectStore, '_store', IDBObjectStore, [
    'deleteIndex'
  ]);

  function Transaction(idbTransaction) {
    this._tx = idbTransaction;
    this.complete = new Promise(function(resolve, reject) {
      idbTransaction.oncomplete = function() {
        resolve();
      };
      idbTransaction.onerror = function() {
        reject(idbTransaction.error);
      };
      idbTransaction.onabort = function() {
        reject(idbTransaction.error);
      };
    });
  }

  Transaction.prototype.objectStore = function() {
    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
  };

  proxyProperties(Transaction, '_tx', [
    'objectStoreNames',
    'mode'
  ]);

  proxyMethods(Transaction, '_tx', IDBTransaction, [
    'abort'
  ]);

  function UpgradeDB(db, oldVersion, transaction) {
    this._db = db;
    this.oldVersion = oldVersion;
    this.transaction = new Transaction(transaction);
  }

  UpgradeDB.prototype.createObjectStore = function() {
    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
  };

  proxyProperties(UpgradeDB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(UpgradeDB, '_db', IDBDatabase, [
    'deleteObjectStore',
    'close'
  ]);

  function DB(db) {
    this._db = db;
  }

  DB.prototype.transaction = function() {
    return new Transaction(this._db.transaction.apply(this._db, arguments));
  };

  proxyProperties(DB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(DB, '_db', IDBDatabase, [
    'close'
  ]);

  // Add cursor iterators
  // TODO: remove this once browsers do the right thing with promises
  ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
    [ObjectStore, Index].forEach(function(Constructor) {
      // Don't create iterateKeyCursor if openKeyCursor doesn't exist.
      if (!(funcName in Constructor.prototype)) return;

      Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
        var args = toArray(arguments);
        var callback = args[args.length - 1];
        var nativeObject = this._store || this._index;
        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
        request.onsuccess = function() {
          callback(request.result);
        };
      };
    });
  });

  // polyfill getAll
  [Index, ObjectStore].forEach(function(Constructor) {
    if (Constructor.prototype.getAll) return;
    Constructor.prototype.getAll = function(query, count) {
      var instance = this;
      var items = [];

      return new Promise(function(resolve) {
        instance.iterateCursor(query, function(cursor) {
          if (!cursor) {
            resolve(items);
            return;
          }
          items.push(cursor.value);

          if (count !== undefined && items.length == count) {
            resolve(items);
            return;
          }
          cursor.continue();
        });
      });
    };
  });

  var exp = {
    open: function(name, version, upgradeCallback) {
      var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
      var request = p.request;

      if (request) {
        request.onupgradeneeded = function(event) {
          if (upgradeCallback) {
            upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
          }
        };
      }

      return p.then(function(db) {
        return new DB(db);
      });
    },
    delete: function(name) {
      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
    }
  };

  if (true) {
    module.exports = exp;
    module.exports.default = module.exports;
  }
  else {}
}());


/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map