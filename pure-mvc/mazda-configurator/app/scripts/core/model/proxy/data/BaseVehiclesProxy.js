define(['model/vo/data/BaseVehicleVO'], function () {
    'use strict';
    var BaseVehicleVO = arguments[0];

    return puremvc.define({
            name: 'bmc.model.proxy.data.BaseVehiclesProxy',
            parent: puremvc.Proxy,
            constructor: function () {
                puremvc.Proxy.call(this, bmc.model.proxy.data.BaseVehiclesProxy.NAME, []);
                this.setData([]);
            }
        },
        {
            parseData: function (data) {

                var self = this,
                    i,
                    baseVehicleVO,
                    vehiclesCollection = data[this.constructor.DATA_KEY],
                    numOfVehicles = vehiclesCollection.length;

                for (i = 0; i < numOfVehicles; i++) {
                    baseVehicleVO = new BaseVehicleVO(vehiclesCollection[i]);
                    self.getData().push(baseVehicleVO);
                }

                self.startupBaseVehicleId = data.startupBaseVehicleId;
            },

            getStartupBaseVehicleId: function () {
                return this.startupBaseVehicleId;
            },

            setStartupBaseVehicleId: function (value) {
                this.startupBaseVehicleId = value;
            },

            getById: function (id) {

                var self = this,
                    i = 0,
                    numberOfVehicles = self.getData().length;

                while (i < numberOfVehicles) {
                    if (self.getData()[i].getId() === id) {
                        return self.getData()[i];
                    }

                    i += 1;
                }
                return null;
            },

            getBaseVehicleOnBodyStyle: function (bodyStyleId) {
                var self = this,
                    i,
                    baseVehicle,
                    numberOfVehicles = self.getData().length;

                for (i = 0; i < numberOfVehicles; i++) {
                    baseVehicle = self.getData()[i];

                    if (baseVehicle.bodyStyleId === bodyStyleId) {
                        return baseVehicle;
                    }
                }

                return null;
            },

            getByBodyStyle: function (bodyStyleId) {

                return this.getVehiclesByCondition(function (vehicleVO) {
                    return vehicleVO.bodyStyleId === bodyStyleId;
                });
            },

            getByBodyStyleGrade: function (bodyStyleId, gradeId) {

                return this.getVehiclesByCondition(function (vehicleVO) {
                    return vehicleVO.bodyStyleId === bodyStyleId && vehicleVO.gradeId === gradeId;
                });
            },

            getByBodyStyleEngine: function (bodyStyleId, engineId) {

                return this.getVehiclesByCondition(function (vehicleVO) {
                    return vehicleVO.bodyStyleId === bodyStyleId && vehicleVO.engineId === engineId;
                });
            },

            getByBodyStyleGradeEngine: function (bodyStyleId, gradeId, engineId) {

                return this.getVehiclesByCondition(function (vehicleVO) {
                    return vehicleVO.bodyStyleId === bodyStyleId &&
                        vehicleVO.engineId === engineId &&
                        vehicleVO.gradeId === gradeId;
                });
            },

            getVehiclesByCondition: function (conditionMethod) {

                var vehiclesVOs = [],
                    i = 0,
                    vehicleVO,
                    numberOfVehicles = this.getData().length;

                while (i < numberOfVehicles) {

                    vehicleVO = this.getData()[i];

                    if (conditionMethod(vehicleVO)) {
                        vehiclesVOs.push(vehicleVO);
                    }
                    i += 1;
                }

                return vehiclesVOs;
            }
        },
        {
            NAME: 'BaseVehiclesProxy',
            DATA_KEY: 'baseVehicles'
        }
    );
});