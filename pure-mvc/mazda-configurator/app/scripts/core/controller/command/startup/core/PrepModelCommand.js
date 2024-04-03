define([
    'model/proxy/data/BaseVehiclesProxy',
    'model/proxy/ActiveConfigurationProxy',
    'model/proxy/data/ConfigurableItemProxy',
    'model/proxy/VehiclePresentationProxy',
    'model/proxy/data/BaseVehiclesDefaultsProxy',
    'model/proxy/ChangeBaseVehicleByEngineProxy',
    'model/proxy/ChangeBaseVehicleByGradeProxy',
    'model/proxy/ChangeBaseVehicleByTrimProxy',
    'model/proxy/SessionProxy',
    'model/proxy/NavigationProxy',
    'model/proxy/PriceCalculationProxy',
    'model/proxy/ConfigurationConflictProxy',
    'model/proxy/data/StandardFeaturesProxy',
    'model/proxy/data/AccessoriesProxy',
    'model/proxy/UserConfigurationsProxy',
    'model/proxy/data/OptionPackProxy'
], function () {
    'use strict';
    var BaseVehiclesProxy = arguments[0],
        ActiveConfigurationProxy = arguments[1],
        ConfigurableItemProxy = arguments[2],
        VehiclePresentationProxy = arguments[3],
        BaseVehiclesDefaultsProxy = arguments[4],
        ChangeBaseVehicleByEngineProxy = arguments[5],
        ChangeBaseVehicleByGradeProxy = arguments[6],
        ChangeBaseVehicleByTrimProxy = arguments[7],
        SessionProxy = arguments[8],
        NavigationProxy = arguments[9],
        PriceCalculationProxy = arguments[10],
        ConfigurationConflictProxy = arguments[11],
        StandardFeaturesProxy = arguments[12],
        AccessoriesProxy = arguments[13],
        UserConfigurationsProxy = arguments[14],
        OptionPackProxy = arguments[15];

    return puremvc.define({
            name: 'bmc.controller.command.startup.core.PrepModelCommand',
            parent: puremvc.SimpleCommand
        },
        {
            execute: function () {
                var self = this;

                self.facade.registerProxy(new SessionProxy());

                self.facade.registerProxy(new ActiveConfigurationProxy());
                self.facade.registerProxy(new BaseVehiclesProxy());
                self.facade.registerProxy(new BaseVehiclesDefaultsProxy());
                self.facade.registerProxy(new VehiclePresentationProxy());
                self.facade.registerProxy(new ChangeBaseVehicleByEngineProxy());
                self.facade.registerProxy(new ChangeBaseVehicleByTrimProxy());
                self.facade.registerProxy(new ChangeBaseVehicleByGradeProxy());
                self.facade.registerProxy(new NavigationProxy());
                self.facade.registerProxy(new ConfigurationConflictProxy());
                self.facade.registerProxy(new PriceCalculationProxy());
                self.facade.registerProxy(new UserConfigurationsProxy());
                self.facade.registerProxy(new StandardFeaturesProxy());
                self.facade.registerProxy(new AccessoriesProxy());
                self.facade.registerProxy(new OptionPackProxy());

                self.createConfigurableItemProxies();
            },

            createConfigurableItemProxies: function () {
                var self = this,
                    ConfigurableType = bmc.support.ConfigurableType,
                    types = ConfigurableType.getTypes(),
                    numberOfTypes = types.length,
                    type,
                    i,
                    proxy;

                for (i = 0; i < numberOfTypes; i++) {
                    type = types[i];
                    proxy = new ConfigurableItemProxy(type,
                        ConfigurableType.getDataKey(type),
                        ConfigurableType.getTypeVO(type));

                    self.facade.registerProxy(proxy);

                }
            }
        }
    );
});