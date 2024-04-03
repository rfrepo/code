define(['model/vo/data/BaseVehicleDefaultsVO'], function () {
    'use strict';
    var BaseVehicleDefaultsVO = arguments[0];

    return puremvc.define({
            name: 'bmc.model.proxy.data.BaseVehiclesDefaultsProxy',
            parent: puremvc.Proxy
        },
        {
            parseData: function (data) {
                var i,
                    baseVehicleDefaultsVO,
                    defaultsCollection = data[this.constructor.DATA_KEY],
                    numOfDefaults = defaultsCollection.length;

                this.baseVehicleDefaults = [];

                for (i = 0; i < numOfDefaults; i++) {

                    baseVehicleDefaultsVO = new BaseVehicleDefaultsVO(defaultsCollection[i]);
                    this.baseVehicleDefaults.push(baseVehicleDefaultsVO);
                }
            },

            getById: function (id) {
                var self = this,
                    i = 0,
                    defaultsVO,
                    items = self.baseVehicleDefaults.length;

                while (i < items) {
                    defaultsVO = self.baseVehicleDefaults[i];

                    if (defaultsVO.getId() === id) {
                        return defaultsVO;
                    }

                    i += 1;
                }
                return null;
            }
        },
        {
            NAME: 'BaseVehicleDefaultsProxy',
            DATA_KEY: 'baseVehicleDefaults'
        }
    );
});