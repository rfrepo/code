define([], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.support.ArrayUtils' },
        {},
        {
            getItemByGetterFunction: function (arr, getterFunction, value) {
                var i = 0,
                    numberOfItems = arr.length;

                while (i < numberOfItems) {
                    if (arr[i][getterFunction]() === value) {
                        return arr[i];
                    }

                    i += 1;
                }

                return null;
            }

        }
    );
});
