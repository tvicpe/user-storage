/*! version: "0.0.3" */
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else {
        var a = factory();
        for (var i in a) (typeof exports === "object" ? exports : root)[i] = a[i];
    }
})(this, function() {
    return function(modules) {
        var parentHotUpdateCallback = this["webpackHotUpdate"];
        this["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) {
            hotAddUpdateChunk(chunkId, moreModules);
            if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
        };
        function hotDownloadUpdateChunk(chunkId) {
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.charset = "utf-8";
            script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
            head.appendChild(script);
        }
        function hotDownloadManifest(callback) {
            if (typeof XMLHttpRequest === "undefined") return callback(new Error("No browser support"));
            try {
                var request = new XMLHttpRequest();
                var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
                request.open("GET", requestPath, true);
                request.timeout = 1e4;
                request.send(null);
            } catch (err) {
                return callback(err);
            }
            request.onreadystatechange = function() {
                if (request.readyState !== 4) return;
                if (request.status === 0) {
                    callback(new Error("Manifest request to " + requestPath + " timed out."));
                } else if (request.status === 404) {
                    callback();
                } else if (request.status !== 200 && request.status !== 304) {
                    callback(new Error("Manifest request to " + requestPath + " failed."));
                } else {
                    try {
                        var update = JSON.parse(request.responseText);
                    } catch (e) {
                        callback(e);
                        return;
                    }
                    callback(null, update);
                }
            };
        }
        var canDefineProperty = false;
        try {
            Object.defineProperty({}, "x", {
                get: function() {}
            });
            canDefineProperty = true;
        } catch (x) {}
        var hotApplyOnUpdate = true;
        var hotCurrentHash = "cf93f4f3f843479a58df";
        var hotCurrentModuleData = {};
        var hotCurrentParents = [];
        function hotCreateRequire(moduleId) {
            var me = installedModules[moduleId];
            if (!me) return __webpack_require__;
            var fn = function(request) {
                if (me.hot.active) {
                    if (installedModules[request]) {
                        if (installedModules[request].parents.indexOf(moduleId) < 0) installedModules[request].parents.push(moduleId);
                        if (me.children.indexOf(request) < 0) me.children.push(request);
                    } else hotCurrentParents = [ moduleId ];
                } else {
                    console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
                    hotCurrentParents = [];
                }
                return __webpack_require__(request);
            };
            for (var name in __webpack_require__) {
                if (Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
                    if (canDefineProperty) {
                        Object.defineProperty(fn, name, function(name) {
                            return {
                                configurable: true,
                                enumerable: true,
                                get: function() {
                                    return __webpack_require__[name];
                                },
                                set: function(value) {
                                    __webpack_require__[name] = value;
                                }
                            };
                        }(name));
                    } else {
                        fn[name] = __webpack_require__[name];
                    }
                }
            }
            function ensure(chunkId, callback) {
                if (hotStatus === "ready") hotSetStatus("prepare");
                hotChunksLoading++;
                __webpack_require__.e(chunkId, function() {
                    try {
                        callback.call(null, fn);
                    } finally {
                        finishChunkLoading();
                    }
                    function finishChunkLoading() {
                        hotChunksLoading--;
                        if (hotStatus === "prepare") {
                            if (!hotWaitingFilesMap[chunkId]) {
                                hotEnsureUpdateChunk(chunkId);
                            }
                            if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
                                hotUpdateDownloaded();
                            }
                        }
                    }
                });
            }
            if (canDefineProperty) {
                Object.defineProperty(fn, "e", {
                    enumerable: true,
                    value: ensure
                });
            } else {
                fn.e = ensure;
            }
            return fn;
        }
        function hotCreateModule(moduleId) {
            var hot = {
                _acceptedDependencies: {},
                _declinedDependencies: {},
                _selfAccepted: false,
                _selfDeclined: false,
                _disposeHandlers: [],
                active: true,
                accept: function(dep, callback) {
                    if (typeof dep === "undefined") hot._selfAccepted = true; else if (typeof dep === "function") hot._selfAccepted = dep; else if (typeof dep === "object") for (var i = 0; i < dep.length; i++) hot._acceptedDependencies[dep[i]] = callback; else hot._acceptedDependencies[dep] = callback;
                },
                decline: function(dep) {
                    if (typeof dep === "undefined") hot._selfDeclined = true; else if (typeof dep === "number") hot._declinedDependencies[dep] = true; else for (var i = 0; i < dep.length; i++) hot._declinedDependencies[dep[i]] = true;
                },
                dispose: function(callback) {
                    hot._disposeHandlers.push(callback);
                },
                addDisposeHandler: function(callback) {
                    hot._disposeHandlers.push(callback);
                },
                removeDisposeHandler: function(callback) {
                    var idx = hot._disposeHandlers.indexOf(callback);
                    if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
                },
                check: hotCheck,
                apply: hotApply,
                status: function(l) {
                    if (!l) return hotStatus;
                    hotStatusHandlers.push(l);
                },
                addStatusHandler: function(l) {
                    hotStatusHandlers.push(l);
                },
                removeStatusHandler: function(l) {
                    var idx = hotStatusHandlers.indexOf(l);
                    if (idx >= 0) hotStatusHandlers.splice(idx, 1);
                },
                data: hotCurrentModuleData[moduleId]
            };
            return hot;
        }
        var hotStatusHandlers = [];
        var hotStatus = "idle";
        function hotSetStatus(newStatus) {
            hotStatus = newStatus;
            for (var i = 0; i < hotStatusHandlers.length; i++) hotStatusHandlers[i].call(null, newStatus);
        }
        var hotWaitingFiles = 0;
        var hotChunksLoading = 0;
        var hotWaitingFilesMap = {};
        var hotRequestedFilesMap = {};
        var hotAvailibleFilesMap = {};
        var hotCallback;
        var hotUpdate, hotUpdateNewHash;
        function toModuleId(id) {
            var isNumber = +id + "" === id;
            return isNumber ? +id : id;
        }
        function hotCheck(apply, callback) {
            if (hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
            if (typeof apply === "function") {
                hotApplyOnUpdate = false;
                callback = apply;
            } else {
                hotApplyOnUpdate = apply;
                callback = callback || function(err) {
                    if (err) throw err;
                };
            }
            hotSetStatus("check");
            hotDownloadManifest(function(err, update) {
                if (err) return callback(err);
                if (!update) {
                    hotSetStatus("idle");
                    callback(null, null);
                    return;
                }
                hotRequestedFilesMap = {};
                hotAvailibleFilesMap = {};
                hotWaitingFilesMap = {};
                for (var i = 0; i < update.c.length; i++) hotAvailibleFilesMap[update.c[i]] = true;
                hotUpdateNewHash = update.h;
                hotSetStatus("prepare");
                hotCallback = callback;
                hotUpdate = {};
                var chunkId = 0;
                {
                    hotEnsureUpdateChunk(chunkId);
                }
                if (hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
                    hotUpdateDownloaded();
                }
            });
        }
        function hotAddUpdateChunk(chunkId, moreModules) {
            if (!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId]) return;
            hotRequestedFilesMap[chunkId] = false;
            for (var moduleId in moreModules) {
                if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                    hotUpdate[moduleId] = moreModules[moduleId];
                }
            }
            if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
                hotUpdateDownloaded();
            }
        }
        function hotEnsureUpdateChunk(chunkId) {
            if (!hotAvailibleFilesMap[chunkId]) {
                hotWaitingFilesMap[chunkId] = true;
            } else {
                hotRequestedFilesMap[chunkId] = true;
                hotWaitingFiles++;
                hotDownloadUpdateChunk(chunkId);
            }
        }
        function hotUpdateDownloaded() {
            hotSetStatus("ready");
            var callback = hotCallback;
            hotCallback = null;
            if (!callback) return;
            if (hotApplyOnUpdate) {
                hotApply(hotApplyOnUpdate, callback);
            } else {
                var outdatedModules = [];
                for (var id in hotUpdate) {
                    if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
                        outdatedModules.push(toModuleId(id));
                    }
                }
                callback(null, outdatedModules);
            }
        }
        function hotApply(options, callback) {
            if (hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
            if (typeof options === "function") {
                callback = options;
                options = {};
            } else if (options && typeof options === "object") {
                callback = callback || function(err) {
                    if (err) throw err;
                };
            } else {
                options = {};
                callback = callback || function(err) {
                    if (err) throw err;
                };
            }
            function getAffectedStuff(module) {
                var outdatedModules = [ module ];
                var outdatedDependencies = {};
                var queue = outdatedModules.slice();
                while (queue.length > 0) {
                    var moduleId = queue.pop();
                    var module = installedModules[moduleId];
                    if (!module || module.hot._selfAccepted) continue;
                    if (module.hot._selfDeclined) {
                        return new Error("Aborted because of self decline: " + moduleId);
                    }
                    if (moduleId === 0) {
                        return;
                    }
                    for (var i = 0; i < module.parents.length; i++) {
                        var parentId = module.parents[i];
                        var parent = installedModules[parentId];
                        if (parent.hot._declinedDependencies[moduleId]) {
                            return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
                        }
                        if (outdatedModules.indexOf(parentId) >= 0) continue;
                        if (parent.hot._acceptedDependencies[moduleId]) {
                            if (!outdatedDependencies[parentId]) outdatedDependencies[parentId] = [];
                            addAllToSet(outdatedDependencies[parentId], [ moduleId ]);
                            continue;
                        }
                        delete outdatedDependencies[parentId];
                        outdatedModules.push(parentId);
                        queue.push(parentId);
                    }
                }
                return [ outdatedModules, outdatedDependencies ];
            }
            function addAllToSet(a, b) {
                for (var i = 0; i < b.length; i++) {
                    var item = b[i];
                    if (a.indexOf(item) < 0) a.push(item);
                }
            }
            var outdatedDependencies = {};
            var outdatedModules = [];
            var appliedUpdate = {};
            for (var id in hotUpdate) {
                if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
                    var moduleId = toModuleId(id);
                    var result = getAffectedStuff(moduleId);
                    if (!result) {
                        if (options.ignoreUnaccepted) continue;
                        hotSetStatus("abort");
                        return callback(new Error("Aborted because " + moduleId + " is not accepted"));
                    }
                    if (result instanceof Error) {
                        hotSetStatus("abort");
                        return callback(result);
                    }
                    appliedUpdate[moduleId] = hotUpdate[moduleId];
                    addAllToSet(outdatedModules, result[0]);
                    for (var moduleId in result[1]) {
                        if (Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
                            if (!outdatedDependencies[moduleId]) outdatedDependencies[moduleId] = [];
                            addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
                        }
                    }
                }
            }
            var outdatedSelfAcceptedModules = [];
            for (var i = 0; i < outdatedModules.length; i++) {
                var moduleId = outdatedModules[i];
                if (installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted) outdatedSelfAcceptedModules.push({
                    module: moduleId,
                    errorHandler: installedModules[moduleId].hot._selfAccepted
                });
            }
            hotSetStatus("dispose");
            var queue = outdatedModules.slice();
            while (queue.length > 0) {
                var moduleId = queue.pop();
                var module = installedModules[moduleId];
                if (!module) continue;
                var data = {};
                var disposeHandlers = module.hot._disposeHandlers;
                for (var j = 0; j < disposeHandlers.length; j++) {
                    var cb = disposeHandlers[j];
                    cb(data);
                }
                hotCurrentModuleData[moduleId] = data;
                module.hot.active = false;
                delete installedModules[moduleId];
                for (var j = 0; j < module.children.length; j++) {
                    var child = installedModules[module.children[j]];
                    if (!child) continue;
                    var idx = child.parents.indexOf(moduleId);
                    if (idx >= 0) {
                        child.parents.splice(idx, 1);
                    }
                }
            }
            for (var moduleId in outdatedDependencies) {
                if (Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
                    var module = installedModules[moduleId];
                    var moduleOutdatedDependencies = outdatedDependencies[moduleId];
                    for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
                        var dependency = moduleOutdatedDependencies[j];
                        var idx = module.children.indexOf(dependency);
                        if (idx >= 0) module.children.splice(idx, 1);
                    }
                }
            }
            hotSetStatus("apply");
            hotCurrentHash = hotUpdateNewHash;
            for (var moduleId in appliedUpdate) {
                if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
                    modules[moduleId] = appliedUpdate[moduleId];
                }
            }
            var error = null;
            for (var moduleId in outdatedDependencies) {
                if (Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
                    var module = installedModules[moduleId];
                    var moduleOutdatedDependencies = outdatedDependencies[moduleId];
                    var callbacks = [];
                    for (var i = 0; i < moduleOutdatedDependencies.length; i++) {
                        var dependency = moduleOutdatedDependencies[i];
                        var cb = module.hot._acceptedDependencies[dependency];
                        if (callbacks.indexOf(cb) >= 0) continue;
                        callbacks.push(cb);
                    }
                    for (var i = 0; i < callbacks.length; i++) {
                        var cb = callbacks[i];
                        try {
                            cb(outdatedDependencies);
                        } catch (err) {
                            if (!error) error = err;
                        }
                    }
                }
            }
            for (var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
                var item = outdatedSelfAcceptedModules[i];
                var moduleId = item.module;
                hotCurrentParents = [ moduleId ];
                try {
                    __webpack_require__(moduleId);
                } catch (err) {
                    if (typeof item.errorHandler === "function") {
                        try {
                            item.errorHandler(err);
                        } catch (err) {
                            if (!error) error = err;
                        }
                    } else if (!error) error = err;
                }
            }
            if (error) {
                hotSetStatus("fail");
                return callback(error);
            }
            hotSetStatus("idle");
            callback(null, outdatedModules);
        }
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false,
                hot: hotCreateModule(moduleId),
                parents: hotCurrentParents,
                children: []
            };
            modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
            module.loaded = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = "/static/";
        __webpack_require__.h = function() {
            return hotCurrentHash;
        };
        return hotCreateRequire(0)(0);
    }([ function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Storage = function() {
            function Storage(storage) {
                this.storage = storage;
            }
            Storage.prototype.set = function(key, value) {
                this.storage.setItem(key, value);
            };
            Storage.prototype.get = function(key) {
                return this.storage.getItem(key);
            };
            Storage.prototype.remove = function(key) {
                this.storage.removeItem(key);
            };
            Storage.prototype.clear = function() {
                this.storage.clear();
            };
            Storage.prototype.isSet = function(key) {
                var result = true;
                if (this.get(key) === null) {
                    result = false;
                }
                return result;
            };
            return Storage;
        }();
        Storage.local = new Storage(localStorage);
        Storage.session = new Storage(sessionStorage);
        exports.Storage = Storage;
    } ]);
});


//# sourceMappingURL=storage.js.map