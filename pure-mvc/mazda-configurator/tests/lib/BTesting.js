var BTesting = (function () {

    'use strict';

    function BTesting() {}

    BTesting.prototype.wrap = function (obj, fnStr) {
        var realFn = obj[fnStr];

        obj[fnStr] = function () {
            obj[fnStr].calls.push(arguments);
            obj[fnStr].hasBeenCalled = true;
        };

        obj[fnStr].calls = [];
        obj[fnStr].hasBeenCalled = false;

        obj[fnStr].restore = function () {
            obj[fnStr] = realFn;
        };
    };

    return new BTesting();
}());