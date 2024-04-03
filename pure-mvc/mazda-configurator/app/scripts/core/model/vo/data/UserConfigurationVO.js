define(['model/vo/data/BaseVehicleVO'], function () {
    'use strict';
    var BaseVehicleVO = arguments[0];

    return puremvc.define({
            name: 'bmc.model.vo.data.UserConfigurationVO',
            parent: BaseVehicleVO,
            constructor: function (data) {
                BaseVehicleVO.call(this, data);
            }
        },
        {
            getColourVO: function () {
                return this.colourVO;
            },

            setColourVO: function (value) {
                this.colourVO = value;
            },

            getWheelVO: function () {
                return this.wheelVO;
            },

            setWheelVO: function (value) {
                this.wheelVO = value;
            },

            getTrimVO: function () {
                return this.trimVO;
            },

            setTrimVO: function (value) {
                this.trimVO = value;
            }
        }
    );
})
;