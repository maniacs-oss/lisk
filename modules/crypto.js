'use strict';

var util = require('util');
var request = require('request');
var fs = require('fs');
var crypto = require('crypto');
var ed = require('ed25519');
var sandboxHelper = require('../helpers/sandbox.js');

// Private fields
var modules, library, self, __private = {}, shared = {};

__private.loaded = false;

// Constructor
function Crypto (cb, scope) {
	library = scope;
	self = this;
	self.__private = __private;

	setImmediate(cb, null, self);
}

// Public methods
Crypto.prototype.sandboxApi = function (call, args, cb) {
	sandboxHelper.callMethod(shared, call, args, cb);
};

// Events
Crypto.prototype.onBind = function (scope) {
	modules = scope;
};

Crypto.prototype.onBlockchainReady = function () {
	__private.loaded = true;
};

// Shared
module.exports = Crypto;
