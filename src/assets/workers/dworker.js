(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var WorkerMessageTypes = Object.freeze({
    CONNECT_WORKER: 'CONNECT_WORKER',
    CONNECT_WORKER_SUCCESS: 'CONNECT_WORKER_SUCCESS',
    CONNECT_WORKER_FAILED: 'CONNECT_WORKER_FAILED',
    SET_WORKER_CONFIG: 'SET_WORKER_CONFIG',
    SET_WORKER_CONFIG_FAILED: 'SET_WORKER_CONFIG_FAILED',
    WORKER_READY: 'WORKER_READY',
    CONNECT_SOCKET: 'CONNECT_SOCKET',
    CONNECT_SOCKET_SUCCESS: 'CONNECT_SOCKET_SUCCESS',
    CONNECT_SOCKET_FAILED: 'CONNECT_SOCKET_FAILED',
    SUBSCRIBE_DATA: 'SUBSCRIBE_DATA',
    SUBSCRIBE_DATA_FAILED: 'SUBSCRIBE_DATA_FAILED'
});

// export type WorkerType = 'DEDICATED' | 'SHARED' | 'LOCAL';
var WorkerTypes = Object.freeze({
    DEDICATED: 'DEDICATED',
    SHARED: 'SHARED',
    LOCAL: 'LOCAL'
});

var WorkerMessage = (function () {
    function WorkerMessage(payload) {
        this.payload = payload;
    }
    return WorkerMessage;
}());
var WorkerMessageBuilder = (function () {
    function WorkerMessageBuilder() {
    }
    WorkerMessageBuilder.build = function (type, payload) {
        var message = new WorkerMessage(payload);
        message.type = type;
        return message;
    };
    return WorkerMessageBuilder;
}());

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof commonjsGlobal !== 'undefined' && commonjsGlobal;
var _root = __window || __global || __self;
var root_1 = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();


var root = {
	root: root_1
};

function isFunction(x) {
    return typeof x === 'function';
}
var isFunction_2 = isFunction;


var isFunction_1 = {
	isFunction: isFunction_2
};

var isArray_1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });


var isArray = {
	isArray: isArray_1
};

function isObject(x) {
    return x != null && typeof x === 'object';
}
var isObject_2 = isObject;


var isObject_1 = {
	isObject: isObject_2
};

// typeof any so that it we don't have to cast when comparing a result to the error object
var errorObject_1 = { e: {} };


var errorObject = {
	errorObject: errorObject_1
};

var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject.errorObject.e = e;
        return errorObject.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
var tryCatch_2 = tryCatch;



var tryCatch_1 = {
	tryCatch: tryCatch_2
};

var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends$3(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
var UnsubscriptionError_2 = UnsubscriptionError;


var UnsubscriptionError_1 = {
	UnsubscriptionError: UnsubscriptionError_2
};

/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject.errorObject.e.errors) : [errorObject.errorObject.e]);
            }
        }
        if (isArray.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
var Subscription_2 = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}


var Subscription_1 = {
	Subscription: Subscription_2
};

var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};


var Observer = {
	empty: empty
};

var rxSubscriber = createCommonjsModule(function (module, exports) {
var Symbol = root.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;

});

var rxSubscriber_1 = rxSubscriber.rxSubscriber;
var rxSubscriber_2 = rxSubscriber.$$rxSubscriber;

var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends$2(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
var Subscriber_2 = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends$2(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));


var Subscriber_1 = {
	Subscriber: Subscriber_2
};

function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber.rxSubscriber]) {
            return nextOrObserver[rxSubscriber.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
var toSubscriber_2 = toSubscriber;


var toSubscriber_1 = {
	toSubscriber: toSubscriber_2
};

var observable = createCommonjsModule(function (module, exports) {
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;

});

var observable_1 = observable.getSymbolObservable;
var observable_2 = observable.observable;
var observable_3 = observable.$$observable;

/* tslint:disable:no-empty */
function noop() { }
var noop_2 = noop;


var noop_1 = {
	noop: noop_2
};

/* tslint:enable:max-line-length */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
}
var pipe_2 = pipe;
/* @internal */
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
var pipeFromArray_1 = pipeFromArray;


var pipe_1 = {
	pipe: pipe_2,
	pipeFromArray: pipeFromArray_1
};

/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable$$1 = new Observable();
        observable$$1.source = this;
        observable$$1.operator = operator;
        return observable$$1;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise) {
                PromiseCtor = root.root.Rx.config.Promise;
            }
            else if (root.root.Promise) {
                PromiseCtor = root.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable.observable] = function () {
        return this;
    };
    /* tslint:enable:max-line-length */
    /**
     * Used to stitch together functional operators into a chain.
     * @method pipe
     * @return {Observable} the Observable result of all of the operators having
     * been called in the order they were passed in.
     *
     * @example
     *
     * import { map, filter, scan } from 'rxjs/operators';
     *
     * Rx.Observable.interval(1000)
     *   .pipe(
     *     filter(x => x % 2 === 0),
     *     map(x => x + x),
     *     scan((acc, x) => acc + x)
     *   )
     *   .subscribe(x => console.log(x))
     */
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    /* tslint:enable:max-line-length */
    Observable.prototype.toPromise = function (PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise) {
                PromiseCtor = root.root.Rx.config.Promise;
            }
            else if (root.root.Promise) {
                PromiseCtor = root.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
var Observable_2 = Observable;


var Observable_1 = {
	Observable: Observable_2
};

var __extends$4 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends$4(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
var ObjectUnsubscribedError_2 = ObjectUnsubscribedError;


var ObjectUnsubscribedError_1 = {
	ObjectUnsubscribedError: ObjectUnsubscribedError_2
};

var __extends$5 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends$5(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
var SubjectSubscription_2 = SubjectSubscription;


var SubjectSubscription_1 = {
	SubjectSubscription: SubjectSubscription_2
};

var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};






/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends$1(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends$1(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
var Subject_2 = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends$1(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));

var ServerAppender = (function () {
    function ServerAppender(options) {
        this.options = options;
    }
    Object.defineProperty(ServerAppender.prototype, "name", {
        get: function () {
            return 'ajax';
        },
        enumerable: true,
        configurable: true
    });
    ServerAppender.prototype.writeLog = function (loggingEvent) {
        console.info(JSON.stringify(loggingEvent));
    };
    ServerAppender.prototype.writeLogs = function (loggingEvent) {
        console.info(JSON.stringify(loggingEvent));
    };
    ServerAppender.prototype.update = function (appenderOptions) {
        this.options = appenderOptions;
    };
    return ServerAppender;
}());

var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ALL"] = 0] = "ALL";
    LogLevel[LogLevel["TRACE"] = 1] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["WARN"] = 4] = "WARN";
    LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 6] = "FATAL";
    LogLevel[LogLevel["OFF"] = 7] = "OFF";
})(LogLevel || (LogLevel = {}));

var ConsoleAppender = (function () {
    function ConsoleAppender(options) {
        this.options = options;
    }
    Object.defineProperty(ConsoleAppender.prototype, "name", {
        get: function () {
            return 'console';
        },
        enumerable: true,
        configurable: true
    });
    ConsoleAppender.prototype.writeLog = function (loggingEvent) {
        if (this.options.logLevel !== LogLevel.OFF && loggingEvent.level >= this.options.logLevel) {
            var message = this.getFormattedMessage(loggingEvent);
            switch (loggingEvent.level) {
                case LogLevel.DEBUG:
                    console.debug(message);
                    break;
                case LogLevel.ERROR:
                case LogLevel.FATAL:
                    console.error(message);
                    break;
                case LogLevel.INFO:
                    console.info(message);
                    break;
                default:
                    console.info(message);
            }
        }
    };
    ConsoleAppender.prototype.writeLogs = function (loggingEvent) {
    };
    ConsoleAppender.prototype.update = function (appenderOptions) {
        this.options = appenderOptions;
    };
    ConsoleAppender.prototype.getFormattedMessage = function (loggingEvent) {
        return "[" + loggingEvent.appName + "-" + loggingEvent.name + "-" + this.getFormattedTime(loggingEvent.timestamp) + "] [" + LogLevel[loggingEvent.level] + "] => " + loggingEvent.message;
    };
    ConsoleAppender.prototype.getFormattedTime = function (timestamp) {
        var date = new Date(timestamp);
        return date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
    };
    return ConsoleAppender;
}());

var WebWorkerAppender = (function () {
    function WebWorkerAppender(options) {
        this.options = options;
        this.isWorkerReady = false;
    }
    Object.defineProperty(WebWorkerAppender.prototype, "name", {
        get: function () {
            return 'worker';
        },
        enumerable: true,
        configurable: true
    });
    WebWorkerAppender.prototype.writeLog = function (loggingEvent) {
        // throw new Error("Method not implemented.");
    };
    WebWorkerAppender.prototype.writeLogs = function (loggingEvent) {
        if (this.isWorkerReady) {
            this.worker.port.postMessage({ type: 'LOG_MESSAGE', payload: loggingEvent });
        }
    };
    WebWorkerAppender.prototype.update = function (appenderOptions) {
        this.dispose();
        this.options = appenderOptions;
        this.worker = new SharedWorker(appenderOptions.path, 'Logger-Worker23');
        this.worker.port.addEventListener('error', this.onWorkerError.bind(this));
        this.worker.port.addEventListener('message', this.onWorkerMessage.bind(this));
        this.worker.port.start();
    };
    WebWorkerAppender.prototype.onWorkerError = function (errorEvt) {
        console.error(errorEvt);
    };
    WebWorkerAppender.prototype.onWorkerMessage = function (evt) {
        if (evt.data.type === 'WORKER_CONNECTED') {
            this.isWorkerReady = true;
        }
        console.info(evt.data);
    };
    WebWorkerAppender.prototype.dispose = function () {
        if (this.worker) {
            this.isWorkerReady = false;
            this.worker.port.removeEventListener('error', this.onWorkerError.bind(this));
            this.worker.port.removeEventListener('message', this.onWorkerMessage.bind(this));
            this.worker.port.close();
        }
    };
    return WebWorkerAppender;
}());

var AppenderRepository = (function () {
    function AppenderRepository() {
        this.appenderMap = new Map();
        if (AppenderRepository._instance) {
            throw new Error("Error: Instantiation failed: Use AppenderRepository.instance instead of new.");
        }
        AppenderRepository._instance = this;
        this.appenderMap.set('console', new ConsoleAppender({
            name: 'console',
            format: 'text',
            logLevel: LogLevel.INFO
        }));
        this.appenderMap.set('server', new ServerAppender({
            name: 'server',
            format: 'json',
            logLevel: LogLevel.INFO,
            isDefferred: true
        }));
        this.appenderMap.set('worker', new WebWorkerAppender({
            name: 'worker',
            format: 'json',
            logLevel: LogLevel.INFO,
            isDefferred: true,
            path: 'assets/worker/socket-logger.js'
        }));
    }
    AppenderRepository.prototype.getAppender = function (name) {
        if (this.appenderMap.has(name)) {
            return this.appenderMap.get(name);
        }
        throw new Error("LogAppender : " + name + " is not found");
    };
    Object.defineProperty(AppenderRepository, "instance", {
        get: function () {
            return AppenderRepository._instance;
        },
        enumerable: true,
        configurable: true
    });
    AppenderRepository._instance = new AppenderRepository();
    return AppenderRepository;
}());

function isNumeric(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !isArray.isArray(val) && (val - parseFloat(val) + 1) >= 0;
}
var isNumeric_2 = isNumeric;



var isNumeric_1 = {
	isNumeric: isNumeric_2
};

var __extends$8 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends$8(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
var Action_2 = Action;


var Action_1 = {
	Action: Action_2
};

var __extends$7 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends$7(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // or the action has been rescheduled before it's executed, clear the interval id
        return root.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action_1.Action));
var AsyncAction_2 = AsyncAction;


var AsyncAction_1 = {
	AsyncAction: AsyncAction_2
};

/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
var Scheduler_2 = Scheduler;


var Scheduler_1 = {
	Scheduler: Scheduler_2
};

var __extends$9 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var AsyncScheduler = (function (_super) {
    __extends$9(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
var AsyncScheduler_2 = AsyncScheduler;


var AsyncScheduler_1 = {
	AsyncScheduler: AsyncScheduler_2
};

/**
 *
 * Async Scheduler
 *
 * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
 *
 * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
 * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
 * in intervals.
 *
 * If you just want to "defer" task, that is to perform it right after currently
 * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
 * better choice will be the {@link asap} scheduler.
 *
 * @example <caption>Use async scheduler to delay task</caption>
 * const task = () => console.log('it works!');
 *
 * Rx.Scheduler.async.schedule(task, 2000);
 *
 * // After 2 seconds logs:
 * // "it works!"
 *
 *
 * @example <caption>Use async scheduler to repeat task in intervals</caption>
 * function task(state) {
 *   console.log(state);
 *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
 *                                   // which we reschedule with new state and delay
 * }
 *
 * Rx.Scheduler.async.schedule(task, 3000, 0);
 *
 * // Logs:
 * // 0 after 3s
 * // 1 after 4s
 * // 2 after 5s
 * // 3 after 6s
 *
 * @static true
 * @name async
 * @owner Scheduler
 */
var async_1 = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);


var async = {
	async: async_1
};

var __extends$6 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IntervalObservable = (function (_super) {
    __extends$6(IntervalObservable, _super);
    function IntervalObservable(period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async.async; }
        _super.call(this);
        this.period = period;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(period) || period < 0) {
            this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = async.async;
        }
    }
    /**
     * Creates an Observable that emits sequential numbers every specified
     * interval of time, on a specified IScheduler.
     *
     * <span class="informal">Emits incremental numbers periodically in time.
     * </span>
     *
     * <img src="./img/interval.png" width="100%">
     *
     * `interval` returns an Observable that emits an infinite sequence of
     * ascending integers, with a constant interval of time of your choosing
     * between those emissions. The first emission is not sent immediately, but
     * only after the first period has passed. By default, this operator uses the
     * `async` IScheduler to provide a notion of time, but you may pass any
     * IScheduler to it.
     *
     * @example <caption>Emits ascending numbers, one every second (1000ms)</caption>
     * var numbers = Rx.Observable.interval(1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link timer}
     * @see {@link delay}
     *
     * @param {number} [period=0] The interval size in milliseconds (by default)
     * or the time unit determined by the scheduler's clock.
     * @param {Scheduler} [scheduler=async] The IScheduler to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a sequential number each time
     * interval.
     * @static true
     * @name interval
     * @owner Observable
     */
    IntervalObservable.create = function (period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async.async; }
        return new IntervalObservable(period, scheduler);
    };
    IntervalObservable.dispatch = function (state) {
        var index = state.index, subscriber = state.subscriber, period = state.period;
        subscriber.next(index);
        if (subscriber.closed) {
            return;
        }
        state.index += 1;
        this.schedule(state, period);
    };
    IntervalObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var period = this.period;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
            index: index, subscriber: subscriber, period: period
        }));
    };
    return IntervalObservable;
}(Observable_1.Observable));
var IntervalObservable_2 = IntervalObservable;


var IntervalObservable_1 = {
	IntervalObservable: IntervalObservable_2
};

var interval_1 = IntervalObservable_1.IntervalObservable.create;


var interval$2 = {
	interval: interval_1
};

Observable_1.Observable.interval = interval$2.interval;

var __extends$10 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter$3(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
var filter_2$2 = filter$3;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = (function (_super) {
    __extends$10(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));


var filter_1 = {
	filter: filter_2$2
};

/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter$2(predicate, thisArg) {
    return filter_1.filter(predicate, thisArg)(this);
}
var filter_3 = filter$2;


var filter_2 = {
	filter: filter_3
};

Observable_1.Observable.prototype.filter = filter_2.filter;

var LogWriter = (function () {
    function LogWriter() {
        this.appenders = new Map();
    }
    LogWriter.prototype.addAppender = function (appender) {
        if (!this.appenders.has(appender.name)) {
            this.appenders.set(appender.name, appender);
        }
    };
    LogWriter.getImmediateLogWriter = function () {
        return new ImmediateLogWriter();
    };
    LogWriter.getDefferredWriter = function (delay) {
        return new DefferredLogger(delay);
    };
    return LogWriter;
}());
var ImmediateLogWriter = (function (_super) {
    __extends(ImmediateLogWriter, _super);
    function ImmediateLogWriter() {
        return _super.call(this) || this;
    }
    ImmediateLogWriter.prototype.addLogEntry = function (logEvent) {
        this.appenders.forEach(function (appender, key) {
            appender.writeLog(logEvent);
        });
    };
    return ImmediateLogWriter;
}(LogWriter));
var DefferredLogger = (function (_super) {
    __extends(DefferredLogger, _super);
    function DefferredLogger(delay) {
        var _this = _super.call(this) || this;
        _this.delay = delay;
        _this.logEvents = [];
        Observable_2.interval(delay)
            .filter(function () { return _this.logEvents.length > 0; })
            .subscribe(_this.writeEvents.bind(_this));
        return _this;
    }
    DefferredLogger.prototype.addLogEntry = function (logEvent) {
        this.logEvents.push(logEvent);
    };
    DefferredLogger.prototype.writeEvents = function () {
        var _this = this;
        this.appenders.forEach(function (appender, key) {
            appender.writeLogs(_this.logEvents);
            _this.logEvents = [];
        });
    };
    return DefferredLogger;
}(LogWriter));

var LoggingController = (function () {
    function LoggingController() {
        this.immedWriter = LogWriter.getImmediateLogWriter();
        this._staticInfo = { appName: "" };
        if (LoggingController._instance) {
            throw new Error("Error: Instantiation failed: Use LoggingStore.instance instead of new.");
        }
        LoggingController._instance = this;
    }
    LoggingController.prototype.initialize = function (loggerStaticInfo, options) {
        var _this = this;
        this.resolveStaticInfo(loggerStaticInfo);
        this._logOptions = options || this._logOptions || this.getDefaultOptions();
        this._logOptions.appenders.forEach(function (appenderOptions) {
            if (appenderOptions.isDefferred) {
                var appender = AppenderRepository.instance.getAppender(appenderOptions.name);
                var delay = _this._logOptions.logInterval || 10000;
                _this.defLogWriter = _this.defLogWriter || LogWriter.getDefferredWriter(delay);
                appender.update(appenderOptions);
                _this.defLogWriter.addAppender(appender);
            }
            else {
                var appender = AppenderRepository.instance.getAppender(appenderOptions.name);
                appender.update(appenderOptions);
                _this.immedWriter.addAppender(appender);
            }
        });
    };
    LoggingController.prototype.enqueue = function (logEvent) {
        logEvent.appName = this._staticInfo.appName;
        logEvent.user = this._staticInfo.user;
        logEvent.region = this._staticInfo.region;
        logEvent.env = this._staticInfo.env;
        this.immedWriter.addLogEntry(logEvent);
        if (this.defLogWriter) {
            this.defLogWriter.addLogEntry(logEvent);
        }
    };
    LoggingController.prototype.resolveStaticInfo = function (staticInfo) {
        this._staticInfo.appName = this._staticInfo.appName || staticInfo.appName;
        this._staticInfo.user = this._staticInfo.user || staticInfo.user;
        this._staticInfo.env = this._staticInfo.env || staticInfo.env;
        this._staticInfo.region = this._staticInfo.region || staticInfo.region;
    };
    LoggingController.prototype.getDefaultOptions = function () {
        return {
            appLogLevel: LogLevel.ALL,
            logInterval: 10000,
            appenders: [{
                    name: 'console',
                    format: 'text',
                    logLevel: LogLevel.ALL
                }]
        };
    };
    Object.defineProperty(LoggingController, "instance", {
        get: function () {
            return LoggingController._instance;
        },
        enumerable: true,
        configurable: true
    });
    LoggingController._instance = new LoggingController();
    return LoggingController;
}());

var LoggingEvent = (function () {
    function LoggingEvent() {
    }
    return LoggingEvent;
}());

var Logger = (function () {
    function Logger(loggerName, level) {
        this.loggerName = loggerName;
        this.level = level;
        this.timer = new Map();
        this.moduleLogLevel = level ? level : LogLevel.ALL;
    }
    Logger.prototype.log = function (level, params) {
        if (level >= this.moduleLogLevel) {
            this.buildLoggingEvent(level, params);
        }
    };
    Logger.prototype.trace = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (this.moduleLogLevel >= LogLevel.TRACE) {
            this.buildLoggingEvent(LogLevel.TRACE, messages);
        }
    };
    Logger.prototype.debug = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (LogLevel.DEBUG >= this.moduleLogLevel) {
            this.buildLoggingEvent(LogLevel.DEBUG, messages);
        }
    };
    Logger.prototype.info = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (LogLevel.INFO >= this.moduleLogLevel) {
            this.buildLoggingEvent(LogLevel.INFO, messages);
        }
    };
    Logger.prototype.warn = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (LogLevel.WARN >= this.moduleLogLevel) {
            this.buildLoggingEvent(LogLevel.WARN, messages);
        }
    };
    Logger.prototype.error = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (LogLevel.ERROR >= this.moduleLogLevel) {
            this.buildLoggingEvent(LogLevel.ERROR, messages);
        }
    };
    Logger.prototype.fatal = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (LogLevel.FATAL >= this.moduleLogLevel) {
            this.buildLoggingEvent(LogLevel.FATAL, messages);
        }
    };
    Logger.prototype.group = function (name, initiallyExpanded) {
        // this.buildLoggingEvent(LogLevel.TRACE,undefined,messages);
    };
    Logger.prototype.groupEnd = function () {
        // this.buildLoggingEvent(LogLevel.TRACE,undefined,messages);
    };
    Logger.prototype.time = function (name, level) {
        if (LogLevel.INFO >= this.moduleLogLevel) {
            if (!this.timer.has(name)) {
                this.timer.set(name, Date.now());
            }
        }
    };
    Logger.prototype.timeEnd = function (name) {
        if (LogLevel.INFO >= this.moduleLogLevel) {
            var startTime = this.timer.get(name);
            var message = "Time taken by [" + name + "] : " + (Date.now() - startTime) / 1000 + " seconds";
            this.timer.delete(name);
            this.buildLoggingEvent(LogLevel.INFO, [message]);
        }
    };
    Logger.prototype.assert = function (expr) {
        // this.buildLoggingEvent(LogLevel.TRACE,undefined,messages);
    };
    Object.defineProperty(Logger.prototype, "name", {
        get: function () {
            return this.loggerName;
        },
        enumerable: true,
        configurable: true
    });
    Logger.prototype.buildLoggingEvent = function (level, messages) {
        var loggingEvent = new LoggingEvent();
        loggingEvent.name = this.name;
        loggingEvent.level = level;
        loggingEvent.timestamp = Date.now();
        loggingEvent.message = this.buildMessage(messages);
        LoggingController.instance.enqueue(loggingEvent);
    };
    Logger.prototype.buildMessage = function (messages) {
        var message = "";
        messages.forEach(function (msg) {
            if (msg instanceof Error) {
                message += msg.stack + ", ";
            }
            else if (typeof msg === "object") {
                message += JSON.stringify(msg) + ", ";
            }
            else {
                message += msg + ", ";
            }
        });
        return message.length > 0 ? message.slice(0, message.length - 2) : "";
    };
    return Logger;
}());

