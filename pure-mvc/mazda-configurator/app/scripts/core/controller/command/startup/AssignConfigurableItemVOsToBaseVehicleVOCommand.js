define([
    'model/vo/data/BaseVehicleVO',
    'support/ConfigurableType',
    'model/proxy/data/BaseVehiclesDefaultsProxy',
    'model/proxy/data/BaseVehiclesProxy',
    'model/proxy/data/OptionPackProxy'
], function () {
    'use strict';
    var ConfigurableType = arguments[1],
        BaseVehiclesDefaultsProxy = arguments[2],
        BaseVehiclesProxy = arguments[3],
        OptionPackProxy = arguments[4];

    return puremvc.define({
            name: 'bmc.controller.command.startup.AssignConfigurableItemVOsToBaseVehicleVOCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function () {
                var i = 0,
                    baseVehicleVO,
                    baseVehiclesProxy = this.facade.retrieveProxy(BaseVehiclesProxy.NAME),
                    vehicles = baseVehiclesProxy.getData(),
                    numberOfVehicles = vehicles.length;

                while (i < numberOfVehicles) {
                    baseVehicleVO = vehicles[i];
                    this.appendConfigurableTypeVOToBaseVehicle(baseVehicleVO);
                    this.appendConfigurableDefaultsVOToBaseVehicle(baseVehicleVO);
                    i += 1;
                }
            },

            appendConfigurableTypeVOToBaseVehicle: function (baseVehicleVO) {

                baseVehicleVO.setBodyStyleVO(this.getVOFromProxy(ConfigurableType.BODYSTYLE,
                    baseVehicleVO.bodyStyleId));
                baseVehicleVO.setGradeVO(this.getVOFromProxy(ConfigurableType.GRADE, baseVehicleVO.gradeId));
                baseVehicleVO.setEngineVO(this.getVOFromProxy(ConfigurableType.ENGINE, baseVehicleVO.engineId));
                this.setOptionPacks(baseVehicleVO);
            },

            setOptionPacks: function (baseVehicleVO) {

                var optionPackVOs = [],
                    optionPackProxy = this.facade.retrieveProxy(OptionPackProxy.NAME);

                _.each(baseVehicleVO.getOptionPackIds(), function (optionPackId) {
                    optionPackVOs.push(optionPackProxy.getById(optionPackId));
                });

                baseVehicleVO.setOptionPackVOs(optionPackVOs);
            },

            appendConfigurableDefaultsVOToBaseVehicle: function (baseVehicleVO) {

                var defaultsProxy = this.facade.retrieveProxy(BaseVehiclesDefaultsProxy.NAME),
                    vehicleDefaults = defaultsProxy.getById(baseVehicleVO.id);

                baseVehicleVO.setDefaultsVO(vehicleDefaults);

                vehicleDefaults.setColourVO(this.getVOFromProxy(ConfigurableType.COLOUR, vehicleDefaults.colourId));
                vehicleDefaults.setWheelVO(this.getVOFromProxy(ConfigurableType.WHEEL, vehicleDefaults.wheelId));
                vehicleDefaults.setTrimVO(this.getVOFromProxy(ConfigurableType.TRIM, vehicleDefaults.trimId));
            },

            getVOFromProxy: function (configurableType, id) {
                return this.facade.retrieveProxy(configurableType).getById(id);
            }
        }
    );
});
