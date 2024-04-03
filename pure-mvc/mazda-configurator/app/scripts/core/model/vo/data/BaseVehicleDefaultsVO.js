define([], function () {
    'use strict';
    return puremvc.define({
            name: 'bmc.model.vo.data.BaseVehicleDefaultsVO',
            constructor: function (data) {
                this.data = data;
                this.setProperties();
                this.data = null;
            }
        },
        {
            setProperties: function () {

                this.id = this.baseVehicleId = this.data.baseVehicleId;
                this.wheelId = this.data.wheelId;
                this.colourId = this.data.colourId;
                this.trimId = this.data.trimId;
                this.accessoryIds = this.convertStringToArray(this.data.accessoryIds);
            },

            convertStringToArray: function (value) {
                if (value) {
                    value = value.split();
                }
                return value;
            },

            getId: function () {
                return this.getBaseVehicleId();
            },

            getBaseVehicleId: function () {
                return this.baseVehicleId;
            },

            setWheelVO: function (value) {
                this.wheelVO = value;
            },

            getWheelVO: function () {
                return this.wheelVO;
            },

            setColourVO: function (value) {
                this.colourVO = value;
            },

            getColourVO: function () {
                return this.colourVO;
            },

            getTrimVO: function () {
                return this.trimVO;
            },

            setTrimVO: function (value) {
                this.trimVO = value;
            },


            getTrimId: function () {
                return this.trimId;
            },

            getAccessoryIds: function () {
                return this.accessoryIds;
            },

            getWheelId: function () {
                return this.wheelId;
            },

            getConfigurableItemVO: function () {
                return this.colourId;
            }
        }
    );
})
;