// import { Logger } from './../logwriters/app.logger';
// import { LogLevel, ApplicationLogger } from '../fit-logger-core/index';
var FitWorkerLoggerService = (function () {
    function FitWorkerLoggerService() {
        if (FitWorkerLoggerService._instance) {
            throw new Error("Error: Instantiation failed: Use FitWorkerLoggerService.instance instead of new.");
        }
        FitWorkerLoggerService._instance = this;
    }
    FitWorkerLoggerService.prototype.init = function (loggerStaticInfo, options) {
        LoggingController.instance.initialize(loggerStaticInfo, options);
    };
    FitWorkerLoggerService.prototype.getLogger = function (name, level) {
        return new Logger(name, level);
    };
    Object.defineProperty(FitWorkerLoggerService, "instance", {
        get: function () {
            return FitWorkerLoggerService._instance;
        },
        enumerable: true,
        configurable: true
    });
    FitWorkerLoggerService._instance = new FitWorkerLoggerService();
    return FitWorkerLoggerService;
}());

var MessageBroker = (function () {
    function MessageBroker() {
        //#endregion
        //#region Private/Public Members
        this.inBoxMessageNotifier = new Subject_2();
        this.inBox$ = this.inBoxMessageNotifier.asObservable();
        this.contexts = new Map();
        this.logger = console;
        if (MessageBroker._instance) {
            throw new Error("Error: Instantiation failed: Use MessageBroker.instance instead of new.");
        }
        MessageBroker._instance = this;
    }
    Object.defineProperty(MessageBroker, "instance", {
        get: function () {
            return MessageBroker._instance;
        },
        enumerable: true,
        configurable: true
    });
    //#endregion
    //#region Public Methods
    MessageBroker.prototype.onMessage = function (workerMessage, context) {
        switch (workerMessage.type) {
            case WorkerMessageTypes.CONNECT_WORKER:
                this.logger.info('Worker connection request received');
                this.postMessage(WorkerMessageBuilder.build(WorkerMessageTypes.CONNECT_WORKER_SUCCESS), context);
                break;
            case WorkerMessageTypes.SET_WORKER_CONFIG:
                this.onSetConfigRequestReceived(workerMessage, context);
                break;
            default:
                this.inBoxMessageNotifier.next(workerMessage);
                break;
        }
    };
    MessageBroker.prototype.postMessage = function (workerMessage, context, sendToAll) {
        if (!sendToAll) {
            context.postMessage(workerMessage);
        }
        else {
            this.contexts.forEach(function (value) {
                value.context.postMessage(workerMessage);
            });
        }
    };
    //#endregion
    //#region Helper Methods
    MessageBroker.prototype.onSetConfigRequestReceived = function (workerMessage, context) {
        var payload = workerMessage.payload;
        if (context && payload) {
            if (payload.workerInfo && payload.workerInfo.name && payload.loggingAppInfo.appName) {
                var key = payload.workerInfo.name + "-" + payload.loggingAppInfo.appName;
                var brokerConfig = { workerConfig: payload, context: context };
                this.contexts.set(key, brokerConfig);
                payload.loggingAppInfo.appName = payload.workerInfo.name + "-" + payload.workerInfo.type + "-" + payload.loggingAppInfo.appName;
                FitWorkerLoggerService.instance.init(payload.loggingAppInfo, payload.logOptions);
                this.logger = FitWorkerLoggerService.instance.getLogger('MessageBroker');
                this.postMessage(WorkerMessageBuilder.build(WorkerMessageTypes.WORKER_READY), context);
                this.logger.info('Worker configuration has been set successfully.', payload);
                return;
            }
        }
        this.postMessage(WorkerMessageBuilder.build(WorkerMessageTypes.SET_WORKER_CONFIG_FAILED, 'InComplete worker configuration'), context);
    };
    //#region Static Members
    MessageBroker._instance = new MessageBroker();
    return MessageBroker;
}());

