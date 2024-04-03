define([], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.model.vo.data.DisclaimerVO',
            constructor: function (data) {
                this.setProperties(data);
            }
        },
        {
            setProperties: function (data) {
                this.type = data.type;
                this.value = data.value || null;
                this.preconditions = [];
                this.id = data.id;

            },

            getType: function () {
                return this.type;
            },

            getValue: function () {
                return this.value;
            },

            getPreconditions: function () {
                return this.preconditions;
            },


            getId: function () {
                return this.id;
            },

            addPreconditionVO: function (vo) {
                this.preconditions.push(vo);
            }


        },
        {});
});