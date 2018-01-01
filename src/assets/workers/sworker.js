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

var WorkerMessageBuilder = (function () {
    function WorkerMessageBuilder() {
    }
    WorkerMessageBuilder.build = function (type, payload) {
        return {
            type: type,
            ts: Date.now(),
            payload: payload
        };
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
            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
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

var connnections = 0;
console.info('Shared worker has been started');
self.addEventListener("connect", function (evt) {
    var port = evt.ports[0];
    MessageBroker.instance.onMessage(WorkerMessageBuilder.build(WorkerMessageTypes.CONNECT_WORKER), port);
    connnections++;
    port.addEventListener("message", function (e) {
        MessageBroker.instance.onMessage(e.data, port);
    }, false);
    port.start();
    console.log("Connections Count : " + connnections);
}, false);

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dvcmtlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vYXBwL2NvbmZpZy1tb2RlbHMvd29ya2VyLW1lc3NhZ2UtdHlwZXMudHMiLCIuLi8uLi9hcHAvY29uZmlnLW1vZGVscy93b3JrZXItaW5mby50cyIsIi4uLy4uL2FwcC9jb25maWctbW9kZWxzL3dvcmtlci1tZXNzYWdlLnRzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9yb290LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0Z1bmN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc0FycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9pc09iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvZXJyb3JPYmplY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL3RyeUNhdGNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvU3Vic2NyaXB0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvT2JzZXJ2ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9zeW1ib2wvcnhTdWJzY3JpYmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvU3Vic2NyaWJlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvdG9TdWJzY3JpYmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvc3ltYm9sL29ic2VydmFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL25vb3AuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy91dGlsL3BpcGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9PYnNlcnZhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL1N1YmplY3RTdWJzY3JpcHRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9TdWJqZWN0LmpzIiwiLi4vLi4vYXBwL2ZpdC1sb2dnZXIvYXBwZW5kZXJzL3NlcnZlci5hcHBlbmRlci50cyIsIi4uLy4uL2FwcC9maXQtbG9nZ2VyLWNvcmUvbG9nZ2luZy5tb2RlbHMudHMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9hcHBlbmRlcnMvY29uc29sZS5hcHBlbmRlci50cyIsIi4uLy4uL2FwcC9maXQtbG9nZ2VyL2FwcGVuZGVycy93b3JrZXIuYXBwZW5kZXIudHMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9hcHBlbmRlcnMvYXBwZW5kZXIucmVwb3NpdG9yeS50cyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3V0aWwvaXNOdW1lcmljLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvc2NoZWR1bGVyL0FjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3NjaGVkdWxlci9Bc3luY0FjdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL1NjaGVkdWxlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3NjaGVkdWxlci9Bc3luY1NjaGVkdWxlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL3NjaGVkdWxlci9hc3luYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL29ic2VydmFibGUvSW50ZXJ2YWxPYnNlcnZhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvb2JzZXJ2YWJsZS9pbnRlcnZhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL2FkZC9vYnNlcnZhYmxlL2ludGVydmFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvb3BlcmF0b3JzL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL29wZXJhdG9yL2ZpbHRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL2FkZC9vcGVyYXRvci9maWx0ZXIuanMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9sb2d3cml0ZXJzL2xvZy53cml0ZXIudHMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9sb2d3cml0ZXJzL2xvZ2dpbmcuY29udHJvbGxlci50cyIsIi4uLy4uL2FwcC9maXQtbG9nZ2VyL21vZGVscy9sb2ctZXZlbnQudHMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9sb2d3cml0ZXJzL2FwcC5sb2dnZXIudHMiLCIuLi8uLi9hcHAvZml0LWxvZ2dlci9maXQtd29ya2VyLWxvZ2dlci5zZXJ2aWNlLnRzIiwiLi4vLi4vYXBwL3NvY2tldC1zZXJ2aWNlcy9tZXNzYWdlLWJyb2tlci50cyIsIi4uLy4uL2FwcC93b3JrZXItc2VydmljZXMvc2hhcmVkLXdvcmtlci1nYXRld2F5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBXb3JrZXJNZXNzYWdlVHlwZXMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBDT05ORUNUX1dPUktFUiA6ICdDT05ORUNUX1dPUktFUicsXG4gICAgQ09OTkVDVF9XT1JLRVJfU1VDQ0VTUyA6ICdDT05ORUNUX1dPUktFUl9TVUNDRVNTJyxcbiAgICBDT05ORUNUX1dPUktFUl9GQUlMRUQgOiAnQ09OTkVDVF9XT1JLRVJfRkFJTEVEJyxcblxuICAgIFNFVF9XT1JLRVJfQ09ORklHIDogJ1NFVF9XT1JLRVJfQ09ORklHJyxcbiAgICBTRVRfV09SS0VSX0NPTkZJR19GQUlMRUQgOiAnU0VUX1dPUktFUl9DT05GSUdfRkFJTEVEJyxcbiAgICBXT1JLRVJfUkVBRFkgOiAnV09SS0VSX1JFQURZJyxcblxuICAgIENPTk5FQ1RfU09DS0VUIDogJ0NPTk5FQ1RfU09DS0VUJyxcbiAgICBDT05ORUNUX1NPQ0tFVF9TVUNDRVNTIDogJ0NPTk5FQ1RfU09DS0VUX1NVQ0NFU1MnLFxuICAgIENPTk5FQ1RfU09DS0VUX0ZBSUxFRCA6ICdDT05ORUNUX1NPQ0tFVF9GQUlMRUQnLFxuXG4gICAgU1VCU0NSSUJFX0RBVEEgOiAnU1VCU0NSSUJFX0RBVEEnLFxuICAgIFNVQlNDUklCRV9EQVRBX0ZBSUxFRCA6ICdTVUJTQ1JJQkVfREFUQV9GQUlMRUQnXG59KTtcblxuXG4iLCJpbXBvcnQgeyBMb2dnZXJTdGF0aWNJbmZvLCBMb2dPcHRpb25zIH0gZnJvbSBcIi4uL2ZpdC1sb2dnZXItY29yZS9pbmRleFwiO1xuXG5cbi8vIGV4cG9ydCB0eXBlIFdvcmtlclR5cGUgPSAnREVESUNBVEVEJyB8ICdTSEFSRUQnIHwgJ0xPQ0FMJztcbmV4cG9ydCBjb25zdCBXb3JrZXJUeXBlcyA9IE9iamVjdC5mcmVlemUoe1xuICBERURJQ0FURUQgOiAnREVESUNBVEVEJyxcbiAgU0hBUkVEIDogJ1NIQVJFRCcsXG4gIExPQ0FMIDogJ0xPQ0FMJ1xufSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV29ya2VySW5mbyB7XG4gICAgbmFtZSA6IHN0cmluZztcbiAgICBmaWxlOiBzdHJpbmc7XG4gICAgaXNBY3RpdmU6IGJvb2xlYW47XG4gICAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtlckNvbmZpZyB7XG4gIHdvcmtlckluZm86IFdvcmtlckluZm87XG4gIGxvZ2dpbmdBcHBJbmZvIDogTG9nZ2VyU3RhdGljSW5mbztcbiAgbG9nT3B0aW9ucyA6IExvZ09wdGlvbnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnJva2VyQ29uZmlnIHtcbiAgICB3b3JrZXJDb25maWcgOiBXb3JrZXJDb25maWc7XG4gICAgY29udGV4dCA6IGFueTtcbn1cblxuIiwiXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtlck1lc3NhZ2Uge1xuICAgIHR5cGUgOiBzdHJpbmc7XG4gICAgLy8gc2VuZGVyPzogc3RyaW5nO1xuICAgIHRzIDogbnVtYmVyO1xuICAgIHBheWxvYWQ/OiBhbnlcbn1cblxuZXhwb3J0IGNsYXNzIFdvcmtlck1lc3NhZ2VCdWlsZGVyIHtcbiAgICBzdGF0aWMgYnVpbGQodHlwZTogc3RyaW5nLHBheWxvYWQ/OiBhbnkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHRzIDogRGF0ZS5ub3coKSxcbiAgICAgICAgcGF5bG9hZFxuICAgICAgfTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvbW1vbkpTIC8gTm9kZSBoYXZlIGdsb2JhbCBjb250ZXh0IGV4cG9zZWQgYXMgXCJnbG9iYWxcIiB2YXJpYWJsZS5cbi8vIFdlIGRvbid0IHdhbnQgdG8gaW5jbHVkZSB0aGUgd2hvbGUgbm9kZS5kLnRzIHRoaXMgdGhpcyBjb21waWxhdGlvbiB1bml0IHNvIHdlJ2xsIGp1c3QgZmFrZVxuLy8gdGhlIGdsb2JhbCBcImdsb2JhbFwiIHZhciBmb3Igbm93LlxudmFyIF9fd2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93O1xudmFyIF9fc2VsZiA9IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlICYmIHNlbGY7XG52YXIgX19nbG9iYWwgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWw7XG52YXIgX3Jvb3QgPSBfX3dpbmRvdyB8fCBfX2dsb2JhbCB8fCBfX3NlbGY7XG5leHBvcnRzLnJvb3QgPSBfcm9vdDtcbi8vIFdvcmthcm91bmQgQ2xvc3VyZSBDb21waWxlciByZXN0cmljdGlvbjogVGhlIGJvZHkgb2YgYSBnb29nLm1vZHVsZSBjYW5ub3QgdXNlIHRocm93LlxuLy8gVGhpcyBpcyBuZWVkZWQgd2hlbiB1c2VkIHdpdGggYW5ndWxhci90c2lja2xlIHdoaWNoIGluc2VydHMgYSBnb29nLm1vZHVsZSBzdGF0ZW1lbnQuXG4vLyBXcmFwIGluIElJRkVcbihmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFfcm9vdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1J4SlMgY291bGQgbm90IGZpbmQgYW55IGdsb2JhbCBjb250ZXh0ICh3aW5kb3csIHNlbGYsIGdsb2JhbCknKTtcbiAgICB9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm9vdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0Z1bmN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJzsgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FycmF5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiB4ICE9IG51bGwgJiYgdHlwZW9mIHggPT09ICdvYmplY3QnO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNPYmplY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyB0eXBlb2YgYW55IHNvIHRoYXQgaXQgd2UgZG9uJ3QgaGF2ZSB0byBjYXN0IHdoZW4gY29tcGFyaW5nIGEgcmVzdWx0IHRvIHRoZSBlcnJvciBvYmplY3RcbmV4cG9ydHMuZXJyb3JPYmplY3QgPSB7IGU6IHt9IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvck9iamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBlcnJvck9iamVjdF8xID0gcmVxdWlyZSgnLi9lcnJvck9iamVjdCcpO1xudmFyIHRyeUNhdGNoVGFyZ2V0O1xuZnVuY3Rpb24gdHJ5Q2F0Y2hlcigpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gdHJ5Q2F0Y2hUYXJnZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lID0gZTtcbiAgICAgICAgcmV0dXJuIGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3Q7XG4gICAgfVxufVxuZnVuY3Rpb24gdHJ5Q2F0Y2goZm4pIHtcbiAgICB0cnlDYXRjaFRhcmdldCA9IGZuO1xuICAgIHJldHVybiB0cnlDYXRjaGVyO1xufVxuZXhwb3J0cy50cnlDYXRjaCA9IHRyeUNhdGNoO1xuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJ5Q2F0Y2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gb25lIG9yIG1vcmUgZXJyb3JzIGhhdmUgb2NjdXJyZWQgZHVyaW5nIHRoZVxuICogYHVuc3Vic2NyaWJlYCBvZiBhIHtAbGluayBTdWJzY3JpcHRpb259LlxuICovXG52YXIgVW5zdWJzY3JpcHRpb25FcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVuc3Vic2NyaXB0aW9uRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICB2YXIgZXJyID0gRXJyb3IuY2FsbCh0aGlzLCBlcnJvcnMgP1xuICAgICAgICAgICAgZXJyb3JzLmxlbmd0aCArIFwiIGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XFxuICBcIiArIGVycm9ycy5tYXAoZnVuY3Rpb24gKGVyciwgaSkgeyByZXR1cm4gKChpICsgMSkgKyBcIikgXCIgKyBlcnIudG9TdHJpbmcoKSk7IH0pLmpvaW4oJ1xcbiAgJykgOiAnJyk7XG4gICAgICAgIHRoaXMubmFtZSA9IGVyci5uYW1lID0gJ1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuICAgICAgICB0aGlzLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIFVuc3Vic2NyaXB0aW9uRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLlVuc3Vic2NyaXB0aW9uRXJyb3IgPSBVbnN1YnNjcmlwdGlvbkVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5zdWJzY3JpcHRpb25FcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBpc0FycmF5XzEgPSByZXF1aXJlKCcuL3V0aWwvaXNBcnJheScpO1xudmFyIGlzT2JqZWN0XzEgPSByZXF1aXJlKCcuL3V0aWwvaXNPYmplY3QnKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKCcuL3V0aWwvaXNGdW5jdGlvbicpO1xudmFyIHRyeUNhdGNoXzEgPSByZXF1aXJlKCcuL3V0aWwvdHJ5Q2F0Y2gnKTtcbnZhciBlcnJvck9iamVjdF8xID0gcmVxdWlyZSgnLi91dGlsL2Vycm9yT2JqZWN0Jyk7XG52YXIgVW5zdWJzY3JpcHRpb25FcnJvcl8xID0gcmVxdWlyZSgnLi91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3InKTtcbi8qKlxuICogUmVwcmVzZW50cyBhIGRpc3Bvc2FibGUgcmVzb3VyY2UsIHN1Y2ggYXMgdGhlIGV4ZWN1dGlvbiBvZiBhbiBPYnNlcnZhYmxlLiBBXG4gKiBTdWJzY3JpcHRpb24gaGFzIG9uZSBpbXBvcnRhbnQgbWV0aG9kLCBgdW5zdWJzY3JpYmVgLCB0aGF0IHRha2VzIG5vIGFyZ3VtZW50XG4gKiBhbmQganVzdCBkaXNwb3NlcyB0aGUgcmVzb3VyY2UgaGVsZCBieSB0aGUgc3Vic2NyaXB0aW9uLlxuICpcbiAqIEFkZGl0aW9uYWxseSwgc3Vic2NyaXB0aW9ucyBtYXkgYmUgZ3JvdXBlZCB0b2dldGhlciB0aHJvdWdoIHRoZSBgYWRkKClgXG4gKiBtZXRob2QsIHdoaWNoIHdpbGwgYXR0YWNoIGEgY2hpbGQgU3Vic2NyaXB0aW9uIHRvIHRoZSBjdXJyZW50IFN1YnNjcmlwdGlvbi5cbiAqIFdoZW4gYSBTdWJzY3JpcHRpb24gaXMgdW5zdWJzY3JpYmVkLCBhbGwgaXRzIGNoaWxkcmVuIChhbmQgaXRzIGdyYW5kY2hpbGRyZW4pXG4gKiB3aWxsIGJlIHVuc3Vic2NyaWJlZCBhcyB3ZWxsLlxuICpcbiAqIEBjbGFzcyBTdWJzY3JpcHRpb25cbiAqL1xudmFyIFN1YnNjcmlwdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigpOiB2b2lkfSBbdW5zdWJzY3JpYmVdIEEgZnVuY3Rpb24gZGVzY3JpYmluZyBob3cgdG9cbiAgICAgKiBwZXJmb3JtIHRoZSBkaXNwb3NhbCBvZiByZXNvdXJjZXMgd2hlbiB0aGUgYHVuc3Vic2NyaWJlYCBtZXRob2QgaXMgY2FsbGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbih1bnN1YnNjcmliZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgdGhpcyBTdWJzY3JpcHRpb24gaGFzIGFscmVhZHkgYmVlbiB1bnN1YnNjcmliZWQuXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBudWxsO1xuICAgICAgICBpZiAodW5zdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZXMgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBzdWJzY3JpcHRpb24uIE1heSwgZm9yIGluc3RhbmNlLCBjYW5jZWxcbiAgICAgKiBhbiBvbmdvaW5nIE9ic2VydmFibGUgZXhlY3V0aW9uIG9yIGNhbmNlbCBhbnkgb3RoZXIgdHlwZSBvZiB3b3JrIHRoYXRcbiAgICAgKiBzdGFydGVkIHdoZW4gdGhlIFN1YnNjcmlwdGlvbiB3YXMgY3JlYXRlZC5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBoYXNFcnJvcnMgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9ycztcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gdGhpcywgX3BhcmVudCA9IF9hLl9wYXJlbnQsIF9wYXJlbnRzID0gX2EuX3BhcmVudHMsIF91bnN1YnNjcmliZSA9IF9hLl91bnN1YnNjcmliZSwgX3N1YnNjcmlwdGlvbnMgPSBfYS5fc3Vic2NyaXB0aW9ucztcbiAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRzID0gbnVsbDtcbiAgICAgICAgLy8gbnVsbCBvdXQgX3N1YnNjcmlwdGlvbnMgZmlyc3Qgc28gYW55IGNoaWxkIHN1YnNjcmlwdGlvbnMgdGhhdCBhdHRlbXB0XG4gICAgICAgIC8vIHRvIHJlbW92ZSB0aGVtc2VsdmVzIGZyb20gdGhpcyBzdWJzY3JpcHRpb24gd2lsbCBub29wXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBudWxsO1xuICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgdmFyIGxlbiA9IF9wYXJlbnRzID8gX3BhcmVudHMubGVuZ3RoIDogMDtcbiAgICAgICAgLy8gaWYgdGhpcy5fcGFyZW50IGlzIG51bGwsIHRoZW4gc28gaXMgdGhpcy5fcGFyZW50cywgYW5kIHdlXG4gICAgICAgIC8vIGRvbid0IGhhdmUgdG8gcmVtb3ZlIG91cnNlbHZlcyBmcm9tIGFueSBwYXJlbnQgc3Vic2NyaXB0aW9ucy5cbiAgICAgICAgd2hpbGUgKF9wYXJlbnQpIHtcbiAgICAgICAgICAgIF9wYXJlbnQucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgLy8gaWYgdGhpcy5fcGFyZW50cyBpcyBudWxsIG9yIGluZGV4ID49IGxlbixcbiAgICAgICAgICAgIC8vIHRoZW4gX3BhcmVudCBpcyBzZXQgdG8gbnVsbCwgYW5kIHRoZSBsb29wIGV4aXRzXG4gICAgICAgICAgICBfcGFyZW50ID0gKytpbmRleCA8IGxlbiAmJiBfcGFyZW50c1tpbmRleF0gfHwgbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oX3Vuc3Vic2NyaWJlKSkge1xuICAgICAgICAgICAgdmFyIHRyaWFsID0gdHJ5Q2F0Y2hfMS50cnlDYXRjaChfdW5zdWJzY3JpYmUpLmNhbGwodGhpcyk7XG4gICAgICAgICAgICBpZiAodHJpYWwgPT09IGVycm9yT2JqZWN0XzEuZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycyB8fCAoZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IgP1xuICAgICAgICAgICAgICAgICAgICBmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lLmVycm9ycykgOiBbZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdC5lXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXlfMS5pc0FycmF5KF9zdWJzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIGxlbiA9IF9zdWJzY3JpcHRpb25zLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1YiA9IF9zdWJzY3JpcHRpb25zW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3RfMS5pc09iamVjdChzdWIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmlhbCA9IHRyeUNhdGNoXzEudHJ5Q2F0Y2goc3ViLnVuc3Vic2NyaWJlKS5jYWxsKHN1Yik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmlhbCA9PT0gZXJyb3JPYmplY3RfMS5lcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSBlcnJvck9iamVjdF8xLmVycm9yT2JqZWN0LmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlcnIuZXJyb3JzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNFcnJvcnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIGEgdGVhciBkb3duIHRvIGJlIGNhbGxlZCBkdXJpbmcgdGhlIHVuc3Vic2NyaWJlKCkgb2YgdGhpc1xuICAgICAqIFN1YnNjcmlwdGlvbi5cbiAgICAgKlxuICAgICAqIElmIHRoZSB0ZWFyIGRvd24gYmVpbmcgYWRkZWQgaXMgYSBzdWJzY3JpcHRpb24gdGhhdCBpcyBhbHJlYWR5XG4gICAgICogdW5zdWJzY3JpYmVkLCBpcyB0aGUgc2FtZSByZWZlcmVuY2UgYGFkZGAgaXMgYmVpbmcgY2FsbGVkIG9uLCBvciBpc1xuICAgICAqIGBTdWJzY3JpcHRpb24uRU1QVFlgLCBpdCB3aWxsIG5vdCBiZSBhZGRlZC5cbiAgICAgKlxuICAgICAqIElmIHRoaXMgc3Vic2NyaXB0aW9uIGlzIGFscmVhZHkgaW4gYW4gYGNsb3NlZGAgc3RhdGUsIHRoZSBwYXNzZWRcbiAgICAgKiB0ZWFyIGRvd24gbG9naWMgd2lsbCBiZSBleGVjdXRlZCBpbW1lZGlhdGVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VGVhcmRvd25Mb2dpY30gdGVhcmRvd24gVGhlIGFkZGl0aW9uYWwgbG9naWMgdG8gZXhlY3V0ZSBvblxuICAgICAqIHRlYXJkb3duLlxuICAgICAqIEByZXR1cm4ge1N1YnNjcmlwdGlvbn0gUmV0dXJucyB0aGUgU3Vic2NyaXB0aW9uIHVzZWQgb3IgY3JlYXRlZCB0byBiZVxuICAgICAqIGFkZGVkIHRvIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zIGxpc3QuIFRoaXMgU3Vic2NyaXB0aW9uIGNhbiBiZSB1c2VkIHdpdGhcbiAgICAgKiBgcmVtb3ZlKClgIHRvIHJlbW92ZSB0aGUgcGFzc2VkIHRlYXJkb3duIGxvZ2ljIGZyb20gdGhlIGlubmVyIHN1YnNjcmlwdGlvbnNcbiAgICAgKiBsaXN0LlxuICAgICAqL1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRlYXJkb3duKSB7XG4gICAgICAgIGlmICghdGVhcmRvd24gfHwgKHRlYXJkb3duID09PSBTdWJzY3JpcHRpb24uRU1QVFkpKSB7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZWFyZG93biA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRlYXJkb3duO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0ZWFyZG93bikge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24odGVhcmRvd24pO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uLmNsb3NlZCB8fCB0eXBlb2Ygc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc3Vic2NyaXB0aW9uLl9hZGRQYXJlbnQgIT09ICdmdW5jdGlvbicgLyogcXVhY2sgcXVhY2sgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uX3N1YnNjcmlwdGlvbnMgPSBbdG1wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHRlYXJkb3duICcgKyB0ZWFyZG93biArICcgYWRkZWQgdG8gU3Vic2NyaXB0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucyB8fCAodGhpcy5fc3Vic2NyaXB0aW9ucyA9IFtdKTtcbiAgICAgICAgc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIHN1YnNjcmlwdGlvbi5fYWRkUGFyZW50KHRoaXMpO1xuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIFN1YnNjcmlwdGlvbiBmcm9tIHRoZSBpbnRlcm5hbCBsaXN0IG9mIHN1YnNjcmlwdGlvbnMgdGhhdCB3aWxsXG4gICAgICogdW5zdWJzY3JpYmUgZHVyaW5nIHRoZSB1bnN1YnNjcmliZSBwcm9jZXNzIG9mIHRoaXMgU3Vic2NyaXB0aW9uLlxuICAgICAqIEBwYXJhbSB7U3Vic2NyaXB0aW9ufSBzdWJzY3JpcHRpb24gVGhlIHN1YnNjcmlwdGlvbiB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zO1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9ucykge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbkluZGV4ID0gc3Vic2NyaXB0aW9ucy5pbmRleE9mKHN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9ucy5zcGxpY2Uoc3Vic2NyaXB0aW9uSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9hZGRQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9wYXJlbnQgPSBfYS5fcGFyZW50LCBfcGFyZW50cyA9IF9hLl9wYXJlbnRzO1xuICAgICAgICBpZiAoIV9wYXJlbnQgfHwgX3BhcmVudCA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGEgcGFyZW50LCBvciB0aGUgbmV3IHBhcmVudCBpcyB0aGUgc2FtZSBhcyB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgcGFyZW50LCB0aGVuIHNldCB0aGlzLl9wYXJlbnQgdG8gdGhlIG5ldyBwYXJlbnQuXG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIV9wYXJlbnRzKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGFscmVhZHkgb25lIHBhcmVudCwgYnV0IG5vdCBtdWx0aXBsZSwgYWxsb2NhdGUgYW4gQXJyYXkgdG9cbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSByZXN0IG9mIHRoZSBwYXJlbnQgU3Vic2NyaXB0aW9ucy5cbiAgICAgICAgICAgIHRoaXMuX3BhcmVudHMgPSBbcGFyZW50XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfcGFyZW50cy5pbmRleE9mKHBhcmVudCkgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBPbmx5IGFkZCB0aGUgbmV3IHBhcmVudCB0byB0aGUgX3BhcmVudHMgbGlzdCBpZiBpdCdzIG5vdCBhbHJlYWR5IHRoZXJlLlxuICAgICAgICAgICAgX3BhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24uRU1QVFkgPSAoZnVuY3Rpb24gKGVtcHR5KSB7XG4gICAgICAgIGVtcHR5LmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBlbXB0eTtcbiAgICB9KG5ldyBTdWJzY3JpcHRpb24oKSkpO1xuICAgIHJldHVybiBTdWJzY3JpcHRpb247XG59KCkpO1xuZXhwb3J0cy5TdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb247XG5mdW5jdGlvbiBmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZXJyb3JzKSB7XG4gICAgcmV0dXJuIGVycm9ycy5yZWR1Y2UoZnVuY3Rpb24gKGVycnMsIGVycikgeyByZXR1cm4gZXJycy5jb25jYXQoKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yKSA/IGVyci5lcnJvcnMgOiBlcnIpOyB9LCBbXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLmVtcHR5ID0ge1xuICAgIGNsb3NlZDogdHJ1ZSxcbiAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHsgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycikgeyB0aHJvdyBlcnI7IH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHsgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9ic2VydmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHJvb3RfMSA9IHJlcXVpcmUoJy4uL3V0aWwvcm9vdCcpO1xudmFyIFN5bWJvbCA9IHJvb3RfMS5yb290LlN5bWJvbDtcbmV4cG9ydHMucnhTdWJzY3JpYmVyID0gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5mb3IgPT09ICdmdW5jdGlvbicpID9cbiAgICBTeW1ib2wuZm9yKCdyeFN1YnNjcmliZXInKSA6ICdAQHJ4U3Vic2NyaWJlcic7XG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSByeFN1YnNjcmliZXIgaW5zdGVhZFxuICovXG5leHBvcnRzLiQkcnhTdWJzY3JpYmVyID0gZXhwb3J0cy5yeFN1YnNjcmliZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yeFN1YnNjcmliZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKCcuL3V0aWwvaXNGdW5jdGlvbicpO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZSgnLi9TdWJzY3JpcHRpb24nKTtcbnZhciBPYnNlcnZlcl8xID0gcmVxdWlyZSgnLi9PYnNlcnZlcicpO1xudmFyIHJ4U3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi9zeW1ib2wvcnhTdWJzY3JpYmVyJyk7XG4vKipcbiAqIEltcGxlbWVudHMgdGhlIHtAbGluayBPYnNlcnZlcn0gaW50ZXJmYWNlIGFuZCBleHRlbmRzIHRoZVxuICoge0BsaW5rIFN1YnNjcmlwdGlvbn0gY2xhc3MuIFdoaWxlIHRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGlzIHRoZSBwdWJsaWMgQVBJIGZvclxuICogY29uc3VtaW5nIHRoZSB2YWx1ZXMgb2YgYW4ge0BsaW5rIE9ic2VydmFibGV9LCBhbGwgT2JzZXJ2ZXJzIGdldCBjb252ZXJ0ZWQgdG9cbiAqIGEgU3Vic2NyaWJlciwgaW4gb3JkZXIgdG8gcHJvdmlkZSBTdWJzY3JpcHRpb24tbGlrZSBjYXBhYmlsaXRpZXMgc3VjaCBhc1xuICogYHVuc3Vic2NyaWJlYC4gU3Vic2NyaWJlciBpcyBhIGNvbW1vbiB0eXBlIGluIFJ4SlMsIGFuZCBjcnVjaWFsIGZvclxuICogaW1wbGVtZW50aW5nIG9wZXJhdG9ycywgYnV0IGl0IGlzIHJhcmVseSB1c2VkIGFzIGEgcHVibGljIEFQSS5cbiAqXG4gKiBAY2xhc3MgU3Vic2NyaWJlcjxUPlxuICovXG52YXIgU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYnNlcnZlcnxmdW5jdGlvbih2YWx1ZTogVCk6IHZvaWR9IFtkZXN0aW5hdGlvbk9yTmV4dF0gQSBwYXJ0aWFsbHlcbiAgICAgKiBkZWZpbmVkIE9ic2VydmVyIG9yIGEgYG5leHRgIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oZTogP2FueSk6IHZvaWR9IFtlcnJvcl0gVGhlIGBlcnJvcmAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFtjb21wbGV0ZV0gVGhlIGBjb21wbGV0ZWAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTdWJzY3JpYmVyKGRlc3RpbmF0aW9uT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gT2JzZXJ2ZXJfMS5lbXB0eTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBpZiAoIWRlc3RpbmF0aW9uT3JOZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBPYnNlcnZlcl8xLmVtcHR5O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkZXN0aW5hdGlvbk9yTmV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc3RpbmF0aW9uT3JOZXh0IGluc3RhbmNlb2YgU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uT3JOZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5hZGQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFNhZmVTdWJzY3JpYmVyKHRoaXMsIGRlc3RpbmF0aW9uT3JOZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFNhZmVTdWJzY3JpYmVyKHRoaXMsIGRlc3RpbmF0aW9uT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFN1YnNjcmliZXIucHJvdG90eXBlW3J4U3Vic2NyaWJlcl8xLnJ4U3Vic2NyaWJlcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuICAgIC8qKlxuICAgICAqIEEgc3RhdGljIGZhY3RvcnkgZm9yIGEgU3Vic2NyaWJlciwgZ2l2ZW4gYSAocG90ZW50aWFsbHkgcGFydGlhbCkgZGVmaW5pdGlvblxuICAgICAqIG9mIGFuIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oeDogP1QpOiB2b2lkfSBbbmV4dF0gVGhlIGBuZXh0YCBjYWxsYmFjayBvZiBhbiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKGU6ID9hbnkpOiB2b2lkfSBbZXJyb3JdIFRoZSBgZXJyb3JgIGNhbGxiYWNrIG9mIGFuXG4gICAgICogT2JzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigpOiB2b2lkfSBbY29tcGxldGVdIFRoZSBgY29tcGxldGVgIGNhbGxiYWNrIG9mIGFuXG4gICAgICogT2JzZXJ2ZXIuXG4gICAgICogQHJldHVybiB7U3Vic2NyaWJlcjxUPn0gQSBTdWJzY3JpYmVyIHdyYXBwaW5nIHRoZSAocGFydGlhbGx5IGRlZmluZWQpXG4gICAgICogT2JzZXJ2ZXIgcmVwcmVzZW50ZWQgYnkgdGhlIGdpdmVuIGFyZ3VtZW50cy5cbiAgICAgKi9cbiAgICBTdWJzY3JpYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uIChuZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIHN1YnNjcmliZXIgPSBuZXcgU3Vic2NyaWJlcihuZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBzdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGNhbGxiYWNrIHRvIHJlY2VpdmUgbm90aWZpY2F0aW9ucyBvZiB0eXBlIGBuZXh0YCBmcm9tXG4gICAgICogdGhlIE9ic2VydmFibGUsIHdpdGggYSB2YWx1ZS4gVGhlIE9ic2VydmFibGUgbWF5IGNhbGwgdGhpcyBtZXRob2QgMCBvciBtb3JlXG4gICAgICogdGltZXMuXG4gICAgICogQHBhcmFtIHtUfSBbdmFsdWVdIFRoZSBgbmV4dGAgdmFsdWUuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX25leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIE9ic2VydmVyfSBjYWxsYmFjayB0byByZWNlaXZlIG5vdGlmaWNhdGlvbnMgb2YgdHlwZSBgZXJyb3JgIGZyb21cbiAgICAgKiB0aGUgT2JzZXJ2YWJsZSwgd2l0aCBhbiBhdHRhY2hlZCB7QGxpbmsgRXJyb3J9LiBOb3RpZmllcyB0aGUgT2JzZXJ2ZXIgdGhhdFxuICAgICAqIHRoZSBPYnNlcnZhYmxlIGhhcyBleHBlcmllbmNlZCBhbiBlcnJvciBjb25kaXRpb24uXG4gICAgICogQHBhcmFtIHthbnl9IFtlcnJdIFRoZSBgZXJyb3JgIGV4Y2VwdGlvbi5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIE9ic2VydmVyfSBjYWxsYmFjayB0byByZWNlaXZlIGEgdmFsdWVsZXNzIG5vdGlmaWNhdGlvbiBvZiB0eXBlXG4gICAgICogYGNvbXBsZXRlYCBmcm9tIHRoZSBPYnNlcnZhYmxlLiBOb3RpZmllcyB0aGUgT2JzZXJ2ZXIgdGhhdCB0aGUgT2JzZXJ2YWJsZVxuICAgICAqIGhhcyBmaW5pc2hlZCBzZW5kaW5nIHB1c2gtYmFzZWQgbm90aWZpY2F0aW9ucy5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlLmNhbGwodGhpcyk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fdW5zdWJzY3JpYmVBbmRSZWN5Y2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBfcGFyZW50ID0gX2EuX3BhcmVudCwgX3BhcmVudHMgPSBfYS5fcGFyZW50cztcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gX3BhcmVudDtcbiAgICAgICAgdGhpcy5fcGFyZW50cyA9IF9wYXJlbnRzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBTdWJzY3JpYmVyO1xufShTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24pKTtcbmV4cG9ydHMuU3Vic2NyaWJlciA9IFN1YnNjcmliZXI7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xudmFyIFNhZmVTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2FmZVN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2FmZVN1YnNjcmliZXIoX3BhcmVudFN1YnNjcmliZXIsIG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuX3BhcmVudFN1YnNjcmliZXIgPSBfcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKG9ic2VydmVyT3JOZXh0KSkge1xuICAgICAgICAgICAgbmV4dCA9IG9ic2VydmVyT3JOZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9ic2VydmVyT3JOZXh0KSB7XG4gICAgICAgICAgICBuZXh0ID0gb2JzZXJ2ZXJPck5leHQubmV4dDtcbiAgICAgICAgICAgIGVycm9yID0gb2JzZXJ2ZXJPck5leHQuZXJyb3I7XG4gICAgICAgICAgICBjb21wbGV0ZSA9IG9ic2VydmVyT3JOZXh0LmNvbXBsZXRlO1xuICAgICAgICAgICAgaWYgKG9ic2VydmVyT3JOZXh0ICE9PSBPYnNlcnZlcl8xLmVtcHR5KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IE9iamVjdC5jcmVhdGUob2JzZXJ2ZXJPck5leHQpO1xuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihjb250ZXh0LnVuc3Vic2NyaWJlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZChjb250ZXh0LnVuc3Vic2NyaWJlLmJpbmQoY29udGV4dCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250ZXh0LnVuc3Vic2NyaWJlID0gdGhpcy51bnN1YnNjcmliZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLl9uZXh0ID0gbmV4dDtcbiAgICAgICAgdGhpcy5fZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5fY29tcGxldGUgPSBjb21wbGV0ZTtcbiAgICB9XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCAmJiB0aGlzLl9uZXh0KSB7XG4gICAgICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICAgICAgaWYgKCFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih0aGlzLl9uZXh0LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50U3Vic2NyaWJlciwgdGhpcy5fbmV4dCwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgICAgICBpZiAodGhpcy5fZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih0aGlzLl9lcnJvciwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudFN1YnNjcmliZXIsIHRoaXMuX2Vycm9yLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIV9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgICAgICAgICBfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZWRDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9jb21wbGV0ZS5jYWxsKF90aGlzLl9jb250ZXh0KTsgfTtcbiAgICAgICAgICAgICAgICBpZiAoIV9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih3cmFwcGVkQ29tcGxldGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50U3Vic2NyaWJlciwgd3JhcHBlZENvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLl9fdHJ5T3JVbnN1YiA9IGZ1bmN0aW9uIChmbiwgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcy5fY29udGV4dCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLl9fdHJ5T3JTZXRFcnJvciA9IGZ1bmN0aW9uIChwYXJlbnQsIGZuLCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLl9jb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcGFyZW50LnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgcGFyZW50LnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuX3Vuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50U3Vic2NyaWJlciA9IG51bGw7XG4gICAgICAgIF9wYXJlbnRTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gU2FmZVN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmliZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vU3Vic2NyaWJlcicpO1xudmFyIHJ4U3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vc3ltYm9sL3J4U3Vic2NyaWJlcicpO1xudmFyIE9ic2VydmVyXzEgPSByZXF1aXJlKCcuLi9PYnNlcnZlcicpO1xuZnVuY3Rpb24gdG9TdWJzY3JpYmVyKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpIHtcbiAgICBpZiAobmV4dE9yT2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKG5leHRPck9ic2VydmVyIGluc3RhbmNlb2YgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dE9yT2JzZXJ2ZXJbcnhTdWJzY3JpYmVyXzEucnhTdWJzY3JpYmVyXSkge1xuICAgICAgICAgICAgcmV0dXJuIG5leHRPck9ic2VydmVyW3J4U3Vic2NyaWJlcl8xLnJ4U3Vic2NyaWJlcl0oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW5leHRPck9ic2VydmVyICYmICFlcnJvciAmJiAhY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcihPYnNlcnZlcl8xLmVtcHR5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKTtcbn1cbmV4cG9ydHMudG9TdWJzY3JpYmVyID0gdG9TdWJzY3JpYmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9TdWJzY3JpYmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHJvb3RfMSA9IHJlcXVpcmUoJy4uL3V0aWwvcm9vdCcpO1xuZnVuY3Rpb24gZ2V0U3ltYm9sT2JzZXJ2YWJsZShjb250ZXh0KSB7XG4gICAgdmFyICQkb2JzZXJ2YWJsZTtcbiAgICB2YXIgU3ltYm9sID0gY29udGV4dC5TeW1ib2w7XG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG4gICAgICAgICAgICAkJG9ic2VydmFibGUgPSBTeW1ib2wub2JzZXJ2YWJsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQkb2JzZXJ2YWJsZSA9IFN5bWJvbCgnb2JzZXJ2YWJsZScpO1xuICAgICAgICAgICAgU3ltYm9sLm9ic2VydmFibGUgPSAkJG9ic2VydmFibGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICQkb2JzZXJ2YWJsZSA9ICdAQG9ic2VydmFibGUnO1xuICAgIH1cbiAgICByZXR1cm4gJCRvYnNlcnZhYmxlO1xufVxuZXhwb3J0cy5nZXRTeW1ib2xPYnNlcnZhYmxlID0gZ2V0U3ltYm9sT2JzZXJ2YWJsZTtcbmV4cG9ydHMub2JzZXJ2YWJsZSA9IGdldFN5bWJvbE9ic2VydmFibGUocm9vdF8xLnJvb3QpO1xuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2Ugb2JzZXJ2YWJsZSBpbnN0ZWFkXG4gKi9cbmV4cG9ydHMuJCRvYnNlcnZhYmxlID0gZXhwb3J0cy5vYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8qIHRzbGludDpkaXNhYmxlOm5vLWVtcHR5ICovXG5mdW5jdGlvbiBub29wKCkgeyB9XG5leHBvcnRzLm5vb3AgPSBub29wO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9vcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBub29wXzEgPSByZXF1aXJlKCcuL25vb3AnKTtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5mdW5jdGlvbiBwaXBlKCkge1xuICAgIHZhciBmbnMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBmbnNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBwaXBlRnJvbUFycmF5KGZucyk7XG59XG5leHBvcnRzLnBpcGUgPSBwaXBlO1xuLyogQGludGVybmFsICovXG5mdW5jdGlvbiBwaXBlRnJvbUFycmF5KGZucykge1xuICAgIGlmICghZm5zKSB7XG4gICAgICAgIHJldHVybiBub29wXzEubm9vcDtcbiAgICB9XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZuc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBpcGVkKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBmbnMucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBmbikgeyByZXR1cm4gZm4ocHJldik7IH0sIGlucHV0KTtcbiAgICB9O1xufVxuZXhwb3J0cy5waXBlRnJvbUFycmF5ID0gcGlwZUZyb21BcnJheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcm9vdF8xID0gcmVxdWlyZSgnLi91dGlsL3Jvb3QnKTtcbnZhciB0b1N1YnNjcmliZXJfMSA9IHJlcXVpcmUoJy4vdXRpbC90b1N1YnNjcmliZXInKTtcbnZhciBvYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuL3N5bWJvbC9vYnNlcnZhYmxlJyk7XG52YXIgcGlwZV8xID0gcmVxdWlyZSgnLi91dGlsL3BpcGUnKTtcbi8qKlxuICogQSByZXByZXNlbnRhdGlvbiBvZiBhbnkgc2V0IG9mIHZhbHVlcyBvdmVyIGFueSBhbW91bnQgb2YgdGltZS4gVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBidWlsZGluZyBibG9ja1xuICogb2YgUnhKUy5cbiAqXG4gKiBAY2xhc3MgT2JzZXJ2YWJsZTxUPlxuICovXG52YXIgT2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3Vic2NyaWJlIHRoZSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBPYnNlcnZhYmxlIGlzXG4gICAgICogaW5pdGlhbGx5IHN1YnNjcmliZWQgdG8uIFRoaXMgZnVuY3Rpb24gaXMgZ2l2ZW4gYSBTdWJzY3JpYmVyLCB0byB3aGljaCBuZXcgdmFsdWVzXG4gICAgICogY2FuIGJlIGBuZXh0YGVkLCBvciBhbiBgZXJyb3JgIG1ldGhvZCBjYW4gYmUgY2FsbGVkIHRvIHJhaXNlIGFuIGVycm9yLCBvclxuICAgICAqIGBjb21wbGV0ZWAgY2FuIGJlIGNhbGxlZCB0byBub3RpZnkgb2YgYSBzdWNjZXNzZnVsIGNvbXBsZXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZShzdWJzY3JpYmUpIHtcbiAgICAgICAgdGhpcy5faXNTY2FsYXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgT2JzZXJ2YWJsZSwgd2l0aCB0aGlzIE9ic2VydmFibGUgYXMgdGhlIHNvdXJjZSwgYW5kIHRoZSBwYXNzZWRcbiAgICAgKiBvcGVyYXRvciBkZWZpbmVkIGFzIHRoZSBuZXcgb2JzZXJ2YWJsZSdzIG9wZXJhdG9yLlxuICAgICAqIEBtZXRob2QgbGlmdFxuICAgICAqIEBwYXJhbSB7T3BlcmF0b3J9IG9wZXJhdG9yIHRoZSBvcGVyYXRvciBkZWZpbmluZyB0aGUgb3BlcmF0aW9uIHRvIHRha2Ugb24gdGhlIG9ic2VydmFibGVcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhIG5ldyBvYnNlcnZhYmxlIHdpdGggdGhlIE9wZXJhdG9yIGFwcGxpZWRcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICBvYnNlcnZhYmxlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW52b2tlcyBhbiBleGVjdXRpb24gb2YgYW4gT2JzZXJ2YWJsZSBhbmQgcmVnaXN0ZXJzIE9ic2VydmVyIGhhbmRsZXJzIGZvciBub3RpZmljYXRpb25zIGl0IHdpbGwgZW1pdC5cbiAgICAgKlxuICAgICAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5Vc2UgaXQgd2hlbiB5b3UgaGF2ZSBhbGwgdGhlc2UgT2JzZXJ2YWJsZXMsIGJ1dCBzdGlsbCBub3RoaW5nIGlzIGhhcHBlbmluZy48L3NwYW4+XG4gICAgICpcbiAgICAgKiBgc3Vic2NyaWJlYCBpcyBub3QgYSByZWd1bGFyIG9wZXJhdG9yLCBidXQgYSBtZXRob2QgdGhhdCBjYWxscyBPYnNlcnZhYmxlJ3MgaW50ZXJuYWwgYHN1YnNjcmliZWAgZnVuY3Rpb24uIEl0XG4gICAgICogbWlnaHQgYmUgZm9yIGV4YW1wbGUgYSBmdW5jdGlvbiB0aGF0IHlvdSBwYXNzZWQgdG8gYSB7QGxpbmsgY3JlYXRlfSBzdGF0aWMgZmFjdG9yeSwgYnV0IG1vc3Qgb2YgdGhlIHRpbWUgaXQgaXNcbiAgICAgKiBhIGxpYnJhcnkgaW1wbGVtZW50YXRpb24sIHdoaWNoIGRlZmluZXMgd2hhdCBhbmQgd2hlbiB3aWxsIGJlIGVtaXR0ZWQgYnkgYW4gT2JzZXJ2YWJsZS4gVGhpcyBtZWFucyB0aGF0IGNhbGxpbmdcbiAgICAgKiBgc3Vic2NyaWJlYCBpcyBhY3R1YWxseSB0aGUgbW9tZW50IHdoZW4gT2JzZXJ2YWJsZSBzdGFydHMgaXRzIHdvcmssIG5vdCB3aGVuIGl0IGlzIGNyZWF0ZWQsIGFzIGl0IGlzIG9mdGVuXG4gICAgICogdGhvdWdodC5cbiAgICAgKlxuICAgICAqIEFwYXJ0IGZyb20gc3RhcnRpbmcgdGhlIGV4ZWN1dGlvbiBvZiBhbiBPYnNlcnZhYmxlLCB0aGlzIG1ldGhvZCBhbGxvd3MgeW91IHRvIGxpc3RlbiBmb3IgdmFsdWVzXG4gICAgICogdGhhdCBhbiBPYnNlcnZhYmxlIGVtaXRzLCBhcyB3ZWxsIGFzIGZvciB3aGVuIGl0IGNvbXBsZXRlcyBvciBlcnJvcnMuIFlvdSBjYW4gYWNoaWV2ZSB0aGlzIGluIHR3b1xuICAgICAqIGZvbGxvd2luZyB3YXlzLlxuICAgICAqXG4gICAgICogVGhlIGZpcnN0IHdheSBpcyBjcmVhdGluZyBhbiBvYmplY3QgdGhhdCBpbXBsZW1lbnRzIHtAbGluayBPYnNlcnZlcn0gaW50ZXJmYWNlLiBJdCBzaG91bGQgaGF2ZSBtZXRob2RzXG4gICAgICogZGVmaW5lZCBieSB0aGF0IGludGVyZmFjZSwgYnV0IG5vdGUgdGhhdCBpdCBzaG91bGQgYmUganVzdCBhIHJlZ3VsYXIgSmF2YVNjcmlwdCBvYmplY3QsIHdoaWNoIHlvdSBjYW4gY3JlYXRlXG4gICAgICogeW91cnNlbGYgaW4gYW55IHdheSB5b3Ugd2FudCAoRVM2IGNsYXNzLCBjbGFzc2ljIGZ1bmN0aW9uIGNvbnN0cnVjdG9yLCBvYmplY3QgbGl0ZXJhbCBldGMuKS4gSW4gcGFydGljdWxhciBkb1xuICAgICAqIG5vdCBhdHRlbXB0IHRvIHVzZSBhbnkgUnhKUyBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIHRvIGNyZWF0ZSBPYnNlcnZlcnMgLSB5b3UgZG9uJ3QgbmVlZCB0aGVtLiBSZW1lbWJlciBhbHNvXG4gICAgICogdGhhdCB5b3VyIG9iamVjdCBkb2VzIG5vdCBoYXZlIHRvIGltcGxlbWVudCBhbGwgbWV0aG9kcy4gSWYgeW91IGZpbmQgeW91cnNlbGYgY3JlYXRpbmcgYSBtZXRob2QgdGhhdCBkb2Vzbid0XG4gICAgICogZG8gYW55dGhpbmcsIHlvdSBjYW4gc2ltcGx5IG9taXQgaXQuIE5vdGUgaG93ZXZlciwgdGhhdCBpZiBgZXJyb3JgIG1ldGhvZCBpcyBub3QgcHJvdmlkZWQsIGFsbCBlcnJvcnMgd2lsbFxuICAgICAqIGJlIGxlZnQgdW5jYXVnaHQuXG4gICAgICpcbiAgICAgKiBUaGUgc2Vjb25kIHdheSBpcyB0byBnaXZlIHVwIG9uIE9ic2VydmVyIG9iamVjdCBhbHRvZ2V0aGVyIGFuZCBzaW1wbHkgcHJvdmlkZSBjYWxsYmFjayBmdW5jdGlvbnMgaW4gcGxhY2Ugb2YgaXRzIG1ldGhvZHMuXG4gICAgICogVGhpcyBtZWFucyB5b3UgY2FuIHByb3ZpZGUgdGhyZWUgZnVuY3Rpb25zIGFzIGFyZ3VtZW50cyB0byBgc3Vic2NyaWJlYCwgd2hlcmUgZmlyc3QgZnVuY3Rpb24gaXMgZXF1aXZhbGVudFxuICAgICAqIG9mIGEgYG5leHRgIG1ldGhvZCwgc2Vjb25kIG9mIGFuIGBlcnJvcmAgbWV0aG9kIGFuZCB0aGlyZCBvZiBhIGBjb21wbGV0ZWAgbWV0aG9kLiBKdXN0IGFzIGluIGNhc2Ugb2YgT2JzZXJ2ZXIsXG4gICAgICogaWYgeW91IGRvIG5vdCBuZWVkIHRvIGxpc3RlbiBmb3Igc29tZXRoaW5nLCB5b3UgY2FuIG9taXQgYSBmdW5jdGlvbiwgcHJlZmVyYWJseSBieSBwYXNzaW5nIGB1bmRlZmluZWRgIG9yIGBudWxsYCxcbiAgICAgKiBzaW5jZSBgc3Vic2NyaWJlYCByZWNvZ25pemVzIHRoZXNlIGZ1bmN0aW9ucyBieSB3aGVyZSB0aGV5IHdlcmUgcGxhY2VkIGluIGZ1bmN0aW9uIGNhbGwuIFdoZW4gaXQgY29tZXNcbiAgICAgKiB0byBgZXJyb3JgIGZ1bmN0aW9uLCBqdXN0IGFzIGJlZm9yZSwgaWYgbm90IHByb3ZpZGVkLCBlcnJvcnMgZW1pdHRlZCBieSBhbiBPYnNlcnZhYmxlIHdpbGwgYmUgdGhyb3duLlxuICAgICAqXG4gICAgICogV2hhdGV2ZXIgc3R5bGUgb2YgY2FsbGluZyBgc3Vic2NyaWJlYCB5b3UgdXNlLCBpbiBib3RoIGNhc2VzIGl0IHJldHVybnMgYSBTdWJzY3JpcHRpb24gb2JqZWN0LlxuICAgICAqIFRoaXMgb2JqZWN0IGFsbG93cyB5b3UgdG8gY2FsbCBgdW5zdWJzY3JpYmVgIG9uIGl0LCB3aGljaCBpbiB0dXJuIHdpbGwgc3RvcCB3b3JrIHRoYXQgYW4gT2JzZXJ2YWJsZSBkb2VzIGFuZCB3aWxsIGNsZWFuXG4gICAgICogdXAgYWxsIHJlc291cmNlcyB0aGF0IGFuIE9ic2VydmFibGUgdXNlZC4gTm90ZSB0aGF0IGNhbmNlbGxpbmcgYSBzdWJzY3JpcHRpb24gd2lsbCBub3QgY2FsbCBgY29tcGxldGVgIGNhbGxiYWNrXG4gICAgICogcHJvdmlkZWQgdG8gYHN1YnNjcmliZWAgZnVuY3Rpb24sIHdoaWNoIGlzIHJlc2VydmVkIGZvciBhIHJlZ3VsYXIgY29tcGxldGlvbiBzaWduYWwgdGhhdCBjb21lcyBmcm9tIGFuIE9ic2VydmFibGUuXG4gICAgICpcbiAgICAgKiBSZW1lbWJlciB0aGF0IGNhbGxiYWNrcyBwcm92aWRlZCB0byBgc3Vic2NyaWJlYCBhcmUgbm90IGd1YXJhbnRlZWQgdG8gYmUgY2FsbGVkIGFzeW5jaHJvbm91c2x5LlxuICAgICAqIEl0IGlzIGFuIE9ic2VydmFibGUgaXRzZWxmIHRoYXQgZGVjaWRlcyB3aGVuIHRoZXNlIGZ1bmN0aW9ucyB3aWxsIGJlIGNhbGxlZC4gRm9yIGV4YW1wbGUge0BsaW5rIG9mfVxuICAgICAqIGJ5IGRlZmF1bHQgZW1pdHMgYWxsIGl0cyB2YWx1ZXMgc3luY2hyb25vdXNseS4gQWx3YXlzIGNoZWNrIGRvY3VtZW50YXRpb24gZm9yIGhvdyBnaXZlbiBPYnNlcnZhYmxlXG4gICAgICogd2lsbCBiZWhhdmUgd2hlbiBzdWJzY3JpYmVkIGFuZCBpZiBpdHMgZGVmYXVsdCBiZWhhdmlvciBjYW4gYmUgbW9kaWZpZWQgd2l0aCBhIHtAbGluayBTY2hlZHVsZXJ9LlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+U3Vic2NyaWJlIHdpdGggYW4gT2JzZXJ2ZXI8L2NhcHRpb24+XG4gICAgICogY29uc3Qgc3VtT2JzZXJ2ZXIgPSB7XG4gICAgICogICBzdW06IDAsXG4gICAgICogICBuZXh0KHZhbHVlKSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdBZGRpbmc6ICcgKyB2YWx1ZSk7XG4gICAgICogICAgIHRoaXMuc3VtID0gdGhpcy5zdW0gKyB2YWx1ZTtcbiAgICAgKiAgIH0sXG4gICAgICogICBlcnJvcigpIHsgLy8gV2UgYWN0dWFsbHkgY291bGQganVzdCByZW1vdmUgdGhpcyBtZXRob2QsXG4gICAgICogICB9LCAgICAgICAgLy8gc2luY2Ugd2UgZG8gbm90IHJlYWxseSBjYXJlIGFib3V0IGVycm9ycyByaWdodCBub3cuXG4gICAgICogICBjb21wbGV0ZSgpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ1N1bSBlcXVhbHM6ICcgKyB0aGlzLnN1bSk7XG4gICAgICogICB9XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIFJ4Lk9ic2VydmFibGUub2YoMSwgMiwgMykgLy8gU3luY2hyb25vdXNseSBlbWl0cyAxLCAyLCAzIGFuZCB0aGVuIGNvbXBsZXRlcy5cbiAgICAgKiAuc3Vic2NyaWJlKHN1bU9ic2VydmVyKTtcbiAgICAgKlxuICAgICAqIC8vIExvZ3M6XG4gICAgICogLy8gXCJBZGRpbmc6IDFcIlxuICAgICAqIC8vIFwiQWRkaW5nOiAyXCJcbiAgICAgKiAvLyBcIkFkZGluZzogM1wiXG4gICAgICogLy8gXCJTdW0gZXF1YWxzOiA2XCJcbiAgICAgKlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+U3Vic2NyaWJlIHdpdGggZnVuY3Rpb25zPC9jYXB0aW9uPlxuICAgICAqIGxldCBzdW0gPSAwO1xuICAgICAqXG4gICAgICogUnguT2JzZXJ2YWJsZS5vZigxLCAyLCAzKVxuICAgICAqIC5zdWJzY3JpYmUoXG4gICAgICogICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAqICAgICBjb25zb2xlLmxvZygnQWRkaW5nOiAnICsgdmFsdWUpO1xuICAgICAqICAgICBzdW0gPSBzdW0gKyB2YWx1ZTtcbiAgICAgKiAgIH0sXG4gICAgICogICB1bmRlZmluZWQsXG4gICAgICogICBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ1N1bSBlcXVhbHM6ICcgKyBzdW0pO1xuICAgICAqICAgfVxuICAgICAqICk7XG4gICAgICpcbiAgICAgKiAvLyBMb2dzOlxuICAgICAqIC8vIFwiQWRkaW5nOiAxXCJcbiAgICAgKiAvLyBcIkFkZGluZzogMlwiXG4gICAgICogLy8gXCJBZGRpbmc6IDNcIlxuICAgICAqIC8vIFwiU3VtIGVxdWFsczogNlwiXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPkNhbmNlbCBhIHN1YnNjcmlwdGlvbjwvY2FwdGlvbj5cbiAgICAgKiBjb25zdCBzdWJzY3JpcHRpb24gPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApLnN1YnNjcmliZShcbiAgICAgKiAgIG51bSA9PiBjb25zb2xlLmxvZyhudW0pLFxuICAgICAqICAgdW5kZWZpbmVkLFxuICAgICAqICAgKCkgPT4gY29uc29sZS5sb2coJ2NvbXBsZXRlZCEnKSAvLyBXaWxsIG5vdCBiZSBjYWxsZWQsIGV2ZW5cbiAgICAgKiApOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBjYW5jZWxsaW5nIHN1YnNjcmlwdGlvblxuICAgICAqXG4gICAgICpcbiAgICAgKiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgKiAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAqICAgY29uc29sZS5sb2coJ3Vuc3Vic2NyaWJlZCEnKTtcbiAgICAgKiB9LCAyNTAwKTtcbiAgICAgKlxuICAgICAqIC8vIExvZ3M6XG4gICAgICogLy8gMCBhZnRlciAxc1xuICAgICAqIC8vIDEgYWZ0ZXIgMnNcbiAgICAgKiAvLyBcInVuc3Vic2NyaWJlZCFcIiBhZnRlciAyLjVzXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JzZXJ2ZXJ8RnVuY3Rpb259IG9ic2VydmVyT3JOZXh0IChvcHRpb25hbCkgRWl0aGVyIGFuIG9ic2VydmVyIHdpdGggbWV0aG9kcyB0byBiZSBjYWxsZWQsXG4gICAgICogIG9yIHRoZSBmaXJzdCBvZiB0aHJlZSBwb3NzaWJsZSBoYW5kbGVycywgd2hpY2ggaXMgdGhlIGhhbmRsZXIgZm9yIGVhY2ggdmFsdWUgZW1pdHRlZCBmcm9tIHRoZSBzdWJzY3JpYmVkXG4gICAgICogIE9ic2VydmFibGUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3IgKG9wdGlvbmFsKSBBIGhhbmRsZXIgZm9yIGEgdGVybWluYWwgZXZlbnQgcmVzdWx0aW5nIGZyb20gYW4gZXJyb3IuIElmIG5vIGVycm9yIGhhbmRsZXIgaXMgcHJvdmlkZWQsXG4gICAgICogIHRoZSBlcnJvciB3aWxsIGJlIHRocm93biBhcyB1bmhhbmRsZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGUgKG9wdGlvbmFsKSBBIGhhbmRsZXIgZm9yIGEgdGVybWluYWwgZXZlbnQgcmVzdWx0aW5nIGZyb20gc3VjY2Vzc2Z1bCBjb21wbGV0aW9uLlxuICAgICAqIEByZXR1cm4ge0lTdWJzY3JpcHRpb259IGEgc3Vic2NyaXB0aW9uIHJlZmVyZW5jZSB0byB0aGUgcmVnaXN0ZXJlZCBoYW5kbGVyc1xuICAgICAqIEBtZXRob2Qgc3Vic2NyaWJlXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIG9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcbiAgICAgICAgdmFyIHNpbmsgPSB0b1N1YnNjcmliZXJfMS50b1N1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgIGlmIChvcGVyYXRvcikge1xuICAgICAgICAgICAgb3BlcmF0b3IuY2FsbChzaW5rLCB0aGlzLnNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzaW5rLmFkZCh0aGlzLnNvdXJjZSA/IHRoaXMuX3N1YnNjcmliZShzaW5rKSA6IHRoaXMuX3RyeVN1YnNjcmliZShzaW5rKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpbmsuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICBzaW5rLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHNpbmsuc3luY0Vycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgc2luay5zeW5jRXJyb3JWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2luaztcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl90cnlTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc2luaykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnNjcmliZShzaW5rKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzaW5rLnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICBzaW5rLnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgc2luay5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGZvckVhY2hcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0IGEgaGFuZGxlciBmb3IgZWFjaCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBvYnNlcnZhYmxlXG4gICAgICogQHBhcmFtIHtQcm9taXNlQ29uc3RydWN0b3J9IFtQcm9taXNlQ3Rvcl0gYSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB1c2VkIHRvIGluc3RhbnRpYXRlIHRoZSBQcm9taXNlXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHRoYXQgZWl0aGVyIHJlc29sdmVzIG9uIG9ic2VydmFibGUgY29tcGxldGlvbiBvclxuICAgICAqICByZWplY3RzIHdpdGggdGhlIGhhbmRsZWQgZXJyb3JcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKG5leHQsIFByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgICAgIGlmIChyb290XzEucm9vdC5SeCAmJiByb290XzEucm9vdC5SeC5jb25maWcgJiYgcm9vdF8xLnJvb3QuUnguY29uZmlnLlByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlQ3RvciA9IHJvb3RfMS5yb290LlJ4LmNvbmZpZy5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocm9vdF8xLnJvb3QuUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIFByb21pc2VDdG9yID0gcm9vdF8xLnJvb3QuUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIFByb21pc2UgaW1wbCBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgLy8gTXVzdCBiZSBkZWNsYXJlZCBpbiBhIHNlcGFyYXRlIHN0YXRlbWVudCB0byBhdm9pZCBhIFJlZmVybmNlRXJyb3Igd2hlblxuICAgICAgICAgICAgLy8gYWNjZXNzaW5nIHN1YnNjcmlwdGlvbiBiZWxvdyBpbiB0aGUgY2xvc3VyZSBkdWUgdG8gVGVtcG9yYWwgRGVhZCBab25lLlxuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IF90aGlzLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgc3Vic2NyaXB0aW9uLCB0aGVuIHdlIGNhbiBzdXJtaXNlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBuZXh0IGhhbmRsaW5nIGlzIGFzeW5jaHJvbm91cy4gQW55IGVycm9ycyB0aHJvd25cbiAgICAgICAgICAgICAgICAgICAgLy8gbmVlZCB0byBiZSByZWplY3RlZCBleHBsaWNpdGx5IGFuZCB1bnN1YnNjcmliZSBtdXN0IGJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGxlZCBtYW51YWxseVxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgTk8gc3Vic2NyaXB0aW9uLCB0aGVuIHdlJ3JlIGdldHRpbmcgYSBuZXh0ZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFsdWUgc3luY2hyb25vdXNseSBkdXJpbmcgc3Vic2NyaXB0aW9uLiBXZSBjYW4ganVzdCBjYWxsIGl0LlxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBpdCBlcnJvcnMsIE9ic2VydmFibGUncyBgc3Vic2NyaWJlYCB3aWxsIGVuc3VyZSB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5zdWJzY3JpcHRpb24gbG9naWMgaXMgY2FsbGVkLCB0aGVuIHN5bmNocm9ub3VzbHkgcmV0aHJvdyB0aGUgZXJyb3IuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFmdGVyIHRoYXQsIFByb21pc2Ugd2lsbCB0cmFwIHRoZSBlcnJvciBhbmQgc2VuZCBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBkb3duIHRoZSByZWplY3Rpb24gcGF0aC5cbiAgICAgICAgICAgICAgICAgICAgbmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgcmVqZWN0LCByZXNvbHZlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFuIGludGVyb3AgcG9pbnQgZGVmaW5lZCBieSB0aGUgZXM3LW9ic2VydmFibGUgc3BlYyBodHRwczovL2dpdGh1Yi5jb20vemVucGFyc2luZy9lcy1vYnNlcnZhYmxlXG4gICAgICogQG1ldGhvZCBTeW1ib2wub2JzZXJ2YWJsZVxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGV9IHRoaXMgaW5zdGFuY2Ugb2YgdGhlIG9ic2VydmFibGVcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZVtvYnNlcnZhYmxlXzEub2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHN0aXRjaCB0b2dldGhlciBmdW5jdGlvbmFsIG9wZXJhdG9ycyBpbnRvIGEgY2hhaW4uXG4gICAgICogQG1ldGhvZCBwaXBlXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gdGhlIE9ic2VydmFibGUgcmVzdWx0IG9mIGFsbCBvZiB0aGUgb3BlcmF0b3JzIGhhdmluZ1xuICAgICAqIGJlZW4gY2FsbGVkIGluIHRoZSBvcmRlciB0aGV5IHdlcmUgcGFzc2VkIGluLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGltcG9ydCB7IG1hcCwgZmlsdGVyLCBzY2FuIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuICAgICAqXG4gICAgICogUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKVxuICAgICAqICAgLnBpcGUoXG4gICAgICogICAgIGZpbHRlcih4ID0+IHggJSAyID09PSAwKSxcbiAgICAgKiAgICAgbWFwKHggPT4geCArIHgpLFxuICAgICAqICAgICBzY2FuKChhY2MsIHgpID0+IGFjYyArIHgpXG4gICAgICogICApXG4gICAgICogICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG9wZXJhdGlvbnNbX2kgLSAwXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wZXJhdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGlwZV8xLnBpcGVGcm9tQXJyYXkob3BlcmF0aW9ucykodGhpcyk7XG4gICAgfTtcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnRvUHJvbWlzZSA9IGZ1bmN0aW9uIChQcm9taXNlQ3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICAgICAgICBpZiAocm9vdF8xLnJvb3QuUnggJiYgcm9vdF8xLnJvb3QuUnguY29uZmlnICYmIHJvb3RfMS5yb290LlJ4LmNvbmZpZy5Qcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZUN0b3IgPSByb290XzEucm9vdC5SeC5jb25maWcuUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJvb3RfMS5yb290LlByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlQ3RvciA9IHJvb3RfMS5yb290LlByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFQcm9taXNlQ3Rvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBQcm9taXNlIGltcGwgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgIF90aGlzLnN1YnNjcmliZShmdW5jdGlvbiAoeCkgeyByZXR1cm4gdmFsdWUgPSB4OyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiByZWplY3QoZXJyKTsgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzb2x2ZSh2YWx1ZSk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIEhBQ0s6IFNpbmNlIFR5cGVTY3JpcHQgaW5oZXJpdHMgc3RhdGljIHByb3BlcnRpZXMgdG9vLCB3ZSBoYXZlIHRvXG4gICAgLy8gZmlnaHQgYWdhaW5zdCBUeXBlU2NyaXB0IGhlcmUgc28gU3ViamVjdCBjYW4gaGF2ZSBhIGRpZmZlcmVudCBzdGF0aWMgY3JlYXRlIHNpZ25hdHVyZVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgY29sZCBPYnNlcnZhYmxlIGJ5IGNhbGxpbmcgdGhlIE9ic2VydmFibGUgY29uc3RydWN0b3JcbiAgICAgKiBAc3RhdGljIHRydWVcbiAgICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3Vic2NyaWJlPyB0aGUgc3Vic2NyaWJlciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgdG8gdGhlIE9ic2VydmFibGUgY29uc3RydWN0b3JcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhIG5ldyBjb2xkIG9ic2VydmFibGVcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZSk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZTtcbn0oKSk7XG5leHBvcnRzLk9ic2VydmFibGUgPSBPYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JzZXJ2YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuLyoqXG4gKiBBbiBlcnJvciB0aHJvd24gd2hlbiBhbiBhY3Rpb24gaXMgaW52YWxpZCBiZWNhdXNlIHRoZSBvYmplY3QgaGFzIGJlZW5cbiAqIHVuc3Vic2NyaWJlZC5cbiAqXG4gKiBAc2VlIHtAbGluayBTdWJqZWN0fVxuICogQHNlZSB7QGxpbmsgQmVoYXZpb3JTdWJqZWN0fVxuICpcbiAqIEBjbGFzcyBPYmplY3RVbnN1YnNjcmliZWRFcnJvclxuICovXG52YXIgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPYmplY3RVbnN1YnNjcmliZWRFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpIHtcbiAgICAgICAgdmFyIGVyciA9IF9zdXBlci5jYWxsKHRoaXMsICdvYmplY3QgdW5zdWJzY3JpYmVkJyk7XG4gICAgICAgIHRoaXMubmFtZSA9IGVyci5uYW1lID0gJ09iamVjdFVuc3Vic2NyaWJlZEVycm9yJztcbiAgICAgICAgdGhpcy5zdGFjayA9IGVyci5zdGFjaztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3RVbnN1YnNjcmliZWRFcnJvcjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgPSBPYmplY3RVbnN1YnNjcmliZWRFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9iamVjdFVuc3Vic2NyaWJlZEVycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuL1N1YnNjcmlwdGlvbicpO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBTdWJqZWN0U3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3ViamVjdFN1YnNjcmlwdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJqZWN0U3Vic2NyaXB0aW9uKHN1YmplY3QsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlciA9IHN1YnNjcmliZXI7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgfVxuICAgIFN1YmplY3RTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0O1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gc3ViamVjdC5vYnNlcnZlcnM7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IG51bGw7XG4gICAgICAgIGlmICghb2JzZXJ2ZXJzIHx8IG9ic2VydmVycy5sZW5ndGggPT09IDAgfHwgc3ViamVjdC5pc1N0b3BwZWQgfHwgc3ViamVjdC5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3Vic2NyaWJlckluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2YodGhpcy5zdWJzY3JpYmVyKTtcbiAgICAgICAgaWYgKHN1YnNjcmliZXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2Uoc3Vic2NyaWJlckluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFN1YmplY3RTdWJzY3JpcHRpb247XG59KFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbikpO1xuZXhwb3J0cy5TdWJqZWN0U3Vic2NyaXB0aW9uID0gU3ViamVjdFN1YnNjcmlwdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3RTdWJzY3JpcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuL09ic2VydmFibGUnKTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKCcuL1N1YnNjcmliZXInKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoJy4vU3Vic2NyaXB0aW9uJyk7XG52YXIgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMSA9IHJlcXVpcmUoJy4vdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvcicpO1xudmFyIFN1YmplY3RTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoJy4vU3ViamVjdFN1YnNjcmlwdGlvbicpO1xudmFyIHJ4U3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi9zeW1ib2wvcnhTdWJzY3JpYmVyJyk7XG4vKipcbiAqIEBjbGFzcyBTdWJqZWN0U3Vic2NyaWJlcjxUPlxuICovXG52YXIgU3ViamVjdFN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJqZWN0U3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJqZWN0U3Vic2NyaWJlcihkZXN0aW5hdGlvbikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIFN1YmplY3RTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikpO1xuZXhwb3J0cy5TdWJqZWN0U3Vic2NyaWJlciA9IFN1YmplY3RTdWJzY3JpYmVyO1xuLyoqXG4gKiBAY2xhc3MgU3ViamVjdDxUPlxuICovXG52YXIgU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3ViamVjdCgpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gW107XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aHJvd25FcnJvciA9IG51bGw7XG4gICAgfVxuICAgIFN1YmplY3QucHJvdG90eXBlW3J4U3Vic2NyaWJlcl8xLnJ4U3Vic2NyaWJlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3ViamVjdFN1YnNjcmliZXIodGhpcyk7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEFub255bW91c1N1YmplY3QodGhpcywgdGhpcyk7XG4gICAgICAgIHN1YmplY3Qub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgcmV0dXJuIHN1YmplY3Q7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgICAgICB2YXIgbGVuID0gb2JzZXJ2ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjb3B5ID0gb2JzZXJ2ZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29weVtpXS5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aHJvd25FcnJvciA9IGVycjtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgIHZhciBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgICB2YXIgY29weSA9IG9ic2VydmVycy5zbGljZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb3B5W2ldLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vYnNlcnZlcnMubGVuZ3RoID0gMDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xLk9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgIHZhciBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgICB2YXIgY29weSA9IG9ic2VydmVycy5zbGljZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb3B5W2ldLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vYnNlcnZlcnMubGVuZ3RoID0gMDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBudWxsO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLl90cnlTdWJzY3JpYmUuY2FsbCh0aGlzLCBzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yXzEuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmhhc0Vycm9yKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKHRoaXMudGhyb3duRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1YmplY3RTdWJzY3JpcHRpb25fMS5TdWJqZWN0U3Vic2NyaXB0aW9uKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5hc09ic2VydmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfTtcbiAgICBTdWJqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uIChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgQW5vbnltb3VzU3ViamVjdChkZXN0aW5hdGlvbiwgc291cmNlKTtcbiAgICB9O1xuICAgIHJldHVybiBTdWJqZWN0O1xufShPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSkpO1xuZXhwb3J0cy5TdWJqZWN0ID0gU3ViamVjdDtcbi8qKlxuICogQGNsYXNzIEFub255bW91c1N1YmplY3Q8VD5cbiAqL1xudmFyIEFub255bW91c1N1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBbm9ueW1vdXNTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgICAgICBpZiAoZGVzdGluYXRpb24gJiYgZGVzdGluYXRpb24ubmV4dCkge1xuICAgICAgICAgICAgZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgICAgICBpZiAoZGVzdGluYXRpb24gJiYgZGVzdGluYXRpb24uZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbiAmJiBkZXN0aW5hdGlvbi5jb21wbGV0ZSkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuc291cmNlO1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFub255bW91c1N1YmplY3Q7XG59KFN1YmplY3QpKTtcbmV4cG9ydHMuQW5vbnltb3VzU3ViamVjdCA9IEFub255bW91c1N1YmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJqZWN0LmpzLm1hcCIsImltcG9ydCB7IExvZ2dpbmdFdmVudCB9IGZyb20gJy4uL21vZGVscy9sb2ctZXZlbnQnO1xuaW1wb3J0IHsgQXBwZW5kZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vZml0LWxvZ2dlci1jb3JlL2luZGV4JztcbmltcG9ydCB7IEFwcGVuZGVyIH0gZnJvbSAnLi9hcHBlbmRlcic7XG5cblxuZXhwb3J0IGNsYXNzIFNlcnZlckFwcGVuZGVyIGltcGxlbWVudHMgQXBwZW5kZXIge1xuXG4gICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IEFwcGVuZGVyT3B0aW9ucykge1xuICAgICAgfVxuICAgICAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiAnYWpheCc7XG4gICAgICB9XG4gICAgICB3cml0ZUxvZyhsb2dnaW5nRXZlbnQ6IExvZ2dpbmdFdmVudCk6IHZvaWQge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKEpTT04uc3RyaW5naWZ5KGxvZ2dpbmdFdmVudCkpXG4gICAgICB9XG4gICAgICB3cml0ZUxvZ3MobG9nZ2luZ0V2ZW50OiBMb2dnaW5nRXZlbnRbXSk6IHZvaWQge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKEpTT04uc3RyaW5naWZ5KGxvZ2dpbmdFdmVudCkpXG4gICAgICB9XG4gICAgICB1cGRhdGUoYXBwZW5kZXJPcHRpb25zOiBBcHBlbmRlck9wdGlvbnMpIDogdm9pZCB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGFwcGVuZGVyT3B0aW9ucztcbiAgICAgIH1cbn1cbiIsIlxuZXhwb3J0IGVudW0gTG9nTGV2ZWwge1xuICAgICAgQUxMID0gMCxcbiAgICAgIFRSQUNFID0gMSxcbiAgICAgIERFQlVHID0gMixcbiAgICAgIElORk8gPSAzLFxuICAgICAgV0FSTiA9IDQsXG4gICAgICBFUlJPUiA9IDUsXG4gICAgICBGQVRBTCA9IDYsXG4gICAgICBPRkYgPSA3XG59XG5leHBvcnQgaW50ZXJmYWNlIExvZ2dlclN0YXRpY0luZm8ge1xuICAgICAgYXBwTmFtZTogc3RyaW5nO1xuICAgICAgdXNlcj86IHN0cmluZztcbiAgICAgIHJlZ2lvbj86IHN0cmluZztcbiAgICAgIGVudj86IHN0cmluZztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTG9nT3B0aW9ucyB7XG4gICAgICBhcHBMb2dMZXZlbDogTG9nTGV2ZWw7XG4gICAgICBmb3JjZWRMb2dMZXZlbD86IExvZ0xldmVsO1xuICAgICAgbG9nSW50ZXJ2YWw6IG51bWJlcjtcbiAgICAgIGFwcGVuZGVyczogQXBwZW5kZXJPcHRpb25zW107XG4gICAgICBsb2dTZXJ2ZXI/OiBhbnk7XG59XG5leHBvcnQgaW50ZXJmYWNlIEFwcGVuZGVyT3B0aW9ucyB7XG4gICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICBmb3JtYXQ6IHN0cmluZzsgLy8gVGV4dCwganNvblxuICAgICAgcGF0dGVybj86IHN0cmluZztcbiAgICAgIHBhdGg/OiBzdHJpbmc7XG4gICAgICBsb2dMZXZlbD86IExvZ0xldmVsO1xuICAgICAgaXNEZWZmZXJyZWQ/OiBib29sZWFuO1xufVxuIiwiaW1wb3J0IHsgQXBwZW5kZXJPcHRpb25zLCBMb2dMZXZlbCB9IGZyb20gJy4uLy4uL2ZpdC1sb2dnZXItY29yZS9pbmRleCc7XG5pbXBvcnQgeyBBcHBlbmRlciB9IGZyb20gXCIuL2FwcGVuZGVyXCI7XG5pbXBvcnQgeyBMb2dnaW5nRXZlbnQgfSBmcm9tIFwiLi4vbW9kZWxzL2xvZy1ldmVudFwiO1xuXG5cblxuZXhwb3J0IGNsYXNzIENvbnNvbGVBcHBlbmRlciBpbXBsZW1lbnRzIEFwcGVuZGVyIHtcbiAgICAgIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbnNvbGUnO1xuICAgICAgfVxuICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOiBBcHBlbmRlck9wdGlvbnMpIHtcblxuICAgICAgfVxuXG4gICAgICB3cml0ZUxvZyhsb2dnaW5nRXZlbnQ6IExvZ2dpbmdFdmVudCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sb2dMZXZlbCAhPT0gTG9nTGV2ZWwuT0ZGICYmIGxvZ2dpbmdFdmVudC5sZXZlbCA+PSB0aGlzLm9wdGlvbnMubG9nTGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLmdldEZvcm1hdHRlZE1lc3NhZ2UobG9nZ2luZ0V2ZW50KTtcbiAgICAgICAgICAgICAgICAgIHN3aXRjaCAobG9nZ2luZ0V2ZW50LmxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIExvZ0xldmVsLkRFQlVHOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBMb2dMZXZlbC5FUlJPUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuRkFUQUw6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIExvZ0xldmVsLklORk86XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8obWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8obWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICB9XG4gICAgICB3cml0ZUxvZ3MobG9nZ2luZ0V2ZW50OiBMb2dnaW5nRXZlbnRbXSk6IHZvaWQge1xuXG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShhcHBlbmRlck9wdGlvbnM6IEFwcGVuZGVyT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gYXBwZW5kZXJPcHRpb25zO1xuICAgICAgfVxuXG4gICAgICBwcml2YXRlIGdldEZvcm1hdHRlZE1lc3NhZ2UobG9nZ2luZ0V2ZW50OiBMb2dnaW5nRXZlbnQpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIGBbJHtsb2dnaW5nRXZlbnQuYXBwTmFtZX0tJHtsb2dnaW5nRXZlbnQubmFtZX0tJHt0aGlzLmdldEZvcm1hdHRlZFRpbWUobG9nZ2luZ0V2ZW50LnRpbWVzdGFtcCl9XSBbJHtMb2dMZXZlbFtsb2dnaW5nRXZlbnQubGV2ZWxdfV0gPT4gJHtsb2dnaW5nRXZlbnQubWVzc2FnZX1gO1xuICAgICAgfVxuICAgICAgcHJpdmF0ZSBnZXRGb3JtYXR0ZWRUaW1lKHRpbWVzdGFtcDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG4gICAgICAgIHJldHVybiBgJHtkYXRlLmdldE1vbnRoKCl9LSR7ZGF0ZS5nZXREYXRlKCl9LSR7ZGF0ZS5nZXRGdWxsWWVhcigpfSAke2RhdGUuZ2V0SG91cnMoKX06JHtkYXRlLmdldE1pbnV0ZXMoKX06JHtkYXRlLmdldFNlY29uZHMoKX0uJHtkYXRlLmdldE1pbGxpc2Vjb25kcygpfWA7XG4gICAgICB9XG59XG4iLCJpbXBvcnQgeyBBcHBlbmRlciB9IGZyb20gJy4vYXBwZW5kZXInO1xuaW1wb3J0IHsgTG9nZ2luZ0V2ZW50IH0gZnJvbSAnLi4vbW9kZWxzL2xvZy1ldmVudCc7XG5pbXBvcnQgeyBBcHBlbmRlck9wdGlvbnMgfSBmcm9tICcuLi8uLi9maXQtbG9nZ2VyLWNvcmUvaW5kZXgnO1xuXG5cblxuZXhwb3J0IGNsYXNzIFdlYldvcmtlckFwcGVuZGVyIGltcGxlbWVudHMgQXBwZW5kZXIge1xuICBwcml2YXRlIHdvcmtlcjogU2hhcmVkV29ya2VyLlNoYXJlZFdvcmtlcjtcbiAgcHJpdmF0ZSBpc1dvcmtlclJlYWR5ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOiBBcHBlbmRlck9wdGlvbnMpIHtcblxuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ3dvcmtlcic7XG4gIH1cbiAgd3JpdGVMb2cobG9nZ2luZ0V2ZW50OiBMb2dnaW5nRXZlbnQpOiB2b2lkIHtcbiAgICAvLyB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgfVxuICB3cml0ZUxvZ3MobG9nZ2luZ0V2ZW50OiBMb2dnaW5nRXZlbnRbXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzV29ya2VyUmVhZHkpIHtcbiAgICAgIHRoaXMud29ya2VyLnBvcnQucG9zdE1lc3NhZ2UoeyB0eXBlOiAnTE9HX01FU1NBR0UnLCBwYXlsb2FkOiBsb2dnaW5nRXZlbnQgfSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKGFwcGVuZGVyT3B0aW9uczogQXBwZW5kZXJPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgdGhpcy5vcHRpb25zID0gYXBwZW5kZXJPcHRpb25zO1xuICAgIHRoaXMud29ya2VyID0gbmV3IFNoYXJlZFdvcmtlcihhcHBlbmRlck9wdGlvbnMucGF0aCwgJ0xvZ2dlci1Xb3JrZXIyMycpO1xuICAgIHRoaXMud29ya2VyLnBvcnQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0aGlzLm9uV29ya2VyRXJyb3IuYmluZCh0aGlzKSk7XG4gICAgdGhpcy53b3JrZXIucG9ydC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5vbldvcmtlck1lc3NhZ2UuYmluZCh0aGlzKSk7XG4gICAgdGhpcy53b3JrZXIucG9ydC5zdGFydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbldvcmtlckVycm9yKGVycm9yRXZ0OiBFcnJvckV2ZW50KSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvckV2dCk7XG4gIH1cbiAgcHJpdmF0ZSBvbldvcmtlck1lc3NhZ2UoZXZ0OiBNZXNzYWdlRXZlbnQpIHtcbiAgICBpZihldnQuZGF0YS50eXBlID09PSAnV09SS0VSX0NPTk5FQ1RFRCcpIHtcbiAgICAgIHRoaXMuaXNXb3JrZXJSZWFkeSA9IHRydWU7XG4gICAgfVxuICAgIGNvbnNvbGUuaW5mbyhldnQuZGF0YSk7XG4gIH1cbiAgcHJpdmF0ZSBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLndvcmtlcikge1xuICAgICAgdGhpcy5pc1dvcmtlclJlYWR5ID0gZmFsc2U7XG4gICAgICB0aGlzLndvcmtlci5wb3J0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5vbldvcmtlckVycm9yLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy53b3JrZXIucG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5vbldvcmtlck1lc3NhZ2UuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLndvcmtlci5wb3J0LmNsb3NlKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBTZXJ2ZXJBcHBlbmRlciB9IGZyb20gJy4vc2VydmVyLmFwcGVuZGVyJztcbmltcG9ydCB7IEFwcGVuZGVyT3B0aW9ucywgTG9nTGV2ZWwgfSBmcm9tICcuLi8uLi9maXQtbG9nZ2VyLWNvcmUvaW5kZXgnO1xuaW1wb3J0IHsgQ29uc29sZUFwcGVuZGVyIH0gZnJvbSAnLi9jb25zb2xlLmFwcGVuZGVyJztcbmltcG9ydCB7IEFwcGVuZGVyIH0gZnJvbSAnLi9hcHBlbmRlcic7XG5pbXBvcnQgeyBXZWJXb3JrZXJBcHBlbmRlciB9IGZyb20gJy4vd29ya2VyLmFwcGVuZGVyJztcblxuXG5leHBvcnQgY2xhc3MgQXBwZW5kZXJSZXBvc2l0b3J5IHtcbiAgICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZSA9IG5ldyBBcHBlbmRlclJlcG9zaXRvcnkoKTtcbiAgICAgIHByaXZhdGUgYXBwZW5kZXJNYXA6IE1hcDxzdHJpbmcsIEFwcGVuZGVyPiA9IG5ldyBNYXAoKTtcblxuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBpZiAoQXBwZW5kZXJSZXBvc2l0b3J5Ll9pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IEluc3RhbnRpYXRpb24gZmFpbGVkOiBVc2UgQXBwZW5kZXJSZXBvc2l0b3J5Lmluc3RhbmNlIGluc3RlYWQgb2YgbmV3LlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEFwcGVuZGVyUmVwb3NpdG9yeS5faW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRlck1hcC5zZXQoJ2NvbnNvbGUnLCBuZXcgQ29uc29sZUFwcGVuZGVyKHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdjb25zb2xlJyxcbiAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgbG9nTGV2ZWw6IExvZ0xldmVsLklORk9cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kZXJNYXAuc2V0KCdzZXJ2ZXInLCBuZXcgU2VydmVyQXBwZW5kZXIoe1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ3NlcnZlcicsXG4gICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgIGxvZ0xldmVsOiBMb2dMZXZlbC5JTkZPLFxuICAgICAgICAgICAgICAgICAgaXNEZWZmZXJyZWQ6IHRydWVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kZXJNYXAuc2V0KCd3b3JrZXInLCBuZXcgV2ViV29ya2VyQXBwZW5kZXIoe1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ3dvcmtlcicsXG4gICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgIGxvZ0xldmVsOiBMb2dMZXZlbC5JTkZPLFxuICAgICAgICAgICAgICAgICAgaXNEZWZmZXJyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICBwYXRoOiAnYXNzZXRzL3dvcmtlci9zb2NrZXQtbG9nZ2VyLmpzJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBnZXRBcHBlbmRlcihuYW1lOiBzdHJpbmcpOiBBcHBlbmRlciB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRlck1hcC5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcGVuZGVyTWFwLmdldChuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9nQXBwZW5kZXIgOiAke25hbWV9IGlzIG5vdCBmb3VuZGApO1xuICAgICAgfVxuICAgICAgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBBcHBlbmRlclJlcG9zaXRvcnkge1xuICAgICAgICAgICAgcmV0dXJuIEFwcGVuZGVyUmVwb3NpdG9yeS5faW5zdGFuY2U7XG4gICAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBpc0FycmF5XzEgPSByZXF1aXJlKCcuLi91dGlsL2lzQXJyYXknKTtcbmZ1bmN0aW9uIGlzTnVtZXJpYyh2YWwpIHtcbiAgICAvLyBwYXJzZUZsb2F0IE5hTnMgbnVtZXJpYy1jYXN0IGZhbHNlIHBvc2l0aXZlcyAobnVsbHx0cnVlfGZhbHNlfFwiXCIpXG4gICAgLy8gLi4uYnV0IG1pc2ludGVycHJldHMgbGVhZGluZy1udW1iZXIgc3RyaW5ncywgcGFydGljdWxhcmx5IGhleCBsaXRlcmFscyAoXCIweC4uLlwiKVxuICAgIC8vIHN1YnRyYWN0aW9uIGZvcmNlcyBpbmZpbml0aWVzIHRvIE5hTlxuICAgIC8vIGFkZGluZyAxIGNvcnJlY3RzIGxvc3Mgb2YgcHJlY2lzaW9uIGZyb20gcGFyc2VGbG9hdCAoIzE1MTAwKVxuICAgIHJldHVybiAhaXNBcnJheV8xLmlzQXJyYXkodmFsKSAmJiAodmFsIC0gcGFyc2VGbG9hdCh2YWwpICsgMSkgPj0gMDtcbn1cbmV4cG9ydHMuaXNOdW1lcmljID0gaXNOdW1lcmljO1xuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNOdW1lcmljLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKCcuLi9TdWJzY3JpcHRpb24nKTtcbi8qKlxuICogQSB1bml0IG9mIHdvcmsgdG8gYmUgZXhlY3V0ZWQgaW4gYSB7QGxpbmsgU2NoZWR1bGVyfS4gQW4gYWN0aW9uIGlzIHR5cGljYWxseVxuICogY3JlYXRlZCBmcm9tIHdpdGhpbiBhIFNjaGVkdWxlciBhbmQgYW4gUnhKUyB1c2VyIGRvZXMgbm90IG5lZWQgdG8gY29uY2VyblxuICogdGhlbXNlbHZlcyBhYm91dCBjcmVhdGluZyBhbmQgbWFuaXB1bGF0aW5nIGFuIEFjdGlvbi5cbiAqXG4gKiBgYGB0c1xuICogY2xhc3MgQWN0aW9uPFQ+IGV4dGVuZHMgU3Vic2NyaXB0aW9uIHtcbiAqICAgbmV3IChzY2hlZHVsZXI6IFNjaGVkdWxlciwgd29yazogKHN0YXRlPzogVCkgPT4gdm9pZCk7XG4gKiAgIHNjaGVkdWxlKHN0YXRlPzogVCwgZGVsYXk6IG51bWJlciA9IDApOiBTdWJzY3JpcHRpb247XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAY2xhc3MgQWN0aW9uPFQ+XG4gKi9cbnZhciBBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NoZWR1bGVzIHRoaXMgYWN0aW9uIG9uIGl0cyBwYXJlbnQgU2NoZWR1bGVyIGZvciBleGVjdXRpb24uIE1heSBiZSBwYXNzZWRcbiAgICAgKiBzb21lIGNvbnRleHQgb2JqZWN0LCBgc3RhdGVgLiBNYXkgaGFwcGVuIGF0IHNvbWUgcG9pbnQgaW4gdGhlIGZ1dHVyZSxcbiAgICAgKiBhY2NvcmRpbmcgdG8gdGhlIGBkZWxheWAgcGFyYW1ldGVyLCBpZiBzcGVjaWZpZWQuXG4gICAgICogQHBhcmFtIHtUfSBbc3RhdGVdIFNvbWUgY29udGV4dHVhbCBkYXRhIHRoYXQgdGhlIGB3b3JrYCBmdW5jdGlvbiB1c2VzIHdoZW5cbiAgICAgKiBjYWxsZWQgYnkgdGhlIFNjaGVkdWxlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2RlbGF5XSBUaW1lIHRvIHdhaXQgYmVmb3JlIGV4ZWN1dGluZyB0aGUgd29yaywgd2hlcmUgdGhlXG4gICAgICogdGltZSB1bml0IGlzIGltcGxpY2l0IGFuZCBkZWZpbmVkIGJ5IHRoZSBTY2hlZHVsZXIuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBBY3Rpb24ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gQWN0aW9uO1xufShTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24pKTtcbmV4cG9ydHMuQWN0aW9uID0gQWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgcm9vdF8xID0gcmVxdWlyZSgnLi4vdXRpbC9yb290Jyk7XG52YXIgQWN0aW9uXzEgPSByZXF1aXJlKCcuL0FjdGlvbicpO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBBc3luY0FjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFzeW5jQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFzeW5jQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIHdvcmspO1xuICAgICAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgdGhpcy53b3JrID0gd29yaztcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWx3YXlzIHJlcGxhY2UgdGhlIGN1cnJlbnQgc3RhdGUgd2l0aCB0aGUgbmV3IHN0YXRlLlxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIC8vIFNldCB0aGUgcGVuZGluZyBmbGFnIGluZGljYXRpbmcgdGhhdCB0aGlzIGFjdGlvbiBoYXMgYmVlbiBzY2hlZHVsZWQsIG9yXG4gICAgICAgIC8vIGhhcyByZWN1cnNpdmVseSByZXNjaGVkdWxlZCBpdHNlbGYuXG4gICAgICAgIHRoaXMucGVuZGluZyA9IHRydWU7XG4gICAgICAgIHZhciBpZCA9IHRoaXMuaWQ7XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gSW1wb3J0YW50IGltcGxlbWVudGF0aW9uIG5vdGU6XG4gICAgICAgIC8vXG4gICAgICAgIC8vIEFjdGlvbnMgb25seSBleGVjdXRlIG9uY2UgYnkgZGVmYXVsdCwgdW5sZXNzIHJlc2NoZWR1bGVkIGZyb20gd2l0aGluIHRoZVxuICAgICAgICAvLyBzY2hlZHVsZWQgY2FsbGJhY2suIFRoaXMgYWxsb3dzIHVzIHRvIGltcGxlbWVudCBzaW5nbGUgYW5kIHJlcGVhdFxuICAgICAgICAvLyBhY3Rpb25zIHZpYSB0aGUgc2FtZSBjb2RlIHBhdGgsIHdpdGhvdXQgYWRkaW5nIEFQSSBzdXJmYWNlIGFyZWEsIGFzIHdlbGxcbiAgICAgICAgLy8gYXMgbWltaWMgdHJhZGl0aW9uYWwgcmVjdXJzaW9uIGJ1dCBhY3Jvc3MgYXN5bmNocm9ub3VzIGJvdW5kYXJpZXMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEhvd2V2ZXIsIEpTIHJ1bnRpbWVzIGFuZCB0aW1lcnMgZGlzdGluZ3Vpc2ggYmV0d2VlbiBpbnRlcnZhbHMgYWNoaWV2ZWQgYnlcbiAgICAgICAgLy8gc2VyaWFsIGBzZXRUaW1lb3V0YCBjYWxscyB2cy4gYSBzaW5nbGUgYHNldEludGVydmFsYCBjYWxsLiBBbiBpbnRlcnZhbCBvZlxuICAgICAgICAvLyBzZXJpYWwgYHNldFRpbWVvdXRgIGNhbGxzIGNhbiBiZSBpbmRpdmlkdWFsbHkgZGVsYXllZCwgd2hpY2ggZGVsYXlzXG4gICAgICAgIC8vIHNjaGVkdWxpbmcgdGhlIG5leHQgYHNldFRpbWVvdXRgLCBhbmQgc28gb24uIGBzZXRJbnRlcnZhbGAgYXR0ZW1wdHMgdG9cbiAgICAgICAgLy8gZ3VhcmFudGVlIHRoZSBpbnRlcnZhbCBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgbW9yZSBwcmVjaXNlbHkgdG8gdGhlXG4gICAgICAgIC8vIGludGVydmFsIHBlcmlvZCwgcmVnYXJkbGVzcyBvZiBsb2FkLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGVyZWZvcmUsIHdlIHVzZSBgc2V0SW50ZXJ2YWxgIHRvIHNjaGVkdWxlIHNpbmdsZSBhbmQgcmVwZWF0IGFjdGlvbnMuXG4gICAgICAgIC8vIElmIHRoZSBhY3Rpb24gcmVzY2hlZHVsZXMgaXRzZWxmIHdpdGggdGhlIHNhbWUgZGVsYXksIHRoZSBpbnRlcnZhbCBpcyBub3RcbiAgICAgICAgLy8gY2FuY2VsZWQuIElmIHRoZSBhY3Rpb24gZG9lc24ndCByZXNjaGVkdWxlLCBvciByZXNjaGVkdWxlcyB3aXRoIGFcbiAgICAgICAgLy8gZGlmZmVyZW50IGRlbGF5LCB0aGUgaW50ZXJ2YWwgd2lsbCBiZSBjYW5jZWxlZCBhZnRlciBzY2hlZHVsZWQgY2FsbGJhY2tcbiAgICAgICAgLy8gZXhlY3V0aW9uLlxuICAgICAgICAvL1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcbiAgICAgICAgLy8gSWYgdGhpcyBhY3Rpb24gaGFzIGFscmVhZHkgYW4gYXN5bmMgSWQsIGRvbid0IHJlcXVlc3QgYSBuZXcgb25lLlxuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZCB8fCB0aGlzLnJlcXVlc3RBc3luY0lkKHNjaGVkdWxlciwgdGhpcy5pZCwgZGVsYXkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIHJvb3RfMS5yb290LnNldEludGVydmFsKHNjaGVkdWxlci5mbHVzaC5iaW5kKHNjaGVkdWxlciwgdGhpcyksIGRlbGF5KTtcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgLy8gSWYgdGhpcyBhY3Rpb24gaXMgcmVzY2hlZHVsZWQgd2l0aCB0aGUgc2FtZSBkZWxheSB0aW1lLCBkb24ndCBjbGVhciB0aGUgaW50ZXJ2YWwgaWQuXG4gICAgICAgIGlmIChkZWxheSAhPT0gbnVsbCAmJiB0aGlzLmRlbGF5ID09PSBkZWxheSAmJiB0aGlzLnBlbmRpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBpZiB0aGUgYWN0aW9uJ3MgZGVsYXkgdGltZSBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgY3VycmVudCBkZWxheSxcbiAgICAgICAgLy8gb3IgdGhlIGFjdGlvbiBoYXMgYmVlbiByZXNjaGVkdWxlZCBiZWZvcmUgaXQncyBleGVjdXRlZCwgY2xlYXIgdGhlIGludGVydmFsIGlkXG4gICAgICAgIHJldHVybiByb290XzEucm9vdC5jbGVhckludGVydmFsKGlkKSAmJiB1bmRlZmluZWQgfHwgdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW1tZWRpYXRlbHkgZXhlY3V0ZXMgdGhpcyBhY3Rpb24gYW5kIHRoZSBgd29ya2AgaXQgY29udGFpbnMuXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2V4ZWN1dGluZyBhIGNhbmNlbGxlZCBhY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yID0gdGhpcy5fZXhlY3V0ZShzdGF0ZSwgZGVsYXkpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBlbmRpbmcgPT09IGZhbHNlICYmIHRoaXMuaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRGVxdWV1ZSBpZiB0aGUgYWN0aW9uIGRpZG4ndCByZXNjaGVkdWxlIGl0c2VsZi4gRG9uJ3QgY2FsbFxuICAgICAgICAgICAgLy8gdW5zdWJzY3JpYmUoKSwgYmVjYXVzZSB0aGUgYWN0aW9uIGNvdWxkIHJlc2NoZWR1bGUgbGF0ZXIuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZTpcbiAgICAgICAgICAgIC8vIGBgYFxuICAgICAgICAgICAgLy8gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uIGRvV29yayhjb3VudGVyKSB7XG4gICAgICAgICAgICAvLyAgIC8qIC4uLiBJJ20gYSBidXN5IHdvcmtlciBiZWUgLi4uICovXG4gICAgICAgICAgICAvLyAgIHZhciBvcmlnaW5hbEFjdGlvbiA9IHRoaXM7XG4gICAgICAgICAgICAvLyAgIC8qIHdhaXQgMTAwbXMgYmVmb3JlIHJlc2NoZWR1bGluZyB0aGUgYWN0aW9uICovXG4gICAgICAgICAgICAvLyAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gICAgIG9yaWdpbmFsQWN0aW9uLnNjaGVkdWxlKGNvdW50ZXIgKyAxKTtcbiAgICAgICAgICAgIC8vICAgfSwgMTAwKTtcbiAgICAgICAgICAgIC8vIH0sIDEwMDApO1xuICAgICAgICAgICAgLy8gYGBgXG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5yZWN5Y2xlQXN5bmNJZCh0aGlzLnNjaGVkdWxlciwgdGhpcy5pZCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgdmFyIGVycm9yZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLndvcmsoc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGVycm9yVmFsdWUgPSAhIWUgJiYgZSB8fCBuZXcgRXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yZWQpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHJldHVybiBlcnJvclZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUuX3Vuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWQgPSB0aGlzLmlkO1xuICAgICAgICB2YXIgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgICAgIHZhciBhY3Rpb25zID0gc2NoZWR1bGVyLmFjdGlvbnM7XG4gICAgICAgIHZhciBpbmRleCA9IGFjdGlvbnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgdGhpcy53b3JrID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlciA9IG51bGw7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGFjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQoc2NoZWR1bGVyLCBpZCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWxheSA9IG51bGw7XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNBY3Rpb247XG59KEFjdGlvbl8xLkFjdGlvbikpO1xuZXhwb3J0cy5Bc3luY0FjdGlvbiA9IEFzeW5jQWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXN5bmNBY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEFuIGV4ZWN1dGlvbiBjb250ZXh0IGFuZCBhIGRhdGEgc3RydWN0dXJlIHRvIG9yZGVyIHRhc2tzIGFuZCBzY2hlZHVsZSB0aGVpclxuICogZXhlY3V0aW9uLiBQcm92aWRlcyBhIG5vdGlvbiBvZiAocG90ZW50aWFsbHkgdmlydHVhbCkgdGltZSwgdGhyb3VnaCB0aGVcbiAqIGBub3coKWAgZ2V0dGVyIG1ldGhvZC5cbiAqXG4gKiBFYWNoIHVuaXQgb2Ygd29yayBpbiBhIFNjaGVkdWxlciBpcyBjYWxsZWQgYW4ge0BsaW5rIEFjdGlvbn0uXG4gKlxuICogYGBgdHNcbiAqIGNsYXNzIFNjaGVkdWxlciB7XG4gKiAgIG5vdygpOiBudW1iZXI7XG4gKiAgIHNjaGVkdWxlKHdvcmssIGRlbGF5Pywgc3RhdGU/KTogU3Vic2NyaXB0aW9uO1xuICogfVxuICogYGBgXG4gKlxuICogQGNsYXNzIFNjaGVkdWxlclxuICovXG52YXIgU2NoZWR1bGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY2hlZHVsZXIoU2NoZWR1bGVyQWN0aW9uLCBub3cpIHtcbiAgICAgICAgaWYgKG5vdyA9PT0gdm9pZCAwKSB7IG5vdyA9IFNjaGVkdWxlci5ub3c7IH1cbiAgICAgICAgdGhpcy5TY2hlZHVsZXJBY3Rpb24gPSBTY2hlZHVsZXJBY3Rpb247XG4gICAgICAgIHRoaXMubm93ID0gbm93O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY2hlZHVsZXMgYSBmdW5jdGlvbiwgYHdvcmtgLCBmb3IgZXhlY3V0aW9uLiBNYXkgaGFwcGVuIGF0IHNvbWUgcG9pbnQgaW5cbiAgICAgKiB0aGUgZnV0dXJlLCBhY2NvcmRpbmcgdG8gdGhlIGBkZWxheWAgcGFyYW1ldGVyLCBpZiBzcGVjaWZpZWQuIE1heSBiZSBwYXNzZWRcbiAgICAgKiBzb21lIGNvbnRleHQgb2JqZWN0LCBgc3RhdGVgLCB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgYHdvcmtgIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogVGhlIGdpdmVuIGFyZ3VtZW50cyB3aWxsIGJlIHByb2Nlc3NlZCBhbiBzdG9yZWQgYXMgYW4gQWN0aW9uIG9iamVjdCBpbiBhXG4gICAgICogcXVldWUgb2YgYWN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RhdGU6ID9UKTogP1N1YnNjcmlwdGlvbn0gd29yayBBIGZ1bmN0aW9uIHJlcHJlc2VudGluZyBhXG4gICAgICogdGFzaywgb3Igc29tZSB1bml0IG9mIHdvcmsgdG8gYmUgZXhlY3V0ZWQgYnkgdGhlIFNjaGVkdWxlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2RlbGF5XSBUaW1lIHRvIHdhaXQgYmVmb3JlIGV4ZWN1dGluZyB0aGUgd29yaywgd2hlcmUgdGhlXG4gICAgICogdGltZSB1bml0IGlzIGltcGxpY2l0IGFuZCBkZWZpbmVkIGJ5IHRoZSBTY2hlZHVsZXIgaXRzZWxmLlxuICAgICAqIEBwYXJhbSB7VH0gW3N0YXRlXSBTb21lIGNvbnRleHR1YWwgZGF0YSB0aGF0IHRoZSBgd29ya2AgZnVuY3Rpb24gdXNlcyB3aGVuXG4gICAgICogY2FsbGVkIGJ5IHRoZSBTY2hlZHVsZXIuXG4gICAgICogQHJldHVybiB7U3Vic2NyaXB0aW9ufSBBIHN1YnNjcmlwdGlvbiBpbiBvcmRlciB0byBiZSBhYmxlIHRvIHVuc3Vic2NyaWJlXG4gICAgICogdGhlIHNjaGVkdWxlZCB3b3JrLlxuICAgICAqL1xuICAgIFNjaGVkdWxlci5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAod29yaywgZGVsYXksIHN0YXRlKSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gbmV3IHRoaXMuU2NoZWR1bGVyQWN0aW9uKHRoaXMsIHdvcmspLnNjaGVkdWxlKHN0YXRlLCBkZWxheSk7XG4gICAgfTtcbiAgICBTY2hlZHVsZXIubm93ID0gRGF0ZS5ub3cgPyBEYXRlLm5vdyA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICtuZXcgRGF0ZSgpOyB9O1xuICAgIHJldHVybiBTY2hlZHVsZXI7XG59KCkpO1xuZXhwb3J0cy5TY2hlZHVsZXIgPSBTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TY2hlZHVsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBTY2hlZHVsZXJfMSA9IHJlcXVpcmUoJy4uL1NjaGVkdWxlcicpO1xudmFyIEFzeW5jU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXN5bmNTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXN5bmNTY2hlZHVsZXIoKSB7XG4gICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoZSBTY2hlZHVsZXIgaXMgY3VycmVudGx5IGV4ZWN1dGluZyBhIGJhdGNoIG9mXG4gICAgICAgICAqIHF1ZXVlZCBhY3Rpb25zLlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBpbnRlcm5hbCBJRCB1c2VkIHRvIHRyYWNrIHRoZSBsYXRlc3QgYXN5bmNocm9ub3VzIHRhc2sgc3VjaCBhcyB0aG9zZVxuICAgICAgICAgKiBjb21pbmcgZnJvbSBgc2V0VGltZW91dGAsIGBzZXRJbnRlcnZhbGAsIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgLCBhbmRcbiAgICAgICAgICogb3RoZXJzLlxuICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIEFzeW5jU2NoZWR1bGVyLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmIChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpOyAvLyBleGhhdXN0IHRoZSBzY2hlZHVsZXIgcXVldWVcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB3aGlsZSAoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFzeW5jU2NoZWR1bGVyO1xufShTY2hlZHVsZXJfMS5TY2hlZHVsZXIpKTtcbmV4cG9ydHMuQXN5bmNTY2hlZHVsZXIgPSBBc3luY1NjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzeW5jU2NoZWR1bGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEFzeW5jQWN0aW9uXzEgPSByZXF1aXJlKCcuL0FzeW5jQWN0aW9uJyk7XG52YXIgQXN5bmNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoJy4vQXN5bmNTY2hlZHVsZXInKTtcbi8qKlxuICpcbiAqIEFzeW5jIFNjaGVkdWxlclxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5TY2hlZHVsZSB0YXNrIGFzIGlmIHlvdSB1c2VkIHNldFRpbWVvdXQodGFzaywgZHVyYXRpb24pPC9zcGFuPlxuICpcbiAqIGBhc3luY2Agc2NoZWR1bGVyIHNjaGVkdWxlcyB0YXNrcyBhc3luY2hyb25vdXNseSwgYnkgcHV0dGluZyB0aGVtIG9uIHRoZSBKYXZhU2NyaXB0XG4gKiBldmVudCBsb29wIHF1ZXVlLiBJdCBpcyBiZXN0IHVzZWQgdG8gZGVsYXkgdGFza3MgaW4gdGltZSBvciB0byBzY2hlZHVsZSB0YXNrcyByZXBlYXRpbmdcbiAqIGluIGludGVydmFscy5cbiAqXG4gKiBJZiB5b3UganVzdCB3YW50IHRvIFwiZGVmZXJcIiB0YXNrLCB0aGF0IGlzIHRvIHBlcmZvcm0gaXQgcmlnaHQgYWZ0ZXIgY3VycmVudGx5XG4gKiBleGVjdXRpbmcgc3luY2hyb25vdXMgY29kZSBlbmRzIChjb21tb25seSBhY2hpZXZlZCBieSBgc2V0VGltZW91dChkZWZlcnJlZFRhc2ssIDApYCksXG4gKiBiZXR0ZXIgY2hvaWNlIHdpbGwgYmUgdGhlIHtAbGluayBhc2FwfSBzY2hlZHVsZXIuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VXNlIGFzeW5jIHNjaGVkdWxlciB0byBkZWxheSB0YXNrPC9jYXB0aW9uPlxuICogY29uc3QgdGFzayA9ICgpID0+IGNvbnNvbGUubG9nKCdpdCB3b3JrcyEnKTtcbiAqXG4gKiBSeC5TY2hlZHVsZXIuYXN5bmMuc2NoZWR1bGUodGFzaywgMjAwMCk7XG4gKlxuICogLy8gQWZ0ZXIgMiBzZWNvbmRzIGxvZ3M6XG4gKiAvLyBcIml0IHdvcmtzIVwiXG4gKlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlVzZSBhc3luYyBzY2hlZHVsZXIgdG8gcmVwZWF0IHRhc2sgaW4gaW50ZXJ2YWxzPC9jYXB0aW9uPlxuICogZnVuY3Rpb24gdGFzayhzdGF0ZSkge1xuICogICBjb25zb2xlLmxvZyhzdGF0ZSk7XG4gKiAgIHRoaXMuc2NoZWR1bGUoc3RhdGUgKyAxLCAxMDAwKTsgLy8gYHRoaXNgIHJlZmVyZW5jZXMgY3VycmVudGx5IGV4ZWN1dGluZyBBY3Rpb24sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hpY2ggd2UgcmVzY2hlZHVsZSB3aXRoIG5ldyBzdGF0ZSBhbmQgZGVsYXlcbiAqIH1cbiAqXG4gKiBSeC5TY2hlZHVsZXIuYXN5bmMuc2NoZWR1bGUodGFzaywgMzAwMCwgMCk7XG4gKlxuICogLy8gTG9nczpcbiAqIC8vIDAgYWZ0ZXIgM3NcbiAqIC8vIDEgYWZ0ZXIgNHNcbiAqIC8vIDIgYWZ0ZXIgNXNcbiAqIC8vIDMgYWZ0ZXIgNnNcbiAqXG4gKiBAc3RhdGljIHRydWVcbiAqIEBuYW1lIGFzeW5jXG4gKiBAb3duZXIgU2NoZWR1bGVyXG4gKi9cbmV4cG9ydHMuYXN5bmMgPSBuZXcgQXN5bmNTY2hlZHVsZXJfMS5Bc3luY1NjaGVkdWxlcihBc3luY0FjdGlvbl8xLkFzeW5jQWN0aW9uKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzeW5jLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgaXNOdW1lcmljXzEgPSByZXF1aXJlKCcuLi91dGlsL2lzTnVtZXJpYycpO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJy4uL09ic2VydmFibGUnKTtcbnZhciBhc3luY18xID0gcmVxdWlyZSgnLi4vc2NoZWR1bGVyL2FzeW5jJyk7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xudmFyIEludGVydmFsT2JzZXJ2YWJsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEludGVydmFsT2JzZXJ2YWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbnRlcnZhbE9ic2VydmFibGUocGVyaW9kLCBzY2hlZHVsZXIpIHtcbiAgICAgICAgaWYgKHBlcmlvZCA9PT0gdm9pZCAwKSB7IHBlcmlvZCA9IDA7IH1cbiAgICAgICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IGFzeW5jXzEuYXN5bmM7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMucGVyaW9kID0gcGVyaW9kO1xuICAgICAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgaWYgKCFpc051bWVyaWNfMS5pc051bWVyaWMocGVyaW9kKSB8fCBwZXJpb2QgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnBlcmlvZCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzY2hlZHVsZXIgfHwgdHlwZW9mIHNjaGVkdWxlci5zY2hlZHVsZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZXIgPSBhc3luY18xLmFzeW5jO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHNlcXVlbnRpYWwgbnVtYmVycyBldmVyeSBzcGVjaWZpZWRcbiAgICAgKiBpbnRlcnZhbCBvZiB0aW1lLCBvbiBhIHNwZWNpZmllZCBJU2NoZWR1bGVyLlxuICAgICAqXG4gICAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkVtaXRzIGluY3JlbWVudGFsIG51bWJlcnMgcGVyaW9kaWNhbGx5IGluIHRpbWUuXG4gICAgICogPC9zcGFuPlxuICAgICAqXG4gICAgICogPGltZyBzcmM9XCIuL2ltZy9pbnRlcnZhbC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICAgKlxuICAgICAqIGBpbnRlcnZhbGAgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYW4gaW5maW5pdGUgc2VxdWVuY2Ugb2ZcbiAgICAgKiBhc2NlbmRpbmcgaW50ZWdlcnMsIHdpdGggYSBjb25zdGFudCBpbnRlcnZhbCBvZiB0aW1lIG9mIHlvdXIgY2hvb3NpbmdcbiAgICAgKiBiZXR3ZWVuIHRob3NlIGVtaXNzaW9ucy4gVGhlIGZpcnN0IGVtaXNzaW9uIGlzIG5vdCBzZW50IGltbWVkaWF0ZWx5LCBidXRcbiAgICAgKiBvbmx5IGFmdGVyIHRoZSBmaXJzdCBwZXJpb2QgaGFzIHBhc3NlZC4gQnkgZGVmYXVsdCwgdGhpcyBvcGVyYXRvciB1c2VzIHRoZVxuICAgICAqIGBhc3luY2AgSVNjaGVkdWxlciB0byBwcm92aWRlIGEgbm90aW9uIG9mIHRpbWUsIGJ1dCB5b3UgbWF5IHBhc3MgYW55XG4gICAgICogSVNjaGVkdWxlciB0byBpdC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXRzIGFzY2VuZGluZyBudW1iZXJzLCBvbmUgZXZlcnkgc2Vjb25kICgxMDAwbXMpPC9jYXB0aW9uPlxuICAgICAqIHZhciBudW1iZXJzID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAgICAgKiBudW1iZXJzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIHRpbWVyfVxuICAgICAqIEBzZWUge0BsaW5rIGRlbGF5fVxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwZXJpb2Q9MF0gVGhlIGludGVydmFsIHNpemUgaW4gbWlsbGlzZWNvbmRzIChieSBkZWZhdWx0KVxuICAgICAqIG9yIHRoZSB0aW1lIHVuaXQgZGV0ZXJtaW5lZCBieSB0aGUgc2NoZWR1bGVyJ3MgY2xvY2suXG4gICAgICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXI9YXN5bmNdIFRoZSBJU2NoZWR1bGVyIHRvIHVzZSBmb3Igc2NoZWR1bGluZ1xuICAgICAqIHRoZSBlbWlzc2lvbiBvZiB2YWx1ZXMsIGFuZCBwcm92aWRpbmcgYSBub3Rpb24gb2YgXCJ0aW1lXCIuXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGEgc2VxdWVudGlhbCBudW1iZXIgZWFjaCB0aW1lXG4gICAgICogaW50ZXJ2YWwuXG4gICAgICogQHN0YXRpYyB0cnVlXG4gICAgICogQG5hbWUgaW50ZXJ2YWxcbiAgICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIEludGVydmFsT2JzZXJ2YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAocGVyaW9kLCBzY2hlZHVsZXIpIHtcbiAgICAgICAgaWYgKHBlcmlvZCA9PT0gdm9pZCAwKSB7IHBlcmlvZCA9IDA7IH1cbiAgICAgICAgaWYgKHNjaGVkdWxlciA9PT0gdm9pZCAwKSB7IHNjaGVkdWxlciA9IGFzeW5jXzEuYXN5bmM7IH1cbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcnZhbE9ic2VydmFibGUocGVyaW9kLCBzY2hlZHVsZXIpO1xuICAgIH07XG4gICAgSW50ZXJ2YWxPYnNlcnZhYmxlLmRpc3BhdGNoID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHN0YXRlLmluZGV4LCBzdWJzY3JpYmVyID0gc3RhdGUuc3Vic2NyaWJlciwgcGVyaW9kID0gc3RhdGUucGVyaW9kO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoaW5kZXgpO1xuICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5pbmRleCArPSAxO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHN0YXRlLCBwZXJpb2QpO1xuICAgIH07XG4gICAgSW50ZXJ2YWxPYnNlcnZhYmxlLnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgdmFyIHBlcmlvZCA9IHRoaXMucGVyaW9kO1xuICAgICAgICB2YXIgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgICAgIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShJbnRlcnZhbE9ic2VydmFibGUuZGlzcGF0Y2gsIHBlcmlvZCwge1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LCBzdWJzY3JpYmVyOiBzdWJzY3JpYmVyLCBwZXJpb2Q6IHBlcmlvZFxuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICByZXR1cm4gSW50ZXJ2YWxPYnNlcnZhYmxlO1xufShPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSkpO1xuZXhwb3J0cy5JbnRlcnZhbE9ic2VydmFibGUgPSBJbnRlcnZhbE9ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnRlcnZhbE9ic2VydmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgSW50ZXJ2YWxPYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuL0ludGVydmFsT2JzZXJ2YWJsZScpO1xuZXhwb3J0cy5pbnRlcnZhbCA9IEludGVydmFsT2JzZXJ2YWJsZV8xLkludGVydmFsT2JzZXJ2YWJsZS5jcmVhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcnZhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuLi8uLi9PYnNlcnZhYmxlJyk7XG52YXIgaW50ZXJ2YWxfMSA9IHJlcXVpcmUoJy4uLy4uL29ic2VydmFibGUvaW50ZXJ2YWwnKTtcbk9ic2VydmFibGVfMS5PYnNlcnZhYmxlLmludGVydmFsID0gaW50ZXJ2YWxfMS5pbnRlcnZhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVydmFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZSgnLi4vU3Vic2NyaWJlcicpO1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbi8qKlxuICogRmlsdGVyIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGJ5IG9ubHkgZW1pdHRpbmcgdGhvc2UgdGhhdFxuICogc2F0aXNmeSBhIHNwZWNpZmllZCBwcmVkaWNhdGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkxpa2VcbiAqIFtBcnJheS5wcm90b3R5cGUuZmlsdGVyKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZpbHRlciksXG4gKiBpdCBvbmx5IGVtaXRzIGEgdmFsdWUgZnJvbSB0aGUgc291cmNlIGlmIGl0IHBhc3NlcyBhIGNyaXRlcmlvbiBmdW5jdGlvbi48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9maWx0ZXIucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogU2ltaWxhciB0byB0aGUgd2VsbC1rbm93biBgQXJyYXkucHJvdG90eXBlLmZpbHRlcmAgbWV0aG9kLCB0aGlzIG9wZXJhdG9yXG4gKiB0YWtlcyB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIHBhc3NlcyB0aGVtIHRocm91Z2ggYSBgcHJlZGljYXRlYFxuICogZnVuY3Rpb24gYW5kIG9ubHkgZW1pdHMgdGhvc2UgdmFsdWVzIHRoYXQgeWllbGRlZCBgdHJ1ZWAuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBvbmx5IGNsaWNrIGV2ZW50cyB3aG9zZSB0YXJnZXQgd2FzIGEgRElWIGVsZW1lbnQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGNsaWNrc09uRGl2cyA9IGNsaWNrcy5maWx0ZXIoZXYgPT4gZXYudGFyZ2V0LnRhZ05hbWUgPT09ICdESVYnKTtcbiAqIGNsaWNrc09uRGl2cy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgZGlzdGluY3R9XG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdFVudGlsQ2hhbmdlZH1cbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkfVxuICogQHNlZSB7QGxpbmsgaWdub3JlRWxlbWVudHN9XG4gKiBAc2VlIHtAbGluayBwYXJ0aXRpb259XG4gKiBAc2VlIHtAbGluayBza2lwfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiBib29sZWFufSBwcmVkaWNhdGUgQSBmdW5jdGlvbiB0aGF0XG4gKiBldmFsdWF0ZXMgZWFjaCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgaXQgcmV0dXJucyBgdHJ1ZWAsXG4gKiB0aGUgdmFsdWUgaXMgZW1pdHRlZCwgaWYgYGZhbHNlYCB0aGUgdmFsdWUgaXMgbm90IHBhc3NlZCB0byB0aGUgb3V0cHV0XG4gKiBPYnNlcnZhYmxlLiBUaGUgYGluZGV4YCBwYXJhbWV0ZXIgaXMgdGhlIG51bWJlciBgaWAgZm9yIHRoZSBpLXRoIHNvdXJjZVxuICogZW1pc3Npb24gdGhhdCBoYXMgaGFwcGVuZWQgc2luY2UgdGhlIHN1YnNjcmlwdGlvbiwgc3RhcnRpbmcgZnJvbSB0aGUgbnVtYmVyXG4gKiBgMGAuXG4gKiBAcGFyYW0ge2FueX0gW3RoaXNBcmddIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIGRldGVybWluZSB0aGUgdmFsdWUgb2YgYHRoaXNgXG4gKiBpbiB0aGUgYHByZWRpY2F0ZWAgZnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIG9mIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgdGhhdCB3ZXJlXG4gKiBhbGxvd2VkIGJ5IHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbi5cbiAqIEBtZXRob2QgZmlsdGVyXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5mdW5jdGlvbiBmaWx0ZXIocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZpbHRlck9wZXJhdG9yRnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UubGlmdChuZXcgRmlsdGVyT3BlcmF0b3IocHJlZGljYXRlLCB0aGlzQXJnKSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuZmlsdGVyID0gZmlsdGVyO1xudmFyIEZpbHRlck9wZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGaWx0ZXJPcGVyYXRvcihwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICAgICAgdGhpcy5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgfVxuICAgIEZpbHRlck9wZXJhdG9yLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgRmlsdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnByZWRpY2F0ZSwgdGhpcy50aGlzQXJnKSk7XG4gICAgfTtcbiAgICByZXR1cm4gRmlsdGVyT3BlcmF0b3I7XG59KCkpO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbnZhciBGaWx0ZXJTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRmlsdGVyU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGaWx0ZXJTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgZGVzdGluYXRpb24pO1xuICAgICAgICB0aGlzLnByZWRpY2F0ZSA9IHByZWRpY2F0ZTtcbiAgICAgICAgdGhpcy50aGlzQXJnID0gdGhpc0FyZztcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgfVxuICAgIC8vIHRoZSB0cnkgY2F0Y2ggYmxvY2sgYmVsb3cgaXMgbGVmdCBzcGVjaWZpY2FsbHkgZm9yXG4gICAgLy8gb3B0aW1pemF0aW9uIGFuZCBwZXJmIHJlYXNvbnMuIGEgdHJ5Q2F0Y2hlciBpcyBub3QgbmVjZXNzYXJ5IGhlcmUuXG4gICAgRmlsdGVyU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJlZGljYXRlLmNhbGwodGhpcy50aGlzQXJnLCB2YWx1ZSwgdGhpcy5jb3VudCsrKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEZpbHRlclN1YnNjcmliZXI7XG59KFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWx0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZmlsdGVyXzEgPSByZXF1aXJlKCcuLi9vcGVyYXRvcnMvZmlsdGVyJyk7XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBGaWx0ZXIgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYnkgb25seSBlbWl0dGluZyB0aG9zZSB0aGF0XG4gKiBzYXRpc2Z5IGEgc3BlY2lmaWVkIHByZWRpY2F0ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TGlrZVxuICogW0FycmF5LnByb3RvdHlwZS5maWx0ZXIoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyKSxcbiAqIGl0IG9ubHkgZW1pdHMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgaWYgaXQgcGFzc2VzIGEgY3JpdGVyaW9uIGZ1bmN0aW9uLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2ZpbHRlci5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBTaW1pbGFyIHRvIHRoZSB3ZWxsLWtub3duIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2QsIHRoaXMgb3BlcmF0b3JcbiAqIHRha2VzIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgcGFzc2VzIHRoZW0gdGhyb3VnaCBhIGBwcmVkaWNhdGVgXG4gKiBmdW5jdGlvbiBhbmQgb25seSBlbWl0cyB0aG9zZSB2YWx1ZXMgdGhhdCB5aWVsZGVkIGB0cnVlYC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IG9ubHkgY2xpY2sgZXZlbnRzIHdob3NlIHRhcmdldCB3YXMgYSBESVYgZWxlbWVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgY2xpY2tzT25EaXZzID0gY2xpY2tzLmZpbHRlcihldiA9PiBldi50YXJnZXQudGFnTmFtZSA9PT0gJ0RJVicpO1xuICogY2xpY2tzT25EaXZzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdH1cbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0VW50aWxDaGFuZ2VkfVxuICogQHNlZSB7QGxpbmsgZGlzdGluY3RVbnRpbEtleUNoYW5nZWR9XG4gKiBAc2VlIHtAbGluayBpZ25vcmVFbGVtZW50c31cbiAqIEBzZWUge0BsaW5rIHBhcnRpdGlvbn1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW59IHByZWRpY2F0ZSBBIGZ1bmN0aW9uIHRoYXRcbiAqIGV2YWx1YXRlcyBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBJZiBpdCByZXR1cm5zIGB0cnVlYCxcbiAqIHRoZSB2YWx1ZSBpcyBlbWl0dGVkLCBpZiBgZmFsc2VgIHRoZSB2YWx1ZSBpcyBub3QgcGFzc2VkIHRvIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUuIFRoZSBgaW5kZXhgIHBhcmFtZXRlciBpcyB0aGUgbnVtYmVyIGBpYCBmb3IgdGhlIGktdGggc291cmNlXG4gKiBlbWlzc2lvbiB0aGF0IGhhcyBoYXBwZW5lZCBzaW5jZSB0aGUgc3Vic2NyaXB0aW9uLCBzdGFydGluZyBmcm9tIHRoZSBudW1iZXJcbiAqIGAwYC5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gZGV0ZXJtaW5lIHRoZSB2YWx1ZSBvZiBgdGhpc2BcbiAqIGluIHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSB0aGF0IHdlcmVcbiAqIGFsbG93ZWQgYnkgdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLlxuICogQG1ldGhvZCBmaWx0ZXJcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gZmlsdGVyXzEuZmlsdGVyKHByZWRpY2F0ZSwgdGhpc0FyZykodGhpcyk7XG59XG5leHBvcnRzLmZpbHRlciA9IGZpbHRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuLi8uLi9PYnNlcnZhYmxlJyk7XG52YXIgZmlsdGVyXzEgPSByZXF1aXJlKCcuLi8uLi9vcGVyYXRvci9maWx0ZXInKTtcbk9ic2VydmFibGVfMS5PYnNlcnZhYmxlLnByb3RvdHlwZS5maWx0ZXIgPSBmaWx0ZXJfMS5maWx0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWx0ZXIuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBMb2dnaW5nRXZlbnQgfSBmcm9tICcuLi9tb2RlbHMvbG9nLWV2ZW50JztcbmltcG9ydCB7IEFwcGVuZGVyIH0gZnJvbSAnLi4vYXBwZW5kZXJzL2FwcGVuZGVyJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9pbnRlcnZhbCc7XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExvZ1dyaXRlciB7XG4gICAgICBwcm90ZWN0ZWQgYXBwZW5kZXJzOiBNYXA8c3RyaW5nLCBBcHBlbmRlcj4gPSBuZXcgTWFwKCk7XG4gICAgICBhYnN0cmFjdCBhZGRMb2dFbnRyeShsb2dFdmVudDogTG9nZ2luZ0V2ZW50KTogdm9pZDtcbiAgICAgIGFkZEFwcGVuZGVyKGFwcGVuZGVyOiBBcHBlbmRlcik6IHZvaWQge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFwcGVuZGVycy5oYXMoYXBwZW5kZXIubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kZXJzLnNldChhcHBlbmRlci5uYW1lLCBhcHBlbmRlcik7XG4gICAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdGF0aWMgZ2V0SW1tZWRpYXRlTG9nV3JpdGVyKCk6IExvZ1dyaXRlciB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEltbWVkaWF0ZUxvZ1dyaXRlcigpO1xuICAgICAgfVxuICAgICAgc3RhdGljIGdldERlZmZlcnJlZFdyaXRlcihkZWxheTogbnVtYmVyKTogTG9nV3JpdGVyIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGVmZmVycmVkTG9nZ2VyKGRlbGF5KTtcbiAgICAgIH1cbn1cblxuY2xhc3MgSW1tZWRpYXRlTG9nV3JpdGVyIGV4dGVuZHMgTG9nV3JpdGVyIHtcblxuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgfVxuXG4gICAgICBhZGRMb2dFbnRyeShsb2dFdmVudDogTG9nZ2luZ0V2ZW50KTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZGVycy5mb3JFYWNoKChhcHBlbmRlciwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICBhcHBlbmRlci53cml0ZUxvZyhsb2dFdmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH1cbn1cblxuY2xhc3MgRGVmZmVycmVkTG9nZ2VyIGV4dGVuZHMgTG9nV3JpdGVyIHtcbiAgICAgIHByaXZhdGUgbG9nRXZlbnRzOiBMb2dnaW5nRXZlbnRbXSA9IFtdO1xuICAgICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWxheTogbnVtYmVyKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgT2JzZXJ2YWJsZS5pbnRlcnZhbChkZWxheSlcbiAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKCkgPT4gdGhpcy5sb2dFdmVudHMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy53cml0ZUV2ZW50cy5iaW5kKHRoaXMpKTtcbiAgICAgIH1cbiAgICAgIGFkZExvZ0VudHJ5KGxvZ0V2ZW50OiBMb2dnaW5nRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAgICAgdGhpcy5sb2dFdmVudHMucHVzaChsb2dFdmVudCk7XG4gICAgICB9XG4gICAgICBwcml2YXRlIHdyaXRlRXZlbnRzKCkge1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRlcnMuZm9yRWFjaCgoYXBwZW5kZXIsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgYXBwZW5kZXIud3JpdGVMb2dzKHRoaXMubG9nRXZlbnRzKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9nRXZlbnRzID0gW107XG4gICAgICAgICAgICB9KTtcbiAgICAgIH1cbn1cbiIsImltcG9ydCB7IEFwcGVuZGVyUmVwb3NpdG9yeSwgQXBwZW5kZXIgfSBmcm9tICcuLi9hcHBlbmRlcnMvaW5kZXgnO1xuaW1wb3J0IHsgTG9nTGV2ZWwsIExvZ09wdGlvbnMsIExvZ2dlclN0YXRpY0luZm8gfSBmcm9tIFwiLi4vLi4vZml0LWxvZ2dlci1jb3JlL2luZGV4XCI7XG5pbXBvcnQgeyBMb2dnaW5nRXZlbnQgfSBmcm9tICcuLi9tb2RlbHMvbG9nLWV2ZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvaW50ZXJ2YWwnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anMvU3Vic2NyaXB0aW9uXCI7XG5pbXBvcnQgeyBMb2dXcml0ZXIgfSBmcm9tICcuL2xvZy53cml0ZXInO1xuXG5cbmV4cG9ydCBjbGFzcyBMb2dnaW5nQ29udHJvbGxlciB7XG4gICAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2UgPSBuZXcgTG9nZ2luZ0NvbnRyb2xsZXIoKTtcbiAgICAgIHByaXZhdGUgaW1tZWRXcml0ZXIgPSBMb2dXcml0ZXIuZ2V0SW1tZWRpYXRlTG9nV3JpdGVyKCk7XG4gICAgICBwcml2YXRlIGRlZkxvZ1dyaXRlcjogTG9nV3JpdGVyO1xuICAgICAgcHJpdmF0ZSBfc3RhdGljSW5mbzogTG9nZ2VyU3RhdGljSW5mbyA9IHsgYXBwTmFtZTogXCJcIiB9O1xuICAgICAgcHJpdmF0ZSBfbG9nT3B0aW9uczogTG9nT3B0aW9ucztcblxuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBpZiAoTG9nZ2luZ0NvbnRyb2xsZXIuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogSW5zdGFudGlhdGlvbiBmYWlsZWQ6IFVzZSBMb2dnaW5nU3RvcmUuaW5zdGFuY2UgaW5zdGVhZCBvZiBuZXcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTG9nZ2luZ0NvbnRyb2xsZXIuX2luc3RhbmNlID0gdGhpcztcbiAgICAgIH1cblxuICAgICAgcHVibGljIGluaXRpYWxpemUobG9nZ2VyU3RhdGljSW5mbzogTG9nZ2VyU3RhdGljSW5mbywgb3B0aW9ucz86IExvZ09wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZVN0YXRpY0luZm8obG9nZ2VyU3RhdGljSW5mbyk7XG4gICAgICAgICAgICB0aGlzLl9sb2dPcHRpb25zID0gb3B0aW9ucyB8fCB0aGlzLl9sb2dPcHRpb25zIHx8IHRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuX2xvZ09wdGlvbnMuYXBwZW5kZXJzLmZvckVhY2goYXBwZW5kZXJPcHRpb25zID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChhcHBlbmRlck9wdGlvbnMuaXNEZWZmZXJyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFwcGVuZGVyID0gQXBwZW5kZXJSZXBvc2l0b3J5Lmluc3RhbmNlLmdldEFwcGVuZGVyKGFwcGVuZGVyT3B0aW9ucy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5fbG9nT3B0aW9ucy5sb2dJbnRlcnZhbCB8fCAxMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmTG9nV3JpdGVyID0gdGhpcy5kZWZMb2dXcml0ZXIgfHwgTG9nV3JpdGVyLmdldERlZmZlcnJlZFdyaXRlcihkZWxheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRlci51cGRhdGUoYXBwZW5kZXJPcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmTG9nV3JpdGVyLmFkZEFwcGVuZGVyKGFwcGVuZGVyKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcHBlbmRlciA9IEFwcGVuZGVyUmVwb3NpdG9yeS5pbnN0YW5jZS5nZXRBcHBlbmRlcihhcHBlbmRlck9wdGlvbnMubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRlci51cGRhdGUoYXBwZW5kZXJPcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW1tZWRXcml0ZXIuYWRkQXBwZW5kZXIoYXBwZW5kZXIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICAgIHB1YmxpYyBlbnF1ZXVlKGxvZ0V2ZW50OiBMb2dnaW5nRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgICAgIGxvZ0V2ZW50LmFwcE5hbWUgPSB0aGlzLl9zdGF0aWNJbmZvLmFwcE5hbWU7XG4gICAgICAgICAgICBsb2dFdmVudC51c2VyID0gdGhpcy5fc3RhdGljSW5mby51c2VyO1xuICAgICAgICAgICAgbG9nRXZlbnQucmVnaW9uID0gdGhpcy5fc3RhdGljSW5mby5yZWdpb247XG4gICAgICAgICAgICBsb2dFdmVudC5lbnYgPSB0aGlzLl9zdGF0aWNJbmZvLmVudjtcblxuICAgICAgICAgICAgdGhpcy5pbW1lZFdyaXRlci5hZGRMb2dFbnRyeShsb2dFdmVudCk7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWZMb2dXcml0ZXIpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGVmTG9nV3JpdGVyLmFkZExvZ0VudHJ5KGxvZ0V2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJpdmF0ZSByZXNvbHZlU3RhdGljSW5mbyhzdGF0aWNJbmZvOiBMb2dnZXJTdGF0aWNJbmZvKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0aWNJbmZvLmFwcE5hbWUgPSB0aGlzLl9zdGF0aWNJbmZvLmFwcE5hbWUgfHwgc3RhdGljSW5mby5hcHBOYW1lO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGljSW5mby51c2VyID0gdGhpcy5fc3RhdGljSW5mby51c2VyIHx8IHN0YXRpY0luZm8udXNlcjtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpY0luZm8uZW52ID0gdGhpcy5fc3RhdGljSW5mby5lbnYgfHwgc3RhdGljSW5mby5lbnY7XG4gICAgICAgICAgICB0aGlzLl9zdGF0aWNJbmZvLnJlZ2lvbiA9IHRoaXMuX3N0YXRpY0luZm8ucmVnaW9uIHx8IHN0YXRpY0luZm8ucmVnaW9uO1xuICAgICAgfVxuICAgICAgcHJpdmF0ZSBnZXREZWZhdWx0T3B0aW9ucygpOiBMb2dPcHRpb25zIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBhcHBMb2dMZXZlbDogTG9nTGV2ZWwuQUxMLFxuICAgICAgICAgICAgICAgICAgbG9nSW50ZXJ2YWw6IDEwMDAwLFxuICAgICAgICAgICAgICAgICAgYXBwZW5kZXJzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NvbnNvbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dMZXZlbDogTG9nTGV2ZWwuQUxMXG4gICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHN0YXRpYyBnZXQgaW5zdGFuY2UoKTogTG9nZ2luZ0NvbnRyb2xsZXIge1xuICAgICAgICAgICAgcmV0dXJuIExvZ2dpbmdDb250cm9sbGVyLl9pbnN0YW5jZTtcbiAgICAgIH1cbn1cbiIsImltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSAnLi4vLi4vZml0LWxvZ2dlci1jb3JlL2luZGV4JztcblxuXG5leHBvcnQgY2xhc3MgTG9nZ2luZ0V2ZW50IHtcbiAgYXBwTmFtZSA6IHN0cmluZztcbiAgdXNlcjogc3RyaW5nO1xuICByZWdpb24gOiBzdHJpbmc7XG4gIGVudiA6IHN0cmluZztcbiAgbmFtZSA6IHN0cmluZztcbiAgZ3JvdXBOYW1lIDogc3RyaW5nO1xuICB0aW1lc3RhbXAgOiBudW1iZXI7XG4gIGxldmVsIDogTG9nTGV2ZWw7XG4gIG1lc3NhZ2U6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IEFwcGxpY2F0aW9uTG9nZ2VyLCBMb2dMZXZlbCB9IGZyb20gJy4uLy4uL2ZpdC1sb2dnZXItY29yZS9pbmRleCc7XG5pbXBvcnQgeyBMb2dnaW5nRXZlbnQgfSBmcm9tICcuLi9tb2RlbHMvbG9nLWV2ZW50JztcbmltcG9ydCB7IExvZ2dpbmdDb250cm9sbGVyIH0gZnJvbSAnLi4vbG9nd3JpdGVycy9sb2dnaW5nLmNvbnRyb2xsZXInO1xuXG5cbmV4cG9ydCBjbGFzcyBMb2dnZXIgaW1wbGVtZW50cyBBcHBsaWNhdGlvbkxvZ2dlciB7XG4gIHByaXZhdGUgbW9kdWxlTG9nTGV2ZWw6IExvZ0xldmVsO1xuICBwcml2YXRlIHRpbWVyID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvZ2dlck5hbWU6IHN0cmluZywgcHJpdmF0ZSBsZXZlbD86IExvZ0xldmVsKSB7XG4gICAgdGhpcy5tb2R1bGVMb2dMZXZlbCA9IGxldmVsID8gbGV2ZWwgOiBMb2dMZXZlbC5BTEw7XG4gIH1cblxuICBsb2cobGV2ZWw6IExvZ0xldmVsLCBwYXJhbXM6IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKGxldmVsID49IHRoaXMubW9kdWxlTG9nTGV2ZWwpIHtcbiAgICAgIHRoaXMuYnVpbGRMb2dnaW5nRXZlbnQobGV2ZWwsIHBhcmFtcyk7XG4gICAgfVxuICB9XG4gIHRyYWNlKC4uLm1lc3NhZ2VzOiBhbnlbXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZHVsZUxvZ0xldmVsID49IExvZ0xldmVsLlRSQUNFKSB7XG4gICAgICB0aGlzLmJ1aWxkTG9nZ2luZ0V2ZW50KExvZ0xldmVsLlRSQUNFLCBtZXNzYWdlcyk7XG4gICAgfVxuICB9XG4gIGRlYnVnKC4uLm1lc3NhZ2VzOiBhbnlbXSk6IHZvaWQge1xuICAgIGlmIChMb2dMZXZlbC5ERUJVRyA+PSB0aGlzLm1vZHVsZUxvZ0xldmVsKSB7XG4gICAgICB0aGlzLmJ1aWxkTG9nZ2luZ0V2ZW50KExvZ0xldmVsLkRFQlVHLCBtZXNzYWdlcyk7XG4gICAgfVxuICB9XG4gIGluZm8oLi4ubWVzc2FnZXM6IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKExvZ0xldmVsLklORk8gPj0gdGhpcy5tb2R1bGVMb2dMZXZlbCkge1xuICAgICAgdGhpcy5idWlsZExvZ2dpbmdFdmVudChMb2dMZXZlbC5JTkZPLCBtZXNzYWdlcyk7XG4gICAgfVxuICB9XG4gIHdhcm4oLi4ubWVzc2FnZXM6IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKExvZ0xldmVsLldBUk4gPj0gdGhpcy5tb2R1bGVMb2dMZXZlbCkge1xuICAgICAgdGhpcy5idWlsZExvZ2dpbmdFdmVudChMb2dMZXZlbC5XQVJOLCBtZXNzYWdlcyk7XG4gICAgfVxuICB9XG4gIGVycm9yKC4uLm1lc3NhZ2VzOiBhbnlbXSk6IHZvaWQge1xuICAgIGlmIChMb2dMZXZlbC5FUlJPUiA+PSB0aGlzLm1vZHVsZUxvZ0xldmVsKSB7XG4gICAgICB0aGlzLmJ1aWxkTG9nZ2luZ0V2ZW50KExvZ0xldmVsLkVSUk9SLCBtZXNzYWdlcyk7XG4gICAgfVxuICB9XG4gIGZhdGFsKC4uLm1lc3NhZ2VzOiBhbnlbXSk6IHZvaWQge1xuICAgIGlmIChMb2dMZXZlbC5GQVRBTCA+PSB0aGlzLm1vZHVsZUxvZ0xldmVsKSB7XG4gICAgICB0aGlzLmJ1aWxkTG9nZ2luZ0V2ZW50KExvZ0xldmVsLkZBVEFMLCBtZXNzYWdlcyk7XG4gICAgfVxuICB9XG4gIGdyb3VwKG5hbWU6IHN0cmluZywgaW5pdGlhbGx5RXhwYW5kZWQ/OiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gdGhpcy5idWlsZExvZ2dpbmdFdmVudChMb2dMZXZlbC5UUkFDRSx1bmRlZmluZWQsbWVzc2FnZXMpO1xuICB9XG4gIGdyb3VwRW5kKCk6IHZvaWQge1xuICAgIC8vIHRoaXMuYnVpbGRMb2dnaW5nRXZlbnQoTG9nTGV2ZWwuVFJBQ0UsdW5kZWZpbmVkLG1lc3NhZ2VzKTtcbiAgfVxuICB0aW1lKG5hbWU6IHN0cmluZywgbGV2ZWw/OiBMb2dMZXZlbCk6IHZvaWQge1xuICAgIGlmIChMb2dMZXZlbC5JTkZPID49IHRoaXMubW9kdWxlTG9nTGV2ZWwpIHtcbiAgICAgIGlmICghdGhpcy50aW1lci5oYXMobmFtZSkpIHtcbiAgICAgICAgdGhpcy50aW1lci5zZXQobmFtZSwgRGF0ZS5ub3coKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHRpbWVFbmQobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKExvZ0xldmVsLklORk8gPj0gdGhpcy5tb2R1bGVMb2dMZXZlbCkge1xuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gdGhpcy50aW1lci5nZXQobmFtZSk7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYFRpbWUgdGFrZW4gYnkgWyR7bmFtZX1dIDogJHsoRGF0ZS5ub3coKS1zdGFydFRpbWUpLzEwMDB9IHNlY29uZHNgO1xuICAgICAgdGhpcy50aW1lci5kZWxldGUobmFtZSk7XG4gICAgICB0aGlzLmJ1aWxkTG9nZ2luZ0V2ZW50KExvZ0xldmVsLklORk8sICBbbWVzc2FnZV0pO1xuICAgIH1cbiAgfVxuICBhc3NlcnQoZXhwcjogYW55KTogdm9pZCB7XG4gICAgLy8gdGhpcy5idWlsZExvZ2dpbmdFdmVudChMb2dMZXZlbC5UUkFDRSx1bmRlZmluZWQsbWVzc2FnZXMpO1xuICB9XG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9nZ2VyTmFtZTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBidWlsZExvZ2dpbmdFdmVudChsZXZlbDogTG9nTGV2ZWwsIG1lc3NhZ2VzOiBhbnlbXSkge1xuICAgIGNvbnN0IGxvZ2dpbmdFdmVudCA9IG5ldyBMb2dnaW5nRXZlbnQoKTtcbiAgICBsb2dnaW5nRXZlbnQubmFtZSA9IHRoaXMubmFtZTtcbiAgICBsb2dnaW5nRXZlbnQubGV2ZWwgPSBsZXZlbDtcbiAgICBsb2dnaW5nRXZlbnQudGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBsb2dnaW5nRXZlbnQubWVzc2FnZSA9IHRoaXMuYnVpbGRNZXNzYWdlKG1lc3NhZ2VzKTtcbiAgICBMb2dnaW5nQ29udHJvbGxlci5pbnN0YW5jZS5lbnF1ZXVlKGxvZ2dpbmdFdmVudCk7XG4gIH1cbiAgcHJpdmF0ZSBidWlsZE1lc3NhZ2UobWVzc2FnZXM6IGFueVtdKTogc3RyaW5nIHtcbiAgICBsZXQgbWVzc2FnZSA9IFwiXCI7XG4gICAgbWVzc2FnZXMuZm9yRWFjaChtc2c9PiB7XG4gICAgICBpZihtc2cgaW5zdGFuY2VvZiAgRXJyb3IpIHtcbiAgICAgICAgbWVzc2FnZSArPSBgJHttc2cuc3RhY2t9LCBgO1xuICAgICAgfSBlbHNlIGlmKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgbWVzc2FnZSArPSBgJHtKU09OLnN0cmluZ2lmeShtc2cpfSwgYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCR7bXNnfSwgYDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWVzc2FnZS5sZW5ndGggPiAwID8gbWVzc2FnZS5zbGljZSgwLG1lc3NhZ2UubGVuZ3RoLTIpIDogXCJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTG9nZ2VyU3RhdGljSW5mbywgTG9nT3B0aW9ucywgTG9nTGV2ZWwgfSBmcm9tIFwiLi4vZml0LWxvZ2dlci1jb3JlL2xvZ2dpbmcubW9kZWxzXCI7XG5pbXBvcnQgeyBMb2dnaW5nQ29udHJvbGxlciB9IGZyb20gXCIuL2xvZ3dyaXRlcnMvbG9nZ2luZy5jb250cm9sbGVyXCI7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbkxvZ2dlciB9IGZyb20gXCIuLi9maXQtbG9nZ2VyLWNvcmUvaW5kZXhcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuL2xvZ3dyaXRlcnMvYXBwLmxvZ2dlclwiO1xuXG4vLyBpbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLy4uL2xvZ3dyaXRlcnMvYXBwLmxvZ2dlcic7XG4vLyBpbXBvcnQgeyBMb2dMZXZlbCwgQXBwbGljYXRpb25Mb2dnZXIgfSBmcm9tICcuLi9maXQtbG9nZ2VyLWNvcmUvaW5kZXgnO1xuXG5cblxuXG5leHBvcnQgY2xhc3MgRml0V29ya2VyTG9nZ2VyU2VydmljZSB7XG4gIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZSA9IG5ldyBGaXRXb3JrZXJMb2dnZXJTZXJ2aWNlKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKEZpdFdvcmtlckxvZ2dlclNlcnZpY2UuX2luc3RhbmNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogSW5zdGFudGlhdGlvbiBmYWlsZWQ6IFVzZSBGaXRXb3JrZXJMb2dnZXJTZXJ2aWNlLmluc3RhbmNlIGluc3RlYWQgb2YgbmV3LlwiKTtcbiAgICB9XG4gICAgRml0V29ya2VyTG9nZ2VyU2VydmljZS5faW5zdGFuY2UgPSB0aGlzO1xuICB9XG4gIHB1YmxpYyBpbml0KGxvZ2dlclN0YXRpY0luZm86IExvZ2dlclN0YXRpY0luZm8sIG9wdGlvbnM/OiBMb2dPcHRpb25zKSB7XG4gICAgTG9nZ2luZ0NvbnRyb2xsZXIuaW5zdGFuY2UuaW5pdGlhbGl6ZShsb2dnZXJTdGF0aWNJbmZvLG9wdGlvbnMpO1xuICB9XG4gIGdldExvZ2dlcihuYW1lOiBzdHJpbmcsIGxldmVsPzogTG9nTGV2ZWwpIDogQXBwbGljYXRpb25Mb2dnZXIge1xuICAgIHJldHVybiBuZXcgTG9nZ2VyKG5hbWUsIGxldmVsKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgaW5zdGFuY2UoKTogRml0V29ya2VyTG9nZ2VyU2VydmljZSB7XG4gICAgcmV0dXJuIEZpdFdvcmtlckxvZ2dlclNlcnZpY2UuX2luc3RhbmNlO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IFdvcmtlck1lc3NhZ2UsIFdvcmtlck1lc3NhZ2VUeXBlcywgV29ya2VyTWVzc2FnZUJ1aWxkZXIsQnJva2VyQ29uZmlnLCBXb3JrZXJDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnLW1vZGVscy9pbmRleFwiO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCJyeGpzL1N1YmplY3RcIjtcbmltcG9ydCB7IEZpdFdvcmtlckxvZ2dlclNlcnZpY2UgfSBmcm9tIFwiLi4vZml0LWxvZ2dlci9maXQtd29ya2VyLWxvZ2dlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbkxvZ2dlciB9IGZyb20gXCIuLi9maXQtbG9nZ2VyLWNvcmUvaW5kZXhcIjtcblxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJyb2tlciB7XG5cbiAgLy8jcmVnaW9uIFN0YXRpYyBNZW1iZXJzXG4gIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTWVzc2FnZUJyb2tlciA9IG5ldyBNZXNzYWdlQnJva2VyKCk7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmIChNZXNzYWdlQnJva2VyLl9pbnN0YW5jZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IEluc3RhbnRpYXRpb24gZmFpbGVkOiBVc2UgTWVzc2FnZUJyb2tlci5pbnN0YW5jZSBpbnN0ZWFkIG9mIG5ldy5cIik7XG4gICAgfVxuICAgIE1lc3NhZ2VCcm9rZXIuX2luc3RhbmNlID0gdGhpcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgaW5zdGFuY2UoKTogTWVzc2FnZUJyb2tlciB7XG4gICAgcmV0dXJuIE1lc3NhZ2VCcm9rZXIuX2luc3RhbmNlO1xuICB9XG4gIC8vI2VuZHJlZ2lvblxuXG4gIC8vI3JlZ2lvbiBQcml2YXRlL1B1YmxpYyBNZW1iZXJzXG4gIHByaXZhdGUgaW5Cb3hNZXNzYWdlTm90aWZpZXIgPSBuZXcgU3ViamVjdDxXb3JrZXJNZXNzYWdlPigpO1xuICBwdWJsaWMgaW5Cb3gkID0gdGhpcy5pbkJveE1lc3NhZ2VOb3RpZmllci5hc09ic2VydmFibGUoKTtcbiAgcHJpdmF0ZSBjb250ZXh0cyA9IG5ldyBNYXA8c3RyaW5nLCBCcm9rZXJDb25maWc+KCk7XG4gIHByaXZhdGUgbG9nZ2VyIDogYW55ID0gY29uc29sZTtcbiAgLy8jZW5kcmVnaW9uXG5cbiAgLy8jcmVnaW9uIFB1YmxpYyBNZXRob2RzXG4gIG9uTWVzc2FnZSh3b3JrZXJNZXNzYWdlOiBXb3JrZXJNZXNzYWdlLCBjb250ZXh0OiBhbnkpIHtcbiAgICBzd2l0Y2ggKHdvcmtlck1lc3NhZ2UudHlwZSkge1xuICAgICAgY2FzZSBXb3JrZXJNZXNzYWdlVHlwZXMuQ09OTkVDVF9XT1JLRVI6XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKCdXb3JrZXIgY29ubmVjdGlvbiByZXF1ZXN0IHJlY2VpdmVkJyk7XG4gICAgICB0aGlzLnBvc3RNZXNzYWdlKFdvcmtlck1lc3NhZ2VCdWlsZGVyLmJ1aWxkKFdvcmtlck1lc3NhZ2VUeXBlcy5DT05ORUNUX1dPUktFUl9TVUNDRVNTKSwgY29udGV4dCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBXb3JrZXJNZXNzYWdlVHlwZXMuU0VUX1dPUktFUl9DT05GSUc6XG4gICAgICAgIHRoaXMub25TZXRDb25maWdSZXF1ZXN0UmVjZWl2ZWQod29ya2VyTWVzc2FnZSxjb250ZXh0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmluQm94TWVzc2FnZU5vdGlmaWVyLm5leHQod29ya2VyTWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBwb3N0TWVzc2FnZSh3b3JrZXJNZXNzYWdlOiBXb3JrZXJNZXNzYWdlLCBjb250ZXh0PzogYW55LCBzZW5kVG9BbGw/OiBib29sZWFuKSB7XG4gICAgaWYoIXNlbmRUb0FsbCkge1xuICAgICAgY29udGV4dC5wb3N0TWVzc2FnZSh3b3JrZXJNZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0cy5mb3JFYWNoKHZhbHVlPT57XG4gICAgICAgIHZhbHVlLmNvbnRleHQucG9zdE1lc3NhZ2Uod29ya2VyTWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLy8jZW5kcmVnaW9uXG5cbiAgLy8jcmVnaW9uIEhlbHBlciBNZXRob2RzXG4gIHByaXZhdGUgb25TZXRDb25maWdSZXF1ZXN0UmVjZWl2ZWQod29ya2VyTWVzc2FnZTogV29ya2VyTWVzc2FnZSwgY29udGV4dD86IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSA8V29ya2VyQ29uZmlnPndvcmtlck1lc3NhZ2UucGF5bG9hZDtcbiAgICBpZihjb250ZXh0ICYmIHBheWxvYWQpIHtcbiAgICAgIGlmKHBheWxvYWQud29ya2VySW5mbyAmJiBwYXlsb2FkLndvcmtlckluZm8ubmFtZSAmJiBwYXlsb2FkLmxvZ2dpbmdBcHBJbmZvLmFwcE5hbWUpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7cGF5bG9hZC53b3JrZXJJbmZvLm5hbWV9LSR7cGF5bG9hZC5sb2dnaW5nQXBwSW5mby5hcHBOYW1lfWA7XG4gICAgICAgIGNvbnN0IGJyb2tlckNvbmZpZyA6IEJyb2tlckNvbmZpZyA9IHsgd29ya2VyQ29uZmlnIDogcGF5bG9hZCwgY29udGV4dCB9O1xuICAgICAgICB0aGlzLmNvbnRleHRzLnNldChrZXksYnJva2VyQ29uZmlnKTtcbiAgICAgICAgcGF5bG9hZC5sb2dnaW5nQXBwSW5mby5hcHBOYW1lID0gYCR7cGF5bG9hZC53b3JrZXJJbmZvLm5hbWV9LSR7cGF5bG9hZC53b3JrZXJJbmZvLnR5cGV9LSR7cGF5bG9hZC5sb2dnaW5nQXBwSW5mby5hcHBOYW1lfWA7XG4gICAgICAgIEZpdFdvcmtlckxvZ2dlclNlcnZpY2UuaW5zdGFuY2UuaW5pdChwYXlsb2FkLmxvZ2dpbmdBcHBJbmZvLHBheWxvYWQubG9nT3B0aW9ucyk7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gRml0V29ya2VyTG9nZ2VyU2VydmljZS5pbnN0YW5jZS5nZXRMb2dnZXIoJ01lc3NhZ2VCcm9rZXInKTtcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZShXb3JrZXJNZXNzYWdlQnVpbGRlci5idWlsZChXb3JrZXJNZXNzYWdlVHlwZXMuV09SS0VSX1JFQURZKSwgY29udGV4dCk7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ1dvcmtlciBjb25maWd1cmF0aW9uIGhhcyBiZWVuIHNldCBzdWNjZXNzZnVsbHkuJywgcGF5bG9hZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wb3N0TWVzc2FnZShXb3JrZXJNZXNzYWdlQnVpbGRlci5idWlsZChXb3JrZXJNZXNzYWdlVHlwZXMuU0VUX1dPUktFUl9DT05GSUdfRkFJTEVELCAnSW5Db21wbGV0ZSB3b3JrZXIgY29uZmlndXJhdGlvbicpLCBjb250ZXh0KTtcbiAgfVxuXG4gIC8vI2VuZHJlZ2lvblxufVxuIiwiaW1wb3J0IHsgTWVzc2FnZUJyb2tlciB9IGZyb20gXCIuLi9zb2NrZXQtc2VydmljZXNcIjtcbmltcG9ydCB7IFdvcmtlck1lc3NhZ2VCdWlsZGVyLCBXb3JrZXJNZXNzYWdlVHlwZXMgfSBmcm9tIFwiLi4vY29uZmlnLW1vZGVsc1wiO1xuXG5cblxubGV0IGNvbm5uZWN0aW9ucyA9IDA7XG5jb25zb2xlLmluZm8oJ1NoYXJlZCB3b3JrZXIgaGFzIGJlZW4gc3RhcnRlZCcpO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJjb25uZWN0XCIsIChldnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICBjb25zdCBwb3J0OiBNZXNzYWdlUG9ydCA9IGV2dC5wb3J0c1swXTtcbiAgTWVzc2FnZUJyb2tlci5pbnN0YW5jZS5vbk1lc3NhZ2UoV29ya2VyTWVzc2FnZUJ1aWxkZXIuYnVpbGQoV29ya2VyTWVzc2FnZVR5cGVzLkNPTk5FQ1RfV09SS0VSKSxwb3J0KTtcbiAgY29ubm5lY3Rpb25zKys7XG4gIHBvcnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKGU6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgIE1lc3NhZ2VCcm9rZXIuaW5zdGFuY2Uub25NZXNzYWdlKGUuZGF0YSwgcG9ydCk7XG4gIH0sIGZhbHNlKTtcbiAgcG9ydC5zdGFydCgpO1xuICBjb25zb2xlLmxvZyhgQ29ubmVjdGlvbnMgQ291bnQgOiAke2Nvbm5uZWN0aW9uc31gKTtcbn0sIGZhbHNlKTtcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJlcnJvck9iamVjdF8xIiwiX19leHRlbmRzIiwidGhpcyIsImlzQXJyYXlfMSIsInJvb3RfMSIsIk9ic2VydmVyXzEiLCJyeFN1YnNjcmliZXJfMSIsIm9ic2VydmFibGUiLCJvYnNlcnZhYmxlXzEiLCJhc3luY18xIiwiaW50ZXJ2YWxfMSIsImZpbHRlciIsImZpbHRlcl8xIiwiT2JzZXJ2YWJsZSIsIlN1YmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFPLElBQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM1QyxjQUFjLEVBQUcsZ0JBQWdCO0lBQ2pDLHNCQUFzQixFQUFHLHdCQUF3QjtJQUNqRCxxQkFBcUIsRUFBRyx1QkFBdUI7SUFFL0MsaUJBQWlCLEVBQUcsbUJBQW1CO0lBQ3ZDLHdCQUF3QixFQUFHLDBCQUEwQjtJQUNyRCxZQUFZLEVBQUcsY0FBYztJQUU3QixjQUFjLEVBQUcsZ0JBQWdCO0lBQ2pDLHNCQUFzQixFQUFHLHdCQUF3QjtJQUNqRCxxQkFBcUIsRUFBRyx1QkFBdUI7SUFFL0MsY0FBYyxFQUFHLGdCQUFnQjtJQUNqQyxxQkFBcUIsRUFBRyx1QkFBdUI7Q0FDbEQsQ0FBQzs7QUNaRjtBQUNBLEFBQU8sSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxTQUFTLEVBQUcsV0FBVztJQUN2QixNQUFNLEVBQUcsUUFBUTtJQUNqQixLQUFLLEVBQUcsT0FBTztDQUNoQixDQUFDOztBQ0FLO0lBQUE7S0FRTjtJQVBVLDBCQUFLLEdBQVosVUFBYSxJQUFZLEVBQUMsT0FBYTtRQUNyQyxPQUFPO1lBQ0wsSUFBSSxNQUFBO1lBQ0osRUFBRSxFQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDZixPQUFPLFNBQUE7U0FDUixDQUFDO0tBQ0g7SUFDTCwyQkFBQztDQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNaRCxJQUFJLFFBQVEsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDO0FBQ3ZELElBQUksTUFBTSxHQUFHLE9BQU8s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