// import { WorkerAgent } from './worker-agent';
console.info('Dedicated worker has been started');
MessageBroker.instance.onMessage(WorkerMessageBuilder.build(WorkerMessageTypes.CONNECT_WORKER), self);
self.addEventListener('message', function (evt) {
    MessageBroker.instance.onMessage(evt.data, self);
});
self.addEventListener('messageerror', function (evt) {
    console.error(evt);
});

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHdvcmtlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vYXBwL2NvbmZpZy1tb2RlbHMvd29ya2VyLW1lc3NhZ2UtdHlwZXMudHMiLCIuLi8uLi9hcHAvY29uZmlnLW1vZGVscy93b3JrZXItaW5mby50cyIsIi4uLy4uL2FwcC9jb25maWctbW9kZWxzL3dvcmtlci1tZXNzYWdlLnRzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9yb290LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0Z1bmN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0FycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc09iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvZXJyb3JPYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL3RyeUNhdGNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvU3Vic2NyaXB0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvT2JzZXJ2ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9zeW1ib2wvcnhTdWJzY3JpYmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvU3Vic2NyaWJlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvdG9TdWJzY3JpYmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvc3ltYm9sL29ic2VydmFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL25vb3AuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL3BpcGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9PYnNlcnZhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL1N1YmplY3RTdWJzY3JpcHRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9TdWJqZWN0LmpzIiwiLi4vLi4vYXBwL2ZpdC1sb2dnZXIvYXBwZW5kZXJzL3NlcnZlci5hcHBlbmRlci50cyIsIi4uLy4uL2FwcC9maXQtbG9nZ2VyLWNvcmUvbG9nZ2luZy5tb2RlbHMudHMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9hcHBlbmRlcnMvY29uc29sZS5hcHBlbmRlci50cyIsIi4uLy4uL2FwcC9maXQtbG9nZ2VyL2FwcGVuZGVycy93b3JrZXIuYXBwZW5kZXIudHMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9hcHBlbmRlcnMvYXBwZW5kZXIucmVwb3NpdG9yeS50cyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvaXNOdW1lcmljLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvc2NoZWR1bGVyL0FjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3NjaGVkdWxlci9Bc3luY0FjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL1NjaGVkdWxlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3NjaGVkdWxlci9Bc3luY1NjaGVkdWxlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3NjaGVkdWxlci9hc3luYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL29ic2VydmFibGUvSW50ZXJ2YWxPYnNlcnZhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvb2JzZXJ2YWJsZS9pbnRlcnZhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL2FkZC9vYnNlcnZhYmxlL2ludGVydmFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvb3BlcmF0b3JzL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL29wZXJhdG9yL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL2FkZC9vcGVyYXRvci9maWx0ZXIuanMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9sb2d3cml0ZXJzL2xvZy53cml0ZXIudHMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9sb2d3cml0ZXJzL2xvZ2dpbmcuY29udHJvbGxlci50cyIsIi4uLy4uL2FwcC9maXQtbG9nZ2VyL21vZGVscy9sb2ctZXZlbnQudHMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9sb2d3cml0ZXJzL2FwcC5sb2dnZXIudHMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9maXQtd29ya2VyLWxvZ2dlci5zZXJ2aWNlLnRzIiwiLi4vLi4vYXBwL3NvY2tldC1zZXJ2aWNlcy9tZXNzYWdlLWJyb2tlci50cyIsIi4uLy4uL2FwcC93b3JrZXItc2VydmljZXMvZGVkaWNhdGVkLXdvcmtlci1nYXRld2F5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBXb3JrZXJNZXNzYWdlVHlwZXMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBDT05ORUNUX1dPUktFUiA6ICdDT05ORUNUX1dPUktFUicsXG4gICAgQ09OTkVDVF9XT1JLRVJfU1VDQ0VTUyA6ICdDT05ORUNUX1dPUktFUl9TVUNDRVNTJyxcbiAgICBDT05ORUNUX1dPUktFUl9GQUlMRUQgOiAnQ09OTkVDVF9XT1JLRVJfRkFJTEVEJyxcblxuICAgIFNFVF9XT1JLRVJfQ09ORklHIDogJ1NFVF9XT1JLRVJfQ09ORklHJyxcbiAgICBTRVRfV09SS0VSX0NPTkZJR19GQUlMRUQgOiAnU0VUX1dPUktFUl9DT05GSUdfRkFJTEVEJyxcbiAgICBXT1JLRVJfUkVBRFkgOiAnV09SS0VSX1JFQURZJyxcblxuICAgIENPTk5FQ1RfU09DS0VUIDogJ0NPTk5FQ1RfU09DS0VUJyxcbiAgICBDT05ORUNUX1NPQ0tFVF9TVUNDRVNTIDogJ0NPTk5FQ1RfU09DS0VUX1NVQ0NFU1MnLFxuICAgIENPTk5FQ1RfU09DS0VUX0ZBSUxFRCA6ICdDT05ORUNUX1NPQ0tFVF9GQUlMRUQnLFxuXG4gICAgU1VCU0NSSUJFX0RBVEEgOiAnU1VCU0NSSUJFX0RBVEEnLFxuICAgIFNVQlNDUklCRV9EQVRBX0ZBSUxFRCA6ICdTVUJTQ1JJQkVfREFUQV9GQUlMRUQnXG59KTtcblxuXG4iLCJpbXBvcnQgeyBMb2dnZXJTdGF0aWNJbmZvLCBMb2dPcHRpb25zIH0gZnJvbSBcIi4uL2ZpdC1sb2dnZXItY29yZS9pbmRleFwiO1xuXG5cbi8vIGV4cG9ydCB0eXBlIFdvcmtlclR5cGUgPSAnREVESUNBVEVEJyB8ICdTSEFSRUQnIHwgJ0xPQ0FMJztcbmV4cG9ydCBjb25zdCBXb3JrZXJUeXBlcyA9IE9iamVjdC5mcmVlemUoe1xuICBERURJQ0FURUQgOiAnREVESUNBVEVEJyxcbiAgU0hBUkVEIDogJ1NIQVJFRCcsXG4gIExPQ0FMIDogJ0xPQ0FMJ1xufSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV29ya2VySW5mbyB7XG4gICAgbmFtZSA6IHN0cmluZztcbiAgICBmaWxlOiBzdHJpbmc7XG4gICAgaXNBY3RpdmU6IGJvb2xlYW47XG4gICAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtlckNvbmZpZyB7XG4gIHdvcmtlckluZm86IFdvcmtlckluZm87XG4gIGxvZ2dpbmdBcHBJbmZvIDogTG9nZ2VyU3RhdGljSW5mbztcbiAgbG9nT3B0aW9ucyA6IExvZ09wdGlvbnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnJva2VyQ29uZmlnIHtcbiAgICB3b3JrZXJDb25maWcgOiBXb3JrZXJDb25maWc7XG4gICAgY29udGV4dCA6IGFueTtcbn1cblxuIiwiXG5leHBvcnQgY2xhc3MgV29ya2VyTWVzc2FnZSB7XG4gICAgdHlwZSA6IHN0cmluZztcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZD86IGFueSkge1xuXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgV29ya2VyTWVzc2FnZUJ1aWxkZXIge1xuICAgIHN0YXRpYyBidWlsZCh0eXBlOiBzdHJpbmcscGF5bG9hZD86IGFueSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gbmV3IFdvcmtlck1lc3NhZ2UocGF5bG9hZCk7XG4gICAgICAgIG1lc3NhZ2UudHlwZSA9IHR5cGU7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29tbW9uSlMgLyBOb2RlIGhhdmUgZ2xvYmFsIGNvbnRleHQgZXhwb3NlZCBhcyBcImdsb2JhbFwiIHZhcmlhYmxlLlxuLy8gV2UgZG9uJ3Qgd2FudCB0byBpbmNsdWRlIHRoZSB3aG9sZSBub2RlLmQudHMgdGhpcyB0aGlzIGNvbXBpbGF0aW9uIHVuaXQgc28gd2UnbGwganVzdCBmYWtlXG4vLyB0aGUgZ2xvYmFsIFwiZ2xvYmFsXCIgdmFyIGZvciBub3cuXG52YXIgX193aW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3c7XG52YXIgX19zZWxmID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiYgc2VsZjtcbnZhciBfX2dsb2JhbCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbDtcbnZhciBfcm9vdCA9IF9fd2luZG93IHx8IF9fZ2xvYmFsIHx8IF9fc2VsZjtcbmV4cG9ydHMucm9vdCA9IF9yb290O1xuLy8gV29ya2Fyb3VuZCBDbG9zdXJlIENvbXBpbGVyIHJlc3RyaWN0aW9uOiBUaGUgYm9keSBvZiBhIGdvb2cubW9kdWxlIGNhbm5vdCB1c2UgdGhyb3cuXG4vLyBUaGlzIGlzIG5lZWRlZCB3aGVuIHVzZWQgd2l0aCBhbmd1bGFyL3RzaWNrbGUgd2hpY2ggaW5zZXJ0cyBhIGdvb2cubW9kdWxlIHN0YXRlbWVudC5cbi8vIFdyYXAgaW4gSUlGRVxuKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIV9yb290KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUnhKUyBjb3VsZCBub3QgZmluZCBhbnkgZ2xvYmFsIGNvbnRleHQgKHdpbmRvdywgc2VsZiwgZ2xvYmFsKScpO1xuICAgIH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb290LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRnVuY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLmlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IChmdW5jdGlvbiAoeCkgeyByZXR1cm4geCAmJiB0eXBlb2YgeC5sZW5ndGggPT09ICdudW1iZXInOyB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzQXJyYXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIHggIT0gbnVsbCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCc7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc09iamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIHR5cGVvZiBhbnkgc28gdGhhdCBpdCB3ZSBkb24ndCBoYXZlIHRvIGNhc3Qgd2hlbiBjb21wYXJpbmcgYSByZXN1bHQgdG8gdGhlIGVycm9yIG9iamVjdFxuZXhwb3J0cy5lcnJvck9iamVjdCA9IHsgZToge30gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9yT2JqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIGVycm9yT2JqZWN0XzEgPSByZXF1aXJlKCcuL2Vycm9yT2JqZWN0Jyk7XG52YXIgdHJ5Q2F0Y2hUYXJnZXQ7XG5mdW5jdGlvbiB0cnlDYXRjaGVyKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0cnlDYXRjaFRhcmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmUgPSBlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdDtcbiAgICB9XG59XG5mdW5jdGlvbiB0cnlDYXRjaChmbikge1xuICAgIHRyeUNhdGNoVGFyZ2V0ID0gZm47XG4gICAgcmV0dXJuIHRyeUNhdGNoZXI7XG59XG5leHBvcnRzLnRyeUNhdGNoID0gdHJ5Q2F0Y2g7XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cnlDYXRjaC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuLyoqXG4gKiBBbiBlcnJvciB0aHJvd24gd2hlbiBvbmUgb3IgbW9yZSBlcnJvcnMgaGF2ZSBvY2N1cnJlZCBkdXJpbmcgdGhlXG4gKiBgdW5zdWJzY3JpYmVgIG9mIGEge0BsaW5rIFN1YnNjcmlwdGlvbn0uXG4gKi9cbnZhciBVbnN1YnNjcmlwdGlvbkVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVW5zdWJzY3JpcHRpb25FcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVbnN1YnNjcmlwdGlvbkVycm9yKGVycm9ycykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgICAgIHZhciBlcnIgPSBFcnJvci5jYWxsKHRoaXMsIGVycm9ycyA/XG4gICAgICAgICAgICBlcnJvcnMubGVuZ3RoICsgXCIgZXJyb3JzIG9jY3VycmVkIGR1cmluZyB1bnN1YnNjcmlwdGlvbjpcXG4gIFwiICsgZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyLCBpKSB7IHJldHVybiAoKGkgKyAxKSArIFwiKSBcIiArIGVyci50b1N0cmluZygpKTsgfSkuam9pbignXFxuICAnKSA6ICcnKTtcbiAgICAgICAgdGhpcy5uYW1lID0gZXJyLm5hbWUgPSAnVW5zdWJzY3JpcHRpb25FcnJvcic7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBlcnIuc3RhY2s7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICAgIH1cbiAgICByZXR1cm4gVW5zdWJzY3JpcHRpb25FcnJvcjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuVW5zdWJzY3JpcHRpb25FcnJvciA9IFVuc3Vic2NyaXB0aW9uRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VbnN1YnNjcmlwdGlvbkVycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIGlzQXJyYXlfMSA9IHJlcXVpcmUoJy4vdXRpbC9pc0FycmF5Jyk7XG52YXIgaXNPYmplY3RfMSA9IHJlcXVpcmUoJy4vdXRpbC9pc09iamVjdCcpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoJy4vdXRpbC9pc0Z1bmN0aW9uJyk7XG52YXIgdHJ5Q2F0Y2hfMSA9IHJlcXVpcmUoJy4vdXRpbC90cnlDYXRjaCcpO1xudmFyIGVycm9yT2JqZWN0XzEgPSByZXF1aXJlKCcuL3V0aWwvZXJyb3JPYmplY3QnKTtcbnZhciBVbnN1YnNjcmlwdGlvbkVycm9yXzEgPSByZXF1aXJlKCcuL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvcicpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGlzcG9zYWJsZSByZXNvdXJjZSwgc3VjaCBhcyB0aGUgZXhlY3V0aW9uIG9mIGFuIE9ic2VydmFibGUuIEFcbiAqIFN1YnNjcmlwdGlvbiBoYXMgb25lIGltcG9ydGFudCBtZXRob2QsIGB1bnN1YnNjcmliZWAsIHRoYXQgdGFrZXMgbm8gYXJndW1lbnRcbiAqIGFuZCBqdXN0IGRpc3Bvc2VzIHRoZSByZXNvdXJjZSBoZWxkIGJ5IHRoZSBzdWJzY3JpcHRpb24uXG4gKlxuICogQWRkaXRpb25hbGx5LCBzdWJzY3JpcHRpb25zIG1heSBiZSBncm91cGVkIHRvZ2V0aGVyIHRocm91Z2ggdGhlIGBhZGQoKWBcbiAqIG1ldGhvZCwgd2hpY2ggd2lsbCBhdHRhY2ggYSBjaGlsZCBTdWJzY3JpcHRpb24gdG8gdGhlIGN1cnJlbnQgU3Vic2NyaXB0aW9uLlxuICogV2hlbiBhIFN1YnNjcmlwdGlvbiBpcyB1bnN1YnNjcmliZWQsIGFsbCBpdHMgY2hpbGRyZW4gKGFuZCBpdHMgZ3JhbmRjaGlsZHJlbilcbiAqIHdpbGwgYmUgdW5zdWJzY3JpYmVkIGFzIHdlbGwuXG4gKlxuICogQGNsYXNzIFN1YnNjcmlwdGlvblxuICovXG52YXIgU3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFt1bnN1YnNjcmliZV0gQSBmdW5jdGlvbiBkZXNjcmliaW5nIGhvdyB0b1xuICAgICAqIHBlcmZvcm0gdGhlIGRpc3Bvc2FsIG9mIHJlc291cmNlcyB3aGVuIHRoZSBgdW5zdWJzY3JpYmVgIG1ldGhvZCBpcyBjYWxsZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZsYWcgdG8gaW5kaWNhdGUgd2hldGhlciB0aGlzIFN1YnNjcmlwdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHVuc3Vic2NyaWJlZC5cbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgICAgIGlmICh1bnN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlcyB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHN1YnNjcmlwdGlvbi4gTWF5LCBmb3IgaW5zdGFuY2UsIGNhbmNlbFxuICAgICAqIGFuIG9uZ29pbmcgT2JzZXJ2YWJsZSBleGVjdXRpb24gb3IgY2FuY2VsIGFueSBvdGhlciB0eXBlIG9mIHdvcmsgdGhhdFxuICAgICAqIHN0YXJ0ZWQgd2hlbiB0aGUgU3Vic2NyaXB0aW9uIHdhcyBjcmVhdGVkLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhhc0Vycm9ycyA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3JzO1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSB0aGlzLCBfcGFyZW50ID0gX2EuX3BhcmVudCwgX3BhcmVudHMgPSBfYS5fcGFyZW50cywgX3Vuc3Vic2NyaWJlID0gX2EuX3Vuc3Vic2NyaWJlLCBfc3Vic2NyaXB0aW9ucyA9IF9hLl9zdWJzY3JpcHRpb25zO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcmVudHMgPSBudWxsO1xuICAgICAgICAvLyBudWxsIG91dCBfc3Vic2NyaXB0aW9ucyBmaXJzdCBzbyBhbnkgY2hpbGQgc3Vic2NyaXB0aW9ucyB0aGF0IGF0dGVtcHRcbiAgICAgICAgLy8gdG8gcmVtb3ZlIHRoZW1zZWx2ZXMgZnJvbSB0aGlzIHN1YnNjcmlwdGlvbiB3aWxsIG5vb3BcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICB2YXIgbGVuID0gX3BhcmVudHMgPyBfcGFyZW50cy5sZW5ndGggOiAwO1xuICAgICAgICAvLyBpZiB0aGlzLl9wYXJlbnQgaXMgbnVsbCwgdGhlbiBzbyBpcyB0aGlzLl9wYXJlbnRzLCBhbmQgd2VcbiAgICAgICAgLy8gZG9uJ3QgaGF2ZSB0byByZW1vdmUgb3Vyc2VsdmVzIGZyb20gYW55IHBhcmVudCBzdWJzY3JpcHRpb25zLlxuICAgICAgICB3aGlsZSAoX3BhcmVudCkge1xuICAgICAgICAgICAgX3BhcmVudC5yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICAvLyBpZiB0aGlzLl9wYXJlbnRzIGlzIG51bGwgb3IgaW5kZXggPj0gbGVuLFxuICAgICAgICAgICAgLy8gdGhlbiBfcGFyZW50IGlzIHNldCB0byBudWxsLCBhbmQgdGhlIGxvb3AgZXhpdHNcbiAgICAgICAgICAgIF9wYXJlbnQgPSArK2luZGV4IDwgbGVuICYmIF9wYXJlbnRzW2luZGV4XSB8fCBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihfdW5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICB2YXIgdHJpYWwgPSB0cnlDYXRjaF8xLnRyeUNhdGNoKF91bnN1YnNjcmliZSkuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIGlmICh0cmlhbCA9PT0gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzIHx8IChlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmUgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvciA/XG4gICAgICAgICAgICAgICAgICAgIGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmUuZXJyb3JzKSA6IFtlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheV8xLmlzQXJyYXkoX3N1YnNjcmlwdGlvbnMpKSB7XG4gICAgICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICAgICAgbGVuID0gX3N1YnNjcmlwdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgICAgICB2YXIgc3ViID0gX3N1YnNjcmlwdGlvbnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChpc09iamVjdF8xLmlzT2JqZWN0KHN1YikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyaWFsID0gdHJ5Q2F0Y2hfMS50cnlDYXRjaChzdWIudW5zdWJzY3JpYmUpLmNhbGwoc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyaWFsID09PSBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QuZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQoZmxhdHRlblVuc3Vic2NyaXB0aW9uRXJyb3JzKGVyci5lcnJvcnMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0Vycm9ycykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yKGVycm9ycyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZHMgYSB0ZWFyIGRvd24gdG8gYmUgY2FsbGVkIGR1cmluZyB0aGUgdW5zdWJzY3JpYmUoKSBvZiB0aGlzXG4gICAgICogU3Vic2NyaXB0aW9uLlxuICAgICAqXG4gICAgICogSWYgdGhlIHRlYXIgZG93biBiZWluZyBhZGRlZCBpcyBhIHN1YnNjcmlwdGlvbiB0aGF0IGlzIGFscmVhZHlcbiAgICAgKiB1bnN1YnNjcmliZWQsIGlzIHRoZSBzYW1lIHJlZmVyZW5jZSBgYWRkYCBpcyBiZWluZyBjYWxsZWQgb24sIG9yIGlzXG4gICAgICogYFN1YnNjcmlwdGlvbi5FTVBUWWAsIGl0IHdpbGwgbm90IGJlIGFkZGVkLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBzdWJzY3JpcHRpb24gaXMgYWxyZWFkeSBpbiBhbiBgY2xvc2VkYCBzdGF0ZSwgdGhlIHBhc3NlZFxuICAgICAqIHRlYXIgZG93biBsb2dpYyB3aWxsIGJlIGV4ZWN1dGVkIGltbWVkaWF0ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtUZWFyZG93bkxvZ2ljfSB0ZWFyZG93biBUaGUgYWRkaXRpb25hbCBsb2dpYyB0byBleGVjdXRlIG9uXG4gICAgICogdGVhcmRvd24uXG4gICAgICogQHJldHVybiB7U3Vic2NyaXB0aW9ufSBSZXR1cm5zIHRoZSBTdWJzY3JpcHRpb24gdXNlZCBvciBjcmVhdGVkIHRvIGJlXG4gICAgICogYWRkZWQgdG8gdGhlIGlubmVyIHN1YnNjcmlwdGlvbnMgbGlzdC4gVGhpcyBTdWJzY3JpcHRpb24gY2FuIGJlIHVzZWQgd2l0aFxuICAgICAqIGByZW1vdmUoKWAgdG8gcmVtb3ZlIHRoZSBwYXNzZWQgdGVhcmRvd24gbG9naWMgZnJvbSB0aGUgaW5uZXIgc3Vic2NyaXB0aW9uc1xuICAgICAqIGxpc3QuXG4gICAgICovXG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgaWYgKCF0ZWFyZG93biB8fCAodGVhcmRvd24gPT09IFN1YnNjcmlwdGlvbi5FTVBUWSkpIHtcbiAgICAgICAgICAgIHJldHVybiBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRlYXJkb3duID09PSB0aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGVhcmRvd247XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHRlYXJkb3duKSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbih0ZWFyZG93bik7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24uY2xvc2VkIHx8IHR5cGVvZiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzdWJzY3JpcHRpb24uX2FkZFBhcmVudCAhPT0gJ2Z1bmN0aW9uJyAvKiBxdWFjayBxdWFjayAqLykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5fc3Vic2NyaXB0aW9ucyA9IFt0bXBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgdGVhcmRvd24gJyArIHRlYXJkb3duICsgJyBhZGRlZCB0byBTdWJzY3JpcHRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zIHx8ICh0aGlzLl9zdWJzY3JpcHRpb25zID0gW10pO1xuICAgICAgICBzdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgc3Vic2NyaXB0aW9uLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgU3Vic2NyaXB0aW9uIGZyb20gdGhlIGludGVybmFsIGxpc3Qgb2Ygc3Vic2NyaXB0aW9ucyB0aGF0IHdpbGxcbiAgICAgKiB1bnN1YnNjcmliZSBkdXJpbmcgdGhlIHVuc3Vic2NyaWJlIHByb2Nlc3Mgb2YgdGhpcyBTdWJzY3JpcHRpb24uXG4gICAgICogQHBhcmFtIHtTdWJzY3JpcHRpb259IHN1YnNjcmlwdGlvbiBUaGUgc3Vic2NyaXB0aW9uIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHN1YnNjcmlwdGlvbikge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9ucyA9IHRoaXMuX3N1YnNjcmlwdGlvbnM7XG4gICAgICAgIGlmIChzdWJzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uSW5kZXggPSBzdWJzY3JpcHRpb25zLmluZGV4T2Yoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb25JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25zLnNwbGljZShzdWJzY3JpcHRpb25JbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuX2FkZFBhcmVudCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgX3BhcmVudCA9IF9hLl9wYXJlbnQsIF9wYXJlbnRzID0gX2EuX3BhcmVudHM7XG4gICAgICAgIGlmICghX3BhcmVudCB8fCBfcGFyZW50ID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBwYXJlbnQsIG9yIHRoZSBuZXcgcGFyZW50IGlzIHRoZSBzYW1lIGFzIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBwYXJlbnQsIHRoZW4gc2V0IHRoaXMuX3BhcmVudCB0byB0aGUgbmV3IHBhcmVudC5cbiAgICAgICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghX3BhcmVudHMpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYWxyZWFkeSBvbmUgcGFyZW50LCBidXQgbm90IG11bHRpcGxlLCBhbGxvY2F0ZSBhbiBBcnJheSB0b1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIHJlc3Qgb2YgdGhlIHBhcmVudCBTdWJzY3JpcHRpb25zLlxuICAgICAgICAgICAgdGhpcy5fcGFyZW50cyA9IFtwYXJlbnRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKF9wYXJlbnRzLmluZGV4T2YocGFyZW50KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIE9ubHkgYWRkIHRoZSBuZXcgcGFyZW50IHRvIHRoZSBfcGFyZW50cyBsaXN0IGlmIGl0J3Mgbm90IGFscmVhZHkgdGhlcmUuXG4gICAgICAgICAgICBfcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5FTVBUWSA9IChmdW5jdGlvbiAoZW1wdHkpIHtcbiAgICAgICAgZW1wdHkuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGVtcHR5O1xuICAgIH0obmV3IFN1YnNjcmlwdGlvbigpKSk7XG4gICAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKSk7XG5leHBvcnRzLlN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbjtcbmZ1bmN0aW9uIGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlcnJvcnMpIHtcbiAgICByZXR1cm4gZXJyb3JzLnJlZHVjZShmdW5jdGlvbiAoZXJycywgZXJyKSB7IHJldHVybiBlcnJzLmNvbmNhdCgoZXJyIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IpID8gZXJyLmVycm9ycyA6IGVycik7IH0sIFtdKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmlwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuZW1wdHkgPSB7XG4gICAgY2xvc2VkOiB0cnVlLFxuICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7IHRocm93IGVycjsgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkgeyB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JzZXJ2ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcm9vdF8xID0gcmVxdWlyZSgnLi4vdXRpbC9yb290Jyk7XG52YXIgU3ltYm9sID0gcm9vdF8xLnJvb3QuU3ltYm9sO1xuZXhwb3J0cy5yeFN1YnNjcmliZXIgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLmZvciA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgIFN5bWJvbC5mb3IoJ3J4U3Vic2NyaWJlcicpIDogJ0BAcnhTdWJzY3JpYmVyJztcbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIHJ4U3Vic2NyaWJlciBpbnN0ZWFkXG4gKi9cbmV4cG9ydHMuJCRyeFN1YnNjcmliZXIgPSBleHBvcnRzLnJ4U3Vic2NyaWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ4U3Vic2NyaWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoJy4vdXRpbC9pc0Z1bmN0aW9uJyk7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuL1N1YnNjcmlwdGlvbicpO1xudmFyIE9ic2VydmVyXzEgPSByZXF1aXJlKCcuL09ic2VydmVyJyk7XG52YXIgcnhTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL3N5bWJvbC9yeFN1YnNjcmliZXInKTtcbi8qKlxuICogSW1wbGVtZW50cyB0aGUge0BsaW5rIE9ic2VydmVyfSBpbnRlcmZhY2UgYW5kIGV4dGVuZHMgdGhlXG4gKiB7QGxpbmsgU3Vic2NyaXB0aW9ufSBjbGFzcy4gV2hpbGUgdGhlIHtAbGluayBPYnNlcnZlcn0gaXMgdGhlIHB1YmxpYyBBUEkgZm9yXG4gKiBjb25zdW1pbmcgdGhlIHZhbHVlcyBvZiBhbiB7QGxpbmsgT2JzZXJ2YWJsZX0sIGFsbCBPYnNlcnZlcnMgZ2V0IGNvbnZlcnRlZCB0b1xuICogYSBTdWJzY3JpYmVyLCBpbiBvcmRlciB0byBwcm92aWRlIFN1YnNjcmlwdGlvbi1saWtlIGNhcGFiaWxpdGllcyBzdWNoIGFzXG4gKiBgdW5zdWJzY3JpYmVgLiBTdWJzY3JpYmVyIGlzIGEgY29tbW9uIHR5cGUgaW4gUnhKUywgYW5kIGNydWNpYWwgZm9yXG4gKiBpbXBsZW1lbnRpbmcgb3BlcmF0b3JzLCBidXQgaXQgaXMgcmFyZWx5IHVzZWQgYXMgYSBwdWJsaWMgQVBJLlxuICpcbiAqIEBjbGFzcyBTdWJzY3JpYmVyPFQ+XG4gKi9cbnZhciBTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09ic2VydmVyfGZ1bmN0aW9uKHZhbHVlOiBUKTogdm9pZH0gW2Rlc3RpbmF0aW9uT3JOZXh0XSBBIHBhcnRpYWxseVxuICAgICAqIGRlZmluZWQgT2JzZXJ2ZXIgb3IgYSBgbmV4dGAgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihlOiA/YW55KTogdm9pZH0gW2Vycm9yXSBUaGUgYGVycm9yYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBUaGUgYGNvbXBsZXRlYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN1YnNjcmliZXIoZGVzdGluYXRpb25Pck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5zeW5jRXJyb3JWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3duID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBPYnNlcnZlcl8xLmVtcHR5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGlmICghZGVzdGluYXRpb25Pck5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IE9ic2VydmVyXzEuZW1wdHk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRlc3RpbmF0aW9uT3JOZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdGluYXRpb25Pck5leHQgaW5zdGFuY2VvZiBTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IGRlc3RpbmF0aW9uT3JOZXh0LnN5bmNFcnJvclRocm93YWJsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbk9yTmV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uYWRkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBTYWZlU3Vic2NyaWJlcih0aGlzLCBkZXN0aW5hdGlvbk9yTmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBTYWZlU3Vic2NyaWJlcih0aGlzLCBkZXN0aW5hdGlvbk9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZVtyeFN1YnNjcmliZXJfMS5yeFN1YnNjcmliZXJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcbiAgICAvKipcbiAgICAgKiBBIHN0YXRpYyBmYWN0b3J5IGZvciBhIFN1YnNjcmliZXIsIGdpdmVuIGEgKHBvdGVudGlhbGx5IHBhcnRpYWwpIGRlZmluaXRpb25cbiAgICAgKiBvZiBhbiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHg6ID9UKTogdm9pZH0gW25leHRdIFRoZSBgbmV4dGAgY2FsbGJhY2sgb2YgYW4gT2JzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihlOiA/YW55KTogdm9pZH0gW2Vycm9yXSBUaGUgYGVycm9yYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBUaGUgYGNvbXBsZXRlYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEByZXR1cm4ge1N1YnNjcmliZXI8VD59IEEgU3Vic2NyaWJlciB3cmFwcGluZyB0aGUgKHBhcnRpYWxseSBkZWZpbmVkKVxuICAgICAqIE9ic2VydmVyIHJlcHJlc2VudGVkIGJ5IHRoZSBnaXZlbiBhcmd1bWVudHMuXG4gICAgICovXG4gICAgU3Vic2NyaWJlci5jcmVhdGUgPSBmdW5jdGlvbiAobmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXIobmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgc3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIE9ic2VydmVyfSBjYWxsYmFjayB0byByZWNlaXZlIG5vdGlmaWNhdGlvbnMgb2YgdHlwZSBgbmV4dGAgZnJvbVxuICAgICAqIHRoZSBPYnNlcnZhYmxlLCB3aXRoIGEgdmFsdWUuIFRoZSBPYnNlcnZhYmxlIG1heSBjYWxsIHRoaXMgbWV0aG9kIDAgb3IgbW9yZVxuICAgICAqIHRpbWVzLlxuICAgICAqIEBwYXJhbSB7VH0gW3ZhbHVlXSBUaGUgYG5leHRgIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBub3RpZmljYXRpb25zIG9mIHR5cGUgYGVycm9yYCBmcm9tXG4gICAgICogdGhlIE9ic2VydmFibGUsIHdpdGggYW4gYXR0YWNoZWQge0BsaW5rIEVycm9yfS4gTm90aWZpZXMgdGhlIE9ic2VydmVyIHRoYXRcbiAgICAgKiB0aGUgT2JzZXJ2YWJsZSBoYXMgZXhwZXJpZW5jZWQgYW4gZXJyb3IgY29uZGl0aW9uLlxuICAgICAqIEBwYXJhbSB7YW55fSBbZXJyXSBUaGUgYGVycm9yYCBleGNlcHRpb24uXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBhIHZhbHVlbGVzcyBub3RpZmljYXRpb24gb2YgdHlwZVxuICAgICAqIGBjb21wbGV0ZWAgZnJvbSB0aGUgT2JzZXJ2YWJsZS4gTm90aWZpZXMgdGhlIE9ic2VydmVyIHRoYXQgdGhlIE9ic2VydmFibGVcbiAgICAgKiBoYXMgZmluaXNoZWQgc2VuZGluZyBwdXNoLWJhc2VkIG5vdGlmaWNhdGlvbnMuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX3Vuc3Vic2NyaWJlQW5kUmVjeWNsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgX3BhcmVudCA9IF9hLl9wYXJlbnQsIF9wYXJlbnRzID0gX2EuX3BhcmVudHM7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcmVudHMgPSBudWxsO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IF9wYXJlbnQ7XG4gICAgICAgIHRoaXMuX3BhcmVudHMgPSBfcGFyZW50cztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gU3Vic2NyaWJlcjtcbn0oU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKSk7XG5leHBvcnRzLlN1YnNjcmliZXIgPSBTdWJzY3JpYmVyO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBTYWZlU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNhZmVTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNhZmVTdWJzY3JpYmVyKF9wYXJlbnRTdWJzY3JpYmVyLCBvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyID0gX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgIHZhciBuZXh0O1xuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihvYnNlcnZlck9yTmV4dCkpIHtcbiAgICAgICAgICAgIG5leHQgPSBvYnNlcnZlck9yTmV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYnNlcnZlck9yTmV4dCkge1xuICAgICAgICAgICAgbmV4dCA9IG9ic2VydmVyT3JOZXh0Lm5leHQ7XG4gICAgICAgICAgICBlcnJvciA9IG9ic2VydmVyT3JOZXh0LmVycm9yO1xuICAgICAgICAgICAgY29tcGxldGUgPSBvYnNlcnZlck9yTmV4dC5jb21wbGV0ZTtcbiAgICAgICAgICAgIGlmIChvYnNlcnZlck9yTmV4dCAhPT0gT2JzZXJ2ZXJfMS5lbXB0eSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBPYmplY3QuY3JlYXRlKG9ic2VydmVyT3JOZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oY29udGV4dC51bnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGQoY29udGV4dC51bnN1YnNjcmliZS5iaW5kKGNvbnRleHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dC51bnN1YnNjcmliZSA9IHRoaXMudW5zdWJzY3JpYmUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5fbmV4dCA9IG5leHQ7XG4gICAgICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XG4gICAgICAgIHRoaXMuX2NvbXBsZXRlID0gY29tcGxldGU7XG4gICAgfVxuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQgJiYgdGhpcy5fbmV4dCkge1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRTdWJzY3JpYmVyID0gdGhpcy5fcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgICAgIGlmICghX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIodGhpcy5fbmV4dCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudFN1YnNjcmliZXIsIHRoaXMuX25leHQsIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Vycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIodGhpcy5fZXJyb3IsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnRTdWJzY3JpYmVyLCB0aGlzLl9lcnJvciwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVmFsdWUgPSBlcnI7XG4gICAgICAgICAgICAgICAgX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRTdWJzY3JpYmVyID0gdGhpcy5fcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVkQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fY29tcGxldGUuY2FsbChfdGhpcy5fY29udGV4dCk7IH07XG4gICAgICAgICAgICAgICAgaWYgKCFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIod3JhcHBlZENvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudFN1YnNjcmliZXIsIHdyYXBwZWRDb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5fX3RyeU9yVW5zdWIgPSBmdW5jdGlvbiAoZm4sIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMuX2NvbnRleHQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5fX3RyeU9yU2V0RXJyb3IgPSBmdW5jdGlvbiAocGFyZW50LCBmbiwgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcy5fY29udGV4dCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHBhcmVudC5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgICAgIHBhcmVudC5zeW5jRXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLl91bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRTdWJzY3JpYmVyID0gdGhpcy5fcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcmVudFN1YnNjcmliZXIgPSBudWxsO1xuICAgICAgICBfcGFyZW50U3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIFNhZmVTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpYmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL1N1YnNjcmliZXInKTtcbnZhciByeFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4uL3N5bWJvbC9yeFN1YnNjcmliZXInKTtcbnZhciBPYnNlcnZlcl8xID0gcmVxdWlyZSgnLi4vT2JzZXJ2ZXInKTtcbmZ1bmN0aW9uIHRvU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgaWYgKG5leHRPck9ic2VydmVyKSB7XG4gICAgICAgIGlmIChuZXh0T3JPYnNlcnZlciBpbnN0YW5jZW9mIFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dE9yT2JzZXJ2ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRPck9ic2VydmVyW3J4U3Vic2NyaWJlcl8xLnJ4U3Vic2NyaWJlcl0pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlcltyeFN1YnNjcmliZXJfMS5yeFN1YnNjcmliZXJdKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFuZXh0T3JPYnNlcnZlciAmJiAhZXJyb3IgJiYgIWNvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIoT2JzZXJ2ZXJfMS5lbXB0eSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSk7XG59XG5leHBvcnRzLnRvU3Vic2NyaWJlciA9IHRvU3Vic2NyaWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvU3Vic2NyaWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciByb290XzEgPSByZXF1aXJlKCcuLi91dGlsL3Jvb3QnKTtcbmZ1bmN0aW9uIGdldFN5bWJvbE9ic2VydmFibGUoY29udGV4dCkge1xuICAgIHZhciAkJG9ic2VydmFibGU7XG4gICAgdmFyIFN5bWJvbCA9IGNvbnRleHQuU3ltYm9sO1xuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmIChTeW1ib2wub2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgJCRvYnNlcnZhYmxlID0gU3ltYm9sLm9ic2VydmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkJG9ic2VydmFibGUgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcbiAgICAgICAgICAgIFN5bWJvbC5vYnNlcnZhYmxlID0gJCRvYnNlcnZhYmxlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAkJG9ic2VydmFibGUgPSAnQEBvYnNlcnZhYmxlJztcbiAgICB9XG4gICAgcmV0dXJuICQkb2JzZXJ2YWJsZTtcbn1cbmV4cG9ydHMuZ2V0U3ltYm9sT2JzZXJ2YWJsZSA9IGdldFN5bWJvbE9ic2VydmFibGU7XG5leHBvcnRzLm9ic2VydmFibGUgPSBnZXRTeW1ib2xPYnNlcnZhYmxlKHJvb3RfMS5yb290KTtcbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIG9ic2VydmFibGUgaW5zdGVhZFxuICovXG5leHBvcnRzLiQkb2JzZXJ2YWJsZSA9IGV4cG9ydHMub2JzZXJ2YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eSAqL1xuZnVuY3Rpb24gbm9vcCgpIHsgfVxuZXhwb3J0cy5ub29wID0gbm9vcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vb3AuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgbm9vcF8xID0gcmVxdWlyZSgnLi9ub29wJyk7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZnVuY3Rpb24gcGlwZSgpIHtcbiAgICB2YXIgZm5zID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgZm5zW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gcGlwZUZyb21BcnJheShmbnMpO1xufVxuZXhwb3J0cy5waXBlID0gcGlwZTtcbi8qIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gcGlwZUZyb21BcnJheShmbnMpIHtcbiAgICBpZiAoIWZucykge1xuICAgICAgICByZXR1cm4gbm9vcF8xLm5vb3A7XG4gICAgfVxuICAgIGlmIChmbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmbnNbMF07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBwaXBlZChpbnB1dCkge1xuICAgICAgICByZXR1cm4gZm5zLnJlZHVjZShmdW5jdGlvbiAocHJldiwgZm4pIHsgcmV0dXJuIGZuKHByZXYpOyB9LCBpbnB1dCk7XG4gICAgfTtcbn1cbmV4cG9ydHMucGlwZUZyb21BcnJheSA9IHBpcGVGcm9tQXJyYXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1waXBlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHJvb3RfMSA9IHJlcXVpcmUoJy4vdXRpbC9yb290Jyk7XG52YXIgdG9TdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL3V0aWwvdG9TdWJzY3JpYmVyJyk7XG52YXIgb2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi9zeW1ib2wvb2JzZXJ2YWJsZScpO1xudmFyIHBpcGVfMSA9IHJlcXVpcmUoJy4vdXRpbC9waXBlJyk7XG4vKipcbiAqIEEgcmVwcmVzZW50YXRpb24gb2YgYW55IHNldCBvZiB2YWx1ZXMgb3ZlciBhbnkgYW1vdW50IG9mIHRpbWUuIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgYnVpbGRpbmcgYmxvY2tcbiAqIG9mIFJ4SlMuXG4gKlxuICogQGNsYXNzIE9ic2VydmFibGU8VD5cbiAqL1xudmFyIE9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1YnNjcmliZSB0aGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgT2JzZXJ2YWJsZSBpc1xuICAgICAqIGluaXRpYWxseSBzdWJzY3JpYmVkIHRvLiBUaGlzIGZ1bmN0aW9uIGlzIGdpdmVuIGEgU3Vic2NyaWJlciwgdG8gd2hpY2ggbmV3IHZhbHVlc1xuICAgICAqIGNhbiBiZSBgbmV4dGBlZCwgb3IgYW4gYGVycm9yYCBtZXRob2QgY2FuIGJlIGNhbGxlZCB0byByYWlzZSBhbiBlcnJvciwgb3JcbiAgICAgKiBgY29tcGxldGVgIGNhbiBiZSBjYWxsZWQgdG8gbm90aWZ5IG9mIGEgc3VjY2Vzc2Z1bCBjb21wbGV0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoc3Vic2NyaWJlKSB7XG4gICAgICAgIHRoaXMuX2lzU2NhbGFyID0gZmFsc2U7XG4gICAgICAgIGlmIChzdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE9ic2VydmFibGUsIHdpdGggdGhpcyBPYnNlcnZhYmxlIGFzIHRoZSBzb3VyY2UsIGFuZCB0aGUgcGFzc2VkXG4gICAgICogb3BlcmF0b3IgZGVmaW5lZCBhcyB0aGUgbmV3IG9ic2VydmFibGUncyBvcGVyYXRvci5cbiAgICAgKiBAbWV0aG9kIGxpZnRcbiAgICAgKiBAcGFyYW0ge09wZXJhdG9yfSBvcGVyYXRvciB0aGUgb3BlcmF0b3IgZGVmaW5pbmcgdGhlIG9wZXJhdGlvbiB0byB0YWtlIG9uIHRoZSBvYnNlcnZhYmxlXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gYSBuZXcgb2JzZXJ2YWJsZSB3aXRoIHRoZSBPcGVyYXRvciBhcHBsaWVkXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEludm9rZXMgYW4gZXhlY3V0aW9uIG9mIGFuIE9ic2VydmFibGUgYW5kIHJlZ2lzdGVycyBPYnNlcnZlciBoYW5kbGVycyBmb3Igbm90aWZpY2F0aW9ucyBpdCB3aWxsIGVtaXQuXG4gICAgICpcbiAgICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+VXNlIGl0IHdoZW4geW91IGhhdmUgYWxsIHRoZXNlIE9ic2VydmFibGVzLCBidXQgc3RpbGwgbm90aGluZyBpcyBoYXBwZW5pbmcuPC9zcGFuPlxuICAgICAqXG4gICAgICogYHN1YnNjcmliZWAgaXMgbm90IGEgcmVndWxhciBvcGVyYXRvciwgYnV0IGEgbWV0aG9kIHRoYXQgY2FsbHMgT2JzZXJ2YWJsZSdzIGludGVybmFsIGBzdWJzY3JpYmVgIGZ1bmN0aW9uLiBJdFxuICAgICAqIG1pZ2h0IGJlIGZvciBleGFtcGxlIGEgZnVuY3Rpb24gdGhhdCB5b3UgcGFzc2VkIHRvIGEge0BsaW5rIGNyZWF0ZX0gc3RhdGljIGZhY3RvcnksIGJ1dCBtb3N0IG9mIHRoZSB0aW1lIGl0IGlzXG4gICAgICogYSBsaWJyYXJ5IGltcGxlbWVudGF0aW9uLCB3aGljaCBkZWZpbmVzIHdoYXQgYW5kIHdoZW4gd2lsbCBiZSBlbWl0dGVkIGJ5IGFuIE9ic2VydmFibGUuIFRoaXMgbWVhbnMgdGhhdCBjYWxsaW5nXG4gICAgICogYHN1YnNjcmliZWAgaXMgYWN0dWFsbHkgdGhlIG1vbWVudCB3aGVuIE9ic2VydmFibGUgc3RhcnRzIGl0cyB3b3JrLCBub3Qgd2hlbiBpdCBpcyBjcmVhdGVkLCBhcyBpdCBpcyBvZnRlblxuICAgICAqIHRob3VnaHQuXG4gICAgICpcbiAgICAgKiBBcGFydCBmcm9tIHN0YXJ0aW5nIHRoZSBleGVjdXRpb24gb2YgYW4gT2JzZXJ2YWJsZSwgdGhpcyBtZXRob2QgYWxsb3dzIHlvdSB0byBsaXN0ZW4gZm9yIHZhbHVlc1xuICAgICAqIHRoYXQgYW4gT2JzZXJ2YWJsZSBlbWl0cywgYXMgd2VsbCBhcyBmb3Igd2hlbiBpdCBjb21wbGV0ZXMgb3IgZXJyb3JzLiBZb3UgY2FuIGFjaGlldmUgdGhpcyBpbiB0d29cbiAgICAgKiBmb2xsb3dpbmcgd2F5cy5cbiAgICAgKlxuICAgICAqIFRoZSBmaXJzdCB3YXkgaXMgY3JlYXRpbmcgYW4gb2JqZWN0IHRoYXQgaW1wbGVtZW50cyB7QGxpbmsgT2JzZXJ2ZXJ9IGludGVyZmFjZS4gSXQgc2hvdWxkIGhhdmUgbWV0aG9kc1xuICAgICAqIGRlZmluZWQgYnkgdGhhdCBpbnRlcmZhY2UsIGJ1dCBub3RlIHRoYXQgaXQgc2hvdWxkIGJlIGp1c3QgYSByZWd1bGFyIEphdmFTY3JpcHQgb2JqZWN0LCB3aGljaCB5b3UgY2FuIGNyZWF0ZVxuICAgICAqIHlvdXJzZWxmIGluIGFueSB3YXkgeW91IHdhbnQgKEVTNiBjbGFzcywgY2xhc3NpYyBmdW5jdGlvbiBjb25zdHJ1Y3Rvciwgb2JqZWN0IGxpdGVyYWwgZXRjLikuIEluIHBhcnRpY3VsYXIgZG9cbiAgICAgKiBub3QgYXR0ZW1wdCB0byB1c2UgYW55IFJ4SlMgaW1wbGVtZW50YXRpb24gZGV0YWlscyB0byBjcmVhdGUgT2JzZXJ2ZXJzIC0geW91IGRvbid0IG5lZWQgdGhlbS4gUmVtZW1iZXIgYWxzb1xuICAgICAqIHRoYXQgeW91ciBvYmplY3QgZG9lcyBub3QgaGF2ZSB0byBpbXBsZW1lbnQgYWxsIG1ldGhvZHMuIElmIHlvdSBmaW5kIHlvdXJzZWxmIGNyZWF0aW5nIGEgbWV0aG9kIHRoYXQgZG9lc24ndFxuICAgICAqIGRvIGFueXRoaW5nLCB5b3UgY2FuIHNpbXBseSBvbWl0IGl0LiBOb3RlIGhvd2V2ZXIsIHRoYXQgaWYgYGVycm9yYCBtZXRob2QgaXMgbm90IHByb3ZpZGVkLCBhbGwgZXJyb3JzIHdpbGxcbiAgICAgKiBiZSBsZWZ0IHVuY2F1Z2h0LlxuICAgICAqXG4gICAgICogVGhlIHNlY29uZCB3YXkgaXMgdG8gZ2l2ZSB1cCBvbiBPYnNlcnZlciBvYmplY3QgYWx0b2dldGhlciBhbmQgc2ltcGx5IHByb3ZpZGUgY2FsbGJhY2sgZnVuY3Rpb25zIGluIHBsYWNlIG9mIGl0cyBtZXRob2RzLlxuICAgICAqIFRoaXMgbWVhbnMgeW91IGNhbiBwcm92aWRlIHRocmVlIGZ1bmN0aW9ucyBhcyBhcmd1bWVudHMgdG8gYHN1YnNjcmliZWAsIHdoZXJlIGZpcnN0IGZ1bmN0aW9uIGlzIGVxdWl2YWxlbnRcbiAgICAgKiBvZiBhIGBuZXh0YCBtZXRob2QsIHNlY29uZCBvZiBhbiBgZXJyb3JgIG1ldGhvZCBhbmQgdGhpcmQgb2YgYSBgY29tcGxldGVgIG1ldGhvZC4gSnVzdCBhcyBpbiBjYXNlIG9mIE9ic2VydmVyLFxuICAgICAqIGlmIHlvdSBkbyBub3QgbmVlZCB0byBsaXN0ZW4gZm9yIHNvbWV0aGluZywgeW91IGNhbiBvbWl0IGEgZnVuY3Rpb24sIHByZWZlcmFibHkgYnkgcGFzc2luZyBgdW5kZWZpbmVkYCBvciBgbnVsbGAsXG4gICAgICogc2luY2UgYHN1YnNjcmliZWAgcmVjb2duaXplcyB0aGVzZSBmdW5jdGlvbnMgYnkgd2hlcmUgdGhleSB3ZXJlIHBsYWNlZCBpbiBmdW5jdGlvbiBjYWxsLiBXaGVuIGl0IGNvbWVzXG4gICAgICogdG8gYGVycm9yYCBmdW5jdGlvbiwganVzdCBhcyBiZWZvcmUsIGlmIG5vdCBwcm92aWRlZCwgZXJyb3JzIGVtaXR0ZWQgYnkgYW4gT2JzZXJ2YWJsZSB3aWxsIGJlIHRocm93bi5cbiAgICAgKlxuICAgICAqIFdoYXRldmVyIHN0eWxlIG9mIGNhbGxpbmcgYHN1YnNjcmliZWAgeW91IHVzZSwgaW4gYm90aCBjYXNlcyBpdCByZXR1cm5zIGEgU3Vic2NyaXB0aW9uIG9iamVjdC5cbiAgICAgKiBUaGlzIG9iamVjdCBhbGxvd3MgeW91IHRvIGNhbGwgYHVuc3Vic2NyaWJlYCBvbiBpdCwgd2hpY2ggaW4gdHVybiB3aWxsIHN0b3Agd29yayB0aGF0IGFuIE9ic2VydmFibGUgZG9lcyBhbmQgd2lsbCBjbGVhblxuICAgICAqIHVwIGFsbCByZXNvdXJjZXMgdGhhdCBhbiBPYnNlcnZhYmxlIHVzZWQuIE5vdGUgdGhhdCBjYW5jZWxsaW5nIGEgc3Vic2NyaXB0aW9uIHdpbGwgbm90IGNhbGwgYGNvbXBsZXRlYCBjYWxsYmFja1xuICAgICAqIHByb3ZpZGVkIHRvIGBzdWJzY3JpYmVgIGZ1bmN0aW9uLCB3aGljaCBpcyByZXNlcnZlZCBmb3IgYSByZWd1bGFyIGNvbXBsZXRpb24gc2lnbmFsIHRoYXQgY29tZXMgZnJvbSBhbiBPYnNlcnZhYmxlLlxuICAgICAqXG4gICAgICogUmVtZW1iZXIgdGhhdCBjYWxsYmFja3MgcHJvdmlkZWQgdG8gYHN1YnNjcmliZWAgYXJlIG5vdCBndWFyYW50ZWVkIHRvIGJlIGNhbGxlZCBhc3luY2hyb25vdXNseS5cbiAgICAgKiBJdCBpcyBhbiBPYnNlcnZhYmxlIGl0c2VsZiB0aGF0IGRlY2lkZXMgd2hlbiB0aGVzZSBmdW5jdGlvbnMgd2lsbCBiZSBjYWxsZWQuIEZvciBleGFtcGxlIHtAbGluayBvZn1cbiAgICAgKiBieSBkZWZhdWx0IGVtaXRzIGFsbCBpdHMgdmFsdWVzIHN5bmNocm9ub3VzbHkuIEFsd2F5cyBjaGVjayBkb2N1bWVudGF0aW9uIGZvciBob3cgZ2l2ZW4gT2JzZXJ2YWJsZVxuICAgICAqIHdpbGwgYmVoYXZlIHdoZW4gc3Vic2NyaWJlZCBhbmQgaWYgaXRzIGRlZmF1bHQgYmVoYXZpb3IgY2FuIGJlIG1vZGlmaWVkIHdpdGggYSB7QGxpbmsgU2NoZWR1bGVyfS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPlN1YnNjcmliZSB3aXRoIGFuIE9ic2VydmVyPC9jYXB0aW9uPlxuICAgICAqIGNvbnN0IHN1bU9ic2VydmVyID0ge1xuICAgICAqICAgc3VtOiAwLFxuICAgICAqICAgbmV4dCh2YWx1ZSkge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWRkaW5nOiAnICsgdmFsdWUpO1xuICAgICAqICAgICB0aGlzLnN1bSA9IHRoaXMuc3VtICsgdmFsdWU7XG4gICAgICogICB9LFxuICAgICAqICAgZXJyb3IoKSB7IC8vIFdlIGFjdHVhbGx5IGNvdWxkIGp1c3QgcmVtb3ZlIHRoaXMgbWV0aG9kLFxuICAgICAqICAgfSwgICAgICAgIC8vIHNpbmNlIHdlIGRvIG5vdCByZWFsbHkgY2FyZSBhYm91dCBlcnJvcnMgcmlnaHQgbm93LlxuICAgICAqICAgY29tcGxldGUoKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdTdW0gZXF1YWxzOiAnICsgdGhpcy5zdW0pO1xuICAgICAqICAgfVxuICAgICAqIH07XG4gICAgICpcbiAgICAgKiBSeC5PYnNlcnZhYmxlLm9mKDEsIDIsIDMpIC8vIFN5bmNocm9ub3VzbHkgZW1pdHMgMSwgMiwgMyBhbmQgdGhlbiBjb21wbGV0ZXMuXG4gICAgICogLnN1YnNjcmliZShzdW1PYnNlcnZlcik7XG4gICAgICpcbiAgICAgKiAvLyBMb2dzOlxuICAgICAqIC8vIFwiQWRkaW5nOiAxXCJcbiAgICAgKiAvLyBcIkFkZGluZzogMlwiXG4gICAgICogLy8gXCJBZGRpbmc6IDNcIlxuICAgICAqIC8vIFwiU3VtIGVxdWFsczogNlwiXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPlN1YnNjcmliZSB3aXRoIGZ1bmN0aW9uczwvY2FwdGlvbj5cbiAgICAgKiBsZXQgc3VtID0gMDtcbiAgICAgKlxuICAgICAqIFJ4Lk9ic2VydmFibGUub2YoMSwgMiwgMylcbiAgICAgKiAuc3Vic2NyaWJlKFxuICAgICAqICAgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ0FkZGluZzogJyArIHZhbHVlKTtcbiAgICAgKiAgICAgc3VtID0gc3VtICsgdmFsdWU7XG4gICAgICogICB9LFxuICAgICAqICAgdW5kZWZpbmVkLFxuICAgICAqICAgZnVuY3Rpb24oKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdTdW0gZXF1YWxzOiAnICsgc3VtKTtcbiAgICAgKiAgIH1cbiAgICAgKiApO1xuICAgICAqXG4gICAgICogLy8gTG9nczpcbiAgICAgKiAvLyBcIkFkZGluZzogMVwiXG4gICAgICogLy8gXCJBZGRpbmc6IDJcIlxuICAgICAqIC8vIFwiQWRkaW5nOiAzXCJcbiAgICAgKiAvLyBcIlN1bSBlcXVhbHM6IDZcIlxuICAgICAqXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5DYW5jZWwgYSBzdWJzY3JpcHRpb248L2NhcHRpb24+XG4gICAgICogY29uc3Qgc3Vic2NyaXB0aW9uID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKS5zdWJzY3JpYmUoXG4gICAgICogICBudW0gPT4gY29uc29sZS5sb2cobnVtKSxcbiAgICAgKiAgIHVuZGVmaW5lZCxcbiAgICAgKiAgICgpID0+IGNvbnNvbGUubG9nKCdjb21wbGV0ZWQhJykgLy8gV2lsbCBub3QgYmUgY2FsbGVkLCBldmVuXG4gICAgICogKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gY2FuY2VsbGluZyBzdWJzY3JpcHRpb25cbiAgICAgKlxuICAgICAqXG4gICAgICogc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICogICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgKiAgIGNvbnNvbGUubG9nKCd1bnN1YnNjcmliZWQhJyk7XG4gICAgICogfSwgMjUwMCk7XG4gICAgICpcbiAgICAgKiAvLyBMb2dzOlxuICAgICAqIC8vIDAgYWZ0ZXIgMXNcbiAgICAgKiAvLyAxIGFmdGVyIDJzXG4gICAgICogLy8gXCJ1bnN1YnNjcmliZWQhXCIgYWZ0ZXIgMi41c1xuICAgICAqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09ic2VydmVyfEZ1bmN0aW9ufSBvYnNlcnZlck9yTmV4dCAob3B0aW9uYWwpIEVpdGhlciBhbiBvYnNlcnZlciB3aXRoIG1ldGhvZHMgdG8gYmUgY2FsbGVkLFxuICAgICAqICBvciB0aGUgZmlyc3Qgb2YgdGhyZWUgcG9zc2libGUgaGFuZGxlcnMsIHdoaWNoIGlzIHRoZSBoYW5kbGVyIGZvciBlYWNoIHZhbHVlIGVtaXR0ZWQgZnJvbSB0aGUgc3Vic2NyaWJlZFxuICAgICAqICBPYnNlcnZhYmxlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yIChvcHRpb25hbCkgQSBoYW5kbGVyIGZvciBhIHRlcm1pbmFsIGV2ZW50IHJlc3VsdGluZyBmcm9tIGFuIGVycm9yLiBJZiBubyBlcnJvciBoYW5kbGVyIGlzIHByb3ZpZGVkLFxuICAgICAqICB0aGUgZXJyb3Igd2lsbCBiZSB0aHJvd24gYXMgdW5oYW5kbGVkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBsZXRlIChvcHRpb25hbCkgQSBoYW5kbGVyIGZvciBhIHRlcm1pbmFsIGV2ZW50IHJlc3VsdGluZyBmcm9tIHN1Y2Nlc3NmdWwgY29tcGxldGlvbi5cbiAgICAgKiBAcmV0dXJuIHtJU3Vic2NyaXB0aW9ufSBhIHN1YnNjcmlwdGlvbiByZWZlcmVuY2UgdG8gdGhlIHJlZ2lzdGVyZWQgaGFuZGxlcnNcbiAgICAgKiBAbWV0aG9kIHN1YnNjcmliZVxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBvcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XG4gICAgICAgIHZhciBzaW5rID0gdG9TdWJzY3JpYmVyXzEudG9TdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBpZiAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgIG9wZXJhdG9yLmNhbGwoc2luaywgdGhpcy5zb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2luay5hZGQodGhpcy5zb3VyY2UgfHwgIXNpbmsuc3luY0Vycm9yVGhyb3dhYmxlID8gdGhpcy5fc3Vic2NyaWJlKHNpbmspIDogdGhpcy5fdHJ5U3Vic2NyaWJlKHNpbmspKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBzaW5rLnN5bmNFcnJvclZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5rO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaWJlKHNpbmspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVmFsdWUgPSBlcnI7XG4gICAgICAgICAgICBzaW5rLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZm9yRWFjaFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHQgYSBoYW5kbGVyIGZvciBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIG9ic2VydmFibGVcbiAgICAgKiBAcGFyYW0ge1Byb21pc2VDb25zdHJ1Y3Rvcn0gW1Byb21pc2VDdG9yXSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHVzZWQgdG8gaW5zdGFudGlhdGUgdGhlIFByb21pc2VcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCBlaXRoZXIgcmVzb2x2ZXMgb24gb2JzZXJ2YWJsZSBjb21wbGV0aW9uIG9yXG4gICAgICogIHJlamVjdHMgd2l0aCB0aGUgaGFuZGxlZCBlcnJvclxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAobmV4dCwgUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFQcm9taXNlQ3Rvcikge1xuICAgICAgICAgICAgaWYgKHJvb3RfMS5yb290LlJ4ICYmIHJvb3RfMS5yb290LlJ4LmNvbmZpZyAmJiByb290XzEucm9vdC5SeC5jb25maWcuUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIFByb21pc2VDdG9yID0gcm9vdF8xLnJvb3QuUnguY29uZmlnLlByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb290XzEucm9vdC5Qcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZUN0b3IgPSByb290XzEucm9vdC5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gUHJvbWlzZSBpbXBsIGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlQ3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvLyBNdXN0IGJlIGRlY2xhcmVkIGluIGEgc2VwYXJhdGUgc3RhdGVtZW50IHRvIGF2b2lkIGEgUmVmZXJuY2VFcnJvciB3aGVuXG4gICAgICAgICAgICAvLyBhY2Nlc3Npbmcgc3Vic2NyaXB0aW9uIGJlbG93IGluIHRoZSBjbG9zdXJlIGR1ZSB0byBUZW1wb3JhbCBEZWFkIFpvbmUuXG4gICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBzdWJzY3JpcHRpb24sIHRoZW4gd2UgY2FuIHN1cm1pc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5leHQgaGFuZGxpbmcgaXMgYXN5bmNocm9ub3VzLiBBbnkgZXJyb3JzIHRocm93blxuICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIGJlIHJlamVjdGVkIGV4cGxpY2l0bHkgYW5kIHVuc3Vic2NyaWJlIG11c3QgYmVcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIG1hbnVhbGx5XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBOTyBzdWJzY3JpcHRpb24sIHRoZW4gd2UncmUgZ2V0dGluZyBhIG5leHRlZFxuICAgICAgICAgICAgICAgICAgICAvLyB2YWx1ZSBzeW5jaHJvbm91c2x5IGR1cmluZyBzdWJzY3JpcHRpb24uIFdlIGNhbiBqdXN0IGNhbGwgaXQuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGVycm9ycywgT2JzZXJ2YWJsZSdzIGBzdWJzY3JpYmVgIHdpbGwgZW5zdXJlIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB1bnN1YnNjcmlwdGlvbiBsb2dpYyBpcyBjYWxsZWQsIHRoZW4gc3luY2hyb25vdXNseSByZXRocm93IHRoZSBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgdGhhdCwgUHJvbWlzZSB3aWxsIHRyYXAgdGhlIGVycm9yIGFuZCBzZW5kIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvd24gdGhlIHJlamVjdGlvbiBwYXRoLlxuICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCByZWplY3QsIHJlc29sdmUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQW4gaW50ZXJvcCBwb2ludCBkZWZpbmVkIGJ5IHRoZSBlczctb2JzZXJ2YWJsZSBzcGVjIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGVcbiAgICAgKiBAbWV0aG9kIFN5bWJvbC5vYnNlcnZhYmxlXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gdGhpcyBpbnN0YW5jZSBvZiB0aGUgb2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlW29ic2VydmFibGVfMS5vYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gc3RpdGNoIHRvZ2V0aGVyIGZ1bmN0aW9uYWwgb3BlcmF0b3JzIGludG8gYSBjaGFpbi5cbiAgICAgKiBAbWV0aG9kIHBpcGVcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSB0aGUgT2JzZXJ2YWJsZSByZXN1bHQgb2YgYWxsIG9mIHRoZSBvcGVyYXRvcnMgaGF2aW5nXG4gICAgICogYmVlbiBjYWxsZWQgaW4gdGhlIG9yZGVyIHRoZXkgd2VyZSBwYXNzZWQgaW4uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4gICAgICpcbiAgICAgKiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApXG4gICAgICogICAucGlwZShcbiAgICAgKiAgICAgZmlsdGVyKHggPT4geCAlIDIgPT09IDApLFxuICAgICAqICAgICBtYXAoeCA9PiB4ICsgeCksXG4gICAgICogICAgIHNjYW4oKGFjYywgeCkgPT4gYWNjICsgeClcbiAgICAgKiAgIClcbiAgICAgKiAgIC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSlcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgb3BlcmF0aW9uc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3BlcmF0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwaXBlXzEucGlwZUZyb21BcnJheShvcGVyYXRpb25zKSh0aGlzKTtcbiAgICB9O1xuICAgIC8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9Qcm9taXNlID0gZnVuY3Rpb24gKFByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgICAgIGlmIChyb290XzEucm9vdC5SeCAmJiByb290XzEucm9vdC5SeC5jb25maWcgJiYgcm9vdF8xLnJvb3QuUnguY29uZmlnLlByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlQ3RvciA9IHJvb3RfMS5yb290LlJ4LmNvbmZpZy5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocm9vdF8xLnJvb3QuUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIFByb21pc2VDdG9yID0gcm9vdF8xLnJvb3QuUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIFByb21pc2UgaW1wbCBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiB2YWx1ZSA9IHg7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHJlamVjdChlcnIpOyB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiByZXNvbHZlKHZhbHVlKTsgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gSEFDSzogU2luY2UgVHlwZVNjcmlwdCBpbmhlcml0cyBzdGF0aWMgcHJvcGVydGllcyB0b28sIHdlIGhhdmUgdG9cbiAgICAvLyBmaWdodCBhZ2FpbnN0IFR5cGVTY3JpcHQgaGVyZSBzbyBTdWJqZWN0IGNhbiBoYXZlIGEgZGlmZmVyZW50IHN0YXRpYyBjcmVhdGUgc2lnbmF0dXJlXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjb2xkIE9ic2VydmFibGUgYnkgY2FsbGluZyB0aGUgT2JzZXJ2YWJsZSBjb25zdHJ1Y3RvclxuICAgICAqIEBzdGF0aWMgdHJ1ZVxuICAgICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWJzY3JpYmU/IHRoZSBzdWJzY3JpYmVyIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCB0byB0aGUgT2JzZXJ2YWJsZSBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGV9IGEgbmV3IGNvbGQgb2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIE9ic2VydmFibGUuY3JlYXRlID0gZnVuY3Rpb24gKHN1YnNjcmliZSkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufSgpKTtcbmV4cG9ydHMuT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4vKipcbiAqIEFuIGVycm9yIHRocm93biB3aGVuIGFuIGFjdGlvbiBpcyBpbnZhbGlkIGJlY2F1c2UgdGhlIG9iamVjdCBoYXMgYmVlblxuICogdW5zdWJzY3JpYmVkLlxuICpcbiAqIEBzZWUge0BsaW5rIFN1YmplY3R9XG4gKiBAc2VlIHtAbGluayBCZWhhdmlvclN1YmplY3R9XG4gKlxuICogQGNsYXNzIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXG4gKi9cbnZhciBPYmplY3RVbnN1YnNjcmliZWRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE9iamVjdFVuc3Vic2NyaWJlZEVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCkge1xuICAgICAgICB2YXIgZXJyID0gX3N1cGVyLmNhbGwodGhpcywgJ29iamVjdCB1bnN1YnNjcmliZWQnKTtcbiAgICAgICAgdGhpcy5uYW1lID0gZXJyLm5hbWUgPSAnT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InO1xuICAgICAgICB0aGlzLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0cy5PYmplY3RVbnN1YnNjcmliZWRFcnJvciA9IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoJy4vU3Vic2NyaXB0aW9uJyk7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xudmFyIFN1YmplY3RTdWJzY3JpcHRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJqZWN0U3Vic2NyaXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YmplY3RTdWJzY3JpcHRpb24oc3ViamVjdCwgc3Vic2NyaWJlcikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVyID0gc3Vic2NyaWJlcjtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgU3ViamVjdFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHN1YmplY3QgPSB0aGlzLnN1YmplY3Q7XG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSBzdWJqZWN0Lm9ic2VydmVycztcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gbnVsbDtcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMgfHwgb2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCB8fCBzdWJqZWN0LmlzU3RvcHBlZCB8fCBzdWJqZWN0LmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJzY3JpYmVySW5kZXggPSBvYnNlcnZlcnMuaW5kZXhPZih0aGlzLnN1YnNjcmliZXIpO1xuICAgICAgICBpZiAoc3Vic2NyaWJlckluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShzdWJzY3JpYmVySW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gU3ViamVjdFN1YnNjcmlwdGlvbjtcbn0oU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKSk7XG5leHBvcnRzLlN1YmplY3RTdWJzY3JpcHRpb24gPSBTdWJqZWN0U3Vic2NyaXB0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3ViamVjdFN1YnNjcmlwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4vT2JzZXJ2YWJsZScpO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4vU3Vic2NyaWJlcicpO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZSgnLi9TdWJzY3JpcHRpb24nKTtcbnZhciBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xID0gcmVxdWlyZSgnLi91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yJyk7XG52YXIgU3ViamVjdFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZSgnLi9TdWJqZWN0U3Vic2NyaXB0aW9uJyk7XG52YXIgcnhTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL3N5bWJvbC9yeFN1YnNjcmliZXInKTtcbi8qKlxuICogQGNsYXNzIFN1YmplY3RTdWJzY3JpYmVyPFQ+XG4gKi9cbnZhciBTdWJqZWN0U3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YmplY3RTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YmplY3RTdWJzY3JpYmVyKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gU3ViamVjdFN1YnNjcmliZXI7XG59KFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSk7XG5leHBvcnRzLlN1YmplY3RTdWJzY3JpYmVyID0gU3ViamVjdFN1YnNjcmliZXI7XG4vKipcbiAqIEBjbGFzcyBTdWJqZWN0PFQ+XG4gKi9cbnZhciBTdWJqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJqZWN0KCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYXNFcnJvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRocm93bkVycm9yID0gbnVsbDtcbiAgICB9XG4gICAgU3ViamVjdC5wcm90b3R5cGVbcnhTdWJzY3JpYmVyXzEucnhTdWJzY3JpYmVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJqZWN0U3Vic2NyaWJlcih0aGlzKTtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmxpZnQgPSBmdW5jdGlvbiAob3BlcmF0b3IpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgQW5vbnltb3VzU3ViamVjdCh0aGlzLCB0aGlzKTtcbiAgICAgICAgc3ViamVjdC5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gc3ViamVjdDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMS5PYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycztcbiAgICAgICAgICAgIHZhciBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvcHkgPSBvYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb3B5W2ldLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMS5PYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnRocm93bkVycm9yID0gZXJyO1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycztcbiAgICAgICAgdmFyIGxlbiA9IG9ic2VydmVycy5sZW5ndGg7XG4gICAgICAgIHZhciBjb3B5ID0gb2JzZXJ2ZXJzLnNsaWNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvcHlbaV0uZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9ic2VydmVycy5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycztcbiAgICAgICAgdmFyIGxlbiA9IG9ic2VydmVycy5sZW5ndGg7XG4gICAgICAgIHZhciBjb3B5ID0gb2JzZXJ2ZXJzLnNsaWNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvcHlbaV0uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9ic2VydmVycy5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9ic2VydmVycyA9IG51bGw7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMS5PYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuX3RyeVN1YnNjcmliZS5jYWxsKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMS5PYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaGFzRXJyb3IpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IodGhpcy50aHJvd25FcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3ViamVjdFN1YnNjcmlwdGlvbl8xLlN1YmplY3RTdWJzY3JpcHRpb24odGhpcywgc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmFzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIFN1YmplY3QuY3JlYXRlID0gZnVuY3Rpb24gKGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbm9ueW1vdXNTdWJqZWN0KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xuICAgIH07XG4gICAgcmV0dXJuIFN1YmplY3Q7XG59KE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKSk7XG5leHBvcnRzLlN1YmplY3QgPSBTdWJqZWN0O1xuLyoqXG4gKiBAY2xhc3MgQW5vbnltb3VzU3ViamVjdDxUPlxuICovXG52YXIgQW5vbnltb3VzU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFub255bW91c1N1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQW5vbnltb3VzU3ViamVjdChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIH1cbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbiAmJiBkZXN0aW5hdGlvbi5uZXh0KSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbiAmJiBkZXN0aW5hdGlvbi5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2U7XG4gICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQW5vbnltb3VzU3ViamVjdDtcbn0oU3ViamVjdCkpO1xuZXhwb3J0cy5Bbm9ueW1vdXNTdWJqZWN0ID0gQW5vbnltb3VzU3ViamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3QuanMubWFwIiwiaW1wb3J0IHsgTG9nZ2luZ0V2ZW50IH0gZnJvbSAnLi4vbW9kZWxzL2xvZy1ldmVudCc7XG5pbXBvcnQgeyBBcHBlbmRlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9maXQtbG9nZ2VyLWNvcmUvaW5kZXgnO1xuaW1wb3J0IHsgQXBwZW5kZXIgfSBmcm9tICcuL2FwcGVuZGVyJztcblxuXG5leHBvcnQgY2xhc3MgU2VydmVyQXBwZW5kZXIgaW1wbGVtZW50cyBBcHBlbmRlciB7XG5cbiAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgb3B0aW9uczogQXBwZW5kZXJPcHRpb25zKSB7XG4gICAgICB9XG4gICAgICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuICdhamF4JztcbiAgICAgIH1cbiAgICAgIHdyaXRlTG9nKGxvZ2dpbmdFdmVudDogTG9nZ2luZ0V2ZW50KTogdm9pZCB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oSlNPTi5zdHJpbmdpZnkobG9nZ2luZ0V2ZW50KSlcbiAgICAgIH1cbiAgICAgIHdyaXRlTG9ncyhsb2dnaW5nRXZlbnQ6IExvZ2dpbmdFdmVudFtdKTogdm9pZCB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oSlNPTi5zdHJpbmdpZnkobG9nZ2luZ0V2ZW50KSlcbiAgICAgIH1cbiAgICAgIHVwZGF0ZShhcHBlbmRlck9wdGlvbnM6IEFwcGVuZGVyT3B0aW9ucykgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gYXBwZW5kZXJPcHRpb25zO1xuICAgICAgfVxufVxuIiwiXG5leHBvcnQgZW51bSBMb2dMZXZlbCB7XG4gICAgICBBTEwgPSAwLFxuICAgICAgVFJBQ0UgPSAxLFxuICAgICAgREVCVUcgPSAyLFxuICAgICAgSU5GTyA9IDMsXG4gICAgICBXQVJOID0gNCxcbiAgICAgIEVSUk9SID0gNSxcbiAgICAgIEZBVEFMID0gNixcbiAgICAgIE9GRiA9IDdcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTG9nZ2VyU3RhdGljSW5mbyB7XG4gICAgICBhcHBOYW1lOiBzdHJpbmc7XG4gICAgICB1c2VyPzogc3RyaW5nO1xuICAgICAgcmVnaW9uPzogc3RyaW5nO1xuICAgICAgZW52Pzogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBMb2dPcHRpb25zIHtcbiAgICAgIGFwcExvZ0xldmVsOiBMb2dMZXZlbDtcbiAgICAgIGZvcmNlZExvZ0xldmVsPzogTG9nTGV2ZWw7XG4gICAgICBsb2dJbnRlcnZhbDogbnVtYmVyO1xuICAgICAgYXBwZW5kZXJzOiBBcHBlbmRlck9wdGlvbnNbXTtcbiAgICAgIGxvZ1NlcnZlcj86IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQXBwZW5kZXJPcHRpb25zIHtcbiAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgIGZvcm1hdDogc3RyaW5nOyAvLyBUZXh0LCBqc29uXG4gICAgICBwYXR0ZXJuPzogc3RyaW5nO1xuICAgICAgcGF0aD86IHN0cmluZztcbiAgICAgIGxvZ0xldmVsPzogTG9nTGV2ZWw7XG4gICAgICBpc0RlZmZlcnJlZD86IGJvb2xlYW47XG59XG4iLCJpbXBvcnQgeyBBcHBlbmRlck9wdGlvbnMsIExvZ0xldmVsIH0gZnJvbSAnLi4vLi4vZml0LWxvZ2dlci1jb3JlL2luZGV4JztcbmltcG9ydCB7IEFwcGVuZGVyIH0gZnJvbSBcIi4vYXBwZW5kZXJcIjtcbmltcG9ydCB7IExvZ2dpbmdFdmVudCB9IGZyb20gXCIuLi9tb2RlbHMvbG9nLWV2ZW50XCI7XG5cblxuXG5leHBvcnQgY2xhc3MgQ29uc29sZUFwcGVuZGVyIGltcGxlbWVudHMgQXBwZW5kZXIge1xuICAgICAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiAnY29uc29sZSc7XG4gICAgICB9XG4gICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IEFwcGVuZGVyT3B0aW9ucykge1xuXG4gICAgICB9XG5cbiAgICAgIHdyaXRlTG9nKGxvZ2dpbmdFdmVudDogTG9nZ2luZ0V2ZW50KTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxvZ0xldmVsICE9PSBMb2dMZXZlbC5PRkYgJiYgbG9nZ2luZ0V2ZW50LmxldmVsID49IHRoaXMub3B0aW9ucy5sb2dMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuZ2V0Rm9ybWF0dGVkTWVzc2FnZShsb2dnaW5nRXZlbnQpO1xuICAgICAgICAgICAgICAgICAgc3dpdGNoIChsb2dnaW5nRXZlbnQubGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuREVCVUc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIExvZ0xldmVsLkVSUk9SOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBMb2dMZXZlbC5GQVRBTDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuSU5GTzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHdyaXRlTG9ncyhsb2dnaW5nRXZlbnQ6IExvZ2dpbmdFdmVudFtdKTogdm9pZCB7XG5cbiAgICAgIH1cblxuICAgICAgdXBkYXRlKGFwcGVuZGVyT3B0aW9uczogQXBwZW5kZXJPcHRpb25zKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBhcHBlbmRlck9wdGlvbnM7XG4gICAgICB9XG5cbiAgICAgIHByaXZhdGUgZ2V0Rm9ybWF0dGVkTWVzc2FnZShsb2dnaW5nRXZlbnQ6IExvZ2dpbmdFdmVudCk6IHN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gYFske2xvZ2dpbmdFdmVudC5hcHBOYW1lfS0ke2xvZ2dpbmdFdmVudC5uYW1lfS0ke3RoaXMuZ2V0Rm9ybWF0dGVkVGltZShsb2dnaW5nRXZlbnQudGltZXN0YW1wKX1dIFske0xvZ0xldmVsW2xvZ2dpbmdFdmVudC5sZXZlbF19XSA9PiAke2xvZ2dpbmdFdmVudC5tZXNzYWdlfWA7XG4gICAgICB9XG4gICAgICBwcml2YXRlIGdldEZvcm1hdHRlZFRpbWUodGltZXN0YW1wOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcbiAgICAgICAgcmV0dXJuIGAke2RhdGUuZ2V0TW9udGgoKX0tJHtkYXRlLmdldERhdGUoKX0tJHtkYXRlLmdldEZ1bGxZZWFyKCl9ICR7ZGF0ZS5nZXRIb3VycygpfToke2RhdGUuZ2V0TWludXRlcygpfToke2RhdGUuZ2V0U2Vjb25kcygpfS4ke2RhdGUuZ2V0TWlsbGlzZWNvbmRzKCl9YDtcbiAgICAgIH1cbn1cbiIsImltcG9ydCB7IEFwcGVuZGVyIH0gZnJvbSAnLi9hcHBlbmRlcic7XG5pbXBvcnQgeyBMb2dnaW5nRXZlbnQgfSBmcm9tICcuLi9tb2RlbHMvbG9nLWV2ZW50JztcbmltcG9ydCB7IEFwcGVuZGVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ZpdC1sb2dnZXItY29yZS9pbmRleCc7XG5cblxuXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyQXBwZW5kZXIgaW1wbGVtZW50cyBBcHBlbmRlciB7XG4gIHByaXZhdGUgd29ya2VyOiBTaGFyZWRXb3JrZXIuU2hhcmVkV29ya2VyO1xuICBwcml2YXRlIGlzV29ya2VyUmVhZHkgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IEFwcGVuZGVyT3B0aW9ucykge1xuXG4gIH1cblxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnd29ya2VyJztcbiAgfVxuICB3cml0ZUxvZyhsb2dnaW5nRXZlbnQ6IExvZ2dpbmdFdmVudCk6IHZvaWQge1xuICAgIC8vIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9XG4gIHdyaXRlTG9ncyhsb2dnaW5nRXZlbnQ6IExvZ2dpbmdFdmVudFtdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNXb3JrZXJSZWFkeSkge1xuICAgICAgdGhpcy53b3JrZXIucG9ydC5wb3N0TWVzc2FnZSh7IHR5cGU6ICdMT0dfTUVTU0FHRScsIHBheWxvYWQ6IGxvZ2dpbmdFdmVudCB9KTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoYXBwZW5kZXJPcHRpb25zOiBBcHBlbmRlck9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBhcHBlbmRlck9wdGlvbnM7XG4gICAgdGhpcy53b3JrZXIgPSBuZXcgU2hhcmVkV29ya2VyKGFwcGVuZGVyT3B0aW9ucy5wYXRoLCAnTG9nZ2VyLVdvcmtlcjIzJyk7XG4gICAgdGhpcy53b3JrZXIucG9ydC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIHRoaXMub25Xb3JrZXJFcnJvci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLndvcmtlci5wb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLm9uV29ya2VyTWVzc2FnZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLndvcmtlci5wb3J0LnN0YXJ0KCk7XG4gIH1cblxuICBwcml2YXRlIG9uV29ya2VyRXJyb3IoZXJyb3JFdnQ6IEVycm9yRXZlbnQpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yRXZ0KTtcbiAgfVxuICBwcml2YXRlIG9uV29ya2VyTWVzc2FnZShldnQ6IE1lc3NhZ2VFdmVudCkge1xuICAgIGlmKGV2dC5kYXRhLnR5cGUgPT09ICdXT1JLRVJfQ09OTkVDVEVEJykge1xuICAgICAgdGhpcy5pc1dvcmtlclJlYWR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc29sZS5pbmZvKGV2dC5kYXRhKTtcbiAgfVxuICBwcml2YXRlIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMud29ya2VyKSB7XG4gICAgICB0aGlzLmlzV29ya2VyUmVhZHkgPSBmYWxzZTtcbiAgICAgIHRoaXMud29ya2VyLnBvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0aGlzLm9uV29ya2VyRXJyb3IuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLndvcmtlci5wb3J0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLm9uV29ya2VyTWVzc2FnZS5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMud29ya2VyLnBvcnQuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFNlcnZlckFwcGVuZGVyIH0gZnJvbSAnLi9zZXJ2ZXIuYXBwZW5kZXInO1xuaW1wb3J0IHsgQXBwZW5kZXJPcHRpb25zLCBMb2dMZXZlbCB9IGZyb20gJy4uLy4uL2ZpdC1sb2dnZXItY29yZS9pbmRleCc7XG5pbXBvcnQgeyBDb25zb2xlQXBwZW5kZXIgfSBmcm9tICcuL2NvbnNvbGUuYXBwZW5kZXInO1xuaW1wb3J0IHsgQXBwZW5kZXIgfSBmcm9tICcuL2FwcGVuZGVyJztcbmltcG9ydCB7IFdlYldvcmtlckFwcGVuZGVyIH0gZnJvbSAnLi93b3JrZXIuYXBwZW5kZXInO1xuXG5cbmV4cG9ydCBjbGFzcyBBcHBlbmRlclJlcG9zaXRvcnkge1xuICAgICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlID0gbmV3IEFwcGVuZGVyUmVwb3NpdG9yeSgpO1xuICAgICAgcHJpdmF0ZSBhcHBlbmRlck1hcDogTWFwPHN0cmluZywgQXBwZW5kZXI+ID0gbmV3IE1hcCgpO1xuXG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIGlmIChBcHBlbmRlclJlcG9zaXRvcnkuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogSW5zdGFudGlhdGlvbiBmYWlsZWQ6IFVzZSBBcHBlbmRlclJlcG9zaXRvcnkuaW5zdGFuY2UgaW5zdGVhZCBvZiBuZXcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQXBwZW5kZXJSZXBvc2l0b3J5Ll9pbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZGVyTWFwLnNldCgnY29uc29sZScsIG5ldyBDb25zb2xlQXBwZW5kZXIoe1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ2NvbnNvbGUnLFxuICAgICAgICAgICAgICAgICAgZm9ybWF0OiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICBsb2dMZXZlbDogTG9nTGV2ZWwuSU5GT1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRlck1hcC5zZXQoJ3NlcnZlcicsIG5ldyBTZXJ2ZXJBcHBlbmRlcih7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnc2VydmVyJyxcbiAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICAgICAgICAgICAgbG9nTGV2ZWw6IExvZ0xldmVsLklORk8sXG4gICAgICAgICAgICAgICAgICBpc0RlZmZlcnJlZDogdHJ1ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRlck1hcC5zZXQoJ3dvcmtlcicsIG5ldyBXZWJXb3JrZXJBcHBlbmRlcih7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnd29ya2VyJyxcbiAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICAgICAgICAgICAgbG9nTGV2ZWw6IExvZ0xldmVsLklORk8sXG4gICAgICAgICAgICAgICAgICBpc0RlZmZlcnJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHBhdGg6ICdhc3NldHMvd29ya2VyL3NvY2tldC1sb2dnZXIuanMnXG4gICAgICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGdldEFwcGVuZGVyKG5hbWU6IHN0cmluZyk6IEFwcGVuZGVyIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZGVyTWFwLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwZW5kZXJNYXAuZ2V0KG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMb2dBcHBlbmRlciA6ICR7bmFtZX0gaXMgbm90IGZvdW5kYCk7XG4gICAgICB9XG4gICAgICBzdGF0aWMgZ2V0IGluc3RhbmNlKCk6IEFwcGVuZGVyUmVwb3NpdG9yeSB7XG4gICAgICAgICAgICByZXR1cm4gQXBwZW5kZXJSZXBvc2l0b3J5Ll9pbnN0YW5jZTtcbiAgICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIGlzQXJyYXlfMSA9IHJlcXVpcmUoJy4uL3V0aWwvaXNBcnJheScpO1xuZnVuY3Rpb24gaXNOdW1lcmljKHZhbCkge1xuICAgIC8vIHBhcnNlRmxvYXQgTmFOcyBudW1lcmljLWNhc3QgZmFsc2UgcG9zaXRpdmVzIChudWxsfHRydWV8ZmFsc2V8XCJcIilcbiAgICAvLyAuLi5idXQgbWlzaW50ZXJwcmV0cyBsZWFkaW5nLW51bWJlciBzdHJpbmdzLCBwYXJ0aWN1bGFybHkgaGV4IGxpdGVyYWxzIChcIjB4Li4uXCIpXG4gICAgLy8gc3VidHJhY3Rpb24gZm9yY2VzIGluZmluaXRpZXMgdG8gTmFOXG4gICAgLy8gYWRkaW5nIDEgY29ycmVjdHMgbG9zcyBvZiBwcmVjaXNpb24gZnJvbSBwYXJzZUZsb2F0ICgjMTUxMDApXG4gICAgcmV0dXJuICFpc0FycmF5XzEuaXNBcnJheSh2YWwpICYmICh2YWwgLSBwYXJzZUZsb2F0KHZhbCkgKyAxKSA+PSAwO1xufVxuZXhwb3J0cy5pc051bWVyaWMgPSBpc051bWVyaWM7XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc051bWVyaWMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoJy4uL1N1YnNjcmlwdGlvbicpO1xuLyoqXG4gKiBBIHVuaXQgb2Ygd29yayB0byBiZSBleGVjdXRlZCBpbiBhIHtAbGluayBTY2hlZHVsZXJ9LiBBbiBhY3Rpb24gaXMgdHlwaWNhbGx5XG4gKiBjcmVhdGVkIGZyb20gd2l0aGluIGEgU2NoZWR1bGVyIGFuZCBhbiBSeEpTIHVzZXIgZG9lcyBub3QgbmVlZCB0byBjb25jZXJuXG4gKiB0aGVtc2VsdmVzIGFib3V0IGNyZWF0aW5nIGFuZCBtYW5pcHVsYXRpbmcgYW4gQWN0aW9uLlxuICpcbiAqIGBgYHRzXG4gKiBjbGFzcyBBY3Rpb248VD4gZXh0ZW5kcyBTdWJzY3JpcHRpb24ge1xuICogICBuZXcgKHNjaGVkdWxlcjogU2NoZWR1bGVyLCB3b3JrOiAoc3RhdGU/OiBUKSA9PiB2b2lkKTtcbiAqICAgc2NoZWR1bGUoc3RhdGU/OiBULCBkZWxheTogbnVtYmVyID0gMCk6IFN1YnNjcmlwdGlvbjtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBjbGFzcyBBY3Rpb248VD5cbiAqL1xudmFyIEFjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBY3Rpb24oc2NoZWR1bGVyLCB3b3JrKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY2hlZHVsZXMgdGhpcyBhY3Rpb24gb24gaXRzIHBhcmVudCBTY2hlZHVsZXIgZm9yIGV4ZWN1dGlvbi4gTWF5IGJlIHBhc3NlZFxuICAgICAqIHNvbWUgY29udGV4dCBvYmplY3QsIGBzdGF0ZWAuIE1heSBoYXBwZW4gYXQgc29tZSBwb2ludCBpbiB0aGUgZnV0dXJlLFxuICAgICAqIGFjY29yZGluZyB0byB0aGUgYGRlbGF5YCBwYXJhbWV0ZXIsIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAcGFyYW0ge1R9IFtzdGF0ZV0gU29tZSBjb250ZXh0dWFsIGRhdGEgdGhhdCB0aGUgYHdvcmtgIGZ1bmN0aW9uIHVzZXMgd2hlblxuICAgICAqIGNhbGxlZCBieSB0aGUgU2NoZWR1bGVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZGVsYXldIFRpbWUgdG8gd2FpdCBiZWZvcmUgZXhlY3V0aW5nIHRoZSB3b3JrLCB3aGVyZSB0aGVcbiAgICAgKiB0aW1lIHVuaXQgaXMgaW1wbGljaXQgYW5kIGRlZmluZWQgYnkgdGhlIFNjaGVkdWxlci5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIEFjdGlvbi5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBBY3Rpb247XG59KFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbikpO1xuZXhwb3J0cy5BY3Rpb24gPSBBY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciByb290XzEgPSByZXF1aXJlKCcuLi91dGlsL3Jvb3QnKTtcbnZhciBBY3Rpb25fMSA9IHJlcXVpcmUoJy4vQWN0aW9uJyk7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xudmFyIEFzeW5jQWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXN5bmNBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXN5bmNBY3Rpb24oc2NoZWR1bGVyLCB3b3JrKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHNjaGVkdWxlciwgd29yayk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICB0aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyBBbHdheXMgcmVwbGFjZSB0aGUgY3VycmVudCBzdGF0ZSB3aXRoIHRoZSBuZXcgc3RhdGUuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgLy8gU2V0IHRoZSBwZW5kaW5nIGZsYWcgaW5kaWNhdGluZyB0aGF0IHRoaXMgYWN0aW9uIGhhcyBiZWVuIHNjaGVkdWxlZCwgb3JcbiAgICAgICAgLy8gaGFzIHJlY3Vyc2l2ZWx5IHJlc2NoZWR1bGVkIGl0c2VsZi5cbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgdmFyIGlkID0gdGhpcy5pZDtcbiAgICAgICAgdmFyIHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgICAgICAvL1xuICAgICAgICAvLyBJbXBvcnRhbnQgaW1wbGVtZW50YXRpb24gbm90ZTpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gQWN0aW9ucyBvbmx5IGV4ZWN1dGUgb25jZSBieSBkZWZhdWx0LCB1bmxlc3MgcmVzY2hlZHVsZWQgZnJvbSB3aXRoaW4gdGhlXG4gICAgICAgIC8vIHNjaGVkdWxlZCBjYWxsYmFjay4gVGhpcyBhbGxvd3MgdXMgdG8gaW1wbGVtZW50IHNpbmdsZSBhbmQgcmVwZWF0XG4gICAgICAgIC8vIGFjdGlvbnMgdmlhIHRoZSBzYW1lIGNvZGUgcGF0aCwgd2l0aG91dCBhZGRpbmcgQVBJIHN1cmZhY2UgYXJlYSwgYXMgd2VsbFxuICAgICAgICAvLyBhcyBtaW1pYyB0cmFkaXRpb25hbCByZWN1cnNpb24gYnV0IGFjcm9zcyBhc3luY2hyb25vdXMgYm91bmRhcmllcy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSG93ZXZlciwgSlMgcnVudGltZXMgYW5kIHRpbWVycyBkaXN0aW5ndWlzaCBiZXR3ZWVuIGludGVydmFscyBhY2hpZXZlZCBieVxuICAgICAgICAvLyBzZXJpYWwgYHNldFRpbWVvdXRgIGNhbGxzIHZzLiBhIHNpbmdsZSBgc2V0SW50ZXJ2YWxgIGNhbGwuIEFuIGludGVydmFsIG9mXG4gICAgICAgIC8vIHNlcmlhbCBgc2V0VGltZW91dGAgY2FsbHMgY2FuIGJlIGluZGl2aWR1YWxseSBkZWxheWVkLCB3aGljaCBkZWxheXNcbiAgICAgICAgLy8gc2NoZWR1bGluZyB0aGUgbmV4dCBgc2V0VGltZW91dGAsIGFuZCBzbyBvbi4gYHNldEludGVydmFsYCBhdHRlbXB0cyB0b1xuICAgICAgICAvLyBndWFyYW50ZWUgdGhlIGludGVydmFsIGNhbGxiYWNrIHdpbGwgYmUgaW52b2tlZCBtb3JlIHByZWNpc2VseSB0byB0aGVcbiAgICAgICAgLy8gaW50ZXJ2YWwgcGVyaW9kLCByZWdhcmRsZXNzIG9mIGxvYWQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZXJlZm9yZSwgd2UgdXNlIGBzZXRJbnRlcnZhbGAgdG8gc2NoZWR1bGUgc2luZ2xlIGFuZCByZXBlYXQgYWN0aW9ucy5cbiAgICAgICAgLy8gSWYgdGhlIGFjdGlvbiByZXNjaGVkdWxlcyBpdHNlbGYgd2l0aCB0aGUgc2FtZSBkZWxheSwgdGhlIGludGVydmFsIGlzIG5vdFxuICAgICAgICAvLyBjYW5jZWxlZC4gSWYgdGhlIGFjdGlvbiBkb2Vzbid0IHJlc2NoZWR1bGUsIG9yIHJlc2NoZWR1bGVzIHdpdGggYVxuICAgICAgICAvLyBkaWZmZXJlbnQgZGVsYXksIHRoZSBpbnRlcnZhbCB3aWxsIGJlIGNhbmNlbGVkIGFmdGVyIHNjaGVkdWxlZCBjYWxsYmFja1xuICAgICAgICAvLyBleGVjdXRpb24uXG4gICAgICAgIC8vXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5yZWN5Y2xlQXN5bmNJZChzY2hlZHVsZXIsIGlkLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuICAgICAgICAvLyBJZiB0aGlzIGFjdGlvbiBoYXMgYWxyZWFkeSBhbiBhc3luYyBJZCwgZG9uJ3QgcmVxdWVzdCBhIG5ldyBvbmUuXG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmlkIHx8IHRoaXMucmVxdWVzdEFzeW5jSWQoc2NoZWR1bGVyLCB0aGlzLmlkLCBkZWxheSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gcm9vdF8xLnJvb3Quc2V0SW50ZXJ2YWwoc2NoZWR1bGVyLmZsdXNoLmJpbmQoc2NoZWR1bGVyLCB0aGlzKSwgZGVsYXkpO1xuICAgIH07XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLnJlY3ljbGVBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICAvLyBJZiB0aGlzIGFjdGlvbiBpcyByZXNjaGVkdWxlZCB3aXRoIHRoZSBzYW1lIGRlbGF5IHRpbWUsIGRvbid0IGNsZWFyIHRoZSBpbnRlcnZhbCBpZC5cbiAgICAgICAgaWYgKGRlbGF5ICE9PSBudWxsICYmIHRoaXMuZGVsYXkgPT09IGRlbGF5ICYmIHRoaXMucGVuZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIGlmIHRoZSBhY3Rpb24ncyBkZWxheSB0aW1lIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50IGRlbGF5LFxuICAgICAgICAvLyBvciB0aGUgYWN0aW9uIGhhcyBiZWVuIHJlc2NoZWR1bGVkIGJlZm9yZSBpdCdzIGV4ZWN1dGVkLCBjbGVhciB0aGUgaW50ZXJ2YWwgaWRcbiAgICAgICAgcmV0dXJuIHJvb3RfMS5yb290LmNsZWFySW50ZXJ2YWwoaWQpICYmIHVuZGVmaW5lZCB8fCB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbW1lZGlhdGVseSBleGVjdXRlcyB0aGlzIGFjdGlvbiBhbmQgdGhlIGB3b3JrYCBpdCBjb250YWlucy5cbiAgICAgKiBAcmV0dXJuIHthbnl9XG4gICAgICovXG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignZXhlY3V0aW5nIGEgY2FuY2VsbGVkIGFjdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3IgPSB0aGlzLl9leGVjdXRlKHN0YXRlLCBkZWxheSk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGVuZGluZyA9PT0gZmFsc2UgJiYgdGhpcy5pZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBEZXF1ZXVlIGlmIHRoZSBhY3Rpb24gZGlkbid0IHJlc2NoZWR1bGUgaXRzZWxmLiBEb24ndCBjYWxsXG4gICAgICAgICAgICAvLyB1bnN1YnNjcmliZSgpLCBiZWNhdXNlIHRoZSBhY3Rpb24gY291bGQgcmVzY2hlZHVsZSBsYXRlci5cbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlOlxuICAgICAgICAgICAgLy8gYGBgXG4gICAgICAgICAgICAvLyBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gZG9Xb3JrKGNvdW50ZXIpIHtcbiAgICAgICAgICAgIC8vICAgLyogLi4uIEknbSBhIGJ1c3kgd29ya2VyIGJlZSAuLi4gKi9cbiAgICAgICAgICAgIC8vICAgdmFyIG9yaWdpbmFsQWN0aW9uID0gdGhpcztcbiAgICAgICAgICAgIC8vICAgLyogd2FpdCAxMDBtcyBiZWZvcmUgcmVzY2hlZHVsaW5nIHRoZSBhY3Rpb24gKi9cbiAgICAgICAgICAgIC8vICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyAgICAgb3JpZ2luYWxBY3Rpb24uc2NoZWR1bGUoY291bnRlciArIDEpO1xuICAgICAgICAgICAgLy8gICB9LCAxMDApO1xuICAgICAgICAgICAgLy8gfSwgMTAwMCk7XG4gICAgICAgICAgICAvLyBgYGBcbiAgICAgICAgICAgIHRoaXMuaWQgPSB0aGlzLnJlY3ljbGVBc3luY0lkKHRoaXMuc2NoZWR1bGVyLCB0aGlzLmlkLCBudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLl9leGVjdXRlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICB2YXIgZXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3JWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMud29yayhzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgZXJyb3JWYWx1ZSA9ICEhZSAmJiBlIHx8IG5ldyBFcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3JlZCkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yVmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5fdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXMuaWQ7XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBzY2hlZHVsZXIuYWN0aW9ucztcbiAgICAgICAgdmFyIGluZGV4ID0gYWN0aW9ucy5pbmRleE9mKHRoaXMpO1xuICAgICAgICB0aGlzLndvcmsgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gbnVsbDtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgYWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5yZWN5Y2xlQXN5bmNJZChzY2hlZHVsZXIsIGlkLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlbGF5ID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBBc3luY0FjdGlvbjtcbn0oQWN0aW9uXzEuQWN0aW9uKSk7XG5leHBvcnRzLkFzeW5jQWN0aW9uID0gQXN5bmNBY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bc3luY0FjdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQW4gZXhlY3V0aW9uIGNvbnRleHQgYW5kIGEgZGF0YSBzdHJ1Y3R1cmUgdG8gb3JkZXIgdGFza3MgYW5kIHNjaGVkdWxlIHRoZWlyXG4gKiBleGVjdXRpb24uIFByb3ZpZGVzIGEgbm90aW9uIG9mIChwb3RlbnRpYWxseSB2aXJ0dWFsKSB0aW1lLCB0aHJvdWdoIHRoZVxuICogYG5vdygpYCBnZXR0ZXIgbWV0aG9kLlxuICpcbiAqIEVhY2ggdW5pdCBvZiB3b3JrIGluIGEgU2NoZWR1bGVyIGlzIGNhbGxlZCBhbiB7QGxpbmsgQWN0aW9ufS5cbiAqXG4gKiBgYGB0c1xuICogY2xhc3MgU2NoZWR1bGVyIHtcbiAqICAgbm93KCk6IG51bWJlcjtcbiAqICAgc2NoZWR1bGUod29yaywgZGVsYXk/LCBzdGF0ZT8pOiBTdWJzY3JpcHRpb247XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAY2xhc3MgU2NoZWR1bGVyXG4gKi9cbnZhciBTY2hlZHVsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjaGVkdWxlcihTY2hlZHVsZXJBY3Rpb24sIG5vdykge1xuICAgICAgICBpZiAobm93ID09PSB2b2lkIDApIHsgbm93ID0gU2NoZWR1bGVyLm5vdzsgfVxuICAgICAgICB0aGlzLlNjaGVkdWxlckFjdGlvbiA9IFNjaGVkdWxlckFjdGlvbjtcbiAgICAgICAgdGhpcy5ub3cgPSBub3c7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjaGVkdWxlcyBhIGZ1bmN0aW9uLCBgd29ya2AsIGZvciBleGVjdXRpb24uIE1heSBoYXBwZW4gYXQgc29tZSBwb2ludCBpblxuICAgICAqIHRoZSBmdXR1cmUsIGFjY29yZGluZyB0byB0aGUgYGRlbGF5YCBwYXJhbWV0ZXIsIGlmIHNwZWNpZmllZC4gTWF5IGJlIHBhc3NlZFxuICAgICAqIHNvbWUgY29udGV4dCBvYmplY3QsIGBzdGF0ZWAsIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBgd29ya2AgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBUaGUgZ2l2ZW4gYXJndW1lbnRzIHdpbGwgYmUgcHJvY2Vzc2VkIGFuIHN0b3JlZCBhcyBhbiBBY3Rpb24gb2JqZWN0IGluIGFcbiAgICAgKiBxdWV1ZSBvZiBhY3Rpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihzdGF0ZTogP1QpOiA/U3Vic2NyaXB0aW9ufSB3b3JrIEEgZnVuY3Rpb24gcmVwcmVzZW50aW5nIGFcbiAgICAgKiB0YXNrLCBvciBzb21lIHVuaXQgb2Ygd29yayB0byBiZSBleGVjdXRlZCBieSB0aGUgU2NoZWR1bGVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZGVsYXldIFRpbWUgdG8gd2FpdCBiZWZvcmUgZXhlY3V0aW5nIHRoZSB3b3JrLCB3aGVyZSB0aGVcbiAgICAgKiB0aW1lIHVuaXQgaXMgaW1wbGljaXQgYW5kIGRlZmluZWQgYnkgdGhlIFNjaGVkdWxlciBpdHNlbGYuXG4gICAgICogQHBhcmFtIHtUfSBbc3RhdGVdIFNvbWUgY29udGV4dHVhbCBkYXRhIHRoYXQgdGhlIGB3b3JrYCBmdW5jdGlvbiB1c2VzIHdoZW5cbiAgICAgKiBjYWxsZWQgYnkgdGhlIFNjaGVkdWxlci5cbiAgICAgKiBAcmV0dXJuIHtTdWJzY3JpcHRpb259IEEgc3Vic2NyaXB0aW9uIGluIG9yZGVyIHRvIGJlIGFibGUgdG8gdW5zdWJzY3JpYmVcbiAgICAgKiB0aGUgc2NoZWR1bGVkIHdvcmsuXG4gICAgICovXG4gICAgU2NoZWR1bGVyLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uICh3b3JrLCBkZWxheSwgc3RhdGUpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5TY2hlZHVsZXJBY3Rpb24odGhpcywgd29yaykuc2NoZWR1bGUoc3RhdGUsIGRlbGF5KTtcbiAgICB9O1xuICAgIFNjaGVkdWxlci5ub3cgPSBEYXRlLm5vdyA/IERhdGUubm93IDogZnVuY3Rpb24gKCkgeyByZXR1cm4gK25ldyBEYXRlKCk7IH07XG4gICAgcmV0dXJuIFNjaGVkdWxlcjtcbn0oKSk7XG5leHBvcnRzLlNjaGVkdWxlciA9IFNjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNjaGVkdWxlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFNjaGVkdWxlcl8xID0gcmVxdWlyZSgnLi4vU2NoZWR1bGVyJyk7XG52YXIgQXN5bmNTY2hlZHVsZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBc3luY1NjaGVkdWxlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBc3luY1NjaGVkdWxlcigpIHtcbiAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgdGhlIFNjaGVkdWxlciBpcyBjdXJyZW50bHkgZXhlY3V0aW5nIGEgYmF0Y2ggb2ZcbiAgICAgICAgICogcXVldWVkIGFjdGlvbnMuXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGludGVybmFsIElEIHVzZWQgdG8gdHJhY2sgdGhlIGxhdGVzdCBhc3luY2hyb25vdXMgdGFzayBzdWNoIGFzIHRob3NlXG4gICAgICAgICAqIGNvbWluZyBmcm9tIGBzZXRUaW1lb3V0YCwgYHNldEludGVydmFsYCwgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAsIGFuZFxuICAgICAgICAgKiBvdGhlcnMuXG4gICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNjaGVkdWxlZCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgQXN5bmNTY2hlZHVsZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goYWN0aW9uKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKGVycm9yID0gYWN0aW9uLmV4ZWN1dGUoYWN0aW9uLnN0YXRlLCBhY3Rpb24uZGVsYXkpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGFjdGlvbiA9IGFjdGlvbnMuc2hpZnQoKSk7IC8vIGV4aGF1c3QgdGhlIHNjaGVkdWxlciBxdWV1ZVxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHdoaWxlIChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNTY2hlZHVsZXI7XG59KFNjaGVkdWxlcl8xLlNjaGVkdWxlcikpO1xuZXhwb3J0cy5Bc3luY1NjaGVkdWxlciA9IEFzeW5jU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXN5bmNTY2hlZHVsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgQXN5bmNBY3Rpb25fMSA9IHJlcXVpcmUoJy4vQXN5bmNBY3Rpb24nKTtcbnZhciBBc3luY1NjaGVkdWxlcl8xID0gcmVxdWlyZSgnLi9Bc3luY1NjaGVkdWxlcicpO1xuLyoqXG4gKlxuICogQXN5bmMgU2NoZWR1bGVyXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPlNjaGVkdWxlIHRhc2sgYXMgaWYgeW91IHVzZWQgc2V0VGltZW91dCh0YXNrLCBkdXJhdGlvbik8L3NwYW4+XG4gKlxuICogYGFzeW5jYCBzY2hlZHVsZXIgc2NoZWR1bGVzIHRhc2tzIGFzeW5jaHJvbm91c2x5LCBieSBwdXR0aW5nIHRoZW0gb24gdGhlIEphdmFTY3JpcHRcbiAqIGV2ZW50IGxvb3AgcXVldWUuIEl0IGlzIGJlc3QgdXNlZCB0byBkZWxheSB0YXNrcyBpbiB0aW1lIG9yIHRvIHNjaGVkdWxlIHRhc2tzIHJlcGVhdGluZ1xuICogaW4gaW50ZXJ2YWxzLlxuICpcbiAqIElmIHlvdSBqdXN0IHdhbnQgdG8gXCJkZWZlclwiIHRhc2ssIHRoYXQgaXMgdG8gcGVyZm9ybSBpdCByaWdodCBhZnRlciBjdXJyZW50bHlcbiAqIGV4ZWN1dGluZyBzeW5jaHJvbm91cyBjb2RlIGVuZHMgKGNvbW1vbmx5IGFjaGlldmVkIGJ5IGBzZXRUaW1lb3V0KGRlZmVycmVkVGFzaywgMClgKSxcbiAqIGJldHRlciBjaG9pY2Ugd2lsbCBiZSB0aGUge0BsaW5rIGFzYXB9IHNjaGVkdWxlci5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Vc2UgYXN5bmMgc2NoZWR1bGVyIHRvIGRlbGF5IHRhc2s8L2NhcHRpb24+XG4gKiBjb25zdCB0YXNrID0gKCkgPT4gY29uc29sZS5sb2coJ2l0IHdvcmtzIScpO1xuICpcbiAqIFJ4LlNjaGVkdWxlci5hc3luYy5zY2hlZHVsZSh0YXNrLCAyMDAwKTtcbiAqXG4gKiAvLyBBZnRlciAyIHNlY29uZHMgbG9nczpcbiAqIC8vIFwiaXQgd29ya3MhXCJcbiAqXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VXNlIGFzeW5jIHNjaGVkdWxlciB0byByZXBlYXQgdGFzayBpbiBpbnRlcnZhbHM8L2NhcHRpb24+XG4gKiBmdW5jdGlvbiB0YXNrKHN0YXRlKSB7XG4gKiAgIGNvbnNvbGUubG9nKHN0YXRlKTtcbiAqICAgdGhpcy5zY2hlZHVsZShzdGF0ZSArIDEsIDEwMDApOyAvLyBgdGhpc2AgcmVmZXJlbmNlcyBjdXJyZW50bHkgZXhlY3V0aW5nIEFjdGlvbixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGljaCB3ZSByZXNjaGVkdWxlIHdpdGggbmV3IHN0YXRlIGFuZCBkZWxheVxuICogfVxuICpcbiAqIFJ4LlNjaGVkdWxlci5hc3luYy5zY2hlZHVsZSh0YXNrLCAzMDAwLCAwKTtcbiAqXG4gKiAvLyBMb2dzOlxuICogLy8gMCBhZnRlciAzc1xuICogLy8gMSBhZnRlciA0c1xuICogLy8gMiBhZnRlciA1c1xuICogLy8gMyBhZnRlciA2c1xuICpcbiAqIEBzdGF0aWMgdHJ1ZVxuICogQG5hbWUgYXN5bmNcbiAqIEBvd25lciBTY2hlZHVsZXJcbiAqL1xuZXhwb3J0cy5hc3luYyA9IG5ldyBBc3luY1NjaGVkdWxlcl8xLkFzeW5jU2NoZWR1bGVyKEFzeW5jQWN0aW9uXzEuQXN5bmNBY3Rpb24pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXN5bmMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBpc051bWVyaWNfMSA9IHJlcXVpcmUoJy4uL3V0aWwvaXNOdW1lcmljJyk7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi4vT2JzZXJ2YWJsZScpO1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKCcuLi9zY2hlZHVsZXIvYXN5bmMnKTtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG52YXIgSW50ZXJ2YWxPYnNlcnZhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW50ZXJ2YWxPYnNlcnZhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEludGVydmFsT2JzZXJ2YWJsZShwZXJpb2QsIHNjaGVkdWxlcikge1xuICAgICAgICBpZiAocGVyaW9kID09PSB2b2lkIDApIHsgcGVyaW9kID0gMDsgfVxuICAgICAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gYXN5bmNfMS5hc3luYzsgfVxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5wZXJpb2QgPSBwZXJpb2Q7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICBpZiAoIWlzTnVtZXJpY18xLmlzTnVtZXJpYyhwZXJpb2QpIHx8IHBlcmlvZCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMucGVyaW9kID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNjaGVkdWxlciB8fCB0eXBlb2Ygc2NoZWR1bGVyLnNjaGVkdWxlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlciA9IGFzeW5jXzEuYXN5bmM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgc2VxdWVudGlhbCBudW1iZXJzIGV2ZXJ5IHNwZWNpZmllZFxuICAgICAqIGludGVydmFsIG9mIHRpbWUsIG9uIGEgc3BlY2lmaWVkIElTY2hlZHVsZXIuXG4gICAgICpcbiAgICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RW1pdHMgaW5jcmVtZW50YWwgbnVtYmVycyBwZXJpb2RpY2FsbHkgaW4gdGltZS5cbiAgICAgKiA8L3NwYW4+XG4gICAgICpcbiAgICAgKiA8aW1nIHNyYz1cIi4vaW1nL2ludGVydmFsLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICAgICAqXG4gICAgICogYGludGVydmFsYCByZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhbiBpbmZpbml0ZSBzZXF1ZW5jZSBvZlxuICAgICAqIGFzY2VuZGluZyBpbnRlZ2Vycywgd2l0aCBhIGNvbnN0YW50IGludGVydmFsIG9mIHRpbWUgb2YgeW91ciBjaG9vc2luZ1xuICAgICAqIGJldHdlZW4gdGhvc2UgZW1pc3Npb25zLiBUaGUgZmlyc3QgZW1pc3Npb24gaXMgbm90IHNlbnQgaW1tZWRpYXRlbHksIGJ1dFxuICAgICAqIG9ubHkgYWZ0ZXIgdGhlIGZpcnN0IHBlcmlvZCBoYXMgcGFzc2VkLiBCeSBkZWZhdWx0LCB0aGlzIG9wZXJhdG9yIHVzZXMgdGhlXG4gICAgICogYGFzeW5jYCBJU2NoZWR1bGVyIHRvIHByb3ZpZGUgYSBub3Rpb24gb2YgdGltZSwgYnV0IHlvdSBtYXkgcGFzcyBhbnlcbiAgICAgKiBJU2NoZWR1bGVyIHRvIGl0LlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdHMgYXNjZW5kaW5nIG51bWJlcnMsIG9uZSBldmVyeSBzZWNvbmQgKDEwMDBtcyk8L2NhcHRpb24+XG4gICAgICogdmFyIG51bWJlcnMgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICAgICAqIG51bWJlcnMuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgdGltZXJ9XG4gICAgICogQHNlZSB7QGxpbmsgZGVsYXl9XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BlcmlvZD0wXSBUaGUgaW50ZXJ2YWwgc2l6ZSBpbiBtaWxsaXNlY29uZHMgKGJ5IGRlZmF1bHQpXG4gICAgICogb3IgdGhlIHRpbWUgdW5pdCBkZXRlcm1pbmVkIGJ5IHRoZSBzY2hlZHVsZXIncyBjbG9jay5cbiAgICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1hc3luY10gVGhlIElTY2hlZHVsZXIgdG8gdXNlIGZvciBzY2hlZHVsaW5nXG4gICAgICogdGhlIGVtaXNzaW9uIG9mIHZhbHVlcywgYW5kIHByb3ZpZGluZyBhIG5vdGlvbiBvZiBcInRpbWVcIi5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYSBzZXF1ZW50aWFsIG51bWJlciBlYWNoIHRpbWVcbiAgICAgKiBpbnRlcnZhbC5cbiAgICAgKiBAc3RhdGljIHRydWVcbiAgICAgKiBAbmFtZSBpbnRlcnZhbFxuICAgICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAgICovXG4gICAgSW50ZXJ2YWxPYnNlcnZhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChwZXJpb2QsIHNjaGVkdWxlcikge1xuICAgICAgICBpZiAocGVyaW9kID09PSB2b2lkIDApIHsgcGVyaW9kID0gMDsgfVxuICAgICAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gYXN5bmNfMS5hc3luYzsgfVxuICAgICAgICByZXR1cm4gbmV3IEludGVydmFsT2JzZXJ2YWJsZShwZXJpb2QsIHNjaGVkdWxlcik7XG4gICAgfTtcbiAgICBJbnRlcnZhbE9ic2VydmFibGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXgsIHN1YnNjcmliZXIgPSBzdGF0ZS5zdWJzY3JpYmVyLCBwZXJpb2QgPSBzdGF0ZS5wZXJpb2Q7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChpbmRleCk7XG4gICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmluZGV4ICs9IDE7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoc3RhdGUsIHBlcmlvZCk7XG4gICAgfTtcbiAgICBJbnRlcnZhbE9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB2YXIgcGVyaW9kID0gdGhpcy5wZXJpb2Q7XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgc3Vic2NyaWJlci5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKEludGVydmFsT2JzZXJ2YWJsZS5kaXNwYXRjaCwgcGVyaW9kLCB7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsIHN1YnNjcmliZXI6IHN1YnNjcmliZXIsIHBlcmlvZDogcGVyaW9kXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIHJldHVybiBJbnRlcnZhbE9ic2VydmFibGU7XG59KE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKSk7XG5leHBvcnRzLkludGVydmFsT2JzZXJ2YWJsZSA9IEludGVydmFsT2JzZXJ2YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUludGVydmFsT2JzZXJ2YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBJbnRlcnZhbE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4vSW50ZXJ2YWxPYnNlcnZhYmxlJyk7XG5leHBvcnRzLmludGVydmFsID0gSW50ZXJ2YWxPYnNlcnZhYmxlXzEuSW50ZXJ2YWxPYnNlcnZhYmxlLmNyZWF0ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVydmFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uLy4uL09ic2VydmFibGUnKTtcbnZhciBpbnRlcnZhbF8xID0gcmVxdWlyZSgnLi4vLi4vb2JzZXJ2YWJsZS9pbnRlcnZhbCcpO1xuT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUuaW50ZXJ2YWwgPSBpbnRlcnZhbF8xLmludGVydmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJ2YWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuLi9TdWJzY3JpYmVyJyk7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBGaWx0ZXIgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYnkgb25seSBlbWl0dGluZyB0aG9zZSB0aGF0XG4gKiBzYXRpc2Z5IGEgc3BlY2lmaWVkIHByZWRpY2F0ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TGlrZVxuICogW0FycmF5LnByb3RvdHlwZS5maWx0ZXIoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyKSxcbiAqIGl0IG9ubHkgZW1pdHMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgaWYgaXQgcGFzc2VzIGEgY3JpdGVyaW9uIGZ1bmN0aW9uLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2ZpbHRlci5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBTaW1pbGFyIHRvIHRoZSB3ZWxsLWtub3duIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2QsIHRoaXMgb3BlcmF0b3JcbiAqIHRha2VzIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgcGFzc2VzIHRoZW0gdGhyb3VnaCBhIGBwcmVkaWNhdGVgXG4gKiBmdW5jdGlvbiBhbmQgb25seSBlbWl0cyB0aG9zZSB2YWx1ZXMgdGhhdCB5aWVsZGVkIGB0cnVlYC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IG9ubHkgY2xpY2sgZXZlbnRzIHdob3NlIHRhcmdldCB3YXMgYSBESVYgZWxlbWVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgY2xpY2tzT25EaXZzID0gY2xpY2tzLmZpbHRlcihldiA9PiBldi50YXJnZXQudGFnTmFtZSA9PT0gJ0RJVicpO1xuICogY2xpY2tzT25EaXZzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdH1cbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0VW50aWxDaGFuZ2VkfVxuICogQHNlZSB7QGxpbmsgZGlzdGluY3RVbnRpbEtleUNoYW5nZWR9XG4gKiBAc2VlIHtAbGluayBpZ25vcmVFbGVtZW50c31cbiAqIEBzZWUge0BsaW5rIHBhcnRpdGlvbn1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW59IHByZWRpY2F0ZSBBIGZ1bmN0aW9uIHRoYXRcbiAqIGV2YWx1YXRlcyBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBJZiBpdCByZXR1cm5zIGB0cnVlYCxcbiAqIHRoZSB2YWx1ZSBpcyBlbWl0dGVkLCBpZiBgZmFsc2VgIHRoZSB2YWx1ZSBpcyBub3QgcGFzc2VkIHRvIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUuIFRoZSBgaW5kZXhgIHBhcmFtZXRlciBpcyB0aGUgbnVtYmVyIGBpYCBmb3IgdGhlIGktdGggc291cmNlXG4gKiBlbWlzc2lvbiB0aGF0IGhhcyBoYXBwZW5lZCBzaW5jZSB0aGUgc3Vic2NyaXB0aW9uLCBzdGFydGluZyBmcm9tIHRoZSBudW1iZXJcbiAqIGAwYC5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gZGV0ZXJtaW5lIHRoZSB2YWx1ZSBvZiBgdGhpc2BcbiAqIGluIHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSB0aGF0IHdlcmVcbiAqIGFsbG93ZWQgYnkgdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLlxuICogQG1ldGhvZCBmaWx0ZXJcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZmlsdGVyT3BlcmF0b3JGdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5saWZ0KG5ldyBGaWx0ZXJPcGVyYXRvcihwcmVkaWNhdGUsIHRoaXNBcmcpKTtcbiAgICB9O1xufVxuZXhwb3J0cy5maWx0ZXIgPSBmaWx0ZXI7XG52YXIgRmlsdGVyT3BlcmF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZpbHRlck9wZXJhdG9yKHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgICAgICB0aGlzLnByZWRpY2F0ZSA9IHByZWRpY2F0ZTtcbiAgICAgICAgdGhpcy50aGlzQXJnID0gdGhpc0FyZztcbiAgICB9XG4gICAgRmlsdGVyT3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBGaWx0ZXJTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucHJlZGljYXRlLCB0aGlzLnRoaXNBcmcpKTtcbiAgICB9O1xuICAgIHJldHVybiBGaWx0ZXJPcGVyYXRvcjtcbn0oKSk7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xudmFyIEZpbHRlclN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGaWx0ZXJTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZpbHRlclN1YnNjcmliZXIoZGVzdGluYXRpb24sIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMucHJlZGljYXRlID0gcHJlZGljYXRlO1xuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB9XG4gICAgLy8gdGhlIHRyeSBjYXRjaCBibG9jayBiZWxvdyBpcyBsZWZ0IHNwZWNpZmljYWxseSBmb3JcbiAgICAvLyBvcHRpbWl6YXRpb24gYW5kIHBlcmYgcmVhc29ucy4gYSB0cnlDYXRjaGVyIGlzIG5vdCBuZWNlc3NhcnkgaGVyZS5cbiAgICBGaWx0ZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wcmVkaWNhdGUuY2FsbCh0aGlzLnRoaXNBcmcsIHZhbHVlLCB0aGlzLmNvdW50KyspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRmlsdGVyU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBmaWx0ZXJfMSA9IHJlcXVpcmUoJy4uL29wZXJhdG9ycy9maWx0ZXInKTtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4vKipcbiAqIEZpbHRlciBpdGVtcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBieSBvbmx5IGVtaXR0aW5nIHRob3NlIHRoYXRcbiAqIHNhdGlzZnkgYSBzcGVjaWZpZWQgcHJlZGljYXRlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5MaWtlXG4gKiBbQXJyYXkucHJvdG90eXBlLmZpbHRlcigpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9maWx0ZXIpLFxuICogaXQgb25seSBlbWl0cyBhIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBpZiBpdCBwYXNzZXMgYSBjcml0ZXJpb24gZnVuY3Rpb24uPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZmlsdGVyLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFNpbWlsYXIgdG8gdGhlIHdlbGwta25vd24gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZCwgdGhpcyBvcGVyYXRvclxuICogdGFrZXMgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBwYXNzZXMgdGhlbSB0aHJvdWdoIGEgYHByZWRpY2F0ZWBcbiAqIGZ1bmN0aW9uIGFuZCBvbmx5IGVtaXRzIHRob3NlIHZhbHVlcyB0aGF0IHlpZWxkZWQgYHRydWVgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXQgb25seSBjbGljayBldmVudHMgd2hvc2UgdGFyZ2V0IHdhcyBhIERJViBlbGVtZW50PC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBjbGlja3NPbkRpdnMgPSBjbGlja3MuZmlsdGVyKGV2ID0+IGV2LnRhcmdldC50YWdOYW1lID09PSAnRElWJyk7XG4gKiBjbGlja3NPbkRpdnMuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0fVxuICogQHNlZSB7QGxpbmsgZGlzdGluY3RVbnRpbENoYW5nZWR9XG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZH1cbiAqIEBzZWUge0BsaW5rIGlnbm9yZUVsZW1lbnRzfVxuICogQHNlZSB7QGxpbmsgcGFydGl0aW9ufVxuICogQHNlZSB7QGxpbmsgc2tpcH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKTogYm9vbGVhbn0gcHJlZGljYXRlIEEgZnVuY3Rpb24gdGhhdFxuICogZXZhbHVhdGVzIGVhY2ggdmFsdWUgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuIElmIGl0IHJldHVybnMgYHRydWVgLFxuICogdGhlIHZhbHVlIGlzIGVtaXR0ZWQsIGlmIGBmYWxzZWAgdGhlIHZhbHVlIGlzIG5vdCBwYXNzZWQgdG8gdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZS4gVGhlIGBpbmRleGAgcGFyYW1ldGVyIGlzIHRoZSBudW1iZXIgYGlgIGZvciB0aGUgaS10aCBzb3VyY2VcbiAqIGVtaXNzaW9uIHRoYXQgaGFzIGhhcHBlbmVkIHNpbmNlIHRoZSBzdWJzY3JpcHRpb24sIHN0YXJ0aW5nIGZyb20gdGhlIG51bWJlclxuICogYDBgLlxuICogQHBhcmFtIHthbnl9IFt0aGlzQXJnXSBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBkZXRlcm1pbmUgdGhlIHZhbHVlIG9mIGB0aGlzYFxuICogaW4gdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBvZiB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIHRoYXQgd2VyZVxuICogYWxsb3dlZCBieSB0aGUgYHByZWRpY2F0ZWAgZnVuY3Rpb24uXG4gKiBAbWV0aG9kIGZpbHRlclxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZnVuY3Rpb24gZmlsdGVyKHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgIHJldHVybiBmaWx0ZXJfMS5maWx0ZXIocHJlZGljYXRlLCB0aGlzQXJnKSh0aGlzKTtcbn1cbmV4cG9ydHMuZmlsdGVyID0gZmlsdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uLy4uL09ic2VydmFibGUnKTtcbnZhciBmaWx0ZXJfMSA9IHJlcXVpcmUoJy4uLy4uL29wZXJhdG9yL2ZpbHRlcicpO1xuT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUucHJvdG90eXBlLmZpbHRlciA9IGZpbHRlcl8xLmZpbHRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlci5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IExvZ2dpbmdFdmVudCB9IGZyb20gJy4uL21vZGVscy9sb2ctZXZlbnQnO1xuaW1wb3J0IHsgQXBwZW5kZXIgfSBmcm9tICcuLi9hcHBlbmRlcnMvYXBwZW5kZXInO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9maWx0ZXInO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2ludGVydmFsJztcblxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTG9nV3JpdGVyIHtcbiAgICAgIHByb3RlY3RlZCBhcHBlbmRlcnM6IE1hcDxzdHJpbmcsIEFwcGVuZGVyPiA9IG5ldyBNYXAoKTtcbiAgICAgIGFic3RyYWN0IGFkZExvZ0VudHJ5KGxvZ0V2ZW50OiBMb2dnaW5nRXZlbnQpOiB2b2lkO1xuICAgICAgYWRkQXBwZW5kZXIoYXBwZW5kZXI6IEFwcGVuZGVyKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYXBwZW5kZXJzLmhhcyhhcHBlbmRlci5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRlcnMuc2V0KGFwcGVuZGVyLm5hbWUsIGFwcGVuZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YXRpYyBnZXRJbW1lZGlhdGVMb2dXcml0ZXIoKTogTG9nV3JpdGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSW1tZWRpYXRlTG9nV3JpdGVyKCk7XG4gICAgICB9XG4gICAgICBzdGF0aWMgZ2V0RGVmZmVycmVkV3JpdGVyKGRlbGF5OiBudW1iZXIpOiBMb2dXcml0ZXIge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEZWZmZXJyZWRMb2dnZXIoZGVsYXkpO1xuICAgICAgfVxufVxuXG5jbGFzcyBJbW1lZGlhdGVMb2dXcml0ZXIgZXh0ZW5kcyBMb2dXcml0ZXIge1xuXG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICB9XG5cbiAgICAgIGFkZExvZ0VudHJ5KGxvZ0V2ZW50OiBMb2dnaW5nRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kZXJzLmZvckVhY2goKGFwcGVuZGVyLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGFwcGVuZGVyLndyaXRlTG9nKGxvZ0V2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfVxufVxuXG5jbGFzcyBEZWZmZXJyZWRMb2dnZXIgZXh0ZW5kcyBMb2dXcml0ZXIge1xuICAgICAgcHJpdmF0ZSBsb2dFdmVudHM6IExvZ2dpbmdFdmVudFtdID0gW107XG4gICAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlbGF5OiBudW1iZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICBPYnNlcnZhYmxlLmludGVydmFsKGRlbGF5KVxuICAgICAgICAgICAgICAgICAgLmZpbHRlcigoKSA9PiB0aGlzLmxvZ0V2ZW50cy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLndyaXRlRXZlbnRzLmJpbmQodGhpcykpO1xuICAgICAgfVxuICAgICAgYWRkTG9nRW50cnkobG9nRXZlbnQ6IExvZ2dpbmdFdmVudCk6IHZvaWQge1xuXG4gICAgICAgICAgICB0aGlzLmxvZ0V2ZW50cy5wdXNoKGxvZ0V2ZW50KTtcbiAgICAgIH1cbiAgICAgIHByaXZhdGUgd3JpdGVFdmVudHMoKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZGVycy5mb3JFYWNoKChhcHBlbmRlciwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICBhcHBlbmRlci53cml0ZUxvZ3ModGhpcy5sb2dFdmVudHMpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5sb2dFdmVudHMgPSBbXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfVxufVxuIiwiaW1wb3J0IHsgQXBwZW5kZXJSZXBvc2l0b3J5LCBBcHBlbmRlciB9IGZyb20gJy4uL2FwcGVuZGVycy9pbmRleCc7XG5pbXBvcnQgeyBMb2dMZXZlbCwgTG9nT3B0aW9ucywgTG9nZ2VyU3RhdGljSW5mbyB9IGZyb20gXCIuLi8uLi9maXQtbG9nZ2VyLWNvcmUvaW5kZXhcIjtcbmltcG9ydCB7IExvZ2dpbmdFdmVudCB9IGZyb20gJy4uL21vZGVscy9sb2ctZXZlbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9pbnRlcnZhbCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqcy9TdWJzY3JpcHRpb25cIjtcbmltcG9ydCB7IExvZ1dyaXRlciB9IGZyb20gJy4vbG9nLndyaXRlcic7XG5cblxuZXhwb3J0IGNsYXNzIExvZ2dpbmdDb250cm9sbGVyIHtcbiAgICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZSA9IG5ldyBMb2dnaW5nQ29udHJvbGxlcigpO1xuICAgICAgcHJpdmF0ZSBpbW1lZFdyaXRlciA9IExvZ1dyaXRlci5nZXRJbW1lZGlhdGVMb2dXcml0ZXIoKTtcbiAgICAgIHByaXZhdGUgZGVmTG9nV3JpdGVyOiBMb2dXcml0ZXI7XG4gICAgICBwcml2YXRlIF9zdGF0aWNJbmZvOiBMb2dnZXJTdGF0aWNJbmZvID0geyBhcHBOYW1lOiBcIlwiIH07XG4gICAgICBwcml2YXRlIF9sb2dPcHRpb25zOiBMb2dPcHRpb25zO1xuXG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIGlmIChMb2dnaW5nQ29udHJvbGxlci5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yOiBJbnN0YW50aWF0aW9uIGZhaWxlZDogVXNlIExvZ2dpbmdTdG9yZS5pbnN0YW5jZSBpbnN0ZWFkIG9mIG5ldy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBMb2dnaW5nQ29udHJvbGxlci5faW5zdGFuY2UgPSB0aGlzO1xuICAgICAgfVxuXG4gICAgICBwdWJsaWMgaW5pdGlhbGl6ZShsb2dnZXJTdGF0aWNJbmZvOiBMb2dnZXJTdGF0aWNJbmZvLCBvcHRpb25zPzogTG9nT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlU3RhdGljSW5mbyhsb2dnZXJTdGF0aWNJbmZvKTtcbiAgICAgICAgICAgIHRoaXMuX2xvZ09wdGlvbnMgPSBvcHRpb25zIHx8IHRoaXMuX2xvZ09wdGlvbnMgfHwgdGhpcy5nZXREZWZhdWx0T3B0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5fbG9nT3B0aW9ucy5hcHBlbmRlcnMuZm9yRWFjaChhcHBlbmRlck9wdGlvbnMgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGFwcGVuZGVyT3B0aW9ucy5pc0RlZmZlcnJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXBwZW5kZXIgPSBBcHBlbmRlclJlcG9zaXRvcnkuaW5zdGFuY2UuZ2V0QXBwZW5kZXIoYXBwZW5kZXJPcHRpb25zLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsYXkgPSB0aGlzLl9sb2dPcHRpb25zLmxvZ0ludGVydmFsIHx8IDEwMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZMb2dXcml0ZXIgPSB0aGlzLmRlZkxvZ1dyaXRlciB8fCBMb2dXcml0ZXIuZ2V0RGVmZmVycmVkV3JpdGVyKGRlbGF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZGVyLnVwZGF0ZShhcHBlbmRlck9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZMb2dXcml0ZXIuYWRkQXBwZW5kZXIoYXBwZW5kZXIpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFwcGVuZGVyID0gQXBwZW5kZXJSZXBvc2l0b3J5Lmluc3RhbmNlLmdldEFwcGVuZGVyKGFwcGVuZGVyT3B0aW9ucy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZGVyLnVwZGF0ZShhcHBlbmRlck9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbW1lZFdyaXRlci5hZGRBcHBlbmRlcihhcHBlbmRlcik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgfVxuICAgICAgcHVibGljIGVucXVldWUobG9nRXZlbnQ6IExvZ2dpbmdFdmVudCk6IHZvaWQge1xuICAgICAgICAgICAgbG9nRXZlbnQuYXBwTmFtZSA9IHRoaXMuX3N0YXRpY0luZm8uYXBwTmFtZTtcbiAgICAgICAgICAgIGxvZ0V2ZW50LnVzZXIgPSB0aGlzLl9zdGF0aWNJbmZvLnVzZXI7XG4gICAgICAgICAgICBsb2dFdmVudC5yZWdpb24gPSB0aGlzLl9zdGF0aWNJbmZvLnJlZ2lvbjtcbiAgICAgICAgICAgIGxvZ0V2ZW50LmVudiA9IHRoaXMuX3N0YXRpY0luZm8uZW52O1xuXG4gICAgICAgICAgICB0aGlzLmltbWVkV3JpdGVyLmFkZExvZ0VudHJ5KGxvZ0V2ZW50KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRlZkxvZ1dyaXRlcikge1xuICAgICAgICAgICAgICAgICAgdGhpcy5kZWZMb2dXcml0ZXIuYWRkTG9nRW50cnkobG9nRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwcml2YXRlIHJlc29sdmVTdGF0aWNJbmZvKHN0YXRpY0luZm86IExvZ2dlclN0YXRpY0luZm8pIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpY0luZm8uYXBwTmFtZSA9IHRoaXMuX3N0YXRpY0luZm8uYXBwTmFtZSB8fCBzdGF0aWNJbmZvLmFwcE5hbWU7XG4gICAgICAgICAgICB0aGlzLl9zdGF0aWNJbmZvLnVzZXIgPSB0aGlzLl9zdGF0aWNJbmZvLnVzZXIgfHwgc3RhdGljSW5mby51c2VyO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGljSW5mby5lbnYgPSB0aGlzLl9zdGF0aWNJbmZvLmVudiB8fCBzdGF0aWNJbmZvLmVudjtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpY0luZm8ucmVnaW9uID0gdGhpcy5fc3RhdGljSW5mby5yZWdpb24gfHwgc3RhdGljSW5mby5yZWdpb247XG4gICAgICB9XG4gICAgICBwcml2YXRlIGdldERlZmF1bHRPcHRpb25zKCk6IExvZ09wdGlvbnMge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIGFwcExvZ0xldmVsOiBMb2dMZXZlbC5BTEwsXG4gICAgICAgICAgICAgICAgICBsb2dJbnRlcnZhbDogMTAwMDAsXG4gICAgICAgICAgICAgICAgICBhcHBlbmRlcnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnY29uc29sZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ0xldmVsOiBMb2dMZXZlbC5BTExcbiAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9O1xuICAgICAgfVxuICAgICAgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBMb2dnaW5nQ29udHJvbGxlciB7XG4gICAgICAgICAgICByZXR1cm4gTG9nZ2luZ0NvbnRyb2xsZXIuX2luc3RhbmNlO1xuICAgICAgfVxufVxuIiwiaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tICcuLi8uLi9maXQtbG9nZ2VyLWNvcmUvaW5kZXgnO1xuXG5cbmV4cG9ydCBjbGFzcyBMb2dnaW5nRXZlbnQge1xuICBhcHBOYW1lIDogc3RyaW5nO1xuICB1c2VyOiBzdHJpbmc7XG4gIHJlZ2lvbiA6IHN0cmluZztcbiAgZW52IDogc3RyaW5nO1xuICBuYW1lIDogc3RyaW5nO1xuICBncm91cE5hbWUgOiBzdHJpbmc7XG4gIHRpbWVzdGFtcCA6IG51bWJlcjtcbiAgbGV2ZWwgOiBMb2dMZXZlbDtcbiAgbWVzc2FnZTogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgQXBwbGljYXRpb25Mb2dnZXIsIExvZ0xldmVsIH0gZnJvbSAnLi4vLi4vZml0LWxvZ2dlci1jb3JlL2luZGV4JztcbmltcG9ydCB7IExvZ2dpbmdFdmVudCB9IGZyb20gJy4uL21vZGVscy9sb2ctZXZlbnQnO1xuaW1wb3J0IHsgTG9nZ2luZ0NvbnRyb2xsZXIgfSBmcm9tICcuLi9sb2d3cml0ZXJzL2xvZ2dpbmcuY29udHJvbGxlcic7XG5cblxuZXhwb3J0IGNsYXNzIExvZ2dlciBpbXBsZW1lbnRzIEFwcGxpY2F0aW9uTG9nZ2VyIHtcbiAgcHJpdmF0ZSBtb2R1bGVMb2dMZXZlbDogTG9nTGV2ZWw7XG4gIHByaXZhdGUgdGltZXIgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9nZ2VyTmFtZTogc3RyaW5nLCBwcml2YXRlIGxldmVsPzogTG9nTGV2ZWwpIHtcbiAgICB0aGlzLm1vZHVsZUxvZ0xldmVsID0gbGV2ZWwgPyBsZXZlbCA6IExvZ0xldmVsLkFMTDtcbiAgfVxuXG4gIGxvZyhsZXZlbDogTG9nTGV2ZWwsIHBhcmFtczogYW55W10pOiB2b2lkIHtcbiAgICBpZiAobGV2ZWwgPj0gdGhpcy5tb2R1bGVMb2dMZXZlbCkge1xuICAgICAgdGhpcy5idWlsZExvZ2dpbmdFdmVudChsZXZlbCwgcGFyYW1zKTtcbiAgICB9XG4gIH1cbiAgdHJhY2UoLi4ubWVzc2FnZXM6IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kdWxlTG9nTGV2ZWwgPj0gTG9nTGV2ZWwuVFJBQ0UpIHtcbiAgICAgIHRoaXMuYnVpbGRMb2dnaW5nRXZlbnQoTG9nTGV2ZWwuVFJBQ0UsIG1lc3NhZ2VzKTtcbiAgICB9XG4gIH1cbiAgZGVidWcoLi4ubWVzc2FnZXM6IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKExvZ0xldmVsLkRFQlVHID49IHRoaXMubW9kdWxlTG9nTGV2ZWwpIHtcbiAgICAgIHRoaXMuYnVpbGRMb2dnaW5nRXZlbnQoTG9nTGV2ZWwuREVCVUcsIG1lc3NhZ2VzKTtcbiAgICB9XG4gIH1cbiAgaW5mbyguLi5tZXNzYWdlczogYW55W10pOiB2b2lkIHtcbiAgICBpZiAoTG9nTGV2ZWwuSU5GTyA+PSB0aGlzLm1vZHVsZUxvZ0xldmVsKSB7XG4gICAgICB0aGlzLmJ1aWxkTG9nZ2luZ0V2ZW50KExvZ0xldmVsLklORk8sIG1lc3NhZ2VzKTtcbiAgICB9XG4gIH1cbiAgd2FybiguLi5tZXNzYWdlczogYW55W10pOiB2b2lkIHtcbiAgICBpZiAoTG9nTGV2ZWwuV0FSTiA+PSB0aGlzLm1vZHVsZUxvZ0xldmVsKSB7XG4gICAgICB0aGlzLmJ1aWxkTG9nZ2luZ0V2ZW50KExvZ0xldmVsLldBUk4sIG1lc3NhZ2VzKTtcbiAgICB9XG4gIH1cbiAgZXJyb3IoLi4ubWVzc2FnZXM6IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKExvZ0xldmVsLkVSUk9SID49IHRoaXMubW9kdWxlTG9nTGV2ZWwpIHtcbiAgICAgIHRoaXMuYnVpbGRMb2dnaW5nRXZlbnQoTG9nTGV2ZWwuRVJST1IsIG1lc3NhZ2VzKTtcbiAgICB9XG4gIH1cbiAgZmF0YWwoLi4ubWVzc2FnZXM6IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKExvZ0xldmVsLkZBVEFMID49IHRoaXMubW9kdWxlTG9nTGV2ZWwpIHtcbiAgICAgIHRoaXMuYnVpbGRMb2dnaW5nRXZlbnQoTG9nTGV2ZWwuRkFUQUwsIG1lc3NhZ2VzKTtcbiAgICB9XG4gIH1cbiAgZ3JvdXAobmFtZTogc3RyaW5nLCBpbml0aWFsbHlFeHBhbmRlZD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyB0aGlzLmJ1aWxkTG9nZ2luZ0V2ZW50KExvZ0xldmVsLlRSQUNFLHVuZGVmaW5lZCxtZXNzYWdlcyk7XG4gIH1cbiAgZ3JvdXBFbmQoKTogdm9pZCB7XG4gICAgLy8gdGhpcy5idWlsZExvZ2dpbmdFdmVudChMb2dMZXZlbC5UUkFDRSx1bmRlZmluZWQsbWVzc2FnZXMpO1xuICB9XG4gIHRpbWUobmFtZTogc3RyaW5nLCBsZXZlbD86IExvZ0xldmVsKTogdm9pZCB7XG4gICAgaWYgKExvZ0xldmVsLklORk8gPj0gdGhpcy5tb2R1bGVMb2dMZXZlbCkge1xuICAgICAgaWYgKCF0aGlzLnRpbWVyLmhhcyhuYW1lKSkge1xuICAgICAgICB0aGlzLnRpbWVyLnNldChuYW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdGltZUVuZChuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoTG9nTGV2ZWwuSU5GTyA+PSB0aGlzLm1vZHVsZUxvZ0xldmVsKSB7XG4gICAgICBjb25zdCBzdGFydFRpbWUgPSB0aGlzLnRpbWVyLmdldChuYW1lKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgVGltZSB0YWtlbiBieSBbJHtuYW1lfV0gOiAkeyhEYXRlLm5vdygpLXN0YXJ0VGltZSkvMTAwMH0gc2Vjb25kc2A7XG4gICAgICB0aGlzLnRpbWVyLmRlbGV0ZShuYW1lKTtcbiAgICAgIHRoaXMuYnVpbGRMb2dnaW5nRXZlbnQoTG9nTGV2ZWwuSU5GTywgIFttZXNzYWdlXSk7XG4gICAgfVxuICB9XG4gIGFzc2VydChleHByOiBhbnkpOiB2b2lkIHtcbiAgICAvLyB0aGlzLmJ1aWxkTG9nZ2luZ0V2ZW50KExvZ0xldmVsLlRSQUNFLHVuZGVmaW5lZCxtZXNzYWdlcyk7XG4gIH1cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sb2dnZXJOYW1lO1xuICB9XG5cblxuICBwcml2YXRlIGJ1aWxkTG9nZ2luZ0V2ZW50KGxldmVsOiBMb2dMZXZlbCwgbWVzc2FnZXM6IGFueVtdKSB7XG4gICAgY29uc3QgbG9nZ2luZ0V2ZW50ID0gbmV3IExvZ2dpbmdFdmVudCgpO1xuICAgIGxvZ2dpbmdFdmVudC5uYW1lID0gdGhpcy5uYW1lO1xuICAgIGxvZ2dpbmdFdmVudC5sZXZlbCA9IGxldmVsO1xuICAgIGxvZ2dpbmdFdmVudC50aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgIGxvZ2dpbmdFdmVudC5tZXNzYWdlID0gdGhpcy5idWlsZE1lc3NhZ2UobWVzc2FnZXMpO1xuICAgIExvZ2dpbmdDb250cm9sbGVyLmluc3RhbmNlLmVucXVldWUobG9nZ2luZ0V2ZW50KTtcbiAgfVxuICBwcml2YXRlIGJ1aWxkTWVzc2FnZShtZXNzYWdlczogYW55W10pOiBzdHJpbmcge1xuICAgIGxldCBtZXNzYWdlID0gXCJcIjtcbiAgICBtZXNzYWdlcy5mb3JFYWNoKG1zZz0+IHtcbiAgICAgIGlmKG1zZyBpbnN0YW5jZW9mICBFcnJvcikge1xuICAgICAgICBtZXNzYWdlICs9IGAke21zZy5zdGFja30sIGA7XG4gICAgICB9IGVsc2UgaWYodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBtZXNzYWdlICs9IGAke0pTT04uc3RyaW5naWZ5KG1zZyl9LCBgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSArPSBgJHttc2d9LCBgO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtZXNzYWdlLmxlbmd0aCA+IDAgPyBtZXNzYWdlLnNsaWNlKDAsbWVzc2FnZS5sZW5ndGgtMikgOiBcIlwiO1xuICB9XG59XG4iLCJpbXBvcnQgeyBMb2dnZXJTdGF0aWNJbmZvLCBMb2dPcHRpb25zLCBMb2dMZXZlbCB9IGZyb20gXCIuLi9maXQtbG9nZ2VyLWNvcmUvbG9nZ2luZy5tb2RlbHNcIjtcclxuaW1wb3J0IHsgTG9nZ2luZ0NvbnRyb2xsZXIgfSBmcm9tIFwiLi9sb2d3cml0ZXJzL2xvZ2dpbmcuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbkxvZ2dlciB9IGZyb20gXCIuLi9maXQtbG9nZ2VyLWNvcmUvaW5kZXhcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4vbG9nd3JpdGVycy9hcHAubG9nZ2VyXCI7XHJcblxyXG4vLyBpbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLy4uL2xvZ3dyaXRlcnMvYXBwLmxvZ2dlcic7XHJcbi8vIGltcG9ydCB7IExvZ0xldmVsLCBBcHBsaWNhdGlvbkxvZ2dlciB9IGZyb20gJy4uL2ZpdC1sb2dnZXItY29yZS9pbmRleCc7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRml0V29ya2VyTG9nZ2VyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlID0gbmV3IEZpdFdvcmtlckxvZ2dlclNlcnZpY2UoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBpZiAoRml0V29ya2VyTG9nZ2VyU2VydmljZS5faW5zdGFuY2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IEluc3RhbnRpYXRpb24gZmFpbGVkOiBVc2UgRml0V29ya2VyTG9nZ2VyU2VydmljZS5pbnN0YW5jZSBpbnN0ZWFkIG9mIG5ldy5cIik7XHJcbiAgICB9XHJcbiAgICBGaXRXb3JrZXJMb2dnZXJTZXJ2aWNlLl9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgfVxyXG4gIHB1YmxpYyBpbml0KGxvZ2dlclN0YXRpY0luZm86IExvZ2dlclN0YXRpY0luZm8sIG9wdGlvbnM/OiBMb2dPcHRpb25zKSB7XHJcbiAgICBMb2dnaW5nQ29udHJvbGxlci5pbnN0YW5jZS5pbml0aWFsaXplKGxvZ2dlclN0YXRpY0luZm8sb3B0aW9ucyk7XHJcbiAgfVxyXG4gIGdldExvZ2dlcihuYW1lOiBzdHJpbmcsIGxldmVsPzogTG9nTGV2ZWwpIDogQXBwbGljYXRpb25Mb2dnZXIge1xyXG4gICAgcmV0dXJuIG5ldyBMb2dnZXIobmFtZSwgbGV2ZWwpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBGaXRXb3JrZXJMb2dnZXJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBGaXRXb3JrZXJMb2dnZXJTZXJ2aWNlLl9pbnN0YW5jZTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFdvcmtlck1lc3NhZ2UsIFdvcmtlck1lc3NhZ2VUeXBlcywgV29ya2VyTWVzc2FnZUJ1aWxkZXIsQnJva2VyQ29uZmlnLCBXb3JrZXJDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnLW1vZGVscy9pbmRleFwiO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSBcInJ4anMvU3ViamVjdFwiO1xyXG5pbXBvcnQgeyBGaXRXb3JrZXJMb2dnZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZpdC1sb2dnZXIvZml0LXdvcmtlci1sb2dnZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbkxvZ2dlciB9IGZyb20gXCIuLi9maXQtbG9nZ2VyLWNvcmUvaW5kZXhcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJyb2tlciB7XHJcblxyXG4gIC8vI3JlZ2lvbiBTdGF0aWMgTWVtYmVyc1xyXG4gIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTWVzc2FnZUJyb2tlciA9IG5ldyBNZXNzYWdlQnJva2VyKCk7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBpZiAoTWVzc2FnZUJyb2tlci5faW5zdGFuY2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IEluc3RhbnRpYXRpb24gZmFpbGVkOiBVc2UgTWVzc2FnZUJyb2tlci5pbnN0YW5jZSBpbnN0ZWFkIG9mIG5ldy5cIik7XHJcbiAgICB9XHJcbiAgICBNZXNzYWdlQnJva2VyLl9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0IGluc3RhbmNlKCk6IE1lc3NhZ2VCcm9rZXIge1xyXG4gICAgcmV0dXJuIE1lc3NhZ2VCcm9rZXIuX2luc3RhbmNlO1xyXG4gIH1cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIFByaXZhdGUvUHVibGljIE1lbWJlcnNcclxuICBwcml2YXRlIGluQm94TWVzc2FnZU5vdGlmaWVyID0gbmV3IFN1YmplY3Q8V29ya2VyTWVzc2FnZT4oKTtcclxuICBwdWJsaWMgaW5Cb3gkID0gdGhpcy5pbkJveE1lc3NhZ2VOb3RpZmllci5hc09ic2VydmFibGUoKTtcclxuICBwcml2YXRlIGNvbnRleHRzID0gbmV3IE1hcDxzdHJpbmcsIEJyb2tlckNvbmZpZz4oKTtcclxuICBwcml2YXRlIGxvZ2dlciA6IGFueSA9IGNvbnNvbGU7XHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG4gIG9uTWVzc2FnZSh3b3JrZXJNZXNzYWdlOiBXb3JrZXJNZXNzYWdlLCBjb250ZXh0OiBhbnkpIHtcclxuICAgIHN3aXRjaCAod29ya2VyTWVzc2FnZS50eXBlKSB7XHJcbiAgICAgIGNhc2UgV29ya2VyTWVzc2FnZVR5cGVzLkNPTk5FQ1RfV09SS0VSOlxyXG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKCdXb3JrZXIgY29ubmVjdGlvbiByZXF1ZXN0IHJlY2VpdmVkJyk7XHJcbiAgICAgIHRoaXMucG9zdE1lc3NhZ2UoV29ya2VyTWVzc2FnZUJ1aWxkZXIuYnVpbGQoV29ya2VyTWVzc2FnZVR5cGVzLkNPTk5FQ1RfV09SS0VSX1NVQ0NFU1MpLCBjb250ZXh0KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBXb3JrZXJNZXNzYWdlVHlwZXMuU0VUX1dPUktFUl9DT05GSUc6XHJcbiAgICAgICAgdGhpcy5vblNldENvbmZpZ1JlcXVlc3RSZWNlaXZlZCh3b3JrZXJNZXNzYWdlLGNvbnRleHQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMuaW5Cb3hNZXNzYWdlTm90aWZpZXIubmV4dCh3b3JrZXJNZXNzYWdlKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcG9zdE1lc3NhZ2Uod29ya2VyTWVzc2FnZTogV29ya2VyTWVzc2FnZSwgY29udGV4dD86IGFueSwgc2VuZFRvQWxsPzogYm9vbGVhbikge1xyXG4gICAgaWYoIXNlbmRUb0FsbCkge1xyXG4gICAgICBjb250ZXh0LnBvc3RNZXNzYWdlKHdvcmtlck1lc3NhZ2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb250ZXh0cy5mb3JFYWNoKHZhbHVlPT57XHJcbiAgICAgICAgdmFsdWUuY29udGV4dC5wb3N0TWVzc2FnZSh3b3JrZXJNZXNzYWdlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vI2VuZHJlZ2lvblxyXG5cclxuICAvLyNyZWdpb24gSGVscGVyIE1ldGhvZHNcclxuICBwcml2YXRlIG9uU2V0Q29uZmlnUmVxdWVzdFJlY2VpdmVkKHdvcmtlck1lc3NhZ2U6IFdvcmtlck1lc3NhZ2UsIGNvbnRleHQ/OiBhbnkpIHtcclxuICAgIGNvbnN0IHBheWxvYWQgPSA8V29ya2VyQ29uZmlnPndvcmtlck1lc3NhZ2UucGF5bG9hZDtcclxuICAgIGlmKGNvbnRleHQgJiYgcGF5bG9hZCkge1xyXG4gICAgICBpZihwYXlsb2FkLndvcmtlckluZm8gJiYgcGF5bG9hZC53b3JrZXJJbmZvLm5hbWUgJiYgcGF5bG9hZC5sb2dnaW5nQXBwSW5mby5hcHBOYW1lKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7cGF5bG9hZC53b3JrZXJJbmZvLm5hbWV9LSR7cGF5bG9hZC5sb2dnaW5nQXBwSW5mby5hcHBOYW1lfWA7XHJcbiAgICAgICAgY29uc3QgYnJva2VyQ29uZmlnIDogQnJva2VyQ29uZmlnID0geyB3b3JrZXJDb25maWcgOiBwYXlsb2FkLCBjb250ZXh0IH07XHJcbiAgICAgICAgdGhpcy5jb250ZXh0cy5zZXQoa2V5LGJyb2tlckNvbmZpZyk7XHJcbiAgICAgICAgcGF5bG9hZC5sb2dnaW5nQXBwSW5mby5hcHBOYW1lID0gYCR7cGF5bG9hZC53b3JrZXJJbmZvLm5hbWV9LSR7cGF5bG9hZC53b3JrZXJJbmZvLnR5cGV9LSR7cGF5bG9hZC5sb2dnaW5nQXBwSW5mby5hcHBOYW1lfWA7XHJcbiAgICAgICAgRml0V29ya2VyTG9nZ2VyU2VydmljZS5pbnN0YW5jZS5pbml0KHBheWxvYWQubG9nZ2luZ0FwcEluZm8scGF5bG9hZC5sb2dPcHRpb25zKTtcclxuICAgICAgICB0aGlzLmxvZ2dlciA9IEZpdFdvcmtlckxvZ2dlclNlcnZpY2UuaW5zdGFuY2UuZ2V0TG9nZ2VyKCdNZXNzYWdlQnJva2VyJyk7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZShXb3JrZXJNZXNzYWdlQnVpbGRlci5idWlsZChXb3JrZXJNZXNzYWdlVHlwZXMuV09SS0VSX1JFQURZKSwgY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnV29ya2VyIGNvbmZpZ3VyYXRpb24gaGFzIGJlZW4gc2V0IHN1Y2Nlc3NmdWxseS4nLCBwYXlsb2FkKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucG9zdE1lc3NhZ2UoV29ya2VyTWVzc2FnZUJ1aWxkZXIuYnVpbGQoV29ya2VyTWVzc2FnZVR5cGVzLlNFVF9XT1JLRVJfQ09ORklHX0ZBSUxFRCwgJ0luQ29tcGxldGUgd29ya2VyIGNvbmZpZ3VyYXRpb24nKSwgY29udGV4dCk7XHJcbiAgfVxyXG4gIC8vI2VuZHJlZ2lvblxyXG59XHJcbiIsIi8vIGltcG9ydCB7IFdvcmtlckFnZW50IH0gZnJvbSAnLi93b3JrZXItYWdlbnQnO1xuaW1wb3J0IHsgTWVzc2FnZUJyb2tlciB9IGZyb20gJy4uL3NvY2tldC1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBXb3JrZXJNZXNzYWdlQnVpbGRlciwgV29ya2VyTWVzc2FnZVR5cGVzIH0gZnJvbSAnLi4vY29uZmlnLW1vZGVscyc7XG5cbmNvbnNvbGUuaW5mbygnRGVkaWNhdGVkIHdvcmtlciBoYXMgYmVlbiBzdGFydGVkJyk7XG5cbk1lc3NhZ2VCcm9rZXIuaW5zdGFuY2Uub25NZXNzYWdlKFdvcmtlck1lc3NhZ2VCdWlsZGVyLmJ1aWxkKFdvcmtlck1lc3NhZ2VUeXBlcy5DT05ORUNUX1dPUktFUiksc2VsZik7XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICBNZXNzYWdlQnJva2VyLmluc3RhbmNlLm9uTWVzc2FnZShldnQuZGF0YSxzZWxmKTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2VlcnJvcicsIChldnQ6IEVycm9yRXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGV2dCk7XG59KTtcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJlcnJvck9iamVjdF8xIiwiX19leHRlbmRzIiwidGhpcyIsImlzQXJyYXlfMSIsInJvb3RfMSIsIk9ic2VydmVyXzEiLCJyeFN1YnNjcmliZXJfMSIsIm9ic2VydmFibGUiLCJvYnNlcnZhYmxlXzEiLCJhc3luY18xIiwiaW50ZXJ2YWxfMSIsImZpbHRlciIsImZpbHRlcl8xIiwiT2JzZXJ2YWJsZSIsIlN1YmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFPLElBQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM1QyxjQUFjLEVBQUcsZ0JBQWdCO0lBQ2pDLHNCQUFzQixFQUFHLHdCQUF3QjtJQUNqRCxxQkFBcUIsRUFBRyx1QkFBdUI7SUFFL0MsaUJBQWlCLEVBQUcsbUJBQW1CO0lBQ3ZDLHdCQUF3QixFQUFHLDBCQUEwQjtJQUNyRCxZQUFZLEVBQUcsY0FBYztJQUU3QixjQUFjLEVBQUcsZ0JBQWdCO0lBQ2pDLHNCQUFzQixFQUFHLHdCQUF3QjtJQUNqRCxxQkFBcUIsRUFBRyx1QkFBdUI7SUFFL0MsY0FBYyxFQUFHLGdCQUFnQjtJQUNqQyxxQkFBcUIsRUFBRyx1QkFBdUI7Q0FDbEQsQ0FBQzs7QUNaRjtBQUNBLEFBQU8sSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxTQUFTLEVBQUcsV0FBVztJQUN2QixNQUFNLEVBQUcsUUFBUTtJQUNqQixLQUFLLEVBQUcsT0FBTztDQUNoQixDQUFDOztBQ1BLO0lBRUgsdUJBQW1C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
