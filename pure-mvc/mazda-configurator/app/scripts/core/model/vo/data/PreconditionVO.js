define([], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.model.vo.data.PreconditionVO',
            constructor: function () {
                this.preconditions = [];
            }
        },
        {
            setType: function (value) {
                this.type = value;
            },
            getType: function () {
                return this.type;
            },

            setId: function (value) {
                this.id = value;
            },
            getId: function () {
                return this.id;
            },

            setValue: function (value) {
                this.value = value;
            },
            getValue: function () {
                return this.value;
            },

            addPreconditions: function (value) {
                this.preconditions.push(value);
            },
            getPreconditions: function () {
                return this.preconditions;
            }
        });
});